import { App, Modal, Setting, setIcon, Notice } from "obsidian";
import { StreakItem } from "../types";
import { StreakService } from "../services/streakService";
import { initModalCloseButton } from "./modalUtils";

export class FreezeStreakModal extends Modal {
  private streak: StreakItem;
  private streakService: StreakService;
  private maxFreezesPerMonth: number;
  private onUpdated: () => Promise<void>;
  private customDays: number = 1;

  constructor(
    app: App,
    streak: StreakItem,
    streakService: StreakService,
    maxFreezesPerMonth: number,
    onUpdated: () => Promise<void>
  ) {
    super(app);
    this.streak = streak;
    this.streakService = streakService;
    this.maxFreezesPerMonth = maxFreezesPerMonth || 4;
    this.onUpdated = onUpdated;
  }

  public onOpen(): void {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("os-freeze-modal");
    initModalCloseButton(this);

    const header = contentEl.createDiv({ cls: "os-modal-header" });
    const iconSpan = header.createSpan({ cls: "os-modal-header-icon" });
    setIcon(iconSpan, "snowflake");
    header.createEl("h2", { text: `Freeze Habit: "${this.streak.name}"` });

    const isFrozen = this.streakService.isFrozen(this.streak);
    const period = this.streak.freezePeriodType || "monthly";
    const periodLabel = period === "weekly" ? "Week" : period === "yearly" ? "Year" : "Month";
    const quota = this.streakService.getEffectiveFreezeQuota(this.streak, this.maxFreezesPerMonth);
    const used = this.streakService.getFreezesUsedInCurrentPeriod(this.streak);
    const remainingDays = this.streakService.getFreezesRemainingInCurrentPeriod(this.streak, this.maxFreezesPerMonth);

    // Quota banner
    const quotaCard = contentEl.createDiv({ cls: "os-freeze-quota-card" });
    quotaCard.createSpan({
      text: `Freeze Allowance (${periodLabel}): ${used} used / ${quota} allowed (${remainingDays} day${remainingDays === 1 ? "" : "s"} left this ${period})`
    });

    if (isFrozen) {
      const daysLeft = this.streakService.getFreezeDaysLeft(this.streak);
      contentEl.createEl("p", {
        cls: "os-freeze-status is-frozen",
        text: `Currently frozen until ${this.streak.frozenUntil} (${daysLeft} day${daysLeft === 1 ? "" : "s"} remaining). Missed days during this period will not reset your streak.`
      });
    } else {
      contentEl.createEl("p", {
        cls: "os-freeze-status",
        text: "Taking a break, traveling, or sick? Freezing protects your streak from breaking while you are away."
      });
    }

    if (remainingDays <= 0 && !isFrozen) {
      contentEl.createEl("p", {
        cls: "os-freeze-status is-limit-reached",
        text: `You have used all freeze days for this ${period}. New freeze allowance will become available when the ${period} resets.`
      });
    } else if (!isFrozen) {
      // Quick Freeze Buttons (only for options <= remainingDays)
      const btnSection = contentEl.createDiv({ cls: "os-freeze-quick-buttons" });
      const options = [
        { label: "1 Day", days: 1 },
        { label: "2 Days", days: 2 },
        { label: "3 Days", days: 3 },
        { label: "5 Days", days: 5 },
        { label: "7 Days", days: 7 }
      ].filter(opt => opt.days <= remainingDays);

      options.forEach(opt => {
        const btn = btnSection.createEl("button", {
          cls: "os-freeze-quick-btn",
          text: `Freeze ${opt.label}`
        });
        btn.addEventListener("click", async () => {
          const success = this.streakService.freezeStreak(this.streak, opt.days, this.maxFreezesPerMonth);
          if (success) {
            await this.onUpdated();
            this.close();
          }
        });
      });

      // Custom Days Input
      const defaultCustom = Math.min(2, remainingDays);
      this.customDays = defaultCustom;
      new Setting(contentEl)
        .setName("Custom Freeze Days")
        .setDesc(`Enter days to freeze (up to ${remainingDays} days allowed this month).`)
        .addText(text => {
          text.inputEl.type = "number";
          text.inputEl.max = String(remainingDays);
          text.inputEl.min = "1";
          text.setValue(String(defaultCustom))
            .onChange(val => {
              const n = parseInt(val, 10);
              this.customDays = isNaN(n) ? 1 : Math.max(1, Math.min(n, remainingDays));
            });
        })
        .addButton(btn => {
          btn.setButtonText("Apply Freeze")
            .setCta()
            .onClick(async () => {
              const success = this.streakService.freezeStreak(this.streak, this.customDays, this.maxFreezesPerMonth);
              if (success) {
                await this.onUpdated();
                this.close();
              }
            });
        });
    }

    // Unfreeze button if frozen
    if (isFrozen) {
      new Setting(contentEl)
        .setName("Unfreeze Now")
        .setDesc("Resume your daily streak tracking immediately.")
        .addButton(btn => {
          btn.setButtonText("Unfreeze Habit")
            .setWarning()
            .onClick(async () => {
              this.streakService.unfreezeStreak(this.streak);
              await this.onUpdated();
              this.close();
            });
        });
    }
  }

  public onClose(): void {
    this.contentEl.empty();
  }
}
