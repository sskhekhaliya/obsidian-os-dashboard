import { TFile, App } from "obsidian";

export const moment: any = (...args: any[]): any => {
  return (window as any).moment(...args);
};
moment.utc = (...args: any[]) => (window as any).moment?.utc(...args);

export interface DashboardLink {
  id: string;
  title: string;
  url: string;
  icon: string;
}

export interface CustomWidgetButton {
  id: string;
  label: string;
  target: string;
  icon?: string;
  color?: string;
}

export interface CustomWidget {
  id: string;
  title: string;
  description?: string;
  icon: string;
  color?: string;
  type: "markdown-note" | "custom-text" | "link-button" | "dataview";
  content: string;
  buttons?: CustomWidgetButton[];
  showTableHeader?: boolean;
  column: 1 | 2 | 3 | "rail";
  enabled: boolean;
}

export interface WidgetCustomization {
  title?: string;
  description?: string;
  icon?: string;
  color?: string;
}

export interface FolderStyleOverride {
  icon?: string;
  color?: string;
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
  folderOverrides?: Record<string, FolderStyleOverride>;
  links: DashboardLink[];
  openOnStartup: boolean;
  openOnNewTab: boolean;
  mobileTopMargin?: number;

  // Widget Visibility Toggles
  showHeroBanner: boolean;
  showNavRibbon: boolean;
  showTodayTasks: boolean;
  showWeeklyTasks: boolean;
  showRecentNotes: boolean;
  showQuickCapture: boolean;
  showOngoingProjects: boolean;
  showDeadlines: boolean;
  showBookmarks: boolean;

  // Deadlines Widget Settings
  deadlinesFolders: string;
  deadlineProp: string;
  deadlineCompletedProp?: string;
  deadlineStatusProp: string;
  deadlineCompletedValues?: string[];
  deadlineStatusValues?: string[];
  deadlineProgressProp: string;

  // Right Rail Widgets
  showRightRail: boolean;
  showCalendar: boolean;
  showGraphView: boolean;
  showStreaks: boolean;
  showRightQuote: boolean;
  rightRailQuote: string;
  rightRailQuoteAuthor: string;
  streaks: StreakItem[];
  habitsFile: string;
  archiveHabitsFile: string;
  maxFreezesPerMonth: number;
  autoFreezeHabits: boolean;

  // Google Calendar Integration & Local Events
  googleCalendarUrl: string;
  googleCalendarUseKeychain?: boolean;
  googleCalendarSecretId?: string;
  googleCalendarAutoSync: boolean;
  showGoogleCalendarBanner?: boolean;
  enableCalendarNotifications: boolean;
  calendarNotificationLeadMinutes: number;
  cachedCalendarEvents: CalendarEventItem[];
  localCalendarEvents: CalendarEventItem[];
  calendarEventsFile: string;
  lastCalendarSyncTime?: number;

  // Custom Widgets
  customWidgets: CustomWidget[];

  // Built-in Widget Customizations
  widgetCustomizations?: Record<string, WidgetCustomization>;

  // Drag and Drop Widget Layout
  widgetLayout?: DashboardWidgetLayout;
}

export interface DashboardWidgetLayout {
  col1: string[];
  col2: string[];
  col3: string[];
  rail: string[];
}

export type EventRecurrenceType = "none" | "daily" | "weekly" | "monthly" | "yearly" | "custom_days";

export interface EventRecurrenceRule {
  type: EventRecurrenceType;
  intervalDays?: number; // e.g. every after N days
  intervalWeeks?: number;
  until?: string; // YYYY-MM-DD
}

export interface CalendarEventItem {
  id: string;
  title: string;
  startDate: string; // YYYY-MM-DD
  startTime?: string; // HH:mm
  endDate: string; // YYYY-MM-DD
  endTime?: string; // HH:mm
  isAllDay: boolean;
  location?: string;
  description?: string;
  color?: string;
  source?: "google" | "local";
  recurrence?: EventRecurrenceRule;
  enableNotification?: boolean;
  notificationLeadMinutes?: number;
}

export type HabitFrequency = "daily" | "weekly" | "monthly" | "yearly";
export type HabitScheduleType = "flexible" | "fixed";
export type HabitFreezePeriod = "weekly" | "monthly" | "yearly";

