import { App, TFile, Notice } from "obsidian";
import { StreakItem, HabitFreezePeriod, OSDashboardSettings, moment } from "../types";
import { TaskService } from "./taskService";

export class StreakService {
  private app: App;
  private isPopulating = false;

  constructor(app: App) {
    this.app = app;
  }

  /**
   * Reads and parses habits from the specified markdown file (e.g. Habits.md).
   * If the file does not exist, it creates it with any initial habits from settings.
   */
  public async loadHabits(filePath: string, fallbackHabits: StreakItem[] = []): Promise<StreakItem[]> {
    const file = this.app.vault.getAbstractFileByPath(filePath);
    if (!file || !(file instanceof TFile)) {
      if (fallbackHabits && fallbackHabits.length > 0) {
        await this.saveHabits(filePath, fallbackHabits, 4);
        return fallbackHabits;
      }
      return [];
    }

    try {
      const content = await this.app.vault.read(file);
      return this.parseHabitsMarkdown(content);
    } catch (err) {
      console.error("OS Dashboard: Failed to load habits file", err);
      return fallbackHabits;
    }
  }

  /**
   * Serializes habits and writes them to the specified markdown file.
   */
  public async saveHabits(filePath: string, habits: StreakItem[], maxFreezesPerMonth = 4): Promise<void> {
    await this.ensureFolderForFile(filePath);
    const content = this.serializeHabitsMarkdown(habits, maxFreezesPerMonth);

    const file = this.app.vault.getAbstractFileByPath(filePath);
    if (file instanceof TFile) {
      await this.app.vault.modify(file, content);
    } else {
      await this.app.vault.create(filePath, content);
    }
  }

