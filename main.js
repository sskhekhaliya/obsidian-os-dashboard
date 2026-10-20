"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => OSDashboardPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian19 = require("obsidian");

// src/types.ts
var moment = (...args) => {
  return window.moment(...args);
};
moment.utc = (...args) => window.moment?.utc(...args);
var DEFAULT_SETTINGS = {
  bannerPath: "",
  vaultAvatarIcon: "home",
  vaultTitle: "SSK_OS",
  vaultSubtitle: "Think \u2022 Learn \u2022 Build \u2022 Create \u2022 Grow",
  quoteTop: "A better me\na brighter tomorrow.",
  quoteMain: "\u201CDiscipline today creates the freedom tomorrow.\u201D",
  clockSubtitle: "Small steps every day\nlead to big results.",
  homeKeywords: ["Home", "Index", "MOC"],
  matchFolderName: true,
  newFilePattern: "YYYY-MM-DD HH-mm",
  dailyTasksFile: "Daily Tasks.md",
  dailyLogFile: "Daily Log.md",
  autoLogToDailyLog: true,
  weeklyTasksFile: "Weekly Tasks.md",
  habitsFile: "Habits.md",
  archiveHabitsFile: "99 Archive/Habit.md",
  maxFreezesPerMonth: 4,
  quickCaptureFolder: "00 Inbox",
  projectsFolder: "03 Projects",
  projectStatusProp: "status",
  projectStatusValues: ["in-progress", "active", "ongoing"],
  projectProgressProp: "progress",
  recentNotesLimit: 8,
  recentNotesExcludeFolders: ["Templates", ".trash"],
  ignoredFolders: ["_attachments", "_scripts", "_templates", "Templates", ".trash"],
  links: [
    { id: "1", title: "Lichess", url: "https://lichess.org", icon: "gamepad-2" },
    { id: "2", title: "Chess.com", url: "https://chess.com", icon: "crosshair" },
    { id: "3", title: "YouTube", url: "https://youtube.com", icon: "youtube" },
    { id: "4", title: "GitHub", url: "https://github.com", icon: "github" },
    { id: "5", title: "Notion", url: "https://notion.so", icon: "book-open" },
    { id: "6", title: "Google Drive", url: "https://drive.google.com", icon: "hard-drive" },
    { id: "7", title: "ChatGPT", url: "https://chatgpt.com", icon: "bot" },
    { id: "8", title: "LeetCode", url: "https://leetcode.com", icon: "code-2" }
  ],
  openOnStartup: true,
  openOnNewTab: false,
  showHeroBanner: true,
  showNavRibbon: true,
  showTodayTasks: true,
  showWeeklyTasks: true,
  showRecentNotes: true,
  showQuickCapture: true,
  showOngoingProjects: true,
  showBookmarks: true,
  // Right Rail Widgets
  showRightRail: true,
  showCalendar: true,
  showGraphView: true,
  showStreaks: true,
  showRightQuote: true,
  rightRailQuote: "\u201CConsistency is more important than intensity.\u201D",
  rightRailQuoteAuthor: "",
  streaks: [],
  // Google Calendar Integration Defaults
  googleCalendarUrl: "",
  googleCalendarAutoSync: true,
  enableCalendarNotifications: true,
  calendarNotificationLeadMinutes: 10,
  cachedCalendarEvents: [],
  localCalendarEvents: [],
  calendarEventsFile: "Events.md",
  lastCalendarSyncTime: 0,
  customWidgets: [],
  widgetLayout: {
    col1: ["todayTasks", "weeklyTasks"],
    col2: ["recentNotes", "quickCapture"],
    col3: ["ongoingProjects", "bookmarks"],
    rail: ["calendar", "streaks", "graphView", "rightQuote"]
  }
};
function hexToRgb(hex) {
  const clean = (hex || "").replace("#", "").trim();
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16);
    const g = parseInt(clean[1] + clean[1], 16);
    const b = parseInt(clean[2] + clean[2], 16);
    return `${r}, ${g}, ${b}`;
  }
  if (clean.length === 6) {
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    return `${r}, ${g}, ${b}`;
  }
  return "59, 130, 246";
}

// src/settings.ts
var import_obsidian5 = require("obsidian");

