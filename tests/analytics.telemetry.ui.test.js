// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock perf telemetry module before importing the UI helper
const sampleLog = [
  { ts: 1730563200000, event: 'page:analytics', durationMs: 12.3 },
  { ts: 1730563201000, event: 'tx:render', durationMs: 80.0, extra: { chunk: 1 } },
  { ts: 1730563202000, event: 'tx:render', durationMs: 45.5 },
  { ts: 1730563203000, event: 'categories:load', durationMs: 5.1 },
];

vi.mock('../src/core/telemetry/perf.js', () => ({
  default: {
    isEnabled: () => true,
    getLog: () => [...sampleLog],
  },
  isEnabled: () => true,
  getLog: () => [...sampleLog],
}));

// Import after mocks
import { renderTelemetrySection } from '../src/js/ui/AnalyticsPage.js';

describe('Analytics Telemetria Local UI', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
    try { delete window.__lastExportCsv; } catch {}
  });

  it('renders, filters by event and min duration, and exports CSV', () => {
    const container = document.getElementById('root');
    renderTelemetrySection(container, { year: 2025, month: 8 });

    // Initial count equals total events
    const countEl = container.querySelector('#telem-count');
    expect(countEl).toBeTruthy();
    expect(countEl.textContent).toBe(String(sampleLog.length));

    // Filter by specific event
    const eventSel = container.querySelector('[data-testid="telem-event-filter"]');
    expect(eventSel).toBeTruthy();
    eventSel.value = 'tx:render';
  eventSel.dispatchEvent(new window.Event('change'));
    expect(countEl.textContent).toBe('2');

    // Filter by min duration (>= 60ms leaves only the 80ms entry)
    const minInput = container.querySelector('[data-testid="telem-min-duration"]');
    minInput.value = '60';
  minInput.dispatchEvent(new window.Event('input'));
    expect(countEl.textContent).toBe('1');

    // Export CSV should populate window.__lastExportCsv and include header + event data
    const exportBtn = container.querySelector('[data-testid="telem-export"]');
    exportBtn.click();
    expect(typeof window.__lastExportCsv).toBe('string');
    expect(window.__lastExportCsv.startsWith('ts,event,durationMs,meta')).toBe(true);
    expect(window.__lastExportCsv).toMatch(/tx:render/);
  });
});
