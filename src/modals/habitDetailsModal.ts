import { App, Modal, setIcon, Notice } from "obsidian";
import { StreakItem, OSDashboardSettings, moment } from "../types";
import { StreakService } from "../services/streakService";
import { StreakModal } from "./streakModal";
import { FreezeStreakModal } from "./freezeStreakModal";

export class HabitDetailsModal extends Modal {
  private streak: StreakItem;
  private streakService: StreakService;
  private settings: OSDashboardSettings;
  private onUpdated: () => Promise<void>;
  private viewDate: any;

  constructor(
    app: App,
    streak: StreakItem,
    streakService: StreakService,
    settings: OSDashboardSettings,
    onUpdated: () => Promise<void>
  ) {
    super(app);
    this.streak = streak;
    this.streakService = streakService;
    this.settings = settings;
    this.onUpdated = onUpdated;
    this.viewDate = moment();
  }

  public onOpen(): void {
    const { contentEl } = this;
    contentEl.empty();
    this.modalEl.addClass("os-habit-modal-dialog");
    contentEl.addClass("os-habit-details-modal");

    this.renderModalContent();
  }

  private renderModalContent(): void {
    const { contentEl } = this;
    contentEl.empty();

    const freq = this.streak.frequency || "daily";
    const isFrozen = this.streakService.isFrozen(this.streak);
    const isDone = this.streakService.isCompletedInCurrentCycle(this.streak);
    const maxFreezes = this.settings.maxFreezesPerMonth || 4;
    const habitMaxFreezes = this.streakService.getEffectiveMaxFreezes(this.streak, maxFreezes);
    const usedFreezes = this.streakService.getFreezesUsedThisMonth(this.streak);
    const streakUnit = freq === "weekly" ? "wks" : freq === "monthly" ? "mos" : freq === "yearly" ? "yrs" : "days";

    // --- 1. Fixed Header ---
    const header = contentEl.createDiv({ cls: "os-hdetail-fixed-header" });

    // Title + Description Block with Icon matching combined height
    const titleBlock = header.createDiv({ cls: "os-hdetail-title-block" });

    const iconWrap = titleBlock.createDiv({ cls: "os-hdetail-title-icon" });
    setIcon(iconWrap, this.streak.icon || "flame");

    const textWrap = titleBlock.createDiv({ cls: "os-hdetail-title-desc" });
    textWrap.createEl("h2", { cls: "os-hdetail-title", text: this.streak.name });

    // Habit detail/description directly below title
    if (this.streak.description && this.streak.description.trim()) {
      textWrap.createDiv({
        cls: "os-hdetail-desc-inline",
        text: this.streak.description.trim()
      });
    }

    // Badges Row
    const badgesRow = header.createDiv({ cls: "os-hdetail-badges" });
    badgesRow.createSpan({
      cls: "os-hdetail-badge os-badge-freq",
      text: freq.toUpperCase() + (freq !== "daily" && this.streak.scheduleType === "fixed" ? " (FIXED)" : "")
    });

    if (isFrozen) {
      badgesRow.createSpan({
        cls: "os-hdetail-badge os-badge-frozen",
        text: `❄️ FROZEN (${this.streakService.getFreezeDaysLeft(this.streak)}d left)`
      });
    }

    if (this.streak.startDate) {
      badgesRow.createSpan({
        cls: "os-hdetail-badge os-badge-date",
        text: `Started ${this.streak.startDate}`
      });
    }

    badgesRow.createSpan({
      cls: "os-hdetail-badge os-badge-quota",
      text: `❄️ ${usedFreezes}/${habitMaxFreezes} Freezes`
    });

    // --- 2. Scrollable Body ---
    const bodyEl = contentEl.createDiv({ cls: "os-hdetail-scrollable-body" });

    // Stats Grid (4 clean cards fitting 100% width)
    const statsGrid = bodyEl.createDiv({ cls: "os-hdetail-stats" });

    // Current Streak
    const statCurr = statsGrid.createDiv({ cls: "os-hdetail-stat-card" });
    statCurr.createDiv({ cls: "os-hdetail-stat-label", text: "Current" });
    statCurr.createDiv({
      cls: `os-hdetail-stat-val ${isDone ? "is-active" : ""}`,
      text: `${this.streak.currentStreak || 0} ${streakUnit}`
    });

    // Best Streak
    const statBest = statsGrid.createDiv({ cls: "os-hdetail-stat-card" });
    statBest.createDiv({ cls: "os-hdetail-stat-label", text: "Best" });
    statBest.createDiv({
      cls: "os-hdetail-stat-val",
      text: `${this.streak.bestStreak || 0} ${streakUnit}`
    });

    // Total Days Done
    const totalDone = (this.streak.history || []).length;
    const statTotal = statsGrid.createDiv({ cls: "os-hdetail-stat-card" });
    statTotal.createDiv({ cls: "os-hdetail-stat-label", text: "Total" });
    statTotal.createDiv({ cls: "os-hdetail-stat-val", text: `${totalDone}` });

    // Completion Rate %
    let rateStr = "100%";
    if (this.streak.startDate) {
      const startMom = moment(this.streak.startDate, "YYYY-MM-DD");
      const daysSince = Math.max(1, moment().diff(startMom, "days") + 1);
      const pct = Math.min(100, Math.round((totalDone / daysSince) * 100));
      rateStr = `${pct}%`;
    }
    const statRate = statsGrid.createDiv({ cls: "os-hdetail-stat-card" });
    statRate.createDiv({ cls: "os-hdetail-stat-label", text: "Rate" });
    statRate.createDiv({ cls: "os-hdetail-stat-val", text: rateStr });

    // Visual Calendar (Matching OS Dashboard Right Rail Calendar UI)
    const calCard = bodyEl.createDiv({ cls: "os-calendar-section os-habit-cal-container" });

    // 1. Clean Calendar Header
    const calHeader = calCard.createDiv({ cls: "os-calendar-header" });
    const leftWrap = calHeader.createDiv({ cls: "os-calendar-header-left" });
    const title = leftWrap.createDiv({
      cls: "os-calendar-title",
      text: this.viewDate.format("MMMM YYYY")
    });
    title.setAttribute("title", "Click to jump to current month");
    title.addEventListener("click", () => {
      this.viewDate = moment();
      this.renderModalContent();
    });

    const isCurrentMonth = this.viewDate.isSame(moment(), "month");

    const nav = calHeader.createDiv({ cls: "os-calendar-nav" });

    // Permanent Google Calendar style Today Icon Button with current day number
    const todayIconBtn = nav.createDiv({
      cls: `os-calendar-today-icon-btn ${isCurrentMonth ? "is-current" : "is-navigated"}`,
      title: `Jump to today (${moment().format("MMM D")})`
    });
    todayIconBtn.createDiv({ cls: "os-cal-today-icon-bar" });
    todayIconBtn.createSpan({
      cls: "os-cal-today-icon-day",
      text: moment().format("D")
    });
    todayIconBtn.addEventListener("click", () => {
      this.viewDate = moment();
      this.renderModalContent();
    });

    const prevBtn = nav.createDiv({ cls: "os-calendar-nav-btn", title: "Previous month" });
    setIcon(prevBtn, "chevron-left");
    prevBtn.addEventListener("click", () => {
      this.viewDate.subtract(1, "month");
      this.renderModalContent();
    });

    const nextBtn = nav.createDiv({ cls: "os-calendar-nav-btn", title: "Next month" });
    setIcon(nextBtn, "chevron-right");
    nextBtn.addEventListener("click", () => {
      this.viewDate.add(1, "month");
      this.renderModalContent();
    });

    // 2. Weekdays Header (Mon - Sun)
    const weekdaysRow = calCard.createDiv({ cls: "os-calendar-weekdays" });
    const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    weekdays.forEach(day => {
      weekdaysRow.createDiv({ cls: "os-calendar-weekday", text: day });
    });

    // 3. Days Grid
    const daysGrid = calCard.createDiv({ cls: "os-calendar-grid" });
    const startOfMonth = this.viewDate.clone().startOf("month");
    const daysInMonth = this.viewDate.daysInMonth();
    let startDayOfWeek = (startOfMonth.day() + 6) % 7;

    const prevMonth = this.viewDate.clone().subtract(1, "month");
    const daysInPrevMonth = prevMonth.daysInMonth();
    const nextMonth = this.viewDate.clone().add(1, "month");
    const todayStr = moment().format("YYYY-MM-DD");
    const completedSet = new Set(this.streak.history || []);
    const freezeSet = new Set(this.streak.freezeHistory || []);
    const startStr = this.streak.startDate || "1970-01-01";

    // Trailing days from previous month
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const dayNum = daysInPrevMonth - i;
      const dayMoment = prevMonth.clone().date(dayNum);
      const dStr = dayMoment.format("YYYY-MM-DD");
      const isCompleted = completedSet.has(dStr);
      const isFrozenDay = freezeSet.has(dStr);
      const isBeforeStart = dStr < startStr;
      const isMissed = !isCompleted && !isFrozenDay && !isBeforeStart;

      const dayEl = daysGrid.createDiv({
        cls: `os-calendar-day is-other-month ${isCompleted ? "is-habit-completed" : ""} ${isFrozenDay ? "is-habit-frozen" : ""} ${isMissed ? "is-habit-missed" : ""}`
      });
      const numWrap = dayEl.createDiv({ cls: "os-calendar-day-num-wrap" });
      numWrap.createSpan({ cls: "os-calendar-day-num", text: String(dayNum) });

      if (isCompleted || isFrozenDay || isMissed) {
        const dotsWrap = dayEl.createDiv({ cls: "os-calendar-event-dots" });
        const dot = dotsWrap.createSpan({ cls: "os-calendar-dot" });
        if (isCompleted) dot.addClass("os-dot-completed");
        else if (isFrozenDay) dot.addClass("os-dot-frozen");
        else if (isMissed) dot.addClass("os-dot-missed");
      }

      dayEl.setAttribute("title", `${dayMoment.format("MMM D, YYYY")} (Click to view month)`);
      dayEl.addEventListener("click", () => {
        this.viewDate.subtract(1, "month");
        this.renderModalContent();
      });
    }

