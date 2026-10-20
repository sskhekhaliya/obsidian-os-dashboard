# OS Dashboard for Obsidian

A sleek personal operating system dashboard for your Obsidian vault, inspired by executive knowledge dashboards.

![Dashboard Preview](Sleek%20Obsidian%20Knowledge%20Dashboard.png)

## Features

- **Panoramic Hero & Live Clock:** Real-time clock and date widget, vault avatar, title, subtitle, and motivational quote callouts.
- **Smart Folder Navigation Ribbon:**
  - Scans your first-level vault folders (e.g., `00 Inbox`, `01 Areas`, `02 Knowledge`, `03 Projects`, etc.).
  - Automatically identifies notes whose filename matches the folder name (e.g., `Projects/Projects.md`) or contains configured keywords (`Home`, `Index`, `MOC`). Clicking opens the note.
  - If no Home note exists, clicking creates a new note in that folder based on your configured naming rule.
  - Seamlessly integrates with the **Iconize** plugin (`obsidian-iconize`) for custom folder icons and colors, with fallback icons.
- **Daily & Weekly Tasks:**
  - Connects to dedicated files (default: `Daily Tasks.md` and `Weekly Tasks.md`).
  - Daily tasks are organized under date headings (`## YYYY-MM-DD`).
  - Interactive checkboxes update your markdown files in real-time.
  - Add tasks on the fly directly from the dashboard.
- **Recent Notes:** Live query of recently modified notes with relative timestamps (`Today 09:12`, `Yesterday`, etc.).
- **Quick Capture:** Type a thought and press `Ctrl+Enter` to immediately save it to a new note in your inbox folder.
- **Habit & Streak Tracker:**
  - Track daily, weekly, monthly, and yearly habit streaks with custom icons and optional descriptions (up to 150 chars).
  - Click any habit to open the **Habit Details & Visual Calendar** modal with lifetime stats (Current, Best, Total completions, Consistency rate).
  - Interactive monthly calendar with completions, streak freezes, missed days, and instant date toggling.
  - Permanent Google Calendar-style "Today" navigation button.
  - Streak freeze protection to preserve streaks during vacations or illness.
  - Compact notation journaling stored cleanly in markdown (`Habits.md`).
  - Auto-populates active habits into today's tasks without duplicates.
- **Interactive Calendar & Agenda:**
  - Monthly calendar grid with event indicators and agenda list view.
  - Google Calendar secret iCal sync support.
  - Quick event scheduling and date-based task planning.
- **Ongoing Projects with Progress Bars:** Scans notes with `status: in-progress` and displays progress bars based on manual `progress: 60%` property or auto-calculated checkbox ratios.
- **Links & Bookmarks:** Quick-launcher for external web tools and internal vault notes.
- **Dedicated View & Codeblock:** Open as a standalone home tab, or embed anywhere in your vault using ````os-dashboard````.

## How to Use

1. **Open Dashboard:**
   - Click the dashboard icon on the left ribbon.
   - Or open the Command Palette (`Ctrl/Cmd + P`) and run `Open OS Dashboard`.
   - Or add a codeblock to any note:
     ````markdown
     ```os-dashboard
     ```
     ````
2. **Settings:**
   - Open **Settings** > **OS Dashboard** to configure banner images, quotes, task paths, project folders, and bookmark links.
