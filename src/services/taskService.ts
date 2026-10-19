import { App, TFile } from "obsidian";
import { TaskItem, moment } from "../types";

export class TaskService {
  private app: App;

  constructor(app: App) {
    this.app = app;
  }

  /**
   * Retrieves today's tasks from the configured Daily Tasks file
   */
  public async getTodayTasks(filePath: string): Promise<TaskItem[]> {
    const file = this.getFile(filePath);
    if (!file) return [];

    const content = await this.app.vault.read(file);
    const lines = content.split("\n");
    const todayDate = moment().format("YYYY-MM-DD");

    let insideTodaySection = false;
    const tasks: TaskItem[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Check for headings
      const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
      if (headingMatch) {
        const headingText = headingMatch[2].trim();
        // Check if heading matches today's date (or contains today's date)
        if (headingText.includes(todayDate)) {
          insideTodaySection = true;
          continue;
        } else if (insideTodaySection) {
          // Reached another heading, exit today section
          break;
        }
      }

      if (insideTodaySection) {
        const taskMatch = line.match(/^(\s*[-*]\s*\[([ xX])\])\s+(.*)$/);
        if (taskMatch) {
          const completed = taskMatch[2].toLowerCase() === "x";
          const text = taskMatch[3].trim();
          tasks.push({
            id: `today-${i}`,
            text,
            completed,
            lineNumber: i,
            rawLine: line,
            sourceFile: file.path,
            dateHeading: todayDate
          });
        }
      }
    }

    return tasks;
  }

  /**
   * Retrieves all unfinished tasks (- [ ]) from dates strictly before today
   */
  public async getOverdueTasks(filePath: string): Promise<TaskItem[]> {
    const file = this.getFile(filePath);
    if (!file) return [];

    const content = await this.app.vault.read(file);
    const lines = content.split("\n");
    const todayDate = moment().format("YYYY-MM-DD");

    let currentHeadingDate: string | null = null;
    let isPastDate = false;
    const tasks: TaskItem[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Check for headings with YYYY-MM-DD date pattern
      const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
      if (headingMatch) {
        const headingText = headingMatch[2].trim();
        const dateMatch = headingText.match(/\b(\d{4}-\d{2}-\d{2})\b/);
        if (dateMatch) {
          currentHeadingDate = dateMatch[1];
          // Check if this heading date is before today
          isPastDate = currentHeadingDate < todayDate;
        } else {
          currentHeadingDate = null;
          isPastDate = false;
        }
        continue;
      }

      if (isPastDate && currentHeadingDate) {
        const taskMatch = line.match(/^(\s*[-*]\s*\[ \])\s+(.*)$/);
        if (taskMatch) {
          const text = taskMatch[2].trim();
          tasks.push({
            id: `overdue-${i}`,
            text,
            completed: false,
            lineNumber: i,
            rawLine: line,
            sourceFile: file.path,
            dateHeading: currentHeadingDate
          });
        }
      }
    }

    return tasks;
  }

  /**
   * Moves a single overdue task from its past date heading to today's date heading
   */
  public async moveTaskToToday(sourceFilePath: string, lineNumber: number, taskText: string): Promise<boolean> {
    const file = this.getFile(sourceFilePath);
    if (!file) return false;

    const todayDate = moment().format("YYYY-MM-DD");
    const cleanText = taskText.trim().replace(/^[-*]\s*(\[[ xX]\]\s*)?/, "");
    if (!cleanText) return false;

    try {
      await this.app.vault.process(file, data => {
        const lines = data.split("\n");
        // Remove the task from its old location
        if (lineNumber >= 0 && lineNumber < lines.length) {
          lines.splice(lineNumber, 1);
        }

        // Find or create today's heading
        const headingRegex = new RegExp(`^#{1,6}\\s+.*${todayDate}`, "i");
        let headingIndex = lines.findIndex(l => headingRegex.test(l));

        if (headingIndex !== -1) {
          let insertIndex = lines.length;
          for (let i = headingIndex + 1; i < lines.length; i++) {
            if (/^#{1,6}\s+/.test(lines[i])) {
              insertIndex = i;
              break;
            }
          }
          lines.splice(insertIndex, 0, `- [ ] ${cleanText}`);
        } else {
          if (lines.length > 0 && lines[lines.length - 1].trim() !== "") {
            lines.push("");
          }
          lines.push(`## ${todayDate}`);
          lines.push(`- [ ] ${cleanText}`);
        }

        return lines.join("\n");
      });
      return true;
    } catch (err) {
      console.error("OS Dashboard: Failed to move task to today", err);
      return false;
    }
  }

