import { App, Modal, Setting, Notice } from "obsidian";
import { StreakItem, HabitFrequency, HabitScheduleType, HabitFreezePeriod, moment } from "../types";

export class StreakModal extends Modal {
  private streak: StreakItem | null;
  private onSave: (item: StreakItem) => Promise<void>;
  private name: string = "";
  private description: string = "";
  private icon: string = "flame";
  private frequency: HabitFrequency = "daily";
  private scheduleType: HabitScheduleType = "flexible";
  private fixedDayOfWeek: number = 1; // 1 = Monday
  private fixedDayOfMonth: number = 1;
  private fixedDateOfYear: string = "12-31";
  private startDate: string = moment().format("YYYY-MM-DD");
  private freezePeriodType: HabitFreezePeriod = "monthly";
  private freezeQuota: number = 4;
  private autoPopulate: boolean = true;
  private autoFreeze: boolean = true;

  constructor(
    app: App,
    streak: StreakItem | null,
    onSave: (item: StreakItem) => Promise<void>
  ) {
    super(app);
    this.streak = streak;
    this.onSave = onSave;

    if (streak) {
      this.name = streak.name;
      this.description = streak.description || "";
      this.icon = streak.icon || "flame";
      this.frequency = streak.frequency || "daily";
      this.scheduleType = streak.scheduleType || "flexible";
      this.fixedDayOfWeek = streak.fixedDayOfWeek ?? 1;
      this.fixedDayOfMonth = streak.fixedDayOfMonth ?? 1;
      this.fixedDateOfYear = streak.fixedDateOfYear || "12-31";
      this.startDate = streak.startDate || moment().format("YYYY-MM-DD");
      this.freezePeriodType = streak.freezePeriodType || "monthly";
      this.freezeQuota = streak.freezeQuota ?? streak.maxFreezesPerMonth ?? 4;
      this.autoPopulate = streak.autoPopulate !== false;
      this.autoFreeze = streak.autoFreeze !== false;
    }
  }

