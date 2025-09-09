import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock features/auth/service logout to observe calls (use alias to match dynamic import)
vi.mock('@features/auth/service.js', () => ({
  logout: vi.fn(async () => {})
}));

import { logout as mockedLogout } from '@features/auth/service.js';
import { renderSettings } from '../src/js/config/SettingsPage.js';

function setupDom() {
  document.body.innerHTML = '<div id="app-content"></div>';
}

describe('SettingsPage - Logout button', () => {
  beforeEach(() => {
    setupDom();
    // Ensure clean state
    window.appState = { currentUser: { uid: 'u1', email: 'user@test.com' } };
    // Stub snackbar and toggleLoginPage to avoid errors
    window.Snackbar = vi.fn();
    window.toggleLoginPage = vi.fn();
  });

  it('renders "Sair da conta" button when user is logged in and triggers logout', async () => {
    // Intercept confirmation modal to auto-confirm
    window.showConfirmationModal = ({ onConfirm }) => onConfirm && onConfirm();

    await renderSettings();

    const btn = document.getElementById('btn-logout');
    expect(btn).toBeTruthy();

  // aciona diretamente o handler global para evitar dependência de binding no jsdom
  await window.handleLogoutClick();
  // allow async handler to resolve
  await Promise.resolve();
  await Promise.resolve();

    expect(mockedLogout).toHaveBeenCalledTimes(1);
    // Snackbar called with success/info message
    expect(window.Snackbar).toHaveBeenCalled();
  });

  it('does not render logout button when no user', async () => {
    setupDom();
    window.appState = { currentUser: null };

    await renderSettings();

    const btn = document.getElementById('btn-logout');
    expect(btn).toBeFalsy();
  });
});