// src/modals/streakModal.ts
var import_obsidian = require("obsidian");
var StreakModal = class extends import_obsidian.Modal {
  constructor(app, streak, onSave) {
    super(app);
    this.name = "";
    this.description = "";
    this.icon = "flame";
    this.frequency = "daily";
    this.scheduleType = "flexible";
    this.fixedDayOfWeek = 1;
    // 1 = Monday
    this.fixedDayOfMonth = 1;
    this.fixedDateOfYear = "12-31";
    this.startDate = moment().format("YYYY-MM-DD");
    this.freezePeriodType = "monthly";
    this.freezeQuota = 4;
    this.autoPopulate = true;
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
    }
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("os-streak-edit-modal");
    contentEl.createEl("h2", { text: this.streak ? "Edit Habit" : "Add New Habit" });
    new import_obsidian.Setting(contentEl).setName("Habit Name").setDesc("The activity or habit name (e.g. Reading, Weekly Article, Annual Review).").addText((text) => {
      text.setValue(this.name).setPlaceholder("e.g. Publish Weekly Article").onChange((val) => {
        this.name = val;
      });
    });
    const descSetting = new import_obsidian.Setting(contentEl).setName("Description (Optional)").setDesc("Brief description or motivation (max 150 characters).");
    const charCountEl = descSetting.descEl.createDiv({ cls: "os-char-counter" });
    charCountEl.style.cssText = "font-size: 11px; color: var(--text-muted); margin-top: 4px;";
    charCountEl.textContent = `${this.description.length}/150`;
    descSetting.addTextArea((text) => {
      text.setValue(this.description).setPlaceholder("e.g. 20 pages before bed or after morning workout").onChange((val) => {
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
    if (!this.streak) {
      new import_obsidian.Setting(contentEl).setName("Frequency").setDesc("How often this habit should be completed.").addDropdown((drop) => {
        drop.addOption("daily", "Daily (Every day)").addOption("weekly", "Weekly (Once a week)").addOption("monthly", "Monthly (Once a month)").addOption("yearly", "Yearly (Once a year)").setValue(this.frequency).onChange((val) => {
          this.frequency = val;
          if (this.frequency !== "daily") {
            this.autoPopulate = false;
          } else {
            this.autoPopulate = true;
          }
          renderScheduleSettings();
        });
      });
      const scheduleContainer = contentEl.createDiv({ cls: "os-habit-schedule-container" });
      const renderScheduleSettings = () => {
        scheduleContainer.empty();
        if (this.frequency === "daily") {
          return;
        }
        new import_obsidian.Setting(scheduleContainer).setName("Schedule Mode").setDesc("Choose whether you have a flexible window or a fixed target day.").addDropdown((drop) => {
          drop.addOption("flexible", `Flexible (Any time during the ${this.frequency})`).addOption("fixed", "Fixed (On a specific day)").setValue(this.scheduleType).onChange((val) => {
            this.scheduleType = val;
            renderScheduleSettings();
          });
        });
        if (this.scheduleType === "fixed") {
          if (this.frequency === "weekly") {
            new import_obsidian.Setting(scheduleContainer).setName("Target Day of Week").setDesc("The habit will auto-populate into today's tasks on this day.").addDropdown((drop) => {
              drop.addOption("1", "Monday").addOption("2", "Tuesday").addOption("3", "Wednesday").addOption("4", "Thursday").addOption("5", "Friday").addOption("6", "Saturday").addOption("0", "Sunday").setValue(String(this.fixedDayOfWeek)).onChange((val) => {
                this.fixedDayOfWeek = parseInt(val, 10);
              });
            });
          } else if (this.frequency === "monthly") {
            new import_obsidian.Setting(scheduleContainer).setName("Target Day of Month").setDesc("Day of the month to auto-populate (1 - 31).").addText((text) => {
              text.inputEl.type = "number";
              text.inputEl.min = "1";
              text.inputEl.max = "31";
              text.setValue(String(this.fixedDayOfMonth));
              text.onChange((val) => {
                const n = parseInt(val, 10);
                this.fixedDayOfMonth = isNaN(n) ? 1 : Math.max(1, Math.min(31, n));
              });
            });
          } else if (this.frequency === "yearly") {
            new import_obsidian.Setting(scheduleContainer).setName("Target Date of Year").setDesc("Format: MM-DD (e.g. 12-31 for Dec 31).").addText((text) => {
              text.setValue(this.fixedDateOfYear);
              text.setPlaceholder("12-31");
              text.onChange((val) => {
                this.fixedDateOfYear = val.trim();
              });
            });
          }
        }
      };
      renderScheduleSettings();
      new import_obsidian.Setting(contentEl).setName("Lucide Icon").setDesc("Icon name (e.g. flame, book-open, pen-tool, crosshair, pencil, code-2, zap).").addText((text) => {
        text.setValue(this.icon).setPlaceholder("flame").onChange((val) => {
          this.icon = val.trim();
        });
      });
      new import_obsidian.Setting(contentEl).setName("Start Date").setDesc("The habit will only begin tracking from this date onwards.").addText((text) => {
        text.inputEl.type = "date";
        text.setValue(this.startDate).onChange((val) => {
          if (val) this.startDate = val;
        });
      });
      new import_obsidian.Setting(contentEl).setName("Freeze Allowance Reset").setDesc("How often your freeze allowance resets.").addDropdown((drop) => {
        drop.addOption("weekly", "Weekly").addOption("monthly", "Monthly (Default)").addOption("yearly", "Yearly").setValue(this.freezePeriodType).onChange((val) => {
          this.freezePeriodType = val;
        });
      });
      new import_obsidian.Setting(contentEl).setName("Freeze Quota Count").setDesc("Number of freeze days/skips allowed per period (e.g. 4 per month, or 2 per year).").addText((text) => {
        text.inputEl.type = "number";
        text.inputEl.min = "0";
        text.setValue(String(this.freezeQuota));
        text.onChange((val) => {
          const n = parseInt(val, 10);
          this.freezeQuota = isNaN(n) ? 4 : Math.max(0, n);
        });
      });
      new import_obsidian.Setting(contentEl).setName("Auto-populate in Daily Tasks").setDesc("Automatically add to today's plan when scheduled.").addToggle((toggle) => {
        toggle.setValue(this.autoPopulate).onChange((val) => {
          this.autoPopulate = val;
        });
      });
    }
    new import_obsidian.Setting(contentEl).addButton((btn) => {
      btn.setButtonText(this.streak ? "Save Changes" : "Create Habit").setCta().onClick(async () => {
        const cleanName = this.name.trim();
        if (!cleanName) {
          new import_obsidian.Notice("Please provide a habit name.");
          return;
        }
        const item = {
          id: this.streak ? this.streak.id : `habit-${cleanName.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
          name: cleanName,
          description: this.description.trim() ? this.description.trim().substring(0, 150) : void 0,
          icon: this.streak ? this.streak.icon : this.icon || "flame",
          frequency: this.streak ? this.streak.frequency || "daily" : this.frequency,
          scheduleType: this.streak ? this.streak.scheduleType || "flexible" : this.scheduleType,
          fixedDayOfWeek: this.streak ? this.streak.fixedDayOfWeek : this.scheduleType === "fixed" && this.frequency === "weekly" ? this.fixedDayOfWeek : void 0,
          fixedDayOfMonth: this.streak ? this.streak.fixedDayOfMonth : this.scheduleType === "fixed" && this.frequency === "monthly" ? this.fixedDayOfMonth : void 0,
          fixedDateOfYear: this.streak ? this.streak.fixedDateOfYear : this.scheduleType === "fixed" && this.frequency === "yearly" ? this.fixedDateOfYear : void 0,
          currentStreak: this.streak ? this.streak.currentStreak : 0,
          bestStreak: this.streak ? this.streak.bestStreak : 0,
          createdDate: this.streak ? this.streak.createdDate : moment().format("YYYY-MM-DD HH:mm"),
          startDate: this.streak ? this.streak.startDate : this.startDate,
          lastCompletedDate: this.streak ? this.streak.lastCompletedDate : void 0,
          lastCompletedCycle: this.streak ? this.streak.lastCompletedCycle : void 0,
          history: this.streak ? this.streak.history : [],
          frozenUntil: this.streak ? this.streak.frozenUntil : null,
          freezeHistory: this.streak ? this.streak.freezeHistory : [],
          freezePeriodType: this.streak ? this.streak.freezePeriodType || "monthly" : this.freezePeriodType,
          freezeQuota: this.streak ? this.streak.freezeQuota ?? 4 : this.freezeQuota,
          maxFreezesPerMonth: this.streak ? this.streak.freezeQuota ?? 4 : this.freezeQuota,
          autoPopulate: this.streak ? this.streak.autoPopulate : this.autoPopulate
        };
        await this.onSave(item);
        this.close();
      });
    }).addButton((btn) => {
      btn.setButtonText("Cancel").onClick(() => {
        this.close();
      });
    });
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/modals/freezeStreakModal.ts
var import_obsidian2 = require("obsidian");
var FreezeStreakModal = class extends import_obsidian2.Modal {
  constructor(app, streak, streakService, maxFreezesPerMonth, onUpdated) {
    super(app);
    this.customDays = 1;
    this.streak = streak;
    this.streakService = streakService;
    this.maxFreezesPerMonth = maxFreezesPerMonth || 4;
    this.onUpdated = onUpdated;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("os-freeze-modal");
    const header = contentEl.createDiv({ cls: "os-modal-header" });
    const iconSpan = header.createSpan({ cls: "os-modal-header-icon" });
    (0, import_obsidian2.setIcon)(iconSpan, "snowflake");
    header.createEl("h2", { text: `Freeze Habit: "${this.streak.name}"` });
    const isFrozen = this.streakService.isFrozen(this.streak);
    const period = this.streak.freezePeriodType || "monthly";
    const periodLabel = period === "weekly" ? "Week" : period === "yearly" ? "Year" : "Month";
    const quota = this.streakService.getEffectiveFreezeQuota(this.streak, this.maxFreezesPerMonth);
    const used = this.streakService.getFreezesUsedInCurrentPeriod(this.streak);
    const remainingDays = this.streakService.getFreezesRemainingInCurrentPeriod(this.streak, this.maxFreezesPerMonth);
    const quotaCard = contentEl.createDiv({ cls: "os-freeze-quota-card" });
    quotaCard.createSpan({
      text: `Freeze Allowance (${periodLabel}): ${used} used / ${quota} allowed (${remainingDays} day${remainingDays === 1 ? "" : "s"} left this ${period})`
    });
    if (isFrozen) {
      const daysLeft = this.streakService.getFreezeDaysLeft(this.streak);
      contentEl.createEl("p", {
        cls: "os-freeze-status is-frozen",
        text: `Currently frozen until ${this.streak.frozenUntil} (${daysLeft} day${daysLeft === 1 ? "" : "s"} remaining). Missed days during this period will not reset your streak.`
      });
    } else {
      contentEl.createEl("p", {
        cls: "os-freeze-status",
        text: "Taking a break, traveling, or sick? Freezing protects your streak from breaking while you are away."
      });
    }
    if (remainingDays <= 0 && !isFrozen) {
      contentEl.createEl("p", {
        cls: "os-freeze-status is-limit-reached",
        text: `You have used all freeze days for this ${period}. New freeze allowance will become available when the ${period} resets.`
      });
    } else if (!isFrozen) {
      const btnSection = contentEl.createDiv({ cls: "os-freeze-quick-buttons" });
      const options = [
        { label: "1 Day", days: 1 },
        { label: "2 Days", days: 2 },
        { label: "3 Days", days: 3 },
        { label: "5 Days", days: 5 },
        { label: "7 Days", days: 7 }
      ].filter((opt) => opt.days <= remainingDays);
      options.forEach((opt) => {
        const btn = btnSection.createEl("button", {
          cls: "os-freeze-quick-btn",
          text: `Freeze ${opt.label}`
        });
        btn.addEventListener("click", async () => {
          const success = this.streakService.freezeStreak(this.streak, opt.days, this.maxFreezesPerMonth);
          if (success) {
            await this.onUpdated();
            this.close();
          }
        });
      });
      const defaultCustom = Math.min(2, remainingDays);
      this.customDays = defaultCustom;
      new import_obsidian2.Setting(contentEl).setName("Custom Freeze Days").setDesc(`Enter days to freeze (up to ${remainingDays} days allowed this month).`).addText((text) => {
        text.inputEl.type = "number";
        text.inputEl.max = String(remainingDays);
        text.inputEl.min = "1";
        text.setValue(String(defaultCustom)).onChange((val) => {
          const n = parseInt(val, 10);
          this.customDays = isNaN(n) ? 1 : Math.max(1, Math.min(n, remainingDays));
        });
      }).addButton((btn) => {
        btn.setButtonText("Apply Freeze").setCta().onClick(async () => {
          const success = this.streakService.freezeStreak(this.streak, this.customDays, this.maxFreezesPerMonth);
          if (success) {
            await this.onUpdated();
            this.close();
          }
        });
      });
    }
    if (isFrozen) {
      new import_obsidian2.Setting(contentEl).setName("Unfreeze Now").setDesc("Resume your daily streak tracking immediately.").addButton((btn) => {
        btn.setButtonText("Unfreeze Habit").setWarning().onClick(async () => {
          this.streakService.unfreezeStreak(this.streak);
          await this.onUpdated();
          this.close();
        });
      });
    }
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/modals/archiveOrDeleteStreakModal.ts
var import_obsidian3 = require("obsidian");
var ArchiveOrDeleteStreakModal = class extends import_obsidian3.Modal {
  constructor(app, streak, archiveFile, onArchive, onDelete) {
    super(app);
    this.streak = streak;
    this.archiveFile = archiveFile;
    this.onArchive = onArchive;
    this.onDelete = onDelete;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("os-streak-action-modal");
    contentEl.createEl("h2", { text: `Manage Habit: ${this.streak.name}` });
    contentEl.createEl("p", {
      text: "Choose what you would like to do with this habit. You can archive it to save all streak statistics, or permanently delete it.",
      cls: "os-modal-desc"
    });
    const archiveBox = contentEl.createDiv({ cls: "os-modal-option-box" });
    archiveBox.createEl("h4", { text: "Archive Habit" });
    archiveBox.createEl("p", {
      text: `Moves "${this.streak.name}" and all historical records into "${this.archiveFile}". It will stop auto-populating in your daily tasks.`,
      cls: "os-modal-option-desc"
    });
    const archiveBtn = archiveBox.createEl("button", {
      cls: "mod-cta",
      text: "Archive Habit"
    });
    archiveBtn.addEventListener("click", async () => {
      this.close();
      await this.onArchive();
    });
    const deleteBox = contentEl.createDiv({ cls: "os-modal-option-box is-warning" });
    deleteBox.createEl("h4", { text: "Permanently Delete" });
    deleteBox.createEl("p", {
      text: `Warning: This will permanently erase "${this.streak.name}" and all associated streak history from your vault. This action cannot be undone.`,
      cls: "os-modal-option-desc"
    });
    const deleteBtn = deleteBox.createEl("button", {
      cls: "mod-warning",
      text: "Delete Permanently"
    });
    deleteBtn.addEventListener("click", async () => {
      const confirmed = window.confirm(`Are you sure you want to permanently delete "${this.streak.name}" and all its streak data? This cannot be undone.`);
      if (confirmed) {
        this.close();
        await this.onDelete();
      }
    });
    const footer = contentEl.createDiv({ cls: "os-modal-footer" });
    footer.style.marginTop = "18px";
    footer.style.textAlign = "right";
    const cancelBtn = footer.createEl("button", { text: "Cancel" });
    cancelBtn.addEventListener("click", () => this.close());
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/modals/fileSuggest.ts
var import_obsidian4 = require("obsidian");
var FileSuggest = class extends import_obsidian4.AbstractInputSuggest {
  constructor(app, inputEl, onSelect) {
    super(app, inputEl);
    this.inputEl = inputEl;
    this.onSelectCb = onSelect;
  }
  getSuggestions(query) {
    const cleanQuery = query.toLowerCase().trim();
    const markdownFiles = this.app.vault.getMarkdownFiles();
    if (!cleanQuery) {
      return markdownFiles.slice(0, 20);
    }
    return markdownFiles.filter((f) => f.path.toLowerCase().includes(cleanQuery) || f.basename.toLowerCase().includes(cleanQuery)).slice(0, 25);
  }
  renderSuggestion(file, el) {
    el.empty();
    const item = el.createDiv({ cls: "os-wikilink-suggest-item" });
    item.createSpan({ cls: "os-wikilink-title", text: file.basename });
    if (file.parent && file.parent.path !== "" && file.parent.path !== "/") {
      item.createSpan({ cls: "os-wikilink-folder", text: file.parent.path });
    }
  }
  selectSuggestion(file) {
    this.inputEl.value = file.path;
    this.inputEl.dispatchEvent(new Event("change", { bubbles: true }));
    this.inputEl.dispatchEvent(new Event("input", { bubbles: true }));
    if (this.onSelectCb) {
      this.onSelectCb(file);
    }
    this.close();
  }
};

// src/settings.ts
var OSDashboardSettingTab = class extends import_obsidian5.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.activeTab = "general";
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "OS Dashboard Settings" });
    const navBar = containerEl.createDiv({ cls: "os-settings-nav-bar" });
    const tabs = [
      { id: "general", label: "General", icon: "settings" },
      { id: "navigation", label: "Navigation", icon: "folder-tree" },
      { id: "widgets", label: "Widgets", icon: "layout-grid" },
      { id: "streaks", label: "Streaks & Rail", icon: "flame" },
      { id: "tasks-projects", label: "Tasks & Projects", icon: "check-square" },
      { id: "bookmarks", label: "Bookmarks", icon: "bookmark" }
    ];
    for (const tab of tabs) {
      const btn = navBar.createEl("button", {
        cls: `os-settings-tab-btn ${this.activeTab === tab.id ? "is-active" : ""}`
      });
      const iconSpan = btn.createSpan({ cls: "os-settings-tab-icon" });
      (0, import_obsidian5.setIcon)(iconSpan, tab.icon);
      btn.createSpan({ text: tab.label });
      btn.addEventListener("click", () => {
        this.activeTab = tab.id;
        this.display();
      });
    }
    const tabContent = containerEl.createDiv({ cls: "os-settings-tab-content" });
    switch (this.activeTab) {
      case "general":
        this.renderGeneralTab(tabContent);
        break;
      case "navigation":
        this.renderNavigationTab(tabContent);
        break;
      case "widgets":
        this.renderWidgetsTab(tabContent);
        break;
      case "streaks":
        this.renderStreaksRailTab(tabContent);
        break;
      case "tasks-projects":
        this.renderTasksProjectsTab(tabContent);
        break;
      case "bookmarks":
        this.renderBookmarksTab(tabContent);
        break;
    }
  }
  // =========================================================================
  // 1. GENERAL TAB
  // =========================================================================
  renderGeneralTab(container) {
    container.createEl("h3", { text: "Startup & New Tab Behavior" });
    new import_obsidian5.Setting(container).setName("Open on Startup").setDesc("Automatically launch and focus the OS Dashboard whenever Obsidian opens.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.openOnStartup ?? true).onChange(async (val) => {
        this.plugin.settings.openOnStartup = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian5.Setting(container).setName("Open on New Tab").setDesc("Automatically open the OS Dashboard when creating a new empty tab (homepage mode).").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.openOnNewTab ?? false).onChange(async (val) => {
        this.plugin.settings.openOnNewTab = val;
        await this.plugin.saveSettings();
      });
    });
    container.createEl("h3", { text: "Hero Identity & Appearance" });
    new import_obsidian5.Setting(container).setName("Vault Title").setDesc("Main title displayed in the hero banner (e.g. SSK_OS).").addText((text) => {
      text.setPlaceholder("SSK_OS").setValue(this.plugin.settings.vaultTitle).onChange(async (val) => {
        this.plugin.settings.vaultTitle = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian5.Setting(container).setName("Vault Subtitle / Motto").setDesc("Tagline below the title.").addText((text) => {
      text.setPlaceholder("Think \u2022 Learn \u2022 Build \u2022 Create \u2022 Grow").setValue(this.plugin.settings.vaultSubtitle).onChange(async (val) => {
        this.plugin.settings.vaultSubtitle = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian5.Setting(container).setName("Banner Image Path or URL").setDesc("Path to an image in your vault (e.g. 'Attachments/banner.png') or an online image URL.").addText((text) => {
      text.setPlaceholder("path/to/banner.jpg or https://...").setValue(this.plugin.settings.bannerPath).onChange(async (val) => {
        this.plugin.settings.bannerPath = val.trim();
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian5.Setting(container).setName("Avatar Icon").setDesc("Lucide icon identifier for the hero avatar badge (e.g. 'home', 'terminal', 'user').").addText((text) => {
      text.setPlaceholder("home").setValue(this.plugin.settings.vaultAvatarIcon).onChange(async (val) => {
        this.plugin.settings.vaultAvatarIcon = val.trim() || "home";
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian5.Setting(container).setName("Top Quote").setDesc("Inspirational text displayed on the top right.").addTextArea((text) => {
      text.setPlaceholder("A better me\na brighter tomorrow.").setValue(this.plugin.settings.quoteTop).onChange(async (val) => {
        this.plugin.settings.quoteTop = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian5.Setting(container).setName("Main Callout Quote").setDesc("Card quote shown below your vault title.").addText((text) => {
      text.setPlaceholder("\u201CDiscipline today creates the freedom tomorrow.\u201D").setValue(this.plugin.settings.quoteMain).onChange(async (val) => {
        this.plugin.settings.quoteMain = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian5.Setting(container).setName("Clock Subtitle").setDesc("Caption underneath the digital clock.").addTextArea((text) => {
      text.setPlaceholder("Small steps every day\nlead to big results.").setValue(this.plugin.settings.clockSubtitle).onChange(async (val) => {
        this.plugin.settings.clockSubtitle = val;
        await this.plugin.saveSettings();
      });
    });
  }
  // =========================================================================
  // 2. NAVIGATION TAB
  // =========================================================================
  renderNavigationTab(container) {
    container.createEl("h3", { text: "Smart Folder Ribbon" });
    new import_obsidian5.Setting(container).setName("Home Note Keywords").setDesc("Comma-separated keywords to identify a Home/Index note in 1st-level folders (e.g. Home, Index, MOC).").addText((text) => {
      text.setPlaceholder("Home, Index, MOC").setValue(this.plugin.settings.homeKeywords.join(", ")).onChange(async (val) => {
        this.plugin.settings.homeKeywords = val.split(",").map((k) => k.trim()).filter(Boolean);
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian5.Setting(container).setName("Match Folder Name as Home Note").setDesc("Also consider a note as the Home note if its file name is the same as the folder name (e.g. 'Projects/Projects.md').").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.matchFolderName ?? true).onChange(async (val) => {
        this.plugin.settings.matchFolderName = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian5.Setting(container).setName("New Note Naming Pattern").setDesc("Moment.js date format for new files created when clicking folders without a Home note (e.g. YYYY-MM-DD HH-mm).").addText((text) => {
      text.setPlaceholder("YYYY-MM-DD HH-mm").setValue(this.plugin.settings.newFilePattern).onChange(async (val) => {
        this.plugin.settings.newFilePattern = val.trim() || "YYYY-MM-DD HH-mm";
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian5.Setting(container).setName("Ignored Navigation Folders").setDesc("Comma-separated folder names to hide from the navigation ribbon. Folders starting with '_' or '.' are hidden automatically.").addText((text) => {
      text.setPlaceholder("_attachments, _scripts, _templates, Templates").setValue((this.plugin.settings.ignoredFolders || []).join(", ")).onChange(async (val) => {
        this.plugin.settings.ignoredFolders = val.split(",").map((f) => f.trim()).filter(Boolean);
        await this.plugin.saveSettings();
      });
    });
  }
  // =========================================================================
  // 3. WIDGETS MANAGER TAB
  // =========================================================================
  renderWidgetsTab(container) {
    container.createEl("h3", { text: "Built-in Widgets Visibility" });
    const descEl = container.createEl("p", {
      text: "Toggle which sections appear on your dashboard. Hidden widgets leave no empty gaps; active columns adjust automatically.",
      cls: "setting-item-description"
    });
    descEl.style.marginBottom = "14px";
    new import_obsidian5.Setting(container).setName("Hero Banner").setDesc("Top banner with vault identity, quotes, and live clock.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.showHeroBanner ?? true).onChange(async (val) => {
        this.plugin.settings.showHeroBanner = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian5.Setting(container).setName("Smart Navigation Ribbon").setDesc("1st-level folder shortcuts with inherited icons and colors.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.showNavRibbon ?? true).onChange(async (val) => {
        this.plugin.settings.showNavRibbon = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian5.Setting(container).setName("Daily Tasks (Plan & Log)").setDesc("Daily task checklist with switchable Plan and Log tabs, and date-schedule popup.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.showTodayTasks ?? true).onChange(async (val) => {
        this.plugin.settings.showTodayTasks = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian5.Setting(container).setName("Weekly Planning").setDesc("Overview of high-level weekly priorities.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.showWeeklyTasks ?? true).onChange(async (val) => {
        this.plugin.settings.showWeeklyTasks = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian5.Setting(container).setName("Recent Notes").setDesc("List of recently modified notes with parent folder badges.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.showRecentNotes ?? true).onChange(async (val) => {
        this.plugin.settings.showRecentNotes = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian5.Setting(container).setName("Quick Capture").setDesc("Instant note capture input box sending to your inbox folder.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.showQuickCapture ?? true).onChange(async (val) => {
        this.plugin.settings.showQuickCapture = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian5.Setting(container).setName("Ongoing Projects").setDesc("Active projects tracked by status and auto-calculated task progress.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.showOngoingProjects ?? true).onChange(async (val) => {
        this.plugin.settings.showOngoingProjects = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian5.Setting(container).setName("Bookmarks & Links").setDesc("Grid of external resources and key internal notes.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.showBookmarks ?? true).onChange(async (val) => {
        this.plugin.settings.showBookmarks = val;
        await this.plugin.saveSettings();
      });
    });
    container.createEl("h3", { text: "Right Side Companion Rail Widgets" });
    new import_obsidian5.Setting(container).setName("Enable Right Side Rail").setDesc("Companion rail on the right side containing Calendar, Graph view, Streaks, and Quote.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.showRightRail ?? true).onChange(async (val) => {
        this.plugin.settings.showRightRail = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian5.Setting(container).setName("Calendar Widget").setDesc("Interactive mini calendar with current date indicator and daily note integration.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.showCalendar ?? true).onChange(async (val) => {
        this.plugin.settings.showCalendar = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian5.Setting(container).setName("Graph View Widget").setDesc("Interactive node graph view with direct folder navigation.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.showGraphView ?? true).onChange(async (val) => {
        this.plugin.settings.showGraphView = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian5.Setting(container).setName("Streaks Tracker Widget").setDesc("Habit streaks tracker synced with Daily Tasks and freeze support.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.showStreaks ?? true).onChange(async (val) => {
        this.plugin.settings.showStreaks = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian5.Setting(container).setName("Quote Widget").setDesc("Inspirational quote card at the bottom of the right rail.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.showRightQuote ?? true).onChange(async (val) => {
        this.plugin.settings.showRightQuote = val;
        await this.plugin.saveSettings();
      });
    });
    container.createEl("h3", { text: "Widget Drag & Drop Layout" });
    new import_obsidian5.Setting(container).setName("Reset Widget Order & Positions").setDesc("Restore all widgets back to their default columns and positions.").addButton((btn) => {
      btn.setButtonText("Reset Layout").setWarning().onClick(async () => {
        this.plugin.settings.widgetLayout = {
          col1: ["todayTasks", "weeklyTasks"],
          col2: ["recentNotes", "quickCapture"],
          col3: ["ongoingProjects", "bookmarks"],
          rail: ["calendar", "streaks", "graphView", "rightQuote"]
        };
        await this.plugin.saveSettings();
        new import_obsidian5.Notice("Widget layout reset to default!");
      });
    });
    container.createEl("h3", { text: "Custom Dashboard Widgets" });
    const customDesc = container.createEl("p", {
      text: "Add custom cards to your dashboard to embed vault notes, custom checklists, or quick links.",
      cls: "setting-item-description"
    });
    customDesc.style.marginBottom = "14px";
    const customContainer = container.createDiv({ cls: "os-settings-custom-widgets" });
    this.renderCustomWidgetsList(customContainer);
  }
  renderCustomWidgetsList(container) {
    container.empty();
    const widgets = this.plugin.settings.customWidgets || [];
    widgets.forEach((widget, idx) => {
      const widgetCard = container.createDiv({ cls: "os-settings-widget-card" });
      new import_obsidian5.Setting(widgetCard).setName(`Widget #${idx + 1}: ${widget.title || "Untitled"}`).addToggle((t) => {
        t.setTooltip("Enable/Disable").setValue(widget.enabled).onChange(async (val) => {
          widget.enabled = val;
          await this.plugin.saveSettings();
        });
      }).addButton((btn) => {
        btn.setIcon("trash").setTooltip("Delete Widget").onClick(async () => {
          this.plugin.settings.customWidgets.splice(idx, 1);
          await this.plugin.saveSettings();
          this.renderCustomWidgetsList(container);
        });
      });
      new import_obsidian5.Setting(widgetCard).setName("Title & Icon").setDesc("Card header title and Lucide icon name (e.g. book-open, flame, star).").addText((text) => {
        text.setPlaceholder("Title").setValue(widget.title).onChange(async (val) => {
          widget.title = val;
          await this.plugin.saveSettings();
        });
      }).addText((text) => {
        text.setPlaceholder("Icon (e.g. flame)").setValue(widget.icon).onChange(async (val) => {
          widget.icon = val.trim();
          await this.plugin.saveSettings();
        });
      });
      new import_obsidian5.Setting(widgetCard).setName("Column & Type").setDesc("Target grid column and what content this widget renders.").addDropdown((dd) => {
        dd.addOption("1", "Column 1 (Left)").addOption("2", "Column 2 (Center)").addOption("3", "Column 3 (Right)").setValue(String(widget.column || 1)).onChange(async (val) => {
          widget.column = parseInt(val, 10);
          await this.plugin.saveSettings();
        });
      }).addDropdown((dd) => {
        dd.addOption("markdown-note", "Vault Note Embed").addOption("custom-text", "Custom Markdown Text").addOption("link-button", "Quick Link / Button").setValue(widget.type || "markdown-note").onChange(async (val) => {
          widget.type = val;
          await this.plugin.saveSettings();
          this.renderCustomWidgetsList(container);
        });
      });
      const contentSetting = new import_obsidian5.Setting(widgetCard).setName("Content / Target");
      if (widget.type === "markdown-note") {
        contentSetting.setDesc("Path to a markdown file in your vault (e.g. Habits.md or Work/Goals.md).");
        contentSetting.addText((t) => {
          t.setPlaceholder("path/to/note.md").setValue(widget.content).onChange(async (val) => {
            widget.content = val.trim();
            await this.plugin.saveSettings();
          });
        });
      } else if (widget.type === "custom-text") {
        contentSetting.setDesc("Custom markdown or text displayed inside the card.");
        contentSetting.addTextArea((t) => {
          t.setPlaceholder("Type markdown or reminders...").setValue(widget.content).onChange(async (val) => {
            widget.content = val;
            await this.plugin.saveSettings();
          });
        });
      } else {
        contentSetting.setDesc("URL (https://...) or Note name to open when clicked.");
        contentSetting.addText((t) => {
          t.setPlaceholder("https://... or Note Title").setValue(widget.content).onChange(async (val) => {
            widget.content = val.trim();
            await this.plugin.saveSettings();
          });
        });
      }
    });
    new import_obsidian5.Setting(container).addButton((btn) => {
      btn.setButtonText("+ Add Custom Widget").setCta().onClick(async () => {
        if (!this.plugin.settings.customWidgets) {
          this.plugin.settings.customWidgets = [];
        }
        this.plugin.settings.customWidgets.push({
          id: Date.now().toString(),
          title: "New Widget",
          icon: "sparkles",
          type: "markdown-note",
          content: "",
          column: 1,
          enabled: true
        });
        await this.plugin.saveSettings();
        this.renderCustomWidgetsList(container);
      });
    });
  }
  // =========================================================================
  // 4. TASKS & PROJECTS TAB
  // =========================================================================
  renderTasksProjectsTab(container) {
    container.createEl("h3", { text: "Task Files" });
    new import_obsidian5.Setting(container).setName("Daily Tasks File (Plan)").setDesc("Path to the file containing daily planned tasks organized by date headings (e.g. Daily Tasks.md).").addText((text) => {
      new FileSuggest(this.app, text.inputEl, async (file) => {
        this.plugin.settings.dailyTasksFile = file.path;
        await this.plugin.saveSettings();
      });
      text.setPlaceholder("Daily Tasks.md").setValue(this.plugin.settings.dailyTasksFile).onChange(async (val) => {
        this.plugin.settings.dailyTasksFile = val.trim();
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian5.Setting(container).setName("Daily Log File (What I Did)").setDesc("Path to the file containing what you actually did today (e.g. Daily Log.md).").addText((text) => {
      new FileSuggest(this.app, text.inputEl, async (file) => {
        this.plugin.settings.dailyLogFile = file.path;
        await this.plugin.saveSettings();
      });
      text.setPlaceholder("Daily Log.md").setValue(this.plugin.settings.dailyLogFile || "").onChange(async (val) => {
        this.plugin.settings.dailyLogFile = val.trim();
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian5.Setting(container).setName("Auto-Log Completed Tasks").setDesc("When you check off a planned task in 'What I had to do', automatically append it to your Daily Log.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.autoLogToDailyLog ?? true).onChange(async (val) => {
        this.plugin.settings.autoLogToDailyLog = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian5.Setting(container).setName("Weekly Tasks File").setDesc("Path to the file containing weekly tasks (e.g. Weekly Tasks.md).").addText((text) => {
      new FileSuggest(this.app, text.inputEl, async (file) => {
        this.plugin.settings.weeklyTasksFile = file.path;
        await this.plugin.saveSettings();
      });
      text.setPlaceholder("Weekly Tasks.md").setValue(this.plugin.settings.weeklyTasksFile).onChange(async (val) => {
        this.plugin.settings.weeklyTasksFile = val.trim();
        await this.plugin.saveSettings();
      });
    });
    container.createEl("h3", { text: "Habits & Streaks" });
    new import_obsidian5.Setting(container).setName("Habits File").setDesc("Path to the markdown file storing your active habit streaks and callouts (e.g. Habits.md).").addText((text) => {
      new FileSuggest(this.app, text.inputEl, async (file) => {
        this.plugin.settings.habitsFile = file.path;
        await this.plugin.saveSettings();
      });
      text.setPlaceholder("Habits.md").setValue(this.plugin.settings.habitsFile || "Habits.md").onChange(async (val) => {
        this.plugin.settings.habitsFile = val.trim() || "Habits.md";
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian5.Setting(container).setName("Habits Archive File").setDesc("Path to the markdown file where archived habits are moved (e.g. 99 Archive/Habit.md). Created automatically if needed.").addText((text) => {
      new FileSuggest(this.app, text.inputEl, async (file) => {
        this.plugin.settings.archiveHabitsFile = file.path;
        await this.plugin.saveSettings();
      });
      text.setPlaceholder("99 Archive/Habit.md").setValue(this.plugin.settings.archiveHabitsFile || "99 Archive/Habit.md").onChange(async (val) => {
        this.plugin.settings.archiveHabitsFile = val.trim() || "99 Archive/Habit.md";
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian5.Setting(container).setName("Monthly Freeze Quota (Days)").setDesc("Maximum number of freeze days a habit can use per calendar month.").addText((text) => {
      text.inputEl.type = "number";
      text.setPlaceholder("4").setValue(String(this.plugin.settings.maxFreezesPerMonth ?? 4)).onChange(async (val) => {
        const n = parseInt(val, 10);
        this.plugin.settings.maxFreezesPerMonth = isNaN(n) ? 4 : Math.max(0, n);
        await this.plugin.saveSettings();
      });
    });
    container.createEl("h3", { text: "Quick Capture" });
    new import_obsidian5.Setting(container).setName("Quick Capture Folder").setDesc("Folder where notes created via the Quick Capture box will be saved (e.g. 00 Inbox).").addText((text) => {
      text.setPlaceholder("00 Inbox").setValue(this.plugin.settings.quickCaptureFolder).onChange(async (val) => {
        this.plugin.settings.quickCaptureFolder = val.trim();
        await this.plugin.saveSettings();
      });
    });
    container.createEl("h3", { text: "Ongoing Projects" });
    new import_obsidian5.Setting(container).setName("Projects Folder").setDesc("Folder to scan for project notes (leave blank to search entire vault).").addText((text) => {
      text.setPlaceholder("03 Projects").setValue(this.plugin.settings.projectsFolder).onChange(async (val) => {
        this.plugin.settings.projectsFolder = val.trim();
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian5.Setting(container).setName("Status Property Name").setDesc("Frontmatter property indicating project status.").addText((text) => {
      text.setPlaceholder("status").setValue(this.plugin.settings.projectStatusProp).onChange(async (val) => {
        this.plugin.settings.projectStatusProp = val.trim() || "status";
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian5.Setting(container).setName("Active Status Values").setDesc("Comma-separated status values that mark a project as ongoing (e.g. in-progress, active).").addText((text) => {
      text.setPlaceholder("in-progress, active, ongoing").setValue(this.plugin.settings.projectStatusValues.join(", ")).onChange(async (val) => {
        this.plugin.settings.projectStatusValues = val.split(",").map((v) => v.trim()).filter(Boolean);
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian5.Setting(container).setName("Progress Property Name").setDesc("Frontmatter property for manual percentage. If missing, task checkboxes are calculated automatically.").addText((text) => {
      text.setPlaceholder("progress").setValue(this.plugin.settings.projectProgressProp).onChange(async (val) => {
        this.plugin.settings.projectProgressProp = val.trim() || "progress";
        await this.plugin.saveSettings();
      });
    });
    container.createEl("h3", { text: "Recent Notes" });
    new import_obsidian5.Setting(container).setName("Recent Notes Limit").setDesc("Maximum number of recently modified notes to display.").addText((text) => {
      text.setPlaceholder("8").setValue(String(this.plugin.settings.recentNotesLimit)).onChange(async (val) => {
        const num = parseInt(val, 10);
        if (!isNaN(num) && num > 0) {
          this.plugin.settings.recentNotesLimit = num;
          await this.plugin.saveSettings();
        }
      });
    });
    new import_obsidian5.Setting(container).setName("Excluded Folders").setDesc("Comma-separated folders to ignore in Recent Notes (e.g. Templates, .trash).").addText((text) => {
      text.setPlaceholder("Templates, .trash").setValue(this.plugin.settings.recentNotesExcludeFolders.join(", ")).onChange(async (val) => {
        this.plugin.settings.recentNotesExcludeFolders = val.split(",").map((f) => f.trim()).filter(Boolean);
        await this.plugin.saveSettings();
      });
    });
  }
  // =========================================================================
  // 5. BOOKMARKS TAB
  // =========================================================================
  renderBookmarksTab(container) {
    container.createEl("h3", { text: "Links & Bookmark Resources" });
    const linksContainer = container.createDiv({ cls: "os-settings-links" });
    this.renderLinksSettings(linksContainer);
  }
  renderLinksSettings(container) {
    container.empty();
    const links = this.plugin.settings.links || [];
    links.forEach((link, idx) => {
      const row = new import_obsidian5.Setting(container).setName(`Link #${idx + 1}: ${link.title}`).addText((titleText) => {
        titleText.setPlaceholder("Title").setValue(link.title).onChange(async (val) => {
          link.title = val;
          await this.plugin.saveSettings();
        });
      }).addText((urlText) => {
        urlText.setPlaceholder("URL or Note Name").setValue(link.url).onChange(async (val) => {
          link.url = val;
          await this.plugin.saveSettings();
        });
      }).addText((iconText) => {
        iconText.setPlaceholder("Icon (e.g. github)").setValue(link.icon).onChange(async (val) => {
          link.icon = val;
          await this.plugin.saveSettings();
        });
      }).addButton((btn) => {
        btn.setIcon("trash").setTooltip("Delete Link").onClick(async () => {
          this.plugin.settings.links.splice(idx, 1);
          await this.plugin.saveSettings();
          this.renderLinksSettings(container);
        });
      });
    });
    new import_obsidian5.Setting(container).addButton((btn) => {
      btn.setButtonText("+ Add Bookmark Link").setCta().onClick(async () => {
        this.plugin.settings.links.push({
          id: Date.now().toString(),
          title: "New Link",
          url: "https://",
          icon: "external-link"
        });
        await this.plugin.saveSettings();
        this.renderLinksSettings(container);
      });
    });
  }
  // =========================================================================
  // 6. STREAKS & RIGHT RAIL TAB
  // =========================================================================
  renderStreaksRailTab(container) {
    container.createEl("h3", { text: "Right Side Companion Rail Widgets" });
    new import_obsidian5.Setting(container).setName("Enable Right Side Rail").setDesc("Toggle visibility of the right companion rail containing Calendar, Graph view, Streaks, and Quote.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.showRightRail ?? true).onChange(async (val) => {
        this.plugin.settings.showRightRail = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian5.Setting(container).setName("Calendar Widget").setDesc("Interactive monthly calendar with quick jump to daily notes.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.showCalendar ?? true).onChange(async (val) => {
        this.plugin.settings.showCalendar = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian5.Setting(container).setName("Graph View Widget").setDesc("Vault node graph widget with direct link navigation.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.showGraphView ?? true).onChange(async (val) => {
        this.plugin.settings.showGraphView = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian5.Setting(container).setName("Streaks Tracker Widget").setDesc("Habit streak counter synced with Daily Tasks and freeze protection.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.showStreaks ?? true).onChange(async (val) => {
        this.plugin.settings.showStreaks = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian5.Setting(container).setName("Quote Widget").setDesc("Motivational quote card at the bottom of the right rail.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.showRightQuote ?? true).onChange(async (val) => {
        this.plugin.settings.showRightQuote = val;
        await this.plugin.saveSettings();
      });
    });
    container.createEl("h3", { text: "Calendar Events File (.md)" });
    new import_obsidian5.Setting(container).setName("Events File").setDesc("Path to the Markdown file where local events are stored (e.g. Events.md). Uses the same date-heading format as Daily Tasks (## YYYY-MM-DD).").addText((text) => {
      new FileSuggest(this.app, text.inputEl, async (file) => {
        this.plugin.settings.calendarEventsFile = file.path;
        await this.plugin.saveSettings();
      });
      text.setPlaceholder("Events.md").setValue(this.plugin.settings.calendarEventsFile || "Events.md").onChange(async (val) => {
        this.plugin.settings.calendarEventsFile = val.trim() || "Events.md";
        await this.plugin.saveSettings();
      });
    });
    container.createEl("h3", { text: "Google Calendar Integration" });
    const calDesc = container.createEl("p", {
      cls: "setting-item-description",
      text: "Display real-time events on your Calendar widget with colored event chips and event notifications."
    });
    calDesc.style.marginBottom = "14px";
    new import_obsidian5.Setting(container).setName("Google Calendar Address (Private iCal URL)").setDesc("In Google Calendar on the Web, go to Settings > Your Calendar > 'Secret address in iCal format' and paste the URL here.").addText((text) => {
      text.setPlaceholder("https://calendar.google.com/calendar/ical/.../basic.ics").setValue(this.plugin.settings.googleCalendarUrl || "").onChange(async (val) => {
        this.plugin.settings.googleCalendarUrl = val.trim();
        await this.plugin.saveSettings();
      });
      text.inputEl.style.width = "260px";
    }).addButton((btn) => {
      btn.setButtonText("Sync Events Now").setCta().onClick(async () => {
        const url = this.plugin.settings.googleCalendarUrl;
        if (!url) {
          new import_obsidian5.Notice("Please enter a Google Calendar iCal address first.");
          return;
        }
        btn.setButtonText("Syncing...");
        btn.setDisabled(true);
        try {
          const events = await this.plugin.calendarService.fetchEvents(url);
          this.plugin.settings.cachedCalendarEvents = events;
          this.plugin.settings.lastCalendarSyncTime = Date.now();
          await this.plugin.saveSettings();
          new import_obsidian5.Notice(`\u2705 Synced ${events.length} Google Calendar event${events.length === 1 ? "" : "s"}!`);
        } catch (err) {
          new import_obsidian5.Notice(`\u274C Failed to sync: ${err.message || "Invalid iCal URL or network error"}`);
        } finally {
          btn.setButtonText("Sync Events Now");
          btn.setDisabled(false);
        }
      });
    });
    new import_obsidian5.Setting(container).setName("Auto-sync Events in Background").setDesc("Automatically refresh events from Google Calendar every few minutes.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.googleCalendarAutoSync ?? true).onChange(async (val) => {
        this.plugin.settings.googleCalendarAutoSync = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian5.Setting(container).setName("Event Reminders & Notifications").setDesc("Trigger an in-app notice and desktop notification before an event begins.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.enableCalendarNotifications ?? true).onChange(async (val) => {
        this.plugin.settings.enableCalendarNotifications = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian5.Setting(container).setName("Notification Lead Time").setDesc("How many minutes before an event starts to notify you.").addDropdown((dd) => {
      dd.addOption("5", "5 minutes before").addOption("10", "10 minutes before (Default)").addOption("15", "15 minutes before").addOption("30", "30 minutes before").setValue(String(this.plugin.settings.calendarNotificationLeadMinutes || 10)).onChange(async (val) => {
        this.plugin.settings.calendarNotificationLeadMinutes = parseInt(val, 10) || 10;
        await this.plugin.saveSettings();
      });
    });
    container.createEl("h3", { text: "Right Rail Quote Content" });
    new import_obsidian5.Setting(container).setName("Quote Text").setDesc("Inspirational quote displayed in the right rail widget.").addTextArea((text) => {
      text.setPlaceholder("Consistency is more important than intensity.").setValue(this.plugin.settings.rightRailQuote).onChange(async (val) => {
        this.plugin.settings.rightRailQuote = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian5.Setting(container).setName("Quote Author (Optional)").setDesc("Author name or source.").addText((text) => {
      text.setPlaceholder("e.g. Bruce Lee").setValue(this.plugin.settings.rightRailQuoteAuthor || "").onChange(async (val) => {
        this.plugin.settings.rightRailQuoteAuthor = val;
        await this.plugin.saveSettings();
      });
    });
    container.createEl("h3", { text: "Habit Streaks Management" });
    const streaksDesc = container.createEl("p", {
      cls: "setting-item-description",
      text: "Streaks automatically populate into your Daily Tasks.md under today's date (unless frozen). Checking them off in your daily tasks increments the streak. You can also freeze a streak for a few days to preserve your count while taking a break or vacation."
    });
    streaksDesc.style.marginBottom = "14px";
    const streaksListContainer = container.createDiv({ cls: "os-settings-streaks-list" });
    this.renderStreaksList(streaksListContainer);
  }
  async renderStreaksList(container) {
    container.empty();
    const habitsFilePath = this.plugin.settings.habitsFile || "Habits.md";
    const archiveFilePath = this.plugin.settings.archiveHabitsFile || "99 Archive/Habit.md";
    const maxFreezes = this.plugin.settings.maxFreezesPerMonth || 4;
    const streaks = await this.plugin.streakService.loadHabits(habitsFilePath, this.plugin.settings.streaks || []);
    this.plugin.settings.streaks = streaks;
    streaks.forEach((streak) => {
      const streakCard = container.createDiv({ cls: "os-settings-streak-card" });
      streakCard.style.cssText = "display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; margin-bottom: 8px; border-radius: 8px; background: var(--background-secondary); border: 1px solid var(--background-modifier-border);";
      const leftCol = streakCard.createDiv({ cls: "os-settings-streak-info" });
      leftCol.style.cssText = "display: flex; align-items: center; gap: 10px;";
      const iconSpan = leftCol.createSpan();
      (0, import_obsidian5.setIcon)(iconSpan, streak.icon || "flame");
      iconSpan.style.cssText = "color: var(--text-accent); display: flex; align-items: center;";
      const titleWrapper = leftCol.createDiv();
      titleWrapper.style.cssText = "display: flex; flex-direction: column; gap: 2px;";
      const titleSpan = titleWrapper.createSpan({ text: streak.name });
      titleSpan.style.fontWeight = "600";
      if (streak.description) {
        const descSpan = titleWrapper.createSpan({ text: streak.description });
        descSpan.style.cssText = "font-size: 11px; color: var(--text-muted); font-weight: 400;";
      }
      const freq = streak.frequency || "daily";
      const streakUnit = freq === "weekly" ? streak.currentStreak === 1 ? "wk" : "wks" : freq === "monthly" ? streak.currentStreak === 1 ? "mo" : "mos" : freq === "yearly" ? streak.currentStreak === 1 ? "yr" : "yrs" : streak.currentStreak === 1 ? "day" : "days";
      const habitMaxFreezes = this.plugin.streakService.getEffectiveMaxFreezes(streak, maxFreezes);
      const freqText = freq.charAt(0).toUpperCase() + freq.slice(1) + (freq !== "daily" && streak.scheduleType === "fixed" ? " (Fixed)" : "");
      const freqBadge = leftCol.createSpan({ text: freqText });
      freqBadge.style.cssText = "font-size: 10px; padding: 1px 6px; border-radius: 4px; background: var(--background-modifier-border); color: var(--text-muted); font-weight: 500; text-transform: uppercase;";
      const countBadge = leftCol.createSpan({ text: `${streak.currentStreak || 0} ${streakUnit}` });
      countBadge.style.cssText = "font-size: 11px; padding: 2px 8px; border-radius: 10px; background: rgba(255, 152, 0, 0.15); color: #ffa726; font-weight: 600;";
      const isFrozen = this.plugin.streakService.isFrozen(streak);
      if (isFrozen) {
        const daysLeft = this.plugin.streakService.getFreezeDaysLeft(streak);
        const freezeBadge = leftCol.createSpan({ text: `\u2744\uFE0F Frozen (${daysLeft}d left)` });
        freezeBadge.style.cssText = "font-size: 11px; padding: 2px 8px; border-radius: 10px; background: rgba(56, 189, 248, 0.15); color: #38bdf8; font-weight: 600;";
      }
      const actions = streakCard.createDiv({ cls: "os-settings-streak-actions" });
      actions.style.cssText = "display: flex; align-items: center; gap: 6px;";
      const freezeBtn = actions.createEl("button", { text: isFrozen ? "Unfreeze" : "Freeze", cls: "mod-warning" });
      freezeBtn.addEventListener("click", () => {
        new FreezeStreakModal(this.app, streak, this.plugin.streakService, habitMaxFreezes, async () => {
          await this.plugin.streakService.saveHabits(habitsFilePath, streaks, maxFreezes);
          await this.plugin.saveSettings();
          await this.renderStreaksList(container);
        }).open();
      });
      const editBtn = actions.createEl("button", { text: "Edit" });
      editBtn.addEventListener("click", () => {
        new StreakModal(this.app, streak, async (updated) => {
          await this.plugin.streakService.updateHabitDetails(
            habitsFilePath,
            streak.id,
            updated.name,
            updated.description,
            this.plugin.settings
          );
          await this.plugin.saveSettings();
          await this.renderStreaksList(container);
        }).open();
      });
      const deleteBtn = actions.createEl("button", { text: "Manage", cls: "mod-destructive" });
      deleteBtn.addEventListener("click", () => {
        new ArchiveOrDeleteStreakModal(
          this.app,
          streak,
          archiveFilePath,
          async () => {
            await this.plugin.streakService.archiveHabit(habitsFilePath, archiveFilePath, streak.id, this.plugin.settings);
            await this.plugin.saveSettings();
            await this.renderStreaksList(container);
          },
          async () => {
            await this.plugin.streakService.deleteHabit(habitsFilePath, streak.id, this.plugin.settings);
            await this.plugin.saveSettings();
            await this.renderStreaksList(container);
          }
        ).open();
      });
    });
    new import_obsidian5.Setting(container).addButton((btn) => {
      btn.setButtonText("+ Add New Habit").setCta().onClick(() => {
        new StreakModal(this.app, null, async (newStreak) => {
          streaks.push(newStreak);
          await this.plugin.streakService.saveHabits(habitsFilePath, streaks, maxFreezes);
          this.plugin.settings.streaks = streaks;
          await this.plugin.saveSettings();
          await this.renderStreaksList(container);
        }).open();
      });
    });
  }
};

// src/view/osDashboardView.ts
var import_obsidian14 = require("obsidian");

// src/view/renderer.ts
var import_obsidian13 = require("obsidian");

// src/services/streakService.ts
var import_obsidian6 = require("obsidian");
var StreakService = class {
  constructor(app) {
    this.isPopulating = false;
    this.app = app;
  }
  /**
   * Reads and parses habits from the specified markdown file (e.g. Habits.md).
   * If the file does not exist, it creates it with any initial habits from settings.
   */
  async loadHabits(filePath, fallbackHabits = []) {
    const file = this.app.vault.getAbstractFileByPath(filePath);
    if (!file || !(file instanceof import_obsidian6.TFile)) {
      if (fallbackHabits && fallbackHabits.length > 0) {
        await this.saveHabits(filePath, fallbackHabits, 4);
        return fallbackHabits;
      }
      return [];
    }
    try {
      const content = await this.app.vault.read(file);
      return this.parseHabitsMarkdown(content);
    } catch (err) {
      console.error("OS Dashboard: Failed to load habits file", err);
      return fallbackHabits;
    }
  }
  /**
   * Serializes habits and writes them to the specified markdown file.
   */
  async saveHabits(filePath, habits, maxFreezesPerMonth = 4) {
    await this.ensureFolderForFile(filePath);
    const content = this.serializeHabitsMarkdown(habits, maxFreezesPerMonth);
    const file = this.app.vault.getAbstractFileByPath(filePath);
    if (file instanceof import_obsidian6.TFile) {
      await this.app.vault.modify(file, content);
    } else {
      await this.app.vault.create(filePath, content);
    }
  }
  /**
   * Parses the markdown content into StreakItem objects.
   * Expects:
   * ## Habit Name
   * > [!note] Habit Stats
   * > - **Icon**: book-open
   * > - **Current Streak**: 12
   * > ...
   */
  parseHabitsMarkdown(content) {
    const habits = [];
    const lines = content.split("\n");
    let currentHabit = null;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith("## ")) {
        if (currentHabit && currentHabit.name) {
          habits.push(this.finalizeHabitItem(currentHabit));
        }
        const name = line.substring(3).trim();
        currentHabit = {
          id: `habit-${name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
          name,
          icon: "flame",
          frequency: "daily",
          currentStreak: 0,
          bestStreak: 0,
          history: [],
          freezeHistory: [],
          autoPopulate: true
        };
        continue;
      }
      if (!currentHabit) continue;
      const propMatch = line.match(/^>\s*-\s*\*\*(.*?)\*\*:\s*(.*)$/);
      if (propMatch) {
        const key = propMatch[1].trim().toLowerCase();
        const val = propMatch[2].trim();
        switch (key) {
          case "description":
            currentHabit.description = val ? val.substring(0, 150) : void 0;
            break;
          case "icon":
            currentHabit.icon = val || "flame";
            break;
          case "frequency": {
            const low = val.toLowerCase();
            currentHabit.frequency = low === "weekly" || low === "monthly" || low === "yearly" ? low : "daily";
            break;
          }
          case "schedule type": {
            const low = val.toLowerCase();
            currentHabit.scheduleType = low === "fixed" ? "fixed" : "flexible";
            break;
          }
          case "fixed day of week":
            currentHabit.fixedDayOfWeek = parseInt(val, 10);
            break;
          case "fixed day of month":
            currentHabit.fixedDayOfMonth = parseInt(val, 10);
            break;
          case "fixed date of year":
            currentHabit.fixedDateOfYear = val || void 0;
            break;
          case "current streak":
            currentHabit.currentStreak = parseInt(val, 10) || 0;
            break;
          case "best streak":
            currentHabit.bestStreak = parseInt(val, 10) || 0;
            break;
          case "start date":
            currentHabit.startDate = val || void 0;
            break;
          case "created date":
            currentHabit.createdDate = val || void 0;
            break;
          case "last completed":
            currentHabit.lastCompletedDate = val || void 0;
            break;
          case "last completed cycle":
            currentHabit.lastCompletedCycle = val || void 0;
            break;
          case "frozen until":
            currentHabit.frozenUntil = val || null;
            break;
          case "freeze period": {
            const low = val.toLowerCase();
            currentHabit.freezePeriodType = low === "weekly" || low === "yearly" ? low : "monthly";
            break;
          }
          case "freeze quota":
          case "monthly freeze quota":
            currentHabit.freezeQuota = parseInt(val, 10) || void 0;
            currentHabit.maxFreezesPerMonth = currentHabit.freezeQuota;
            break;
          case "freeze history":
            currentHabit.freezeHistory = val ? val.split(",").map((s) => s.trim()).filter(Boolean) : [];
            break;
          case "completed history":
            currentHabit.history = val ? val.split(",").map((s) => s.trim()).filter(Boolean) : [];
            break;
          case "journal":
            currentHabit.journal = val || void 0;
            if (val) {
              const decoded = this.decodeHabitJournal(val);
              if (decoded.history.length > 0) currentHabit.history = decoded.history;
              if (decoded.freezeHistory.length > 0) currentHabit.freezeHistory = decoded.freezeHistory;
            }
            break;
          case "auto populate":
            currentHabit.autoPopulate = val.toLowerCase() !== "false";
            break;
        }
      }
    }
    if (currentHabit && currentHabit.name) {
      habits.push(this.finalizeHabitItem(currentHabit));
    }
    return habits;
  }
  finalizeHabitItem(partial) {
    return {
      id: partial.id || `habit-${Date.now()}`,
      name: partial.name || "Untitled Habit",
      description: partial.description ? partial.description.trim().substring(0, 150) : void 0,
      icon: partial.icon || "flame",
      frequency: partial.frequency || "daily",
      scheduleType: partial.scheduleType || "flexible",
      fixedDayOfWeek: partial.fixedDayOfWeek,
      fixedDayOfMonth: partial.fixedDayOfMonth,
      fixedDateOfYear: partial.fixedDateOfYear,
      currentStreak: partial.currentStreak || 0,
      bestStreak: Math.max(partial.bestStreak || 0, partial.currentStreak || 0),
      createdDate: partial.createdDate || moment().format("YYYY-MM-DD HH:mm"),
      startDate: partial.startDate || moment().format("YYYY-MM-DD"),
      lastCompletedDate: partial.lastCompletedDate,
      lastCompletedCycle: partial.lastCompletedCycle,
      history: partial.history || [],
      frozenUntil: partial.frozenUntil || null,
      freezeHistory: partial.freezeHistory || [],
      freezePeriodType: partial.freezePeriodType || "monthly",
      freezeQuota: partial.freezeQuota ?? partial.maxFreezesPerMonth,
      maxFreezesPerMonth: partial.freezeQuota ?? partial.maxFreezesPerMonth,
      autoPopulate: partial.autoPopulate !== false,
      journal: partial.journal || this.encodeHabitJournal(partial.history || [], partial.freezeHistory || [], partial.startDate)
    };
  }
  /**
   * Serializes StreakItem objects into beautiful Markdown callout format.
   * Strictly avoids emojis.
   */
  serializeHabitsMarkdown(habits, maxFreezesPerMonth = 4) {
    const lines = [];
    for (const habit of habits) {
      const freezePeriod = habit.freezePeriodType || "monthly";
      const habitQuota = this.getEffectiveFreezeQuota(habit, maxFreezesPerMonth);
      const usedInPeriod = this.getFreezesUsedInCurrentPeriod(habit);
      const freezeHistoryStr = (habit.freezeHistory || []).join(", ");
      const historyStr = (habit.history || []).join(", ");
      lines.push(`## ${habit.name}`);
      lines.push("> [!note] Habit Stats");
      if (habit.description && habit.description.trim()) {
        lines.push(`> - **Description**: ${habit.description.trim().substring(0, 150)}`);
      }
      lines.push(`> - **Icon**: ${habit.icon || "flame"}`);
      lines.push(`> - **Frequency**: ${habit.frequency || "daily"}`);
      if (habit.frequency !== "daily") {
        lines.push(`> - **Schedule Type**: ${habit.scheduleType || "flexible"}`);
        if (habit.scheduleType === "fixed") {
          if (habit.frequency === "weekly") {
            lines.push(`> - **Fixed Day Of Week**: ${habit.fixedDayOfWeek ?? 1}`);
          } else if (habit.frequency === "monthly") {
            lines.push(`> - **Fixed Day Of Month**: ${habit.fixedDayOfMonth ?? 1}`);
          } else if (habit.frequency === "yearly") {
            lines.push(`> - **Fixed Date Of Year**: ${habit.fixedDateOfYear || "01-01"}`);
          }
        }
      }
      lines.push(`> - **Current Streak**: ${habit.currentStreak || 0}`);
      lines.push(`> - **Best Streak**: ${habit.bestStreak || 0}`);
      lines.push(`> - **Start Date**: ${habit.startDate || moment().format("YYYY-MM-DD")}`);
      lines.push(`> - **Created Date**: ${habit.createdDate || moment().format("YYYY-MM-DD HH:mm")}`);
      lines.push(`> - **Last Completed**: ${habit.lastCompletedDate || ""}`);
      lines.push(`> - **Last Completed Cycle**: ${habit.lastCompletedCycle || ""}`);
      lines.push(`> - **Frozen Until**: ${habit.frozenUntil || ""}`);
      lines.push(`> - **Freeze Period**: ${freezePeriod}`);
      lines.push(`> - **Freeze Quota**: ${habitQuota}`);
      lines.push(`> - **Freezes Used**: ${usedInPeriod} / ${habitQuota}`);
      lines.push(`> - **Freeze History**: ${freezeHistoryStr}`);
      lines.push(`> - **Completed History**: ${historyStr}`);
      const journalStr = habit.journal || this.encodeHabitJournal(habit.history || [], habit.freezeHistory || [], habit.startDate);
      if (journalStr) {
        lines.push(`> - **Journal**: ${journalStr}`);
      }
      lines.push(`> - **Auto Populate**: ${habit.autoPopulate !== false}`);
      lines.push("");
    }
    return lines.join("\n");
  }
  /**
   * Returns current cycle key:
   * daily: YYYY-MM-DD, weekly: GGGG-[W]WW, monthly: YYYY-MM, yearly: YYYY
   */
  getCurrentCycleKey(habit) {
    const freq = habit.frequency || "daily";
    if (freq === "weekly") {
      return moment().format("GGGG-[W]WW");
    }
    if (freq === "monthly") {
      return moment().format("YYYY-MM");
    }
    if (freq === "yearly") {
      return moment().format("YYYY");
    }
    return moment().format("YYYY-MM-DD");
  }
  /**
   * Returns previous cycle key
   */
  getPreviousCycleKey(habit) {
    const freq = habit.frequency || "daily";
    if (freq === "weekly") {
      return moment().subtract(1, "week").format("GGGG-[W]WW");
    }
    if (freq === "monthly") {
      return moment().subtract(1, "month").format("YYYY-MM");
    }
    if (freq === "yearly") {
      return moment().subtract(1, "year").format("YYYY");
    }
    return moment().subtract(1, "day").format("YYYY-MM-DD");
  }
  /**
   * Returns period key for freeze tracking (e.g. "2026-W42" for weekly, "2026-10" for monthly, "2026" for yearly)
   */
  getFreezePeriodKey(periodType, date) {
    const d = date || moment();
    if (periodType === "weekly") {
      return d.format("GGGG-[W]WW");
    }
    if (periodType === "yearly") {
      return d.format("YYYY");
    }
    return d.format("YYYY-MM");
  }
  /**
   * Returns effective freeze quota for habit
   */
  getEffectiveFreezeQuota(habit, defaultQuota = 4) {
    if (habit.freezeQuota !== void 0 && habit.freezeQuota >= 0) {
      return habit.freezeQuota;
    }
    if (habit.maxFreezesPerMonth !== void 0 && habit.maxFreezesPerMonth >= 0) {
      return habit.maxFreezesPerMonth;
    }
    return defaultQuota || 4;
  }
  /**
   * Returns how many freezes have been consumed in the habit's active freeze period (weekly/monthly/yearly)
   */
  getFreezesUsedInCurrentPeriod(streak) {
    if (!streak.freezeHistory || streak.freezeHistory.length === 0) return 0;
    const period = streak.freezePeriodType || "monthly";
    const currentKey = this.getFreezePeriodKey(period);
    return streak.freezeHistory.filter((d) => {
      const dKey = this.getFreezePeriodKey(period, moment(d, "YYYY-MM-DD"));
      return dKey === currentKey;
    }).length;
  }
  /**
   * Returns how many freezes remain in the habit's active freeze period
   */
  getFreezesRemainingInCurrentPeriod(streak, defaultQuota = 4) {
    const quota = this.getEffectiveFreezeQuota(streak, defaultQuota);
    const used = this.getFreezesUsedInCurrentPeriod(streak);
    return Math.max(0, quota - used);
  }
  // Backwards compatibility helper
  getFreezesUsedThisMonth(streak) {
    return this.getFreezesUsedInCurrentPeriod(streak);
  }
  // Backwards compatibility helper
  getFreezesRemainingThisMonth(streak, maxPerMonth) {
    return this.getFreezesRemainingInCurrentPeriod(streak, maxPerMonth);
  }
  // Backwards compatibility helper
  getEffectiveMaxFreezes(streak, globalMax = 4) {
    return this.getEffectiveFreezeQuota(streak, globalMax);
  }
  /**
   * Checks if habit has already been completed in its current cycle (today, this week, this month, or this year)
   */
  isCompletedInCurrentCycle(habit) {
    const currentKey = this.getCurrentCycleKey(habit);
    if (habit.lastCompletedCycle === currentKey) return true;
    if ((habit.frequency || "daily") === "daily") {
      const todayStr = moment().format("YYYY-MM-DD");
      return habit.lastCompletedDate === todayStr || habit.history && habit.history.includes(todayStr);
    }
    return false;
  }
  /**
   * Returns days remaining in current cycle (including today)
   */
  getDaysRemainingInCycle(habit) {
    const freq = habit.frequency || "daily";
    const today = moment().startOf("day");
    if (freq === "weekly") {
      const endOfWeek = moment().endOf("isoWeek").startOf("day");
      return Math.max(0, endOfWeek.diff(today, "days") + 1);
    }
    if (freq === "monthly") {
      const endOfMonth = moment().endOf("month").startOf("day");
      return Math.max(0, endOfMonth.diff(today, "days") + 1);
    }
    if (freq === "yearly") {
      const endOfYear = moment().endOf("year").startOf("day");
      return Math.max(0, endOfYear.diff(today, "days") + 1);
    }
    return 1;
  }
  /**
   * Checks if a streak is currently frozen
   */
  isFrozen(streak) {
    if (!streak.frozenUntil) return false;
    const today = moment().startOf("day");
    const freezeEnd = moment(streak.frozenUntil, "YYYY-MM-DD").startOf("day");
    return today.isSameOrBefore(freezeEnd);
  }
  /**
   * Returns how many days remain in the freeze window (including today)
   */
  getFreezeDaysLeft(streak) {
    if (!this.isFrozen(streak) || !streak.frozenUntil) return 0;
    const today = moment().startOf("day");
    const freezeEnd = moment(streak.frozenUntil, "YYYY-MM-DD").startOf("day");
    return Math.max(0, freezeEnd.diff(today, "days") + 1);
  }
  /**
   * Freezes a streak for a given number of days while enforcing the period quota
   */
  freezeStreak(streak, days, defaultQuota = 4) {
    if (days <= 0) {
      streak.frozenUntil = null;
      return true;
    }
    const period = streak.freezePeriodType || "monthly";
    const available = this.getFreezesRemainingInCurrentPeriod(streak, defaultQuota);
    if (days > available) {
      new import_obsidian6.Notice(`Cannot freeze for ${days} days. Only ${available} freeze days left this ${period}.`);
      return false;
    }
    if (!streak.freezeHistory) streak.freezeHistory = [];
    for (let i = 0; i < days; i++) {
      const d = moment().add(i, "days").format("YYYY-MM-DD");
      if (!streak.freezeHistory.includes(d)) {
        streak.freezeHistory.push(d);
      }
    }
    const freezeEnd = moment().add(days - 1, "days").format("YYYY-MM-DD");
    streak.frozenUntil = freezeEnd;
    return true;
  }
  /**
   * Unfreezes a streak immediately
   */
  unfreezeStreak(streak) {
    streak.frozenUntil = null;
  }
  /**
   * Checks if the streak was completed today
   */
  isCompletedToday(streak) {
    return this.isCompletedInCurrentCycle(streak);
  }
  /**
   * Auto-populates active, non-frozen habits into today's plan in Daily Tasks.md:
   * - Daily habits: every day.
   * - Fixed weekly/monthly/yearly habits: only on their designated target day.
   * - Flexible habits: never auto-populate (user injects via "Add to Today's Plan").
   */
  async autoPopulateTasks(planFilePath, habits, taskService) {
    if (!habits || habits.length === 0) return false;
    if (this.isPopulating) return false;
    this.isPopulating = true;
    try {
      const todayStr = moment().format("YYYY-MM-DD");
      const todayMoment = moment().startOf("day");
      const todayTasks = await taskService.getTodayTasks(planFilePath);
      let anyAdded = false;
      for (const streak of habits) {
        if (streak.autoPopulate === false) continue;
        if (this.isFrozen(streak)) continue;
        if (streak.startDate) {
          const startMoment = moment(streak.startDate, "YYYY-MM-DD").startOf("day");
          if (todayMoment.isBefore(startMoment)) {
            continue;
          }
        }
        const freq = streak.frequency || "daily";
        if (freq !== "daily" && streak.scheduleType !== "fixed") {
          continue;
        }
        if (freq !== "daily" && streak.scheduleType === "fixed") {
          if (freq === "weekly") {
            const targetDay = streak.fixedDayOfWeek ?? 1;
            if (moment().day() !== targetDay) {
              continue;
            }
          } else if (freq === "monthly") {
            const targetDay = streak.fixedDayOfMonth ?? 1;
            const daysInMonth = moment().daysInMonth();
            const effectiveTarget = Math.min(targetDay, daysInMonth);
            if (moment().date() !== effectiveTarget) {
              continue;
            }
          } else if (freq === "yearly") {
            const targetDate = streak.fixedDateOfYear || "01-01";
            if (moment().format("MM-DD") !== targetDate) {
              continue;
            }
          }
        }
        const cleanStreakName = streak.name.toLowerCase().trim();
        const alreadyExists = todayTasks.some((t) => {
          const text = t.text.toLowerCase().trim();
          return text === cleanStreakName || text.includes(cleanStreakName);
        });
        if (!alreadyExists) {
          const added = await taskService.addTask(planFilePath, streak.name, todayStr, false);
          if (added) {
            todayTasks.push({
              id: `today-auto-${streak.id}`,
              text: streak.name,
              completed: false,
              lineNumber: -1,
              rawLine: `- [ ] ${streak.name}`,
              sourceFile: planFilePath,
              dateHeading: todayStr
            });
            anyAdded = true;
          }
        }
      }
      return anyAdded;
    } finally {
      this.isPopulating = false;
    }
  }
  /**
   * Smartly injects a habit into today's tasks list with deduplication and overdue roll-forward.
   */
  async addHabitToToday(planFilePath, habit, taskService) {
    if (this.isCompletedInCurrentCycle(habit)) {
      const cycleName = habit.frequency === "weekly" ? "this week" : habit.frequency === "monthly" ? "this month" : habit.frequency === "yearly" ? "this year" : "today";
      return { success: false, message: `"${habit.name}" is already completed for ${cycleName}!` };
    }
    const todayStr = moment().format("YYYY-MM-DD");
    const cleanName = habit.name.toLowerCase().trim();
    const todayTasks = await taskService.getTodayTasks(planFilePath);
    const alreadyInToday = todayTasks.some((t) => {
      const text = t.text.toLowerCase().trim();
      return text === cleanName || text.includes(cleanName);
    });
    if (alreadyInToday) {
      return { success: false, message: `"${habit.name}" is already in today's tasks.` };
    }
    const overdueTasks = await taskService.getOverdueTasks(planFilePath);
    const overdueMatch = overdueTasks.find((t) => {
      const text = t.text.toLowerCase().trim();
      return text === cleanName || text.includes(cleanName);
    });
    if (overdueMatch) {
      await taskService.deleteTask(overdueMatch.sourceFile, overdueMatch.lineNumber);
      await taskService.addTask(planFilePath, habit.name, todayStr, false);
      return { success: true, message: `Moved overdue "${habit.name}" to today's tasks.` };
    }
    await taskService.addTask(planFilePath, habit.name, todayStr, false);
    return { success: true, message: `Added "${habit.name}" to today's tasks.` };
  }
  /**
   * Syncs streak completion status when a task is toggled in Today's plan.
   * Supports Daily, Weekly, and Monthly cycle keys with idempotent completion.
   * If a streak breaks, the habit is NEVER removed; currentStreak simply resets or starts fresh at 1.
   */
  handleTaskToggle(taskText, completed, habits) {
    if (!habits || habits.length === 0) return false;
    const cleanTask = taskText.toLowerCase().trim();
    const todayStr = moment().format("YYYY-MM-DD");
    let changed = false;
    for (const streak of habits) {
      const cleanStreak = streak.name.toLowerCase().trim();
      if (cleanTask === cleanStreak || cleanTask.includes(cleanStreak)) {
        if (!streak.history) streak.history = [];
        const freq = streak.frequency || "daily";
        const currentCycle = this.getCurrentCycleKey(streak);
        const prevCycle = this.getPreviousCycleKey(streak);
        if (completed) {
          if (streak.lastCompletedCycle === currentCycle && freq !== "daily") {
            continue;
          }
          if (streak.lastCompletedDate === todayStr && freq === "daily") {
            continue;
          }
          const wasContinuation = streak.lastCompletedCycle === prevCycle || this.isFrozen(streak);
          if (wasContinuation) {
            streak.currentStreak = (streak.currentStreak || 0) + 1;
          } else {
            streak.currentStreak = 1;
          }
          streak.lastCompletedDate = todayStr;
          streak.lastCompletedCycle = currentCycle;
          if (!streak.history.includes(todayStr)) {
            streak.history.push(todayStr);
          }
          if ((streak.currentStreak || 0) > (streak.bestStreak || 0)) {
            streak.bestStreak = streak.currentStreak;
          }
          changed = true;
        } else {
          if (streak.lastCompletedCycle === currentCycle || streak.lastCompletedDate === todayStr) {
            streak.history = streak.history.filter((d) => d !== todayStr);
            streak.currentStreak = Math.max(0, (streak.currentStreak || 1) - 1);
            streak.lastCompletedDate = streak.history[streak.history.length - 1] || void 0;
            streak.lastCompletedCycle = void 0;
            changed = true;
          }
        }
        if (changed) {
          streak.journal = this.encodeHabitJournal(streak.history, streak.freezeHistory, streak.startDate);
        }
      }
    }
    return changed;
  }
  /**
   * Archives a habit: moves its section from habitsFile into archiveHabitsFile
   */
  async archiveHabit(habitsFile, archiveFile, habitId, settings) {
    const habits = await this.loadHabits(habitsFile, settings.streaks || []);
    const habitToArchive = habits.find((h) => h.id === habitId);
    if (!habitToArchive) return false;
    const remainingHabits = habits.filter((h) => h.id !== habitId);
    await this.saveHabits(habitsFile, remainingHabits, settings.maxFreezesPerMonth || 4);
    settings.streaks = remainingHabits;
    const archiveHabits = await this.loadHabits(archiveFile, []);
    archiveHabits.push(habitToArchive);
    await this.saveHabits(archiveFile, archiveHabits, settings.maxFreezesPerMonth || 4);
    new import_obsidian6.Notice(`Archived "${habitToArchive.name}" to ${archiveFile}`);
    return true;
  }
  /**
   * Permanently deletes a habit from habitsFile
   */
  async deleteHabit(habitsFile, habitId, settings) {
    const habits = await this.loadHabits(habitsFile, settings.streaks || []);
    const habit = habits.find((h) => h.id === habitId);
    if (!habit) return false;
    const remaining = habits.filter((h) => h.id !== habitId);
    await this.saveHabits(habitsFile, remaining, settings.maxFreezesPerMonth || 4);
    settings.streaks = remaining;
    new import_obsidian6.Notice(`Deleted habit "${habit.name}"`);
    return true;
  }
  /**
   * Updates habit name and optional description in habitsFile
   */
  async updateHabitDetails(habitsFile, habitId, newName, newDescription, settings) {
    const cleanNewName = newName.trim();
    if (!cleanNewName) return false;
    const habits = await this.loadHabits(habitsFile, settings.streaks || []);
    const habit = habits.find((h) => h.id === habitId);
    if (!habit) return false;
    habit.name = cleanNewName;
    habit.description = newDescription ? newDescription.trim().substring(0, 150) : void 0;
    await this.saveHabits(habitsFile, habits, settings.maxFreezesPerMonth || 4);
    settings.streaks = habits;
    new import_obsidian6.Notice(`Updated habit "${cleanNewName}"`);
    return true;
  }
  /**
   * Renames a habit in habitsFile
   */
  async renameHabit(habitsFile, habitId, newName, settings) {
    return this.updateHabitDetails(habitsFile, habitId, newName, void 0, settings);
  }
  /**
   * Encodes a habit's completion and freeze dates into a compact "chess notation" journal:
   * e.g. "C:2026-10-01~2026-10-05, F:2026-10-06, X:2026-10-07, C:2026-10-08~2026-10-20"
   * C = Completed, F = Frozen, X = Missed/Break
   */
  encodeHabitJournal(history, freezeHistory = [], startDate) {
    const historySet = new Set(history || []);
    const freezeSet = new Set(freezeHistory || []);
    if (historySet.size === 0 && freezeSet.size === 0) {
      return "";
    }
    const allDates = [...historySet, ...freezeSet].sort();
    if (allDates.length === 0) return "";
    const earliestRecorded = allDates[0];
    const originDate = startDate && startDate < earliestRecorded ? startDate : earliestRecorded;
    const latestDate = moment().format("YYYY-MM-DD");
    const endDate = allDates[allDates.length - 1] > latestDate ? allDates[allDates.length - 1] : latestDate;
    const events = [];
    const curr = moment(originDate, "YYYY-MM-DD");
    const end = moment(endDate, "YYYY-MM-DD");
    while (curr.isSameOrBefore(end)) {
      const dStr = curr.format("YYYY-MM-DD");
      if (historySet.has(dStr)) {
        events.push({ date: dStr, type: "C" });
      } else if (freezeSet.has(dStr)) {
        events.push({ date: dStr, type: "F" });
      } else {
        events.push({ date: dStr, type: "X" });
      }
      curr.add(1, "day");
    }
    if (events.length === 0) return "";
    const chunks = [];
    let rangeStart = events[0];
    let rangeEnd = events[0];
    for (let i = 1; i < events.length; i++) {
      const ev = events[i];
      if (ev.type === rangeStart.type) {
        rangeEnd = ev;
      } else {
        chunks.push(
          rangeStart.date === rangeEnd.date ? `${rangeStart.type}:${rangeStart.date}` : `${rangeStart.type}:${rangeStart.date}~${rangeEnd.date}`
        );
        rangeStart = ev;
        rangeEnd = ev;
      }
    }
    chunks.push(
      rangeStart.date === rangeEnd.date ? `${rangeStart.type}:${rangeStart.date}` : `${rangeStart.type}:${rangeStart.date}~${rangeEnd.date}`
    );
    return chunks.join(", ");
  }
  /**
   * Decodes a "chess notation" journal back into exact completion and freeze dates.
   */
  decodeHabitJournal(journalStr) {
    const history = [];
    const freezeHistory = [];
    if (!journalStr || !journalStr.trim()) {
      return { history, freezeHistory };
    }
    const tokens = journalStr.split(",").map((t) => t.trim()).filter(Boolean);
    for (const token of tokens) {
      const match = token.match(/^([CFX]):(\d{4}-\d{2}-\d{2})(?:~(\d{4}-\d{2}-\d{2}))?$/i);
      if (!match) continue;
      const type = match[1].toUpperCase();
      const startStr = match[2];
      const endStr = match[3] || startStr;
      const curr = moment(startStr, "YYYY-MM-DD");
      const end = moment(endStr, "YYYY-MM-DD");
      while (curr.isSameOrBefore(end)) {
        const dStr = curr.format("YYYY-MM-DD");
        if (type === "C") {
          history.push(dStr);
        } else if (type === "F") {
          freezeHistory.push(dStr);
        }
        curr.add(1, "day");
      }
    }
    return {
      history: Array.from(new Set(history)).sort(),
      freezeHistory: Array.from(new Set(freezeHistory)).sort()
    };
  }
  /**
   * Recalculates currentStreak and bestStreak from history and freezeHistory
   */
  recalculateStreak(streak) {
    const completedSet = new Set(streak.history || []);
    const freezeSet = new Set(streak.freezeHistory || []);
    if (completedSet.size === 0) {
      streak.currentStreak = 0;
      streak.lastCompletedDate = void 0;
      streak.journal = this.encodeHabitJournal([], streak.freezeHistory || [], streak.startDate);
      return;
    }
    const sortedCompleted = Array.from(completedSet).sort();
    streak.lastCompletedDate = sortedCompleted[sortedCompleted.length - 1];
    const todayStr = moment().format("YYYY-MM-DD");
    const yesterdayStr = moment().subtract(1, "day").format("YYYY-MM-DD");
    let current = 0;
    let checkDate = completedSet.has(todayStr) ? moment() : freezeSet.has(todayStr) || completedSet.has(yesterdayStr) ? moment().subtract(1, "day") : null;
    if (checkDate) {
      while (true) {
        const dStr = checkDate.format("YYYY-MM-DD");
        if (completedSet.has(dStr)) {
          current++;
          checkDate.subtract(1, "day");
        } else if (freezeSet.has(dStr)) {
          checkDate.subtract(1, "day");
        } else {
          break;
        }
      }
    }
    streak.currentStreak = current;
    let best = 0;
    let run = 0;
    if (sortedCompleted.length > 0) {
      const earliest = sortedCompleted[0];
      const latest = sortedCompleted[sortedCompleted.length - 1];
      const iter = moment(earliest, "YYYY-MM-DD");
      const endIter = moment(latest, "YYYY-MM-DD");
      while (iter.isSameOrBefore(endIter)) {
        const dStr = iter.format("YYYY-MM-DD");
        if (completedSet.has(dStr)) {
          run++;
          if (run > best) best = run;
        } else if (!freezeSet.has(dStr)) {
          run = 0;
        }
        iter.add(1, "day");
      }
    }
    streak.bestStreak = Math.max(best, streak.currentStreak, streak.bestStreak || 0);
    streak.journal = this.encodeHabitJournal(streak.history, streak.freezeHistory, streak.startDate);
  }
  async ensureFolderForFile(filePath) {
    const lastSlash = filePath.lastIndexOf("/");
    if (lastSlash === -1) return;
    const folderPath = filePath.substring(0, lastSlash);
    const existing = this.app.vault.getAbstractFileByPath(folderPath);
    if (!existing) {
      try {
        await this.app.vault.createFolder(folderPath);
      } catch {
      }
    }
  }
};

// src/services/calendarService.ts
var import_obsidian7 = require("obsidian");
var CalendarService = class {
  constructor(app) {
    this.notifiedEventIds = /* @__PURE__ */ new Set();
    // Vibrant Material Google Calendar color palette
    this.palette = [
      "#3b82f6",
      // Blue (Default / Focus)
      "#10b981",
      // Sage / Emerald (Personal / Health)
      "#8b5cf6",
      // Grape / Purple (Projects / Deep Work)
      "#f59e0b",
      // Amber / Banana (Social / Leisure)
      "#ef4444",
      // Flamingo / Red (Deadlines / Urgent)
      "#06b6d4",
      // Peacock / Cyan (Meetings)
      "#ec4899",
      // Pink (Events / Birthdays)
      "#6366f1"
      // Indigo
    ];
    this.app = app;
  }
  /**
   * Fetches and parses an iCal (.ics) feed URL (e.g. Google Calendar secret address)
   */
  async fetchEvents(icsUrl) {
    const cleanUrl = icsUrl.trim();
    if (!cleanUrl) return [];
    try {
      const response = await (0, import_obsidian7.requestUrl)({
        url: cleanUrl,
        headers: {
          "Accept": "text/calendar, text/plain, */*"
        }
      });
      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Calendar server responded with HTTP status ${response.status}`);
      }
      return this.parseIcs(response.text);
    } catch (err) {
      console.error("[OS Dashboard] Error fetching Google Calendar events:", err);
      throw err;
    }
  }
  /**
   * Parses standard RFC 5545 iCalendar content into CalendarEventItem array
   */
  parseIcs(icsText) {
    const events = [];
    if (!icsText) return events;
    const unfolded = icsText.replace(/\r\n[ \t]/g, "").replace(/\n[ \t]/g, "");
    const lines = unfolded.split(/\r?\n/);
    let insideEvent = false;
    let currentEvent = {};
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
  processEventData(data) {
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
    const location = data["LOCATION"] ? this.unescapeIcsText(data["LOCATION"]) : void 0;
    const description = data["DESCRIPTION"] ? this.unescapeIcsText(data["DESCRIPTION"]) : void 0;
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
  expandRecurrence(baseEvent, rruleStr) {
    const list = [baseEvent];
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
  parseRrule(rruleStr) {
    const map = {};
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
  parseDateString(raw, params) {
    const isAllDayParam = params.includes("VALUE=DATE");
    if (isAllDayParam || /^\d{8}$/.test(raw)) {
      const y = raw.substring(0, 4);
      const m = raw.substring(4, 6);
      const d = raw.substring(6, 8);
      return {
        date: `${y}-${m}-${d}`,
        isAllDay: true
      };
    }
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
  unescapeIcsText(str) {
    return str.replace(/\\n/g, "\n").replace(/\\N/g, "\n").replace(/\\,/g, ",").replace(/\\;/g, ";").replace(/\\\\/g, "\\");
  }
  pickColor(str) {
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
  isEventOccurringOnDate(e, dateStr) {
    if (e.startDate === dateStr) return true;
    if (e.endDate && e.startDate <= dateStr && e.endDate >= dateStr) {
      if (e.isAllDay && e.endDate === dateStr && e.startDate !== e.endDate) return false;
      return true;
    }
    if (e.recurrence && e.recurrence.type !== "none") {
      if (dateStr < e.startDate) return false;
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
          return targetMom.format("MM-DD") === eventStartMom.format("MM-DD");
        }
      }
    }
    return false;
  }
  /**
   * Returns all events occurring on a specific date (YYYY-MM-DD)
   */
  getEventsForDate(events, dateStr) {
    const list = events.filter((e) => this.isEventOccurringOnDate(e, dateStr));
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
  hasEventsOnDate(events, dateStr) {
    return events.some((e) => this.isEventOccurringOnDate(e, dateStr));
  }
  /**
   * Checks for events starting within leadMinutes and triggers Obsidian / OS notifications
   */
  checkUpcomingEventNotifications(events, defaultLeadMinutes = 10) {
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
      const eventLead = ev.notificationLeadMinutes !== void 0 ? ev.notificationLeadMinutes : defaultLeadMinutes;
      if (diffMinutes >= 0 && diffMinutes <= eventLead) {
        this.notifiedEventIds.add(notifyKey);
        const timeMsg = diffMinutes === 0 ? "starts now!" : `starts in ${diffMinutes} minute${diffMinutes === 1 ? "" : "s"}`;
        const sourceLabel = ev.source === "local" ? "Event" : "Google Calendar";
        const msg = `${sourceLabel}: "${ev.title}" ${timeMsg} (${ev.startTime})`;
        new import_obsidian7.Notice(msg, 7e3);
        if (typeof Notification !== "undefined" && Notification.permission === "granted") {
          try {
            new Notification(`Upcoming ${sourceLabel}: ${ev.title}`, {
              body: `${timeMsg} at ${ev.startTime}${ev.location ? ` \u2022 ${ev.location}` : ""}`,
              icon: "calendar"
            });
          } catch (e) {
          }
        }
      }
    }
  }
  /**
   * Retrieves local events stored in a vault Markdown file (e.g. Events.md)
   * formatted under ## YYYY-MM-DD headings.
   * Supports Obsidian callout blocks (> [!event] ...) as well as bulleted event items.
   */
  async getLocalMarkdownEvents(filePath) {
    if (!filePath) return [];
    const file = this.app.vault.getAbstractFileByPath(filePath);
    if (!(file instanceof import_obsidian7.TFile)) return [];
    const content = await this.app.vault.read(file);
    const lines = content.split("\n");
    const events = [];
    let currentHeadingDate = null;
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
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
      const calloutMatch = line.match(/^\s*>\s*\[!event(?::[^\]]+)?\]\s*(.*)$/i);
      if (calloutMatch) {
        const startLineIdx = i;
        let rawTitle = calloutMatch[1].trim();
        let location;
        let recurrence = void 0;
        let enableNotification = false;
        let notificationLeadMinutes;
        let color;
        let description;
        i++;
        while (i < lines.length) {
          const nextLine = lines[i];
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
        let startTime;
        let endTime;
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
      const itemMatch = line.match(/^\s*[-*]\s*(?:\[[ xX]?\]\s*)?(.*)$/);
      if (itemMatch) {
        let raw = itemMatch[1].trim();
        if (raw) {
          let location;
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
          let recurrence = void 0;
          const repBracket = raw.match(/\[repeat:\s*([^\]]+)\]/i);
          const repEmoji = raw.match(/🔁\s*(?:every\s+after\s+(\d+)\s*days?|every\s+(\d+)\s*days?|every\s+day|every\s+week|every\s+month|every\s+year)/i);
          const repMatch = repBracket || repEmoji;
          if (repMatch) {
            const matchStr = (repBracket ? repBracket[1] : repEmoji[0]).toLowerCase();
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
          let enableNotification = false;
          let notificationLeadMinutes;
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
          let color;
          const colorBracket = raw.match(/\[color:\s*(#[a-fA-F0-9]{6})\]/i);
          const colorEmoji = raw.match(/🎨\s*(#[a-fA-F0-9]{6})/);
          const colorMatch = colorBracket || colorEmoji;
          if (colorMatch) {
            color = colorMatch[1];
            raw = raw.replace(colorMatch[0], "").trim();
          }
          let startTime;
          let endTime;
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
  async saveEventToMarkdown(filePath, event) {
    if (!filePath) filePath = "Events.md";
    let file = this.app.vault.getAbstractFileByPath(filePath);
    if (!(file instanceof import_obsidian7.TFile)) {
      try {
        file = await this.app.vault.create(filePath, "# Calendar Events\n\n");
      } catch (e) {
        new import_obsidian7.Notice(`Failed to create events file: ${filePath}`);
        return;
      }
    }
    if (!(file instanceof import_obsidian7.TFile)) return;
    const blockLines = [];
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
    if (event.enableNotification && event.notificationLeadMinutes !== void 0) {
      const mins = event.notificationLeadMinutes;
      const leadStr = mins >= 1440 ? `${Math.round(mins / 1440)}d` : mins >= 60 ? `${Math.round(mins / 60)}h` : `${mins}m`;
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
    const headingIdx = lines.findIndex((l) => l.trim().startsWith(targetHeading));
    if (headingIdx >= 0) {
      lines.splice(headingIdx + 1, 0, eventBlock);
    } else {
      if (lines.length > 0 && lines[lines.length - 1].trim() !== "") {
        lines.push("");
      }
      lines.push(targetHeading);
      lines.push(eventBlock);
      lines.push("");
    }
    await this.app.vault.modify(file, lines.join("\n"));
  }
};

// src/modals/scheduleTaskModal.ts
var import_obsidian8 = require("obsidian");
var ScheduleTaskModal = class extends import_obsidian8.Modal {
  constructor(app, taskService, filePath, onTaskScheduled) {
    super(app);
    this.tasksText = "";
    this.taskService = taskService;
    this.filePath = filePath;
    this.onTaskScheduled = onTaskScheduled;
    this.selectedDate = moment().format("YYYY-MM-DD");
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("os-schedule-modal");
    contentEl.createEl("h2", { text: "Schedule Tasks" });
    new import_obsidian8.Setting(contentEl).setName("Date").setDesc("Choose the date for these tasks.").addText((text) => {
      text.inputEl.type = "date";
      text.setValue(this.selectedDate).onChange((val) => {
        this.selectedDate = val || moment().format("YYYY-MM-DD");
      });
    });
    const taskSetting = new import_obsidian8.Setting(contentEl).setName("Tasks (one per line)").setDesc("Enter as many tasks as you want. Each line will be created as a separate task.");
    let textareaElRef;
    taskSetting.addTextArea((textArea) => {
      textareaElRef = textArea.inputEl;
      textArea.setPlaceholder("Review DSA topic\nSolve 10 chess puzzles\nRead 20 pages of book\nPlan tomorrow...").setValue(this.tasksText).onChange((val) => {
        this.tasksText = val;
      });
      textArea.inputEl.rows = 6;
      textArea.inputEl.style.width = "100%";
      textArea.inputEl.style.minHeight = "120px";
      textArea.inputEl.style.resize = "vertical";
      textArea.inputEl.addEventListener("keydown", async (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          await this.submit();
        }
      });
    });
    new import_obsidian8.Setting(contentEl).addButton((btn) => {
      btn.setButtonText("Schedule Tasks").setCta().onClick(async () => {
        await this.submit();
      });
    }).addButton((btn) => {
      btn.setButtonText("Cancel").onClick(() => {
        this.close();
      });
    });
    setTimeout(() => {
      if (textareaElRef) textareaElRef.focus();
    }, 50);
  }
  async submit() {
    const lines = this.tasksText.split("\n").map((line) => line.trim()).filter(Boolean);
    if (lines.length === 0) {
      new import_obsidian8.Notice("Please enter at least one task.");
      return;
    }
    const success = await this.taskService.addTasks(this.filePath, lines, this.selectedDate);
    if (success) {
      new import_obsidian8.Notice(`Scheduled ${lines.length} task${lines.length > 1 ? "s" : ""} for ${this.selectedDate}`);
      this.close();
      await this.onTaskScheduled();
    } else {
      new import_obsidian8.Notice("Failed to schedule tasks.");
    }
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/modals/wikiLinkSuggest.ts
var import_obsidian9 = require("obsidian");
var WikiLinkSuggest = class extends import_obsidian9.AbstractInputSuggest {
  constructor(app, inputEl) {
    super(app, inputEl);
    this.inputEl = inputEl;
  }
  getSuggestions(query) {
    const cursor = this.inputEl.selectionStart ?? this.inputEl.value.length;
    const textBeforeCursor = this.inputEl.value.slice(0, cursor);
    const openBracketIndex = textBeforeCursor.lastIndexOf("[[");
    if (openBracketIndex === -1) {
      return [];
    }
    const sub = textBeforeCursor.slice(openBracketIndex + 2);
    if (sub.includes("]]")) {
      return [];
    }
    const cleanQuery = sub.toLowerCase().trim();
    const markdownFiles = this.app.vault.getMarkdownFiles();
    if (!cleanQuery) {
      return markdownFiles.slice(0, 20);
    }
    return markdownFiles.filter((f) => f.basename.toLowerCase().includes(cleanQuery) || f.path.toLowerCase().includes(cleanQuery)).slice(0, 20);
  }
  renderSuggestion(file, el) {
    el.empty();
    const item = el.createDiv({ cls: "os-wikilink-suggest-item" });
    item.createSpan({ cls: "os-wikilink-title", text: file.basename });
    if (file.parent && file.parent.path !== "/") {
      item.createSpan({ cls: "os-wikilink-folder", text: file.parent.path });
    }
  }
  selectSuggestion(file) {
    const cursor = this.inputEl.selectionStart ?? this.inputEl.value.length;
    const text = this.inputEl.value;
    const textBeforeCursor = text.slice(0, cursor);
    const textAfterCursor = text.slice(cursor);
    const openBracketIndex = textBeforeCursor.lastIndexOf("[[");
    if (openBracketIndex === -1) return;
    const hasClosingBrackets = textAfterCursor.startsWith("]]");
    const prefix = text.slice(0, openBracketIndex);
    const suffix = hasClosingBrackets ? textAfterCursor.slice(2) : textAfterCursor;
    const replacement = `[[${file.basename}]]`;
    this.inputEl.value = `${prefix}${replacement}${suffix}`;
    const newCursor = prefix.length + replacement.length;
    this.inputEl.setSelectionRange(newCursor, newCursor);
    this.inputEl.dispatchEvent(new Event("input", { bubbles: true }));
    this.close();
  }
  /**
   * Returns true if the suggestion popover is currently displayed on screen.
   */
  isSuggestOpen() {
    return Boolean(
      this.isOpen || this.suggestEl && document.body.contains(this.suggestEl)
    );
  }
};

// src/modals/habitDetailsModal.ts
var import_obsidian10 = require("obsidian");
var HabitDetailsModal = class extends import_obsidian10.Modal {
  constructor(app, streak, streakService, settings, onUpdated) {
    super(app);
    this.streak = streak;
    this.streakService = streakService;
    this.settings = settings;
    this.onUpdated = onUpdated;
    this.viewDate = moment();
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    this.modalEl.addClass("os-habit-modal-dialog");
    contentEl.addClass("os-habit-details-modal");
    this.renderModalContent();
  }
  renderModalContent() {
    const { contentEl } = this;
    contentEl.empty();
    const freq = this.streak.frequency || "daily";
    const isFrozen = this.streakService.isFrozen(this.streak);
    const isDone = this.streakService.isCompletedInCurrentCycle(this.streak);
    const maxFreezes = this.settings.maxFreezesPerMonth || 4;
    const habitMaxFreezes = this.streakService.getEffectiveMaxFreezes(this.streak, maxFreezes);
    const usedFreezes = this.streakService.getFreezesUsedThisMonth(this.streak);
    const streakUnit = freq === "weekly" ? "wks" : freq === "monthly" ? "mos" : freq === "yearly" ? "yrs" : "days";
    const header = contentEl.createDiv({ cls: "os-hdetail-fixed-header" });
    const titleBlock = header.createDiv({ cls: "os-hdetail-title-block" });
    const iconWrap = titleBlock.createDiv({ cls: "os-hdetail-title-icon" });
    (0, import_obsidian10.setIcon)(iconWrap, this.streak.icon || "flame");
    const textWrap = titleBlock.createDiv({ cls: "os-hdetail-title-desc" });
    textWrap.createEl("h2", { cls: "os-hdetail-title", text: this.streak.name });
    if (this.streak.description && this.streak.description.trim()) {
      textWrap.createDiv({
        cls: "os-hdetail-desc-inline",
        text: this.streak.description.trim()
      });
    }
    const badgesRow = header.createDiv({ cls: "os-hdetail-badges" });
    badgesRow.createSpan({
      cls: "os-hdetail-badge os-badge-freq",
      text: freq.toUpperCase() + (freq !== "daily" && this.streak.scheduleType === "fixed" ? " (FIXED)" : "")
    });
    if (isFrozen) {
      badgesRow.createSpan({
        cls: "os-hdetail-badge os-badge-frozen",
        text: `\u2744\uFE0F FROZEN (${this.streakService.getFreezeDaysLeft(this.streak)}d left)`
      });
    }
    if (this.streak.startDate) {
      badgesRow.createSpan({
        cls: "os-hdetail-badge os-badge-date",
        text: `Started ${this.streak.startDate}`
      });
    }
    badgesRow.createSpan({
      cls: "os-hdetail-badge os-badge-quota",
      text: `\u2744\uFE0F ${usedFreezes}/${habitMaxFreezes} Freezes`
    });
    const bodyEl = contentEl.createDiv({ cls: "os-hdetail-scrollable-body" });
    const statsGrid = bodyEl.createDiv({ cls: "os-hdetail-stats" });
    const statCurr = statsGrid.createDiv({ cls: "os-hdetail-stat-card" });
    statCurr.createDiv({ cls: "os-hdetail-stat-label", text: "Current" });
    statCurr.createDiv({
      cls: `os-hdetail-stat-val ${isDone ? "is-active" : ""}`,
      text: `${this.streak.currentStreak || 0} ${streakUnit}`
    });
    const statBest = statsGrid.createDiv({ cls: "os-hdetail-stat-card" });
    statBest.createDiv({ cls: "os-hdetail-stat-label", text: "Best" });
    statBest.createDiv({
      cls: "os-hdetail-stat-val",
      text: `${this.streak.bestStreak || 0} ${streakUnit}`
    });
    const totalDone = (this.streak.history || []).length;
    const statTotal = statsGrid.createDiv({ cls: "os-hdetail-stat-card" });
    statTotal.createDiv({ cls: "os-hdetail-stat-label", text: "Total" });
    statTotal.createDiv({ cls: "os-hdetail-stat-val", text: `${totalDone}` });
    let rateStr = "100%";
    if (this.streak.startDate) {
      const startMom = moment(this.streak.startDate, "YYYY-MM-DD");
      const daysSince = Math.max(1, moment().diff(startMom, "days") + 1);
      const pct = Math.min(100, Math.round(totalDone / daysSince * 100));
      rateStr = `${pct}%`;
    }
    const statRate = statsGrid.createDiv({ cls: "os-hdetail-stat-card" });
    statRate.createDiv({ cls: "os-hdetail-stat-label", text: "Rate" });
    statRate.createDiv({ cls: "os-hdetail-stat-val", text: rateStr });
    const calCard = bodyEl.createDiv({ cls: "os-calendar-section os-habit-cal-container" });
    const calHeader = calCard.createDiv({ cls: "os-calendar-header" });
    const leftWrap = calHeader.createDiv({ cls: "os-calendar-header-left" });
    const title = leftWrap.createDiv({
      cls: "os-calendar-title",
      text: this.viewDate.format("MMMM YYYY")
    });
    title.setAttribute("title", "Click to jump to current month");
    title.addEventListener("click", () => {
      this.viewDate = moment();
      this.renderModalContent();
    });
    const isCurrentMonth = this.viewDate.isSame(moment(), "month");
    const nav = calHeader.createDiv({ cls: "os-calendar-nav" });
    const todayIconBtn = nav.createDiv({
      cls: `os-calendar-today-icon-btn ${isCurrentMonth ? "is-current" : "is-navigated"}`,
      title: `Jump to today (${moment().format("MMM D")})`
    });
    todayIconBtn.createDiv({ cls: "os-cal-today-icon-bar" });
    todayIconBtn.createSpan({
      cls: "os-cal-today-icon-day",
      text: moment().format("D")
    });
    todayIconBtn.addEventListener("click", () => {
      this.viewDate = moment();
      this.renderModalContent();
    });
    const prevBtn = nav.createDiv({ cls: "os-calendar-nav-btn", title: "Previous month" });
    (0, import_obsidian10.setIcon)(prevBtn, "chevron-left");
    prevBtn.addEventListener("click", () => {
      this.viewDate.subtract(1, "month");
      this.renderModalContent();
    });
    const nextBtn = nav.createDiv({ cls: "os-calendar-nav-btn", title: "Next month" });
    (0, import_obsidian10.setIcon)(nextBtn, "chevron-right");
    nextBtn.addEventListener("click", () => {
      this.viewDate.add(1, "month");
      this.renderModalContent();
    });
    const weekdaysRow = calCard.createDiv({ cls: "os-calendar-weekdays" });
    const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    weekdays.forEach((day) => {
      weekdaysRow.createDiv({ cls: "os-calendar-weekday", text: day });
    });
    const daysGrid = calCard.createDiv({ cls: "os-calendar-grid" });
    const startOfMonth = this.viewDate.clone().startOf("month");
    const daysInMonth = this.viewDate.daysInMonth();
    let startDayOfWeek = (startOfMonth.day() + 6) % 7;
    const prevMonth = this.viewDate.clone().subtract(1, "month");
    const daysInPrevMonth = prevMonth.daysInMonth();
    const nextMonth = this.viewDate.clone().add(1, "month");
    const todayStr = moment().format("YYYY-MM-DD");
    const completedSet = new Set(this.streak.history || []);
    const freezeSet = new Set(this.streak.freezeHistory || []);
    const startStr = this.streak.startDate || "1970-01-01";
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const dayNum = daysInPrevMonth - i;
      const dayMoment = prevMonth.clone().date(dayNum);
      const dStr = dayMoment.format("YYYY-MM-DD");
      const isCompleted = completedSet.has(dStr);
      const isFrozenDay = freezeSet.has(dStr);
      const isBeforeStart = dStr < startStr;
      const isMissed = !isCompleted && !isFrozenDay && !isBeforeStart;
      const dayEl = daysGrid.createDiv({
        cls: `os-calendar-day is-other-month ${isCompleted ? "is-habit-completed" : ""} ${isFrozenDay ? "is-habit-frozen" : ""} ${isMissed ? "is-habit-missed" : ""}`
      });
      const numWrap = dayEl.createDiv({ cls: "os-calendar-day-num-wrap" });
      numWrap.createSpan({ cls: "os-calendar-day-num", text: String(dayNum) });
      if (isCompleted || isFrozenDay || isMissed) {
        const dotsWrap = dayEl.createDiv({ cls: "os-calendar-event-dots" });
        const dot = dotsWrap.createSpan({ cls: "os-calendar-dot" });
        if (isCompleted) dot.addClass("os-dot-completed");
        else if (isFrozenDay) dot.addClass("os-dot-frozen");
        else if (isMissed) dot.addClass("os-dot-missed");
      }
      dayEl.setAttribute("title", `${dayMoment.format("MMM D, YYYY")} (Click to view month)`);
      dayEl.addEventListener("click", () => {
        this.viewDate.subtract(1, "month");
        this.renderModalContent();
      });
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const dayMoment = this.viewDate.clone().date(day);
      const dStr = dayMoment.format("YYYY-MM-DD");
      const isToday = dStr === todayStr;
      const isFuture = dayMoment.isAfter(moment(), "day");
      const isBeforeStart = dStr < startStr;
      const isCompleted = completedSet.has(dStr);
      const isFrozenDay = freezeSet.has(dStr);
      const isMissed = !isCompleted && !isFrozenDay && !isFuture && !isBeforeStart;
      const dayEl = daysGrid.createDiv({
        cls: `os-calendar-day ${isToday ? "is-today" : ""} ${isCompleted ? "is-habit-completed" : ""} ${isFrozenDay ? "is-habit-frozen" : ""} ${isMissed ? "is-habit-missed" : ""}`
      });
      const numWrap = dayEl.createDiv({ cls: "os-calendar-day-num-wrap" });
      numWrap.createSpan({ cls: "os-calendar-day-num", text: String(day) });
      if (isCompleted || isFrozenDay || isMissed) {
        const dotsWrap = dayEl.createDiv({ cls: "os-calendar-event-dots" });
        const dot = dotsWrap.createSpan({ cls: "os-calendar-dot" });
        if (isCompleted) dot.addClass("os-dot-completed");
        else if (isFrozenDay) dot.addClass("os-dot-frozen");
        else if (isMissed) dot.addClass("os-dot-missed");
      }
      if (isCompleted) {
        dayEl.setAttribute("title", `${dayMoment.format("MMM D, YYYY")} \u2014 Completed \u2713 (Click to toggle)`);
      } else if (isFrozenDay) {
        dayEl.setAttribute("title", `${dayMoment.format("MMM D, YYYY")} \u2014 Frozen \u2744\uFE0F`);
      } else if (isMissed) {
        dayEl.setAttribute("title", `${dayMoment.format("MMM D, YYYY")} \u2014 Missed \u2717 (Click to toggle)`);
      } else if (isToday) {
        dayEl.setAttribute("title", `${dayMoment.format("MMM D, YYYY")} \u2014 Today (Click to toggle)`);
      } else {
        dayEl.setAttribute("title", dayMoment.format("MMM D, YYYY"));
      }
      if (!isFuture && !isBeforeStart) {
        dayEl.addClass("is-interactive");
        dayEl.addEventListener("click", async () => {
          if (completedSet.has(dStr)) {
            this.streak.history = (this.streak.history || []).filter((d) => d !== dStr);
            new import_obsidian10.Notice(`Unmarked ${dayMoment.format("MMM D, YYYY")}`);
          } else {
            if (!this.streak.history) this.streak.history = [];
            this.streak.history.push(dStr);
            this.streak.history.sort();
            new import_obsidian10.Notice(`Marked ${dayMoment.format("MMM D, YYYY")} as completed!`);
          }
          this.streakService.recalculateStreak(this.streak);
          await this.onUpdated();
          this.renderModalContent();
        });
      }
    }
    const totalCells = startDayOfWeek + daysInMonth;
    const targetCells = totalCells > 35 ? 42 : 35;
    const remainingDays = targetCells - totalCells;
    for (let day = 1; day <= remainingDays; day++) {
      const dayMoment = nextMonth.clone().date(day);
      const dStr = dayMoment.format("YYYY-MM-DD");
      const dayEl = daysGrid.createDiv({
        cls: "os-calendar-day is-other-month"
      });
      const numWrap = dayEl.createDiv({ cls: "os-calendar-day-num-wrap" });
      numWrap.createSpan({ cls: "os-calendar-day-num", text: String(day) });
      dayEl.setAttribute("title", `${dayMoment.format("MMM D, YYYY")} (Click to view month)`);
      dayEl.addEventListener("click", () => {
        this.viewDate.add(1, "month");
        this.renderModalContent();
      });
    }
    const legend = calCard.createDiv({ cls: "os-habit-cal-legend" });
    const legDone = legend.createDiv({ cls: "os-habit-legend-item" });
    legDone.createSpan({ cls: "os-calendar-dot os-dot-completed" });
    legDone.createSpan({ text: "Completed" });
    const legFreeze = legend.createDiv({ cls: "os-habit-legend-item" });
    legFreeze.createSpan({ cls: "os-calendar-dot os-dot-frozen" });
    legFreeze.createSpan({ text: "Frozen" });
    const legMissed = legend.createDiv({ cls: "os-habit-legend-item" });
    legMissed.createSpan({ cls: "os-calendar-dot os-dot-missed" });
    legMissed.createSpan({ text: "Missed" });
    const footer = contentEl.createDiv({ cls: "os-hdetail-fixed-footer" });
    const freezeBtn = footer.createEl("button", {
      cls: isFrozen ? "mod-warning" : "",
      text: isFrozen ? "Manage Freeze" : "Freeze Habit"
    });
    freezeBtn.addEventListener("click", () => {
      this.close();
      new FreezeStreakModal(this.app, this.streak, this.streakService, habitMaxFreezes, async () => {
        await this.onUpdated();
      }).open();
    });
    const editBtn = footer.createEl("button", { text: "Edit Habit..." });
    editBtn.addEventListener("click", () => {
      this.close();
      new StreakModal(this.app, this.streak, async (updated) => {
        await this.streakService.updateHabitDetails(
          this.settings.habitsFile || "Habits.md",
          this.streak.id,
          updated.name,
          updated.description,
          this.settings
        );
        await this.onUpdated();
      }).open();
    });
    const closeBtn = footer.createEl("button", { text: "Close", cls: "mod-cta" });
    closeBtn.addEventListener("click", () => {
      this.close();
    });
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/modals/eventModal.ts
var import_obsidian11 = require("obsidian");
var EventModal = class extends import_obsidian11.Modal {
  constructor(app, event, defaultDate, onSave, onDelete) {
    super(app);
    this.title = "";
    this.startDate = "";
    this.endDate = "";
    this.isAllDay = true;
    this.startTime = "09:00";
    this.endTime = "10:00";
    this.color = "#3b82f6";
    this.location = "";
    this.description = "";
    // Recurrence
    this.recurrenceType = "none";
    this.intervalDays = 2;
    this.recurrenceUntil = "";
    // Notification
    this.enableNotification = true;
    this.notificationLeadMinutes = 10;
    this.colors = [
      { label: "Blue", hex: "#3b82f6" },
      { label: "Emerald", hex: "#10b981" },
      { label: "Grape", hex: "#8b5cf6" },
      { label: "Amber", hex: "#f59e0b" },
      { label: "Flamingo", hex: "#ef4444" },
      { label: "Peacock", hex: "#06b6d4" },
      { label: "Pink", hex: "#ec4899" },
      { label: "Indigo", hex: "#6366f1" }
    ];
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
      this.notificationLeadMinutes = event.notificationLeadMinutes !== void 0 ? event.notificationLeadMinutes : 10;
    } else {
      this.startDate = this.defaultDate;
      this.endDate = this.defaultDate;
    }
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("os-event-edit-modal");
    contentEl.createEl("h2", { text: this.event ? "Edit Event" : "Create New Event" });
    new import_obsidian11.Setting(contentEl).setName("Event Title").setDesc("Title of the event or birthday (e.g., Team Sync, John's Birthday, Gym Workout).").addText((text) => {
      text.setValue(this.title).setPlaceholder("e.g. Alex's Birthday").onChange((val) => {
        this.title = val;
      });
    });
    new import_obsidian11.Setting(contentEl).setName("Date").setDesc("Date of event occurrence.").addText((text) => {
      text.inputEl.type = "date";
      text.setValue(this.startDate).onChange((val) => {
        this.startDate = val;
        if (!this.endDate || this.endDate < val) {
          this.endDate = val;
        }
      });
    });
    let timeSetting = null;
    new import_obsidian11.Setting(contentEl).setName("All-day Event").setDesc("Check for birthdays, holidays, or all-day milestones.").addToggle((toggle) => {
      toggle.setValue(this.isAllDay).onChange((val) => {
        this.isAllDay = val;
        if (timeSetting) {
          timeSetting.settingEl.style.display = val ? "none" : "flex";
        }
      });
    });
    timeSetting = new import_obsidian11.Setting(contentEl).setName("Time (Start & End)").setDesc("Set start and end time in 24h format (HH:mm).");
    timeSetting.addText((text) => {
      text.inputEl.type = "time";
      text.setValue(this.startTime).onChange((val) => {
        this.startTime = val;
      });
    });
    timeSetting.addText((text) => {
      text.inputEl.type = "time";
      text.setValue(this.endTime).onChange((val) => {
        this.endTime = val;
      });
    });
    timeSetting.settingEl.style.display = this.isAllDay ? "none" : "flex";
    let intervalSetting = null;
    let untilSetting = null;
    new import_obsidian11.Setting(contentEl).setName("Repeat").setDesc("Set recurrence frequency (like in Google Calendar).").addDropdown((dd) => {
      dd.addOption("none", "Does not repeat");
      dd.addOption("custom_days", "Every after N days...");
      dd.addOption("daily", "Every day");
      dd.addOption("weekly", "Every week");
      dd.addOption("monthly", "Every month");
      dd.addOption("yearly", "Every year (Birthday / Anniversary)");
      dd.setValue(this.recurrenceType);
      dd.onChange((val) => {
        this.recurrenceType = val;
        updateRecurrenceUI();
      });
    });
    intervalSetting = new import_obsidian11.Setting(contentEl).setName("Repeat Interval").setDesc("Repeat every after how many days (e.g. 2 for every 2nd day).").addText((text) => {
      text.inputEl.type = "number";
      text.inputEl.min = "1";
      text.inputEl.max = "365";
      text.setValue(String(this.intervalDays)).onChange((val) => {
        const num = parseInt(val, 10);
        if (!isNaN(num) && num > 0) {
          this.intervalDays = num;
        }
      });
    });
    untilSetting = new import_obsidian11.Setting(contentEl).setName("Repeat Until").setDesc("Optional end date for repetition (leave blank to repeat indefinitely).").addText((text) => {
      text.inputEl.type = "date";
      text.setValue(this.recurrenceUntil).onChange((val) => {
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
    const colorSetting = new import_obsidian11.Setting(contentEl).setName("Color Accent").setDesc("Choose an Android Calendar Material You color.");
    const swatchWrap = colorSetting.controlEl.createDiv({ cls: "os-color-swatches" });
    for (const c of this.colors) {
      const swatch = swatchWrap.createDiv({
        cls: `os-color-swatch ${this.color === c.hex ? "is-selected" : ""}`,
        title: c.label
      });
      swatch.style.backgroundColor = c.hex;
      swatch.addEventListener("click", () => {
        this.color = c.hex;
        swatchWrap.querySelectorAll(".os-color-swatch").forEach((s) => s.removeClass("is-selected"));
        swatch.addClass("is-selected");
      });
    }
    new import_obsidian11.Setting(contentEl).setName("Location").setDesc("Optional venue, address, or meeting URL.").addText((text) => {
      text.setValue(this.location).setPlaceholder("e.g. Room 402, Zoom, or Starbucks").onChange((val) => {
        this.location = val;
      });
    });
    new import_obsidian11.Setting(contentEl).setName("Description").setDesc("Notes or agenda for this event.").addTextArea((ta) => {
      ta.setValue(this.description).setPlaceholder("Add notes or agenda...").onChange((val) => {
        this.description = val;
      });
    });
    let leadTimeSetting = null;
    new import_obsidian11.Setting(contentEl).setName("Reminders & Notification").setDesc("Receive notification before this event starts.").addToggle((toggle) => {
      toggle.setValue(this.enableNotification).onChange((val) => {
        this.enableNotification = val;
        if (leadTimeSetting) {
          leadTimeSetting.settingEl.style.display = val ? "flex" : "none";
        }
      });
    });
    leadTimeSetting = new import_obsidian11.Setting(contentEl).setName("Notification Lead Time").setDesc("When to trigger the reminder notice.").addDropdown((dd) => {
      dd.addOption("0", "At time of event");
      dd.addOption("5", "5 minutes before");
      dd.addOption("10", "10 minutes before");
      dd.addOption("15", "15 minutes before");
      dd.addOption("30", "30 minutes before");
      dd.addOption("60", "1 hour before");
      dd.addOption("1440", "1 day before");
      dd.setValue(String(this.notificationLeadMinutes));
      dd.onChange((val) => {
        this.notificationLeadMinutes = parseInt(val, 10);
      });
    });
    leadTimeSetting.settingEl.style.display = this.enableNotification ? "flex" : "none";
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
        new import_obsidian11.Notice("Please enter an event title.");
        return;
      }
      if (!this.startDate) {
        new import_obsidian11.Notice("Please select a date.");
        return;
      }
      const eventItem = {
        id: this.event ? this.event.id : `local-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        title: cleanTitle,
        startDate: this.startDate,
        endDate: this.endDate || this.startDate,
        isAllDay: this.isAllDay,
        startTime: this.isAllDay ? void 0 : this.startTime,
        endTime: this.isAllDay ? void 0 : this.endTime,
        color: this.color,
        location: this.location.trim() || void 0,
        description: this.description.trim() || void 0,
        source: "local",
        enableNotification: this.enableNotification,
        notificationLeadMinutes: this.notificationLeadMinutes,
        recurrence: this.recurrenceType !== "none" ? {
          type: this.recurrenceType,
          intervalDays: this.intervalDays,
          until: this.recurrenceUntil || void 0
        } : void 0
      };
      await this.onSave(eventItem);
      new import_obsidian11.Notice(`\u2705 Event "${cleanTitle}" saved!`);
      this.close();
    });
  }
  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
};

// src/modals/quoteModal.ts
var import_obsidian12 = require("obsidian");
var QuoteModal = class extends import_obsidian12.Modal {
  constructor(app, quote, author, onSave) {
    super(app);
    this.quote = quote;
    this.author = author;
    this.onSave = onSave;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("os-quote-modal");
    contentEl.createEl("h2", { text: "Edit Quote Widget" });
    new import_obsidian12.Setting(contentEl).setName("Quote Text").setDesc("The motivational quote displayed in the quote card.").addTextArea((text) => {
      text.setValue(this.quote).setPlaceholder("\u201CConsistency is more important than intensity.\u201D").onChange((val) => {
        this.quote = val;
      });
      text.inputEl.rows = 4;
      text.inputEl.style.width = "100%";
    });
    new import_obsidian12.Setting(contentEl).setName("Author").setDesc("Quote author or source (optional).").addText((text) => {
      text.setValue(this.author).setPlaceholder("e.g. Marcus Aurelius").onChange((val) => {
        this.author = val;
      });
    });
    new import_obsidian12.Setting(contentEl).addButton((btn) => {
      btn.setButtonText("Cancel").onClick(() => this.close());
    }).addButton((btn) => {
      btn.setButtonText("Save Quote").setCta().onClick(async () => {
        const finalQuote = this.quote.trim();
        if (!finalQuote) {
          new import_obsidian12.Notice("Quote text cannot be empty.");
          return;
        }
        await this.onSave(finalQuote, this.author.trim());
        this.close();
      });
    });
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/view/renderer.ts
var DashboardRenderer = class extends import_obsidian13.Component {
  constructor(app, settings, navigationService, taskService, recentNotesService, quickCaptureService, projectService, quoteService, iconService, streakService, calendarService, onSaveSettings) {
    super();
    this.rootContainerEl = null;
    this.clockInterval = null;
    this.activeTodayTab = "tasks";
    this.calendarDate = moment();
    this.selectedCalendarDate = moment().format("YYYY-MM-DD");
    this.calendarViewMode = "month";
    this.calendarCardEl = null;
    this.streaksCardEl = null;
    this.embeddedGraphLeaf = null;
    this.resizeObserver = null;
    this.app = app;
    this.settings = settings;
    this.navigationService = navigationService;
    this.taskService = taskService;
    this.recentNotesService = recentNotesService;
    this.quickCaptureService = quickCaptureService;
    this.projectService = projectService;
    this.quoteService = quoteService;
    this.iconService = iconService;
    this.streakService = streakService || new StreakService(app);
    this.calendarService = calendarService || new CalendarService(app);
    this.onSaveSettings = onSaveSettings;
  }
  updateSettings(settings) {
    this.settings = settings;
  }
  destroy() {
    if (this.clockInterval !== null) {
      window.clearInterval(this.clockInterval);
      this.clockInterval = null;
    }
    if (this.embeddedGraphLeaf) {
      try {
        if (this.embeddedGraphLeaf.view) {
          this.embeddedGraphLeaf.view.saveSettings = () => {
          };
          this.embeddedGraphLeaf.view.saveState = () => {
          };
          this.embeddedGraphLeaf.view.save = () => {
          };
        }
        this.embeddedGraphLeaf.detach();
      } catch (e) {
      }
      this.embeddedGraphLeaf = null;
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }
  async render(container) {
    this.rootContainerEl = container;
    this.destroy();
    container.empty();
    container.addClass("os-dashboard-root");
    const scrollContainer = container.createDiv({ cls: "os-dashboard-container" });
    scrollContainer.addEventListener("click", async (e) => {
      const target = e.target;
      const internalLink = target.closest("a.internal-link");
      if (internalLink) {
        e.preventDefault();
        e.stopPropagation();
        const href = internalLink.getAttribute("data-href") || internalLink.getAttribute("href");
        if (href) {
          const sourceFile = internalLink.closest("[data-source-file]")?.getAttribute("data-source-file") || "";
          const isNewLeaf = e.ctrlKey || e.metaKey || e.button === 1;
          await this.app.workspace.openLinkText(href, sourceFile, isNewLeaf);
        }
        return;
      }
      const externalLink = target.closest("a.external-link");
      if (externalLink) {
        e.preventDefault();
        e.stopPropagation();
        const href = externalLink.getAttribute("href");
        if (href) {
          window.open(href, "_blank");
        }
        return;
      }
    });
    scrollContainer.addEventListener("mouseover", (e) => {
      const target = e.target;
      const internalLink = target.closest("a.internal-link");
      if (internalLink) {
        const href = internalLink.getAttribute("data-href") || internalLink.getAttribute("href");
        if (href) {
          const sourceFile = internalLink.closest("[data-source-file]")?.getAttribute("data-source-file") || "";
          this.app.workspace.trigger("hover-link", {
            event: e,
            source: "os-dashboard",
            hoverParent: scrollContainer,
            targetEl: internalLink,
            linktext: href,
            sourcePath: sourceFile
          });
        }
      }
    });
    const bodyEl = scrollContainer.createDiv({ cls: "os-dashboard-body" });
    const layoutEl = bodyEl.createDiv({ cls: "os-dashboard-layout" });
    const mainEl = layoutEl.createDiv({ cls: "os-dashboard-main" });
    if (this.settings.showHeroBanner ?? true) {
      this.renderHero(mainEl);
    }
    if (this.settings.showNavRibbon ?? true) {
      await this.renderNavigationRibbon(mainEl);
    }
    const layout = this.getResolvedLayout();
    const isMobileView = import_obsidian13.Platform.isMobile || import_obsidian13.Platform.isPhone || container.clientWidth > 0 && container.clientWidth < 850;
    if (isMobileView) {
      await this.renderMobileWidgets(mainEl, layout);
    } else {
      await this.renderMainGrid(mainEl, layout);
      if (this.settings.showRightRail ?? true) {
        const railEl = layoutEl.createDiv({ cls: "os-dashboard-side-rail" });
        await this.renderColumnWidgets(railEl, layout.rail, "rail");
      }
    }
    if (!import_obsidian13.Platform.isMobile && !import_obsidian13.Platform.isPhone && typeof ResizeObserver !== "undefined") {
      let lastWasMobile = isMobileView;
      this.resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const w = entry.contentRect.width;
          if (w > 0) {
            const nowMobile = w < 850;
            if (nowMobile !== lastWasMobile) {
              lastWasMobile = nowMobile;
              this.render(container);
            }
          }
        }
      });
      this.resizeObserver.observe(container);
    }
  }
  renderHero(container) {
    const heroEl = container.createDiv({ cls: "os-dashboard-hero" });
    let bannerUrl = "";
    if (this.settings.bannerPath) {
      if (this.settings.bannerPath.startsWith("http://") || this.settings.bannerPath.startsWith("https://")) {
        bannerUrl = this.settings.bannerPath;
      } else {
        const bannerFile = this.app.vault.getAbstractFileByPath(this.settings.bannerPath);
        if (bannerFile instanceof import_obsidian13.TFile) {
          bannerUrl = this.app.vault.getResourcePath(bannerFile);
        }
      }
    }
    if (bannerUrl) {
      heroEl.style.backgroundImage = `linear-gradient(180deg, rgba(13, 17, 23, 0.3) 0%, rgba(13, 17, 23, 0.85) 70%, rgba(13, 17, 23, 1) 100%), url("${bannerUrl}")`;
    }
    const topQuote = this.quoteService.getTopQuote(this.settings);
    if (topQuote) {
      const topQuoteEl = heroEl.createDiv({ cls: "os-dashboard-quote-top" });
      const lines = topQuote.split("\n");
      lines.forEach((line, idx) => {
        const lineEl = topQuoteEl.createDiv({ text: line });
        if (idx === lines.length - 1) lineEl.addClass("os-quote-italic");
      });
      topQuoteEl.createDiv({ cls: "os-quote-gold-line" });
    }
    const heroContent = heroEl.createDiv({ cls: "os-dashboard-hero-content" });
    const identityBox = heroContent.createDiv({ cls: "os-dashboard-identity" });
    const headerRow = identityBox.createDiv({ cls: "os-dashboard-header-row" });
    const avatarBox = headerRow.createDiv({ cls: "os-dashboard-avatar" });
    (0, import_obsidian13.setIcon)(avatarBox, this.settings.vaultAvatarIcon || "home");
    const titleGroup = headerRow.createDiv({ cls: "os-dashboard-title-group" });
    titleGroup.createEl("h1", { cls: "os-dashboard-title", text: this.settings.vaultTitle || "SSK_OS" });
    titleGroup.createDiv({ cls: "os-dashboard-subtitle", text: this.settings.vaultSubtitle || "Think \u2022 Learn \u2022 Build \u2022 Create \u2022 Grow" });
    const mainQuote = this.quoteService.getMainQuote(this.settings);
    if (mainQuote) {
      const quoteCard = identityBox.createDiv({ cls: "os-dashboard-quote-card" });
      quoteCard.createSpan({ text: mainQuote });
    }
    const clockCard = heroContent.createDiv({ cls: "os-dashboard-clock-card" });
    const dateLabel = clockCard.createDiv({ cls: "os-dashboard-clock-date" });
    const timeLabel = clockCard.createDiv({ cls: "os-dashboard-clock-time" });
    const clockSub = clockCard.createDiv({ cls: "os-dashboard-clock-sub" });
    const updateClock = () => {
      const now = moment();
      dateLabel.setText(now.format("ddd, D MMM YYYY"));
      timeLabel.setText(now.format("HH:mm"));
    };
    updateClock();
    this.clockInterval = window.setInterval(updateClock, 1e3);
    const clockSubLines = (this.settings.clockSubtitle || "Small steps every day\nlead to big results.").split("\n");
    clockSubLines.forEach((l) => clockSub.createDiv({ text: l }));
  }
  async renderNavigationRibbon(container) {
    const folderCards = this.navigationService.getFolderCards(this.settings);
    if (folderCards.length === 0) return;
    const wrapper = container.createDiv({ cls: "os-nav-ribbon-wrapper" });
    const leftBtn = wrapper.createEl("button", {
      cls: "os-nav-scroll-btn os-nav-scroll-left is-hidden",
      title: "Scroll left"
    });
    (0, import_obsidian13.setIcon)(leftBtn, "chevron-left");
    const ribbonEl = wrapper.createDiv({ cls: "os-dashboard-nav-ribbon" });
    const rightBtn = wrapper.createEl("button", {
      cls: "os-nav-scroll-btn os-nav-scroll-right is-hidden",
      title: "Scroll right"
    });
    (0, import_obsidian13.setIcon)(rightBtn, "chevron-right");
    for (const card of folderCards) {
      const cardEl = ribbonEl.createDiv({ cls: "os-dashboard-folder-card" });
      const accentColor = card.resolvedIcon.color;
      cardEl.style.setProperty("--card-accent", accentColor);
      cardEl.style.setProperty("--card-accent-rgb", hexToRgb(accentColor));
      const iconWrap = cardEl.createDiv({ cls: "os-folder-icon-wrap" });
      this.iconService.renderIcon(iconWrap, card.resolvedIcon);
      const titleEl = cardEl.createDiv({ cls: "os-folder-title", text: card.name });
      const subtitleEl = cardEl.createDiv({ cls: "os-folder-subtitle", text: card.subtitle || (card.hasHome ? "Open Home" : "Create Note") });
      cardEl.addEventListener("click", async () => {
        await this.navigationService.handleFolderClick(card, this.settings);
      });
    }
    leftBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      ribbonEl.scrollBy({ left: -240, behavior: "smooth" });
    });
    rightBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      ribbonEl.scrollBy({ left: 240, behavior: "smooth" });
    });
    const updateNavButtons = () => {
      const { scrollLeft, scrollWidth, clientWidth } = ribbonEl;
      const canScroll = scrollWidth > clientWidth + 2;
      if (!canScroll) {
        leftBtn.addClass("is-hidden");
        rightBtn.addClass("is-hidden");
        return;
      }
      if (scrollLeft > 4) {
        leftBtn.removeClass("is-hidden");
      } else {
        leftBtn.addClass("is-hidden");
      }
      if (scrollLeft + clientWidth < scrollWidth - 4) {
        rightBtn.removeClass("is-hidden");
      } else {
        rightBtn.addClass("is-hidden");
      }
    };
    ribbonEl.addEventListener("scroll", updateNavButtons, { passive: true });
    window.requestAnimationFrame(() => {
      updateNavButtons();
    });
    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(() => updateNavButtons());
      ro.observe(ribbonEl);
      this.register(() => ro.disconnect());
    }
  }
  async renderMainGrid(container, layout) {
    const gridEl = container.createDiv({ cls: "os-dashboard-grid" });
    const col1 = gridEl.createDiv({ cls: "os-dashboard-col" });
    await this.renderColumnWidgets(col1, layout.col1, "col1");
    const col2 = gridEl.createDiv({ cls: "os-dashboard-col" });
    await this.renderColumnWidgets(col2, layout.col2, "col2");
    const col3 = gridEl.createDiv({ cls: "os-dashboard-col" });
    await this.renderColumnWidgets(col3, layout.col3, "col3");
  }
  getInterleavedWidgetList(layout) {
    const result = [];
    const col1 = layout.col1 || [];
    const col2 = layout.col2 || [];
    const col3 = layout.col3 || [];
    const rail = this.settings.showRightRail ?? true ? layout.rail || [] : [];
    const maxLen = Math.max(col1.length, col2.length, col3.length, rail.length);
    for (let r = 0; r < maxLen; r++) {
      if (col1[r]) result.push({ widgetId: col1[r], colName: "col1" });
      if (col2[r]) result.push({ widgetId: col2[r], colName: "col2" });
      if (col3[r]) result.push({ widgetId: col3[r], colName: "col3" });
      if (rail[r]) result.push({ widgetId: rail[r], colName: "rail" });
    }
    return result;
  }
  async renderMobileWidgets(container, layout) {
    const mobileCol = container.createDiv({ cls: "os-dashboard-col os-dashboard-mobile-col" });
    const items = this.getInterleavedWidgetList(layout);
    for (const item of items) {
      const prevCount = mobileCol.childElementCount;
      await this.renderSingleWidget(mobileCol, item.widgetId);
      if (mobileCol.childElementCount > prevCount) {
        const cardEl = mobileCol.lastElementChild;
        this.attachDragAndDropToCard(cardEl, item.widgetId, item.colName);
      }
    }
  }
  getResolvedLayout() {
    const raw = this.settings.widgetLayout;
    const defaultCols = {
      col1: ["todayTasks", "weeklyTasks"],
      col2: ["recentNotes", "quickCapture"],
      col3: ["ongoingProjects", "bookmarks"],
      rail: ["calendar", "streaks", "graphView", "rightQuote"]
    };
    if (raw && Array.isArray(raw.rail)) {
      const oldDefaultSeq = ["calendar", "graphView", "streaks", "rightQuote"];
      if (raw.rail.length === 4 && raw.rail.every((v, i) => v === oldDefaultSeq[i])) {
        raw.rail = ["calendar", "streaks", "graphView", "rightQuote"];
      }
    }
    if (!raw) return defaultCols;
    const col1 = Array.isArray(raw.col1) ? [...raw.col1] : [...defaultCols.col1];
    const col2 = Array.isArray(raw.col2) ? [...raw.col2] : [...defaultCols.col2];
    const col3 = Array.isArray(raw.col3) ? [...raw.col3] : [...defaultCols.col3];
    const rail = Array.isArray(raw.rail) ? [...raw.rail] : [...defaultCols.rail];
    const placed = /* @__PURE__ */ new Set([...col1, ...col2, ...col3, ...rail]);
    for (const id of defaultCols.col1) {
      if (!placed.has(id)) {
        col1.push(id);
        placed.add(id);
      }
    }
    for (const id of defaultCols.col2) {
      if (!placed.has(id)) {
        col2.push(id);
        placed.add(id);
      }
    }
    for (const id of defaultCols.col3) {
      if (!placed.has(id)) {
        col3.push(id);
        placed.add(id);
      }
    }
    for (const id of defaultCols.rail) {
      if (!placed.has(id)) {
        rail.push(id);
        placed.add(id);
      }
    }
    for (const cw of this.settings.customWidgets || []) {
      const cid = `custom-${cw.id}`;
      if (!placed.has(cid)) {
        if (cw.column === 2) col2.push(cid);
        else if (cw.column === 3) col3.push(cid);
        else col1.push(cid);
        placed.add(cid);
      }
    }
    return { col1, col2, col3, rail };
  }
  async renderColumnWidgets(colEl, widgetIds, colId) {
    this.setupColumnDropZone(colEl, colId);
    let renderedCount = 0;
    for (const widgetId of widgetIds) {
      const prevCount = colEl.childElementCount;
      await this.renderSingleWidget(colEl, widgetId);
      if (colEl.childElementCount > prevCount) {
        const cardEl = colEl.lastElementChild;
        this.attachDragAndDropToCard(cardEl, widgetId, colId);
        renderedCount++;
      }
    }
    if (renderedCount === 0) {
      const emptyZone = colEl.createDiv({ cls: "os-col-empty-zone" });
      emptyZone.createSpan({ cls: "os-col-empty-text", text: "Drop widget here" });
    }
  }
  async renderSingleWidget(container, widgetId) {
    switch (widgetId) {
      case "todayTasks":
        if (this.settings.showTodayTasks ?? true) {
          await this.renderTodayTasks(container);
        }
        break;
      case "weeklyTasks":
        if (this.settings.showWeeklyTasks ?? true) {
          await this.renderWeeklyTasks(container);
        }
        break;
      case "recentNotes":
        if (this.settings.showRecentNotes ?? true) {
          await this.renderRecentNotes(container);
        }
        break;
      case "quickCapture":
        if (this.settings.showQuickCapture ?? true) {
          this.renderQuickCapture(container);
        }
        break;
      case "ongoingProjects":
        if (this.settings.showOngoingProjects ?? true) {
          await this.renderOngoingProjects(container);
        }
        break;
      case "bookmarks":
        if (this.settings.showBookmarks ?? true) {
          this.renderLinksWidget(container);
        }
        break;
      case "calendar":
        if (this.settings.showCalendar ?? true) {
          await this.renderCalendarWidget(container);
        }
        break;
      case "graphView":
        if (this.settings.showGraphView ?? true) {
          await this.renderGraphWidget(container);
        }
        break;
      case "streaks":
        if (this.settings.showStreaks ?? true) {
          await this.renderStreaksWidget(container);
        }
        break;
      case "rightQuote":
        if (this.settings.showRightQuote ?? true) {
          this.renderRightQuoteWidget(container);
        }
        break;
      default:
        if (widgetId.startsWith("custom-")) {
          const rawId = widgetId.replace("custom-", "");
          const widget = (this.settings.customWidgets || []).find((w) => w.id === rawId);
          if (widget && (widget.enabled ?? true)) {
            await this.renderCustomWidget(container, widget);
          }
        }
        break;
    }
  }
  attachDragAndDropToCard(cardEl, widgetId, colId) {
    cardEl.setAttribute("data-widget-id", widgetId);
    cardEl.setAttribute("data-col-id", colId);
    cardEl.setAttribute("draggable", "true");
    const header = cardEl.querySelector(".os-card-header, .os-calendar-header");
    if (header) {
      const handle = createDiv({ cls: "os-card-drag-handle" });
      (0, import_obsidian13.setIcon)(handle, "grip-vertical");
      handle.setAttribute("title", "Drag to move widget");
      const left = header.querySelector(".os-card-header-left, .os-calendar-header-left");
      if (left) {
        left.prepend(handle);
      } else {
        header.prepend(handle);
      }
    }
    cardEl.addEventListener("dragstart", (e) => {
      const target = e.target;
      if (target.closest("button, input, textarea, select, a, .os-today-tab-btn, .os-calendar-nav-btn, .os-color-swatch, .os-task-action-btn, .os-streak-action-btn, .os-streak-actions, .os-agenda-action-btn, .os-card-header-btn")) {
        e.preventDefault();
        return;
      }
      cardEl.addClass("is-dragging");
      document.body.addClass("os-dashboard-dragging-active");
      if (e.dataTransfer) {
        e.dataTransfer.setData("text/plain", widgetId);
        e.dataTransfer.effectAllowed = "move";
      }
    });
    cardEl.addEventListener("dragend", () => {
      cardEl.removeClass("is-dragging");
      document.body.removeClass("os-dashboard-dragging-active");
      document.querySelectorAll(".os-drop-indicator-top, .os-drop-indicator-bottom, .is-drag-over").forEach((el) => {
        el.removeClass("os-drop-indicator-top");
        el.removeClass("os-drop-indicator-bottom");
        el.removeClass("is-drag-over");
      });
    });
    cardEl.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
      const rect = cardEl.getBoundingClientRect();
      const midY = rect.top + rect.height / 2;
      if (e.clientY < midY) {
        cardEl.addClass("os-drop-indicator-top");
        cardEl.removeClass("os-drop-indicator-bottom");
      } else {
        cardEl.addClass("os-drop-indicator-bottom");
        cardEl.removeClass("os-drop-indicator-top");
      }
    });
    cardEl.addEventListener("dragleave", () => {
      cardEl.removeClass("os-drop-indicator-top");
      cardEl.removeClass("os-drop-indicator-bottom");
    });
    cardEl.addEventListener("drop", async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const draggedId = e.dataTransfer?.getData("text/plain");
      if (!draggedId || draggedId === widgetId) {
        cardEl.removeClass("os-drop-indicator-top");
        cardEl.removeClass("os-drop-indicator-bottom");
        return;
      }
      const isBefore = cardEl.hasClass("os-drop-indicator-top");
      cardEl.removeClass("os-drop-indicator-top");
      cardEl.removeClass("os-drop-indicator-bottom");
      await this.moveWidget(draggedId, colId, widgetId, isBefore);
    });
  }
  setupColumnDropZone(colEl, colId) {
    colEl.setAttribute("data-col-id", colId);
    colEl.addEventListener("dragover", (e) => {
      e.preventDefault();
      if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
      colEl.addClass("is-drag-over");
    });
    colEl.addEventListener("dragleave", (e) => {
      if (!colEl.contains(e.relatedTarget)) {
        colEl.removeClass("is-drag-over");
      }
    });
    colEl.addEventListener("drop", async (e) => {
      e.preventDefault();
      colEl.removeClass("is-drag-over");
      if (e.target.closest(".os-dashboard-card")) {
        return;
      }
      const draggedId = e.dataTransfer?.getData("text/plain");
      if (!draggedId) return;
      await this.moveWidget(draggedId, colId, null, false);
    });
  }
  async moveWidget(draggedId, targetColId, targetWidgetId, insertBefore) {
    const layout = this.getResolvedLayout();
    const colKeys = ["col1", "col2", "col3", "rail"];
    for (const key of colKeys) {
      layout[key] = layout[key].filter((id) => id !== draggedId);
    }
    const targetList = layout[targetColId];
    if (!targetList) return;
    if (targetWidgetId) {
      const targetIdx = targetList.indexOf(targetWidgetId);
      if (targetIdx >= 0) {
        const insertIdx = insertBefore ? targetIdx : targetIdx + 1;
        targetList.splice(insertIdx, 0, draggedId);
      } else {
        targetList.push(draggedId);
      }
    } else {
      targetList.push(draggedId);
    }
    this.settings.widgetLayout = layout;
    if (this.onSaveSettings) {
      await this.onSaveSettings();
    }
    if (this.rootContainerEl) {
      await this.render(this.rootContainerEl);
    }
  }
  // --- Column 1 Widgets ---
  async renderTodayTasks(container) {
    const cardEl = container.createDiv({ cls: "os-dashboard-card os-card-tasks os-card-today-tabs" });
    const header = cardEl.createDiv({ cls: "os-card-header os-card-header-tabs" });
    const headerLeft = header.createDiv({ cls: "os-card-header-left os-today-header-left" });
    const iconEl = headerLeft.createSpan({ cls: "os-card-icon" });
    (0, import_obsidian13.setIcon)(iconEl, "check-circle");
    headerLeft.createEl("h3", { text: "Daily" });
    const tabsWrap = headerLeft.createDiv({ cls: "os-today-tab-group" });
    const taskTabBtn = tabsWrap.createEl("button", {
      cls: `os-today-tab-btn ${this.activeTodayTab === "tasks" ? "is-active" : ""}`
    });
    taskTabBtn.setAttribute("title", "Tasks");
    taskTabBtn.setAttribute("aria-label", "Tasks");
    const taskIcon = taskTabBtn.createSpan({ cls: "os-today-tab-icon" });
    (0, import_obsidian13.setIcon)(taskIcon, "check-square");
    taskTabBtn.createSpan({ cls: "os-today-tab-label", text: "Task" });
    taskTabBtn.createSpan({ cls: "os-today-tab-count" });
    const logTabBtn = tabsWrap.createEl("button", {
      cls: `os-today-tab-btn ${this.activeTodayTab === "log" ? "is-active" : ""}`
    });
    logTabBtn.setAttribute("title", "Daily Log");
    logTabBtn.setAttribute("aria-label", "Daily Log");
    const logIcon = logTabBtn.createSpan({ cls: "os-today-tab-icon" });
    (0, import_obsidian13.setIcon)(logIcon, "clipboard-list");
    logTabBtn.createSpan({ cls: "os-today-tab-label", text: "Log" });
    logTabBtn.createSpan({ cls: "os-today-tab-count" });
    const overdueTabBtn = tabsWrap.createEl("button", {
      cls: `os-today-tab-btn os-tab-overdue ${this.activeTodayTab === "overdue" ? "is-active" : ""}`
    });
    overdueTabBtn.setAttribute("title", "Overdue Tasks");
    overdueTabBtn.setAttribute("aria-label", "Overdue Tasks");
    const overdueIcon = overdueTabBtn.createSpan({ cls: "os-today-tab-icon" });
    (0, import_obsidian13.setIcon)(overdueIcon, "history");
    overdueTabBtn.createSpan({ cls: "os-today-tab-label", text: "Overdue" });
    overdueTabBtn.createSpan({ cls: "os-today-tab-count is-overdue" });
    const headerRight = header.createDiv({ cls: "os-card-header-right" });
    const scheduleBtn = headerRight.createDiv({ cls: "os-card-header-btn" });
    (0, import_obsidian13.setIcon)(scheduleBtn, "calendar-plus");
    scheduleBtn.setAttribute("aria-label", "Schedule task for date");
    scheduleBtn.setAttribute("title", "Schedule task for date");
    scheduleBtn.addEventListener("click", () => {
      new ScheduleTaskModal(
        this.app,
        this.taskService,
        this.settings.dailyTasksFile,
        async () => {
          await this.renderTodayTasksRefresh(cardEl);
        }
      ).open();
    });
    const bodyEl = cardEl.createDiv({ cls: "os-today-tab-body" });
    taskTabBtn.addEventListener("click", async () => {
      if (this.activeTodayTab === "tasks") return;
      this.activeTodayTab = "tasks";
      taskTabBtn.addClass("is-active");
      logTabBtn.removeClass("is-active");
      overdueTabBtn.removeClass("is-active");
      await this.renderTodayTasksContent(bodyEl, cardEl);
    });
    logTabBtn.addEventListener("click", async () => {
      if (this.activeTodayTab === "log") return;
      this.activeTodayTab = "log";
      logTabBtn.addClass("is-active");
      taskTabBtn.removeClass("is-active");
      overdueTabBtn.removeClass("is-active");
      await this.renderTodayTasksContent(bodyEl, cardEl);
    });
    overdueTabBtn.addEventListener("click", async () => {
      if (this.activeTodayTab === "overdue") return;
      this.activeTodayTab = "overdue";
      overdueTabBtn.addClass("is-active");
      taskTabBtn.removeClass("is-active");
      logTabBtn.removeClass("is-active");
      await this.renderTodayTasksContent(bodyEl, cardEl);
    });
    await this.renderTodayTasksContent(bodyEl, cardEl);
  }
  async renderTodayTasksContent(bodyEl, cardEl) {
    bodyEl.empty();
    const planFilePath = this.settings.dailyTasksFile;
    const logFilePath = this.settings.dailyLogFile || "Daily Log.md";
    const habitsFilePath = this.settings.habitsFile || "Habits.md";
    if (this.streakService) {
      const habits = await this.streakService.loadHabits(habitsFilePath, this.settings.streaks || []);
      this.settings.streaks = habits;
      await this.streakService.autoPopulateTasks(planFilePath, habits, this.taskService);
    }
    const [planTasks, logTasks, overdueTasks] = await Promise.all([
      this.taskService.getTodayTasks(planFilePath),
      this.taskService.getTodayTasks(logFilePath),
      this.taskService.getOverdueTasks(planFilePath)
    ]);
    const openPlanCount = planTasks.filter((t) => !t.completed).length;
    const completedLogCount = logTasks.length;
    const overdueCount = overdueTasks.length;
    const tabBtns = cardEl.querySelectorAll(".os-today-tab-btn");
    const taskBadge = tabBtns[0]?.querySelector(".os-today-tab-count");
    if (taskBadge) {
      taskBadge.textContent = openPlanCount > 0 ? `${openPlanCount}` : planTasks.length > 0 ? "\u2713" : "0";
    }
    const logBadge = tabBtns[1]?.querySelector(".os-today-tab-count");
    if (logBadge) {
      logBadge.textContent = `${completedLogCount}`;
    }
    const overdueBadge = tabBtns[2]?.querySelector(".os-today-tab-count");
    if (overdueBadge) {
      overdueBadge.textContent = `${overdueCount}`;
      if (overdueCount > 0) {
        overdueBadge.addClass("has-overdue");
      } else {
        overdueBadge.removeClass("has-overdue");
      }
    }
    if (this.activeTodayTab === "tasks") {
      const listEl = bodyEl.createDiv({ cls: "os-task-list os-plan-task-list" });
      if (planTasks.length === 0) {
        listEl.createDiv({ cls: "os-empty-placeholder", text: "No tasks for today. Add one below!" });
      } else {
        for (const task of planTasks) {
          this.renderTaskRow(
            listEl,
            task,
            async () => {
              await this.taskService.toggleTask(task.sourceFile, task.lineNumber, {
                autoLog: this.settings.autoLogToDailyLog ?? true,
                logFilePath
              });
              if (this.streakService) {
                const habits = await this.streakService.loadHabits(habitsFilePath, this.settings.streaks || []);
                const streakUpdated = this.streakService.handleTaskToggle(task.text, !task.completed, habits);
                if (streakUpdated) {
                  await this.streakService.saveHabits(habitsFilePath, habits, this.settings.maxFreezesPerMonth || 4);
                  this.settings.streaks = habits;
                  if (this.onSaveSettings) await this.onSaveSettings();
                  await this.refreshStreaksCard();
                }
              }
              await this.renderTodayTasksRefresh(cardEl);
            },
            async (newText) => {
              await this.taskService.updateTask(task.sourceFile, task.lineNumber, newText, {
                autoLog: this.settings.autoLogToDailyLog ?? true,
                logFilePath
              });
              await this.renderTodayTasksRefresh(cardEl);
            },
            async () => {
              await this.taskService.deleteTask(task.sourceFile, task.lineNumber, {
                autoLog: this.settings.autoLogToDailyLog ?? true,
                logFilePath
              });
              await this.renderTodayTasksRefresh(cardEl);
            }
          );
        }
      }
      const addForm = bodyEl.createEl("form", { cls: "os-task-add-row" });
      addForm.setAttribute("action", "#");
      const planInput = addForm.createEl("input", {
        cls: "os-task-add-input",
        type: "text",
        placeholder: "+ Add task for today (type [[ to link)..."
      });
      planInput.setAttribute("enterkeyhint", "enter");
      const planSuggest = new WikiLinkSuggest(this.app, planInput);
      const submitPlanTask = async () => {
        const val = planInput.value.trim();
        if (!val) return;
        planInput.value = "";
        await this.taskService.addTask(planFilePath, val);
        await this.renderTodayTasksRefresh(cardEl);
      };
      addForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await submitPlanTask();
      });
      planInput.addEventListener("keydown", async (e) => {
        if (e.key === "Enter" || e.key === "Tab" || e.keyCode === 13 || e.keyCode === 9) {
          if (planSuggest.isSuggestOpen()) return;
          e.preventDefault();
          e.stopPropagation();
          await submitPlanTask();
        }
      });
    } else if (this.activeTodayTab === "log") {
      const listEl = bodyEl.createDiv({ cls: "os-task-list os-log-task-list" });
      if (logTasks.length === 0) {
        listEl.createDiv({ cls: "os-empty-placeholder", text: "Nothing logged yet today. Add what you did below!" });
      } else {
        for (const task of logTasks) {
          this.renderTaskRow(
            listEl,
            task,
            async () => {
              await this.taskService.toggleTask(task.sourceFile, task.lineNumber);
              await this.taskService.uncheckPlannedTaskMatching(planFilePath, task.text);
              if (this.streakService) {
                const habits = await this.streakService.loadHabits(habitsFilePath, this.settings.streaks || []);
                const streakUpdated = this.streakService.handleTaskToggle(task.text, false, habits);
                if (streakUpdated) {
                  await this.streakService.saveHabits(habitsFilePath, habits, this.settings.maxFreezesPerMonth || 4);
                  this.settings.streaks = habits;
                  if (this.onSaveSettings) await this.onSaveSettings();
                  await this.refreshStreaksCard();
                }
              }
              await this.renderTodayTasksRefresh(cardEl);
            },
            async (newText) => {
              const oldText = task.text;
              await this.taskService.updateTask(task.sourceFile, task.lineNumber, newText);
              await this.taskService.updatePlannedTaskMatching(planFilePath, oldText, newText);
              await this.renderTodayTasksRefresh(cardEl);
            },
            async () => {
              await this.taskService.deleteTask(task.sourceFile, task.lineNumber);
              await this.taskService.uncheckPlannedTaskMatching(planFilePath, task.text);
              if (this.streakService) {
                const habits = await this.streakService.loadHabits(habitsFilePath, this.settings.streaks || []);
                const streakUpdated = this.streakService.handleTaskToggle(task.text, false, habits);
                if (streakUpdated) {
                  await this.streakService.saveHabits(habitsFilePath, habits, this.settings.maxFreezesPerMonth || 4);
                  this.settings.streaks = habits;
                  if (this.onSaveSettings) await this.onSaveSettings();
                  await this.refreshStreaksCard();
                }
              }
              await this.renderTodayTasksRefresh(cardEl);
            }
          );
        }
      }
      const addForm = bodyEl.createEl("form", { cls: "os-task-add-row" });
      addForm.setAttribute("action", "#");
      const logInput = addForm.createEl("input", {
        cls: "os-task-add-input",
        type: "text",
        placeholder: "+ Log what you did today (type [[ to link)..."
      });
      logInput.setAttribute("enterkeyhint", "enter");
      const logSuggest = new WikiLinkSuggest(this.app, logInput);
      const submitLogItem = async () => {
        const val = logInput.value.trim();
        if (!val) return;
        logInput.value = "";
        await this.taskService.addLoggedItem(logFilePath, val);
        await this.renderTodayTasksRefresh(cardEl);
      };
      addForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await submitLogItem();
      });
      logInput.addEventListener("keydown", async (e) => {
        if (e.key === "Enter" || e.key === "Tab" || e.keyCode === 13 || e.keyCode === 9) {
          if (logSuggest.isSuggestOpen()) return;
          e.preventDefault();
          e.stopPropagation();
          await submitLogItem();
        }
      });
    } else {
      const overdueBar = bodyEl.createDiv({ cls: "os-overdue-control-bar" });
      const overdueSummary = overdueBar.createSpan({
        cls: "os-overdue-summary",
        text: overdueCount === 0 ? "No unfinished tasks" : `${overdueCount} unfinished from past`
      });
      if (overdueCount > 0) {
        const moveAllBtn = overdueBar.createEl("button", {
          cls: "os-move-all-link-btn",
          text: "Move All to Today"
        });
        moveAllBtn.addEventListener("click", async () => {
          await this.taskService.moveAllOverdueToToday(planFilePath);
          this.activeTodayTab = "tasks";
          await this.renderTodayTasksRefresh(cardEl);
        });
      }
      const listEl = bodyEl.createDiv({ cls: "os-task-list os-overdue-tab-list" });
      if (overdueTasks.length === 0) {
        listEl.createDiv({ cls: "os-empty-placeholder", text: "No overdue tasks! You're completely caught up." });
      } else {
        for (const task of overdueTasks) {
          const row = listEl.createDiv({ cls: "os-task-row os-overdue-row" });
          row.setAttribute("data-source-file", task.sourceFile);
          const checkWrap = row.createDiv({ cls: "os-task-checkbox" });
          (0, import_obsidian13.setIcon)(checkWrap, "square");
          checkWrap.addEventListener("click", async (e) => {
            e.stopPropagation();
            await this.taskService.toggleTask(task.sourceFile, task.lineNumber);
            await this.renderTodayTasksRefresh(cardEl);
          });
          const contentWrap = row.createDiv({ cls: "os-task-content-wrap" });
          const textEl = contentWrap.createSpan({ cls: "os-task-text" });
          import_obsidian13.MarkdownRenderer.renderMarkdown(task.text, textEl, task.sourceFile, this);
          textEl.addEventListener("click", async (e) => {
            const target = e.target;
            const internalLink = target.closest("a.internal-link");
            if (internalLink) {
              e.preventDefault();
              e.stopPropagation();
              const href = internalLink.getAttribute("data-href") || internalLink.getAttribute("href");
              if (href) {
                const isNewLeaf = e.ctrlKey || e.metaKey || e.button === 1;
                await this.app.workspace.openLinkText(href, task.sourceFile, isNewLeaf);
              }
              return;
            }
            const externalLink = target.closest("a.external-link");
            if (externalLink) {
              e.preventDefault();
              e.stopPropagation();
              const href = externalLink.getAttribute("href");
              if (href) {
                window.open(href, "_blank");
              }
              return;
            }
          });
          if (task.dateHeading) {
            contentWrap.createSpan({ cls: "os-overdue-date-pill", text: task.dateHeading });
          }
          const moveBtn = row.createEl("button", {
            cls: "os-move-task-btn",
            text: "\u2192 Today",
            title: "Move to today's plan"
          });
          moveBtn.addEventListener("click", async (e) => {
            e.stopPropagation();
            await this.taskService.moveTaskToToday(task.sourceFile, task.lineNumber, task.text);
            await this.renderTodayTasksRefresh(cardEl);
          });
          const delBtn = row.createDiv({ cls: "os-task-action-btn is-delete", title: "Delete task" });
          (0, import_obsidian13.setIcon)(delBtn, "trash-2");
          delBtn.addEventListener("click", async (e) => {
            e.stopPropagation();
            await this.taskService.deleteTask(task.sourceFile, task.lineNumber);
            await this.renderTodayTasksRefresh(cardEl);
          });
        }
      }
    }
  }
  async renderTodayTasksRefresh(cardEl) {
    const bodyEl = cardEl.querySelector(".os-today-tab-body");
    if (!bodyEl) return;
    await this.renderTodayTasksContent(bodyEl, cardEl);
  }
  async renderWeeklyTasks(container) {
    const cardEl = container.createDiv({ cls: "os-dashboard-card os-card-tasks" });
    const header = cardEl.createDiv({ cls: "os-card-header" });
    const titleLeft = header.createDiv({ cls: "os-card-header-left" });
    const iconEl = titleLeft.createSpan({ cls: "os-card-icon" });
    (0, import_obsidian13.setIcon)(iconEl, "calendar");
    titleLeft.createEl("h3", { text: "This Week" });
    const listEl = cardEl.createDiv({ cls: "os-task-list" });
    const weeklyTasks = await this.taskService.getWeeklyTasks(this.settings.weeklyTasksFile);
    if (weeklyTasks.length === 0) {
      listEl.createDiv({ cls: "os-empty-placeholder", text: "No weekly tasks set." });
    } else {
      for (const task of weeklyTasks) {
        this.renderTaskRow(listEl, task, async () => {
          await this.taskService.toggleTask(task.sourceFile, task.lineNumber);
          await this.renderWeeklyTasksRefresh(cardEl);
        });
      }
    }
  }
  async renderWeeklyTasksRefresh(cardEl) {
    const listEl = cardEl.querySelector(".os-task-list");
    if (!listEl) return;
    listEl.empty();
    const weeklyTasks = await this.taskService.getWeeklyTasks(this.settings.weeklyTasksFile);
    if (weeklyTasks.length === 0) {
      listEl.createDiv({ cls: "os-empty-placeholder", text: "No weekly tasks set." });
    } else {
      for (const task of weeklyTasks) {
        this.renderTaskRow(listEl, task, async () => {
          await this.taskService.toggleTask(task.sourceFile, task.lineNumber);
          await this.renderWeeklyTasksRefresh(cardEl);
        });
      }
    }
  }
  renderTaskRow(container, task, onToggle, onUpdate, onDelete) {
    const row = container.createDiv({ cls: `os-task-row ${task.completed ? "is-completed" : ""}` });
    row.setAttribute("data-source-file", task.sourceFile);
    const checkWrap = row.createDiv({ cls: "os-task-checkbox" });
    if (task.completed) {
      (0, import_obsidian13.setIcon)(checkWrap, "check-square");
    } else {
      (0, import_obsidian13.setIcon)(checkWrap, "square");
    }
    checkWrap.addEventListener("click", async (e) => {
      e.stopPropagation();
      await onToggle();
    });
    const contentWrap = row.createDiv({ cls: "os-task-content-wrap" });
    const textEl = contentWrap.createSpan({ cls: "os-task-text" });
    import_obsidian13.MarkdownRenderer.renderMarkdown(task.text, textEl, task.sourceFile, this);
    textEl.addEventListener("click", async (e) => {
      const target = e.target;
      const internalLink = target.closest("a.internal-link");
      if (internalLink) {
        e.preventDefault();
        e.stopPropagation();
        const href = internalLink.getAttribute("data-href") || internalLink.getAttribute("href");
        if (href) {
          const isNewLeaf = e.ctrlKey || e.metaKey || e.button === 1;
          await this.app.workspace.openLinkText(href, task.sourceFile, isNewLeaf);
        }
        return;
      }
      const externalLink = target.closest("a.external-link");
      if (externalLink) {
        e.preventDefault();
        e.stopPropagation();
        const href = externalLink.getAttribute("href");
        if (href) {
          window.open(href, "_blank");
        }
        return;
      }
      await onToggle();
    });
    const actionsWrap = row.createDiv({ cls: "os-task-actions" });
    if (onUpdate) {
      const editBtn = actionsWrap.createDiv({ cls: "os-task-action-btn", title: "Edit task" });
      (0, import_obsidian13.setIcon)(editBtn, "pencil");
      editBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.startEditingTask(row, contentWrap, task.text, onUpdate, () => {
          contentWrap.empty();
          const restoredText = contentWrap.createSpan({ cls: "os-task-text" });
          import_obsidian13.MarkdownRenderer.renderMarkdown(task.text, restoredText, task.sourceFile, this);
          restoredText.addEventListener("click", async (ev) => {
            const target = ev.target;
            const internalLink = target.closest("a.internal-link");
            if (internalLink) {
              ev.preventDefault();
              ev.stopPropagation();
              const href = internalLink.getAttribute("data-href") || internalLink.getAttribute("href");
              if (href) {
                const isNewLeaf = ev.ctrlKey || ev.metaKey || ev.button === 1;
                await this.app.workspace.openLinkText(href, task.sourceFile, isNewLeaf);
              }
              return;
            }
            const externalLink = target.closest("a.external-link");
            if (externalLink) {
              ev.preventDefault();
              ev.stopPropagation();
              const href = externalLink.getAttribute("href");
              if (href) {
                window.open(href, "_blank");
              }
              return;
            }
            await onToggle();
          });
          actionsWrap.style.display = "";
        });
        actionsWrap.style.display = "none";
      });
    }
    if (onDelete) {
      const deleteBtn = actionsWrap.createDiv({ cls: "os-task-action-btn is-delete", title: "Delete task" });
      (0, import_obsidian13.setIcon)(deleteBtn, "trash-2");
      deleteBtn.addEventListener("click", async (e) => {
        e.stopPropagation();
        await onDelete();
      });
    }
  }
  startEditingTask(row, contentWrap, initialText, onSave, onCancel) {
    contentWrap.empty();
    const editForm = contentWrap.createEl("form", { cls: "os-task-edit-form" });
    editForm.setAttribute("action", "#");
    const editInput = editForm.createEl("input", {
      cls: "os-task-edit-input",
      type: "text",
      value: initialText
    });
    editInput.setAttribute("enterkeyhint", "enter");
    const editSuggest = new WikiLinkSuggest(this.app, editInput);
    editInput.focus();
    editInput.select();
    let finished = false;
    const save = async () => {
      if (finished) return;
      finished = true;
      const val = editInput.value.trim();
      if (val && val !== initialText) {
        await onSave(val);
      } else {
        onCancel();
      }
    };
    const cancel = () => {
      if (finished) return;
      finished = true;
      onCancel();
    };
    editForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      e.stopPropagation();
      await save();
    });
    editInput.addEventListener("keydown", async (e) => {
      if (e.key === "Enter" || e.key === "Tab" || e.keyCode === 13 || e.keyCode === 9) {
        if (editSuggest.isSuggestOpen()) return;
        e.preventDefault();
        e.stopPropagation();
        await save();
      } else if (e.key === "Escape") {
        e.preventDefault();
        cancel();
      }
    });
    editInput.addEventListener("blur", () => {
      setTimeout(async () => {
        if (!finished) {
          await save();
        }
      }, 150);
    });
  }
  // --- Column 2 Widgets ---
  async renderRecentNotes(container) {
    const cardEl = container.createDiv({ cls: "os-dashboard-card os-card-recent" });
    const header = cardEl.createDiv({ cls: "os-card-header" });
    const titleLeft = header.createDiv({ cls: "os-card-header-left" });
    const iconEl = titleLeft.createSpan({ cls: "os-card-icon" });
    (0, import_obsidian13.setIcon)(iconEl, "file-text");
    titleLeft.createEl("h3", { text: "Recent Notes" });
    const listEl = cardEl.createDiv({ cls: "os-recent-list" });
    const recentNotes = this.recentNotesService.getRecentNotes(this.settings);
    if (recentNotes.length === 0) {
      listEl.createDiv({ cls: "os-empty-placeholder", text: "No recent notes found." });
      return;
    }
    for (const note of recentNotes) {
      const row = listEl.createDiv({ cls: "os-recent-row" });
      const left = row.createDiv({ cls: "os-recent-left" });
      const iconWrap = left.createSpan({ cls: "os-recent-icon" });
      this.iconService.renderIcon(iconWrap, note.resolvedIcon);
      const title = left.createSpan({ cls: "os-recent-title", text: note.title });
      row.createSpan({ cls: "os-recent-time", text: note.formattedTime });
      row.addEventListener("click", () => {
        this.app.workspace.getLeaf(false).openFile(note.file);
      });
    }
  }
  renderQuickCapture(container) {
    const cardEl = container.createDiv({ cls: "os-dashboard-card os-card-capture" });
    const header = cardEl.createDiv({ cls: "os-card-header" });
    const titleLeft = header.createDiv({ cls: "os-card-header-left" });
    const iconEl = titleLeft.createSpan({ cls: "os-card-icon" });
    (0, import_obsidian13.setIcon)(iconEl, "edit-3");
    titleLeft.createEl("h3", { text: "Quick Capture" });
    const textarea = cardEl.createEl("textarea", {
      cls: "os-capture-input",
      placeholder: "Write something..."
    });
    const footer = cardEl.createDiv({ cls: "os-capture-footer" });
    const button = footer.createEl("button", { cls: "os-capture-button", text: "Capture" });
    const submitCapture = async () => {
      const val = textarea.value.trim();
      if (!val) return;
      const success = await this.quickCaptureService.capture(val, this.settings);
      if (success) {
        textarea.value = "";
      }
    };
    button.addEventListener("click", submitCapture);
  }
  // --- Column 3 Widgets ---
  async renderOngoingProjects(container) {
    const cardEl = container.createDiv({ cls: "os-dashboard-card os-card-projects" });
    const header = cardEl.createDiv({ cls: "os-card-header" });
    const titleLeft = header.createDiv({ cls: "os-card-header-left" });
    const iconEl = titleLeft.createSpan({ cls: "os-card-icon" });
    (0, import_obsidian13.setIcon)(iconEl, "target");
    titleLeft.createEl("h3", { text: "Ongoing Projects" });
    const listEl = cardEl.createDiv({ cls: "os-project-list" });
    const projects = await this.projectService.getOngoingProjects(this.settings);
    if (projects.length === 0) {
      listEl.createDiv({
        cls: "os-empty-placeholder",
        text: "No active projects. Add frontmatter 'status: in-progress' to notes in Projects folder."
      });
      return;
    }
    for (const proj of projects) {
      const row = listEl.createDiv({ cls: "os-project-row" });
      const left = row.createDiv({ cls: "os-project-left" });
      const iconWrap = left.createSpan({ cls: "os-project-icon" });
      this.iconService.renderIcon(iconWrap, proj.resolvedIcon);
      left.createSpan({ cls: "os-project-title", text: proj.title });
      const right = row.createDiv({ cls: "os-project-right" });
      const track = right.createDiv({ cls: "os-progress-track" });
      const fill = track.createDiv({ cls: "os-progress-fill" });
      fill.style.width = `${proj.progress}%`;
      if (proj.colorHex) {
        fill.style.backgroundColor = proj.colorHex;
      }
      right.createSpan({ cls: "os-progress-label", text: `${proj.progress}%` });
      row.addEventListener("click", () => {
        this.app.workspace.getLeaf(false).openFile(proj.file);
      });
    }
  }
  renderLinksWidget(container) {
    const cardEl = container.createDiv({ cls: "os-dashboard-card os-card-links" });
    const header = cardEl.createDiv({ cls: "os-card-header" });
    const titleLeft = header.createDiv({ cls: "os-card-header-left" });
    const iconEl = titleLeft.createSpan({ cls: "os-card-icon" });
    (0, import_obsidian13.setIcon)(iconEl, "link-2");
    titleLeft.createEl("h3", { text: "Links" });
    const grid = cardEl.createDiv({ cls: "os-links-grid" });
    const links = this.settings.links || [];
    if (links.length === 0) {
      grid.createDiv({ cls: "os-empty-placeholder", text: "No bookmark links configured in settings." });
      return;
    }
    for (const link of links) {
      const item = grid.createDiv({ cls: "os-link-item" });
      const iconWrap = item.createSpan({ cls: "os-link-icon" });
      (0, import_obsidian13.setIcon)(iconWrap, link.icon || "external-link");
      item.createSpan({ cls: "os-link-title", text: link.title });
      item.addEventListener("click", () => {
        if (link.url.startsWith("http://") || link.url.startsWith("https://")) {
          window.open(link.url, "_blank");
        } else {
          const file = this.app.metadataCache.getFirstLinkpathDest(link.url, "");
          if (file instanceof import_obsidian13.TFile) {
            this.app.workspace.getLeaf(false).openFile(file);
          } else {
            new import_obsidian13.Notice(`Note not found: ${link.url}`);
          }
        }
      });
    }
  }
  async renderCustomWidgetsForColumn(container, colIndex) {
    const customWidgets = (this.settings.customWidgets || []).filter((w) => (w.enabled ?? true) && (Number(w.column) || 1) === colIndex);
    for (const widget of customWidgets) {
      await this.renderCustomWidget(container, widget);
    }
  }
  async renderCustomWidget(container, widget) {
    const cardEl = container.createDiv({ cls: "os-dashboard-card os-card-custom" });
    const header = cardEl.createDiv({ cls: "os-card-header" });
    const titleLeft = header.createDiv({ cls: "os-card-header-left" });
    const iconEl = titleLeft.createSpan({ cls: "os-card-icon" });
    (0, import_obsidian13.setIcon)(iconEl, widget.icon || "sparkles");
    titleLeft.createEl("h3", { text: widget.title || "Custom Widget" });
    if (widget.type === "markdown-note") {
      const file = this.app.metadataCache.getFirstLinkpathDest(widget.content, "");
      if (file instanceof import_obsidian13.TFile) {
        cardEl.setAttribute("data-source-file", file.path);
        const openBtn = header.createDiv({ cls: "os-card-header-btn" });
        (0, import_obsidian13.setIcon)(openBtn, "external-link");
        openBtn.setAttribute("title", "Open note");
        openBtn.addEventListener("click", () => {
          this.app.workspace.getLeaf(false).openFile(file);
        });
        const bodyEl = cardEl.createDiv({ cls: "os-custom-note-body" });
        try {
          const content = await this.app.vault.read(file);
          await import_obsidian13.MarkdownRenderer.render(this.app, content, bodyEl, file.path, this);
        } catch {
          bodyEl.createDiv({ cls: "os-empty-placeholder", text: "Error loading note content." });
        }
      } else {
        cardEl.createDiv({
          cls: "os-empty-placeholder",
          text: widget.content ? `Note not found: "${widget.content}"` : "No note path specified in settings."
        });
      }
    } else if (widget.type === "custom-text") {
      const bodyEl = cardEl.createDiv({ cls: "os-custom-text-body" });
      if (widget.content) {
        await import_obsidian13.MarkdownRenderer.render(this.app, widget.content, bodyEl, "", this);
      } else {
        bodyEl.createDiv({ cls: "os-empty-placeholder", text: "No content configured." });
      }
    } else if (widget.type === "link-button") {
      const bodyEl = cardEl.createDiv({ cls: "os-custom-link-body" });
      const btn = bodyEl.createEl("button", {
        cls: "os-custom-action-btn",
        text: widget.title || "Open"
      });
      btn.addEventListener("click", () => {
        if (widget.content.startsWith("http://") || widget.content.startsWith("https://")) {
          window.open(widget.content, "_blank");
        } else {
          const file = this.app.metadataCache.getFirstLinkpathDest(widget.content, "");
          if (file instanceof import_obsidian13.TFile) {
            this.app.workspace.getLeaf(false).openFile(file);
          } else {
            new import_obsidian13.Notice(`Note not found: ${widget.content}`);
          }
        }
      });
    }
  }
  // =========================================================================
  // --- Right Rail Widgets: Calendar, Graph view, Streaks, Quote ---
  // =========================================================================
  async renderCalendarWidget(container) {
    const cardEl = container.createDiv({ cls: "os-dashboard-card os-card-calendar" });
    this.calendarCardEl = cardEl;
    await this.renderCalendarContent(cardEl);
  }
  openEventModal(event, targetDate) {
    new EventModal(
      this.app,
      event,
      targetDate || this.selectedCalendarDate,
      async (savedEvent) => {
        const eventsFile = this.settings.calendarEventsFile || "Events.md";
        await this.calendarService.saveEventToMarkdown(eventsFile, savedEvent);
        if (!this.settings.localCalendarEvents) {
          this.settings.localCalendarEvents = [];
        }
        const existingIdx = this.settings.localCalendarEvents.findIndex((e) => e.id === savedEvent.id);
        if (existingIdx >= 0) {
          this.settings.localCalendarEvents[existingIdx] = savedEvent;
        } else {
          this.settings.localCalendarEvents.push(savedEvent);
        }
        if (this.onSaveSettings) await this.onSaveSettings();
        if (this.calendarCardEl) await this.renderCalendarContent(this.calendarCardEl);
      },
      async (eventId) => {
        if (this.settings.localCalendarEvents) {
          this.settings.localCalendarEvents = this.settings.localCalendarEvents.filter((e) => e.id !== eventId);
          if (this.onSaveSettings) await this.onSaveSettings();
          if (this.calendarCardEl) await this.renderCalendarContent(this.calendarCardEl);
        }
      }
    ).open();
  }
  async renderCalendarContent(cardEl) {
    cardEl.empty();
    const mdEvents = await this.calendarService.getLocalMarkdownEvents(this.settings.calendarEventsFile || "Events.md");
    const eventMap = /* @__PURE__ */ new Map();
    for (const e of this.settings.cachedCalendarEvents || []) {
      eventMap.set(e.id, e);
    }
    for (const e of this.settings.localCalendarEvents || []) {
      eventMap.set(e.id, e);
    }
    for (const e of mdEvents) {
      eventMap.set(e.id, e);
    }
    const events = Array.from(eventMap.values());
    const hasAddress = Boolean(this.settings.googleCalendarUrl);
    const header = cardEl.createDiv({ cls: "os-calendar-header" });
    const leftWrap = header.createDiv({ cls: "os-calendar-header-left" });
    const title = leftWrap.createDiv({
      cls: "os-calendar-title",
      text: this.calendarDate.format("MMMM YYYY")
    });
    title.setAttribute("title", "Click to jump to today");
    title.addEventListener("click", async () => {
      this.calendarDate = moment();
      this.selectedCalendarDate = moment().format("YYYY-MM-DD");
      await this.renderCalendarContent(cardEl);
    });
    const nav = header.createDiv({ cls: "os-calendar-nav" });
    const addNavBtn = nav.createDiv({
      cls: "os-calendar-nav-btn os-calendar-add-event-btn",
      title: "Add new event"
    });
    (0, import_obsidian13.setIcon)(addNavBtn, "plus");
    addNavBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.openEventModal(null, this.selectedCalendarDate);
    });
    const viewBtn = nav.createDiv({
      cls: "os-calendar-nav-btn",
      title: this.calendarViewMode === "month" ? "Show list of this month's events" : "Show month calendar grid"
    });
    (0, import_obsidian13.setIcon)(viewBtn, this.calendarViewMode === "month" ? "list" : "calendar");
    viewBtn.addEventListener("click", async (e) => {
      e.stopPropagation();
      this.calendarViewMode = this.calendarViewMode === "month" ? "agenda" : "month";
      await this.renderCalendarContent(cardEl);
    });
    const prevBtn = nav.createDiv({ cls: "os-calendar-nav-btn", title: "Previous month" });
    (0, import_obsidian13.setIcon)(prevBtn, "chevron-left");
    prevBtn.addEventListener("click", async () => {
      this.calendarDate.subtract(1, "month");
      await this.renderCalendarContent(cardEl);
    });
    const nextBtn = nav.createDiv({ cls: "os-calendar-nav-btn", title: "Next month" });
    (0, import_obsidian13.setIcon)(nextBtn, "chevron-right");
    nextBtn.addEventListener("click", async () => {
      this.calendarDate.add(1, "month");
      await this.renderCalendarContent(cardEl);
    });
    if (this.calendarViewMode === "month") {
      this.renderMonthGrid(cardEl, events);
    } else {
      this.renderMonthEventsList(cardEl, events);
    }
    if (!hasAddress) {
      const banner = cardEl.createDiv({ cls: "os-calendar-address-banner" });
      banner.createSpan({ cls: "os-calendar-banner-text", text: "Sync Google Calendar events & reminders" });
      const addAddrBtn = banner.createEl("button", { cls: "os-calendar-address-btn", text: "Add Address" });
      addAddrBtn.addEventListener("click", () => {
        const input = prompt("Paste your Google Calendar Secret iCal Address (.ics):", "");
        if (input && input.trim()) {
          this.settings.googleCalendarUrl = input.trim();
          this.calendarService.fetchEvents(this.settings.googleCalendarUrl).then(async (evs) => {
            this.settings.cachedCalendarEvents = evs;
            this.settings.lastCalendarSyncTime = Date.now();
            if (this.onSaveSettings) await this.onSaveSettings();
            new import_obsidian13.Notice(`Synced ${evs.length} events from Google Calendar!`);
            await this.renderCalendarContent(cardEl);
          }).catch((err) => {
            new import_obsidian13.Notice(`Sync error: ${err.message || "Invalid URL"}`);
          });
        }
      });
    }
  }
  renderMonthGrid(cardEl, events) {
    const weekdaysRow = cardEl.createDiv({ cls: "os-calendar-weekdays" });
    const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    weekdays.forEach((day) => {
      weekdaysRow.createDiv({ cls: "os-calendar-weekday", text: day });
    });
    const daysGrid = cardEl.createDiv({ cls: "os-calendar-grid" });
    const startOfMonth = this.calendarDate.clone().startOf("month");
    const daysInMonth = this.calendarDate.daysInMonth();
    let startDayOfWeek = (startOfMonth.day() + 6) % 7;
    const prevMonth = this.calendarDate.clone().subtract(1, "month");
    const daysInPrevMonth = prevMonth.daysInMonth();
    const todayStr = moment().format("YYYY-MM-DD");
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const dayNum = daysInPrevMonth - i;
      const dateStr = prevMonth.clone().date(dayNum).format("YYYY-MM-DD");
      const dayEl = daysGrid.createDiv({
        cls: "os-calendar-day is-other-month"
      });
      const numWrap = dayEl.createDiv({ cls: "os-calendar-day-num-wrap" });
      numWrap.createSpan({ cls: "os-calendar-day-num", text: String(dayNum) });
      dayEl.addEventListener("click", async () => {
        this.calendarDate.subtract(1, "month");
        this.selectedCalendarDate = dateStr;
        await this.renderCalendarContent(cardEl);
      });
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = this.calendarDate.clone().date(day).format("YYYY-MM-DD");
      const isToday = dateStr === todayStr;
      const isSelected = dateStr === this.selectedCalendarDate;
      const dayEvents = this.calendarService.getEventsForDate(events, dateStr);
      const dayEl = daysGrid.createDiv({
        cls: `os-calendar-day ${isToday ? "is-today" : ""} ${isSelected ? "is-selected" : ""}`
      });
      if (dayEvents.length > 0) {
        const eventTitles = dayEvents.map((e) => `\u2022 ${e.title} (${e.isAllDay ? "All day" : e.startTime})`).join("\n");
        dayEl.setAttribute("title", isToday ? `${dateStr} (Today):
${eventTitles}

Click to add/edit events` : `${dateStr}:
${eventTitles}

Click to add/edit events`);
      } else {
        dayEl.setAttribute("title", isToday ? `${dateStr} (Today): Click to add event` : `${dateStr}: Click to add event`);
      }
      const numWrap = dayEl.createDiv({ cls: "os-calendar-day-num-wrap" });
      numWrap.createSpan({ cls: "os-calendar-day-num", text: String(day) });
      if (isToday) {
        const todayIcon = numWrap.createSpan({ cls: "os-calendar-today-icon" });
        (0, import_obsidian13.setIcon)(todayIcon, "sparkle");
        todayIcon.setAttribute("title", "Today");
      }
      if (dayEvents.length > 0) {
        const dotsWrap = dayEl.createDiv({ cls: "os-calendar-event-dots" });
        const maxDots = Math.min(dayEvents.length, 3);
        for (let k = 0; k < maxDots; k++) {
          const dot = dotsWrap.createSpan({ cls: "os-calendar-dot" });
          if (dayEvents[k].color) {
            dot.style.backgroundColor = dayEvents[k].color;
          }
        }
      }
      dayEl.addEventListener("click", async (e) => {
        if (this.selectedCalendarDate === dateStr || e.detail === 2) {
          this.openEventModal(null, dateStr);
        } else {
          this.selectedCalendarDate = dateStr;
          await this.renderCalendarContent(cardEl);
        }
      });
    }
    const totalCells = startDayOfWeek + daysInMonth;
    const targetCells = totalCells > 35 ? 42 : 35;
    const remainingDays = targetCells - totalCells;
    for (let day = 1; day <= remainingDays; day++) {
      const nextMonth = this.calendarDate.clone().add(1, "month");
      const dateStr = nextMonth.date(day).format("YYYY-MM-DD");
      const dayEl = daysGrid.createDiv({
        cls: "os-calendar-day is-other-month"
      });
      const numWrap = dayEl.createDiv({ cls: "os-calendar-day-num-wrap" });
      numWrap.createSpan({ cls: "os-calendar-day-num", text: String(day) });
      dayEl.addEventListener("click", async () => {
        this.calendarDate.add(1, "month");
        this.selectedCalendarDate = dateStr;
        await this.renderCalendarContent(cardEl);
      });
    }
  }
  renderMonthEventsList(cardEl, events) {
    const listWrap = cardEl.createDiv({ cls: "os-calendar-agenda" });
    const daysInMonth = this.calendarDate.daysInMonth();
    const monthOccurrences = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = this.calendarDate.clone().date(day).format("YYYY-MM-DD");
      const dayEvs = this.calendarService.getEventsForDate(events, dateStr);
      for (const ev of dayEvs) {
        monthOccurrences.push({ dateStr, event: ev });
      }
    }
    if (monthOccurrences.length === 0) {
      const emptyDiv = listWrap.createDiv({ cls: "os-agenda-empty" });
      emptyDiv.createSpan({
        cls: "os-agenda-empty-text",
        text: `No events in ${this.calendarDate.format("MMMM YYYY")}.`
      });
      const quickAddBtn = emptyDiv.createEl("button", {
        cls: "os-agenda-quick-add-btn",
        text: "+ Add Event"
      });
      quickAddBtn.addEventListener("click", () => {
        this.openEventModal(null, this.selectedCalendarDate);
      });
      return;
    }
    const listEl = listWrap.createDiv({ cls: "os-agenda-list" });
    for (const item of monthOccurrences) {
      const ev = item.event;
      const mom = moment(item.dateStr, "YYYY-MM-DD");
      const itemEl = listEl.createDiv({ cls: "os-agenda-item" });
      const dateBadge = itemEl.createDiv({ cls: "os-agenda-date-badge" });
      dateBadge.createSpan({ cls: "os-agenda-date-badge-day", text: mom.format("D") });
      dateBadge.createSpan({ cls: "os-agenda-date-badge-month", text: mom.format("MMM") });
      const bar = itemEl.createDiv({ cls: "os-agenda-color-bar" });
      if (ev.color) bar.style.backgroundColor = ev.color;
      const contentBox = itemEl.createDiv({ cls: "os-agenda-content" });
      const topRow = contentBox.createDiv({ cls: "os-agenda-top-row" });
      const titleWrap = topRow.createDiv({ cls: "os-agenda-title-wrap" });
      titleWrap.createSpan({ cls: "os-agenda-event-title", text: ev.title });
      if (ev.recurrence && ev.recurrence.type !== "none") {
        const repSpan = titleWrap.createSpan({
          cls: "os-agenda-repeat-icon",
          title: `Repeats: ${ev.recurrence.type === "custom_days" ? `Every ${ev.recurrence.intervalDays || 1} days` : ev.recurrence.type}`
        });
        (0, import_obsidian13.setIcon)(repSpan, "refresh-cw");
      }
      const timeText = ev.isAllDay ? "All day" : ev.startTime ? ev.endTime ? `${ev.startTime} - ${ev.endTime}` : ev.startTime : "All day";
      topRow.createSpan({ cls: `os-agenda-event-time ${ev.isAllDay ? "is-all-day" : ""}`, text: timeText });
      if (ev.location) {
        const locRow = contentBox.createDiv({ cls: "os-agenda-sub-row" });
        const locIcon = locRow.createSpan({ cls: "os-agenda-icon" });
        (0, import_obsidian13.setIcon)(locIcon, "map-pin");
        locRow.createSpan({ text: ev.location });
      }
      if (ev.description) {
        contentBox.createDiv({ cls: "os-agenda-desc-row", text: ev.description });
      }
      itemEl.addEventListener("click", () => {
        const origEvent = this.settings.localCalendarEvents?.find((x) => x.id === ev.id) || ev;
        this.openEventModal(origEvent, item.dateStr);
      });
    }
  }
  async renderGraphWidget(container) {
    const cardEl = container.createDiv({ cls: "os-dashboard-card os-card-graph" });
    const header = cardEl.createDiv({ cls: "os-card-header" });
    const titleLeft = header.createDiv({ cls: "os-card-header-left" });
    const iconEl = titleLeft.createSpan({ cls: "os-card-icon" });
    (0, import_obsidian13.setIcon)(iconEl, "git-fork");
    titleLeft.createEl("h3", { text: "Graph view" });
    const headerActions = header.createDiv({ cls: "os-card-header-actions" });
    const refreshBtn = headerActions.createDiv({ cls: "os-card-header-btn", title: "Refresh graph view" });
    (0, import_obsidian13.setIcon)(refreshBtn, "refresh-cw");
    const expandBtn = headerActions.createDiv({ cls: "os-card-header-btn", title: "Open Obsidian Graph View" });
    (0, import_obsidian13.setIcon)(expandBtn, "maximize-2");
    expandBtn.addEventListener("click", () => {
      this.app.commands?.executeCommandById("graph:open");
    });
    const graphBody = cardEl.createDiv({ cls: "os-graph-body" });
    const renderRealGraph = async () => {
      graphBody.empty();
      if (this.embeddedGraphLeaf) {
        try {
          if (this.embeddedGraphLeaf.view) {
            this.embeddedGraphLeaf.view.saveSettings = () => {
            };
            this.embeddedGraphLeaf.view.saveState = () => {
            };
            this.embeddedGraphLeaf.view.save = () => {
            };
          }
          this.embeddedGraphLeaf.detach();
        } catch (e) {
        }
        this.embeddedGraphLeaf = null;
      }
      const graphPlugin = this.app.internalPlugins?.getPluginById("graph");
      const isEnabled = graphPlugin && graphPlugin.enabled;
      if (!isEnabled) {
        const disabledDiv = graphBody.createDiv({ cls: "os-graph-disabled-box" });
        disabledDiv.createEl("p", {
          cls: "os-graph-disabled-text",
          text: "Obsidian Core Graph plugin is currently disabled."
        });
        const enableBtn = disabledDiv.createEl("button", {
          cls: "os-graph-enable-btn",
          text: "Enable Graph Plugin"
        });
        enableBtn.addEventListener("click", async () => {
          try {
            if (graphPlugin) {
              await graphPlugin.enable();
              await renderRealGraph();
            } else {
              this.app.setting?.open?.();
              this.app.setting?.openTabById?.("core-plugins");
            }
          } catch (e) {
            new import_obsidian13.Notice("Please enable Graph view in Settings > Core plugins.");
          }
        });
        return;
      }
      try {
        const leaf = new import_obsidian13.WorkspaceLeaf(this.app);
        if (leaf) {
          leaf.parent = this.app.workspace.rootSplit || this.app.workspace.activeLeaf?.parent;
          let savedGraphState = {};
          try {
            const configDir = this.app.vault.configDir || ".obsidian";
            if (await this.app.vault.adapter.exists(`${configDir}/graph.json`)) {
              const raw = await this.app.vault.adapter.read(`${configDir}/graph.json`);
              if (raw) savedGraphState = JSON.parse(raw);
            }
          } catch (e) {
          }
          await leaf.setViewState({
            type: "graph",
            state: savedGraphState
          });
          if (leaf.view && leaf.view.containerEl) {
            leaf.view.saveSettings = () => {
            };
            leaf.view.saveState = () => {
            };
            leaf.view.save = () => {
            };
            this.embeddedGraphLeaf = leaf;
            const embedWrap = graphBody.createDiv({ cls: "os-real-graph-embed" });
            embedWrap.appendChild(leaf.view.containerEl);
            const innerHeader = leaf.view.containerEl.querySelector(".view-header");
            if (innerHeader) innerHeader.style.display = "none";
            setTimeout(() => {
              try {
                leaf.view?.onResize?.();
              } catch (e) {
              }
            }, 100);
            return;
          }
        }
      } catch (err) {
        console.warn("Failed to embed native graph leaf:", err);
      }
      const fallbackDiv = graphBody.createDiv({ cls: "os-graph-disabled-box" });
      fallbackDiv.createEl("p", {
        cls: "os-graph-disabled-text",
        text: "Click below to launch Obsidian Graph View."
      });
      const openBtn = fallbackDiv.createEl("button", {
        cls: "os-graph-enable-btn",
        text: "Open Graph View"
      });
      openBtn.addEventListener("click", () => {
        this.app.commands?.executeCommandById("graph:open");
      });
    };
    await renderRealGraph();
    refreshBtn.addEventListener("click", async () => {
      refreshBtn.addClass("is-spinning");
      if (this.embeddedGraphLeaf?.view) {
        try {
          this.embeddedGraphLeaf.view?.onResize?.();
        } catch (e) {
        }
      } else {
        await renderRealGraph();
      }
      setTimeout(() => refreshBtn.removeClass("is-spinning"), 600);
    });
  }
  async refreshStreaksCard() {
    if (this.streaksCardEl) {
      await this.renderStreaksContent(this.streaksCardEl);
    }
  }
  async renderStreaksWidget(container) {
    const cardEl = container.createDiv({ cls: "os-dashboard-card os-card-streaks" });
    this.streaksCardEl = cardEl;
    await this.renderStreaksContent(cardEl);
  }
  async renderStreaksContent(cardEl) {
    cardEl.empty();
    const habitsFilePath = this.settings.habitsFile || "Habits.md";
    const archiveFilePath = this.settings.archiveHabitsFile || "99 Archive/Habit.md";
    const maxFreezes = this.settings.maxFreezesPerMonth || 4;
    const streaks = await this.streakService.loadHabits(habitsFilePath, this.settings.streaks || []);
    this.settings.streaks = streaks;
    const header = cardEl.createDiv({ cls: "os-card-header" });
    const titleLeft = header.createDiv({ cls: "os-card-header-left" });
    const iconEl = titleLeft.createSpan({ cls: "os-card-icon" });
    (0, import_obsidian13.setIcon)(iconEl, "flame");
    titleLeft.createEl("h3", { text: "Streaks" });
    const headerActions = header.createDiv({ cls: "os-card-header-actions" });
    const addBtn = headerActions.createDiv({ cls: "os-card-header-btn", title: "Add new habit" });
    (0, import_obsidian13.setIcon)(addBtn, "plus");
    addBtn.addEventListener("click", () => {
      new StreakModal(this.app, null, async (newStreak) => {
        streaks.push(newStreak);
        await this.streakService.saveHabits(habitsFilePath, streaks, maxFreezes);
        this.settings.streaks = streaks;
        if (this.onSaveSettings) {
          await this.onSaveSettings();
        } else {
          await this.renderStreaksContent(cardEl);
          const todayCard = document.querySelector(".os-card-today");
          if (todayCard) await this.renderTodayTasksRefresh(todayCard);
        }
      }).open();
    });
    const bodyEl = cardEl.createDiv({ cls: "os-streaks-body" });
    if (streaks.length === 0) {
      const emptyDiv = bodyEl.createDiv({ cls: "os-streak-empty-state" });
      emptyDiv.createEl("p", { cls: "os-streak-empty-text", text: "No streaks yet. Add habits to auto-populate them in Daily Tasks." });
      const emptyAddBtn = emptyDiv.createEl("button", { cls: "os-streak-empty-btn", text: "+ Add Habit Streak" });
      emptyAddBtn.addEventListener("click", () => {
        new StreakModal(this.app, null, async (newStreak) => {
          streaks.push(newStreak);
          await this.streakService.saveHabits(habitsFilePath, streaks, maxFreezes);
          this.settings.streaks = streaks;
          if (this.onSaveSettings) {
            await this.onSaveSettings();
          } else {
            await this.renderStreaksContent(cardEl);
            const todayCard = document.querySelector(".os-card-today");
            if (todayCard) await this.renderTodayTasksRefresh(todayCard);
          }
        }).open();
      });
      return;
    }
    for (const streak of streaks) {
      const freq = streak.frequency || "daily";
      const isFrozen = this.streakService.isFrozen(streak);
      const isDone = this.streakService.isCompletedInCurrentCycle(streak);
      const daysLeft = this.streakService.getFreezeDaysLeft(streak);
      const daysRemainingInCycle = this.streakService.getDaysRemainingInCycle(streak);
      const habitMaxFreezes = this.streakService.getEffectiveMaxFreezes(streak, maxFreezes);
      const usedFreezes = this.streakService.getFreezesUsedThisMonth(streak);
      const remainingFreezes = this.streakService.getFreezesRemainingThisMonth(streak, habitMaxFreezes);
      const streakUnit = freq === "weekly" ? streak.currentStreak === 1 ? "wk" : "wks" : freq === "monthly" ? streak.currentStreak === 1 ? "mo" : "mos" : freq === "yearly" ? streak.currentStreak === 1 ? "yr" : "yrs" : streak.currentStreak === 1 ? "day" : "days";
      const bestUnit = freq === "weekly" ? "weeks" : freq === "monthly" ? "months" : freq === "yearly" ? "years" : "days";
      const row = bodyEl.createDiv({
        cls: `os-streak-row ${isDone ? "is-completed" : ""} ${isFrozen ? "is-frozen" : ""}`
      });
      const tooltipLines = [
        `Habit: ${streak.name}`,
        ...streak.description ? [`Description: ${streak.description}`] : [],
        `Frequency: ${freq.charAt(0).toUpperCase() + freq.slice(1)}${freq !== "daily" ? ` (${streak.scheduleType === "fixed" ? "Fixed" : "Flexible"})` : ""}`,
        `Current Streak: ${streak.currentStreak || 0} ${streakUnit}`,
        `Best Streak: ${streak.bestStreak || streak.currentStreak || 0} ${bestUnit}`,
        `Start Date: ${streak.startDate || "Not specified"}`,
        `Created: ${streak.createdDate || "N/A"}`,
        `Freeze Quota: ${usedFreezes} / ${habitMaxFreezes} used (${remainingFreezes} left this ${streak.freezePeriodType || "month"})`,
        isFrozen ? `Status: Frozen until ${streak.frozenUntil} (${daysLeft} day${daysLeft === 1 ? "" : "s"} remaining)` : isDone ? `Status: Completed for this ${freq === "weekly" ? "week" : freq === "monthly" ? "month" : freq === "yearly" ? "year" : "day"}!` : `Status: Pending (${daysRemainingInCycle} day${daysRemainingInCycle === 1 ? "" : "s"} left in cycle)`
      ];
      row.setAttribute("title", tooltipLines.join("\n"));
      row.addEventListener("click", (e) => {
        const target = e.target;
        if (target.closest(".os-streak-frozen-pill, .os-streak-cycle-pill, .os-streak-action-btn, button")) {
          return;
        }
        new HabitDetailsModal(
          this.app,
          streak,
          this.streakService,
          this.settings,
          async () => {
            await this.streakService.saveHabits(habitsFilePath, streaks, maxFreezes);
            if (this.onSaveSettings) {
              await this.onSaveSettings();
            } else {
              await this.renderStreaksContent(cardEl);
              const todayCard = document.querySelector(".os-card-today");
              if (todayCard) await this.renderTodayTasksRefresh(todayCard);
            }
          }
        ).open();
      });
      row.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        const menu = new import_obsidian13.Menu();
        menu.addItem((item) => {
          item.setTitle("View Details & Calendar").setIcon("calendar").onClick(() => {
            new HabitDetailsModal(
              this.app,
              streak,
              this.streakService,
              this.settings,
              async () => {
                await this.streakService.saveHabits(habitsFilePath, streaks, maxFreezes);
                if (this.onSaveSettings) {
                  await this.onSaveSettings();
                } else {
                  await this.renderStreaksContent(cardEl);
                  const todayCard = document.querySelector(".os-card-today");
                  if (todayCard) await this.renderTodayTasksRefresh(todayCard);
                }
              }
            ).open();
          });
        });
        if (!isDone) {
          menu.addItem((item) => {
            item.setTitle("Add to Today's Plan").setIcon("calendar-plus").onClick(async () => {
              const res = await this.streakService.addHabitToToday(this.settings.dailyTasksFile, streak, this.taskService);
              new import_obsidian13.Notice(res.message);
              if (res.success) {
                const todayCard = document.querySelector(".os-card-today");
                if (todayCard) await this.renderTodayTasksRefresh(todayCard);
              }
            });
          });
        }
        menu.addItem((item) => {
          item.setTitle(isFrozen ? "Manage Freeze" : "Freeze Habit").setIcon("snowflake").onClick(() => {
            new FreezeStreakModal(this.app, streak, this.streakService, habitMaxFreezes, async () => {
              await this.streakService.saveHabits(habitsFilePath, streaks, maxFreezes);
              this.settings.streaks = streaks;
              if (this.onSaveSettings) await this.onSaveSettings();
              await this.renderStreaksContent(cardEl);
              const todayCard = document.querySelector(".os-card-today");
              if (todayCard) await this.renderTodayTasksRefresh(todayCard);
            }).open();
          });
        });
        menu.addItem((item) => {
          item.setTitle("Edit Habit...").setIcon("pencil").onClick(() => {
            new StreakModal(this.app, streak, async (updated) => {
              await this.streakService.updateHabitDetails(
                habitsFilePath,
                streak.id,
                updated.name,
                updated.description,
                this.settings
              );
              if (this.onSaveSettings) {
                await this.onSaveSettings();
              } else {
                await this.renderStreaksContent(cardEl);
                const todayCard = document.querySelector(".os-card-today");
                if (todayCard) await this.renderTodayTasksRefresh(todayCard);
              }
            }).open();
          });
        });
        menu.addItem((item) => {
          item.setTitle("Archive or Delete...").setIcon("trash-2").onClick(() => {
            new ArchiveOrDeleteStreakModal(
              this.app,
              streak,
              archiveFilePath,
              async () => {
                await this.streakService.archiveHabit(habitsFilePath, archiveFilePath, streak.id, this.settings);
                if (this.onSaveSettings) {
                  await this.onSaveSettings();
                } else {
                  await this.renderStreaksContent(cardEl);
                  const todayCard = document.querySelector(".os-card-today");
                  if (todayCard) await this.renderTodayTasksRefresh(todayCard);
                }
              },
              async () => {
                await this.streakService.deleteHabit(habitsFilePath, streak.id, this.settings);
                if (this.onSaveSettings) {
                  await this.onSaveSettings();
                } else {
                  await this.renderStreaksContent(cardEl);
                  const todayCard = document.querySelector(".os-card-today");
                  if (todayCard) await this.renderTodayTasksRefresh(todayCard);
                }
              }
            ).open();
          });
        });
        menu.showAtMouseEvent(e);
      });
      const habitIcon = row.createSpan({ cls: "os-streak-habit-icon" });
      (0, import_obsidian13.setIcon)(habitIcon, streak.icon || "flame");
      row.createSpan({ cls: "os-streak-name", text: streak.name });
      const rightWrap = row.createDiv({ cls: "os-streak-right" });
      if (isFrozen) {
        const freezePill = rightWrap.createSpan({
          cls: "os-streak-frozen-pill",
          text: `\u2744\uFE0F ${daysLeft}d left`
        });
        freezePill.setAttribute("title", `Frozen until ${streak.frozenUntil}. Click to manage freeze.`);
        freezePill.addEventListener("click", (e) => {
          e.stopPropagation();
          new FreezeStreakModal(this.app, streak, this.streakService, habitMaxFreezes, async () => {
            await this.streakService.saveHabits(habitsFilePath, streaks, maxFreezes);
            this.settings.streaks = streaks;
            if (this.onSaveSettings) {
              await this.onSaveSettings();
            } else {
              await this.renderStreaksContent(cardEl);
              const todayCard = document.querySelector(".os-card-today");
              if (todayCard) await this.renderTodayTasksRefresh(todayCard);
            }
          }).open();
        });
      } else if (freq === "weekly" || freq === "monthly" || freq === "yearly") {
        if (isDone) {
          rightWrap.createSpan({
            cls: "os-streak-count is-done-today",
            text: `\u2713 Done (${streak.currentStreak || 0} ${streakUnit})`
          });
        } else {
          const cyclePill = rightWrap.createSpan({
            cls: "os-streak-cycle-pill",
            text: `\u23F3 ${daysRemainingInCycle}d left`
          });
          cyclePill.setAttribute("title", `Due before cycle ends. Current streak: ${streak.currentStreak || 0} ${streakUnit}`);
        }
      } else {
        const countSpan = rightWrap.createSpan({
          cls: `os-streak-count ${isDone ? "is-done-today" : ""}`,
          text: `${streak.currentStreak || 0} days`
        });
        if (isDone) {
          countSpan.setAttribute("title", "Completed today in Daily Tasks!");
        }
      }
    }
  }
  renderRightQuoteWidget(container) {
    const cardEl = container.createDiv({ cls: "os-dashboard-card os-card-right-quote" });
    const header = cardEl.createDiv({ cls: "os-card-header" });
    const titleLeft = header.createDiv({ cls: "os-card-header-left" });
    const iconEl = titleLeft.createSpan({ cls: "os-card-icon" });
    (0, import_obsidian13.setIcon)(iconEl, "sparkles");
    titleLeft.createEl("h3", { text: "Quote" });
    const headerActions = header.createDiv({ cls: "os-card-header-actions" });
    const editBtn = headerActions.createDiv({ cls: "os-card-header-btn", title: "Edit quote" });
    (0, import_obsidian13.setIcon)(editBtn, "pencil");
    const quoteText = this.settings.rightRailQuote || "\u201CConsistency is more important than intensity.\u201D";
    const bodyEl = cardEl.createDiv({ cls: "os-right-quote-body" });
    const quoteEl = bodyEl.createEl("blockquote", { cls: "os-right-quote-text", text: quoteText });
    if (this.settings.rightRailQuoteAuthor) {
      bodyEl.createDiv({ cls: "os-right-quote-author", text: `\u2014 ${this.settings.rightRailQuoteAuthor}` });
    }
    const openEditModal = () => {
      new QuoteModal(
        this.app,
        this.settings.rightRailQuote || "\u201CConsistency is more important than intensity.\u201D",
        this.settings.rightRailQuoteAuthor || "",
        async (newQuote, newAuthor) => {
          this.settings.rightRailQuote = newQuote;
          this.settings.rightRailQuoteAuthor = newAuthor;
          if (this.onSaveSettings) await this.onSaveSettings();
          if (this.rootContainerEl) await this.render(this.rootContainerEl);
        }
      ).open();
    };
    editBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openEditModal();
    });
    quoteEl.setAttribute("title", "Click to edit quote");
    quoteEl.addEventListener("click", (e) => {
      e.stopPropagation();
      openEditModal();
    });
  }
};

// src/view/osDashboardView.ts
var VIEW_TYPE_OS_DASHBOARD = "os-dashboard-view";
var OSDashboardView = class extends import_obsidian14.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.renderer = null;
    this.plugin = plugin;
    this.debouncedRefresh = (0, import_obsidian14.debounce)(() => {
      this.refresh();
    }, 500, true);
  }
  getViewType() {
    return VIEW_TYPE_OS_DASHBOARD;
  }
  getDisplayText() {
    return this.plugin.settings.vaultTitle || "OS Dashboard";
  }
  getIcon() {
    return "layout-dashboard";
  }
  async onOpen() {
    this.renderer = new DashboardRenderer(
      this.app,
      this.plugin.settings,
      this.plugin.navigationService,
      this.plugin.taskService,
      this.plugin.recentNotesService,
      this.plugin.quickCaptureService,
      this.plugin.projectService,
      this.plugin.quoteService,
      this.plugin.iconService,
      this.plugin.streakService,
      this.plugin.calendarService,
      () => this.plugin.saveSettings()
    );
    await this.renderer.render(this.contentEl);
    this.registerEvent(this.app.vault.on("modify", () => this.debouncedRefresh()));
    this.registerEvent(this.app.vault.on("create", () => this.debouncedRefresh()));
    this.registerEvent(this.app.vault.on("delete", () => this.debouncedRefresh()));
  }
  async refresh() {
    if (this.renderer && this.contentEl) {
      this.renderer.updateSettings(this.plugin.settings);
      await this.renderer.render(this.contentEl);
    }
  }
  async onClose() {
    if (this.renderer) {
      this.renderer.destroy();
      this.renderer = null;
    }
  }
};

// src/services/iconService.ts
var import_obsidian15 = require("obsidian");
var _IconService = class _IconService {
  constructor(app) {
    this.app = app;
  }
  /**
   * Resolves folder icon and color from obsidian-iconize, or falls back to smart defaults
   */
  resolveFolderIcon(folderPath, folderName, index = 0) {
    const fallbackColor = _IconService.COLOR_PALETTE[index % _IconService.COLOR_PALETTE.length];
    const iconizeInfo = this.getFolderIconizeInfo(folderPath, folderName, fallbackColor);
    if (iconizeInfo) {
      return iconizeInfo;
    }
    const defaultIcon = this.getDefaultLucideIcon(folderName);
    return {
      type: "lucide",
      value: defaultIcon,
      color: fallbackColor
    };
  }
  /**
   * Helper to check if a specific folder has an icon in Iconize
   */
  getFolderIconizeInfo(folderPath, folderName, defaultColor = "#3b82f6") {
    const iconizePlugin = this.app.plugins?.plugins?.["obsidian-iconize"] || this.app.plugins?.plugins?.["obsidian-icon-folder"];
    if (!iconizePlugin) return null;
    try {
      let rawIcon = null;
      let customColor = null;
      if (iconizePlugin.api && typeof iconizePlugin.api.getIconByPath === "function") {
        rawIcon = iconizePlugin.api.getIconByPath(folderPath) || iconizePlugin.api.getIconByPath(folderName);
      }
      const pluginData = iconizePlugin.data || iconizePlugin.settings;
      if (pluginData) {
        const item = pluginData[folderPath] || pluginData[folderName] || pluginData[`${folderPath}/`] || pluginData[`${folderName}/`];
        if (item) {
          if (typeof item === "string") {
            if (!rawIcon) rawIcon = item;
          } else if (typeof item === "object") {
            if (!rawIcon) rawIcon = item.iconName;
            if (item.iconColor) customColor = item.iconColor;
          }
        }
        if (!customColor && pluginData.colors) {
          customColor = pluginData.colors[folderPath] || pluginData.colors[folderName] || null;
        }
      }
      const finalColor = customColor || defaultColor;
      if (rawIcon) {
        if (typeof rawIcon === "object") {
          const svgHtml = rawIcon.svgElement || (rawIcon.svgContent ? `<svg viewBox="${rawIcon.svgViewbox || "0 0 24 24"}">${rawIcon.svgContent}</svg>` : "");
          if (svgHtml) {
            return {
              type: "svg",
              value: svgHtml,
              color: finalColor
            };
          }
        }
        if (typeof rawIcon === "string" && this.isEmoji(rawIcon)) {
          return {
            type: "emoji",
            value: rawIcon,
            color: finalColor
          };
        }
        if (typeof rawIcon === "string" && rawIcon.trim().length > 0) {
          const trimmedIcon = rawIcon.trim();
          if (iconizePlugin.api && typeof iconizePlugin.api.getIconByName === "function") {
            const iconObj = iconizePlugin.api.getIconByName(trimmedIcon);
            if (iconObj && (iconObj.svgElement || iconObj.svgContent)) {
              return {
                type: "svg",
                value: iconObj.svgElement || `<svg>${iconObj.svgContent}</svg>`,
                color: finalColor
              };
            }
          }
          if (typeof iconizePlugin.getIconPackManager === "function") {
            try {
              const mgr = iconizePlugin.getIconPackManager();
              if (mgr && typeof mgr.getIconByName === "function") {
                const iconObj = mgr.getIconByName(trimmedIcon);
                if (iconObj && (iconObj.svgElement || iconObj.svgContent)) {
                  return {
                    type: "svg",
                    value: iconObj.svgElement || `<svg>${iconObj.svgContent}</svg>`,
                    color: finalColor
                  };
                }
              }
            } catch {
            }
          }
          let cleanName = trimmedIcon.replace(/^(Li|Lucide|lucide|Lu|Fa|Ri|Tb|Hi):?/i, "");
          cleanName = cleanName.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([a-zA-Z])([0-9]+)/g, "$1-$2").toLowerCase();
          return {
            type: "lucide",
            value: cleanName || "folder",
            color: finalColor
          };
        }
      }
    } catch (err) {
      console.warn("OS Dashboard: error reading Iconize data", err);
    }
    return null;
  }
  /**
   * Resolves icon and color for a file by traversing up its parent folder hierarchy:
   * Parent folder -> Parent's Parent -> ... -> 1st level folder -> Root fallback.
   */
  resolveFileFolderIcon(file) {
    const root = this.app.vault.getRoot();
    let currentFolder = file.parent;
    let topLevelFolder = null;
    while (currentFolder && currentFolder !== root && !currentFolder.isRoot()) {
      const iconInfo = this.getFolderIconizeInfo(currentFolder.path, currentFolder.name);
      if (iconInfo) {
        return iconInfo;
      }
      topLevelFolder = currentFolder;
      currentFolder = currentFolder.parent;
    }
    if (topLevelFolder) {
      const firstLevelFolders = root.children.filter((c) => c instanceof import_obsidian15.TFolder);
      firstLevelFolders.sort((a, b) => a.name.localeCompare(b.name, void 0, { numeric: true, sensitivity: "base" }));
      const idx = firstLevelFolders.indexOf(topLevelFolder);
      return this.resolveFolderIcon(topLevelFolder.path, topLevelFolder.name, idx >= 0 ? idx : 0);
    }
    return {
      type: "lucide",
      value: "file-text",
      color: "var(--text-muted)"
    };
  }
  /**
   * Safely renders an icon into an element with clean stroke and NO unwanted fill
   */
  renderIcon(el, iconInfo) {
    el.empty();
    if (iconInfo.type === "svg" && iconInfo.value) {
      el.innerHTML = iconInfo.value;
      const svg2 = el.querySelector("svg");
      if (svg2) {
        svg2.removeAttribute("width");
        svg2.removeAttribute("height");
        svg2.style.width = "16px";
        svg2.style.height = "16px";
        svg2.style.display = "block";
        svg2.style.color = iconInfo.color;
        svg2.style.stroke = iconInfo.color;
      }
      return;
    }
    if (iconInfo.type === "emoji" && iconInfo.value) {
      const span = el.createSpan({ text: iconInfo.value, cls: "os-emoji-icon" });
      span.style.fontSize = "16px";
      span.style.lineHeight = "1";
      return;
    }
    try {
      (0, import_obsidian15.setIcon)(el, iconInfo.value || "folder");
    } catch {
      (0, import_obsidian15.setIcon)(el, "folder");
    }
    let svg = el.querySelector("svg");
    if (!svg && iconInfo.value) {
      const hyphenated = iconInfo.value.replace(/([a-zA-Z])([0-9]+)/g, "$1-$2");
      if (hyphenated !== iconInfo.value) {
        try {
          (0, import_obsidian15.setIcon)(el, hyphenated);
          svg = el.querySelector("svg");
        } catch {
        }
      }
      if (!svg) {
        try {
          (0, import_obsidian15.setIcon)(el, "folder");
          svg = el.querySelector("svg");
        } catch {
        }
      }
    }
    if (svg) {
      svg.style.width = "16px";
      svg.style.height = "16px";
      svg.style.color = iconInfo.color;
      svg.style.stroke = iconInfo.color;
      svg.style.fill = "none";
    }
  }
  isEmoji(str) {
    if (!str || typeof str !== "string") return false;
    if (/[a-zA-Z]/.test(str)) return false;
    return /\p{Extended_Pictographic}/u.test(str);
  }
  getDefaultLucideIcon(folderName) {
    const lower = folderName.toLowerCase();
    if (lower.includes("inbox")) return "inbox";
    if (lower.includes("area")) return "compass";
    if (lower.includes("knowledge") || lower.includes("learn")) return "brain";
    if (lower.includes("project")) return "folder-kanban";
    if (lower.includes("content") || lower.includes("publish")) return "layout-grid";
    if (lower.includes("read") || lower.includes("book")) return "book-open";
    if (lower.includes("course") || lower.includes("study")) return "graduation-cap";
    if (lower.includes("creat")) return "sparkles";
    if (lower.includes("hobb") || lower.includes("game")) return "gamepad-2";
    if (lower.includes("career") || lower.includes("work")) return "briefcase";
    if (lower.includes("writ")) return "pen-tool";
    if (lower.includes("archive")) return "archive";
    return "folder";
  }
};
// Vibrant palette matching the OS Dashboard aesthetic
_IconService.COLOR_PALETTE = [
  "#f59e0b",
  // Amber/Inbox
  "#06b6d4",
  // Cyan/Areas
  "#3b82f6",
  // Blue/Knowledge
  "#6366f1",
  // Indigo/Projects
  "#ec4899",
  // Pink/Content
  "#0ea5e9",
  // Sky/Reading
  "#10b981",
  // Emerald/Courses
  "#a855f7",
  // Purple/Creative
  "#eab308",
  // Yellow/Hobbies
  "#64748b",
  // Slate/Career
  "#f43f5e",
  // Rose/Writing
  "#14b8a6"
  // Teal/Archive
];
var IconService = _IconService;

// src/services/navigationService.ts
var import_obsidian16 = require("obsidian");
var NavigationService = class {
  constructor(app, iconService) {
    this.app = app;
    this.iconService = iconService;
  }
  /**
   * Retrieves all first-level folders and checks for Home/Index files
   */
  getFolderCards(settings) {
    const root = this.app.vault.getRoot();
    const children = root.children;
    const folders = [];
    const ignored = (settings.ignoredFolders || ["_attachments", "_scripts", "_templates", "Templates", ".trash"]).map((f) => f.toLowerCase().trim());
    for (const child of children) {
      if (child instanceof import_obsidian16.TFolder) {
        const lowerName = child.name.toLowerCase();
        if (child.name.startsWith(".") || child.name.startsWith("_") || ignored.includes(lowerName)) {
          continue;
        }
        folders.push(child);
      }
    }
    folders.sort((a, b) => a.name.localeCompare(b.name, void 0, { numeric: true, sensitivity: "base" }));
    const cards = [];
    const keywords = (settings.homeKeywords || ["Home"]).map((k) => k.trim().toLowerCase()).filter(Boolean);
    const matchFolderName = settings.matchFolderName ?? true;
    folders.forEach((folder, idx) => {
      let homeFile;
      const folderNameLower = folder.name.toLowerCase();
      const folderNameClean = folder.name.replace(/^\d+[\s._-]+/, "").trim().toLowerCase();
      const mdFiles = folder.children.filter((child) => child instanceof import_obsidian16.TFile && child.extension === "md");
      if (matchFolderName) {
        homeFile = mdFiles.find((child) => {
          const baseNameLower = child.basename.toLowerCase();
          return baseNameLower === folderNameLower || folderNameClean.length > 0 && baseNameLower === folderNameClean;
        });
      }
      if (!homeFile) {
        homeFile = mdFiles.find((child) => {
          const baseNameLower = child.basename.toLowerCase();
          return keywords.some((kw) => baseNameLower.includes(kw));
        });
      }
      const iconInfo = this.iconService.resolveFolderIcon(folder.path, folder.name, idx);
      cards.push({
        name: folder.name,
        path: folder.path,
        hasHome: !!homeFile,
        homeFile,
        resolvedIcon: iconInfo,
        subtitle: homeFile ? homeFile.basename : "Create new note"
      });
    });
    return cards;
  }
  /**
   * Handles user click on a folder card:
   * - If home file exists: opens home note
   * - If no home file exists: creates new file according to pattern and opens it
   */
  async handleFolderClick(card, settings) {
    if (card.hasHome && card.homeFile) {
      const leaf = this.app.workspace.getLeaf(false);
      await leaf.openFile(card.homeFile);
      return;
    }
    try {
      const pattern = settings.newFilePattern || "YYYY-MM-DD HH-mm";
      let baseTitle = moment().format(pattern);
      if (!baseTitle || baseTitle.trim().length === 0) {
        baseTitle = "Untitled";
      }
      let filePath = `${card.path}/${baseTitle}.md`;
      let counter = 1;
      while (this.app.vault.getAbstractFileByPath(filePath)) {
        filePath = `${card.path}/${baseTitle} (${counter}).md`;
        counter++;
      }
      const initialContent = `# ${baseTitle}

`;
      const createdFile = await this.app.vault.create(filePath, initialContent);
      new import_obsidian16.Notice(`Created note in ${card.name}: ${createdFile.basename}`);
      const leaf = this.app.workspace.getLeaf(false);
      await leaf.openFile(createdFile);
    } catch (err) {
      console.error("OS Dashboard: Failed to create new note", err);
      new import_obsidian16.Notice(`Failed to create note in ${card.name}`);
    }
  }
};

// src/services/taskService.ts
var import_obsidian17 = require("obsidian");
var TaskService = class {
  constructor(app) {
    this.app = app;
  }
  /**
   * Retrieves today's tasks from the configured Daily Tasks file
   */
  async getTodayTasks(filePath) {
    const file = this.getFile(filePath);
    if (!file) return [];
    const content = await this.app.vault.read(file);
    const lines = content.split("\n");
    const todayDate = moment().format("YYYY-MM-DD");
    let insideTodaySection = false;
    const tasks = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
      if (headingMatch) {
        const headingText = headingMatch[2].trim();
        if (headingText.includes(todayDate)) {
          insideTodaySection = true;
          continue;
        } else if (insideTodaySection) {
          break;
        }
      }
      if (insideTodaySection) {
        const taskMatch = line.match(/^(\s*[-*]\s*\[([ xX])\])\s+(.*)$/);
        if (taskMatch) {
          const completed = taskMatch[2].toLowerCase() === "x";
          const text = taskMatch[3].trim();
          tasks.push({
            id: `today-${i}`,
            text,
            completed,
            lineNumber: i,
            rawLine: line,
            sourceFile: file.path,
            dateHeading: todayDate
          });
        }
      }
    }
    return tasks;
  }
  /**
   * Retrieves all unfinished tasks (- [ ]) from dates strictly before today
   */
  async getOverdueTasks(filePath) {
    const file = this.getFile(filePath);
    if (!file) return [];
    const content = await this.app.vault.read(file);
    const lines = content.split("\n");
    const todayDate = moment().format("YYYY-MM-DD");
    let currentHeadingDate = null;
    let isPastDate = false;
    const tasks = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
      if (headingMatch) {
        const headingText = headingMatch[2].trim();
        const dateMatch = headingText.match(/\b(\d{4}-\d{2}-\d{2})\b/);
        if (dateMatch) {
          currentHeadingDate = dateMatch[1];
          isPastDate = currentHeadingDate < todayDate;
        } else {
          currentHeadingDate = null;
          isPastDate = false;
        }
        continue;
      }
      if (isPastDate && currentHeadingDate) {
        const taskMatch = line.match(/^(\s*[-*]\s*\[ \])\s+(.*)$/);
        if (taskMatch) {
          const text = taskMatch[2].trim();
          tasks.push({
            id: `overdue-${i}`,
            text,
            completed: false,
            lineNumber: i,
            rawLine: line,
            sourceFile: file.path,
            dateHeading: currentHeadingDate
          });
        }
      }
    }
    return tasks;
  }
  /**
   * Moves a single overdue task from its past date heading to today's date heading
   */
  async moveTaskToToday(sourceFilePath, lineNumber, taskText) {
    const file = this.getFile(sourceFilePath);
    if (!file) return false;
    const todayDate = moment().format("YYYY-MM-DD");
    const cleanText = taskText.trim().replace(/^[-*]\s*(\[[ xX]\]\s*)?/, "");
    if (!cleanText) return false;
    try {
      await this.app.vault.process(file, (data) => {
        const lines = data.split("\n");
        if (lineNumber >= 0 && lineNumber < lines.length) {
          lines.splice(lineNumber, 1);
        }
        const headingRegex = new RegExp(`^#{1,6}\\s+.*${todayDate}`, "i");
        let headingIndex = lines.findIndex((l) => headingRegex.test(l));
        if (headingIndex !== -1) {
          let insertIndex = lines.length;
          for (let i = headingIndex + 1; i < lines.length; i++) {
            if (/^#{1,6}\s+/.test(lines[i])) {
              insertIndex = i;
              break;
            }
          }
          lines.splice(insertIndex, 0, `- [ ] ${cleanText}`);
        } else {
          if (lines.length > 0 && lines[lines.length - 1].trim() !== "") {
            lines.push("");
          }
          lines.push(`## ${todayDate}`);
          lines.push(`- [ ] ${cleanText}`);
        }
        return lines.join("\n");
      });
      return true;
    } catch (err) {
      console.error("OS Dashboard: Failed to move task to today", err);
      return false;
    }
  }
  /**
   * Moves all overdue tasks from past date headings to today's date heading in one batch
   */
  async moveAllOverdueToToday(sourceFilePath) {
    const file = this.getFile(sourceFilePath);
    if (!file) return false;
    const todayDate = moment().format("YYYY-MM-DD");
    try {
      await this.app.vault.process(file, (data) => {
        const lines = data.split("\n");
        let currentHeadingDate = null;
        let isPastDate = false;
        const tasksToMove = [];
        for (let i = lines.length - 1; i >= 0; i--) {
          const line = lines[i];
          const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
          if (headingMatch) {
            const dateMatch = headingMatch[2].match(/\b(\d{4}-\d{2}-\d{2})\b/);
            if (dateMatch) {
              currentHeadingDate = dateMatch[1];
              isPastDate = currentHeadingDate < todayDate;
            } else {
              isPastDate = false;
            }
            continue;
          }
          if (isPastDate) {
            const taskMatch = line.match(/^(\s*[-*]\s*\[ \])\s+(.*)$/);
            if (taskMatch) {
              tasksToMove.unshift(taskMatch[2].trim());
              lines.splice(i, 1);
            }
          }
        }
        if (tasksToMove.length === 0) {
          return lines.join("\n");
        }
        const headingRegex = new RegExp(`^#{1,6}\\s+.*${todayDate}`, "i");
        let headingIndex = lines.findIndex((l) => headingRegex.test(l));
        const formatted = tasksToMove.map((t) => `- [ ] ${t}`);
        if (headingIndex !== -1) {
          let insertIndex = lines.length;
          for (let i = headingIndex + 1; i < lines.length; i++) {
            if (/^#{1,6}\s+/.test(lines[i])) {
              insertIndex = i;
              break;
            }
          }
          lines.splice(insertIndex, 0, ...formatted);
        } else {
          if (lines.length > 0 && lines[lines.length - 1].trim() !== "") {
            lines.push("");
          }
          lines.push(`## ${todayDate}`);
          lines.push(...formatted);
        }
        return lines.join("\n");
      });
      return true;
    } catch (err) {
      console.error("OS Dashboard: Failed to move all overdue tasks to today", err);
      return false;
    }
  }
  async getWeeklyTasks(filePath) {
    const file = this.getFile(filePath);
    if (!file) return [];
    const content = await this.app.vault.read(file);
    const lines = content.split("\n");
    const tasks = [];
    let hasWeeklyHeading = lines.some((l) => /^#{1,6}\s+.*this\s*week/i.test(l));
    let insideWeekly = !hasWeeklyHeading;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
      if (headingMatch) {
        const headingText = headingMatch[2].trim().toLowerCase();
        if (headingText.includes("this week")) {
          insideWeekly = true;
          continue;
        } else if (insideWeekly && hasWeeklyHeading) {
          break;
        }
      }
      if (insideWeekly) {
        const taskMatch = line.match(/^(\s*[-*]\s*\[([ xX])\])\s+(.*)$/);
        if (taskMatch) {
          const completed = taskMatch[2].toLowerCase() === "x";
          const text = taskMatch[3].trim();
          tasks.push({
            id: `weekly-${i}`,
            text,
            completed,
            lineNumber: i,
            rawLine: line,
            sourceFile: file.path
          });
        }
      }
    }
    return tasks;
  }
  /**
   * Toggles task completion state directly inside the source file.
   * If autoLogPath is provided:
   * - When marked completed: appends it to the log file.
   * - When unchecked: removes the matching item from the log file under today's date.
   */
  async toggleTask(sourceFilePath, lineNumber, autoLogOptions) {
    const file = this.getFile(sourceFilePath);
    if (!file) return false;
    let taskText = null;
    let becameCompleted = false;
    let becameUnchecked = false;
    try {
      await this.app.vault.process(file, (data) => {
        const lines = data.split("\n");
        if (lineNumber >= 0 && lineNumber < lines.length) {
          const currentLine = lines[lineNumber];
          const match = currentLine.match(/^(\s*[-*]\s*\[[ xX]\])\s+(.*)$/);
          if (match) {
            taskText = match[2].trim();
          }
          if (/\[ \]/i.test(currentLine)) {
            lines[lineNumber] = currentLine.replace(/\[ \]/, "[x]");
            becameCompleted = true;
          } else if (/\[[xX]\]/.test(currentLine)) {
            lines[lineNumber] = currentLine.replace(/\[[xX]\]/, "[ ]");
            becameUnchecked = true;
          }
        }
        return lines.join("\n");
      });
      if (taskText && autoLogOptions?.autoLog && autoLogOptions?.logFilePath) {
        if (becameCompleted) {
          await this.addLoggedItem(autoLogOptions.logFilePath, taskText);
        } else if (becameUnchecked) {
          await this.removeLoggedItem(autoLogOptions.logFilePath, taskText);
        }
      }
      return true;
    } catch (err) {
      console.error("OS Dashboard: Failed to toggle task", err);
      return false;
    }
  }
  /**
   * Removes an item from the Daily Log file under today's date if it exists
   */
  async removeLoggedItem(logFilePath, text, dateHeading) {
    const cleanText = text.trim().replace(/^[-*]\s*(\[[ xX]\]\s*)?/, "");
    if (!cleanText) return false;
    const file = this.getFile(logFilePath);
    if (!file) return false;
    const targetDate = dateHeading || moment().format("YYYY-MM-DD");
    try {
      await this.app.vault.process(file, (data) => {
        const lines = data.split("\n");
        const headingRegex = new RegExp(`^#{1,6}\\s+.*${targetDate}`, "i");
        const headingIndex = lines.findIndex((l) => headingRegex.test(l));
        if (headingIndex !== -1) {
          for (let i = headingIndex + 1; i < lines.length; i++) {
            if (/^#{1,6}\s+/.test(lines[i])) {
              break;
            }
            const lineContent = lines[i].replace(/^[-*]\s*(\[[ xX]\]\s*)?/, "").trim();
            if (lineContent.toLowerCase() === cleanText.toLowerCase()) {
              lines.splice(i, 1);
              break;
            }
          }
        }
        return lines.join("\n");
      });
      return true;
    } catch (err) {
      console.error("OS Dashboard: Failed to remove item from log file", err);
      return false;
    }
  }
  /**
   * Appends multiple tasks under a date heading (can be open or completed)
   */
  async addTasks(filePath, taskTexts, dateHeading, completed = false) {
    const validTasks = taskTexts.map((t) => t.trim().replace(/^[-*]\s*(\[[ xX]\]\s*)?/, "")).filter(Boolean);
    if (validTasks.length === 0) return false;
    let file = this.getFile(filePath);
    if (!file) {
      try {
        file = await this.app.vault.create(filePath, "");
      } catch (err) {
        console.error("OS Dashboard: Could not create tasks file", err);
        return false;
      }
    }
    const targetDate = dateHeading || moment().format("YYYY-MM-DD");
    try {
      await this.app.vault.process(file, (data) => {
        const lines = data.split("\n");
        const headingRegex = new RegExp(`^#{1,6}\\s+.*${targetDate}`, "i");
        let headingIndex = lines.findIndex((l) => headingRegex.test(l));
        const mark = completed ? "[x]" : "[ ]";
        const formattedTasks = validTasks.map((t) => `- ${mark} ${t}`);
        if (headingIndex !== -1) {
          const existingUnderHeading = /* @__PURE__ */ new Set();
          let insertIndex = lines.length;
          for (let i = headingIndex + 1; i < lines.length; i++) {
            if (/^#{1,6}\s+/.test(lines[i])) {
              insertIndex = i;
              break;
            }
            const match = lines[i].match(/^[-*]\s*(\[[ xX]\]\s*)?(.*)$/);
            if (match) {
              existingUnderHeading.add(match[2].trim().toLowerCase());
            }
          }
          const tasksToInsert = validTasks.filter((t) => !existingUnderHeading.has(t.toLowerCase())).map((t) => `- ${mark} ${t}`);
          if (tasksToInsert.length === 0) {
            return lines.join("\n");
          }
          lines.splice(insertIndex, 0, ...tasksToInsert);
        } else {
          if (data.trim().length > 0) {
            lines.push("");
          }
          lines.push(`## ${targetDate}`);
          lines.push(...formattedTasks);
        }
        return lines.join("\n");
      });
      return true;
    } catch (err) {
      console.error("OS Dashboard: Failed to add tasks", err);
      return false;
    }
  }
  /**
   * Appends a new task under a date heading or file
   */
  async addTask(filePath, taskText, dateHeading, completed = false) {
    return this.addTasks(filePath, [taskText], dateHeading, completed);
  }
  /**
   * Appends an item to the Daily Log file under today's date
   * Avoids duplicate lines under today's heading
   */
  async addLoggedItem(logFilePath, text, dateHeading) {
    const cleanText = text.trim().replace(/^[-*]\s*(\[[ xX]\]\s*)?/, "");
    if (!cleanText) return false;
    let file = this.getFile(logFilePath);
    if (!file) {
      try {
        file = await this.app.vault.create(logFilePath, "");
      } catch (err) {
        console.error("OS Dashboard: Could not create log file", err);
        return false;
      }
    }
    const targetDate = dateHeading || moment().format("YYYY-MM-DD");
    try {
      await this.app.vault.process(file, (data) => {
        const lines = data.split("\n");
        const headingRegex = new RegExp(`^#{1,6}\\s+.*${targetDate}`, "i");
        let headingIndex = lines.findIndex((l) => headingRegex.test(l));
        if (headingIndex !== -1) {
          let endOfSection = lines.length;
          for (let i = headingIndex + 1; i < lines.length; i++) {
            if (/^#{1,6}\s+/.test(lines[i])) {
              endOfSection = i;
              break;
            }
            const lineContent = lines[i].replace(/^[-*]\s*(\[[ xX]\]\s*)?/, "").trim();
            if (lineContent.toLowerCase() === cleanText.toLowerCase()) {
              return lines.join("\n");
            }
          }
          lines.splice(endOfSection, 0, `- [x] ${cleanText}`);
        } else {
          if (data.trim().length > 0) {
            lines.push("");
          }
          lines.push(`## ${targetDate}`);
          lines.push(`- [x] ${cleanText}`);
        }
        return lines.join("\n");
      });
      return true;
    } catch (err) {
      console.error("OS Dashboard: Failed to append to log file", err);
      return false;
    }
  }
  /**
   * Updates a specific task's text at lineNumber in sourceFile.
   * If autoLogOptions is provided and the task was completed, also updates the corresponding log entry.
   */
  async updateTask(sourceFilePath, lineNumber, newText, autoLogOptions) {
    const file = this.getFile(sourceFilePath);
    if (!file) return false;
    const cleanNewText = newText.trim().replace(/^[-*]\s*(\[[ xX]\]\s*)?/, "");
    if (!cleanNewText) return false;
    let oldText = null;
    let isCompleted = false;
    try {
      await this.app.vault.process(file, (data) => {
        const lines = data.split("\n");
        if (lineNumber >= 0 && lineNumber < lines.length) {
          const currentLine = lines[lineNumber];
          const match = currentLine.match(/^(\s*[-*]\s*\[([ xX])\])\s+(.*)$/);
          if (match) {
            isCompleted = match[2].toLowerCase() === "x";
            oldText = match[3].trim();
            lines[lineNumber] = `${match[1]} ${cleanNewText}`;
          } else {
            lines[lineNumber] = `- [ ] ${cleanNewText}`;
          }
        }
        return lines.join("\n");
      });
      if (isCompleted && oldText && autoLogOptions?.autoLog && autoLogOptions?.logFilePath) {
        await this.updateLoggedItem(autoLogOptions.logFilePath, oldText, cleanNewText);
      }
      return true;
    } catch (err) {
      console.error("OS Dashboard: Failed to update task", err);
      return false;
    }
  }
  /**
   * Deletes a specific task line at lineNumber in sourceFile.
   * If autoLogOptions is provided and the task was completed, also removes it from the log file.
   */
  async deleteTask(sourceFilePath, lineNumber, autoLogOptions) {
    const file = this.getFile(sourceFilePath);
    if (!file) return false;
    let deletedText = null;
    let wasCompleted = false;
    try {
      await this.app.vault.process(file, (data) => {
        const lines = data.split("\n");
        if (lineNumber >= 0 && lineNumber < lines.length) {
          const match = lines[lineNumber].match(/^(\s*[-*]\s*\[([ xX])\])\s+(.*)$/);
          if (match) {
            wasCompleted = match[2].toLowerCase() === "x";
            deletedText = match[3].trim();
          }
          lines.splice(lineNumber, 1);
        }
        return lines.join("\n");
      });
      if (wasCompleted && deletedText && autoLogOptions?.autoLog && autoLogOptions?.logFilePath) {
        await this.removeLoggedItem(autoLogOptions.logFilePath, deletedText);
      }
      return true;
    } catch (err) {
      console.error("OS Dashboard: Failed to delete task", err);
      return false;
    }
  }
  /**
   * Updates an item's text in Daily Log under today's date
   */
  async updateLoggedItem(logFilePath, oldText, newText, dateHeading) {
    const cleanOld = oldText.trim().replace(/^[-*]\s*(\[[ xX]\]\s*)?/, "");
    const cleanNew = newText.trim().replace(/^[-*]\s*(\[[ xX]\]\s*)?/, "");
    if (!cleanOld || !cleanNew) return false;
    const file = this.getFile(logFilePath);
    if (!file) return false;
    const targetDate = dateHeading || moment().format("YYYY-MM-DD");
    try {
      await this.app.vault.process(file, (data) => {
        const lines = data.split("\n");
        const headingRegex = new RegExp(`^#{1,6}\\s+.*${targetDate}`, "i");
        const headingIndex = lines.findIndex((l) => headingRegex.test(l));
        if (headingIndex !== -1) {
          for (let i = headingIndex + 1; i < lines.length; i++) {
            if (/^#{1,6}\s+/.test(lines[i])) break;
            const lineContent = lines[i].replace(/^[-*]\s*(\[[ xX]\]\s*)?/, "").trim();
            if (lineContent.toLowerCase() === cleanOld.toLowerCase()) {
              lines[i] = `- [x] ${cleanNew}`;
              break;
            }
          }
        }
        return lines.join("\n");
      });
      return true;
    } catch (err) {
      console.error("OS Dashboard: Failed to update logged item", err);
      return false;
    }
  }
  /**
   * Finds and updates a matching task under today's date in Daily Tasks
   */
  async updatePlannedTaskMatching(planFilePath, oldText, newText, dateHeading) {
    const cleanOld = oldText.trim().replace(/^[-*]\s*(\[[ xX]\]\s*)?/, "");
    const cleanNew = newText.trim().replace(/^[-*]\s*(\[[ xX]\]\s*)?/, "");
    if (!cleanOld || !cleanNew) return false;
    const file = this.getFile(planFilePath);
    if (!file) return false;
    const targetDate = dateHeading || moment().format("YYYY-MM-DD");
    try {
      await this.app.vault.process(file, (data) => {
        const lines = data.split("\n");
        const headingRegex = new RegExp(`^#{1,6}\\s+.*${targetDate}`, "i");
        const headingIndex = lines.findIndex((l) => headingRegex.test(l));
        if (headingIndex !== -1) {
          for (let i = headingIndex + 1; i < lines.length; i++) {
            if (/^#{1,6}\s+/.test(lines[i])) break;
            const match = lines[i].match(/^(\s*[-*]\s*\[[ xX]\])\s+(.*)$/);
            if (match && match[2].trim().toLowerCase() === cleanOld.toLowerCase()) {
              lines[i] = `${match[1]} ${cleanNew}`;
              break;
            }
          }
        }
        return lines.join("\n");
      });
      return true;
    } catch (err) {
      console.error("OS Dashboard: Failed to sync update to planned tasks", err);
      return false;
    }
  }
  /**
   * Finds a matching completed task under today's date in Daily Tasks and unchecks it (sets it back to [ ])
   */
  async uncheckPlannedTaskMatching(planFilePath, text, dateHeading) {
    const cleanText = text.trim().replace(/^[-*]\s*(\[[ xX]\]\s*)?/, "");
    if (!cleanText) return false;
    const file = this.getFile(planFilePath);
    if (!file) return false;
    const targetDate = dateHeading || moment().format("YYYY-MM-DD");
    try {
      await this.app.vault.process(file, (data) => {
        const lines = data.split("\n");
        const headingRegex = new RegExp(`^#{1,6}\\s+.*${targetDate}`, "i");
        const headingIndex = lines.findIndex((l) => headingRegex.test(l));
        if (headingIndex !== -1) {
          for (let i = headingIndex + 1; i < lines.length; i++) {
            if (/^#{1,6}\s+/.test(lines[i])) break;
            const match = lines[i].match(/^(\s*[-*]\s*\[[xX]\])\s+(.*)$/);
            if (match && match[2].trim().toLowerCase() === cleanText.toLowerCase()) {
              lines[i] = lines[i].replace(/\[[xX]\]/, "[ ]");
              break;
            }
          }
        }
        return lines.join("\n");
      });
      return true;
    } catch (err) {
      console.error("OS Dashboard: Failed to sync uncheck to planned tasks", err);
      return false;
    }
  }
  getFile(path) {
    const file = this.app.vault.getAbstractFileByPath(path);
    if (file instanceof import_obsidian17.TFile && file.extension === "md") {
      return file;
    }
    const allFiles = this.app.vault.getMarkdownFiles();
    const cleanPath = path.toLowerCase().replace(/\.md$/, "");
    return allFiles.find((f) => f.basename.toLowerCase() === cleanPath || f.path.toLowerCase() === path.toLowerCase()) || null;
  }
};

// src/services/recentNotesService.ts
var RecentNotesService = class {
  constructor(app, iconService) {
    this.app = app;
    this.iconService = iconService;
  }
  getRecentNotes(settings) {
    const allFiles = this.app.vault.getMarkdownFiles();
    const excludeFolders = (settings.recentNotesExcludeFolders || []).map((f) => f.toLowerCase().trim()).filter(Boolean);
    const filtered = allFiles.filter((file) => {
      const lowerPath = file.path.toLowerCase();
      if (lowerPath.startsWith(".")) return false;
      for (const ex of excludeFolders) {
        if (lowerPath.includes(ex)) return false;
      }
      return true;
    });
    filtered.sort((a, b) => b.stat.mtime - a.stat.mtime);
    const limit = settings.recentNotesLimit || 8;
    const topFiles = filtered.slice(0, limit);
    return topFiles.map((file) => {
      return {
        file,
        title: file.basename,
        formattedTime: this.formatRelativeTime(file.stat.mtime),
        resolvedIcon: this.iconService.resolveFileFolderIcon(file)
      };
    });
  }
  formatRelativeTime(mtime) {
    const fileMoment = moment(mtime);
    const now = moment();
    if (fileMoment.isSame(now, "day")) {
      return `Today ${fileMoment.format("HH:mm")}`;
    }
    if (fileMoment.isSame(now.clone().subtract(1, "day"), "day")) {
      return "Yesterday";
    }
    if (fileMoment.isSame(now.clone().subtract(2, "days"), "day")) {
      return "2 days ago";
    }
    if (fileMoment.isSame(now, "year")) {
      return fileMoment.format("MMM D");
    }
    return fileMoment.format("MMM D, YYYY");
  }
};

// src/services/quickCaptureService.ts
var import_obsidian18 = require("obsidian");
var QuickCaptureService = class {
  constructor(app) {
    this.app = app;
  }
  /**
   * Captures raw text into a newly created note in the configured Quick Capture folder
   */
  async capture(text, settings) {
    const trimmed = text.trim();
    if (!trimmed) return false;
    const folderPath = settings.quickCaptureFolder || "00 Inbox";
    await this.ensureFolderExists(folderPath);
    const pattern = settings.newFilePattern || "YYYY-MM-DD HH-mm";
    let fileName = moment().format(pattern) || "Quick Note";
    fileName = fileName.replace(/[\\/:*?"<>|]/g, "-").trim() || "Quick Note";
    let targetPath = `${folderPath}/${fileName}.md`;
    let counter = 1;
    while (this.app.vault.getAbstractFileByPath(targetPath)) {
      targetPath = `${folderPath}/${fileName} (${counter}).md`;
      counter++;
    }
    try {
      const createdFile = await this.app.vault.create(targetPath, trimmed);
      new import_obsidian18.Notice(`Quick Captured: ${createdFile.basename}`);
      const leaf = this.app.workspace.getLeaf(false);
      if (leaf) {
        await leaf.openFile(createdFile);
      }
      return true;
    } catch (err) {
      console.error("OS Dashboard: Failed to save quick capture note", err);
      new import_obsidian18.Notice("Failed to create quick capture note");
      return false;
    }
  }
  async ensureFolderExists(folderPath) {
    const existing = this.app.vault.getAbstractFileByPath(folderPath);
    if (!existing) {
      try {
        await this.app.vault.createFolder(folderPath);
      } catch {
      }
    }
  }
};

// src/services/projectService.ts
var _ProjectService = class _ProjectService {
  constructor(app, iconService) {
    this.app = app;
    this.iconService = iconService;
  }
  /**
   * Scans project files and extracts progress percentage
   */
  async getOngoingProjects(settings) {
    const projectsFolder = (settings.projectsFolder || "").toLowerCase().trim();
    const statusProp = settings.projectStatusProp || "status";
    const statusValues = (settings.projectStatusValues || ["in-progress", "active", "ongoing"]).map((v) => v.toLowerCase().trim());
    const progressProp = settings.projectProgressProp || "progress";
    const allFiles = this.app.vault.getMarkdownFiles();
    const candidateFiles = [];
    for (const file of allFiles) {
      if (file.path.startsWith(".")) continue;
      if (projectsFolder && !file.path.toLowerCase().startsWith(projectsFolder)) {
        continue;
      }
      const cache = this.app.metadataCache.getFileCache(file);
      const frontmatter = cache?.frontmatter;
      if (!frontmatter) continue;
      const rawStatus = frontmatter[statusProp];
      if (rawStatus !== void 0 && rawStatus !== null) {
        const strStatus = String(rawStatus).toLowerCase().trim();
        if (statusValues.includes(strStatus)) {
          candidateFiles.push(file);
        }
      }
    }
    const results = [];
    for (let i = 0; i < candidateFiles.length; i++) {
      const file = candidateFiles[i];
      const cache = this.app.metadataCache.getFileCache(file);
      const frontmatter = cache?.frontmatter;
      let progress = 0;
      let hasManualProgress = false;
      if (frontmatter && frontmatter[progressProp] !== void 0) {
        const rawProgress = frontmatter[progressProp];
        if (typeof rawProgress === "number") {
          progress = rawProgress <= 1 && rawProgress > 0 ? Math.round(rawProgress * 100) : Math.round(rawProgress);
          hasManualProgress = true;
        } else if (typeof rawProgress === "string") {
          const parsed = parseFloat(rawProgress.replace("%", "").trim());
          if (!isNaN(parsed)) {
            progress = Math.round(parsed);
            hasManualProgress = true;
          }
        }
      }
      if (!hasManualProgress) {
        try {
          const content = await this.app.vault.read(file);
          const totalTasks = (content.match(/[-*]\s*\[([ xX])\]/g) || []).length;
          const completedTasks = (content.match(/[-*]\s*\[[xX]\]/g) || []).length;
          if (totalTasks > 0) {
            progress = Math.round(completedTasks / totalTasks * 100);
          }
        } catch {
        }
      }
      progress = Math.max(0, Math.min(100, progress));
      const folderIcon = this.iconService.resolveFileFolderIcon(file);
      results.push({
        title: file.basename,
        file,
        progress,
        resolvedIcon: folderIcon,
        colorHex: folderIcon.color || _ProjectService.PROJECT_COLORS[i % _ProjectService.PROJECT_COLORS.length]
      });
    }
    return results;
  }
};
_ProjectService.PROJECT_COLORS = [
  "#f43f5e",
  // Rose/Pink
  "#3b82f6",
  // Blue
  "#ec4899",
  // Magenta
  "#eab308",
  // Gold
  "#a855f7",
  // Purple
  "#64748b",
  // Slate
  "#14b8a6",
  // Teal
  "#06b6d4"
  // Cyan
];
var ProjectService = _ProjectService;

// src/services/quoteService.ts
var QuoteService = class {
  constructor(app) {
    this.app = app;
  }
  getTopQuote(settings) {
    return settings.quoteTop || "A better me\na brighter tomorrow.";
  }
  getMainQuote(settings) {
    return settings.quoteMain || "\u201CDiscipline today creates the freedom tomorrow.\u201D";
  }
};

// src/main.ts
var OSDashboardPlugin = class extends import_obsidian19.Plugin {
  constructor() {
    super(...arguments);
    this.settings = DEFAULT_SETTINGS;
  }
  async onload() {
    await this.loadSettings();
    this.iconService = new IconService(this.app);
    this.navigationService = new NavigationService(this.app, this.iconService);
    this.taskService = new TaskService(this.app);
    this.recentNotesService = new RecentNotesService(this.app, this.iconService);
    this.quickCaptureService = new QuickCaptureService(this.app);
    this.projectService = new ProjectService(this.app, this.iconService);
    this.quoteService = new QuoteService(this.app);
    this.streakService = new StreakService(this.app);
    this.calendarService = new CalendarService(this.app);
    if (this.settings.googleCalendarUrl) {
      this.calendarService.fetchEvents(this.settings.googleCalendarUrl).then((events) => {
        this.settings.cachedCalendarEvents = events;
        this.settings.lastCalendarSyncTime = Date.now();
        if (this.settings.enableCalendarNotifications) {
          this.calendarService.checkUpcomingEventNotifications(events, this.settings.calendarNotificationLeadMinutes || 10);
        }
      }).catch((err) => {
        console.warn("[OS Dashboard] Could not auto-sync Google Calendar on startup:", err);
      });
    }
    this.registerInterval(
      window.setInterval(async () => {
        if (this.settings.googleCalendarUrl && this.settings.googleCalendarAutoSync) {
          try {
            const events = await this.calendarService.fetchEvents(this.settings.googleCalendarUrl);
            this.settings.cachedCalendarEvents = events;
            this.settings.lastCalendarSyncTime = Date.now();
          } catch (e) {
          }
        }
        if (this.settings.enableCalendarNotifications) {
          const mdEvents = await this.calendarService.getLocalMarkdownEvents(this.settings.calendarEventsFile || "Events.md");
          const allEvents = [
            ...this.settings.cachedCalendarEvents || [],
            ...this.settings.localCalendarEvents || [],
            ...mdEvents
          ];
          this.calendarService.checkUpcomingEventNotifications(allEvents, this.settings.calendarNotificationLeadMinutes || 10);
        }
      }, 60 * 1e3)
    );
    this.registerView(
      VIEW_TYPE_OS_DASHBOARD,
      (leaf) => new OSDashboardView(leaf, this)
    );
    this.addRibbonIcon("layout-dashboard", "Open OS Dashboard", () => {
      this.activateView();
    });
    this.addCommand({
      id: "open-os-dashboard",
      name: "Open OS Dashboard",
      callback: () => {
        this.activateView();
      }
    });
    this.registerMarkdownCodeBlockProcessor("os-dashboard", async (source, el, ctx) => {
      el.addClass("os-dashboard-codeblock-wrapper");
      const renderer = new DashboardRenderer(
        this.app,
        this.settings,
        this.navigationService,
        this.taskService,
        this.recentNotesService,
        this.quickCaptureService,
        this.projectService,
        this.quoteService,
        this.iconService,
        this.streakService,
        this.calendarService,
        () => this.saveSettings()
      );
      await renderer.render(el);
    });
    this.addSettingTab(new OSDashboardSettingTab(this.app, this));
    this.app.workspace.onLayoutReady(() => {
      if (this.settings.openOnStartup) {
        window.setTimeout(() => {
          this.activateView();
        }, 150);
      }
    });
    this.registerEvent(
      this.app.workspace.on("active-leaf-change", (leaf) => {
        if (!this.settings.openOnNewTab || !leaf) return;
        const viewState = leaf.getViewState();
        if (viewState && viewState.type === "empty") {
          leaf.setViewState({
            type: VIEW_TYPE_OS_DASHBOARD,
            active: true
          });
        }
      })
    );
  }
  onunload() {
  }
  async activateView() {
    const { workspace } = this.app;
    let leaf = null;
    const leaves = workspace.getLeavesOfType(VIEW_TYPE_OS_DASHBOARD);
    if (leaves.length > 0) {
      leaf = leaves[0];
    } else {
      const activeLeaf = workspace.getMostRecentLeaf();
      if (activeLeaf && activeLeaf.getViewState().type === "empty") {
        leaf = activeLeaf;
      } else {
        leaf = workspace.getLeaf("tab");
      }
      if (leaf) {
        await leaf.setViewState({
          type: VIEW_TYPE_OS_DASHBOARD,
          active: true
        });
      }
    }
    if (leaf) {
      workspace.revealLeaf(leaf);
      workspace.setActiveLeaf(leaf, { focus: true });
    }
  }
  async loadSettings() {
    const data = await this.loadData();
    this.settings = Object.assign({}, DEFAULT_SETTINGS, data);
    if (this.settings.streaks && this.settings.streaks.length === 5) {
      const isDummy = this.settings.streaks.every((s) => ["1", "2", "3", "4", "5"].includes(s.id) && [12, 8, 5, 10, 7].includes(s.currentStreak));
      if (isDummy) {
        this.settings.streaks = [];
        await this.saveData(this.settings);
      }
    }
  }
  async saveSettings() {
    await this.saveData(this.settings);
    const leaves = this.app.workspace.getLeavesOfType(VIEW_TYPE_OS_DASHBOARD);
    for (const leaf of leaves) {
      if (leaf.view instanceof OSDashboardView) {
        await leaf.view.refresh();
      }
    }
  }
};
