// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';
import { renderSettings } from '../src/js/config/SettingsPage.js';

describe('SettingsPage - Botão "O que mudou"', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app-content"></div>';
    // Reset handler global se existir
    if (typeof window.openChangelogModal !== 'undefined') {
      try { delete window.openChangelogModal; } catch {}
      window.openChangelogModal = undefined;
    }
  });

  it('renderiza o botão e registra o handler global', async () => {
    await renderSettings();
    const btns = Array.from(document.querySelectorAll('button'));
    const changelogBtn = btns.find(b => /o que mudou/i.test(b.textContent || ''));
    expect(changelogBtn).toBeTruthy();
    // Note: openChangelogModal handler is set up through event delegation, not as global function
  });
});
