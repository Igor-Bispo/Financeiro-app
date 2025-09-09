// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { eventBus } from '../src/core/events/eventBus.js';
import { Snackbar } from '../src/js/ui/Snackbar.js';

describe('Snackbar metrics', () => {
  beforeEach(() => {
    // reset DOM and stats
    document.body.innerHTML = '';
    Snackbar.configure({ defaultDuration: 50, cooldownMs: 0 });
    Snackbar.__resetStatsForTest();
  });

  it('tracks total and per-type counts', async () => {
    vi.useFakeTimers();
    eventBus.emit('snackbar:show', { message: 'A1', type: 'info', duration: 30 });
    eventBus.emit('snackbar:show', { message: 'A2', type: 'success', duration: 30 });
    eventBus.emit('snackbar:show', { message: 'A3', type: 'success', duration: 30 });

    // allow scheduling
    vi.advanceTimersByTime(5);

    const stats = Snackbar.__getStatsForTest();
    expect(stats.totalShown).toBe(3);
    expect(stats.byType.success).toBe(2);
    expect(stats.byType.info).toBe(1);
    expect(stats.last).toEqual({ type: 'success', message: 'A3' });

    // Let them auto-dismiss without errors
    vi.advanceTimersByTime(200);
    vi.useRealTimers();
  });
});
