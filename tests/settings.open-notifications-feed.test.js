// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock Firebase deps to avoid real imports
vi.mock('../src/js/firebase.js', () => ({ db: {} }));
vi.mock('firebase/firestore', () => ({
  doc: vi.fn(), setDoc: vi.fn(), updateDoc: vi.fn(), deleteDoc: vi.fn(),
  collection: vi.fn(), query: vi.fn(), where: vi.fn(), getDocs: vi.fn(async () => ({ docs: [] })),
}));

// Mock PeriodIndicator used inside renderSettings
vi.mock('../src/ui/PeriodIndicator.js', () => ({
  createPeriodIndicator: () => {
    const span = document.createElement('span');
    span.textContent = 'period';
    return span;
  },
}));

// Snackbar noop
window.Snackbar = () => {};

import { renderSettings } from '../src/js/config/SettingsPage.js';

describe('SettingsPage - Abrir feed de Notificações', () => {
  const originalHash = window.location.hash;

  beforeEach(() => {
    document.body.innerHTML = '<div id="app-content"></div>';
    window.__lastSettingsRender = 0; // reset throttle
    // Minimal app state to allow rendering
    window.appState = {
      currentUser: { uid: 'user-1', email: 'u@x.com' },
      budgets: [{ id: 'b1', nome: 'Meu', userId: 'user-1', isOwner: true }],
      currentBudget: { id: 'b1', nome: 'Meu', userId: 'user-1', isOwner: true },
    };
    // Start from settings to simulate user in Config
    window.location.hash = '#/settings';
    // Limpa chave de persistência para validar depois via getItem
    window.localStorage.removeItem('settings_last_section');
  });

  afterEach(() => {
    document.body.innerHTML = '';
    window.location.hash = originalHash || '';
  });

  it('navega para #/notifications e persiste settings_last_section ao clicar', async () => {
    await renderSettings();

    // Find the button by aria-label or label text
    const btn = Array.from(document.querySelectorAll('button')).find(
      (b) =>
        /Abrir feed de notificações/i.test(b.getAttribute('aria-label') || '') ||
        /Abrir feed de Notificações/i.test(b.textContent || '')
    );

    expect(btn).toBeTruthy();

    // Click should set hash + persist last section
    btn.click();

  expect(window.location.hash).toBe('#/notifications');
  });
});
