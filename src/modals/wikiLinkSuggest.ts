import { AbstractInputSuggest, App, TFile } from "obsidian";

/**
 * Provides Obsidian-native [[wikilink]] auto-suggestions for task inputs.
 * Activates when the user types '[[' and suggests matching vault notes.
 */
export class WikiLinkSuggest extends AbstractInputSuggest<TFile> {
  protected inputEl: HTMLInputElement;

  constructor(app: App, inputEl: HTMLInputElement) {
    super(app, inputEl);
    this.inputEl = inputEl;
  }

  protected getSuggestions(query: string): TFile[] {
    const cursor = this.inputEl.selectionStart ?? this.inputEl.value.length;
    const textBeforeCursor = this.inputEl.value.slice(0, cursor);

    // Look for an open [[ that hasn't been closed by ]]
    const openBracketIndex = textBeforeCursor.lastIndexOf("[[");
    if (openBracketIndex === -1) {
      return [];
    }

    const sub = textBeforeCursor.slice(openBracketIndex + 2);
    if (sub.includes("]]")) {
      return [];
    }

    const cleanQuery = sub.toLowerCase().trim();
    const markdownFiles = this.app.vault.getMarkdownFiles();

    if (!cleanQuery) {
      return markdownFiles.slice(0, 20);
    }

    return markdownFiles
      .filter(f => f.basename.toLowerCase().includes(cleanQuery) || f.path.toLowerCase().includes(cleanQuery))
      .slice(0, 20);
  }

  public renderSuggestion(file: TFile, el: HTMLElement): void {
    el.empty();
    const item = el.createDiv({ cls: "os-wikilink-suggest-item" });
    item.createSpan({ cls: "os-wikilink-title", text: file.basename });
    if (file.parent && file.parent.path !== "/") {
      item.createSpan({ cls: "os-wikilink-folder", text: file.parent.path });
    }
  }

  public selectSuggestion(file: TFile): void {
    const cursor = this.inputEl.selectionStart ?? this.inputEl.value.length;
    const text = this.inputEl.value;
    const textBeforeCursor = text.slice(0, cursor);
    const textAfterCursor = text.slice(cursor);

    const openBracketIndex = textBeforeCursor.lastIndexOf("[[");
    if (openBracketIndex === -1) return;

    // Check if there is already closing ]] after cursor
    const hasClosingBrackets = textAfterCursor.startsWith("]]");
    const prefix = text.slice(0, openBracketIndex);
    const suffix = hasClosingBrackets ? textAfterCursor.slice(2) : textAfterCursor;

    const replacement = `[[${file.basename}]]`;
    this.inputEl.value = `${prefix}${replacement}${suffix}`;

    // Set cursor right after the closing brackets
    const newCursor = prefix.length + replacement.length;
    this.inputEl.setSelectionRange(newCursor, newCursor);

    this.inputEl.dispatchEvent(new Event("input", { bubbles: true }));
    this.close();
  }

  /**
   * Returns true if the suggestion popover is currently displayed on screen.
   */
  public isSuggestOpen(): boolean {
    return Boolean(
      (this as any).isOpen ||
      ((this as any).suggestEl && document.body.contains((this as any).suggestEl))
    );
  }
}
