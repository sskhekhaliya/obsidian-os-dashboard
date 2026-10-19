# 🗺️ OS Dashboard - Future Plans & Feature Roadmap

This document captures everything we discussed, the current architecture, and the roadmap of future features and widget suggestions for **OS Dashboard**.

---

## 📌 1. Current Implemented Architecture (v1.0)

| Feature | Description |
| :--- | :--- |
| **Hero Banner** | Full-width edge-to-edge banner with sunset mountain dusk fallback, live digital clock, date, vault title, and motivational quote callout. |
| **Theme Adaptability** | True glassmorphic containers using `color-mix()` and `backdrop-filter: blur(14px)` that automatically sample the active theme (Dark, Light, Warm Sepia, Minimal, etc.). |
| **Smart Folder Ribbon** | Scans 1st-level folders. Automatically finds notes with configured keywords (`Home`, `Index`, `MOC`). Opens existing Home note or creates a new note using configured naming rule. |
| **Parent Folder Inheritance** | Notes in **Recent Notes** and **Ongoing Projects** automatically climb up the folder ancestry to inherit the icon and color of their parent or top-level folder. |
| **Iconize Integration** | Seamlessly reads custom SVGs, emojis, and colors from `obsidian-iconize` with crisp line-art rendering (stroke-based, no unwanted fills). |
| **Two-File Tasks** | • **Today:** Reads/toggles tasks under `## YYYY-MM-DD` in `Daily Tasks.md`.<br>• **This Week:** Reads from `Weekly Tasks.md`. |
| **Schedule Tasks Modal** | Popup modal with a date picker and multi-line task editor allowing batch entry of multiple tasks at once. |
| **Quick Capture** | Direct input box to instantly save notes into your inbox folder. |
| **Ongoing Projects** | Scans notes with `status: in-progress`, displaying colored progress bars from manual `progress: 60%` property or checkbox completion ratios. |
| **Minimal Links** | Simple, borderless launcher grid with a sharp divider line under the header. |
| **Settings Sub-Tabs** | Tabbed settings interface (*General*, *Navigation*, *Widgets*, *Tasks & Projects*, *Bookmarks*) matching Goodreads Bookshelf. |
| **Widget Manager & Toggles** | Master visibility switches for every dashboard card plus custom widget creator (embed vault notes, custom checklists, or quick actions). |

---

## 🚀 2. Initial Discussion: Planned Future Enhancements

These are the features identified during our architecture discussions to be added in future iterations:

### 1. Dynamic Quotes Engine
* **Current:** Static quotes configured in plugin settings.
* **Future:** A modular `QuoteService` upgrade to support:
  * Reading random quotes from a designated note (e.g. `Quotes.md` or `Daily Quotes.md`).
  * Daily rotating quotes seeded by today's date so the quote changes every morning.

### 2. Native Folder Icons & Color Picker
* **Current:** Integrates with `obsidian-iconize` and falls back to a smart 12-color cycling palette.
* **Future:** Build a native folder icon selector and color picker directly inside OS Dashboard settings, allowing complete customization without requiring any third-party plugins.

### 3. Smart Quick Capture Header Parsing
* **Current:** Creates a note named by date pattern (e.g. `YYYY-MM-DD HH-mm.md`) with text in the body.
* **Future:** If the user types `# My Note Title` on the first line, the plugin extracts that as the filename and puts the remaining text into the body.

### 4. Tasks Source Flexibility (Daily Notes Integration)
* **Current:** Dedicated files (`Daily Tasks.md` and `Weekly Tasks.md`) with `## YYYY-MM-DD` headings.
* **Future:** A settings toggle to choose task source:
  * **Mode A:** Central tasks file (current).
  * **Mode B:** Native Obsidian Daily Notes (extracting tasks from today's daily note under a `# Tasks` heading).

### 5. Dual Action Folder Cards
* **Optional:** An optional hover `+` button on folder cards to allow directly creating a new file in a folder even if a `Home` note already exists.

---

## 💡 3. New Widget & Column Suggestions

These are modular widgets that can be introduced as optional cards or dedicated rows on the dashboard:

### 1. 🔁 Daily Habit Tracker (Micro-Habits & Streaks)
* **Concept:** Track 4–6 daily micro-habits (e.g. *Read 30 mins*, *DSA problem*, *Chess puzzle*, *Exercise*, *Write 300 words*).
* **UI:** A row of glowing pill toggles or a 7-day dot matrix.
* **Data:** Stored directly inside `Daily Tasks.md` under today's date heading as a checklist or YAML property.

### 2. ⏳ "On This Day" / Vault Time Machine (Spaced Repetition)
* **Concept:** Automatically surfaces notes created or modified on this exact calendar day **1 month ago, 6 months ago, or 1 year ago**.
* **Why it matters:** Resurfaces forgotten ideas, reflections, and insights serendipitously without search effort.

### 3. 📚 Currently Reading / Bookshelf Widget
* **Concept:** Scans notes in `05 Reading` with frontmatter `status: currently-reading`.
* **UI:** Shows book cover thumbnail (synergizing with your *Property Painter* plugin!), title, author, and reading progress (e.g., *Page 140 / 320 • 44%*).

### 4. 📌 Pinned / Focus Notes (Active Workspace Shelf)
* **Concept:** A quick-launch shelf for your 4–5 most critical working notes right now (e.g., *The Shift - Chapter 1*, *Semester Plan*, *System Design Architecture*).
* **Data:** Reads notes with `pinned: true` frontmatter or integrates with Obsidian's native Bookmarks.

### 5. 📊 Vault Pulse & Productivity Stats
* **Concept:** A compact executive stat row:
  * **Today's Completion:** *4 / 6 tasks done (67%)*
  * **Weekly Output:** *14 notes modified this week*
  * **Total Knowledge:** *420 notes in vault*
  * **Quarter Countdown:** *Q4: 45 days remaining (50%)*

### 6. 📝 Mini Scratchpad (Glass Sticky Note)
* **Concept:** An ephemeral sticky note on the dashboard for temporary phone numbers, code snippets, or thoughts before deciding where to file them.
* **Data:** Auto-saves seamlessly to a single `Scratchpad.md` in the background.

### 7. 🎲 "Spark of the Day" / Random Note Discovery
* **Concept:** Displays a random concept note from `02 Knowledge` or `01 Areas` with a "Shuffle / Open" button to promote active recall and serendipity.

---

## 🏗️ 4. Layout & Customization Roadmap

* **Modular Widget Grid:** Settings toggle to enable/disable any widget and choose which column it appears in.
* **Drag-and-Drop Card Reordering:** Allow rearranging cards directly on the dashboard.
* **Top KPI / Metric Row:** An optional slim row between the Navigation Ribbon and the Main Grid for quick stats or the Habit Tracker.
