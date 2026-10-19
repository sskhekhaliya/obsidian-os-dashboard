import { App, setIcon, TFile, TFolder } from "obsidian";
import { ResolvedFolderIcon } from "../types";

export class IconService {
  private app: App;

  // Vibrant palette matching the OS Dashboard aesthetic
  public static readonly COLOR_PALETTE = [
    "#f59e0b", // Amber/Inbox
    "#06b6d4", // Cyan/Areas
    "#3b82f6", // Blue/Knowledge
    "#6366f1", // Indigo/Projects
    "#ec4899", // Pink/Content
    "#0ea5e9", // Sky/Reading
    "#10b981", // Emerald/Courses
    "#a855f7", // Purple/Creative
    "#eab308", // Yellow/Hobbies
    "#64748b", // Slate/Career
    "#f43f5e", // Rose/Writing
    "#14b8a6"  // Teal/Archive
  ];

  constructor(app: App) {
    this.app = app;
  }

  /**
   * Resolves folder icon and color from obsidian-iconize, or falls back to smart defaults
   */
  public resolveFolderIcon(folderPath: string, folderName: string, index = 0): ResolvedFolderIcon {
    const fallbackColor = IconService.COLOR_PALETTE[index % IconService.COLOR_PALETTE.length];

    // Try Iconize first
    const iconizeInfo = this.getFolderIconizeInfo(folderPath, folderName, fallbackColor);
    if (iconizeInfo) {
      return iconizeInfo;
    }

    // Fallback: Smart Lucide icon with vibrant cycling color
    const defaultIcon = this.getDefaultLucideIcon(folderName);
    return {
      type: "lucide",
      value: defaultIcon,
      color: fallbackColor
    };
  }

  /**
   * Helper to check if a specific folder has an icon in Iconize
   */
  public getFolderIconizeInfo(folderPath: string, folderName: string, defaultColor = "#3b82f6"): ResolvedFolderIcon | null {
    const iconizePlugin = (this.app as any).plugins?.plugins?.["obsidian-iconize"]
      || (this.app as any).plugins?.plugins?.["obsidian-icon-folder"];

    if (!iconizePlugin) return null;

    try {
      let rawIcon: any = null;
      let customColor: string | null = null;

      // 1. Try plugin.api.getIconByPath
      if (iconizePlugin.api && typeof iconizePlugin.api.getIconByPath === "function") {
        rawIcon = iconizePlugin.api.getIconByPath(folderPath) || iconizePlugin.api.getIconByPath(folderName);
      }

      // 2. Check plugin.data or plugin.settings
      const pluginData = iconizePlugin.data || iconizePlugin.settings;
      if (pluginData) {
        const item = pluginData[folderPath]
          || pluginData[folderName]
          || pluginData[`${folderPath}/`]
          || pluginData[`${folderName}/`];

        if (item) {
          if (typeof item === "string") {
            if (!rawIcon) rawIcon = item;
          } else if (typeof item === "object") {
            if (!rawIcon) rawIcon = item.iconName;
            if (item.iconColor) customColor = item.iconColor;
          }
        }

        if (!customColor && pluginData.colors) {
          customColor = pluginData.colors[folderPath] || pluginData.colors[folderName] || null;
        }
      }

      const finalColor = customColor || defaultColor;

      // 3. Process rawIcon
      if (rawIcon) {
        // A: If rawIcon is an Icon object with svgElement or svgContent
        if (typeof rawIcon === "object") {
          const svgHtml = rawIcon.svgElement || (rawIcon.svgContent ? `<svg viewBox="${rawIcon.svgViewbox || '0 0 24 24'}">${rawIcon.svgContent}</svg>` : "");
          if (svgHtml) {
            return {
              type: "svg",
              value: svgHtml,
              color: finalColor
            };
          }
        }

        // B: If rawIcon is an emoji
        if (typeof rawIcon === "string" && this.isEmoji(rawIcon)) {
          return {
            type: "emoji",
            value: rawIcon,
            color: finalColor
          };
        }

        // C: If rawIcon is an icon name string (e.g. FaFolder, RiBookLine, LiHome)
        if (typeof rawIcon === "string" && rawIcon.trim().length > 0) {
          const trimmedIcon = rawIcon.trim();

          // Try resolving SVG via api.getIconByName
          if (iconizePlugin.api && typeof iconizePlugin.api.getIconByName === "function") {
            const iconObj = iconizePlugin.api.getIconByName(trimmedIcon);
            if (iconObj && (iconObj.svgElement || iconObj.svgContent)) {
              return {
                type: "svg",
                value: iconObj.svgElement || `<svg>${iconObj.svgContent}</svg>`,
                color: finalColor
              };
            }
          }

          // Try resolving via iconPackManager
          if (typeof iconizePlugin.getIconPackManager === "function") {
            try {
              const mgr = iconizePlugin.getIconPackManager();
              if (mgr && typeof mgr.getIconByName === "function") {
                const iconObj = mgr.getIconByName(trimmedIcon);
                if (iconObj && (iconObj.svgElement || iconObj.svgContent)) {
                  return {
                    type: "svg",
                    value: iconObj.svgElement || `<svg>${iconObj.svgContent}</svg>`,
                    color: finalColor
                  };
                }
              }
            } catch {}
          }

          // If it's a Lucide name or generic name
          const cleanLucide = trimmedIcon.replace(/^(Li|Lucide):/i, "").toLowerCase();
          return {
            type: "lucide",
            value: cleanLucide || "folder",
            color: finalColor
          };
        }
      }
    } catch (err) {
      console.warn("OS Dashboard: error reading Iconize data", err);
    }

    return null;
  }

