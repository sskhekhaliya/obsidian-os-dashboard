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
var import_obsidian10 = require("obsidian");

// src/types.ts
function moment(...args) {
  return window.moment(...args);
}
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
  customWidgets: []
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
var import_obsidian = require("obsidian");
var OSDashboardSettingTab = class extends import_obsidian.PluginSettingTab {
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
      { id: "tasks-projects", label: "Tasks & Projects", icon: "check-square" },
      { id: "bookmarks", label: "Bookmarks", icon: "bookmark" }
    ];
    for (const tab of tabs) {
      const btn = navBar.createEl("button", {
        cls: `os-settings-tab-btn ${this.activeTab === tab.id ? "is-active" : ""}`
      });
      const iconSpan = btn.createSpan({ cls: "os-settings-tab-icon" });
      (0, import_obsidian.setIcon)(iconSpan, tab.icon);
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
    new import_obsidian.Setting(container).setName("Open on Startup").setDesc("Automatically launch and focus the OS Dashboard whenever Obsidian opens.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.openOnStartup ?? true).onChange(async (val) => {
        this.plugin.settings.openOnStartup = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian.Setting(container).setName("Open on New Tab").setDesc("Automatically open the OS Dashboard when creating a new empty tab (homepage mode).").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.openOnNewTab ?? false).onChange(async (val) => {
        this.plugin.settings.openOnNewTab = val;
        await this.plugin.saveSettings();
      });
    });
    container.createEl("h3", { text: "Hero Identity & Appearance" });
    new import_obsidian.Setting(container).setName("Vault Title").setDesc("Main title displayed in the hero banner (e.g. SSK_OS).").addText((text) => {
      text.setPlaceholder("SSK_OS").setValue(this.plugin.settings.vaultTitle).onChange(async (val) => {
        this.plugin.settings.vaultTitle = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian.Setting(container).setName("Vault Subtitle / Motto").setDesc("Tagline below the title.").addText((text) => {
      text.setPlaceholder("Think \u2022 Learn \u2022 Build \u2022 Create \u2022 Grow").setValue(this.plugin.settings.vaultSubtitle).onChange(async (val) => {
        this.plugin.settings.vaultSubtitle = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian.Setting(container).setName("Banner Image Path or URL").setDesc("Path to an image in your vault (e.g. 'Attachments/banner.png') or an online image URL.").addText((text) => {
      text.setPlaceholder("path/to/banner.jpg or https://...").setValue(this.plugin.settings.bannerPath).onChange(async (val) => {
        this.plugin.settings.bannerPath = val.trim();
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian.Setting(container).setName("Avatar Icon").setDesc("Lucide icon identifier for the hero avatar badge (e.g. 'home', 'terminal', 'user').").addText((text) => {
      text.setPlaceholder("home").setValue(this.plugin.settings.vaultAvatarIcon).onChange(async (val) => {
        this.plugin.settings.vaultAvatarIcon = val.trim() || "home";
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian.Setting(container).setName("Top Quote").setDesc("Inspirational text displayed on the top right.").addTextArea((text) => {
      text.setPlaceholder("A better me\na brighter tomorrow.").setValue(this.plugin.settings.quoteTop).onChange(async (val) => {
        this.plugin.settings.quoteTop = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian.Setting(container).setName("Main Callout Quote").setDesc("Card quote shown below your vault title.").addText((text) => {
      text.setPlaceholder("\u201CDiscipline today creates the freedom tomorrow.\u201D").setValue(this.plugin.settings.quoteMain).onChange(async (val) => {
        this.plugin.settings.quoteMain = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian.Setting(container).setName("Clock Subtitle").setDesc("Caption underneath the digital clock.").addTextArea((text) => {
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
    new import_obsidian.Setting(container).setName("Home Note Keywords").setDesc("Comma-separated keywords to identify a Home/Index note in 1st-level folders (e.g. Home, Index, MOC).").addText((text) => {
      text.setPlaceholder("Home, Index, MOC").setValue(this.plugin.settings.homeKeywords.join(", ")).onChange(async (val) => {
        this.plugin.settings.homeKeywords = val.split(",").map((k) => k.trim()).filter(Boolean);
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian.Setting(container).setName("Match Folder Name as Home Note").setDesc("Also consider a note as the Home note if its file name is the same as the folder name (e.g. 'Projects/Projects.md').").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.matchFolderName ?? true).onChange(async (val) => {
        this.plugin.settings.matchFolderName = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian.Setting(container).setName("New Note Naming Pattern").setDesc("Moment.js date format for new files created when clicking folders without a Home note (e.g. YYYY-MM-DD HH-mm).").addText((text) => {
      text.setPlaceholder("YYYY-MM-DD HH-mm").setValue(this.plugin.settings.newFilePattern).onChange(async (val) => {
        this.plugin.settings.newFilePattern = val.trim() || "YYYY-MM-DD HH-mm";
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian.Setting(container).setName("Ignored Navigation Folders").setDesc("Comma-separated folder names to hide from the navigation ribbon. Folders starting with '_' or '.' are hidden automatically.").addText((text) => {
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
    new import_obsidian.Setting(container).setName("Hero Banner").setDesc("Top banner with vault identity, quotes, and live clock.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.showHeroBanner ?? true).onChange(async (val) => {
        this.plugin.settings.showHeroBanner = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian.Setting(container).setName("Smart Navigation Ribbon").setDesc("1st-level folder shortcuts with inherited icons and colors.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.showNavRibbon ?? true).onChange(async (val) => {
        this.plugin.settings.showNavRibbon = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian.Setting(container).setName("Daily Tasks (Plan & Log)").setDesc("Daily task checklist with switchable Plan and Log tabs, and date-schedule popup.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.showTodayTasks ?? true).onChange(async (val) => {
        this.plugin.settings.showTodayTasks = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian.Setting(container).setName("Weekly Planning").setDesc("Overview of high-level weekly priorities.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.showWeeklyTasks ?? true).onChange(async (val) => {
        this.plugin.settings.showWeeklyTasks = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian.Setting(container).setName("Recent Notes").setDesc("List of recently modified notes with parent folder badges.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.showRecentNotes ?? true).onChange(async (val) => {
        this.plugin.settings.showRecentNotes = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian.Setting(container).setName("Quick Capture").setDesc("Instant note capture input box sending to your inbox folder.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.showQuickCapture ?? true).onChange(async (val) => {
        this.plugin.settings.showQuickCapture = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian.Setting(container).setName("Ongoing Projects").setDesc("Active projects tracked by status and auto-calculated task progress.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.showOngoingProjects ?? true).onChange(async (val) => {
        this.plugin.settings.showOngoingProjects = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian.Setting(container).setName("Bookmarks & Links").setDesc("Grid of external resources and key internal notes.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.showBookmarks ?? true).onChange(async (val) => {
        this.plugin.settings.showBookmarks = val;
        await this.plugin.saveSettings();
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
      new import_obsidian.Setting(widgetCard).setName(`Widget #${idx + 1}: ${widget.title || "Untitled"}`).addToggle((t) => {
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
      new import_obsidian.Setting(widgetCard).setName("Title & Icon").setDesc("Card header title and Lucide icon name (e.g. book-open, flame, star).").addText((text) => {
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
      new import_obsidian.Setting(widgetCard).setName("Column & Type").setDesc("Target grid column and what content this widget renders.").addDropdown((dd) => {
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
      const contentSetting = new import_obsidian.Setting(widgetCard).setName("Content / Target");
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
    new import_obsidian.Setting(container).addButton((btn) => {
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
    new import_obsidian.Setting(container).setName("Daily Tasks File (Plan)").setDesc("Path to the file containing daily planned tasks organized by date headings (e.g. Daily Tasks.md).").addText((text) => {
      text.setPlaceholder("Daily Tasks.md").setValue(this.plugin.settings.dailyTasksFile).onChange(async (val) => {
        this.plugin.settings.dailyTasksFile = val.trim();
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian.Setting(container).setName("Daily Log File (What I Did)").setDesc("Path to the file containing what you actually did today (e.g. Daily Log.md).").addText((text) => {
      text.setPlaceholder("Daily Log.md").setValue(this.plugin.settings.dailyLogFile || "").onChange(async (val) => {
        this.plugin.settings.dailyLogFile = val.trim();
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian.Setting(container).setName("Auto-Log Completed Tasks").setDesc("When you check off a planned task in 'What I had to do', automatically append it to your Daily Log.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.autoLogToDailyLog ?? true).onChange(async (val) => {
        this.plugin.settings.autoLogToDailyLog = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian.Setting(container).setName("Weekly Tasks File").setDesc("Path to the file containing weekly tasks (e.g. Weekly Tasks.md).").addText((text) => {
      text.setPlaceholder("Weekly Tasks.md").setValue(this.plugin.settings.weeklyTasksFile).onChange(async (val) => {
        this.plugin.settings.weeklyTasksFile = val.trim();
        await this.plugin.saveSettings();
      });
    });
    container.createEl("h3", { text: "Quick Capture" });
    new import_obsidian.Setting(container).setName("Quick Capture Folder").setDesc("Folder where notes created via the Quick Capture box will be saved (e.g. 00 Inbox).").addText((text) => {
      text.setPlaceholder("00 Inbox").setValue(this.plugin.settings.quickCaptureFolder).onChange(async (val) => {
        this.plugin.settings.quickCaptureFolder = val.trim();
        await this.plugin.saveSettings();
      });
    });
    container.createEl("h3", { text: "Ongoing Projects" });
    new import_obsidian.Setting(container).setName("Projects Folder").setDesc("Folder to scan for project notes (leave blank to search entire vault).").addText((text) => {
      text.setPlaceholder("03 Projects").setValue(this.plugin.settings.projectsFolder).onChange(async (val) => {
        this.plugin.settings.projectsFolder = val.trim();
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian.Setting(container).setName("Status Property Name").setDesc("Frontmatter property indicating project status.").addText((text) => {
      text.setPlaceholder("status").setValue(this.plugin.settings.projectStatusProp).onChange(async (val) => {
        this.plugin.settings.projectStatusProp = val.trim() || "status";
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian.Setting(container).setName("Active Status Values").setDesc("Comma-separated status values that mark a project as ongoing (e.g. in-progress, active).").addText((text) => {
      text.setPlaceholder("in-progress, active, ongoing").setValue(this.plugin.settings.projectStatusValues.join(", ")).onChange(async (val) => {
        this.plugin.settings.projectStatusValues = val.split(",").map((v) => v.trim()).filter(Boolean);
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian.Setting(container).setName("Progress Property Name").setDesc("Frontmatter property for manual percentage. If missing, task checkboxes are calculated automatically.").addText((text) => {
      text.setPlaceholder("progress").setValue(this.plugin.settings.projectProgressProp).onChange(async (val) => {
        this.plugin.settings.projectProgressProp = val.trim() || "progress";
        await this.plugin.saveSettings();
      });
    });
    container.createEl("h3", { text: "Recent Notes" });
    new import_obsidian.Setting(container).setName("Recent Notes Limit").setDesc("Maximum number of recently modified notes to display.").addText((text) => {
      text.setPlaceholder("8").setValue(String(this.plugin.settings.recentNotesLimit)).onChange(async (val) => {
        const num = parseInt(val, 10);
        if (!isNaN(num) && num > 0) {
          this.plugin.settings.recentNotesLimit = num;
          await this.plugin.saveSettings();
        }
      });
    });
    new import_obsidian.Setting(container).setName("Excluded Folders").setDesc("Comma-separated folders to ignore in Recent Notes (e.g. Templates, .trash).").addText((text) => {
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
      const row = new import_obsidian.Setting(container).setName(`Link #${idx + 1}: ${link.title}`).addText((titleText) => {
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
    new import_obsidian.Setting(container).addButton((btn) => {
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
};

// src/view/osDashboardView.ts
var import_obsidian5 = require("obsidian");

// src/view/renderer.ts
var import_obsidian4 = require("obsidian");

// src/modals/scheduleTaskModal.ts
var import_obsidian2 = require("obsidian");
var ScheduleTaskModal = class extends import_obsidian2.Modal {
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
    new import_obsidian2.Setting(contentEl).setName("Date").setDesc("Choose the date for these tasks.").addText((text) => {
      text.inputEl.type = "date";
      text.setValue(this.selectedDate).onChange((val) => {
        this.selectedDate = val || moment().format("YYYY-MM-DD");
      });
    });
    const taskSetting = new import_obsidian2.Setting(contentEl).setName("Tasks (one per line)").setDesc("Enter as many tasks as you want. Each line will be created as a separate task.");
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
    new import_obsidian2.Setting(contentEl).addButton((btn) => {
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
      new import_obsidian2.Notice("Please enter at least one task.");
      return;
    }
    const success = await this.taskService.addTasks(this.filePath, lines, this.selectedDate);
    if (success) {
      new import_obsidian2.Notice(`Scheduled ${lines.length} task${lines.length > 1 ? "s" : ""} for ${this.selectedDate}`);
      this.close();
      await this.onTaskScheduled();
    } else {
      new import_obsidian2.Notice("Failed to schedule tasks.");
    }
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/modals/wikiLinkSuggest.ts
var import_obsidian3 = require("obsidian");
var WikiLinkSuggest = class extends import_obsidian3.AbstractInputSuggest {
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

// src/view/renderer.ts
var DashboardRenderer = class extends import_obsidian4.Component {
  constructor(app, settings, navigationService, taskService, recentNotesService, quickCaptureService, projectService, quoteService, iconService) {
    super();
    this.clockInterval = null;
    this.activeTodayTab = "tasks";
    this.app = app;
    this.settings = settings;
    this.navigationService = navigationService;
    this.taskService = taskService;
    this.recentNotesService = recentNotesService;
    this.quickCaptureService = quickCaptureService;
    this.projectService = projectService;
    this.quoteService = quoteService;
    this.iconService = iconService;
  }
  updateSettings(settings) {
    this.settings = settings;
  }
  destroy() {
    if (this.clockInterval !== null) {
      window.clearInterval(this.clockInterval);
      this.clockInterval = null;
    }
  }
  async render(container) {
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
    if (this.settings.showHeroBanner ?? true) {
      this.renderHero(scrollContainer);
    }
    const bodyEl = scrollContainer.createDiv({ cls: "os-dashboard-body" });
    if (this.settings.showNavRibbon ?? true) {
      await this.renderNavigationRibbon(bodyEl);
    }
    await this.renderMainGrid(bodyEl);
  }
  renderHero(container) {
    const heroEl = container.createDiv({ cls: "os-dashboard-hero" });
    let bannerUrl = "";
    if (this.settings.bannerPath) {
      if (this.settings.bannerPath.startsWith("http://") || this.settings.bannerPath.startsWith("https://")) {
        bannerUrl = this.settings.bannerPath;
      } else {
        const bannerFile = this.app.vault.getAbstractFileByPath(this.settings.bannerPath);
        if (bannerFile instanceof import_obsidian4.TFile) {
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
    (0, import_obsidian4.setIcon)(avatarBox, this.settings.vaultAvatarIcon || "home");
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
    const ribbonEl = container.createDiv({ cls: "os-dashboard-nav-ribbon" });
    const folderCards = this.navigationService.getFolderCards(this.settings);
    if (folderCards.length === 0) {
      ribbonEl.createDiv({ cls: "os-dashboard-empty-hint", text: "No 1st-level folders found." });
      return;
    }
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
  }
  async renderMainGrid(container) {
    const gridEl = container.createDiv({ cls: "os-dashboard-grid" });
    const col1 = gridEl.createDiv({ cls: "os-dashboard-col" });
    if (this.settings.showTodayTasks ?? true) {
      await this.renderTodayTasks(col1);
    }
    if (this.settings.showWeeklyTasks ?? true) {
      await this.renderWeeklyTasks(col1);
    }
    await this.renderCustomWidgetsForColumn(col1, 1);
    const col2 = gridEl.createDiv({ cls: "os-dashboard-col" });
    if (this.settings.showRecentNotes ?? true) {
      await this.renderRecentNotes(col2);
    }
    if (this.settings.showQuickCapture ?? true) {
      this.renderQuickCapture(col2);
    }
    await this.renderCustomWidgetsForColumn(col2, 2);
    const col3 = gridEl.createDiv({ cls: "os-dashboard-col" });
    if (this.settings.showOngoingProjects ?? true) {
      await this.renderOngoingProjects(col3);
    }
    if (this.settings.showBookmarks ?? true) {
      this.renderLinksWidget(col3);
    }
    await this.renderCustomWidgetsForColumn(col3, 3);
    if (col1.childElementCount === 0) col1.remove();
    if (col2.childElementCount === 0) col2.remove();
    if (col3.childElementCount === 0) col3.remove();
    if (gridEl.childElementCount === 0) {
      gridEl.createDiv({
        cls: "os-empty-placeholder",
        text: "All widgets are currently hidden. Enable widgets in OS Dashboard settings."
      });
    }
  }
  // --- Column 1 Widgets ---
  async renderTodayTasks(container) {
    const cardEl = container.createDiv({ cls: "os-dashboard-card os-card-tasks os-card-today-tabs" });
    const header = cardEl.createDiv({ cls: "os-card-header os-card-header-tabs" });
    const tabsWrap = header.createDiv({ cls: "os-today-tab-group" });
    const taskTabBtn = tabsWrap.createEl("button", {
      cls: `os-today-tab-btn ${this.activeTodayTab === "tasks" ? "is-active" : ""}`
    });
    const taskIcon = taskTabBtn.createSpan({ cls: "os-today-tab-icon" });
    (0, import_obsidian4.setIcon)(taskIcon, "check-square");
    taskTabBtn.createSpan({ cls: "os-today-tab-label", text: "Task" });
    taskTabBtn.createSpan({ cls: "os-today-tab-count" });
    const logTabBtn = tabsWrap.createEl("button", {
      cls: `os-today-tab-btn ${this.activeTodayTab === "log" ? "is-active" : ""}`
    });
    const logIcon = logTabBtn.createSpan({ cls: "os-today-tab-icon" });
    (0, import_obsidian4.setIcon)(logIcon, "clipboard-list");
    logTabBtn.createSpan({ cls: "os-today-tab-label", text: "Log" });
    logTabBtn.createSpan({ cls: "os-today-tab-count" });
    const overdueTabBtn = tabsWrap.createEl("button", {
      cls: `os-today-tab-btn os-tab-overdue ${this.activeTodayTab === "overdue" ? "is-active" : ""}`
    });
    const overdueIcon = overdueTabBtn.createSpan({ cls: "os-today-tab-icon" });
    (0, import_obsidian4.setIcon)(overdueIcon, "history");
    overdueTabBtn.createSpan({ cls: "os-today-tab-label", text: "Overdue" });
    overdueTabBtn.createSpan({ cls: "os-today-tab-count is-overdue" });
    const headerRight = header.createDiv({ cls: "os-card-header-right" });
    const scheduleBtn = headerRight.createDiv({ cls: "os-card-header-btn" });
    (0, import_obsidian4.setIcon)(scheduleBtn, "calendar-plus");
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
          (0, import_obsidian4.setIcon)(checkWrap, "square");
          checkWrap.addEventListener("click", async (e) => {
            e.stopPropagation();
            await this.taskService.toggleTask(task.sourceFile, task.lineNumber);
            await this.renderTodayTasksRefresh(cardEl);
          });
          const contentWrap = row.createDiv({ cls: "os-task-content-wrap" });
          const textEl = contentWrap.createSpan({ cls: "os-task-text" });
          import_obsidian4.MarkdownRenderer.renderMarkdown(task.text, textEl, task.sourceFile, this);
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
          (0, import_obsidian4.setIcon)(delBtn, "trash-2");
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
    (0, import_obsidian4.setIcon)(iconEl, "calendar");
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
      (0, import_obsidian4.setIcon)(checkWrap, "check-square");
    } else {
      (0, import_obsidian4.setIcon)(checkWrap, "square");
    }
    checkWrap.addEventListener("click", async (e) => {
      e.stopPropagation();
      await onToggle();
    });
    const contentWrap = row.createDiv({ cls: "os-task-content-wrap" });
    const textEl = contentWrap.createSpan({ cls: "os-task-text" });
    import_obsidian4.MarkdownRenderer.renderMarkdown(task.text, textEl, task.sourceFile, this);
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
      (0, import_obsidian4.setIcon)(editBtn, "pencil");
      editBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.startEditingTask(row, contentWrap, task.text, onUpdate, () => {
          contentWrap.empty();
          const restoredText = contentWrap.createSpan({ cls: "os-task-text" });
          import_obsidian4.MarkdownRenderer.renderMarkdown(task.text, restoredText, task.sourceFile, this);
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
      (0, import_obsidian4.setIcon)(deleteBtn, "trash-2");
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
    (0, import_obsidian4.setIcon)(iconEl, "file-text");
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
    (0, import_obsidian4.setIcon)(iconEl, "edit-3");
    titleLeft.createEl("h3", { text: "Quick Capture" });
    const textarea = cardEl.createEl("textarea", {
      cls: "os-capture-input",
      placeholder: "Write something..."
    });
    const footer = cardEl.createDiv({ cls: "os-capture-footer" });
    const hint = footer.createSpan({ cls: "os-capture-hint", text: "Press Ctrl+Enter or Cmd+Enter to capture" });
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
    textarea.addEventListener("keydown", async (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        await submitCapture();
      }
    });
  }
  // --- Column 3 Widgets ---
  async renderOngoingProjects(container) {
    const cardEl = container.createDiv({ cls: "os-dashboard-card os-card-projects" });
    const header = cardEl.createDiv({ cls: "os-card-header" });
    const titleLeft = header.createDiv({ cls: "os-card-header-left" });
    const iconEl = titleLeft.createSpan({ cls: "os-card-icon" });
    (0, import_obsidian4.setIcon)(iconEl, "target");
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
    (0, import_obsidian4.setIcon)(iconEl, "link-2");
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
      (0, import_obsidian4.setIcon)(iconWrap, link.icon || "external-link");
      item.createSpan({ cls: "os-link-title", text: link.title });
      item.addEventListener("click", () => {
        if (link.url.startsWith("http://") || link.url.startsWith("https://")) {
          window.open(link.url, "_blank");
        } else {
          const file = this.app.metadataCache.getFirstLinkpathDest(link.url, "");
          if (file instanceof import_obsidian4.TFile) {
            this.app.workspace.getLeaf(false).openFile(file);
          } else {
            new import_obsidian4.Notice(`Note not found: ${link.url}`);
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
    (0, import_obsidian4.setIcon)(iconEl, widget.icon || "sparkles");
    titleLeft.createEl("h3", { text: widget.title || "Custom Widget" });
    if (widget.type === "markdown-note") {
      const file = this.app.metadataCache.getFirstLinkpathDest(widget.content, "");
      if (file instanceof import_obsidian4.TFile) {
        cardEl.setAttribute("data-source-file", file.path);
        const openBtn = header.createDiv({ cls: "os-card-header-btn" });
        (0, import_obsidian4.setIcon)(openBtn, "external-link");
        openBtn.setAttribute("title", "Open note");
        openBtn.addEventListener("click", () => {
          this.app.workspace.getLeaf(false).openFile(file);
        });
        const bodyEl = cardEl.createDiv({ cls: "os-custom-note-body" });
        try {
          const content = await this.app.vault.read(file);
          await import_obsidian4.MarkdownRenderer.render(this.app, content, bodyEl, file.path, this);
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
        await import_obsidian4.MarkdownRenderer.render(this.app, widget.content, bodyEl, "", this);
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
          if (file instanceof import_obsidian4.TFile) {
            this.app.workspace.getLeaf(false).openFile(file);
          } else {
            new import_obsidian4.Notice(`Note not found: ${widget.content}`);
          }
        }
      });
    }
  }
};

// src/view/osDashboardView.ts
var VIEW_TYPE_OS_DASHBOARD = "os-dashboard-view";
var OSDashboardView = class extends import_obsidian5.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.renderer = null;
    this.plugin = plugin;
    this.debouncedRefresh = (0, import_obsidian5.debounce)(() => {
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
      this.plugin.iconService
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
var import_obsidian6 = require("obsidian");
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
          const cleanLucide = trimmedIcon.replace(/^(Li|Lucide):/i, "").toLowerCase();
          return {
            type: "lucide",
            value: cleanLucide || "folder",
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
      const firstLevelFolders = root.children.filter((c) => c instanceof import_obsidian6.TFolder);
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
      (0, import_obsidian6.setIcon)(el, iconInfo.value || "folder");
    } catch {
      (0, import_obsidian6.setIcon)(el, "folder");
    }
    const svg = el.querySelector("svg");
    if (svg) {
      svg.style.width = "16px";
      svg.style.height = "16px";
      svg.style.color = iconInfo.color;
      svg.style.stroke = iconInfo.color;
      svg.style.fill = "none";
    }
  }
  isEmoji(str) {
    return /\p{Extended_Pictographic}/u.test(str) || /\p{Emoji}/u.test(str);
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
var import_obsidian7 = require("obsidian");
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
      if (child instanceof import_obsidian7.TFolder) {
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
      const mdFiles = folder.children.filter((child) => child instanceof import_obsidian7.TFile && child.extension === "md");
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
      new import_obsidian7.Notice(`Created note in ${card.name}: ${createdFile.basename}`);
      const leaf = this.app.workspace.getLeaf(false);
      await leaf.openFile(createdFile);
    } catch (err) {
      console.error("OS Dashboard: Failed to create new note", err);
      new import_obsidian7.Notice(`Failed to create note in ${card.name}`);
    }
  }
};

// src/services/taskService.ts
var import_obsidian8 = require("obsidian");
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
          let insertIndex = lines.length;
          for (let i = headingIndex + 1; i < lines.length; i++) {
            if (/^#{1,6}\s+/.test(lines[i])) {
              insertIndex = i;
              break;
            }
          }
          lines.splice(insertIndex, 0, ...formattedTasks);
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
    if (file instanceof import_obsidian8.TFile && file.extension === "md") {
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
var import_obsidian9 = require("obsidian");
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
    let fileName = "";
    let bodyContent = trimmed;
    const headingMatch = trimmed.match(/^#\s+(.*?)(\n|$)([\s\S]*)$/);
    if (headingMatch) {
      fileName = headingMatch[1].trim();
      bodyContent = headingMatch[3]?.trim() || `# ${fileName}`;
    } else {
      const pattern = settings.newFilePattern || "YYYY-MM-DD HH-mm";
      fileName = moment().format(pattern) || "Untitled";
    }
    fileName = fileName.replace(/[\\/:*?"<>|]/g, "-").trim() || "Quick Note";
    let targetPath = `${folderPath}/${fileName}.md`;
    let counter = 1;
    while (this.app.vault.getAbstractFileByPath(targetPath)) {
      targetPath = `${folderPath}/${fileName} (${counter}).md`;
      counter++;
    }
    try {
      const createdFile = await this.app.vault.create(targetPath, bodyContent);
      new import_obsidian9.Notice(`Quick Captured to ${createdFile.basename}`);
      return true;
    } catch (err) {
      console.error("OS Dashboard: Failed to save quick capture note", err);
      new import_obsidian9.Notice("Failed to create quick capture note");
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
var OSDashboardPlugin = class extends import_obsidian10.Plugin {
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
        this.iconService
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
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
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
