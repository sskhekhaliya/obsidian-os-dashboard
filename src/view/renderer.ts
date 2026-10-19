import { App, Component, MarkdownRenderer, setIcon, Notice, TFile, Platform } from "obsidian";
import { OSDashboardSettings, TaskItem, ProjectItem, FolderCard, RecentNoteItem, DashboardLink, CustomWidget, moment, hexToRgb } from "../types";
import { NavigationService } from "../services/navigationService";
import { TaskService } from "../services/taskService";
import { RecentNotesService } from "../services/recentNotesService";
import { QuickCaptureService } from "../services/quickCaptureService";
import { ProjectService } from "../services/projectService";
import { QuoteService } from "../services/quoteService";
import { IconService } from "../services/iconService";
import { ScheduleTaskModal } from "../modals/scheduleTaskModal";
import { WikiLinkSuggest } from "../modals/wikiLinkSuggest";
import { OverdueTasksModal } from "../modals/overdueTasksModal";

export class DashboardRenderer extends Component {
  private app: App;
  private settings: OSDashboardSettings;
  private navigationService: NavigationService;
  private taskService: TaskService;
  private recentNotesService: RecentNotesService;
  private quickCaptureService: QuickCaptureService;
  private projectService: ProjectService;
  private quoteService: QuoteService;
  private iconService: IconService;

  private clockInterval: number | null = null;
  private activeTodayTab: "tasks" | "log" | "overdue" = "tasks";

