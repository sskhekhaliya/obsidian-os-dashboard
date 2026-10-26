import { App, TFile } from "obsidian";
import { DeadlineItem, OSDashboardSettings, parseFolderList, isPathInFolderList, moment } from "../types";
import { IconService } from "./iconService";

export class DeadlineService {
  private app: App;
  private iconService: IconService;

  private static readonly DEADLINE_COLORS = [
    "#ef4444", // Red
    "#f97316", // Orange
    "#f59e0b", // Amber
    "#3b82f6", // Blue
    "#8b5cf6", // Purple
    "#14b8a6", // Teal
    "#ec4899"  // Pink
  ];

  constructor(app: App, iconService: IconService) {
    this.app = app;
    this.iconService = iconService;
  }

  /**
   * Safely parses any date value into a moment object.
   * Handles Date objects, timestamps, strings, Obsidian wikilinks ([[YYYY-MM-DD]]), and YAML arrays.
   */
  private parseDeadlineDate(rawVal: any): any {
    if (rawVal === undefined || rawVal === null) return null;

    if (Array.isArray(rawVal)) {
      rawVal = rawVal[0];
    }
    if (rawVal === undefined || rawVal === null) return null;

    const momentFn = (window as any).moment || moment;

    // Check for native Date object across execution contexts
    if (Object.prototype.toString.call(rawVal) === "[object Date]" || typeof rawVal?.getMonth === "function") {
      const m = momentFn(rawVal);
      return m && m.isValid() ? m : null;
    }

    // Check for numeric timestamp
    if (typeof rawVal === "number") {
      const m = momentFn(rawVal);
      return m && m.isValid() ? m : null;
    }

    // String / wikilink cleanup
    const str = String(rawVal).replace(/[\[\]"']/g, "").trim();
    if (!str) return null;

    const formats = [
      "YYYY-MM-DD",
      "YYYY/MM/DD",
      "YYYY.MM.DD",
      "DD-MM-YYYY",
      "DD/MM/YYYY",
      "MM/DD/YYYY",
      "YYYY-MM-DD HH:mm",
      "YYYY-MM-DDTHH:mm:ss",
      "YYYY-MM-DDTHH:mm:ss.SSSZ"
    ];

    let m = momentFn(str, formats, false);
    if (m && m.isValid()) return m;

    m = momentFn(str);
    if (m && m.isValid()) return m;

    m = momentFn(new Date(str));
    if (m && m.isValid()) return m;

    return null;
  }

  /**
   * Scans notes for deadlines, verifies status & progress, and sorts by urgency
   */
  public async getDeadlines(settings: OSDashboardSettings): Promise<DeadlineItem[]> {
    let rawFolders = (settings.deadlinesFolders || "").trim();
    if (rawFolders === "03 Projects") rawFolders = "";
    const folderList = parseFolderList(rawFolders);

    const deadlineProp = (settings.deadlineProp || "target_completion_date").toLowerCase().trim();
    const completedProp = (settings.deadlineCompletedProp || "completed_date").toLowerCase().trim();
    const statusProp = (settings.deadlineStatusProp || "status").toLowerCase().trim();

    // Exclude target_completion_date and deadline synonyms from completion aliases
    const completedPropAliases = Array.from(new Set([
      completedProp,
      "completed_date",
      "completeddate",
      "finished_date",
      "finisheddate",
      "closed_date",
      "closeddate",
      "done_date",
      "donedate",
      "completed"
    ].map(s => s.toLowerCase().trim())));

    // Fallback property names for deadline / target date
    const deadlinePropAliases = Array.from(new Set([
      deadlineProp,
      "target_completion_date",
      "targetcompletiondate",
      "target_date",
      "targetdate",
      "target",
      "deadline",
      "due_date",
      "duedate",
      "due",
      "end_date",
      "enddate"
    ].map(s => s.toLowerCase().trim())));

    const allFiles = this.app.vault.getMarkdownFiles();
    const items: DeadlineItem[] = [];

    const momentFn = (window as any).moment || moment;
    const today = momentFn().startOf("day");

    for (const file of allFiles) {
      if (file.path.startsWith(".")) continue;

      // Filter by folder(s) ONLY IF non-empty
      if (folderList.length > 0 && !isPathInFolderList(file.path, folderList)) {
        continue;
      }

      let cache = this.app.metadataCache.getFileCache(file);
      let frontmatter: Record<string, any> | undefined = cache?.frontmatter;

      // Fallback: If cache has no frontmatter yet (e.g. freshly created note), read file header
      if (!frontmatter) {
        try {
          const content = await this.app.vault.read(file);
          if (content.startsWith("---")) {
            const endIdx = content.indexOf("\n---", 3);
            if (endIdx > 0) {
              const yamlBlock = content.slice(3, endIdx);
              frontmatter = {};
              const lines = yamlBlock.split("\n");
              for (const line of lines) {
                const colonIdx = line.indexOf(":");
                if (colonIdx > 0) {
                  const k = line.slice(0, colonIdx).trim();
                  const v = line.slice(colonIdx + 1).trim();
                  if (k) frontmatter[k] = v;
                }
              }
            }
          }
        } catch {
          // ignore read error
        }
      }

      if (!frontmatter) continue;

      // 1. DEADLINE PROPERTY: Decides if this note has a deadline to track
      let rawDeadlineVal: any = null;
      let matchedDeadlineKey = "";

      for (const [key, val] of Object.entries(frontmatter)) {
        const k = key.toLowerCase().trim();
        const kClean = k.replace(/[-_ ]/g, "");
        const isMatch = deadlinePropAliases.some(alias => {
          const aClean = alias.replace(/[-_ ]/g, "");
          return k === alias || kClean === aClean;
        });

        if (isMatch && val !== undefined && val !== null && String(val).trim() !== "") {
          rawDeadlineVal = val;
          matchedDeadlineKey = key;
          break;
        }
      }

      // If no deadline property is set, it does not belong in the deadline widget
      if (rawDeadlineVal === undefined || rawDeadlineVal === null) continue;

      const mDate = this.parseDeadlineDate(rawDeadlineVal);
      if (!mDate || !mDate.isValid()) continue;

      const strDeadline = mDate.format("YYYY-MM-DD");

      // 2. COMPLETION CHECK: Decides if the project milestone is finished
      // NOTE: matchedDeadlineKey is NEVER considered as the completion property!
      let isCompleted = false;

      for (const [key, val] of Object.entries(frontmatter)) {
        if (key === matchedDeadlineKey) continue;

        const cleanKey = key.toLowerCase().trim().replace(/[-_ ]/g, "");
        const isCompletedKey = completedPropAliases.some(alias => {
          const aClean = alias.replace(/[-_ ]/g, "");
          return cleanKey === alias || cleanKey === aClean;
        });

        if (isCompletedKey && val !== undefined && val !== null) {
          const strVal = String(val).trim().toLowerCase();
          if (strVal !== "" && strVal !== "false" && strVal !== "null" && strVal !== "undefined") {
            isCompleted = true;
            break;
          }
        }
      }

      // If completed_date is filled or true, milestone is finished -> do not show in deadline widget
      if (isCompleted) continue;

      // 3. READ STATUS: Purely for displaying the label pill (e.g. evolve, need-review, in-progress)
      let fileStatus = "";
      for (const [key, val] of Object.entries(frontmatter)) {
        const cleanKey = key.toLowerCase().trim().replace(/[-_ ]/g, "");
        if (cleanKey === statusProp.replace(/[-_ ]/g, "") && val !== undefined && val !== null) {
          fileStatus = String(val).trim();
          break;
        }
      }

      // Calculate Days Left
      const targetDay = mDate.clone().startOf("day");
      const daysLeft = targetDay.diff(today, "days");
      const isOverdue = daysLeft < 0;
      const isToday = daysLeft === 0;

      // Calculate time progress ratio according to current date vs deadline
      let startMoment: any = null;
      const startAliases = ["start_date", "start", "started", "startdate", "created", "created_date", "date"];
      for (const [key, val] of Object.entries(frontmatter)) {
        const cleanK = key.toLowerCase().trim().replace(/[-_ ]/g, "");
        if (startAliases.some(a => a.replace(/[-_ ]/g, "") === cleanK) && val) {
          startMoment = this.parseDeadlineDate(val);
          if (startMoment && startMoment.isValid()) break;
        }
      }

      if (!startMoment || !startMoment.isValid()) {
        if (file.stat?.ctime) {
          startMoment = momentFn(file.stat.ctime).startOf("day");
        } else {
          startMoment = targetDay.clone().subtract(14, "days");
        }
      }

      const totalDays = targetDay.diff(startMoment, "days");
      let timeProgress = 0;

      if (isOverdue || isToday) {
        timeProgress = 100;
      } else if (totalDays <= 0) {
        timeProgress = 100;
      } else {
        const elapsedDays = today.diff(startMoment, "days");
        if (elapsedDays <= 0) {
          timeProgress = 0;
        } else {
          timeProgress = Math.min(100, Math.max(0, Math.round((elapsedDays / totalDays) * 100)));
        }
      }

      let formattedTimeLeft = "";
      let fullTimeDescription = "";

      if (isOverdue) {
        const absDays = Math.abs(daysLeft);
        if (absDays === 1) {
          formattedTimeLeft = "-1d";
          fullTimeDescription = `Overdue by 1 day (Target: ${mDate.format("MMM D, YYYY")})`;
        } else if (absDays < 14) {
          formattedTimeLeft = `-${absDays}d`;
          fullTimeDescription = `Overdue by ${absDays} days (Target: ${mDate.format("MMM D, YYYY")})`;
        } else if (absDays < 60) {
          const weeks = Math.floor(absDays / 7);
          formattedTimeLeft = `-${weeks}w`;
          fullTimeDescription = `Overdue by ${weeks} weeks (Target: ${mDate.format("MMM D, YYYY")})`;
        } else {
          const months = Math.floor(absDays / 30);
          formattedTimeLeft = `-${months}m`;
          fullTimeDescription = `Overdue by ${months} months (Target: ${mDate.format("MMM D, YYYY")})`;
        }
      } else if (isToday) {
        formattedTimeLeft = "Today";
        fullTimeDescription = `Due today (${mDate.format("MMM D, YYYY")})`;
      } else if (daysLeft === 1) {
        formattedTimeLeft = "1d";
        fullTimeDescription = `Due tomorrow (${mDate.format("MMM D, YYYY")})`;
      } else if (daysLeft < 14) {
        formattedTimeLeft = `${daysLeft}d`;
        fullTimeDescription = `${daysLeft} days remaining (Target: ${mDate.format("MMM D, YYYY")})`;
      } else if (daysLeft < 60) {
        const weeks = Math.round(daysLeft / 7);
        formattedTimeLeft = `${weeks}w`;
        fullTimeDescription = `${weeks} weeks remaining (Target: ${mDate.format("MMM D, YYYY")})`;
      } else {
        const months = Math.round(daysLeft / 30);
        formattedTimeLeft = `${months}m`;
        fullTimeDescription = `${months} months remaining (Target: ${mDate.format("MMM D, YYYY")})`;
      }

      const folderIcon = this.iconService.resolveFileFolderIcon(file, settings);

      items.push({
        title: file.basename,
        file,
        deadlineDate: strDeadline,
        daysLeft,
        isOverdue,
        isToday,
        formattedTimeLeft,
        fullTimeDescription,
        status: fileStatus,
        timeProgress,
        resolvedIcon: folderIcon,
        colorHex: folderIcon.color || DeadlineService.DEADLINE_COLORS[items.length % DeadlineService.DEADLINE_COLORS.length]
      });
    }

    // Sort: most overdue first, then today, then upcoming ascending
    items.sort((a, b) => a.daysLeft - b.daysLeft);

    return items;
  }
}