  /**
   * Moves all overdue tasks from past date headings to today's date heading in one batch
   */
  public async moveAllOverdueToToday(sourceFilePath: string): Promise<boolean> {
    const file = this.getFile(sourceFilePath);
    if (!file) return false;

    const todayDate = moment().format("YYYY-MM-DD");

    try {
      await this.app.vault.process(file, data => {
        const lines = data.split("\n");
        let currentHeadingDate: string | null = null;
        let isPastDate = false;
        const tasksToMove: string[] = [];

        // Traverse backwards to safely splice lines
        for (let i = lines.length - 1; i >= 0; i--) {
          const line = lines[i];
          const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
          if (headingMatch) {
            const dateMatch = headingMatch[2].match(/\b(\d{4}-\d{2}-\d{2})\b/);
            if (dateMatch) {
              currentHeadingDate = dateMatch[1];
              isPastDate = currentHeadingDate < todayDate;
            } else {
              isPastDate = false;
            }
            continue;
          }

          if (isPastDate) {
            const taskMatch = line.match(/^(\s*[-*]\s*\[ \])\s+(.*)$/);
            if (taskMatch) {
              tasksToMove.unshift(taskMatch[2].trim());
              lines.splice(i, 1);
            }
          }
        }

        if (tasksToMove.length === 0) {
          return lines.join("\n");
        }

        // Append moved tasks to today's date heading
        const headingRegex = new RegExp(`^#{1,6}\\s+.*${todayDate}`, "i");
        let headingIndex = lines.findIndex(l => headingRegex.test(l));
        const formatted = tasksToMove.map(t => `- [ ] ${t}`);

        if (headingIndex !== -1) {
          let insertIndex = lines.length;
          for (let i = headingIndex + 1; i < lines.length; i++) {
            if (/^#{1,6}\s+/.test(lines[i])) {
              insertIndex = i;
              break;
            }
          }
          lines.splice(insertIndex, 0, ...formatted);
        } else {
          if (lines.length > 0 && lines[lines.length - 1].trim() !== "") {
            lines.push("");
          }
          lines.push(`## ${todayDate}`);
          lines.push(...formatted);
        }

        return lines.join("\n");
      });
      return true;
    } catch (err) {
      console.error("OS Dashboard: Failed to move all overdue tasks to today", err);
      return false;
    }
  }
  public async getWeeklyTasks(filePath: string): Promise<TaskItem[]> {
    const file = this.getFile(filePath);
    if (!file) return [];

    const content = await this.app.vault.read(file);
    const lines = content.split("\n");
    const tasks: TaskItem[] = [];

    // Look for ## This Week heading or if not found, gather all tasks in file
    let hasWeeklyHeading = lines.some(l => /^#{1,6}\s+.*this\s*week/i.test(l));
    let insideWeekly = !hasWeeklyHeading; // if no heading, read whole file

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
      if (headingMatch) {
        const headingText = headingMatch[2].trim().toLowerCase();
        if (headingText.includes("this week")) {
          insideWeekly = true;
          continue;
        } else if (insideWeekly && hasWeeklyHeading) {
          break;
        }
      }

      if (insideWeekly) {
        const taskMatch = line.match(/^(\s*[-*]\s*\[([ xX])\])\s+(.*)$/);
        if (taskMatch) {
          const completed = taskMatch[2].toLowerCase() === "x";
          const text = taskMatch[3].trim();
          tasks.push({
            id: `weekly-${i}`,
            text,
            completed,
            lineNumber: i,
            rawLine: line,
            sourceFile: file.path
          });
        }
      }
    }

    return tasks;
  }

