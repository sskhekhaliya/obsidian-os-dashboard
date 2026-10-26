# OS Dashboard for Obsidian

A sleek personal operating system dashboard for your Obsidian vault, inspired by executive knowledge dashboards.

### 🖥️ Desktop View

![OS Dashboard Desktop Preview](Screenshots/PC%20Dashboard.png)

### 📱 Mobile View

<p align="center">
  <img src="Screenshots/Mobile%20Dashboard.png" alt="OS Dashboard Mobile Preview" width="380" />
</p>

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
- **Deadlines & Milestones Tracker:**
  - Live query of target dates and milestones across your vault notes.
  - Configurable target property (default: `target_completion_date`, with aliases like `deadline`, `due`).
  - Circular SVG timeline progress rings showing elapsed time from note creation/start date to deadline.
  - Clean shorthand indicators (`Today`, `1d`, `3w`, `2m`, and red overdue alerts like `-4d`) with rich tooltips.
  - Dynamic status label tags (`[in-progress]`, `[evolve]`, `[need-review]`) displayed alongside note titles.
  - Completed milestones clear automatically when `completed_date` is marked or filled.
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
   - Open **Settings** > **OS Dashboard** to customize your hero banner, navigation ribbon, widget order, and configure individual built-in widgets (Tasks, Quick Capture, Projects, Deadlines, Habit Streaks, Calendar & Google Calendar Sync, and Quotes) with collapsible accordions.

---

## ☕ Support

If you find **OS Dashboard** helpful for managing your knowledge, habits, and daily workflow, consider supporting my work:

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/sskhekhaliya)

---

## 📄 License & Credits

- **Author**: [SSKhekhaliya](https://www.sskhekhaliya.in/)
- **Support**: [buymeacoffee.com/sskhekhaliya](https://buymeacoffee.com/sskhekhaliya)
- **License**: MIT License © [SSKhekhaliya](https://www.sskhekhaliya.in/)
- Built with ❤️ for the [Obsidian](https://obsidian.md) community.
