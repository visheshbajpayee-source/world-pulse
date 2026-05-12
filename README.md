# 🌍 WorldPulse — A Real-Time Global Explorer Dashboard

> **Intern Project | Full-Stack Frontend Challenge**
> *Stack: HTML5 · CSS3 · Vanilla JavaScript · Free Public APIs*

---

## 📌 Project Overview

**WorldPulse** is a real-time, interactive global explorer dashboard that lets users search any country and instantly see its weather, latest news headlines, public holidays, and a random fun fact — all beautifully laid out in a responsive, animated UI.

This project is intentionally designed to force you to use **every major concept** across HTML, CSS, and JavaScript. No libraries. No frameworks. Pure vanilla stack.

---

## 🎯 Learning Objectives

By completing this project, interns will have practiced and demonstrated mastery of:

### 🧱 HTML5
- Semantic document structure (`<main>`, `<section>`, `<article>`, `<header>`, `<footer>`, `<nav>`)
- Forms and input elements with proper `label` associations
- `data-*` custom attributes
- Accessibility: ARIA labels, roles, and `tabindex`
- Meta tags for SEO and Open Graph
- Linking external fonts (Google Fonts) and stylesheets
- Image handling with `alt` text and `loading="lazy"`
- `<template>` elements for cloning dynamic content
- `<dialog>` element for modals

### 🎨 CSS3
- CSS Custom Properties (variables) for a complete design system
- Flexbox layouts (navbar, cards, footers)
- CSS Grid layouts (dashboard panel arrangement)
- Responsive design with media queries (mobile → tablet → desktop)
- CSS animations (`@keyframes`) — loading spinners, card reveals, shimmer skeletons
- Transitions and hover effects on interactive elements
- Pseudo-elements (`::before`, `::after`) for decorative effects
- CSS `clamp()` for fluid typography
- `:root` theming and dark/light mode toggle via class switching
- `backdrop-filter`, `box-shadow`, and `border-radius` for glassmorphism cards
- `position: sticky` navbar
- CSS Grid `auto-fill` / `auto-fit` for the news cards section
- Scroll-based behavior using `scroll-behavior: smooth`

### ⚡ JavaScript (ES6+)
- `fetch()` API and `async/await` for all API calls
- `Promise.all()` to fire multiple API calls in parallel
- Error handling with `try/catch/finally`
- DOM manipulation: `querySelector`, `createElement`, `appendChild`, `innerHTML`
- Event listeners: `click`, `keydown`, `input`, `change`
- Debouncing the search input field (manual implementation — no lodash)
- `localStorage` for persisting the last searched country and dark/light mode preference
- `sessionStorage` for caching API responses within the session
- JavaScript modules (`import` / `export`) — split code into logical files
- `Intl.DateTimeFormat` and `Intl.NumberFormat` for locale-aware formatting
- Array methods: `.map()`, `.filter()`, `.reduce()`, `.find()`, `.sort()`
- Destructuring, spread operator, optional chaining (`?.`), and nullish coalescing (`??`)
- Template literals for building dynamic HTML strings
- The `IntersectionObserver` API for lazy-loading news cards as the user scrolls
- `AbortController` to cancel in-flight fetch requests when a new search is made
- Custom event dispatching with `CustomEvent`

---

## 🔌 APIs to Use (All Free, No Credit Card Required)