  /**
   * Toggles task completion state directly inside the source file.
   * If autoLogPath is provided:
   * - When marked completed: appends it to the log file.
   * - When unchecked: removes the matching item from the log file under today's date.
   */
  public async toggleTask(
    sourceFilePath: string,
    lineNumber: number,
    autoLogOptions?: { logFilePath?: string; autoLog?: boolean }
  ): Promise<boolean> {
    const file = this.getFile(sourceFilePath);
    if (!file) return false;

    let taskText: string | null = null;
    let becameCompleted = false;
    let becameUnchecked = false;

    try {
      await this.app.vault.process(file, data => {
        const lines = data.split("\n");
        if (lineNumber >= 0 && lineNumber < lines.length) {
          const currentLine = lines[lineNumber];
          const match = currentLine.match(/^(\s*[-*]\s*\[[ xX]\])\s+(.*)$/);
          if (match) {
            taskText = match[2].trim();
          }

          if (/\[ \]/i.test(currentLine)) {
            lines[lineNumber] = currentLine.replace(/\[ \]/, "[x]");
            becameCompleted = true;
          } else if (/\[[xX]\]/.test(currentLine)) {
            lines[lineNumber] = currentLine.replace(/\[[xX]\]/, "[ ]");
            becameUnchecked = true;
          }
        }
        return lines.join("\n");
      });

      // Handle auto-logging sync
      if (taskText && autoLogOptions?.autoLog && autoLogOptions?.logFilePath) {
        if (becameCompleted) {
          await this.addLoggedItem(autoLogOptions.logFilePath, taskText);
        } else if (becameUnchecked) {
          await this.removeLoggedItem(autoLogOptions.logFilePath, taskText);
        }
      }

      return true;
    } catch (err) {
      console.error("OS Dashboard: Failed to toggle task", err);
      return false;
    }
  }

  /**
   * Removes an item from the Daily Log file under today's date if it exists
   */
  public async removeLoggedItem(logFilePath: string, text: string, dateHeading?: string): Promise<boolean> {
    const cleanText = text.trim().replace(/^[-*]\s*(\[[ xX]\]\s*)?/, "");
    if (!cleanText) return false;

    const file = this.getFile(logFilePath);
    if (!file) return false;

    const targetDate = dateHeading || moment().format("YYYY-MM-DD");

    try {
      await this.app.vault.process(file, data => {
        const lines = data.split("\n");
        const headingRegex = new RegExp(`^#{1,6}\\s+.*${targetDate}`, "i");
        const headingIndex = lines.findIndex(l => headingRegex.test(l));

        if (headingIndex !== -1) {
          for (let i = headingIndex + 1; i < lines.length; i++) {
            if (/^#{1,6}\s+/.test(lines[i])) {
              break; // Reached next date heading
            }
            const lineContent = lines[i].replace(/^[-*]\s*(\[[ xX]\]\s*)?/, "").trim();
            if (lineContent.toLowerCase() === cleanText.toLowerCase()) {
              lines.splice(i, 1);
              break;
            }
          }
        }

        return lines.join("\n");
      });
      return true;
    } catch (err) {
      console.error("OS Dashboard: Failed to remove item from log file", err);
      return false;
    }
  }

