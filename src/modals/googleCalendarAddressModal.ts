import { App, Modal, Setting, Notice } from "obsidian";
import * as obsidian from "obsidian";
import { CalendarService } from "../services/calendarService";
import { CalendarEventItem, OSDashboardSettings } from "../types";

export interface GoogleCalendarAddressModalResult {
  url: string;
  useKeychain: boolean;
  secretId?: string;
  events: CalendarEventItem[];
}

export class GoogleCalendarAddressModal extends Modal {
  private calendarService: CalendarService;
  private settings: OSDashboardSettings;
  private onSave: (result: GoogleCalendarAddressModalResult) => Promise<void>;

  constructor(
    app: App,
    settings: OSDashboardSettings,
    calendarService: CalendarService,
    onSave: (result: GoogleCalendarAddressModalResult) => Promise<void>
  ) {
    super(app);
    this.settings = settings;
    this.calendarService = calendarService;
    this.onSave = onSave;
  }

  public onOpen(): void {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("os-gcal-modal");

    contentEl.createEl("h2", { text: "Connect Google Calendar" });

    const descEl = contentEl.createEl("p", {
      cls: "setting-item-description",
      text: "Display your Google Calendar events and reminders directly inside Dashboard OS."
    });
    descEl.style.marginBottom = "14px";

    const instructions = contentEl.createDiv({ cls: "os-gcal-instructions" });
    instructions.style.background = "var(--background-secondary)";
    instructions.style.padding = "10px 14px";
    instructions.style.borderRadius = "8px";
    instructions.style.fontSize = "12px";
    instructions.style.color = "var(--text-muted)";
    instructions.style.marginBottom = "16px";
    instructions.style.lineHeight = "1.5";
    instructions.innerHTML = `
      <strong style="color: var(--text-normal);">How to get your private iCal link:</strong>
      <ol style="margin: 6px 0 0 18px; padding: 0;">
        <li>Open <b>Google Calendar</b> in your web browser.</li>
        <li>Click the gear icon ⚙️ &rarr; <b>Settings</b>.</li>
        <li>On the left panel, click on your calendar under <i>Settings for my calendars</i>.</li>
        <li>Scroll down to <b>Integrate calendar</b> &rarr; copy the <b>Secret address in iCal format</b> (.ics).</li>
      </ol>
    `;

    const isKeychainSupported = this.calendarService.isKeychainAvailable();
    const SecretComponentClass = (obsidian as any).SecretComponent;

    let useKeychain = Boolean(
      this.settings.googleCalendarUseKeychain || 
      (isKeychainSupported && Boolean(this.settings.googleCalendarSecretId))
    );
    let urlValue = this.settings.googleCalendarUrl || "";
    let selectedSecretId = this.settings.googleCalendarSecretId || "";

    const formContainer = contentEl.createDiv({ cls: "os-gcal-form" });

    const renderForm = () => {
      formContainer.empty();

      if (isKeychainSupported) {
        new Setting(formContainer)
          .setName("Store in Obsidian Keychain (SecretStorage)")
          .setDesc("Securely encrypt and store your calendar secret in your OS Keychain instead of plaintext in settings.")
          .addToggle(toggle => {
            toggle.setValue(useKeychain)
              .onChange(val => {
                useKeychain = val;
                renderForm();
              });
          });
      }

      if (useKeychain && isKeychainSupported) {
        // Keychain mode
        if (SecretComponentClass) {
          new Setting(formContainer)
            .setName("Keychain Secret")
            .setDesc("Select an existing secret or click '+' to create a new secret with your Google Calendar URL.")
            .addComponent(cb => {
              const comp = new SecretComponentClass(this.app, cb);
              comp.setValue(selectedSecretId)
                .onChange((val: string) => {
                  selectedSecretId = val;
                });
              return comp;
            });
        } else {
          new Setting(formContainer)
            .setName("Keychain Secret Name")
            .setDesc("Enter the name of your secret in Obsidian Keychain.")
            .addText(text => {
              text.setPlaceholder("e.g. google-calendar-url")
                .setValue(selectedSecretId)
                .onChange(val => {
                  selectedSecretId = val.trim();
                });
            });
        }

        // Also allow direct URL input that auto-saves to Keychain if setSecret is supported
        const secretStorage = (this.app as any).secretStorage;
        if (secretStorage && typeof secretStorage.setSecret === "function") {
          new Setting(formContainer)
            .setName("Or Paste iCal Address to Save to Keychain")
            .setDesc("Directly paste your .ics URL here to store it securely into Obsidian Keychain as 'google-calendar-url'.")
            .addText(text => {
              text.setPlaceholder("https://calendar.google.com/calendar/ical/.../basic.ics")
                .setValue(urlValue)
                .onChange(val => {
                  urlValue = val.trim();
                });
              text.inputEl.style.width = "100%";
            });
        }
      } else {
        // Direct URL mode
        new Setting(formContainer)
          .setName("Secret Address in iCal format (.ics)")
          .setDesc("Paste the private .ics URL copied from Google Calendar.")
          .addText(text => {
            text.setPlaceholder("https://calendar.google.com/calendar/ical/.../basic.ics")
              .setValue(urlValue)
              .onChange(val => {
                urlValue = val.trim();
              });
            text.inputEl.style.width = "100%";
            setTimeout(() => text.inputEl.focus(), 50);
          });
      }
    };

    renderForm();

    // Buttons
    const btnContainer = contentEl.createDiv({ cls: "os-modal-buttons" });
    btnContainer.style.display = "flex";
    btnContainer.style.justifyContent = "flex-end";
    btnContainer.style.gap = "8px";
    btnContainer.style.marginTop = "20px";

    const cancelBtn = btnContainer.createEl("button", { text: "Cancel" });
    cancelBtn.addEventListener("click", () => this.close());

    const saveBtn = btnContainer.createEl("button", {
      cls: "mod-cta",
      text: "Save & Sync"
    });

    saveBtn.addEventListener("click", async () => {
      let finalUrl = "";
      let finalSecretId = selectedSecretId;

      if (useKeychain && isKeychainSupported) {
        const secretStorage = (this.app as any).secretStorage;

        // If user typed a direct URL in keychain mode and setSecret is available, save to keychain
        if (urlValue.trim() && secretStorage && typeof secretStorage.setSecret === "function") {
          const directUrl = urlValue.trim();
          if (!directUrl.startsWith("http://") && !directUrl.startsWith("https://")) {
            new Notice("Calendar URL must start with https:// or http://");
            return;
          }
          finalSecretId = selectedSecretId || "google-calendar-url";
          try {
            await secretStorage.setSecret(finalSecretId, directUrl);
            finalUrl = directUrl;
          } catch (err: any) {
            new Notice(`Failed to save to Keychain: ${err?.message || "Unknown error"}`);
            return;
          }
        } else if (finalSecretId) {
          // Retrieve from Keychain
          if (secretStorage && typeof secretStorage.getSecret === "function") {
            const secret = secretStorage.getSecret(finalSecretId);
            if (!secret || !secret.trim()) {
              new Notice(`Keychain secret '${finalSecretId}' is empty or does not exist.`);
              return;
            }
            finalUrl = secret.trim();
          }
        } else {
          new Notice("Please select a Keychain secret or enter a calendar address.");
          return;
        }
      } else {
        finalUrl = urlValue.trim();
        if (!finalUrl) {
          new Notice("Please enter a Google Calendar iCal address.");
          return;
        }
        if (!finalUrl.startsWith("http://") && !finalUrl.startsWith("https://")) {
          new Notice("URL must start with https:// or http://");
          return;
        }
      }

      saveBtn.disabled = true;
      saveBtn.setText("Syncing events...");

      try {
        const events = await this.calendarService.fetchEvents(finalUrl);
        await this.onSave({
          url: useKeychain ? "" : finalUrl,
          useKeychain,
          secretId: useKeychain ? finalSecretId : "",
          events
        });
        new Notice(
          `Synced ${events.length} events from Google Calendar${useKeychain ? " (secured via Keychain)" : ""}!`
        );
        this.close();
      } catch (err: any) {
        saveBtn.disabled = false;
        saveBtn.setText("Save & Sync");
        new Notice(`Sync error: ${err?.message || "Invalid URL or network error"}`);
      }
    });
  }

  public onClose(): void {
    this.contentEl.empty();
  }
}
