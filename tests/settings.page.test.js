// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';

// Mock the legacy SettingsPage module that the shim imports
vi.mock('../src/js/config/SettingsPage.js', () => {
  return {
    renderSettings: vi.fn(async () => {
      const content = document.getElementById('app-content') || document.body;
      const el = document.createElement('div');
      el.id = 'settings-legacy';
      el.textContent = 'Settings OK';
      content.appendChild(el);
      return el;
    }),
  };
});

// Import the shim after mocks are set up
import { render as renderSettingsShim } from '../src/features/settings/SettingsPage.js';

describe('features/settings/SettingsPage shim', () => {
  it('delegates to legacy renderSettings and keeps content in #app-content', async () => {
    // Arrange
    const container = document.createElement('div');
    container.id = 'app-content';
    document.body.appendChild(container);

    // Act
    await renderSettingsShim(container);

    // Assert
    const legacyEl = document.getElementById('settings-legacy');
    expect(legacyEl).toBeTruthy();
    expect(legacyEl.textContent).toBe('Settings OK');
    // Ensure content is appended to #app-content
    expect(container.contains(legacyEl)).toBe(true);
  });
});