  /**
   * Appends multiple tasks under a date heading (can be open or completed)
   */
  public async addTasks(
    filePath: string,
    taskTexts: string[],
    dateHeading?: string,
    completed: boolean = false
  ): Promise<boolean> {
    const validTasks = taskTexts
      .map(t => t.trim().replace(/^[-*]\s*(\[[ xX]\]\s*)?/, ""))
      .filter(Boolean);

    if (validTasks.length === 0) return false;

    let file = this.getFile(filePath);
    if (!file) {
      try {
        file = await this.app.vault.create(filePath, "");
      } catch (err) {
        console.error("OS Dashboard: Could not create tasks file", err);
        return false;
      }
    }

    const targetDate = dateHeading || moment().format("YYYY-MM-DD");

    try {
      await this.app.vault.process(file, data => {
        const lines = data.split("\n");
        const headingRegex = new RegExp(`^#{1,6}\\s+.*${targetDate}`, "i");
        let headingIndex = lines.findIndex(l => headingRegex.test(l));

        const mark = completed ? "[x]" : "[ ]";
        const formattedTasks = validTasks.map(t => `- ${mark} ${t}`);

        if (headingIndex !== -1) {
          let insertIndex = lines.length;
          for (let i = headingIndex + 1; i < lines.length; i++) {
            if (/^#{1,6}\s+/.test(lines[i])) {
              insertIndex = i;
              break;
            }
          }
          lines.splice(insertIndex, 0, ...formattedTasks);
        } else {
          if (data.trim().length > 0) {
            lines.push("");
          }
          lines.push(`## ${targetDate}`);
          lines.push(...formattedTasks);
        }

        return lines.join("\n");
      });
      return true;
    } catch (err) {
      console.error("OS Dashboard: Failed to add tasks", err);
      return false;
    }
  }

  /**
   * Appends a new task under a date heading or file
   */
  public async addTask(filePath: string, taskText: string, dateHeading?: string, completed: boolean = false): Promise<boolean> {
    return this.addTasks(filePath, [taskText], dateHeading, completed);
  }

  /**
   * Appends an item to the Daily Log file under today's date
   * Avoids duplicate lines under today's heading
   */
  public async addLoggedItem(logFilePath: string, text: string, dateHeading?: string): Promise<boolean> {
    const cleanText = text.trim().replace(/^[-*]\s*(\[[ xX]\]\s*)?/, "");
    if (!cleanText) return false;

    let file = this.getFile(logFilePath);
    if (!file) {
      try {
        file = await this.app.vault.create(logFilePath, "");
      } catch (err) {
        console.error("OS Dashboard: Could not create log file", err);
        return false;
      }
    }

    const targetDate = dateHeading || moment().format("YYYY-MM-DD");

    try {
      await this.app.vault.process(file, data => {
        const lines = data.split("\n");
        const headingRegex = new RegExp(`^#{1,6}\\s+.*${targetDate}`, "i");
        let headingIndex = lines.findIndex(l => headingRegex.test(l));

        if (headingIndex !== -1) {
          // Check if this text is already present under today's date
          let endOfSection = lines.length;
          for (let i = headingIndex + 1; i < lines.length; i++) {
            if (/^#{1,6}\s+/.test(lines[i])) {
              endOfSection = i;
              break;
            }
            const lineContent = lines[i].replace(/^[-*]\s*(\[[ xX]\]\s*)?/, "").trim();
            if (lineContent.toLowerCase() === cleanText.toLowerCase()) {
              // Already logged, don't duplicate
              return lines.join("\n");
            }
          }
          lines.splice(endOfSection, 0, `- [x] ${cleanText}`);
        } else {
          if (data.trim().length > 0) {
            lines.push("");
          }
          lines.push(`## ${targetDate}`);
          lines.push(`- [x] ${cleanText}`);
        }

        return lines.join("\n");
      });
      return true;
    } catch (err) {
      console.error("OS Dashboard: Failed to append to log file", err);
      return false;
    }
  }