    // Days of current month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayMoment = this.viewDate.clone().date(day);
      const dStr = dayMoment.format("YYYY-MM-DD");
      const isToday = dStr === todayStr;
      const isFuture = dayMoment.isAfter(moment(), "day");
      const isBeforeStart = dStr < startStr;

      const isCompleted = completedSet.has(dStr);
      const isFrozenDay = freezeSet.has(dStr);
      const isMissed = !isCompleted && !isFrozenDay && !isFuture && !isBeforeStart;

      const dayEl = daysGrid.createDiv({
        cls: `os-calendar-day ${isToday ? "is-today" : ""} ${isCompleted ? "is-habit-completed" : ""} ${isFrozenDay ? "is-habit-frozen" : ""} ${isMissed ? "is-habit-missed" : ""}`
      });

      const numWrap = dayEl.createDiv({ cls: "os-calendar-day-num-wrap" });
      numWrap.createSpan({ cls: "os-calendar-day-num", text: String(day) });

      // Habit Status Dot (clean dot under number, exactly like OS Dashboard event dots)
      if (isCompleted || isFrozenDay || isMissed) {
        const dotsWrap = dayEl.createDiv({ cls: "os-calendar-event-dots" });
        const dot = dotsWrap.createSpan({ cls: "os-calendar-dot" });
        if (isCompleted) dot.addClass("os-dot-completed");
        else if (isFrozenDay) dot.addClass("os-dot-frozen");
        else if (isMissed) dot.addClass("os-dot-missed");
      }

