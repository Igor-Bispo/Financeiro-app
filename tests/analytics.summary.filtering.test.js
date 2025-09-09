// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock firebase imports used by Analytics to avoid real Firestore access
vi.mock('../src/js/firebase.js', () => ({ db: {} }));
vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  getDocs: vi.fn(async () => ({ docs: [] })),
  orderBy: vi.fn(),
  limit: vi.fn(),
}));

import { Analytics } from '../src/js/ui/Analytics.js';

describe('Analytics summary respects selected month only', () => {
  beforeEach(() => {
    // Provide transactions from different months
    window.appState = {
      currentUser: { uid: 'u1' },
      transactions: [
        { id: 't1', tipo: 'despesa', valor: 100, data: '2024-05-15', budgetId: 'b1' },
        { id: 't2', tipo: 'receita', valor: 2500, data: '2024-06-01', budgetId: 'b1' },
      ],
      categories: [ { id: 'c1', nome: 'Geral', cor: '#333', budgetId: 'b1' } ],
    };
  });

  it('future month with no transactions yields zeroed resumo', async () => {
    const start = new Date(2024, 11, 1); // Dec 2024
    const end = new Date(2024, 11, 31);
    const report = await Analytics.gerarRelatorioCompleto('b1', start, end);
    expect(report.resumo.receitasMes).toBe(0);
    expect(report.resumo.despesasMes).toBe(0);
    expect(report.resumo.saldoAtual).toBe(0);
  });

  it('selected month shows only its own values', async () => {
    const start = new Date(2024, 5, 1); // Jun 2024
    const end = new Date(2024, 5, 30);
    const report = await Analytics.gerarRelatorioCompleto('b1', start, end);
    expect(report.resumo.receitasMes).toBe(2500);
    expect(report.resumo.despesasMes).toBe(0);
    expect(report.resumo.saldoAtual).toBe(2500);
  });
});
