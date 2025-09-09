import { describe, it, expect, beforeEach, vi } from 'vitest';
import { eventBus } from '../src/core/events/eventBus.js';

describe('snackbarPrefs', () => {
  beforeEach(() => {
    // Clean storage and listeners
    localStorage.removeItem('snackbar_prefs_v1');
  });

  it('loads defaults and applies via event bus', async () => {
    const spy = vi.fn();
    const off = eventBus.on('snackbar:configure', spy);
    const mod = await import('../src/features/ui/snackbarPrefs.js');
    const prefs = mod.loadPrefs();
    expect(prefs.defaultDuration).toBeGreaterThanOrEqual(500);
    mod.applyPrefs(prefs);
    expect(spy).toHaveBeenCalled();
    off();
  });

  it('saves and sanitizes custom values', async () => {
    const mod = await import('../src/features/ui/snackbarPrefs.js');
    const saved = mod.savePrefs({ defaultDuration: '1200', maxQueue: '0', position: 'top', align: 'right', bottom: -10, cooldownMs: -5, hoverPause: 'false' });
    expect(saved.defaultDuration).toBe(1200);
    expect(saved.maxQueue).toBe(1);
    expect(saved.bottom).toBe(0);
    expect(saved.cooldownMs).toBe(0);
    expect(saved.position).toBe('top');
    expect(saved.align).toBe('right');
    expect(saved.hoverPause).toBe(false);
  });
});
