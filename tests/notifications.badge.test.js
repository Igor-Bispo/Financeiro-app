// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { eventBus } from '../src/core/events/eventBus.js';
import { BottomNav } from '../src/js/ui/BottomNav.js';

describe('Notifications badge in BottomNav', () => {
  let nav;

  beforeEach(() => {
    document.body.innerHTML = '';
    // Reset any event listeners
    eventBus.clear();
    nav = BottomNav('/dashboard');
    document.body.appendChild(nav);
  });

  afterEach(() => {
    // Remove nav to trigger cleanup
    if (nav && nav.parentNode) { nav.parentNode.removeChild(nav); }
    eventBus.clear();
    document.body.innerHTML = '';
  });

  function getNotifBadge() {
    const notifBtn = nav.querySelector('[data-route="/notifications"]');
    return notifBtn ? notifBtn.querySelector('.notification-badge') : null;
  }

  it('starts hidden when there are no unread notifications', () => {
    const badge = getNotifBadge();
    expect(badge).toBeTruthy();
    expect(badge.style.display === '' || badge.style.display === 'none').toBe(true);
  });

  it('shows unread count when notifications:updated emits with unread items', () => {
    const badge = getNotifBadge();
    eventBus.emit('notifications:updated', [{ id: '1', read: false }, { id: '2', read: true }]);
    expect(badge.style.display).toBe('flex');
    expect(badge.textContent).toBe('1');
  });

  it('hides when all notifications are read', () => {
    const badge = getNotifBadge();
    eventBus.emit('notifications:updated', [{ id: '1', read: false }]);
    expect(badge.style.display).toBe('flex');
    eventBus.emit('notifications:updated', [{ id: '1', read: true }]);
    expect(badge.style.display).toBe('none');
  });

  it('caps count at 99+', () => {
    const badge = getNotifBadge();
    const items = Array.from({ length: 120 }, (_, i) => ({ id: String(i + 1), read: i < 110 ? false : true }));
    eventBus.emit('notifications:updated', items);
    expect(badge.style.display).toBe('flex');
    expect(badge.textContent).toBe('99+');
  });
});
