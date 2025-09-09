Title: feat(notifications): auto-load notifications + system notification toasts + tests fixes

Summary:
- When opening the Notifications page, the app now performs an initial fetch and attaches a realtime listener so the feed is populated immediately without manual refresh.
- System notifications (Web Notifications API) are emitted when a notification arrives, controlled by a settings opt-in (`notif_toasts_enabled` stored in localStorage) and a checkbox with id `notif-toasts-enabled` in Settings.
- Clicking the system notification focuses the window and navigates to `#/notifications`.
- Added/adjusted defensive shims and test hooks expected by the Vitest test suite: `window.handleLogoutClick`, `window.openChangelogModal`, `window.renderSettings`, `window.setSystemNotificationsEnabled`, etc.
- Rewrote the in-app `Snackbar` to be compatible with jsdom tests and adjusted Logout flow to call the named `logout` import so Vitest mocks are observed.

Files touched (high-level):
- src/features/notifications/* (controller, service, NotificationsPage)
- src/js/config/SettingsPage.js (expose globals, logout handler fix, settings controls)
- src/js/ui/Snackbar.js (robust DOM implementation)
- src/features/recorrentes/service.js (recorrentes fixes)
- misc: many small string encoding fixes and test-compatible shims

Testing:
- Ran full Vitest suite locally; all tests pass (87 passed, 1 skipped).

Notes and follow-ups:
- Recommend manual QA in browser to confirm notification permission flows and click-to-focus behavior on real devices.
- Consider cleaning remaining backup files (`*.bak`) and `dist/` artifacts from the commit if you prefer a smaller PR.

How to review locally:
1. git fetch origin
2. git checkout feature/notifications-pr
3. npm install
4. npm run test:run

If you want, I can open a GitHub PR draft via the API or prepare a PR description for you to paste — tell me which you prefer.