  constructor(
    app: App,
    settings: OSDashboardSettings,
    navigationService: NavigationService,
    taskService: TaskService,
    recentNotesService: RecentNotesService,
    quickCaptureService: QuickCaptureService,
    projectService: ProjectService,
    quoteService: QuoteService,
    iconService: IconService
  ) {
    super();
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

  public updateSettings(settings: OSDashboardSettings) {
    this.settings = settings;
  }

  public destroy() {
    if (this.clockInterval !== null) {
      window.clearInterval(this.clockInterval);
      this.clockInterval = null;
    }
  }

  public async render(container: HTMLElement): Promise<void> {
    this.destroy();
    container.empty();
    container.addClass("os-dashboard-root");

    const scrollContainer = container.createDiv({ cls: "os-dashboard-container" });

    // Delegated link click handler for internal wikilinks and external links across the dashboard
    scrollContainer.addEventListener("click", async (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const internalLink = target.closest("a.internal-link") as HTMLElement | null;
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

      const externalLink = target.closest("a.external-link") as HTMLAnchorElement | null;
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

    // Delegated hover preview for internal wikilinks
    scrollContainer.addEventListener("mouseover", (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const internalLink = target.closest("a.internal-link") as HTMLElement | null;
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

    // 1. Hero Banner Section (full-width edge-to-edge)
    if (this.settings.showHeroBanner ?? true) {
      this.renderHero(scrollContainer);
    }

    // Body container for navigation ribbon and grid
    const bodyEl = scrollContainer.createDiv({ cls: "os-dashboard-body" });

    // 2. Navigation Ribbon (Folders)
    if (this.settings.showNavRibbon ?? true) {
      await this.renderNavigationRibbon(bodyEl);
    }

    // 3. Main Dashboard Grid (3 Columns)
    await this.renderMainGrid(bodyEl);
  }

  private renderHero(container: HTMLElement): void {
    const heroEl = container.createDiv({ cls: "os-dashboard-hero" });

    // Background banner
    let bannerUrl = "";
    if (this.settings.bannerPath) {
      if (this.settings.bannerPath.startsWith("http://") || this.settings.bannerPath.startsWith("https://")) {
        bannerUrl = this.settings.bannerPath;
      } else {
        const bannerFile = this.app.vault.getAbstractFileByPath(this.settings.bannerPath);
        if (bannerFile instanceof TFile) {
          bannerUrl = this.app.vault.getResourcePath(bannerFile);
        }
      }
    }

    if (bannerUrl) {
      heroEl.style.backgroundImage = `linear-gradient(180deg, rgba(13, 17, 23, 0.3) 0%, rgba(13, 17, 23, 0.85) 70%, rgba(13, 17, 23, 1) 100%), url("${bannerUrl}")`;
    }

    // Top Right Quote
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

    // Hero Main Content (Flex bottom)
    const heroContent = heroEl.createDiv({ cls: "os-dashboard-hero-content" });

    // Left Identity & Motto
    const identityBox = heroContent.createDiv({ cls: "os-dashboard-identity" });
    const headerRow = identityBox.createDiv({ cls: "os-dashboard-header-row" });

    const avatarBox = headerRow.createDiv({ cls: "os-dashboard-avatar" });
    setIcon(avatarBox, this.settings.vaultAvatarIcon || "home");

    const titleGroup = headerRow.createDiv({ cls: "os-dashboard-title-group" });
    titleGroup.createEl("h1", { cls: "os-dashboard-title", text: this.settings.vaultTitle || "SSK_OS" });
    titleGroup.createDiv({ cls: "os-dashboard-subtitle", text: this.settings.vaultSubtitle || "Think • Learn • Build • Create • Grow" });

    // Main Quote Callout
    const mainQuote = this.quoteService.getMainQuote(this.settings);
    if (mainQuote) {
      const quoteCard = identityBox.createDiv({ cls: "os-dashboard-quote-card" });
      quoteCard.createSpan({ text: mainQuote });
    }

    // Right Clock & Date Card
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
    this.clockInterval = window.setInterval(updateClock, 1000);

    const clockSubLines = (this.settings.clockSubtitle || "Small steps every day\nlead to big results.").split("\n");
    clockSubLines.forEach(l => clockSub.createDiv({ text: l }));
  }

  private async renderNavigationRibbon(container: HTMLElement): Promise<void> {
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

  private async renderMainGrid(container: HTMLElement): Promise<void> {
    const gridEl = container.createDiv({ cls: "os-dashboard-grid" });

    // Column 1: Today, Weekly Tasks, & Custom Col 1 Widgets
    const col1 = gridEl.createDiv({ cls: "os-dashboard-col" });
    if (this.settings.showTodayTasks ?? true) {
      await this.renderTodayTasks(col1);
    }
    if (this.settings.showWeeklyTasks ?? true) {
      await this.renderWeeklyTasks(col1);
    }
    await this.renderCustomWidgetsForColumn(col1, 1);

    // Column 2: Recent Notes, Quick Capture, & Custom Col 2 Widgets
    const col2 = gridEl.createDiv({ cls: "os-dashboard-col" });
    if (this.settings.showRecentNotes ?? true) {
      await this.renderRecentNotes(col2);
    }
    if (this.settings.showQuickCapture ?? true) {
      this.renderQuickCapture(col2);
    }
    await this.renderCustomWidgetsForColumn(col2, 2);

    // Column 3: Ongoing Projects, Links, & Custom Col 3 Widgets
    const col3 = gridEl.createDiv({ cls: "os-dashboard-col" });
    if (this.settings.showOngoingProjects ?? true) {
      await this.renderOngoingProjects(col3);
    }
    if (this.settings.showBookmarks ?? true) {
      this.renderLinksWidget(col3);
    }
    await this.renderCustomWidgetsForColumn(col3, 3);

    // Clean up empty column containers so layout dynamically reflows
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

  private async renderTodayTasks(container: HTMLElement): Promise<void> {
    const cardEl = container.createDiv({ cls: "os-dashboard-card os-card-tasks os-card-today-tabs" });

    // Main Card Header with switchable Task, Log, and Overdue tabs
    const header = cardEl.createDiv({ cls: "os-card-header os-card-header-tabs" });
    const tabsWrap = header.createDiv({ cls: "os-today-tab-group" });

    // 1. Task Tab
    const taskTabBtn = tabsWrap.createEl("button", {
      cls: `os-today-tab-btn ${this.activeTodayTab === "tasks" ? "is-active" : ""}`
    });
    const taskIcon = taskTabBtn.createSpan({ cls: "os-today-tab-icon" });
    setIcon(taskIcon, "check-square");
    taskTabBtn.createSpan({ cls: "os-today-tab-label", text: "Task" });
    taskTabBtn.createSpan({ cls: "os-today-tab-count" });

    // 2. Log Tab
    const logTabBtn = tabsWrap.createEl("button", {
      cls: `os-today-tab-btn ${this.activeTodayTab === "log" ? "is-active" : ""}`
    });
    const logIcon = logTabBtn.createSpan({ cls: "os-today-tab-icon" });
    setIcon(logIcon, "clipboard-list");
    logTabBtn.createSpan({ cls: "os-today-tab-label", text: "Log" });
    logTabBtn.createSpan({ cls: "os-today-tab-count" });

    // 3. Overdue Tab
    const overdueTabBtn = tabsWrap.createEl("button", {
      cls: `os-today-tab-btn os-tab-overdue ${this.activeTodayTab === "overdue" ? "is-active" : ""}`
    });
    const overdueIcon = overdueTabBtn.createSpan({ cls: "os-today-tab-icon" });
    setIcon(overdueIcon, "history");
    overdueTabBtn.createSpan({ cls: "os-today-tab-label", text: "Overdue" });
    overdueTabBtn.createSpan({ cls: "os-today-tab-count is-overdue" });

    // Header Right Actions (Schedule Task Button)
    const headerRight = header.createDiv({ cls: "os-card-header-right" });
    const scheduleBtn = headerRight.createDiv({ cls: "os-card-header-btn" });
    setIcon(scheduleBtn, "calendar-plus");
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

    // Content container holding the active tab's view
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

  private async renderTodayTasksContent(bodyEl: HTMLElement, cardEl: HTMLElement): Promise<void> {
    bodyEl.empty();

    const planFilePath = this.settings.dailyTasksFile;
    const logFilePath = this.settings.dailyLogFile || "Daily Log.md";

    const [planTasks, logTasks, overdueTasks] = await Promise.all([
      this.taskService.getTodayTasks(planFilePath),
      this.taskService.getTodayTasks(logFilePath),
      this.taskService.getOverdueTasks(planFilePath)
    ]);

    const openPlanCount = planTasks.filter(t => !t.completed).length;
    const completedLogCount = logTasks.length;
    const overdueCount = overdueTasks.length;

    // Update tab badges in the header
    const tabBtns = cardEl.querySelectorAll(".os-today-tab-btn");
    const taskBadge = tabBtns[0]?.querySelector(".os-today-tab-count");
    if (taskBadge) {
      taskBadge.textContent = openPlanCount > 0 ? `${openPlanCount}` : (planTasks.length > 0 ? "✓" : "0");
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
      // --- Tab 1: Task (What I had to do) ---
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
                logFilePath: logFilePath
              });
              await this.renderTodayTasksRefresh(cardEl);
            },
            async (newText: string) => {
              await this.taskService.updateTask(task.sourceFile, task.lineNumber, newText, {
                autoLog: this.settings.autoLogToDailyLog ?? true,
                logFilePath: logFilePath
              });
              await this.renderTodayTasksRefresh(cardEl);
            },
            async () => {
              await this.taskService.deleteTask(task.sourceFile, task.lineNumber, {
                autoLog: this.settings.autoLogToDailyLog ?? true,
                logFilePath: logFilePath
              });
              await this.renderTodayTasksRefresh(cardEl);
            }
          );
        }
      }

      // Add to Plan input
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
      // --- Tab 2: Log (What I did today) ---
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
              // If unchecking from Log, also uncheck in Daily Tasks
              await this.taskService.uncheckPlannedTaskMatching(planFilePath, task.text);
              await this.renderTodayTasksRefresh(cardEl);
            },
            async (newText: string) => {
              const oldText = task.text;
              await this.taskService.updateTask(task.sourceFile, task.lineNumber, newText);
              // Backward sync: update matching item in Daily Tasks
              await this.taskService.updatePlannedTaskMatching(planFilePath, oldText, newText);
              await this.renderTodayTasksRefresh(cardEl);
            },
            async () => {
              await this.taskService.deleteTask(task.sourceFile, task.lineNumber);
              // Backward sync: uncheck the matching item in Daily Tasks since it is no longer logged as done
              await this.taskService.uncheckPlannedTaskMatching(planFilePath, task.text);
              await this.renderTodayTasksRefresh(cardEl);
            }
          );
        }
      }