  /**
   * Updates a specific task's text at lineNumber in sourceFile.
   * If autoLogOptions is provided and the task was completed, also updates the corresponding log entry.
   */
  public async updateTask(
    sourceFilePath: string,
    lineNumber: number,
    newText: string,
    autoLogOptions?: { logFilePath?: string; autoLog?: boolean }
  ): Promise<boolean> {
    const file = this.getFile(sourceFilePath);
    if (!file) return false;

    const cleanNewText = newText.trim().replace(/^[-*]\s*(\[[ xX]\]\s*)?/, "");
    if (!cleanNewText) return false;

    let oldText: string | null = null;
    let isCompleted = false;

    try {
      await this.app.vault.process(file, data => {
        const lines = data.split("\n");
        if (lineNumber >= 0 && lineNumber < lines.length) {
          const currentLine = lines[lineNumber];
          const match = currentLine.match(/^(\s*[-*]\s*\[([ xX])\])\s+(.*)$/);
          if (match) {
            isCompleted = match[2].toLowerCase() === "x";
            oldText = match[3].trim();
            lines[lineNumber] = `${match[1]} ${cleanNewText}`;
          } else {
            lines[lineNumber] = `- [ ] ${cleanNewText}`;
          }
        }
        return lines.join("\n");
      });

      // If this task was completed and auto-logging is active, sync the updated text in Daily Log
      if (isCompleted && oldText && autoLogOptions?.autoLog && autoLogOptions?.logFilePath) {
        await this.updateLoggedItem(autoLogOptions.logFilePath, oldText, cleanNewText);
      }

      return true;
    } catch (err) {
      console.error("OS Dashboard: Failed to update task", err);
      return false;
    }
  }

  /**
   * Deletes a specific task line at lineNumber in sourceFile.
   * If autoLogOptions is provided and the task was completed, also removes it from the log file.
   */
  public async deleteTask(
    sourceFilePath: string,
    lineNumber: number,
    autoLogOptions?: { logFilePath?: string; autoLog?: boolean }
  ): Promise<boolean> {
    const file = this.getFile(sourceFilePath);
    if (!file) return false;

    let deletedText: string | null = null;
    let wasCompleted = false;

    try {
      await this.app.vault.process(file, data => {
        const lines = data.split("\n");
        if (lineNumber >= 0 && lineNumber < lines.length) {
          const match = lines[lineNumber].match(/^(\s*[-*]\s*\[([ xX])\])\s+(.*)$/);
          if (match) {
            wasCompleted = match[2].toLowerCase() === "x";
            deletedText = match[3].trim();
          }
          lines.splice(lineNumber, 1);
        }
        return lines.join("\n");
      });

      // If the deleted task was completed, also clean it out from Daily Log
      if (wasCompleted && deletedText && autoLogOptions?.autoLog && autoLogOptions?.logFilePath) {
        await this.removeLoggedItem(autoLogOptions.logFilePath, deletedText);
      }

      return true;
    } catch (err) {
      console.error("OS Dashboard: Failed to delete task", err);
      return false;
    }
  }

