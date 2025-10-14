import { describe, it, expect, beforeEach, vi } from 'vitest';

// Integração: múltiplos meses, criação/desconexão de observers e teardown seguro

describe('TransactionsPage: infinite scroll multi-month + teardown', () => {
  let mod;
  const ym1 = '2025-07';
  const ym2 = '2025-06';
  const ym3 = '2025-05';

  // Mock IntersectionObserver que guarda instâncias e callbacks
  let instances;
  function installMockIO() {
    instances = [];
    class MockIO {
      constructor(cb, options) {
        this.cb = cb;
        this.options = options;
        this.observe = vi.fn(el => { this.target = el; });
        this.unobserve = vi.fn();
        this.disconnect = vi.fn();
        instances.push(this);
      }
    }
    // Override do mock configurado em tests/setup.js
    Object.defineProperty(window, 'IntersectionObserver', { value: MockIO, configurable: true });
    Object.defineProperty(global, 'IntersectionObserver', { value: MockIO, configurable: true });
  }

  function seedMonthDOM(ym) {
    const container = document.createElement('div');
    container.id = `tx-day-items-${ym}`;
    const sentinel = document.createElement('div');
    sentinel.id = `scroll-sentinel-${ym}`;
    const btn = document.createElement('button');
    btn.id = `more-days-${ym}`;
    document.body.appendChild(container);
    document.body.appendChild(btn);
    document.body.appendChild(sentinel);
  }

  function seedCache(ym, totalDays) {
    const helpers = window.__txTestHelpers || {};
    const cache = helpers.ensureGroupCache ? helpers.ensureGroupCache() : {};
    const [y, m] = ym.split('-').map(n => parseInt(n, 10));
    const keys = Array.from({ length: totalDays }, (_, i) => {
      const day = String(totalDays - i).padStart(2, '0');
      return `${ym}-${day}`;
    });
    const groups = Object.fromEntries(keys.map(k => [k, [{ t: { id: `t-${k}`, descricao: `TX ${k}`, tipo: 'despesa', valor: 10 }, d: new Date(k) }]]));
    cache[ym] = { keys, groups, nextIndex: 0, ano: y, mes: m };
    return cache;
  }

  beforeEach(async () => {
    document.body.innerHTML = '';
    // Preferência determinística de chunk = 10
    localStorage.setItem('txChunkSize', '10');
    // App state mínimo
    global.window = Object.assign(global.window || {}, { appState: { categories: [] } });
    installMockIO();
    // Import fresco do módulo a cada teste
    mod = await import('../src/features/transactions/TransactionsPage.js');
  });

  it('cria observers por mês, oculta botão fallback com IO, carrega e desconecta ao finalizar; teardown desconecta restantes', async () => {
    // DOM e cache para 3 meses
    [ym1, ym2, ym3].forEach(seedMonthDOM);
    const cache = {};
    Object.assign(cache, seedCache(ym1, 20)); // 2 cargas de 10
    Object.assign(cache, seedCache(ym2, 5));  // 1 carga e fim
    Object.assign(cache, seedCache(ym3, 100)); // não vamos intersectar

    // Criar observers
    mod.setupInfiniteScrollForMonth(ym1);
    mod.setupInfiniteScrollForMonth(ym2);
    mod.setupInfiniteScrollForMonth(ym3);

    // Fallback buttons devem ficar ocultos (IO disponível)
    expect(document.getElementById(`more-days-${ym1}`).style.display).toBe('none');
    expect(document.getElementById(`more-days-${ym2}`).style.display).toBe('none');
    expect(document.getElementById(`more-days-${ym3}`).style.display).toBe('none');

    // 3 instâncias criadas e observando o sentinel correto
    expect(instances.length).toBe(3);
    const byYm = Object.fromEntries(instances.map(i => [i.target?.id.replace('scroll-sentinel-', ''), i]));
    expect(Object.keys(byYm).sort()).toEqual([ym1, ym2, ym3].sort());

    // Helper para aguardar setTimeout(0)
    const tick = () => new Promise(r => setTimeout(r, 0));

    // Simula intersecções: ym1 duas vezes (20 itens), com espera entre chamadas
    byYm[ym1].cb([{ isIntersecting: true }]);
    await tick();
    await tick();
    expect(cache[ym1].nextIndex).toBe(10);
    byYm[ym1].cb([{ isIntersecting: true }]);
    await tick();
    await tick();
    expect(cache[ym1].nextIndex).toBe(20);
    // sentinel some e observer desconecta quando termina (após tick)
    expect(document.getElementById(`scroll-sentinel-${ym1}`).style.display).toBe('none');
    expect(byYm[ym1].disconnect).toHaveBeenCalledTimes(1);

    byYm[ym2].cb([{ isIntersecting: true }]);
    await tick();
    await tick();
    expect(cache[ym2].nextIndex).toBe(5);
    expect(document.getElementById(`scroll-sentinel-${ym2}`).style.display).toBe('none');
    expect(byYm[ym2].disconnect).toHaveBeenCalledTimes(1);

    // ym3 ainda conectado (sem intersecções)
    expect(byYm[ym3].disconnect).not.toHaveBeenCalled();

    // Teardown deve desconectar restante
    mod.teardownInfiniteScroll();
    expect(byYm[ym3].disconnect).toHaveBeenCalledTimes(1);

    // Re-setup após teardown deve criar nova instância (sem duplicação do antigo)
    seedMonthDOM(ym3); // re-adiciona sentinel removido pela limpeza do DOM do teste
    mod.setupInfiniteScrollForMonth(ym3);
    expect(instances.length).toBe(4); // uma nova instância criada
    const last = instances[instances.length - 1];
    expect(last.observe).toHaveBeenCalled();
  });
});