  /**
   * Resolves icon and color for a file by traversing up its parent folder hierarchy:
   * Parent folder -> Parent's Parent -> ... -> 1st level folder -> Root fallback.
   */
  public resolveFileFolderIcon(file: TFile): ResolvedFolderIcon {
    const root = this.app.vault.getRoot();
    let currentFolder: TFolder | null = file.parent;
    let topLevelFolder: TFolder | null = null;

    // Traverse upwards from parent to root
    while (currentFolder && currentFolder !== root && !currentFolder.isRoot()) {
      const iconInfo = this.getFolderIconizeInfo(currentFolder.path, currentFolder.name);
      if (iconInfo) {
        return iconInfo;
      }
      topLevelFolder = currentFolder;
      currentFolder = currentFolder.parent;
    }

    // If top-level folder found, use its smart icon & color
    if (topLevelFolder) {
      const firstLevelFolders = root.children.filter(c => c instanceof TFolder) as TFolder[];
      firstLevelFolders.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" }));
      const idx = firstLevelFolders.indexOf(topLevelFolder);
      return this.resolveFolderIcon(topLevelFolder.path, topLevelFolder.name, idx >= 0 ? idx : 0);
    }

    // Default fallback for root files
    return {
      type: "lucide",
      value: "file-text",
      color: "var(--text-muted)"
    };
  }

  /**
   * Safely renders an icon into an element with clean stroke and NO unwanted fill
   */
  public renderIcon(el: HTMLElement, iconInfo: ResolvedFolderIcon): void {
    el.empty();

    if (iconInfo.type === "svg" && iconInfo.value) {
      el.innerHTML = iconInfo.value;
      const svg = el.querySelector("svg");
      if (svg) {
        svg.removeAttribute("width");
        svg.removeAttribute("height");
        svg.style.width = "16px";
        svg.style.height = "16px";
        svg.style.display = "block";
        svg.style.color = iconInfo.color;
        svg.style.stroke = iconInfo.color;
        // Do NOT force svg.style.fill = "currentColor"! That broke outline icons!
      }
      return;
    }

    if (iconInfo.type === "emoji" && iconInfo.value) {
      const span = el.createSpan({ text: iconInfo.value, cls: "os-emoji-icon" });
      span.style.fontSize = "16px";
      span.style.lineHeight = "1";
      return;
    }

    // Lucide fallback (crisp stroke, fill="none")
    try {
      setIcon(el, iconInfo.value || "folder");
    } catch {
      setIcon(el, "folder");
    }

    const svg = el.querySelector("svg");
    if (svg) {
      svg.style.width = "16px";
      svg.style.height = "16px";
      svg.style.color = iconInfo.color;
      svg.style.stroke = iconInfo.color;
      svg.style.fill = "none";
    }
  }

  private isEmoji(str: string): boolean {
    return /\p{Extended_Pictographic}/u.test(str) || /\p{Emoji}/u.test(str);
  }

  private getDefaultLucideIcon(folderName: string): string {
    const lower = folderName.toLowerCase();
    if (lower.includes("inbox")) return "inbox";
    if (lower.includes("area")) return "compass";
    if (lower.includes("knowledge") || lower.includes("learn")) return "brain";
    if (lower.includes("project")) return "folder-kanban";
    if (lower.includes("content") || lower.includes("publish")) return "layout-grid";
    if (lower.includes("read") || lower.includes("book")) return "book-open";
    if (lower.includes("course") || lower.includes("study")) return "graduation-cap";
    if (lower.includes("creat")) return "sparkles";
    if (lower.includes("hobb") || lower.includes("game")) return "gamepad-2";
    if (lower.includes("career") || lower.includes("work")) return "briefcase";
    if (lower.includes("writ")) return "pen-tool";
    if (lower.includes("archive")) return "archive";
    return "folder";
  }
}
