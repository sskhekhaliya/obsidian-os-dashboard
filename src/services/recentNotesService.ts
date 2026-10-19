import { App, TFile } from "obsidian";
import { RecentNoteItem, OSDashboardSettings, moment } from "../types";
import { IconService } from "./iconService";

export class RecentNotesService {
  private app: App;
  private iconService: IconService;

  constructor(app: App, iconService: IconService) {
    this.app = app;
    this.iconService = iconService;
  }

  public getRecentNotes(settings: OSDashboardSettings): RecentNoteItem[] {
    const allFiles = this.app.vault.getMarkdownFiles();
    const excludeFolders = (settings.recentNotesExcludeFolders || []).map(f => f.toLowerCase().trim()).filter(Boolean);

    const filtered = allFiles.filter(file => {
      const lowerPath = file.path.toLowerCase();
      // Exclude hidden or excluded directories
      if (lowerPath.startsWith(".")) return false;
      for (const ex of excludeFolders) {
        if (lowerPath.includes(ex)) return false;
      }
      return true;
    });

    // Sort by modified time descending
    filtered.sort((a, b) => b.stat.mtime - a.stat.mtime);

    const limit = settings.recentNotesLimit || 8;
    const topFiles = filtered.slice(0, limit);

    return topFiles.map(file => {
      return {
        file,
        title: file.basename,
        formattedTime: this.formatRelativeTime(file.stat.mtime),
        resolvedIcon: this.iconService.resolveFileFolderIcon(file)
      };
    });
  }

  private formatRelativeTime(mtime: number): string {
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
}