      // Quick-Log Input (What I did)
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
      // --- Tab 3: Overdue (Unfinished past tasks) ---
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

          // Checkbox (marks complete in past note)
          const checkWrap = row.createDiv({ cls: "os-task-checkbox" });
          setIcon(checkWrap, "square");
          checkWrap.addEventListener("click", async (e) => {
            e.stopPropagation();
            await this.taskService.toggleTask(task.sourceFile, task.lineNumber);
            await this.renderTodayTasksRefresh(cardEl);
          });

          // Content Wrap
          const contentWrap = row.createDiv({ cls: "os-task-content-wrap" });
          const textEl = contentWrap.createSpan({ cls: "os-task-text" });
          MarkdownRenderer.renderMarkdown(task.text, textEl, task.sourceFile, this);

          textEl.addEventListener("click", async (e) => {
            const target = e.target as HTMLElement;
            const internalLink = target.closest("a.internal-link") as HTMLElement | null;
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

            const externalLink = target.closest("a.external-link") as HTMLAnchorElement | null;
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

          // Original date badge (e.g. 2026-10-17)
          if (task.dateHeading) {
            contentWrap.createSpan({ cls: "os-overdue-date-pill", text: task.dateHeading });
          }

          // Move to today button
          const moveBtn = row.createEl("button", {
            cls: "os-move-task-btn",
            text: "→ Today",
            title: "Move to today's plan"
          });
          moveBtn.addEventListener("click", async (e) => {
            e.stopPropagation();
            await this.taskService.moveTaskToToday(task.sourceFile, task.lineNumber, task.text);
            await this.renderTodayTasksRefresh(cardEl);
          });

          // Delete button
          const delBtn = row.createDiv({ cls: "os-task-action-btn is-delete", title: "Delete task" });
          setIcon(delBtn, "trash-2");
          delBtn.addEventListener("click", async (e) => {
            e.stopPropagation();
            await this.taskService.deleteTask(task.sourceFile, task.lineNumber);
            await this.renderTodayTasksRefresh(cardEl);
          });
        }
      }
    }
  }

  private async renderTodayTasksRefresh(cardEl: HTMLElement): Promise<void> {
    const bodyEl = cardEl.querySelector(".os-today-tab-body") as HTMLElement;
    if (!bodyEl) return;
    await this.renderTodayTasksContent(bodyEl, cardEl);
  }

  private async renderWeeklyTasks(container: HTMLElement): Promise<void> {
    const cardEl = container.createDiv({ cls: "os-dashboard-card os-card-tasks" });

    const header = cardEl.createDiv({ cls: "os-card-header" });
    const titleLeft = header.createDiv({ cls: "os-card-header-left" });
    const iconEl = titleLeft.createSpan({ cls: "os-card-icon" });
    setIcon(iconEl, "calendar");
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

  private async renderWeeklyTasksRefresh(cardEl: HTMLElement): Promise<void> {
    const listEl = cardEl.querySelector(".os-task-list") as HTMLElement;
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

  private renderTaskRow(
    container: HTMLElement,
    task: TaskItem,
    onToggle: () => Promise<void>,
    onUpdate?: (newText: string) => Promise<void>,
    onDelete?: () => Promise<void>
  ): void {
    const row = container.createDiv({ cls: `os-task-row ${task.completed ? "is-completed" : ""}` });
    row.setAttribute("data-source-file", task.sourceFile);

    const checkWrap = row.createDiv({ cls: "os-task-checkbox" });
    if (task.completed) {
      setIcon(checkWrap, "check-square");
    } else {
      setIcon(checkWrap, "square");
    }

    checkWrap.addEventListener("click", async (e) => {
      e.stopPropagation();
      await onToggle();
    });

    // Content container (text or edit input)
    const contentWrap = row.createDiv({ cls: "os-task-content-wrap" });

    // Render formatted markdown/wikilinks nicely inside textEl
    const textEl = contentWrap.createSpan({ cls: "os-task-text" });
    MarkdownRenderer.renderMarkdown(task.text, textEl, task.sourceFile, this);

    // Clicking anywhere in textEl (navigates if link, otherwise toggles task)
    textEl.addEventListener("click", async (e) => {
      const target = e.target as HTMLElement;
      const internalLink = target.closest("a.internal-link") as HTMLElement | null;
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

      const externalLink = target.closest("a.external-link") as HTMLAnchorElement | null;
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

    // Action buttons container (appears on row hover or touch on mobile)
    const actionsWrap = row.createDiv({ cls: "os-task-actions" });

    // Edit button
    if (onUpdate) {
      const editBtn = actionsWrap.createDiv({ cls: "os-task-action-btn", title: "Edit task" });
      setIcon(editBtn, "pencil");
      editBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.startEditingTask(row, contentWrap, task.text, onUpdate, () => {
          // Re-render row content on cancel
          contentWrap.empty();
          const restoredText = contentWrap.createSpan({ cls: "os-task-text" });
          MarkdownRenderer.renderMarkdown(task.text, restoredText, task.sourceFile, this);
          restoredText.addEventListener("click", async (ev) => {
            const target = ev.target as HTMLElement;
            const internalLink = target.closest("a.internal-link") as HTMLElement | null;
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

            const externalLink = target.closest("a.external-link") as HTMLAnchorElement | null;
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

    // Delete button
    if (onDelete) {
      const deleteBtn = actionsWrap.createDiv({ cls: "os-task-action-btn is-delete", title: "Delete task" });
      setIcon(deleteBtn, "trash-2");
      deleteBtn.addEventListener("click", async (e) => {
        e.stopPropagation();
        await onDelete();
      });
    }
  }

  private startEditingTask(
    row: HTMLElement,
    contentWrap: HTMLElement,
    initialText: string,
    onSave: (newText: string) => Promise<void>,
    onCancel: () => void
  ): void {
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

  private async renderRecentNotes(container: HTMLElement): Promise<void> {
    const cardEl = container.createDiv({ cls: "os-dashboard-card os-card-recent" });

    const header = cardEl.createDiv({ cls: "os-card-header" });
    const titleLeft = header.createDiv({ cls: "os-card-header-left" });
    const iconEl = titleLeft.createSpan({ cls: "os-card-icon" });
    setIcon(iconEl, "file-text");
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

  private renderQuickCapture(container: HTMLElement): void {
    const cardEl = container.createDiv({ cls: "os-dashboard-card os-card-capture" });

    const header = cardEl.createDiv({ cls: "os-card-header" });
    const titleLeft = header.createDiv({ cls: "os-card-header-left" });
    const iconEl = titleLeft.createSpan({ cls: "os-card-icon" });
    setIcon(iconEl, "edit-3");
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

  private async renderOngoingProjects(container: HTMLElement): Promise<void> {
    const cardEl = container.createDiv({ cls: "os-dashboard-card os-card-projects" });

    const header = cardEl.createDiv({ cls: "os-card-header" });
    const titleLeft = header.createDiv({ cls: "os-card-header-left" });
    const iconEl = titleLeft.createSpan({ cls: "os-card-icon" });
    setIcon(iconEl, "target");
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

  private renderLinksWidget(container: HTMLElement): void {
    const cardEl = container.createDiv({ cls: "os-dashboard-card os-card-links" });

    const header = cardEl.createDiv({ cls: "os-card-header" });
    const titleLeft = header.createDiv({ cls: "os-card-header-left" });
    const iconEl = titleLeft.createSpan({ cls: "os-card-icon" });
    setIcon(iconEl, "link-2");
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
      setIcon(iconWrap, link.icon || "external-link");

      item.createSpan({ cls: "os-link-title", text: link.title });

      item.addEventListener("click", () => {
        if (link.url.startsWith("http://") || link.url.startsWith("https://")) {
          window.open(link.url, "_blank");
        } else {
          // Open internal vault note
          const file = this.app.metadataCache.getFirstLinkpathDest(link.url, "");
          if (file instanceof TFile) {
            this.app.workspace.getLeaf(false).openFile(file);
          } else {
            new Notice(`Note not found: ${link.url}`);
          }
        }
      });
    }
  }

  private async renderCustomWidgetsForColumn(container: HTMLElement, colIndex: 1 | 2 | 3): Promise<void> {
    const customWidgets = (this.settings.customWidgets || []).filter(w => (w.enabled ?? true) && (Number(w.column) || 1) === colIndex);
    for (const widget of customWidgets) {
      await this.renderCustomWidget(container, widget);
    }
  }

  private async renderCustomWidget(container: HTMLElement, widget: CustomWidget): Promise<void> {
    const cardEl = container.createDiv({ cls: "os-dashboard-card os-card-custom" });

    const header = cardEl.createDiv({ cls: "os-card-header" });
    const titleLeft = header.createDiv({ cls: "os-card-header-left" });
    const iconEl = titleLeft.createSpan({ cls: "os-card-icon" });
    setIcon(iconEl, widget.icon || "sparkles");
    titleLeft.createEl("h3", { text: widget.title || "Custom Widget" });

    if (widget.type === "markdown-note") {
      const file = this.app.metadataCache.getFirstLinkpathDest(widget.content, "");
      if (file instanceof TFile) {
        cardEl.setAttribute("data-source-file", file.path);
        const openBtn = header.createDiv({ cls: "os-card-header-btn" });
        setIcon(openBtn, "external-link");
        openBtn.setAttribute("title", "Open note");
        openBtn.addEventListener("click", () => {
          this.app.workspace.getLeaf(false).openFile(file);
        });

        const bodyEl = cardEl.createDiv({ cls: "os-custom-note-body" });
        try {
          const content = await this.app.vault.read(file);
          await MarkdownRenderer.render(this.app, content, bodyEl, file.path, this);
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
        await MarkdownRenderer.render(this.app, widget.content, bodyEl, "", this);
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
          if (file instanceof TFile) {
            this.app.workspace.getLeaf(false).openFile(file);
          } else {
            new Notice(`Note not found: ${widget.content}`);
          }
        }
      });
    }
  }
}
