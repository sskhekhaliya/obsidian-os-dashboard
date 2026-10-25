import { App, requestUrl, Notice, TFile } from "obsidian";
import { CalendarEventItem, OSDashboardSettings, moment } from "../types";

export class CalendarService {
  private app: App;
  private notifiedEventIds: Set<string> = new Set();

  // Vibrant Material Google Calendar color palette
  private palette = [
    "#3b82f6", // Blue (Default / Focus)
    "#10b981", // Sage / Emerald (Personal / Health)
    "#8b5cf6", // Grape / Purple (Projects / Deep Work)
    "#f59e0b", // Amber / Banana (Social / Leisure)
    "#ef4444", // Flamingo / Red (Deadlines / Urgent)
    "#06b6d4", // Peacock / Cyan (Meetings)
    "#ec4899", // Pink (Events / Birthdays)
    "#6366f1"  // Indigo
  ];

  constructor(app: App) {
    this.app = app;
  }

  /**
   * Resolves the Google Calendar iCal URL from Obsidian Keychain (SecretStorage) or plain settings
   */
  public getCalendarUrl(settings: OSDashboardSettings): string {
    if (settings.googleCalendarUseKeychain || settings.googleCalendarSecretId) {
      const secretStorage = (this.app as any).secretStorage;
      if (secretStorage && typeof secretStorage.getSecret === "function" && settings.googleCalendarSecretId) {
        const secret = secretStorage.getSecret(settings.googleCalendarSecretId);
        if (secret && typeof secret === "string" && secret.trim()) {
          return secret.trim();
        }
      }
    }
    return settings.googleCalendarUrl ? settings.googleCalendarUrl.trim() : "";
  }

  /**
   * Checks whether Obsidian native SecretStorage (Keychain) is supported by this Obsidian version
   */
  public isKeychainAvailable(): boolean {
    const secretStorage = (this.app as any).secretStorage;
    return Boolean(secretStorage && typeof secretStorage.getSecret === "function");
  }

