import { describe, it, expect, beforeEach } from 'vitest';
import { parseYmFromHash, ensureHashHasYm, setSelectedPeriod, getSelectedPeriod } from '@core/utils/globalUtils.js';

// jsdom already provides window/location/history

describe('globalUtils: ?ym sync helpers', () => {

  beforeEach(() => {
    // Reset URL between tests (jsdom-friendly)
    window.location.hash = '#/transactions';
    try { localStorage.removeItem('selectedYM'); } catch {}
  });

  it('parseYmFromHash returns null when missing', () => {
    expect(parseYmFromHash()).toBeNull();
  });

  it('parseYmFromHash reads ym from hash', () => {
    window.location.hash = '#/transactions?ym=2024-11';
    const p = parseYmFromHash();
    expect(p).toEqual({ year: 2024, month: 11 });
  });

  it('ensureHashHasYm writes ym when absent', () => {
    ensureHashHasYm(2025, 3);
    expect(window.location.hash).toBe('#/transactions?ym=2025-03');
  });

  it('ensureHashHasYm updates ym when different', () => {
    window.location.hash = '#/transactions?ym=2024-01';
    ensureHashHasYm(2023, 12);
    expect(window.location.hash).toBe('#/transactions?ym=2023-12');
  });

  it('setSelectedPeriod persists and syncs hash', () => {
    window.location.hash = '#/transactions';
    setSelectedPeriod(2022, 7);
    expect(getSelectedPeriod()).toEqual({ year: 2022, month: 7 });
    expect(window.location.hash).toBe('#/transactions?ym=2022-07');
    // Also persisted
    const saved = localStorage.getItem('selectedYM');
    expect(saved).toBe('2022-07');
  });
});
