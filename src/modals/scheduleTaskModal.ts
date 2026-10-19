import { App, Modal, Setting, Notice } from "obsidian";
import { TaskService } from "../services/taskService";
import { moment } from "../types";

export class ScheduleTaskModal extends Modal {
  private taskService: TaskService;
  private filePath: string;
  private onTaskScheduled: () => Promise<void>;
  private selectedDate: string;
  private tasksText: string = "";

  constructor(
    app: App,
    taskService: TaskService,
    filePath: string,
    onTaskScheduled: () => Promise<void>
  ) {
    super(app);
    this.taskService = taskService;
    this.filePath = filePath;
    this.onTaskScheduled = onTaskScheduled;
    this.selectedDate = moment().format("YYYY-MM-DD");
  }

  public onOpen(): void {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("os-schedule-modal");

    contentEl.createEl("h2", { text: "Schedule Tasks" });

    // Date picker setting
    new Setting(contentEl)
      .setName("Date")
      .setDesc("Choose the date for these tasks.")
      .addText(text => {
        text.inputEl.type = "date";
        text.setValue(this.selectedDate)
          .onChange(val => {
            this.selectedDate = val || moment().format("YYYY-MM-DD");
          });
      });

    // Multi-task textarea setting
    const taskSetting = new Setting(contentEl)
      .setName("Tasks (one per line)")
      .setDesc("Enter as many tasks as you want. Each line will be created as a separate task.");

    let textareaElRef: HTMLTextAreaElement;
    taskSetting.addTextArea(textArea => {
      textareaElRef = textArea.inputEl;
      textArea.setPlaceholder("Review DSA topic\nSolve 10 chess puzzles\nRead 20 pages of book\nPlan tomorrow...")
        .setValue(this.tasksText)
        .onChange(val => {
          this.tasksText = val;
        });

      textArea.inputEl.rows = 6;
      textArea.inputEl.style.width = "100%";
      textArea.inputEl.style.minHeight = "120px";
      textArea.inputEl.style.resize = "vertical";

      textArea.inputEl.addEventListener("keydown", async (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          await this.submit();
        }
      });
    });

    // Action buttons
    new Setting(contentEl)
      .addButton(btn => {
        btn.setButtonText("Schedule Tasks")
          .setCta()
          .onClick(async () => {
            await this.submit();
          });
      })
      .addButton(btn => {
        btn.setButtonText("Cancel")
          .onClick(() => {
            this.close();
          });
      });

    setTimeout(() => {
      if (textareaElRef) textareaElRef.focus();
    }, 50);
  }

  private async submit(): Promise<void> {
    const lines = this.tasksText
      .split("\n")
      .map(line => line.trim())
      .filter(Boolean);

    if (lines.length === 0) {
      new Notice("Please enter at least one task.");
      return;
    }

    const success = await this.taskService.addTasks(this.filePath, lines, this.selectedDate);
    if (success) {
      new Notice(`Scheduled ${lines.length} task${lines.length > 1 ? "s" : ""} for ${this.selectedDate}`);
      this.close();
      await this.onTaskScheduled();
    } else {
      new Notice("Failed to schedule tasks.");
    }
  }

  public onClose(): void {
    this.contentEl.empty();
  }
}