  /**
   * Fetches and parses an iCal (.ics) feed URL (e.g. Google Calendar secret address)
   */
  public async fetchEvents(icsUrl: string): Promise<CalendarEventItem[]> {
    const cleanUrl = icsUrl.trim();
    if (!cleanUrl) return [];

    try {
      const response = await requestUrl({
        url: cleanUrl,
        headers: {
          "Accept": "text/calendar, text/plain, */*"
        }
      });

      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Calendar server responded with HTTP status ${response.status}`);
      }

      return this.parseIcs(response.text);
    } catch (err: any) {
      console.error("[OS Dashboard] Error fetching Google Calendar events:", err);
      throw err;
    }
  }

  /**
   * Parses standard RFC 5545 iCalendar content into CalendarEventItem array
   */
  public parseIcs(icsText: string): CalendarEventItem[] {
    const events: CalendarEventItem[] = [];
    if (!icsText) return events;

    // 1. Unfold lines (lines starting with space or tab are continuation lines)
    const unfolded = icsText.replace(/\r\n[ \t]/g, "").replace(/\n[ \t]/g, "");
    const lines = unfolded.split(/\r?\n/);

    let insideEvent = false;
    let currentEvent: Record<string, string> = {};

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      if (trimmed === "BEGIN:VEVENT") {
        insideEvent = true;
        currentEvent = {};
        continue;
      }

      if (trimmed === "END:VEVENT") {
        insideEvent = false;
        const parsed = this.processEventData(currentEvent);
        if (parsed) {
          // If event has RRULE, expand recurring instances across current view window
          if (currentEvent["RRULE"]) {
            const recurringInstances = this.expandRecurrence(parsed, currentEvent["RRULE"]);
            events.push(...recurringInstances);
          } else {
            events.push(parsed);
          }
        }
        currentEvent = {};
        continue;
      }

      if (insideEvent) {
        const colonIdx = trimmed.indexOf(":");
        if (colonIdx > 0) {
          const keyPart = trimmed.substring(0, colonIdx);
          const valPart = trimmed.substring(colonIdx + 1);

          // Key might contain parameters (e.g. DTSTART;VALUE=DATE)
          const semicolonIdx = keyPart.indexOf(";");
          const propName = semicolonIdx > 0 ? keyPart.substring(0, semicolonIdx).toUpperCase() : keyPart.toUpperCase();
          const propParams = semicolonIdx > 0 ? keyPart.substring(semicolonIdx + 1) : "";

          currentEvent[propName] = valPart;
          if (propParams) {
            currentEvent[`${propName}_PARAMS`] = propParams;
          }
        }
      }
    }

    return events;
  }

  /**
   * Converts raw VEVENT properties into a CalendarEventItem
   */
  private processEventData(data: Record<string, string>): CalendarEventItem | null {
    const summary = this.unescapeIcsText(data["SUMMARY"] || "Untitled Event");
    const rawStart = data["DTSTART"];
    if (!rawStart) return null;

    const startInfo = this.parseDateString(rawStart, data["DTSTART_PARAMS"] || "");
    if (!startInfo) return null;

    let endInfo = data["DTEND"] ? this.parseDateString(data["DTEND"], data["DTEND_PARAMS"] || "") : null;
    if (!endInfo) {
      endInfo = { ...startInfo };
    }

    const uid = data["UID"] || `${startInfo.date}-${summary}-${Math.random().toString(36).substring(2, 7)}`;
    const location = data["LOCATION"] ? this.unescapeIcsText(data["LOCATION"]) : undefined;
    const description = data["DESCRIPTION"] ? this.unescapeIcsText(data["DESCRIPTION"]) : undefined;

    // Pick consistent color from palette based on summary string hash
    const color = this.pickColor(summary);

    return {
      id: uid,
      title: summary,
      startDate: startInfo.date,
      startTime: startInfo.time,
      endDate: endInfo.date,
      endTime: endInfo.time,
      isAllDay: startInfo.isAllDay,
      location,
      description,
      color
    };
  }

  /**
   * Expands basic daily / weekly / monthly recurrences into events within a 120-day window
   */
  private expandRecurrence(baseEvent: CalendarEventItem, rruleStr: string): CalendarEventItem[] {
    const list: CalendarEventItem[] = [baseEvent];
    const rules = this.parseRrule(rruleStr);

    const freq = rules["FREQ"];
    if (!freq) return list;

    const startMom = moment(baseEvent.startDate);
    const windowStart = moment().subtract(30, "days");
    const windowEnd = moment().add(90, "days");

    let count = 0;
    const maxCount = rules["COUNT"] ? parseInt(rules["COUNT"], 10) : 50;
    const until = rules["UNTIL"] ? moment(rules["UNTIL"].substring(0, 8), "YYYYMMDD") : null;

    let curMom = startMom.clone();
    let interval = rules["INTERVAL"] ? parseInt(rules["INTERVAL"], 10) : 1;
    if (isNaN(interval) || interval < 1) interval = 1;

    for (let step = 1; step <= 100; step++) {
      if (freq === "DAILY") {
        curMom.add(interval, "days");
      } else if (freq === "WEEKLY") {
        curMom.add(interval, "weeks");
      } else if (freq === "MONTHLY") {
        curMom.add(interval, "months");
      } else {
        break;
      }

      if (until && curMom.isAfter(until)) break;
      if (curMom.isAfter(windowEnd)) break;

      count++;
      if (count >= maxCount) break;

      if (curMom.isSameOrAfter(windowStart)) {
        const nextDateStr = curMom.format("YYYY-MM-DD");
        list.push({
          ...baseEvent,
          id: `${baseEvent.id}_rec_${nextDateStr}`,
          startDate: nextDateStr,
          endDate: nextDateStr
        });
      }
    }

    return list;
  }

  private parseRrule(rruleStr: string): Record<string, string> {
    const map: Record<string, string> = {};
    const parts = rruleStr.split(";");
    for (const part of parts) {
      const [k, v] = part.split("=");
      if (k && v) map[k.trim().toUpperCase()] = v.trim();
    }
    return map;
  }

  /**
   * Parses ICS DTSTART/DTEND string into { date: "YYYY-MM-DD", time: "HH:mm" | undefined, isAllDay: boolean }
   */
  private parseDateString(raw: string, params: string): { date: string; time?: string; isAllDay: boolean } | null {
    const isAllDayParam = params.includes("VALUE=DATE");

    // All day format: YYYYMMDD (8 digits)
    if (isAllDayParam || /^\d{8}$/.test(raw)) {
      const y = raw.substring(0, 4);
      const m = raw.substring(4, 6);
      const d = raw.substring(6, 8);
      return {
        date: `${y}-${m}-${d}`,
        isAllDay: true
      };
    }

    // Timed format: YYYYMMDDTHHmmss or YYYYMMDDTHHmmssZ
    if (raw.includes("T")) {
      const isUtc = raw.endsWith("Z");
      const cleanNum = raw.replace(/[^\dTZ]/g, "");

      if (isUtc) {
        const mom = moment.utc(cleanNum, "YYYYMMDDTHHmmss").local();
        if (mom.isValid()) {
          return {
            date: mom.format("YYYY-MM-DD"),
            time: mom.format("HH:mm"),
            isAllDay: false
          };
        }
      } else {
        // Local or timezone-specified timestamp
        const mom = moment(cleanNum.substring(0, 15), "YYYYMMDDTHHmmss");
        if (mom.isValid()) {
          return {
            date: mom.format("YYYY-MM-DD"),
            time: mom.format("HH:mm"),
            isAllDay: false
          };
        }
      }
    }

    return null;
  }

  private unescapeIcsText(str: string): string {
    return str
      .replace(/\\n/g, "\n")
      .replace(/\\N/g, "\n")
      .replace(/\\,/g, ",")
      .replace(/\\;/g, ";")
      .replace(/\\\\/g, "\\");
  }

  private pickColor(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    const idx = Math.abs(hash) % this.palette.length;
    return this.palette[idx];
  }

  /**
   * Checks if an event occurs on a specific target date (taking recurrence into account)
   */
  public isEventOccurringOnDate(e: CalendarEventItem, dateStr: string): boolean {
    // 1. Direct match or within date range
    if (e.startDate === dateStr) return true;
    if (e.endDate && e.startDate <= dateStr && e.endDate >= dateStr) {
      // In all-day events, DTEND is exclusive
      if (e.isAllDay && e.endDate === dateStr && e.startDate !== e.endDate) return false;
      return true;
    }

    // 2. Check recurrence rule (for repeating local events, birthdays, custom day intervals)
    if (e.recurrence && e.recurrence.type !== "none") {
      // Event must have started on or before target date
      if (dateStr < e.startDate) return false;
      // If until date is set, target date must not exceed it
      if (e.recurrence.until && dateStr > e.recurrence.until) return false;

      const eventStartMom = moment(e.startDate, "YYYY-MM-DD");
      const targetMom = moment(dateStr, "YYYY-MM-DD");
      const diffDays = targetMom.diff(eventStartMom, "days");

      switch (e.recurrence.type) {
        case "daily":
        case "custom_days": {
          const interval = Math.max(1, e.recurrence.intervalDays || 1);
          return diffDays >= 0 && diffDays % interval === 0;
        }
        case "weekly": {
          const intervalWeeks = Math.max(1, e.recurrence.intervalWeeks || 1);
          const diffWeeks = Math.floor(diffDays / 7);
          return targetMom.day() === eventStartMom.day() && diffWeeks % intervalWeeks === 0;
        }
        case "monthly": {
          return targetMom.date() === eventStartMom.date();
        }
        case "yearly": {
          // Yearly match (birthdays, anniversaries)
          return targetMom.format("MM-DD") === eventStartMom.format("MM-DD");
        }
      }
    }

    return false;
  }

  /**
   * Returns all events occurring on a specific date (YYYY-MM-DD)
   */
  public getEventsForDate(events: CalendarEventItem[], dateStr: string): CalendarEventItem[] {
    const list = events.filter(e => this.isEventOccurringOnDate(e, dateStr));

    // Sort: All-day events first, then chronological by startTime
    return list.sort((a, b) => {
      if (a.isAllDay && !b.isAllDay) return -1;
      if (!a.isAllDay && b.isAllDay) return 1;
      const tA = a.startTime || "00:00";
      const tB = b.startTime || "00:00";
      return tA.localeCompare(tB);
    });
  }

  /**
   * Check if a date has any scheduled events
   */
  public hasEventsOnDate(events: CalendarEventItem[], dateStr: string): boolean {
    return events.some(e => this.isEventOccurringOnDate(e, dateStr));
  }

  /**
   * Checks for events starting within leadMinutes and triggers Obsidian / OS notifications
   */
  public checkUpcomingEventNotifications(events: CalendarEventItem[], defaultLeadMinutes: number = 10): void {
    const now = moment();
    const todayStr = now.format("YYYY-MM-DD");

    const todayEvents = this.getEventsForDate(events, todayStr);

    for (const ev of todayEvents) {
      if (ev.isAllDay || !ev.startTime) continue;
      if (ev.enableNotification === false) continue;

      const notifyKey = `${ev.id}_${todayStr}`;
      if (this.notifiedEventIds.has(notifyKey)) continue;

      const eventStart = moment(`${todayStr} ${ev.startTime}`, "YYYY-MM-DD HH:mm");
      if (!eventStart.isValid()) continue;

      const diffMinutes = eventStart.diff(now, "minutes");
      const eventLead = ev.notificationLeadMinutes !== undefined ? ev.notificationLeadMinutes : defaultLeadMinutes;

      // Notify if event starts between 0 and eventLead minutes from now
      if (diffMinutes >= 0 && diffMinutes <= eventLead) {
        this.notifiedEventIds.add(notifyKey);

        const timeMsg = diffMinutes === 0 ? "starts now!" : `starts in ${diffMinutes} minute${diffMinutes === 1 ? "" : "s"}`;
        const sourceLabel = ev.source === "local" ? "Event" : "Google Calendar";
        const msg = `${sourceLabel}: "${ev.title}" ${timeMsg} (${ev.startTime})`;

        new Notice(msg, 7000);

        // Native System Notification if supported & permitted
        if (typeof Notification !== "undefined" && Notification.permission === "granted") {
          try {
            new Notification(`Upcoming ${sourceLabel}: ${ev.title}`, {
              body: `${timeMsg} at ${ev.startTime}${ev.location ? ` • ${ev.location}` : ""}`,
              icon: "calendar"
            });
          } catch (e) {}
        }
      }
    }
  }

  /**
   * Retrieves local events stored in a vault Markdown file (e.g. Events.md)
   * formatted under ## YYYY-MM-DD headings.
   * Supports Obsidian callout blocks (> [!event] ...) as well as bulleted event items.
   */
  public async getLocalMarkdownEvents(filePath: string): Promise<CalendarEventItem[]> {
    if (!filePath) return [];
    const file = this.app.vault.getAbstractFileByPath(filePath);
    if (!(file instanceof TFile)) return [];

    const content = await this.app.vault.read(file);
    const lines = content.split("\n");
    const events: CalendarEventItem[] = [];

    let currentHeadingDate: string | null = null;
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Check for headings ## YYYY-MM-DD
      const headingMatch = line.match(/^#{1,6}\s+.*?\b(\d{4}-\d{2}-\d{2})\b/);
      if (headingMatch) {
        currentHeadingDate = headingMatch[1];
        i++;
        continue;
      }

      if (!currentHeadingDate) {
        i++;
        continue;
      }

      // 1. Check for Obsidian Callout format: > [!event] Title
      const calloutMatch = line.match(/^\s*>\s*\[!event(?::[^\]]+)?\]\s*(.*)$/i);
      if (calloutMatch) {
        const startLineIdx = i;
        let rawTitle = calloutMatch[1].trim();
        let location: string | undefined;
        let recurrence: any = undefined;
        let enableNotification = false;
        let notificationLeadMinutes: number | undefined;
        let color: string | undefined;
        let description: string | undefined;

        i++;
        while (i < lines.length) {
          const nextLine = lines[i];
          // Stop if next line is another callout or heading
          if (/^\s*>\s*\[!/i.test(nextLine) || /^\s*#{1,6}\s+/i.test(nextLine)) {
            break;
          }
          if (!/^\s*>/.test(nextLine)) {
            break;
          }

          const subContent = nextLine.replace(/^\s*>\s*/, "").trim();
          if (subContent) {
            const locP = subContent.match(/^[-*]?\s*location:\s*(.*)$/i);
            const repP = subContent.match(/^[-*]?\s*repeat:\s*(.*)$/i);
            const remP = subContent.match(/^[-*]?\s*reminder:\s*(.*)$/i);
            const colP = subContent.match(/^[-*]?\s*color:\s*(.*)$/i);
            const notP = subContent.match(/^[-*]?\s*(?:notes|description):\s*(.*)$/i);

            if (locP) {
              location = locP[1].trim();
            } else if (repP) {
              const rText = repP[1].trim().toLowerCase();
              const numMatch = rText.match(/(\d+)/);
              if (numMatch) {
                recurrence = { type: "custom_days", intervalDays: parseInt(numMatch[1], 10) || 1 };
              } else if (rText.includes("day")) {
                recurrence = { type: "daily", intervalDays: 1 };
              } else if (rText.includes("week")) {
                recurrence = { type: "weekly", intervalWeeks: 1 };
              } else if (rText.includes("month")) {
                recurrence = { type: "monthly" };
              } else if (rText.includes("year")) {
                recurrence = { type: "yearly" };
              }
            } else if (remP) {
              enableNotification = true;
              const notMatch = remP[1].match(/(\d+)\s*(m|h|d)?/i);
              if (notMatch) {
                const val = parseInt(notMatch[1], 10);
                const unit = (notMatch[2] || "m").toLowerCase();
                if (unit === "d") notificationLeadMinutes = val * 1440;
                else if (unit === "h") notificationLeadMinutes = val * 60;
                else notificationLeadMinutes = val;
              }
            } else if (colP) {
              color = colP[1].trim();
            } else if (notP) {
              description = (description ? description + "\n" : "") + notP[1].trim();
            } else {
              description = (description ? description + "\n" : "") + subContent;
            }
          }
          i++;
        }

        // Parse time & title from callout header line
        let startTime: string | undefined;
        let endTime: string | undefined;
        let isAllDay = true;

        const timeRangeMatch = rawTitle.match(/\b(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})\b/);
        if (timeRangeMatch) {
          startTime = timeRangeMatch[1].padStart(5, "0");
          endTime = timeRangeMatch[2].padStart(5, "0");
          isAllDay = false;
          rawTitle = rawTitle.replace(timeRangeMatch[0], "").trim();
        } else {
          const singleTimeMatch = rawTitle.match(/\b(\d{1,2}:\d{2})\b/);
          if (singleTimeMatch) {
            startTime = singleTimeMatch[1].padStart(5, "0");
            isAllDay = false;
            rawTitle = rawTitle.replace(singleTimeMatch[0], "").trim();
          }
        }

        if (/\(all[\s-]day\)/i.test(rawTitle)) {
          isAllDay = true;
          rawTitle = rawTitle.replace(/\(all[\s-]day\)/gi, "").trim();
        }

        const title = rawTitle.replace(/^[-*|•\s]+/, "").trim();
        if (title) {
          events.push({
            id: `md-${filePath}-${startLineIdx}`,
            title,
            startDate: currentHeadingDate,
            endDate: currentHeadingDate,
            isAllDay,
            startTime,
            endTime,
            location,
            description,
            color: color || this.pickColor(title),
            source: "local",
            recurrence,
            enableNotification,
            notificationLeadMinutes
          });
        }
        continue;
      }

      // 2. Check for bullet list item or task (backward-compatibility / plain notes)
      const itemMatch = line.match(/^\s*[-*]\s*(?:\[[ xX]?\]\s*)?(.*)$/);
      if (itemMatch) {
        let raw = itemMatch[1].trim();
        if (raw) {
          // Extract location: [location: ...] or legacy 📍 <location>
          let location: string | undefined;
          const locBracket = raw.match(/\[location:\s*([^\]]+)\]/i);
          if (locBracket) {
            location = locBracket[1].trim();
            raw = raw.replace(locBracket[0], "").trim();
          } else {
            const locEmoji = raw.match(/📍\s*([^🔁🔔🎨\[]+)/);
            if (locEmoji) {
              location = locEmoji[1].trim();
              raw = raw.replace(locEmoji[0], "").trim();
            }
          }

          // Extract recurrence: [repeat: ...] or legacy 🔁 every ...
          let recurrence: any = undefined;
          const repBracket = raw.match(/\[repeat:\s*([^\]]+)\]/i);
          const repEmoji = raw.match(/🔁\s*(?:every\s+after\s+(\d+)\s*days?|every\s+(\d+)\s*days?|every\s+day|every\s+week|every\s+month|every\s+year)/i);
          const repMatch = repBracket || repEmoji;
          if (repMatch) {
            const matchStr = (repBracket ? repBracket[1] : repEmoji![0]).toLowerCase();
            const numMatch = matchStr.match(/(\d+)/);
            if (numMatch) {
              recurrence = { type: "custom_days", intervalDays: parseInt(numMatch[1], 10) || 1 };
            } else if (matchStr.includes("day")) {
              recurrence = { type: "daily", intervalDays: 1 };
            } else if (matchStr.includes("week")) {
              recurrence = { type: "weekly", intervalWeeks: 1 };
            } else if (matchStr.includes("month")) {
              recurrence = { type: "monthly" };
            } else if (matchStr.includes("year")) {
              recurrence = { type: "yearly" };
            }
            raw = raw.replace(repMatch[0], "").trim();
          }

          // Extract reminder: [reminder: ...] or legacy 🔔 10m
          let enableNotification = false;
          let notificationLeadMinutes: number | undefined;
          const notifBracket = raw.match(/\[reminder:\s*(\d+)\s*(m|h|d)?\]/i);
          const notifEmoji = raw.match(/🔔\s*(\d+)\s*(m|h|d)?/i);
          const notifMatch = notifBracket || notifEmoji;
          if (notifMatch) {
            enableNotification = true;
            const val = parseInt(notifMatch[1], 10);
            const unit = (notifMatch[2] || "m").toLowerCase();
            if (unit === "d") notificationLeadMinutes = val * 1440;
            else if (unit === "h") notificationLeadMinutes = val * 60;
            else notificationLeadMinutes = val;
            raw = raw.replace(notifMatch[0], "").trim();
          }

          // Extract color: [color: ...] or legacy 🎨 #hex
          let color: string | undefined;
          const colorBracket = raw.match(/\[color:\s*(#[a-fA-F0-9]{6})\]/i);
          const colorEmoji = raw.match(/🎨\s*(#[a-fA-F0-9]{6})/);
          const colorMatch = colorBracket || colorEmoji;
          if (colorMatch) {
            color = colorMatch[1];
            raw = raw.replace(colorMatch[0], "").trim();
          }

          // Extract time range or single time
          let startTime: string | undefined;
          let endTime: string | undefined;
          let isAllDay = true;

          const timeRangeMatch = raw.match(/\b(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})\b/);
          if (timeRangeMatch) {
            startTime = timeRangeMatch[1].padStart(5, "0");
            endTime = timeRangeMatch[2].padStart(5, "0");
            isAllDay = false;
            raw = raw.replace(timeRangeMatch[0], "").trim();
          } else {
            const singleTimeMatch = raw.match(/\b(\d{1,2}:\d{2})\b/);
            if (singleTimeMatch) {
              startTime = singleTimeMatch[1].padStart(5, "0");
              isAllDay = false;
              raw = raw.replace(singleTimeMatch[0], "").trim();
            }
          }

          if (/\(all[\s-]day\)/i.test(raw)) {
            isAllDay = true;
            raw = raw.replace(/\(all[\s-]day\)/gi, "").trim();
          }

          const title = raw.replace(/^[-*|•\s]+/, "").trim();
          if (title) {
            events.push({
              id: `md-${filePath}-${i}`,
              title,
              startDate: currentHeadingDate,
              endDate: currentHeadingDate,
              isAllDay,
              startTime,
              endTime,
              location,
              color: color || this.pickColor(title),
              source: "local",
              recurrence,
              enableNotification,
              notificationLeadMinutes
            });
          }
        }
      }

      i++;
    }

    return events;
  }

  /**
   * Appends or updates an event in the local Markdown file under ## YYYY-MM-DD
   * Formats as clean Obsidian callout (> [!event]) with zero emojis.
   */
  public async saveEventToMarkdown(filePath: string, event: CalendarEventItem): Promise<void> {
    if (!filePath) filePath = "Events.md";
    let file = this.app.vault.getAbstractFileByPath(filePath);

    if (!(file instanceof TFile)) {
      try {
        file = await this.app.vault.create(filePath, "# Calendar Events\n\n");
      } catch (e) {
        new Notice(`Failed to create events file: ${filePath}`);
        return;
      }
    }

    if (!(file instanceof TFile)) return;

    // Build event callout lines
    const blockLines: string[] = [];
    let header = "> [!event] ";
    if (!event.isAllDay && event.startTime) {
      header += event.endTime ? `${event.startTime} - ${event.endTime} ` : `${event.startTime} `;
    }
    header += event.title;
    if (event.isAllDay) {
      header += " (all day)";
    }
    blockLines.push(header);

    if (event.location) {
      blockLines.push(`> - location: ${event.location}`);
    }
    if (event.recurrence && event.recurrence.type !== "none") {
      let repText = "";
      if (event.recurrence.type === "custom_days" || event.recurrence.type === "daily") {
        const days = event.recurrence.intervalDays || 1;
        repText = `every ${days} day${days > 1 ? "s" : ""}`;
      } else if (event.recurrence.type === "weekly") {
        repText = "every week";
      } else if (event.recurrence.type === "monthly") {
        repText = "every month";
      } else if (event.recurrence.type === "yearly") {
        repText = "every year";
      }
      if (repText) {
        blockLines.push(`> - repeat: ${repText}`);
      }
    }
    if (event.enableNotification && event.notificationLeadMinutes !== undefined) {
      const mins = event.notificationLeadMinutes;
      const leadStr = mins >= 1440 ? `${Math.round(mins / 1440)}d` : (mins >= 60 ? `${Math.round(mins / 60)}h` : `${mins}m`);
      blockLines.push(`> - reminder: ${leadStr}`);
    }
    if (event.color) {
      blockLines.push(`> - color: ${event.color}`);
    }
    if (event.description) {
      blockLines.push(`> - notes: ${event.description}`);
    }

    const eventBlock = blockLines.join("\n");

    const content = await this.app.vault.read(file);
    const lines = content.split("\n");
    const targetHeading = `## ${event.startDate}`;
    const headingIdx = lines.findIndex(l => l.trim().startsWith(targetHeading));

    if (headingIdx >= 0) {
      // Insert right below the heading
      lines.splice(headingIdx + 1, 0, eventBlock);
    } else {
      // Append new date heading at the end
      if (lines.length > 0 && lines[lines.length - 1].trim() !== "") {
        lines.push("");
      }
      lines.push(targetHeading);
      lines.push(eventBlock);
      lines.push("");
    }

    await this.app.vault.modify(file, lines.join("\n"));
  }
}
