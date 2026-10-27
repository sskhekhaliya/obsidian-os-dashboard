"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => OSDashboardPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian22 = require("obsidian");

// src/types.ts
var moment = (...args) => {
  return window.moment(...args);
};
moment.utc = (...args) => window.moment?.utc(...args);
var AESTHETIC_UNSPLASH_BANNERS = [
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=80",
  // Starry Night Mountains
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80",
  // Yosemite Valley Forest
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80",
  // Deep Space Cosmic Galaxy
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
  // Sunset Coast & Ocean
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=80",
  // Foggy Morning Mountain Ridge
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80",
  // Canadian Rocky Mountain Peaks
  "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80",
  // Cyberpunk Neon Cityscape
  "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1920&q=80"
  // Aurora Borealis Northern Lights
];
function getRandomAestheticBanner() {
  const idx = Math.floor(Math.random() * AESTHETIC_UNSPLASH_BANNERS.length);
  return AESTHETIC_UNSPLASH_BANNERS[idx];
}
var DEFAULT_SETTINGS = {
  bannerPath: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=80",
  vaultAvatarIcon: "home",
  vaultTitle: "",
  vaultSubtitle: "Think \u2022 Learn \u2022 Build \u2022 Create \u2022 Grow",
  quoteTop: "A better me\na brighter tomorrow.",
  quoteMain: "\u201CDiscipline today creates the freedom tomorrow.\u201D",
  clockSubtitle: "Small steps every day\nlead to big results.",
  homeKeywords: ["Home", "Index", "MOC"],
  matchFolderName: true,
  newFilePattern: "",
  dailyTasksFile: "Daily Tasks.md",
  dailyLogFile: "Daily Logs.md",
  autoLogToDailyLog: true,
  weeklyTasksFile: "Weekly Tasks.md",
  habitsFile: "Habits.md",
  archiveHabitsFile: "99 Archive/Habits.md",
  maxFreezesPerMonth: 4,
  autoFreezeHabits: true,
  quickCaptureFolder: "00 Inbox",
  projectsFolder: "",
  projectStatusProp: "status",
  projectStatusValues: ["in-progress", "active", "ongoing"],
  projectProgressProp: "progress",
  recentNotesLimit: 8,
  recentNotesExcludeFolders: ["_attachments", "_scripts", "_templates", "Templates", ".trash"],
  ignoredFolders: ["_attachments", "_scripts", "_templates", "Templates", ".trash"],
  folderOverrides: {},
  links: [
    { id: "1", title: "Lichess", url: "https://lichess.org", icon: "gamepad-2" },
    { id: "2", title: "Chess.com", url: "https://chess.com", icon: "crosshair" },
    { id: "3", title: "YouTube", url: "https://youtube.com", icon: "youtube" },
    { id: "4", title: "GitHub", url: "https://github.com", icon: "github" },
    { id: "5", title: "Notion", url: "https://notion.so", icon: "book-open" },
    { id: "6", title: "Google Drive", url: "https://drive.google.com", icon: "hard-drive" },
    { id: "7", title: "ChatGPT", url: "https://chatgpt.com", icon: "bot" },
    { id: "8", title: "LeetCode", url: "https://leetcode.com", icon: "code-2" }
  ],
  openOnStartup: true,
  openOnNewTab: false,
  mobileTopMargin: 48,
  showHeroBanner: true,
  showNavRibbon: true,
  showTodayTasks: true,
  showWeeklyTasks: true,
  showRecentNotes: true,
  showQuickCapture: true,
  showOngoingProjects: true,
  showDeadlines: true,
  showBookmarks: true,
  // Deadlines defaults
  deadlinesFolders: "",
  deadlineProp: "target_completion_date",
  deadlineCompletedProp: "completed_date",
  deadlineStatusProp: "status",
  deadlineCompletedValues: ["completed", "done", "finished", "archived", "closed"],
  deadlineStatusValues: ["in-progress", "active", "ongoing"],
  deadlineProgressProp: "start_date",
  // Right Rail Widgets
  showRightRail: true,
  showCalendar: true,
  showGraphView: true,
  showStreaks: true,
  showRightQuote: true,
  rightRailQuote: "\u201CConsistency is more important than intensity.\u201D",
  rightRailQuoteAuthor: "",
  streaks: [],
  // Google Calendar Integration Defaults
  googleCalendarUrl: "",
  googleCalendarUseKeychain: false,
  googleCalendarSecretId: "",
  googleCalendarAutoSync: true,
  showGoogleCalendarBanner: true,
  enableCalendarNotifications: true,
  calendarNotificationLeadMinutes: 10,
  cachedCalendarEvents: [],
  localCalendarEvents: [],
  calendarEventsFile: "Events.md",
  lastCalendarSyncTime: 0,
  customWidgets: [],
  widgetCustomizations: {},
  widgetLayout: {
    col1: ["todayTasks", "weeklyTasks"],
    col2: ["recentNotes", "quickCapture"],
    col3: ["ongoingProjects", "deadlines", "bookmarks"],
    rail: ["calendar", "streaks", "graphView", "rightQuote"]
  }
};
function parseFolderList(input) {
  if (!input || !input.trim()) return [];
  const results = [];
  const regex = /"([^"]+)"|'([^']+)'|([^,]+)/g;
  let match;
  while ((match = regex.exec(input)) !== null) {
    const val = (match[1] ?? match[2] ?? match[3] ?? "").trim();
    const clean = val.replace(/^["']|["']$/g, "").trim();
    if (clean) {
      results.push(clean);
    }
  }
  return results;
}
function isPathInFolderList(filePath, folderList) {
  if (!folderList || folderList.length === 0) return true;
  const lowerPath = filePath.toLowerCase().replace(/\\/g, "/");
  return folderList.some((f) => {
    const cleanF = f.toLowerCase().replace(/\\/g, "/").replace(/^\/+|\/+$/g, "").trim();
    if (!cleanF) return true;
    return lowerPath.startsWith(cleanF + "/") || lowerPath === cleanF || lowerPath.includes("/" + cleanF + "/") || lowerPath.endsWith("/" + cleanF);
  });
}
function hexToRgb(hex) {
  const clean = (hex || "").replace("#", "").trim();
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16);
    const g = parseInt(clean[1] + clean[1], 16);
    const b = parseInt(clean[2] + clean[2], 16);
    return `${r}, ${g}, ${b}`;
  }
  if (clean.length === 6) {
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    return `${r}, ${g}, ${b}`;
  }
  return "59, 130, 246";
}
function getDailyNotesFormat(app) {
  try {
    const internalPlugins = app.internalPlugins;
    const dailyNotes = internalPlugins?.getPluginById?.("daily-notes")?.instance || internalPlugins?.plugins?.["daily-notes"]?.instance;
    const format = dailyNotes?.options?.format;
    if (format && typeof format === "string" && format.trim()) {
      return format.trim();
    }
  } catch (e) {
  }
  return "YYYY-MM-DD";
}
function getEffectiveNewFilePattern(app, pattern) {
  if (pattern && pattern.trim()) {
    return pattern.trim();
  }
  return getDailyNotesFormat(app);
}

// src/settings.ts
var import_obsidian4 = require("obsidian");
var obsidian = __toESM(require("obsidian"));

// src/services/iconService.ts
var import_obsidian = require("obsidian");
var _IconService = class _IconService {
  constructor(app) {
    this.app = app;
    this.registerCustomIcons();
  }
  registerCustomIcons() {
    const FORBIDDEN_ICONS = /* @__PURE__ */ new Set(["x", "cross", "close", "check", "trash", "search", "folder", "file"]);
    for (const [id, innerSvg] of Object.entries(_IconService.BRAND_ICONS)) {
      if (FORBIDDEN_ICONS.has(id.toLowerCase())) continue;
      try {
        (0, import_obsidian.addIcon)(
          id,
          `<g transform="scale(4.166667)" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${innerSvg}</g>`
        );
      } catch (e) {
      }
    }
  }
  /**
   * Resolves folder icon and color from OS Dashboard overrides, obsidian-iconize, or falls back to smart defaults
   */
  resolveFolderIcon(folderPath, folderName, index = 0, settings) {
    const fallbackColor = _IconService.COLOR_PALETTE[index % _IconService.COLOR_PALETTE.length];
    if (settings?.folderOverrides) {
      const override = settings.folderOverrides[folderPath] || settings.folderOverrides[folderName] || settings.folderOverrides[`${folderPath}/`] || settings.folderOverrides[folderPath.toLowerCase()] || settings.folderOverrides[folderName.toLowerCase()];
      if (override) {
        const color = override.color && override.color.trim() ? override.color.trim() : fallbackColor;
        if (override.icon && override.icon.trim()) {
          const raw = override.icon.trim();
          if (this.isEmoji(raw)) {
            return { type: "emoji", value: raw, color };
          }
          let cleanName = raw.replace(/^(Li|Lucide|lucide|Lu|Fa|Ri|Tb|Hi):?/i, "");
          cleanName = cleanName.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([a-zA-Z])([0-9]+)/g, "$1-$2").toLowerCase();
          return { type: "lucide", value: cleanName || "folder", color };
        }
        const iconizeInfo2 = this.getFolderIconizeInfo(folderPath, folderName, color);
        if (iconizeInfo2) {
          return { ...iconizeInfo2, color };
        }
        return {
          type: "lucide",
          value: this.getDefaultLucideIcon(folderName),
          color
        };
      }
    }
    const iconizeInfo = this.getFolderIconizeInfo(folderPath, folderName, fallbackColor);
    if (iconizeInfo) {
      return iconizeInfo;
    }
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
  getFolderIconizeInfo(folderPath, folderName, defaultColor = "#3b82f6") {
    const iconizePlugin = this.app.plugins?.plugins?.["obsidian-iconize"] || this.app.plugins?.plugins?.["obsidian-icon-folder"];
    if (!iconizePlugin) return null;
    try {
      let rawIcon = null;
      let customColor = null;
      if (iconizePlugin.api && typeof iconizePlugin.api.getIconByPath === "function") {
        rawIcon = iconizePlugin.api.getIconByPath(folderPath) || iconizePlugin.api.getIconByPath(folderName);
      }
      const pluginData = iconizePlugin.data || iconizePlugin.settings;
      if (pluginData) {
        const item = pluginData[folderPath] || pluginData[folderName] || pluginData[`${folderPath}/`] || pluginData[`${folderName}/`];
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
      if (rawIcon) {
        if (typeof rawIcon === "object") {
          const svgHtml = rawIcon.svgElement || (rawIcon.svgContent ? `<svg viewBox="${rawIcon.svgViewbox || "0 0 24 24"}">${rawIcon.svgContent}</svg>` : "");
          if (svgHtml) {
            return {
              type: "svg",
              value: svgHtml,
              color: finalColor
            };
          }
        }
        if (typeof rawIcon === "string" && this.isEmoji(rawIcon)) {
          return {
            type: "emoji",
            value: rawIcon,
            color: finalColor
          };
        }
        if (typeof rawIcon === "string" && rawIcon.trim().length > 0) {
          const trimmedIcon = rawIcon.trim();
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
            } catch {
            }
          }
          let cleanName = trimmedIcon.replace(/^(Li|Lucide|lucide|Lu|Fa|Ri|Tb|Hi):?/i, "");
          cleanName = cleanName.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([a-zA-Z])([0-9]+)/g, "$1-$2").toLowerCase();
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
  resolveFileFolderIcon(file, settings) {
    const root = this.app.vault.getRoot();
    let currentFolder = file.parent;
    let topLevelFolder = null;
    while (currentFolder && currentFolder !== root && !currentFolder.isRoot()) {
      if (settings?.folderOverrides) {
        const override = settings.folderOverrides[currentFolder.path] || settings.folderOverrides[currentFolder.name];
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
    if (topLevelFolder) {
      const firstLevelFolders = root.children.filter((c) => c instanceof import_obsidian.TFolder);
      firstLevelFolders.sort((a, b) => a.name.localeCompare(b.name, void 0, { numeric: true, sensitivity: "base" }));
      const idx = firstLevelFolders.indexOf(topLevelFolder);
      return this.resolveFolderIcon(topLevelFolder.path, topLevelFolder.name, idx >= 0 ? idx : 0, settings);
    }
    return {
      type: "lucide",
      value: "file-text",
      color: "var(--text-muted)"
    };
  }
  /**
   * Imports all folder icons and colors from obsidian-iconize into OS Dashboard settings
   */
  async importFromIconize() {
    let rawData = null;
    const iconizePlugin = this.app.plugins?.plugins?.["obsidian-iconize"] || this.app.plugins?.plugins?.["obsidian-icon-folder"];
    if (iconizePlugin && (iconizePlugin.data || iconizePlugin.settings)) {
      rawData = Object.assign({}, iconizePlugin.data || iconizePlugin.settings);
    }
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
        } catch {
        }
      }
    }
    if (!rawData || typeof rawData !== "object") {
      return { count: 0, overrides: {} };
    }
    const overrides = {};
    const globalColors = rawData.colors && typeof rawData.colors === "object" ? rawData.colors : {};
    for (const [key, val] of Object.entries(rawData)) {
      if (["settings", "colors", "iconPacks", "version"].includes(key)) continue;
      if (!val) continue;
      const cleanPath = key.replace(/\/+$/, "").trim();
      if (!cleanPath) continue;
      let icon;
      let color;
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
          icon = icon.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([a-zA-Z])([0-9]+)/g, "$1-$2").toLowerCase();
        }
        overrides[cleanPath] = {
          icon: icon || void 0,
          color: color || void 0
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
  renderIcon(el, iconInfo) {
    el.empty();
    if (iconInfo.type === "svg" && iconInfo.value) {
      el.innerHTML = iconInfo.value;
      const svg2 = el.querySelector("svg");
      if (svg2) {
        svg2.removeAttribute("width");
        svg2.removeAttribute("height");
        svg2.style.width = "16px";
        svg2.style.height = "16px";
        svg2.style.display = "block";
        svg2.style.color = iconInfo.color;
        svg2.style.stroke = iconInfo.color;
      }
      return;
    }
    if (iconInfo.type === "emoji" && iconInfo.value) {
      const span = el.createSpan({ text: iconInfo.value, cls: "os-emoji-icon" });
      span.style.fontSize = "16px";
      span.style.lineHeight = "1";
      return;
    }
    try {
      (0, import_obsidian.setIcon)(el, iconInfo.value || "folder");
    } catch {
      (0, import_obsidian.setIcon)(el, "folder");
    }
    let svg = el.querySelector("svg");
    if (!svg && iconInfo.value) {
      const hyphenated = iconInfo.value.replace(/([a-zA-Z])([0-9]+)/g, "$1-$2");
      if (hyphenated !== iconInfo.value) {
        try {
          (0, import_obsidian.setIcon)(el, hyphenated);
          svg = el.querySelector("svg");
        } catch {
        }
      }
      if (!svg) {
        try {
          (0, import_obsidian.setIcon)(el, "folder");
          svg = el.querySelector("svg");
        } catch {
        }
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
  isEmoji(str) {
    if (!str || typeof str !== "string") return false;
    if (/[a-zA-Z]/.test(str)) return false;
    return /\p{Extended_Pictographic}/u.test(str);
  }
  getDefaultLucideIcon(folderName) {
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
  renderAnyIcon(el, iconInput, fallback = "external-link", color) {
    el.empty();
    const raw = (iconInput || "").trim();
    if (!raw) {
      this.renderFallback(el, fallback, color);
      return;
    }
    if (raw.startsWith("<svg") || raw.includes("</svg>")) {
      el.innerHTML = raw;
      const svg2 = el.querySelector("svg");
      if (svg2) {
        svg2.removeAttribute("width");
        svg2.removeAttribute("height");
        svg2.classList.add("svg-icon");
        svg2.style.width = "100%";
        svg2.style.height = "100%";
        svg2.style.display = "block";
        if (color) {
          svg2.style.color = color;
          svg2.style.stroke = color;
        }
      }
      return;
    }
    if (raw.startsWith("<path") || raw.startsWith("<g") || raw.startsWith("<polygon") || raw.startsWith("<circle") || raw.startsWith("<rect")) {
      el.innerHTML = `<svg viewBox="0 0 24 24" class="svg-icon" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${raw}</svg>`;
      const svg2 = el.querySelector("svg");
      if (svg2 && color) {
        svg2.style.color = color;
        svg2.style.stroke = color;
      }
      return;
    }
    if (this.isEmoji(raw)) {
      const span = el.createSpan({ text: raw, cls: "os-emoji-icon" });
      span.style.fontSize = "16px";
      span.style.lineHeight = "1";
      span.style.display = "inline-flex";
      span.style.alignItems = "center";
      span.style.justifyContent = "center";
      return;
    }
    const cleanName = raw.toLowerCase().replace(/^(lucide|lu|icon|brand):/i, "").trim();
    const brandSvg = _IconService.BRAND_ICONS[cleanName] || (cleanName === "x" ? _IconService.BRAND_ICONS["x-twitter"] : void 0);
    if (brandSvg) {
      el.innerHTML = `<svg viewBox="0 0 24 24" class="svg-icon" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${brandSvg}</svg>`;
      const svg2 = el.querySelector("svg");
      if (svg2 && color) {
        svg2.style.color = color;
        svg2.style.stroke = color;
      }
      return;
    }
    try {
      (0, import_obsidian.setIcon)(el, cleanName);
    } catch {
    }
    let svg = el.querySelector("svg");
    if (!svg && cleanName.includes("-")) {
      try {
        (0, import_obsidian.setIcon)(el, cleanName.replace(/-/g, ""));
        svg = el.querySelector("svg");
      } catch {
      }
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
  renderFallback(el, fallback, color) {
    try {
      (0, import_obsidian.setIcon)(el, fallback);
      const svg = el.querySelector("svg");
      if (svg && color) {
        svg.style.color = color;
        svg.style.stroke = color;
      }
    } catch {
    }
  }
};
// Vibrant palette matching the OS Dashboard aesthetic
_IconService.COLOR_PALETTE = [
  "#f59e0b",
  // Amber/Inbox
  "#06b6d4",
  // Cyan/Areas
  "#3b82f6",
  // Blue/Knowledge
  "#6366f1",
  // Indigo/Projects
  "#ec4899",
  // Pink/Content
  "#0ea5e9",
  // Sky/Reading
  "#10b981",
  // Emerald/Courses
  "#a855f7",
  // Purple/Creative
  "#eab308",
  // Yellow/Hobbies
  "#64748b",
  // Slate/Career
  "#f43f5e",
  // Rose/Writing
  "#14b8a6"
  // Teal/Archive
];
_IconService.BRAND_ICONS = {
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
var IconService = _IconService;

// src/modals/fileSuggest.ts
var import_obsidian2 = require("obsidian");
var FileSuggest = class extends import_obsidian2.AbstractInputSuggest {
  constructor(app, inputEl, onSelect) {
    super(app, inputEl);
    this.inputEl = inputEl;
    this.onSelectCb = onSelect;
  }
  getSuggestions(query) {
    const cleanQuery = query.toLowerCase().trim();
    const markdownFiles = this.app.vault.getMarkdownFiles();
    if (!cleanQuery) {
      return markdownFiles.slice(0, 20);
    }
    return markdownFiles.filter((f) => f.path.toLowerCase().includes(cleanQuery) || f.basename.toLowerCase().includes(cleanQuery)).slice(0, 25);
  }
  renderSuggestion(file, el) {
    el.empty();
    const item = el.createDiv({ cls: "os-wikilink-suggest-item" });
    item.createSpan({ cls: "os-wikilink-title", text: file.basename });
    if (file.parent && file.parent.path !== "" && file.parent.path !== "/") {
      item.createSpan({ cls: "os-wikilink-folder", text: file.parent.path });
    }
  }
  selectSuggestion(file) {
    this.inputEl.value = file.path;
    this.inputEl.dispatchEvent(new Event("change", { bubbles: true }));
    this.inputEl.dispatchEvent(new Event("input", { bubbles: true }));
    if (this.onSelectCb) {
      this.onSelectCb(file);
    }
    this.close();
  }
};

// src/modals/wikiLinkSuggest.ts
var import_obsidian3 = require("obsidian");
var WikiLinkSuggest = class extends import_obsidian3.AbstractInputSuggest {
  constructor(app, inputEl) {
    super(app, inputEl);
    this.inputEl = inputEl;
  }
  getSuggestions(query) {
    const cursor = this.inputEl.selectionStart ?? this.inputEl.value.length;
    const textBeforeCursor = this.inputEl.value.slice(0, cursor);
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
    return markdownFiles.filter((f) => f.basename.toLowerCase().includes(cleanQuery) || f.path.toLowerCase().includes(cleanQuery)).slice(0, 20);
  }
  renderSuggestion(file, el) {
    el.empty();
    const item = el.createDiv({ cls: "os-wikilink-suggest-item" });
    item.createSpan({ cls: "os-wikilink-title", text: file.basename });
    if (file.parent && file.parent.path !== "/") {
      item.createSpan({ cls: "os-wikilink-folder", text: file.parent.path });
    }
  }
  selectSuggestion(file) {
    const cursor = this.inputEl.selectionStart ?? this.inputEl.value.length;
    const text = this.inputEl.value;
    const textBeforeCursor = text.slice(0, cursor);
    const textAfterCursor = text.slice(cursor);
    const openBracketIndex = textBeforeCursor.lastIndexOf("[[");
    if (openBracketIndex === -1) return;
    const hasClosingBrackets = textAfterCursor.startsWith("]]");
    const prefix = text.slice(0, openBracketIndex);
    const suffix = hasClosingBrackets ? textAfterCursor.slice(2) : textAfterCursor;
    const replacement = `[[${file.basename}]]`;
    this.inputEl.value = `${prefix}${replacement}${suffix}`;
    const newCursor = prefix.length + replacement.length;
    this.inputEl.setSelectionRange(newCursor, newCursor);
    this.inputEl.dispatchEvent(new Event("input", { bubbles: true }));
    this.close();
  }
  /**
   * Returns true if the suggestion popover is currently displayed on screen.
   */
  isSuggestOpen() {
    return Boolean(
      this.isOpen || this.suggestEl && document.body.contains(this.suggestEl)
    );
  }
};

// src/settings.ts
var OSDashboardSettingTab = class extends import_obsidian4.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.activeTab = "general";
    this.openSections = /* @__PURE__ */ new Set();
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "OS Dashboard Settings" });
    const navBar = containerEl.createDiv({ cls: "os-settings-nav-bar" });
    const tabs = [
      { id: "general", label: "General", icon: "settings" },
      { id: "navigation", label: "Navigation", icon: "folder-tree" },
      { id: "widgets", label: "Widgets", icon: "layout-grid" },
      { id: "tasks-projects", label: "Configure Widgets", icon: "sliders" },
      { id: "bookmarks", label: "Bookmarks", icon: "bookmark" }
    ];
    for (const tab of tabs) {
      const btn = navBar.createEl("button", {
        cls: `os-settings-tab-btn ${this.activeTab === tab.id ? "is-active" : ""}`
      });
      const iconSpan = btn.createSpan({ cls: "os-settings-tab-icon" });
      (0, import_obsidian4.setIcon)(iconSpan, tab.icon);
      btn.createSpan({ text: tab.label });
      btn.addEventListener("click", () => {
        this.activeTab = tab.id;
        this.display();
      });
    }
    const tabContent = containerEl.createDiv({ cls: "os-settings-tab-content" });
    switch (this.activeTab) {
      case "general":
        this.renderGeneralTab(tabContent);
        break;
      case "navigation":
        this.renderNavigationTab(tabContent);
        break;
      case "widgets":
        this.renderWidgetsTab(tabContent);
        break;
      case "tasks-projects":
        this.renderTasksProjectsTab(tabContent);
        break;
      case "bookmarks":
        this.renderBookmarksTab(tabContent);
        break;
    }
  }
  // =========================================================================
  // 1. GENERAL TAB
  // =========================================================================
  renderGeneralTab(container) {
    container.createEl("h3", { text: "Startup & New Tab Behavior" });
    new import_obsidian4.Setting(container).setName("Open on Startup").setDesc("Automatically launch and focus the OS Dashboard whenever Obsidian opens.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.openOnStartup ?? true).onChange(async (val) => {
        this.plugin.settings.openOnStartup = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian4.Setting(container).setName("Open on New Tab").setDesc("Automatically open the OS Dashboard when creating a new empty tab (homepage mode).").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.openOnNewTab ?? false).onChange(async (val) => {
        this.plugin.settings.openOnNewTab = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian4.Setting(container).setName("Mobile Top Space / Margin").setDesc("Top spacing in pixels applied on mobile to keep the dashboard below the mobile notification bar and Obsidian UI (in portrait & landscape).").addSlider((slider) => {
      slider.setLimits(0, 120, 2).setValue(this.plugin.settings.mobileTopMargin ?? 48).setDynamicTooltip().onChange(async (val) => {
        this.plugin.settings.mobileTopMargin = val;
        await this.plugin.saveSettings();
      });
    });
    container.createEl("h3", { text: "Hero Identity & Appearance" });
    new import_obsidian4.Setting(container).setName("Vault Title").setDesc("Main title displayed in the hero banner. Leave blank to automatically use your vault name.").addText((text) => {
      text.setPlaceholder(this.app.vault.getName() || "Vault Name").setValue(this.plugin.settings.vaultTitle || "").onChange(async (val) => {
        this.plugin.settings.vaultTitle = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian4.Setting(container).setName("Vault Subtitle / Motto").setDesc("Tagline below the title.").addText((text) => {
      text.setPlaceholder("Think \u2022 Learn \u2022 Build \u2022 Create \u2022 Grow").setValue(this.plugin.settings.vaultSubtitle).onChange(async (val) => {
        this.plugin.settings.vaultSubtitle = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian4.Setting(container).setName("Banner Image Path or URL").setDesc("Path to an image in your vault or an online image URL. Defaults to an aesthetic Unsplash panorama.").addText((text) => {
      text.setPlaceholder("https://images.unsplash.com/... or banner.png").setValue(this.plugin.settings.bannerPath).onChange(async (val) => {
        this.plugin.settings.bannerPath = val.trim();
        await this.plugin.saveSettings();
      });
      text.inputEl.style.width = "240px";
    }).addButton((btn) => {
      btn.setButtonText("\u{1F3B2} Random Unsplash").setTooltip("Load a new random aesthetic Unsplash photo").onClick(async () => {
        const newBanner = getRandomAestheticBanner();
        this.plugin.settings.bannerPath = newBanner;
        await this.plugin.saveSettings();
        new import_obsidian4.Notice("Aesthetic Unsplash banner applied!");
        this.display();
      });
    });
    new import_obsidian4.Setting(container).setName("Avatar Icon").setDesc("Lucide icon identifier for the hero avatar badge (e.g. 'home', 'terminal', 'user').").addText((text) => {
      text.setPlaceholder("home").setValue(this.plugin.settings.vaultAvatarIcon).onChange(async (val) => {
        this.plugin.settings.vaultAvatarIcon = val.trim() || "home";
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian4.Setting(container).setName("Top Quote").setDesc("Inspirational text displayed on the top right.").addTextArea((text) => {
      text.setPlaceholder("A better me\na brighter tomorrow.").setValue(this.plugin.settings.quoteTop).onChange(async (val) => {
        this.plugin.settings.quoteTop = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian4.Setting(container).setName("Main Callout Quote").setDesc("Card quote shown below your vault title.").addText((text) => {
      text.setPlaceholder("\u201CDiscipline today creates the freedom tomorrow.\u201D").setValue(this.plugin.settings.quoteMain).onChange(async (val) => {
        this.plugin.settings.quoteMain = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian4.Setting(container).setName("Clock Subtitle").setDesc("Caption underneath the digital clock.").addTextArea((text) => {
      text.setPlaceholder("Small steps every day\nlead to big results.").setValue(this.plugin.settings.clockSubtitle).onChange(async (val) => {
        this.plugin.settings.clockSubtitle = val;
        await this.plugin.saveSettings();
      });
    });
  }
  // =========================================================================
  // 2. NAVIGATION TAB
  // =========================================================================
  renderNavigationTab(container) {
    container.createEl("h3", { text: "Smart Folder Ribbon" });
    new import_obsidian4.Setting(container).setName("Home Note Keywords").setDesc("Comma-separated keywords to identify a Home/Index note in 1st-level folders (e.g. Home, Index, MOC).").addText((text) => {
      text.setPlaceholder("Home, Index, MOC").setValue(this.plugin.settings.homeKeywords.join(", ")).onChange(async (val) => {
        this.plugin.settings.homeKeywords = val.split(",").map((k) => k.trim()).filter(Boolean);
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian4.Setting(container).setName("Match Folder Name as Home Note").setDesc("Also consider a note as the Home note if its file name is the same as the folder name (e.g. 'Projects/Projects.md').").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.matchFolderName ?? true).onChange(async (val) => {
        this.plugin.settings.matchFolderName = val;
        await this.plugin.saveSettings();
      });
    });
    const dailyFormat = getDailyNotesFormat(this.app);
    const initialPattern = this.plugin.settings.newFilePattern || "";
    const newNoteSetting = new import_obsidian4.Setting(container).setName("New Note Naming Pattern");
    const updatePatternDesc = (val) => {
      const clean = val.trim();
      newNoteSetting.descEl.empty();
      const refLink = newNoteSetting.descEl.createEl("a", {
        text: "Syntax reference",
        href: "https://momentjs.com/docs/#/displaying/format/"
      });
      refLink.setAttr("target", "_blank");
      if (clean) {
        try {
          const preview = moment().format(clean);
          newNoteSetting.descEl.createSpan({ text: `. Your current syntax looks like: ` });
          newNoteSetting.descEl.createEl("b", { text: preview });
        } catch (e) {
          newNoteSetting.descEl.createSpan({ text: `. Invalid syntax format` });
        }
      } else {
        const examplePreview = moment().format(dailyFormat || "YYYY-MM-DD");
        newNoteSetting.descEl.createSpan({ text: `. e.g. ${examplePreview}` });
      }
    };
    updatePatternDesc(initialPattern);
    newNoteSetting.addText((text) => {
      text.setPlaceholder(dailyFormat || "YYYY-MM-DD").setValue(initialPattern).onChange(async (val) => {
        this.plugin.settings.newFilePattern = val.trim();
        updatePatternDesc(val);
        await this.plugin.saveSettings();
      });
      text.inputEl.addEventListener("input", () => {
        updatePatternDesc(text.inputEl.value);
      });
      text.inputEl.style.width = "220px";
    });
    new import_obsidian4.Setting(container).setName("Ignored Navigation Folders").setDesc("Comma-separated folder names to hide from the navigation ribbon. Folders starting with '_' or '.' are hidden automatically.").addText((text) => {
      text.setPlaceholder("_attachments, _scripts, _templates, Templates").setValue((this.plugin.settings.ignoredFolders || []).join(", ")).onChange(async (val) => {
        this.plugin.settings.ignoredFolders = val.split(",").map((f) => f.trim()).filter(Boolean);
        await this.plugin.saveSettings();
      });
    });
    container.createEl("h3", { text: "Folder Icons & Color Overrides" });
    const overrideDesc = container.createEl("p", {
      text: "Customize the icon and color for each folder in your Navigation Ribbon and across the dashboard. If you previously used the Obsidian Iconize plugin, you can import your existing colors and icons with one click.",
      cls: "setting-item-description"
    });
    overrideDesc.style.marginBottom = "14px";
    new import_obsidian4.Setting(container).setName("Iconize Migration & Quick Actions").setDesc("Import folder icons and colors from obsidian-iconize, or manage custom overrides.").addButton((btn) => {
      btn.setButtonText("Import from Iconize").setIcon("download").setCta().onClick(async () => {
        const result = await this.plugin.iconService.importFromIconize();
        if (result.count === 0) {
          new import_obsidian4.Notice("No Iconize data found. Ensure obsidian-iconize was installed or data.json exists.");
          return;
        }
        if (!this.plugin.settings.folderOverrides) {
          this.plugin.settings.folderOverrides = {};
        }
        this.plugin.settings.folderOverrides = Object.assign({}, this.plugin.settings.folderOverrides, result.overrides);
        await this.plugin.saveSettings();
        new import_obsidian4.Notice(`Successfully imported ${result.count} folder styles from Iconize!`);
        this.display();
      });
    }).addButton((btn) => {
      btn.setButtonText("Reset All Overrides").setClass("os-btn-danger").onClick(async () => {
        this.plugin.settings.folderOverrides = {};
        await this.plugin.saveSettings();
        new import_obsidian4.Notice("All folder icon & color overrides have been reset.");
        this.display();
      });
    });
    const folderCards = this.plugin.navigationService.getFolderCards(this.plugin.settings);
    const overrides = this.plugin.settings.folderOverrides || {};
    const foldersListContainer = container.createDiv({ cls: "os-folder-overrides-list" });
    if (folderCards.length === 0) {
      foldersListContainer.createEl("p", {
        text: "No navigation folders detected. Create folders in your vault root or adjust your ignored folders filter.",
        cls: "os-empty-state-text"
      });
    }
    for (const card of folderCards) {
      const existing = overrides[card.path] || overrides[card.name];
      const resolved = card.resolvedIcon;
      const itemEl = foldersListContainer.createDiv({ cls: "os-folder-override-item" });
      const leftCol = itemEl.createDiv({ cls: "os-folder-override-left" });
      const iconWrap = leftCol.createDiv({ cls: "os-folder-override-icon-wrap" });
      this.plugin.iconService.renderIcon(iconWrap, resolved);
      const labelWrap = leftCol.createDiv({ cls: "os-folder-override-label-wrap" });
      labelWrap.createDiv({ cls: "os-folder-override-title", text: card.name });
      labelWrap.createDiv({ cls: "os-folder-override-sub", text: card.path });
      const iconInputCol = itemEl.createDiv({ cls: "os-folder-override-input-col" });
      const iconInput = iconInputCol.createEl("input", {
        type: "text",
        cls: "os-folder-override-icon-input",
        placeholder: resolved.type === "emoji" ? resolved.value : resolved.value || "folder"
      });
      iconInput.value = existing?.icon || "";
      iconInput.setAttribute("title", "Lucide icon name (e.g. book-open, flame) or Emoji (e.g. \u{1F4DA})");
      const colorCol = itemEl.createDiv({ cls: "os-folder-override-color-col" });
      const nativeColor = colorCol.createEl("input", {
        type: "color",
        cls: "os-folder-override-color-native"
      });
      const activeColor = existing?.color || resolved.color || "#3b82f6";
      nativeColor.value = activeColor.startsWith("#") && activeColor.length === 7 ? activeColor : "#3b82f6";
      const hexInput = colorCol.createEl("input", {
        type: "text",
        cls: "os-folder-override-hex-input"
      });
      hexInput.value = existing?.color || "";
      hexInput.placeholder = activeColor;
      const saveFolder = async (newIcon, newColor) => {
        if (!this.plugin.settings.folderOverrides) {
          this.plugin.settings.folderOverrides = {};
        }
        const current = this.plugin.settings.folderOverrides[card.path] || {};
        if (newIcon !== void 0) current.icon = newIcon.trim() || void 0;
        if (newColor !== void 0) current.color = newColor.trim() || void 0;
        if (!current.icon && !current.color) {
          delete this.plugin.settings.folderOverrides[card.path];
          delete this.plugin.settings.folderOverrides[card.name];
        } else {
          this.plugin.settings.folderOverrides[card.path] = current;
        }
        await this.plugin.saveSettings();
        const updatedResolved = this.plugin.iconService.resolveFolderIcon(card.path, card.name, 0, this.plugin.settings);
        this.plugin.iconService.renderIcon(iconWrap, updatedResolved);
      };
      iconInput.addEventListener("change", async () => {
        await saveFolder(iconInput.value, hexInput.value);
      });
      nativeColor.addEventListener("input", async () => {
        hexInput.value = nativeColor.value;
        await saveFolder(iconInput.value, nativeColor.value);
      });
      hexInput.addEventListener("change", async () => {
        const val = hexInput.value.trim();
        if (/^#[0-9a-fA-F]{6}$/.test(val)) {
          nativeColor.value = val;
        }
        await saveFolder(iconInput.value, val);
      });
      const swatchesWrap = colorCol.createDiv({ cls: "os-mini-swatches" });
      for (const hex of IconService.COLOR_PALETTE.slice(0, 6)) {
        const swatch = swatchesWrap.createDiv({ cls: "os-mini-swatch" });
        swatch.style.backgroundColor = hex;
        swatch.setAttribute("title", hex);
        swatch.addEventListener("click", async () => {
          nativeColor.value = hex;
          hexInput.value = hex;
          await saveFolder(iconInput.value, hex);
        });
      }
      const resetBtn = itemEl.createEl("button", {
        cls: "os-folder-override-reset-btn",
        title: "Reset this folder to default icon & color"
      });
      (0, import_obsidian4.setIcon)(resetBtn, "rotate-ccw");
      resetBtn.addEventListener("click", async () => {
        if (this.plugin.settings.folderOverrides) {
          delete this.plugin.settings.folderOverrides[card.path];
          delete this.plugin.settings.folderOverrides[card.name];
        }
        await this.plugin.saveSettings();
        this.display();
      });
    }
  }
  // =========================================================================
  // 3. WIDGETS MANAGER TAB
  // =========================================================================
  // =========================================================================
  // 3. WIDGETS TAB (COLLAPSIBLE SECTIONS)
  // =========================================================================
  renderWidgetsTab(container) {
    const intro = container.createEl("div", { cls: "os-settings-tab-intro" });
    intro.createEl("h3", { text: "Dashboard Widgets & Layout" });
    intro.createEl("p", {
      text: "Customize widget visibility, appearance, accent colors, and column arrangement.",
      cls: "setting-item-description"
    });
    const headerContent = this.createCollapsibleSection(
      container,
      "Header & Navigation Visibility",
      "layout-template",
      "Toggle top-level hero banner and folder navigation bar",
      false
    );
    new import_obsidian4.Setting(headerContent).setName("Hero Banner").setDesc("Top banner with vault identity, quotes, and live clock.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.showHeroBanner ?? true).onChange(async (val) => {
        this.plugin.settings.showHeroBanner = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian4.Setting(headerContent).setName("Smart Navigation Ribbon").setDesc("1st-level folder shortcuts with inherited icons and colors.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.showNavRibbon ?? true).onChange(async (val) => {
        this.plugin.settings.showNavRibbon = val;
        await this.plugin.saveSettings();
      });
    });
    const mainGridContent = this.createCollapsibleSection(
      container,
      "Main Grid Default Widgets",
      "layout-grid",
      "Toggle cards and click to customize title, icon, or accent color",
      true
    );
    this.renderDefaultWidgetCard(mainGridContent, "todayTasks", "Daily Tasks (Plan & Log)", "Daily", "check-circle", "showTodayTasks", "#8b5cf6");
    this.renderDefaultWidgetCard(mainGridContent, "weeklyTasks", "Weekly Planning", "This Week", "calendar", "showWeeklyTasks", "#8b5cf6");
    this.renderDefaultWidgetCard(mainGridContent, "recentNotes", "Recent Notes", "Recent Notes", "file-text", "showRecentNotes", "#8b5cf6");
    this.renderDefaultWidgetCard(mainGridContent, "quickCapture", "Quick Capture", "Quick Capture", "edit-3", "showQuickCapture", "#8b5cf6");
    this.renderDefaultWidgetCard(mainGridContent, "ongoingProjects", "Ongoing Projects", "Ongoing Projects", "target", "showOngoingProjects", "#8b5cf6");
    this.renderDefaultWidgetCard(mainGridContent, "deadlines", "Deadlines Tracker", "Deadlines", "calendar-clock", "showDeadlines", "#ef4444");
    this.renderDefaultWidgetCard(mainGridContent, "bookmarks", "Bookmarks & Links", "Links", "link-2", "showBookmarks", "#8b5cf6");
    const railContent = this.createCollapsibleSection(
      container,
      "Right Side Companion Rail Widgets",
      "sidebar",
      "Companion rail containing Calendar, Graph view, Streaks tracker, and Quote card",
      false
    );
    new import_obsidian4.Setting(railContent).setName("Enable Right Side Rail").setDesc("Master toggle to show or hide the entire right companion rail.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.showRightRail ?? true).onChange(async (val) => {
        this.plugin.settings.showRightRail = val;
        await this.plugin.saveSettings();
      });
    });
    this.renderDefaultWidgetCard(railContent, "calendar", "Calendar Widget", "Calendar", "calendar", "showCalendar", "#8b5cf6");
    this.renderDefaultWidgetCard(railContent, "graphView", "Graph View Widget", "Graph view", "git-fork", "showGraphView", "#8b5cf6");
    this.renderDefaultWidgetCard(railContent, "streaks", "Streaks Tracker Widget", "Streaks", "flame", "showStreaks", "#f97316");
    this.renderDefaultWidgetCard(railContent, "rightQuote", "Inspirational Quote Card", "Quote", "sparkles", "showRightQuote", "#8b5cf6");
    const layoutContent = this.createCollapsibleSection(
      container,
      "Widget Drag & Drop Layout",
      "move",
      "Restore all widgets back to their default columns and positions",
      false
    );
    new import_obsidian4.Setting(layoutContent).setName("Reset Widget Order & Positions").setDesc("Restore all widgets back to their default columns and positions.").addButton((btn) => {
      btn.setButtonText("Reset Layout").setWarning().onClick(async () => {
        this.plugin.settings.widgetLayout = {
          col1: ["todayTasks", "weeklyTasks"],
          col2: ["recentNotes", "quickCapture"],
          col3: ["ongoingProjects", "deadlines", "bookmarks"],
          rail: ["calendar", "streaks", "graphView", "rightQuote"]
        };
        await this.plugin.saveSettings();
        new import_obsidian4.Notice("Widget layout reset to default!");
      });
    });
    const customContent = this.createCollapsibleSection(
      container,
      "Custom Dashboard Widgets",
      "plus-square",
      "Add custom cards to your dashboard to embed vault notes, checklists, or links",
      false
    );
    const customContainer = customContent.createDiv({ cls: "os-settings-custom-widgets" });
    this.renderCustomWidgetsList(customContainer);
  }
  renderDefaultWidgetCard(container, widgetId, name, defaultTitle, defaultIcon, visibilityKey, defaultColor) {
    const card = container.createDiv({ cls: "os-settings-widget-card is-collapsible" });
    const custom = this.plugin.settings.widgetCustomizations = this.plugin.settings.widgetCustomizations || {};
    const item = custom[widgetId] = custom[widgetId] || {};
    const headerRow = new import_obsidian4.Setting(card).setName(name).addToggle((t) => {
      t.setTooltip("Enable/Disable").setValue(this.plugin.settings[visibilityKey] ?? true).onChange(async (val) => {
        this.plugin.settings[visibilityKey] = val;
        await this.plugin.saveSettings();
      });
    }).addButton((btn) => {
      btn.setIcon("rotate-ccw").setTooltip("Reset appearance to default").onClick(async () => {
        delete custom[widgetId];
        await this.plugin.saveSettings();
        this.display();
      });
    }).addButton((btn) => {
      btn.setIcon("chevron-down").setTooltip("Customize appearance (title, icon, color)").setClass("os-widget-expand-btn").onClick(() => {
        card.toggleClass("is-open", !card.hasClass("is-open"));
        (0, import_obsidian4.setIcon)(btn.buttonEl, card.hasClass("is-open") ? "chevron-up" : "chevron-down");
      });
    });
    headerRow.nameEl.style.cursor = "pointer";
    headerRow.nameEl.addEventListener("click", () => {
      card.toggleClass("is-open", !card.hasClass("is-open"));
      const expandBtn = card.querySelector(".os-widget-expand-btn");
      if (expandBtn) {
        (0, import_obsidian4.setIcon)(expandBtn, card.hasClass("is-open") ? "chevron-up" : "chevron-down");
      }
    });
    const details = card.createDiv({ cls: "os-settings-widget-details" });
    new import_obsidian4.Setting(details).setName("Title & Icon").setDesc(`Card title and Lucide icon (defaults: "${defaultTitle}", "${defaultIcon}").`).addText((text) => {
      text.setPlaceholder(defaultTitle).setValue(item.title || "").onChange(async (val) => {
        item.title = val.trim() || void 0;
        await this.plugin.saveSettings();
      });
    }).addText((text) => {
      text.setPlaceholder(defaultIcon).setValue(item.icon || "").onChange(async (val) => {
        item.icon = val.trim() || void 0;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian4.Setting(details).setName("Description (Optional)").setDesc("Subtitle shown under the card header.").addText((text) => {
      text.setPlaceholder("Subtitle / description").setValue(item.description || "").onChange(async (val) => {
        item.description = val.trim() || void 0;
        await this.plugin.saveSettings();
      });
      text.inputEl.style.width = "100%";
    });
    const colorSetting = new import_obsidian4.Setting(details).setName("Icon Color").setDesc("Accent color for this widget's header icon.");
    const colorWrapper = colorSetting.controlEl.createDiv({ cls: "os-folder-override-color-col" });
    colorWrapper.style.display = "flex";
    colorWrapper.style.alignItems = "center";
    colorWrapper.style.gap = "8px";
    const nativeColor = colorWrapper.createEl("input", {
      type: "color",
      cls: "os-color-picker-input"
    });
    nativeColor.value = item.color || defaultColor || "#8b5cf6";
    nativeColor.style.width = "32px";
    nativeColor.style.height = "28px";
    nativeColor.style.padding = "0";
    nativeColor.style.border = "none";
    nativeColor.style.cursor = "pointer";
    nativeColor.style.borderRadius = "4px";
    const hexInput = colorWrapper.createEl("input", {
      type: "text",
      cls: "os-color-hex-input"
    });
    hexInput.placeholder = defaultColor || "#8b5cf6";
    hexInput.value = item.color || "";
    hexInput.style.width = "85px";
    const saveColor = async (colorVal) => {
      item.color = colorVal.trim() || void 0;
      await this.plugin.saveSettings();
    };
    nativeColor.addEventListener("input", async () => {
      hexInput.value = nativeColor.value;
      await saveColor(nativeColor.value);
    });
    hexInput.addEventListener("change", async () => {
      const val = hexInput.value.trim();
      if (/^#[0-9a-fA-F]{6}$/.test(val)) {
        nativeColor.value = val;
      }
      await saveColor(val);
    });
    const swatchesWrap = colorWrapper.createDiv({ cls: "os-mini-swatches" });
    for (const hex of IconService.COLOR_PALETTE.slice(0, 6)) {
      const swatch = swatchesWrap.createDiv({ cls: "os-mini-swatch" });
      swatch.style.backgroundColor = hex;
      swatch.setAttribute("title", hex);
      swatch.addEventListener("click", async () => {
        nativeColor.value = hex;
        hexInput.value = hex;
        await saveColor(hex);
      });
    }
    if (item.color) {
      const resetColorBtn = colorWrapper.createEl("button", {
        cls: "os-folder-override-reset-btn",
        title: "Reset color to default"
      });
      (0, import_obsidian4.setIcon)(resetColorBtn, "rotate-ccw");
      resetColorBtn.addEventListener("click", async () => {
        delete item.color;
        hexInput.value = "";
        nativeColor.value = defaultColor || "#8b5cf6";
        await this.plugin.saveSettings();
        this.display();
      });
    }
  }
  renderCustomWidgetsList(container) {
    container.empty();
    const widgets = this.plugin.settings.customWidgets || [];
    widgets.forEach((widget, idx) => {
      const widgetCard = container.createDiv({ cls: "os-settings-widget-card is-collapsible" });
      const headerRow = new import_obsidian4.Setting(widgetCard).setName(`Widget #${idx + 1}: ${widget.title || "Untitled"}`).addToggle((t) => {
        t.setTooltip("Enable/Disable").setValue(widget.enabled).onChange(async (val) => {
          widget.enabled = val;
          await this.plugin.saveSettings();
        });
      }).addButton((btn) => {
        btn.setIcon("trash").setTooltip("Delete Widget").onClick(async () => {
          this.plugin.settings.customWidgets.splice(idx, 1);
          await this.plugin.saveSettings();
          this.renderCustomWidgetsList(container);
        });
      }).addButton((btn) => {
        btn.setIcon("chevron-down").setTooltip("Expand / Collapse Settings").setClass("os-widget-expand-btn").onClick(() => {
          widgetCard.toggleClass("is-open", !widgetCard.hasClass("is-open"));
          (0, import_obsidian4.setIcon)(btn.buttonEl, widgetCard.hasClass("is-open") ? "chevron-up" : "chevron-down");
        });
      });
      headerRow.nameEl.style.cursor = "pointer";
      headerRow.nameEl.addEventListener("click", () => {
        widgetCard.toggleClass("is-open", !widgetCard.hasClass("is-open"));
        const expandBtn = widgetCard.querySelector(".os-widget-expand-btn");
        if (expandBtn) {
          (0, import_obsidian4.setIcon)(expandBtn, widgetCard.hasClass("is-open") ? "chevron-up" : "chevron-down");
        }
      });
      const details = widgetCard.createDiv({ cls: "os-settings-widget-details" });
      new import_obsidian4.Setting(details).setName("Title & Icon").setDesc("Card header title and Lucide icon name (e.g. book-open, flame, star).").addText((text) => {
        text.setPlaceholder("Title").setValue(widget.title).onChange(async (val) => {
          widget.title = val;
          await this.plugin.saveSettings();
        });
      }).addText((text) => {
        text.setPlaceholder("Icon (e.g. flame)").setValue(widget.icon).onChange(async (val) => {
          widget.icon = val.trim();
          await this.plugin.saveSettings();
        });
      });
      new import_obsidian4.Setting(details).setName("Description (Optional)").setDesc("Subtitle or brief description shown under the card header.").addText((text) => {
        text.setPlaceholder("e.g. My active project notes").setValue(widget.description || "").onChange(async (val) => {
          widget.description = val.trim() || void 0;
          await this.plugin.saveSettings();
        });
        text.inputEl.style.width = "100%";
      });
      const colorSetting = new import_obsidian4.Setting(details).setName("Icon Color").setDesc("Accent color for this widget's header icon.");
      const colorWrapper = colorSetting.controlEl.createDiv({ cls: "os-folder-override-color-col" });
      colorWrapper.style.display = "flex";
      colorWrapper.style.alignItems = "center";
      colorWrapper.style.gap = "8px";
      const nativeColor = colorWrapper.createEl("input", {
        type: "color",
        cls: "os-color-picker-input"
      });
      nativeColor.value = widget.color || "#8b5cf6";
      nativeColor.style.width = "32px";
      nativeColor.style.height = "28px";
      nativeColor.style.padding = "0";
      nativeColor.style.border = "none";
      nativeColor.style.cursor = "pointer";
      nativeColor.style.borderRadius = "4px";
      const hexInput = colorWrapper.createEl("input", {
        type: "text",
        cls: "os-color-hex-input"
      });
      hexInput.placeholder = "#8b5cf6";
      hexInput.value = widget.color || "";
      hexInput.style.width = "85px";
      const saveColor = async (colorVal) => {
        widget.color = colorVal.trim() || void 0;
        await this.plugin.saveSettings();
      };
      nativeColor.addEventListener("input", async () => {
        hexInput.value = nativeColor.value;
        await saveColor(nativeColor.value);
      });
      hexInput.addEventListener("change", async () => {
        const val = hexInput.value.trim();
        if (/^#[0-9a-fA-F]{6}$/.test(val)) {
          nativeColor.value = val;
        }
        await saveColor(val);
      });
      const swatchesWrap = colorWrapper.createDiv({ cls: "os-mini-swatches" });
      for (const hex of IconService.COLOR_PALETTE.slice(0, 6)) {
        const swatch = swatchesWrap.createDiv({ cls: "os-mini-swatch" });
        swatch.style.backgroundColor = hex;
        swatch.setAttribute("title", hex);
        swatch.addEventListener("click", async () => {
          nativeColor.value = hex;
          hexInput.value = hex;
          await saveColor(hex);
        });
      }
      if (widget.color) {
        const resetColorBtn = colorWrapper.createEl("button", {
          cls: "os-folder-override-reset-btn",
          title: "Reset color to default"
        });
        (0, import_obsidian4.setIcon)(resetColorBtn, "rotate-ccw");
        resetColorBtn.addEventListener("click", async () => {
          delete widget.color;
          hexInput.value = "";
          nativeColor.value = "#8b5cf6";
          await this.plugin.saveSettings();
          this.renderCustomWidgetsList(container);
        });
      }
      new import_obsidian4.Setting(details).setName("Column & Type").setDesc("Target grid column and what content this widget renders.").addDropdown((dd) => {
        dd.addOption("1", "Column 1 (Left)").addOption("2", "Column 2 (Center)").addOption("3", "Column 3 (Right)").addOption("rail", "Right Rail (Companion)").setValue(String(widget.column || 1)).onChange(async (val) => {
          widget.column = val === "rail" ? "rail" : parseInt(val, 10);
          if (this.plugin.settings.widgetLayout) {
            const cid = `custom-${widget.id}`;
            const layout = this.plugin.settings.widgetLayout;
            const colKeys = ["col1", "col2", "col3", "rail"];
            for (const k of colKeys) {
              if (Array.isArray(layout[k])) {
                layout[k] = layout[k].filter((id) => id !== cid);
              }
            }
            const targetCol = widget.column === "rail" ? "rail" : `col${widget.column}`;
            if (!Array.isArray(layout[targetCol])) {
              layout[targetCol] = [];
            }
            layout[targetCol].push(cid);
          }
          await this.plugin.saveSettings();
        });
      }).addDropdown((dd) => {
        dd.addOption("markdown-note", "Vault Note Embed").addOption("custom-text", "Custom Markdown Text").addOption("dataview", "Dataview Query").addOption("link-button", "Quick Link / Button").setValue(widget.type || "markdown-note").onChange(async (val) => {
          widget.type = val;
          await this.plugin.saveSettings();
          this.renderCustomWidgetsList(container);
        });
      });
      if (widget.type === "markdown-note") {
        const contentSetting = new import_obsidian4.Setting(details).setName("Vault Note Path").setDesc("Path to a markdown file in your vault (suggests notes as you type).").addText((t) => {
          new FileSuggest(this.app, t.inputEl, async (file) => {
            widget.content = file.path;
            await this.plugin.saveSettings();
          });
          t.setPlaceholder("path/to/note.md").setValue(widget.content).onChange(async (val) => {
            widget.content = val.trim();
            await this.plugin.saveSettings();
          });
        });
      } else if (widget.type === "custom-text") {
        const contentSetting = new import_obsidian4.Setting(details).setName("Custom Content").setDesc("Custom markdown or text displayed inside the card.").addTextArea((t) => {
          t.setPlaceholder("Type markdown or reminders...").setValue(widget.content).onChange(async (val) => {
            widget.content = val;
            await this.plugin.saveSettings();
          });
        });
      } else if (widget.type === "dataview") {
        new import_obsidian4.Setting(details).setName("Show Table Header").setDesc("Display the column header row at the top of the table.").addToggle((t) => {
          t.setValue(widget.showTableHeader !== false).onChange(async (val) => {
            widget.showTableHeader = val;
            await this.plugin.saveSettings();
          });
        });
        const contentSetting = new import_obsidian4.Setting(details).setName("Dataview Query").setDesc("Dataview DQL query (e.g. TABLE file.mtime AS Modified FROM #project LIMIT 5) or dataviewjs script.").addTextArea((t) => {
          t.setPlaceholder("TABLE file.mtime AS Modified FROM #project SORT file.mtime DESC LIMIT 5").setValue(widget.content).onChange(async (val) => {
            widget.content = val;
            await this.plugin.saveSettings();
          });
          t.inputEl.rows = 4;
          t.inputEl.style.fontFamily = "var(--font-monospace)";
          t.inputEl.style.fontSize = "12px";
        });
      } else if (widget.type === "link-button") {
        const buttonsSection = details.createDiv({ cls: "os-settings-buttons-section" });
        new import_obsidian4.Setting(buttonsSection).setName("Buttons & Links").setDesc("Add multiple action buttons with custom labels and targets (URLs or [[Note]] links).");
        if (!widget.buttons || widget.buttons.length === 0) {
          if (widget.content) {
            widget.buttons = [{
              id: Date.now().toString(),
              label: widget.title || "Open",
              target: widget.content
            }];
          } else {
            widget.buttons = [{
              id: Date.now().toString(),
              label: "Open",
              target: ""
            }];
          }
        }
        const buttonsContainer = buttonsSection.createDiv({ cls: "os-settings-buttons-list" });
        const renderButtonsEditor = () => {
          buttonsContainer.empty();
          widget.buttons?.forEach((btnItem, bIdx) => {
            const row = buttonsContainer.createDiv({ cls: "os-settings-btn-item" });
            const labelInput = row.createEl("input", {
              type: "text",
              placeholder: "Label (e.g. Daily Tasks)"
            });
            labelInput.value = btnItem.label || "";
            labelInput.style.flex = "1 1 120px";
            labelInput.style.minWidth = "90px";
            labelInput.addEventListener("change", async () => {
              btnItem.label = labelInput.value.trim();
              await this.plugin.saveSettings();
            });
            const iconInput = row.createEl("input", {
              type: "text",
              placeholder: "Icon (e.g. flame)"
            });
            iconInput.value = btnItem.icon || "";
            iconInput.style.flex = "0 1 100px";
            iconInput.style.minWidth = "70px";
            iconInput.addEventListener("change", async () => {
              btnItem.icon = iconInput.value.trim() || void 0;
              await this.plugin.saveSettings();
            });
            const targetInput = row.createEl("input", {
              type: "text",
              placeholder: "https://... or [[Note]]"
            });
            targetInput.value = btnItem.target || "";
            targetInput.style.flex = "2 1 180px";
            targetInput.style.minWidth = "130px";
            new WikiLinkSuggest(this.app, targetInput);
            targetInput.addEventListener("change", async () => {
              btnItem.target = targetInput.value.trim();
              await this.plugin.saveSettings();
            });
            const delBtn = row.createEl("button", {
              cls: "os-folder-override-reset-btn",
              title: "Remove button"
            });
            (0, import_obsidian4.setIcon)(delBtn, "trash");
            delBtn.addEventListener("click", async () => {
              widget.buttons?.splice(bIdx, 1);
              await this.plugin.saveSettings();
              renderButtonsEditor();
            });
          });
          const addBtnWrap = buttonsContainer.createDiv();
          addBtnWrap.style.marginTop = "6px";
          const addBtn = addBtnWrap.createEl("button", {
            text: "+ Add Button",
            cls: "mod-cta"
          });
          addBtn.style.fontSize = "12px";
          addBtn.style.padding = "4px 10px";
          addBtn.addEventListener("click", async () => {
            if (!widget.buttons) widget.buttons = [];
            widget.buttons.push({
              id: Date.now().toString(),
              label: "New Button",
              target: ""
            });
            await this.plugin.saveSettings();
            renderButtonsEditor();
          });
        };
        renderButtonsEditor();
      }
    });
    new import_obsidian4.Setting(container).addButton((btn) => {
      btn.setButtonText("+ Add Custom Widget").setCta().onClick(async () => {
        if (!this.plugin.settings.customWidgets) {
          this.plugin.settings.customWidgets = [];
        }
        this.plugin.settings.customWidgets.push({
          id: Date.now().toString(),
          title: "New Widget",
          icon: "sparkles",
          type: "markdown-note",
          content: "",
          column: 1,
          enabled: true
        });
        await this.plugin.saveSettings();
        this.renderCustomWidgetsList(container);
      });
    });
  }
  // =========================================================================
  // 4. CONFIGURE WIDGETS TAB (COLLAPSIBLE SECTIONS)
  // =========================================================================
  createCollapsibleSection(container, title, icon, description, defaultOpen = false) {
    const isExpanded = this.openSections.has(title) || defaultOpen && !this.openSections.has(`__closed__${title}`);
    const wrap = container.createDiv({ cls: `os-settings-collapse ${isExpanded ? "is-expanded" : ""}` });
    const header = wrap.createDiv({ cls: "os-settings-collapse-header" });
    const titleLeft = header.createDiv({ cls: "os-settings-collapse-left" });
    const iconSpan = titleLeft.createSpan({ cls: "os-settings-collapse-icon" });
    (0, import_obsidian4.setIcon)(iconSpan, icon);
    const titleGroup = titleLeft.createDiv({ cls: "os-settings-collapse-title-group" });
    titleGroup.createSpan({ cls: "os-settings-collapse-title", text: title });
    if (description) {
      titleGroup.createSpan({ cls: "os-settings-collapse-desc", text: description });
    }
    const chevron = header.createSpan({ cls: "os-settings-collapse-chevron" });
    (0, import_obsidian4.setIcon)(chevron, "chevron-down");
    const content = wrap.createDiv({ cls: "os-settings-collapse-content" });
    header.addEventListener("click", () => {
      const willExpand = !wrap.hasClass("is-expanded");
      wrap.toggleClass("is-expanded", willExpand);
      if (willExpand) {
        this.openSections.add(title);
        this.openSections.delete(`__closed__${title}`);
      } else {
        this.openSections.delete(title);
        this.openSections.add(`__closed__${title}`);
      }
    });
    return content;
  }
  renderTasksProjectsTab(container) {
    const intro = container.createEl("div", { cls: "os-settings-tab-intro" });
    intro.createEl("h3", { text: "Configure Built-in Widgets" });
    intro.createEl("p", {
      text: "Fine-tune file paths, folder targets, frontmatter properties, and limits for each built-in widget.",
      cls: "setting-item-description"
    });
    const tasksContent = this.createCollapsibleSection(
      container,
      "Daily & Weekly Task Files",
      "check-square",
      "Manage daily planning, logs, and weekly task files",
      false
    );
    new import_obsidian4.Setting(tasksContent).setName("Daily Tasks File (Plan)").setDesc("Path to the file containing daily planned tasks organized by date headings (e.g. Daily Tasks.md).").addText((text) => {
      new FileSuggest(this.app, text.inputEl, async (file) => {
        this.plugin.settings.dailyTasksFile = file.path;
        await this.plugin.saveSettings();
      });
      text.setPlaceholder("Daily Tasks.md").setValue(this.plugin.settings.dailyTasksFile).onChange(async (val) => {
        this.plugin.settings.dailyTasksFile = val.trim();
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian4.Setting(tasksContent).setName("Daily Logs File (What I Did)").setDesc("Path to the file containing what you actually did today (e.g. Daily Logs.md).").addText((text) => {
      new FileSuggest(this.app, text.inputEl, async (file) => {
        this.plugin.settings.dailyLogFile = file.path;
        await this.plugin.saveSettings();
      });
      text.setPlaceholder("Daily Logs.md").setValue(this.plugin.settings.dailyLogFile || "").onChange(async (val) => {
        this.plugin.settings.dailyLogFile = val.trim();
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian4.Setting(tasksContent).setName("Auto-Log Completed Tasks").setDesc("When you check off a planned task in 'What I had to do', automatically append it to your Daily Logs.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.autoLogToDailyLog ?? true).onChange(async (val) => {
        this.plugin.settings.autoLogToDailyLog = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian4.Setting(tasksContent).setName("Weekly Tasks File").setDesc("Path to the file containing weekly tasks (e.g. Weekly Tasks.md).").addText((text) => {
      new FileSuggest(this.app, text.inputEl, async (file) => {
        this.plugin.settings.weeklyTasksFile = file.path;
        await this.plugin.saveSettings();
      });
      text.setPlaceholder("Weekly Tasks.md").setValue(this.plugin.settings.weeklyTasksFile).onChange(async (val) => {
        this.plugin.settings.weeklyTasksFile = val.trim();
        await this.plugin.saveSettings();
      });
    });
    const qcContent = this.createCollapsibleSection(
      container,
      "Quick Capture",
      "edit-3",
      "Destination folder for quick notes created from dashboard",
      false
    );
    new import_obsidian4.Setting(qcContent).setName("Quick Capture Folder").setDesc("Folder where notes created via the Quick Capture box will be saved (e.g. 00 Inbox).").addText((text) => {
      text.setPlaceholder("00 Inbox").setValue(this.plugin.settings.quickCaptureFolder).onChange(async (val) => {
        this.plugin.settings.quickCaptureFolder = val.trim();
        await this.plugin.saveSettings();
      });
    });
    const projectsContent = this.createCollapsibleSection(
      container,
      "Ongoing Projects",
      "target",
      "Configure folders and frontmatter for active project tracking",
      false
    );
    new import_obsidian4.Setting(projectsContent).setName("Projects Folder(s)").setDesc('Folders to scan for project notes. Separate multiple folders with commas. If a folder name contains a comma, enclose it in double quotes (e.g. "03 Projects", "Work, Tasks"). Leave blank to search entire vault.').addText((text) => {
      text.setPlaceholder("Leave blank to search entire vault").setValue(this.plugin.settings.projectsFolder).onChange(async (val) => {
        this.plugin.settings.projectsFolder = val.trim();
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian4.Setting(projectsContent).setName("Status Property Name").setDesc("Frontmatter property indicating project status.").addText((text) => {
      text.setPlaceholder("status").setValue(this.plugin.settings.projectStatusProp).onChange(async (val) => {
        this.plugin.settings.projectStatusProp = val.trim() || "status";
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian4.Setting(projectsContent).setName("Active Status Values").setDesc("Comma-separated status values that mark a project as ongoing (e.g. in-progress, active).").addText((text) => {
      text.setPlaceholder("in-progress, active, ongoing").setValue(this.plugin.settings.projectStatusValues.join(", ")).onChange(async (val) => {
        this.plugin.settings.projectStatusValues = val.split(",").map((v) => v.trim()).filter(Boolean);
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian4.Setting(projectsContent).setName("Progress Property Name").setDesc("Frontmatter property for manual percentage. If missing, task checkboxes are calculated automatically.").addText((text) => {
      text.setPlaceholder("progress").setValue(this.plugin.settings.projectProgressProp).onChange(async (val) => {
        this.plugin.settings.projectProgressProp = val.trim() || "progress";
        await this.plugin.saveSettings();
      });
    });
    const deadlinesContent = this.createCollapsibleSection(
      container,
      "Deadlines Tracker",
      "calendar-clock",
      "Track target dates, remaining time, countdowns, and overdue alerts",
      false
    );
    new import_obsidian4.Setting(deadlinesContent).setName("Deadlines Folder(s)").setDesc('Folders to scan for notes with deadlines. Separate multiple folders with commas or double quotes (e.g. "03 Projects", "04 Work"). Leave blank to search entire vault.').addText((text) => {
      text.setPlaceholder("Leave blank to search entire vault").setValue(this.plugin.settings.deadlinesFolders || "").onChange(async (val) => {
        this.plugin.settings.deadlinesFolders = val.trim();
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian4.Setting(deadlinesContent).setName("Deadline Property Name (Target)").setDesc("Frontmatter property holding the target date (e.g. target_completion_date, deadline, due). Notes with this property will show in the Deadline widget.").addText((text) => {
      text.setPlaceholder("target_completion_date").setValue(this.plugin.settings.deadlineProp || "target_completion_date").onChange(async (val) => {
        this.plugin.settings.deadlineProp = val.trim() || "target_completion_date";
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian4.Setting(deadlinesContent).setName("Completion Property (Finished Trigger)").setDesc("When this property is filled with a date or value (e.g. 'completed_date: 2026-10-25' or 'completed_date: true'), the milestone is treated as complete and removed from the widget. Empty means still active.").addText((text) => {
      text.setPlaceholder("completed_date").setValue(this.plugin.settings.deadlineCompletedProp || "completed_date").onChange(async (val) => {
        this.plugin.settings.deadlineCompletedProp = val.trim() || "completed_date";
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian4.Setting(deadlinesContent).setName("Status Property Name (Badge Display)").setDesc("Frontmatter property displayed as the badge tag next to the project title (e.g. 'evolve', 'need-review', 'in-progress'). No need to define status values.").addText((text) => {
      text.setPlaceholder("status").setValue(this.plugin.settings.deadlineStatusProp || "status").onChange(async (val) => {
        this.plugin.settings.deadlineStatusProp = val.trim() || "status";
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian4.Setting(deadlinesContent).setName("Start Date Property (Optional)").setDesc("Frontmatter property for project start date (e.g. start_date, created, started). If omitted, note creation date is used to calculate the circular current/deadline progress gauge.").addText((text) => {
      text.setPlaceholder("start_date").setValue(this.plugin.settings.deadlineProgressProp || "start_date").onChange(async (val) => {
        this.plugin.settings.deadlineProgressProp = val.trim() || "start_date";
        await this.plugin.saveSettings();
      });
    });
    const recentContent = this.createCollapsibleSection(
      container,
      "Recent Notes",
      "file-text",
      "Configure limits and excluded directories for recent notes",
      false
    );
    new import_obsidian4.Setting(recentContent).setName("Recent Notes Limit").setDesc("Maximum number of recently modified notes to display.").addText((text) => {
      text.setPlaceholder("8").setValue(String(this.plugin.settings.recentNotesLimit)).onChange(async (val) => {
        const num = parseInt(val, 10);
        if (!isNaN(num) && num > 0) {
          this.plugin.settings.recentNotesLimit = num;
          await this.plugin.saveSettings();
        }
      });
    });
    new import_obsidian4.Setting(recentContent).setName("Excluded Folders").setDesc("Comma-separated folders to ignore in Recent Notes (e.g. _attachments, _scripts, _templates, Templates, .trash).").addText((text) => {
      text.setPlaceholder("_attachments, _scripts, _templates, Templates, .trash").setValue((this.plugin.settings.recentNotesExcludeFolders || []).join(", ")).onChange(async (val) => {
        this.plugin.settings.recentNotesExcludeFolders = val.split(",").map((f) => f.trim()).filter(Boolean);
        await this.plugin.saveSettings();
      });
    });
    const habitsContent = this.createCollapsibleSection(
      container,
      "Habit Streaks Tracker",
      "flame",
      "Configure habits markdown file, archive path, and auto-freeze streak protection",
      false
    );
    new import_obsidian4.Setting(habitsContent).setName("Habits File").setDesc("Path to the markdown file storing your active habit streaks and callouts (e.g. Habits.md).").addText((text) => {
      new FileSuggest(this.app, text.inputEl, async (file) => {
        this.plugin.settings.habitsFile = file.path;
        await this.plugin.saveSettings();
      });
      text.setPlaceholder("Habits.md").setValue(this.plugin.settings.habitsFile || "Habits.md").onChange(async (val) => {
        this.plugin.settings.habitsFile = val.trim() || "Habits.md";
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian4.Setting(habitsContent).setName("Habits Archive File").setDesc("Path to the markdown file where archived habits are moved (e.g. 99 Archive/Habits.md). Created automatically if needed.").addText((text) => {
      new FileSuggest(this.app, text.inputEl, async (file) => {
        this.plugin.settings.archiveHabitsFile = file.path;
        await this.plugin.saveSettings();
      });
      text.setPlaceholder("99 Archive/Habits.md").setValue(this.plugin.settings.archiveHabitsFile || "99 Archive/Habits.md").onChange(async (val) => {
        this.plugin.settings.archiveHabitsFile = val.trim() || "99 Archive/Habits.md";
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian4.Setting(habitsContent).setName("Auto-Freeze Missed Habits").setDesc("Automatically use an available freeze from the habit's quota if you miss completing it, protecting your streak from resetting.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.autoFreezeHabits ?? true).onChange(async (val) => {
        this.plugin.settings.autoFreezeHabits = val;
        await this.plugin.saveSettings();
        if (val) {
          await this.plugin.runAutoFreeze();
        }
      });
    });
    const calendarContent = this.createCollapsibleSection(
      container,
      "Calendar & Google Calendar Sync",
      "calendar",
      "Configure local events file, Google Calendar iCal sync, and event reminders",
      false
    );
    new import_obsidian4.Setting(calendarContent).setName("Events File").setDesc("Path to the Markdown file where local events are stored (e.g. Events.md). Uses the same date-heading format as Daily Tasks (## YYYY-MM-DD).").addText((text) => {
      new FileSuggest(this.app, text.inputEl, async (file) => {
        this.plugin.settings.calendarEventsFile = file.path;
        await this.plugin.saveSettings();
      });
      text.setPlaceholder("Events.md").setValue(this.plugin.settings.calendarEventsFile || "Events.md").onChange(async (val) => {
        this.plugin.settings.calendarEventsFile = val.trim() || "Events.md";
        await this.plugin.saveSettings();
      });
    });
    const isKeychainSupported = this.plugin.calendarService.isKeychainAvailable();
    const SecretComponentClass = obsidian.SecretComponent;
    const useKeychain = Boolean(
      this.plugin.settings.googleCalendarUseKeychain || isKeychainSupported && Boolean(this.plugin.settings.googleCalendarSecretId)
    );
    new import_obsidian4.Setting(calendarContent).setName("Use Obsidian Keychain (SecretStorage)").setDesc(
      isKeychainSupported ? "Store your private Google Calendar iCal address securely in Obsidian Keychain instead of plaintext in settings." : "Obsidian Keychain (SecretStorage) is supported in Obsidian v1.11.4+. You are currently using direct URL storage."
    ).addToggle((toggle) => {
      toggle.setValue(useKeychain).setDisabled(!isKeychainSupported).onChange(async (val) => {
        this.plugin.settings.googleCalendarUseKeychain = val;
        await this.plugin.saveSettings();
        this.display();
      });
    });
    if (useKeychain && isKeychainSupported) {
      if (SecretComponentClass) {
        new import_obsidian4.Setting(calendarContent).setName("Keychain Secret").setDesc("Select an existing secret or click '+' to create a secret containing your Google Calendar .ics URL.").addComponent((cb) => {
          const comp = new SecretComponentClass(this.app, cb);
          comp.setValue(this.plugin.settings.googleCalendarSecretId || "").onChange(async (val) => {
            this.plugin.settings.googleCalendarSecretId = val;
            await this.plugin.saveSettings();
          });
          return comp;
        }).addButton((btn) => {
          btn.setButtonText("Sync Events Now").setCta().onClick(async () => {
            const url = this.plugin.calendarService.getCalendarUrl(this.plugin.settings);
            if (!url) {
              new import_obsidian4.Notice("No secret selected or secret is empty in Obsidian Keychain.");
              return;
            }
            btn.setButtonText("Syncing...");
            btn.setDisabled(true);
            try {
              const events = await this.plugin.calendarService.fetchEvents(url);
              this.plugin.settings.cachedCalendarEvents = events;
              this.plugin.settings.lastCalendarSyncTime = Date.now();
              await this.plugin.saveSettings();
              new import_obsidian4.Notice(`\u2705 Synced ${events.length} Google Calendar event${events.length === 1 ? "" : "s"} from Keychain!`);
            } catch (err) {
              new import_obsidian4.Notice(`\u274C Failed to sync: ${err.message || "Invalid iCal URL or network error"}`);
            } finally {
              btn.setButtonText("Sync Events Now");
              btn.setDisabled(false);
            }
          });
        });
      } else {
        new import_obsidian4.Setting(calendarContent).setName("Keychain Secret Identifier").setDesc("Enter the name of your secret in Obsidian Keychain.").addText((text) => {
          text.setPlaceholder("e.g. google-calendar-url").setValue(this.plugin.settings.googleCalendarSecretId || "").onChange(async (val) => {
            this.plugin.settings.googleCalendarSecretId = val.trim();
            await this.plugin.saveSettings();
          });
        }).addButton((btn) => {
          btn.setButtonText("Sync Events Now").setCta().onClick(async () => {
            const url = this.plugin.calendarService.getCalendarUrl(this.plugin.settings);
            if (!url) {
              new import_obsidian4.Notice("No secret configured or secret is empty in Obsidian Keychain.");
              return;
            }
            btn.setButtonText("Syncing...");
            btn.setDisabled(true);
            try {
              const events = await this.plugin.calendarService.fetchEvents(url);
              this.plugin.settings.cachedCalendarEvents = events;
              this.plugin.settings.lastCalendarSyncTime = Date.now();
              await this.plugin.saveSettings();
              new import_obsidian4.Notice(`\u2705 Synced ${events.length} Google Calendar event${events.length === 1 ? "" : "s"} from Keychain!`);
            } catch (err) {
              new import_obsidian4.Notice(`\u274C Failed to sync: ${err.message || "Invalid iCal URL or network error"}`);
            } finally {
              btn.setButtonText("Sync Events Now");
              btn.setDisabled(false);
            }
          });
        });
      }
      const secretStorage = this.app.secretStorage;
      if (secretStorage && typeof secretStorage.setSecret === "function") {
        let saveUrlInput = "";
        new import_obsidian4.Setting(calendarContent).setName("Save New URL to Keychain").setDesc("Paste a new Google Calendar .ics URL to store it securely into Keychain as 'google-calendar-url'.").addText((text) => {
          text.setPlaceholder("https://calendar.google.com/calendar/ical/.../basic.ics").onChange((val) => {
            saveUrlInput = val.trim();
          });
          text.inputEl.style.width = "220px";
        }).addButton((btn) => {
          btn.setButtonText("Save to Keychain").onClick(async () => {
            if (!saveUrlInput || !saveUrlInput.startsWith("http://") && !saveUrlInput.startsWith("https://")) {
              new import_obsidian4.Notice("Please enter a valid https:// URL.");
              return;
            }
            try {
              await secretStorage.setSecret("google-calendar-url", saveUrlInput);
              this.plugin.settings.googleCalendarSecretId = "google-calendar-url";
              this.plugin.settings.googleCalendarUrl = "";
              await this.plugin.saveSettings();
              new import_obsidian4.Notice("\u2705 Saved Google Calendar URL to Obsidian Keychain!");
              this.display();
            } catch (err) {
              new import_obsidian4.Notice(`Failed to save to Keychain: ${err?.message || "Unknown error"}`);
            }
          });
        });
      }
    } else {
      new import_obsidian4.Setting(calendarContent).setName("Google Calendar Address (Private iCal URL)").setDesc("In Google Calendar on the Web, go to Settings > Your Calendar > 'Secret address in iCal format' and paste the URL here.").addText((text) => {
        text.setPlaceholder("https://calendar.google.com/calendar/ical/.../basic.ics").setValue(this.plugin.settings.googleCalendarUrl || "").onChange(async (val) => {
          this.plugin.settings.googleCalendarUrl = val.trim();
          await this.plugin.saveSettings();
        });
        text.inputEl.style.width = "260px";
      }).addButton((btn) => {
        btn.setButtonText("Sync Events Now").setCta().onClick(async () => {
          const url = this.plugin.calendarService.getCalendarUrl(this.plugin.settings);
          if (!url) {
            new import_obsidian4.Notice("Please enter a Google Calendar iCal address first.");
            return;
          }
          btn.setButtonText("Syncing...");
          btn.setDisabled(true);
          try {
            const events = await this.plugin.calendarService.fetchEvents(url);
            this.plugin.settings.cachedCalendarEvents = events;
            this.plugin.settings.lastCalendarSyncTime = Date.now();
            await this.plugin.saveSettings();
            new import_obsidian4.Notice(`\u2705 Synced ${events.length} Google Calendar event${events.length === 1 ? "" : "s"}!`);
          } catch (err) {
            new import_obsidian4.Notice(`\u274C Failed to sync: ${err.message || "Invalid iCal URL or network error"}`);
          } finally {
            btn.setButtonText("Sync Events Now");
            btn.setDisabled(false);
          }
        });
      });
    }
    new import_obsidian4.Setting(calendarContent).setName("Show Connect Banner on Calendar Widget").setDesc("Display the banner prompt to add a Google Calendar address when no address is set.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.showGoogleCalendarBanner ?? true).onChange(async (val) => {
        this.plugin.settings.showGoogleCalendarBanner = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian4.Setting(calendarContent).setName("Auto-sync Events in Background").setDesc("Automatically refresh events from Google Calendar every few minutes.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.googleCalendarAutoSync ?? true).onChange(async (val) => {
        this.plugin.settings.googleCalendarAutoSync = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian4.Setting(calendarContent).setName("Event Reminders & Notifications").setDesc("Trigger an in-app notice and desktop notification before an event begins.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.enableCalendarNotifications ?? true).onChange(async (val) => {
        this.plugin.settings.enableCalendarNotifications = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian4.Setting(calendarContent).setName("Notification Lead Time").setDesc("How many minutes before an event starts to notify you.").addDropdown((dd) => {
      dd.addOption("5", "5 minutes before").addOption("10", "10 minutes before (Default)").addOption("15", "15 minutes before").addOption("30", "30 minutes before").setValue(String(this.plugin.settings.calendarNotificationLeadMinutes || 10)).onChange(async (val) => {
        this.plugin.settings.calendarNotificationLeadMinutes = parseInt(val, 10) || 10;
        await this.plugin.saveSettings();
      });
    });
    const quoteContent = this.createCollapsibleSection(
      container,
      "Companion Rail Quote",
      "sparkles",
      "Configure inspirational quote text and author for the right rail widget",
      false
    );
    new import_obsidian4.Setting(quoteContent).setName("Quote Text").setDesc("Inspirational quote displayed in the right rail widget.").addTextArea((text) => {
      text.setPlaceholder("Consistency is more important than intensity.").setValue(this.plugin.settings.rightRailQuote).onChange(async (val) => {
        this.plugin.settings.rightRailQuote = val;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian4.Setting(quoteContent).setName("Quote Author (Optional)").setDesc("Author name or source.").addText((text) => {
      text.setPlaceholder("e.g. Bruce Lee").setValue(this.plugin.settings.rightRailQuoteAuthor || "").onChange(async (val) => {
        this.plugin.settings.rightRailQuoteAuthor = val;
        await this.plugin.saveSettings();
      });
    });
  }
  // =========================================================================
  // 5. BOOKMARKS TAB
  // =========================================================================
  renderBookmarksTab(container) {
    container.createEl("h3", { text: "Links & Bookmark Resources" });
    const linksContainer = container.createDiv({ cls: "os-settings-links" });
    this.renderLinksSettings(linksContainer);
  }
  renderLinksSettings(container) {
    container.empty();
    const desc = container.createEl("div", { cls: "setting-item-description" });
    desc.style.marginBottom = "14px";
    desc.style.lineHeight = "1.5";
    const p1 = desc.createEl("p", {
      text: "Drag and drop bookmarks using the grip handle to reorder them. Enter any web URL (https://...) or vault note (type [[ to auto-suggest notes)."
    });
    p1.style.marginBottom = "6px";
    const p2 = desc.createEl("p");
    p2.createSpan({
      text: "Supported Icons: Supports all popular brands (e.g. "
    });
    const brandExamples = ["youtube", "instagram", "facebook", "twitter", "x", "github", "discord", "spotify", "reddit", "linkedin", "tiktok", "whatsapp"];
    brandExamples.forEach((ex, i) => {
      p2.createEl("code", { text: ex });
      if (i < brandExamples.length - 1) p2.createSpan({ text: ", " });
    });
    p2.createSpan({
      text: "), all 1,400+ Lucide icons (browse at "
    });
    const lucideLink = p2.createEl("a", { text: "lucide.dev/icons", href: "https://lucide.dev/icons" });
    lucideLink.setAttr("target", "_blank");
    p2.createSpan({
      text: "), raw SVG markup (<svg ...>...</svg>), and emojis. Entering any valid icon name or SVG code will immediately render a live preview."
    });
    const listContainer = container.createDiv({ cls: "os-settings-bookmarks-list" });
    const links = this.plugin.settings.links || [];
    let draggedIdx = null;
    links.forEach((link, idx) => {
      const row = listContainer.createDiv({ cls: "os-settings-bookmark-row" });
      row.setAttribute("data-idx", String(idx));
      const dragHandle = row.createDiv({ cls: "os-settings-drag-handle" });
      (0, import_obsidian4.setIcon)(dragHandle, "grip-vertical");
      dragHandle.setAttribute("title", "Drag to reorder");
      row.setAttribute("draggable", "true");
      row.addEventListener("dragstart", (e) => {
        const target = e.target;
        if (target.closest("input, button")) {
          e.preventDefault();
          return;
        }
        draggedIdx = idx;
        row.addClass("is-dragging");
        if (e.dataTransfer) {
          e.dataTransfer.setData("text/plain", String(idx));
          e.dataTransfer.effectAllowed = "move";
        }
      });
      row.addEventListener("dragend", () => {
        row.removeClass("is-dragging");
        listContainer.querySelectorAll(".os-drop-indicator-top, .os-drop-indicator-bottom").forEach((el) => {
          el.removeClass("os-drop-indicator-top");
          el.removeClass("os-drop-indicator-bottom");
        });
      });
      row.addEventListener("dragover", (e) => {
        e.preventDefault();
        if (draggedIdx === null || draggedIdx === idx) return;
        if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
        const rect = row.getBoundingClientRect();
        const midY = rect.top + rect.height / 2;
        if (e.clientY < midY) {
          row.addClass("os-drop-indicator-top");
          row.removeClass("os-drop-indicator-bottom");
        } else {
          row.addClass("os-drop-indicator-bottom");
          row.removeClass("os-drop-indicator-top");
        }
      });
      row.addEventListener("dragleave", () => {
        row.removeClass("os-drop-indicator-top");
        row.removeClass("os-drop-indicator-bottom");
      });
      row.addEventListener("drop", async (e) => {
        e.preventDefault();
        row.removeClass("os-drop-indicator-top");
        row.removeClass("os-drop-indicator-bottom");
        if (draggedIdx === null || draggedIdx === idx) return;
        const rect = row.getBoundingClientRect();
        const midY = rect.top + rect.height / 2;
        const insertAfter = e.clientY >= midY;
        const movedItem = links.splice(draggedIdx, 1)[0];
        let targetIdx = idx;
        if (draggedIdx < idx && !insertAfter) {
          targetIdx = idx - 1;
        } else if (draggedIdx > idx && insertAfter) {
          targetIdx = idx + 1;
        }
        links.splice(targetIdx, 0, movedItem);
        this.plugin.settings.links = links;
        await this.plugin.saveSettings();
        this.renderLinksSettings(container);
      });
      const iconPreview = row.createSpan({ cls: "os-settings-link-icon-preview" });
      const updateIconPreview = (name) => {
        this.plugin.iconService.renderAnyIcon(iconPreview, name, "external-link");
      };
      updateIconPreview(link.icon || "external-link");
      const titleInput = row.createEl("input", {
        type: "text",
        placeholder: "Title",
        cls: "os-settings-bookmark-input os-bookmark-title-input"
      });
      titleInput.value = link.title || "";
      titleInput.addEventListener("change", async () => {
        link.title = titleInput.value.trim();
        await this.plugin.saveSettings();
      });
      const urlInput = row.createEl("input", {
        type: "text",
        placeholder: "https://... or [[Note]]",
        cls: "os-settings-bookmark-input os-bookmark-url-input"
      });
      urlInput.value = link.url || "";
      new WikiLinkSuggest(this.app, urlInput);
      urlInput.addEventListener("change", async () => {
        link.url = urlInput.value.trim();
        await this.plugin.saveSettings();
      });
      const iconInput = row.createEl("input", {
        type: "text",
        placeholder: "Icon (e.g. youtube, globe, bot)",
        cls: "os-settings-bookmark-input os-bookmark-icon-input"
      });
      iconInput.value = link.icon || "";
      iconInput.addEventListener("input", () => {
        updateIconPreview(iconInput.value.trim());
      });
      iconInput.addEventListener("change", async () => {
        link.icon = iconInput.value.trim();
        updateIconPreview(link.icon);
        await this.plugin.saveSettings();
      });
      const delBtn = row.createEl("button", {
        cls: "os-folder-override-reset-btn os-bookmark-del-btn",
        title: "Delete Bookmark"
      });
      (0, import_obsidian4.setIcon)(delBtn, "trash");
      delBtn.addEventListener("click", async () => {
        this.plugin.settings.links.splice(idx, 1);
        await this.plugin.saveSettings();
        this.renderLinksSettings(container);
      });
    });
    const addBtnWrap = container.createDiv({ cls: "os-settings-add-bookmark-wrap" });
    const addBtn = addBtnWrap.createEl("button", {
      text: "+ Add Bookmark Link",
      cls: "mod-cta"
    });
    addBtn.addEventListener("click", async () => {
      this.plugin.settings.links.push({
        id: Date.now().toString(),
        title: "New Link",
        url: "https://",
        icon: "external-link"
      });
      await this.plugin.saveSettings();
      this.renderLinksSettings(container);
    });
  }
};

// src/view/osDashboardView.ts
var import_obsidian18 = require("obsidian");

// src/view/renderer.ts
var import_obsidian17 = require("obsidian");

// src/services/streakService.ts
var import_obsidian5 = require("obsidian");
var StreakService = class {
  constructor(app) {
    this.isPopulating = false;
    this.app = app;
  }
  /**
   * Reads and parses habits from the specified markdown file (e.g. Habits.md).
   * If the file does not exist, it creates it with any initial habits from settings.
   */
  async loadHabits(filePath, fallbackHabits = []) {
    const file = this.app.vault.getAbstractFileByPath(filePath);
    if (!file || !(file instanceof import_obsidian5.TFile)) {
      if (fallbackHabits && fallbackHabits.length > 0) {
        await this.saveHabits(filePath, fallbackHabits, 4);
        return fallbackHabits;
      }
      return [];
    }
    try {
      const content = await this.app.vault.read(file);
      return this.parseHabitsMarkdown(content);
    } catch (err) {
      console.error("OS Dashboard: Failed to load habits file", err);
      return fallbackHabits;
    }
  }
  /**
   * Serializes habits and writes them to the specified markdown file.
   */
  async saveHabits(filePath, habits, maxFreezesPerMonth = 4) {
    await this.ensureFolderForFile(filePath);
    const content = this.serializeHabitsMarkdown(habits, maxFreezesPerMonth);
    const file = this.app.vault.getAbstractFileByPath(filePath);
    if (file instanceof import_obsidian5.TFile) {
      await this.app.vault.modify(file, content);
    } else {
      await this.app.vault.create(filePath, content);
    }
  }
  /**
   * Parses the markdown content into StreakItem objects.
   * Expects:
   * ## Habit Name
   * > [!note] Habit Stats
   * > - **Icon**: book-open
   * > - **Current Streak**: 12
   * > ...
   */
  parseHabitsMarkdown(content) {
    const habits = [];
    const lines = content.split("\n");
    let currentHabit = null;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith("## ")) {
        if (currentHabit && currentHabit.name) {
          habits.push(this.finalizeHabitItem(currentHabit));
        }
        const name = line.substring(3).trim();
        currentHabit = {
          id: `habit-${name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
          name,
          icon: "flame",
          frequency: "daily",
          currentStreak: 0,
          bestStreak: 0,
          history: [],
          freezeHistory: [],
          autoPopulate: true
        };
        continue;
      }
      if (!currentHabit) continue;
      const propMatch = line.match(/^>\s*-\s*\*\*(.*?)\*\*:\s*(.*)$/);
      if (propMatch) {
        const key = propMatch[1].trim().toLowerCase();
        const val = propMatch[2].trim();
        switch (key) {
          case "description":
            currentHabit.description = val ? val.substring(0, 150) : void 0;
            break;
          case "icon":
            currentHabit.icon = val || "flame";
            break;
          case "frequency": {
            const low = val.toLowerCase();
            currentHabit.frequency = low === "weekly" || low === "monthly" || low === "yearly" ? low : "daily";
            break;
          }
          case "schedule type": {
            const low = val.toLowerCase();
            currentHabit.scheduleType = low === "fixed" ? "fixed" : "flexible";
            break;
          }
          case "fixed day of week":
            currentHabit.fixedDayOfWeek = parseInt(val, 10);
            break;
          case "fixed day of month":
            currentHabit.fixedDayOfMonth = parseInt(val, 10);
            break;
          case "fixed date of year":
            currentHabit.fixedDateOfYear = val || void 0;
            break;
          case "current streak":
            currentHabit.currentStreak = parseInt(val, 10) || 0;
            break;
          case "best streak":
            currentHabit.bestStreak = parseInt(val, 10) || 0;
            break;
          case "start date":
            currentHabit.startDate = val || void 0;
            break;
          case "created date":
            currentHabit.createdDate = val || void 0;
            break;
          case "last completed":
            currentHabit.lastCompletedDate = val || void 0;
            break;
          case "last completed cycle":
            currentHabit.lastCompletedCycle = val || void 0;
            break;
          case "frozen until":
            currentHabit.frozenUntil = val || null;
            break;
          case "freeze period": {
            const low = val.toLowerCase();
            currentHabit.freezePeriodType = low === "weekly" || low === "yearly" ? low : "monthly";
            break;
          }
          case "freeze quota":
          case "monthly freeze quota":
            currentHabit.freezeQuota = parseInt(val, 10) || void 0;
            currentHabit.maxFreezesPerMonth = currentHabit.freezeQuota;
            break;
          case "freeze history":
            currentHabit.freezeHistory = val ? val.split(",").map((s) => s.trim()).filter(Boolean) : [];
            break;
          case "completed history":
            currentHabit.history = val ? val.split(",").map((s) => s.trim()).filter(Boolean) : [];
            break;
          case "journal":
            currentHabit.journal = val || void 0;
            if (val) {
              const decoded = this.decodeHabitJournal(val);
              if (decoded.history.length > 0) currentHabit.history = decoded.history;
              if (decoded.freezeHistory.length > 0) currentHabit.freezeHistory = decoded.freezeHistory;
            }
            break;
          case "auto populate":
            currentHabit.autoPopulate = val.toLowerCase() !== "false";
            break;
          case "auto freeze":
            currentHabit.autoFreeze = val.toLowerCase() !== "false";
            break;
        }
      }
    }
    if (currentHabit && currentHabit.name) {
      habits.push(this.finalizeHabitItem(currentHabit));
    }
    return habits;
  }
  finalizeHabitItem(partial) {
    return {
      id: partial.id || `habit-${Date.now()}`,
      name: partial.name || "Untitled Habit",
      description: partial.description ? partial.description.trim().substring(0, 150) : void 0,
      icon: partial.icon || "flame",
      frequency: partial.frequency || "daily",
      scheduleType: partial.scheduleType || "flexible",
      fixedDayOfWeek: partial.fixedDayOfWeek,
      fixedDayOfMonth: partial.fixedDayOfMonth,
      fixedDateOfYear: partial.fixedDateOfYear,
      currentStreak: partial.currentStreak || 0,
      bestStreak: Math.max(partial.bestStreak || 0, partial.currentStreak || 0),
      createdDate: partial.createdDate || moment().format("YYYY-MM-DD HH:mm"),
      startDate: partial.startDate || moment().format("YYYY-MM-DD"),
      lastCompletedDate: partial.lastCompletedDate,
      lastCompletedCycle: partial.lastCompletedCycle,
      history: partial.history || [],
      frozenUntil: partial.frozenUntil || null,
      freezeHistory: partial.freezeHistory || [],
      freezePeriodType: partial.freezePeriodType || "monthly",
      freezeQuota: partial.freezeQuota ?? partial.maxFreezesPerMonth,
      maxFreezesPerMonth: partial.freezeQuota ?? partial.maxFreezesPerMonth,
      autoPopulate: partial.autoPopulate !== false,
      autoFreeze: partial.autoFreeze,
      journal: partial.journal || this.encodeHabitJournal(partial.history || [], partial.freezeHistory || [], partial.startDate)
    };
  }
  /**
   * Serializes StreakItem objects into beautiful Markdown callout format.
   * Strictly avoids emojis.
   */
  serializeHabitsMarkdown(habits, maxFreezesPerMonth = 4) {
    const lines = [];
    for (const habit of habits) {
      const freezePeriod = habit.freezePeriodType || "monthly";
      const habitQuota = this.getEffectiveFreezeQuota(habit, maxFreezesPerMonth);
      const usedInPeriod = this.getFreezesUsedInCurrentPeriod(habit);
      const freezeHistoryStr = (habit.freezeHistory || []).join(", ");
      const historyStr = (habit.history || []).join(", ");
      lines.push(`## ${habit.name}`);
      lines.push("> [!note] Habit Stats");
      if (habit.description && habit.description.trim()) {
        lines.push(`> - **Description**: ${habit.description.trim().substring(0, 150)}`);
      }
      lines.push(`> - **Icon**: ${habit.icon || "flame"}`);
      lines.push(`> - **Frequency**: ${habit.frequency || "daily"}`);
      if (habit.frequency !== "daily") {
        lines.push(`> - **Schedule Type**: ${habit.scheduleType || "flexible"}`);
        if (habit.scheduleType === "fixed") {
          if (habit.frequency === "weekly") {
            lines.push(`> - **Fixed Day Of Week**: ${habit.fixedDayOfWeek ?? 1}`);
          } else if (habit.frequency === "monthly") {
            lines.push(`> - **Fixed Day Of Month**: ${habit.fixedDayOfMonth ?? 1}`);
          } else if (habit.frequency === "yearly") {
            lines.push(`> - **Fixed Date Of Year**: ${habit.fixedDateOfYear || "01-01"}`);
          }
        }
      }
      lines.push(`> - **Current Streak**: ${habit.currentStreak || 0}`);
      lines.push(`> - **Best Streak**: ${habit.bestStreak || 0}`);
      lines.push(`> - **Start Date**: ${habit.startDate || moment().format("YYYY-MM-DD")}`);
      lines.push(`> - **Created Date**: ${habit.createdDate || moment().format("YYYY-MM-DD HH:mm")}`);
      lines.push(`> - **Last Completed**: ${habit.lastCompletedDate || ""}`);
      lines.push(`> - **Last Completed Cycle**: ${habit.lastCompletedCycle || ""}`);
      lines.push(`> - **Frozen Until**: ${habit.frozenUntil || ""}`);
      lines.push(`> - **Freeze Period**: ${freezePeriod}`);
      lines.push(`> - **Freeze Quota**: ${habitQuota}`);
      lines.push(`> - **Freezes Used**: ${usedInPeriod} / ${habitQuota}`);
      lines.push(`> - **Freeze History**: ${freezeHistoryStr}`);
      lines.push(`> - **Completed History**: ${historyStr}`);
      const journalStr = habit.journal || this.encodeHabitJournal(habit.history || [], habit.freezeHistory || [], habit.startDate);
      if (journalStr) {
        lines.push(`> - **Journal**: ${journalStr}`);
      }
      lines.push(`> - **Auto Populate**: ${habit.autoPopulate !== false}`);
      if (habit.autoFreeze !== void 0) {
        lines.push(`> - **Auto Freeze**: ${habit.autoFreeze}`);
      }
      lines.push("");
    }
    return lines.join("\n");
  }
  /**
   * Returns current cycle key:
   * daily: YYYY-MM-DD, weekly: GGGG-[W]WW, monthly: YYYY-MM, yearly: YYYY
   */
  getCurrentCycleKey(habit) {
    const freq = habit.frequency || "daily";
    if (freq === "weekly") {
      return moment().format("GGGG-[W]WW");
    }
    if (freq === "monthly") {
      return moment().format("YYYY-MM");
    }
    if (freq === "yearly") {
      return moment().format("YYYY");
    }
    return moment().format("YYYY-MM-DD");
  }
  /**
   * Returns previous cycle key
   */
  getPreviousCycleKey(habit) {
    const freq = habit.frequency || "daily";
    if (freq === "weekly") {
      return moment().subtract(1, "week").format("GGGG-[W]WW");
    }
    if (freq === "monthly") {
      return moment().subtract(1, "month").format("YYYY-MM");
    }
    if (freq === "yearly") {
      return moment().subtract(1, "year").format("YYYY");
    }
    return moment().subtract(1, "day").format("YYYY-MM-DD");
  }
  /**
   * Returns period key for freeze tracking (e.g. "2026-W42" for weekly, "2026-10" for monthly, "2026" for yearly)
   */
  getFreezePeriodKey(periodType, date) {
    const d = date || moment();
    if (periodType === "weekly") {
      return d.format("GGGG-[W]WW");
    }
    if (periodType === "yearly") {
      return d.format("YYYY");
    }
    return d.format("YYYY-MM");
  }
  /**
   * Returns effective freeze quota for habit
   */
  getEffectiveFreezeQuota(habit, defaultQuota = 4) {
    if (habit.freezeQuota !== void 0 && habit.freezeQuota >= 0) {
      return habit.freezeQuota;
    }
    if (habit.maxFreezesPerMonth !== void 0 && habit.maxFreezesPerMonth >= 0) {
      return habit.maxFreezesPerMonth;
    }
    return defaultQuota || 4;
  }
  /**
   * Returns how many freezes have been consumed in the habit's active freeze period (weekly/monthly/yearly)
   */
  getFreezesUsedInCurrentPeriod(streak) {
    if (!streak.freezeHistory || streak.freezeHistory.length === 0) return 0;
    const period = streak.freezePeriodType || "monthly";
    const currentKey = this.getFreezePeriodKey(period);
    return streak.freezeHistory.filter((d) => {
      const dKey = this.getFreezePeriodKey(period, moment(d, "YYYY-MM-DD"));
      return dKey === currentKey;
    }).length;
  }
  /**
   * Returns how many freezes remain in the habit's active freeze period
   */
  getFreezesRemainingInCurrentPeriod(streak, defaultQuota = 4) {
    const quota = this.getEffectiveFreezeQuota(streak, defaultQuota);
    const used = this.getFreezesUsedInCurrentPeriod(streak);
    return Math.max(0, quota - used);
  }
  // Backwards compatibility helper
  getFreezesUsedThisMonth(streak) {
    return this.getFreezesUsedInCurrentPeriod(streak);
  }
  // Backwards compatibility helper
  getFreezesRemainingThisMonth(streak, maxPerMonth) {
    return this.getFreezesRemainingInCurrentPeriod(streak, maxPerMonth);
  }
  // Backwards compatibility helper
  getEffectiveMaxFreezes(streak, globalMax = 4) {
    return this.getEffectiveFreezeQuota(streak, globalMax);
  }
  /**
   * Checks if habit has already been completed in its current cycle (today, this week, this month, or this year)
   */
  isCompletedInCurrentCycle(habit) {
    const currentKey = this.getCurrentCycleKey(habit);
    if (habit.lastCompletedCycle === currentKey) return true;
    if ((habit.frequency || "daily") === "daily") {
      const todayStr = moment().format("YYYY-MM-DD");
      return habit.lastCompletedDate === todayStr || habit.history && habit.history.includes(todayStr);
    }
    return false;
  }
  /**
   * Returns days remaining in current cycle (including today)
   */
  getDaysRemainingInCycle(habit) {
    const freq = habit.frequency || "daily";
    const today = moment().startOf("day");
    if (freq === "weekly") {
      const endOfWeek = moment().endOf("isoWeek").startOf("day");
      return Math.max(0, endOfWeek.diff(today, "days") + 1);
    }
    if (freq === "monthly") {
      const endOfMonth = moment().endOf("month").startOf("day");
      return Math.max(0, endOfMonth.diff(today, "days") + 1);
    }
    if (freq === "yearly") {
      const endOfYear = moment().endOf("year").startOf("day");
      return Math.max(0, endOfYear.diff(today, "days") + 1);
    }
    return 1;
  }
  /**
   * Checks if a streak is currently frozen
   */
  isFrozen(streak) {
    if (!streak.frozenUntil) return false;
    const today = moment().startOf("day");
    const freezeEnd = moment(streak.frozenUntil, "YYYY-MM-DD").startOf("day");
    return today.isSameOrBefore(freezeEnd);
  }
  /**
   * Returns how many days remain in the freeze window (including today)
   */
  getFreezeDaysLeft(streak) {
    if (!this.isFrozen(streak) || !streak.frozenUntil) return 0;
    const today = moment().startOf("day");
    const freezeEnd = moment(streak.frozenUntil, "YYYY-MM-DD").startOf("day");
    return Math.max(0, freezeEnd.diff(today, "days") + 1);
  }
  /**
   * Freezes a streak for a given number of days while enforcing the period quota
   */
  freezeStreak(streak, days, defaultQuota = 4) {
    if (days <= 0) {
      streak.frozenUntil = null;
      return true;
    }
    const period = streak.freezePeriodType || "monthly";
    const available = this.getFreezesRemainingInCurrentPeriod(streak, defaultQuota);
    if (days > available) {
      new import_obsidian5.Notice(`Cannot freeze for ${days} days. Only ${available} freeze days left this ${period}.`);
      return false;
    }
    if (!streak.freezeHistory) streak.freezeHistory = [];
    for (let i = 0; i < days; i++) {
      const d = moment().add(i, "days").format("YYYY-MM-DD");
      if (!streak.freezeHistory.includes(d)) {
        streak.freezeHistory.push(d);
      }
    }
    const freezeEnd = moment().add(days - 1, "days").format("YYYY-MM-DD");
    streak.frozenUntil = freezeEnd;
    return true;
  }
  /**
   * Unfreezes a streak immediately
   */
  unfreezeStreak(streak) {
    streak.frozenUntil = null;
  }
  /**
   * Checks if habit was completed in a given cycle key (daily date, weekly GGGG-[W]WW, monthly YYYY-MM, yearly YYYY)
   */
  isCycleCompleted(streak, cycleKey) {
    if (streak.lastCompletedCycle === cycleKey) return true;
    if (!streak.history || streak.history.length === 0) return false;
    const freq = streak.frequency || "daily";
    if (freq === "daily") {
      return streak.history.includes(cycleKey) || streak.lastCompletedDate === cycleKey;
    }
    return streak.history.some((d) => {
      if (freq === "weekly") {
        return moment(d, "YYYY-MM-DD").format("GGGG-[W]WW") === cycleKey;
      }
      if (freq === "monthly") {
        return moment(d, "YYYY-MM-DD").format("YYYY-MM") === cycleKey;
      }
      if (freq === "yearly") {
        return moment(d, "YYYY-MM-DD").format("YYYY") === cycleKey;
      }
      return false;
    });
  }
  /**
   * Checks if habit was frozen in a given cycle key
   */
  isCycleFrozen(streak, cycleKey) {
    if (!streak.freezeHistory || streak.freezeHistory.length === 0) return false;
    const freq = streak.frequency || "daily";
    if (freq === "daily") {
      return streak.freezeHistory.includes(cycleKey);
    }
    return streak.freezeHistory.some((d) => {
      if (freq === "weekly") {
        return moment(d, "YYYY-MM-DD").format("GGGG-[W]WW") === cycleKey;
      }
      if (freq === "monthly") {
        return moment(d, "YYYY-MM-DD").format("YYYY-MM") === cycleKey;
      }
      if (freq === "yearly") {
        return moment(d, "YYYY-MM-DD").format("YYYY") === cycleKey;
      }
      return false;
    });
  }
  /**
   * Automatically consumes an available freeze if the user missed completing an active habit.
   * If globalAutoFreeze is enabled, protects any habit where autoFreeze !== false.
   * If globalAutoFreeze is disabled, protects habits where autoFreeze === true.
   */
  checkAndApplyAutoFreeze(habits, defaultQuota = 4, globalAutoFreeze = true) {
    let anyApplied = false;
    let totalCount = 0;
    const messages = [];
    const todayMoment = moment().startOf("day");
    const yesterdayMoment = moment().subtract(1, "day").startOf("day");
    for (const streak of habits) {
      if (streak.autoPopulate === false) continue;
      const habitEligible = globalAutoFreeze ? streak.autoFreeze !== false : streak.autoFreeze === true;
      if (!habitEligible) continue;
      let available = this.getFreezesRemainingInCurrentPeriod(streak, defaultQuota);
      if (available <= 0) continue;
      if (!streak.freezeHistory) streak.freezeHistory = [];
      if (!streak.history) streak.history = [];
      if (streak.startDate) {
        const startMoment = moment(streak.startDate, "YYYY-MM-DD").startOf("day");
        if (todayMoment.isBefore(startMoment)) continue;
      }
      const hasHistory = streak.history.length > 0;
      const hadStreak = (streak.currentStreak || 0) > 0;
      if (!hasHistory && !hadStreak) continue;
      const freq = streak.frequency || "daily";
      if (freq === "daily") {
        const allRecorded = [...streak.history, ...streak.freezeHistory].sort();
        if (allRecorded.length === 0) continue;
        const latestRecordedStr = allRecorded[allRecorded.length - 1];
        const latestMoment = moment(latestRecordedStr, "YYYY-MM-DD").startOf("day");
        if (latestMoment.isSameOrAfter(yesterdayMoment)) continue;
        const missedDays = [];
        const check = latestMoment.clone().add(1, "day");
        while (check.isSameOrBefore(yesterdayMoment)) {
          const dStr = check.format("YYYY-MM-DD");
          if (!streak.history.includes(dStr) && !streak.freezeHistory.includes(dStr)) {
            missedDays.push(dStr);
          }
          check.add(1, "day");
        }
        if (missedDays.length === 0) continue;
        if (missedDays.length <= available) {
          for (const dStr of missedDays) {
            streak.freezeHistory.push(dStr);
            available--;
            totalCount++;
            anyApplied = true;
          }
          streak.frozenUntil = missedDays[missedDays.length - 1];
          this.recalculateStreak(streak);
          messages.push(`Auto-froze "${streak.name}" for ${missedDays.length} missed day${missedDays.length > 1 ? "s" : ""} (${missedDays.join(", ")})`);
        }
      } else {
        const prevCycle = this.getPreviousCycleKey(streak);
        const wasCompleted = this.isCycleCompleted(streak, prevCycle);
        const wasFrozen = this.isCycleFrozen(streak, prevCycle);
        if (!wasCompleted && !wasFrozen && available >= 1) {
          let freezeDateStr = moment().subtract(1, "day").format("YYYY-MM-DD");
          if (freq === "weekly") {
            freezeDateStr = moment().subtract(1, "week").endOf("isoWeek").format("YYYY-MM-DD");
          } else if (freq === "monthly") {
            freezeDateStr = moment().subtract(1, "month").endOf("month").format("YYYY-MM-DD");
          } else if (freq === "yearly") {
            freezeDateStr = moment().subtract(1, "year").endOf("year").format("YYYY-MM-DD");
          }
          if (!streak.freezeHistory.includes(freezeDateStr)) {
            streak.freezeHistory.push(freezeDateStr);
            streak.frozenUntil = freezeDateStr;
            available--;
            totalCount++;
            anyApplied = true;
            streak.journal = this.encodeHabitJournal(streak.history, streak.freezeHistory, streak.startDate);
            messages.push(`Auto-froze "${streak.name}" for missed ${freq} cycle (${prevCycle})`);
          }
        }
      }
    }
    return { applied: anyApplied, count: totalCount, messages };
  }
  /**
   * Checks if the streak was completed today
   */
  isCompletedToday(streak) {
    return this.isCompletedInCurrentCycle(streak);
  }
  /**
   * Auto-populates active, non-frozen habits into today's plan in Daily Tasks.md:
   * - Daily habits: every day.
   * - Fixed weekly/monthly/yearly habits: only on their designated target day.
   * - Flexible habits: never auto-populate (user injects via "Add to Today's Plan").
   */
  async autoPopulateTasks(planFilePath, habits, taskService) {
    if (!habits || habits.length === 0) return false;
    if (this.isPopulating) return false;
    this.isPopulating = true;
    try {
      const todayStr = moment().format("YYYY-MM-DD");
      const todayMoment = moment().startOf("day");
      const todayTasks = await taskService.getTodayTasks(planFilePath);
      let anyAdded = false;
      for (const streak of habits) {
        if (streak.autoPopulate === false) continue;
        if (this.isFrozen(streak)) continue;
        if (streak.startDate) {
          const startMoment = moment(streak.startDate, "YYYY-MM-DD").startOf("day");
          if (todayMoment.isBefore(startMoment)) {
            continue;
          }
        }
        const freq = streak.frequency || "daily";
        if (freq !== "daily" && streak.scheduleType !== "fixed") {
          continue;
        }
        if (freq !== "daily" && streak.scheduleType === "fixed") {
          if (freq === "weekly") {
            const targetDay = streak.fixedDayOfWeek ?? 1;
            if (moment().day() !== targetDay) {
              continue;
            }
          } else if (freq === "monthly") {
            const targetDay = streak.fixedDayOfMonth ?? 1;
            const daysInMonth = moment().daysInMonth();
            const effectiveTarget = Math.min(targetDay, daysInMonth);
            if (moment().date() !== effectiveTarget) {
              continue;
            }
          } else if (freq === "yearly") {
            const targetDate = streak.fixedDateOfYear || "01-01";
            if (moment().format("MM-DD") !== targetDate) {
              continue;
            }
          }
        }
        const cleanStreakName = streak.name.toLowerCase().trim();
        const alreadyExists = todayTasks.some((t) => {
          const text = t.text.toLowerCase().trim();
          return text === cleanStreakName || text.includes(cleanStreakName);
        });
        if (!alreadyExists) {
          const added = await taskService.addTask(planFilePath, streak.name, todayStr, false);
          if (added) {
            todayTasks.push({
              id: `today-auto-${streak.id}`,
              text: streak.name,
              completed: false,
              lineNumber: -1,
              rawLine: `- [ ] ${streak.name}`,
              sourceFile: planFilePath,
              dateHeading: todayStr
            });
            anyAdded = true;
          }
        }
      }
      return anyAdded;
    } finally {
      this.isPopulating = false;
    }
  }
  /**
   * Smartly injects a habit into today's tasks list with deduplication and overdue roll-forward.
   */
  async addHabitToToday(planFilePath, habit, taskService) {
    if (this.isCompletedInCurrentCycle(habit)) {
      const cycleName = habit.frequency === "weekly" ? "this week" : habit.frequency === "monthly" ? "this month" : habit.frequency === "yearly" ? "this year" : "today";
      return { success: false, message: `"${habit.name}" is already completed for ${cycleName}!` };
    }
    const todayStr = moment().format("YYYY-MM-DD");
    const cleanName = habit.name.toLowerCase().trim();
    const todayTasks = await taskService.getTodayTasks(planFilePath);
    const alreadyInToday = todayTasks.some((t) => {
      const text = t.text.toLowerCase().trim();
      return text === cleanName || text.includes(cleanName);
    });
    if (alreadyInToday) {
      return { success: false, message: `"${habit.name}" is already in today's tasks.` };
    }
    const overdueTasks = await taskService.getOverdueTasks(planFilePath);
    const overdueMatch = overdueTasks.find((t) => {
      const text = t.text.toLowerCase().trim();
      return text === cleanName || text.includes(cleanName);
    });
    if (overdueMatch) {
      await taskService.deleteTask(overdueMatch.sourceFile, overdueMatch.lineNumber);
      await taskService.addTask(planFilePath, habit.name, todayStr, false);
      return { success: true, message: `Moved overdue "${habit.name}" to today's tasks.` };
    }
    await taskService.addTask(planFilePath, habit.name, todayStr, false);
    return { success: true, message: `Added "${habit.name}" to today's tasks.` };
  }
  /**
   * Syncs streak completion status when a task is toggled in Today's plan.
   * Supports Daily, Weekly, and Monthly cycle keys with idempotent completion.
   * If a streak breaks, the habit is NEVER removed; currentStreak simply resets or starts fresh at 1.
   */
  handleTaskToggle(taskText, completed, habits) {
    if (!habits || habits.length === 0) return false;
    const cleanTask = taskText.toLowerCase().trim();
    const todayStr = moment().format("YYYY-MM-DD");
    let changed = false;
    for (const streak of habits) {
      const cleanStreak = streak.name.toLowerCase().trim();
      if (cleanTask === cleanStreak || cleanTask.includes(cleanStreak)) {
        if (!streak.history) streak.history = [];
        const freq = streak.frequency || "daily";
        const currentCycle = this.getCurrentCycleKey(streak);
        const prevCycle = this.getPreviousCycleKey(streak);
        if (completed) {
          if (streak.lastCompletedCycle === currentCycle && freq !== "daily") {
            continue;
          }
          if (streak.lastCompletedDate === todayStr && freq === "daily" && streak.history.includes(todayStr)) {
            continue;
          }
          if (!streak.history.includes(todayStr)) {
            streak.history.push(todayStr);
          }
          streak.lastCompletedDate = todayStr;
          streak.lastCompletedCycle = currentCycle;
          if (freq === "daily") {
            this.recalculateStreak(streak);
          } else {
            const isPrevCompleted = this.isCycleCompleted(streak, prevCycle) || streak.lastCompletedCycle === prevCycle;
            const isPrevFrozen = this.isCycleFrozen(streak, prevCycle);
            const wasContinuation = isPrevCompleted || this.isFrozen(streak) || isPrevFrozen;
            if (wasContinuation) {
              streak.currentStreak = (streak.currentStreak || 0) + 1;
            } else {
              streak.currentStreak = 1;
            }
            if ((streak.currentStreak || 0) > (streak.bestStreak || 0)) {
              streak.bestStreak = streak.currentStreak;
            }
          }
          changed = true;
        } else {
          if (streak.lastCompletedCycle === currentCycle || streak.lastCompletedDate === todayStr || streak.history.includes(todayStr)) {
            streak.history = streak.history.filter((d) => d !== todayStr);
            if (freq === "daily") {
              this.recalculateStreak(streak);
              streak.lastCompletedDate = streak.history[streak.history.length - 1] || void 0;
              streak.lastCompletedCycle = streak.lastCompletedDate;
            } else {
              streak.currentStreak = Math.max(0, (streak.currentStreak || 1) - 1);
              const prevDate = streak.history[streak.history.length - 1];
              streak.lastCompletedDate = prevDate || void 0;
              if (prevDate) {
                if (freq === "weekly") {
                  streak.lastCompletedCycle = moment(prevDate, "YYYY-MM-DD").format("GGGG-[W]WW");
                } else if (freq === "monthly") {
                  streak.lastCompletedCycle = moment(prevDate, "YYYY-MM-DD").format("YYYY-MM");
                } else if (freq === "yearly") {
                  streak.lastCompletedCycle = moment(prevDate, "YYYY-MM-DD").format("YYYY");
                } else {
                  streak.lastCompletedCycle = prevDate;
                }
              } else {
                streak.lastCompletedCycle = void 0;
              }
            }
            changed = true;
          }
        }
        if (changed) {
          streak.journal = this.encodeHabitJournal(streak.history, streak.freezeHistory, streak.startDate);
        }
      }
    }
    return changed;
  }
  /**
   * Archives a habit: moves its section from habitsFile into archiveHabitsFile
   */
  async archiveHabit(habitsFile, archiveFile, habitId, settings) {
    const habits = await this.loadHabits(habitsFile, settings.streaks || []);
    const habitToArchive = habits.find((h) => h.id === habitId);
    if (!habitToArchive) return false;
    const remainingHabits = habits.filter((h) => h.id !== habitId);
    await this.saveHabits(habitsFile, remainingHabits, settings.maxFreezesPerMonth || 4);
    settings.streaks = remainingHabits;
    const archiveHabits = await this.loadHabits(archiveFile, []);
    archiveHabits.push(habitToArchive);
    await this.saveHabits(archiveFile, archiveHabits, settings.maxFreezesPerMonth || 4);
    new import_obsidian5.Notice(`Archived "${habitToArchive.name}" to ${archiveFile}`);
    return true;
  }
  /**
   * Permanently deletes a habit from habitsFile
   */
  async deleteHabit(habitsFile, habitId, settings) {
    const habits = await this.loadHabits(habitsFile, settings.streaks || []);
    const habit = habits.find((h) => h.id === habitId);
    if (!habit) return false;
    const remaining = habits.filter((h) => h.id !== habitId);
    await this.saveHabits(habitsFile, remaining, settings.maxFreezesPerMonth || 4);
    settings.streaks = remaining;
    new import_obsidian5.Notice(`Deleted habit "${habit.name}"`);
    return true;
  }
  /**
   * Updates habit name and optional description in habitsFile
   */
  async updateHabitDetails(habitsFile, habitId, newName, newDescription, settings) {
    const cleanNewName = newName.trim();
    if (!cleanNewName) return false;
    const habits = await this.loadHabits(habitsFile, settings.streaks || []);
    const habit = habits.find((h) => h.id === habitId);
    if (!habit) return false;
    habit.name = cleanNewName;
    habit.description = newDescription ? newDescription.trim().substring(0, 150) : void 0;
    await this.saveHabits(habitsFile, habits, settings.maxFreezesPerMonth || 4);
    settings.streaks = habits;
    new import_obsidian5.Notice(`Updated habit "${cleanNewName}"`);
    return true;
  }
  /**
   * Renames a habit in habitsFile
   */
  async renameHabit(habitsFile, habitId, newName, settings) {
    return this.updateHabitDetails(habitsFile, habitId, newName, void 0, settings);
  }
  /**
   * Encodes a habit's completion and freeze dates into a compact "chess notation" journal:
   * e.g. "C:2026-10-01~2026-10-05, F:2026-10-06, X:2026-10-07, C:2026-10-08~2026-10-20"
   * C = Completed, F = Frozen, X = Missed/Break
   */
  encodeHabitJournal(history, freezeHistory = [], startDate) {
    const historySet = new Set(history || []);
    const freezeSet = new Set(freezeHistory || []);
    if (historySet.size === 0 && freezeSet.size === 0) {
      return "";
    }
    const allDates = [...historySet, ...freezeSet].sort();
    if (allDates.length === 0) return "";
    const earliestRecorded = allDates[0];
    const originDate = startDate && startDate < earliestRecorded ? startDate : earliestRecorded;
    const latestDate = moment().format("YYYY-MM-DD");
    const endDate = allDates[allDates.length - 1] > latestDate ? allDates[allDates.length - 1] : latestDate;
    const events = [];
    const curr = moment(originDate, "YYYY-MM-DD");
    const end = moment(endDate, "YYYY-MM-DD");
    while (curr.isSameOrBefore(end)) {
      const dStr = curr.format("YYYY-MM-DD");
      if (historySet.has(dStr)) {
        events.push({ date: dStr, type: "C" });
      } else if (freezeSet.has(dStr)) {
        events.push({ date: dStr, type: "F" });
      } else {
        events.push({ date: dStr, type: "X" });
      }
      curr.add(1, "day");
    }
    if (events.length === 0) return "";
    const chunks = [];
    let rangeStart = events[0];
    let rangeEnd = events[0];
    for (let i = 1; i < events.length; i++) {
      const ev = events[i];
      if (ev.type === rangeStart.type) {
        rangeEnd = ev;
      } else {
        chunks.push(
          rangeStart.date === rangeEnd.date ? `${rangeStart.type}:${rangeStart.date}` : `${rangeStart.type}:${rangeStart.date}~${rangeEnd.date}`
        );
        rangeStart = ev;
        rangeEnd = ev;
      }
    }
    chunks.push(
      rangeStart.date === rangeEnd.date ? `${rangeStart.type}:${rangeStart.date}` : `${rangeStart.type}:${rangeStart.date}~${rangeEnd.date}`
    );
    return chunks.join(", ");
  }
  /**
   * Decodes a "chess notation" journal back into exact completion and freeze dates.
   */
  decodeHabitJournal(journalStr) {
    const history = [];
    const freezeHistory = [];
    if (!journalStr || !journalStr.trim()) {
      return { history, freezeHistory };
    }
    const tokens = journalStr.split(",").map((t) => t.trim()).filter(Boolean);
    for (const token of tokens) {
      const match = token.match(/^([CFX]):(\d{4}-\d{2}-\d{2})(?:~(\d{4}-\d{2}-\d{2}))?$/i);
      if (!match) continue;
      const type = match[1].toUpperCase();
      const startStr = match[2];
      const endStr = match[3] || startStr;
      const curr = moment(startStr, "YYYY-MM-DD");
      const end = moment(endStr, "YYYY-MM-DD");
      while (curr.isSameOrBefore(end)) {
        const dStr = curr.format("YYYY-MM-DD");
        if (type === "C") {
          history.push(dStr);
        } else if (type === "F") {
          freezeHistory.push(dStr);
        }
        curr.add(1, "day");
      }
    }
    return {
      history: Array.from(new Set(history)).sort(),
      freezeHistory: Array.from(new Set(freezeHistory)).sort()
    };
  }
  /**
   * Recalculates currentStreak and bestStreak from history and freezeHistory
   */
  recalculateStreak(streak) {
    const completedSet = new Set(streak.history || []);
    const freezeSet = new Set(streak.freezeHistory || []);
    if (completedSet.size === 0) {
      streak.currentStreak = 0;
      streak.lastCompletedDate = void 0;
      streak.journal = this.encodeHabitJournal([], streak.freezeHistory || [], streak.startDate);
      return;
    }
    const sortedCompleted = Array.from(completedSet).sort();
    streak.lastCompletedDate = sortedCompleted[sortedCompleted.length - 1];
    const todayStr = moment().format("YYYY-MM-DD");
    const yesterdayStr = moment().subtract(1, "day").format("YYYY-MM-DD");
    let current = 0;
    let checkDate = completedSet.has(todayStr) ? moment() : freezeSet.has(todayStr) || freezeSet.has(yesterdayStr) || completedSet.has(yesterdayStr) ? moment().subtract(1, "day") : null;
    if (checkDate) {
      while (true) {
        const dStr = checkDate.format("YYYY-MM-DD");
        if (completedSet.has(dStr)) {
          current++;
          checkDate.subtract(1, "day");
        } else if (freezeSet.has(dStr)) {
          checkDate.subtract(1, "day");
        } else {
          break;
        }
      }
    }
    streak.currentStreak = current;
    let best = 0;
    let run = 0;
    if (sortedCompleted.length > 0) {
      const earliest = sortedCompleted[0];
      const latest = sortedCompleted[sortedCompleted.length - 1];
      const iter = moment(earliest, "YYYY-MM-DD");
      const endIter = moment(latest, "YYYY-MM-DD");
      while (iter.isSameOrBefore(endIter)) {
        const dStr = iter.format("YYYY-MM-DD");
        if (completedSet.has(dStr)) {
          run++;
          if (run > best) best = run;
        } else if (!freezeSet.has(dStr)) {
          run = 0;
        }
        iter.add(1, "day");
      }
    }
    streak.bestStreak = Math.max(best, streak.currentStreak, streak.bestStreak || 0);
    streak.journal = this.encodeHabitJournal(streak.history, streak.freezeHistory, streak.startDate);
  }
  async ensureFolderForFile(filePath) {
    const lastSlash = filePath.lastIndexOf("/");
    if (lastSlash === -1) return;
    const folderPath = filePath.substring(0, lastSlash);
    const existing = this.app.vault.getAbstractFileByPath(folderPath);
    if (!existing) {
      try {
        await this.app.vault.createFolder(folderPath);
      } catch {
      }
    }
  }
};

// src/services/calendarService.ts
var import_obsidian6 = require("obsidian");
var CalendarService = class {
  constructor(app) {
    this.notifiedEventIds = /* @__PURE__ */ new Set();
    // Vibrant Material Google Calendar color palette
    this.palette = [
      "#3b82f6",
      // Blue (Default / Focus)
      "#10b981",
      // Sage / Emerald (Personal / Health)
      "#8b5cf6",
      // Grape / Purple (Projects / Deep Work)
      "#f59e0b",
      // Amber / Banana (Social / Leisure)
      "#ef4444",
      // Flamingo / Red (Deadlines / Urgent)
      "#06b6d4",
      // Peacock / Cyan (Meetings)
      "#ec4899",
      // Pink (Events / Birthdays)
      "#6366f1"
      // Indigo
    ];
    this.app = app;
  }
  /**
   * Resolves the Google Calendar iCal URL from Obsidian Keychain (SecretStorage) or plain settings
   */
  getCalendarUrl(settings) {
    if (settings.googleCalendarUseKeychain || settings.googleCalendarSecretId) {
      const secretStorage = this.app.secretStorage;
      if (secretStorage && typeof secretStorage.getSecret === "function" && settings.googleCalendarSecretId) {
        const secret = secretStorage.getSecret(settings.googleCalendarSecretId);
        if (secret && typeof secret === "string" && secret.trim()) {
          return secret.trim();
        }
      }
    }
    return settings.googleCalendarUrl ? settings.googleCalendarUrl.trim() : "";
  }
  /**
   * Checks whether Obsidian native SecretStorage (Keychain) is supported by this Obsidian version
   */
  isKeychainAvailable() {
    const secretStorage = this.app.secretStorage;
    return Boolean(secretStorage && typeof secretStorage.getSecret === "function");
  }
  /**
   * Fetches and parses an iCal (.ics) feed URL (e.g. Google Calendar secret address)
   */
  async fetchEvents(icsUrl) {
    const cleanUrl = icsUrl.trim();
    if (!cleanUrl) return [];
    try {
      const response = await (0, import_obsidian6.requestUrl)({
        url: cleanUrl,
        headers: {
          "Accept": "text/calendar, text/plain, */*"
        }
      });
      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Calendar server responded with HTTP status ${response.status}`);
      }
      return this.parseIcs(response.text);
    } catch (err) {
      console.error("[OS Dashboard] Error fetching Google Calendar events:", err);
      throw err;
    }
  }
  /**
   * Parses standard RFC 5545 iCalendar content into CalendarEventItem array
   */
  parseIcs(icsText) {
    const events = [];
    if (!icsText) return events;
    const unfolded = icsText.replace(/\r\n[ \t]/g, "").replace(/\n[ \t]/g, "");
    const lines = unfolded.split(/\r?\n/);
    let insideEvent = false;
    let currentEvent = {};
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      if (trimmed === "BEGIN:VEVENT") {
        insideEvent = true;
        currentEvent = {};
        continue;
      }
      if (trimmed === "END:VEVENT") {
        insideEvent = false;
        const parsed = this.processEventData(currentEvent);
        if (parsed) {
          if (currentEvent["RRULE"]) {
            const recurringInstances = this.expandRecurrence(parsed, currentEvent["RRULE"]);
            events.push(...recurringInstances);
          } else {
            events.push(parsed);
          }
        }
        currentEvent = {};
        continue;
      }
      if (insideEvent) {
        const colonIdx = trimmed.indexOf(":");
        if (colonIdx > 0) {
          const keyPart = trimmed.substring(0, colonIdx);
          const valPart = trimmed.substring(colonIdx + 1);
          const semicolonIdx = keyPart.indexOf(";");
          const propName = semicolonIdx > 0 ? keyPart.substring(0, semicolonIdx).toUpperCase() : keyPart.toUpperCase();
          const propParams = semicolonIdx > 0 ? keyPart.substring(semicolonIdx + 1) : "";
          currentEvent[propName] = valPart;
          if (propParams) {
            currentEvent[`${propName}_PARAMS`] = propParams;
          }
        }
      }
    }
    return events;
  }
  /**
   * Converts raw VEVENT properties into a CalendarEventItem
   */
  processEventData(data) {
    const summary = this.unescapeIcsText(data["SUMMARY"] || "Untitled Event");
    const rawStart = data["DTSTART"];
    if (!rawStart) return null;
    const startInfo = this.parseDateString(rawStart, data["DTSTART_PARAMS"] || "");
    if (!startInfo) return null;
    let endInfo = data["DTEND"] ? this.parseDateString(data["DTEND"], data["DTEND_PARAMS"] || "") : null;
    if (!endInfo) {
      endInfo = { ...startInfo };
    }
    const uid = data["UID"] || `${startInfo.date}-${summary}-${Math.random().toString(36).substring(2, 7)}`;
    const location = data["LOCATION"] ? this.unescapeIcsText(data["LOCATION"]) : void 0;
    const description = data["DESCRIPTION"] ? this.unescapeIcsText(data["DESCRIPTION"]) : void 0;
    const color = this.pickColor(summary);
    return {
      id: uid,
      title: summary,
      startDate: startInfo.date,
      startTime: startInfo.time,
      endDate: endInfo.date,
      endTime: endInfo.time,
      isAllDay: startInfo.isAllDay,
      location,
      description,
      color
    };
  }
  /**
   * Expands basic daily / weekly / monthly recurrences into events within a 120-day window
   */
  expandRecurrence(baseEvent, rruleStr) {
    const list = [baseEvent];
    const rules = this.parseRrule(rruleStr);
    const freq = rules["FREQ"];
    if (!freq) return list;
    const startMom = moment(baseEvent.startDate);
    const windowStart = moment().subtract(30, "days");
    const windowEnd = moment().add(90, "days");
    let count = 0;
    const maxCount = rules["COUNT"] ? parseInt(rules["COUNT"], 10) : 50;
    const until = rules["UNTIL"] ? moment(rules["UNTIL"].substring(0, 8), "YYYYMMDD") : null;
    let curMom = startMom.clone();
    let interval = rules["INTERVAL"] ? parseInt(rules["INTERVAL"], 10) : 1;
    if (isNaN(interval) || interval < 1) interval = 1;
    for (let step = 1; step <= 100; step++) {
      if (freq === "DAILY") {
        curMom.add(interval, "days");
      } else if (freq === "WEEKLY") {
        curMom.add(interval, "weeks");
      } else if (freq === "MONTHLY") {
        curMom.add(interval, "months");
      } else {
        break;
      }
      if (until && curMom.isAfter(until)) break;
      if (curMom.isAfter(windowEnd)) break;
      count++;
      if (count >= maxCount) break;
      if (curMom.isSameOrAfter(windowStart)) {
        const nextDateStr = curMom.format("YYYY-MM-DD");
        list.push({
          ...baseEvent,
          id: `${baseEvent.id}_rec_${nextDateStr}`,
          startDate: nextDateStr,
          endDate: nextDateStr
        });
      }
    }
    return list;
  }
  parseRrule(rruleStr) {
    const map = {};
    const parts = rruleStr.split(";");
    for (const part of parts) {
      const [k, v] = part.split("=");
      if (k && v) map[k.trim().toUpperCase()] = v.trim();
    }
    return map;
  }
  /**
   * Parses ICS DTSTART/DTEND string into { date: "YYYY-MM-DD", time: "HH:mm" | undefined, isAllDay: boolean }
   */
  parseDateString(raw, params) {
    const isAllDayParam = params.includes("VALUE=DATE");
    if (isAllDayParam || /^\d{8}$/.test(raw)) {
      const y = raw.substring(0, 4);
      const m = raw.substring(4, 6);
      const d = raw.substring(6, 8);
      return {
        date: `${y}-${m}-${d}`,
        isAllDay: true
      };
    }
    if (raw.includes("T")) {
      const isUtc = raw.endsWith("Z");
      const cleanNum = raw.replace(/[^\dTZ]/g, "");
      if (isUtc) {
        const mom = moment.utc(cleanNum, "YYYYMMDDTHHmmss").local();
        if (mom.isValid()) {
          return {
            date: mom.format("YYYY-MM-DD"),
            time: mom.format("HH:mm"),
            isAllDay: false
          };
        }
      } else {
        const mom = moment(cleanNum.substring(0, 15), "YYYYMMDDTHHmmss");
        if (mom.isValid()) {
          return {
            date: mom.format("YYYY-MM-DD"),
            time: mom.format("HH:mm"),
            isAllDay: false
          };
        }
      }
    }
    return null;
  }
  unescapeIcsText(str) {
    return str.replace(/\\n/g, "\n").replace(/\\N/g, "\n").replace(/\\,/g, ",").replace(/\\;/g, ";").replace(/\\\\/g, "\\");
  }
  pickColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    const idx = Math.abs(hash) % this.palette.length;
    return this.palette[idx];
  }
  /**
   * Checks if an event occurs on a specific target date (taking recurrence into account)
   */
  isEventOccurringOnDate(e, dateStr) {
    if (e.startDate === dateStr) return true;
    if (e.endDate && e.startDate <= dateStr && e.endDate >= dateStr) {
      if (e.isAllDay && e.endDate === dateStr && e.startDate !== e.endDate) return false;
      return true;
    }
    if (e.recurrence && e.recurrence.type !== "none") {
      if (dateStr < e.startDate) return false;
      if (e.recurrence.until && dateStr > e.recurrence.until) return false;
      const eventStartMom = moment(e.startDate, "YYYY-MM-DD");
      const targetMom = moment(dateStr, "YYYY-MM-DD");
      const diffDays = targetMom.diff(eventStartMom, "days");
      switch (e.recurrence.type) {
        case "daily":
        case "custom_days": {
          const interval = Math.max(1, e.recurrence.intervalDays || 1);
          return diffDays >= 0 && diffDays % interval === 0;
        }
        case "weekly": {
          const intervalWeeks = Math.max(1, e.recurrence.intervalWeeks || 1);
          const diffWeeks = Math.floor(diffDays / 7);
          return targetMom.day() === eventStartMom.day() && diffWeeks % intervalWeeks === 0;
        }
        case "monthly": {
          return targetMom.date() === eventStartMom.date();
        }
        case "yearly": {
          return targetMom.format("MM-DD") === eventStartMom.format("MM-DD");
        }
      }
    }
    return false;
  }
  /**
   * Returns all events occurring on a specific date (YYYY-MM-DD)
   */
  getEventsForDate(events, dateStr) {
    const list = events.filter((e) => this.isEventOccurringOnDate(e, dateStr));
    return list.sort((a, b) => {
      if (a.isAllDay && !b.isAllDay) return -1;
      if (!a.isAllDay && b.isAllDay) return 1;
      const tA = a.startTime || "00:00";
      const tB = b.startTime || "00:00";
      return tA.localeCompare(tB);
    });
  }
  /**
   * Check if a date has any scheduled events
   */
  hasEventsOnDate(events, dateStr) {
    return events.some((e) => this.isEventOccurringOnDate(e, dateStr));
  }
  /**
   * Checks for events starting within leadMinutes and triggers Obsidian / OS notifications
   */
  checkUpcomingEventNotifications(events, defaultLeadMinutes = 10) {
    const now = moment();
    const todayStr = now.format("YYYY-MM-DD");
    const todayEvents = this.getEventsForDate(events, todayStr);
    for (const ev of todayEvents) {
      if (ev.isAllDay || !ev.startTime) continue;
      if (ev.enableNotification === false) continue;
      const notifyKey = `${ev.id}_${todayStr}`;
      if (this.notifiedEventIds.has(notifyKey)) continue;
      const eventStart = moment(`${todayStr} ${ev.startTime}`, "YYYY-MM-DD HH:mm");
      if (!eventStart.isValid()) continue;
      const diffMinutes = eventStart.diff(now, "minutes");
      const eventLead = ev.notificationLeadMinutes !== void 0 ? ev.notificationLeadMinutes : defaultLeadMinutes;
      if (diffMinutes >= 0 && diffMinutes <= eventLead) {
        this.notifiedEventIds.add(notifyKey);
        const timeMsg = diffMinutes === 0 ? "starts now!" : `starts in ${diffMinutes} minute${diffMinutes === 1 ? "" : "s"}`;
        const sourceLabel = ev.source === "local" ? "Event" : "Google Calendar";
        const msg = `${sourceLabel}: "${ev.title}" ${timeMsg} (${ev.startTime})`;
        new import_obsidian6.Notice(msg, 7e3);
        if (typeof Notification !== "undefined" && Notification.permission === "granted") {
          try {
            new Notification(`Upcoming ${sourceLabel}: ${ev.title}`, {
              body: `${timeMsg} at ${ev.startTime}${ev.location ? ` \u2022 ${ev.location}` : ""}`,
              icon: "calendar"
            });
          } catch (e) {
          }
        }
      }
    }
  }
  /**
   * Retrieves local events stored in a vault Markdown file (e.g. Events.md)
   * formatted under ## YYYY-MM-DD headings.
   * Supports Obsidian callout blocks (> [!event] ...) as well as bulleted event items.
   */
  async getLocalMarkdownEvents(filePath) {
    if (!filePath) return [];
    const file = this.app.vault.getAbstractFileByPath(filePath);
    if (!(file instanceof import_obsidian6.TFile)) return [];
    const content = await this.app.vault.read(file);
    const lines = content.split("\n");
    const events = [];
    let currentHeadingDate = null;
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      const headingMatch = line.match(/^#{1,6}\s+.*?\b(\d{4}-\d{2}-\d{2})\b/);
      if (headingMatch) {
        currentHeadingDate = headingMatch[1];
        i++;
        continue;
      }
      if (!currentHeadingDate) {
        i++;
        continue;
      }
      const calloutMatch = line.match(/^\s*>\s*\[!event(?::[^\]]+)?\]\s*(.*)$/i);
      if (calloutMatch) {
        const startLineIdx = i;
        let rawTitle = calloutMatch[1].trim();
        let location;
        let recurrence = void 0;
        let enableNotification = false;
        let notificationLeadMinutes;
        let color;
        let description;
        i++;
        while (i < lines.length) {
          const nextLine = lines[i];
          if (/^\s*>\s*\[!/i.test(nextLine) || /^\s*#{1,6}\s+/i.test(nextLine)) {
            break;
          }
          if (!/^\s*>/.test(nextLine)) {
            break;
          }
          const subContent = nextLine.replace(/^\s*>\s*/, "").trim();
          if (subContent) {
            const locP = subContent.match(/^[-*]?\s*location:\s*(.*)$/i);
            const repP = subContent.match(/^[-*]?\s*repeat:\s*(.*)$/i);
            const remP = subContent.match(/^[-*]?\s*reminder:\s*(.*)$/i);
            const colP = subContent.match(/^[-*]?\s*color:\s*(.*)$/i);
            const notP = subContent.match(/^[-*]?\s*(?:notes|description):\s*(.*)$/i);
            if (locP) {
              location = locP[1].trim();
            } else if (repP) {
              const rText = repP[1].trim().toLowerCase();
              const numMatch = rText.match(/(\d+)/);
              if (numMatch) {
                recurrence = { type: "custom_days", intervalDays: parseInt(numMatch[1], 10) || 1 };
              } else if (rText.includes("day")) {
                recurrence = { type: "daily", intervalDays: 1 };
              } else if (rText.includes("week")) {
                recurrence = { type: "weekly", intervalWeeks: 1 };
              } else if (rText.includes("month")) {
                recurrence = { type: "monthly" };
              } else if (rText.includes("year")) {
                recurrence = { type: "yearly" };
              }
            } else if (remP) {
              enableNotification = true;
              const notMatch = remP[1].match(/(\d+)\s*(m|h|d)?/i);
              if (notMatch) {
                const val = parseInt(notMatch[1], 10);
                const unit = (notMatch[2] || "m").toLowerCase();
                if (unit === "d") notificationLeadMinutes = val * 1440;
                else if (unit === "h") notificationLeadMinutes = val * 60;
                else notificationLeadMinutes = val;
              }
            } else if (colP) {
              color = colP[1].trim();
            } else if (notP) {
              description = (description ? description + "\n" : "") + notP[1].trim();
            } else {
              description = (description ? description + "\n" : "") + subContent;
            }
          }
          i++;
        }
        let startTime;
        let endTime;
        let isAllDay = true;
        const timeRangeMatch = rawTitle.match(/\b(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})\b/);
        if (timeRangeMatch) {
          startTime = timeRangeMatch[1].padStart(5, "0");
          endTime = timeRangeMatch[2].padStart(5, "0");
          isAllDay = false;
          rawTitle = rawTitle.replace(timeRangeMatch[0], "").trim();
        } else {
          const singleTimeMatch = rawTitle.match(/\b(\d{1,2}:\d{2})\b/);
          if (singleTimeMatch) {
            startTime = singleTimeMatch[1].padStart(5, "0");
            isAllDay = false;
            rawTitle = rawTitle.replace(singleTimeMatch[0], "").trim();
          }
        }
        if (/\(all[\s-]day\)/i.test(rawTitle)) {
          isAllDay = true;
          rawTitle = rawTitle.replace(/\(all[\s-]day\)/gi, "").trim();
        }
        const title = rawTitle.replace(/^[-*|•\s]+/, "").trim();
        if (title) {
          events.push({
            id: `md-${filePath}-${startLineIdx}`,
            title,
            startDate: currentHeadingDate,
            endDate: currentHeadingDate,
            isAllDay,
            startTime,
            endTime,
            location,
            description,
            color: color || this.pickColor(title),
            source: "local",
            recurrence,
            enableNotification,
            notificationLeadMinutes
          });
        }
        continue;
      }
      const itemMatch = line.match(/^\s*[-*]\s*(?:\[[ xX]?\]\s*)?(.*)$/);
      if (itemMatch) {
        let raw = itemMatch[1].trim();
        if (raw) {
          let location;
          const locBracket = raw.match(/\[location:\s*([^\]]+)\]/i);
          if (locBracket) {
            location = locBracket[1].trim();
            raw = raw.replace(locBracket[0], "").trim();
          } else {
            const locEmoji = raw.match(/📍\s*([^🔁🔔🎨\[]+)/);
            if (locEmoji) {
              location = locEmoji[1].trim();
              raw = raw.replace(locEmoji[0], "").trim();
            }
          }
          let recurrence = void 0;
          const repBracket = raw.match(/\[repeat:\s*([^\]]+)\]/i);
          const repEmoji = raw.match(/🔁\s*(?:every\s+after\s+(\d+)\s*days?|every\s+(\d+)\s*days?|every\s+day|every\s+week|every\s+month|every\s+year)/i);
          const repMatch = repBracket || repEmoji;
          if (repMatch) {
            const matchStr = (repBracket ? repBracket[1] : repEmoji[0]).toLowerCase();
            const numMatch = matchStr.match(/(\d+)/);
            if (numMatch) {
              recurrence = { type: "custom_days", intervalDays: parseInt(numMatch[1], 10) || 1 };
            } else if (matchStr.includes("day")) {
              recurrence = { type: "daily", intervalDays: 1 };
            } else if (matchStr.includes("week")) {
              recurrence = { type: "weekly", intervalWeeks: 1 };
            } else if (matchStr.includes("month")) {
              recurrence = { type: "monthly" };
            } else if (matchStr.includes("year")) {
              recurrence = { type: "yearly" };
            }
            raw = raw.replace(repMatch[0], "").trim();
          }
          let enableNotification = false;
          let notificationLeadMinutes;
          const notifBracket = raw.match(/\[reminder:\s*(\d+)\s*(m|h|d)?\]/i);
          const notifEmoji = raw.match(/🔔\s*(\d+)\s*(m|h|d)?/i);
          const notifMatch = notifBracket || notifEmoji;
          if (notifMatch) {
            enableNotification = true;
            const val = parseInt(notifMatch[1], 10);
            const unit = (notifMatch[2] || "m").toLowerCase();
            if (unit === "d") notificationLeadMinutes = val * 1440;
            else if (unit === "h") notificationLeadMinutes = val * 60;
            else notificationLeadMinutes = val;
            raw = raw.replace(notifMatch[0], "").trim();
          }
          let color;
          const colorBracket = raw.match(/\[color:\s*(#[a-fA-F0-9]{6})\]/i);
          const colorEmoji = raw.match(/🎨\s*(#[a-fA-F0-9]{6})/);
          const colorMatch = colorBracket || colorEmoji;
          if (colorMatch) {
            color = colorMatch[1];
            raw = raw.replace(colorMatch[0], "").trim();
          }
          let startTime;
          let endTime;
          let isAllDay = true;
          const timeRangeMatch = raw.match(/\b(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})\b/);
          if (timeRangeMatch) {
            startTime = timeRangeMatch[1].padStart(5, "0");
            endTime = timeRangeMatch[2].padStart(5, "0");
            isAllDay = false;
            raw = raw.replace(timeRangeMatch[0], "").trim();
          } else {
            const singleTimeMatch = raw.match(/\b(\d{1,2}:\d{2})\b/);
            if (singleTimeMatch) {
              startTime = singleTimeMatch[1].padStart(5, "0");
              isAllDay = false;
              raw = raw.replace(singleTimeMatch[0], "").trim();
            }
          }
          if (/\(all[\s-]day\)/i.test(raw)) {
            isAllDay = true;
            raw = raw.replace(/\(all[\s-]day\)/gi, "").trim();
          }
          const title = raw.replace(/^[-*|•\s]+/, "").trim();
          if (title) {
            events.push({
              id: `md-${filePath}-${i}`,
              title,
              startDate: currentHeadingDate,
              endDate: currentHeadingDate,
              isAllDay,
              startTime,
              endTime,
              location,
              color: color || this.pickColor(title),
              source: "local",
              recurrence,
              enableNotification,
              notificationLeadMinutes
            });
          }
        }
      }
      i++;
    }
    return events;
  }
  /**
   * Appends or updates an event in the local Markdown file under ## YYYY-MM-DD
   * Formats as clean Obsidian callout (> [!event]) with zero emojis.
   */
  async saveEventToMarkdown(filePath, event) {
    if (!filePath) filePath = "Events.md";
    let file = this.app.vault.getAbstractFileByPath(filePath);
    if (!(file instanceof import_obsidian6.TFile)) {
      try {
        file = await this.app.vault.create(filePath, "# Calendar Events\n\n");
      } catch (e) {
        new import_obsidian6.Notice(`Failed to create events file: ${filePath}`);
        return;
      }
    }
    if (!(file instanceof import_obsidian6.TFile)) return;
    const blockLines = [];
    let header = "> [!event] ";
    if (!event.isAllDay && event.startTime) {
      header += event.endTime ? `${event.startTime} - ${event.endTime} ` : `${event.startTime} `;
    }
    header += event.title;
    if (event.isAllDay) {
      header += " (all day)";
    }
    blockLines.push(header);
    if (event.location) {
      blockLines.push(`> - location: ${event.location}`);
    }
    if (event.recurrence && event.recurrence.type !== "none") {
      let repText = "";
      if (event.recurrence.type === "custom_days" || event.recurrence.type === "daily") {
        const days = event.recurrence.intervalDays || 1;
        repText = `every ${days} day${days > 1 ? "s" : ""}`;
      } else if (event.recurrence.type === "weekly") {
        repText = "every week";
      } else if (event.recurrence.type === "monthly") {
        repText = "every month";
      } else if (event.recurrence.type === "yearly") {
        repText = "every year";
      }
      if (repText) {
        blockLines.push(`> - repeat: ${repText}`);
      }
    }
    if (event.enableNotification && event.notificationLeadMinutes !== void 0) {
      const mins = event.notificationLeadMinutes;
      const leadStr = mins >= 1440 ? `${Math.round(mins / 1440)}d` : mins >= 60 ? `${Math.round(mins / 60)}h` : `${mins}m`;
      blockLines.push(`> - reminder: ${leadStr}`);
    }
    if (event.color) {
      blockLines.push(`> - color: ${event.color}`);
    }
    if (event.description) {
      blockLines.push(`> - notes: ${event.description}`);
    }
    const eventBlock = blockLines.join("\n");
    const content = await this.app.vault.read(file);
    const lines = content.split("\n");
    const targetHeading = `## ${event.startDate}`;
    const headingIdx = lines.findIndex((l) => l.trim().startsWith(targetHeading));
    if (headingIdx >= 0) {
      lines.splice(headingIdx + 1, 0, eventBlock);
    } else {
      if (lines.length > 0 && lines[lines.length - 1].trim() !== "") {
        lines.push("");
      }
      lines.push(targetHeading);
      lines.push(eventBlock);
      lines.push("");
    }
    await this.app.vault.modify(file, lines.join("\n"));
  }
};

// src/services/deadlineService.ts
var _DeadlineService = class _DeadlineService {
  constructor(app, iconService) {
    this.app = app;
    this.iconService = iconService;
  }
  /**
   * Safely parses any date value into a moment object.
   * Handles Date objects, timestamps, strings, Obsidian wikilinks ([[YYYY-MM-DD]]), and YAML arrays.
   */
  parseDeadlineDate(rawVal) {
    if (rawVal === void 0 || rawVal === null) return null;
    if (Array.isArray(rawVal)) {
      rawVal = rawVal[0];
    }
    if (rawVal === void 0 || rawVal === null) return null;
    const momentFn = window.moment || moment;
    if (Object.prototype.toString.call(rawVal) === "[object Date]" || typeof rawVal?.getMonth === "function") {
      const m2 = momentFn(rawVal);
      return m2 && m2.isValid() ? m2 : null;
    }
    if (typeof rawVal === "number") {
      const m2 = momentFn(rawVal);
      return m2 && m2.isValid() ? m2 : null;
    }
    const str = String(rawVal).replace(/[\[\]"']/g, "").trim();
    if (!str) return null;
    const formats = [
      "YYYY-MM-DD",
      "YYYY/MM/DD",
      "YYYY.MM.DD",
      "DD-MM-YYYY",
      "DD/MM/YYYY",
      "MM/DD/YYYY",
      "YYYY-MM-DD HH:mm",
      "YYYY-MM-DDTHH:mm:ss",
      "YYYY-MM-DDTHH:mm:ss.SSSZ"
    ];
    let m = momentFn(str, formats, false);
    if (m && m.isValid()) return m;
    m = momentFn(str);
    if (m && m.isValid()) return m;
    m = momentFn(new Date(str));
    if (m && m.isValid()) return m;
    return null;
  }
  /**
   * Scans notes for deadlines, verifies status & progress, and sorts by urgency
   */
  async getDeadlines(settings) {
    let rawFolders = (settings.deadlinesFolders || "").trim();
    if (rawFolders === "03 Projects") rawFolders = "";
    const folderList = parseFolderList(rawFolders);
    const deadlineProp = (settings.deadlineProp || "target_completion_date").toLowerCase().trim();
    const completedProp = (settings.deadlineCompletedProp || "completed_date").toLowerCase().trim();
    const statusProp = (settings.deadlineStatusProp || "status").toLowerCase().trim();
    const completedPropAliases = Array.from(new Set([
      completedProp,
      "completed_date",
      "completeddate",
      "finished_date",
      "finisheddate",
      "closed_date",
      "closeddate",
      "done_date",
      "donedate",
      "completed"
    ].map((s) => s.toLowerCase().trim())));
    const deadlinePropAliases = Array.from(new Set([
      deadlineProp,
      "target_completion_date",
      "targetcompletiondate",
      "target_date",
      "targetdate",
      "target",
      "deadline",
      "due_date",
      "duedate",
      "due",
      "end_date",
      "enddate"
    ].map((s) => s.toLowerCase().trim())));
    const allFiles = this.app.vault.getMarkdownFiles();
    const items = [];
    const momentFn = window.moment || moment;
    const today = momentFn().startOf("day");
    for (const file of allFiles) {
      if (file.path.startsWith(".")) continue;
      if (folderList.length > 0 && !isPathInFolderList(file.path, folderList)) {
        continue;
      }
      let cache = this.app.metadataCache.getFileCache(file);
      let frontmatter = cache?.frontmatter;
      if (!frontmatter) {
        try {
          const content = await this.app.vault.read(file);
          if (content.startsWith("---")) {
            const endIdx = content.indexOf("\n---", 3);
            if (endIdx > 0) {
              const yamlBlock = content.slice(3, endIdx);
              frontmatter = {};
              const lines = yamlBlock.split("\n");
              for (const line of lines) {
                const colonIdx = line.indexOf(":");
                if (colonIdx > 0) {
                  const k = line.slice(0, colonIdx).trim();
                  const v = line.slice(colonIdx + 1).trim();
                  if (k) frontmatter[k] = v;
                }
              }
            }
          }
        } catch {
        }
      }
      if (!frontmatter) continue;
      let rawDeadlineVal = null;
      let matchedDeadlineKey = "";
      for (const [key, val] of Object.entries(frontmatter)) {
        const k = key.toLowerCase().trim();
        const kClean = k.replace(/[-_ ]/g, "");
        const isMatch = deadlinePropAliases.some((alias) => {
          const aClean = alias.replace(/[-_ ]/g, "");
          return k === alias || kClean === aClean;
        });
        if (isMatch && val !== void 0 && val !== null && String(val).trim() !== "") {
          rawDeadlineVal = val;
          matchedDeadlineKey = key;
          break;
        }
      }
      if (rawDeadlineVal === void 0 || rawDeadlineVal === null) continue;
      const mDate = this.parseDeadlineDate(rawDeadlineVal);
      if (!mDate || !mDate.isValid()) continue;
      const strDeadline = mDate.format("YYYY-MM-DD");
      let isCompleted = false;
      for (const [key, val] of Object.entries(frontmatter)) {
        if (key === matchedDeadlineKey) continue;
        const cleanKey = key.toLowerCase().trim().replace(/[-_ ]/g, "");
        const isCompletedKey = completedPropAliases.some((alias) => {
          const aClean = alias.replace(/[-_ ]/g, "");
          return cleanKey === alias || cleanKey === aClean;
        });
        if (isCompletedKey && val !== void 0 && val !== null) {
          const strVal = String(val).trim().toLowerCase();
          if (strVal !== "" && strVal !== "false" && strVal !== "null" && strVal !== "undefined") {
            isCompleted = true;
            break;
          }
        }
      }
      if (isCompleted) continue;
      let fileStatus = "";
      for (const [key, val] of Object.entries(frontmatter)) {
        const cleanKey = key.toLowerCase().trim().replace(/[-_ ]/g, "");
        if (cleanKey === statusProp.replace(/[-_ ]/g, "") && val !== void 0 && val !== null) {
          fileStatus = String(val).trim();
          break;
        }
      }
      const targetDay = mDate.clone().startOf("day");
      const daysLeft = targetDay.diff(today, "days");
      const isOverdue = daysLeft < 0;
      const isToday = daysLeft === 0;
      let startMoment = null;
      const startAliases = ["start_date", "start", "started", "startdate", "created", "created_date", "date"];
      for (const [key, val] of Object.entries(frontmatter)) {
        const cleanK = key.toLowerCase().trim().replace(/[-_ ]/g, "");
        if (startAliases.some((a) => a.replace(/[-_ ]/g, "") === cleanK) && val) {
          startMoment = this.parseDeadlineDate(val);
          if (startMoment && startMoment.isValid()) break;
        }
      }
      if (!startMoment || !startMoment.isValid()) {
        if (file.stat?.ctime) {
          startMoment = momentFn(file.stat.ctime).startOf("day");
        } else {
          startMoment = targetDay.clone().subtract(14, "days");
        }
      }
      const totalDays = targetDay.diff(startMoment, "days");
      let timeProgress = 0;
      if (isOverdue || isToday) {
        timeProgress = 100;
      } else if (totalDays <= 0) {
        timeProgress = 100;
      } else {
        const elapsedDays = today.diff(startMoment, "days");
        if (elapsedDays <= 0) {
          timeProgress = 0;
        } else {
          timeProgress = Math.min(100, Math.max(0, Math.round(elapsedDays / totalDays * 100)));
        }
      }
      let formattedTimeLeft = "";
      let fullTimeDescription = "";
      if (isOverdue) {
        const absDays = Math.abs(daysLeft);
        if (absDays === 1) {
          formattedTimeLeft = "-1d";
          fullTimeDescription = `Overdue by 1 day (Target: ${mDate.format("MMM D, YYYY")})`;
        } else if (absDays < 14) {
          formattedTimeLeft = `-${absDays}d`;
          fullTimeDescription = `Overdue by ${absDays} days (Target: ${mDate.format("MMM D, YYYY")})`;
        } else if (absDays < 60) {
          const weeks = Math.floor(absDays / 7);
          formattedTimeLeft = `-${weeks}w`;
          fullTimeDescription = `Overdue by ${weeks} weeks (Target: ${mDate.format("MMM D, YYYY")})`;
        } else {
          const months = Math.floor(absDays / 30);
          formattedTimeLeft = `-${months}m`;
          fullTimeDescription = `Overdue by ${months} months (Target: ${mDate.format("MMM D, YYYY")})`;
        }
      } else if (isToday) {
        formattedTimeLeft = "Today";
        fullTimeDescription = `Due today (${mDate.format("MMM D, YYYY")})`;
      } else if (daysLeft === 1) {
        formattedTimeLeft = "1d";
        fullTimeDescription = `Due tomorrow (${mDate.format("MMM D, YYYY")})`;
      } else if (daysLeft < 14) {
        formattedTimeLeft = `${daysLeft}d`;
        fullTimeDescription = `${daysLeft} days remaining (Target: ${mDate.format("MMM D, YYYY")})`;
      } else if (daysLeft < 60) {
        const weeks = Math.round(daysLeft / 7);
        formattedTimeLeft = `${weeks}w`;
        fullTimeDescription = `${weeks} weeks remaining (Target: ${mDate.format("MMM D, YYYY")})`;
      } else {
        const months = Math.round(daysLeft / 30);
        formattedTimeLeft = `${months}m`;
        fullTimeDescription = `${months} months remaining (Target: ${mDate.format("MMM D, YYYY")})`;
      }
      const folderIcon = this.iconService.resolveFileFolderIcon(file, settings);
      items.push({
        title: file.basename,
        file,
        deadlineDate: strDeadline,
        daysLeft,
        isOverdue,
        isToday,
        formattedTimeLeft,
        fullTimeDescription,
        status: fileStatus,
        timeProgress,
        resolvedIcon: folderIcon,
        colorHex: folderIcon.color || _DeadlineService.DEADLINE_COLORS[items.length % _DeadlineService.DEADLINE_COLORS.length]
      });
    }
    items.sort((a, b) => a.daysLeft - b.daysLeft);
    return items;
  }
};
_DeadlineService.DEADLINE_COLORS = [
  "#ef4444",
  // Red
  "#f97316",
  // Orange
  "#f59e0b",
  // Amber
  "#3b82f6",
  // Blue
  "#8b5cf6",
  // Purple
  "#14b8a6",
  // Teal
  "#ec4899"
  // Pink
];
var DeadlineService = _DeadlineService;

// src/modals/scheduleTaskModal.ts
var import_obsidian8 = require("obsidian");

// src/modals/modalUtils.ts
var import_obsidian7 = require("obsidian");
function initModalCloseButton(modal) {
  const closeBtn = modal.modalEl?.querySelector(".modal-close-button") || modal.containerEl?.querySelector(".modal-close-button");
  if (closeBtn) {
    closeBtn.empty();
    (0, import_obsidian7.setIcon)(closeBtn, "x");
  }
}

// src/modals/scheduleTaskModal.ts
var ScheduleTaskModal = class extends import_obsidian8.Modal {
  constructor(app, taskService, filePath, onTaskScheduled) {
    super(app);
    this.tasksText = "";
    this.taskService = taskService;
    this.filePath = filePath;
    this.onTaskScheduled = onTaskScheduled;
    this.selectedDate = moment().format("YYYY-MM-DD");
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("os-schedule-modal");
    initModalCloseButton(this);
    contentEl.createEl("h2", { text: "Schedule Tasks" });
    new import_obsidian8.Setting(contentEl).setName("Date").setDesc("Choose the date for these tasks.").addText((text) => {
      text.inputEl.type = "date";
      text.setValue(this.selectedDate).onChange((val) => {
        this.selectedDate = val || moment().format("YYYY-MM-DD");
      });
    });
    const taskSetting = new import_obsidian8.Setting(contentEl).setName("Tasks (one per line)").setDesc("Enter as many tasks as you want. Each line will be created as a separate task.");
    let textareaElRef;
    taskSetting.addTextArea((textArea) => {
      textareaElRef = textArea.inputEl;
      textArea.setPlaceholder("Review DSA topic\nSolve 10 chess puzzles\nRead 20 pages of book\nPlan tomorrow...").setValue(this.tasksText).onChange((val) => {
        this.tasksText = val;
      });
      textArea.inputEl.rows = 6;
      textArea.inputEl.style.width = "100%";
      textArea.inputEl.style.minHeight = "120px";
      textArea.inputEl.style.resize = "vertical";
      textArea.inputEl.addEventListener("keydown", async (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          await this.submit();
        }
      });
    });
    new import_obsidian8.Setting(contentEl).addButton((btn) => {
      btn.setButtonText("Schedule Tasks").setCta().onClick(async () => {
        await this.submit();
      });
    }).addButton((btn) => {
      btn.setButtonText("Cancel").onClick(() => {
        this.close();
      });
    });
    setTimeout(() => {
      if (textareaElRef) textareaElRef.focus();
    }, 50);
  }
  async submit() {
    const lines = this.tasksText.split("\n").map((line) => line.trim()).filter(Boolean);
    if (lines.length === 0) {
      new import_obsidian8.Notice("Please enter at least one task.");
      return;
    }
    const success = await this.taskService.addTasks(this.filePath, lines, this.selectedDate);
    if (success) {
      new import_obsidian8.Notice(`Scheduled ${lines.length} task${lines.length > 1 ? "s" : ""} for ${this.selectedDate}`);
      this.close();
      await this.onTaskScheduled();
    } else {
      new import_obsidian8.Notice("Failed to schedule tasks.");
    }
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/modals/freezeStreakModal.ts
var import_obsidian9 = require("obsidian");
var FreezeStreakModal = class extends import_obsidian9.Modal {
  constructor(app, streak, streakService, maxFreezesPerMonth, onUpdated) {
    super(app);
    this.customDays = 1;
    this.streak = streak;
    this.streakService = streakService;
    this.maxFreezesPerMonth = maxFreezesPerMonth || 4;
    this.onUpdated = onUpdated;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("os-freeze-modal");
    initModalCloseButton(this);
    const header = contentEl.createDiv({ cls: "os-modal-header" });
    const iconSpan = header.createSpan({ cls: "os-modal-header-icon" });
    (0, import_obsidian9.setIcon)(iconSpan, "snowflake");
    header.createEl("h2", { text: `Freeze Habit: "${this.streak.name}"` });
    const isFrozen = this.streakService.isFrozen(this.streak);
    const period = this.streak.freezePeriodType || "monthly";
    const periodLabel = period === "weekly" ? "Week" : period === "yearly" ? "Year" : "Month";
    const quota = this.streakService.getEffectiveFreezeQuota(this.streak, this.maxFreezesPerMonth);
    const used = this.streakService.getFreezesUsedInCurrentPeriod(this.streak);
    const remainingDays = this.streakService.getFreezesRemainingInCurrentPeriod(this.streak, this.maxFreezesPerMonth);
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
      const btnSection = contentEl.createDiv({ cls: "os-freeze-quick-buttons" });
      const options = [
        { label: "1 Day", days: 1 },
        { label: "2 Days", days: 2 },
        { label: "3 Days", days: 3 },
        { label: "5 Days", days: 5 },
        { label: "7 Days", days: 7 }
      ].filter((opt) => opt.days <= remainingDays);
      options.forEach((opt) => {
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
      const defaultCustom = Math.min(2, remainingDays);
      this.customDays = defaultCustom;
      new import_obsidian9.Setting(contentEl).setName("Custom Freeze Days").setDesc(`Enter days to freeze (up to ${remainingDays} days allowed this month).`).addText((text) => {
        text.inputEl.type = "number";
        text.inputEl.max = String(remainingDays);
        text.inputEl.min = "1";
        text.setValue(String(defaultCustom)).onChange((val) => {
          const n = parseInt(val, 10);
          this.customDays = isNaN(n) ? 1 : Math.max(1, Math.min(n, remainingDays));
        });
      }).addButton((btn) => {
        btn.setButtonText("Apply Freeze").setCta().onClick(async () => {
          const success = this.streakService.freezeStreak(this.streak, this.customDays, this.maxFreezesPerMonth);
          if (success) {
            await this.onUpdated();
            this.close();
          }
        });
      });
    }
    if (isFrozen) {
      new import_obsidian9.Setting(contentEl).setName("Unfreeze Now").setDesc("Resume your daily streak tracking immediately.").addButton((btn) => {
        btn.setButtonText("Unfreeze Habit").setWarning().onClick(async () => {
          this.streakService.unfreezeStreak(this.streak);
          await this.onUpdated();
          this.close();
        });
      });
    }
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/modals/streakModal.ts
var import_obsidian10 = require("obsidian");
var StreakModal = class extends import_obsidian10.Modal {
  constructor(app, streak, onSave) {
    super(app);
    this.name = "";
    this.description = "";
    this.icon = "flame";
    this.frequency = "daily";
    this.scheduleType = "flexible";
    this.fixedDayOfWeek = 1;
    // 1 = Monday
    this.fixedDayOfMonth = 1;
    this.fixedDateOfYear = "12-31";
    this.startDate = moment().format("YYYY-MM-DD");
    this.freezePeriodType = "monthly";
    this.freezeQuota = 4;
    this.autoPopulate = true;
    this.autoFreeze = true;
    this.streak = streak;
    this.onSave = onSave;
    if (streak) {
      this.name = streak.name;
      this.description = streak.description || "";
      this.icon = streak.icon || "flame";
      this.frequency = streak.frequency || "daily";
      this.scheduleType = streak.scheduleType || "flexible";
      this.fixedDayOfWeek = streak.fixedDayOfWeek ?? 1;
      this.fixedDayOfMonth = streak.fixedDayOfMonth ?? 1;
      this.fixedDateOfYear = streak.fixedDateOfYear || "12-31";
      this.startDate = streak.startDate || moment().format("YYYY-MM-DD");
      this.freezePeriodType = streak.freezePeriodType || "monthly";
      this.freezeQuota = streak.freezeQuota ?? streak.maxFreezesPerMonth ?? 4;
      this.autoPopulate = streak.autoPopulate !== false;
      this.autoFreeze = streak.autoFreeze !== false;
    }
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("os-streak-edit-modal");
    initModalCloseButton(this);
    contentEl.createEl("h2", { text: this.streak ? "Edit Habit" : "Add New Habit" });
    new import_obsidian10.Setting(contentEl).setName("Habit Name").setDesc("The activity or habit name (e.g. Reading, Weekly Article, Annual Review).").addText((text) => {
      text.setValue(this.name).setPlaceholder("e.g. Publish Weekly Article").onChange((val) => {
        this.name = val;
      });
    });
    const descSetting = new import_obsidian10.Setting(contentEl).setName("Description (Optional)").setDesc("Brief description or motivation (max 150 characters).");
    const charCountEl = descSetting.descEl.createDiv({ cls: "os-char-counter" });
    charCountEl.style.cssText = "font-size: 11px; color: var(--text-muted); margin-top: 4px;";
    charCountEl.textContent = `${this.description.length}/150`;
    descSetting.addTextArea((text) => {
      text.setValue(this.description).setPlaceholder("e.g. 20 pages before bed or after morning workout").onChange((val) => {
        if (val.length > 150) {
          val = val.substring(0, 150);
          text.setValue(val);
        }
        this.description = val;
        charCountEl.textContent = `${this.description.length}/150`;
      });
      text.inputEl.rows = 2;
      text.inputEl.maxLength = 150;
      text.inputEl.addClass("os-streak-desc-input");
    });
    if (!this.streak) {
      new import_obsidian10.Setting(contentEl).setName("Frequency").setDesc("How often this habit should be completed.").addDropdown((drop) => {
        drop.addOption("daily", "Daily (Every day)").addOption("weekly", "Weekly (Once a week)").addOption("monthly", "Monthly (Once a month)").addOption("yearly", "Yearly (Once a year)").setValue(this.frequency).onChange((val) => {
          this.frequency = val;
          if (this.frequency !== "daily") {
            this.autoPopulate = false;
          } else {
            this.autoPopulate = true;
          }
          renderScheduleSettings();
        });
      });
      const scheduleContainer = contentEl.createDiv({ cls: "os-habit-schedule-container" });
      const renderScheduleSettings = () => {
        scheduleContainer.empty();
        if (this.frequency === "daily") {
          return;
        }
        new import_obsidian10.Setting(scheduleContainer).setName("Schedule Mode").setDesc("Choose whether you have a flexible window or a fixed target day.").addDropdown((drop) => {
          drop.addOption("flexible", `Flexible (Any time during the ${this.frequency})`).addOption("fixed", "Fixed (On a specific day)").setValue(this.scheduleType).onChange((val) => {
            this.scheduleType = val;
            renderScheduleSettings();
          });
        });
        if (this.scheduleType === "fixed") {
          if (this.frequency === "weekly") {
            new import_obsidian10.Setting(scheduleContainer).setName("Target Day of Week").setDesc("The habit will auto-populate into today's tasks on this day.").addDropdown((drop) => {
              drop.addOption("1", "Monday").addOption("2", "Tuesday").addOption("3", "Wednesday").addOption("4", "Thursday").addOption("5", "Friday").addOption("6", "Saturday").addOption("0", "Sunday").setValue(String(this.fixedDayOfWeek)).onChange((val) => {
                this.fixedDayOfWeek = parseInt(val, 10);
              });
            });
          } else if (this.frequency === "monthly") {
            new import_obsidian10.Setting(scheduleContainer).setName("Target Day of Month").setDesc("Day of the month to auto-populate (1 - 31).").addText((text) => {
              text.inputEl.type = "number";
              text.inputEl.min = "1";
              text.inputEl.max = "31";
              text.setValue(String(this.fixedDayOfMonth));
              text.onChange((val) => {
                const n = parseInt(val, 10);
                this.fixedDayOfMonth = isNaN(n) ? 1 : Math.max(1, Math.min(31, n));
              });
            });
          } else if (this.frequency === "yearly") {
            new import_obsidian10.Setting(scheduleContainer).setName("Target Date of Year").setDesc("Format: MM-DD (e.g. 12-31 for Dec 31).").addText((text) => {
              text.setValue(this.fixedDateOfYear);
              text.setPlaceholder("12-31");
              text.onChange((val) => {
                this.fixedDateOfYear = val.trim();
              });
            });
          }
        }
      };
      renderScheduleSettings();
      new import_obsidian10.Setting(contentEl).setName("Lucide Icon").setDesc("Icon name (e.g. flame, book-open, pen-tool, crosshair, pencil, code-2, zap).").addText((text) => {
        text.setValue(this.icon).setPlaceholder("flame").onChange((val) => {
          this.icon = val.trim();
        });
      });
      new import_obsidian10.Setting(contentEl).setName("Start Date").setDesc("The habit will only begin tracking from this date onwards.").addText((text) => {
        text.inputEl.type = "date";
        text.setValue(this.startDate).onChange((val) => {
          if (val) this.startDate = val;
        });
      });
      new import_obsidian10.Setting(contentEl).setName("Freeze Allowance Reset").setDesc("How often your freeze allowance resets.").addDropdown((drop) => {
        drop.addOption("weekly", "Weekly").addOption("monthly", "Monthly (Default)").addOption("yearly", "Yearly").setValue(this.freezePeriodType).onChange((val) => {
          this.freezePeriodType = val;
        });
      });
      new import_obsidian10.Setting(contentEl).setName("Freeze Quota Count").setDesc("Number of freeze days/skips allowed per period (e.g. 4 per month, or 2 per year).").addText((text) => {
        text.inputEl.type = "number";
        text.inputEl.min = "0";
        text.setValue(String(this.freezeQuota));
        text.onChange((val) => {
          const n = parseInt(val, 10);
          this.freezeQuota = isNaN(n) ? 4 : Math.max(0, n);
        });
      });
      new import_obsidian10.Setting(contentEl).setName("Auto-populate in Daily Tasks").setDesc("Automatically add to today's plan when scheduled.").addToggle((toggle) => {
        toggle.setValue(this.autoPopulate).onChange((val) => {
          this.autoPopulate = val;
        });
      });
      new import_obsidian10.Setting(contentEl).setName("Auto-Freeze if Missed").setDesc("Automatically use a freeze from this habit's allowance if missed.").addToggle((toggle) => {
        toggle.setValue(this.autoFreeze).onChange((val) => {
          this.autoFreeze = val;
        });
      });
    }
    new import_obsidian10.Setting(contentEl).addButton((btn) => {
      btn.setButtonText(this.streak ? "Save Changes" : "Create Habit").setCta().onClick(async () => {
        const cleanName = this.name.trim();
        if (!cleanName) {
          new import_obsidian10.Notice("Please provide a habit name.");
          return;
        }
        const item = {
          id: this.streak ? this.streak.id : `habit-${cleanName.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
          name: cleanName,
          description: this.description.trim() ? this.description.trim().substring(0, 150) : void 0,
          icon: this.streak ? this.streak.icon : this.icon || "flame",
          frequency: this.streak ? this.streak.frequency || "daily" : this.frequency,
          scheduleType: this.streak ? this.streak.scheduleType || "flexible" : this.scheduleType,
          fixedDayOfWeek: this.streak ? this.streak.fixedDayOfWeek : this.scheduleType === "fixed" && this.frequency === "weekly" ? this.fixedDayOfWeek : void 0,
          fixedDayOfMonth: this.streak ? this.streak.fixedDayOfMonth : this.scheduleType === "fixed" && this.frequency === "monthly" ? this.fixedDayOfMonth : void 0,
          fixedDateOfYear: this.streak ? this.streak.fixedDateOfYear : this.scheduleType === "fixed" && this.frequency === "yearly" ? this.fixedDateOfYear : void 0,
          currentStreak: this.streak ? this.streak.currentStreak : 0,
          bestStreak: this.streak ? this.streak.bestStreak : 0,
          createdDate: this.streak ? this.streak.createdDate : moment().format("YYYY-MM-DD HH:mm"),
          startDate: this.streak ? this.streak.startDate : this.startDate,
          lastCompletedDate: this.streak ? this.streak.lastCompletedDate : void 0,
          lastCompletedCycle: this.streak ? this.streak.lastCompletedCycle : void 0,
          history: this.streak ? this.streak.history : [],
          frozenUntil: this.streak ? this.streak.frozenUntil : null,
          freezeHistory: this.streak ? this.streak.freezeHistory : [],
          freezePeriodType: this.streak ? this.streak.freezePeriodType || "monthly" : this.freezePeriodType,
          freezeQuota: this.streak ? this.streak.freezeQuota ?? 4 : this.freezeQuota,
          maxFreezesPerMonth: this.streak ? this.streak.freezeQuota ?? 4 : this.freezeQuota,
          autoPopulate: this.streak ? this.streak.autoPopulate : this.autoPopulate,
          autoFreeze: this.streak ? this.streak.autoFreeze ?? this.autoFreeze : this.autoFreeze
        };
        await this.onSave(item);
        this.close();
      });
    }).addButton((btn) => {
      btn.setButtonText("Cancel").onClick(() => {
        this.close();
      });
    });
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/modals/archiveOrDeleteStreakModal.ts
var import_obsidian11 = require("obsidian");
var ArchiveOrDeleteStreakModal = class extends import_obsidian11.Modal {
  constructor(app, streak, archiveFile, onArchive, onDelete) {
    super(app);
    this.streak = streak;
    this.archiveFile = archiveFile;
    this.onArchive = onArchive;
    this.onDelete = onDelete;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("os-streak-action-modal");
    initModalCloseButton(this);
    contentEl.createEl("h2", { text: `Manage Habit: ${this.streak.name}` });
    contentEl.createEl("p", {
      text: "Choose what you would like to do with this habit. You can archive it to save all streak statistics, or permanently delete it.",
      cls: "os-modal-desc"
    });
    const archiveBox = contentEl.createDiv({ cls: "os-modal-option-box" });
    archiveBox.createEl("h4", { text: "Archive Habit" });
    archiveBox.createEl("p", {
      text: `Moves "${this.streak.name}" and all historical records into "${this.archiveFile}". It will stop auto-populating in your daily tasks.`,
      cls: "os-modal-option-desc"
    });
    const archiveBtn = archiveBox.createEl("button", {
      cls: "mod-cta",
      text: "Archive Habit"
    });
    archiveBtn.addEventListener("click", async () => {
      this.close();
      await this.onArchive();
    });
    const deleteBox = contentEl.createDiv({ cls: "os-modal-option-box is-warning" });
    deleteBox.createEl("h4", { text: "Permanently Delete" });
    deleteBox.createEl("p", {
      text: `Warning: This will permanently erase "${this.streak.name}" and all associated streak history from your vault. This action cannot be undone.`,
      cls: "os-modal-option-desc"
    });
    const deleteBtn = deleteBox.createEl("button", {
      cls: "mod-warning",
      text: "Delete Permanently"
    });
    deleteBtn.addEventListener("click", async () => {
      const confirmed = window.confirm(`Are you sure you want to permanently delete "${this.streak.name}" and all its streak data? This cannot be undone.`);
      if (confirmed) {
        this.close();
        await this.onDelete();
      }
    });
    const footer = contentEl.createDiv({ cls: "os-modal-footer" });
    footer.style.marginTop = "18px";
    footer.style.textAlign = "right";
    const cancelBtn = footer.createEl("button", { text: "Cancel" });
    cancelBtn.addEventListener("click", () => this.close());
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/modals/habitDetailsModal.ts
var import_obsidian12 = require("obsidian");
var HabitDetailsModal = class extends import_obsidian12.Modal {
  constructor(app, streak, streakService, settings, onUpdated) {
    super(app);
    this.streak = streak;
    this.streakService = streakService;
    this.settings = settings;
    this.onUpdated = onUpdated;
    this.viewDate = moment();
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    this.modalEl.addClass("os-habit-modal-dialog");
    contentEl.addClass("os-habit-details-modal");
    initModalCloseButton(this);
    this.renderModalContent();
  }
  renderModalContent() {
    const { contentEl } = this;
    contentEl.empty();
    const freq = this.streak.frequency || "daily";
    const isFrozen = this.streakService.isFrozen(this.streak);
    const isDone = this.streakService.isCompletedInCurrentCycle(this.streak);
    const maxFreezes = this.settings.maxFreezesPerMonth || 4;
    const habitMaxFreezes = this.streakService.getEffectiveMaxFreezes(this.streak, maxFreezes);
    const usedFreezes = this.streakService.getFreezesUsedThisMonth(this.streak);
    const streakUnit = freq === "weekly" ? "wks" : freq === "monthly" ? "mos" : freq === "yearly" ? "yrs" : "days";
    const header = contentEl.createDiv({ cls: "os-hdetail-fixed-header" });
    const titleBlock = header.createDiv({ cls: "os-hdetail-title-block" });
    const iconWrap = titleBlock.createDiv({ cls: "os-hdetail-title-icon" });
    (0, import_obsidian12.setIcon)(iconWrap, this.streak.icon || "flame");
    const textWrap = titleBlock.createDiv({ cls: "os-hdetail-title-desc" });
    textWrap.createEl("h2", { cls: "os-hdetail-title", text: this.streak.name });
    if (this.streak.description && this.streak.description.trim()) {
      textWrap.createDiv({
        cls: "os-hdetail-desc-inline",
        text: this.streak.description.trim()
      });
    }
    const badgesRow = header.createDiv({ cls: "os-hdetail-badges" });
    badgesRow.createSpan({
      cls: "os-hdetail-badge os-badge-freq",
      text: freq.toUpperCase() + (freq !== "daily" && this.streak.scheduleType === "fixed" ? " (FIXED)" : "")
    });
    if (isFrozen) {
      badgesRow.createSpan({
        cls: "os-hdetail-badge os-badge-frozen",
        text: `\u2744\uFE0F FROZEN (${this.streakService.getFreezeDaysLeft(this.streak)}d left)`
      });
    }
    if (this.streak.startDate) {
      badgesRow.createSpan({
        cls: "os-hdetail-badge os-badge-date",
        text: `Started ${this.streak.startDate}`
      });
    }
    badgesRow.createSpan({
      cls: "os-hdetail-badge os-badge-quota",
      text: `\u2744\uFE0F ${usedFreezes}/${habitMaxFreezes} Freezes`
    });
    const bodyEl = contentEl.createDiv({ cls: "os-hdetail-scrollable-body" });
    const statsGrid = bodyEl.createDiv({ cls: "os-hdetail-stats" });
    const statCurr = statsGrid.createDiv({ cls: "os-hdetail-stat-card" });
    statCurr.createDiv({ cls: "os-hdetail-stat-label", text: "Current" });
    statCurr.createDiv({
      cls: `os-hdetail-stat-val ${isDone ? "is-active" : ""}`,
      text: `${this.streak.currentStreak || 0} ${streakUnit}`
    });
    const statBest = statsGrid.createDiv({ cls: "os-hdetail-stat-card" });
    statBest.createDiv({ cls: "os-hdetail-stat-label", text: "Best" });
    statBest.createDiv({
      cls: "os-hdetail-stat-val",
      text: `${this.streak.bestStreak || 0} ${streakUnit}`
    });
    const totalDone = (this.streak.history || []).length;
    const statTotal = statsGrid.createDiv({ cls: "os-hdetail-stat-card" });
    statTotal.createDiv({ cls: "os-hdetail-stat-label", text: "Total" });
    statTotal.createDiv({ cls: "os-hdetail-stat-val", text: `${totalDone}` });
    let rateStr = "100%";
    if (this.streak.startDate) {
      const startMom = moment(this.streak.startDate, "YYYY-MM-DD");
      const daysSince = Math.max(1, moment().diff(startMom, "days") + 1);
      const pct = Math.min(100, Math.round(totalDone / daysSince * 100));
      rateStr = `${pct}%`;
    }
    const statRate = statsGrid.createDiv({ cls: "os-hdetail-stat-card" });
    statRate.createDiv({ cls: "os-hdetail-stat-label", text: "Rate" });
    statRate.createDiv({ cls: "os-hdetail-stat-val", text: rateStr });
    const calCard = bodyEl.createDiv({ cls: "os-calendar-section os-habit-cal-container" });
    const calHeader = calCard.createDiv({ cls: "os-calendar-header" });
    const leftWrap = calHeader.createDiv({ cls: "os-calendar-header-left" });
    const title = leftWrap.createDiv({
      cls: "os-calendar-title",
      text: this.viewDate.format("MMMM YYYY")
    });
    title.setAttribute("title", "Click to jump to current month");
    title.addEventListener("click", () => {
      this.viewDate = moment();
      this.renderModalContent();
    });
    const isCurrentMonth = this.viewDate.isSame(moment(), "month");
    const nav = calHeader.createDiv({ cls: "os-calendar-nav" });
    const todayIconBtn = nav.createDiv({
      cls: `os-calendar-today-icon-btn ${isCurrentMonth ? "is-current" : "is-navigated"}`,
      title: `Jump to today (${moment().format("MMM D")})`
    });
    todayIconBtn.createDiv({ cls: "os-cal-today-icon-bar" });
    todayIconBtn.createSpan({
      cls: "os-cal-today-icon-day",
      text: moment().format("D")
    });
    todayIconBtn.addEventListener("click", () => {
      this.viewDate = moment();
      this.renderModalContent();
    });
    const prevBtn = nav.createDiv({ cls: "os-calendar-nav-btn", title: "Previous month" });
    (0, import_obsidian12.setIcon)(prevBtn, "chevron-left");
    prevBtn.addEventListener("click", () => {
      this.viewDate.subtract(1, "month");
      this.renderModalContent();
    });
    const nextBtn = nav.createDiv({ cls: "os-calendar-nav-btn", title: "Next month" });
    (0, import_obsidian12.setIcon)(nextBtn, "chevron-right");
    nextBtn.addEventListener("click", () => {
      this.viewDate.add(1, "month");
      this.renderModalContent();
    });
    const weekdaysRow = calCard.createDiv({ cls: "os-calendar-weekdays" });
    const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    weekdays.forEach((day) => {
      weekdaysRow.createDiv({ cls: "os-calendar-weekday", text: day });
    });
    const daysGrid = calCard.createDiv({ cls: "os-calendar-grid" });
    const startOfMonth = this.viewDate.clone().startOf("month");
    const daysInMonth = this.viewDate.daysInMonth();
    let startDayOfWeek = (startOfMonth.day() + 6) % 7;
    const prevMonth = this.viewDate.clone().subtract(1, "month");
    const daysInPrevMonth = prevMonth.daysInMonth();
    const nextMonth = this.viewDate.clone().add(1, "month");
    const todayStr = moment().format("YYYY-MM-DD");
    const completedSet = new Set(this.streak.history || []);
    const freezeSet = new Set(this.streak.freezeHistory || []);
    const startStr = this.streak.startDate || "1970-01-01";
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const dayNum = daysInPrevMonth - i;
      const dayMoment = prevMonth.clone().date(dayNum);
      const dStr = dayMoment.format("YYYY-MM-DD");
      const isCompleted = completedSet.has(dStr);
      const isFrozenDay = freezeSet.has(dStr);
      const isBeforeStart = dStr < startStr;
      const isMissed = !isCompleted && !isFrozenDay && !isBeforeStart;
      const dayEl = daysGrid.createDiv({
        cls: `os-calendar-day is-other-month ${isCompleted ? "is-habit-completed" : ""} ${isFrozenDay ? "is-habit-frozen" : ""} ${isMissed ? "is-habit-missed" : ""}`
      });
      const numWrap = dayEl.createDiv({ cls: "os-calendar-day-num-wrap" });
      numWrap.createSpan({ cls: "os-calendar-day-num", text: String(dayNum) });
      if (isCompleted || isFrozenDay || isMissed) {
        const dotsWrap = dayEl.createDiv({ cls: "os-calendar-event-dots" });
        const dot = dotsWrap.createSpan({ cls: "os-calendar-dot" });
        if (isCompleted) dot.addClass("os-dot-completed");
        else if (isFrozenDay) dot.addClass("os-dot-frozen");
        else if (isMissed) dot.addClass("os-dot-missed");
      }
      dayEl.setAttribute("title", `${dayMoment.format("MMM D, YYYY")} (Click to view month)`);
      dayEl.addEventListener("click", () => {
        this.viewDate.subtract(1, "month");
        this.renderModalContent();
      });
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const dayMoment = this.viewDate.clone().date(day);
      const dStr = dayMoment.format("YYYY-MM-DD");
      const isToday = dStr === todayStr;
      const isFuture = dayMoment.isAfter(moment(), "day");
      const isBeforeStart = dStr < startStr;
      const isCompleted = completedSet.has(dStr);
      const isFrozenDay = freezeSet.has(dStr);
      const isMissed = !isCompleted && !isFrozenDay && !isFuture && !isBeforeStart;
      const dayEl = daysGrid.createDiv({
        cls: `os-calendar-day ${isToday ? "is-today" : ""} ${isCompleted ? "is-habit-completed" : ""} ${isFrozenDay ? "is-habit-frozen" : ""} ${isMissed ? "is-habit-missed" : ""}`
      });
      const numWrap = dayEl.createDiv({ cls: "os-calendar-day-num-wrap" });
      numWrap.createSpan({ cls: "os-calendar-day-num", text: String(day) });
      if (isCompleted || isFrozenDay || isMissed) {
        const dotsWrap = dayEl.createDiv({ cls: "os-calendar-event-dots" });
        const dot = dotsWrap.createSpan({ cls: "os-calendar-dot" });
        if (isCompleted) dot.addClass("os-dot-completed");
        else if (isFrozenDay) dot.addClass("os-dot-frozen");
        else if (isMissed) dot.addClass("os-dot-missed");
      }
      if (isCompleted) {
        dayEl.setAttribute("title", `${dayMoment.format("MMM D, YYYY")} \u2014 Completed \u2713 (Click to toggle)`);
      } else if (isFrozenDay) {
        dayEl.setAttribute("title", `${dayMoment.format("MMM D, YYYY")} \u2014 Frozen \u2744\uFE0F`);
      } else if (isMissed) {
        dayEl.setAttribute("title", `${dayMoment.format("MMM D, YYYY")} \u2014 Missed \u2717 (Click to toggle)`);
      } else if (isToday) {
        dayEl.setAttribute("title", `${dayMoment.format("MMM D, YYYY")} \u2014 Today (Click to toggle)`);
      } else {
        dayEl.setAttribute("title", dayMoment.format("MMM D, YYYY"));
      }
      if (!isFuture && !isBeforeStart) {
        dayEl.addClass("is-interactive");
        dayEl.addEventListener("click", async () => {
          if (completedSet.has(dStr)) {
            this.streak.history = (this.streak.history || []).filter((d) => d !== dStr);
            new import_obsidian12.Notice(`Unmarked ${dayMoment.format("MMM D, YYYY")}`);
          } else {
            if (!this.streak.history) this.streak.history = [];
            this.streak.history.push(dStr);
            this.streak.history.sort();
            new import_obsidian12.Notice(`Marked ${dayMoment.format("MMM D, YYYY")} as completed!`);
          }
          this.streakService.recalculateStreak(this.streak);
          await this.onUpdated();
          this.renderModalContent();
        });
      }
    }
    const totalCells = startDayOfWeek + daysInMonth;
    const targetCells = totalCells > 35 ? 42 : 35;
    const remainingDays = targetCells - totalCells;
    for (let day = 1; day <= remainingDays; day++) {
      const dayMoment = nextMonth.clone().date(day);
      const dStr = dayMoment.format("YYYY-MM-DD");
      const dayEl = daysGrid.createDiv({
        cls: "os-calendar-day is-other-month"
      });
      const numWrap = dayEl.createDiv({ cls: "os-calendar-day-num-wrap" });
      numWrap.createSpan({ cls: "os-calendar-day-num", text: String(day) });
      dayEl.setAttribute("title", `${dayMoment.format("MMM D, YYYY")} (Click to view month)`);
      dayEl.addEventListener("click", () => {
        this.viewDate.add(1, "month");
        this.renderModalContent();
      });
    }
    const legend = calCard.createDiv({ cls: "os-habit-cal-legend" });
    const legDone = legend.createDiv({ cls: "os-habit-legend-item" });
    legDone.createSpan({ cls: "os-calendar-dot os-dot-completed" });
    legDone.createSpan({ text: "Completed" });
    const legFreeze = legend.createDiv({ cls: "os-habit-legend-item" });
    legFreeze.createSpan({ cls: "os-calendar-dot os-dot-frozen" });
    legFreeze.createSpan({ text: "Frozen" });
    const legMissed = legend.createDiv({ cls: "os-habit-legend-item" });
    legMissed.createSpan({ cls: "os-calendar-dot os-dot-missed" });
    legMissed.createSpan({ text: "Missed" });
    const footer = contentEl.createDiv({ cls: "os-hdetail-fixed-footer" });
    const freezeBtn = footer.createEl("button", {
      cls: isFrozen ? "mod-warning" : "",
      text: isFrozen ? "Manage Freeze" : "Freeze Habit"
    });
    freezeBtn.addEventListener("click", () => {
      this.close();
      new FreezeStreakModal(this.app, this.streak, this.streakService, habitMaxFreezes, async () => {
        await this.onUpdated();
      }).open();
    });
    const editBtn = footer.createEl("button", { text: "Edit Habit..." });
    editBtn.addEventListener("click", () => {
      this.close();
      new StreakModal(this.app, this.streak, async (updated) => {
        await this.streakService.updateHabitDetails(
          this.settings.habitsFile || "Habits.md",
          this.streak.id,
          updated.name,
          updated.description,
          this.settings
        );
        await this.onUpdated();
      }).open();
    });
    const closeBtn = footer.createEl("button", { cls: "mod-cta os-modal-close-btn" });
    const closeIcon = closeBtn.createSpan({ cls: "os-modal-btn-icon" });
    (0, import_obsidian12.setIcon)(closeIcon, "x");
    closeBtn.createSpan({ text: "Close" });
    closeBtn.addEventListener("click", () => {
      this.close();
    });
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/modals/eventModal.ts
var import_obsidian13 = require("obsidian");
var EventModal = class extends import_obsidian13.Modal {
  constructor(app, event, defaultDate, onSave, onDelete) {
    super(app);
    this.title = "";
    this.startDate = "";
    this.endDate = "";
    this.isAllDay = true;
    this.startTime = "09:00";
    this.endTime = "10:00";
    this.color = "#3b82f6";
    this.location = "";
    this.description = "";
    // Recurrence
    this.recurrenceType = "none";
    this.intervalDays = 2;
    this.recurrenceUntil = "";
    // Notification
    this.enableNotification = true;
    this.notificationLeadMinutes = 10;
    this.colors = [
      { label: "Blue", hex: "#3b82f6" },
      { label: "Emerald", hex: "#10b981" },
      { label: "Grape", hex: "#8b5cf6" },
      { label: "Amber", hex: "#f59e0b" },
      { label: "Flamingo", hex: "#ef4444" },
      { label: "Peacock", hex: "#06b6d4" },
      { label: "Pink", hex: "#ec4899" },
      { label: "Indigo", hex: "#6366f1" }
    ];
    this.event = event;
    this.defaultDate = defaultDate || moment().format("YYYY-MM-DD");
    this.onSave = onSave;
    this.onDelete = onDelete;
    if (event) {
      this.title = event.title;
      this.startDate = event.startDate;
      this.endDate = event.endDate || event.startDate;
      this.isAllDay = event.isAllDay;
      this.startTime = event.startTime || "09:00";
      this.endTime = event.endTime || "10:00";
      this.color = event.color || "#3b82f6";
      this.location = event.location || "";
      this.description = event.description || "";
      if (event.recurrence) {
        this.recurrenceType = event.recurrence.type;
        this.intervalDays = event.recurrence.intervalDays || 2;
        this.recurrenceUntil = event.recurrence.until || "";
      }
      this.enableNotification = event.enableNotification !== false;
      this.notificationLeadMinutes = event.notificationLeadMinutes !== void 0 ? event.notificationLeadMinutes : 10;
    } else {
      this.startDate = this.defaultDate;
      this.endDate = this.defaultDate;
    }
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("os-event-edit-modal");
    initModalCloseButton(this);
    contentEl.createEl("h2", { text: this.event ? "Edit Event" : "Create New Event" });
    new import_obsidian13.Setting(contentEl).setName("Event Title").setDesc("Title of the event or birthday (e.g., Team Sync, John's Birthday, Gym Workout).").addText((text) => {
      text.setValue(this.title).setPlaceholder("e.g. Alex's Birthday").onChange((val) => {
        this.title = val;
      });
    });
    new import_obsidian13.Setting(contentEl).setName("Date").setDesc("Date of event occurrence.").addText((text) => {
      text.inputEl.type = "date";
      text.setValue(this.startDate).onChange((val) => {
        this.startDate = val;
        if (!this.endDate || this.endDate < val) {
          this.endDate = val;
        }
      });
    });
    let timeSetting = null;
    new import_obsidian13.Setting(contentEl).setName("All-day Event").setDesc("Check for birthdays, holidays, or all-day milestones.").addToggle((toggle) => {
      toggle.setValue(this.isAllDay).onChange((val) => {
        this.isAllDay = val;
        if (timeSetting) {
          timeSetting.settingEl.style.display = val ? "none" : "flex";
        }
      });
    });
    timeSetting = new import_obsidian13.Setting(contentEl).setName("Time (Start & End)").setDesc("Set start and end time in 24h format (HH:mm).");
    timeSetting.addText((text) => {
      text.inputEl.type = "time";
      text.setValue(this.startTime).onChange((val) => {
        this.startTime = val;
      });
    });
    timeSetting.addText((text) => {
      text.inputEl.type = "time";
      text.setValue(this.endTime).onChange((val) => {
        this.endTime = val;
      });
    });
    timeSetting.settingEl.style.display = this.isAllDay ? "none" : "flex";
    let intervalSetting = null;
    let untilSetting = null;
    new import_obsidian13.Setting(contentEl).setName("Repeat").setDesc("Set recurrence frequency (like in Google Calendar).").addDropdown((dd) => {
      dd.addOption("none", "Does not repeat");
      dd.addOption("custom_days", "Every after N days...");
      dd.addOption("daily", "Every day");
      dd.addOption("weekly", "Every week");
      dd.addOption("monthly", "Every month");
      dd.addOption("yearly", "Every year (Birthday / Anniversary)");
      dd.setValue(this.recurrenceType);
      dd.onChange((val) => {
        this.recurrenceType = val;
        updateRecurrenceUI();
      });
    });
    intervalSetting = new import_obsidian13.Setting(contentEl).setName("Repeat Interval").setDesc("Repeat every after how many days (e.g. 2 for every 2nd day).").addText((text) => {
      text.inputEl.type = "number";
      text.inputEl.min = "1";
      text.inputEl.max = "365";
      text.setValue(String(this.intervalDays)).onChange((val) => {
        const num = parseInt(val, 10);
        if (!isNaN(num) && num > 0) {
          this.intervalDays = num;
        }
      });
    });
    untilSetting = new import_obsidian13.Setting(contentEl).setName("Repeat Until").setDesc("Optional end date for repetition (leave blank to repeat indefinitely).").addText((text) => {
      text.inputEl.type = "date";
      text.setValue(this.recurrenceUntil).onChange((val) => {
        this.recurrenceUntil = val;
      });
    });
    const updateRecurrenceUI = () => {
      const showInterval = this.recurrenceType === "custom_days" || this.recurrenceType === "daily";
      const showUntil = this.recurrenceType !== "none";
      if (intervalSetting) intervalSetting.settingEl.style.display = showInterval ? "flex" : "none";
      if (untilSetting) untilSetting.settingEl.style.display = showUntil ? "flex" : "none";
    };
    updateRecurrenceUI();
    const colorSetting = new import_obsidian13.Setting(contentEl).setName("Color Accent").setDesc("Choose an Android Calendar Material You color.");
    const swatchWrap = colorSetting.controlEl.createDiv({ cls: "os-color-swatches" });
    for (const c of this.colors) {
      const swatch = swatchWrap.createDiv({
        cls: `os-color-swatch ${this.color === c.hex ? "is-selected" : ""}`,
        title: c.label
      });
      swatch.style.backgroundColor = c.hex;
      swatch.addEventListener("click", () => {
        this.color = c.hex;
        swatchWrap.querySelectorAll(".os-color-swatch").forEach((s) => s.removeClass("is-selected"));
        swatch.addClass("is-selected");
      });
    }
    new import_obsidian13.Setting(contentEl).setName("Location").setDesc("Optional venue, address, or meeting URL.").addText((text) => {
      text.setValue(this.location).setPlaceholder("e.g. Room 402, Zoom, or Starbucks").onChange((val) => {
        this.location = val;
      });
    });
    new import_obsidian13.Setting(contentEl).setName("Description").setDesc("Notes or agenda for this event.").addTextArea((ta) => {
      ta.setValue(this.description).setPlaceholder("Add notes or agenda...").onChange((val) => {
        this.description = val;
      });
    });
    let leadTimeSetting = null;
    new import_obsidian13.Setting(contentEl).setName("Reminders & Notification").setDesc("Receive notification before this event starts.").addToggle((toggle) => {
      toggle.setValue(this.enableNotification).onChange((val) => {
        this.enableNotification = val;
        if (leadTimeSetting) {
          leadTimeSetting.settingEl.style.display = val ? "flex" : "none";
        }
      });
    });
    leadTimeSetting = new import_obsidian13.Setting(contentEl).setName("Notification Lead Time").setDesc("When to trigger the reminder notice.").addDropdown((dd) => {
      dd.addOption("0", "At time of event");
      dd.addOption("5", "5 minutes before");
      dd.addOption("10", "10 minutes before");
      dd.addOption("15", "15 minutes before");
      dd.addOption("30", "30 minutes before");
      dd.addOption("60", "1 hour before");
      dd.addOption("1440", "1 day before");
      dd.setValue(String(this.notificationLeadMinutes));
      dd.onChange((val) => {
        this.notificationLeadMinutes = parseInt(val, 10);
      });
    });
    leadTimeSetting.settingEl.style.display = this.enableNotification ? "flex" : "none";
    const footerEl = contentEl.createDiv({ cls: "os-modal-footer" });
    if (this.event && this.onDelete) {
      const deleteBtn = footerEl.createEl("button", {
        cls: "mod-warning os-modal-delete-btn",
        text: "Delete Event"
      });
      deleteBtn.addEventListener("click", async () => {
        if (confirm(`Delete event "${this.title || "Untitled"}"?`)) {
          if (this.onDelete && this.event) {
            await this.onDelete(this.event.id);
          }
          this.close();
        }
      });
    }
    const cancelBtn = footerEl.createEl("button", { text: "Cancel" });
    cancelBtn.addEventListener("click", () => this.close());
    const saveBtn = footerEl.createEl("button", {
      cls: "mod-cta",
      text: this.event ? "Save Changes" : "Create Event"
    });
    saveBtn.addEventListener("click", async () => {
      const cleanTitle = this.title.trim();
      if (!cleanTitle) {
        new import_obsidian13.Notice("Please enter an event title.");
        return;
      }
      if (!this.startDate) {
        new import_obsidian13.Notice("Please select a date.");
        return;
      }
      const eventItem = {
        id: this.event ? this.event.id : `local-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        title: cleanTitle,
        startDate: this.startDate,
        endDate: this.endDate || this.startDate,
        isAllDay: this.isAllDay,
        startTime: this.isAllDay ? void 0 : this.startTime,
        endTime: this.isAllDay ? void 0 : this.endTime,
        color: this.color,
        location: this.location.trim() || void 0,
        description: this.description.trim() || void 0,
        source: "local",
        enableNotification: this.enableNotification,
        notificationLeadMinutes: this.notificationLeadMinutes,
        recurrence: this.recurrenceType !== "none" ? {
          type: this.recurrenceType,
          intervalDays: this.intervalDays,
          until: this.recurrenceUntil || void 0
        } : void 0
      };
      await this.onSave(eventItem);
      new import_obsidian13.Notice(`\u2705 Event "${cleanTitle}" saved!`);
      this.close();
    });
  }
  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
};

// src/modals/quoteModal.ts
var import_obsidian14 = require("obsidian");
var QuoteModal = class extends import_obsidian14.Modal {
  constructor(app, quote, author, onSave) {
    super(app);
    this.quote = quote;
    this.author = author;
    this.onSave = onSave;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("os-quote-modal");
    initModalCloseButton(this);
    contentEl.createEl("h2", { text: "Edit Quote Widget" });
    new import_obsidian14.Setting(contentEl).setName("Quote Text").setDesc("The motivational quote displayed in the quote card.").addTextArea((text) => {
      text.setValue(this.quote).setPlaceholder("\u201CConsistency is more important than intensity.\u201D").onChange((val) => {
        this.quote = val;
      });
      text.inputEl.rows = 4;
      text.inputEl.style.width = "100%";
    });
    new import_obsidian14.Setting(contentEl).setName("Author").setDesc("Quote author or source (optional).").addText((text) => {
      text.setValue(this.author).setPlaceholder("e.g. Marcus Aurelius").onChange((val) => {
        this.author = val;
      });
    });
    new import_obsidian14.Setting(contentEl).addButton((btn) => {
      btn.setButtonText("Cancel").onClick(() => this.close());
    }).addButton((btn) => {
      btn.setButtonText("Save Quote").setCta().onClick(async () => {
        const finalQuote = this.quote.trim();
        if (!finalQuote) {
          new import_obsidian14.Notice("Quote text cannot be empty.");
          return;
        }
        await this.onSave(finalQuote, this.author.trim());
        this.close();
      });
    });
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/modals/folderStyleModal.ts
var import_obsidian15 = require("obsidian");
var FolderStyleModal = class extends import_obsidian15.Modal {
  constructor(app, folderPath, folderName, settings, iconService, onSave) {
    super(app);
    this.folderPath = folderPath;
    this.folderName = folderName;
    this.settings = settings;
    this.iconService = iconService;
    this.onSave = onSave;
    const existing = settings.folderOverrides?.[folderPath] || settings.folderOverrides?.[folderName];
    const initialResolved = this.iconService.resolveFolderIcon(folderPath, folderName, 0, settings);
    this.currentIcon = existing?.icon || (initialResolved.type === "emoji" ? initialResolved.value : initialResolved.value || "");
    this.currentColor = existing?.color || initialResolved.color || "#3b82f6";
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("os-folder-style-modal");
    initModalCloseButton(this);
    contentEl.createEl("h2", { text: `Folder Style: ${this.folderName}` });
    const sub = contentEl.createDiv({ cls: "os-modal-desc" });
    sub.setText(`Customize the icon and color for "${this.folderPath}" in the Navigation Ribbon and throughout the dashboard.`);
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
            (0, import_obsidian15.setIcon)(previewIconWrap, this.currentIcon);
          } catch {
            (0, import_obsidian15.setIcon)(previewIconWrap, "folder");
          }
        }
      } else {
        (0, import_obsidian15.setIcon)(previewIconWrap, "folder");
      }
      previewIconWrap.style.color = this.currentColor;
    };
    updatePreview();
    new import_obsidian15.Setting(contentEl).setName("Icon").setDesc("Lucide icon name (e.g. folder, book-open, briefcase, flame) or paste an Emoji (e.g. \u{1F4DA}, \u{1F525}).").addText((text) => {
      text.setPlaceholder("e.g. book-open, briefcase, or \u{1F4DA}").setValue(this.currentIcon).onChange((val) => {
        this.currentIcon = val.trim();
        updatePreview();
      });
      text.inputEl.style.width = "100%";
    });
    const colorSetting = new import_obsidian15.Setting(contentEl).setName("Color Accent").setDesc("Select from the palette or pick a custom hex color.");
    const colorControls = colorSetting.controlEl.createDiv({ cls: "os-color-picker-group" });
    const nativeColorInput = colorControls.createEl("input", {
      type: "color",
      cls: "os-native-color-picker"
    });
    nativeColorInput.value = this.currentColor.startsWith("#") && this.currentColor.length === 7 ? this.currentColor : "#3b82f6";
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
    const swatchWrap = contentEl.createDiv({ cls: "os-color-swatches" });
    const swatches = [];
    const updateSelectedSwatch = () => {
      swatches.forEach((s) => {
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
    const btnRow = new import_obsidian15.Setting(contentEl);
    btnRow.addButton((btn) => {
      btn.setButtonText("Reset to Default").setClass("os-btn-danger").onClick(async () => {
        if (!this.settings.folderOverrides) {
          this.settings.folderOverrides = {};
        }
        delete this.settings.folderOverrides[this.folderPath];
        delete this.settings.folderOverrides[this.folderName];
        await this.onSave();
        this.close();
      });
    });
    btnRow.addButton((btn) => {
      btn.setButtonText("Cancel").onClick(() => this.close());
    });
    btnRow.addButton((btn) => {
      btn.setButtonText("Save Style").setCta().onClick(async () => {
        if (!this.settings.folderOverrides) {
          this.settings.folderOverrides = {};
        }
        this.settings.folderOverrides[this.folderPath] = {
          icon: this.currentIcon || void 0,
          color: this.currentColor || void 0
        };
        await this.onSave();
        this.close();
      });
    });
  }
  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
};

// src/modals/googleCalendarAddressModal.ts
var import_obsidian16 = require("obsidian");
var obsidian2 = __toESM(require("obsidian"));
var GoogleCalendarAddressModal = class extends import_obsidian16.Modal {
  constructor(app, settings, calendarService, onSave) {
    super(app);
    this.settings = settings;
    this.calendarService = calendarService;
    this.onSave = onSave;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("os-gcal-modal");
    initModalCloseButton(this);
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
        <li>Click the gear icon \u2699\uFE0F &rarr; <b>Settings</b>.</li>
        <li>On the left panel, click on your calendar under <i>Settings for my calendars</i>.</li>
        <li>Scroll down to <b>Integrate calendar</b> &rarr; copy the <b>Secret address in iCal format</b> (.ics).</li>
      </ol>
    `;
    const isKeychainSupported = this.calendarService.isKeychainAvailable();
    const SecretComponentClass = obsidian2.SecretComponent;
    let useKeychain = Boolean(
      this.settings.googleCalendarUseKeychain || isKeychainSupported && Boolean(this.settings.googleCalendarSecretId)
    );
    let urlValue = this.settings.googleCalendarUrl || "";
    let selectedSecretId = this.settings.googleCalendarSecretId || "";
    const formContainer = contentEl.createDiv({ cls: "os-gcal-form" });
    const renderForm = () => {
      formContainer.empty();
      if (isKeychainSupported) {
        new import_obsidian16.Setting(formContainer).setName("Store in Obsidian Keychain (SecretStorage)").setDesc("Securely encrypt and store your calendar secret in your OS Keychain instead of plaintext in settings.").addToggle((toggle) => {
          toggle.setValue(useKeychain).onChange((val) => {
            useKeychain = val;
            renderForm();
          });
        });
      }
      if (useKeychain && isKeychainSupported) {
        if (SecretComponentClass) {
          new import_obsidian16.Setting(formContainer).setName("Keychain Secret").setDesc("Select an existing secret or click '+' to create a new secret with your Google Calendar URL.").addComponent((cb) => {
            const comp = new SecretComponentClass(this.app, cb);
            comp.setValue(selectedSecretId).onChange((val) => {
              selectedSecretId = val;
            });
            return comp;
          });
        } else {
          new import_obsidian16.Setting(formContainer).setName("Keychain Secret Name").setDesc("Enter the name of your secret in Obsidian Keychain.").addText((text) => {
            text.setPlaceholder("e.g. google-calendar-url").setValue(selectedSecretId).onChange((val) => {
              selectedSecretId = val.trim();
            });
          });
        }
        const secretStorage = this.app.secretStorage;
        if (secretStorage && typeof secretStorage.setSecret === "function") {
          new import_obsidian16.Setting(formContainer).setName("Or Paste iCal Address to Save to Keychain").setDesc("Directly paste your .ics URL here to store it securely into Obsidian Keychain as 'google-calendar-url'.").addText((text) => {
            text.setPlaceholder("https://calendar.google.com/calendar/ical/.../basic.ics").setValue(urlValue).onChange((val) => {
              urlValue = val.trim();
            });
            text.inputEl.style.width = "100%";
          });
        }
      } else {
        new import_obsidian16.Setting(formContainer).setName("Secret Address in iCal format (.ics)").setDesc("Paste the private .ics URL copied from Google Calendar.").addText((text) => {
          text.setPlaceholder("https://calendar.google.com/calendar/ical/.../basic.ics").setValue(urlValue).onChange((val) => {
            urlValue = val.trim();
          });
          text.inputEl.style.width = "100%";
          setTimeout(() => text.inputEl.focus(), 50);
        });
      }
    };
    renderForm();
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
        const secretStorage = this.app.secretStorage;
        if (urlValue.trim() && secretStorage && typeof secretStorage.setSecret === "function") {
          const directUrl = urlValue.trim();
          if (!directUrl.startsWith("http://") && !directUrl.startsWith("https://")) {
            new import_obsidian16.Notice("Calendar URL must start with https:// or http://");
            return;
          }
          finalSecretId = selectedSecretId || "google-calendar-url";
          try {
            await secretStorage.setSecret(finalSecretId, directUrl);
            finalUrl = directUrl;
          } catch (err) {
            new import_obsidian16.Notice(`Failed to save to Keychain: ${err?.message || "Unknown error"}`);
            return;
          }
        } else if (finalSecretId) {
          if (secretStorage && typeof secretStorage.getSecret === "function") {
            const secret = secretStorage.getSecret(finalSecretId);
            if (!secret || !secret.trim()) {
              new import_obsidian16.Notice(`Keychain secret '${finalSecretId}' is empty or does not exist.`);
              return;
            }
            finalUrl = secret.trim();
          }
        } else {
          new import_obsidian16.Notice("Please select a Keychain secret or enter a calendar address.");
          return;
        }
      } else {
        finalUrl = urlValue.trim();
        if (!finalUrl) {
          new import_obsidian16.Notice("Please enter a Google Calendar iCal address.");
          return;
        }
        if (!finalUrl.startsWith("http://") && !finalUrl.startsWith("https://")) {
          new import_obsidian16.Notice("URL must start with https:// or http://");
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
        new import_obsidian16.Notice(
          `Synced ${events.length} events from Google Calendar${useKeychain ? " (secured via Keychain)" : ""}!`
        );
        this.close();
      } catch (err) {
        saveBtn.disabled = false;
        saveBtn.setText("Save & Sync");
        new import_obsidian16.Notice(`Sync error: ${err?.message || "Invalid URL or network error"}`);
      }
    });
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/view/renderer.ts
var DashboardRenderer = class extends import_obsidian17.Component {
  constructor(app, settings, navigationService, taskService, recentNotesService, quickCaptureService, projectService, quoteService, iconService, streakService, calendarService, deadlineService, onSaveSettings, onInternalWrite) {
    super();
    this.rootContainerEl = null;
    this.clockInterval = null;
    this.activeTodayTab = "tasks";
    this.calendarDate = moment();
    this.selectedCalendarDate = moment().format("YYYY-MM-DD");
    this.calendarViewMode = "month";
    this.calendarCardEl = null;
    this.streaksCardEl = null;
    this.embeddedGraphLeaf = null;
    this.resizeObserver = null;
    this.app = app;
    this.settings = settings;
    this.navigationService = navigationService;
    this.taskService = taskService;
    this.recentNotesService = recentNotesService;
    this.quickCaptureService = quickCaptureService;
    this.projectService = projectService;
    this.quoteService = quoteService;
    this.iconService = iconService;
    this.streakService = streakService || new StreakService(app);
    this.calendarService = calendarService || new CalendarService(app);
    this.deadlineService = deadlineService || new DeadlineService(app, this.iconService);
    this.onSaveSettings = onSaveSettings;
    this.onInternalWrite = onInternalWrite;
  }
  markInternalWrite(filePath) {
    if (this.onInternalWrite) {
      this.onInternalWrite(filePath);
    }
  }
  updateSettings(settings) {
    this.settings = settings;
  }
  destroy() {
    if (this.clockInterval !== null) {
      window.clearInterval(this.clockInterval);
      this.clockInterval = null;
    }
    if (this.embeddedGraphLeaf) {
      try {
        if (this.embeddedGraphLeaf.view) {
          this.embeddedGraphLeaf.view.saveSettings = () => {
          };
          this.embeddedGraphLeaf.view.saveState = () => {
          };
          this.embeddedGraphLeaf.view.save = () => {
          };
        }
        this.embeddedGraphLeaf.detach();
      } catch (e) {
      }
      this.embeddedGraphLeaf = null;
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }
  async render(container) {
    this.rootContainerEl = container;
    this.destroy();
    container.empty();
    container.addClass("os-dashboard-root");
    if (import_obsidian17.Platform.isMobile || import_obsidian17.Platform.isPhone) {
      const topMargin = typeof this.settings.mobileTopMargin === "number" ? this.settings.mobileTopMargin : 48;
      container.style.setProperty("--os-dashboard-mobile-top-margin", `${topMargin}px`);
    } else {
      container.style.removeProperty("--os-dashboard-mobile-top-margin");
    }
    const scrollContainer = container.createDiv({ cls: "os-dashboard-container" });
    scrollContainer.addEventListener("click", async (e) => {
      const target = e.target;
      const internalLink = target.closest("a.internal-link");
      if (internalLink) {
        e.preventDefault();
        e.stopPropagation();
        const href = internalLink.getAttribute("data-href") || internalLink.getAttribute("href");
        if (href) {
          const sourceFile = internalLink.closest("[data-source-file]")?.getAttribute("data-source-file") || "";
          const isNewLeaf = e.ctrlKey || e.metaKey || e.button === 1;
          await this.app.workspace.openLinkText(href, sourceFile, isNewLeaf);
        }
        return;
      }
      const externalLink = target.closest("a.external-link");
      if (externalLink) {
        e.preventDefault();
        e.stopPropagation();
        const href = externalLink.getAttribute("href");
        if (href) {
          window.open(href, "_blank");
        }
        return;
      }
    });
    scrollContainer.addEventListener("mouseover", (e) => {
      const target = e.target;
      const internalLink = target.closest("a.internal-link");
      if (internalLink) {
        const href = internalLink.getAttribute("data-href") || internalLink.getAttribute("href");
        if (href) {
          const sourceFile = internalLink.closest("[data-source-file]")?.getAttribute("data-source-file") || "";
          this.app.workspace.trigger("hover-link", {
            event: e,
            source: "os-dashboard",
            hoverParent: scrollContainer,
            targetEl: internalLink,
            linktext: href,
            sourcePath: sourceFile
          });
        }
      }
    });
    const bodyEl = scrollContainer.createDiv({ cls: "os-dashboard-body" });
    const layoutEl = bodyEl.createDiv({ cls: "os-dashboard-layout" });
    const mainEl = layoutEl.createDiv({ cls: "os-dashboard-main" });
    if (this.settings.showHeroBanner ?? true) {
      this.renderHero(mainEl);
    }
    if (this.settings.showNavRibbon ?? true) {
      await this.renderNavigationRibbon(mainEl);
    }
    const layout = this.getResolvedLayout();
    const isMobileView = import_obsidian17.Platform.isMobile || import_obsidian17.Platform.isPhone || container.clientWidth > 0 && container.clientWidth < 500;
    if (isMobileView) {
      await this.renderMobileWidgets(mainEl, layout);
    } else {
      let railEl = null;
      if (this.settings.showRightRail ?? true) {
        railEl = layoutEl.createDiv({ cls: "os-dashboard-side-rail" });
      }
      await Promise.all([
        this.renderMainGrid(mainEl, layout),
        railEl ? this.renderColumnWidgets(railEl, layout.rail, "rail") : Promise.resolve()
      ]);
    }
    if (!import_obsidian17.Platform.isMobile && !import_obsidian17.Platform.isPhone && typeof ResizeObserver !== "undefined") {
      let lastWasMobile = isMobileView;
      this.resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const w = entry.contentRect.width;
          if (w > 0) {
            const nowMobile = w < 500;
            if (nowMobile !== lastWasMobile) {
              lastWasMobile = nowMobile;
              this.render(container);
            }
          }
        }
      });
      this.resizeObserver.observe(container);
    }
  }
  renderHero(container) {
    const heroEl = container.createDiv({ cls: "os-dashboard-hero" });
    const DEFAULT_BANNER = "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=80";
    let bannerUrl = DEFAULT_BANNER;
    const customPath = (this.settings.bannerPath || "").trim();
    if (customPath) {
      if (customPath.startsWith("http://") || customPath.startsWith("https://")) {
        bannerUrl = customPath;
      } else {
        const bannerFile = this.app.vault.getAbstractFileByPath(customPath);
        if (bannerFile instanceof import_obsidian17.TFile) {
          bannerUrl = this.app.vault.getResourcePath(bannerFile);
        }
      }
    }
    if (bannerUrl) {
      heroEl.style.backgroundImage = `linear-gradient(180deg, rgba(13, 17, 23, 0.3) 0%, rgba(13, 17, 23, 0.85) 70%, rgba(13, 17, 23, 1) 100%), url("${bannerUrl}")`;
    }
    const topQuote = this.quoteService.getTopQuote(this.settings);
    if (topQuote) {
      const topQuoteEl = heroEl.createDiv({ cls: "os-dashboard-quote-top" });
      const lines = topQuote.split("\n");
      lines.forEach((line, idx) => {
        const lineEl = topQuoteEl.createDiv({ text: line });
        if (idx === lines.length - 1) lineEl.addClass("os-quote-italic");
      });
      topQuoteEl.createDiv({ cls: "os-quote-gold-line" });
    }
    const heroContent = heroEl.createDiv({ cls: "os-dashboard-hero-content" });
    const identityBox = heroContent.createDiv({ cls: "os-dashboard-identity" });
    const headerRow = identityBox.createDiv({ cls: "os-dashboard-header-row" });
    const avatarBox = headerRow.createDiv({ cls: "os-dashboard-avatar" });
    (0, import_obsidian17.setIcon)(avatarBox, this.settings.vaultAvatarIcon || "home");
    const titleGroup = headerRow.createDiv({ cls: "os-dashboard-title-group" });
    const vaultTitle = this.settings.vaultTitle?.trim() || this.app.vault.getName() || "Dashboard";
    titleGroup.createEl("h1", { cls: "os-dashboard-title", text: vaultTitle });
    titleGroup.createDiv({ cls: "os-dashboard-subtitle", text: this.settings.vaultSubtitle || "Think \u2022 Learn \u2022 Build \u2022 Create \u2022 Grow" });
    const mainQuote = this.quoteService.getMainQuote(this.settings);
    if (mainQuote) {
      const quoteCard = identityBox.createDiv({ cls: "os-dashboard-quote-card" });
      quoteCard.createSpan({ text: mainQuote });
    }
    const clockCard = heroContent.createDiv({ cls: "os-dashboard-clock-card" });
    const dateLabel = clockCard.createDiv({ cls: "os-dashboard-clock-date" });
    const timeLabel = clockCard.createDiv({ cls: "os-dashboard-clock-time" });
    const clockSub = clockCard.createDiv({ cls: "os-dashboard-clock-sub" });
    const updateClock = () => {
      const now = moment();
      dateLabel.setText(now.format("ddd, D MMM YYYY"));
      timeLabel.setText(now.format("HH:mm"));
    };
    updateClock();
    this.clockInterval = window.setInterval(updateClock, 1e3);
    const clockSubLines = (this.settings.clockSubtitle || "Small steps every day\nlead to big results.").split("\n");
    clockSubLines.forEach((l) => clockSub.createDiv({ text: l }));
  }
  async renderNavigationRibbon(container) {
    const folderCards = this.navigationService.getFolderCards(this.settings);
    if (folderCards.length === 0) return;
    const wrapper = container.createDiv({ cls: "os-nav-ribbon-wrapper" });
    const leftBtn = wrapper.createEl("button", {
      cls: "os-nav-scroll-btn os-nav-scroll-left is-hidden",
      title: "Scroll left"
    });
    (0, import_obsidian17.setIcon)(leftBtn, "chevron-left");
    const ribbonEl = wrapper.createDiv({ cls: "os-dashboard-nav-ribbon" });
    const rightBtn = wrapper.createEl("button", {
      cls: "os-nav-scroll-btn os-nav-scroll-right is-hidden",
      title: "Scroll right"
    });
    (0, import_obsidian17.setIcon)(rightBtn, "chevron-right");
    for (const card of folderCards) {
      const cardEl = ribbonEl.createDiv({ cls: "os-dashboard-folder-card" });
      const accentColor = card.resolvedIcon.color;
      cardEl.style.setProperty("--card-accent", accentColor);
      cardEl.style.setProperty("--card-accent-rgb", hexToRgb(accentColor));
      const iconWrap = cardEl.createDiv({ cls: "os-folder-icon-wrap" });
      this.iconService.renderIcon(iconWrap, card.resolvedIcon);
      const titleEl = cardEl.createDiv({ cls: "os-folder-title", text: card.name });
      const subtitleEl = cardEl.createDiv({ cls: "os-folder-subtitle", text: card.subtitle || (card.hasHome ? "Open Home" : "Create Note") });
      cardEl.setAttribute("title", `Click to open. Right-click to customize icon & color.`);
      cardEl.addEventListener("click", async () => {
        await this.navigationService.handleFolderClick(card, this.settings);
      });
      cardEl.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const menu = new import_obsidian17.Menu();
        menu.addItem((item) => {
          item.setTitle("Customize Icon & Color...").setIcon("palette").onClick(() => {
            new FolderStyleModal(
              this.app,
              card.path,
              card.name,
              this.settings,
              this.iconService,
              async () => {
                if (this.onSaveSettings) await this.onSaveSettings();
                if (this.rootContainerEl) await this.render(this.rootContainerEl);
              }
            ).open();
          });
        });
        const hasOverride = this.settings.folderOverrides && (this.settings.folderOverrides[card.path] || this.settings.folderOverrides[card.name]);
        if (hasOverride) {
          menu.addItem((item) => {
            item.setTitle("Reset to Default Style").setIcon("rotate-ccw").onClick(async () => {
              if (this.settings.folderOverrides) {
                delete this.settings.folderOverrides[card.path];
                delete this.settings.folderOverrides[card.name];
              }
              if (this.onSaveSettings) await this.onSaveSettings();
              if (this.rootContainerEl) await this.render(this.rootContainerEl);
            });
          });
        }
        menu.showAtMouseEvent(e);
      });
    }
    leftBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      ribbonEl.scrollBy({ left: -240, behavior: "smooth" });
    });
    rightBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      ribbonEl.scrollBy({ left: 240, behavior: "smooth" });
    });
    const updateNavButtons = () => {
      const { scrollLeft, scrollWidth, clientWidth } = ribbonEl;
      const canScroll = scrollWidth > clientWidth + 2;
      if (!canScroll) {
        leftBtn.addClass("is-hidden");
        rightBtn.addClass("is-hidden");
        return;
      }
      if (scrollLeft > 4) {
        leftBtn.removeClass("is-hidden");
      } else {
        leftBtn.addClass("is-hidden");
      }
      if (scrollLeft + clientWidth < scrollWidth - 4) {
        rightBtn.removeClass("is-hidden");
      } else {
        rightBtn.addClass("is-hidden");
      }
    };
    ribbonEl.addEventListener("scroll", updateNavButtons, { passive: true });
    window.requestAnimationFrame(() => {
      updateNavButtons();
    });
    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(() => updateNavButtons());
      ro.observe(ribbonEl);
      this.register(() => ro.disconnect());
    }
  }
  async renderMainGrid(container, layout) {
    const gridEl = container.createDiv({ cls: "os-dashboard-grid" });
    const col1 = gridEl.createDiv({ cls: "os-dashboard-col" });
    const col2 = gridEl.createDiv({ cls: "os-dashboard-col" });
    const col3 = gridEl.createDiv({ cls: "os-dashboard-col" });
    await Promise.all([
      this.renderColumnWidgets(col1, layout.col1, "col1"),
      this.renderColumnWidgets(col2, layout.col2, "col2"),
      this.renderColumnWidgets(col3, layout.col3, "col3")
    ]);
  }
  getInterleavedWidgetList(layout) {
    const result = [];
    const col1 = layout.col1 || [];
    const col2 = layout.col2 || [];
    const col3 = layout.col3 || [];
    const rail = this.settings.showRightRail ?? true ? layout.rail || [] : [];
    const maxLen = Math.max(col1.length, col2.length, col3.length, rail.length);
    for (let r = 0; r < maxLen; r++) {
      if (col1[r]) result.push({ widgetId: col1[r], colName: "col1" });
      if (col2[r]) result.push({ widgetId: col2[r], colName: "col2" });
      if (col3[r]) result.push({ widgetId: col3[r], colName: "col3" });
      if (rail[r]) result.push({ widgetId: rail[r], colName: "rail" });
    }
    return result;
  }
  async renderMobileWidgets(container, layout) {
    const mobileCol = container.createDiv({ cls: "os-dashboard-col os-dashboard-mobile-col" });
    const items = this.getInterleavedWidgetList(layout);
    for (const item of items) {
      const prevCount = mobileCol.childElementCount;
      await this.renderSingleWidget(mobileCol, item.widgetId);
      if (mobileCol.childElementCount > prevCount) {
        const cardEl = mobileCol.lastElementChild;
        this.attachDragAndDropToCard(cardEl, item.widgetId, item.colName);
      }
    }
  }
  getResolvedLayout() {
    const raw = this.settings.widgetLayout;
    const defaultCols = {
      col1: ["todayTasks", "weeklyTasks"],
      col2: ["recentNotes", "quickCapture"],
      col3: ["ongoingProjects", "deadlines", "bookmarks"],
      rail: ["calendar", "streaks", "graphView", "rightQuote"]
    };
    if (raw && Array.isArray(raw.rail)) {
      const oldDefaultSeq = ["calendar", "graphView", "streaks", "rightQuote"];
      if (raw.rail.length === 4 && raw.rail.every((v, i) => v === oldDefaultSeq[i])) {
        raw.rail = ["calendar", "streaks", "graphView", "rightQuote"];
      }
    }
    if (!raw) return defaultCols;
    const col1 = Array.isArray(raw.col1) ? [...raw.col1] : [...defaultCols.col1];
    const col2 = Array.isArray(raw.col2) ? [...raw.col2] : [...defaultCols.col2];
    const col3 = Array.isArray(raw.col3) ? [...raw.col3] : [...defaultCols.col3];
    const rail = Array.isArray(raw.rail) && raw.rail.length > 0 ? [...raw.rail] : [...defaultCols.rail];
    const placed = /* @__PURE__ */ new Set([...col1, ...col2, ...col3, ...rail]);
    for (const id of defaultCols.col1) {
      if (!placed.has(id)) {
        col1.push(id);
        placed.add(id);
      }
    }
    for (const id of defaultCols.col2) {
      if (!placed.has(id)) {
        col2.push(id);
        placed.add(id);
      }
    }
    for (const id of defaultCols.col3) {
      if (!placed.has(id)) {
        col3.push(id);
        placed.add(id);
      }
    }
    for (const id of defaultCols.rail) {
      if (!placed.has(id)) {
        rail.push(id);
        placed.add(id);
      }
    }
    for (const cw of this.settings.customWidgets || []) {
      const cid = `custom-${cw.id}`;
      if (!placed.has(cid)) {
        if (cw.column === 2) col2.push(cid);
        else if (cw.column === 3) col3.push(cid);
        else if (cw.column === "rail") rail.push(cid);
        else col1.push(cid);
        placed.add(cid);
      }
    }
    return { col1, col2, col3, rail };
  }
  async renderColumnWidgets(colEl, widgetIds, colId) {
    this.setupColumnDropZone(colEl, colId);
    let renderedCount = 0;
    for (const widgetId of widgetIds) {
      const prevCount = colEl.childElementCount;
      try {
        await this.renderSingleWidget(colEl, widgetId);
      } catch (err) {
        console.error(`[OS Dashboard] Error rendering widget "${widgetId}":`, err);
      }
      if (colEl.childElementCount > prevCount) {
        const cardEl = colEl.lastElementChild;
        this.attachDragAndDropToCard(cardEl, widgetId, colId);
        renderedCount++;
      }
    }
    if (renderedCount === 0) {
      const emptyZone = colEl.createDiv({ cls: "os-col-empty-zone" });
      emptyZone.createSpan({ cls: "os-col-empty-text", text: "Drop widget here" });
    }
  }
  async renderSingleWidget(container, widgetId) {
    switch (widgetId) {
      case "todayTasks":
        if (this.settings.showTodayTasks ?? true) {
          await this.renderTodayTasks(container);
        }
        break;
      case "weeklyTasks":
        if (this.settings.showWeeklyTasks ?? true) {
          await this.renderWeeklyTasks(container);
        }
        break;
      case "recentNotes":
        if (this.settings.showRecentNotes ?? true) {
          await this.renderRecentNotes(container);
        }
        break;
      case "quickCapture":
        if (this.settings.showQuickCapture ?? true) {
          this.renderQuickCapture(container);
        }
        break;
      case "ongoingProjects":
        if (this.settings.showOngoingProjects ?? true) {
          await this.renderOngoingProjects(container);
        }
        break;
      case "deadlines":
        if (this.settings.showDeadlines ?? true) {
          await this.renderDeadlinesWidget(container);
        }
        break;
      case "bookmarks":
        if (this.settings.showBookmarks ?? true) {
          this.renderLinksWidget(container);
        }
        break;
      case "calendar":
        if (this.settings.showCalendar ?? true) {
          await this.renderCalendarWidget(container);
        }
        break;
      case "graphView":
        if (this.settings.showGraphView ?? true) {
          await this.renderGraphWidget(container);
        }
        break;
      case "streaks":
        if (this.settings.showStreaks ?? true) {
          await this.renderStreaksWidget(container);
        }
        break;
      case "rightQuote":
        if (this.settings.showRightQuote ?? true) {
          this.renderRightQuoteWidget(container);
        }
        break;
      default:
        if (widgetId.startsWith("custom-")) {
          const rawId = widgetId.replace("custom-", "");
          const widget = (this.settings.customWidgets || []).find((w) => w.id === rawId);
          if (widget && (widget.enabled ?? true)) {
            await this.renderCustomWidget(container, widget);
          }
        }
        break;
    }
  }
  attachDragAndDropToCard(cardEl, widgetId, colId) {
    cardEl.setAttribute("data-widget-id", widgetId);
    cardEl.setAttribute("data-col-id", colId);
    cardEl.setAttribute("draggable", "true");
    const header = cardEl.querySelector(".os-card-header, .os-calendar-header");
    if (header) {
      const handle = createDiv({ cls: "os-card-drag-handle" });
      (0, import_obsidian17.setIcon)(handle, "grip-vertical");
      handle.setAttribute("title", "Drag to move widget");
      const left = header.querySelector(".os-card-header-left, .os-calendar-header-left");
      if (left) {
        left.prepend(handle);
      } else {
        header.prepend(handle);
      }
    }
    cardEl.addEventListener("dragstart", (e) => {
      const target = e.target;
      if (target.closest("button, input, textarea, select, a, .os-today-tab-btn, .os-calendar-nav-btn, .os-color-swatch, .os-task-action-btn, .os-streak-action-btn, .os-streak-actions, .os-agenda-action-btn, .os-card-header-btn")) {
        e.preventDefault();
        return;
      }
      cardEl.addClass("is-dragging");
      document.body.addClass("os-dashboard-dragging-active");
      if (e.dataTransfer) {
        e.dataTransfer.setData("text/plain", widgetId);
        e.dataTransfer.effectAllowed = "move";
      }
    });
    cardEl.addEventListener("dragend", () => {
      cardEl.removeClass("is-dragging");
      document.body.removeClass("os-dashboard-dragging-active");
      document.querySelectorAll(".os-drop-indicator-top, .os-drop-indicator-bottom, .is-drag-over").forEach((el) => {
        el.removeClass("os-drop-indicator-top");
        el.removeClass("os-drop-indicator-bottom");
        el.removeClass("is-drag-over");
      });
    });
    cardEl.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
      const rect = cardEl.getBoundingClientRect();
      const midY = rect.top + rect.height / 2;
      if (e.clientY < midY) {
        cardEl.addClass("os-drop-indicator-top");
        cardEl.removeClass("os-drop-indicator-bottom");
      } else {
        cardEl.addClass("os-drop-indicator-bottom");
        cardEl.removeClass("os-drop-indicator-top");
      }
    });
    cardEl.addEventListener("dragleave", () => {
      cardEl.removeClass("os-drop-indicator-top");
      cardEl.removeClass("os-drop-indicator-bottom");
    });
    cardEl.addEventListener("drop", async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const draggedId = e.dataTransfer?.getData("text/plain");
      if (!draggedId || draggedId === widgetId) {
        cardEl.removeClass("os-drop-indicator-top");
        cardEl.removeClass("os-drop-indicator-bottom");
        return;
      }
      const isBefore = cardEl.hasClass("os-drop-indicator-top");
      cardEl.removeClass("os-drop-indicator-top");
      cardEl.removeClass("os-drop-indicator-bottom");
      await this.moveWidget(draggedId, colId, widgetId, isBefore);
    });
  }
  setupColumnDropZone(colEl, colId) {
    colEl.setAttribute("data-col-id", colId);
    colEl.addEventListener("dragover", (e) => {
      e.preventDefault();
      if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
      colEl.addClass("is-drag-over");
    });
    colEl.addEventListener("dragleave", (e) => {
      if (!colEl.contains(e.relatedTarget)) {
        colEl.removeClass("is-drag-over");
      }
    });
    colEl.addEventListener("drop", async (e) => {
      e.preventDefault();
      colEl.removeClass("is-drag-over");
      if (e.target.closest(".os-dashboard-card")) {
        return;
      }
      const draggedId = e.dataTransfer?.getData("text/plain");
      if (!draggedId) return;
      await this.moveWidget(draggedId, colId, null, false);
    });
  }
  async moveWidget(draggedId, targetColId, targetWidgetId, insertBefore) {
    const layout = this.getResolvedLayout();
    const colKeys = ["col1", "col2", "col3", "rail"];
    for (const key of colKeys) {
      layout[key] = layout[key].filter((id) => id !== draggedId);
    }
    const targetList = layout[targetColId];
    if (!targetList) return;
    if (targetWidgetId) {
      const targetIdx = targetList.indexOf(targetWidgetId);
      if (targetIdx >= 0) {
        const insertIdx = insertBefore ? targetIdx : targetIdx + 1;
        targetList.splice(insertIdx, 0, draggedId);
      } else {
        targetList.push(draggedId);
      }
    } else {
      targetList.push(draggedId);
    }
    this.settings.widgetLayout = layout;
    if (this.onSaveSettings) {
      await this.onSaveSettings();
    }
    if (this.rootContainerEl) {
      await this.render(this.rootContainerEl);
    }
  }
  applyWidgetCustomization(widgetId, defaultTitle, defaultIcon, titleLeft, iconEl, defaultColor) {
    const custom = this.settings.widgetCustomizations?.[widgetId];
    const finalIcon = custom?.icon || defaultIcon;
    const finalColor = custom?.color || defaultColor;
    (0, import_obsidian17.setIcon)(iconEl, finalIcon);
    if (finalColor) {
      iconEl.style.color = finalColor;
      const svg = iconEl.querySelector("svg");
      if (svg) {
        svg.style.color = finalColor;
        svg.style.stroke = finalColor;
        svg.setAttribute("stroke", finalColor);
      }
    }
    const titleCol = titleLeft.createDiv({ cls: "os-card-title-col" });
    titleCol.createEl("h3", { text: custom?.title || defaultTitle });
    if (custom?.description) {
      titleCol.createSpan({ cls: "os-card-desc", text: custom.description });
    }
  }
  // --- Column 1 Widgets ---
  async renderTodayTasks(container) {
    const cardEl = container.createDiv({ cls: "os-dashboard-card os-card-tasks os-card-today-tabs" });
    const header = cardEl.createDiv({ cls: "os-card-header os-card-header-tabs" });
    const headerLeft = header.createDiv({ cls: "os-card-header-left os-today-header-left" });
    const iconEl = headerLeft.createSpan({ cls: "os-card-icon" });
    this.applyWidgetCustomization("todayTasks", "Daily", "check-circle", headerLeft, iconEl);
    const tabsWrap = headerLeft.createDiv({ cls: "os-today-tab-group" });
    const taskTabBtn = tabsWrap.createEl("button", {
      cls: `os-today-tab-btn ${this.activeTodayTab === "tasks" ? "is-active" : ""}`
    });
    taskTabBtn.setAttribute("title", "Tasks");
    taskTabBtn.setAttribute("aria-label", "Tasks");
    const taskIcon = taskTabBtn.createSpan({ cls: "os-today-tab-icon" });
    (0, import_obsidian17.setIcon)(taskIcon, "check-square");
    taskTabBtn.createSpan({ cls: "os-today-tab-label", text: "Task" });
    taskTabBtn.createSpan({ cls: "os-today-tab-count" });
    const logTabBtn = tabsWrap.createEl("button", {
      cls: `os-today-tab-btn ${this.activeTodayTab === "log" ? "is-active" : ""}`
    });
    logTabBtn.setAttribute("title", "Daily Logs");
    logTabBtn.setAttribute("aria-label", "Daily Logs");
    const logIcon = logTabBtn.createSpan({ cls: "os-today-tab-icon" });
    (0, import_obsidian17.setIcon)(logIcon, "clipboard-list");
    logTabBtn.createSpan({ cls: "os-today-tab-label", text: "Log" });
    logTabBtn.createSpan({ cls: "os-today-tab-count" });
    const overdueTabBtn = tabsWrap.createEl("button", {
      cls: `os-today-tab-btn os-tab-overdue ${this.activeTodayTab === "overdue" ? "is-active" : ""}`
    });
    overdueTabBtn.setAttribute("title", "Overdue Tasks");
    overdueTabBtn.setAttribute("aria-label", "Overdue Tasks");
    const overdueIcon = overdueTabBtn.createSpan({ cls: "os-today-tab-icon" });
    (0, import_obsidian17.setIcon)(overdueIcon, "history");
    overdueTabBtn.createSpan({ cls: "os-today-tab-label", text: "Overdue" });
    overdueTabBtn.createSpan({ cls: "os-today-tab-count is-overdue" });
    const headerRight = header.createDiv({ cls: "os-card-header-actions os-card-header-right" });
    const scheduleBtn = headerRight.createDiv({ cls: "os-card-header-btn" });
    (0, import_obsidian17.setIcon)(scheduleBtn, "calendar-plus");
    scheduleBtn.setAttribute("aria-label", "Schedule task for date");
    scheduleBtn.setAttribute("title", "Schedule task for date");
    scheduleBtn.addEventListener("click", () => {
      new ScheduleTaskModal(
        this.app,
        this.taskService,
        this.settings.dailyTasksFile,
        async () => {
          await this.renderTodayTasksRefresh(cardEl);
        }
      ).open();
    });
    const bodyEl = cardEl.createDiv({ cls: "os-today-tab-body" });
    taskTabBtn.addEventListener("click", async () => {
      if (this.activeTodayTab === "tasks") return;
      this.activeTodayTab = "tasks";
      taskTabBtn.addClass("is-active");
      logTabBtn.removeClass("is-active");
      overdueTabBtn.removeClass("is-active");
      await this.renderTodayTasksContent(bodyEl, cardEl, false);
    });
    logTabBtn.addEventListener("click", async () => {
      if (this.activeTodayTab === "log") return;
      this.activeTodayTab = "log";
      logTabBtn.addClass("is-active");
      taskTabBtn.removeClass("is-active");
      overdueTabBtn.removeClass("is-active");
      await this.renderTodayTasksContent(bodyEl, cardEl, false);
    });
    overdueTabBtn.addEventListener("click", async () => {
      if (this.activeTodayTab === "overdue") return;
      this.activeTodayTab = "overdue";
      overdueTabBtn.addClass("is-active");
      taskTabBtn.removeClass("is-active");
      logTabBtn.removeClass("is-active");
      await this.renderTodayTasksContent(bodyEl, cardEl, false);
    });
    await this.renderTodayTasksContent(bodyEl, cardEl, true);
  }
  async renderTodayTasksContent(bodyEl, cardEl, isInitial = false) {
    const planFilePath = this.settings.dailyTasksFile;
    const logFilePath = this.settings.dailyLogFile || "Daily Logs.md";
    const habitsFilePath = this.settings.habitsFile || "Habits.md";
    if (this.streakService && isInitial) {
      const habits = await this.streakService.loadHabits(habitsFilePath, this.settings.streaks || []);
      if (this.settings.autoFreezeHabits) {
        const autoRes = this.streakService.checkAndApplyAutoFreeze(habits, this.settings.maxFreezesPerMonth || 4, true);
        if (autoRes.applied) {
          this.markInternalWrite(habitsFilePath);
          await this.streakService.saveHabits(habitsFilePath, habits, this.settings.maxFreezesPerMonth || 4);
          for (const msg of autoRes.messages) {
            new import_obsidian17.Notice(`[OS Dashboard] ${msg}`);
          }
        }
      }
      this.settings.streaks = habits;
      await this.streakService.autoPopulateTasks(planFilePath, habits, this.taskService);
    }
    const [planTasks, logTasks, overdueTasks] = await Promise.all([
      this.taskService.getTodayTasks(planFilePath),
      this.taskService.getTodayTasks(logFilePath),
      this.taskService.getOverdueTasks(planFilePath)
    ]);
    const openPlanCount = planTasks.filter((t) => !t.completed).length;
    const completedLogCount = logTasks.length;
    const overdueCount = overdueTasks.length;
    const tabBtns = cardEl.querySelectorAll(".os-today-tab-btn");
    const taskBadge = tabBtns[0]?.querySelector(".os-today-tab-count");
    if (taskBadge) {
      taskBadge.textContent = openPlanCount > 0 ? `${openPlanCount}` : planTasks.length > 0 ? "\u2713" : "0";
    }
    const logBadge = tabBtns[1]?.querySelector(".os-today-tab-count");
    if (logBadge) {
      logBadge.textContent = `${completedLogCount}`;
    }
    const overdueBadge = tabBtns[2]?.querySelector(".os-today-tab-count");
    if (overdueBadge) {
      overdueBadge.textContent = `${overdueCount}`;
      if (overdueCount > 0) {
        overdueBadge.addClass("has-overdue");
      } else {
        overdueBadge.removeClass("has-overdue");
      }
    }
    bodyEl.empty();
    if (this.activeTodayTab === "tasks") {
      const listEl = bodyEl.createDiv({ cls: "os-task-list os-plan-task-list" });
      if (planTasks.length === 0) {
        listEl.createDiv({ cls: "os-empty-placeholder", text: "No tasks for today. Add one below!" });
      } else {
        for (const task of planTasks) {
          this.renderTaskRow(
            listEl,
            task,
            async () => {
              this.markInternalWrite(task.sourceFile);
              if (logFilePath) this.markInternalWrite(logFilePath);
              const tabButtons = cardEl.querySelectorAll(".os-today-tab-btn");
              const tBadge = tabButtons[0]?.querySelector(".os-today-tab-count");
              const lBadge = tabButtons[1]?.querySelector(".os-today-tab-count");
              if (tBadge) {
                const currentCount = parseInt(tBadge.textContent || "0", 10);
                if (!isNaN(currentCount)) {
                  const newCount = task.completed ? Math.max(0, currentCount - 1) : currentCount + 1;
                  tBadge.textContent = newCount > 0 ? `${newCount}` : "\u2713";
                }
              }
              if (lBadge && (this.settings.autoLogToDailyLog ?? true)) {
                const currentLog = parseInt(lBadge.textContent || "0", 10);
                if (!isNaN(currentLog)) {
                  lBadge.textContent = `${task.completed ? currentLog + 1 : Math.max(0, currentLog - 1)}`;
                }
              }
              await this.taskService.toggleTask(task.sourceFile, task.lineNumber, {
                autoLog: this.settings.autoLogToDailyLog ?? true,
                logFilePath
              });
              if (this.streakService) {
                const habits = await this.streakService.loadHabits(habitsFilePath, this.settings.streaks || []);
                const streakUpdated = this.streakService.handleTaskToggle(task.text, task.completed, habits);
                if (streakUpdated) {
                  this.markInternalWrite(habitsFilePath);
                  await this.streakService.saveHabits(habitsFilePath, habits, this.settings.maxFreezesPerMonth || 4);
                  this.settings.streaks = habits;
                  if (this.onSaveSettings) await this.onSaveSettings();
                  await this.refreshStreaksCard();
                }
              }
            },
            async (newText) => {
              this.markInternalWrite(task.sourceFile);
              if (logFilePath) this.markInternalWrite(logFilePath);
              await this.taskService.updateTask(task.sourceFile, task.lineNumber, newText, {
                autoLog: this.settings.autoLogToDailyLog ?? true,
                logFilePath
              });
              await this.renderTodayTasksRefresh(cardEl);
            },
            async () => {
              this.markInternalWrite(task.sourceFile);
              if (logFilePath) this.markInternalWrite(logFilePath);
              await this.taskService.deleteTask(task.sourceFile, task.lineNumber, {
                autoLog: this.settings.autoLogToDailyLog ?? true,
                logFilePath
              });
              await this.renderTodayTasksRefresh(cardEl);
            }
          );
        }
      }
      const addForm = bodyEl.createEl("form", { cls: "os-task-add-row" });
      addForm.setAttribute("action", "#");
      const planInput = addForm.createEl("input", {
        cls: "os-task-add-input",
        type: "text",
        placeholder: "+ Add task for today (type [[ to link)..."
      });
      planInput.setAttribute("enterkeyhint", "enter");
      const planSuggest = new WikiLinkSuggest(this.app, planInput);
      const submitPlanTask = async () => {
        const val = planInput.value.trim();
        if (!val) return;
        planInput.value = "";
        this.markInternalWrite(planFilePath);
        await this.taskService.addTask(planFilePath, val);
        await this.renderTodayTasksRefresh(cardEl);
      };
      addForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await submitPlanTask();
      });
      planInput.addEventListener("keydown", async (e) => {
        if (e.key === "Enter" || e.key === "Tab" || e.keyCode === 13 || e.keyCode === 9) {
          if (planSuggest.isSuggestOpen()) return;
          e.preventDefault();
          e.stopPropagation();
          await submitPlanTask();
        }
      });
    } else if (this.activeTodayTab === "log") {
      const listEl = bodyEl.createDiv({ cls: "os-task-list os-log-task-list" });
      if (logTasks.length === 0) {
        listEl.createDiv({ cls: "os-empty-placeholder", text: "Nothing logged yet today. Add what you did below!" });
      } else {
        for (const task of logTasks) {
          this.renderTaskRow(
            listEl,
            task,
            async () => {
              this.markInternalWrite(task.sourceFile);
              this.markInternalWrite(planFilePath);
              await this.taskService.toggleTask(task.sourceFile, task.lineNumber);
              await this.taskService.uncheckPlannedTaskMatching(planFilePath, task.text);
              if (this.streakService) {
                const habits = await this.streakService.loadHabits(habitsFilePath, this.settings.streaks || []);
                const streakUpdated = this.streakService.handleTaskToggle(task.text, false, habits);
                if (streakUpdated) {
                  this.markInternalWrite(habitsFilePath);
                  await this.streakService.saveHabits(habitsFilePath, habits, this.settings.maxFreezesPerMonth || 4);
                  this.settings.streaks = habits;
                  if (this.onSaveSettings) await this.onSaveSettings();
                  await this.refreshStreaksCard();
                }
              }
              await this.renderTodayTasksRefresh(cardEl);
            },
            async (newText) => {
              const oldText = task.text;
              this.markInternalWrite(task.sourceFile);
              this.markInternalWrite(planFilePath);
              await this.taskService.updateTask(task.sourceFile, task.lineNumber, newText);
              await this.taskService.updatePlannedTaskMatching(planFilePath, oldText, newText);
              await this.renderTodayTasksRefresh(cardEl);
            },
            async () => {
              this.markInternalWrite(task.sourceFile);
              this.markInternalWrite(planFilePath);
              await this.taskService.deleteTask(task.sourceFile, task.lineNumber);
              await this.taskService.uncheckPlannedTaskMatching(planFilePath, task.text);
              if (this.streakService) {
                const habits = await this.streakService.loadHabits(habitsFilePath, this.settings.streaks || []);
                const streakUpdated = this.streakService.handleTaskToggle(task.text, false, habits);
                if (streakUpdated) {
                  this.markInternalWrite(habitsFilePath);
                  await this.streakService.saveHabits(habitsFilePath, habits, this.settings.maxFreezesPerMonth || 4);
                  this.settings.streaks = habits;
                  if (this.onSaveSettings) await this.onSaveSettings();
                  await this.refreshStreaksCard();
                }
              }
              await this.renderTodayTasksRefresh(cardEl);
            }
          );
        }
      }
      const addForm = bodyEl.createEl("form", { cls: "os-task-add-row" });
      addForm.setAttribute("action", "#");
      const logInput = addForm.createEl("input", {
        cls: "os-task-add-input",
        type: "text",
        placeholder: "+ Log what you did today (type [[ to link)..."
      });
      logInput.setAttribute("enterkeyhint", "enter");
      const logSuggest = new WikiLinkSuggest(this.app, logInput);
      const submitLogItem = async () => {
        const val = logInput.value.trim();
        if (!val) return;
        logInput.value = "";
        this.markInternalWrite(logFilePath);
        await this.taskService.addLoggedItem(logFilePath, val);
        await this.renderTodayTasksRefresh(cardEl);
      };
      addForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await submitLogItem();
      });
      logInput.addEventListener("keydown", async (e) => {
        if (e.key === "Enter" || e.key === "Tab" || e.keyCode === 13 || e.keyCode === 9) {
          if (logSuggest.isSuggestOpen()) return;
          e.preventDefault();
          e.stopPropagation();
          await submitLogItem();
        }
      });
    } else {
      const overdueBar = bodyEl.createDiv({ cls: "os-overdue-control-bar" });
      const overdueSummary = overdueBar.createSpan({
        cls: "os-overdue-summary",
        text: overdueCount === 0 ? "No unfinished tasks" : `${overdueCount} unfinished from past`
      });
      if (overdueCount > 0) {
        const moveAllBtn = overdueBar.createEl("button", {
          cls: "os-move-all-link-btn",
          text: "Move All to Today"
        });
        moveAllBtn.addEventListener("click", async () => {
          this.markInternalWrite(planFilePath);
          await this.taskService.moveAllOverdueToToday(planFilePath);
          this.activeTodayTab = "tasks";
          await this.renderTodayTasksRefresh(cardEl);
        });
      }
      const listEl = bodyEl.createDiv({ cls: "os-task-list os-overdue-tab-list" });
      if (overdueTasks.length === 0) {
        listEl.createDiv({ cls: "os-empty-placeholder", text: "No overdue tasks! You're completely caught up." });
      } else {
        for (const task of overdueTasks) {
          const row = listEl.createDiv({ cls: "os-task-row os-overdue-row" });
          row.setAttribute("data-source-file", task.sourceFile);
          const checkWrap = row.createDiv({ cls: "os-task-checkbox" });
          (0, import_obsidian17.setIcon)(checkWrap, "square");
          checkWrap.addEventListener("click", async (e) => {
            e.stopPropagation();
            (0, import_obsidian17.setIcon)(checkWrap, "check-square");
            row.addClass("is-completed");
            this.markInternalWrite(task.sourceFile);
            await this.taskService.toggleTask(task.sourceFile, task.lineNumber);
            await this.renderTodayTasksRefresh(cardEl);
          });
          const contentWrap = row.createDiv({ cls: "os-task-content-wrap" });
          const textEl = contentWrap.createSpan({ cls: "os-task-text" });
          import_obsidian17.MarkdownRenderer.renderMarkdown(task.text, textEl, task.sourceFile, this);
          textEl.addEventListener("click", async (e) => {
            const target = e.target;
            const internalLink = target.closest("a.internal-link");
            if (internalLink) {
              e.preventDefault();
              e.stopPropagation();
              const href = internalLink.getAttribute("data-href") || internalLink.getAttribute("href");
              if (href) {
                const isNewLeaf = e.ctrlKey || e.metaKey || e.button === 1;
                await this.app.workspace.openLinkText(href, task.sourceFile, isNewLeaf);
              }
              return;
            }
            const externalLink = target.closest("a.external-link");
            if (externalLink) {
              e.preventDefault();
              e.stopPropagation();
              const href = externalLink.getAttribute("href");
              if (href) {
                window.open(href, "_blank");
              }
              return;
            }
          });
          if (task.dateHeading) {
            contentWrap.createSpan({ cls: "os-overdue-date-pill", text: task.dateHeading });
          }
          const moveBtn = row.createEl("button", {
            cls: "os-move-task-btn",
            text: "\u2192 Today",
            title: "Move to today's plan"
          });
          moveBtn.addEventListener("click", async (e) => {
            e.stopPropagation();
            this.markInternalWrite(task.sourceFile);
            this.markInternalWrite(planFilePath);
            await this.taskService.moveTaskToToday(task.sourceFile, task.lineNumber, task.text);
            await this.renderTodayTasksRefresh(cardEl);
          });
          const delBtn = row.createDiv({ cls: "os-task-action-btn is-delete", title: "Delete task" });
          (0, import_obsidian17.setIcon)(delBtn, "trash-2");
          delBtn.addEventListener("click", async (e) => {
            e.stopPropagation();
            this.markInternalWrite(task.sourceFile);
            await this.taskService.deleteTask(task.sourceFile, task.lineNumber);
            await this.renderTodayTasksRefresh(cardEl);
          });
        }
      }
    }
  }
  async renderTodayTasksRefresh(cardEl) {
    const bodyEl = cardEl.querySelector(".os-today-tab-body");
    if (!bodyEl) return;
    await this.renderTodayTasksContent(bodyEl, cardEl);
  }
  async renderWeeklyTasks(container) {
    const cardEl = container.createDiv({ cls: "os-dashboard-card os-card-tasks" });
    const header = cardEl.createDiv({ cls: "os-card-header" });
    const titleLeft = header.createDiv({ cls: "os-card-header-left" });
    const iconEl = titleLeft.createSpan({ cls: "os-card-icon" });
    this.applyWidgetCustomization("weeklyTasks", "This Week", "calendar", titleLeft, iconEl);
    const listEl = cardEl.createDiv({ cls: "os-task-list" });
    const weeklyTasks = await this.taskService.getWeeklyTasks(this.settings.weeklyTasksFile);
    if (weeklyTasks.length === 0) {
      listEl.createDiv({ cls: "os-empty-placeholder", text: "No weekly tasks set." });
    } else {
      for (const task of weeklyTasks) {
        this.renderTaskRow(listEl, task, async () => {
          this.markInternalWrite(task.sourceFile);
          await this.taskService.toggleTask(task.sourceFile, task.lineNumber);
        });
      }
    }
  }
  async renderWeeklyTasksRefresh(cardEl) {
    const listEl = cardEl.querySelector(".os-task-list");
    if (!listEl) return;
    const weeklyTasks = await this.taskService.getWeeklyTasks(this.settings.weeklyTasksFile);
    listEl.empty();
    if (weeklyTasks.length === 0) {
      listEl.createDiv({ cls: "os-empty-placeholder", text: "No weekly tasks set." });
    } else {
      for (const task of weeklyTasks) {
        this.renderTaskRow(listEl, task, async () => {
          this.markInternalWrite(task.sourceFile);
          await this.taskService.toggleTask(task.sourceFile, task.lineNumber);
        });
      }
    }
  }
  renderTaskRow(container, task, onToggle, onUpdate, onDelete) {
    const row = container.createDiv({ cls: `os-task-row ${task.completed ? "is-completed" : ""}` });
    row.setAttribute("data-source-file", task.sourceFile);
    const checkWrap = row.createDiv({ cls: "os-task-checkbox" });
    if (task.completed) {
      (0, import_obsidian17.setIcon)(checkWrap, "check-square");
    } else {
      (0, import_obsidian17.setIcon)(checkWrap, "square");
    }
    let isToggling = false;
    const handleToggle = async () => {
      if (isToggling) return;
      isToggling = true;
      const prevCompleted = task.completed;
      task.completed = !prevCompleted;
      row.toggleClass("is-completed", task.completed);
      checkWrap.empty();
      (0, import_obsidian17.setIcon)(checkWrap, task.completed ? "check-square" : "square");
      try {
        await onToggle();
      } catch (err) {
        task.completed = prevCompleted;
        row.toggleClass("is-completed", task.completed);
        checkWrap.empty();
        (0, import_obsidian17.setIcon)(checkWrap, task.completed ? "check-square" : "square");
        console.error("OS Dashboard: Failed to toggle task", err);
        new import_obsidian17.Notice("Failed to toggle task");
      } finally {
        isToggling = false;
      }
    };
    checkWrap.addEventListener("click", async (e) => {
      e.stopPropagation();
      await handleToggle();
    });
    const contentWrap = row.createDiv({ cls: "os-task-content-wrap" });
    const textEl = contentWrap.createSpan({ cls: "os-task-text" });
    import_obsidian17.MarkdownRenderer.renderMarkdown(task.text, textEl, task.sourceFile, this);
    textEl.addEventListener("click", async (e) => {
      const target = e.target;
      const internalLink = target.closest("a.internal-link");
      if (internalLink) {
        e.preventDefault();
        e.stopPropagation();
        const href = internalLink.getAttribute("data-href") || internalLink.getAttribute("href");
        if (href) {
          const isNewLeaf = e.ctrlKey || e.metaKey || e.button === 1;
          await this.app.workspace.openLinkText(href, task.sourceFile, isNewLeaf);
        }
        return;
      }
      const externalLink = target.closest("a.external-link");
      if (externalLink) {
        e.preventDefault();
        e.stopPropagation();
        const href = externalLink.getAttribute("href");
        if (href) {
          window.open(href, "_blank");
        }
        return;
      }
      await handleToggle();
    });
    const actionsWrap = row.createDiv({ cls: "os-task-actions" });
    if (onUpdate) {
      const editBtn = actionsWrap.createDiv({ cls: "os-task-action-btn", title: "Edit task" });
      (0, import_obsidian17.setIcon)(editBtn, "pencil");
      editBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.startEditingTask(row, contentWrap, task.text, onUpdate, () => {
          contentWrap.empty();
          const restoredText = contentWrap.createSpan({ cls: "os-task-text" });
          import_obsidian17.MarkdownRenderer.renderMarkdown(task.text, restoredText, task.sourceFile, this);
          restoredText.addEventListener("click", async (ev) => {
            const target = ev.target;
            const internalLink = target.closest("a.internal-link");
            if (internalLink) {
              ev.preventDefault();
              ev.stopPropagation();
              const href = internalLink.getAttribute("data-href") || internalLink.getAttribute("href");
              if (href) {
                const isNewLeaf = ev.ctrlKey || ev.metaKey || ev.button === 1;
                await this.app.workspace.openLinkText(href, task.sourceFile, isNewLeaf);
              }
              return;
            }
            const externalLink = target.closest("a.external-link");
            if (externalLink) {
              ev.preventDefault();
              ev.stopPropagation();
              const href = externalLink.getAttribute("href");
              if (href) {
                window.open(href, "_blank");
              }
              return;
            }
            await onToggle();
          });
          actionsWrap.style.display = "";
        });
        actionsWrap.style.display = "none";
      });
    }
    if (onDelete) {
      const deleteBtn = actionsWrap.createDiv({ cls: "os-task-action-btn is-delete", title: "Delete task" });
      (0, import_obsidian17.setIcon)(deleteBtn, "trash-2");
      deleteBtn.addEventListener("click", async (e) => {
        e.stopPropagation();
        await onDelete();
      });
    }
  }
  startEditingTask(row, contentWrap, initialText, onSave, onCancel) {
    contentWrap.empty();
    const editForm = contentWrap.createEl("form", { cls: "os-task-edit-form" });
    editForm.setAttribute("action", "#");
    const editInput = editForm.createEl("input", {
      cls: "os-task-edit-input",
      type: "text",
      value: initialText
    });
    editInput.setAttribute("enterkeyhint", "enter");
    const editSuggest = new WikiLinkSuggest(this.app, editInput);
    editInput.focus();
    editInput.select();
    let finished = false;
    const save = async () => {
      if (finished) return;
      finished = true;
      const val = editInput.value.trim();
      if (val && val !== initialText) {
        await onSave(val);
      } else {
        onCancel();
      }
    };
    const cancel = () => {
      if (finished) return;
      finished = true;
      onCancel();
    };
    editForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      e.stopPropagation();
      await save();
    });
    editInput.addEventListener("keydown", async (e) => {
      if (e.key === "Enter" || e.key === "Tab" || e.keyCode === 13 || e.keyCode === 9) {
        if (editSuggest.isSuggestOpen()) return;
        e.preventDefault();
        e.stopPropagation();
        await save();
      } else if (e.key === "Escape") {
        e.preventDefault();
        cancel();
      }
    });
    editInput.addEventListener("blur", () => {
      setTimeout(async () => {
        if (!finished) {
          await save();
        }
      }, 150);
    });
  }
  // --- Column 2 Widgets ---
  async renderRecentNotes(container) {
    const cardEl = container.createDiv({ cls: "os-dashboard-card os-card-recent" });
    const header = cardEl.createDiv({ cls: "os-card-header" });
    const titleLeft = header.createDiv({ cls: "os-card-header-left" });
    const iconEl = titleLeft.createSpan({ cls: "os-card-icon" });
    this.applyWidgetCustomization("recentNotes", "Recent Notes", "file-text", titleLeft, iconEl);
    const listEl = cardEl.createDiv({ cls: "os-recent-list" });
    const recentNotes = this.recentNotesService.getRecentNotes(this.settings);
    if (recentNotes.length === 0) {
      listEl.createDiv({ cls: "os-empty-placeholder", text: "No recent notes found." });
      return;
    }
    for (const note of recentNotes) {
      const row = listEl.createDiv({ cls: "os-recent-row" });
      row.setAttribute("data-file-path", note.file.path);
      const left = row.createDiv({ cls: "os-recent-left" });
      const iconWrap = left.createSpan({ cls: "os-recent-icon" });
      this.iconService.renderIcon(iconWrap, note.resolvedIcon);
      const title = left.createSpan({ cls: "os-recent-title", text: note.title });
      row.createSpan({ cls: "os-recent-time", text: note.formattedTime });
      row.addEventListener("click", (e) => {
        const isNewLeaf = e.ctrlKey || e.metaKey || e.button === 1;
        this.app.workspace.getLeaf(isNewLeaf).openFile(note.file);
      });
      row.addEventListener("mouseover", (e) => {
        this.app.workspace.trigger("hover-link", {
          event: e,
          source: "os-dashboard",
          hoverParent: listEl,
          targetEl: row,
          linktext: note.file.path,
          sourcePath: note.file.path
        });
      });
    }
  }
  renderQuickCapture(container) {
    const cardEl = container.createDiv({ cls: "os-dashboard-card os-card-capture" });
    const header = cardEl.createDiv({ cls: "os-card-header" });
    const titleLeft = header.createDiv({ cls: "os-card-header-left" });
    const iconEl = titleLeft.createSpan({ cls: "os-card-icon" });
    this.applyWidgetCustomization("quickCapture", "Quick Capture", "edit-3", titleLeft, iconEl);
    const textarea = cardEl.createEl("textarea", {
      cls: "os-capture-input",
      placeholder: "Write something... (Ctrl+Enter to save)"
    });
    const footer = cardEl.createDiv({ cls: "os-capture-footer" });
    const button = footer.createEl("button", { cls: "os-capture-button", text: "Capture" });
    const submitCapture = async () => {
      const val = textarea.value.trim();
      if (!val) return;
      this.markInternalWrite();
      button.disabled = true;
      button.setText("Saving...");
      const success = await this.quickCaptureService.capture(val, this.settings);
      if (success) {
        textarea.value = "";
        button.setText("Captured! \u2713");
        button.addClass("is-success");
        setTimeout(() => {
          button.disabled = false;
          button.setText("Capture");
          button.removeClass("is-success");
        }, 1200);
      } else {
        button.disabled = false;
        button.setText("Capture");
      }
    };
    button.addEventListener("click", submitCapture);
    textarea.addEventListener("keydown", async (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        await submitCapture();
      }
    });
  }
  // --- Column 3 Widgets ---
  async renderOngoingProjects(container) {
    const cardEl = container.createDiv({ cls: "os-dashboard-card os-card-projects" });
    const header = cardEl.createDiv({ cls: "os-card-header" });
    const titleLeft = header.createDiv({ cls: "os-card-header-left" });
    const iconEl = titleLeft.createSpan({ cls: "os-card-icon" });
    this.applyWidgetCustomization("ongoingProjects", "Ongoing Projects", "target", titleLeft, iconEl);
    const listEl = cardEl.createDiv({ cls: "os-project-list" });
    const projects = await this.projectService.getOngoingProjects(this.settings);
    if (projects.length === 0) {
      listEl.createDiv({
        cls: "os-empty-placeholder",
        text: "No active projects. Add frontmatter 'status: in-progress' to notes in Projects folder."
      });
      return;
    }
    for (const proj of projects) {
      const row = listEl.createDiv({ cls: "os-project-row" });
      row.setAttribute("data-file-path", proj.file.path);
      const left = row.createDiv({ cls: "os-project-left" });
      const iconWrap = left.createSpan({ cls: "os-project-icon" });
      this.iconService.renderIcon(iconWrap, proj.resolvedIcon);
      left.createSpan({ cls: "os-project-title", text: proj.title });
      const right = row.createDiv({ cls: "os-project-right" });
      const track = right.createDiv({ cls: "os-progress-track" });
      const fill = track.createDiv({ cls: "os-progress-fill" });
      fill.style.width = `${proj.progress}%`;
      if (proj.colorHex) {
        fill.style.backgroundColor = proj.colorHex;
      }
      right.createSpan({ cls: "os-progress-label", text: `${proj.progress}%` });
      row.addEventListener("click", (e) => {
        const isNewLeaf = e.ctrlKey || e.metaKey || e.button === 1;
        this.app.workspace.getLeaf(isNewLeaf).openFile(proj.file);
      });
      row.addEventListener("mouseover", (e) => {
        this.app.workspace.trigger("hover-link", {
          event: e,
          source: "os-dashboard",
          hoverParent: listEl,
          targetEl: row,
          linktext: proj.file.path,
          sourcePath: proj.file.path
        });
      });
    }
  }
  async renderDeadlinesWidget(container) {
    const cardEl = container.createDiv({ cls: "os-dashboard-card os-card-deadlines" });
    const header = cardEl.createDiv({ cls: "os-card-header" });
    const titleLeft = header.createDiv({ cls: "os-card-header-left" });
    const iconEl = titleLeft.createSpan({ cls: "os-card-icon" });
    this.applyWidgetCustomization("deadlines", "Deadlines", "calendar-clock", titleLeft, iconEl, "#ef4444");
    const listEl = cardEl.createDiv({ cls: "os-deadline-list" });
    const deadlines = await this.deadlineService.getDeadlines(this.settings);
    if (deadlines.length === 0) {
      listEl.createDiv({
        cls: "os-empty-placeholder",
        text: "No active deadlines found. Add 'deadline: YYYY-MM-DD' to notes in configured folders."
      });
      return;
    }
    for (const item of deadlines) {
      const row = listEl.createDiv({ cls: `os-deadline-row ${item.isOverdue ? "is-overdue" : ""}` });
      row.setAttribute("title", `${item.title} \u2022 ${item.fullTimeDescription || item.formattedTimeLeft}`);
      const left = row.createDiv({ cls: "os-deadline-left" });
      const iconWrap = left.createSpan({ cls: "os-deadline-icon" });
      this.iconService.renderIcon(iconWrap, item.resolvedIcon);
      const titleGroup = left.createDiv({ cls: "os-deadline-title-group" });
      titleGroup.createSpan({ cls: "os-deadline-title", text: item.title });
      if (item.status) {
        titleGroup.createSpan({ cls: "os-deadline-status-pill", text: item.status });
      }
      const right = row.createDiv({ cls: "os-deadline-right" });
      let badgeCls = "os-deadline-badge";
      if (item.isOverdue) {
        badgeCls += " is-overdue";
      } else if (item.isToday) {
        badgeCls += " is-today";
      } else if (item.daysLeft <= 3) {
        badgeCls += " is-urgent";
      } else if (item.daysLeft <= 7) {
        badgeCls += " is-soon";
      } else {
        badgeCls += " is-normal";
      }
      const badge = right.createSpan({ cls: badgeCls });
      badge.setAttribute("title", `${item.fullTimeDescription || item.formattedTimeLeft} \u2022 ${item.timeProgress}% timeline elapsed`);
      if (item.isOverdue) {
        const iconSpan = badge.createSpan({ cls: "os-deadline-badge-icon" });
        (0, import_obsidian17.setIcon)(iconSpan, "alert-circle");
      }
      badge.createSpan({ text: item.formattedTimeLeft });
      const circleWrap = right.createDiv({ cls: "os-deadline-circle-wrap" });
      circleWrap.setAttribute("title", `${item.timeProgress}% timeline elapsed \u2022 ${item.fullTimeDescription || item.formattedTimeLeft}`);
      circleWrap.setAttribute("aria-label", `${item.timeProgress}% time elapsed`);
      let ringColor = "var(--interactive-accent, #8b5cf6)";
      if (item.isOverdue) {
        ringColor = "#ef4444";
      } else if (item.isToday) {
        ringColor = "#f97316";
      } else if (item.daysLeft <= 3) {
        ringColor = "#f59e0b";
      } else if (item.daysLeft <= 7) {
        ringColor = "#3b82f6";
      }
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "0 0 20 20");
      svg.setAttribute("class", `os-deadline-circle ${item.isOverdue ? "is-overdue" : ""}`);
      svg.setAttribute("width", "18");
      svg.setAttribute("height", "18");
      const bgCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      bgCircle.setAttribute("cx", "10");
      bgCircle.setAttribute("cy", "10");
      bgCircle.setAttribute("r", "7.5");
      bgCircle.setAttribute("class", "os-deadline-circle-bg");
      bgCircle.setAttribute("fill", "none");
      bgCircle.setAttribute("stroke-width", "2.2");
      const circ = 2 * Math.PI * 7.5;
      const offset = circ - item.timeProgress / 100 * circ;
      const fgCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      fgCircle.setAttribute("cx", "10");
      fgCircle.setAttribute("cy", "10");
      fgCircle.setAttribute("r", "7.5");
      fgCircle.setAttribute("class", "os-deadline-circle-fg");
      fgCircle.setAttribute("fill", "none");
      fgCircle.setAttribute("stroke-width", "2.2");
      fgCircle.setAttribute("stroke", ringColor);
      fgCircle.setAttribute("stroke-dasharray", circ.toFixed(2));
      fgCircle.setAttribute("stroke-dashoffset", offset.toFixed(2));
      fgCircle.setAttribute("stroke-linecap", "round");
      fgCircle.setAttribute("transform", "rotate(-90 10 10)");
      svg.appendChild(bgCircle);
      svg.appendChild(fgCircle);
      if (item.isOverdue) {
        const centerDot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        centerDot.setAttribute("cx", "10");
        centerDot.setAttribute("cy", "10");
        centerDot.setAttribute("r", "2");
        centerDot.setAttribute("fill", "#ef4444");
        svg.appendChild(centerDot);
      }
      circleWrap.appendChild(svg);
      row.addEventListener("click", (e) => {
        const isNewLeaf = e.ctrlKey || e.metaKey || e.button === 1;
        this.app.workspace.getLeaf(isNewLeaf).openFile(item.file);
      });
      row.addEventListener("mouseover", (e) => {
        this.app.workspace.trigger("hover-link", {
          event: e,
          source: "os-dashboard",
          hoverParent: listEl,
          targetEl: row,
          linktext: item.file.path,
          sourcePath: item.file.path
        });
      });
    }
  }
  renderLinksWidget(container) {
    const cardEl = container.createDiv({ cls: "os-dashboard-card os-card-links" });
    const header = cardEl.createDiv({ cls: "os-card-header" });
    const titleLeft = header.createDiv({ cls: "os-card-header-left" });
    const iconEl = titleLeft.createSpan({ cls: "os-card-icon" });
    this.applyWidgetCustomization("bookmarks", "Links", "link-2", titleLeft, iconEl);
    const grid = cardEl.createDiv({ cls: "os-links-grid" });
    const links = this.settings.links || [];
    if (links.length === 0) {
      grid.createDiv({ cls: "os-empty-placeholder", text: "No bookmark links configured in settings." });
      return;
    }
    for (const link of links) {
      const item = grid.createDiv({ cls: "os-link-item" });
      const iconWrap = item.createSpan({ cls: "os-link-icon" });
      this.iconService.renderAnyIcon(iconWrap, link.icon, "external-link");
      item.createSpan({ cls: "os-link-title", text: link.title });
      item.addEventListener("click", () => {
        if (link.url.startsWith("http://") || link.url.startsWith("https://")) {
          window.open(link.url, "_blank");
        } else {
          const file = this.app.metadataCache.getFirstLinkpathDest(link.url, "");
          if (file instanceof import_obsidian17.TFile) {
            this.app.workspace.getLeaf(false).openFile(file);
          } else {
            new import_obsidian17.Notice(`Note not found: ${link.url}`);
          }
        }
      });
    }
  }
  async renderCustomWidgetsForColumn(container, colIndex) {
    const customWidgets = (this.settings.customWidgets || []).filter((w) => (w.enabled ?? true) && (w.column === "rail" ? colIndex === "rail" : (Number(w.column) || 1) === colIndex));
    for (const widget of customWidgets) {
      await this.renderCustomWidget(container, widget);
    }
  }
  async renderCustomWidget(container, widget) {
    const cardEl = container.createDiv({ cls: "os-dashboard-card os-card-custom" });
    const header = cardEl.createDiv({ cls: "os-card-header" });
    const titleLeft = header.createDiv({ cls: "os-card-header-left" });
    const iconEl = titleLeft.createSpan({ cls: "os-card-icon" });
    this.iconService.renderAnyIcon(iconEl, widget.icon, "sparkles", widget.color);
    const titleCol = titleLeft.createDiv({ cls: "os-card-title-col" });
    titleCol.createEl("h3", { text: widget.title || "Custom Widget" });
    if (widget.description) {
      titleCol.createSpan({ cls: "os-card-desc", text: widget.description });
    }
    if (widget.type === "markdown-note") {
      let targetPath = (widget.content || "").trim();
      if (targetPath.startsWith("[[") && targetPath.endsWith("]]")) {
        targetPath = targetPath.slice(2, -2).trim();
      }
      if (targetPath.includes("|")) {
        targetPath = targetPath.split("|")[0].trim();
      }
      const file = this.app.metadataCache.getFirstLinkpathDest(targetPath, "");
      if (file instanceof import_obsidian17.TFile) {
        cardEl.setAttribute("data-source-file", file.path);
        const openBtn = header.createDiv({ cls: "os-card-header-btn" });
        (0, import_obsidian17.setIcon)(openBtn, "external-link");
        openBtn.setAttribute("title", "Open note");
        openBtn.addEventListener("click", () => {
          this.app.workspace.getLeaf(false).openFile(file);
        });
        const bodyEl = cardEl.createDiv({ cls: "os-custom-note-body" });
        try {
          const content = await this.app.vault.read(file);
          await import_obsidian17.MarkdownRenderer.render(this.app, content, bodyEl, file.path, this);
        } catch {
          bodyEl.createDiv({ cls: "os-empty-placeholder", text: "Error loading note content." });
        }
      } else {
        cardEl.createDiv({
          cls: "os-empty-placeholder",
          text: widget.content ? `Note not found: "${widget.content}"` : "No note path specified in settings."
        });
      }
    } else if (widget.type === "custom-text") {
      const bodyEl = cardEl.createDiv({ cls: "os-custom-text-body" });
      if (widget.content) {
        await import_obsidian17.MarkdownRenderer.render(this.app, widget.content, bodyEl, "", this);
      } else {
        bodyEl.createDiv({ cls: "os-empty-placeholder", text: "No content configured." });
      }
    } else if (widget.type === "dataview") {
      const isDataviewActive = this.app.plugins?.enabledPlugins?.has("dataview") || !!this.app.plugins?.plugins?.dataview;
      const bodyEl = cardEl.createDiv({ cls: "os-custom-dataview-body" });
      if (widget.showTableHeader === false) {
        bodyEl.addClass("is-hide-header");
      }
      const refreshBtn = header.createDiv({ cls: "os-card-header-btn", title: "Refresh query" });
      (0, import_obsidian17.setIcon)(refreshBtn, "refresh-cw");
      const renderQuery = async () => {
        bodyEl.empty();
        if (!isDataviewActive) {
          const banner = bodyEl.createDiv({ cls: "os-dataview-missing-banner" });
          const bannerIcon = banner.createSpan({ cls: "os-dataview-missing-icon" });
          (0, import_obsidian17.setIcon)(bannerIcon, "alert-circle");
          banner.createSpan({
            text: "Dataview plugin is required to execute dynamic queries. Please install and enable Dataview from Community Plugins."
          });
          return;
        }
        const rawContent = (widget.content || "").trim();
        if (!rawContent) {
          bodyEl.createDiv({ cls: "os-empty-placeholder", text: "No Dataview query entered in settings." });
          return;
        }
        let formatted = rawContent;
        if (!formatted.startsWith("```")) {
          const isJs = formatted.startsWith("dv.") || formatted.includes("await dv.") || formatted.startsWith("let ") || formatted.startsWith("const ");
          const tag = isJs ? "dataviewjs" : "dataview";
          formatted = "```" + tag + "\n" + formatted + "\n```";
        }
        try {
          await import_obsidian17.MarkdownRenderer.render(this.app, formatted, bodyEl, "", this);
        } catch (err) {
          bodyEl.createDiv({
            cls: "os-empty-placeholder",
            text: `Query error: ${err?.message || "Could not render Dataview query"}`
          });
        }
      };
      refreshBtn.addEventListener("click", async () => {
        refreshBtn.addClass("is-rotating");
        await renderQuery();
        window.setTimeout(() => refreshBtn.removeClass("is-rotating"), 500);
      });
      await renderQuery();
    } else if (widget.type === "link-button") {
      const bodyEl = cardEl.createDiv({ cls: "os-custom-link-body" });
      const buttonsList = widget.buttons && widget.buttons.length > 0 ? widget.buttons : widget.content ? [{ id: "default", label: widget.title || "Open", target: widget.content }] : [];
      if (buttonsList.length === 0) {
        bodyEl.createDiv({ cls: "os-empty-placeholder", text: "No buttons configured in settings." });
      } else {
        const btnGrid = bodyEl.createDiv({ cls: "os-custom-buttons-wrap" });
        for (const btnItem of buttonsList) {
          const btn = btnGrid.createEl("button", {
            cls: "os-custom-action-btn"
          });
          if (btnItem.icon) {
            const iconSpan = btn.createSpan({ cls: "os-custom-btn-icon" });
            this.iconService.renderAnyIcon(iconSpan, btnItem.icon, "link");
          }
          btn.createSpan({ text: btnItem.label || "Open" });
          btn.addEventListener("click", () => {
            const target = (btnItem.target || "").trim();
            if (!target) return;
            if (target.startsWith("http://") || target.startsWith("https://")) {
              window.open(target, "_blank");
            } else {
              let cleanTarget = target;
              if (cleanTarget.startsWith("[[") && cleanTarget.endsWith("]]")) {
                cleanTarget = cleanTarget.slice(2, -2).trim();
              }
              if (cleanTarget.includes("|")) {
                cleanTarget = cleanTarget.split("|")[0].trim();
              }
              const file = this.app.metadataCache.getFirstLinkpathDest(cleanTarget, "");
              if (file instanceof import_obsidian17.TFile) {
                this.app.workspace.getLeaf(false).openFile(file);
              } else {
                new import_obsidian17.Notice(`Note not found: ${cleanTarget || btnItem.target}`);
              }
            }
          });
        }
      }
    }
  }
  // =========================================================================
  // --- Right Rail Widgets: Calendar, Graph view, Streaks, Quote ---
  // =========================================================================
  async renderCalendarWidget(container) {
    const cardEl = container.createDiv({ cls: "os-dashboard-card os-card-calendar" });
    this.calendarCardEl = cardEl;
    await this.renderCalendarContent(cardEl);
  }
  openEventModal(event, targetDate) {
    new EventModal(
      this.app,
      event,
      targetDate || this.selectedCalendarDate,
      async (savedEvent) => {
        const eventsFile = this.settings.calendarEventsFile || "Events.md";
        await this.calendarService.saveEventToMarkdown(eventsFile, savedEvent);
        if (!this.settings.localCalendarEvents) {
          this.settings.localCalendarEvents = [];
        }
        const existingIdx = this.settings.localCalendarEvents.findIndex((e) => e.id === savedEvent.id);
        if (existingIdx >= 0) {
          this.settings.localCalendarEvents[existingIdx] = savedEvent;
        } else {
          this.settings.localCalendarEvents.push(savedEvent);
        }
        if (this.onSaveSettings) await this.onSaveSettings();
        if (this.calendarCardEl) await this.renderCalendarContent(this.calendarCardEl);
      },
      async (eventId) => {
        if (this.settings.localCalendarEvents) {
          this.settings.localCalendarEvents = this.settings.localCalendarEvents.filter((e) => e.id !== eventId);
          if (this.onSaveSettings) await this.onSaveSettings();
          if (this.calendarCardEl) await this.renderCalendarContent(this.calendarCardEl);
        }
      }
    ).open();
  }
  async renderCalendarContent(cardEl) {
    cardEl.empty();
    const mdEvents = await this.calendarService.getLocalMarkdownEvents(this.settings.calendarEventsFile || "Events.md");
    const eventMap = /* @__PURE__ */ new Map();
    for (const e of this.settings.cachedCalendarEvents || []) {
      eventMap.set(e.id, e);
    }
    for (const e of this.settings.localCalendarEvents || []) {
      eventMap.set(e.id, e);
    }
    for (const e of mdEvents) {
      eventMap.set(e.id, e);
    }
    const events = Array.from(eventMap.values());
    const calUrl = this.calendarService.getCalendarUrl(this.settings);
    const hasAddress = Boolean(calUrl);
    const header = cardEl.createDiv({ cls: "os-calendar-header" });
    const leftWrap = header.createDiv({ cls: "os-calendar-header-left" });
    const calCustom = this.settings.widgetCustomizations?.["calendar"];
    if (calCustom?.icon) {
      const calIcon = leftWrap.createSpan({ cls: "os-card-icon" });
      (0, import_obsidian17.setIcon)(calIcon, calCustom.icon);
      if (calCustom.color) {
        calIcon.style.color = calCustom.color;
        const svg = calIcon.querySelector("svg");
        if (svg) svg.style.stroke = calCustom.color;
      }
    }
    const calTitleCol = leftWrap.createDiv({ cls: "os-card-title-col" });
    const title = calTitleCol.createDiv({
      cls: "os-calendar-title",
      text: calCustom?.title ? `${calCustom.title} (${this.calendarDate.format("MMMM YYYY")})` : this.calendarDate.format("MMMM YYYY")
    });
    title.setAttribute("title", "Click to jump to today");
    title.addEventListener("click", async () => {
      this.calendarDate = moment();
      this.selectedCalendarDate = moment().format("YYYY-MM-DD");
      await this.renderCalendarContent(cardEl);
    });
    if (calCustom?.description) {
      calTitleCol.createSpan({ cls: "os-card-desc", text: calCustom.description });
    }
    const nav = header.createDiv({ cls: "os-calendar-nav" });
    const addNavBtn = nav.createDiv({
      cls: "os-calendar-nav-btn os-calendar-add-event-btn",
      title: "Add new event"
    });
    (0, import_obsidian17.setIcon)(addNavBtn, "plus");
    addNavBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.openEventModal(null, this.selectedCalendarDate);
    });
    if (hasAddress) {
      const syncBtn = nav.createDiv({ cls: "os-calendar-nav-btn", title: "Sync Google Calendar" });
      (0, import_obsidian17.setIcon)(syncBtn, "refresh-cw");
      syncBtn.addEventListener("click", async (e) => {
        e.stopPropagation();
        syncBtn.addClass("os-spin");
        try {
          const currentUrl = this.calendarService.getCalendarUrl(this.settings);
          if (!currentUrl) throw new Error("No Google Calendar address or keychain secret configured");
          const evs = await this.calendarService.fetchEvents(currentUrl);
          this.settings.cachedCalendarEvents = evs;
          this.settings.lastCalendarSyncTime = Date.now();
          if (this.onSaveSettings) await this.onSaveSettings();
          new import_obsidian17.Notice(`Synced ${evs.length} events from Google Calendar!`);
          await this.renderCalendarContent(cardEl);
        } catch (err) {
          new import_obsidian17.Notice(`Sync error: ${err?.message || "Failed to sync"}`);
        } finally {
          syncBtn.removeClass("os-spin");
        }
      });
    }
    const viewBtn = nav.createDiv({
      cls: "os-calendar-nav-btn",
      title: this.calendarViewMode === "month" ? "Show list of this month's events" : "Show month calendar grid"
    });
    (0, import_obsidian17.setIcon)(viewBtn, this.calendarViewMode === "month" ? "list" : "calendar");
    viewBtn.addEventListener("click", async (e) => {
      e.stopPropagation();
      this.calendarViewMode = this.calendarViewMode === "month" ? "agenda" : "month";
      await this.renderCalendarContent(cardEl);
    });
    const prevBtn = nav.createDiv({ cls: "os-calendar-nav-btn", title: "Previous month" });
    (0, import_obsidian17.setIcon)(prevBtn, "chevron-left");
    prevBtn.addEventListener("click", async () => {
      this.calendarDate.subtract(1, "month");
      await this.renderCalendarContent(cardEl);
    });
    const nextBtn = nav.createDiv({ cls: "os-calendar-nav-btn", title: "Next month" });
    (0, import_obsidian17.setIcon)(nextBtn, "chevron-right");
    nextBtn.addEventListener("click", async () => {
      this.calendarDate.add(1, "month");
      await this.renderCalendarContent(cardEl);
    });
    if (this.calendarViewMode === "month") {
      this.renderMonthGrid(cardEl, events);
    } else {
      this.renderMonthEventsList(cardEl, events);
    }
    const showBanner = !hasAddress && this.settings.showGoogleCalendarBanner !== false;
    if (showBanner) {
      const banner = cardEl.createDiv({ cls: "os-calendar-address-banner" });
      const bannerLeft = banner.createDiv({ cls: "os-calendar-banner-left" });
      const bannerIcon = bannerLeft.createSpan({ cls: "os-calendar-banner-icon" });
      (0, import_obsidian17.setIcon)(bannerIcon, "calendar");
      bannerLeft.createSpan({ cls: "os-calendar-banner-text", text: "Sync Google Calendar events & reminders" });
      const bannerActions = banner.createDiv({ cls: "os-calendar-banner-actions" });
      const addAddrBtn = bannerActions.createEl("button", { cls: "os-calendar-address-btn", text: "Add Address" });
      addAddrBtn.addEventListener("click", () => {
        new GoogleCalendarAddressModal(
          this.app,
          this.settings,
          this.calendarService,
          async (result) => {
            this.settings.googleCalendarUseKeychain = result.useKeychain;
            this.settings.googleCalendarSecretId = result.secretId || "";
            this.settings.googleCalendarUrl = result.url || "";
            this.settings.cachedCalendarEvents = result.events;
            this.settings.lastCalendarSyncTime = Date.now();
            if (this.onSaveSettings) await this.onSaveSettings();
            await this.renderCalendarContent(cardEl);
          }
        ).open();
      });
      const dismissBtn = bannerActions.createDiv({
        cls: "os-calendar-banner-dismiss",
        title: "Dismiss notification (hide this banner)"
      });
      (0, import_obsidian17.setIcon)(dismissBtn, "x");
      dismissBtn.addEventListener("click", async (e) => {
        e.stopPropagation();
        this.settings.showGoogleCalendarBanner = false;
        if (this.onSaveSettings) await this.onSaveSettings();
        banner.remove();
        new import_obsidian17.Notice("Calendar banner dismissed. You can re-enable it in Settings anytime.");
      });
    }
  }
  renderMonthGrid(cardEl, events) {
    const weekdaysRow = cardEl.createDiv({ cls: "os-calendar-weekdays" });
    const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    weekdays.forEach((day) => {
      weekdaysRow.createDiv({ cls: "os-calendar-weekday", text: day });
    });
    const daysGrid = cardEl.createDiv({ cls: "os-calendar-grid" });
    const startOfMonth = this.calendarDate.clone().startOf("month");
    const daysInMonth = this.calendarDate.daysInMonth();
    let startDayOfWeek = (startOfMonth.day() + 6) % 7;
    const prevMonth = this.calendarDate.clone().subtract(1, "month");
    const daysInPrevMonth = prevMonth.daysInMonth();
    const todayStr = moment().format("YYYY-MM-DD");
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const dayNum = daysInPrevMonth - i;
      const dateStr = prevMonth.clone().date(dayNum).format("YYYY-MM-DD");
      const dayEl = daysGrid.createDiv({
        cls: "os-calendar-day is-other-month"
      });
      const numWrap = dayEl.createDiv({ cls: "os-calendar-day-num-wrap" });
      numWrap.createSpan({ cls: "os-calendar-day-num", text: String(dayNum) });
      dayEl.addEventListener("click", async () => {
        this.calendarDate.subtract(1, "month");
        this.selectedCalendarDate = dateStr;
        await this.renderCalendarContent(cardEl);
      });
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = this.calendarDate.clone().date(day).format("YYYY-MM-DD");
      const isToday = dateStr === todayStr;
      const isSelected = dateStr === this.selectedCalendarDate;
      const dayEvents = this.calendarService.getEventsForDate(events, dateStr);
      const dayEl = daysGrid.createDiv({
        cls: `os-calendar-day ${isToday ? "is-today" : ""} ${isSelected ? "is-selected" : ""}`
      });
      if (dayEvents.length > 0) {
        const eventTitles = dayEvents.map((e) => `\u2022 ${e.title} (${e.isAllDay ? "All day" : e.startTime})`).join("\n");
        dayEl.setAttribute("title", isToday ? `${dateStr} (Today):
${eventTitles}

Click to add/edit events` : `${dateStr}:
${eventTitles}

Click to add/edit events`);
      } else {
        dayEl.setAttribute("title", isToday ? `${dateStr} (Today): Click to add event` : `${dateStr}: Click to add event`);
      }
      const numWrap = dayEl.createDiv({ cls: "os-calendar-day-num-wrap" });
      numWrap.createSpan({ cls: "os-calendar-day-num", text: String(day) });
      if (isToday) {
        const todayIcon = numWrap.createSpan({ cls: "os-calendar-today-icon" });
        (0, import_obsidian17.setIcon)(todayIcon, "sparkle");
        todayIcon.setAttribute("title", "Today");
      }
      if (dayEvents.length > 0) {
        const dotsWrap = dayEl.createDiv({ cls: "os-calendar-event-dots" });
        const maxDots = Math.min(dayEvents.length, 3);
        for (let k = 0; k < maxDots; k++) {
          const dot = dotsWrap.createSpan({ cls: "os-calendar-dot" });
          if (dayEvents[k].color) {
            dot.style.backgroundColor = dayEvents[k].color;
          }
        }
      }
      dayEl.addEventListener("click", async (e) => {
        if (this.selectedCalendarDate === dateStr || e.detail === 2) {
          this.openEventModal(null, dateStr);
        } else {
          this.selectedCalendarDate = dateStr;
          await this.renderCalendarContent(cardEl);
        }
      });
    }
    const totalCells = startDayOfWeek + daysInMonth;
    const targetCells = totalCells > 35 ? 42 : 35;
    const remainingDays = targetCells - totalCells;
    for (let day = 1; day <= remainingDays; day++) {
      const nextMonth = this.calendarDate.clone().add(1, "month");
      const dateStr = nextMonth.date(day).format("YYYY-MM-DD");
      const dayEl = daysGrid.createDiv({
        cls: "os-calendar-day is-other-month"
      });
      const numWrap = dayEl.createDiv({ cls: "os-calendar-day-num-wrap" });
      numWrap.createSpan({ cls: "os-calendar-day-num", text: String(day) });
      dayEl.addEventListener("click", async () => {
        this.calendarDate.add(1, "month");
        this.selectedCalendarDate = dateStr;
        await this.renderCalendarContent(cardEl);
      });
    }
  }
  renderMonthEventsList(cardEl, events) {
    const listWrap = cardEl.createDiv({ cls: "os-calendar-agenda" });
    const daysInMonth = this.calendarDate.daysInMonth();
    const monthOccurrences = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = this.calendarDate.clone().date(day).format("YYYY-MM-DD");
      const dayEvs = this.calendarService.getEventsForDate(events, dateStr);
      for (const ev of dayEvs) {
        monthOccurrences.push({ dateStr, event: ev });
      }
    }
    if (monthOccurrences.length === 0) {
      const emptyDiv = listWrap.createDiv({ cls: "os-agenda-empty" });
      emptyDiv.createSpan({
        cls: "os-agenda-empty-text",
        text: `No events in ${this.calendarDate.format("MMMM YYYY")}.`
      });
      const quickAddBtn = emptyDiv.createEl("button", {
        cls: "os-agenda-quick-add-btn",
        text: "+ Add Event"
      });
      quickAddBtn.addEventListener("click", () => {
        this.openEventModal(null, this.selectedCalendarDate);
      });
      return;
    }
    const listEl = listWrap.createDiv({ cls: "os-agenda-list" });
    for (const item of monthOccurrences) {
      const ev = item.event;
      const mom = moment(item.dateStr, "YYYY-MM-DD");
      const itemEl = listEl.createDiv({ cls: "os-agenda-item" });
      const dateBadge = itemEl.createDiv({ cls: "os-agenda-date-badge" });
      dateBadge.createSpan({ cls: "os-agenda-date-badge-day", text: mom.format("D") });
      dateBadge.createSpan({ cls: "os-agenda-date-badge-month", text: mom.format("MMM") });
      const bar = itemEl.createDiv({ cls: "os-agenda-color-bar" });
      if (ev.color) bar.style.backgroundColor = ev.color;
      const contentBox = itemEl.createDiv({ cls: "os-agenda-content" });
      const topRow = contentBox.createDiv({ cls: "os-agenda-top-row" });
      const titleWrap = topRow.createDiv({ cls: "os-agenda-title-wrap" });
      titleWrap.createSpan({ cls: "os-agenda-event-title", text: ev.title });
      if (ev.recurrence && ev.recurrence.type !== "none") {
        const repSpan = titleWrap.createSpan({
          cls: "os-agenda-repeat-icon",
          title: `Repeats: ${ev.recurrence.type === "custom_days" ? `Every ${ev.recurrence.intervalDays || 1} days` : ev.recurrence.type}`
        });
        (0, import_obsidian17.setIcon)(repSpan, "refresh-cw");
      }
      const timeText = ev.isAllDay ? "All day" : ev.startTime ? ev.endTime ? `${ev.startTime} - ${ev.endTime}` : ev.startTime : "All day";
      topRow.createSpan({ cls: `os-agenda-event-time ${ev.isAllDay ? "is-all-day" : ""}`, text: timeText });
      if (ev.location) {
        const locRow = contentBox.createDiv({ cls: "os-agenda-sub-row" });
        const locIcon = locRow.createSpan({ cls: "os-agenda-icon" });
        (0, import_obsidian17.setIcon)(locIcon, "map-pin");
        locRow.createSpan({ text: ev.location });
      }
      if (ev.description) {
        contentBox.createDiv({ cls: "os-agenda-desc-row", text: ev.description });
      }
      itemEl.addEventListener("click", () => {
        const origEvent = this.settings.localCalendarEvents?.find((x) => x.id === ev.id) || ev;
        this.openEventModal(origEvent, item.dateStr);
      });
    }
  }
  async renderGraphWidget(container) {
    const cardEl = container.createDiv({ cls: "os-dashboard-card os-card-graph" });
    const header = cardEl.createDiv({ cls: "os-card-header" });
    const titleLeft = header.createDiv({ cls: "os-card-header-left" });
    const iconEl = titleLeft.createSpan({ cls: "os-card-icon" });
    this.applyWidgetCustomization("graphView", "Graph view", "git-fork", titleLeft, iconEl);
    const headerActions = header.createDiv({ cls: "os-card-header-actions" });
    const refreshBtn = headerActions.createDiv({ cls: "os-card-header-btn", title: "Refresh graph view" });
    (0, import_obsidian17.setIcon)(refreshBtn, "refresh-cw");
    const expandBtn = headerActions.createDiv({ cls: "os-card-header-btn", title: "Open Obsidian Graph View" });
    (0, import_obsidian17.setIcon)(expandBtn, "maximize-2");
    expandBtn.addEventListener("click", () => {
      this.app.commands?.executeCommandById("graph:open");
    });
    const graphBody = cardEl.createDiv({ cls: "os-graph-body" });
    const renderRealGraph = async () => {
      graphBody.empty();
      if (this.embeddedGraphLeaf) {
        try {
          if (this.embeddedGraphLeaf.view) {
            this.embeddedGraphLeaf.view.saveSettings = () => {
            };
            this.embeddedGraphLeaf.view.saveState = () => {
            };
            this.embeddedGraphLeaf.view.save = () => {
            };
          }
          this.embeddedGraphLeaf.detach();
        } catch (e) {
        }
        this.embeddedGraphLeaf = null;
      }
      const graphPlugin = this.app.internalPlugins?.getPluginById("graph");
      const isEnabled = graphPlugin && graphPlugin.enabled;
      if (!isEnabled) {
        const disabledDiv = graphBody.createDiv({ cls: "os-graph-disabled-box" });
        disabledDiv.createEl("p", {
          cls: "os-graph-disabled-text",
          text: "Obsidian Core Graph plugin is currently disabled."
        });
        const enableBtn = disabledDiv.createEl("button", {
          cls: "os-graph-enable-btn",
          text: "Enable Graph Plugin"
        });
        enableBtn.addEventListener("click", async () => {
          try {
            if (graphPlugin) {
              await graphPlugin.enable();
              await renderRealGraph();
            } else {
              this.app.setting?.open?.();
              this.app.setting?.openTabById?.("core-plugins");
            }
          } catch (e) {
            new import_obsidian17.Notice("Please enable Graph view in Settings > Core plugins.");
          }
        });
        return;
      }
      try {
        const leaf = new import_obsidian17.WorkspaceLeaf(this.app);
        if (leaf) {
          leaf.parent = this.app.workspace.rootSplit || this.app.workspace.activeLeaf?.parent;
          let savedGraphState = {};
          try {
            const configDir = this.app.vault.configDir || ".obsidian";
            if (await this.app.vault.adapter.exists(`${configDir}/graph.json`)) {
              const raw = await this.app.vault.adapter.read(`${configDir}/graph.json`);
              if (raw) savedGraphState = JSON.parse(raw);
            }
          } catch (e) {
          }
          await leaf.setViewState({
            type: "graph",
            state: savedGraphState
          });
          if (leaf.view && leaf.view.containerEl) {
            leaf.view.saveSettings = () => {
            };
            leaf.view.saveState = () => {
            };
            leaf.view.save = () => {
            };
            this.embeddedGraphLeaf = leaf;
            const embedWrap = graphBody.createDiv({ cls: "os-real-graph-embed" });
            embedWrap.appendChild(leaf.view.containerEl);
            const innerHeader = leaf.view.containerEl.querySelector(".view-header");
            if (innerHeader) innerHeader.style.display = "none";
            setTimeout(() => {
              try {
                leaf.view?.onResize?.();
              } catch (e) {
              }
            }, 100);
            return;
          }
        }
      } catch (err) {
        console.warn("Failed to embed native graph leaf:", err);
      }
      const fallbackDiv = graphBody.createDiv({ cls: "os-graph-disabled-box" });
      fallbackDiv.createEl("p", {
        cls: "os-graph-disabled-text",
        text: "Click below to launch Obsidian Graph View."
      });
      const openBtn = fallbackDiv.createEl("button", {
        cls: "os-graph-enable-btn",
        text: "Open Graph View"
      });
      openBtn.addEventListener("click", () => {
        this.app.commands?.executeCommandById("graph:open");
      });
    };
    await renderRealGraph();
    refreshBtn.addEventListener("click", async () => {
      refreshBtn.addClass("is-spinning");
      if (this.embeddedGraphLeaf?.view) {
        try {
          this.embeddedGraphLeaf.view?.onResize?.();
        } catch (e) {
        }
      } else {
        await renderRealGraph();
      }
      setTimeout(() => refreshBtn.removeClass("is-spinning"), 600);
    });
  }
  async refreshStreaksCard() {
    if (this.streaksCardEl) {
      await this.renderStreaksContent(this.streaksCardEl);
    }
  }
  async renderStreaksWidget(container) {
    const cardEl = container.createDiv({ cls: "os-dashboard-card os-card-streaks" });
    this.streaksCardEl = cardEl;
    await this.renderStreaksContent(cardEl);
  }
  async renderStreaksContent(cardEl) {
    cardEl.empty();
    const habitsFilePath = this.settings.habitsFile || "Habits.md";
    const archiveFilePath = this.settings.archiveHabitsFile || "99 Archive/Habits.md";
    const maxFreezes = this.settings.maxFreezesPerMonth || 4;
    const streaks = await this.streakService.loadHabits(habitsFilePath, this.settings.streaks || []);
    if (this.settings.autoFreezeHabits) {
      const autoRes = this.streakService.checkAndApplyAutoFreeze(streaks, maxFreezes, true);
      if (autoRes.applied) {
        await this.streakService.saveHabits(habitsFilePath, streaks, maxFreezes);
        for (const msg of autoRes.messages) {
          new import_obsidian17.Notice(`[OS Dashboard] ${msg}`);
        }
      }
    }
    this.settings.streaks = streaks;
    const header = cardEl.createDiv({ cls: "os-card-header" });
    const titleLeft = header.createDiv({ cls: "os-card-header-left" });
    const iconEl = titleLeft.createSpan({ cls: "os-card-icon" });
    this.applyWidgetCustomization("streaks", "Streaks", "flame", titleLeft, iconEl, "#f97316");
    const headerActions = header.createDiv({ cls: "os-card-header-actions" });
    const addBtn = headerActions.createDiv({ cls: "os-card-header-btn", title: "Add new habit" });
    (0, import_obsidian17.setIcon)(addBtn, "plus");
    addBtn.addEventListener("click", () => {
      new StreakModal(this.app, null, async (newStreak) => {
        streaks.push(newStreak);
        await this.streakService.saveHabits(habitsFilePath, streaks, maxFreezes);
        this.settings.streaks = streaks;
        if (this.onSaveSettings) {
          await this.onSaveSettings();
        } else {
          await this.renderStreaksContent(cardEl);
          const todayCard = document.querySelector(".os-card-today");
          if (todayCard) await this.renderTodayTasksRefresh(todayCard);
        }
      }).open();
    });
    const bodyEl = cardEl.createDiv({ cls: "os-streaks-body" });
    if (streaks.length === 0) {
      const emptyDiv = bodyEl.createDiv({ cls: "os-streak-empty-state" });
      emptyDiv.createEl("p", { cls: "os-streak-empty-text", text: "No streaks yet. Add habits to auto-populate them in Daily Tasks." });
      const emptyAddBtn = emptyDiv.createEl("button", { cls: "os-streak-empty-btn", text: "+ Add Habit Streak" });
      emptyAddBtn.addEventListener("click", () => {
        new StreakModal(this.app, null, async (newStreak) => {
          streaks.push(newStreak);
          await this.streakService.saveHabits(habitsFilePath, streaks, maxFreezes);
          this.settings.streaks = streaks;
          if (this.onSaveSettings) {
            await this.onSaveSettings();
          } else {
            await this.renderStreaksContent(cardEl);
            const todayCard = document.querySelector(".os-card-today");
            if (todayCard) await this.renderTodayTasksRefresh(todayCard);
          }
        }).open();
      });
      return;
    }
    for (const streak of streaks) {
      const freq = streak.frequency || "daily";
      const isFrozen = this.streakService.isFrozen(streak);
      const isDone = this.streakService.isCompletedInCurrentCycle(streak);
      const daysLeft = this.streakService.getFreezeDaysLeft(streak);
      const daysRemainingInCycle = this.streakService.getDaysRemainingInCycle(streak);
      const habitMaxFreezes = this.streakService.getEffectiveMaxFreezes(streak, maxFreezes);
      const usedFreezes = this.streakService.getFreezesUsedThisMonth(streak);
      const remainingFreezes = this.streakService.getFreezesRemainingThisMonth(streak, habitMaxFreezes);
      const streakUnit = freq === "weekly" ? streak.currentStreak === 1 ? "wk" : "wks" : freq === "monthly" ? streak.currentStreak === 1 ? "mo" : "mos" : freq === "yearly" ? streak.currentStreak === 1 ? "yr" : "yrs" : streak.currentStreak === 1 ? "day" : "days";
      const bestUnit = freq === "weekly" ? "weeks" : freq === "monthly" ? "months" : freq === "yearly" ? "years" : "days";
      const row = bodyEl.createDiv({
        cls: `os-streak-row ${isDone ? "is-completed" : ""} ${isFrozen ? "is-frozen" : ""}`
      });
      const tooltipLines = [
        `Habit: ${streak.name}`,
        ...streak.description ? [`Description: ${streak.description}`] : [],
        `Frequency: ${freq.charAt(0).toUpperCase() + freq.slice(1)}${freq !== "daily" ? ` (${streak.scheduleType === "fixed" ? "Fixed" : "Flexible"})` : ""}`,
        `Current Streak: ${streak.currentStreak || 0} ${streakUnit}`,
        `Best Streak: ${streak.bestStreak || streak.currentStreak || 0} ${bestUnit}`,
        `Start Date: ${streak.startDate || "Not specified"}`,
        `Created: ${streak.createdDate || "N/A"}`,
        `Freeze Quota: ${usedFreezes} / ${habitMaxFreezes} used (${remainingFreezes} left this ${streak.freezePeriodType || "month"})`,
        isFrozen ? `Status: Frozen until ${streak.frozenUntil} (${daysLeft} day${daysLeft === 1 ? "" : "s"} remaining)` : isDone ? `Status: Completed for this ${freq === "weekly" ? "week" : freq === "monthly" ? "month" : freq === "yearly" ? "year" : "day"}!` : `Status: Pending (${daysRemainingInCycle} day${daysRemainingInCycle === 1 ? "" : "s"} left in cycle)`
      ];
      row.setAttribute("title", tooltipLines.join("\n"));
      row.addEventListener("click", (e) => {
        const target = e.target;
        if (target.closest(".os-streak-frozen-pill, .os-streak-cycle-pill, .os-streak-action-btn, button")) {
          return;
        }
        new HabitDetailsModal(
          this.app,
          streak,
          this.streakService,
          this.settings,
          async () => {
            await this.streakService.saveHabits(habitsFilePath, streaks, maxFreezes);
            if (this.onSaveSettings) {
              await this.onSaveSettings();
            } else {
              await this.renderStreaksContent(cardEl);
              const todayCard = document.querySelector(".os-card-today");
              if (todayCard) await this.renderTodayTasksRefresh(todayCard);
            }
          }
        ).open();
      });
      row.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        const menu = new import_obsidian17.Menu();
        menu.addItem((item) => {
          item.setTitle("View Details & Calendar").setIcon("calendar").onClick(() => {
            new HabitDetailsModal(
              this.app,
              streak,
              this.streakService,
              this.settings,
              async () => {
                await this.streakService.saveHabits(habitsFilePath, streaks, maxFreezes);
                if (this.onSaveSettings) {
                  await this.onSaveSettings();
                } else {
                  await this.renderStreaksContent(cardEl);
                  const todayCard = document.querySelector(".os-card-today");
                  if (todayCard) await this.renderTodayTasksRefresh(todayCard);
                }
              }
            ).open();
          });
        });
        if (!isDone) {
          menu.addItem((item) => {
            item.setTitle("Add to Today's Plan").setIcon("calendar-plus").onClick(async () => {
              const res = await this.streakService.addHabitToToday(this.settings.dailyTasksFile, streak, this.taskService);
              new import_obsidian17.Notice(res.message);
              if (res.success) {
                const todayCard = document.querySelector(".os-card-today");
                if (todayCard) await this.renderTodayTasksRefresh(todayCard);
              }
            });
          });
        }
        menu.addItem((item) => {
          item.setTitle(isFrozen ? "Manage Freeze" : "Freeze Habit").setIcon("snowflake").onClick(() => {
            new FreezeStreakModal(this.app, streak, this.streakService, habitMaxFreezes, async () => {
              await this.streakService.saveHabits(habitsFilePath, streaks, maxFreezes);
              this.settings.streaks = streaks;
              if (this.onSaveSettings) await this.onSaveSettings();
              await this.renderStreaksContent(cardEl);
              const todayCard = document.querySelector(".os-card-today");
              if (todayCard) await this.renderTodayTasksRefresh(todayCard);
            }).open();
          });
        });
        menu.addItem((item) => {
          item.setTitle("Edit Habit...").setIcon("pencil").onClick(() => {
            new StreakModal(this.app, streak, async (updated) => {
              await this.streakService.updateHabitDetails(
                habitsFilePath,
                streak.id,
                updated.name,
                updated.description,
                this.settings
              );
              if (this.onSaveSettings) {
                await this.onSaveSettings();
              } else {
                await this.renderStreaksContent(cardEl);
                const todayCard = document.querySelector(".os-card-today");
                if (todayCard) await this.renderTodayTasksRefresh(todayCard);
              }
            }).open();
          });
        });
        menu.addItem((item) => {
          item.setTitle("Archive or Delete...").setIcon("trash-2").onClick(() => {
            new ArchiveOrDeleteStreakModal(
              this.app,
              streak,
              archiveFilePath,
              async () => {
                await this.streakService.archiveHabit(habitsFilePath, archiveFilePath, streak.id, this.settings);
                if (this.onSaveSettings) {
                  await this.onSaveSettings();
                } else {
                  await this.renderStreaksContent(cardEl);
                  const todayCard = document.querySelector(".os-card-today");
                  if (todayCard) await this.renderTodayTasksRefresh(todayCard);
                }
              },
              async () => {
                await this.streakService.deleteHabit(habitsFilePath, streak.id, this.settings);
                if (this.onSaveSettings) {
                  await this.onSaveSettings();
                } else {
                  await this.renderStreaksContent(cardEl);
                  const todayCard = document.querySelector(".os-card-today");
                  if (todayCard) await this.renderTodayTasksRefresh(todayCard);
                }
              }
            ).open();
          });
        });
        menu.showAtMouseEvent(e);
      });
      const habitIcon = row.createSpan({ cls: "os-streak-habit-icon" });
      (0, import_obsidian17.setIcon)(habitIcon, streak.icon || "flame");
      row.createSpan({ cls: "os-streak-name", text: streak.name });
      const rightWrap = row.createDiv({ cls: "os-streak-right" });
      if (isFrozen) {
        const freezePill = rightWrap.createSpan({
          cls: "os-streak-frozen-pill",
          text: `\u2744\uFE0F ${daysLeft}d left`
        });
        freezePill.setAttribute("title", `Frozen until ${streak.frozenUntil}. Click to manage freeze.`);
        freezePill.addEventListener("click", (e) => {
          e.stopPropagation();
          new FreezeStreakModal(this.app, streak, this.streakService, habitMaxFreezes, async () => {
            await this.streakService.saveHabits(habitsFilePath, streaks, maxFreezes);
            this.settings.streaks = streaks;
            if (this.onSaveSettings) {
              await this.onSaveSettings();
            } else {
              await this.renderStreaksContent(cardEl);
              const todayCard = document.querySelector(".os-card-today");
              if (todayCard) await this.renderTodayTasksRefresh(todayCard);
            }
          }).open();
        });
      } else if (freq === "weekly" || freq === "monthly" || freq === "yearly") {
        if (isDone) {
          rightWrap.createSpan({
            cls: "os-streak-count is-done-today",
            text: `\u2713 Done (${streak.currentStreak || 0} ${streakUnit})`
          });
        } else {
          const cyclePill = rightWrap.createSpan({
            cls: "os-streak-cycle-pill",
            text: `\u23F3 ${daysRemainingInCycle}d left`
          });
          cyclePill.setAttribute("title", `Due before cycle ends. Current streak: ${streak.currentStreak || 0} ${streakUnit}`);
        }
      } else {
        const countSpan = rightWrap.createSpan({
          cls: `os-streak-count ${isDone ? "is-done-today" : ""}`,
          text: `${streak.currentStreak || 0} days`
        });
        if (isDone) {
          countSpan.setAttribute("title", "Completed today in Daily Tasks!");
        }
      }
    }
  }
  renderRightQuoteWidget(container) {
    const cardEl = container.createDiv({ cls: "os-dashboard-card os-card-right-quote" });
    const header = cardEl.createDiv({ cls: "os-card-header" });
    const titleLeft = header.createDiv({ cls: "os-card-header-left" });
    const iconEl = titleLeft.createSpan({ cls: "os-card-icon" });
    this.applyWidgetCustomization("rightQuote", "Quote", "sparkles", titleLeft, iconEl);
    const headerActions = header.createDiv({ cls: "os-card-header-actions" });
    const editBtn = headerActions.createDiv({ cls: "os-card-header-btn", title: "Edit quote" });
    (0, import_obsidian17.setIcon)(editBtn, "pencil");
    const quoteText = this.settings.rightRailQuote || "\u201CConsistency is more important than intensity.\u201D";
    const bodyEl = cardEl.createDiv({ cls: "os-right-quote-body" });
    const quoteEl = bodyEl.createEl("blockquote", { cls: "os-right-quote-text", text: quoteText });
    if (this.settings.rightRailQuoteAuthor) {
      bodyEl.createDiv({ cls: "os-right-quote-author", text: `\u2014 ${this.settings.rightRailQuoteAuthor}` });
    }
    const openEditModal = () => {
      new QuoteModal(
        this.app,
        this.settings.rightRailQuote || "\u201CConsistency is more important than intensity.\u201D",
        this.settings.rightRailQuoteAuthor || "",
        async (newQuote, newAuthor) => {
          this.settings.rightRailQuote = newQuote;
          this.settings.rightRailQuoteAuthor = newAuthor;
          if (this.onSaveSettings) await this.onSaveSettings();
          if (this.rootContainerEl) await this.render(this.rootContainerEl);
        }
      ).open();
    };
    editBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openEditModal();
    });
    quoteEl.setAttribute("title", "Click to edit quote");
    quoteEl.addEventListener("click", (e) => {
      e.stopPropagation();
      openEditModal();
    });
  }
};

// src/view/osDashboardView.ts
var VIEW_TYPE_OS_DASHBOARD = "os-dashboard-view";
var OSDashboardView = class extends import_obsidian18.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.renderer = null;
    this.plugin = plugin;
    this.debouncedRefresh = (0, import_obsidian18.debounce)(() => {
      this.refresh();
    }, 400, true);
  }
  getViewType() {
    return VIEW_TYPE_OS_DASHBOARD;
  }
  getDisplayText() {
    return this.plugin.settings.vaultTitle?.trim() || this.app.vault.getName() || "OS Dashboard";
  }
  getIcon() {
    return "layout-dashboard";
  }
  isRelevantDashboardFile(filePath) {
    if (!filePath) return false;
    const s = this.plugin.settings;
    if (filePath === s.dailyTasksFile) return true;
    if (filePath === (s.dailyLogFile || "Daily Logs.md")) return true;
    if (filePath === (s.habitsFile || "Habits.md")) return true;
    if (filePath === (s.weeklyTasksFile || "Weekly Tasks.md")) return true;
    if (filePath === (s.calendarEventsFile || "Events.md")) return true;
    if (filePath === s.archiveHabitsFile) return true;
    for (const cw of s.customWidgets || []) {
      if (cw.type === "markdown-note" && cw.content && filePath === cw.content) return true;
    }
    return false;
  }
  async onOpen() {
    this.renderer = new DashboardRenderer(
      this.app,
      this.plugin.settings,
      this.plugin.navigationService,
      this.plugin.taskService,
      this.plugin.recentNotesService,
      this.plugin.quickCaptureService,
      this.plugin.projectService,
      this.plugin.quoteService,
      this.plugin.iconService,
      this.plugin.streakService,
      this.plugin.calendarService,
      this.plugin.deadlineService,
      () => this.plugin.saveSettings(),
      (filePath) => this.plugin.markInternalWrite(filePath)
    );
    await this.renderer.render(this.contentEl);
    this.registerEvent(
      this.app.vault.on("modify", (file) => {
        if (this.plugin.isInternalWrite(file.path)) return;
        if (this.isRelevantDashboardFile(file.path)) {
          this.debouncedRefresh();
        }
      })
    );
    this.registerEvent(
      this.app.vault.on("create", (file) => {
        if (this.plugin.isInternalWrite(file.path)) return;
        if (this.isRelevantDashboardFile(file.path)) {
          this.debouncedRefresh();
        }
      })
    );
    this.registerEvent(
      this.app.vault.on("delete", (file) => {
        if (this.plugin.isInternalWrite(file.path)) return;
        if (this.isRelevantDashboardFile(file.path)) {
          this.debouncedRefresh();
        }
      })
    );
  }
  async refresh() {
    if (this.renderer && this.contentEl) {
      this.renderer.updateSettings(this.plugin.settings);
      await this.renderer.render(this.contentEl);
    }
  }
  async onClose() {
    if (this.renderer) {
      this.renderer.destroy();
      this.renderer = null;
    }
  }
};

// src/services/navigationService.ts
var import_obsidian19 = require("obsidian");
var NavigationService = class {
  constructor(app, iconService) {
    this.app = app;
    this.iconService = iconService;
  }
  /**
   * Retrieves all first-level folders and checks for Home/Index files
   */
  getFolderCards(settings) {
    const root = this.app.vault.getRoot();
    const children = root.children;
    const folders = [];
    const ignored = (settings.ignoredFolders || ["_attachments", "_scripts", "_templates", "Templates", ".trash"]).map((f) => f.toLowerCase().trim());
    for (const child of children) {
      if (child instanceof import_obsidian19.TFolder) {
        const lowerName = child.name.toLowerCase();
        if (child.name.startsWith(".") || child.name.startsWith("_") || ignored.includes(lowerName)) {
          continue;
        }
        folders.push(child);
      }
    }
    folders.sort((a, b) => a.name.localeCompare(b.name, void 0, { numeric: true, sensitivity: "base" }));
    const cards = [];
    const keywords = (settings.homeKeywords || ["Home"]).map((k) => k.trim().toLowerCase()).filter(Boolean);
    const matchFolderName = settings.matchFolderName ?? true;
    folders.forEach((folder, idx) => {
      let homeFile;
      const folderNameLower = folder.name.toLowerCase();
      const folderNameClean = folder.name.replace(/^\d+[\s._-]+/, "").trim().toLowerCase();
      const mdFiles = folder.children.filter((child) => child instanceof import_obsidian19.TFile && child.extension === "md");
      if (matchFolderName) {
        homeFile = mdFiles.find((child) => {
          const baseNameLower = child.basename.toLowerCase();
          return baseNameLower === folderNameLower || folderNameClean.length > 0 && baseNameLower === folderNameClean;
        });
      }
      if (!homeFile) {
        homeFile = mdFiles.find((child) => {
          const baseNameLower = child.basename.toLowerCase();
          return keywords.some((kw) => baseNameLower.includes(kw));
        });
      }
      const iconInfo = this.iconService.resolveFolderIcon(folder.path, folder.name, idx, settings);
      cards.push({
        name: folder.name,
        path: folder.path,
        hasHome: !!homeFile,
        homeFile,
        resolvedIcon: iconInfo,
        subtitle: homeFile ? homeFile.basename : "Create new note"
      });
    });
    return cards;
  }
  /**
   * Handles user click on a folder card:
   * - If home file exists: opens home note
   * - If no home file exists: creates new file according to pattern and opens it
   */
  async handleFolderClick(card, settings) {
    if (card.hasHome && card.homeFile) {
      const leaf = this.app.workspace.getLeaf(false);
      await leaf.openFile(card.homeFile);
      return;
    }
    try {
      const pattern = getEffectiveNewFilePattern(this.app, settings.newFilePattern);
      let baseTitle = moment().format(pattern);
      if (!baseTitle || baseTitle.trim().length === 0) {
        baseTitle = "Untitled";
      }
      let filePath = `${card.path}/${baseTitle}.md`;
      let counter = 1;
      while (this.app.vault.getAbstractFileByPath(filePath)) {
        filePath = `${card.path}/${baseTitle} (${counter}).md`;
        counter++;
      }
      const initialContent = `# ${baseTitle}

`;
      const createdFile = await this.app.vault.create(filePath, initialContent);
      new import_obsidian19.Notice(`Created note in ${card.name}: ${createdFile.basename}`);
      const leaf = this.app.workspace.getLeaf(false);
      await leaf.openFile(createdFile);
    } catch (err) {
      console.error("OS Dashboard: Failed to create new note", err);
      new import_obsidian19.Notice(`Failed to create note in ${card.name}`);
    }
  }
};

// src/services/taskService.ts
var import_obsidian20 = require("obsidian");
var TaskService = class {
  constructor(app) {
    this.app = app;
  }
  /**
   * Retrieves today's tasks from the configured Daily Tasks file
   */
  async getTodayTasks(filePath) {
    const file = this.getFile(filePath);
    if (!file) return [];
    const content = await this.app.vault.read(file);
    const lines = content.split("\n");
    const todayDate = moment().format("YYYY-MM-DD");
    let insideTodaySection = false;
    const tasks = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
      if (headingMatch) {
        const headingText = headingMatch[2].trim();
        if (headingText.includes(todayDate)) {
          insideTodaySection = true;
          continue;
        } else if (insideTodaySection) {
          break;
        }
      }
      if (insideTodaySection) {
        const taskMatch = line.match(/^(\s*[-*]\s*\[([ xX])\])\s+(.*)$/);
        if (taskMatch) {
          const completed = taskMatch[2].toLowerCase() === "x";
          const text = taskMatch[3].trim();
          tasks.push({
            id: `today-${i}`,
            text,
            completed,
            lineNumber: i,
            rawLine: line,
            sourceFile: file.path,
            dateHeading: todayDate
          });
        }
      }
    }
    return tasks;
  }
  /**
   * Retrieves all unfinished tasks (- [ ]) from dates strictly before today
   */
  async getOverdueTasks(filePath) {
    const file = this.getFile(filePath);
    if (!file) return [];
    const content = await this.app.vault.read(file);
    const lines = content.split("\n");
    const todayDate = moment().format("YYYY-MM-DD");
    let currentHeadingDate = null;
    let isPastDate = false;
    const tasks = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
      if (headingMatch) {
        const headingText = headingMatch[2].trim();
        const dateMatch = headingText.match(/\b(\d{4}-\d{2}-\d{2})\b/);
        if (dateMatch) {
          currentHeadingDate = dateMatch[1];
          isPastDate = currentHeadingDate < todayDate;
        } else {
          currentHeadingDate = null;
          isPastDate = false;
        }
        continue;
      }
      if (isPastDate && currentHeadingDate) {
        const taskMatch = line.match(/^(\s*[-*]\s*\[ \])\s+(.*)$/);
        if (taskMatch) {
          const text = taskMatch[2].trim();
          tasks.push({
            id: `overdue-${i}`,
            text,
            completed: false,
            lineNumber: i,
            rawLine: line,
            sourceFile: file.path,
            dateHeading: currentHeadingDate
          });
        }
      }
    }
    return tasks;
  }
  /**
   * Moves a single overdue task from its past date heading to today's date heading
   */
  async moveTaskToToday(sourceFilePath, lineNumber, taskText) {
    const file = this.getFile(sourceFilePath);
    if (!file) return false;
    const todayDate = moment().format("YYYY-MM-DD");
    const cleanText = taskText.trim().replace(/^[-*]\s*(\[[ xX]\]\s*)?/, "");
    if (!cleanText) return false;
    try {
      await this.app.vault.process(file, (data) => {
        const lines = data.split("\n");
        if (lineNumber >= 0 && lineNumber < lines.length) {
          lines.splice(lineNumber, 1);
        }
        const headingRegex = new RegExp(`^#{1,6}\\s+.*${todayDate}`, "i");
        let headingIndex = lines.findIndex((l) => headingRegex.test(l));
        if (headingIndex !== -1) {
          let insertIndex = lines.length;
          for (let i = headingIndex + 1; i < lines.length; i++) {
            if (/^#{1,6}\s+/.test(lines[i])) {
              insertIndex = i;
              break;
            }
          }
          lines.splice(insertIndex, 0, `- [ ] ${cleanText}`);
        } else {
          if (lines.length > 0 && lines[lines.length - 1].trim() !== "") {
            lines.push("");
          }
          lines.push(`## ${todayDate}`);
          lines.push(`- [ ] ${cleanText}`);
        }
        return lines.join("\n");
      });
      return true;
    } catch (err) {
      console.error("OS Dashboard: Failed to move task to today", err);
      return false;
    }
  }
  /**
   * Moves all overdue tasks from past date headings to today's date heading in one batch
   */
  async moveAllOverdueToToday(sourceFilePath) {
    const file = this.getFile(sourceFilePath);
    if (!file) return false;
    const todayDate = moment().format("YYYY-MM-DD");
    try {
      await this.app.vault.process(file, (data) => {
        const lines = data.split("\n");
        let currentHeadingDate = null;
        let isPastDate = false;
        const tasksToMove = [];
        for (let i = lines.length - 1; i >= 0; i--) {
          const line = lines[i];
          const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
          if (headingMatch) {
            const dateMatch = headingMatch[2].match(/\b(\d{4}-\d{2}-\d{2})\b/);
            if (dateMatch) {
              currentHeadingDate = dateMatch[1];
              isPastDate = currentHeadingDate < todayDate;
            } else {
              isPastDate = false;
            }
            continue;
          }
          if (isPastDate) {
            const taskMatch = line.match(/^(\s*[-*]\s*\[ \])\s+(.*)$/);
            if (taskMatch) {
              tasksToMove.unshift(taskMatch[2].trim());
              lines.splice(i, 1);
            }
          }
        }
        if (tasksToMove.length === 0) {
          return lines.join("\n");
        }
        const headingRegex = new RegExp(`^#{1,6}\\s+.*${todayDate}`, "i");
        let headingIndex = lines.findIndex((l) => headingRegex.test(l));
        const formatted = tasksToMove.map((t) => `- [ ] ${t}`);
        if (headingIndex !== -1) {
          let insertIndex = lines.length;
          for (let i = headingIndex + 1; i < lines.length; i++) {
            if (/^#{1,6}\s+/.test(lines[i])) {
              insertIndex = i;
              break;
            }
          }
          lines.splice(insertIndex, 0, ...formatted);
        } else {
          if (lines.length > 0 && lines[lines.length - 1].trim() !== "") {
            lines.push("");
          }
          lines.push(`## ${todayDate}`);
          lines.push(...formatted);
        }
        return lines.join("\n");
      });
      return true;
    } catch (err) {
      console.error("OS Dashboard: Failed to move all overdue tasks to today", err);
      return false;
    }
  }
  async getWeeklyTasks(filePath) {
    const file = this.getFile(filePath);
    if (!file) return [];
    const content = await this.app.vault.read(file);
    const lines = content.split("\n");
    const tasks = [];
    let hasWeeklyHeading = lines.some((l) => /^#{1,6}\s+.*this\s*week/i.test(l));
    let insideWeekly = !hasWeeklyHeading;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
      if (headingMatch) {
        const headingText = headingMatch[2].trim().toLowerCase();
        if (headingText.includes("this week")) {
          insideWeekly = true;
          continue;
        } else if (insideWeekly && hasWeeklyHeading) {
          break;
        }
      }
      if (insideWeekly) {
        const taskMatch = line.match(/^(\s*[-*]\s*\[([ xX])\])\s+(.*)$/);
        if (taskMatch) {
          const completed = taskMatch[2].toLowerCase() === "x";
          const text = taskMatch[3].trim();
          tasks.push({
            id: `weekly-${i}`,
            text,
            completed,
            lineNumber: i,
            rawLine: line,
            sourceFile: file.path
          });
        }
      }
    }
    return tasks;
  }
  /**
   * Toggles task completion state directly inside the source file.
   * If autoLogPath is provided:
   * - When marked completed: appends it to the log file.
   * - When unchecked: removes the matching item from the log file under today's date.
   */
  async toggleTask(sourceFilePath, lineNumber, autoLogOptions) {
    const file = this.getFile(sourceFilePath);
    if (!file) return false;
    let taskText = null;
    let becameCompleted = false;
    let becameUnchecked = false;
    try {
      await this.app.vault.process(file, (data) => {
        const lines = data.split("\n");
        if (lineNumber >= 0 && lineNumber < lines.length) {
          const currentLine = lines[lineNumber];
          const match = currentLine.match(/^(\s*[-*]\s*\[[ xX]\])\s+(.*)$/);
          if (match) {
            taskText = match[2].trim();
          }
          if (/\[ \]/i.test(currentLine)) {
            lines[lineNumber] = currentLine.replace(/\[ \]/, "[x]");
            becameCompleted = true;
          } else if (/\[[xX]\]/.test(currentLine)) {
            lines[lineNumber] = currentLine.replace(/\[[xX]\]/, "[ ]");
            becameUnchecked = true;
          }
        }
        return lines.join("\n");
      });
      if (taskText && autoLogOptions?.autoLog && autoLogOptions?.logFilePath) {
        if (becameCompleted) {
          await this.addLoggedItem(autoLogOptions.logFilePath, taskText);
        } else if (becameUnchecked) {
          await this.removeLoggedItem(autoLogOptions.logFilePath, taskText);
        }
      }
      return true;
    } catch (err) {
      console.error("OS Dashboard: Failed to toggle task", err);
      return false;
    }
  }
  /**
   * Removes an item from the Daily Log file under today's date if it exists
   */
  async removeLoggedItem(logFilePath, text, dateHeading) {
    const cleanText = text.trim().replace(/^[-*]\s*(\[[ xX]\]\s*)?/, "");
    if (!cleanText) return false;
    const file = this.getFile(logFilePath);
    if (!file) return false;
    const targetDate = dateHeading || moment().format("YYYY-MM-DD");
    try {
      await this.app.vault.process(file, (data) => {
        const lines = data.split("\n");
        const headingRegex = new RegExp(`^#{1,6}\\s+.*${targetDate}`, "i");
        const headingIndex = lines.findIndex((l) => headingRegex.test(l));
        if (headingIndex !== -1) {
          for (let i = headingIndex + 1; i < lines.length; i++) {
            if (/^#{1,6}\s+/.test(lines[i])) {
              break;
            }
            const lineContent = lines[i].replace(/^[-*]\s*(\[[ xX]\]\s*)?/, "").trim();
            if (lineContent.toLowerCase() === cleanText.toLowerCase()) {
              lines.splice(i, 1);
              break;
            }
          }
        }
        return lines.join("\n");
      });
      return true;
    } catch (err) {
      console.error("OS Dashboard: Failed to remove item from log file", err);
      return false;
    }
  }
  /**
   * Appends multiple tasks under a date heading (can be open or completed)
   */
  async addTasks(filePath, taskTexts, dateHeading, completed = false) {
    const validTasks = taskTexts.map((t) => t.trim().replace(/^[-*]\s*(\[[ xX]\]\s*)?/, "")).filter(Boolean);
    if (validTasks.length === 0) return false;
    let file = this.getFile(filePath);
    if (!file) {
      try {
        file = await this.app.vault.create(filePath, "");
      } catch (err) {
        console.error("OS Dashboard: Could not create tasks file", err);
        return false;
      }
    }
    const targetDate = dateHeading || moment().format("YYYY-MM-DD");
    try {
      await this.app.vault.process(file, (data) => {
        const lines = data.split("\n");
        const headingRegex = new RegExp(`^#{1,6}\\s+.*${targetDate}`, "i");
        let headingIndex = lines.findIndex((l) => headingRegex.test(l));
        const mark = completed ? "[x]" : "[ ]";
        const formattedTasks = validTasks.map((t) => `- ${mark} ${t}`);
        if (headingIndex !== -1) {
          const existingUnderHeading = /* @__PURE__ */ new Set();
          let insertIndex = lines.length;
          for (let i = headingIndex + 1; i < lines.length; i++) {
            if (/^#{1,6}\s+/.test(lines[i])) {
              insertIndex = i;
              break;
            }
            const match = lines[i].match(/^[-*]\s*(\[[ xX]\]\s*)?(.*)$/);
            if (match) {
              existingUnderHeading.add(match[2].trim().toLowerCase());
            }
          }
          const tasksToInsert = validTasks.filter((t) => !existingUnderHeading.has(t.toLowerCase())).map((t) => `- ${mark} ${t}`);
          if (tasksToInsert.length === 0) {
            return lines.join("\n");
          }
          lines.splice(insertIndex, 0, ...tasksToInsert);
        } else {
          if (data.trim().length > 0) {
            lines.push("");
          }
          lines.push(`## ${targetDate}`);
          lines.push(...formattedTasks);
        }
        return lines.join("\n");
      });
      return true;
    } catch (err) {
      console.error("OS Dashboard: Failed to add tasks", err);
      return false;
    }
  }
  /**
   * Appends a new task under a date heading or file
   */
  async addTask(filePath, taskText, dateHeading, completed = false) {
    return this.addTasks(filePath, [taskText], dateHeading, completed);
  }
  /**
   * Appends an item to the Daily Log file under today's date
   * Avoids duplicate lines under today's heading
   */
  async addLoggedItem(logFilePath, text, dateHeading) {
    const cleanText = text.trim().replace(/^[-*]\s*(\[[ xX]\]\s*)?/, "");
    if (!cleanText) return false;
    let file = this.getFile(logFilePath);
    if (!file) {
      try {
        file = await this.app.vault.create(logFilePath, "");
      } catch (err) {
        console.error("OS Dashboard: Could not create log file", err);
        return false;
      }
    }
    const targetDate = dateHeading || moment().format("YYYY-MM-DD");
    try {
      await this.app.vault.process(file, (data) => {
        const lines = data.split("\n");
        const headingRegex = new RegExp(`^#{1,6}\\s+.*${targetDate}`, "i");
        let headingIndex = lines.findIndex((l) => headingRegex.test(l));
        if (headingIndex !== -1) {
          let endOfSection = lines.length;
          for (let i = headingIndex + 1; i < lines.length; i++) {
            if (/^#{1,6}\s+/.test(lines[i])) {
              endOfSection = i;
              break;
            }
            const lineContent = lines[i].replace(/^[-*]\s*(\[[ xX]\]\s*)?/, "").trim();
            if (lineContent.toLowerCase() === cleanText.toLowerCase()) {
              return lines.join("\n");
            }
          }
          lines.splice(endOfSection, 0, `- [x] ${cleanText}`);
        } else {
          if (data.trim().length > 0) {
            lines.push("");
          }
          lines.push(`## ${targetDate}`);
          lines.push(`- [x] ${cleanText}`);
        }
        return lines.join("\n");
      });
      return true;
    } catch (err) {
      console.error("OS Dashboard: Failed to append to log file", err);
      return false;
    }
  }
  /**
   * Updates a specific task's text at lineNumber in sourceFile.
   * If autoLogOptions is provided and the task was completed, also updates the corresponding log entry.
   */
  async updateTask(sourceFilePath, lineNumber, newText, autoLogOptions) {
    const file = this.getFile(sourceFilePath);
    if (!file) return false;
    const cleanNewText = newText.trim().replace(/^[-*]\s*(\[[ xX]\]\s*)?/, "");
    if (!cleanNewText) return false;
    let oldText = null;
    let isCompleted = false;
    try {
      await this.app.vault.process(file, (data) => {
        const lines = data.split("\n");
        if (lineNumber >= 0 && lineNumber < lines.length) {
          const currentLine = lines[lineNumber];
          const match = currentLine.match(/^(\s*[-*]\s*\[([ xX])\])\s+(.*)$/);
          if (match) {
            isCompleted = match[2].toLowerCase() === "x";
            oldText = match[3].trim();
            lines[lineNumber] = `${match[1]} ${cleanNewText}`;
          } else {
            lines[lineNumber] = `- [ ] ${cleanNewText}`;
          }
        }
        return lines.join("\n");
      });
      if (isCompleted && oldText && autoLogOptions?.autoLog && autoLogOptions?.logFilePath) {
        await this.updateLoggedItem(autoLogOptions.logFilePath, oldText, cleanNewText);
      }
      return true;
    } catch (err) {
      console.error("OS Dashboard: Failed to update task", err);
      return false;
    }
  }
  /**
   * Deletes a specific task line at lineNumber in sourceFile.
   * If autoLogOptions is provided and the task was completed, also removes it from the log file.
   */
  async deleteTask(sourceFilePath, lineNumber, autoLogOptions) {
    const file = this.getFile(sourceFilePath);
    if (!file) return false;
    let deletedText = null;
    let wasCompleted = false;
    try {
      await this.app.vault.process(file, (data) => {
        const lines = data.split("\n");
        if (lineNumber >= 0 && lineNumber < lines.length) {
          const match = lines[lineNumber].match(/^(\s*[-*]\s*\[([ xX])\])\s+(.*)$/);
          if (match) {
            wasCompleted = match[2].toLowerCase() === "x";
            deletedText = match[3].trim();
          }
          lines.splice(lineNumber, 1);
        }
        return lines.join("\n");
      });
      if (wasCompleted && deletedText && autoLogOptions?.autoLog && autoLogOptions?.logFilePath) {
        await this.removeLoggedItem(autoLogOptions.logFilePath, deletedText);
      }
      return true;
    } catch (err) {
      console.error("OS Dashboard: Failed to delete task", err);
      return false;
    }
  }
  /**
   * Updates an item's text in Daily Log under today's date
   */
  async updateLoggedItem(logFilePath, oldText, newText, dateHeading) {
    const cleanOld = oldText.trim().replace(/^[-*]\s*(\[[ xX]\]\s*)?/, "");
    const cleanNew = newText.trim().replace(/^[-*]\s*(\[[ xX]\]\s*)?/, "");
    if (!cleanOld || !cleanNew) return false;
    const file = this.getFile(logFilePath);
    if (!file) return false;
    const targetDate = dateHeading || moment().format("YYYY-MM-DD");
    try {
      await this.app.vault.process(file, (data) => {
        const lines = data.split("\n");
        const headingRegex = new RegExp(`^#{1,6}\\s+.*${targetDate}`, "i");
        const headingIndex = lines.findIndex((l) => headingRegex.test(l));
        if (headingIndex !== -1) {
          for (let i = headingIndex + 1; i < lines.length; i++) {
            if (/^#{1,6}\s+/.test(lines[i])) break;
            const lineContent = lines[i].replace(/^[-*]\s*(\[[ xX]\]\s*)?/, "").trim();
            if (lineContent.toLowerCase() === cleanOld.toLowerCase()) {
              lines[i] = `- [x] ${cleanNew}`;
              break;
            }
          }
        }
        return lines.join("\n");
      });
      return true;
    } catch (err) {
      console.error("OS Dashboard: Failed to update logged item", err);
      return false;
    }
  }
  /**
   * Finds and updates a matching task under today's date in Daily Tasks
   */
  async updatePlannedTaskMatching(planFilePath, oldText, newText, dateHeading) {
    const cleanOld = oldText.trim().replace(/^[-*]\s*(\[[ xX]\]\s*)?/, "");
    const cleanNew = newText.trim().replace(/^[-*]\s*(\[[ xX]\]\s*)?/, "");
    if (!cleanOld || !cleanNew) return false;
    const file = this.getFile(planFilePath);
    if (!file) return false;
    const targetDate = dateHeading || moment().format("YYYY-MM-DD");
    try {
      await this.app.vault.process(file, (data) => {
        const lines = data.split("\n");
        const headingRegex = new RegExp(`^#{1,6}\\s+.*${targetDate}`, "i");
        const headingIndex = lines.findIndex((l) => headingRegex.test(l));
        if (headingIndex !== -1) {
          for (let i = headingIndex + 1; i < lines.length; i++) {
            if (/^#{1,6}\s+/.test(lines[i])) break;
            const match = lines[i].match(/^(\s*[-*]\s*\[[ xX]\])\s+(.*)$/);
            if (match && match[2].trim().toLowerCase() === cleanOld.toLowerCase()) {
              lines[i] = `${match[1]} ${cleanNew}`;
              break;
            }
          }
        }
        return lines.join("\n");
      });
      return true;
    } catch (err) {
      console.error("OS Dashboard: Failed to sync update to planned tasks", err);
      return false;
    }
  }
  /**
   * Finds a matching completed task under today's date in Daily Tasks and unchecks it (sets it back to [ ])
   */
  async uncheckPlannedTaskMatching(planFilePath, text, dateHeading) {
    const cleanText = text.trim().replace(/^[-*]\s*(\[[ xX]\]\s*)?/, "");
    if (!cleanText) return false;
    const file = this.getFile(planFilePath);
    if (!file) return false;
    const targetDate = dateHeading || moment().format("YYYY-MM-DD");
    try {
      await this.app.vault.process(file, (data) => {
        const lines = data.split("\n");
        const headingRegex = new RegExp(`^#{1,6}\\s+.*${targetDate}`, "i");
        const headingIndex = lines.findIndex((l) => headingRegex.test(l));
        if (headingIndex !== -1) {
          for (let i = headingIndex + 1; i < lines.length; i++) {
            if (/^#{1,6}\s+/.test(lines[i])) break;
            const match = lines[i].match(/^(\s*[-*]\s*\[[xX]\])\s+(.*)$/);
            if (match && match[2].trim().toLowerCase() === cleanText.toLowerCase()) {
              lines[i] = lines[i].replace(/\[[xX]\]/, "[ ]");
              break;
            }
          }
        }
        return lines.join("\n");
      });
      return true;
    } catch (err) {
      console.error("OS Dashboard: Failed to sync uncheck to planned tasks", err);
      return false;
    }
  }
  getFile(path) {
    const file = this.app.vault.getAbstractFileByPath(path);
    if (file instanceof import_obsidian20.TFile && file.extension === "md") {
      return file;
    }
    const allFiles = this.app.vault.getMarkdownFiles();
    const cleanPath = path.toLowerCase().replace(/\.md$/, "");
    return allFiles.find((f) => f.basename.toLowerCase() === cleanPath || f.path.toLowerCase() === path.toLowerCase()) || null;
  }
};

// src/services/recentNotesService.ts
var RecentNotesService = class {
  constructor(app, iconService) {
    this.app = app;
    this.iconService = iconService;
  }
  getRecentNotes(settings) {
    const allFiles = this.app.vault.getMarkdownFiles();
    const excludeFolders = (settings.recentNotesExcludeFolders || []).map((f) => f.toLowerCase().trim()).filter(Boolean);
    const filtered = allFiles.filter((file) => {
      const lowerPath = file.path.toLowerCase();
      if (lowerPath.startsWith(".")) return false;
      for (const ex of excludeFolders) {
        if (lowerPath.includes(ex)) return false;
      }
      return true;
    });
    filtered.sort((a, b) => b.stat.mtime - a.stat.mtime);
    const limit = settings.recentNotesLimit || 8;
    const topFiles = filtered.slice(0, limit);
    return topFiles.map((file) => {
      return {
        file,
        title: file.basename,
        formattedTime: this.formatRelativeTime(file.stat.mtime),
        resolvedIcon: this.iconService.resolveFileFolderIcon(file, settings)
      };
    });
  }
  formatRelativeTime(mtime) {
    const fileMoment = moment(mtime);
    const now = moment();
    if (fileMoment.isSame(now, "day")) {
      return `Today ${fileMoment.format("HH:mm")}`;
    }
    if (fileMoment.isSame(now.clone().subtract(1, "day"), "day")) {
      return "Yesterday";
    }
    if (fileMoment.isSame(now.clone().subtract(2, "days"), "day")) {
      return "2 days ago";
    }
    if (fileMoment.isSame(now, "year")) {
      return fileMoment.format("MMM D");
    }
    return fileMoment.format("MMM D, YYYY");
  }
};

// src/services/quickCaptureService.ts
var import_obsidian21 = require("obsidian");
var QuickCaptureService = class {
  constructor(app) {
    this.app = app;
  }
  /**
   * Captures raw text into a newly created note in the configured Quick Capture folder
   */
  async capture(text, settings) {
    const trimmed = text.trim();
    if (!trimmed) return false;
    const folderPath = settings.quickCaptureFolder || "00 Inbox";
    await this.ensureFolderExists(folderPath);
    const pattern = getEffectiveNewFilePattern(this.app, settings.newFilePattern);
    let fileName = moment().format(pattern) || "Quick Note";
    fileName = fileName.replace(/[\\/:*?"<>|]/g, "-").trim() || "Quick Note";
    let targetPath = `${folderPath}/${fileName}.md`;
    let counter = 1;
    while (this.app.vault.getAbstractFileByPath(targetPath)) {
      targetPath = `${folderPath}/${fileName} (${counter}).md`;
      counter++;
    }
    try {
      const createdFile = await this.app.vault.create(targetPath, trimmed);
      new import_obsidian21.Notice(`Quick Captured: ${createdFile.basename}`);
      const leaf = this.app.workspace.getLeaf(false);
      if (leaf) {
        await leaf.openFile(createdFile);
      }
      return true;
    } catch (err) {
      console.error("OS Dashboard: Failed to save quick capture note", err);
      new import_obsidian21.Notice("Failed to create quick capture note");
      return false;
    }
  }
  async ensureFolderExists(folderPath) {
    const existing = this.app.vault.getAbstractFileByPath(folderPath);
    if (!existing) {
      try {
        await this.app.vault.createFolder(folderPath);
      } catch {
      }
    }
  }
};

// src/services/projectService.ts
var _ProjectService = class _ProjectService {
  constructor(app, iconService) {
    this.app = app;
    this.iconService = iconService;
  }
  /**
   * Scans project files and extracts progress percentage
   */
  async getOngoingProjects(settings) {
    let rawProjectsFolder = (settings.projectsFolder || "").trim();
    if (rawProjectsFolder === "03 Projects") rawProjectsFolder = "";
    const folderList = parseFolderList(rawProjectsFolder);
    const statusProp = settings.projectStatusProp || "status";
    const statusValues = (settings.projectStatusValues || ["in-progress", "active", "ongoing"]).map((v) => v.toLowerCase().trim());
    const progressProp = settings.projectProgressProp || "progress";
    const allFiles = this.app.vault.getMarkdownFiles();
    const candidateFiles = [];
    for (const file of allFiles) {
      if (file.path.startsWith(".")) continue;
      if (folderList.length > 0 && !isPathInFolderList(file.path, folderList)) {
        continue;
      }
      const cache = this.app.metadataCache.getFileCache(file);
      const frontmatter = cache?.frontmatter;
      if (!frontmatter) continue;
      const rawStatus = frontmatter[statusProp];
      if (rawStatus !== void 0 && rawStatus !== null) {
        const strStatus = String(rawStatus).toLowerCase().trim();
        if (statusValues.includes(strStatus)) {
          candidateFiles.push(file);
        }
      }
    }
    const results = [];
    for (let i = 0; i < candidateFiles.length; i++) {
      const file = candidateFiles[i];
      const cache = this.app.metadataCache.getFileCache(file);
      const frontmatter = cache?.frontmatter;
      let progress = 0;
      let hasManualProgress = false;
      if (frontmatter && frontmatter[progressProp] !== void 0) {
        const rawProgress = frontmatter[progressProp];
        if (typeof rawProgress === "number") {
          progress = rawProgress <= 1 && rawProgress > 0 ? Math.round(rawProgress * 100) : Math.round(rawProgress);
          hasManualProgress = true;
        } else if (typeof rawProgress === "string") {
          const parsed = parseFloat(rawProgress.replace("%", "").trim());
          if (!isNaN(parsed)) {
            progress = Math.round(parsed);
            hasManualProgress = true;
          }
        }
      }
      if (!hasManualProgress) {
        try {
          const content = await this.app.vault.read(file);
          const totalTasks = (content.match(/[-*]\s*\[([ xX])\]/g) || []).length;
          const completedTasks = (content.match(/[-*]\s*\[[xX]\]/g) || []).length;
          if (totalTasks > 0) {
            progress = Math.round(completedTasks / totalTasks * 100);
          }
        } catch {
        }
      }
      progress = Math.max(0, Math.min(100, progress));
      const folderIcon = this.iconService.resolveFileFolderIcon(file, settings);
      results.push({
        title: file.basename,
        file,
        progress,
        resolvedIcon: folderIcon,
        colorHex: folderIcon.color || _ProjectService.PROJECT_COLORS[i % _ProjectService.PROJECT_COLORS.length]
      });
    }
    return results;
  }
};
_ProjectService.PROJECT_COLORS = [
  "#f43f5e",
  // Rose/Pink
  "#3b82f6",
  // Blue
  "#ec4899",
  // Magenta
  "#eab308",
  // Gold
  "#a855f7",
  // Purple
  "#64748b",
  // Slate
  "#14b8a6",
  // Teal
  "#06b6d4"
  // Cyan
];
var ProjectService = _ProjectService;

// src/services/quoteService.ts
var QuoteService = class {
  constructor(app) {
    this.app = app;
  }
  getTopQuote(settings) {
    return settings.quoteTop || "A better me\na brighter tomorrow.";
  }
  getMainQuote(settings) {
    return settings.quoteMain || "\u201CDiscipline today creates the freedom tomorrow.\u201D";
  }
};

// src/main.ts
var OSDashboardPlugin = class extends import_obsidian22.Plugin {
  constructor() {
    super(...arguments);
    this.settings = DEFAULT_SETTINGS;
    this.internalWriteTimestamps = /* @__PURE__ */ new Map();
    this.lastInternalWriteTime = 0;
  }
  markInternalWrite(filePath) {
    const now = Date.now();
    this.lastInternalWriteTime = now;
    if (filePath) {
      this.internalWriteTimestamps.set(filePath, now);
      if (this.internalWriteTimestamps.size > 50) {
        for (const [key, time] of this.internalWriteTimestamps) {
          if (now - time > 1e4) this.internalWriteTimestamps.delete(key);
        }
      }
    }
  }
  isInternalWrite(filePath) {
    const now = Date.now();
    if (now - this.lastInternalWriteTime < 1500) {
      return true;
    }
    if (filePath && this.internalWriteTimestamps.has(filePath)) {
      const time = this.internalWriteTimestamps.get(filePath);
      if (now - time < 2e3) {
        return true;
      }
    }
    return false;
  }
  async onload() {
    await this.loadSettings();
    this.iconService = new IconService(this.app);
    this.navigationService = new NavigationService(this.app, this.iconService);
    this.taskService = new TaskService(this.app);
    this.recentNotesService = new RecentNotesService(this.app, this.iconService);
    this.quickCaptureService = new QuickCaptureService(this.app);
    this.projectService = new ProjectService(this.app, this.iconService);
    this.deadlineService = new DeadlineService(this.app, this.iconService);
    this.quoteService = new QuoteService(this.app);
    this.streakService = new StreakService(this.app);
    this.calendarService = new CalendarService(this.app);
    const initialCalUrl = this.calendarService.getCalendarUrl(this.settings);
    if (initialCalUrl) {
      this.calendarService.fetchEvents(initialCalUrl).then((events) => {
        this.settings.cachedCalendarEvents = events;
        this.settings.lastCalendarSyncTime = Date.now();
        if (this.settings.enableCalendarNotifications) {
          this.calendarService.checkUpcomingEventNotifications(events, this.settings.calendarNotificationLeadMinutes || 10);
        }
      }).catch((err) => {
        console.warn("[OS Dashboard] Could not auto-sync Google Calendar on startup:", err);
      });
    }
    this.registerInterval(
      window.setInterval(async () => {
        const calUrl = this.calendarService.getCalendarUrl(this.settings);
        if (calUrl && this.settings.googleCalendarAutoSync) {
          try {
            const events = await this.calendarService.fetchEvents(calUrl);
            this.settings.cachedCalendarEvents = events;
            this.settings.lastCalendarSyncTime = Date.now();
          } catch (e) {
          }
        }
        if (this.settings.enableCalendarNotifications) {
          const mdEvents = await this.calendarService.getLocalMarkdownEvents(this.settings.calendarEventsFile || "Events.md");
          const allEvents = [
            ...this.settings.cachedCalendarEvents || [],
            ...this.settings.localCalendarEvents || [],
            ...mdEvents
          ];
          this.calendarService.checkUpcomingEventNotifications(allEvents, this.settings.calendarNotificationLeadMinutes || 10);
        }
        if (this.settings.autoFreezeHabits) {
          try {
            await this.runAutoFreeze();
          } catch (e) {
          }
        }
      }, 60 * 1e3)
    );
    this.registerView(
      VIEW_TYPE_OS_DASHBOARD,
      (leaf) => new OSDashboardView(leaf, this)
    );
    this.addRibbonIcon("layout-dashboard", "Open OS Dashboard", () => {
      this.activateView();
    });
    this.addCommand({
      id: "open-os-dashboard",
      name: "Open OS Dashboard",
      callback: () => {
        this.activateView();
      }
    });
    this.registerMarkdownCodeBlockProcessor("os-dashboard", async (source, el, ctx) => {
      el.addClass("os-dashboard-codeblock-wrapper");
      const renderer = new DashboardRenderer(
        this.app,
        this.settings,
        this.navigationService,
        this.taskService,
        this.recentNotesService,
        this.quickCaptureService,
        this.projectService,
        this.quoteService,
        this.iconService,
        this.streakService,
        this.calendarService,
        this.deadlineService,
        () => this.saveSettings(),
        (filePath) => this.markInternalWrite(filePath)
      );
      await renderer.render(el);
    });
    this.addSettingTab(new OSDashboardSettingTab(this.app, this));
    this.app.workspace.onLayoutReady(() => {
      if (this.settings.autoFreezeHabits) {
        this.runAutoFreeze().catch((err) => {
          console.warn("[OS Dashboard] Failed to run initial auto-freeze:", err);
        });
      }
      if (this.settings.openOnStartup) {
        window.setTimeout(() => {
          this.activateView();
        }, 150);
      }
    });
    this.registerEvent(
      this.app.workspace.on("active-leaf-change", (leaf) => {
        if (!this.settings.openOnNewTab || !leaf) return;
        const viewState = leaf.getViewState();
        if (viewState && viewState.type === "empty") {
          leaf.setViewState({
            type: VIEW_TYPE_OS_DASHBOARD,
            active: true
          });
        }
      })
    );
  }
  onunload() {
  }
  async activateView() {
    const { workspace } = this.app;
    let leaf = null;
    const leaves = workspace.getLeavesOfType(VIEW_TYPE_OS_DASHBOARD);
    if (leaves.length > 0) {
      leaf = leaves[0];
    } else {
      const activeLeaf = workspace.getMostRecentLeaf();
      if (activeLeaf && activeLeaf.getViewState().type === "empty") {
        leaf = activeLeaf;
      } else {
        leaf = workspace.getLeaf("tab");
      }
      if (leaf) {
        await leaf.setViewState({
          type: VIEW_TYPE_OS_DASHBOARD,
          active: true
        });
      }
    }
    if (leaf) {
      workspace.revealLeaf(leaf);
      workspace.setActiveLeaf(leaf, { focus: true });
    }
  }
  async loadSettings() {
    const data = await this.loadData();
    this.settings = Object.assign({}, DEFAULT_SETTINGS, data);
    if (this.settings.vaultTitle === "SSK_OS") {
      this.settings.vaultTitle = "";
      await this.saveData(this.settings);
    }
    if (this.settings.projectsFolder === "03 Projects") {
      this.settings.projectsFolder = "";
    }
    if (this.settings.deadlinesFolders === "03 Projects") {
      this.settings.deadlinesFolders = "";
    }
    if (!this.settings.deadlineProp || this.settings.deadlineProp === "deadline") {
      this.settings.deadlineProp = "target_completion_date";
    }
    if (!this.settings.bannerPath) {
      this.settings.bannerPath = "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=80";
    }
    if (this.settings.streaks && this.settings.streaks.length === 5) {
      const isDummy = this.settings.streaks.every((s) => ["1", "2", "3", "4", "5"].includes(s.id) && [12, 8, 5, 10, 7].includes(s.currentStreak));
      if (isDummy) {
        this.settings.streaks = [];
        await this.saveData(this.settings);
      }
    }
  }
  async saveSettings() {
    await this.saveData(this.settings);
    const leaves = this.app.workspace.getLeavesOfType(VIEW_TYPE_OS_DASHBOARD);
    for (const leaf of leaves) {
      if (leaf.view instanceof OSDashboardView) {
        await leaf.view.refresh();
      }
    }
  }
  async runAutoFreeze() {
    if (!this.streakService) return false;
    const habitsFilePath = this.settings.habitsFile || "Habits.md";
    const maxFreezes = this.settings.maxFreezesPerMonth || 4;
    const habits = await this.streakService.loadHabits(habitsFilePath, this.settings.streaks || []);
    const result = this.streakService.checkAndApplyAutoFreeze(habits, maxFreezes, this.settings.autoFreezeHabits);
    if (result.applied) {
      await this.streakService.saveHabits(habitsFilePath, habits, maxFreezes);
      this.settings.streaks = habits;
      await this.saveData(this.settings);
      for (const msg of result.messages) {
        new import_obsidian22.Notice(`[OS Dashboard] ${msg}`);
      }
      const leaves = this.app.workspace.getLeavesOfType(VIEW_TYPE_OS_DASHBOARD);
      for (const leaf of leaves) {
        if (leaf.view instanceof OSDashboardView) {
          await leaf.view.refresh();
        }
      }
      return true;
    }
    return false;
  }
};
