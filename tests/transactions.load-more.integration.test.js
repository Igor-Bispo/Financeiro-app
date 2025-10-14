import { describe, it, expect, beforeEach } from 'vitest';

// Testa o fluxo de loadMoreDayGroups sem IntersectionObserver
// Valida: HTML inserido e avanço do nextIndex no cache

describe('TransactionsPage: loadMoreDayGroups integration (no IO)', () => {
  let mod;
  const ym = '2025-08';

  function mockDOM() {
    document.body.innerHTML = `
      <div id="tx-day-items-${ym}"></div>
      <div id="scroll-sentinel-${ym}"></div>
    `;
  }

  function seedState() {
    const helpers = window.__txTestHelpers || {};
    const cache = helpers.ensureGroupCache ? helpers.ensureGroupCache() : {};
    // cria 25 chaves simuladas (dias)
    const keys = Array.from({ length: 25 }, (_, i) => `2025-08-${String(25 - i).padStart(2, '0')}`);
    const groups = Object.fromEntries(keys.map(k => [k, [{ t: { id: `t-${k}`, descricao: `TX ${k}`, tipo: 'despesa', valor: 10 }, d: new Date(k) }]]));
    cache[ym] = { keys, groups, nextIndex: 0, ano: 2025, mes: 8 };
    return cache;
  }

  beforeEach(async () => {
    mockDOM();
    // Mock mínimo de APIs usadas
    global.window = Object.assign(global.window || {}, {
      appState: { categories: [] }
    });
    // Import fresco do módulo a cada teste
    mod = await import('../src/features/transactions/TransactionsPage.js');
  });

  it('insere primeiro chunk e avança nextIndex; segundo chunk idem; oculta sentinel no fim', () => {
    const cache = seedState();

    // Simula ambiente de tela pequena/memória baixa para chunk=10
    Object.defineProperty(window, 'innerHeight', { value: 650, configurable: true });
    Object.defineProperty(global, 'navigator', { value: { deviceMemory: 2 }, configurable: true });

    // 1º load
    mod.loadMoreDayGroups(ym);
    expect(cache[ym].nextIndex).toBe(10);
    const container = document.getElementById(`tx-day-items-${ym}`);
    expect(container.innerHTML).toContain('list-item');

    // 2º load
    mod.loadMoreDayGroups(ym);
    expect(cache[ym].nextIndex).toBe(20);

    // 3º load (finaliza 25 -> 20 + 10 => end limitado a 25)
    mod.loadMoreDayGroups(ym);
    expect(cache[ym].nextIndex).toBe(25);

    // Sentinel some ao terminar
    const sen = document.getElementById(`scroll-sentinel-${ym}`);
    expect(sen.style.display).toBe('none');

    // cleanup propriedades mockadas
    delete global.navigator;
  });
});
