import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../src/data/repositories/recurringRepo.js', () => ({
  listByBudget: vi.fn(async () => []),
  create: vi.fn(async (_d) => ({ id: 'new-rec' })),
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

  it('não passa da última parcela mesmo com meses posteriores', () => {
    const r = { id: 'r2', dataInicio: '2025-01-10', parcelasTotal: 3, ativa: true };
    const sApr = calcularStatusRecorrente(r, [], 2025, 4); // mês 4 seria > total
    expect(sApr.parcelaAtual).toBe(3);
    expect(sApr.aposUltimaParcela).toBe(true);
  });

  it('respeita efetivarMesAtual=false (primeira aplicação só mês seguinte) ao virar ano', () => {
    const r = { id: 'r3', dataInicio: '2025-12-20', parcelasTotal: 5, efetivarMesAtual: false };
    const sDec = calcularStatusRecorrente(r, [], 2025, 12);
    const sJan = calcularStatusRecorrente(r, [], 2026, 1);
    expect(sDec.antesDaPrimeiraParcela).toBe(true);
    expect(sJan.parcelaAtual).toBe(1);
  });

  it('evita duplicação quando já existe transação com mesma parcela/total no mês', async () => {
    const { listByBudget } = await import('../src/data/repositories/recurringRepo.js');
    const rec = { id: 'rx', descricao: 'Plano X', ativa: true, dataInicio: '2025-01-01', parcelasTotal: 12 };
    listByBudget.mockResolvedValueOnce([rec]);
    // Injetar transações do mês com parcela coerente
    const now = new Date();
    const mes = now.getMonth() + 1; const ano = now.getFullYear();
    const createdAt = new Date(ano, mes - 1, 5).toISOString();
    global.window.appState.transactions = [{ recorrenteId: 'rx', descricao: 'Plano X', parcelasTotal: 12, parcelaAtual: calcularParcelaRecorrente(rec, ano, mes), createdAt }];
    const res = await aplicarRecorrentesDoMes('u1', 'b1', true, ano, mes);
    expect(res.aplicadas).toBe(0);
    expect(res.pendentes).toBe(0);
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

  it('auto-inativa após aplicar última parcela quando só há parcelasTotal', async () => {
    const { listByBudget, update } = await import('../src/data/repositories/recurringRepo.js');
    const rec = {
      id: 'r-last',
      descricao: 'Curso X',
      ativa: true,
      dataInicio: '2025-01-01',
      parcelasTotal: 1, // somente total, sem parcelasRestantes
      parcelasRestantes: null,
      valor: 100,
    };
    listByBudget.mockResolvedValueOnce([rec]);
    const res = await aplicarRecorrentesDoMes('u1', 'b1', true, 2025, 1);
    expect(res.aplicadas).toBe(1);
    // Deve ter marcado como inativa após a aplicação da última parcela
    expect(update).toHaveBeenCalled();
    const lastCall = update.mock.calls.at(-1);
    expect(lastCall[0]).toBe('r-last');
    expect(lastCall[1]).toMatchObject({ ativa: false });
  });
});
