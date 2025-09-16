// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { filterTransactions } from '../src/core/search/fuzzy.js';

describe('Fuzzy Search - Transactions (accent + typo + period)', () => {
  const base = [
    { id: 't1', descricao: 'Dízimo Igreja', valor: 100, createdAt: '2025-09-05', categoriaId: 'c1', tipo: 'despesa' },
    { id: 't2', descricao: 'Mercado Semanal', valor: 250, createdAt: '2025-09-02', categoriaId: 'c2', tipo: 'despesa' },
    { id: 't3', descricao: 'Salário', valor: 5000, createdAt: '2025-08-30', categoriaId: 'c3', tipo: 'receita' }
  ];
  const cats = [
    { id: 'c1', nome: 'Religioso' },
    { id: 'c2', nome: 'Alimentação' },
    { id: 'c3', nome: 'Rendimentos' }
  ];
  const period = { year: 2025, month: 9 }; // only September should match

  it('matches accent-insensitive query (dizimo -> Dízimo)', () => {
    const results = filterTransactions(base, cats, 'dizimo', period);
    expect(results.map(r => r.id)).toEqual(['t1']);
  });

  it('matches single-typo variant (dizmo -> Dízimo)', () => {
    const results = filterTransactions(base, cats, 'dizmo', period);
    expect(results.map(r => r.id)).toEqual(['t1']);
  });

  it('does not leak previous month transactions', () => {
    const results = filterTransactions(base, cats, 'salario', period);
    expect(results.length).toBe(0); // salary is previous month
  });

  it('searches also by category name and numeric value', () => {
    const byCategory = filterTransactions(base, cats, 'alimentacao', period);
    expect(byCategory.map(r => r.id)).toEqual(['t2']);
    const byValue = filterTransactions(base, cats, '250', period);
    expect(byValue.map(r => r.id)).toEqual(['t2']);
  });
});
