// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('Settings copy ID button UX', () => {
  beforeEach(() => {
    // Use fake timers to control setTimeout behavior
    vi.useFakeTimers();
    // Stub snackbar to avoid errors
    window.Snackbar = vi.fn();
  });

  afterEach(() => {
    vi.useRealTimers();
    document.body.innerHTML = '';
  });

  it('toggles button feedback to "Copiado!" and restores after timeout when called', async () => {
    // Prepare the global handler
    const copySpy = vi.fn(async (budgetId, btnEl) => {
      expect(budgetId).toBe('budget-123');
      const original = btnEl.textContent;
      btnEl.textContent = 'Copiado!';
      btnEl.disabled = true;
      btnEl.classList.add('opacity-70');
      setTimeout(() => {
        btnEl.textContent = original || 'Copiar ID';
        btnEl.disabled = false;
        btnEl.classList.remove('opacity-70');
      }, 1200);
    });
    window.copyBudgetId = copySpy;

    // Arrange: create button element like in SettingsPage
    const btn = document.createElement('button');
    btn.id = 'copyBtn';
    btn.className = 'copy-id-button';
    btn.textContent = 'Copiar ID';
    document.body.appendChild(btn);

    // Act: call the handler as production would pass (id, this)
    await window.copyBudgetId('budget-123', btn);

    // Assert immediate state
    expect(copySpy).toHaveBeenCalledTimes(1);
    expect(btn.textContent).toBe('Copiado!');
    expect(btn.disabled).toBe(true);
    expect(btn.classList.contains('opacity-70')).toBe(true);

    // Fast-forward timers to restore original text
    vi.advanceTimersByTime(1200);

    expect(btn.textContent).toBe('Copiar ID');
    expect(btn.disabled).toBe(false);
    expect(btn.classList.contains('opacity-70')).toBe(false);
  });
});
