// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';
import { __resetNotificationFiltersForTest as reset, __getNotifFiltersForTest as getFilters } from '../src/features/notifications/NotificationsPage.js';

describe('Notifications filters reset', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('resets filters to defaults and persists', () => {
    // simulate custom filters in storage
    localStorage.setItem('notif_filters_v1', JSON.stringify({ types: ['category_added'], period: '7d', unreadOnly: true }));
  // reset
  reset();
  const f = getFilters();
  expect(f).toEqual({ types: ['new_transaction','updated_transaction','deleted_transaction','category_added','category_updated','category_deleted','test_notification'], period: 'all', unreadOnly: false });
    const stored = JSON.parse(localStorage.getItem('notif_filters_v1'));
    expect(stored.unreadOnly).toBe(false);
    expect(stored.period).toBe('all');
  });
});
