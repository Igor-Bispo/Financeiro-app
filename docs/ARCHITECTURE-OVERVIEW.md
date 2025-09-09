# Architecture Overview

This document maps the full architecture of the Financeiro-app: layers, flows, routing, state, data access, PWA and tests. It’s the technical companion for maintainers.

## High-level

- SPA (hash-based) with Vite, ES modules and Tailwind.
- Hosted on Firebase Hosting, data on Firebase Auth + Firestore.
- PWA: custom Service Worker, offline, background sync, push.
- Feature-first organization with transversal layers (app, core, data, features, ui).

## Layered structure

- app/
  - entry.js: app entrypoint; theme/init; SW register on PROD; invokes bootstrap().
  - main.js: boot orchestration; hash router wiring; route guard to Dashboard.
  - routes.js: route → lazy import page module; scroll-to-top; render FAB and BottomNav.
  - bootstrap.js: temporary appState, initialize services, real-time listeners, global events, budget switching and legacy data auto-fixes.

- core/
  - events/eventBus.js: pub/sub (on/off/emit/once).
  - store/createStore.js: reactive store with selector-based subscribe.
  - config/index.js: APP_CONFIG and env bindings (Firebase).
  - utils/globalUtils.js: navigation/scroll/formatters; notification/modal/snackbar bus; globalState, get/setSelectedPeriod() with localStorage + window.appState persistence and period:changed events; compatibility shims.

- data/
  - firebase/client.js: initializeApp, auth local persistence, Firestore, (optional) Analytics.
  - repositories/*: CRUD and queries per domain (budgets, categories, transactions, recurring, etc.).

- features/
  - Domain-oriented folders (dashboard, transactions, categories, recorrentes, analytics, notifications, settings, backup, voice, theme, etc.).
  - Pages render UI and subscribe to events; services orchestrate repositories + business rules.
  - features/index.js exports renderers/services as a barrel.

- ui/
  - Shared UI components (FAB, BottomNav, feedback, etc.).

## Routing and UX

- Hash routing via routes.js with lazy module loading.
- Guard ensures Dashboard as the safe initial route; temporary protection against early redirects to Recorrentes.
- All pages scroll-to-top after render; FAB and BottomNav re-render per route.

- Analytics pipeline (src/js/ui/AnalyticsRoute.js):
  - Anti-race rendering queue; listens to hashchange and eventBus('period:changed'); syncs ?ym in hash; re-renders when needed.

## Global period as source of truth

- globalUtils.getSelectedPeriod()/setSelectedPeriod():
  - Store in window.appState and localStorage ('selectedYM').
  - Emit eventBus('period:changed', { year, month }).
- Tabs (Transactions, Categories, Analytics, Notifications):
  - Re-render on period:changed; filter their data to the selected month.
  - Only Dashboard has the interactive month selector; others show read-only labels.
  - Deep-links preserve ?ym=YYYY-MM on supported routes.

## Execution flow

1) entry.js (DOMContentLoaded)
   - Apply theme/compact; route normalization; bootstrap().
2) bootstrap()
   - initializeApp(): waitForAuth → load budgets → set currentBudget (localStorage fallback); load transactions & categories; emit updates; start realtime listeners; setup global events.
   - hashchange → routes.renderPage(path) → lazy load page → render + scrollToTop + FAB + BottomNav.
3) Interaction
   - Changing Dashboard month → setSelectedPeriod() → event period:changed → tab re-renders and updates URL ?ym.

## Data and domain services

- Repositories abstract Firestore; services compose repositories and publish updates via eventBus/stores.
- bootstrap.js starts budget/transactions/categories listeners for the current budget; on budget:changed it stops/restarts listeners, resets UI data and navigates back to Dashboard.

## PWA and performance

- service-worker.js caches: static/dynamic/fallback by version; strategies per route (cache-first, stale-while-revalidate, network-first with fallback); background sync; push; trims cache.
- vite.config.js: aliases (@app/@core/@data/@features/@ui), compression (brotli), CSS and JS splitting, dev server on 5176, optimizeDeps for Firebase and core modules.
- index.html: mobile meta, font, external libs (xlsx, jspdf), login overlay, dynamic content area.

## Tests and quality

- vitest.config.js: jsdom, setup, coverage via v8.
- tests/** cover: eventBus; transactions filtering; analytics page and summary; settings visibility and copy; recorrentes service; notifications repo.

## ASCII diagram

```text
                +---------------------------+
                |         index.html        |
                |  #app-content / FAB / BN |
                +-------------+-------------+
                              |
                        module entry
                              v
+------------------+     +---+---+        +--------------------+
|  app/entry.js    +----->bootstrap+------> app/main.js        |
|  (theme, SW, auth)|    | (init) |        | (hash router)     |
+------------------+     +---+----+        +-----+-------------+
                                   renderPage() |
                                                 v
                                        +--------+---------+
                                        | app/routes.js    |
      period:changed                    | lazy load pages  |
            +---------------------------+--------+---------+
            |                                    |
            |                         +----------+-----------+
            |                         | features/*/Page.js   |
            |                         | (UI per feature)     |
            |                         +----------+-----------+
            |                                    |
     +------+--------+                  +--------+----------+
     | core/utils    |  events          | features/*/service|
     | (globalState, +<---------------->+ (business rules)  |
     | get/set period)|                 +--------+----------+
     +------+--------+                           |
            |                                     v
            |                           +---------+---------+
            |                           | data/repositories |
            |                           | (CRUD/queries)    |
            |                           +---------+---------+
            |                                     |
            |                         +-----------+-----------+
            |                         | data/firebase/client |
            |                         | (Auth+Firestore)     |
            |                         +----------------------+
```

## Feature catalog

- Auth & Users: Google OAuth via Firebase; biometric login toggle; profile data; multiple budgets; sharing.
- Transactions: CRUD; types (income/expense); filters and search; timestamping; grouping by day; month sections; parcel handling.
- Categories: CRUD; limits with progress bars; color-coded statuses and alerts.
- Recorrentes: schedule logic; manual apply; parcel calculations (X of Y); logs; status per month; duplicate avoidance.
- Dashboard: monthly summary; cards for balance/income/expense; top categories; alerts; progress bars; single month selector.
- Analytics: charts and summaries; period indicator read-only; anti-race route; deep-link ?ym sync.
- Notifications: list; integrates month filter when scope is “Tudo”; today/7d/30d modes.
- Backup/Export: JSON export/import; Excel (SheetJS); PDF (jsPDF) reports.
- Voice: Web Speech API; friendly modal; parsing helpers; fallbacks.
- UI: FAB; BottomNav; snackbar; feedback; responsive/mobile tweaks.
- Theme: dark/light; compact/micro/nano modes; persisted settings.
- PWA: installable; offline; background sync; push messages.

## Operational notes

- URL deep-linking: prefer ?ym=YYYY-MM on routes that support period context; other routes ignore it.
- Changing budgets clears previous budget data in UI to avoid leakage.
- Tests are green (22/22) and cover month sync behaviors.

---

Maintainer hint: When adding a new feature, start with a service (business rules + repo calls), then the Page render with eventBus subscriptions, and wire the route via routes.js. Keep the Dashboard as the only interactive month selector.
