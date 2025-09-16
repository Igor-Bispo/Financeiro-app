// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { __isToastAllowedForTest as isToastAllowed } from '../src/features/notifications/notificationsController.js';

describe('notificationsController.isToastAllowed', () => {
  beforeEach(() => {
    // Reset localStorage and DOM between tests
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('returns false when global toasts are disabled via localStorage', () => {
    localStorage.setItem('notif_toasts_enabled', 'false');
    const prefs = {};
    const notif = { type: 'new_transaction', budgetId: 'b1' };
    expect(isToastAllowed(prefs, notif)).toBe(false);
  });

  it('returns true by default when global key is missing (enabled by default)', () => {
    // No key set means enabled
    const prefs = {};
    const notif = { type: 'new_transaction', budgetId: 'b1' };
    expect(isToastAllowed(prefs, notif)).toBe(true);
  });

  it('returns true when notif lacks type or budgetId (fails open)', () => {
    localStorage.setItem('notif_toasts_enabled', 'true');
    const prefs = {};
    expect(isToastAllowed(prefs, { budgetId: 'b1' })).toBe(true);
    expect(isToastAllowed(prefs, { type: 'new_transaction' })).toBe(true);
  });

  it('returns true when there are no per-budget preferences for the notif budget', () => {
    localStorage.setItem('notif_toasts_enabled', 'true');
    const prefs = { byBudget: { other: { allow: { new_transaction: false } } } };
    const notif = { type: 'new_transaction', budgetId: 'b1' };
    expect(isToastAllowed(prefs, notif)).toBe(true);
  });

  it('returns false when per-budget allow map explicitly disables the type', () => {
    localStorage.setItem('notif_toasts_enabled', 'true');
    const prefs = { byBudget: { b1: { allow: { new_transaction: false } } } };
    const notif = { type: 'new_transaction', budgetId: 'b1' };
    expect(isToastAllowed(prefs, notif)).toBe(false);
  });

  it('returns true when per-budget allow map explicitly enables the type', () => {
    localStorage.setItem('notif_toasts_enabled', 'true');
    const prefs = { byBudget: { b1: { allow: { new_transaction: true } } } };
    const notif = { type: 'new_transaction', budgetId: 'b1' };
    expect(isToastAllowed(prefs, notif)).toBe(true);
  });

  it('returns true for unspecified types (default allow)', () => {
    localStorage.setItem('notif_toasts_enabled', 'true');
    const prefs = { byBudget: { b1: { allow: { updated_transaction: false } } } };
    const notif = { type: 'category_added', budgetId: 'b1' };
    expect(isToastAllowed(prefs, notif)).toBe(true);
  });
});
