/**
 * AnalyticsPage.js - Componente para página de análises financeiras
 *
 * Este componente renderiza a página de análises financeiras com gráficos e relatórios.
 */

import { Analytics } from './Analytics.js';
import { getSelectedPeriod } from '@core/utils/globalUtils.js';
import perf from '@core/telemetry/perf.js';

// Helper: renderiza bloco de Telemetria Local com filtros e exportação CSV
export function renderTelemetrySection(container, { year, month } = {}) {
  try {
    if (!(perf?.isEnabled && perf.isEnabled())) return;
    const log = (perf.getLog && perf.getLog()) || [];
    const allEvents = Array.from(new Set(log.map(e => e.event))).filter(Boolean).sort();

    const telem = document.createElement('div');
    telem.className = 'mb-8';
    telem.innerHTML = `
      <div class="flex items-center gap-2 mb-4">
        <div class="w-1 h-6 bg-gradient-to-b from-gray-500 to-gray-700 rounded-full"></div>
        <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">⏱️ Telemetria Local</h2>
      </div>
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="p-4 flex flex-col md:flex-row md:items-end gap-3 border-b border-gray-200 dark:border-gray-700">
          <label class="text-sm text-gray-700 dark:text-gray-300">
            Evento
            <select id="telem-event-filter" data-testid="telem-event-filter" class="ml-2 p-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
              <option value="__all__">Todos</option>
              ${allEvents.map(ev => `<option value="${ev}">${ev}</option>`).join('')}
            </select>
          </label>
          <label class="text-sm text-gray-700 dark:text-gray-300">
            Min ms
            <input id="telem-min-duration" data-testid="telem-min-duration" type="number" min="0" step="1" value="0" class="ml-2 w-24 p-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800" />
          </label>
          <label class="text-sm text-gray-700 dark:text-gray-300">
            Últimos (min)
            <input id="telem-last-min" data-testid="telem-last-min" type="number" min="0" step="1" value="" placeholder="todos" class="ml-2 w-28 p-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800" />
          </label>
          <div class="flex-1"></div>
          <button id="telem-clear" class="px-3 py-1 text-sm rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700">Limpar</button>
          <button id="telem-export" data-testid="telem-export" class="px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700">Exportar CSV</button>
          <button id="telem-copy" data-testid="telem-copy" class="px-3 py-1 text-sm rounded bg-indigo-600 text-white hover:bg-indigo-700">Copiar CSV</button>
        </div>
        <div class="p-4 grid grid-cols-2 md:grid-cols-5 gap-4">
          <div class="text-center">
            <div class="text-sm text-gray-500 dark:text-gray-400">Eventos</div>
            <div id="telem-count" class="text-2xl font-bold text-gray-900 dark:text-gray-100">${log.length}</div>
          </div>
          <div class="text-center">
            <div class="text-sm text-gray-500 dark:text-gray-400">Média recente</div>
            <div id="telem-avg" class="text-2xl font-bold text-green-600">0.0 ms</div>
          </div>
          <div class="text-center">
            <div class="text-sm text-gray-500 dark:text-gray-400">p95 recente</div>
            <div id="telem-p95" class="text-2xl font-bold text-amber-600">0.0 ms</div>
          </div>
          <div class="text-center col-span-2 hidden md:block">
            <div class="text-sm text-gray-500 dark:text-gray-400">Período selecionado</div>
            <div class="text-lg font-semibold text-gray-900 dark:text-gray-100">${String(month || new Date().getMonth()+1).padStart(2,'0')}/${year || new Date().getFullYear()}</div>
          </div>
        </div>
        <div class="px-4 pb-4 overflow-x-auto">
          <table class="min-w-full text-xs md:text-sm">
            <thead>
              <tr class="text-left text-gray-500 dark:text-gray-400">
                <th class="py-2 pr-4">Evento</th>
                <th class="py-2 pr-4">Duração</th>
                <th class="py-2">Quando</th>
              </tr>
            </thead>
            <tbody id="telem-tbody"></tbody>
          </table>
          <div class="mt-3">
            <button id="telem-more" data-testid="telem-more" class="px-3 py-1 text-sm rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700">Mostrar mais</button>
          </div>
        </div>
      </div>
    `;
    container.appendChild(telem);

    const $ = (sel) => telem.querySelector(sel);
    const $tbody = $('#telem-tbody');
    const $count = $('#telem-count');
    const $avg = $('#telem-avg');
    const $p95 = $('#telem-p95');
    const $eventSel = $('#telem-event-filter');
    const $minInput = $('#telem-min-duration');
    const $lastMin = $('#telem-last-min');
    const $clearBtn = $('#telem-clear');
    const $exportBtn = $('#telem-export');
    const $copyBtn = $('#telem-copy');
    const $moreBtn = $('#telem-more');

    let renderCount = 8; // paginação

    function filterRows() {
      const ev = ($eventSel?.value) || '__all__';
      const min = parseFloat($minInput?.value || '0') || 0;
      const last = parseFloat($lastMin?.value || '') || 0;
      let rows = log;
      if (ev !== '__all__') rows = rows.filter(r => r.event === ev);
      rows = rows.filter(r => typeof r.durationMs !== 'number' || r.durationMs >= min);
      if (last > 0) {
        const cutoff = Date.now() - last * 60000;
        rows = rows.filter(r => (typeof r.ts === 'number' ? r.ts : 0) >= cutoff);
      }
      return rows;
    }

    function renderTable() {
      const rows = filterRows();
      const recent = rows.filter(e => typeof e.durationMs === 'number').slice(0, 20);
      const durations = recent.map(e => e.durationMs || 0).sort((a,b) => a-b);
      const avg = recent.length ? (durations.reduce((s, v) => s + v, 0) / recent.length) : 0;
      const p95Index = durations.length ? Math.ceil(0.95 * durations.length) - 1 : -1;
      const p95 = p95Index >= 0 ? durations[p95Index] : 0;
      $count.textContent = String(rows.length);
      $avg.textContent = `${avg.toFixed(1)} ms`;
      $avg.className = `text-2xl font-bold ${avg > 50 ? 'text-red-600' : 'text-green-600'}`;
      if ($p95) {
        $p95.textContent = `${p95.toFixed(1)} ms`;
        $p95.className = `text-2xl font-bold ${p95 > 120 ? 'text-red-600' : 'text-amber-600'}`;
      }
      const slice = rows.slice(0, renderCount);
      $tbody.innerHTML = slice.map(e => {
        const when = new Date(e.ts).toLocaleTimeString('pt-BR');
        return `<tr class="border-t border-gray-100 dark:border-gray-800">
          <td class="py-2 pr-4 text-gray-900 dark:text-gray-100">${e.event}</td>
          <td class="py-2 pr-4 ${e.durationMs > 50 ? 'text-red-600' : 'text-gray-700 dark:text-gray-300'}">${(e.durationMs||0).toFixed(1)} ms</td>
          <td class="py-2 text-gray-500 dark:text-gray-400">${when}</td>
        </tr>`;
      }).join('');
      // controle do botão 'Mostrar mais'
      if ($moreBtn) {
        $moreBtn.style.display = rows.length > renderCount ? '' : 'none';
      }
    }

    function toCsv(rows) {
      const esc = (v) => '"' + String(v ?? '').replaceAll('"', '""') + '"';
      return ['ts,event,durationMs,meta']
        .concat(rows.map(r => {
          const { ts, event, durationMs, ...rest } = r || {};
          const meta = Object.keys(rest).length ? JSON.stringify(rest) : '';
          return [ts, event, durationMs ?? ''].map(esc).concat(esc(meta)).join(',');
        }))
        .join('\r\n');
    }

    function handleExport() {
      const rows = filterRows();
      const csv = toCsv(rows);
      // Facilitar teste: expor string em window
      try { window.__lastExportCsv = csv; } catch {}
      try {
        const bom = '\uFEFF';
        const blob = new Blob([bom + csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `telemetria_${(year||new Date().getFullYear())}-${String(month||new Date().getMonth()+1).padStart(2,'0')}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch {}
    }

    async function handleCopy() {
      const rows = filterRows();
      const csv = toCsv(rows);
      try { window.__lastExportCsv = csv; } catch {}
      try {
        if (navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(csv);
          try { window.__csvCopied = true; } catch {}
        }
      } catch {}
    }

    $eventSel?.addEventListener('change', renderTable);
    $minInput?.addEventListener('input', renderTable);
    $clearBtn?.addEventListener('click', () => {
      if ($eventSel) $eventSel.value = '__all__';
      if ($minInput) $minInput.value = '0';
      if ($lastMin) $lastMin.value = '';
      renderCount = 8;
      renderTable();
    });
    $exportBtn?.addEventListener('click', handleExport);
    $copyBtn?.addEventListener('click', handleCopy);
    $lastMin?.addEventListener('input', () => { renderCount = 8; renderTable(); });
    $moreBtn?.addEventListener('click', () => { renderCount += 8; renderTable(); });

    renderTable();
  } catch {}
}

/**
 * Classe AnalyticsPage para renderização da página de análises
 */
export class AnalyticsPage {
  /**
   * Renderiza a página de análises financeiras
   * @param {string} budgetId - ID do orçamento atual
   * @returns {HTMLElement} - Elemento HTML da página
   */
  static async render(budgetId) {
    console.log('📊 Renderizando página de análises...');

    // Criar container principal
    const container = document.createElement('div');
    // Ativar modo compacto automaticamente em telas pequenas
    try {
      const isMobile = window?.matchMedia && window.matchMedia('(max-width: 480px)').matches;
      container.className = 'analytics-page' + (isMobile ? ' analytics-compact' : '');
    } catch {
      container.className = 'analytics-page';
    }

    // Adicionar loader enquanto carrega os dados
    const loader = document.createElement('div');
    loader.className = 'flex justify-center items-center py-12';
    loader.innerHTML = `
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    `;
    container.appendChild(loader);

    try {
      // Guard: orçamento atual obrigatório
      const resolvedBudgetId = budgetId || window?.appState?.currentBudget?.id;
      if (!resolvedBudgetId) {
        if (container.contains(loader)) container.removeChild(loader);
        const empty = document.createElement('div');
        empty.className = 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6';
        empty.innerHTML = `
          <div class="flex items-start gap-3">
            <div class="text-2xl">📌</div>
            <div>
              <div class="font-semibold text-gray-900 dark:text-gray-100 mb-1">Nenhum orçamento ativo</div>
              <div class="text-sm text-gray-700 dark:text-gray-300">Entre em um orçamento nas Configurações para visualizar as análises.</div>
              <div class="mt-4 flex gap-2">
                <button class="u-btn u-btn--primary" onclick="window.location.hash = '#/settings'">Ir para Configurações</button>
                <button class="u-btn u-btn--outline" onclick="window.location.hash = '#/dashboard'">Voltar ao Dashboard</button>
              </div>
            </div>
          </div>`;
        container.appendChild(empty);
        return container;
      }
      const effectiveBudgetId = resolvedBudgetId;
      // Obter período selecionado globalmente (URL hash/localStorage/appState)
      const period = (typeof getSelectedPeriod === 'function')
        ? getSelectedPeriod()
        : { year: window.appState?.selectedYear || new Date().getFullYear(), month: window.appState?.selectedMonth || (new Date().getMonth() + 1) };
      const selYear = period.year;
      const selMonth = period.month;
      const startDate = new Date(selYear, selMonth - 1, 1);
      const endDate = new Date(selYear, selMonth, 0);

      // Obter dados do relatório
      const relatorio = await Analytics.gerarRelatorioCompleto(effectiveBudgetId, startDate, endDate);

      // Remover loader
      if (container.contains(loader)) {
        container.removeChild(loader);
      }

      // Se não houver dados relevantes, mostrar um estado vazio amigável
      const noData = !relatorio || (
        (Number(relatorio?.resumo?.receitasMes || 0) === 0) &&
        (Number(relatorio?.resumo?.despesasMes || 0) === 0) &&
        (Array.isArray(relatorio?.evolucaoSaldo) ? relatorio.evolucaoSaldo.length === 0 : true) &&
        (Array.isArray(relatorio?.gastosPorCategoria) ? relatorio.gastosPorCategoria.length === 0 : true)
      );

      // ========== ESTRUTURA PADRÃO: TAB CONTAINER + HEADER + CONTENT ==========
      container.innerHTML = `
        <div class="tab-container">
          <div class="tab-header">
            <h2 class="tab-title-highlight">📊 Análises</h2>
            <div id="analytics-period-indicator"></div>
          </div>
          <div class="tab-content">
            <div class="content-spacing">
              <div id="analytics-sections"></div>
            </div>
          </div>
        </div>
      `;

      // Indicador interativo de período removido aqui; mostrar rótulo no resumo abaixo.
      // Inserir botão de alternância para análises avançadas
      try {
        const header = container.querySelector('.tab-header');
        if (header) {
          const toggleBtn = document.createElement('button');
          toggleBtn.id = 'analytics-advanced-toggle';
          toggleBtn.className = 'u-btn u-btn--outline';
          toggleBtn.style.marginLeft = 'auto';
          toggleBtn.textContent = 'Mostrar análises avançadas';
          header.appendChild(toggleBtn);
        }
      } catch {}

      // Caso não haja dados ainda, renderizar um empty state e retornar
      if (noData) {
        const sectionsRoot = container.querySelector('#analytics-sections') || container;
        const empty = document.createElement('div');
        empty.className = 'empty-state';
        empty.innerHTML = `
          <div class="empty-icon">📊</div>
          <div class="empty-text">Sem dados para este período</div>
          <div class="empty-description">Registre sua primeira transação para ver gráficos e tendências.</div>
          <div class="mt-2"><button class="u-btn u-btn--primary" onclick="window.showAddTransactionModal && window.showAddTransactionModal()">Adicionar primeira transação</button></div>
        `;
        sectionsRoot.appendChild(empty);
        return container;
      }

      // ========== SEÇÃO 1: RESUMO FINANCEIRO PRINCIPAL ==========
      const resumoSection = document.createElement('div');
      // Espaço entre o resumo e os próximos blocos estava grande; reduzir para mb-4
      resumoSection.className = 'mb-4';
      const deltaMesAnterior = (relatorio.evolucaoSaldo && relatorio.evolucaoSaldo.length > 1)
        ? (relatorio.resumo.saldoAtual - relatorio.evolucaoSaldo[1].saldo)
        : null;
      resumoSection.innerHTML = `
        <div class="flex items-center gap-2 mb-4">
          <div class="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
          <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">💰 Resumo Financeiro</h2>
        </div>
        
        <div class="bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 rounded-2xl shadow-xl p-6 md:p-8 text-white">
          <!-- Header do Card -->
      <div class="flex items-center justify-between mb-6">
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-xl md:text-2xl font-bold">Visão Geral</h3>
              </div>
        <p class="text-xs opacity-90 mt-1">Período: ${String(selMonth).padStart(2,'0')}/${selYear}</p>
            </div>
            <div class="text-right">
              <div class="text-2xl md:text-3xl font-bold ${relatorio.resumo.saldoAtual >= 0 ? 'text-green-200' : 'text-red-200'}">
                R$ ${relatorio.resumo.saldoAtual.toFixed(2)}
              </div>
              <p class="text-xs opacity-90">Saldo Atual</p>
            </div>
          </div>
          
          <!-- Grid de Métricas (enxuto) -->
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
              <div class="text-2xl mb-2">📈</div>
              <div class="text-2xl md:text-3xl font-bold text-green-200">R$ ${relatorio.resumo.receitasMes.toFixed(2)}</div>
              <div class="text-sm opacity-90">Receitas</div>
            </div>
            
            <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
              <div class="text-2xl mb-2">📉</div>
              <div class="text-2xl md:text-3xl font-bold text-red-200">R$ ${relatorio.resumo.despesasMes.toFixed(2)}</div>
              <div class="text-sm opacity-90">Despesas</div>
            </div>
            
            <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
              <div class="text-2xl mb-2">📊</div>
              <div class="text-2xl md:text-3xl font-bold ${relatorio.resumo.tendencia === 'positiva' ? 'text-green-200' : 'text-red-200'}">
                ${relatorio.resumo.tendencia === 'positiva' ? '↗' : '↘'}
              </div>
              <div class="text-sm opacity-90">Tendência</div>
            </div>
          </div>
          
          <!-- Nota compacta de variação com mês anterior -->
          ${deltaMesAnterior !== null ? `
            <div class="mt-4 text-xs opacity-90">
              Variação vs mês anterior: <span class="font-semibold ${deltaMesAnterior >= 0 ? 'text-green-200' : 'text-red-200'}">${deltaMesAnterior >= 0 ? '+' : ''}R$ ${Math.abs(deltaMesAnterior).toFixed(2)}</span>
            </div>
          ` : ''}
        </div>
      `;
      const sectionsRoot = container.querySelector('#analytics-sections') || container;
      sectionsRoot.appendChild(resumoSection);
      // Criar container para análises avançadas (gráficos, previsões, detalhado)
      const advancedRoot = document.createElement('div');
      advancedRoot.id = 'analytics-advanced';
      try {
        const pref = (typeof localStorage !== 'undefined') ? localStorage.getItem('analytics.advancedVisible') : null;
        if (!pref || pref !== '1') advancedRoot.classList.add('hidden');
      } catch { advancedRoot.classList.add('hidden'); }
      sectionsRoot.appendChild(advancedRoot);

      // ========== SEÇÃO 1.1: PROGRESSO DO ORÇAMENTO (MTD) ==========
      try {
        // Calcular valor orçado mensal: prioriza orçamento.valorTotal; fallback para soma de limites das categorias de despesa
        const parseNum = (v) => {
          const n = parseFloat(String(v ?? '').toString().replace(',', '.'));
          return isNaN(n) ? 0 : n;
        };
        let orcado = 0;
        const currentBudget = window?.appState?.currentBudget || null;
        if (currentBudget && parseNum(currentBudget.valorTotal) > 0) {
          orcado = parseNum(currentBudget.valorTotal);
        } else if (Array.isArray(window?.appState?.categories)) {
          orcado = (window.appState.categories || [])
            .filter(c => (c && (c.tipo || 'despesa') === 'despesa'))
            .reduce((sum, c) => sum + (parseNum(c.limite) > 0 ? parseNum(c.limite) : 0), 0);
        }
        const despesasMes = parseNum(relatorio?.resumo?.despesasMes || 0);
        if (orcado > 0 && despesasMes >= 0) {
          const pct = Math.max(0, Math.min(100, (despesasMes / orcado) * 100));
          // Burn rate (apenas para mês atual)
          const now = new Date();
          const isCurrentMonth = (selYear === now.getFullYear() && selMonth === (now.getMonth() + 1));
          const daysInMonth = new Date(selYear, selMonth, 0).getDate();
          const today = isCurrentMonth ? now.getDate() : daysInMonth; // se não for mês atual, considera mês completo
          const expectedPctToDate = isCurrentMonth ? Math.min(100, (today / daysInMonth) * 100) : 100;
          const expectedSpendToDate = (orcado * expectedPctToDate) / 100;
          const burnRate = expectedSpendToDate > 0 ? (despesasMes / expectedSpendToDate) : 0;
          const burnStatus = burnRate <= 1.05 ? 'ok' : (burnRate <= 1.2 ? 'warn' : 'bad');

          const donutSize = 96;
          const r = 42;
          const c = 2 * Math.PI * r;
          const dash = (pct / 100) * c;

          const mtd = document.createElement('div');
          mtd.className = 'mb-8';
          mtd.innerHTML = `
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-teal-500 to-emerald-500 rounded-full"></div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">🏁 Progresso do Mês</h2>
            </div>
            <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div class="p-4 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <!-- Donut -->
                <div class="flex justify-center">
                  <svg width="${donutSize}" height="${donutSize}" viewBox="0 0 100 100" class="-rotate-90">
                    <circle cx="50" cy="50" r="${r}" stroke="${'var(--tw-prose-borders, #e5e7eb)'}" stroke-width="12" fill="none" class="text-gray-200 dark:text-gray-700"></circle>
                    <circle cx="50" cy="50" r="${r}" stroke="${pct > 100 ? '#ef4444' : '#10b981'}" stroke-width="12" stroke-linecap="round" fill="none"
                      stroke-dasharray="${dash} ${c}" />
                  </svg>
                  <div class="absolute mt-10 md:mt-0 md:static -rotate-90 md:rotate-0"></div>
                </div>
                
                <!-- KPIs -->
                <div class="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div class="u-card p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div class="text-xs text-gray-500 dark:text-gray-400">Orçado</div>
                    <div class="text-lg font-bold text-gray-900 dark:text-gray-100">R$ ${orcado.toFixed(2)}</div>
                  </div>
                  <div class="u-card p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div class="text-xs text-gray-500 dark:text-gray-400">Gasto no mês</div>
                    <div class="text-lg font-bold ${despesasMes > orcado ? 'text-red-600' : 'text-gray-900 dark:text-gray-100'}">R$ ${despesasMes.toFixed(2)}</div>
                  </div>
                  <div class="u-card p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div class="text-xs text-gray-500 dark:text-gray-400">Progresso</div>
                    <div class="text-lg font-bold ${pct > 100 ? 'text-red-600' : pct > 90 ? 'text-yellow-600' : 'text-green-600'}">${pct.toFixed(1)}%</div>
                  </div>
                  <div class="u-card p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div class="text-xs text-gray-500 dark:text-gray-400">Burn rate ${isCurrentMonth ? '(até hoje)' : '(final)'}</div>
                    <div class="text-lg font-bold ${burnStatus === 'ok' ? 'text-green-600' : burnStatus === 'warn' ? 'text-yellow-600' : 'text-red-600'}">${(burnRate*100).toFixed(0)}%</div>
                  </div>
                </div>
                
                <div class="md:col-span-3 text-xs text-gray-500 dark:text-gray-400">${isCurrentMonth ? `Você consumiu <span class=\"font-medium text-gray-900 dark:text-gray-100\">${pct.toFixed(1)}%</span> do orçamento. O esperado para hoje seria <span class=\"font-medium\">${expectedPctToDate.toFixed(1)}%</span>.` : `Resumo do mês selecionado: consumo total de <span class=\"font-medium\">${pct.toFixed(1)}%</span> do orçamento.`}</div>
              </div>
            </div>
          `;
          sectionsRoot.appendChild(mtd);
        }
      } catch (mtdErr) {
        console.warn('MTD progress render skipped:', mtdErr?.message || mtdErr);
      }

  // ========== SEÇÃO 2: GRÁFICOS E ANÁLISES ==========
  const chartsSection = document.createElement('div');
  chartsSection.className = 'mb-8';
      chartsSection.innerHTML = `
        <div class="flex items-center gap-2 mb-4">
          <div class="w-1 h-6 bg-gradient-to-b from-green-500 to-teal-500 rounded-full"></div>
          <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">📊 Gráficos & Análises</h2>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Gráfico de Evolução -->
          <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div class="bg-gradient-to-r from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">📈 Evolução do Saldo</h3>
            </div>
            <div class="p-4" id="evolucao-chart">
              <div class="flex justify-center items-center py-8">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
              </div>
            </div>
          </div>
          
          <!-- Gráfico de Categorias -->
          <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">🎯 Gastos por Categoria</h3>
            </div>
            <div class="p-4" id="categorias-chart">
              <div class="flex justify-center items-center py-8">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            </div>
          </div>
        </div>
      `;
  // Mover para bloco avançado
  advancedRoot.appendChild(chartsSection);

  // ========== SEÇÃO 3: PREVISÕES E TENDÊNCIAS ==========
  const previsaoSection = document.createElement('div');
  previsaoSection.className = 'mb-8';
      previsaoSection.innerHTML = `
        <div class="flex items-center gap-2 mb-4">
          <div class="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
          <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">🔮 Previsões & Tendências</h2>
        </div>
        
        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div class="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">📅 Previsão para os Próximos Meses</h3>
              <div class="text-xs text-gray-500 dark:text-gray-400 bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded-full">
                IA Predict
              </div>
            </div>
          </div>
          
          <div class="p-4">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              ${relatorio.previsaoGastos.slice(0, 4).map((periodo, index) => `
                <div class="bg-gradient-to-br ${index === 0 ? 'from-purple-500 to-pink-500' : index === 1 ? 'from-blue-500 to-indigo-500' : index === 2 ? 'from-green-500 to-teal-500' : 'from-orange-500 to-red-500'} rounded-xl p-4 text-white">
                  <div class="text-center">
                    <div class="text-lg font-bold mb-1">${periodo.nome} ${periodo.ano}</div>
                    <div class="text-2xl font-bold mb-2">R$ ${periodo.saldo.toFixed(2)}</div>
                    <div class="text-xs opacity-90">Saldo Previsto</div>
                    <div class="flex justify-between text-xs mt-2">
                      <span>📈 R$ ${periodo.receitas.toFixed(2)}</span>
                      <span>📉 R$ ${periodo.despesas.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
            
            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <div class="flex items-center gap-2 mb-2">
                <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span class="text-sm font-medium text-gray-900 dark:text-gray-100">Metodologia de Previsão</span>
              </div>
              <p class="text-xs text-gray-600 dark:text-gray-400">
                Baseada na média dos últimos 3 meses com tendência de crescimento de 1% ao mês, 
                considerando sazonalidade e padrões históricos.
              </p>
            </div>
          </div>
        </div>
      `;
  // Inserir dentro do bloco avançado
  advancedRoot.appendChild(previsaoSection);

  // ========== SEÇÃO 3.5: TELEMETRIA LOCAL (se habilitada) ==========
  // Telemetria deve respeitar o mesmo wrapper de conteúdo
  renderTelemetrySection(advancedRoot, { year: selYear, month: selMonth });

      // ========== SEÇÃO 3.7: MAIORES TRANSAÇÕES DO MÊS ==========
      try {
        const txMes = await Analytics.fetchTransactionsForPeriod(effectiveBudgetId, startDate, endDate);
        const txDespesas = (txMes || []).filter(t => (t?.tipo || 'despesa') === 'despesa');
        // Enriquecer com categoria
        const cats = Array.isArray(window?.appState?.categories) ? window.appState.categories : [];
        const mapCat = new Map(cats.map(c => [c.id, c]));
        const fmtDate = (d) => {
          try { return new Date(d).toLocaleDateString('pt-BR'); } catch { return ''; }
        };
        const withCat = txDespesas.map(t => ({
          ...t,
          _date: Analytics.txToDate(t),
          _cat: mapCat.get(t.categoriaId) || t.categoria || null,
          _valor: parseFloat(t.valor || 0)
        }));
        withCat.sort((a, b) => (b._valor || 0) - (a._valor || 0));
        const top = withCat.slice(0, 5);
        if (top.length) {
          const topSection = document.createElement('div');
          topSection.className = 'mb-8';
          topSection.innerHTML = `
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-rose-500 to-red-500 rounded-full"></div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">📌 Maiores Transações (mês)</h2>
            </div>
            <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div class="divide-y divide-gray-100 dark:divide-gray-800">
                ${top.map(t => `
                  <div class="p-4 flex items-center justify-between gap-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <div class="flex items-center gap-3 min-w-0">
                      <div class="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white" style="background-color: ${(t._cat?.cor || '#EF4444')}">
                        ${((t._cat?.nome || '?').slice(0,1)).toUpperCase()}
                      </div>
                      <div class="min-w-0">
                        <div class="font-medium text-gray-900 dark:text-gray-100 truncate">${t.descricao || t.titulo || t._cat?.nome || 'Despesa'}</div>
                        <div class="text-xs text-gray-500 dark:text-gray-400 truncate">${fmtDate(t._date)} • ${(t._cat?.nome || 'Sem categoria')}</div>
                      </div>
                    </div>
                    <div class="text-right">
                      <div class="font-bold text-red-600">R$ ${(t._valor || 0).toFixed(2)}</div>
                      <a href="#/transactions" class="text-xs text-indigo-600 hover:underline">ver no extrato</a>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          `;
          sectionsRoot.appendChild(topSection);
        }
      } catch {}

      // ========== SEÇÃO 3.8: CATEGORIAS EM ALERTA ==========
      try {
        const cats = Array.isArray(window?.appState?.categories) ? window.appState.categories : [];
        const mapLimite = new Map(cats.map(c => [c.id, parseFloat(c.limite || 0)]));
        const alertas = (relatorio.gastosPorCategoria || [])
          .map(item => {
            const lim = mapLimite.get(item?.categoria?.id) || 0;
            const gasto = parseFloat(item.totalGasto || 0);
            const pct = lim > 0 ? (gasto / lim) * 100 : 0;
            return { nome: item?.categoria?.nome || 'Categoria', cor: item?.categoria?.cor || '#F59E0B', gasto, lim, pct };
          })
          .filter(x => x.lim > 0 && x.pct >= 90)
          .sort((a,b) => (b.pct - a.pct));
        if (alertas.length) {
          const alertSection = document.createElement('div');
          alertSection.className = 'mb-8';
          alertSection.innerHTML = `
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">🚨 Categorias em Alerta</h2>
            </div>
            <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div class="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                ${alertas.slice(0,6).map(a => `
                  <div class="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-3">
                        <div class="w-3 h-3 rounded-full" style="background-color:${a.cor}"></div>
                        <div>
                          <div class="font-medium text-gray-900 dark:text-gray-100">${a.nome}</div>
                          <div class="text-xs text-gray-500 dark:text-gray-400">Limite: R$ ${a.lim.toFixed(2)}</div>
                        </div>
                      </div>
                      <div class="text-sm font-bold ${a.pct >= 100 ? 'text-red-600' : 'text-amber-600'}">${Math.min(a.pct, 999).toFixed(1)}%</div>
                    </div>
                    <div class="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div class="h-2 rounded-full ${a.pct>=100?'bg-red-500':'bg-amber-500'}" style="width:${Math.min(a.pct,100)}%"></div>
                    </div>
                    <div class="mt-1 text-xs text-gray-600 dark:text-gray-400">Gasto: R$ ${a.gasto.toFixed(2)}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          `;
          sectionsRoot.appendChild(alertSection);
        }
      } catch {}

  // ========== SEÇÃO 4: ANÁLISE DETALHADA ==========
  const gastosSection = document.createElement('div');
  gastosSection.className = 'mb-8';
      gastosSection.innerHTML = `
        <div class="flex items-center gap-2 mb-4">
          <div class="w-1 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
          <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">🎯 Análise Detalhada</h2>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Maiores Gastos por Categoria -->
          <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div class="bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">🔥 Maiores Gastos</h3>
            </div>
            <div class="p-4">
              <div class="space-y-4">
                ${relatorio.gastosPorCategoria.slice(0, 5).map((item, index) => `
                  <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style="background-color: ${item.categoria.cor || '#4F46E5'}">
                        ${index + 1}
                      </div>
                      <div>
                        <div class="font-medium text-gray-900 dark:text-gray-100">${item.categoria.nome}</div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">${item.percentual.toFixed(1)}% do total</div>
                      </div>
                    </div>
                    <div class="text-right">
                      <div class="font-bold text-gray-900 dark:text-gray-100">R$ ${item.totalGasto.toFixed(2)}</div>
                      <div class="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                        <div class="h-2 rounded-full" style="width: ${item.percentual}%; background-color: ${item.categoria.cor || '#4F46E5'}"></div>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
          
          <!-- Insights e Recomendações -->
          <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">💡 Insights & Recomendações</h3>
            </div>
            <div class="p-4">
              <div class="space-y-4">
                ${generateInsights(relatorio).map(insight => `
                  <div class="bg-gradient-to-r ${insight.type === 'positive' ? 'from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900' : insight.type === 'warning' ? 'from-yellow-50 to-orange-50 dark:from-yellow-900 dark:to-orange-900' : 'from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900'} border ${insight.type === 'positive' ? 'border-green-200 dark:border-green-800' : insight.type === 'warning' ? 'border-yellow-200 dark:border-yellow-800' : 'border-blue-200 dark:border-blue-800'} rounded-xl p-4">
                    <div class="flex items-start gap-3">
                      <div class="text-2xl">${insight.icon}</div>
                      <div>
                        <div class="font-medium text-gray-900 dark:text-gray-100 mb-1">${insight.title}</div>
                        <div class="text-sm text-gray-600 dark:text-gray-400">${insight.description}</div>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      `;
  // Inserir dentro do bloco avançado
  advancedRoot.appendChild(gastosSection);

      // Renderizar gráficos usando as funções da classe Analytics
      // Função para verificar e renderizar gráficos com retry
      const renderizarGraficosComRetry = (tentativa = 1, maxTentativas = 5) => {
        const evolucaoChart = document.getElementById('evolucao-chart');
        const categoriasChart = document.getElementById('categorias-chart');

        console.log(`🔍 Tentativa ${tentativa}: Verificando elementos dos gráficos...`);
        console.log('- evolucao-chart:', !!evolucaoChart);
        console.log('- categorias-chart:', !!categoriasChart);

        if (evolucaoChart && categoriasChart) {
          try {
            console.log('📊 Renderizando gráficos...');

            // Verificar se os dados existem antes de renderizar
            if (relatorio.evolucaoSaldo && relatorio.evolucaoSaldo.length > 0) {
              const dadosEvolucao = [...relatorio.evolucaoSaldo];
              if (relatorio.previsaoGastos && relatorio.previsaoGastos.length > 0) {
                dadosEvolucao.push(...relatorio.previsaoGastos);
              }
              Analytics.renderizarGraficoEvolucao('evolucao-chart', dadosEvolucao);
            }

            if (relatorio.gastosPorCategoria && relatorio.gastosPorCategoria.length > 0) {
              Analytics.renderizarGraficoCategorias('categorias-chart', relatorio.gastosPorCategoria);
            }

            console.log('✅ Gráficos renderizados com sucesso!');
          } catch (chartError) {
            console.error('❌ Erro ao renderizar gráficos:', chartError);

            // Exibir mensagem de erro nos containers dos gráficos
            if (evolucaoChart) {
              evolucaoChart.innerHTML = `
                <div class="text-center py-8">
                  <div class="text-4xl mb-4">📊</div>
                  <p class="text-gray-500 dark:text-gray-400">Erro ao carregar gráfico</p>
                  <p class="text-xs text-gray-400 mt-2">${chartError.message}</p>
                </div>
              `;
            }

            if (categoriasChart) {
              categoriasChart.innerHTML = `
                <div class="text-center py-8">
                  <div class="text-4xl mb-4">📊</div>
                  <p class="text-gray-500 dark:text-gray-400">Erro ao carregar gráfico</p>
                  <p class="text-xs text-gray-400 mt-2">${chartError.message}</p>
                </div>
              `;
            }
          }
        } else if (tentativa < maxTentativas) {
          console.log(`⏳ Elementos não encontrados, tentando novamente em ${tentativa * 100}ms...`);
          setTimeout(() => renderizarGraficosComRetry(tentativa + 1, maxTentativas), tentativa * 100);
        } else {
          console.error('❌ Não foi possível encontrar os elementos dos gráficos após', maxTentativas, 'tentativas');

          // Exibir mensagem de erro se não conseguir encontrar os elementos
          const evolucaoChart = document.getElementById('evolucao-chart');
          const categoriasChart = document.getElementById('categorias-chart');

          if (evolucaoChart) {
            evolucaoChart.innerHTML = `
              <div class="text-center py-8">
                <div class="text-4xl mb-4">⚠️</div>
                <p class="text-gray-500 dark:text-gray-400">Elemento não encontrado</p>
                <p class="text-xs text-gray-400 mt-2">Tente recarregar a página</p>
              </div>
            `;
          }

          if (categoriasChart) {
            categoriasChart.innerHTML = `
              <div class="text-center py-8">
                <div class="text-4xl mb-4">⚠️</div>
                <p class="text-gray-500 dark:text-gray-400">Elemento não encontrado</p>
                <p class="text-xs text-gray-400 mt-2">Tente recarregar a página</p>
              </div>
            `;
          }
        }
      };

      // Iniciar renderização com retry
      setTimeout(() => renderizarGraficosComRetry(), 100);

      // Toggle do modo avançado
      try {
        const btn = container.querySelector('#analytics-advanced-toggle');
        const adv = container.querySelector('#analytics-advanced');
        if (btn && adv) {
          const applyLabel = () => {
            const hidden = adv.classList.contains('hidden');
            btn.textContent = hidden ? 'Mostrar análises avançadas' : 'Ocultar análises avançadas';
          };
          applyLabel();
          btn.addEventListener('click', () => {
            adv.classList.toggle('hidden');
            applyLabel();
            try { localStorage.setItem('analytics.advancedVisible', adv.classList.contains('hidden') ? '0' : '1'); } catch {}
          });
        }
      } catch {}

    } catch (error) {
      console.error('❌ Erro ao renderizar página de análises:', error);

      // Remover loader
      if (container.contains(loader)) {
        container.removeChild(loader);
      }

      // Exibir mensagem de erro
      const errorMessage = document.createElement('div');
      errorMessage.className = 'bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded relative mb-6';
      errorMessage.innerHTML = `
        <strong class="font-bold">Erro!</strong>
        <span class="block sm:inline"> Não foi possível carregar os dados de análise. Tente novamente mais tarde.</span>
        <p class="text-sm mt-2">${error.message}</p>
      `;
      container.appendChild(errorMessage);
    }

    return container;
  }
}

/**
 * Gera insights e recomendações baseados nos dados do relatório
 * @param {Object} relatorio - Dados do relatório financeiro
 * @returns {Array} - Array de insights
 */
function generateInsights(relatorio) {
  const insights = [];

  // Insight sobre saldo
  if (relatorio.resumo.saldoAtual >= 0) {
    insights.push({
      type: 'positive',
      icon: '✅',
      title: 'Saldo Positivo',
      description: 'Seu saldo está positivo! Continue mantendo essa disciplina financeira.'
    });
  } else {
    insights.push({
      type: 'warning',
      icon: '⚠️',
      title: 'Saldo Negativo',
      description: 'Seu saldo está negativo. Considere reduzir despesas ou aumentar receitas.'
    });
  }

  // Insight sobre tendência
  if (relatorio.resumo.tendencia === 'positiva') {
    insights.push({
      type: 'positive',
      icon: '📈',
      title: 'Tendência Positiva',
      description: 'Sua situação financeira está melhorando! Mantenha o foco.'
    });
  } else {
    insights.push({
      type: 'warning',
      icon: '📉',
      title: 'Tendência Negativa',
      description: 'Sua situação financeira está piorando. Revise seus gastos.'
    });
  }

  // Insight sobre maior gasto
  if (relatorio.gastosPorCategoria.length > 0) {
    const maiorGasto = relatorio.gastosPorCategoria[0];
    if (maiorGasto.percentual > 30) {
      insights.push({
        type: 'warning',
        icon: '🔥',
        title: 'Gasto Concentrado',
        description: `${maiorGasto.categoria.nome} representa ${maiorGasto.percentual.toFixed(1)}% dos seus gastos. Considere diversificar.`
      });
    }
  }

  // Insight sobre comparação mensal
  if (relatorio.evolucaoSaldo.length > 1) {
    const variacao = relatorio.resumo.saldoAtual - relatorio.evolucaoSaldo[1].saldo;
    if (variacao > 0) {
      insights.push({
        type: 'positive',
        icon: '🎯',
        title: 'Melhoria Mensal',
        description: `Seu saldo melhorou R$ ${variacao.toFixed(2)} em relação ao mês anterior.`
      });
    } else {
      insights.push({
        type: 'warning',
        icon: '📊',
        title: 'Redução Mensal',
        description: `Seu saldo diminuiu R$ ${Math.abs(variacao).toFixed(2)} em relação ao mês anterior.`
      });
    }
  }

  // Insight sobre previsão
  if (relatorio.previsaoGastos.length > 0) {
    const proximaPrevisao = relatorio.previsaoGastos[0];
    if (proximaPrevisao.saldo < 0) {
      insights.push({
        type: 'warning',
        icon: '🔮',
        title: 'Previsão Negativa',
        description: 'Para o próximo mês, a previsão indica saldo negativo. Planeje com antecedência.'
      });
    } else {
      insights.push({
        type: 'positive',
        icon: '🔮',
        title: 'Previsão Positiva',
        description: 'Para o próximo mês, a previsão indica saldo positivo. Continue assim!'
      });
    }
  }

  // Insight sobre diversificação
  if (relatorio.gastosPorCategoria.length > 0) {
    const totalPercentual = relatorio.gastosPorCategoria.slice(0, 3).reduce((sum, item) => sum + item.percentual, 0);
    if (totalPercentual > 70) {
      insights.push({
        type: 'info',
        icon: '💡',
        title: 'Gastos Concentrados',
        description: 'As 3 maiores categorias representam mais de 70% dos seus gastos. Considere diversificar.'
      });
    }
  }

  return insights.slice(0, 4); // Limitar a 4 insights
}

// Adicionar à janela global para uso em outros módulos
window.AnalyticsPage = AnalyticsPage;
