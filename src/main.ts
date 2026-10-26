import { Plugin, WorkspaceLeaf, Notice } from "obsidian";
import { OSDashboardSettings, DEFAULT_SETTINGS } from "./types";
import { OSDashboardSettingTab } from "./settings";
import { OSDashboardView, VIEW_TYPE_OS_DASHBOARD } from "./view/osDashboardView";
import { IconService } from "./services/iconService";
import { NavigationService } from "./services/navigationService";
import { TaskService } from "./services/taskService";
import { RecentNotesService } from "./services/recentNotesService";
import { QuickCaptureService } from "./services/quickCaptureService";
import { ProjectService } from "./services/projectService";
import { DeadlineService } from "./services/deadlineService";
import { QuoteService } from "./services/quoteService";
import { StreakService } from "./services/streakService";
import { CalendarService } from "./services/calendarService";
import { DashboardRenderer } from "./view/renderer";

export default class OSDashboardPlugin extends Plugin {
  public settings: OSDashboardSettings = DEFAULT_SETTINGS;

  public iconService!: IconService;
  public navigationService!: NavigationService;
  public taskService!: TaskService;
  public recentNotesService!: RecentNotesService;
  public quickCaptureService!: QuickCaptureService;
  public projectService!: ProjectService;
  public deadlineService!: DeadlineService;
  public quoteService!: QuoteService;
  public streakService!: StreakService;
  public calendarService!: CalendarService;

