import { App, Component, MarkdownRenderer, setIcon, Notice, TFile, Platform, WorkspaceLeaf, Menu } from "obsidian";
import { OSDashboardSettings, TaskItem, ProjectItem, FolderCard, RecentNoteItem, DashboardLink, CustomWidget, StreakItem, CalendarEventItem, DashboardWidgetLayout, DEFAULT_WIDGET_LAYOUT, moment, hexToRgb } from "../types";
import { NavigationService } from "../services/navigationService";
import { TaskService } from "../services/taskService";
import { RecentNotesService } from "../services/recentNotesService";
import { QuickCaptureService } from "../services/quickCaptureService";
import { ProjectService } from "../services/projectService";
import { QuoteService } from "../services/quoteService";
import { IconService } from "../services/iconService";
import { StreakService } from "../services/streakService";
import { CalendarService } from "../services/calendarService";
import { ScheduleTaskModal } from "../modals/scheduleTaskModal";
import { WikiLinkSuggest } from "../modals/wikiLinkSuggest";
import { OverdueTasksModal } from "../modals/overdueTasksModal";
import { FreezeStreakModal } from "../modals/freezeStreakModal";
import { StreakModal } from "../modals/streakModal";
import { ArchiveOrDeleteStreakModal } from "../modals/archiveOrDeleteStreakModal";
import { HabitDetailsModal } from "../modals/habitDetailsModal";
import { EventModal } from "../modals/eventModal";
import { QuoteModal } from "../modals/quoteModal";

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
  private streakService: StreakService;
  private calendarService: CalendarService;
  private onSaveSettings?: () => Promise<void>;

  private rootContainerEl: HTMLElement | null = null;
  private clockInterval: number | null = null;
  private activeTodayTab: "tasks" | "log" | "overdue" = "tasks";

  private calendarDate = moment();
  private selectedCalendarDate: string = moment().format("YYYY-MM-DD");
  private calendarViewMode: "month" | "agenda" = "month";
  private calendarCardEl: HTMLElement | null = null;
  private streaksCardEl: HTMLElement | null = null;
  private embeddedGraphLeaf: WorkspaceLeaf | null = null;
  private resizeObserver: ResizeObserver | null = null;

  constructor(
    app: App,
    settings: OSDashboardSettings,
    navigationService: NavigationService,
    taskService: TaskService,
    recentNotesService: RecentNotesService,
    quickCaptureService: QuickCaptureService,
    projectService: ProjectService,
    quoteService: QuoteService,
    iconService: IconService,
    streakService?: StreakService,
    calendarService?: CalendarService,
    onSaveSettings?: () => Promise<void>
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
    this.streakService = streakService || new StreakService(app);
    this.calendarService = calendarService || new CalendarService(app);
    this.onSaveSettings = onSaveSettings;
  }

  public updateSettings(settings: OSDashboardSettings) {
    this.settings = settings;
  }

  public destroy() {
    if (this.clockInterval !== null) {
      window.clearInterval(this.clockInterval);
      this.clockInterval = null;
    }
    if (this.embeddedGraphLeaf) {
      try {
        if (this.embeddedGraphLeaf.view) {
          (this.embeddedGraphLeaf.view as any).saveSettings = () => {};
          (this.embeddedGraphLeaf.view as any).saveState = () => {};
          (this.embeddedGraphLeaf.view as any).save = () => {};
        }
        this.embeddedGraphLeaf.detach();
      } catch (e) {}
      this.embeddedGraphLeaf = null;
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }

  public async render(container: HTMLElement): Promise<void> {
    this.rootContainerEl = container;
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

    // Body container with main content on left and side rail on right
    const bodyEl = scrollContainer.createDiv({ cls: "os-dashboard-body" });
    const layoutEl = bodyEl.createDiv({ cls: "os-dashboard-layout" });

    // Left Main Area (Hero + Nav + 3-column Grid)
    const mainEl = layoutEl.createDiv({ cls: "os-dashboard-main" });

    // 1. Hero Banner Section
    if (this.settings.showHeroBanner ?? true) {
      this.renderHero(mainEl);
    }

    // 2. Navigation Ribbon (Folders)
    if (this.settings.showNavRibbon ?? true) {
      await this.renderNavigationRibbon(mainEl);
    }

    // Resolve Dynamic Drag-and-Drop Layout
    const layout = this.getResolvedLayout();

    const isMobileView = Platform.isMobile || Platform.isPhone || (container.clientWidth > 0 && container.clientWidth < 850);

    if (isMobileView) {
      // Mobile: Render row-by-row interleaved widgets across columns and rail
      await this.renderMobileWidgets(mainEl, layout);
    } else {
      // Desktop: Main Dashboard Grid (3 Columns)
      await this.renderMainGrid(mainEl, layout);

      // Right Rail Sidebar (Calendar, Graph view, Streaks, Quote)
      if (this.settings.showRightRail ?? true) {
        const railEl = layoutEl.createDiv({ cls: "os-dashboard-side-rail" });
        await this.renderColumnWidgets(railEl, layout.rail, "rail");
      }
    }

    if (!Platform.isMobile && !Platform.isPhone && typeof ResizeObserver !== "undefined") {
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
    const folderCards = this.navigationService.getFolderCards(this.settings);
    if (folderCards.length === 0) return;

    const wrapper = container.createDiv({ cls: "os-nav-ribbon-wrapper" });

    // Left scroll button
    const leftBtn = wrapper.createEl("button", {
      cls: "os-nav-scroll-btn os-nav-scroll-left is-hidden",
      title: "Scroll left"
    });
    setIcon(leftBtn, "chevron-left");

    // Ribbon container
    const ribbonEl = wrapper.createDiv({ cls: "os-dashboard-nav-ribbon" });

    // Right scroll button
    const rightBtn = wrapper.createEl("button", {
      cls: "os-nav-scroll-btn os-nav-scroll-right is-hidden",
      title: "Scroll right"
    });
    setIcon(rightBtn, "chevron-right");

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

    // Scroll actions
    leftBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      ribbonEl.scrollBy({ left: -240, behavior: "smooth" });
    });

    rightBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      ribbonEl.scrollBy({ left: 240, behavior: "smooth" });
    });

    // Dynamically show/hide buttons based on scroll position and overflow
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

  private async renderMainGrid(container: HTMLElement, layout: DashboardWidgetLayout): Promise<void> {
    const gridEl = container.createDiv({ cls: "os-dashboard-grid" });

    // Column 1
    const col1 = gridEl.createDiv({ cls: "os-dashboard-col" });
    await this.renderColumnWidgets(col1, layout.col1, "col1");

    // Column 2
    const col2 = gridEl.createDiv({ cls: "os-dashboard-col" });
    await this.renderColumnWidgets(col2, layout.col2, "col2");

    // Column 3
    const col3 = gridEl.createDiv({ cls: "os-dashboard-col" });
    await this.renderColumnWidgets(col3, layout.col3, "col3");
  }

  private getInterleavedWidgetList(layout: DashboardWidgetLayout): Array<{ widgetId: string; colName: string }> {
    const result: Array<{ widgetId: string; colName: string }> = [];
    const col1 = layout.col1 || [];
    const col2 = layout.col2 || [];
    const col3 = layout.col3 || [];
    const rail = (this.settings.showRightRail ?? true) ? (layout.rail || []) : [];

    const maxLen = Math.max(col1.length, col2.length, col3.length, rail.length);
    for (let r = 0; r < maxLen; r++) {
      if (col1[r]) result.push({ widgetId: col1[r], colName: "col1" });
      if (col2[r]) result.push({ widgetId: col2[r], colName: "col2" });
      if (col3[r]) result.push({ widgetId: col3[r], colName: "col3" });
      if (rail[r]) result.push({ widgetId: rail[r], colName: "rail" });
    }
    return result;
  }

  private async renderMobileWidgets(container: HTMLElement, layout: DashboardWidgetLayout): Promise<void> {
    const mobileCol = container.createDiv({ cls: "os-dashboard-col os-dashboard-mobile-col" });
    const items = this.getInterleavedWidgetList(layout);

    for (const item of items) {
      const prevCount = mobileCol.childElementCount;
      await this.renderSingleWidget(mobileCol, item.widgetId);
      if (mobileCol.childElementCount > prevCount) {
        const cardEl = mobileCol.lastElementChild as HTMLElement;
        this.attachDragAndDropToCard(cardEl, item.widgetId, item.colName);
      }
    }
  }

  private getResolvedLayout(): DashboardWidgetLayout {
    const raw = this.settings.widgetLayout;
    const defaultCols: DashboardWidgetLayout = {
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

    // Collect all placed widget IDs
    const placed = new Set<string>([...col1, ...col2, ...col3, ...rail]);

    // Ensure built-in widgets are placed if missing
    for (const id of defaultCols.col1) {
      if (!placed.has(id)) { col1.push(id); placed.add(id); }
    }
    for (const id of defaultCols.col2) {
      if (!placed.has(id)) { col2.push(id); placed.add(id); }
    }
    for (const id of defaultCols.col3) {
      if (!placed.has(id)) { col3.push(id); placed.add(id); }
    }
    for (const id of defaultCols.rail) {
      if (!placed.has(id)) { rail.push(id); placed.add(id); }
    }

    // Ensure custom widgets are placed
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

  private async renderColumnWidgets(colEl: HTMLElement, widgetIds: string[], colId: string): Promise<void> {
    this.setupColumnDropZone(colEl, colId);

    let renderedCount = 0;
    for (const widgetId of widgetIds) {
      const prevCount = colEl.childElementCount;
      await this.renderSingleWidget(colEl, widgetId);
      if (colEl.childElementCount > prevCount) {
        const cardEl = colEl.lastElementChild as HTMLElement;
        this.attachDragAndDropToCard(cardEl, widgetId, colId);
        renderedCount++;
      }
    }

    if (renderedCount === 0) {
      const emptyZone = colEl.createDiv({ cls: "os-col-empty-zone" });
      emptyZone.createSpan({ cls: "os-col-empty-text", text: "Drop widget here" });
    }
  }

  private async renderSingleWidget(container: HTMLElement, widgetId: string): Promise<void> {
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
          const widget = (this.settings.customWidgets || []).find(w => w.id === rawId);
          if (widget && (widget.enabled ?? true)) {
            await this.renderCustomWidget(container, widget);
          }
        }
        break;
    }
  }

  private attachDragAndDropToCard(cardEl: HTMLElement, widgetId: string, colId: string): void {
    cardEl.setAttribute("data-widget-id", widgetId);
    cardEl.setAttribute("data-col-id", colId);
    cardEl.setAttribute("draggable", "true");

    const header = cardEl.querySelector(".os-card-header, .os-calendar-header") as HTMLElement;
    if (header) {
      const handle = createDiv({ cls: "os-card-drag-handle" });
      setIcon(handle, "grip-vertical");
      handle.setAttribute("title", "Drag to move widget");

      const left = header.querySelector(".os-card-header-left, .os-calendar-header-left");
      if (left) {
        left.prepend(handle);
      } else {
        header.prepend(handle);
      }
    }

    cardEl.addEventListener("dragstart", (e: DragEvent) => {
      const target = e.target as HTMLElement;
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
      document.querySelectorAll(".os-drop-indicator-top, .os-drop-indicator-bottom, .is-drag-over").forEach(el => {
        el.removeClass("os-drop-indicator-top");
        el.removeClass("os-drop-indicator-bottom");
        el.removeClass("is-drag-over");
      });
    });

    cardEl.addEventListener("dragover", (e: DragEvent) => {
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

    cardEl.addEventListener("drop", async (e: DragEvent) => {
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

  private setupColumnDropZone(colEl: HTMLElement, colId: string): void {
    colEl.setAttribute("data-col-id", colId);

    colEl.addEventListener("dragover", (e: DragEvent) => {
      e.preventDefault();
      if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
      colEl.addClass("is-drag-over");
    });

    colEl.addEventListener("dragleave", (e: DragEvent) => {
      if (!colEl.contains(e.relatedTarget as Node)) {
        colEl.removeClass("is-drag-over");
      }
    });

    colEl.addEventListener("drop", async (e: DragEvent) => {
      e.preventDefault();
      colEl.removeClass("is-drag-over");

      if ((e.target as HTMLElement).closest(".os-dashboard-card")) {
        return;
      }

      const draggedId = e.dataTransfer?.getData("text/plain");
      if (!draggedId) return;

      await this.moveWidget(draggedId, colId, null, false);
    });
  }

  private async moveWidget(draggedId: string, targetColId: string, targetWidgetId: string | null, insertBefore: boolean): Promise<void> {
    const layout = this.getResolvedLayout();

    const colKeys: (keyof DashboardWidgetLayout)[] = ["col1", "col2", "col3", "rail"];
    for (const key of colKeys) {
      layout[key] = layout[key].filter(id => id !== draggedId);
    }

    const targetList = layout[targetColId as keyof DashboardWidgetLayout];
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

  private async renderTodayTasks(container: HTMLElement): Promise<void> {
    const cardEl = container.createDiv({ cls: "os-dashboard-card os-card-tasks os-card-today-tabs" });

    // Main Card Header with switchable Task, Log, and Overdue tabs
    const header = cardEl.createDiv({ cls: "os-card-header os-card-header-tabs" });
    const headerLeft = header.createDiv({ cls: "os-card-header-left os-today-header-left" });
    const iconEl = headerLeft.createSpan({ cls: "os-card-icon" });
    setIcon(iconEl, "check-circle");
    headerLeft.createEl("h3", { text: "Daily" });
    const tabsWrap = headerLeft.createDiv({ cls: "os-today-tab-group" });

    // 1. Task Tab
    const taskTabBtn = tabsWrap.createEl("button", {
      cls: `os-today-tab-btn ${this.activeTodayTab === "tasks" ? "is-active" : ""}`
    });
    taskTabBtn.setAttribute("title", "Tasks");
    taskTabBtn.setAttribute("aria-label", "Tasks");
    const taskIcon = taskTabBtn.createSpan({ cls: "os-today-tab-icon" });
    setIcon(taskIcon, "check-square");
    taskTabBtn.createSpan({ cls: "os-today-tab-label", text: "Task" });
    taskTabBtn.createSpan({ cls: "os-today-tab-count" });

    // 2. Log Tab
    const logTabBtn = tabsWrap.createEl("button", {
      cls: `os-today-tab-btn ${this.activeTodayTab === "log" ? "is-active" : ""}`
    });
    logTabBtn.setAttribute("title", "Daily Log");
    logTabBtn.setAttribute("aria-label", "Daily Log");
    const logIcon = logTabBtn.createSpan({ cls: "os-today-tab-icon" });
    setIcon(logIcon, "clipboard-list");
    logTabBtn.createSpan({ cls: "os-today-tab-label", text: "Log" });
    logTabBtn.createSpan({ cls: "os-today-tab-count" });

    // 3. Overdue Tab
    const overdueTabBtn = tabsWrap.createEl("button", {
      cls: `os-today-tab-btn os-tab-overdue ${this.activeTodayTab === "overdue" ? "is-active" : ""}`
    });
    overdueTabBtn.setAttribute("title", "Overdue Tasks");
    overdueTabBtn.setAttribute("aria-label", "Overdue Tasks");
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
    const habitsFilePath = this.settings.habitsFile || "Habits.md";

    // Auto-populate active, non-frozen streak items into today's tasks
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

  // =========================================================================
  // --- Right Rail Widgets: Calendar, Graph view, Streaks, Quote ---
  // =========================================================================

  private async renderCalendarWidget(container: HTMLElement): Promise<void> {
    const cardEl = container.createDiv({ cls: "os-dashboard-card os-card-calendar" });
    this.calendarCardEl = cardEl;
    await this.renderCalendarContent(cardEl);
  }

  private openEventModal(event: CalendarEventItem | null, targetDate?: string): void {
    new EventModal(
      this.app,
      event,
      targetDate || this.selectedCalendarDate,
      async (savedEvent) => {
        // 1. Save to configured Events.md Markdown file
        const eventsFile = this.settings.calendarEventsFile || "Events.md";
        await this.calendarService.saveEventToMarkdown(eventsFile, savedEvent);

        // 2. Also keep in settings memory for immediate display
        if (!this.settings.localCalendarEvents) {
          this.settings.localCalendarEvents = [];
        }
        const existingIdx = this.settings.localCalendarEvents.findIndex(e => e.id === savedEvent.id);
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
          this.settings.localCalendarEvents = this.settings.localCalendarEvents.filter(e => e.id !== eventId);
          if (this.onSaveSettings) await this.onSaveSettings();
          if (this.calendarCardEl) await this.renderCalendarContent(this.calendarCardEl);
        }
      }
    ).open();
  }

  private async renderCalendarContent(cardEl: HTMLElement): Promise<void> {
    cardEl.empty();

    // 1. Load local events from configured Markdown file (e.g. Events.md)
    const mdEvents = await this.calendarService.getLocalMarkdownEvents(this.settings.calendarEventsFile || "Events.md");

    // 2. Merge with Google Calendar cached events and any in-memory events
    const eventMap = new Map<string, CalendarEventItem>();
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

    // 1. Clean Calendar Header
    const header = cardEl.createDiv({ cls: "os-calendar-header" });

    // Left Title
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

    // Right Actions
    const nav = header.createDiv({ cls: "os-calendar-nav" });

    // Add Event Quick Button (+)
    const addNavBtn = nav.createDiv({
      cls: "os-calendar-nav-btn os-calendar-add-event-btn",
      title: "Add new event"
    });
    setIcon(addNavBtn, "plus");
    addNavBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.openEventModal(null, this.selectedCalendarDate);
    });

    // View Toggle button (Month Grid vs Events List of this month)
    const viewBtn = nav.createDiv({
      cls: "os-calendar-nav-btn",
      title: this.calendarViewMode === "month" ? "Show list of this month's events" : "Show month calendar grid"
    });
    setIcon(viewBtn, this.calendarViewMode === "month" ? "list" : "calendar");
    viewBtn.addEventListener("click", async (e) => {
      e.stopPropagation();
      this.calendarViewMode = this.calendarViewMode === "month" ? "agenda" : "month";
      await this.renderCalendarContent(cardEl);
    });

    // Month Navigation: Previous / Next
    const prevBtn = nav.createDiv({ cls: "os-calendar-nav-btn", title: "Previous month" });
    setIcon(prevBtn, "chevron-left");
    prevBtn.addEventListener("click", async () => {
      this.calendarDate.subtract(1, "month");
      await this.renderCalendarContent(cardEl);
    });

    const nextBtn = nav.createDiv({ cls: "os-calendar-nav-btn", title: "Next month" });
    setIcon(nextBtn, "chevron-right");
    nextBtn.addEventListener("click", async () => {
      this.calendarDate.add(1, "month");
      await this.renderCalendarContent(cardEl);
    });

    // 2. Render Month Grid or Month Events List
    if (this.calendarViewMode === "month") {
      this.renderMonthGrid(cardEl, events);
    } else {
      this.renderMonthEventsList(cardEl, events);
    }

    // 3. Connect Google Calendar Banner if no address set
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
            new Notice(`Synced ${evs.length} events from Google Calendar!`);
            await this.renderCalendarContent(cardEl);
          }).catch(err => {
            new Notice(`Sync error: ${err.message || "Invalid URL"}`);
          });
        }
      });
    }
  }

  private renderMonthGrid(cardEl: HTMLElement, events: CalendarEventItem[]): void {
    const weekdaysRow = cardEl.createDiv({ cls: "os-calendar-weekdays" });
    const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    weekdays.forEach(day => {
      weekdaysRow.createDiv({ cls: "os-calendar-weekday", text: day });
    });

    const daysGrid = cardEl.createDiv({ cls: "os-calendar-grid" });

    const startOfMonth = this.calendarDate.clone().startOf("month");
    const daysInMonth = this.calendarDate.daysInMonth();
    let startDayOfWeek = (startOfMonth.day() + 6) % 7;

    const prevMonth = this.calendarDate.clone().subtract(1, "month");
    const daysInPrevMonth = prevMonth.daysInMonth();
    const todayStr = moment().format("YYYY-MM-DD");

    // Trailing days from previous month
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

    // Days of current month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = this.calendarDate.clone().date(day).format("YYYY-MM-DD");
      const isToday = dateStr === todayStr;
      const isSelected = dateStr === this.selectedCalendarDate;
      const dayEvents = this.calendarService.getEventsForDate(events, dateStr);

      const dayEl = daysGrid.createDiv({
        cls: `os-calendar-day ${isToday ? "is-today" : ""} ${isSelected ? "is-selected" : ""}`
      });

      // Hover title with list of events on this day
      if (dayEvents.length > 0) {
        const eventTitles = dayEvents.map(e => `• ${e.title} (${e.isAllDay ? "All day" : e.startTime})`).join("\n");
        dayEl.setAttribute("title", isToday ? `${dateStr} (Today):\n${eventTitles}\n\nClick to add/edit events` : `${dateStr}:\n${eventTitles}\n\nClick to add/edit events`);
      } else {
        dayEl.setAttribute("title", isToday ? `${dateStr} (Today): Click to add event` : `${dateStr}: Click to add event`);
      }

      const numWrap = dayEl.createDiv({ cls: "os-calendar-day-num-wrap" });
      numWrap.createSpan({ cls: "os-calendar-day-num", text: String(day) });
      if (isToday) {
        const todayIcon = numWrap.createSpan({ cls: "os-calendar-today-icon" });
        setIcon(todayIcon, "sparkle");
        todayIcon.setAttribute("title", "Today");
      }

      // Calendar Event Dots
      if (dayEvents.length > 0) {
        const dotsWrap = dayEl.createDiv({ cls: "os-calendar-event-dots" });
        const maxDots = Math.min(dayEvents.length, 3);
        for (let k = 0; k < maxDots; k++) {
          const dot = dotsWrap.createSpan({ cls: "os-calendar-dot" });
          if (dayEvents[k].color) {
            dot.style.backgroundColor = dayEvents[k].color!;
          }
        }
      }

      dayEl.addEventListener("click", async (e) => {
        // If clicking already selected date or double click, open event modal!
        if (this.selectedCalendarDate === dateStr || e.detail === 2) {
          this.openEventModal(null, dateStr);
        } else {
          this.selectedCalendarDate = dateStr;
          await this.renderCalendarContent(cardEl);
        }
      });
    }

    // Trailing days to fill standard grid
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

  private renderMonthEventsList(cardEl: HTMLElement, events: CalendarEventItem[]): void {
    const listWrap = cardEl.createDiv({ cls: "os-calendar-agenda" });

    // Collect all occurrences in the currently viewed month
    const daysInMonth = this.calendarDate.daysInMonth();
    const monthOccurrences: { dateStr: string; event: CalendarEventItem }[] = [];

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

      // Left Date Badge (e.g. 19 Oct)
      const dateBadge = itemEl.createDiv({ cls: "os-agenda-date-badge" });
      dateBadge.createSpan({ cls: "os-agenda-date-badge-day", text: mom.format("D") });
      dateBadge.createSpan({ cls: "os-agenda-date-badge-month", text: mom.format("MMM") });

      // Vertical Color Accent Bar
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
        setIcon(repSpan, "refresh-cw");
      }

      const timeText = ev.isAllDay ? "All day" : (ev.startTime ? (ev.endTime ? `${ev.startTime} - ${ev.endTime}` : ev.startTime) : "All day");
      topRow.createSpan({ cls: `os-agenda-event-time ${ev.isAllDay ? "is-all-day" : ""}`, text: timeText });

      if (ev.location) {
        const locRow = contentBox.createDiv({ cls: "os-agenda-sub-row" });
        const locIcon = locRow.createSpan({ cls: "os-agenda-icon" });
        setIcon(locIcon, "map-pin");
        locRow.createSpan({ text: ev.location });
      }

      if (ev.description) {
        contentBox.createDiv({ cls: "os-agenda-desc-row", text: ev.description });
      }

      itemEl.addEventListener("click", () => {
        const origEvent = this.settings.localCalendarEvents?.find(x => x.id === ev.id) || ev;
        this.openEventModal(origEvent, item.dateStr);
      });
    }
  }

  private async renderGraphWidget(container: HTMLElement): Promise<void> {
    const cardEl = container.createDiv({ cls: "os-dashboard-card os-card-graph" });

    // Header
    const header = cardEl.createDiv({ cls: "os-card-header" });
    const titleLeft = header.createDiv({ cls: "os-card-header-left" });
    const iconEl = titleLeft.createSpan({ cls: "os-card-icon" });
    setIcon(iconEl, "git-fork");
    titleLeft.createEl("h3", { text: "Graph view" });

    const headerActions = header.createDiv({ cls: "os-card-header-actions" });

    const refreshBtn = headerActions.createDiv({ cls: "os-card-header-btn", title: "Refresh graph view" });
    setIcon(refreshBtn, "refresh-cw");

    const expandBtn = headerActions.createDiv({ cls: "os-card-header-btn", title: "Open Obsidian Graph View" });
    setIcon(expandBtn, "maximize-2");
    expandBtn.addEventListener("click", () => {
      // @ts-ignore
      this.app.commands?.executeCommandById("graph:open");
    });

    const graphBody = cardEl.createDiv({ cls: "os-graph-body" });

    const renderRealGraph = async () => {
      graphBody.empty();

      // Clean up previous embedded leaf if any
      if (this.embeddedGraphLeaf) {
        try {
          if (this.embeddedGraphLeaf.view) {
            (this.embeddedGraphLeaf.view as any).saveSettings = () => {};
            (this.embeddedGraphLeaf.view as any).saveState = () => {};
            (this.embeddedGraphLeaf.view as any).save = () => {};
          }
          this.embeddedGraphLeaf.detach();
        } catch (e) {}
        this.embeddedGraphLeaf = null;
      }

      // Check if Obsidian Core Graph plugin is enabled
      const graphPlugin = (this.app as any).internalPlugins?.getPluginById("graph");
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
              // @ts-ignore
              this.app.setting?.open?.();
              // @ts-ignore
              this.app.setting?.openTabById?.("core-plugins");
            }
          } catch (e) {
            new Notice("Please enable Graph view in Settings > Core plugins.");
          }
        });
        return;
      }

      try {
        // Instantiate Obsidian WorkspaceLeaf for the real graph view
        const leaf = new (WorkspaceLeaf as any)(this.app);
        if (leaf) {
          (leaf as any).parent = (this.app.workspace as any).rootSplit || this.app.workspace.activeLeaf?.parent;

          // Read saved graph configuration (groups, colors, filters) from vault config
          let savedGraphState: any = {};
          try {
            const configDir = (this.app.vault as any).configDir || ".obsidian";
            if (await this.app.vault.adapter.exists(`${configDir}/graph.json`)) {
              const raw = await this.app.vault.adapter.read(`${configDir}/graph.json`);
              if (raw) savedGraphState = JSON.parse(raw);
            }
          } catch (e) {}

          await leaf.setViewState({
            type: "graph",
            state: savedGraphState
          });

          if (leaf.view && leaf.view.containerEl) {
            // Prevent embedded mini graph from overwriting the user's graph.json settings
            (leaf.view as any).saveSettings = () => {};
            (leaf.view as any).saveState = () => {};
            (leaf.view as any).save = () => {};

            this.embeddedGraphLeaf = leaf;
            const embedWrap = graphBody.createDiv({ cls: "os-real-graph-embed" });
            embedWrap.appendChild(leaf.view.containerEl);

            // Hide redundant inner tab header
            const innerHeader = leaf.view.containerEl.querySelector(".view-header");
            if (innerHeader) (innerHeader as HTMLElement).style.display = "none";

            // Trigger canvas resize
            setTimeout(() => {
              try {
                (leaf.view as any)?.onResize?.();
              } catch (e) {}
            }, 100);
            return;
          }
        }
      } catch (err) {
        console.warn("Failed to embed native graph leaf:", err);
      }

      // Fallback message if instantiation fails
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
        // @ts-ignore
        this.app.commands?.executeCommandById("graph:open");
      });
    };

    await renderRealGraph();

    refreshBtn.addEventListener("click", async () => {
      refreshBtn.addClass("is-spinning");
      if (this.embeddedGraphLeaf?.view) {
        try {
          (this.embeddedGraphLeaf.view as any)?.onResize?.();
        } catch (e) {}
      } else {
        await renderRealGraph();
      }
      setTimeout(() => refreshBtn.removeClass("is-spinning"), 600);
    });
  }

  private async refreshStreaksCard(): Promise<void> {
    if (this.streaksCardEl) {
      await this.renderStreaksContent(this.streaksCardEl);
    }
  }

  private async renderStreaksWidget(container: HTMLElement): Promise<void> {
    const cardEl = container.createDiv({ cls: "os-dashboard-card os-card-streaks" });
    this.streaksCardEl = cardEl;
    await this.renderStreaksContent(cardEl);
  }

  private async renderStreaksContent(cardEl: HTMLElement): Promise<void> {
    cardEl.empty();

    const habitsFilePath = this.settings.habitsFile || "Habits.md";
    const archiveFilePath = this.settings.archiveHabitsFile || "99 Archive/Habit.md";
    const maxFreezes = this.settings.maxFreezesPerMonth || 4;

    // Load habits from markdown file
    const streaks = await this.streakService.loadHabits(habitsFilePath, this.settings.streaks || []);
    this.settings.streaks = streaks;

    // Header
    const header = cardEl.createDiv({ cls: "os-card-header" });
    const titleLeft = header.createDiv({ cls: "os-card-header-left" });
    const iconEl = titleLeft.createSpan({ cls: "os-card-icon" });
    setIcon(iconEl, "flame");
    titleLeft.createEl("h3", { text: "Streaks" });

    const headerActions = header.createDiv({ cls: "os-card-header-actions" });
    const addBtn = headerActions.createDiv({ cls: "os-card-header-btn", title: "Add new habit" });
    setIcon(addBtn, "plus");
    addBtn.addEventListener("click", () => {
      new StreakModal(this.app, null, async (newStreak) => {
        streaks.push(newStreak);
        await this.streakService.saveHabits(habitsFilePath, streaks, maxFreezes);
        this.settings.streaks = streaks;
        if (this.onSaveSettings) {
          await this.onSaveSettings();
        } else {
          await this.renderStreaksContent(cardEl);
          const todayCard = document.querySelector(".os-card-today") as HTMLElement;
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
            const todayCard = document.querySelector(".os-card-today") as HTMLElement;
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

      const streakUnit = freq === "weekly"
        ? (streak.currentStreak === 1 ? "wk" : "wks")
        : freq === "monthly"
        ? (streak.currentStreak === 1 ? "mo" : "mos")
        : freq === "yearly"
        ? (streak.currentStreak === 1 ? "yr" : "yrs")
        : (streak.currentStreak === 1 ? "day" : "days");

      const bestUnit = freq === "weekly" ? "weeks" : freq === "monthly" ? "months" : freq === "yearly" ? "years" : "days";

      // Streak row is NOT clickable for toggling (completion happens in Daily Tasks)
      const row = bodyEl.createDiv({
        cls: `os-streak-row ${isDone ? "is-completed" : ""} ${isFrozen ? "is-frozen" : ""}`
      });

      // Best streak & all details strictly shown on hover via tooltip
      const tooltipLines = [
        `Habit: ${streak.name}`,
        ...(streak.description ? [`Description: ${streak.description}`] : []),
        `Frequency: ${freq.charAt(0).toUpperCase() + freq.slice(1)}${freq !== "daily" ? ` (${streak.scheduleType === "fixed" ? "Fixed" : "Flexible"})` : ""}`,
        `Current Streak: ${streak.currentStreak || 0} ${streakUnit}`,
        `Best Streak: ${streak.bestStreak || streak.currentStreak || 0} ${bestUnit}`,
        `Start Date: ${streak.startDate || "Not specified"}`,
        `Created: ${streak.createdDate || "N/A"}`,
        `Freeze Quota: ${usedFreezes} / ${habitMaxFreezes} used (${remainingFreezes} left this ${streak.freezePeriodType || "month"})`,
        isFrozen
          ? `Status: Frozen until ${streak.frozenUntil} (${daysLeft} day${daysLeft === 1 ? "" : "s"} remaining)`
          : (isDone
              ? `Status: Completed for this ${freq === "weekly" ? "week" : freq === "monthly" ? "month" : freq === "yearly" ? "year" : "day"}!`
              : `Status: Pending (${daysRemainingInCycle} day${daysRemainingInCycle === 1 ? "" : "s"} left in cycle)`)
      ];
      row.setAttribute("title", tooltipLines.join("\n"));

      // Click to open Habit Details & Calendar Modal
      row.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
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
              const todayCard = document.querySelector(".os-card-today") as HTMLElement;
              if (todayCard) await this.renderTodayTasksRefresh(todayCard);
            }
          }
        ).open();
      });

      // Right-click context menu
      row.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        const menu = new Menu();

        menu.addItem((item) => {
          item
            .setTitle("View Details & Calendar")
            .setIcon("calendar")
            .onClick(() => {
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
                    const todayCard = document.querySelector(".os-card-today") as HTMLElement;
                    if (todayCard) await this.renderTodayTasksRefresh(todayCard);
                  }
                }
              ).open();
            });
        });

        if (!isDone) {
          menu.addItem((item) => {
            item
              .setTitle("Add to Today's Plan")
              .setIcon("calendar-plus")
              .onClick(async () => {
                const res = await this.streakService.addHabitToToday(this.settings.dailyTasksFile, streak, this.taskService);
                new Notice(res.message);
                if (res.success) {
                  const todayCard = document.querySelector(".os-card-today") as HTMLElement;
                  if (todayCard) await this.renderTodayTasksRefresh(todayCard);
                }
              });
          });
        }

        menu.addItem((item) => {
          item
            .setTitle(isFrozen ? "Manage Freeze" : "Freeze Habit")
            .setIcon("snowflake")
            .onClick(() => {
              new FreezeStreakModal(this.app, streak, this.streakService, habitMaxFreezes, async () => {
                await this.streakService.saveHabits(habitsFilePath, streaks, maxFreezes);
                this.settings.streaks = streaks;
                if (this.onSaveSettings) await this.onSaveSettings();
                await this.renderStreaksContent(cardEl);
                const todayCard = document.querySelector(".os-card-today") as HTMLElement;
                if (todayCard) await this.renderTodayTasksRefresh(todayCard);
              }).open();
            });
        });

        menu.addItem((item) => {
          item
            .setTitle("Edit Habit...")
            .setIcon("pencil")
            .onClick(() => {
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
                  const todayCard = document.querySelector(".os-card-today") as HTMLElement;
                  if (todayCard) await this.renderTodayTasksRefresh(todayCard);
                }
              }).open();
            });
        });

        menu.addItem((item) => {
          item
            .setTitle("Archive or Delete...")
            .setIcon("trash-2")
            .onClick(() => {
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
                    const todayCard = document.querySelector(".os-card-today") as HTMLElement;
                    if (todayCard) await this.renderTodayTasksRefresh(todayCard);
                  }
                },
                async () => {
                  await this.streakService.deleteHabit(habitsFilePath, streak.id, this.settings);
                  if (this.onSaveSettings) {
                    await this.onSaveSettings();
                  } else {
                    await this.renderStreaksContent(cardEl);
                    const todayCard = document.querySelector(".os-card-today") as HTMLElement;
                    if (todayCard) await this.renderTodayTasksRefresh(todayCard);
                  }
                }
              ).open();
            });
        });

        menu.showAtMouseEvent(e);
      });

      // Habit Icon
      const habitIcon = row.createSpan({ cls: "os-streak-habit-icon" });
      setIcon(habitIcon, streak.icon || "flame");

      // Habit Name
      row.createSpan({ cls: "os-streak-name", text: streak.name });

      // Right Pill: Streak Count, Cycle Countdown, or Frozen status
      const rightWrap = row.createDiv({ cls: "os-streak-right" });

      if (isFrozen) {
        const freezePill = rightWrap.createSpan({
          cls: "os-streak-frozen-pill",
          text: `❄️ ${daysLeft}d left`
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
              const todayCard = document.querySelector(".os-card-today") as HTMLElement;
              if (todayCard) await this.renderTodayTasksRefresh(todayCard);
            }
          }).open();
        });
      } else if (freq === "weekly" || freq === "monthly" || freq === "yearly") {
        if (isDone) {
          rightWrap.createSpan({
            cls: "os-streak-count is-done-today",
            text: `✓ Done (${streak.currentStreak || 0} ${streakUnit})`
          });
        } else {
          // Cycle countdown badge
          const cyclePill = rightWrap.createSpan({
            cls: "os-streak-cycle-pill",
            text: `⏳ ${daysRemainingInCycle}d left`
          });
          cyclePill.setAttribute("title", `Due before cycle ends. Current streak: ${streak.currentStreak || 0} ${streakUnit}`);
        }
      } else {
        // Daily
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

  private renderRightQuoteWidget(container: HTMLElement): void {
    const cardEl = container.createDiv({ cls: "os-dashboard-card os-card-right-quote" });

    // Header
    const header = cardEl.createDiv({ cls: "os-card-header" });
    const titleLeft = header.createDiv({ cls: "os-card-header-left" });
    const iconEl = titleLeft.createSpan({ cls: "os-card-icon" });
    setIcon(iconEl, "sparkles");
    titleLeft.createEl("h3", { text: "Quote" });

    const headerActions = header.createDiv({ cls: "os-card-header-actions" });
    const editBtn = headerActions.createDiv({ cls: "os-card-header-btn", title: "Edit quote" });
    setIcon(editBtn, "pencil");

    const quoteText = this.settings.rightRailQuote || "“Consistency is more important than intensity.”";
    const bodyEl = cardEl.createDiv({ cls: "os-right-quote-body" });
    const quoteEl = bodyEl.createEl("blockquote", { cls: "os-right-quote-text", text: quoteText });

    if (this.settings.rightRailQuoteAuthor) {
      bodyEl.createDiv({ cls: "os-right-quote-author", text: `— ${this.settings.rightRailQuoteAuthor}` });
    }

    const openEditModal = () => {
      new QuoteModal(
        this.app,
        this.settings.rightRailQuote || "“Consistency is more important than intensity.”",
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
}

