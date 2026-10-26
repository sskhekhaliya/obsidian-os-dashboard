import { App, TFile } from "obsidian";
import { ProjectItem, OSDashboardSettings, parseFolderList, isPathInFolderList } from "../types";
import { IconService } from "./iconService";

export class ProjectService {
  private app: App;
  private iconService: IconService;

  private static readonly PROJECT_COLORS = [
    "#f43f5e", // Rose/Pink
    "#3b82f6", // Blue
    "#ec4899", // Magenta
    "#eab308", // Gold
    "#a855f7", // Purple
    "#64748b", // Slate
    "#14b8a6", // Teal
    "#06b6d4"  // Cyan
  ];

  constructor(app: App, iconService: IconService) {
    this.app = app;
    this.iconService = iconService;
  }

  /**
   * Scans project files and extracts progress percentage
   */
  public async getOngoingProjects(settings: OSDashboardSettings): Promise<ProjectItem[]> {
    let rawProjectsFolder = (settings.projectsFolder || "").trim();
    if (rawProjectsFolder === "03 Projects") rawProjectsFolder = "";
    const folderList = parseFolderList(rawProjectsFolder);
    const statusProp = settings.projectStatusProp || "status";
    const statusValues = (settings.projectStatusValues || ["in-progress", "active", "ongoing"]).map(v => v.toLowerCase().trim());
    const progressProp = settings.projectProgressProp || "progress";

    const allFiles = this.app.vault.getMarkdownFiles();
    const candidateFiles: TFile[] = [];

    for (const file of allFiles) {
      if (file.path.startsWith(".")) continue;

      // Filter by folder(s) if specified
      if (folderList.length > 0 && !isPathInFolderList(file.path, folderList)) {
        continue;
      }

      const cache = this.app.metadataCache.getFileCache(file);
      const frontmatter = cache?.frontmatter;
      if (!frontmatter) continue;

      const rawStatus = frontmatter[statusProp];
      if (rawStatus !== undefined && rawStatus !== null) {
        const strStatus = String(rawStatus).toLowerCase().trim();
        if (statusValues.includes(strStatus)) {
          candidateFiles.push(file);
        }
      }
    }

    const results: ProjectItem[] = [];

    for (let i = 0; i < candidateFiles.length; i++) {
      const file = candidateFiles[i];
      const cache = this.app.metadataCache.getFileCache(file);
      const frontmatter = cache?.frontmatter;

      let progress = 0;
      let hasManualProgress = false;

      if (frontmatter && frontmatter[progressProp] !== undefined) {
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

      // Fallback: calculate from markdown checkboxes
      if (!hasManualProgress) {
        try {
          const content = await this.app.vault.read(file);
          const totalTasks = (content.match(/[-*]\s*\[([ xX])\]/g) || []).length;
          const completedTasks = (content.match(/[-*]\s*\[[xX]\]/g) || []).length;
          if (totalTasks > 0) {
            progress = Math.round((completedTasks / totalTasks) * 100);
          }
        } catch {
          // ignore read error
        }
      }

      progress = Math.max(0, Math.min(100, progress));

      const folderIcon = this.iconService.resolveFileFolderIcon(file, settings);

      results.push({
        title: file.basename,
        file,
        progress,
        resolvedIcon: folderIcon,
        colorHex: folderIcon.color || ProjectService.PROJECT_COLORS[i % ProjectService.PROJECT_COLORS.length]
      });
    }

    return results;
  }
}
