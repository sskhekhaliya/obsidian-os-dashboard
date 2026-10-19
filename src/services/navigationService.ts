import { App, TFolder, TFile, Notice } from "obsidian";
import { FolderCard, OSDashboardSettings, moment } from "../types";
import { IconService } from "./iconService";

export class NavigationService {
  private app: App;
  private iconService: IconService;

  constructor(app: App, iconService: IconService) {
    this.app = app;
    this.iconService = iconService;
  }

  /**
   * Retrieves all first-level folders and checks for Home/Index files
   */
  public getFolderCards(settings: OSDashboardSettings): FolderCard[] {
    const root = this.app.vault.getRoot();
    const children = root.children;
    const folders: TFolder[] = [];
    const ignored = (settings.ignoredFolders || ["_attachments", "_scripts", "_templates", "Templates", ".trash"])
      .map(f => f.toLowerCase().trim());

    for (const child of children) {
      if (child instanceof TFolder) {
        const lowerName = child.name.toLowerCase();
        // Skip hidden folders, underscore folders (e.g. _attachments), and ignored folders
        if (child.name.startsWith(".") || child.name.startsWith("_") || ignored.includes(lowerName)) {
          continue;
        }
        folders.push(child);
      }
    }

    // Sort folders by natural name order (00 Inbox, 01 Areas, etc.)
    folders.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" }));

    const cards: FolderCard[] = [];
    const keywords = (settings.homeKeywords || ["Home"]).map(k => k.trim().toLowerCase()).filter(Boolean);
    const matchFolderName = settings.matchFolderName ?? true;

    folders.forEach((folder, idx) => {
      let homeFile: TFile | undefined;
      const folderNameLower = folder.name.toLowerCase();
      const folderNameClean = folder.name.replace(/^\d+[\s._-]+/, "").trim().toLowerCase();

      // Scan immediate child files of this folder
      const mdFiles = folder.children.filter((child): child is TFile => child instanceof TFile && child.extension === "md");

      // 1. If enabled, check if a note's name is the same as the folder name
      if (matchFolderName) {
        homeFile = mdFiles.find(child => {
          const baseNameLower = child.basename.toLowerCase();
          return baseNameLower === folderNameLower || (folderNameClean.length > 0 && baseNameLower === folderNameClean);
        });
      }

      // 2. Otherwise/fallback: check if note name contains any configured keywords
      if (!homeFile) {
        homeFile = mdFiles.find(child => {
          const baseNameLower = child.basename.toLowerCase();
          return keywords.some(kw => baseNameLower.includes(kw));
        });
      }

      const iconInfo = this.iconService.resolveFolderIcon(folder.path, folder.name, idx);

      cards.push({
        name: folder.name,
        path: folder.path,
        hasHome: !!homeFile,
        homeFile: homeFile,
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
  public async handleFolderClick(card: FolderCard, settings: OSDashboardSettings): Promise<void> {
    if (card.hasHome && card.homeFile) {
      const leaf = this.app.workspace.getLeaf(false);
      await leaf.openFile(card.homeFile);
      return;
    }

    // No Home note found: create a new note in this folder
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

      const initialContent = `# ${baseTitle}\n\n`;
      const createdFile = await this.app.vault.create(filePath, initialContent);

      new Notice(`Created note in ${card.name}: ${createdFile.basename}`);
      const leaf = this.app.workspace.getLeaf(false);
      await leaf.openFile(createdFile);
    } catch (err) {
      console.error("OS Dashboard: Failed to create new note", err);
      new Notice(`Failed to create note in ${card.name}`);
    }
  }
}
