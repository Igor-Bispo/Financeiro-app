import { describe, it, expect } from 'vitest';
import { getTransactions, addTransaction } from '../index.js';

describe('transactions module', () => {
  it('getTransactions deve retornar um array', () => {
    const result = getTransactions();
    expect(Array.isArray(result)).toBe(true);
  });

  it('addTransaction deve ser uma função', () => {
    expect(typeof addTransaction).toBe('function');
  });
}); 