  public onOpen(): void {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("os-streak-edit-modal");

    contentEl.createEl("h2", { text: this.streak ? "Edit Habit" : "Add New Habit" });

    // Name setting (always editable)
    new Setting(contentEl)
      .setName("Habit Name")
      .setDesc("The activity or habit name (e.g. Reading, Weekly Article, Annual Review).")
      .addText(text => {
        text.setValue(this.name)
          .setPlaceholder("e.g. Publish Weekly Article")
          .onChange(val => {
            this.name = val;
          });
      });

    // Description setting (always editable, optional, max 150 chars)
    const descSetting = new Setting(contentEl)
      .setName("Description (Optional)")
      .setDesc("Brief description or motivation (max 150 characters).");

    const charCountEl = descSetting.descEl.createDiv({ cls: "os-char-counter" });
    charCountEl.style.cssText = "font-size: 11px; color: var(--text-muted); margin-top: 4px;";
    charCountEl.textContent = `${this.description.length}/150`;

    descSetting.addTextArea(text => {
      text.setValue(this.description)
        .setPlaceholder("e.g. 20 pages before bed or after morning workout")
        .onChange(val => {
          if (val.length > 150) {
            val = val.substring(0, 150);
            text.setValue(val);
          }
          this.description = val;
          charCountEl.textContent = `${this.description.length}/150`;
        });
      text.inputEl.rows = 2;
      text.inputEl.maxLength = 150;
      text.inputEl.addClass("os-streak-desc-input");
    });

    // When creating a new habit, allow configuring frequency, schedule mode, icon, start date, freeze options
    if (!this.streak) {
      // Frequency setting
      new Setting(contentEl)
        .setName("Frequency")
        .setDesc("How often this habit should be completed.")
        .addDropdown(drop => {
          drop.addOption("daily", "Daily (Every day)")
            .addOption("weekly", "Weekly (Once a week)")
            .addOption("monthly", "Monthly (Once a month)")
            .addOption("yearly", "Yearly (Once a year)")
            .setValue(this.frequency)
            .onChange(val => {
              this.frequency = val as HabitFrequency;
              if (this.frequency !== "daily") {
                this.autoPopulate = false;
              } else {
                this.autoPopulate = true;
              }
              renderScheduleSettings();
            });
        });

      // Schedule container (only shown for non-daily habits)
      const scheduleContainer = contentEl.createDiv({ cls: "os-habit-schedule-container" });

      const renderScheduleSettings = () => {
        scheduleContainer.empty();
        if (this.frequency === "daily") {
          return;
        }

        // Schedule Mode: Flexible vs Fixed
        new Setting(scheduleContainer)
          .setName("Schedule Mode")
          .setDesc("Choose whether you have a flexible window or a fixed target day.")
          .addDropdown(drop => {
            drop.addOption("flexible", `Flexible (Any time during the ${this.frequency})`)
              .addOption("fixed", "Fixed (On a specific day)")
              .setValue(this.scheduleType)
              .onChange(val => {
                this.scheduleType = val as HabitScheduleType;
                renderScheduleSettings();
              });
          });

        if (this.scheduleType === "fixed") {
          if (this.frequency === "weekly") {
            new Setting(scheduleContainer)
              .setName("Target Day of Week")
              .setDesc("The habit will auto-populate into today's tasks on this day.")
              .addDropdown(drop => {
                drop.addOption("1", "Monday")
                  .addOption("2", "Tuesday")
                  .addOption("3", "Wednesday")
                  .addOption("4", "Thursday")
                  .addOption("5", "Friday")
                  .addOption("6", "Saturday")
                  .addOption("0", "Sunday")
                  .setValue(String(this.fixedDayOfWeek))
                  .onChange(val => {
                    this.fixedDayOfWeek = parseInt(val, 10);
                  });
              });
          } else if (this.frequency === "monthly") {
            new Setting(scheduleContainer)
              .setName("Target Day of Month")
              .setDesc("Day of the month to auto-populate (1 - 31).")
              .addText(text => {
                text.inputEl.type = "number";
                text.inputEl.min = "1";
                text.inputEl.max = "31";
                text.setValue(String(this.fixedDayOfMonth));
                text.onChange(val => {
                  const n = parseInt(val, 10);
                  this.fixedDayOfMonth = isNaN(n) ? 1 : Math.max(1, Math.min(31, n));
                });
              });
          } else if (this.frequency === "yearly") {
            new Setting(scheduleContainer)
              .setName("Target Date of Year")
              .setDesc("Format: MM-DD (e.g. 12-31 for Dec 31).")
              .addText(text => {
                text.setValue(this.fixedDateOfYear);
                text.setPlaceholder("12-31");
                text.onChange(val => {
                  this.fixedDateOfYear = val.trim();
                });
              });
          }
        }
      };

      renderScheduleSettings();

      // Icon setting
      new Setting(contentEl)
        .setName("Lucide Icon")
        .setDesc("Icon name (e.g. flame, book-open, pen-tool, crosshair, pencil, code-2, zap).")
        .addText(text => {
          text.setValue(this.icon)
            .setPlaceholder("flame")
            .onChange(val => {
              this.icon = val.trim();
            });
        });

      // Start Date setting
      new Setting(contentEl)
        .setName("Start Date")
        .setDesc("The habit will only begin tracking from this date onwards.")
        .addText(text => {
          text.inputEl.type = "date";
          text.setValue(this.startDate)
            .onChange(val => {
              if (val) this.startDate = val;
            });
        });

      // Freeze Period Option
      new Setting(contentEl)
        .setName("Freeze Allowance Reset")
        .setDesc("How often your freeze allowance resets.")
        .addDropdown(drop => {
          drop.addOption("weekly", "Weekly")
            .addOption("monthly", "Monthly (Default)")
            .addOption("yearly", "Yearly")
            .setValue(this.freezePeriodType)
            .onChange(val => {
              this.freezePeriodType = val as HabitFreezePeriod;
            });
        });

      // Freeze Quota Count Option
      new Setting(contentEl)
        .setName("Freeze Quota Count")
        .setDesc("Number of freeze days/skips allowed per period (e.g. 4 per month, or 2 per year).")
        .addText(text => {
          text.inputEl.type = "number";
          text.inputEl.min = "0";
          text.setValue(String(this.freezeQuota));
          text.onChange(val => {
            const n = parseInt(val, 10);
            this.freezeQuota = isNaN(n) ? 4 : Math.max(0, n);
          });
        });

      // Auto-populate toggle
      new Setting(contentEl)
        .setName("Auto-populate in Daily Tasks")
        .setDesc("Automatically add to today's plan when scheduled.")
        .addToggle(toggle => {
          toggle.setValue(this.autoPopulate)
            .onChange(val => {
              this.autoPopulate = val;
            });
        });

      // Auto-freeze toggle
      new Setting(contentEl)
        .setName("Auto-Freeze if Missed")
        .setDesc("Automatically use a freeze from this habit's allowance if missed.")
        .addToggle(toggle => {
          toggle.setValue(this.autoFreeze)
            .onChange(val => {
              this.autoFreeze = val;
            });
        });
    }

    // Save and Cancel buttons
    new Setting(contentEl)
      .addButton(btn => {
        btn.setButtonText(this.streak ? "Save Changes" : "Create Habit")
          .setCta()
          .onClick(async () => {
            const cleanName = this.name.trim();
            if (!cleanName) {
              new Notice("Please provide a habit name.");
              return;
            }

            const item: StreakItem = {
              id: this.streak ? this.streak.id : `habit-${cleanName.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
              name: cleanName,
              description: this.description.trim() ? this.description.trim().substring(0, 150) : undefined,
              icon: this.streak ? this.streak.icon : (this.icon || "flame"),
              frequency: this.streak ? (this.streak.frequency || "daily") : this.frequency,
              scheduleType: this.streak ? (this.streak.scheduleType || "flexible") : this.scheduleType,
              fixedDayOfWeek: this.streak ? this.streak.fixedDayOfWeek : (this.scheduleType === "fixed" && this.frequency === "weekly" ? this.fixedDayOfWeek : undefined),
              fixedDayOfMonth: this.streak ? this.streak.fixedDayOfMonth : (this.scheduleType === "fixed" && this.frequency === "monthly" ? this.fixedDayOfMonth : undefined),
              fixedDateOfYear: this.streak ? this.streak.fixedDateOfYear : (this.scheduleType === "fixed" && this.frequency === "yearly" ? this.fixedDateOfYear : undefined),
              currentStreak: this.streak ? this.streak.currentStreak : 0,
              bestStreak: this.streak ? this.streak.bestStreak : 0,
              createdDate: this.streak ? this.streak.createdDate : moment().format("YYYY-MM-DD HH:mm"),
              startDate: this.streak ? this.streak.startDate : this.startDate,
              lastCompletedDate: this.streak ? this.streak.lastCompletedDate : undefined,
              lastCompletedCycle: this.streak ? this.streak.lastCompletedCycle : undefined,
              history: this.streak ? this.streak.history : [],
              frozenUntil: this.streak ? this.streak.frozenUntil : null,
              freezeHistory: this.streak ? this.streak.freezeHistory : [],
              freezePeriodType: this.streak ? (this.streak.freezePeriodType || "monthly") : this.freezePeriodType,
              freezeQuota: this.streak ? (this.streak.freezeQuota ?? 4) : this.freezeQuota,
              maxFreezesPerMonth: this.streak ? (this.streak.freezeQuota ?? 4) : this.freezeQuota,
              autoPopulate: this.streak ? this.streak.autoPopulate : this.autoPopulate,
              autoFreeze: this.streak ? (this.streak.autoFreeze ?? this.autoFreeze) : this.autoFreeze
            };

            await this.onSave(item);
            this.close();
          });
      })
      .addButton(btn => {
        btn.setButtonText("Cancel")
          .onClick(() => {
            this.close();
          });
      });
  }

  public onClose(): void {
    this.contentEl.empty();
  }
}
