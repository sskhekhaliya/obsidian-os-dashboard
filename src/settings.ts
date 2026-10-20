import { App, PluginSettingTab, Setting, setIcon, Notice } from "obsidian";
import type OSDashboardPlugin from "./main";
import { CustomWidget, StreakItem } from "./types";
import { StreakModal } from "./modals/streakModal";
import { FreezeStreakModal } from "./modals/freezeStreakModal";
import { ArchiveOrDeleteStreakModal } from "./modals/archiveOrDeleteStreakModal";
import { FileSuggest } from "./modals/fileSuggest";

type SettingsTabId = "general" | "navigation" | "widgets" | "streaks" | "tasks-projects" | "bookmarks";

export class OSDashboardSettingTab extends PluginSettingTab {
  private plugin: OSDashboardPlugin;
  private activeTab: SettingsTabId = "general";

  constructor(app: App, plugin: OSDashboardPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  public display(): void {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl("h2", { text: "OS Dashboard Settings" });

    // Sub-tab Navigation Bar
    const navBar = containerEl.createDiv({ cls: "os-settings-nav-bar" });

    const tabs: { id: SettingsTabId; label: string; icon: string }[] = [
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
      setIcon(iconSpan, tab.icon);
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
  private renderGeneralTab(container: HTMLElement): void {
    container.createEl("h3", { text: "Startup & New Tab Behavior" });

    new Setting(container)
      .setName("Open on Startup")
      .setDesc("Automatically launch and focus the OS Dashboard whenever Obsidian opens.")
      .addToggle(toggle => {
        toggle.setValue(this.plugin.settings.openOnStartup ?? true)
          .onChange(async (val) => {
            this.plugin.settings.openOnStartup = val;
            await this.plugin.saveSettings();
          });
      });

    new Setting(container)
      .setName("Open on New Tab")
      .setDesc("Automatically open the OS Dashboard when creating a new empty tab (homepage mode).")
      .addToggle(toggle => {
        toggle.setValue(this.plugin.settings.openOnNewTab ?? false)
          .onChange(async (val) => {
            this.plugin.settings.openOnNewTab = val;
            await this.plugin.saveSettings();
          });
      });

    container.createEl("h3", { text: "Hero Identity & Appearance" });

    new Setting(container)
      .setName("Vault Title")
      .setDesc("Main title displayed in the hero banner (e.g. SSK_OS).")
      .addText(text => {
        text.setPlaceholder("SSK_OS")
          .setValue(this.plugin.settings.vaultTitle)
          .onChange(async (val) => {
            this.plugin.settings.vaultTitle = val;
            await this.plugin.saveSettings();
          });
      });

    new Setting(container)
      .setName("Vault Subtitle / Motto")
      .setDesc("Tagline below the title.")
      .addText(text => {
        text.setPlaceholder("Think • Learn • Build • Create • Grow")
          .setValue(this.plugin.settings.vaultSubtitle)
          .onChange(async (val) => {
            this.plugin.settings.vaultSubtitle = val;
            await this.plugin.saveSettings();
          });
      });

    new Setting(container)
      .setName("Banner Image Path or URL")
      .setDesc("Path to an image in your vault (e.g. 'Attachments/banner.png') or an online image URL.")
      .addText(text => {
        text.setPlaceholder("path/to/banner.jpg or https://...")
          .setValue(this.plugin.settings.bannerPath)
          .onChange(async (val) => {
            this.plugin.settings.bannerPath = val.trim();
            await this.plugin.saveSettings();
          });
      });

    new Setting(container)
      .setName("Avatar Icon")
      .setDesc("Lucide icon identifier for the hero avatar badge (e.g. 'home', 'terminal', 'user').")
      .addText(text => {
        text.setPlaceholder("home")
          .setValue(this.plugin.settings.vaultAvatarIcon)
          .onChange(async (val) => {
            this.plugin.settings.vaultAvatarIcon = val.trim() || "home";
            await this.plugin.saveSettings();
          });
      });

    new Setting(container)
      .setName("Top Quote")
      .setDesc("Inspirational text displayed on the top right.")
      .addTextArea(text => {
        text.setPlaceholder("A better me\na brighter tomorrow.")
          .setValue(this.plugin.settings.quoteTop)
          .onChange(async (val) => {
            this.plugin.settings.quoteTop = val;
            await this.plugin.saveSettings();
          });
      });

    new Setting(container)
      .setName("Main Callout Quote")
      .setDesc("Card quote shown below your vault title.")
      .addText(text => {
        text.setPlaceholder("“Discipline today creates the freedom tomorrow.”")
          .setValue(this.plugin.settings.quoteMain)
          .onChange(async (val) => {
            this.plugin.settings.quoteMain = val;
            await this.plugin.saveSettings();
          });
      });

    new Setting(container)
      .setName("Clock Subtitle")
      .setDesc("Caption underneath the digital clock.")
      .addTextArea(text => {
        text.setPlaceholder("Small steps every day\nlead to big results.")
          .setValue(this.plugin.settings.clockSubtitle)
          .onChange(async (val) => {
            this.plugin.settings.clockSubtitle = val;
            await this.plugin.saveSettings();
          });
      });
  }

  // =========================================================================
  // 2. NAVIGATION TAB
  // =========================================================================
  private renderNavigationTab(container: HTMLElement): void {
    container.createEl("h3", { text: "Smart Folder Ribbon" });

    new Setting(container)
      .setName("Home Note Keywords")
      .setDesc("Comma-separated keywords to identify a Home/Index note in 1st-level folders (e.g. Home, Index, MOC).")
      .addText(text => {
        text.setPlaceholder("Home, Index, MOC")
          .setValue(this.plugin.settings.homeKeywords.join(", "))
          .onChange(async (val) => {
            this.plugin.settings.homeKeywords = val.split(",").map(k => k.trim()).filter(Boolean);
            await this.plugin.saveSettings();
          });
      });

    new Setting(container)
      .setName("Match Folder Name as Home Note")
      .setDesc("Also consider a note as the Home note if its file name is the same as the folder name (e.g. 'Projects/Projects.md').")
      .addToggle(toggle => {
        toggle.setValue(this.plugin.settings.matchFolderName ?? true)
          .onChange(async (val) => {
            this.plugin.settings.matchFolderName = val;
            await this.plugin.saveSettings();
          });
      });

    new Setting(container)
      .setName("New Note Naming Pattern")
      .setDesc("Moment.js date format for new files created when clicking folders without a Home note (e.g. YYYY-MM-DD HH-mm).")
      .addText(text => {
        text.setPlaceholder("YYYY-MM-DD HH-mm")
          .setValue(this.plugin.settings.newFilePattern)
          .onChange(async (val) => {
            this.plugin.settings.newFilePattern = val.trim() || "YYYY-MM-DD HH-mm";
            await this.plugin.saveSettings();
          });
      });

    new Setting(container)
      .setName("Ignored Navigation Folders")
      .setDesc("Comma-separated folder names to hide from the navigation ribbon. Folders starting with '_' or '.' are hidden automatically.")
      .addText(text => {
        text.setPlaceholder("_attachments, _scripts, _templates, Templates")
          .setValue((this.plugin.settings.ignoredFolders || []).join(", "))
          .onChange(async (val) => {
            this.plugin.settings.ignoredFolders = val.split(",").map(f => f.trim()).filter(Boolean);
            await this.plugin.saveSettings();
          });
      });
  }

  // =========================================================================
  // 3. WIDGETS MANAGER TAB
  // =========================================================================
  private renderWidgetsTab(container: HTMLElement): void {
    container.createEl("h3", { text: "Built-in Widgets Visibility" });

    const descEl = container.createEl("p", {
      text: "Toggle which sections appear on your dashboard. Hidden widgets leave no empty gaps; active columns adjust automatically.",
      cls: "setting-item-description"
    });
    descEl.style.marginBottom = "14px";

    new Setting(container)
      .setName("Hero Banner")
      .setDesc("Top banner with vault identity, quotes, and live clock.")
      .addToggle(toggle => {
        toggle.setValue(this.plugin.settings.showHeroBanner ?? true)
          .onChange(async (val) => {
            this.plugin.settings.showHeroBanner = val;
            await this.plugin.saveSettings();
          });
      });

    new Setting(container)
      .setName("Smart Navigation Ribbon")
      .setDesc("1st-level folder shortcuts with inherited icons and colors.")
      .addToggle(toggle => {
        toggle.setValue(this.plugin.settings.showNavRibbon ?? true)
          .onChange(async (val) => {
            this.plugin.settings.showNavRibbon = val;
            await this.plugin.saveSettings();
          });
      });

    new Setting(container)
      .setName("Daily Tasks (Plan & Log)")
      .setDesc("Daily task checklist with switchable Plan and Log tabs, and date-schedule popup.")
      .addToggle(toggle => {
        toggle.setValue(this.plugin.settings.showTodayTasks ?? true)
          .onChange(async (val) => {
            this.plugin.settings.showTodayTasks = val;
            await this.plugin.saveSettings();
          });
      });

    new Setting(container)
      .setName("Weekly Planning")
      .setDesc("Overview of high-level weekly priorities.")
      .addToggle(toggle => {
        toggle.setValue(this.plugin.settings.showWeeklyTasks ?? true)
          .onChange(async (val) => {
            this.plugin.settings.showWeeklyTasks = val;
            await this.plugin.saveSettings();
          });
      });

    new Setting(container)
      .setName("Recent Notes")
      .setDesc("List of recently modified notes with parent folder badges.")
      .addToggle(toggle => {
        toggle.setValue(this.plugin.settings.showRecentNotes ?? true)
          .onChange(async (val) => {
            this.plugin.settings.showRecentNotes = val;
            await this.plugin.saveSettings();
          });
      });

    new Setting(container)
      .setName("Quick Capture")
      .setDesc("Instant note capture input box sending to your inbox folder.")
      .addToggle(toggle => {
        toggle.setValue(this.plugin.settings.showQuickCapture ?? true)
          .onChange(async (val) => {
            this.plugin.settings.showQuickCapture = val;
            await this.plugin.saveSettings();
          });
      });

    new Setting(container)
      .setName("Ongoing Projects")
      .setDesc("Active projects tracked by status and auto-calculated task progress.")
      .addToggle(toggle => {
        toggle.setValue(this.plugin.settings.showOngoingProjects ?? true)
          .onChange(async (val) => {
            this.plugin.settings.showOngoingProjects = val;
            await this.plugin.saveSettings();
          });
      });

    new Setting(container)
      .setName("Bookmarks & Links")
      .setDesc("Grid of external resources and key internal notes.")
      .addToggle(toggle => {
        toggle.setValue(this.plugin.settings.showBookmarks ?? true)
          .onChange(async (val) => {
            this.plugin.settings.showBookmarks = val;
            await this.plugin.saveSettings();
          });
      });

    container.createEl("h3", { text: "Right Side Companion Rail Widgets" });

    new Setting(container)
      .setName("Enable Right Side Rail")
      .setDesc("Companion rail on the right side containing Calendar, Graph view, Streaks, and Quote.")
      .addToggle(toggle => {
        toggle.setValue(this.plugin.settings.showRightRail ?? true)
          .onChange(async (val) => {
            this.plugin.settings.showRightRail = val;
            await this.plugin.saveSettings();
          });
      });

    new Setting(container)
      .setName("Calendar Widget")
      .setDesc("Interactive mini calendar with current date indicator and daily note integration.")
      .addToggle(toggle => {
        toggle.setValue(this.plugin.settings.showCalendar ?? true)
          .onChange(async (val) => {
            this.plugin.settings.showCalendar = val;
            await this.plugin.saveSettings();
          });
      });

    new Setting(container)
      .setName("Graph View Widget")
      .setDesc("Interactive node graph view with direct folder navigation.")
      .addToggle(toggle => {
        toggle.setValue(this.plugin.settings.showGraphView ?? true)
          .onChange(async (val) => {
            this.plugin.settings.showGraphView = val;
            await this.plugin.saveSettings();
          });
      });

    new Setting(container)
      .setName("Streaks Tracker Widget")
      .setDesc("Habit streaks tracker synced with Daily Tasks and freeze support.")
      .addToggle(toggle => {
        toggle.setValue(this.plugin.settings.showStreaks ?? true)
          .onChange(async (val) => {
            this.plugin.settings.showStreaks = val;
            await this.plugin.saveSettings();
          });
      });

    new Setting(container)
      .setName("Quote Widget")
      .setDesc("Inspirational quote card at the bottom of the right rail.")
      .addToggle(toggle => {
        toggle.setValue(this.plugin.settings.showRightQuote ?? true)
          .onChange(async (val) => {
            this.plugin.settings.showRightQuote = val;
            await this.plugin.saveSettings();
          });
      });

    // Drag-and-drop & Layout Section
    container.createEl("h3", { text: "Widget Drag & Drop Layout" });
    new Setting(container)
      .setName("Reset Widget Order & Positions")
      .setDesc("Restore all widgets back to their default columns and positions.")
      .addButton(btn => {
        btn.setButtonText("Reset Layout")
          .setWarning()
          .onClick(async () => {
            this.plugin.settings.widgetLayout = {
              col1: ["todayTasks", "weeklyTasks"],
              col2: ["recentNotes", "quickCapture"],
              col3: ["ongoingProjects", "bookmarks"],
              rail: ["calendar", "streaks", "graphView", "rightQuote"]
            };
            await this.plugin.saveSettings();
            new Notice("Widget layout reset to default!");
          });
      });

    // Custom Widgets Section
    container.createEl("h3", { text: "Custom Dashboard Widgets" });
    const customDesc = container.createEl("p", {
      text: "Add custom cards to your dashboard to embed vault notes, custom checklists, or quick links.",
      cls: "setting-item-description"
    });
    customDesc.style.marginBottom = "14px";

    const customContainer = container.createDiv({ cls: "os-settings-custom-widgets" });
    this.renderCustomWidgetsList(customContainer);
  }

  private renderCustomWidgetsList(container: HTMLElement): void {
    container.empty();

    const widgets = this.plugin.settings.customWidgets || [];
    widgets.forEach((widget, idx) => {
      const widgetCard = container.createDiv({ cls: "os-settings-widget-card" });

      // Header row with toggle, title and delete
      new Setting(widgetCard)
        .setName(`Widget #${idx + 1}: ${widget.title || "Untitled"}`)
        .addToggle(t => {
          t.setTooltip("Enable/Disable")
            .setValue(widget.enabled)
            .onChange(async (val) => {
              widget.enabled = val;
              await this.plugin.saveSettings();
            });
        })
        .addButton(btn => {
          btn.setIcon("trash")
            .setTooltip("Delete Widget")
            .onClick(async () => {
              this.plugin.settings.customWidgets.splice(idx, 1);
              await this.plugin.saveSettings();
              this.renderCustomWidgetsList(container);
            });
        });

      // Configuration fields
      new Setting(widgetCard)
        .setName("Title & Icon")
        .setDesc("Card header title and Lucide icon name (e.g. book-open, flame, star).")
        .addText(text => {
          text.setPlaceholder("Title")
            .setValue(widget.title)
            .onChange(async (val) => {
              widget.title = val;
              await this.plugin.saveSettings();
            });
        })
        .addText(text => {
          text.setPlaceholder("Icon (e.g. flame)")
            .setValue(widget.icon)
            .onChange(async (val) => {
              widget.icon = val.trim();
              await this.plugin.saveSettings();
            });
        });

      new Setting(widgetCard)
        .setName("Column & Type")
        .setDesc("Target grid column and what content this widget renders.")
        .addDropdown(dd => {
          dd.addOption("1", "Column 1 (Left)")
            .addOption("2", "Column 2 (Center)")
            .addOption("3", "Column 3 (Right)")
            .setValue(String(widget.column || 1))
            .onChange(async (val) => {
              widget.column = parseInt(val, 10) as 1 | 2 | 3;
              await this.plugin.saveSettings();
            });
        })
        .addDropdown(dd => {
          dd.addOption("markdown-note", "Vault Note Embed")
            .addOption("custom-text", "Custom Markdown Text")
            .addOption("link-button", "Quick Link / Button")
            .setValue(widget.type || "markdown-note")
            .onChange(async (val: any) => {
              widget.type = val;
              await this.plugin.saveSettings();
              this.renderCustomWidgetsList(container);
            });
        });

      const contentSetting = new Setting(widgetCard).setName("Content / Target");
      if (widget.type === "markdown-note") {
        contentSetting.setDesc("Path to a markdown file in your vault (e.g. Habits.md or Work/Goals.md).");
        contentSetting.addText(t => {
          t.setPlaceholder("path/to/note.md")
            .setValue(widget.content)
            .onChange(async (val) => {
              widget.content = val.trim();
              await this.plugin.saveSettings();
            });
        });
      } else if (widget.type === "custom-text") {
        contentSetting.setDesc("Custom markdown or text displayed inside the card.");
        contentSetting.addTextArea(t => {
          t.setPlaceholder("Type markdown or reminders...")
            .setValue(widget.content)
            .onChange(async (val) => {
              widget.content = val;
              await this.plugin.saveSettings();
            });
        });
      } else {
        contentSetting.setDesc("URL (https://...) or Note name to open when clicked.");
        contentSetting.addText(t => {
          t.setPlaceholder("https://... or Note Title")
            .setValue(widget.content)
            .onChange(async (val) => {
              widget.content = val.trim();
              await this.plugin.saveSettings();
            });
        });
      }
    });

    new Setting(container)
      .addButton(btn => {
        btn.setButtonText("+ Add Custom Widget")
          .setCta()
          .onClick(async () => {
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
  private renderTasksProjectsTab(container: HTMLElement): void {
    container.createEl("h3", { text: "Task Files" });

    new Setting(container)
      .setName("Daily Tasks File (Plan)")
      .setDesc("Path to the file containing daily planned tasks organized by date headings (e.g. Daily Tasks.md).")
      .addText(text => {
        new FileSuggest(this.app, text.inputEl, async (file) => {
          this.plugin.settings.dailyTasksFile = file.path;
          await this.plugin.saveSettings();
        });
        text.setPlaceholder("Daily Tasks.md")
          .setValue(this.plugin.settings.dailyTasksFile)
          .onChange(async (val) => {
            this.plugin.settings.dailyTasksFile = val.trim();
            await this.plugin.saveSettings();
          });
      });

    new Setting(container)
      .setName("Daily Log File (What I Did)")
      .setDesc("Path to the file containing what you actually did today (e.g. Daily Log.md).")
      .addText(text => {
        new FileSuggest(this.app, text.inputEl, async (file) => {
          this.plugin.settings.dailyLogFile = file.path;
          await this.plugin.saveSettings();
        });
        text.setPlaceholder("Daily Log.md")
          .setValue(this.plugin.settings.dailyLogFile || "")
          .onChange(async (val) => {
            this.plugin.settings.dailyLogFile = val.trim();
            await this.plugin.saveSettings();
          });
      });

    new Setting(container)
      .setName("Auto-Log Completed Tasks")
      .setDesc("When you check off a planned task in 'What I had to do', automatically append it to your Daily Log.")
      .addToggle(toggle => {
        toggle.setValue(this.plugin.settings.autoLogToDailyLog ?? true)
          .onChange(async (val) => {
            this.plugin.settings.autoLogToDailyLog = val;
            await this.plugin.saveSettings();
          });
      });

    new Setting(container)
      .setName("Weekly Tasks File")
      .setDesc("Path to the file containing weekly tasks (e.g. Weekly Tasks.md).")
      .addText(text => {
        new FileSuggest(this.app, text.inputEl, async (file) => {
          this.plugin.settings.weeklyTasksFile = file.path;
          await this.plugin.saveSettings();
        });
        text.setPlaceholder("Weekly Tasks.md")
          .setValue(this.plugin.settings.weeklyTasksFile)
          .onChange(async (val) => {
            this.plugin.settings.weeklyTasksFile = val.trim();
            await this.plugin.saveSettings();
          });
      });

    container.createEl("h3", { text: "Habits & Streaks" });

    new Setting(container)
      .setName("Habits File")
      .setDesc("Path to the markdown file storing your active habit streaks and callouts (e.g. Habits.md).")
      .addText(text => {
        new FileSuggest(this.app, text.inputEl, async (file) => {
          this.plugin.settings.habitsFile = file.path;
          await this.plugin.saveSettings();
        });
        text.setPlaceholder("Habits.md")
          .setValue(this.plugin.settings.habitsFile || "Habits.md")
          .onChange(async (val) => {
            this.plugin.settings.habitsFile = val.trim() || "Habits.md";
            await this.plugin.saveSettings();
          });
      });

    new Setting(container)
      .setName("Habits Archive File")
      .setDesc("Path to the markdown file where archived habits are moved (e.g. 99 Archive/Habit.md). Created automatically if needed.")
      .addText(text => {
        new FileSuggest(this.app, text.inputEl, async (file) => {
          this.plugin.settings.archiveHabitsFile = file.path;
          await this.plugin.saveSettings();
        });
        text.setPlaceholder("99 Archive/Habit.md")
          .setValue(this.plugin.settings.archiveHabitsFile || "99 Archive/Habit.md")
          .onChange(async (val) => {
            this.plugin.settings.archiveHabitsFile = val.trim() || "99 Archive/Habit.md";
            await this.plugin.saveSettings();
          });
      });

    new Setting(container)
      .setName("Monthly Freeze Quota (Days)")
      .setDesc("Maximum number of freeze days a habit can use per calendar month.")
      .addText(text => {
        text.inputEl.type = "number";
        text.setPlaceholder("4")
          .setValue(String(this.plugin.settings.maxFreezesPerMonth ?? 4))
          .onChange(async (val) => {
            const n = parseInt(val, 10);
            this.plugin.settings.maxFreezesPerMonth = isNaN(n) ? 4 : Math.max(0, n);
            await this.plugin.saveSettings();
          });
      });

    container.createEl("h3", { text: "Quick Capture" });

    new Setting(container)
      .setName("Quick Capture Folder")
      .setDesc("Folder where notes created via the Quick Capture box will be saved (e.g. 00 Inbox).")
      .addText(text => {
        text.setPlaceholder("00 Inbox")
          .setValue(this.plugin.settings.quickCaptureFolder)
          .onChange(async (val) => {
            this.plugin.settings.quickCaptureFolder = val.trim();
            await this.plugin.saveSettings();
          });
      });

    container.createEl("h3", { text: "Ongoing Projects" });

    new Setting(container)
      .setName("Projects Folder")
      .setDesc("Folder to scan for project notes (leave blank to search entire vault).")
      .addText(text => {
        text.setPlaceholder("03 Projects")
          .setValue(this.plugin.settings.projectsFolder)
          .onChange(async (val) => {
            this.plugin.settings.projectsFolder = val.trim();
            await this.plugin.saveSettings();
          });
      });

    new Setting(container)
      .setName("Status Property Name")
      .setDesc("Frontmatter property indicating project status.")
      .addText(text => {
        text.setPlaceholder("status")
          .setValue(this.plugin.settings.projectStatusProp)
          .onChange(async (val) => {
            this.plugin.settings.projectStatusProp = val.trim() || "status";
            await this.plugin.saveSettings();
          });
      });

    new Setting(container)
      .setName("Active Status Values")
      .setDesc("Comma-separated status values that mark a project as ongoing (e.g. in-progress, active).")
      .addText(text => {
        text.setPlaceholder("in-progress, active, ongoing")
          .setValue(this.plugin.settings.projectStatusValues.join(", "))
          .onChange(async (val) => {
            this.plugin.settings.projectStatusValues = val.split(",").map(v => v.trim()).filter(Boolean);
            await this.plugin.saveSettings();
          });
      });

    new Setting(container)
      .setName("Progress Property Name")
      .setDesc("Frontmatter property for manual percentage. If missing, task checkboxes are calculated automatically.")
      .addText(text => {
        text.setPlaceholder("progress")
          .setValue(this.plugin.settings.projectProgressProp)
          .onChange(async (val) => {
            this.plugin.settings.projectProgressProp = val.trim() || "progress";
            await this.plugin.saveSettings();
          });
      });

    container.createEl("h3", { text: "Recent Notes" });

    new Setting(container)
      .setName("Recent Notes Limit")
      .setDesc("Maximum number of recently modified notes to display.")
      .addText(text => {
        text.setPlaceholder("8")
          .setValue(String(this.plugin.settings.recentNotesLimit))
          .onChange(async (val) => {
            const num = parseInt(val, 10);
            if (!isNaN(num) && num > 0) {
              this.plugin.settings.recentNotesLimit = num;
              await this.plugin.saveSettings();
            }
          });
      });

    new Setting(container)
      .setName("Excluded Folders")
      .setDesc("Comma-separated folders to ignore in Recent Notes (e.g. Templates, .trash).")
      .addText(text => {
        text.setPlaceholder("Templates, .trash")
          .setValue(this.plugin.settings.recentNotesExcludeFolders.join(", "))
          .onChange(async (val) => {
            this.plugin.settings.recentNotesExcludeFolders = val.split(",").map(f => f.trim()).filter(Boolean);
            await this.plugin.saveSettings();
          });
      });
  }

  // =========================================================================
  // 5. BOOKMARKS TAB
  // =========================================================================
  private renderBookmarksTab(container: HTMLElement): void {
    container.createEl("h3", { text: "Links & Bookmark Resources" });
    const linksContainer = container.createDiv({ cls: "os-settings-links" });
    this.renderLinksSettings(linksContainer);
  }

  private renderLinksSettings(container: HTMLElement): void {
    container.empty();

    const links = this.plugin.settings.links || [];
    links.forEach((link, idx) => {
      const row = new Setting(container)
        .setName(`Link #${idx + 1}: ${link.title}`)
        .addText(titleText => {
          titleText.setPlaceholder("Title")
            .setValue(link.title)
            .onChange(async (val) => {
              link.title = val;
              await this.plugin.saveSettings();
            });
        })
        .addText(urlText => {
          urlText.setPlaceholder("URL or Note Name")
            .setValue(link.url)
            .onChange(async (val) => {
              link.url = val;
              await this.plugin.saveSettings();
            });
        })
        .addText(iconText => {
          iconText.setPlaceholder("Icon (e.g. github)")
            .setValue(link.icon)
            .onChange(async (val) => {
              link.icon = val;
              await this.plugin.saveSettings();
            });
        })
        .addButton(btn => {
          btn.setIcon("trash")
            .setTooltip("Delete Link")
            .onClick(async () => {
              this.plugin.settings.links.splice(idx, 1);
              await this.plugin.saveSettings();
              this.renderLinksSettings(container);
            });
        });
    });

    new Setting(container)
      .addButton(btn => {
        btn.setButtonText("+ Add Bookmark Link")
          .setCta()
          .onClick(async () => {
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
  private renderStreaksRailTab(container: HTMLElement): void {
    container.createEl("h3", { text: "Right Side Companion Rail Widgets" });

    new Setting(container)
      .setName("Enable Right Side Rail")
      .setDesc("Toggle visibility of the right companion rail containing Calendar, Graph view, Streaks, and Quote.")
      .addToggle(toggle => {
        toggle.setValue(this.plugin.settings.showRightRail ?? true)
          .onChange(async (val) => {
            this.plugin.settings.showRightRail = val;
            await this.plugin.saveSettings();
          });
      });

    new Setting(container)
      .setName("Calendar Widget")
      .setDesc("Interactive monthly calendar with quick jump to daily notes.")
      .addToggle(toggle => {
        toggle.setValue(this.plugin.settings.showCalendar ?? true)
          .onChange(async (val) => {
            this.plugin.settings.showCalendar = val;
            await this.plugin.saveSettings();
          });
      });

    new Setting(container)
      .setName("Graph View Widget")
      .setDesc("Vault node graph widget with direct link navigation.")
      .addToggle(toggle => {
        toggle.setValue(this.plugin.settings.showGraphView ?? true)
          .onChange(async (val) => {
            this.plugin.settings.showGraphView = val;
            await this.plugin.saveSettings();
          });
      });

    new Setting(container)
      .setName("Streaks Tracker Widget")
      .setDesc("Habit streak counter synced with Daily Tasks and freeze protection.")
      .addToggle(toggle => {
        toggle.setValue(this.plugin.settings.showStreaks ?? true)
          .onChange(async (val) => {
            this.plugin.settings.showStreaks = val;
            await this.plugin.saveSettings();
          });
      });

    new Setting(container)
      .setName("Quote Widget")
      .setDesc("Motivational quote card at the bottom of the right rail.")
      .addToggle(toggle => {
        toggle.setValue(this.plugin.settings.showRightQuote ?? true)
          .onChange(async (val) => {
            this.plugin.settings.showRightQuote = val;
            await this.plugin.saveSettings();
          });
      });

    // =======================================================================
    // Calendar Events File (.md) Section
    // =======================================================================
    container.createEl("h3", { text: "Calendar Events File (.md)" });
    new Setting(container)
      .setName("Events File")
      .setDesc("Path to the Markdown file where local events are stored (e.g. Events.md). Uses the same date-heading format as Daily Tasks (## YYYY-MM-DD).")
      .addText(text => {
        new FileSuggest(this.app, text.inputEl, async (file) => {
          this.plugin.settings.calendarEventsFile = file.path;
          await this.plugin.saveSettings();
        });
        text.setPlaceholder("Events.md")
          .setValue(this.plugin.settings.calendarEventsFile || "Events.md")
          .onChange(async (val) => {
            this.plugin.settings.calendarEventsFile = val.trim() || "Events.md";
            await this.plugin.saveSettings();
          });
      });

    // =======================================================================
    // Google Calendar Integration Section
    // =======================================================================
    container.createEl("h3", { text: "Google Calendar Integration" });
    const calDesc = container.createEl("p", {
      cls: "setting-item-description",
      text: "Display real-time events on your Calendar widget with colored event chips and event notifications."
    });
    calDesc.style.marginBottom = "14px";

    new Setting(container)
      .setName("Google Calendar Address (Private iCal URL)")
      .setDesc("In Google Calendar on the Web, go to Settings > Your Calendar > 'Secret address in iCal format' and paste the URL here.")
      .addText(text => {
        text.setPlaceholder("https://calendar.google.com/calendar/ical/.../basic.ics")
          .setValue(this.plugin.settings.googleCalendarUrl || "")
          .onChange(async (val) => {
            this.plugin.settings.googleCalendarUrl = val.trim();
            await this.plugin.saveSettings();
          });
        text.inputEl.style.width = "260px";
      })
      .addButton(btn => {
        btn.setButtonText("Sync Events Now")
          .setCta()
          .onClick(async () => {
            const url = this.plugin.settings.googleCalendarUrl;
            if (!url) {
              new Notice("Please enter a Google Calendar iCal address first.");
              return;
            }
            btn.setButtonText("Syncing...");
            btn.setDisabled(true);
            try {
              const events = await this.plugin.calendarService.fetchEvents(url);
              this.plugin.settings.cachedCalendarEvents = events;
              this.plugin.settings.lastCalendarSyncTime = Date.now();
              await this.plugin.saveSettings();
              new Notice(`✅ Synced ${events.length} Google Calendar event${events.length === 1 ? "" : "s"}!`);
            } catch (err: any) {
              new Notice(`❌ Failed to sync: ${err.message || "Invalid iCal URL or network error"}`);
            } finally {
              btn.setButtonText("Sync Events Now");
              btn.setDisabled(false);
            }
          });
      });

    new Setting(container)
      .setName("Auto-sync Events in Background")
      .setDesc("Automatically refresh events from Google Calendar every few minutes.")
      .addToggle(toggle => {
        toggle.setValue(this.plugin.settings.googleCalendarAutoSync ?? true)
          .onChange(async (val) => {
            this.plugin.settings.googleCalendarAutoSync = val;
            await this.plugin.saveSettings();
          });
      });

    new Setting(container)
      .setName("Event Reminders & Notifications")
      .setDesc("Trigger an in-app notice and desktop notification before an event begins.")
      .addToggle(toggle => {
        toggle.setValue(this.plugin.settings.enableCalendarNotifications ?? true)
          .onChange(async (val) => {
            this.plugin.settings.enableCalendarNotifications = val;
            await this.plugin.saveSettings();
          });
      });

    new Setting(container)
      .setName("Notification Lead Time")
      .setDesc("How many minutes before an event starts to notify you.")
      .addDropdown(dd => {
        dd.addOption("5", "5 minutes before")
          .addOption("10", "10 minutes before (Default)")
          .addOption("15", "15 minutes before")
          .addOption("30", "30 minutes before")
          .setValue(String(this.plugin.settings.calendarNotificationLeadMinutes || 10))
          .onChange(async (val) => {
            this.plugin.settings.calendarNotificationLeadMinutes = parseInt(val, 10) || 10;
            await this.plugin.saveSettings();
          });
      });

    container.createEl("h3", { text: "Right Rail Quote Content" });

    new Setting(container)
      .setName("Quote Text")
      .setDesc("Inspirational quote displayed in the right rail widget.")
      .addTextArea(text => {
        text.setPlaceholder("Consistency is more important than intensity.")
          .setValue(this.plugin.settings.rightRailQuote)
          .onChange(async (val) => {
            this.plugin.settings.rightRailQuote = val;
            await this.plugin.saveSettings();
          });
      });

    new Setting(container)
      .setName("Quote Author (Optional)")
      .setDesc("Author name or source.")
      .addText(text => {
        text.setPlaceholder("e.g. Bruce Lee")
          .setValue(this.plugin.settings.rightRailQuoteAuthor || "")
          .onChange(async (val) => {
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

  private async renderStreaksList(container: HTMLElement): Promise<void> {
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
      setIcon(iconSpan, streak.icon || "flame");
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
      const streakUnit = freq === "weekly"
        ? (streak.currentStreak === 1 ? "wk" : "wks")
        : freq === "monthly"
        ? (streak.currentStreak === 1 ? "mo" : "mos")
        : freq === "yearly"
        ? (streak.currentStreak === 1 ? "yr" : "yrs")
        : (streak.currentStreak === 1 ? "day" : "days");
      const habitMaxFreezes = this.plugin.streakService.getEffectiveMaxFreezes(streak, maxFreezes);

      const freqText = freq.charAt(0).toUpperCase() + freq.slice(1) + (freq !== "daily" && streak.scheduleType === "fixed" ? " (Fixed)" : "");
      const freqBadge = leftCol.createSpan({ text: freqText });
      freqBadge.style.cssText = "font-size: 10px; padding: 1px 6px; border-radius: 4px; background: var(--background-modifier-border); color: var(--text-muted); font-weight: 500; text-transform: uppercase;";

      const countBadge = leftCol.createSpan({ text: `${streak.currentStreak || 0} ${streakUnit}` });
      countBadge.style.cssText = "font-size: 11px; padding: 2px 8px; border-radius: 10px; background: rgba(255, 152, 0, 0.15); color: #ffa726; font-weight: 600;";

      const isFrozen = this.plugin.streakService.isFrozen(streak);
      if (isFrozen) {
        const daysLeft = this.plugin.streakService.getFreezeDaysLeft(streak);
        const freezeBadge = leftCol.createSpan({ text: `❄️ Frozen (${daysLeft}d left)` });
        freezeBadge.style.cssText = "font-size: 11px; padding: 2px 8px; border-radius: 10px; background: rgba(56, 189, 248, 0.15); color: #38bdf8; font-weight: 600;";
      }

      const actions = streakCard.createDiv({ cls: "os-settings-streak-actions" });
      actions.style.cssText = "display: flex; align-items: center; gap: 6px;";

      // Freeze button
      const freezeBtn = actions.createEl("button", { text: isFrozen ? "Unfreeze" : "Freeze", cls: "mod-warning" });
      freezeBtn.addEventListener("click", () => {
        new FreezeStreakModal(this.app, streak, this.plugin.streakService, habitMaxFreezes, async () => {
          await this.plugin.streakService.saveHabits(habitsFilePath, streaks, maxFreezes);
          await this.plugin.saveSettings();
          await this.renderStreaksList(container);
        }).open();
      });

      // Edit button (name & description)
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

      // Archive / Delete button
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

    new Setting(container)
      .addButton(btn => {
        btn.setButtonText("+ Add New Habit")
          .setCta()
          .onClick(() => {
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
}
