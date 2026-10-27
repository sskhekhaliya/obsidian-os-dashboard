import { Modal, setIcon } from "obsidian";

/**
 * Ensures that the modal's close button uses the Lucide 'x' icon
 * instead of Obsidian's default thick cross icon or plain text.
 */
export function initModalCloseButton(modal: Modal): void {
  const closeBtn = (modal.modalEl?.querySelector(".modal-close-button") ||
    modal.containerEl?.querySelector(".modal-close-button")) as HTMLElement | null;
  if (closeBtn) {
    closeBtn.empty();
    setIcon(closeBtn, "x");
  }
}
