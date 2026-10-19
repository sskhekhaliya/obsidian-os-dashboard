import { Plugin, WorkspaceLeaf } from "obsidian";
import { OSDashboardSettings, DEFAULT_SETTINGS } from "./types";
import { OSDashboardSettingTab } from "./settings";
import { OSDashboardView, VIEW_TYPE_OS_DASHBOARD } from "./view/osDashboardView";
import { IconService } from "./services/iconService";
import { NavigationService } from "./services/navigationService";
import { TaskService } from "./services/taskService";
import { RecentNotesService } from "./services/recentNotesService";
import { QuickCaptureService } from "./services/quickCaptureService";
import { ProjectService } from "./services/projectService";
import { QuoteService } from "./services/quoteService";
import { DashboardRenderer } from "./view/renderer";

export default class OSDashboardPlugin extends Plugin {
  public settings: OSDashboardSettings = DEFAULT_SETTINGS;

  public iconService!: IconService;
  public navigationService!: NavigationService;
  public taskService!: TaskService;
  public recentNotesService!: RecentNotesService;
  public quickCaptureService!: QuickCaptureService;
  public projectService!: ProjectService;
  public quoteService!: QuoteService;

  public async onload(): Promise<void> {
    await this.loadSettings();

    // Initialize Services
    this.iconService = new IconService(this.app);
    this.navigationService = new NavigationService(this.app, this.iconService);
    this.taskService = new TaskService(this.app);
    this.recentNotesService = new RecentNotesService(this.app, this.iconService);
    this.quickCaptureService = new QuickCaptureService(this.app);
    this.projectService = new ProjectService(this.app, this.iconService);
    this.quoteService = new QuoteService(this.app);

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
        this.iconService
      );
      await renderer.render(el);
    });

    // Settings Tab
    this.addSettingTab(new OSDashboardSettingTab(this.app, this));

    // Handle open on startup
    this.app.workspace.onLayoutReady(() => {
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
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
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
}
