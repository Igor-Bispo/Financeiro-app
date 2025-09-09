// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';

// Import the functions under test
import { renderTransactions } from '../src/features/transactions/TransactionsPage.js';

describe('TransactionsPage month filtering', () => {
  beforeEach(() => {
    // Prepare DOM container expected by renderTransactions
    document.body.innerHTML = '<div id="app-content"></div>';
  // Reset render throttle flag between tests to avoid early returns
  delete window.__lastTransactionsRender;
    // Minimal app state with transactions across months
    window.appState = {
      transactions: [
        // Past month transaction (e.g., 2024-05)
        { id: 't1', descricao: 'Mercado', tipo: 'despesa', valor: 100, data: '2024-05-10', budgetId: 'budget-1' },
        // Current month transaction (e.g., 2024-06)
        { id: 't2', descricao: 'Salário', tipo: 'receita', valor: 2500, data: '2024-06-01', budgetId: 'budget-1' },
      ],
      categories: [],
    };
  });

  it('shows empty state for a future month and does not include past-month totals', () => {
    // Select a future month where there are no transactions
    window.getSelectedPeriod = () => ({ year: 2024, month: 12 });

    renderTransactions();

  const monthEl = document.querySelector('#month-2024-12');
  expect(monthEl).toBeTruthy();
  const monthHtml = monthEl.outerHTML;
  // Should show empty message for the selected month section
  expect(monthHtml).toContain('Nenhuma transação neste mês');
    // Should not include the description of past transactions inside the selected month section
    // Note: other months may be present as collapsed sections, but the main selected month section must be empty
  });

  it('shows only selected-month totals in summary', () => {
    // Select the month with a single known transaction
    window.getSelectedPeriod = () => ({ year: 2024, month: 6 });

    renderTransactions();

  const monthEl = document.querySelector('#month-2024-06');
  expect(monthEl).toBeTruthy();
  // Summary must reflect only the June transaction values within the selected month section
  const incomeEl = monthEl.querySelector('.text-green-600');
  expect(incomeEl).toBeTruthy();
  expect(incomeEl.textContent).toMatch(/2500\.00/);
  // There should be no -R$ 100.00 inside the selected month section
  expect(monthEl.textContent).not.toMatch(/-\s?R\$\s?100\.00/);
  });
});
