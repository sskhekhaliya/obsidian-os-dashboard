import { App, setIcon, addIcon, TFile, TFolder } from "obsidian";
import { ResolvedFolderIcon, FolderStyleOverride, OSDashboardSettings } from "../types";

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

  public static readonly BRAND_ICONS: Record<string, string> = {
    youtube: `<path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><polygon points="10 15 15 12 10 9" fill="currentColor"/>`,
    instagram: `<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>`,
    facebook: `<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>`,
    twitter: `<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>`,
    "x-twitter": `<path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/>`,
    "brand-x": `<path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/>`,
    "twitter-x": `<path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/>`,
    linkedin: `<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>`,
    reddit: `<circle cx="12" cy="12" r="10"/><circle cx="9" cy="10" r="1" fill="currentColor"/><circle cx="15" cy="10" r="1" fill="currentColor"/><path d="M9.5 15a3.5 3.5 0 0 0 5 0"/>`,
    tiktok: `<path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>`,
    discord: `<path d="M18 6a14.5 14.5 0 0 0-4-1.5 9.6 9.6 0 0 0-.5 1 13.9 13.9 0 0 0-3 0 9.6 9.6 0 0 0-.5-1A14.5 14.5 0 0 0 6 6c-3 4.5-2 9-2 13.5a14.5 14.5 0 0 0 4.5 2.5 10.3 10.3 0 0 0 1-1.5 9.5 9.5 0 0 1-1.5-.7c.1-.1.3-.2.4-.3a11.9 11.9 0 0 0 7.2 0c.1.1.3.2.4.3a9.5 9.5 0 0 1-1.5.7 10.3 10.3 0 0 0 1 1.5A14.5 14.5 0 0 0 20 19.5c0-4.5 1-9-2-13.5z"/><circle cx="9" cy="12" r="1" fill="currentColor"/><circle cx="15" cy="12" r="1" fill="currentColor"/>`,
    spotify: `<circle cx="12" cy="12" r="10"/><path d="M8 11.5c2.5-1 5.5-.8 8 .5"/><path d="M7 14.5c3-1 7-.8 10 .5"/><path d="M9 8.5c2-1 4.5-.8 6.5.5"/>`,
    twitch: `<path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"/>`,
    telegram: `<path d="M21.5 2.5l-19 9 7.5 3 2.5 7 4.5-4 4.5 3.5 2.5-18.5z"/><path d="M10 14.5l8-8.5-10 6z"/>`,
    whatsapp: `<path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/>`,
    github: `<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>`,
    notion: `<path d="M4 4v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2z"/><path d="M9 8h6"/><path d="M9 12h6"/><path d="M9 16h4"/>`
  };

  constructor(app: App) {
    this.app = app;
    this.registerCustomIcons();
  }

  private registerCustomIcons(): void {
    const FORBIDDEN_ICONS = new Set(["x", "cross", "close", "check", "trash", "search", "folder", "file"]);
    for (const [id, innerSvg] of Object.entries(IconService.BRAND_ICONS)) {
      if (FORBIDDEN_ICONS.has(id.toLowerCase())) continue; // Never overwrite Obsidian core icons
      try {
        addIcon(
          id,
          `<g transform="scale(4.166667)" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${innerSvg}</g>`
        );
      } catch (e) {
        // already registered or failed
      }
    }
  }

  /**
   * Resolves folder icon and color from OS Dashboard overrides, obsidian-iconize, or falls back to smart defaults
   */
  public resolveFolderIcon(folderPath: string, folderName: string, index = 0, settings?: OSDashboardSettings): ResolvedFolderIcon {
    const fallbackColor = IconService.COLOR_PALETTE[index % IconService.COLOR_PALETTE.length];

    // 1. Check OS Dashboard custom folder overrides first
    if (settings?.folderOverrides) {
      const override = settings.folderOverrides[folderPath]
        || settings.folderOverrides[folderName]
        || settings.folderOverrides[`${folderPath}/`]
        || settings.folderOverrides[folderPath.toLowerCase()]
        || settings.folderOverrides[folderName.toLowerCase()];

      if (override) {
        const color = (override.color && override.color.trim()) ? override.color.trim() : fallbackColor;
        if (override.icon && override.icon.trim()) {
          const raw = override.icon.trim();
          if (this.isEmoji(raw)) {
            return { type: "emoji", value: raw, color };
          }
          let cleanName = raw.replace(/^(Li|Lucide|lucide|Lu|Fa|Ri|Tb|Hi):?/i, "");
          cleanName = cleanName
            .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
            .replace(/([a-zA-Z])([0-9]+)/g, "$1-$2")
            .toLowerCase();
          return { type: "lucide", value: cleanName || "folder", color };
        }
        // If only color is overridden, keep Iconize/default icon with new color
        const iconizeInfo = this.getFolderIconizeInfo(folderPath, folderName, color);
        if (iconizeInfo) {
          return { ...iconizeInfo, color };
        }
        return {
          type: "lucide",
          value: this.getDefaultLucideIcon(folderName),
          color
        };
      }
    }

    // 2. Try Iconize second
    const iconizeInfo = this.getFolderIconizeInfo(folderPath, folderName, fallbackColor);
    if (iconizeInfo) {
      return iconizeInfo;
    }

    // 3. Fallback: Smart Lucide icon with vibrant cycling color
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
          let cleanName = trimmedIcon.replace(/^(Li|Lucide|lucide|Lu|Fa|Ri|Tb|Hi):?/i, "");
          cleanName = cleanName
            .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
            .replace(/([a-zA-Z])([0-9]+)/g, "$1-$2")
            .toLowerCase();

          return {
            type: "lucide",
            value: cleanName || "folder",
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
  public resolveFileFolderIcon(file: TFile, settings?: OSDashboardSettings): ResolvedFolderIcon {
    const root = this.app.vault.getRoot();
    let currentFolder: TFolder | null = file.parent;
    let topLevelFolder: TFolder | null = null;

    // Traverse upwards from parent to root
    while (currentFolder && currentFolder !== root && !currentFolder.isRoot()) {
      // Check OS Dashboard custom override first
      if (settings?.folderOverrides) {
        const override = settings.folderOverrides[currentFolder.path]
          || settings.folderOverrides[currentFolder.name];
        if (override) {
          return this.resolveFolderIcon(currentFolder.path, currentFolder.name, 0, settings);
        }
      }
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
      return this.resolveFolderIcon(topLevelFolder.path, topLevelFolder.name, idx >= 0 ? idx : 0, settings);
    }

    // Default fallback for root files
    return {
      type: "lucide",
      value: "file-text",
      color: "var(--text-muted)"
    };
  }

  /**
   * Imports all folder icons and colors from obsidian-iconize into OS Dashboard settings
   */
  public async importFromIconize(): Promise<{ count: number; overrides: Record<string, FolderStyleOverride> }> {
    let rawData: Record<string, any> | null = null;

    // 1. Try in-memory plugin instances
    const iconizePlugin = (this.app as any).plugins?.plugins?.["obsidian-iconize"]
      || (this.app as any).plugins?.plugins?.["obsidian-icon-folder"];
    if (iconizePlugin && (iconizePlugin.data || iconizePlugin.settings)) {
      rawData = Object.assign({}, iconizePlugin.data || iconizePlugin.settings);
    }

    // 2. Try loading from vault disk
    if (!rawData) {
      const candidatePaths = [
        ".obsidian/plugins/obsidian-iconize/data.json",
        ".obsidian/plugins/obsidian-icon-folder/data.json"
      ];
      for (const p of candidatePaths) {
        try {
          if (await this.app.vault.adapter.exists(p)) {
            const content = await this.app.vault.adapter.read(p);
            rawData = JSON.parse(content);
            break;
          }
        } catch {}
      }
    }

    if (!rawData || typeof rawData !== "object") {
      return { count: 0, overrides: {} };
    }

    const overrides: Record<string, FolderStyleOverride> = {};
    const globalColors = rawData.colors && typeof rawData.colors === "object" ? rawData.colors : {};

    for (const [key, val] of Object.entries(rawData)) {
      if (["settings", "colors", "iconPacks", "version"].includes(key)) continue;
      if (!val) continue;

      const cleanPath = key.replace(/\/+$/, "").trim();
      if (!cleanPath) continue;

      let icon: string | undefined;
      let color: string | undefined;

      if (typeof val === "string") {
        icon = val;
      } else if (typeof val === "object") {
        if (val.iconName) icon = val.iconName;
        if (val.iconColor) color = val.iconColor;
      }

      if (!color && globalColors[key]) {
        color = globalColors[key];
      } else if (!color && globalColors[cleanPath]) {
        color = globalColors[cleanPath];
      }

      if (icon || color) {
        if (icon && !this.isEmoji(icon)) {
          icon = icon.replace(/^(Li|Lucide|lucide|Lu|Fa|Ri|Tb|Hi):?/i, "");
          icon = icon
            .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
            .replace(/([a-zA-Z])([0-9]+)/g, "$1-$2")
            .toLowerCase();
        }
        overrides[cleanPath] = {
          icon: icon || undefined,
          color: color || undefined
        };
      }
    }

    return {
      count: Object.keys(overrides).length,
      overrides
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

    let svg = el.querySelector("svg");
    if (!svg && iconInfo.value) {
      const hyphenated = iconInfo.value.replace(/([a-zA-Z])([0-9]+)/g, "$1-$2");
      if (hyphenated !== iconInfo.value) {
        try {
          setIcon(el, hyphenated);
          svg = el.querySelector("svg");
        } catch {}
      }
      if (!svg) {
        try {
          setIcon(el, "folder");
          svg = el.querySelector("svg");
        } catch {}
      }
    }

    if (svg) {
      svg.style.width = "16px";
      svg.style.height = "16px";
      svg.style.color = iconInfo.color;
      svg.style.stroke = iconInfo.color;
      svg.style.fill = "none";
    }
  }

  private isEmoji(str: string): boolean {
    if (!str || typeof str !== "string") return false;
    // Icon names or strings containing ASCII letters are definitely not emojis
    if (/[a-zA-Z]/.test(str)) return false;
    return /\p{Extended_Pictographic}/u.test(str);
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

  /**
   * Renders any icon into an element: supports raw SVG markup (<svg>...</svg> or <path .../>),
   * emojis, built-in brand icons (youtube, instagram, facebook, etc.), and standard Lucide icons.
   */
  public renderAnyIcon(el: HTMLElement, iconInput: string | undefined, fallback = "external-link", color?: string): void {
    el.empty();
    const raw = (iconInput || "").trim();

    if (!raw) {
      this.renderFallback(el, fallback, color);
      return;
    }

    // 1. Raw SVG support (<svg ...>...</svg>)
    if (raw.startsWith("<svg") || raw.includes("</svg>")) {
      el.innerHTML = raw;
      const svg = el.querySelector("svg");
      if (svg) {
        svg.removeAttribute("width");
        svg.removeAttribute("height");
        svg.classList.add("svg-icon");
        svg.style.width = "100%";
        svg.style.height = "100%";
        svg.style.display = "block";
        if (color) {
          svg.style.color = color;
          svg.style.stroke = color;
        }
      }
      return;
    }

    // 1b. Partial SVG (<path .../> or <g ...>)
    if (raw.startsWith("<path") || raw.startsWith("<g") || raw.startsWith("<polygon") || raw.startsWith("<circle") || raw.startsWith("<rect")) {
      el.innerHTML = `<svg viewBox="0 0 24 24" class="svg-icon" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${raw}</svg>`;
      const svg = el.querySelector("svg");
      if (svg && color) {
        svg.style.color = color;
        svg.style.stroke = color;
      }
      return;
    }

    // 2. Emoji support
    if (this.isEmoji(raw)) {
      const span = el.createSpan({ text: raw, cls: "os-emoji-icon" });
      span.style.fontSize = "16px";
      span.style.lineHeight = "1";
      span.style.display = "inline-flex";
      span.style.alignItems = "center";
      span.style.justifyContent = "center";
      return;
    }

    // 3. Built-in brand icon direct fallback
    const cleanName = raw.toLowerCase().replace(/^(lucide|lu|icon|brand):/i, "").trim();
    const brandSvg = IconService.BRAND_ICONS[cleanName] || (cleanName === "x" ? IconService.BRAND_ICONS["x-twitter"] : undefined);
    if (brandSvg) {
      el.innerHTML = `<svg viewBox="0 0 24 24" class="svg-icon" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${brandSvg}</svg>`;
      const svg = el.querySelector("svg");
      if (svg && color) {
        svg.style.color = color;
        svg.style.stroke = color;
      }
      return;
    }

    // 4. Obsidian setIcon (Lucide / core registered icons)
    try {
      setIcon(el, cleanName);
    } catch {}

    let svg = el.querySelector("svg");
    if (!svg && cleanName.includes("-")) {
      try {
        setIcon(el, cleanName.replace(/-/g, ""));
        svg = el.querySelector("svg");
      } catch {}
    }

    if (!svg) {
      this.renderFallback(el, fallback, color);
      return;
    }

    if (color) {
      svg.style.color = color;
      svg.style.stroke = color;
    }
  }

  private renderFallback(el: HTMLElement, fallback: string, color?: string): void {
    try {
      setIcon(el, fallback);
      const svg = el.querySelector("svg");
      if (svg && color) {
        svg.style.color = color;
        svg.style.stroke = color;
      }
    } catch {}
  }
}
