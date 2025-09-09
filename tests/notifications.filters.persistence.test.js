// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';
import { __getNotifFiltersForTest as getFilters } from '../src/features/notifications/NotificationsPage.js';

function setLS(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

describe('Notifications filters persistence', () => {
  const KEY = 'notif_filters_v1';

  beforeEach(() => {
    localStorage.clear();
  });

  it('loads defaults when localStorage is empty', () => {
    const f = getFilters();
    expect(f).toEqual({ types: ['new_transaction','updated_transaction','deleted_transaction','category_added','category_updated','category_deleted','test_notification'], period: 'all', unreadOnly: false });
  });

  it('loads from localStorage when present', () => {
    setLS(KEY, { types: ['category_added'], period: '7d', unreadOnly: true });
    const f = getFilters();
    expect(f.types).toEqual(['category_added']);
    expect(f.period).toBe('7d');
    expect(f.unreadOnly).toBe(true);
  });
});
