// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';
import { __applyNotificationFiltersForTest as applyFilters } from '../src/features/notifications/NotificationsPage.js';

function mkNotif({ id, read = false, type = 'new_transaction', createdAt = new Date() }) {
  return { id, read, type, createdAt };
}

describe('Notifications filters (unreadOnly + type + period month integration)', () => {
  beforeEach(() => {
    // Ensure stable date for tests where needed
  });

  it('filters by unreadOnly', () => {
    const list = [mkNotif({ id: '1', read: false }), mkNotif({ id: '2', read: true })];
    const out = applyFilters(list, { unreadOnly: true, types: ['new_transaction'], period: 'all' });
    expect(out.length).toBe(1);
    expect(out[0].id).toBe('1');
  });

  it('does not filter out read when unreadOnly is false', () => {
    const list = [mkNotif({ id: '1', read: false }), mkNotif({ id: '2', read: true })];
    const out = applyFilters(list, { unreadOnly: false, types: ['new_transaction'], period: 'all' });
    expect(out.length).toBe(2);
  });

  it('filters by type', () => {
    const list = [mkNotif({ id: '1', type: 'new_transaction' }), mkNotif({ id: '2', type: 'category_added' })];
    const out = applyFilters(list, { unreadOnly: false, types: ['category_added'], period: 'all' });
    expect(out.map(n => n.id)).toEqual(['2']);
  });
});