  /**
   * Updates an item's text in Daily Log under today's date
   */
  public async updateLoggedItem(logFilePath: string, oldText: string, newText: string, dateHeading?: string): Promise<boolean> {
    const cleanOld = oldText.trim().replace(/^[-*]\s*(\[[ xX]\]\s*)?/, "");
    const cleanNew = newText.trim().replace(/^[-*]\s*(\[[ xX]\]\s*)?/, "");
    if (!cleanOld || !cleanNew) return false;

    const file = this.getFile(logFilePath);
    if (!file) return false;

    const targetDate = dateHeading || moment().format("YYYY-MM-DD");

    try {
      await this.app.vault.process(file, data => {
        const lines = data.split("\n");
        const headingRegex = new RegExp(`^#{1,6}\\s+.*${targetDate}`, "i");
        const headingIndex = lines.findIndex(l => headingRegex.test(l));

        if (headingIndex !== -1) {
          for (let i = headingIndex + 1; i < lines.length; i++) {
            if (/^#{1,6}\s+/.test(lines[i])) break;
            const lineContent = lines[i].replace(/^[-*]\s*(\[[ xX]\]\s*)?/, "").trim();
            if (lineContent.toLowerCase() === cleanOld.toLowerCase()) {
              lines[i] = `- [x] ${cleanNew}`;
              break;
            }
          }
        }
        return lines.join("\n");
      });
      return true;
    } catch (err) {
      console.error("OS Dashboard: Failed to update logged item", err);
      return false;
    }
  }

  /**
   * Finds and updates a matching task under today's date in Daily Tasks
   */
  public async updatePlannedTaskMatching(planFilePath: string, oldText: string, newText: string, dateHeading?: string): Promise<boolean> {
    const cleanOld = oldText.trim().replace(/^[-*]\s*(\[[ xX]\]\s*)?/, "");
    const cleanNew = newText.trim().replace(/^[-*]\s*(\[[ xX]\]\s*)?/, "");
    if (!cleanOld || !cleanNew) return false;

    const file = this.getFile(planFilePath);
    if (!file) return false;

    const targetDate = dateHeading || moment().format("YYYY-MM-DD");

    try {
      await this.app.vault.process(file, data => {
        const lines = data.split("\n");
        const headingRegex = new RegExp(`^#{1,6}\\s+.*${targetDate}`, "i");
        const headingIndex = lines.findIndex(l => headingRegex.test(l));

        if (headingIndex !== -1) {
          for (let i = headingIndex + 1; i < lines.length; i++) {
            if (/^#{1,6}\s+/.test(lines[i])) break;
            const match = lines[i].match(/^(\s*[-*]\s*\[[ xX]\])\s+(.*)$/);
            if (match && match[2].trim().toLowerCase() === cleanOld.toLowerCase()) {
              lines[i] = `${match[1]} ${cleanNew}`;
              break;
            }
          }
        }
        return lines.join("\n");
      });
      return true;
    } catch (err) {
      console.error("OS Dashboard: Failed to sync update to planned tasks", err);
      return false;
    }
  }

  /**
   * Finds a matching completed task under today's date in Daily Tasks and unchecks it (sets it back to [ ])
   */
  public async uncheckPlannedTaskMatching(planFilePath: string, text: string, dateHeading?: string): Promise<boolean> {
    const cleanText = text.trim().replace(/^[-*]\s*(\[[ xX]\]\s*)?/, "");
    if (!cleanText) return false;

    const file = this.getFile(planFilePath);
    if (!file) return false;

    const targetDate = dateHeading || moment().format("YYYY-MM-DD");

    try {
      await this.app.vault.process(file, data => {
        const lines = data.split("\n");
        const headingRegex = new RegExp(`^#{1,6}\\s+.*${targetDate}`, "i");
        const headingIndex = lines.findIndex(l => headingRegex.test(l));

        if (headingIndex !== -1) {
          for (let i = headingIndex + 1; i < lines.length; i++) {
            if (/^#{1,6}\s+/.test(lines[i])) break;
            const match = lines[i].match(/^(\s*[-*]\s*\[[xX]\])\s+(.*)$/);
            if (match && match[2].trim().toLowerCase() === cleanText.toLowerCase()) {
              lines[i] = lines[i].replace(/\[[xX]\]/, "[ ]");
              break;
            }
          }
        }
        return lines.join("\n");
      });
      return true;
    } catch (err) {
      console.error("OS Dashboard: Failed to sync uncheck to planned tasks", err);
      return false;
    }
  }

  private getFile(path: string): TFile | null {
    const file = this.app.vault.getAbstractFileByPath(path);
    if (file instanceof TFile && file.extension === "md") {
      return file;
    }
    // Also try fuzzy search if user just provided filename without .md or folder
    const allFiles = this.app.vault.getMarkdownFiles();
    const cleanPath = path.toLowerCase().replace(/\.md$/, "");
    return allFiles.find(f => f.basename.toLowerCase() === cleanPath || f.path.toLowerCase() === path.toLowerCase()) || null;
  }
}