export interface StreakItem {
  id: string;
  name: string;
  description?: string;
  icon: string;
  frequency?: HabitFrequency;
  scheduleType?: HabitScheduleType;
  fixedDayOfWeek?: number; // 0 (Sun) - 6 (Sat)
  fixedDayOfMonth?: number; // 1 - 31
  fixedDateOfYear?: string; // MM-DD
  currentStreak: number;
  bestStreak: number;
  createdDate?: string;
  startDate?: string;
  lastCompletedDate?: string;
  lastCompletedCycle?: string;
  history: string[];
  frozenUntil?: string | null;
  freezeHistory?: string[];
  freezePeriodType?: HabitFreezePeriod;
  freezeQuota?: number;
  maxFreezesPerMonth?: number;
  autoPopulate: boolean;
  autoFreeze?: boolean;
  journal?: string;
}

export const AESTHETIC_UNSPLASH_BANNERS = [
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=80", // Starry Night Mountains
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80", // Yosemite Valley Forest
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80", // Deep Space Cosmic Galaxy
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80", // Sunset Coast & Ocean
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=80", // Foggy Morning Mountain Ridge
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80", // Canadian Rocky Mountain Peaks
  "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80", // Cyberpunk Neon Cityscape
  "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1920&q=80"  // Aurora Borealis Northern Lights
];

export function getRandomAestheticBanner(): string {
  const idx = Math.floor(Math.random() * AESTHETIC_UNSPLASH_BANNERS.length);
  return AESTHETIC_UNSPLASH_BANNERS[idx];
}

export const DEFAULT_SETTINGS: OSDashboardSettings = {
  bannerPath: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=80",
  vaultAvatarIcon: "home",
  vaultTitle: "",
  vaultSubtitle: "Think • Learn • Build • Create • Grow",
  quoteTop: "A better me\na brighter tomorrow.",
  quoteMain: "“Discipline today creates the freedom tomorrow.”",
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
  rightRailQuote: "“Consistency is more important than intensity.”",
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

export const DEFAULT_WIDGET_LAYOUT: DashboardWidgetLayout = {
  col1: ["todayTasks", "weeklyTasks"],
  col2: ["recentNotes", "quickCapture"],
  col3: ["ongoingProjects", "deadlines", "bookmarks"],
  rail: ["calendar", "streaks", "graphView", "rightQuote"]
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

export interface DeadlineItem {
  title: string;
  file: TFile;
  deadlineDate: string;
  daysLeft: number;
  isOverdue: boolean;
  isToday: boolean;
  formattedTimeLeft: string;
  fullTimeDescription?: string;
  status: string;
  timeProgress: number;
  progress?: number;
  resolvedIcon: ResolvedFolderIcon;
  colorHex?: string;
}

/**
 * Parses a comma-separated list of folders that may contain double-quoted folder names.
 * Example: '"03 Projects", "Work, Tasks", Personal' -> ['03 Projects', 'Work, Tasks', 'Personal']
 */
export function parseFolderList(input: string): string[] {
  if (!input || !input.trim()) return [];
  const results: string[] = [];
  const regex = /"([^"]+)"|'([^']+)'|([^,]+)/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(input)) !== null) {
    const val = (match[1] ?? match[2] ?? match[3] ?? "").trim();
    const clean = val.replace(/^["']|["']$/g, "").trim();
    if (clean) {
      results.push(clean);
    }
  }
  return results;
}

/**
 * Checks if a file path belongs to any of the specified folders in folderList.
 * If folderList is empty, returns true (matches whole vault).
 */
export function isPathInFolderList(filePath: string, folderList: string[]): boolean {
  if (!folderList || folderList.length === 0) return true;
  const lowerPath = filePath.toLowerCase().replace(/\\/g, "/");
  return folderList.some(f => {
    const cleanF = f.toLowerCase().replace(/\\/g, "/").replace(/^\/+|\/+$/g, "").trim();
    if (!cleanF) return true;
    return (
      lowerPath.startsWith(cleanF + "/") ||
      lowerPath === cleanF ||
      lowerPath.includes("/" + cleanF + "/") ||
      lowerPath.endsWith("/" + cleanF)
    );
  });
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

export function getDailyNotesFormat(app: App): string {
  try {
    const internalPlugins = (app as any).internalPlugins;
    const dailyNotes =
      internalPlugins?.getPluginById?.("daily-notes")?.instance ||
      internalPlugins?.plugins?.["daily-notes"]?.instance;
    const format = dailyNotes?.options?.format;
    if (format && typeof format === "string" && format.trim()) {
      return format.trim();
    }
  } catch (e) {}
  return "YYYY-MM-DD";
}

export function getEffectiveNewFilePattern(app: App, pattern?: string): string {
  if (pattern && pattern.trim()) {
    return pattern.trim();
  }
  return getDailyNotesFormat(app);
}
