import { App, Modal, Setting } from "obsidian";
import { StreakItem } from "../types";
import { initModalCloseButton } from "./modalUtils";

export class ArchiveOrDeleteStreakModal extends Modal {
  private streak: StreakItem;
  private archiveFile: string;
  private onArchive: () => Promise<void>;
  private onDelete: () => Promise<void>;

  constructor(
    app: App,
    streak: StreakItem,
    archiveFile: string,
    onArchive: () => Promise<void>,
    onDelete: () => Promise<void>
  ) {
    super(app);
    this.streak = streak;
    this.archiveFile = archiveFile;
    this.onArchive = onArchive;
    this.onDelete = onDelete;
  }

  public onOpen(): void {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("os-streak-action-modal");
    initModalCloseButton(this);

    contentEl.createEl("h2", { text: `Manage Habit: ${this.streak.name}` });

    contentEl.createEl("p", {
      text: "Choose what you would like to do with this habit. You can archive it to save all streak statistics, or permanently delete it.",
      cls: "os-modal-desc"
    });

    // Option 1: Archive
    const archiveBox = contentEl.createDiv({ cls: "os-modal-option-box" });
    archiveBox.createEl("h4", { text: "Archive Habit" });
    archiveBox.createEl("p", {
      text: `Moves "${this.streak.name}" and all historical records into "${this.archiveFile}". It will stop auto-populating in your daily tasks.`,
      cls: "os-modal-option-desc"
    });
    const archiveBtn = archiveBox.createEl("button", {
      cls: "mod-cta",
      text: "Archive Habit"
    });
    archiveBtn.addEventListener("click", async () => {
      this.close();
      await this.onArchive();
    });

    // Option 2: Delete Permanently
    const deleteBox = contentEl.createDiv({ cls: "os-modal-option-box is-warning" });
    deleteBox.createEl("h4", { text: "Permanently Delete" });
    deleteBox.createEl("p", {
      text: `Warning: This will permanently erase "${this.streak.name}" and all associated streak history from your vault. This action cannot be undone.`,
      cls: "os-modal-option-desc"
    });
    const deleteBtn = deleteBox.createEl("button", {
      cls: "mod-warning",
      text: "Delete Permanently"
    });
    deleteBtn.addEventListener("click", async () => {
      const confirmed = window.confirm(`Are you sure you want to permanently delete "${this.streak.name}" and all its streak data? This cannot be undone.`);
      if (confirmed) {
        this.close();
        await this.onDelete();
      }
    });

    // Cancel Button
    const footer = contentEl.createDiv({ cls: "os-modal-footer" });
    footer.style.marginTop = "18px";
    footer.style.textAlign = "right";
    const cancelBtn = footer.createEl("button", { text: "Cancel" });
    cancelBtn.addEventListener("click", () => this.close());
  }

  public onClose(): void {
    this.contentEl.empty();
  }
}