| Feature | API | Endpoint Example | Auth Required |
|---|---|---|---|
| Country Info | [REST Countries](https://restcountries.com/) | `https://restcountries.com/v3.1/name/{country}` | ❌ None |
| Weather | [Open-Meteo](https://open-meteo.com/) | `https://api.open-meteo.com/v1/forecast?...` | ❌ None |
| News Headlines | [GNews API](https://gnews.io/) | `https://gnews.io/api/v4/search?q={country}&token=YOUR_KEY` | ✅ Free Key |
| Public Holidays | [Nager.Date](https://date.nager.at/) | `https://date.nager.at/api/v3/PublicHolidays/{year}/{countryCode}` | ❌ None |
| Fun Facts / Trivia | [API Ninjas Facts](https://api-ninjas.com/api/facts) | `https://api.api-ninjas.com/v1/facts` | ✅ Free Key |
| Country Flag | Provided by REST Countries response | `flags.svg` field | ❌ None |

> **Sign up once** at [GNews](https://gnews.io/) and [API Ninjas](https://api-ninjas.com/) to get your free API keys. Store them in a `config.js` file (which must be added to `.gitignore`).

---

## 🗂️ Required Project Structure

```
worldpulse/
│
├── index.html               ← Main HTML file
├── README.md                ← This file
├── .gitignore               ← Must include config.js
│
├── config.js                ← API keys (gitignored)
│
├── css/
│   ├── reset.css            ← CSS reset/normalize
│   ├── variables.css        ← Design tokens (colors, fonts, spacing)
│   ├── layout.css           ← Grid and flex layout rules
│   ├── components.css       ← Cards, buttons, badges, navbar
│   ├── animations.css       ← Keyframes and transitions
│   └── responsive.css       ← All media queries
│
├── js/
│   ├── main.js              ← App entry point, event wiring
│   ├── api.js               ← All fetch calls, centralized
│   ├── ui.js                ← DOM render functions
│   ├── storage.js           ← localStorage / sessionStorage helpers
│   └── utils.js             ← Debounce, formatters, helpers
│
└── assets/
    ├── icons/               ← SVG icons (weather, UI, etc.)
    └── images/              ← Any static images used
```

---

## 🖥️ Feature Requirements

### 1. 🔍 Country Search Bar
- A search input with real-time debounced suggestions (wait 400ms after user stops typing)
- Show a dropdown of matching country names using REST Countries API
- Pressing `Enter` or clicking a suggestion triggers a full dashboard load
- Cancel any previous pending request using `AbortController`

### 2. 🗺️ Country Info Panel
- Display: Flag (SVG), Country Name, Capital, Region, Population (formatted with `Intl`), Currency, Languages, Timezones
- Use `data-*` attributes on the card elements
- Animate the panel in using a CSS keyframe on load

### 3. 🌤️ Weather Widget
- Use the country's capital's coordinates (from REST Countries) to call Open-Meteo
- Display: Current temperature, wind speed, weather condition code mapped to a human-readable label and SVG icon
- Show a 3-day forecast strip

### 4. 📰 News Feed
- Fetch top 6 headlines for the country using GNews
- Render as cards in a CSS Grid
- Implement `IntersectionObserver` so cards animate in as they scroll into view
- Each card: headline, source, published date (formatted), and a "Read More" link

### 5. 🗓️ Upcoming Public Holidays
- Fetch the current year's public holidays for the country
- Filter and display only the next 3 upcoming holidays
- If a holiday is today, highlight it with a special badge

### 6. 💡 Fun Fact Widget
- Fetch a random fun fact from API Ninjas on every search
- Add a "Get Another Fact" button that fetches a new one without re-searching

### 7. 🌙 Dark / Light Mode Toggle
- A toggle button in the navbar
- Switches a `.dark` class on `<body>` and updates all CSS variables
- Saves the preference to `localStorage` and loads it on next visit

### 8. 📜 Search History
- Store the last 5 searched countries in `localStorage`
- Show them as clickable chips below the search bar
- Allow clearing the history

---

## ✅ Acceptance Criteria

Your submission will be evaluated on the following:

| Criteria | Weight |
|---|---|
| All 8 features are fully functional | 30% |
| Code is split into modules (no single-file spaghetti) | 15% |
| Responsive on mobile, tablet, and desktop | 15% |
| Loading skeletons shown while API data loads | 10% |
| Error states handled gracefully (API failure, no results, offline) | 10% |
| Dark/light mode works and persists | 5% |
| `sessionStorage` used to cache repeated searches | 5% |
| Code quality: readable, commented, consistent naming | 10% |

---

## 🚫 Constraints (Read Carefully)

- ❌ **No JavaScript frameworks** — no React, Vue, Angular, Svelte
- ❌ **No CSS frameworks** — no Bootstrap, Tailwind, Bulma
- ❌ **No utility libraries** — no Lodash, jQuery, Axios (use native `fetch`)
- ✅ Google Fonts and SVG icon sets (e.g., Heroicons, Feather Icons) are allowed
- ✅ You may use a CSS reset file

---

## 🚀 Getting Started

```bash
# 1. Clone or download the repo
git clone https://github.com/your-org/worldpulse.git
cd worldpulse

# 2. Create your config file
cp config.example.js config.js
# Add your GNews and API Ninjas keys inside config.js

# 3. Open in browser
# Use VS Code Live Server extension or any static server:
npx serve .
# Then visit http://localhost:3000
```

---

## 📦 Deliverables

Submit a link to your GitHub repository containing:

- [ ] Complete working source code
- [ ] This `README.md` updated with your name and any design decisions
- [ ] A `REFLECTION.md` — 1 page explaining: what was hardest, what you learned, and what you'd improve

**Deadline:** To be communicated by your manager.

---

## 💡 Bonus Challenges (Optional)

These are not required but will distinguish exceptional submissions:

- 🗺️ Embed an interactive map using [Leaflet.js](https://leafletjs.com/) (free, open-source) centered on the searched country
- 📊 Add a mini bar chart for population comparison using the Canvas API (no Chart.js)
- 🔔 Use the Web Notifications API to alert the user when a holiday is within 7 days
- ♿ Achieve a Lighthouse Accessibility score of 95+
- 🌐 Add a language selector that changes UI text (English / French / Spanish) using a JSON i18n approach

---

## 👨‍💼 Mentor Notes

> For reviewers and mentors — here's what to look for:
> - Are API calls centralized in `api.js` or scattered everywhere?
> - Is the debounce implemented manually (shows understanding) or just a `setTimeout` hack?
> - Does the app handle all three API error states: network failure, empty response, and rate limiting?
> - Is `Promise.all()` used to fetch weather + news + holidays in parallel, or are they sequential (a common beginner mistake)?
> - Does dark mode actually use CSS variables or is it hardcoded toggle of colors?

---

*Built with ❤️ as an intern training project. Happy coding!*
