import { App, Modal, Setting, Notice } from "obsidian";
import { CalendarEventItem, EventRecurrenceType, moment } from "../types";

export class EventModal extends Modal {
  private event: CalendarEventItem | null;
  private defaultDate: string;
  private onSave: (event: CalendarEventItem) => Promise<void>;
  private onDelete?: (eventId: string) => Promise<void>;

  private title: string = "";
  private startDate: string = "";
  private endDate: string = "";
  private isAllDay: boolean = true;
  private startTime: string = "09:00";
  private endTime: string = "10:00";
  private color: string = "#3b82f6";
  private location: string = "";
  private description: string = "";
  
  // Recurrence
  private recurrenceType: EventRecurrenceType = "none";
  private intervalDays: number = 2;
  private recurrenceUntil: string = "";

  // Notification
  private enableNotification: boolean = true;
  private notificationLeadMinutes: number = 10;

  private colors = [
    { label: "Blue", hex: "#3b82f6" },
    { label: "Emerald", hex: "#10b981" },
    { label: "Grape", hex: "#8b5cf6" },
    { label: "Amber", hex: "#f59e0b" },
    { label: "Flamingo", hex: "#ef4444" },
    { label: "Peacock", hex: "#06b6d4" },
    { label: "Pink", hex: "#ec4899" },
    { label: "Indigo", hex: "#6366f1" }
  ];

  constructor(
    app: App,
    event: CalendarEventItem | null,
    defaultDate: string,
    onSave: (event: CalendarEventItem) => Promise<void>,
    onDelete?: (eventId: string) => Promise<void>
  ) {
    super(app);
    this.event = event;
    this.defaultDate = defaultDate || moment().format("YYYY-MM-DD");
    this.onSave = onSave;
    this.onDelete = onDelete;

    if (event) {
      this.title = event.title;
      this.startDate = event.startDate;
      this.endDate = event.endDate || event.startDate;
      this.isAllDay = event.isAllDay;
      this.startTime = event.startTime || "09:00";
      this.endTime = event.endTime || "10:00";
      this.color = event.color || "#3b82f6";
      this.location = event.location || "";
      this.description = event.description || "";
      if (event.recurrence) {
        this.recurrenceType = event.recurrence.type;
        this.intervalDays = event.recurrence.intervalDays || 2;
        this.recurrenceUntil = event.recurrence.until || "";
      }
      this.enableNotification = event.enableNotification !== false;
      this.notificationLeadMinutes = event.notificationLeadMinutes !== undefined ? event.notificationLeadMinutes : 10;
    } else {
      this.startDate = this.defaultDate;
      this.endDate = this.defaultDate;
    }
  }

