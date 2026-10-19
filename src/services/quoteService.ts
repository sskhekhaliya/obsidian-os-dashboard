import { App } from "obsidian";
import { OSDashboardSettings } from "../types";

export class QuoteService {
  private app: App;

  constructor(app: App) {
    this.app = app;
  }

  public getTopQuote(settings: OSDashboardSettings): string {
    return settings.quoteTop || "A better me\na brighter tomorrow.";
  }

  public getMainQuote(settings: OSDashboardSettings): string {
    return settings.quoteMain || "“Discipline today creates the freedom tomorrow.”";
  }
}
