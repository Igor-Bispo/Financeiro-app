// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { filterCategories } from '../src/core/search/fuzzy.js';

describe('Fuzzy Search - Categories (accent + typo)', () => {
  const categories = [
    { id: 'c1', nome: 'Alimentação', tipo: 'despesa', limite: 800 },
    { id: 'c2', nome: 'Transporte', tipo: 'despesa', limite: 300 },
    { id: 'c3', nome: 'Rendimentos Extras', tipo: 'receita', limite: null }
  ];

  it('accent-insensitive search (alimentacao)', () => {
    const r = filterCategories(categories, 'alimentacao');
    expect(r.map(c => c.id)).toEqual(['c1']);
  });

  it('typo tolerant (trasnporte -> Transporte)', () => {
    const r = filterCategories(categories, 'trasnporte');
    expect(r.map(c => c.id)).toEqual(['c2']);
  });

  it('numeric limit search (800)', () => {
    const r = filterCategories(categories, '800');
    expect(r.map(c => c.id)).toEqual(['c1']);
  });
});
