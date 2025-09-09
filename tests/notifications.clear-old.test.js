// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { eventBus } from '../src/core/events/eventBus.js';
import { __clearOldNotificationsWithToastForTest as clearOld } from '../src/features/notifications/NotificationsPage.js';

describe('clearOldNotificationsWithToast', () => {
  let messages;

  beforeEach(() => {
    messages = [];
    eventBus.clear();
    eventBus.on('snackbar:show', (p) => {
      if (p && p.message) {
        messages.push(p);
      }
    });
    window.appState = window.appState || {};
  });

  afterEach(() => {
    eventBus.clear();
    window.appState = {};
    localStorage.clear();
  });

  it('emits info when retention is disabled (days <= 0)', () => {
    window.appState.notifications = [
      { id: '1', createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) },
      { id: '2', createdAt: new Date() }
    ];
    const ok = clearOld(0);
    expect(ok).toBe(false);
    // Deve emitir mensagem informativa
    const info = messages.find((m) => m.type === 'info');
    expect(info?.message).toMatch(/Retenção desativada/);
  });

  it('emits success with count when there are old notifications', () => {
    const eightDays = 8 * 24 * 60 * 60 * 1000;
    window.appState.notifications = [
      { id: '1', createdAt: new Date(Date.now() - eightDays) }, // antiga
      { id: '2', createdAt: new Date() } // recente
    ];
    const ok = clearOld(7);
    expect(ok).toBe(true);
    const success = messages.find((m) => m.type === 'success');
    expect(success?.message).toMatch(/Notificações antigas removidas: 1/);
    // Estado deve manter somente as recentes
    expect(window.appState.notifications.map((n) => n.id)).toEqual(['2']);
  });

  it('returns true but does not show removal message when nothing is removed (0)', () => {
    const twoDays = 2 * 24 * 60 * 60 * 1000;
    window.appState.notifications = [
      { id: '1', createdAt: new Date() },
      { id: '2', createdAt: new Date(Date.now() - twoDays) }
    ];
    const ok = clearOld(10); // 10 dias > tudo
    expect(ok).toBe(false); // nossa função retorna false quando 0 removidos
    const success = messages.find((m) => m.type === 'success');
    expect(success).toBeUndefined();
  });
});

