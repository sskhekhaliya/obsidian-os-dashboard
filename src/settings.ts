import { App, PluginSettingTab, Setting, setIcon, Notice } from "obsidian";
import * as obsidian from "obsidian";
import type OSDashboardPlugin from "./main";
import { CustomWidget, CustomWidgetButton, WidgetCustomization, OSDashboardSettings, StreakItem, DashboardWidgetLayout, moment, getDailyNotesFormat, getRandomAestheticBanner } from "./types";
import { IconService } from "./services/iconService";
import { FileSuggest } from "./modals/fileSuggest";
import { WikiLinkSuggest } from "./modals/wikiLinkSuggest";

type SettingsTabId = "general" | "navigation" | "widgets" | "tasks-projects" | "bookmarks";

export class OSDashboardSettingTab extends PluginSettingTab {
  private plugin: OSDashboardPlugin;
  private activeTab: SettingsTabId = "general";
  private openSections: Set<string> = new Set();

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
      { id: "tasks-projects", label: "Configure Widgets", icon: "sliders" },
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

    new Setting(container)
      .setName("Mobile Top Space / Margin")
      .setDesc("Top spacing in pixels applied on mobile to keep the dashboard below the mobile notification bar and Obsidian UI (in portrait & landscape).")
      .addSlider(slider => {
        slider
          .setLimits(0, 120, 2)
          .setValue(this.plugin.settings.mobileTopMargin ?? 48)
          .setDynamicTooltip()
          .onChange(async (val) => {
            this.plugin.settings.mobileTopMargin = val;
            await this.plugin.saveSettings();
          });
      });

    container.createEl("h3", { text: "Hero Identity & Appearance" });

