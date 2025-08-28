import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../src/data/repositories/recurringRepo.js', () => ({
  listByBudget: vi.fn(async () => []),
  create: vi.fn(async (d) => ({ id: 'new-rec' })),
  update: vi.fn(async () => {}),
  remove: vi.fn(async () => {}),
}));

vi.mock('../src/data/repositories/transactionsRepo.js', () => ({
  createFromRecurring: vi.fn(async () => ({ id: 'tx-1' })),
}));

vi.mock('../src/data/repositories/logRepo.js', () => ({
  addRecurringApplication: vi.fn(async () => {}),
  deleteOlderThanOneYear: vi.fn(async () => 3),
}));

import {
  calcularParcelaRecorrente,
  calcularStatusRecorrente,
  aplicarRecorrentesDoMes,
  limparLogsAntigos,
  addRecorrente,
} from '../src/features/recorrentes/service.js';

describe('recorrentes service', () => {
  beforeEach(() => {
    global.window = { appState: { transactions: [], recorrentes: [] } };
  });

  it('calcularParcelaRecorrente calcula corretamente', () => {
    const r = { dataInicio: '2025-01-15', parcelasTotal: 10 };
    const p = calcularParcelaRecorrente(r, 2025, 3);
    expect(p).toBe(3);
  });

  it('calcularStatusRecorrente marca como não efetivada por padrão', () => {
    const r = { id: 'r1', dataInicio: '2025-01-01', parcelasTotal: 5, ativa: true };
    const status = calcularStatusRecorrente(r, [] , 2025, 2);
    expect(status.foiEfetivadaEsteMes).toBe(false);
    expect(status.temParcelas).toBe(true);
  });

  it('aplicarRecorrentesDoMes respeita forcarAplicacao=false', async () => {
    const { listByBudget } = await import('../src/data/repositories/recurringRepo.js');
    listByBudget.mockResolvedValueOnce([{ id: 'r1', descricao: 'Netflix', ativa: true, dataInicio: '2024-01-01', parcelasRestantes: null }]);
    const res = await aplicarRecorrentesDoMes('u1', 'b1', false);
    expect(res.total).toBe(1);
    expect(res.aplicadas).toBe(0);
    expect(res.pendentes).toBe(1);
  });

  it('limparLogsAntigos retorna quantidade', async () => {
    const n = await limparLogsAntigos('u1');
    expect(n).toBe(3);
  });

  it('addRecorrente retorna id', async () => {
    const id = await addRecorrente('u1', 'b1', { descricao: 'Gym' });
    expect(id).toBeTypeOf('string');
  });
});
