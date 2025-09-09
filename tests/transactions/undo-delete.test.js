import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock Snackbar to capture actions
vi.mock('@js/ui/Snackbar.js', () => {
  const calls = { show: [], actions: [] };
  const Snackbar = {
    show: (message, type = 'info', duration = 3000, action) => {
      calls.show.push({ message, type, duration, action });
      if (action && action.onClick) {
        // expose for test to trigger later
        calls.actions.push(action);
      }
    },
  };
  return { Snackbar, __calls: calls };
});

// Mock repo with in-memory list
const mem = { list: [], byId: new Map() };
vi.mock('@data/repositories/transactionsRepo.js', () => ({
  getById: vi.fn(async (id) => mem.byId.get(id) || null),
  remove: vi.fn(async (id) => { mem.byId.delete(id); mem.list = mem.list.filter(t => t.id !== id); }),
  create: vi.fn(async (data) => { const id = (Math.random()*1e9|0).toString(); const tx = { ...data, id }; mem.byId.set(id, tx); mem.list.unshift(tx); return { id }; })
}));

// Import after mocks
import { deleteTransactionWithNotifications } from '@features/transactions/service.js';
import { __calls as SnackbarCalls } from '@js/ui/Snackbar.js';

// Minimal window/appState
beforeEach(() => {
  global.window = Object.assign(global.window || {}, {
    appState: {
      currentUser: { uid: 'u1' },
      currentBudget: { id: 'b1' },
      transactions: [],
    },
    sendTransactionDeletedNotification: vi.fn(async () => {}),
    checkLimitesCategoria: vi.fn(() => {}),
    forceUIUpdate: vi.fn(() => {}),
  });
  mem.list = [];
  mem.byId = new Map();
  SnackbarCalls.show.length = 0;
  SnackbarCalls.actions.length = 0;
});

function seedTx() {
  const tx = { id: 't1', descricao: 'Café', valor: 10, tipo: 'despesa', budgetId: 'b1', createdAt: new Date() };
  mem.byId.set('t1', tx);
  mem.list = [tx];
  window.appState.transactions = [tx];
}

describe('transactions: undo delete flow', () => {
  it('removes then restores on undo click', async () => {
    seedTx();

    await deleteTransactionWithNotifications('t1');

    // Removed optimistically
    expect(window.appState.transactions.find(t => t.id === 't1')).toBeUndefined();

    // Snackbar called with action
    const last = SnackbarCalls.show.at(-1);
    expect(last).toBeTruthy();
    expect(last.action).toBeTruthy();

    // Trigger undo
    await last.action.onClick();

    // Restored with a new id
    expect(window.appState.transactions.length).toBe(1);
    expect(window.appState.transactions[0].descricao).toBe('Café');
  });
});