    new Setting(container)
      .setName("Vault Title")
      .setDesc("Main title displayed in the hero banner. Leave blank to automatically use your vault name.")
      .addText(text => {
        text.setPlaceholder(this.app.vault.getName() || "Vault Name")
          .setValue(this.plugin.settings.vaultTitle || "")
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
      .setDesc("Path to an image in your vault or an online image URL. Defaults to an aesthetic Unsplash panorama.")
      .addText(text => {
        text.setPlaceholder("https://images.unsplash.com/... or banner.png")
          .setValue(this.plugin.settings.bannerPath)
          .onChange(async (val) => {
            this.plugin.settings.bannerPath = val.trim();
            await this.plugin.saveSettings();
          });
        text.inputEl.style.width = "240px";
      })
      .addButton(btn => {
        btn.setButtonText("🎲 Random Unsplash")
          .setTooltip("Load a new random aesthetic Unsplash photo")
          .onClick(async () => {
            const newBanner = getRandomAestheticBanner();
            this.plugin.settings.bannerPath = newBanner;
            await this.plugin.saveSettings();
            new Notice("Aesthetic Unsplash banner applied!");
            this.display();
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

    const dailyFormat = getDailyNotesFormat(this.app);
    const initialPattern = this.plugin.settings.newFilePattern || "";

    const newNoteSetting = new Setting(container)
      .setName("New Note Naming Pattern");

    const updatePatternDesc = (val: string) => {
      const clean = val.trim();
      newNoteSetting.descEl.empty();
      const refLink = newNoteSetting.descEl.createEl("a", {
        text: "Syntax reference",
        href: "https://momentjs.com/docs/#/displaying/format/"
      });
      refLink.setAttr("target", "_blank");

      if (clean) {
        try {
          const preview = moment().format(clean);
          newNoteSetting.descEl.createSpan({ text: `. Your current syntax looks like: ` });
          newNoteSetting.descEl.createEl("b", { text: preview });
        } catch (e) {
          newNoteSetting.descEl.createSpan({ text: `. Invalid syntax format` });
        }
      } else {
        const examplePreview = moment().format(dailyFormat || "YYYY-MM-DD");
        newNoteSetting.descEl.createSpan({ text: `. e.g. ${examplePreview}` });
      }
    };

    updatePatternDesc(initialPattern);

    newNoteSetting.addText(text => {
      text.setPlaceholder(dailyFormat || "YYYY-MM-DD")
        .setValue(initialPattern)
        .onChange(async (val) => {
          this.plugin.settings.newFilePattern = val.trim();
          updatePatternDesc(val);
          await this.plugin.saveSettings();
        });
      text.inputEl.addEventListener("input", () => {
        updatePatternDesc(text.inputEl.value);
      });
      text.inputEl.style.width = "220px";
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

    // =========================================================================
    // FOLDER ICONS & COLOR OVERRIDES
    // =========================================================================
    container.createEl("h3", { text: "Folder Icons & Color Overrides" });

    const overrideDesc = container.createEl("p", {
      text: "Customize the icon and color for each folder in your Navigation Ribbon and across the dashboard. If you previously used the Obsidian Iconize plugin, you can import your existing colors and icons with one click.",
      cls: "setting-item-description"
    });
    overrideDesc.style.marginBottom = "14px";

    // Action buttons bar
    new Setting(container)
      .setName("Iconize Migration & Quick Actions")
      .setDesc("Import folder icons and colors from obsidian-iconize, or manage custom overrides.")
      .addButton(btn => {
        btn.setButtonText("Import from Iconize")
          .setIcon("download")
          .setCta()
          .onClick(async () => {
            const result = await this.plugin.iconService.importFromIconize();
            if (result.count === 0) {
              new Notice("No Iconize data found. Ensure obsidian-iconize was installed or data.json exists.");
              return;
            }
            if (!this.plugin.settings.folderOverrides) {
              this.plugin.settings.folderOverrides = {};
            }
            this.plugin.settings.folderOverrides = Object.assign({}, this.plugin.settings.folderOverrides, result.overrides);
            await this.plugin.saveSettings();
            new Notice(`Successfully imported ${result.count} folder styles from Iconize!`);
            this.display();
          });
      })
      .addButton(btn => {
        btn.setButtonText("Reset All Overrides")
          .setClass("os-btn-danger")
          .onClick(async () => {
            this.plugin.settings.folderOverrides = {};
            await this.plugin.saveSettings();
            new Notice("All folder icon & color overrides have been reset.");
            this.display();
          });
      });

    // Render list of active navigation folders
    const folderCards = this.plugin.navigationService.getFolderCards(this.plugin.settings);
    const overrides = this.plugin.settings.folderOverrides || {};

    const foldersListContainer = container.createDiv({ cls: "os-folder-overrides-list" });

    if (folderCards.length === 0) {
      foldersListContainer.createEl("p", {
        text: "No navigation folders detected. Create folders in your vault root or adjust your ignored folders filter.",
        cls: "os-empty-state-text"
      });
    }

    for (const card of folderCards) {
      const existing = overrides[card.path] || overrides[card.name];
      const resolved = card.resolvedIcon;

      const itemEl = foldersListContainer.createDiv({ cls: "os-folder-override-item" });

      // Left info: folder name & icon preview
      const leftCol = itemEl.createDiv({ cls: "os-folder-override-left" });
      const iconWrap = leftCol.createDiv({ cls: "os-folder-override-icon-wrap" });
      this.plugin.iconService.renderIcon(iconWrap, resolved);

      const labelWrap = leftCol.createDiv({ cls: "os-folder-override-label-wrap" });
      labelWrap.createDiv({ cls: "os-folder-override-title", text: card.name });
      labelWrap.createDiv({ cls: "os-folder-override-sub", text: card.path });

      // Middle: Icon Input
      const iconInputCol = itemEl.createDiv({ cls: "os-folder-override-input-col" });
      const iconInput = iconInputCol.createEl("input", {
        type: "text",
        cls: "os-folder-override-icon-input",
        placeholder: resolved.type === "emoji" ? resolved.value : (resolved.value || "folder")
      });
      iconInput.value = existing?.icon || "";
      iconInput.setAttribute("title", "Lucide icon name (e.g. book-open, flame) or Emoji (e.g. 📚)");

      // Right: Color Picker
      const colorCol = itemEl.createDiv({ cls: "os-folder-override-color-col" });
      const nativeColor = colorCol.createEl("input", {
        type: "color",
        cls: "os-folder-override-color-native"
      });
      const activeColor = existing?.color || resolved.color || "#3b82f6";
      nativeColor.value = activeColor.startsWith("#") && activeColor.length === 7 ? activeColor : "#3b82f6";

      const hexInput = colorCol.createEl("input", {
        type: "text",
        cls: "os-folder-override-hex-input"
      });
      hexInput.value = existing?.color || "";
      hexInput.placeholder = activeColor;

      const saveFolder = async (newIcon?: string, newColor?: string) => {
        if (!this.plugin.settings.folderOverrides) {
          this.plugin.settings.folderOverrides = {};
        }
        const current = this.plugin.settings.folderOverrides[card.path] || {};
        if (newIcon !== undefined) current.icon = newIcon.trim() || undefined;
        if (newColor !== undefined) current.color = newColor.trim() || undefined;

        if (!current.icon && !current.color) {
          delete this.plugin.settings.folderOverrides[card.path];
          delete this.plugin.settings.folderOverrides[card.name];
        } else {
          this.plugin.settings.folderOverrides[card.path] = current;
        }

        await this.plugin.saveSettings();
        // Update live preview in row
        const updatedResolved = this.plugin.iconService.resolveFolderIcon(card.path, card.name, 0, this.plugin.settings);
        this.plugin.iconService.renderIcon(iconWrap, updatedResolved);
      };

      iconInput.addEventListener("change", async () => {
        await saveFolder(iconInput.value, hexInput.value);
      });

      nativeColor.addEventListener("input", async () => {
        hexInput.value = nativeColor.value;
        await saveFolder(iconInput.value, nativeColor.value);
      });

      hexInput.addEventListener("change", async () => {
        const val = hexInput.value.trim();
        if (/^#[0-9a-fA-F]{6}$/.test(val)) {
          nativeColor.value = val;
        }
        await saveFolder(iconInput.value, val);
      });

      // Quick palette swatch drop
      const swatchesWrap = colorCol.createDiv({ cls: "os-mini-swatches" });
      for (const hex of IconService.COLOR_PALETTE.slice(0, 6)) {
        const swatch = swatchesWrap.createDiv({ cls: "os-mini-swatch" });
        swatch.style.backgroundColor = hex;
        swatch.setAttribute("title", hex);
        swatch.addEventListener("click", async () => {
          nativeColor.value = hex;
          hexInput.value = hex;
          await saveFolder(iconInput.value, hex);
        });
      }

      // Reset button
      const resetBtn = itemEl.createEl("button", {
        cls: "os-folder-override-reset-btn",
        title: "Reset this folder to default icon & color"
      });
      setIcon(resetBtn, "rotate-ccw");
      resetBtn.addEventListener("click", async () => {
        if (this.plugin.settings.folderOverrides) {
          delete this.plugin.settings.folderOverrides[card.path];
          delete this.plugin.settings.folderOverrides[card.name];
        }
        await this.plugin.saveSettings();
        this.display();
      });
    }
  }

  // =========================================================================
  // 3. WIDGETS MANAGER TAB
  // =========================================================================
  // =========================================================================
  // 3. WIDGETS TAB (COLLAPSIBLE SECTIONS)
  // =========================================================================
  private renderWidgetsTab(container: HTMLElement): void {
    const intro = container.createEl("div", { cls: "os-settings-tab-intro" });
    intro.createEl("h3", { text: "Dashboard Widgets & Layout" });
    intro.createEl("p", {
      text: "Customize widget visibility, appearance, accent colors, and column arrangement.",
      cls: "setting-item-description"
    });

    // 1. Header & Navigation Visibility
    const headerContent = this.createCollapsibleSection(
      container,
      "Header & Navigation Visibility",
      "layout-template",
      "Toggle top-level hero banner and folder navigation bar",
      false
    );

    new Setting(headerContent)
      .setName("Hero Banner")
      .setDesc("Top banner with vault identity, quotes, and live clock.")
      .addToggle(toggle => {
        toggle.setValue(this.plugin.settings.showHeroBanner ?? true)
          .onChange(async (val) => {
            this.plugin.settings.showHeroBanner = val;
            await this.plugin.saveSettings();
          });
      });

    new Setting(headerContent)
      .setName("Smart Navigation Ribbon")
      .setDesc("1st-level folder shortcuts with inherited icons and colors.")
      .addToggle(toggle => {
        toggle.setValue(this.plugin.settings.showNavRibbon ?? true)
          .onChange(async (val) => {
            this.plugin.settings.showNavRibbon = val;
            await this.plugin.saveSettings();
          });
      });

    // 2. Main Grid Default Widgets
    const mainGridContent = this.createCollapsibleSection(
      container,
      "Main Grid Default Widgets",
      "layout-grid",
      "Toggle cards and click to customize title, icon, or accent color",
      true
    );

    this.renderDefaultWidgetCard(mainGridContent, "todayTasks", "Daily Tasks (Plan & Log)", "Daily", "check-circle", "showTodayTasks", "#8b5cf6");
    this.renderDefaultWidgetCard(mainGridContent, "weeklyTasks", "Weekly Planning", "This Week", "calendar", "showWeeklyTasks", "#8b5cf6");
    this.renderDefaultWidgetCard(mainGridContent, "recentNotes", "Recent Notes", "Recent Notes", "file-text", "showRecentNotes", "#8b5cf6");
    this.renderDefaultWidgetCard(mainGridContent, "quickCapture", "Quick Capture", "Quick Capture", "edit-3", "showQuickCapture", "#8b5cf6");
    this.renderDefaultWidgetCard(mainGridContent, "ongoingProjects", "Ongoing Projects", "Ongoing Projects", "target", "showOngoingProjects", "#8b5cf6");
    this.renderDefaultWidgetCard(mainGridContent, "deadlines", "Deadlines Tracker", "Deadlines", "calendar-clock", "showDeadlines", "#ef4444");
    this.renderDefaultWidgetCard(mainGridContent, "bookmarks", "Bookmarks & Links", "Links", "link-2", "showBookmarks", "#8b5cf6");

    // 3. Right Side Companion Rail Widgets
    const railContent = this.createCollapsibleSection(
      container,
      "Right Side Companion Rail Widgets",
      "sidebar",
      "Companion rail containing Calendar, Graph view, Streaks tracker, and Quote card",
      false
    );

    new Setting(railContent)
      .setName("Enable Right Side Rail")
      .setDesc("Master toggle to show or hide the entire right companion rail.")
      .addToggle(toggle => {
        toggle.setValue(this.plugin.settings.showRightRail ?? true)
          .onChange(async (val) => {
            this.plugin.settings.showRightRail = val;
            await this.plugin.saveSettings();
          });
      });

    this.renderDefaultWidgetCard(railContent, "calendar", "Calendar Widget", "Calendar", "calendar", "showCalendar", "#8b5cf6");
    this.renderDefaultWidgetCard(railContent, "graphView", "Graph View Widget", "Graph view", "git-fork", "showGraphView", "#8b5cf6");
    this.renderDefaultWidgetCard(railContent, "streaks", "Streaks Tracker Widget", "Streaks", "flame", "showStreaks", "#f97316");
    this.renderDefaultWidgetCard(railContent, "rightQuote", "Inspirational Quote Card", "Quote", "sparkles", "showRightQuote", "#8b5cf6");

    // 4. Drag-and-drop & Layout Section
    const layoutContent = this.createCollapsibleSection(
      container,
      "Widget Drag & Drop Layout",
      "move",
      "Restore all widgets back to their default columns and positions",
      false
    );

    new Setting(layoutContent)
      .setName("Reset Widget Order & Positions")
      .setDesc("Restore all widgets back to their default columns and positions.")
      .addButton(btn => {
        btn.setButtonText("Reset Layout")
          .setWarning()
          .onClick(async () => {
            this.plugin.settings.widgetLayout = {
              col1: ["todayTasks", "weeklyTasks"],
              col2: ["recentNotes", "quickCapture"],
              col3: ["ongoingProjects", "deadlines", "bookmarks"],
              rail: ["calendar", "streaks", "graphView", "rightQuote"]
            };
            await this.plugin.saveSettings();
            new Notice("Widget layout reset to default!");
          });
      });

    // 5. Custom Widgets Section
    const customContent = this.createCollapsibleSection(
      container,
      "Custom Dashboard Widgets",
      "plus-square",
      "Add custom cards to your dashboard to embed vault notes, checklists, or links",
      false
    );

    const customContainer = customContent.createDiv({ cls: "os-settings-custom-widgets" });
    this.renderCustomWidgetsList(customContainer);
  }

  private renderDefaultWidgetCard(
    container: HTMLElement,
    widgetId: string,
    name: string,
    defaultTitle: string,
    defaultIcon: string,
    visibilityKey: keyof OSDashboardSettings,
    defaultColor?: string
  ): void {
    const card = container.createDiv({ cls: "os-settings-widget-card is-collapsible" });
    const custom = (this.plugin.settings.widgetCustomizations = this.plugin.settings.widgetCustomizations || {});
    const item = (custom[widgetId] = custom[widgetId] || {});

    // Header row with toggle, name, reset, and expand chevron button
    const headerRow = new Setting(card)
      .setName(name)
      .addToggle(t => {
        t.setTooltip("Enable/Disable")
          .setValue((this.plugin.settings[visibilityKey] as boolean) ?? true)
          .onChange(async (val) => {
            (this.plugin.settings as any)[visibilityKey] = val;
            await this.plugin.saveSettings();
          });
      })
      .addButton(btn => {
        btn.setIcon("rotate-ccw")
          .setTooltip("Reset appearance to default")
          .onClick(async () => {
            delete custom[widgetId];
            await this.plugin.saveSettings();
            this.display();
          });
      })
      .addButton(btn => {
        btn.setIcon("chevron-down")
          .setTooltip("Customize appearance (title, icon, color)")
          .setClass("os-widget-expand-btn")
          .onClick(() => {
            card.toggleClass("is-open", !card.hasClass("is-open"));
            setIcon(btn.buttonEl, card.hasClass("is-open") ? "chevron-up" : "chevron-down");
          });
      });

    headerRow.nameEl.style.cursor = "pointer";
    headerRow.nameEl.addEventListener("click", () => {
      card.toggleClass("is-open", !card.hasClass("is-open"));
      const expandBtn = card.querySelector(".os-widget-expand-btn") as HTMLElement;
      if (expandBtn) {
        setIcon(expandBtn, card.hasClass("is-open") ? "chevron-up" : "chevron-down");
      }
    });

    const details = card.createDiv({ cls: "os-settings-widget-details" });

    // Title & Icon Row
    new Setting(details)
      .setName("Title & Icon")
      .setDesc(`Card title and Lucide icon (defaults: "${defaultTitle}", "${defaultIcon}").`)
      .addText(text => {
        text.setPlaceholder(defaultTitle)
          .setValue(item.title || "")
          .onChange(async (val) => {
            item.title = val.trim() || undefined;
            await this.plugin.saveSettings();
          });
      })
      .addText(text => {
        text.setPlaceholder(defaultIcon)
          .setValue(item.icon || "")
          .onChange(async (val) => {
            item.icon = val.trim() || undefined;
            await this.plugin.saveSettings();
          });
      });

    // Description Row
    new Setting(details)
      .setName("Description (Optional)")
      .setDesc("Subtitle shown under the card header.")
      .addText(text => {
        text.setPlaceholder("Subtitle / description")
          .setValue(item.description || "")
          .onChange(async (val) => {
            item.description = val.trim() || undefined;
            await this.plugin.saveSettings();
          });
        text.inputEl.style.width = "100%";
      });

    // Icon Color Row
    const colorSetting = new Setting(details)
      .setName("Icon Color")
      .setDesc("Accent color for this widget's header icon.");

    const colorWrapper = colorSetting.controlEl.createDiv({ cls: "os-folder-override-color-col" });
    colorWrapper.style.display = "flex";
    colorWrapper.style.alignItems = "center";
    colorWrapper.style.gap = "8px";

    const nativeColor = colorWrapper.createEl("input", {
      type: "color",
      cls: "os-color-picker-input"
    });
    nativeColor.value = item.color || defaultColor || "#8b5cf6";
    nativeColor.style.width = "32px";
    nativeColor.style.height = "28px";
    nativeColor.style.padding = "0";
    nativeColor.style.border = "none";
    nativeColor.style.cursor = "pointer";
    nativeColor.style.borderRadius = "4px";

    const hexInput = colorWrapper.createEl("input", {
      type: "text",
      cls: "os-color-hex-input"
    });
    hexInput.placeholder = defaultColor || "#8b5cf6";
    hexInput.value = item.color || "";
    hexInput.style.width = "85px";

    const saveColor = async (colorVal: string) => {
      item.color = colorVal.trim() || undefined;
      await this.plugin.saveSettings();
    };

    nativeColor.addEventListener("input", async () => {
      hexInput.value = nativeColor.value;
      await saveColor(nativeColor.value);
    });

    hexInput.addEventListener("change", async () => {
      const val = hexInput.value.trim();
      if (/^#[0-9a-fA-F]{6}$/.test(val)) {
        nativeColor.value = val;
      }
      await saveColor(val);
    });

    const swatchesWrap = colorWrapper.createDiv({ cls: "os-mini-swatches" });
    for (const hex of IconService.COLOR_PALETTE.slice(0, 6)) {
      const swatch = swatchesWrap.createDiv({ cls: "os-mini-swatch" });
      swatch.style.backgroundColor = hex;
      swatch.setAttribute("title", hex);
      swatch.addEventListener("click", async () => {
        nativeColor.value = hex;
        hexInput.value = hex;
        await saveColor(hex);
      });
    }

    if (item.color) {
      const resetColorBtn = colorWrapper.createEl("button", {
        cls: "os-folder-override-reset-btn",
        title: "Reset color to default"
      });
      setIcon(resetColorBtn, "rotate-ccw");
      resetColorBtn.addEventListener("click", async () => {
        delete item.color;
        hexInput.value = "";
        nativeColor.value = defaultColor || "#8b5cf6";
        await this.plugin.saveSettings();
        this.display();
      });
    }
  }

  private renderCustomWidgetsList(container: HTMLElement): void {
    container.empty();

    const widgets = this.plugin.settings.customWidgets || [];
    widgets.forEach((widget, idx) => {
      const widgetCard = container.createDiv({ cls: "os-settings-widget-card is-collapsible" });

      // Header row with toggle, title, delete and expand chevron
      const headerRow = new Setting(widgetCard)
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
        })
        .addButton(btn => {
          btn.setIcon("chevron-down")
            .setTooltip("Expand / Collapse Settings")
            .setClass("os-widget-expand-btn")
            .onClick(() => {
              widgetCard.toggleClass("is-open", !widgetCard.hasClass("is-open"));
              setIcon(btn.buttonEl, widgetCard.hasClass("is-open") ? "chevron-up" : "chevron-down");
            });
        });

      headerRow.nameEl.style.cursor = "pointer";
      headerRow.nameEl.addEventListener("click", () => {
        widgetCard.toggleClass("is-open", !widgetCard.hasClass("is-open"));
        const expandBtn = widgetCard.querySelector(".os-widget-expand-btn") as HTMLElement;
        if (expandBtn) {
          setIcon(expandBtn, widgetCard.hasClass("is-open") ? "chevron-up" : "chevron-down");
        }
      });

      const details = widgetCard.createDiv({ cls: "os-settings-widget-details" });

      // Configuration fields
      new Setting(details)
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

      // Widget Description (Optional)
      new Setting(details)
        .setName("Description (Optional)")
        .setDesc("Subtitle or brief description shown under the card header.")
        .addText(text => {
          text.setPlaceholder("e.g. My active project notes")
            .setValue(widget.description || "")
            .onChange(async (val) => {
              widget.description = val.trim() || undefined;
              await this.plugin.saveSettings();
            });
          text.inputEl.style.width = "100%";
        });

      // Icon Color Setting
      const colorSetting = new Setting(details)
        .setName("Icon Color")
        .setDesc("Accent color for this widget's header icon.");

      const colorWrapper = colorSetting.controlEl.createDiv({ cls: "os-folder-override-color-col" });
      colorWrapper.style.display = "flex";
      colorWrapper.style.alignItems = "center";
      colorWrapper.style.gap = "8px";

      const nativeColor = colorWrapper.createEl("input", {
        type: "color",
        cls: "os-color-picker-input"
      });
      nativeColor.value = widget.color || "#8b5cf6";
      nativeColor.style.width = "32px";
      nativeColor.style.height = "28px";
      nativeColor.style.padding = "0";
      nativeColor.style.border = "none";
      nativeColor.style.cursor = "pointer";
      nativeColor.style.borderRadius = "4px";

      const hexInput = colorWrapper.createEl("input", {
        type: "text",
        cls: "os-color-hex-input"
      });
      hexInput.placeholder = "#8b5cf6";
      hexInput.value = widget.color || "";
      hexInput.style.width = "85px";

      const saveColor = async (colorVal: string) => {
        widget.color = colorVal.trim() || undefined;
        await this.plugin.saveSettings();
      };

      nativeColor.addEventListener("input", async () => {
        hexInput.value = nativeColor.value;
        await saveColor(nativeColor.value);
      });

      hexInput.addEventListener("change", async () => {
        const val = hexInput.value.trim();
        if (/^#[0-9a-fA-F]{6}$/.test(val)) {
          nativeColor.value = val;
        }
        await saveColor(val);
      });

      const swatchesWrap = colorWrapper.createDiv({ cls: "os-mini-swatches" });
      for (const hex of IconService.COLOR_PALETTE.slice(0, 6)) {
        const swatch = swatchesWrap.createDiv({ cls: "os-mini-swatch" });
        swatch.style.backgroundColor = hex;
        swatch.setAttribute("title", hex);
        swatch.addEventListener("click", async () => {
          nativeColor.value = hex;
          hexInput.value = hex;
          await saveColor(hex);
        });
      }

      if (widget.color) {
        const resetColorBtn = colorWrapper.createEl("button", {
          cls: "os-folder-override-reset-btn",
          title: "Reset color to default"
        });
        setIcon(resetColorBtn, "rotate-ccw");
        resetColorBtn.addEventListener("click", async () => {
          delete widget.color;
          hexInput.value = "";
          nativeColor.value = "#8b5cf6";
          await this.plugin.saveSettings();
          this.renderCustomWidgetsList(container);
        });
      }

      new Setting(details)
        .setName("Column & Type")
        .setDesc("Target grid column and what content this widget renders.")
        .addDropdown(dd => {
          dd.addOption("1", "Column 1 (Left)")
            .addOption("2", "Column 2 (Center)")
            .addOption("3", "Column 3 (Right)")
            .addOption("rail", "Right Rail (Companion)")
            .setValue(String(widget.column || 1))
            .onChange(async (val) => {
              widget.column = val === "rail" ? "rail" : (parseInt(val, 10) as 1 | 2 | 3);
              if (this.plugin.settings.widgetLayout) {
                const cid = `custom-${widget.id}`;
                const layout = this.plugin.settings.widgetLayout;
                const colKeys: (keyof DashboardWidgetLayout)[] = ["col1", "col2", "col3", "rail"];
                for (const k of colKeys) {
                  if (Array.isArray(layout[k])) {
                    layout[k] = layout[k].filter(id => id !== cid);
                  }
                }
                const targetCol = widget.column === "rail" ? "rail" : (`col${widget.column}` as keyof DashboardWidgetLayout);
                if (!Array.isArray(layout[targetCol])) {
                  layout[targetCol] = [];
                }
                layout[targetCol].push(cid);
              }
              await this.plugin.saveSettings();
            });
        })
        .addDropdown(dd => {
          dd.addOption("markdown-note", "Vault Note Embed")
            .addOption("custom-text", "Custom Markdown Text")
            .addOption("dataview", "Dataview Query")
            .addOption("link-button", "Quick Link / Button")
            .setValue(widget.type || "markdown-note")
            .onChange(async (val: any) => {
              widget.type = val;
              await this.plugin.saveSettings();
              this.renderCustomWidgetsList(container);
            });
        });

      if (widget.type === "markdown-note") {
        const contentSetting = new Setting(details)
          .setName("Vault Note Path")
          .setDesc("Path to a markdown file in your vault (suggests notes as you type).")
          .addText(t => {
            new FileSuggest(this.app, t.inputEl, async (file) => {
              widget.content = file.path;
              await this.plugin.saveSettings();
            });
            t.setPlaceholder("path/to/note.md")
              .setValue(widget.content)
              .onChange(async (val) => {
                widget.content = val.trim();
                await this.plugin.saveSettings();
              });
          });
      } else if (widget.type === "custom-text") {
        const contentSetting = new Setting(details)
          .setName("Custom Content")
          .setDesc("Custom markdown or text displayed inside the card.")
          .addTextArea(t => {
            t.setPlaceholder("Type markdown or reminders...")
              .setValue(widget.content)
              .onChange(async (val) => {
                widget.content = val;
                await this.plugin.saveSettings();
              });
          });
      } else if (widget.type === "dataview") {
        new Setting(details)
          .setName("Show Table Header")
          .setDesc("Display the column header row at the top of the table.")
          .addToggle(t => {
            t.setValue(widget.showTableHeader !== false)
              .onChange(async (val) => {
                widget.showTableHeader = val;
                await this.plugin.saveSettings();
              });
          });

        const contentSetting = new Setting(details)
          .setName("Dataview Query")
          .setDesc("Dataview DQL query (e.g. TABLE file.mtime AS Modified FROM #project LIMIT 5) or dataviewjs script.")
          .addTextArea(t => {
            t.setPlaceholder("TABLE file.mtime AS Modified FROM #project SORT file.mtime DESC LIMIT 5")
              .setValue(widget.content)
              .onChange(async (val) => {
                widget.content = val;
                await this.plugin.saveSettings();
              });
            t.inputEl.rows = 4;
            t.inputEl.style.fontFamily = "var(--font-monospace)";
            t.inputEl.style.fontSize = "12px";
          });
      } else if (widget.type === "link-button") {
        const buttonsSection = details.createDiv({ cls: "os-settings-buttons-section" });
        new Setting(buttonsSection)
          .setName("Buttons & Links")
          .setDesc("Add multiple action buttons with custom labels and targets (URLs or [[Note]] links).");

        // Normalize buttons array from existing widget.content if present
        if (!widget.buttons || widget.buttons.length === 0) {
          if (widget.content) {
            widget.buttons = [{
              id: Date.now().toString(),
              label: widget.title || "Open",
              target: widget.content
            }];
          } else {
            widget.buttons = [{
              id: Date.now().toString(),
              label: "Open",
              target: ""
            }];
          }
        }

        const buttonsContainer = buttonsSection.createDiv({ cls: "os-settings-buttons-list" });

        const renderButtonsEditor = () => {
          buttonsContainer.empty();
          widget.buttons?.forEach((btnItem, bIdx) => {
            const row = buttonsContainer.createDiv({ cls: "os-settings-btn-item" });

            const labelInput = row.createEl("input", {
              type: "text",
              placeholder: "Label (e.g. Daily Tasks)"
            });
            labelInput.value = btnItem.label || "";
            labelInput.style.flex = "1 1 120px";
            labelInput.style.minWidth = "90px";
            labelInput.addEventListener("change", async () => {
              btnItem.label = labelInput.value.trim();
              await this.plugin.saveSettings();
            });

            const iconInput = row.createEl("input", {
              type: "text",
              placeholder: "Icon (e.g. flame)"
            });
            iconInput.value = btnItem.icon || "";
            iconInput.style.flex = "0 1 100px";
            iconInput.style.minWidth = "70px";
            iconInput.addEventListener("change", async () => {
              btnItem.icon = iconInput.value.trim() || undefined;
              await this.plugin.saveSettings();
            });

            const targetInput = row.createEl("input", {
              type: "text",
              placeholder: "https://... or [[Note]]"
            });
            targetInput.value = btnItem.target || "";
            targetInput.style.flex = "2 1 180px";
            targetInput.style.minWidth = "130px";
            new WikiLinkSuggest(this.app, targetInput);
            targetInput.addEventListener("change", async () => {
              btnItem.target = targetInput.value.trim();
              await this.plugin.saveSettings();
            });

            const delBtn = row.createEl("button", {
              cls: "os-folder-override-reset-btn",
              title: "Remove button"
            });
            setIcon(delBtn, "trash");
            delBtn.addEventListener("click", async () => {
              widget.buttons?.splice(bIdx, 1);
              await this.plugin.saveSettings();
              renderButtonsEditor();
            });
          });

          const addBtnWrap = buttonsContainer.createDiv();
          addBtnWrap.style.marginTop = "6px";
          const addBtn = addBtnWrap.createEl("button", {
            text: "+ Add Button",
            cls: "mod-cta"
          });
          addBtn.style.fontSize = "12px";
          addBtn.style.padding = "4px 10px";
          addBtn.addEventListener("click", async () => {
            if (!widget.buttons) widget.buttons = [];
            widget.buttons.push({
              id: Date.now().toString(),
              label: "New Button",
              target: ""
            });
            await this.plugin.saveSettings();
            renderButtonsEditor();
          });
        };

        renderButtonsEditor();
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
  // 4. CONFIGURE WIDGETS TAB (COLLAPSIBLE SECTIONS)
  // =========================================================================
  private createCollapsibleSection(
    container: HTMLElement,
    title: string,
    icon: string,
    description?: string,
    defaultOpen = false
  ): HTMLElement {
    const isExpanded = this.openSections.has(title) || (defaultOpen && !this.openSections.has(`__closed__${title}`));
    const wrap = container.createDiv({ cls: `os-settings-collapse ${isExpanded ? "is-expanded" : ""}` });

    const header = wrap.createDiv({ cls: "os-settings-collapse-header" });
    const titleLeft = header.createDiv({ cls: "os-settings-collapse-left" });
    const iconSpan = titleLeft.createSpan({ cls: "os-settings-collapse-icon" });
    setIcon(iconSpan, icon);

    const titleGroup = titleLeft.createDiv({ cls: "os-settings-collapse-title-group" });
    titleGroup.createSpan({ cls: "os-settings-collapse-title", text: title });

    if (description) {
      titleGroup.createSpan({ cls: "os-settings-collapse-desc", text: description });
    }

    const chevron = header.createSpan({ cls: "os-settings-collapse-chevron" });
    setIcon(chevron, "chevron-down");

    const content = wrap.createDiv({ cls: "os-settings-collapse-content" });

    header.addEventListener("click", () => {
      const willExpand = !wrap.hasClass("is-expanded");
      wrap.toggleClass("is-expanded", willExpand);
      if (willExpand) {
        this.openSections.add(title);
        this.openSections.delete(`__closed__${title}`);
      } else {
        this.openSections.delete(title);
        this.openSections.add(`__closed__${title}`);
      }
    });

    return content;
  }

  private renderTasksProjectsTab(container: HTMLElement): void {
    const intro = container.createEl("div", { cls: "os-settings-tab-intro" });
    intro.createEl("h3", { text: "Configure Built-in Widgets" });
    intro.createEl("p", {
      text: "Fine-tune file paths, folder targets, frontmatter properties, and limits for each built-in widget.",
      cls: "setting-item-description"
    });

    // 1. Daily & Weekly Task Files
    const tasksContent = this.createCollapsibleSection(
      container,
      "Daily & Weekly Task Files",
      "check-square",
      "Manage daily planning, logs, and weekly task files",
      false
    );

    new Setting(tasksContent)
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

    new Setting(tasksContent)
      .setName("Daily Logs File (What I Did)")
      .setDesc("Path to the file containing what you actually did today (e.g. Daily Logs.md).")
      .addText(text => {
        new FileSuggest(this.app, text.inputEl, async (file) => {
          this.plugin.settings.dailyLogFile = file.path;
          await this.plugin.saveSettings();
        });
        text.setPlaceholder("Daily Logs.md")
          .setValue(this.plugin.settings.dailyLogFile || "")
          .onChange(async (val) => {
            this.plugin.settings.dailyLogFile = val.trim();
            await this.plugin.saveSettings();
          });
      });

    new Setting(tasksContent)
      .setName("Auto-Log Completed Tasks")
      .setDesc("When you check off a planned task in 'What I had to do', automatically append it to your Daily Logs.")
      .addToggle(toggle => {
        toggle.setValue(this.plugin.settings.autoLogToDailyLog ?? true)
          .onChange(async (val) => {
            this.plugin.settings.autoLogToDailyLog = val;
            await this.plugin.saveSettings();
          });
      });

    new Setting(tasksContent)
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

    // 2. Quick Capture
    const qcContent = this.createCollapsibleSection(
      container,
      "Quick Capture",
      "edit-3",
      "Destination folder for quick notes created from dashboard",
      false
    );

    new Setting(qcContent)
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

    // 3. Ongoing Projects
    const projectsContent = this.createCollapsibleSection(
      container,
      "Ongoing Projects",
      "target",
      "Configure folders and frontmatter for active project tracking",
      false
    );

    new Setting(projectsContent)
      .setName("Projects Folder(s)")
      .setDesc("Folders to scan for project notes. Separate multiple folders with commas. If a folder name contains a comma, enclose it in double quotes (e.g. \"03 Projects\", \"Work, Tasks\"). Leave blank to search entire vault.")
      .addText(text => {
        text.setPlaceholder("Leave blank to search entire vault")
          .setValue(this.plugin.settings.projectsFolder)
          .onChange(async (val) => {
            this.plugin.settings.projectsFolder = val.trim();
            await this.plugin.saveSettings();
          });
      });

    new Setting(projectsContent)
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

    new Setting(projectsContent)
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

    new Setting(projectsContent)
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

    // 4. Deadlines Tracker
    const deadlinesContent = this.createCollapsibleSection(
      container,
      "Deadlines Tracker",
      "calendar-clock",
      "Track target dates, remaining time, countdowns, and overdue alerts",
      false
    );

    new Setting(deadlinesContent)
      .setName("Deadlines Folder(s)")
      .setDesc("Folders to scan for notes with deadlines. Separate multiple folders with commas or double quotes (e.g. \"03 Projects\", \"04 Work\"). Leave blank to search entire vault.")
      .addText(text => {
        text.setPlaceholder("Leave blank to search entire vault")
          .setValue(this.plugin.settings.deadlinesFolders || "")
          .onChange(async (val) => {
            this.plugin.settings.deadlinesFolders = val.trim();
            await this.plugin.saveSettings();
          });
      });

    new Setting(deadlinesContent)
      .setName("Deadline Property Name (Target)")
      .setDesc("Frontmatter property holding the target date (e.g. target_completion_date, deadline, due). Notes with this property will show in the Deadline widget.")
      .addText(text => {
        text.setPlaceholder("target_completion_date")
          .setValue(this.plugin.settings.deadlineProp || "target_completion_date")
          .onChange(async (val) => {
            this.plugin.settings.deadlineProp = val.trim() || "target_completion_date";
            await this.plugin.saveSettings();
          });
      });

    new Setting(deadlinesContent)
      .setName("Completion Property (Finished Trigger)")
      .setDesc("When this property is filled with a date or value (e.g. 'completed_date: 2026-10-25' or 'completed_date: true'), the milestone is treated as complete and removed from the widget. Empty means still active.")
      .addText(text => {
        text.setPlaceholder("completed_date")
          .setValue(this.plugin.settings.deadlineCompletedProp || "completed_date")
          .onChange(async (val) => {
            this.plugin.settings.deadlineCompletedProp = val.trim() || "completed_date";
            await this.plugin.saveSettings();
          });
      });

    new Setting(deadlinesContent)
      .setName("Status Property Name (Badge Display)")
      .setDesc("Frontmatter property displayed as the badge tag next to the project title (e.g. 'evolve', 'need-review', 'in-progress'). No need to define status values.")
      .addText(text => {
        text.setPlaceholder("status")
          .setValue(this.plugin.settings.deadlineStatusProp || "status")
          .onChange(async (val) => {
            this.plugin.settings.deadlineStatusProp = val.trim() || "status";
            await this.plugin.saveSettings();
          });
      });

    new Setting(deadlinesContent)
      .setName("Start Date Property (Optional)")
      .setDesc("Frontmatter property for project start date (e.g. start_date, created, started). If omitted, note creation date is used to calculate the circular current/deadline progress gauge.")
      .addText(text => {
        text.setPlaceholder("start_date")
          .setValue(this.plugin.settings.deadlineProgressProp || "start_date")
          .onChange(async (val) => {
            this.plugin.settings.deadlineProgressProp = val.trim() || "start_date";
            await this.plugin.saveSettings();
          });
      });

    // 5. Recent Notes
    const recentContent = this.createCollapsibleSection(
      container,
      "Recent Notes",
      "file-text",
      "Configure limits and excluded directories for recent notes",
      false
    );

    new Setting(recentContent)
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

    new Setting(recentContent)
      .setName("Excluded Folders")
      .setDesc("Comma-separated folders to ignore in Recent Notes (e.g. _attachments, _scripts, _templates, Templates, .trash).")
      .addText(text => {
        text.setPlaceholder("_attachments, _scripts, _templates, Templates, .trash")
          .setValue((this.plugin.settings.recentNotesExcludeFolders || []).join(", "))
          .onChange(async (val) => {
            this.plugin.settings.recentNotesExcludeFolders = val.split(",").map(f => f.trim()).filter(Boolean);
            await this.plugin.saveSettings();
          });
      });

    // 6. Habit Streaks Tracker
    const habitsContent = this.createCollapsibleSection(
      container,
      "Habit Streaks Tracker",
      "flame",
      "Configure habits markdown file, archive path, and auto-freeze streak protection",
      false
    );

    new Setting(habitsContent)
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

    new Setting(habitsContent)
      .setName("Habits Archive File")
      .setDesc("Path to the markdown file where archived habits are moved (e.g. 99 Archive/Habits.md). Created automatically if needed.")
      .addText(text => {
        new FileSuggest(this.app, text.inputEl, async (file) => {
          this.plugin.settings.archiveHabitsFile = file.path;
          await this.plugin.saveSettings();
        });
        text.setPlaceholder("99 Archive/Habits.md")
          .setValue(this.plugin.settings.archiveHabitsFile || "99 Archive/Habits.md")
          .onChange(async (val) => {
            this.plugin.settings.archiveHabitsFile = val.trim() || "99 Archive/Habits.md";
            await this.plugin.saveSettings();
          });
      });

    new Setting(habitsContent)
      .setName("Auto-Freeze Missed Habits")
      .setDesc("Automatically use an available freeze from the habit's quota if you miss completing it, protecting your streak from resetting.")
      .addToggle(toggle => {
        toggle
          .setValue(this.plugin.settings.autoFreezeHabits ?? true)
          .onChange(async (val) => {
            this.plugin.settings.autoFreezeHabits = val;
            await this.plugin.saveSettings();
            if (val) {
              await this.plugin.runAutoFreeze();
            }
          });
      });

    // 7. Calendar & Google Calendar Sync
    const calendarContent = this.createCollapsibleSection(
      container,
      "Calendar & Google Calendar Sync",
      "calendar",
      "Configure local events file, Google Calendar iCal sync, and event reminders",
      false
    );

    new Setting(calendarContent)
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

    const isKeychainSupported = this.plugin.calendarService.isKeychainAvailable();
    const SecretComponentClass = (obsidian as any).SecretComponent;
    const useKeychain = Boolean(
      this.plugin.settings.googleCalendarUseKeychain ||
      (isKeychainSupported && Boolean(this.plugin.settings.googleCalendarSecretId))
    );

    new Setting(calendarContent)
      .setName("Use Obsidian Keychain (SecretStorage)")
      .setDesc(
        isKeychainSupported
          ? "Store your private Google Calendar iCal address securely in Obsidian Keychain instead of plaintext in settings."
          : "Obsidian Keychain (SecretStorage) is supported in Obsidian v1.11.4+. You are currently using direct URL storage."
      )
      .addToggle(toggle => {
        toggle.setValue(useKeychain)
          .setDisabled(!isKeychainSupported)
          .onChange(async (val) => {
            this.plugin.settings.googleCalendarUseKeychain = val;
            await this.plugin.saveSettings();
            this.display();
          });
      });

    if (useKeychain && isKeychainSupported) {
      if (SecretComponentClass) {
        new Setting(calendarContent)
          .setName("Keychain Secret")
          .setDesc("Select an existing secret or click '+' to create a secret containing your Google Calendar .ics URL.")
          .addComponent(cb => {
            const comp = new SecretComponentClass(this.app, cb);
            comp.setValue(this.plugin.settings.googleCalendarSecretId || "")
              .onChange(async (val: string) => {
                this.plugin.settings.googleCalendarSecretId = val;
                await this.plugin.saveSettings();
              });
            return comp;
          })
          .addButton(btn => {
            btn.setButtonText("Sync Events Now")
              .setCta()
              .onClick(async () => {
                const url = this.plugin.calendarService.getCalendarUrl(this.plugin.settings);
                if (!url) {
                  new Notice("No secret selected or secret is empty in Obsidian Keychain.");
                  return;
                }
                btn.setButtonText("Syncing...");
                btn.setDisabled(true);
                try {
                  const events = await this.plugin.calendarService.fetchEvents(url);
                  this.plugin.settings.cachedCalendarEvents = events;
                  this.plugin.settings.lastCalendarSyncTime = Date.now();
                  await this.plugin.saveSettings();
                  new Notice(`✅ Synced ${events.length} Google Calendar event${events.length === 1 ? "" : "s"} from Keychain!`);
                } catch (err: any) {
                  new Notice(`❌ Failed to sync: ${err.message || "Invalid iCal URL or network error"}`);
                } finally {
                  btn.setButtonText("Sync Events Now");
                  btn.setDisabled(false);
                }
              });
          });
      } else {
        new Setting(calendarContent)
          .setName("Keychain Secret Identifier")
          .setDesc("Enter the name of your secret in Obsidian Keychain.")
          .addText(text => {
            text.setPlaceholder("e.g. google-calendar-url")
              .setValue(this.plugin.settings.googleCalendarSecretId || "")
              .onChange(async (val) => {
                this.plugin.settings.googleCalendarSecretId = val.trim();
                await this.plugin.saveSettings();
              });
          })
          .addButton(btn => {
            btn.setButtonText("Sync Events Now")
              .setCta()
              .onClick(async () => {
                const url = this.plugin.calendarService.getCalendarUrl(this.plugin.settings);
                if (!url) {
                  new Notice("No secret configured or secret is empty in Obsidian Keychain.");
                  return;
                }
                btn.setButtonText("Syncing...");
                btn.setDisabled(true);
                try {
                  const events = await this.plugin.calendarService.fetchEvents(url);
                  this.plugin.settings.cachedCalendarEvents = events;
                  this.plugin.settings.lastCalendarSyncTime = Date.now();
                  await this.plugin.saveSettings();
                  new Notice(`✅ Synced ${events.length} Google Calendar event${events.length === 1 ? "" : "s"} from Keychain!`);
                } catch (err: any) {
                  new Notice(`❌ Failed to sync: ${err.message || "Invalid iCal URL or network error"}`);
                } finally {
                  btn.setButtonText("Sync Events Now");
                  btn.setDisabled(false);
                }
              });
          });
      }

      const secretStorage = (this.app as any).secretStorage;
      if (secretStorage && typeof secretStorage.setSecret === "function") {
        let saveUrlInput = "";
        new Setting(calendarContent)
          .setName("Save New URL to Keychain")
          .setDesc("Paste a new Google Calendar .ics URL to store it securely into Keychain as 'google-calendar-url'.")
          .addText(text => {
            text.setPlaceholder("https://calendar.google.com/calendar/ical/.../basic.ics")
              .onChange(val => {
                saveUrlInput = val.trim();
              });
            text.inputEl.style.width = "220px";
          })
          .addButton(btn => {
            btn.setButtonText("Save to Keychain")
              .onClick(async () => {
                if (!saveUrlInput || (!saveUrlInput.startsWith("http://") && !saveUrlInput.startsWith("https://"))) {
                  new Notice("Please enter a valid https:// URL.");
                  return;
                }
                try {
                  await secretStorage.setSecret("google-calendar-url", saveUrlInput);
                  this.plugin.settings.googleCalendarSecretId = "google-calendar-url";
                  this.plugin.settings.googleCalendarUrl = "";
                  await this.plugin.saveSettings();
                  new Notice("✅ Saved Google Calendar URL to Obsidian Keychain!");
                  this.display();
                } catch (err: any) {
                  new Notice(`Failed to save to Keychain: ${err?.message || "Unknown error"}`);
                }
              });
          });
      }
    } else {
      new Setting(calendarContent)
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
              const url = this.plugin.calendarService.getCalendarUrl(this.plugin.settings);
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
    }

    new Setting(calendarContent)
      .setName("Show Connect Banner on Calendar Widget")
      .setDesc("Display the banner prompt to add a Google Calendar address when no address is set.")
      .addToggle(toggle => {
        toggle.setValue(this.plugin.settings.showGoogleCalendarBanner ?? true)
          .onChange(async (val) => {
            this.plugin.settings.showGoogleCalendarBanner = val;
            await this.plugin.saveSettings();
          });
      });

    new Setting(calendarContent)
      .setName("Auto-sync Events in Background")
      .setDesc("Automatically refresh events from Google Calendar every few minutes.")
      .addToggle(toggle => {
        toggle.setValue(this.plugin.settings.googleCalendarAutoSync ?? true)
          .onChange(async (val) => {
            this.plugin.settings.googleCalendarAutoSync = val;
            await this.plugin.saveSettings();
          });
      });

    new Setting(calendarContent)
      .setName("Event Reminders & Notifications")
      .setDesc("Trigger an in-app notice and desktop notification before an event begins.")
      .addToggle(toggle => {
        toggle.setValue(this.plugin.settings.enableCalendarNotifications ?? true)
          .onChange(async (val) => {
            this.plugin.settings.enableCalendarNotifications = val;
            await this.plugin.saveSettings();
          });
      });

    new Setting(calendarContent)
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

    // 8. Companion Rail Quote
    const quoteContent = this.createCollapsibleSection(
      container,
      "Companion Rail Quote",
      "sparkles",
      "Configure inspirational quote text and author for the right rail widget",
      false
    );

    new Setting(quoteContent)
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

    new Setting(quoteContent)
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

    const desc = container.createEl("div", { cls: "setting-item-description" });
    desc.style.marginBottom = "14px";
    desc.style.lineHeight = "1.5";

    const p1 = desc.createEl("p", {
      text: "Drag and drop bookmarks using the grip handle to reorder them. Enter any web URL (https://...) or vault note (type [[ to auto-suggest notes)."
    });
    p1.style.marginBottom = "6px";

    const p2 = desc.createEl("p");
    p2.createSpan({
      text: "Supported Icons: Supports all popular brands (e.g. "
    });
    const brandExamples = ["youtube", "instagram", "facebook", "twitter", "x", "github", "discord", "spotify", "reddit", "linkedin", "tiktok", "whatsapp"];
    brandExamples.forEach((ex, i) => {
      p2.createEl("code", { text: ex });
      if (i < brandExamples.length - 1) p2.createSpan({ text: ", " });
    });
    p2.createSpan({
      text: "), all 1,400+ Lucide icons (browse at "
    });
    const lucideLink = p2.createEl("a", { text: "lucide.dev/icons", href: "https://lucide.dev/icons" });
    lucideLink.setAttr("target", "_blank");
    p2.createSpan({
      text: "), raw SVG markup (<svg ...>...</svg>), and emojis. Entering any valid icon name or SVG code will immediately render a live preview."
    });

    const listContainer = container.createDiv({ cls: "os-settings-bookmarks-list" });
    const links = this.plugin.settings.links || [];

    let draggedIdx: number | null = null;

    links.forEach((link, idx) => {
      const row = listContainer.createDiv({ cls: "os-settings-bookmark-row" });
      row.setAttribute("data-idx", String(idx));

      // Drag handle
      const dragHandle = row.createDiv({ cls: "os-settings-drag-handle" });
      setIcon(dragHandle, "grip-vertical");
      dragHandle.setAttribute("title", "Drag to reorder");

      // Make row draggable
      row.setAttribute("draggable", "true");

      row.addEventListener("dragstart", (e: DragEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest("input, button")) {
          e.preventDefault();
          return;
        }
        draggedIdx = idx;
        row.addClass("is-dragging");
        if (e.dataTransfer) {
          e.dataTransfer.setData("text/plain", String(idx));
          e.dataTransfer.effectAllowed = "move";
        }
      });

      row.addEventListener("dragend", () => {
        row.removeClass("is-dragging");
        listContainer.querySelectorAll(".os-drop-indicator-top, .os-drop-indicator-bottom").forEach(el => {
          el.removeClass("os-drop-indicator-top");
          el.removeClass("os-drop-indicator-bottom");
        });
      });

      row.addEventListener("dragover", (e: DragEvent) => {
        e.preventDefault();
        if (draggedIdx === null || draggedIdx === idx) return;
        if (e.dataTransfer) e.dataTransfer.dropEffect = "move";

        const rect = row.getBoundingClientRect();
        const midY = rect.top + rect.height / 2;
        if (e.clientY < midY) {
          row.addClass("os-drop-indicator-top");
          row.removeClass("os-drop-indicator-bottom");
        } else {
          row.addClass("os-drop-indicator-bottom");
          row.removeClass("os-drop-indicator-top");
        }
      });

      row.addEventListener("dragleave", () => {
        row.removeClass("os-drop-indicator-top");
        row.removeClass("os-drop-indicator-bottom");
      });

      row.addEventListener("drop", async (e: DragEvent) => {
        e.preventDefault();
        row.removeClass("os-drop-indicator-top");
        row.removeClass("os-drop-indicator-bottom");

        if (draggedIdx === null || draggedIdx === idx) return;

        const rect = row.getBoundingClientRect();
        const midY = rect.top + rect.height / 2;
        const insertAfter = e.clientY >= midY;

        const movedItem = links.splice(draggedIdx, 1)[0];
        let targetIdx = idx;
        if (draggedIdx < idx && !insertAfter) {
          targetIdx = idx - 1;
        } else if (draggedIdx > idx && insertAfter) {
          targetIdx = idx + 1;
        }

        links.splice(targetIdx, 0, movedItem);
        this.plugin.settings.links = links;
        await this.plugin.saveSettings();
        this.renderLinksSettings(container);
      });

      // Icon preview badge
      const iconPreview = row.createSpan({ cls: "os-settings-link-icon-preview" });
      const updateIconPreview = (name: string) => {
        this.plugin.iconService.renderAnyIcon(iconPreview, name, "external-link");
      };
      updateIconPreview(link.icon || "external-link");

      // Title input
      const titleInput = row.createEl("input", {
        type: "text",
        placeholder: "Title",
        cls: "os-settings-bookmark-input os-bookmark-title-input"
      });
      titleInput.value = link.title || "";
      titleInput.addEventListener("change", async () => {
        link.title = titleInput.value.trim();
        await this.plugin.saveSettings();
      });

      // URL or note input
      const urlInput = row.createEl("input", {
        type: "text",
        placeholder: "https://... or [[Note]]",
        cls: "os-settings-bookmark-input os-bookmark-url-input"
      });
      urlInput.value = link.url || "";
      new WikiLinkSuggest(this.app, urlInput);
      urlInput.addEventListener("change", async () => {
        link.url = urlInput.value.trim();
        await this.plugin.saveSettings();
      });

      // Icon name input
      const iconInput = row.createEl("input", {
        type: "text",
        placeholder: "Icon (e.g. youtube, globe, bot)",
        cls: "os-settings-bookmark-input os-bookmark-icon-input"
      });
      iconInput.value = link.icon || "";
      iconInput.addEventListener("input", () => {
        updateIconPreview(iconInput.value.trim());
      });
      iconInput.addEventListener("change", async () => {
        link.icon = iconInput.value.trim();
        updateIconPreview(link.icon);
        await this.plugin.saveSettings();
      });

      // Delete button
      const delBtn = row.createEl("button", {
        cls: "os-folder-override-reset-btn os-bookmark-del-btn",
        title: "Delete Bookmark"
      });
      setIcon(delBtn, "trash");
      delBtn.addEventListener("click", async () => {
        this.plugin.settings.links.splice(idx, 1);
        await this.plugin.saveSettings();
        this.renderLinksSettings(container);
      });
    });

    const addBtnWrap = container.createDiv({ cls: "os-settings-add-bookmark-wrap" });
    const addBtn = addBtnWrap.createEl("button", {
      text: "+ Add Bookmark Link",
      cls: "mod-cta"
    });
    addBtn.addEventListener("click", async () => {
      this.plugin.settings.links.push({
        id: Date.now().toString(),
        title: "New Link",
        url: "https://",
        icon: "external-link"
      });
      await this.plugin.saveSettings();
      this.renderLinksSettings(container);
    });
  }
}

