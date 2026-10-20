import { App, Modal, Setting, Notice } from "obsidian";

export class QuoteModal extends Modal {
  private quote: string;
  private author: string;
  private onSave: (quote: string, author: string) => Promise<void>;

  constructor(
    app: App,
    quote: string,
    author: string,
    onSave: (quote: string, author: string) => Promise<void>
  ) {
    super(app);
    this.quote = quote;
    this.author = author;
    this.onSave = onSave;
  }

  public onOpen(): void {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("os-quote-modal");

    contentEl.createEl("h2", { text: "Edit Quote Widget" });

    // Quote text
    new Setting(contentEl)
      .setName("Quote Text")
      .setDesc("The motivational quote displayed in the quote card.")
      .addTextArea(text => {
        text.setValue(this.quote)
          .setPlaceholder("“Consistency is more important than intensity.”")
          .onChange(val => {
            this.quote = val;
          });
        text.inputEl.rows = 4;
        text.inputEl.style.width = "100%";
      });

    // Author
    new Setting(contentEl)
      .setName("Author")
      .setDesc("Quote author or source (optional).")
      .addText(text => {
        text.setValue(this.author)
          .setPlaceholder("e.g. Marcus Aurelius")
          .onChange(val => {
            this.author = val;
          });
      });

    // Buttons
    new Setting(contentEl)
      .addButton(btn => {
        btn.setButtonText("Cancel")
          .onClick(() => this.close());
      })
      .addButton(btn => {
        btn.setButtonText("Save Quote")
          .setCta()
          .onClick(async () => {
            const finalQuote = this.quote.trim();
            if (!finalQuote) {
              new Notice("Quote text cannot be empty.");
              return;
            }
            await this.onSave(finalQuote, this.author.trim());
            this.close();
          });
      });
  }

  public onClose(): void {
    this.contentEl.empty();
  }
}
