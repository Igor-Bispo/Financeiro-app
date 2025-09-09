// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Snackbar } from '../src/js/ui/Snackbar.js';

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }
async function waitFor(check, timeout = 500) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    const res = check();
    if (res) {
      return res;
    }
    await delay(10);
  }
  throw new Error('waitFor timeout');
}

describe('Snackbar enhancements', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    Snackbar.configure({ defaultDuration: 200, position: 'bottom', align: 'center', hoverPause: false });
  });

  afterEach(() => {
    try { Snackbar.closeCurrent?.(); } catch {}
    try { Snackbar.clearQueue?.(); } catch {}
    document.body.innerHTML = '';
  });

  it('coalesces duplicate messages and increments count badge', async () => {
    Snackbar.show('Ping', 'info', 500);
    const el = await waitFor(() => document.querySelector('[data-snackbar="1"]'));
    expect(el).toBeTruthy();
    // Fire same message again: should not create new element, should show ×2
    Snackbar.show('Ping', 'info', 500);
    const all = document.querySelectorAll('[data-snackbar="1"]').length;
    expect(all).toBe(1);
    const badge = el.querySelector('.snackbar-count');
    expect(badge).toBeTruthy();
    expect(badge.classList.contains('hidden')).toBe(false);
    expect(badge.textContent).toMatch(/^×2$/);
  });

  it('respects position=top and align=right configuration', async () => {
    Snackbar.configure({ position: 'top', align: 'right', bottom: 24, defaultDuration: 200 });
    Snackbar.show('Config test', 'info', 200);
    const el = await waitFor(() => document.querySelector('[data-snackbar="1"]'));
    expect(el.getAttribute('data-pos')).toBe('top');
    expect(el.getAttribute('data-align')).toBe('right');
  // Inline styles should reflect top placement and right alignment
  // For top placement, bottom should be empty and top should be set
  expect(el.style.bottom).toBe('');
  expect(el.style.top).not.toBe('');
  // For right alignment, right is set, left cleared, and transform none
  expect(el.style.right).toBe('16px');
  expect(el.style.left).toBe('');
  expect(el.style.transform).toBe('none');
  });
});
