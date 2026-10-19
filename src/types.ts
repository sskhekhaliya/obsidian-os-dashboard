import { TFile } from "obsidian";

export function moment(...args: any[]): any {
  return (window as any).moment(...args);
}

export interface DashboardLink {
  id: string;
  title: string;
  url: string;
  icon: string;
}

export interface CustomWidget {
  id: string;
  title: string;
  icon: string;
  type: "markdown-note" | "custom-text" | "link-button";
  content: string;
  column: 1 | 2 | 3;
  enabled: boolean;
}

export interface OSDashboardSettings {
  bannerPath: string;
  vaultAvatarIcon: string;
  vaultTitle: string;
  vaultSubtitle: string;
  quoteTop: string;
  quoteMain: string;
  clockSubtitle: string;
  homeKeywords: string[];
  matchFolderName: boolean;
  newFilePattern: string;
  dailyTasksFile: string;
  dailyLogFile: string;
  autoLogToDailyLog: boolean;
  weeklyTasksFile: string;
  quickCaptureFolder: string;
  projectsFolder: string;
  projectStatusProp: string;
  projectStatusValues: string[];
  projectProgressProp: string;
  recentNotesLimit: number;
  recentNotesExcludeFolders: string[];
  ignoredFolders: string[];
  links: DashboardLink[];
  openOnStartup: boolean;
  openOnNewTab: boolean;

  // Widget Visibility Toggles
  showHeroBanner: boolean;
  showNavRibbon: boolean;
  showTodayTasks: boolean;
  showWeeklyTasks: boolean;
  showRecentNotes: boolean;
  showQuickCapture: boolean;
  showOngoingProjects: boolean;
  showBookmarks: boolean;

  // Custom Widgets
  customWidgets: CustomWidget[];
}

export const DEFAULT_SETTINGS: OSDashboardSettings = {
  bannerPath: "",
  vaultAvatarIcon: "home",
  vaultTitle: "SSK_OS",
  vaultSubtitle: "Think • Learn • Build • Create • Grow",
  quoteTop: "A better me\na brighter tomorrow.",
  quoteMain: "“Discipline today creates the freedom tomorrow.”",
  clockSubtitle: "Small steps every day\nlead to big results.",
  homeKeywords: ["Home", "Index", "MOC"],
  matchFolderName: true,
  newFilePattern: "YYYY-MM-DD HH-mm",
  dailyTasksFile: "Daily Tasks.md",
  dailyLogFile: "Daily Log.md",
  autoLogToDailyLog: true,
  weeklyTasksFile: "Weekly Tasks.md",
  quickCaptureFolder: "00 Inbox",
  projectsFolder: "03 Projects",
  projectStatusProp: "status",
  projectStatusValues: ["in-progress", "active", "ongoing"],
  projectProgressProp: "progress",
  recentNotesLimit: 8,
  recentNotesExcludeFolders: ["Templates", ".trash"],
  ignoredFolders: ["_attachments", "_scripts", "_templates", "Templates", ".trash"],
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
  showHeroBanner: true,
  showNavRibbon: true,
  showTodayTasks: true,
  showWeeklyTasks: true,
  showRecentNotes: true,
  showQuickCapture: true,
  showOngoingProjects: true,
  showBookmarks: true,
  customWidgets: []
};

export interface TaskItem {
  id: string;
  text: string;
  completed: boolean;
  lineNumber: number;
  rawLine: string;
  sourceFile: string;
  dateHeading?: string;
}

export interface ProjectItem {
  title: string;
  file: TFile;
  progress: number;
  resolvedIcon: ResolvedFolderIcon;
  colorHex?: string;
}

export function hexToRgb(hex: string): string {
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

export interface ResolvedFolderIcon {
  type: "svg" | "emoji" | "lucide";
  value: string;
  color: string;
}

export interface FolderCard {
  name: string;
  path: string;
  hasHome: boolean;
  homeFile?: TFile;
  resolvedIcon: ResolvedFolderIcon;
  subtitle?: string;
}

export interface RecentNoteItem {
  file: TFile;
  title: string;
  formattedTime: string;
  resolvedIcon: ResolvedFolderIcon;
}
