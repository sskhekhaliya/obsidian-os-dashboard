import { App, Modal, setIcon, MarkdownRenderer, Component } from "obsidian";
import { TaskService } from "../services/taskService";
import { TaskItem, moment } from "../types";

export class OverdueTasksModal extends Modal {
  private taskService: TaskService;
  private filePath: string;
  private onTasksChanged: () => Promise<void>;
  private component: Component = new Component();

  constructor(app: App, taskService: TaskService, filePath: string, onTasksChanged: () => Promise<void>) {
    super(app);
    this.taskService = taskService;
    this.filePath = filePath;
    this.onTasksChanged = onTasksChanged;
  }

  public onOpen(): void {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("os-overdue-modal-content");

    // Intercept clicks on internal wikilinks and external links
    contentEl.addEventListener("click", async (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const internalLink = target.closest("a.internal-link") as HTMLElement | null;
      if (internalLink) {
        e.preventDefault();
        e.stopPropagation();
        const href = internalLink.getAttribute("data-href") || internalLink.getAttribute("href");
        if (href) {
          const sourceFile = internalLink.closest("[data-source-file]")?.getAttribute("data-source-file") || this.filePath;
          const isNewLeaf = e.ctrlKey || e.metaKey || e.button === 1;
          await this.app.workspace.openLinkText(href, sourceFile, isNewLeaf);
          this.close();
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

    // Hover preview support for wikilinks inside modal
    contentEl.addEventListener("mouseover", (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const internalLink = target.closest("a.internal-link") as HTMLElement | null;
      if (internalLink) {
        const href = internalLink.getAttribute("data-href") || internalLink.getAttribute("href");
        if (href) {
          const sourceFile = internalLink.closest("[data-source-file]")?.getAttribute("data-source-file") || this.filePath;
          this.app.workspace.trigger("hover-link", {
            event: e,
            source: "os-dashboard",
            hoverParent: contentEl,
            targetEl: internalLink,
            linktext: href,
            sourcePath: sourceFile
          });
        }
      }
    });

    this.renderModalContent(contentEl);
  }

  private async renderModalContent(container: HTMLElement): Promise<void> {
    container.empty();

    // Modal Header
    const headerEl = container.createDiv({ cls: "os-overdue-modal-header" });
    const titleLeft = headerEl.createDiv({ cls: "os-overdue-title-left" });
    const iconEl = titleLeft.createSpan({ cls: "os-overdue-icon" });
    setIcon(iconEl, "history");
    titleLeft.createEl("h2", { text: "Unfinished Tasks (Overdue)" });

    const overdueTasks = await this.taskService.getOverdueTasks(this.filePath);

    // Header Right Actions (Move All to Today)
    if (overdueTasks.length > 0) {
      const moveAllBtn = headerEl.createEl("button", {
        cls: "mod-cta os-move-all-btn",
        text: `Move All to Today (${overdueTasks.length})`
      });
      moveAllBtn.addEventListener("click", async () => {
        await this.taskService.moveAllOverdueToToday(this.filePath);
        await this.onTasksChanged();
        this.close();
      });
    }

    // Subtitle description
    container.createEl("p", {
      cls: "os-overdue-modal-desc",
      text: "Unfinished tasks from past days. Move them to today's plan, mark them done, edit, or delete."
    });

    if (overdueTasks.length === 0) {
      const emptyWrap = container.createDiv({ cls: "os-overdue-empty" });
      const emptyIcon = emptyWrap.createSpan({ cls: "os-overdue-empty-icon" });
      setIcon(emptyIcon, "check-circle-2");
      emptyWrap.createSpan({ text: "All caught up! No unfinished tasks from past days." });
      return;
    }

    // Group tasks by their original date heading
    const groups: { [date: string]: TaskItem[] } = {};
    for (const task of overdueTasks) {
      const d = task.dateHeading || "Past";
      if (!groups[d]) groups[d] = [];
      groups[d].push(task);
    }

    const listContainer = container.createDiv({ cls: "os-overdue-modal-list" });

    for (const [dateStr, tasks] of Object.entries(groups)) {
      const groupEl = listContainer.createDiv({ cls: "os-overdue-group" });
      const groupHeader = groupEl.createDiv({ cls: "os-overdue-group-header" });
      
      const groupTitle = groupHeader.createSpan({ cls: "os-overdue-group-title" });
      const calIcon = groupTitle.createSpan({ cls: "os-overdue-group-icon" });
      setIcon(calIcon, "calendar");
      groupTitle.createSpan({ text: moment(dateStr, "YYYY-MM-DD").format("dddd, MMMM D, YYYY") });

      groupHeader.createSpan({ cls: "os-overdue-group-badge", text: `${tasks.length} pending` });

      const taskList = groupEl.createDiv({ cls: "os-task-list" });
      for (const task of tasks) {
        const row = taskList.createDiv({ cls: "os-task-row os-overdue-row" });
        row.setAttribute("data-source-file", task.sourceFile);

        // Checkbox (marks complete directly in past note)
        const checkWrap = row.createDiv({ cls: "os-task-checkbox" });
        setIcon(checkWrap, "square");
        checkWrap.addEventListener("click", async (e) => {
          e.stopPropagation();
          await this.taskService.toggleTask(task.sourceFile, task.lineNumber);
          await this.onTasksChanged();
          await this.renderModalContent(container);
        });

        // Task text with markdown & wikilink rendering
        const contentWrap = row.createDiv({ cls: "os-task-content-wrap" });
        const textEl = contentWrap.createSpan({ cls: "os-task-text" });
        MarkdownRenderer.renderMarkdown(task.text, textEl, task.sourceFile, this.component);

        // Row Actions: Move to Today, Delete
        const actionsWrap = row.createDiv({ cls: "os-overdue-row-actions" });

        const moveBtn = actionsWrap.createEl("button", {
          cls: "os-move-task-btn",
          text: "→ Today"
        });
        moveBtn.addEventListener("click", async (e) => {
          e.stopPropagation();
          await this.taskService.moveTaskToToday(task.sourceFile, task.lineNumber, task.text);
          await this.onTasksChanged();
          await this.renderModalContent(container);
        });

        const deleteBtn = actionsWrap.createDiv({ cls: "os-task-action-btn is-delete", title: "Delete task" });
        setIcon(deleteBtn, "trash-2");
        deleteBtn.addEventListener("click", async (e) => {
          e.stopPropagation();
          await this.taskService.deleteTask(task.sourceFile, task.lineNumber);
          await this.onTasksChanged();
          await this.renderModalContent(container);
        });
      }
    }
  }

  public onClose(): void {
    this.component.unload();
    const { contentEl } = this;
    contentEl.empty();
  }
}
