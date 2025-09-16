// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock Firestore client and APIs used by categoriesRepo
vi.mock('../src/data/firebase/client.js', () => ({ db: {} }));
vi.mock('firebase/firestore', () => ({
  collection: vi.fn(() => ({})),
  addDoc: vi.fn(async () => ({ id: 'cat-123' })),
}));

import { createCategory, categoriesStore } from '../src/features/categories/service.js';

describe('Categorias - integração: criar categoria aparece na lista do orçamento atual', () => {
  beforeEach(() => {
    // Estado global mínimo
    global.window = Object.assign(global.window || {}, {
      appState: {
        currentBudget: { id: 'b1' },
        currentUser: { uid: 'u1' },
        categories: [],
        transactions: [],
        recorrentes: [],
        selectedYear: 2024,
        selectedMonth: 6,
      },
    });
    // Reset store
    categoriesStore.setState({ categories: [], loading: false, error: null });
  });

  it('enriquece DTO com budgetId/userId, cria e atualiza store e appState', async () => {
    const dto = { nome: 'Alimentação', tipo: 'despesa', cor: '#f00' };

    const created = await createCategory(dto);

    // Retorno correto
    expect(created).toBeDefined();
    expect(created.id).toBe('cat-123');
    expect(created.nome).toBe('Alimentação');
    expect(created.tipo).toBe('despesa');
    expect(created.budgetId).toBe('b1');
    expect(created.userId).toBe('u1');

    // Store atualizado
    const state = categoriesStore.getState();
    expect(Array.isArray(state.categories)).toBe(true);
    const foundInStore = state.categories.find(c => c.id === 'cat-123');
    expect(foundInStore).toBeTruthy();
    expect(foundInStore.budgetId).toBe('b1');

    // appState atualizado
    const foundInGlobal = window.appState.categories.find(c => c.id === 'cat-123');
    expect(foundInGlobal).toBeTruthy();
    expect(foundInGlobal.nome).toBe('Alimentação');
  });
});
