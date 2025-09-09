import { describe, it, expect, beforeEach } from 'vitest';
import { BottomNav } from '../src/js/ui/BottomNav.js';
import { eventBus } from '../src/core/events/eventBus.js';

describe('Update indicator on Settings tab', () => {
  let nav;
  beforeEach(() => {
    // Clean DOM
    document.body.innerHTML = '';
  // Ensure no prior flag
  try { window.__updateAvailable = false; } catch {}
    nav = BottomNav('/dashboard');
    document.body.appendChild(nav);
  });

  it('renders dot hidden by default and shows when update is available', async () => {
    const settingsBtn = nav.querySelector('button[data-route="/settings"]');
    expect(settingsBtn).toBeTruthy();
    const dot = settingsBtn.querySelector('.update-dot');
    expect(dot).toBeTruthy();
    // Initially hidden
    expect(dot.style.display).toBe('none');
    // Emit update available
    eventBus.emit('update:available', true);
    // Dot should be visible
    expect(dot.style.display).toBe('block');
    // Emit update applied
    eventBus.emit('update:available', false);
    expect(dot.style.display).toBe('none');
  });
});
