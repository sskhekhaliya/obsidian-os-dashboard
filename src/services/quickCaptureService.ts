import { App, TFolder, Notice } from "obsidian";
import { OSDashboardSettings, moment } from "../types";

export class QuickCaptureService {
  private app: App;

  constructor(app: App) {
    this.app = app;
  }

  /**
   * Captures raw text into a newly created note in the configured Quick Capture folder
   */
  public async capture(text: string, settings: OSDashboardSettings): Promise<boolean> {
    const trimmed = text.trim();
    if (!trimmed) return false;

    const folderPath = settings.quickCaptureFolder || "00 Inbox";
    await this.ensureFolderExists(folderPath);

    const pattern = settings.newFilePattern || "YYYY-MM-DD HH-mm";
    let fileName = moment().format(pattern) || "Quick Note";

    // Clean filename of invalid characters
    fileName = fileName.replace(/[\\/:*?"<>|]/g, "-").trim() || "Quick Note";

    let targetPath = `${folderPath}/${fileName}.md`;
    let counter = 1;
    while (this.app.vault.getAbstractFileByPath(targetPath)) {
      targetPath = `${folderPath}/${fileName} (${counter}).md`;
      counter++;
    }

    try {
      const createdFile = await this.app.vault.create(targetPath, trimmed);
      new Notice(`Quick Captured: ${createdFile.basename}`);

      // Open the newly created file in workspace
      const leaf = this.app.workspace.getLeaf(false);
      if (leaf) {
        await leaf.openFile(createdFile);
      }
      return true;
    } catch (err) {
      console.error("OS Dashboard: Failed to save quick capture note", err);
      new Notice("Failed to create quick capture note");
      return false;
    }
  }

  private async ensureFolderExists(folderPath: string): Promise<void> {
    const existing = this.app.vault.getAbstractFileByPath(folderPath);
    if (!existing) {
      try {
        await this.app.vault.createFolder(folderPath);
      } catch {
        // ignore if already created concurrently
      }
    }
  }
}