  public async onload(): Promise<void> {
    await this.loadSettings();

    // Initialize Services
    this.iconService = new IconService(this.app);
    this.navigationService = new NavigationService(this.app, this.iconService);
    this.taskService = new TaskService(this.app);
    this.recentNotesService = new RecentNotesService(this.app, this.iconService);
    this.quickCaptureService = new QuickCaptureService(this.app);
    this.projectService = new ProjectService(this.app, this.iconService);
    this.deadlineService = new DeadlineService(this.app, this.iconService);
    this.quoteService = new QuoteService(this.app);
    this.streakService = new StreakService(this.app);
    this.calendarService = new CalendarService(this.app);

    // Initial background calendar sync & notification check if URL is configured
    const initialCalUrl = this.calendarService.getCalendarUrl(this.settings);
    if (initialCalUrl) {
      this.calendarService.fetchEvents(initialCalUrl).then(events => {
        this.settings.cachedCalendarEvents = events;
        this.settings.lastCalendarSyncTime = Date.now();
        if (this.settings.enableCalendarNotifications) {
          this.calendarService.checkUpcomingEventNotifications(events, this.settings.calendarNotificationLeadMinutes || 10);
        }
      }).catch(err => {
        console.warn("[OS Dashboard] Could not auto-sync Google Calendar on startup:", err);
      });
    }

    // Periodic calendar sync & notification interval (checks every 60 seconds)
    this.registerInterval(
      window.setInterval(async () => {
        const calUrl = this.calendarService.getCalendarUrl(this.settings);
        if (calUrl && this.settings.googleCalendarAutoSync) {
          try {
            const events = await this.calendarService.fetchEvents(calUrl);
            this.settings.cachedCalendarEvents = events;
            this.settings.lastCalendarSyncTime = Date.now();
          } catch (e) {}
        }

        if (this.settings.enableCalendarNotifications) {
          const mdEvents = await this.calendarService.getLocalMarkdownEvents(this.settings.calendarEventsFile || "Events.md");
          const allEvents = [
            ...(this.settings.cachedCalendarEvents || []),
            ...(this.settings.localCalendarEvents || []),
            ...mdEvents
          ];
          this.calendarService.checkUpcomingEventNotifications(allEvents, this.settings.calendarNotificationLeadMinutes || 10);
        }

        // Periodic auto-freeze check for missed habits
        if (this.settings.autoFreezeHabits) {
          try {
            await this.runAutoFreeze();
          } catch (e) {}
        }
      }, 60 * 1000)
    );

    // Register Custom View
    this.registerView(
      VIEW_TYPE_OS_DASHBOARD,
      (leaf: WorkspaceLeaf) => new OSDashboardView(leaf, this)
    );

    // Ribbon Icon
    this.addRibbonIcon("layout-dashboard", "Open OS Dashboard", () => {
      this.activateView();
    });

    // Command
    this.addCommand({
      id: "open-os-dashboard",
      name: "Open OS Dashboard",
      callback: () => {
        this.activateView();
      }
    });

    // Codeblock processor: ```os-dashboard
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
        this.deadlineService,
        () => this.saveSettings()
      );
      await renderer.render(el);
    });

    // Settings Tab
    this.addSettingTab(new OSDashboardSettingTab(this.app, this));

    // Handle open on startup
    this.app.workspace.onLayoutReady(() => {
      if (this.settings.autoFreezeHabits) {
        this.runAutoFreeze().catch(err => {
          console.warn("[OS Dashboard] Failed to run initial auto-freeze:", err);
        });
      }

      if (this.settings.openOnStartup) {
        window.setTimeout(() => {
          this.activateView();
        }, 150);
      }
    });

    // Handle open on new empty tab (homepage mode)
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

  public onunload(): void {
    // Leaves will detach automatically or keep state
  }

  public async activateView(): Promise<void> {
    const { workspace } = this.app;
    let leaf: WorkspaceLeaf | null = null;

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

  public async loadSettings(): Promise<void> {
    const data = await this.loadData();
    this.settings = Object.assign({}, DEFAULT_SETTINGS, data);

    // Migrate legacy default "SSK_OS" to empty string so vault name is auto-detected
    if (this.settings.vaultTitle === "SSK_OS") {
      this.settings.vaultTitle = "";
      await this.saveData(this.settings);
    }

    // Migrate legacy default "03 Projects" to empty string so entire vault is searched
    if (this.settings.projectsFolder === "03 Projects") {
      this.settings.projectsFolder = "";
    }
    if (this.settings.deadlinesFolders === "03 Projects") {
      this.settings.deadlinesFolders = "";
    }
    if (!this.settings.deadlineProp || this.settings.deadlineProp === "deadline") {
      this.settings.deadlineProp = "target_completion_date";
    }
    if (!this.settings.bannerPath) {
      this.settings.bannerPath = "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=80";
    }

    // Clean up initial dummy mock streaks if present from previous version
    if (this.settings.streaks && this.settings.streaks.length === 5) {
      const isDummy = this.settings.streaks.every(s => ["1", "2", "3", "4", "5"].includes(s.id) && [12, 8, 5, 10, 7].includes(s.currentStreak));
      if (isDummy) {
        this.settings.streaks = [];
        await this.saveData(this.settings);
      }
    }
  }

  public async saveSettings(): Promise<void> {
    await this.saveData(this.settings);

    // Refresh any open dashboard views
    const leaves = this.app.workspace.getLeavesOfType(VIEW_TYPE_OS_DASHBOARD);
    for (const leaf of leaves) {
      if (leaf.view instanceof OSDashboardView) {
        await leaf.view.refresh();
      }
    }
  }

  public async runAutoFreeze(): Promise<boolean> {
    if (!this.streakService) return false;
    const habitsFilePath = this.settings.habitsFile || "Habits.md";
    const maxFreezes = this.settings.maxFreezesPerMonth || 4;
    const habits = await this.streakService.loadHabits(habitsFilePath, this.settings.streaks || []);
    const result = this.streakService.checkAndApplyAutoFreeze(habits, maxFreezes, this.settings.autoFreezeHabits);
    if (result.applied) {
      await this.streakService.saveHabits(habitsFilePath, habits, maxFreezes);
      this.settings.streaks = habits;
      await this.saveData(this.settings);
      for (const msg of result.messages) {
        new Notice(`[OS Dashboard] ${msg}`);
      }
      const leaves = this.app.workspace.getLeavesOfType(VIEW_TYPE_OS_DASHBOARD);
      for (const leaf of leaves) {
        if (leaf.view instanceof OSDashboardView) {
          await leaf.view.refresh();
        }
      }
      return true;
    }
    return false;
  }
}
