// features/notifications/utils/filters.js
import { getSelectedPeriod } from '@core/utils/globalUtils.js';

export function applyNotificationFilters(list, filters) {
  // minimal local filter by type and simple period
  const now = new Date();
  const cutoff = {
    all: null,
    today: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
    '7d': new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
    '30d': new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
  }[filters?.period || 'all'];
  // Integrate selected period month when filters.period === 'all'
  let monthStart = null,
    monthEnd = null;
  try {
    const p = typeof getSelectedPeriod === 'function' ? getSelectedPeriod() : null;
    if (!cutoff && p && p.year && p.month) {
      monthStart = new Date(p.year, p.month - 1, 1, 0, 0, 0, 0);
      monthEnd = new Date(p.year, p.month, 0, 23, 59, 59, 999);
    }
  } catch {}
  return (list || []).filter((n) => {
    if (filters?.unreadOnly && n.read) {
      return false;
    }
    const typeOk = !filters?.types || filters.types.includes(n.type);
    if (!typeOk) {
      return false;
    }
    const d = n.createdAt?.toDate
      ? n.createdAt.toDate()
      : n.createdAt?.seconds
        ? new Date(n.createdAt.seconds * 1000)
        : new Date(n.createdAt);
    if (cutoff) {
      return d >= cutoff;
    }
    if (monthStart && monthEnd) {
      return d >= monthStart && d <= monthEnd;
    }
    return true;
  });
}

export function groupNotificationsByDay(list) {
  const groups = {};
  (list || []).forEach((n) => {
    const d = n.createdAt?.toDate ? n.createdAt.toDate() : new Date(n.createdAt);
    const key = d.toDateString();
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(n);
  });
  return Object.keys(groups)
    .sort((a, b) => new Date(b) - new Date(a))
    .map((k) => ({ label: k, items: groups[k] }));
}

// test hooks
export { applyNotificationFilters as __applyNotificationFiltersForTest };
