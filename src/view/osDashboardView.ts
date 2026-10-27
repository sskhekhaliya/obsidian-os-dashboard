import { ItemView, WorkspaceLeaf, debounce, TAbstractFile } from "obsidian";
import type OSDashboardPlugin from "../main";
import { DashboardRenderer } from "./renderer";

export const VIEW_TYPE_OS_DASHBOARD = "os-dashboard-view";

export class OSDashboardView extends ItemView {
  private plugin: OSDashboardPlugin;
  private renderer: DashboardRenderer | null = null;
  private debouncedRefresh: () => void;

  constructor(leaf: WorkspaceLeaf, plugin: OSDashboardPlugin) {
    super(leaf);
    this.plugin = plugin;

    this.debouncedRefresh = debounce(() => {
      this.refresh();
    }, 400, true);
  }

  public getViewType(): string {
    return VIEW_TYPE_OS_DASHBOARD;
  }

  public getDisplayText(): string {
    return this.plugin.settings.vaultTitle?.trim() || this.app.vault.getName() || "OS Dashboard";
  }

  public getIcon(): string {
    return "layout-dashboard";
  }

  private isRelevantDashboardFile(filePath: string): boolean {
    if (!filePath) return false;
    const s = this.plugin.settings;
    if (filePath === s.dailyTasksFile) return true;
    if (filePath === (s.dailyLogFile || "Daily Logs.md")) return true;
    if (filePath === (s.habitsFile || "Habits.md")) return true;
    if (filePath === (s.weeklyTasksFile || "Weekly Tasks.md")) return true;
    if (filePath === (s.calendarEventsFile || "Events.md")) return true;
    if (filePath === s.archiveHabitsFile) return true;
    for (const cw of s.customWidgets || []) {
      if (cw.type === "markdown-note" && cw.content && filePath === cw.content) return true;
    }
    return false;
  }

  public async onOpen(): Promise<void> {
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
      this.plugin.deadlineService,
      () => this.plugin.saveSettings(),
      (filePath) => this.plugin.markInternalWrite(filePath)
    );

    await this.renderer.render(this.contentEl);

    // Register vault change listeners for live auto-updating (external changes only)
    this.registerEvent(
      this.app.vault.on("modify", (file: TAbstractFile) => {
        if (this.plugin.isInternalWrite(file.path)) return;
        if (this.isRelevantDashboardFile(file.path)) {
          this.debouncedRefresh();
        }
      })
    );
    this.registerEvent(
      this.app.vault.on("create", (file: TAbstractFile) => {
        if (this.plugin.isInternalWrite(file.path)) return;
        if (this.isRelevantDashboardFile(file.path)) {
          this.debouncedRefresh();
        }
      })
    );
    this.registerEvent(
      this.app.vault.on("delete", (file: TAbstractFile) => {
        if (this.plugin.isInternalWrite(file.path)) return;
        if (this.isRelevantDashboardFile(file.path)) {
          this.debouncedRefresh();
        }
      })
    );
  }

  public async refresh(): Promise<void> {
    if (this.renderer && this.contentEl) {
      this.renderer.updateSettings(this.plugin.settings);
      await this.renderer.render(this.contentEl);
    }
  }

  public async onClose(): Promise<void> {
    if (this.renderer) {
      this.renderer.destroy();
      this.renderer = null;
    }
  }
}