  /**
   * Parses the markdown content into StreakItem objects.
   * Expects:
   * ## Habit Name
   * > [!note] Habit Stats
   * > - **Icon**: book-open
   * > - **Current Streak**: 12
   * > ...
   */
  public parseHabitsMarkdown(content: string): StreakItem[] {
    const habits: StreakItem[] = [];
    const lines = content.split("\n");

    let currentHabit: Partial<StreakItem> | null = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Heading 2 starts a new habit
      if (line.startsWith("## ")) {
        if (currentHabit && currentHabit.name) {
          habits.push(this.finalizeHabitItem(currentHabit));
        }

        const name = line.substring(3).trim();
        currentHabit = {
          id: `habit-${name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
          name: name,
          icon: "flame",
          frequency: "daily",
          currentStreak: 0,
          bestStreak: 0,
          history: [],
          freezeHistory: [],
          autoPopulate: true
        };
        continue;
      }

      if (!currentHabit) continue;

      // Extract callout properties: > - **Key**: Value
      const propMatch = line.match(/^>\s*-\s*\*\*(.*?)\*\*:\s*(.*)$/);
      if (propMatch) {
        const key = propMatch[1].trim().toLowerCase();
        const val = propMatch[2].trim();

        switch (key) {
          case "description":
            currentHabit.description = val ? val.substring(0, 150) : undefined;
            break;
          case "icon":
            currentHabit.icon = val || "flame";
            break;
          case "frequency": {
            const low = val.toLowerCase();
            currentHabit.frequency = (low === "weekly" || low === "monthly" || low === "yearly") ? low : "daily";
            break;
          }
          case "schedule type": {
            const low = val.toLowerCase();
            currentHabit.scheduleType = low === "fixed" ? "fixed" : "flexible";
            break;
          }
          case "fixed day of week":
            currentHabit.fixedDayOfWeek = parseInt(val, 10);
            break;
          case "fixed day of month":
            currentHabit.fixedDayOfMonth = parseInt(val, 10);
            break;
          case "fixed date of year":
            currentHabit.fixedDateOfYear = val || undefined;
            break;
          case "current streak":
            currentHabit.currentStreak = parseInt(val, 10) || 0;
            break;
          case "best streak":
            currentHabit.bestStreak = parseInt(val, 10) || 0;
            break;
          case "start date":
            currentHabit.startDate = val || undefined;
            break;
          case "created date":
            currentHabit.createdDate = val || undefined;
            break;
          case "last completed":
            currentHabit.lastCompletedDate = val || undefined;
            break;
          case "last completed cycle":
            currentHabit.lastCompletedCycle = val || undefined;
            break;
          case "frozen until":
            currentHabit.frozenUntil = val || null;
            break;
          case "freeze period": {
            const low = val.toLowerCase();
            currentHabit.freezePeriodType = (low === "weekly" || low === "yearly") ? low : "monthly";
            break;
          }
          case "freeze quota":
          case "monthly freeze quota":
            currentHabit.freezeQuota = parseInt(val, 10) || undefined;
            currentHabit.maxFreezesPerMonth = currentHabit.freezeQuota;
            break;
          case "freeze history":
            currentHabit.freezeHistory = val ? val.split(",").map(s => s.trim()).filter(Boolean) : [];
            break;
          case "completed history":
            currentHabit.history = val ? val.split(",").map(s => s.trim()).filter(Boolean) : [];
            break;
          case "journal":
            currentHabit.journal = val || undefined;
            if (val) {
              const decoded = this.decodeHabitJournal(val);
              if (decoded.history.length > 0) currentHabit.history = decoded.history;
              if (decoded.freezeHistory.length > 0) currentHabit.freezeHistory = decoded.freezeHistory;
            }
            break;
          case "auto populate":
            currentHabit.autoPopulate = val.toLowerCase() !== "false";
            break;
        }
      }
    }

    if (currentHabit && currentHabit.name) {
      habits.push(this.finalizeHabitItem(currentHabit));
    }

    return habits;
  }

  private finalizeHabitItem(partial: Partial<StreakItem>): StreakItem {
    return {
      id: partial.id || `habit-${Date.now()}`,
      name: partial.name || "Untitled Habit",
      description: partial.description ? partial.description.trim().substring(0, 150) : undefined,
      icon: partial.icon || "flame",
      frequency: partial.frequency || "daily",
      scheduleType: partial.scheduleType || "flexible",
      fixedDayOfWeek: partial.fixedDayOfWeek,
      fixedDayOfMonth: partial.fixedDayOfMonth,
      fixedDateOfYear: partial.fixedDateOfYear,
      currentStreak: partial.currentStreak || 0,
      bestStreak: Math.max(partial.bestStreak || 0, partial.currentStreak || 0),
      createdDate: partial.createdDate || moment().format("YYYY-MM-DD HH:mm"),
      startDate: partial.startDate || moment().format("YYYY-MM-DD"),
      lastCompletedDate: partial.lastCompletedDate,
      lastCompletedCycle: partial.lastCompletedCycle,
      history: partial.history || [],
      frozenUntil: partial.frozenUntil || null,
      freezeHistory: partial.freezeHistory || [],
      freezePeriodType: partial.freezePeriodType || "monthly",
      freezeQuota: partial.freezeQuota ?? partial.maxFreezesPerMonth,
      maxFreezesPerMonth: partial.freezeQuota ?? partial.maxFreezesPerMonth,
      autoPopulate: partial.autoPopulate !== false,
      journal: partial.journal || this.encodeHabitJournal(partial.history || [], partial.freezeHistory || [], partial.startDate)
    };
  }

  /**
   * Serializes StreakItem objects into beautiful Markdown callout format.
   * Strictly avoids emojis.
   */
  public serializeHabitsMarkdown(habits: StreakItem[], maxFreezesPerMonth = 4): string {
    const lines: string[] = [];

    for (const habit of habits) {
      const freezePeriod = habit.freezePeriodType || "monthly";
      const habitQuota = this.getEffectiveFreezeQuota(habit, maxFreezesPerMonth);
      const usedInPeriod = this.getFreezesUsedInCurrentPeriod(habit);
      const freezeHistoryStr = (habit.freezeHistory || []).join(", ");
      const historyStr = (habit.history || []).join(", ");

      lines.push(`## ${habit.name}`);
      lines.push("> [!note] Habit Stats");
      if (habit.description && habit.description.trim()) {
        lines.push(`> - **Description**: ${habit.description.trim().substring(0, 150)}`);
      }
      lines.push(`> - **Icon**: ${habit.icon || "flame"}`);
      lines.push(`> - **Frequency**: ${habit.frequency || "daily"}`);
      if (habit.frequency !== "daily") {
        lines.push(`> - **Schedule Type**: ${habit.scheduleType || "flexible"}`);
        if (habit.scheduleType === "fixed") {
          if (habit.frequency === "weekly") {
            lines.push(`> - **Fixed Day Of Week**: ${habit.fixedDayOfWeek ?? 1}`);
          } else if (habit.frequency === "monthly") {
            lines.push(`> - **Fixed Day Of Month**: ${habit.fixedDayOfMonth ?? 1}`);
          } else if (habit.frequency === "yearly") {
            lines.push(`> - **Fixed Date Of Year**: ${habit.fixedDateOfYear || "01-01"}`);
          }
        }
      }
      lines.push(`> - **Current Streak**: ${habit.currentStreak || 0}`);
      lines.push(`> - **Best Streak**: ${habit.bestStreak || 0}`);
      lines.push(`> - **Start Date**: ${habit.startDate || moment().format("YYYY-MM-DD")}`);
      lines.push(`> - **Created Date**: ${habit.createdDate || moment().format("YYYY-MM-DD HH:mm")}`);
      lines.push(`> - **Last Completed**: ${habit.lastCompletedDate || ""}`);
      lines.push(`> - **Last Completed Cycle**: ${habit.lastCompletedCycle || ""}`);
      lines.push(`> - **Frozen Until**: ${habit.frozenUntil || ""}`);
      lines.push(`> - **Freeze Period**: ${freezePeriod}`);
      lines.push(`> - **Freeze Quota**: ${habitQuota}`);
      lines.push(`> - **Freezes Used**: ${usedInPeriod} / ${habitQuota}`);
      lines.push(`> - **Freeze History**: ${freezeHistoryStr}`);
      lines.push(`> - **Completed History**: ${historyStr}`);
      const journalStr = habit.journal || this.encodeHabitJournal(habit.history || [], habit.freezeHistory || [], habit.startDate);
      if (journalStr) {
        lines.push(`> - **Journal**: ${journalStr}`);
      }
      lines.push(`> - **Auto Populate**: ${habit.autoPopulate !== false}`);
      lines.push("");
    }

    return lines.join("\n");
  }

  /**
   * Returns current cycle key:
   * daily: YYYY-MM-DD, weekly: GGGG-[W]WW, monthly: YYYY-MM, yearly: YYYY
   */
  public getCurrentCycleKey(habit: StreakItem): string {
    const freq = habit.frequency || "daily";
    if (freq === "weekly") {
      return moment().format("GGGG-[W]WW");
    }
    if (freq === "monthly") {
      return moment().format("YYYY-MM");
    }
    if (freq === "yearly") {
      return moment().format("YYYY");
    }
    return moment().format("YYYY-MM-DD");
  }

  /**
   * Returns previous cycle key
   */
  public getPreviousCycleKey(habit: StreakItem): string {
    const freq = habit.frequency || "daily";
    if (freq === "weekly") {
      return moment().subtract(1, "week").format("GGGG-[W]WW");
    }
    if (freq === "monthly") {
      return moment().subtract(1, "month").format("YYYY-MM");
    }
    if (freq === "yearly") {
      return moment().subtract(1, "year").format("YYYY");
    }
    return moment().subtract(1, "day").format("YYYY-MM-DD");
  }

  /**
   * Returns period key for freeze tracking (e.g. "2026-W42" for weekly, "2026-10" for monthly, "2026" for yearly)
   */
  public getFreezePeriodKey(periodType: HabitFreezePeriod, date?: any): string {
    const d = date || moment();
    if (periodType === "weekly") {
      return d.format("GGGG-[W]WW");
    }
    if (periodType === "yearly") {
      return d.format("YYYY");
    }
    return d.format("YYYY-MM");
  }

  /**
   * Returns effective freeze quota for habit
   */
  public getEffectiveFreezeQuota(habit: StreakItem, defaultQuota = 4): number {
    if (habit.freezeQuota !== undefined && habit.freezeQuota >= 0) {
      return habit.freezeQuota;
    }
    if (habit.maxFreezesPerMonth !== undefined && habit.maxFreezesPerMonth >= 0) {
      return habit.maxFreezesPerMonth;
    }
    return defaultQuota || 4;
  }

  /**
   * Returns how many freezes have been consumed in the habit's active freeze period (weekly/monthly/yearly)
   */
  public getFreezesUsedInCurrentPeriod(streak: StreakItem): number {
    if (!streak.freezeHistory || streak.freezeHistory.length === 0) return 0;
    const period = streak.freezePeriodType || "monthly";
    const currentKey = this.getFreezePeriodKey(period);
    return streak.freezeHistory.filter(d => {
      const dKey = this.getFreezePeriodKey(period, moment(d, "YYYY-MM-DD"));
      return dKey === currentKey;
    }).length;
  }

  /**
   * Returns how many freezes remain in the habit's active freeze period
   */
  public getFreezesRemainingInCurrentPeriod(streak: StreakItem, defaultQuota = 4): number {
    const quota = this.getEffectiveFreezeQuota(streak, defaultQuota);
    const used = this.getFreezesUsedInCurrentPeriod(streak);
    return Math.max(0, quota - used);
  }

  // Backwards compatibility helper
  public getFreezesUsedThisMonth(streak: StreakItem): number {
    return this.getFreezesUsedInCurrentPeriod(streak);
  }

  // Backwards compatibility helper
  public getFreezesRemainingThisMonth(streak: StreakItem, maxPerMonth: number): number {
    return this.getFreezesRemainingInCurrentPeriod(streak, maxPerMonth);
  }

  // Backwards compatibility helper
  public getEffectiveMaxFreezes(streak: StreakItem, globalMax = 4): number {
    return this.getEffectiveFreezeQuota(streak, globalMax);
  }

  /**
   * Checks if habit has already been completed in its current cycle (today, this week, this month, or this year)
   */
  public isCompletedInCurrentCycle(habit: StreakItem): boolean {
    const currentKey = this.getCurrentCycleKey(habit);
    if (habit.lastCompletedCycle === currentKey) return true;

    // For daily, check lastCompletedDate or history
    if ((habit.frequency || "daily") === "daily") {
      const todayStr = moment().format("YYYY-MM-DD");
      return habit.lastCompletedDate === todayStr || (habit.history && habit.history.includes(todayStr));
    }
    return false;
  }

  /**
   * Returns days remaining in current cycle (including today)
   */
  public getDaysRemainingInCycle(habit: StreakItem): number {
    const freq = habit.frequency || "daily";
    const today = moment().startOf("day");
    if (freq === "weekly") {
      const endOfWeek = moment().endOf("isoWeek").startOf("day");
      return Math.max(0, endOfWeek.diff(today, "days") + 1);
    }
    if (freq === "monthly") {
      const endOfMonth = moment().endOf("month").startOf("day");
      return Math.max(0, endOfMonth.diff(today, "days") + 1);
    }
    if (freq === "yearly") {
      const endOfYear = moment().endOf("year").startOf("day");
      return Math.max(0, endOfYear.diff(today, "days") + 1);
    }
    return 1;
  }

  /**
   * Checks if a streak is currently frozen
   */
  public isFrozen(streak: StreakItem): boolean {
    if (!streak.frozenUntil) return false;
    const today = moment().startOf("day");
    const freezeEnd = moment(streak.frozenUntil, "YYYY-MM-DD").startOf("day");
    return today.isSameOrBefore(freezeEnd);
  }

  /**
   * Returns how many days remain in the freeze window (including today)
   */
  public getFreezeDaysLeft(streak: StreakItem): number {
    if (!this.isFrozen(streak) || !streak.frozenUntil) return 0;
    const today = moment().startOf("day");
    const freezeEnd = moment(streak.frozenUntil, "YYYY-MM-DD").startOf("day");
    return Math.max(0, freezeEnd.diff(today, "days") + 1);
  }

  /**
   * Freezes a streak for a given number of days while enforcing the period quota
   */
  public freezeStreak(streak: StreakItem, days: number, defaultQuota = 4): boolean {
    if (days <= 0) {
      streak.frozenUntil = null;
      return true;
    }

    const period = streak.freezePeriodType || "monthly";
    const available = this.getFreezesRemainingInCurrentPeriod(streak, defaultQuota);
    if (days > available) {
      new Notice(`Cannot freeze for ${days} days. Only ${available} freeze days left this ${period}.`);
      return false;
    }

    if (!streak.freezeHistory) streak.freezeHistory = [];

    // Record each freeze date into freezeHistory
    for (let i = 0; i < days; i++) {
      const d = moment().add(i, "days").format("YYYY-MM-DD");
      if (!streak.freezeHistory.includes(d)) {
        streak.freezeHistory.push(d);
      }
    }

    const freezeEnd = moment().add(days - 1, "days").format("YYYY-MM-DD");
    streak.frozenUntil = freezeEnd;
    return true;
  }

  /**
   * Unfreezes a streak immediately
   */
  public unfreezeStreak(streak: StreakItem): void {
    streak.frozenUntil = null;
  }

  /**
   * Checks if the streak was completed today
   */
  public isCompletedToday(streak: StreakItem): boolean {
    return this.isCompletedInCurrentCycle(streak);
  }

  /**
   * Auto-populates active, non-frozen habits into today's plan in Daily Tasks.md:
   * - Daily habits: every day.
   * - Fixed weekly/monthly/yearly habits: only on their designated target day.
   * - Flexible habits: never auto-populate (user injects via "Add to Today's Plan").
   */
  public async autoPopulateTasks(
    planFilePath: string,
    habits: StreakItem[],
    taskService: TaskService
  ): Promise<boolean> {
    if (!habits || habits.length === 0) return false;
    if (this.isPopulating) return false;
    this.isPopulating = true;

    try {
      const todayStr = moment().format("YYYY-MM-DD");
      const todayMoment = moment().startOf("day");
      const todayTasks = await taskService.getTodayTasks(planFilePath);
      let anyAdded = false;

      for (const streak of habits) {
        if (streak.autoPopulate === false) continue;
        if (this.isFrozen(streak)) continue;

        // Check start date rule
        if (streak.startDate) {
          const startMoment = moment(streak.startDate, "YYYY-MM-DD").startOf("day");
          if (todayMoment.isBefore(startMoment)) {
            continue;
          }
        }

        const freq = streak.frequency || "daily";

        // Flexible non-daily habits do NOT auto-populate daily
        if (freq !== "daily" && streak.scheduleType !== "fixed") {
          continue;
        }

        // If non-daily fixed habit, verify if today is the target day
        if (freq !== "daily" && streak.scheduleType === "fixed") {
          if (freq === "weekly") {
            const targetDay = streak.fixedDayOfWeek ?? 1; // default Monday (1)
            if (moment().day() !== targetDay) {
              continue;
            }
          } else if (freq === "monthly") {
            const targetDay = streak.fixedDayOfMonth ?? 1;
            const daysInMonth = moment().daysInMonth();
            const effectiveTarget = Math.min(targetDay, daysInMonth);
            if (moment().date() !== effectiveTarget) {
              continue;
            }
          } else if (freq === "yearly") {
            const targetDate = streak.fixedDateOfYear || "01-01";
            if (moment().format("MM-DD") !== targetDate) {
              continue;
            }
          }
        }

        const cleanStreakName = streak.name.toLowerCase().trim();
        const alreadyExists = todayTasks.some(t => {
          const text = t.text.toLowerCase().trim();
          return text === cleanStreakName || text.includes(cleanStreakName);
        });

        if (!alreadyExists) {
          const added = await taskService.addTask(planFilePath, streak.name, todayStr, false);
          if (added) {
            todayTasks.push({
              id: `today-auto-${streak.id}`,
              text: streak.name,
              completed: false,
              lineNumber: -1,
              rawLine: `- [ ] ${streak.name}`,
              sourceFile: planFilePath,
              dateHeading: todayStr
            });
            anyAdded = true;
          }
        }
      }

      return anyAdded;
    } finally {
      this.isPopulating = false;
    }
  }

  /**
   * Smartly injects a habit into today's tasks list with deduplication and overdue roll-forward.
   */
  public async addHabitToToday(
    planFilePath: string,
    habit: StreakItem,
    taskService: TaskService
  ): Promise<{ success: boolean; message: string }> {
    // 1. Check if already completed in the current cycle
    if (this.isCompletedInCurrentCycle(habit)) {
      const cycleName = habit.frequency === "weekly"
        ? "this week"
        : habit.frequency === "monthly"
        ? "this month"
        : habit.frequency === "yearly"
        ? "this year"
        : "today";
      return { success: false, message: `"${habit.name}" is already completed for ${cycleName}!` };
    }

    const todayStr = moment().format("YYYY-MM-DD");
    const cleanName = habit.name.toLowerCase().trim();

    // 2. Check if already sitting in today's open tasks
    const todayTasks = await taskService.getTodayTasks(planFilePath);
    const alreadyInToday = todayTasks.some(t => {
      const text = t.text.toLowerCase().trim();
      return text === cleanName || text.includes(cleanName);
    });
    if (alreadyInToday) {
      return { success: false, message: `"${habit.name}" is already in today's tasks.` };
    }

    // 3. Check if in overdue tasks: roll forward instead of creating a duplicate!
    const overdueTasks = await taskService.getOverdueTasks(planFilePath);
    const overdueMatch = overdueTasks.find(t => {
      const text = t.text.toLowerCase().trim();
      return text === cleanName || text.includes(cleanName);
    });
    if (overdueMatch) {
      await taskService.deleteTask(overdueMatch.sourceFile, overdueMatch.lineNumber);
      await taskService.addTask(planFilePath, habit.name, todayStr, false);
      return { success: true, message: `Moved overdue "${habit.name}" to today's tasks.` };
    }

    // 4. Clean addition to today
    await taskService.addTask(planFilePath, habit.name, todayStr, false);
    return { success: true, message: `Added "${habit.name}" to today's tasks.` };
  }

  /**
   * Syncs streak completion status when a task is toggled in Today's plan.
   * Supports Daily, Weekly, and Monthly cycle keys with idempotent completion.
   * If a streak breaks, the habit is NEVER removed; currentStreak simply resets or starts fresh at 1.
   */
  public handleTaskToggle(taskText: string, completed: boolean, habits: StreakItem[]): boolean {
    if (!habits || habits.length === 0) return false;

    const cleanTask = taskText.toLowerCase().trim();
    const todayStr = moment().format("YYYY-MM-DD");
    let changed = false;

    for (const streak of habits) {
      const cleanStreak = streak.name.toLowerCase().trim();
      if (cleanTask === cleanStreak || cleanTask.includes(cleanStreak)) {
        if (!streak.history) streak.history = [];

        const freq = streak.frequency || "daily";
        const currentCycle = this.getCurrentCycleKey(streak);
        const prevCycle = this.getPreviousCycleKey(streak);

        if (completed) {
          // Idempotent: don't double count if already credited in this cycle
          if (streak.lastCompletedCycle === currentCycle && freq !== "daily") {
            continue;
          }
          if (streak.lastCompletedDate === todayStr && freq === "daily") {
            continue;
          }

          // Check continuation
          const wasContinuation = streak.lastCompletedCycle === prevCycle || this.isFrozen(streak);
          if (wasContinuation) {
            streak.currentStreak = (streak.currentStreak || 0) + 1;
          } else {
            // Streak broken or fresh start: start fresh at 1 (never remove habit!)
            streak.currentStreak = 1;
          }

          streak.lastCompletedDate = todayStr;
          streak.lastCompletedCycle = currentCycle;
          if (!streak.history.includes(todayStr)) {
            streak.history.push(todayStr);
          }
          if ((streak.currentStreak || 0) > (streak.bestStreak || 0)) {
            streak.bestStreak = streak.currentStreak;
          }
          changed = true;
        } else {
          // Uncompleted
          if (streak.lastCompletedCycle === currentCycle || streak.lastCompletedDate === todayStr) {
            streak.history = streak.history.filter(d => d !== todayStr);
            streak.currentStreak = Math.max(0, (streak.currentStreak || 1) - 1);
            streak.lastCompletedDate = streak.history[streak.history.length - 1] || undefined;
            streak.lastCompletedCycle = undefined;
            changed = true;
          }
        }
        if (changed) {
          streak.journal = this.encodeHabitJournal(streak.history, streak.freezeHistory, streak.startDate);
        }
      }
    }

    return changed;
  }

  /**
   * Archives a habit: moves its section from habitsFile into archiveHabitsFile
   */
  public async archiveHabit(
    habitsFile: string,
    archiveFile: string,
    habitId: string,
    settings: OSDashboardSettings
  ): Promise<boolean> {
    const habits = await this.loadHabits(habitsFile, settings.streaks || []);
    const habitToArchive = habits.find(h => h.id === habitId);
    if (!habitToArchive) return false;

    // Remove from active habits
    const remainingHabits = habits.filter(h => h.id !== habitId);
    await this.saveHabits(habitsFile, remainingHabits, settings.maxFreezesPerMonth || 4);
    settings.streaks = remainingHabits;

    // Load or create archive file
    const archiveHabits = await this.loadHabits(archiveFile, []);
    archiveHabits.push(habitToArchive);
    await this.saveHabits(archiveFile, archiveHabits, settings.maxFreezesPerMonth || 4);

    new Notice(`Archived "${habitToArchive.name}" to ${archiveFile}`);
    return true;
  }

  /**
   * Permanently deletes a habit from habitsFile
   */
  public async deleteHabit(
    habitsFile: string,
    habitId: string,
    settings: OSDashboardSettings
  ): Promise<boolean> {
    const habits = await this.loadHabits(habitsFile, settings.streaks || []);
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return false;

    const remaining = habits.filter(h => h.id !== habitId);
    await this.saveHabits(habitsFile, remaining, settings.maxFreezesPerMonth || 4);
    settings.streaks = remaining;

    new Notice(`Deleted habit "${habit.name}"`);
    return true;
  }

  /**
   * Updates habit name and optional description in habitsFile
   */
  public async updateHabitDetails(
    habitsFile: string,
    habitId: string,
    newName: string,
    newDescription: string | undefined,
    settings: OSDashboardSettings
  ): Promise<boolean> {
    const cleanNewName = newName.trim();
    if (!cleanNewName) return false;

    const habits = await this.loadHabits(habitsFile, settings.streaks || []);
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return false;

    habit.name = cleanNewName;
    habit.description = newDescription ? newDescription.trim().substring(0, 150) : undefined;
    await this.saveHabits(habitsFile, habits, settings.maxFreezesPerMonth || 4);
    settings.streaks = habits;

    new Notice(`Updated habit "${cleanNewName}"`);
    return true;
  }

  /**
   * Renames a habit in habitsFile
   */
  public async renameHabit(
    habitsFile: string,
    habitId: string,
    newName: string,
    settings: OSDashboardSettings
  ): Promise<boolean> {
    return this.updateHabitDetails(habitsFile, habitId, newName, undefined, settings);
  }

  /**
   * Encodes a habit's completion and freeze dates into a compact "chess notation" journal:
   * e.g. "C:2026-10-01~2026-10-05, F:2026-10-06, X:2026-10-07, C:2026-10-08~2026-10-20"
   * C = Completed, F = Frozen, X = Missed/Break
   */
  public encodeHabitJournal(history: string[], freezeHistory: string[] = [], startDate?: string): string {
    const historySet = new Set(history || []);
    const freezeSet = new Set(freezeHistory || []);

    if (historySet.size === 0 && freezeSet.size === 0) {
      return "";
    }

    const allDates = [...historySet, ...freezeSet].sort();
    if (allDates.length === 0) return "";

    const earliestRecorded = allDates[0];
    const originDate = startDate && startDate < earliestRecorded ? startDate : earliestRecorded;
    const latestDate = moment().format("YYYY-MM-DD");
    const endDate = allDates[allDates.length - 1] > latestDate ? allDates[allDates.length - 1] : latestDate;

    const events: Array<{ date: string; type: "C" | "F" | "X" }> = [];
    const curr = moment(originDate, "YYYY-MM-DD");
    const end = moment(endDate, "YYYY-MM-DD");

    while (curr.isSameOrBefore(end)) {
      const dStr = curr.format("YYYY-MM-DD");
      if (historySet.has(dStr)) {
        events.push({ date: dStr, type: "C" });
      } else if (freezeSet.has(dStr)) {
        events.push({ date: dStr, type: "F" });
      } else {
        events.push({ date: dStr, type: "X" });
      }
      curr.add(1, "day");
    }

    if (events.length === 0) return "";

    const chunks: string[] = [];
    let rangeStart = events[0];
    let rangeEnd = events[0];

    for (let i = 1; i < events.length; i++) {
      const ev = events[i];
      if (ev.type === rangeStart.type) {
        rangeEnd = ev;
      } else {
        chunks.push(
          rangeStart.date === rangeEnd.date
            ? `${rangeStart.type}:${rangeStart.date}`
            : `${rangeStart.type}:${rangeStart.date}~${rangeEnd.date}`
        );
        rangeStart = ev;
        rangeEnd = ev;
      }
    }

    chunks.push(
      rangeStart.date === rangeEnd.date
        ? `${rangeStart.type}:${rangeStart.date}`
        : `${rangeStart.type}:${rangeStart.date}~${rangeEnd.date}`
    );

    return chunks.join(", ");
  }

  /**
   * Decodes a "chess notation" journal back into exact completion and freeze dates.
   */
  public decodeHabitJournal(journalStr: string): { history: string[]; freezeHistory: string[] } {
    const history: string[] = [];
    const freezeHistory: string[] = [];

    if (!journalStr || !journalStr.trim()) {
      return { history, freezeHistory };
    }

    const tokens = journalStr.split(",").map(t => t.trim()).filter(Boolean);

    for (const token of tokens) {
      const match = token.match(/^([CFX]):(\d{4}-\d{2}-\d{2})(?:~(\d{4}-\d{2}-\d{2}))?$/i);
      if (!match) continue;

      const type = match[1].toUpperCase();
      const startStr = match[2];
      const endStr = match[3] || startStr;

      const curr = moment(startStr, "YYYY-MM-DD");
      const end = moment(endStr, "YYYY-MM-DD");

      while (curr.isSameOrBefore(end)) {
        const dStr = curr.format("YYYY-MM-DD");
        if (type === "C") {
          history.push(dStr);
        } else if (type === "F") {
          freezeHistory.push(dStr);
        }
        curr.add(1, "day");
      }
    }

    return {
      history: Array.from(new Set(history)).sort(),
      freezeHistory: Array.from(new Set(freezeHistory)).sort()
    };
  }

  /**
   * Recalculates currentStreak and bestStreak from history and freezeHistory
   */
  public recalculateStreak(streak: StreakItem): void {
    const completedSet = new Set(streak.history || []);
    const freezeSet = new Set(streak.freezeHistory || []);

    if (completedSet.size === 0) {
      streak.currentStreak = 0;
      streak.lastCompletedDate = undefined;
      streak.journal = this.encodeHabitJournal([], streak.freezeHistory || [], streak.startDate);
      return;
    }

    const sortedCompleted = Array.from(completedSet).sort();
    streak.lastCompletedDate = sortedCompleted[sortedCompleted.length - 1];

    const todayStr = moment().format("YYYY-MM-DD");
    const yesterdayStr = moment().subtract(1, "day").format("YYYY-MM-DD");

    let current = 0;
    let checkDate = completedSet.has(todayStr)
      ? moment()
      : (freezeSet.has(todayStr) || completedSet.has(yesterdayStr) ? moment().subtract(1, "day") : null);

    if (checkDate) {
      while (true) {
        const dStr = checkDate.format("YYYY-MM-DD");
        if (completedSet.has(dStr)) {
          current++;
          checkDate.subtract(1, "day");
        } else if (freezeSet.has(dStr)) {
          checkDate.subtract(1, "day");
        } else {
          break;
        }
      }
    }
    streak.currentStreak = current;

    let best = 0;
    let run = 0;
    if (sortedCompleted.length > 0) {
      const earliest = sortedCompleted[0];
      const latest = sortedCompleted[sortedCompleted.length - 1];
      const iter = moment(earliest, "YYYY-MM-DD");
      const endIter = moment(latest, "YYYY-MM-DD");

      while (iter.isSameOrBefore(endIter)) {
        const dStr = iter.format("YYYY-MM-DD");
        if (completedSet.has(dStr)) {
          run++;
          if (run > best) best = run;
        } else if (!freezeSet.has(dStr)) {
          run = 0;
        }
        iter.add(1, "day");
      }
    }
    streak.bestStreak = Math.max(best, streak.currentStreak, streak.bestStreak || 0);

    streak.journal = this.encodeHabitJournal(streak.history, streak.freezeHistory, streak.startDate);
  }

  private async ensureFolderForFile(filePath: string): Promise<void> {
    const lastSlash = filePath.lastIndexOf("/");
    if (lastSlash === -1) return;
    const folderPath = filePath.substring(0, lastSlash);
    const existing = this.app.vault.getAbstractFileByPath(folderPath);
    if (!existing) {
      try {
        await this.app.vault.createFolder(folderPath);
      } catch {}
    }
  }
}
