import { App, Modal, Setting, setIcon } from "obsidian";
import { OSDashboardSettings, FolderStyleOverride } from "../types";
import { IconService } from "../services/iconService";
import { initModalCloseButton } from "./modalUtils";

export class FolderStyleModal extends Modal {
  private folderPath: string;
  private folderName: string;
  private settings: OSDashboardSettings;
  private iconService: IconService;
  private onSave: () => Promise<void>;

  private currentIcon: string;
  private currentColor: string;

  constructor(
    app: App,
    folderPath: string,
    folderName: string,
    settings: OSDashboardSettings,
    iconService: IconService,
    onSave: () => Promise<void>
  ) {
    super(app);
    this.folderPath = folderPath;
    this.folderName = folderName;
    this.settings = settings;
    this.iconService = iconService;
    this.onSave = onSave;

    const existing = settings.folderOverrides?.[folderPath] || settings.folderOverrides?.[folderName];
    const initialResolved = this.iconService.resolveFolderIcon(folderPath, folderName, 0, settings);

    this.currentIcon = existing?.icon || (initialResolved.type === "emoji" ? initialResolved.value : (initialResolved.value || ""));
    this.currentColor = existing?.color || initialResolved.color || "#3b82f6";
  }

  public onOpen(): void {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("os-folder-style-modal");
    initModalCloseButton(this);

    contentEl.createEl("h2", { text: `Folder Style: ${this.folderName}` });
    const sub = contentEl.createDiv({ cls: "os-modal-desc" });
    sub.setText(`Customize the icon and color for "${this.folderPath}" in the Navigation Ribbon and throughout the dashboard.`);

    // Live Preview Banner
    const previewWrap = contentEl.createDiv({ cls: "os-folder-preview-wrap" });
    const previewIconWrap = previewWrap.createDiv({ cls: "os-folder-preview-icon" });
    const previewTitle = previewWrap.createDiv({ cls: "os-folder-preview-title", text: this.folderName });

    const updatePreview = () => {
      previewWrap.style.setProperty("--preview-accent", this.currentColor);
      previewIconWrap.empty();
      if (this.currentIcon) {
        if (/^\p{Extended_Pictographic}/u.test(this.currentIcon)) {
          const span = previewIconWrap.createSpan({ text: this.currentIcon });
          span.style.fontSize = "22px";
        } else {
          try {
            setIcon(previewIconWrap, this.currentIcon);
          } catch {
            setIcon(previewIconWrap, "folder");
          }
        }
      } else {
        setIcon(previewIconWrap, "folder");
      }
      previewIconWrap.style.color = this.currentColor;
    };

    updatePreview();

    // 1. Icon Input
    new Setting(contentEl)
      .setName("Icon")
      .setDesc("Lucide icon name (e.g. folder, book-open, briefcase, flame) or paste an Emoji (e.g. 📚, 🔥).")
      .addText(text => {
        text.setPlaceholder("e.g. book-open, briefcase, or 📚")
          .setValue(this.currentIcon)
          .onChange(val => {
            this.currentIcon = val.trim();
            updatePreview();
          });
        text.inputEl.style.width = "100%";
      });

    // 2. Color Accent
    const colorSetting = new Setting(contentEl)
      .setName("Color Accent")
      .setDesc("Select from the palette or pick a custom hex color.");

    const colorControls = colorSetting.controlEl.createDiv({ cls: "os-color-picker-group" });

    // HTML5 native color picker
    const nativeColorInput = colorControls.createEl("input", {
      type: "color",
      cls: "os-native-color-picker"
    });
    nativeColorInput.value = this.currentColor.startsWith("#") && this.currentColor.length === 7 ? this.currentColor : "#3b82f6";

    // Text hex input
    const hexInput = colorControls.createEl("input", {
      type: "text",
      cls: "os-hex-color-input"
    });
    hexInput.value = this.currentColor;
    hexInput.placeholder = "#3b82f6";

    nativeColorInput.addEventListener("input", () => {
      this.currentColor = nativeColorInput.value;
      hexInput.value = this.currentColor;
      updatePreview();
      updateSelectedSwatch();
    });

    hexInput.addEventListener("input", () => {
      const val = hexInput.value.trim();
      if (/^#[0-9a-fA-F]{6}$/.test(val)) {
        this.currentColor = val;
        nativeColorInput.value = val;
        updatePreview();
        updateSelectedSwatch();
      }
    });

    // Palette Swatches
    const swatchWrap = contentEl.createDiv({ cls: "os-color-swatches" });
    const swatches: HTMLElement[] = [];

    const updateSelectedSwatch = () => {
      swatches.forEach(s => {
        if (s.getAttribute("data-color")?.toLowerCase() === this.currentColor.toLowerCase()) {
          s.addClass("is-selected");
        } else {
          s.removeClass("is-selected");
        }
      });
    };

    for (const hex of IconService.COLOR_PALETTE) {
      const swatch = swatchWrap.createDiv({
        cls: `os-color-swatch ${this.currentColor.toLowerCase() === hex.toLowerCase() ? "is-selected" : ""}`,
        title: hex
      });
      swatch.setAttribute("data-color", hex);
      swatch.style.backgroundColor = hex;
      swatches.push(swatch);

      swatch.addEventListener("click", () => {
        this.currentColor = hex;
        nativeColorInput.value = hex;
        hexInput.value = hex;
        updatePreview();
        updateSelectedSwatch();
      });
    }

    // Action Buttons
    const btnRow = new Setting(contentEl);

    // Reset button
    btnRow.addButton(btn => {
      btn.setButtonText("Reset to Default")
        .setClass("os-btn-danger")
        .onClick(async () => {
          if (!this.settings.folderOverrides) {
            this.settings.folderOverrides = {};
          }
          delete this.settings.folderOverrides[this.folderPath];
          delete this.settings.folderOverrides[this.folderName];
          await this.onSave();
          this.close();
        });
    });

    // Cancel button
    btnRow.addButton(btn => {
      btn.setButtonText("Cancel")
        .onClick(() => this.close());
    });

    // Save button
    btnRow.addButton(btn => {
      btn.setButtonText("Save Style")
        .setCta()
        .onClick(async () => {
          if (!this.settings.folderOverrides) {
            this.settings.folderOverrides = {};
          }
          this.settings.folderOverrides[this.folderPath] = {
            icon: this.currentIcon || undefined,
            color: this.currentColor || undefined
          };
          await this.onSave();
          this.close();
        });
    });
  }

  public onClose(): void {
    const { contentEl } = this;
    contentEl.empty();
  }
}
