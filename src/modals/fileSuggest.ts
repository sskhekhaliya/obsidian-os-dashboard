import { AbstractInputSuggest, App, TFile } from "obsidian";

/**
 * Provides Obsidian vault file auto-suggestions for file path inputs in settings.
 */
export class FileSuggest extends AbstractInputSuggest<TFile> {
  protected inputEl: HTMLInputElement;
  private onSelectCb?: (file: TFile) => void;

  constructor(app: App, inputEl: HTMLInputElement, onSelect?: (file: TFile) => void) {
    super(app, inputEl);
    this.inputEl = inputEl;
    this.onSelectCb = onSelect;
  }

  protected getSuggestions(query: string): TFile[] {
    const cleanQuery = query.toLowerCase().trim();
    const markdownFiles = this.app.vault.getMarkdownFiles();

    if (!cleanQuery) {
      return markdownFiles.slice(0, 20);
    }

    return markdownFiles
      .filter(f => f.path.toLowerCase().includes(cleanQuery) || f.basename.toLowerCase().includes(cleanQuery))
      .slice(0, 25);
  }

  public renderSuggestion(file: TFile, el: HTMLElement): void {
    el.empty();
    const item = el.createDiv({ cls: "os-wikilink-suggest-item" });
    item.createSpan({ cls: "os-wikilink-title", text: file.basename });
    if (file.parent && file.parent.path !== "" && file.parent.path !== "/") {
      item.createSpan({ cls: "os-wikilink-folder", text: file.parent.path });
    }
  }

  public selectSuggestion(file: TFile): void {
    this.inputEl.value = file.path;
    this.inputEl.dispatchEvent(new Event("change", { bubbles: true }));
    this.inputEl.dispatchEvent(new Event("input", { bubbles: true }));
    if (this.onSelectCb) {
      this.onSelectCb(file);
    }
    this.close();
  }
}
