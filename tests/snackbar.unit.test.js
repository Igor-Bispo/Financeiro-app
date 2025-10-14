// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';

// Import after mocks
import { Snackbar } from '../src/js/ui/Snackbar.js';

describe('Snackbar', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    // Configure shorter duration for tests
    Snackbar.configure({ defaultDuration: 100 });
  });

  it('shows and auto-dismisses via direct API', async () => {
    Snackbar.show('Hello', 'info', 50);
    // Element exists
    const el = await waitFor(() => document.querySelector('[data-snackbar="1"]'));
    expect(el).toBeTruthy();
    // Auto-dismiss: aguarda até ser removido
    await waitFor(() => !document.querySelector('[data-snackbar="1"]'), 600);
  });

  it('deduplicates consecutive same messages', () => {
    Snackbar.show('Same', 'info', 500);
    Snackbar.show('Same', 'info', 500);
    // Only one should be in queue/show
    expect(document.querySelectorAll('[data-snackbar="1"]').length).toBe(1);
  });

  it('supports event-bus triggering via Snackbar.emit', async () => {
    // Emit using helper (fires bus and has fallback)
    Snackbar.emit({ message: 'From bus', type: 'success', duration: 50 });
    const el = await waitFor(() => document.querySelector('[data-snackbar="1"]'));
    expect(el.textContent).toMatch(/From bus/);
  });
});

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }
async function waitFor(check, timeout = 500) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    const res = check();
    if (res) { return res; }
    await delay(10);
  }
  throw new Error('waitFor timeout');
}