      // Tooltip
      if (isCompleted) {
        dayEl.setAttribute("title", `${dayMoment.format("MMM D, YYYY")} — Completed ✓ (Click to toggle)`);
      } else if (isFrozenDay) {
        dayEl.setAttribute("title", `${dayMoment.format("MMM D, YYYY")} — Frozen ❄️`);
      } else if (isMissed) {
        dayEl.setAttribute("title", `${dayMoment.format("MMM D, YYYY")} — Missed ✗ (Click to toggle)`);
      } else if (isToday) {
        dayEl.setAttribute("title", `${dayMoment.format("MMM D, YYYY")} — Today (Click to toggle)`);
      } else {
        dayEl.setAttribute("title", dayMoment.format("MMM D, YYYY"));
      }

      // Interactive toggle for valid dates
      if (!isFuture && !isBeforeStart) {
        dayEl.addClass("is-interactive");
        dayEl.addEventListener("click", async () => {
          if (completedSet.has(dStr)) {
            this.streak.history = (this.streak.history || []).filter(d => d !== dStr);
            new Notice(`Unmarked ${dayMoment.format("MMM D, YYYY")}`);
          } else {
            if (!this.streak.history) this.streak.history = [];
            this.streak.history.push(dStr);
            this.streak.history.sort();
            new Notice(`Marked ${dayMoment.format("MMM D, YYYY")} as completed!`);
          }
          this.streakService.recalculateStreak(this.streak);
          await this.onUpdated();
          this.renderModalContent();
        });
      }
    }

    // Trailing days of next month to fill standard 35 or 42 cell grid
    const totalCells = startDayOfWeek + daysInMonth;
    const targetCells = totalCells > 35 ? 42 : 35;
    const remainingDays = targetCells - totalCells;
    for (let day = 1; day <= remainingDays; day++) {
      const dayMoment = nextMonth.clone().date(day);
      const dStr = dayMoment.format("YYYY-MM-DD");
      const dayEl = daysGrid.createDiv({
        cls: "os-calendar-day is-other-month"
      });
      const numWrap = dayEl.createDiv({ cls: "os-calendar-day-num-wrap" });
      numWrap.createSpan({ cls: "os-calendar-day-num", text: String(day) });
      dayEl.setAttribute("title", `${dayMoment.format("MMM D, YYYY")} (Click to view month)`);
      dayEl.addEventListener("click", () => {
        this.viewDate.add(1, "month");
        this.renderModalContent();
      });
    }

    // 4. Sleek Minimal Legend
    const legend = calCard.createDiv({ cls: "os-habit-cal-legend" });
    const legDone = legend.createDiv({ cls: "os-habit-legend-item" });
    legDone.createSpan({ cls: "os-calendar-dot os-dot-completed" });
    legDone.createSpan({ text: "Completed" });

    const legFreeze = legend.createDiv({ cls: "os-habit-legend-item" });
    legFreeze.createSpan({ cls: "os-calendar-dot os-dot-frozen" });
    legFreeze.createSpan({ text: "Frozen" });

    const legMissed = legend.createDiv({ cls: "os-habit-legend-item" });
    legMissed.createSpan({ cls: "os-calendar-dot os-dot-missed" });
    legMissed.createSpan({ text: "Missed" });

    // --- 3. Fixed Footer ---
    const footer = contentEl.createDiv({ cls: "os-hdetail-fixed-footer" });

    // Freeze Button
    const freezeBtn = footer.createEl("button", {
      cls: isFrozen ? "mod-warning" : "",
      text: isFrozen ? "Manage Freeze" : "Freeze Habit"
    });
    freezeBtn.addEventListener("click", () => {
      this.close();
      new FreezeStreakModal(this.app, this.streak, this.streakService, habitMaxFreezes, async () => {
        await this.onUpdated();
      }).open();
    });

    // Edit Button
    const editBtn = footer.createEl("button", { text: "Edit Habit..." });
    editBtn.addEventListener("click", () => {
      this.close();
      new StreakModal(this.app, this.streak, async (updated) => {
        await this.streakService.updateHabitDetails(
          this.settings.habitsFile || "Habits.md",
          this.streak.id,
          updated.name,
          updated.description,
          this.settings
        );
        await this.onUpdated();
      }).open();
    });

    // Close Button
    const closeBtn = footer.createEl("button", { text: "Close", cls: "mod-cta" });
    closeBtn.addEventListener("click", () => {
      this.close();
    });
  }

  public onClose(): void {
    this.contentEl.empty();
  }
}