  public onOpen(): void {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("os-event-edit-modal");

    contentEl.createEl("h2", { text: this.event ? "Edit Event" : "Create New Event" });

    // Title
    new Setting(contentEl)
      .setName("Event Title")
      .setDesc("Title of the event or birthday (e.g., Team Sync, John's Birthday, Gym Workout).")
      .addText(text => {
        text.setValue(this.title)
          .setPlaceholder("e.g. Alex's Birthday")
          .onChange(val => {
            this.title = val;
          });
      });

    // Date
    new Setting(contentEl)
      .setName("Date")
      .setDesc("Date of event occurrence.")
      .addText(text => {
        text.inputEl.type = "date";
        text.setValue(this.startDate)
          .onChange(val => {
            this.startDate = val;
            if (!this.endDate || this.endDate < val) {
              this.endDate = val;
            }
          });
      });

    // All-day Toggle
    let timeSetting: Setting | null = null;
    new Setting(contentEl)
      .setName("All-day Event")
      .setDesc("Check for birthdays, holidays, or all-day milestones.")
      .addToggle(toggle => {
        toggle.setValue(this.isAllDay)
          .onChange(val => {
            this.isAllDay = val;
            if (timeSetting) {
              timeSetting.settingEl.style.display = val ? "none" : "flex";
            }
          });
      });

    // Time Setting (conditional)
    timeSetting = new Setting(contentEl)
      .setName("Time (Start & End)")
      .setDesc("Set start and end time in 24h format (HH:mm).");
    
    timeSetting.addText(text => {
      text.inputEl.type = "time";
      text.setValue(this.startTime)
        .onChange(val => {
          this.startTime = val;
        });
    });

    timeSetting.addText(text => {
      text.inputEl.type = "time";
      text.setValue(this.endTime)
        .onChange(val => {
          this.endTime = val;
        });
    });

    timeSetting.settingEl.style.display = this.isAllDay ? "none" : "flex";

    // Recurrence / Repeat
    let intervalSetting: Setting | null = null;
    let untilSetting: Setting | null = null;

    new Setting(contentEl)
      .setName("Repeat")
      .setDesc("Set recurrence frequency (like in Google Calendar).")
      .addDropdown(dd => {
        dd.addOption("none", "Does not repeat");
        dd.addOption("custom_days", "Every after N days...");
        dd.addOption("daily", "Every day");
        dd.addOption("weekly", "Every week");
        dd.addOption("monthly", "Every month");
        dd.addOption("yearly", "Every year (Birthday / Anniversary)");
        dd.setValue(this.recurrenceType);
        dd.onChange(val => {
          this.recurrenceType = val as EventRecurrenceType;
          updateRecurrenceUI();
        });
      });

    // Repeat Interval Days (e.g. Every after N days)
    intervalSetting = new Setting(contentEl)
      .setName("Repeat Interval")
      .setDesc("Repeat every after how many days (e.g. 2 for every 2nd day).")
      .addText(text => {
        text.inputEl.type = "number";
        text.inputEl.min = "1";
        text.inputEl.max = "365";
        text.setValue(String(this.intervalDays))
          .onChange(val => {
            const num = parseInt(val, 10);
            if (!isNaN(num) && num > 0) {
              this.intervalDays = num;
            }
          });
      });

    // Repeat Until
    untilSetting = new Setting(contentEl)
      .setName("Repeat Until")
      .setDesc("Optional end date for repetition (leave blank to repeat indefinitely).")
      .addText(text => {
        text.inputEl.type = "date";
        text.setValue(this.recurrenceUntil)
          .onChange(val => {
            this.recurrenceUntil = val;
          });
      });

    const updateRecurrenceUI = () => {
      const showInterval = this.recurrenceType === "custom_days" || this.recurrenceType === "daily";
      const showUntil = this.recurrenceType !== "none";
      if (intervalSetting) intervalSetting.settingEl.style.display = showInterval ? "flex" : "none";
      if (untilSetting) untilSetting.settingEl.style.display = showUntil ? "flex" : "none";
    };

    updateRecurrenceUI();

    // Event Color Picker (Google Material Palette)
    const colorSetting = new Setting(contentEl)
      .setName("Color Accent")
      .setDesc("Choose an Android Calendar Material You color.");

    const swatchWrap = colorSetting.controlEl.createDiv({ cls: "os-color-swatches" });
    for (const c of this.colors) {
      const swatch = swatchWrap.createDiv({
        cls: `os-color-swatch ${this.color === c.hex ? "is-selected" : ""}`,
        title: c.label
      });
      swatch.style.backgroundColor = c.hex;
      swatch.addEventListener("click", () => {
        this.color = c.hex;
        swatchWrap.querySelectorAll(".os-color-swatch").forEach(s => s.removeClass("is-selected"));
        swatch.addClass("is-selected");
      });
    }

    // Location
    new Setting(contentEl)
      .setName("Location")
      .setDesc("Optional venue, address, or meeting URL.")
      .addText(text => {
        text.setValue(this.location)
          .setPlaceholder("e.g. Room 402, Zoom, or Starbucks")
          .onChange(val => {
            this.location = val;
          });
      });

    // Description / Notes
    new Setting(contentEl)
      .setName("Description")
      .setDesc("Notes or agenda for this event.")
      .addTextArea(ta => {
        ta.setValue(this.description)
          .setPlaceholder("Add notes or agenda...")
          .onChange(val => {
            this.description = val;
          });
      });

    // Notifications
    let leadTimeSetting: Setting | null = null;
    new Setting(contentEl)
      .setName("Reminders & Notification")
      .setDesc("Receive notification before this event starts.")
      .addToggle(toggle => {
        toggle.setValue(this.enableNotification)
          .onChange(val => {
            this.enableNotification = val;
            if (leadTimeSetting) {
              leadTimeSetting.settingEl.style.display = val ? "flex" : "none";
            }
          });
      });

    leadTimeSetting = new Setting(contentEl)
      .setName("Notification Lead Time")
      .setDesc("When to trigger the reminder notice.")
      .addDropdown(dd => {
        dd.addOption("0", "At time of event");
        dd.addOption("5", "5 minutes before");
        dd.addOption("10", "10 minutes before");
        dd.addOption("15", "15 minutes before");
        dd.addOption("30", "30 minutes before");
        dd.addOption("60", "1 hour before");
        dd.addOption("1440", "1 day before");
        dd.setValue(String(this.notificationLeadMinutes));
        dd.onChange(val => {
          this.notificationLeadMinutes = parseInt(val, 10);
        });
      });

    leadTimeSetting.settingEl.style.display = this.enableNotification ? "flex" : "none";

    // Footer Buttons
    const footerEl = contentEl.createDiv({ cls: "os-modal-footer" });

    if (this.event && this.onDelete) {
      const deleteBtn = footerEl.createEl("button", {
        cls: "mod-warning os-modal-delete-btn",
        text: "Delete Event"
      });
      deleteBtn.addEventListener("click", async () => {
        if (confirm(`Delete event "${this.title || "Untitled"}"?`)) {
          if (this.onDelete && this.event) {
            await this.onDelete(this.event.id);
          }
          this.close();
        }
      });
    }

    const cancelBtn = footerEl.createEl("button", { text: "Cancel" });
    cancelBtn.addEventListener("click", () => this.close());

    const saveBtn = footerEl.createEl("button", {
      cls: "mod-cta",
      text: this.event ? "Save Changes" : "Create Event"
    });

    saveBtn.addEventListener("click", async () => {
      const cleanTitle = this.title.trim();
      if (!cleanTitle) {
        new Notice("Please enter an event title.");
        return;
      }
      if (!this.startDate) {
        new Notice("Please select a date.");
        return;
      }

      const eventItem: CalendarEventItem = {
        id: this.event ? this.event.id : `local-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        title: cleanTitle,
        startDate: this.startDate,
        endDate: this.endDate || this.startDate,
        isAllDay: this.isAllDay,
        startTime: this.isAllDay ? undefined : this.startTime,
        endTime: this.isAllDay ? undefined : this.endTime,
        color: this.color,
        location: this.location.trim() || undefined,
        description: this.description.trim() || undefined,
        source: "local",
        enableNotification: this.enableNotification,
        notificationLeadMinutes: this.notificationLeadMinutes,
        recurrence: this.recurrenceType !== "none" ? {
          type: this.recurrenceType,
          intervalDays: this.intervalDays,
          until: this.recurrenceUntil || undefined
        } : undefined
      };

      await this.onSave(eventItem);
      new Notice(`✅ Event "${cleanTitle}" saved!`);
      this.close();
    });
  }

  public onClose(): void {
    const { contentEl } = this;
    contentEl.empty();
  }
}
