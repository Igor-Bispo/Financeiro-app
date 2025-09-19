// ...existing code...
/* eslint-disable indent, quotes, no-unused-vars, no-trailing-spaces */
// features/transactions/TransactionsPage.js
import { eventBus } from '@core/events/eventBus.js';
import { getSelectedPeriod } from '@core/utils/globalUtils.js';
import { mountPeriodIndicator } from '../../ui/PeriodIndicator.js';
import { setupTransactionButtons } from '../config/ConfigService.js';
import perf from '@core/telemetry/perf.js';
import { renderFAB } from '../ui/UIService.js';

// Fallback seguro para pesquisa de transações (usa global se existir)
function setupTransactionSearch() {
  try {
    if (typeof window.setupTransactionSearch === 'function') {
      window.setupTransactionSearch();
      return;
    }

    // Helpers locais: normalização e fuzzy match leves
    const __norm = (txt) => (txt ?? '')
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();

    const __lev = (a, b) => {
      if (a === b) return 0;
      const la = a.length, lb = b.length;
      if (la === 0) return lb;
      if (lb === 0) return la;
      if (Math.abs(la - lb) > 1) return 2;
      const dp = Array(la + 1).fill(0).map(() => Array(lb + 1).fill(0));
      for (let i = 0; i <= la; i++) dp[i][0] = i;
      for (let j = 0; j <= lb; j++) dp[0][j] = j;
      for (let i = 1; i <= la; i++) {
        for (let j = 1; j <= lb; j++) {
          const cost = a[i - 1] === b[j - 1] ? 0 : 1;
          dp[i][j] = Math.min(
            dp[i - 1][j] + 1,
            dp[i][j - 1] + 1,
            dp[i - 1][j - 1] + cost
          );
          if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
            dp[i][j] = Math.min(dp[i][j], dp[i - 2][j - 2] + 1);
          }
        }
      }
      return dp[la][lb];
    };

    const __approxIncludes = (haystack, needle) => {
      const h = __norm(haystack);
      const n = __norm(needle);
      if (!n) return true;
      if (h.includes(n)) return true;
      const parts = h.split(/\s+/).filter(Boolean);
      for (const p of parts) {
        if (Math.abs(p.length - n.length) <= 1 && __lev(p, n) <= 1) return true;
      }
      return (Math.abs(h.length - n.length) <= 1 && __lev(h, n) <= 1);
    };

    // Implementação robusta com re-render
    const searchInput = document.getElementById('transaction-search');
    const counter = document.getElementById('transaction-search-count');
    const resultInfo = document.getElementById('transaction-search-results');
    const list = document.getElementById('transactions-list');
    if (!searchInput || !list) { return; }

    if (searchInput.dataset.bound === '1') return;
    searchInput.dataset.bound = '1';

    searchInput.addEventListener('input', () => {
      if (searchInput._debounceTimer) { clearTimeout(searchInput._debounceTimer); }
      searchInput._debounceTimer = setTimeout(async () => {
        const q = __norm(searchInput.value);
        if (!q) {
          resultInfo && resultInfo.classList.add('hidden');
          try { list.innerHTML = renderAllTransactions(); } catch { list.innerHTML = ''; }
          return;
        }

        const { year: selYear, month: selMonth } = getSelectedPeriod();
        const filtered = (window.appState.transactions || []).filter(t => {
          // Limitar ao período atual
          let d;
          if (t?.createdAt && typeof t.createdAt === 'object' && t.createdAt.seconds) {
            d = new Date(t.createdAt.seconds * 1000);
          } else {
            d = new Date(t.createdAt);
          }
          const inPeriod = d && d.getFullYear && (d.getFullYear() === selYear) && ((d.getMonth() + 1) === selMonth);
          if (!inPeriod) return false;

          const desc = t.descricao || '';
          const cat = (window.appState.categories || []).find(c => c.id === t.categoriaId);
          const catName = cat?.nome || '';
          const valorStr = String(t.valor ?? '');
          return __approxIncludes(desc, q) || __approxIncludes(catName, q) || valorStr.includes(q);
        });

        if (counter) counter.textContent = String(filtered.length);
        resultInfo && resultInfo.classList.remove('hidden');
        try { list.innerHTML = renderFilteredTransactions(filtered); } catch { list.innerHTML = ''; }
      }, 150);
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        searchInput.value = '';
        searchInput.dispatchEvent(new Event('input'));
      }
    });
  } catch (e) {
    console.warn('setupTransactionSearch fallback falhou:', e);
  }
}

export async function render(container) {
  const root = document.createElement('div');
  root.className = 'transactions-page';
  
  // Header da aba
  const header = document.createElement('div');
  header.className = 'tab-header mb-6';
  header.innerHTML = '<h1 class="text-2xl font-semibold text-gray-900 leading-tight">💸 Transações</h1><div id="tx-period-indicator"></div>';
  // O indicador de período será injetado pela renderização principal (placeholder tx-period-indicator)
  
  root.appendChild(header);
  
  // Conteúdo das transações
  const content = document.createElement('div');
  content.className = 'transactions-content';
  content.innerHTML = `
  <div class="u-card bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
      <div class="flex justify-between items-center mb-6 gap-4">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white">📋 Lista de Transações</h3>
  <button onclick="window.showAddTransactionModal()" class="btn btn-primary btn-sm">
          ➕ Nova Transação
        </button>
      </div>
      
      <div class="text-center py-8">
        <div class="text-4xl mb-4">💸</div>
        <p class="text-gray-600 dark:text-gray-400">Página de transações em desenvolvimento</p>
        <p class="text-sm text-gray-500 dark:text-gray-500 mt-2">Carregando transações...</p>
      </div>
    </div>
  `;

  // Garantir que a seção do mês selecionado exista mesmo sem transações
  try {
    const { year: chkYear, month: chkMonth } = getSelectedPeriod();
    const selKeyEnsure = `${chkYear}-${String(chkMonth).padStart(2, '0')}`;
    const monthEl = document.querySelector(`#month-${selKeyEnsure}`);
    if (!monthEl) {
      const listEl = document.getElementById('transactions-list');
      if (listEl) {
        listEl.insertAdjacentHTML('afterbegin', renderMonthSectionHTML(selKeyEnsure, []));
      }
    }
  } catch {}
  
  root.appendChild(content);
  
  // Limpar container e adicionar novo conteúdo
  if (container) {
    container.innerHTML = '';
    container.appendChild(root);
  }
  
  // Carregar transações reais
  await loadTransactions(content);
  // Montar indicador de período no header
  try { mountPeriodIndicator('#tx-period-indicator'); } catch {}
}

async function loadTransactions() {
  try {
    // Aqui seria carregado transações reais do Firebase
    console.log('Transactions: Carregando dados...');
    // Após carregamento, renderizar visão completa usando estado atual
    try {
      renderTransactions();
    } catch (e) {
      console.warn('renderTransactions falhou:', e);
    }
  } catch (error) {
    console.error('Erro ao carregar transações:', error);
  }
}

// Função para renderizar transações (movida do app.js)
export function renderTransactions() {
  const renderStart = Date.now();
  console.log('🔍 renderTransactions - dados recebidos:', window.appState?.transactions);
  // Helper: permitir override de teste via window.getSelectedPeriod()
  const pickSelectedPeriod = () => {
    try {
      if (typeof window !== 'undefined' && typeof window.getSelectedPeriod === 'function') {
        const p = window.getSelectedPeriod();
        if (p && typeof p.year === 'number' && typeof p.month === 'number') { return p; }
      }
    } catch {}
    return getSelectedPeriod();
  };
  // Log para depuração: sempre renderizar
  console.log('🔄 renderTransactions chamado!');
  const content = document.getElementById('app-content');
  // Teardown do infinite scroll anterior antes de re-renderizar
  try { teardownInfiniteScroll(); } catch {}
  
  // Calcular estatísticas das transações (seguir mês selecionado no Dashboard)
  const allTransacoes = window.appState.transactions || [];
  const { year: selYear, month: selMonth } = pickSelectedPeriod();
  const selKey = `${selYear}-${String(selMonth).padStart(2, '0')}`;
  // Filtrar estritamente pelo mês/ano selecionado usando data efetiva
  const transacoes = allTransacoes.filter(t => getTransactionYearMonth(t) === selKey);
  const receitas = transacoes.filter(t => t.tipo === 'receita').reduce((sum, t) => sum + parseFloat(t.valor), 0);
  const despesas = transacoes.filter(t => t.tipo === 'despesa').reduce((sum, t) => sum + parseFloat(t.valor), 0);
  const saldo = receitas - despesas;
  const totalTransacoes = transacoes.length;
  
  // Agrupar transações por mês
  const transacoesPorMes = {};
  transacoes.forEach(t => {
  const data = getTransactionDate(t) || (t.createdAt && t.createdAt.toDate ? t.createdAt.toDate() : new Date(t.createdAt));
    const chave = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}`;
    if (!transacoesPorMes[chave]) {
      transacoesPorMes[chave] = [];
    }
    transacoesPorMes[chave].push(t);
  });
  
  // (removido cálculo de nomes de meses não utilizados)

  content.innerHTML = `
    <div class="tab-container">
      <div class="tab-header">
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-600">
          <div class="flex items-center justify-between w-full gap-4">
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span class="text-white text-sm">📋</span>
                </div>
                <div>
                  <h2 class="text-gray-800 dark:text-white font-semibold text-base">Transações</h2>
                  <div class="flex items-center gap-1">
                    <span class="text-blue-600 dark:text-blue-400 text-xs">${transacoes.length} itens</span>
                  </div>
                </div>
              </div>
            </div>
            <div id="tx-period-indicator"></div>
          </div>
        </div>
      </div>
      <div class="tab-content">
        <div class="content-spacing">
          
          
          <!-- ========== SEÇÃO 1: RESUMO COMPACTO ========== -->
          <div class="mb-12">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-blue-500 to-green-500 rounded-full"></div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">💰 Resumo</h2>
            </div>
            
            <div class="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl shadow-lg border border-blue-200 dark:border-gray-600 p-4 mb-6">
              <!-- Header Compacto -->
              <div class="flex items-center justify-between mb-4 gap-4">
                <div>
                  <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <span class="text-xl">💸</span>
                    Controle de Transações
                  </h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">${totalTransacoes} transações • ${String(selMonth).padStart(2,'0')}/${selYear}</p>
                </div>
                <div class="text-right">
                  <div class="text-lg font-bold ${saldo >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}">
                    R$ ${saldo.toFixed(2)}
                  </div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">${saldo >= 0 ? 'Positivo' : 'Negativo'}</p>
                </div>
              </div>
              
              <!-- Métricas Compactas -->
              <div class="grid grid-cols-3 gap-3 mb-4">
                <div class="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-gray-200 dark:border-gray-600">
                  <div class="text-lg mb-1">💚</div>
                  <div class="text-lg font-bold text-green-600 dark:text-green-400">R$ ${receitas.toFixed(2)}</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">Receitas</div>
                </div>
                
                <div class="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-gray-200 dark:border-gray-600">
                  <div class="text-lg mb-1">💸</div>
                  <div class="text-lg font-bold text-red-600 dark:text-red-400">R$ ${despesas.toFixed(2)}</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">Despesas</div>
                </div>
                
                <div class="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-gray-200 dark:border-gray-600">
                  <div class="text-lg mb-1">📊</div>
                  <div class="text-lg font-bold text-gray-800 dark:text-gray-200">${totalTransacoes}</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">Total</div>
                </div>
              </div>

              <!-- Resumo Financeiro Compacto -->
              <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-600">
                <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
                  <span>📈</span>
                  Resumo Financeiro
                </h5>
                <div class="space-y-1">
                  <div class="flex justify-between text-xs">
                    <span class="text-gray-600 dark:text-gray-400">Receitas:</span>
                    <span class="font-medium text-green-600 dark:text-green-400">R$ ${receitas.toFixed(2)}</span>
                  </div>
                  <div class="flex justify-between text-xs">
                    <span class="text-gray-600 dark:text-gray-400">Despesas:</span>
                    <span class="font-medium text-red-600 dark:text-red-400">R$ ${despesas.toFixed(2)}</span>
                  </div>
                  <div class="flex justify-between text-xs border-t border-gray-200 dark:border-gray-600 pt-1">
                    <span class="text-gray-600 dark:text-gray-400">Saldo:</span>
                    <span class="font-bold ${saldo >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}">
                      R$ ${saldo.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ========== SEÇÃO 2: AÇÕES E FILTROS ========== -->
          <div class="mb-12">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"></div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">🔧 Ações & Filtros</h2>
            </div>
            
            <div class="u-card bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <!-- Header -->
              <div class="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
                <div class="flex flex-wrap justify-between items-center gap-2">
                  <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">Gerenciar Transações</h3>
                  <div class="flex gap-2">
                    <button id="add-transaction-btn" class="btn btn-primary btn-sm">
                      ➕ Nova Transação
            </button>
                    <button id="voice-btn" class="btn btn-outline btn-sm">
                      🎤 Voz
            </button>
                  </div>
                </div>
          </div>
          
          <!-- Filtro de pesquisa -->
              <div class="p-4">
            <div class="relative">
      <input 
                type="text" 
                id="transaction-search" 
                    placeholder="🔍 Pesquisar por descrição, categoria ou valor..." 
        class="u-input w-full pl-12"
              />
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span class="text-gray-400 text-lg">🔍</span>
              </div>
            </div>
            <div id="transaction-search-results" class="mt-2 text-sm text-gray-600 dark:text-gray-400 hidden">
              <span id="transaction-search-count">0</span> transação(ões) encontrada(s)
                </div>
              </div>
            </div>
          </div>
          
          <!-- ========== SEÇÃO 3: LISTA DE TRANSAÇÕES ========== -->
          <div class="mb-12">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-green-500 to-teal-500 rounded-full"></div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">📋 Histórico</h2>
            </div>

            <!-- Indicador de período padronizado movido para o cabeçalho -->
            ${renderOlderMonthsControl()}
            
            <div id="transactions-list">${renderAllTransactions()}</div>
            ${transacoes.length === 0 ? `
              <div class="empty-state mt-4">
                <div class="empty-icon">🧾</div>
                <div class="empty-text">Sem transações neste período</div>
                <div class="mt-2"><button class="btn btn-primary w-full" onclick="window.showAddTransactionModal && window.showAddTransactionModal()">Adicionar transação</button></div>
              </div>` : ''}
          </div>
        </div>
      </div>
    </div>
  `;

  try {
    perf.track('transactions:render:summary', {
      durationMs: Date.now() - renderStart,
      total: totalTransacoes,
      month: selMonth,
      year: selYear,
    });
  } catch {}

  // Rodapé opcional de métricas (somente quando telemetria está ativada)
  try {
    if (perf.isEnabled()) {
      const box = document.createElement('div');
      box.className = 'mt-4';
      const ym = `${selYear}-${String(selMonth).padStart(2, '0')}`;
  const log = perf.getLog();
      const summaryEvents = log.filter(e => e.event === 'transactions:render:summary');
      const lastSummary = summaryEvents[0];
      const lastMs = lastSummary?.durationMs || null;
      const lastN = summaryEvents.slice(0, 10);
      const avgMs = lastN.length ? Math.round(lastN.reduce((s, e) => s + (e.durationMs || 0), 0) / lastN.length) : null;
      const vInit = log.find(e => e.event === 'transactions:virtualized:init' && e.ym === ym);
      const vMore = log.find(e => e.event === 'transactions:virtualized:loadMore' && e.ym === ym);
      const html = `
        <div class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-xs text-gray-700 dark:text-gray-300">
          <div class="font-semibold mb-1">Métricas (local)</div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <div class="text-gray-500">Último render</div>
              <div>${lastMs !== null ? lastMs + ' ms' : '—'}</div>
            </div>
            <div>
              <div class="text-gray-500">Média (10)</div>
              <div>${avgMs !== null ? avgMs + ' ms' : '—'}</div>
            </div>
            <div>
              <div class="text-gray-500">Período</div>
              <div>${ym}</div>
            </div>
          </div>
          <div class="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <div class="text-gray-500">Inicial virtualizado</div>
              <div>${vInit ? `${vInit.rendered}/${vInit.keys} grupos • chunk ${vInit.chunk} • ${vInit.durationMs} ms` : '—'}</div>
            </div>
            <div>
              <div class="text-gray-500">Último loadMore</div>
              <div>${vMore ? `+${vMore.added} • nextIndex ${vMore.nextIndex} • ${vMore.durationMs} ms` : '—'}</div>
            </div>
          </div>
        </div>`;
      box.innerHTML = html;
      const spacing = document.querySelector('.content-spacing');
      if (spacing) {
        spacing.appendChild(box);
      } else {
        content.appendChild(box);
      }
    }
  } catch {}

  // Preparar infinite scroll para o mês selecionado
  try {
    setupInfiniteScrollForMonth(selKey);
  } catch {}

  // Garantir indicador no header renderizado via innerHTML
  try { mountPeriodIndicator('#tx-period-indicator'); } catch {}

  // Expose expand/collapse/toggle helpers globally for inline onclick handlers
  try {
    if (typeof window.toggleDayGroup !== 'function') { window.toggleDayGroup = toggleDayGroup; }
    if (typeof window.expandAllDays !== 'function') { window.expandAllDays = expandAllDays; }
    if (typeof window.collapseAllDays !== 'function') { window.collapseAllDays = collapseAllDays; }
    if (typeof window.loadMonthSection !== 'function') { window.loadMonthSection = loadMonthSection; }
    if (typeof window.loadAllOlderMonths !== 'function') { window.loadAllOlderMonths = loadAllOlderMonths; }
    if (typeof window.loadMoreDayGroups !== 'function') { window.loadMoreDayGroups = loadMoreDayGroups; }
  } catch {}

  // Ensure edit/delete handlers exist even if legacy globals aren't loaded
  try {
    if (typeof window.editTransaction !== 'function') {
      window.editTransaction = async function(transactionId) {
        try {
          const tx = (window.appState?.transactions || []).find(t => t.id === transactionId);
          if (!tx) {
            if (window.Snackbar) { window.Snackbar({ message: 'Transação não encontrada', type: 'error' }); }
            return;
          }
          // Verificar se a função já está disponível (carregada diretamente no entry.js)
          if (typeof window.showAddTransactionModal === 'function') {
            window.showAddTransactionModal(tx);
          } else {
            // Fallback: tentar import dinâmico
            await import('@js/showAddTransactionModal.js');
            if (typeof window.showAddTransactionModal === 'function') {
              window.showAddTransactionModal(tx);
            }
          }
        } catch (err) {
          console.error('Falha ao abrir edição da transação', err);
          if (window.Snackbar) { window.Snackbar({ message: 'Erro ao abrir edição', type: 'error' }); }
        }
      };
    }

    if (typeof window.deleteTransactionWithConfirmation !== 'function') {
      window.deleteTransactionWithConfirmation = async function(transactionId, transactionName = 'transação') {
        try {
          const msg = `Tem certeza que deseja excluir "${transactionName}"?`;
          
          // Usar o modal moderno de confirmação
          let proceed = false;
          if (typeof window.confirmDelete === 'function') {
            proceed = await window.confirmDelete(transactionName, 'transação');
          } else if (typeof window.showConfirmationModal === 'function') {
            proceed = await new Promise(resolve => {
              window.showConfirmationModal({ 
                title: 'Excluir Transação', 
                message: msg, 
                confirmText: 'Sim, excluir', 
                confirmColor: 'bg-red-500 hover:bg-red-600', 
                onConfirm: () => resolve(true), 
                onCancel: () => resolve(false) 
              });
            });
          } else {
            proceed = confirm(msg);
          }
          
          if (!proceed) { return; }
          
          const { deleteTransactionWithNotifications } = await import('@features/transactions/service.js');
          await deleteTransactionWithNotifications(transactionId);
          if (window.Snackbar) { window.Snackbar({ message: 'Transação excluída', type: 'success' }); }
          // Re-render current view
          try { renderTransactions(); } catch {}
        } catch (err) {
          console.error('Falha ao excluir transação', err);
          if (window.Snackbar) { window.Snackbar({ message: 'Erro ao excluir', type: 'error' }); }
        }
      };
    }
  } catch (e) {
    console.warn('Falha ao garantir handlers de edição/exclusão', e);
  }
  // Configurar botões da tela de transações
  if (typeof document !== 'undefined') {
    setTimeout(() => {
      try {
        setupTransactionButtons();
        const olderBtn = document.getElementById('load-older-months-btn');
        if (olderBtn && !olderBtn.dataset.bound) {
          olderBtn.dataset.bound = '1';
          olderBtn.addEventListener('click', () => window.loadAllOlderMonths && window.loadAllOlderMonths());
        }
      } catch (e) {
        console.warn('setupTransactionButtons skipped (env teardown)', e);
      }
    }, 100);
  }
  
  // Configurar filtro de pesquisa
  setupTransactionSearch();
  
  // Removido indicador interativo de período nesta aba; o controle existe apenas no Dashboard.

  // Re-render quando o período for alterado em outras abas
  try {
    if (!window.__txPeriodListenerBound) {
      window.__txPeriodListenerBound = true;
      // Atualizar ao mudar período
      eventBus.on('period:changed', (p) => setTimeout(() => {
        const hh = (window.location.hash || '').split('?')[0];
        if (hh === '#/transactions') {
          try {
            const y = (p && p.year) || window.appState?.selectedYear;
            const m = (p && p.month) || window.appState?.selectedMonth;
            if (y && m) {
              const ym = `${y}-${String(m).padStart(2, '0')}`;
              const url = new URL(window.location.href);
              url.hash = `${hh}?ym=${ym}`;
              if (window.history && window.history.replaceState) {
                window.history.replaceState(null, '', url.toString());
              }
            }
          } catch {}
          renderTransactions();
          try { eventBus.emit('summary:updated', p || {}); } catch {}
        }
      }, 0));
      // Atualizar ao adicionar/editar/excluir transação
      const txUpdateHandler = () => setTimeout(() => {
        const hh = (window.location.hash || '').split('?')[0];
        if (hh === '#/transactions') {
          renderTransactions();
        }
      }, 0);
      eventBus.on('transactions:updated', txUpdateHandler);
      eventBus.on('transaction:added', txUpdateHandler);
      eventBus.on('transaction:updated', txUpdateHandler);
      eventBus.on('transaction:deleted', txUpdateHandler);
    }
  } catch {}
  
  renderFAB();
  // Remover renderBottomNav daqui - deve ser chamado apenas pelo router
  // renderBottomNav('/transactions');
}

// Compatibilidade com sistema legado
export default function() {
  const container = document.getElementById('app-content');
  return render(container);
}

// Funções auxiliares para renderização de transações (movidas do app.js)
export function renderAllTransactions() {
  // Seguir mês selecionado do Dashboard por padrão (permitir override em testes)
  const pickSelectedPeriod = () => {
    try {
      if (typeof window !== 'undefined' && typeof window.getSelectedPeriod === 'function') {
        const p = window.getSelectedPeriod();
        if (p && typeof p.year === 'number' && typeof p.month === 'number') return p;
      }
    } catch {}
    return getSelectedPeriod();
  };
  const { year: selYear, month: selMonth } = pickSelectedPeriod();
  const selKey = `${selYear}-${String(selMonth).padStart(2, '0')}`;

  // Agrupar transações por mês
  const transacoesPorMes = {};
  const currentBudgetId = window.appState?.currentBudget?.id;
  const budgets = window.appState?.budgets || [];
  const isMultiBudget = Array.isArray(budgets) && budgets.length > 1;
  (window.appState.transactions || []).forEach(t => {
    if (!currentBudgetId || t.budgetId === currentBudgetId || (!isMultiBudget && !t.budgetId)) {
      const chave = getTransactionYearMonth(t);
      if (!chave) { return; } // ignora itens sem data válida
      if (!transacoesPorMes[chave]) { transacoesPorMes[chave] = []; }
      transacoesPorMes[chave].push(t);
    }
  });

  // Montar lista: primeiro o mês selecionado, depois os demais como lazy
  const allKeys = Object.keys(transacoesPorMes).sort().reverse();
  const ordered = [selKey, ...allKeys.filter(k => k !== selKey)];

  return ordered.map((mesAno, idx) => {
    const transacoesMes = transacoesPorMes[mesAno] || [];
    if (idx === 0) {
      return renderMonthSectionHTML(mesAno, transacoesMes);
    }
    // Demais meses: colapsados para lazy
    const [ano, mes] = mesAno.split('-');
    const nomesMeses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
    const nomeMes = nomesMeses[parseInt(mes) - 1];
    const receitasMes = transacoesMes.filter(t => t.tipo === 'receita').reduce((sum, t) => sum + parseFloat(t.valor), 0);
    const despesasMes = transacoesMes.filter(t => t.tipo === 'despesa').reduce((sum, t) => sum + parseFloat(t.valor), 0);
    const saldoMes = receitasMes - despesasMes;
    return `
  <div id="month-${mesAno}" class="u-card bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-6" data-mes="${mesAno}" data-loaded="0">
        <div class="bg-gradient-to-r from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
          <div class="flex justify-between items-center gap-4">
            <div>
              <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">${nomeMes} ${ano}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">${transacoesMes.length} transações</p>
            </div>
            <div class="text-right">
              <div class="text-lg font-bold ${saldoMes >= 0 ? 'text-green-600' : 'text-red-600'}">R$ ${saldoMes.toFixed(2)}</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">+R$ ${receitasMes.toFixed(2)} • -R$ ${despesasMes.toFixed(2)}</div>
            </div>
          </div>
        </div>
        <div class="p-4">
          <button class="btn btn-outline w-full" onclick="window.loadMonthSection && window.loadMonthSection('${mesAno}')">
            Carregar transações deste mês
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// Control bar to make lazy-loading discoverable
export function renderOlderMonthsControl() {
  try {
    const txs = window.appState.transactions || [];
    if (!txs.length) { return ''; }

    // If there are more than 2 months, show the control
    const byMonth = new Set();
    txs.forEach(t => {
      const d = getTransactionDate(t) || (t.createdAt && t.createdAt.toDate ? t.createdAt.toDate() : new Date(t.createdAt));
      byMonth.add(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
    });
    if (byMonth.size <= 2) { return ''; }

    return `
    <div class="mb-3 flex justify-end">
  <button id="load-older-months-btn" class="btn btn-outline btn-sm">
          Carregar meses anteriores
        </button>
      </div>
    `;
  } catch {
    return '';
  }
}

// Helper: renderiza uma seção mensal completa
export function renderMonthSectionHTML(mesAno, transacoesMes) {
  const [ano, mes] = mesAno.split('-');
  const nomesMeses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const nomeMes = nomesMeses[parseInt(mes) - 1];
  const receitasMes = transacoesMes.filter(t => t.tipo === 'receita').reduce((sum, t) => sum + parseFloat(t.valor), 0);
  const despesasMes = transacoesMes.filter(t => t.tipo === 'despesa').reduce((sum, t) => sum + parseFloat(t.valor), 0);
  const saldoMes = receitasMes - despesasMes;
  const agora = new Date();
  const isMesAtual = (parseInt(ano) === agora.getFullYear() && parseInt(mes) === (agora.getMonth() + 1));
  const selYear = window.appState?.selectedYear || agora.getFullYear();
  const selMonth = window.appState?.selectedMonth || (agora.getMonth() + 1);
  const isMesSelecionado = (parseInt(ano) === parseInt(selYear) && parseInt(mes) === parseInt(selMonth));

  return `
  <div id="month-${mesAno}" class="u-card bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-6" data-mes="${mesAno}" data-loaded="1">
      <div class="bg-gradient-to-r from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-800 p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div class="order-2 sm:order-1">
            <h3 class="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">${nomeMes} ${ano} ${isMesAtual ? '<span class="ml-2 align-middle inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">Mês atual</span>' : ''} ${!isMesAtual && isMesSelecionado ? '<span class="ml-2 align-middle inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">Mês selecionado</span>' : ''}</h3>
            <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">${transacoesMes.length} transações</p>
            <div class="mt-1 flex items-center gap-2 text-[11px] sm:text-xs text-gray-600 dark:text-gray-400">
              <button class="hover:underline" onclick="window.expandAllDays && window.expandAllDays('${mesAno}')">Expandir todos</button>
              <span class="text-gray-400">•</span>
              <button class="hover:underline" onclick="window.collapseAllDays && window.collapseAllDays('${mesAno}')">Colapsar todos</button>
            </div>
          </div>
          <div class="order-1 sm:order-2 sm:text-right">
            <div class="text-base sm:text-lg font-bold ${saldoMes >= 0 ? 'text-green-600' : 'text-red-600'}">R$ ${saldoMes.toFixed(2)}</div>
            <div class="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">+R$ ${receitasMes.toFixed(2)} • -R$ ${despesasMes.toFixed(2)}</div>
          </div>
        </div>
      </div>
      <div class="p-3 sm:p-4">
        ${transacoesMes.length === 0 ? `
          <div class="text-center py-8">
            <div class="text-5xl mb-3">🗓️</div>
            <div class="font-medium mb-1">Nenhuma transação neste mês</div>
            <div class="text-sm text-gray-600 dark:text-gray-400 mb-3">Adicione sua primeira transação de ${nomeMes}</div>
            <button onclick="showAddTransactionModal && showAddTransactionModal()" class="btn btn-primary btn-sm">➕ Nova Transação</button>
          </div>
        ` : `
        <div class="space-y-2 sm:space-y-3" id="tx-day-items-${mesAno}">
          ${renderDayGroupsVirtualized(mesAno, transacoesMes, parseInt(ano), parseInt(mes))}
        </div>
        `}
      </div>
    </div>
  `;
}

// ===== Virtualização leve por grupos de dia =====
const DEFAULT_DAY_GROUP_CHUNK = 12;
function getDayGroupChunk() {
  try {
    // Override opcional via localStorage (ex.: para tunar em runtime)
    try {
      if (typeof localStorage !== 'undefined') {
        const ov = parseInt(localStorage.getItem('txChunkSize'), 10);
        if (!Number.isNaN(ov) && ov >= 6 && ov <= 40) return ov;
      }
    } catch {}
    const h = (typeof window !== 'undefined' && window.innerHeight) ? window.innerHeight : 800;
    const mem = (typeof navigator !== 'undefined' && navigator.deviceMemory) ? navigator.deviceMemory : 4;
    if (h >= 900 || mem >= 6) return 16; // telas maiores ou mais memória → mais itens
    if (h <= 700 || mem <= 2) return 10; // telas pequenas ou pouca memória → menos itens
    return DEFAULT_DAY_GROUP_CHUNK; // padrão
  } catch {
    return DEFAULT_DAY_GROUP_CHUNK;
  }
}

function ensureGroupCache() {
  if (typeof window === 'undefined') { return {}; }
  if (!window.__txGroupCache) { window.__txGroupCache = {}; }
  return window.__txGroupCache;
}

function buildDayGroups(transacoesMes, ano, mes) {
  // Reutiliza a mesma lógica interna de agrupamento, mas retorna estrutura
  const toDate = (t) => {
    try {
      const d = getTransactionDate(t);
      if (d && !isNaN(d.getTime())) { return d; }
    } catch {}
    try {
      if (t.createdAt?.toDate) { return t.createdAt.toDate(); }
      const d = new Date(t.createdAt);
      if (!isNaN(d.getTime())) { return d; }
    } catch {}
    return new Date(ano, mes - 1, 1);
  };
  const groups = {};
  transacoesMes.forEach(t => {
    const d = toDate(t);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const key = `${y}-${m}-${day}`;
    if (!groups[key]) { groups[key] = []; }
    groups[key].push({ t, d });
  });
  const keys = Object.keys(groups).sort((a, b) => (a < b ? 1 : -1));
  return { keys, groups };
}

function renderDayGroupHTML(key, entries, ano, mes) {
  // Reaproveita parte da renderização do agrupador existente
  try {
    const receitas = entries.reduce((sum, { t }) => sum + (t?.tipo === 'receita' ? parseFloat(t.valor) || 0 : 0), 0);
    const despesas = entries.reduce((sum, { t }) => sum + (t?.tipo === 'despesa' ? parseFloat(t.valor) || 0 : 0), 0);
    const saldo = receitas - despesas;
    const items = entries
      .sort((a, b) => b.d.getTime() - a.d.getTime())
      .map(({ t }) => renderTransactionItemHTML(t, ano, mes))
      .join('');
    const hoje = new Date();
    const isoHoje = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}-${String(hoje.getDate()).padStart(2, '0')}`;
    const ontem = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() - 1);
    const isoOntem = `${ontem.getFullYear()}-${String(ontem.getMonth() + 1).padStart(2, '0')}-${String(ontem.getDate()).padStart(2, '0')}`;
    let label;
  if (key === isoHoje) { label = 'Hoje'; }
  else if (key === isoOntem) { label = 'Ontem'; }
    else {
      const [ky, km, kd] = key.split('-').map(n => parseInt(n, 10));
      const localDay = new Date(ky, (km || 1) - 1, kd || 1);
      label = localDay.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    }
    const collapsed = isDayCollapsed(key);
    const chevron = collapsed ? '▸' : '▾';
    return `
      <div class="tx-day-group">
        <div class="tx-day-header tx-day-header--clickable" data-day-key="${key}" onclick="window.toggleDayGroup && window.toggleDayGroup('${key}')">
          <span class="tx-day-chevron" data-chev-key="${key}">${chevron}</span>
          ${label}
        </div>
        <div class="tx-day-summary">
          <span class="text-green-600">+R$ ${receitas.toFixed(2)}</span>
          <span class="text-gray-400">•</span>
          <span class="text-red-600">-R$ ${despesas.toFixed(2)}</span>
          <span class="text-gray-400">•</span>
          <span class="${saldo >= 0 ? 'text-green-700' : 'text-red-700'}">Saldo ${saldo >= 0 ? '' : '-'}R$ ${Math.abs(saldo).toFixed(2)}</span>
        </div>
        <div class="tx-day-items space-y-2 sm:space-y-3" data-day-key="${key}" style="display: ${collapsed ? 'none' : 'block'}">${items}</div>
      </div>
    `;
  } catch (e) {
    return '';
  }
}

export function renderDayGroupsVirtualized(mesAno, transacoesMes, ano, mes) {
  try {
    const t0 = Date.now();
    const cache = ensureGroupCache();
    const { keys, groups } = buildDayGroups(transacoesMes, ano, mes);
  const CHUNK = getDayGroupChunk();
  cache[mesAno] = { keys, groups, nextIndex: Math.min(CHUNK, keys.length), ano, mes };
  const initial = keys.slice(0, CHUNK)
      .map(k => renderDayGroupHTML(k, groups[k], ano, mes))
      .join('');
  const hasMore = keys.length > CHUNK;
    try {
      perf.track('transactions:virtualized:init', {
        durationMs: Date.now() - t0,
        ym: mesAno,
        keys: keys.length,
        chunk: CHUNK,
        rendered: Math.min(CHUNK, keys.length)
      });
    } catch {}
    const moreBtn = hasMore ? `
    <div class="mt-3 flex justify-center">
  <button id="more-days-${mesAno}" class="btn btn-outline btn-sm" onclick="window.loadMoreDayGroups && window.loadMoreDayGroups('${mesAno}')">Carregar mais dias</button>
      </div>
    ` : '';
    // Sentinel para infinite scroll (sempre presente; o observer decide quando carregar)
    const sentinel = `<div id="scroll-sentinel-${mesAno}" class="h-4"></div>`;
    return initial + moreBtn + sentinel;
  } catch (e) {
    // Fallback para renderização completa
    return renderTransactionsGroupedByDay(transacoesMes, ano, mes);
  }
}

export function loadMoreDayGroups(mesAno) {
  try {
  const t0 = Date.now();
    const cache = ensureGroupCache();
    const state = cache[mesAno];
  if (!state) { return; }
    const { keys, groups, ano, mes } = state;
    const container = document.getElementById(`tx-day-items-${mesAno}`);
  if (!container) { return; }
    // Preservar posição do viewport ancorando no sentinel (evita "pulo" ao inserir)
    let adjust = 0;
    let shouldAdjust = false;
    try {
      const anchor = document.getElementById(`scroll-sentinel-${mesAno}`);
      if (anchor && typeof window !== 'undefined') {
        const rect = anchor.getBoundingClientRect();
        const vh = window.innerHeight || 0;
        if (rect.top > 0 && rect.top < vh + 200) { // apenas se o sentinel está próximo/visível
          shouldAdjust = true;
          adjust = rect.top;
        }
      }
    } catch {}
  const CHUNK = getDayGroupChunk();
  const start = state.nextIndex || 0;
  const end = Math.min(start + CHUNK, keys.length);
  if (start >= end) { return; }
    const chunkHtml = keys.slice(start, end).map(k => renderDayGroupHTML(k, groups[k], ano, mes)).join('');
    container.insertAdjacentHTML('beforeend', chunkHtml);
    // Aplicar ajuste de scroll, mantendo o sentinel no mesmo lugar visual
    try {
      if (shouldAdjust && typeof window !== 'undefined') {
        const anchor2 = document.getElementById(`scroll-sentinel-${mesAno}`);
        if (anchor2) {
          const after = anchor2.getBoundingClientRect().top;
          const delta = after - adjust;
          if (delta !== 0) { window.scrollBy(0, delta); }
        }
      }
    } catch {}
    state.nextIndex = end;
    try {
      perf.track('transactions:virtualized:loadMore', {
        durationMs: Date.now() - t0,
        ym: mesAno,
        added: end - start,
        nextIndex: state.nextIndex,
      });
    } catch {}
    if (end >= keys.length) {
      const btn = document.getElementById(`more-days-${mesAno}`);
      if (btn) { btn.style.display = 'none'; }
      const sen = document.getElementById(`scroll-sentinel-${mesAno}`);
      if (sen) { sen.style.display = 'none'; }
    }
  } catch {}
}

// Helper: agrupa transações por dia e renderiza com cabeçalho por data
export function renderTransactionsGroupedByDay(transacoesMes, ano, mes) {
  try {
    // Mapa YYYY-MM-DD -> array de transações
    const groups = {};
    const toDate = (t) => {
      try {
        // Preferir data explícita
        const d = getTransactionDate(t);
        if (d && !isNaN(d.getTime())) return d;
      } catch {}
      // Fallback: tentar createdAt
      try {
        if (t.createdAt?.toDate) return t.createdAt.toDate();
        if (t.createdAt) {
          const d = new Date(t.createdAt);
          if (!isNaN(d.getTime())) return d;
        }
      } catch {}
      // Fallback final: usar primeiro dia do mês da seção
      return new Date(ano, mes - 1, 1);
    };

    transacoesMes.forEach(t => {
      const d = toDate(t);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const key = `${y}-${m}-${day}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push({ t, d });
    });

    // Ordenar dias desc
    const keys = Object.keys(groups).sort((a, b) => (a < b ? 1 : -1));
  const hoje = new Date();
  const isoHoje = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}-${String(hoje.getDate()).padStart(2, '0')}`;
  const ontem = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() - 1);
  const isoOntem = `${ontem.getFullYear()}-${String(ontem.getMonth() + 1).padStart(2, '0')}-${String(ontem.getDate()).padStart(2, '0')}`;

    const fmtBR = (d) => d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });

  return keys
      .map(key => {
        const dayEntries = groups[key];
        // Totais do dia
        const receitas = dayEntries.reduce((sum, { t }) => sum + (t?.tipo === 'receita' ? parseFloat(t.valor) || 0 : 0), 0);
        const despesas = dayEntries.reduce((sum, { t }) => sum + (t?.tipo === 'despesa' ? parseFloat(t.valor) || 0 : 0), 0);
        const saldo = receitas - despesas;

        // Ordenar transações do dia por horário desc
        const items = dayEntries
          .sort((a, b) => b.d.getTime() - a.d.getTime())
          .map(({ t }) => renderTransactionItemHTML(t, ano, mes))
          .join('');

        // Cabeçalho do dia: Hoje/Ontem/DD/MM
        let label;
        if (key === isoHoje) label = 'Hoje';
        else if (key === isoOntem) label = 'Ontem';
        else {
          const [ky, km, kd] = key.split('-').map(n => parseInt(n, 10));
          const localDay = new Date(ky, (km || 1) - 1, kd || 1);
          label = fmtBR(localDay);
        }

        // Estado de colapso por dia
        const collapsed = isDayCollapsed(key);
        const chevron = collapsed ? '▸' : '▾';

        return `
          <div class="tx-day-group">
            <div class="tx-day-header tx-day-header--clickable" data-day-key="${key}" onclick="window.toggleDayGroup && window.toggleDayGroup('${key}')">
              <span class="tx-day-chevron" data-chev-key="${key}">${chevron}</span>
              ${label}
            </div>
            <div class="tx-day-summary">
              <span class="text-green-600">+R$ ${receitas.toFixed(2)}</span>
              <span class="text-gray-400">•</span>
              <span class="text-red-600">-R$ ${despesas.toFixed(2)}</span>
              <span class="text-gray-400">•</span>
              <span class="${saldo >= 0 ? 'text-green-700' : 'text-red-700'}">Saldo ${saldo >= 0 ? '' : '-'}R$ ${Math.abs(saldo).toFixed(2)}</span>
            </div>
            <div class="tx-day-items space-y-2 sm:space-y-3" data-day-key="${key}" style="display: ${collapsed ? 'none' : 'block'}">${items}</div>
          </div>
        `;
      })
      .join('');
  } catch (e) {
    console.warn('Falha ao agrupar por dia, render básico:', e);
    return transacoesMes.map(t => renderTransactionItemHTML(t, ano, mes)).join('');
  }
}

// ===== Estado de colapso por dia: helpers e toggle =====
export function getCollapsedDays() {
  try {
    const raw = localStorage.getItem('txCollapsedDays');
    const arr = raw ? JSON.parse(raw) : [];
    if (Array.isArray(arr)) return new Set(arr);
  } catch {}
  return new Set();
}

export function saveCollapsedDays(set) {
  try {
    localStorage.setItem('txCollapsedDays', JSON.stringify(Array.from(set)));
  } catch {}
}

export function isDayCollapsed(key) {
  if (!window.appState) window.appState = {};
  if (!window.appState.ui) window.appState.ui = {};
  if (!window.appState.ui.collapsedDays) {
    window.appState.ui.collapsedDays = getCollapsedDays();
  }
  return window.appState.ui.collapsedDays.has(key);
}

// Helper: renderiza um item de transação
export function renderTransactionItemHTML(t, ano, mes) {
  const categoria = window.appState.categories?.find(c => c.id === t.categoriaId);
  const dataFormatada = formatTransactionDisplayDate(t, ano, mes);
  const isReceita = t.tipo === 'receita';

  let parcelaInfo = '';
  if (t.recorrenteId) {
    let parcelaAtual = t.parcelaAtual;
    let parcelasTotal = t.parcelasTotal;

    if (!parcelaAtual || !parcelasTotal) {
      const recorrente = window.appState.recorrentes?.find(r => r.id === t.recorrenteId);
      if (recorrente) {
        parcelasTotal = recorrente.parcelasTotal;
        if (window.calcularParcelaRecorrente) {
          parcelaAtual = window.calcularParcelaRecorrente(recorrente, parseInt(ano), parseInt(mes));
        } else {
          parcelaAtual = 1;
        }
      } else {
        parcelaAtual = 1;
        parcelasTotal = 1;
      }
    }

    if (parcelasTotal && parcelasTotal > 1) {
      parcelaInfo = ` • 🔄 ${parcelaAtual}/${parcelasTotal}`;
    } else {
      parcelaInfo = ' • 🔄 ♾️';
    }
  }

  return `
    <div class="list-item p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 group ${isReceita ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'}">
      <div class="flex items-start justify-between gap-3">
        <div class="flex items-center gap-3 flex-1 min-w-0">
          <div class="flex flex-col items-center">
            <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-base sm:text-lg ${isReceita ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}">${isReceita ? '💰' : '💸'}</div>
            <div class="w-3 h-3 rounded-full mt-1" style="background-color: ${categoria?.cor || '#6B7280'}"></div>
          </div>
          <div class="min-w-0 flex-1">
            <p class="list-item-title font-medium text-gray-900 dark:text-gray-100 truncate">${t.descricao}</p>
          </div>
        </div>
        <div class="text-right mt-0.5 sm:mt-0">
          <span class="font-bold text-base sm:text-lg ${isReceita ? 'text-green-600' : 'text-red-600'}">${isReceita ? '+' : '-'}R$ ${parseFloat(t.valor).toFixed(2)}</span>
        </div>
      </div>
      <div class="mt-2 flex items-center justify-between gap-3">
        <p class="list-item-subtitle text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 truncate">${categoria?.nome || 'Sem categoria'} • ${dataFormatada}${parcelaInfo}</p>
        <div class="opacity-80 sm:opacity-60 group-hover:opacity-100 flex gap-1">
          <button onclick="window.editTransaction && window.editTransaction('${t.id}')" class="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900 transition-all duration-200" title="Editar transação">✏️</button>
          <button onclick="window.deleteTransactionWithConfirmation && window.deleteTransactionWithConfirmation('${t.id}', '${(t.descricao || '').replace(/'/g, "\\'")}')" class="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900 transition-all duration-200" title="Excluir transação">🗑️</button>
        </div>
      </div>
    </div>
  `;
}

// Função para renderizar transações filtradas
export function renderFilteredTransactions(filteredTransactions) {
  if (!filteredTransactions.length) {
    return `
      <div class="text-center py-8">
        <div class="text-4xl mb-4">🔍</div>
        <div class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Nenhuma transação encontrada</div>
        <div class="text-gray-600 dark:text-gray-400">Tente usar termos diferentes na pesquisa</div>
      </div>
    `;
  }
  
  return filteredTransactions.map(t => {
  const categoria = window.appState.categories?.find(c => c.id === t.categoriaId);
  const data = formatTransactionDisplayDate(t);
    const isReceita = t.tipo === 'receita';
    
    return `
      <div class="list-item ${isReceita ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-red-500'}">
        <div class="flex-1 min-w-0">
          <div class="list-item-title truncate">${t.descricao}</div>
          <div class="list-item-subtitle text-xs sm:text-sm">
            ${categoria?.nome || 'Sem categoria'} • ${data}
            ${t.recorrenteId ? ' • Recorrente' : ''}
            ${(() => {
              if (!t.recorrenteId) return '';
              
              // Calcular parcela se não estiver salva
              let parcelaAtual = t.parcelaAtual;
              let parcelasTotal = t.parcelasTotal;
              
              if (!parcelaAtual || !parcelasTotal) {
                const recorrente = window.appState.recorrentes?.find(r => r.id === t.recorrenteId);
                if (recorrente) {
                  parcelasTotal = recorrente.parcelasTotal;
                  if (window.calcularParcelaRecorrente) {
                    const now = new Date();
                    parcelaAtual = window.calcularParcelaRecorrente(recorrente, now.getFullYear(), now.getMonth() + 1);
                  } else {
                    parcelaAtual = 1;
                  }
                } else {
                  parcelaAtual = 1;
                  parcelasTotal = 1;
                }
              }
              
              if (parcelasTotal && parcelasTotal > 1) {
                return ` • ${parcelaAtual} de ${parcelasTotal}`;
              } else {
                return ' • Infinito';
              }
            })()}
          </div>
        </div>
        <div class="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <span class="text-sm sm:text-base font-bold ${isReceita ? 'text-green-600' : 'text-red-600'}">
            ${isReceita ? '+' : '-'}R$ ${parseFloat(t.valor).toFixed(2)}
          </span>
          <div class="flex gap-1">
            <button onclick="window.editTransaction('${t.id}')" class="btn btn-outline btn-sm" title="Editar transação">
              ✏️
            </button>
            <button onclick="window.deleteTransactionWithConfirmation('${t.id}', '${t.descricao.replace(/'/g, "\\'")}')" class="btn btn-danger btn-sm" title="Excluir transação">
              🗑️
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Função para calcular número da parcela
export function calcularNumeroParcela(transacao) {
  if (!transacao.recorrenteId) {
    return null;
  }
  return 1; // Simplificado para esta versão
}

// Lazy loader: chamado pelo botão para carregar um mês antigo
export function loadMonthSection(mesAno) {
  try {
    const el = document.getElementById(`month-${mesAno}`);
    if (!el || el.dataset.loaded === '1') return;

    const [ano, mes] = mesAno.split('-');
    const transacoesMes = (window.appState.transactions || []).filter(t => getTransactionYearMonth(t) === mesAno);

  el.outerHTML = renderMonthSectionHTML(mesAno, transacoesMes);
  // Após inserir a seção, configurar o infinite scroll para este mês
  setTimeout(() => { try { setupInfiniteScrollForMonth(mesAno); } catch {} }, 0);
  } catch (err) {
    console.warn('Falha ao carregar mês', mesAno, err);
  }
}

// Toggle do estado de colapso por dia
export function toggleDayGroup(key) {
  if (!key) return;
  // Inicializar set na memória (e carregar do storage se necessário)
  if (!window.appState) window.appState = {};
  if (!window.appState.ui) window.appState.ui = {};
  if (!window.appState.ui.collapsedDays) {
    window.appState.ui.collapsedDays = getCollapsedDays();
  }
  const set = window.appState.ui.collapsedDays;

  // Toggle no DOM
  const items = document.querySelector(`.tx-day-items[data-day-key="${key}"]`);
  const chev = document.querySelector(`.tx-day-chevron[data-chev-key="${key}"]`);
  if (items) {
    const nowCollapsed = items.style.display !== 'none' ? true : false;
    items.style.display = nowCollapsed ? 'none' : 'block';
    if (chev) chev.textContent = nowCollapsed ? '▸' : '▾';
    // Persistir estado
    if (nowCollapsed) set.add(key); else set.delete(key);
    saveCollapsedDays(set);
  }
}

// Expande todos os dias do mês
export function expandAllDays(mesAno) {
  try {
    if (!mesAno) return;
    if (!window.appState) window.appState = {};
    if (!window.appState.ui) window.appState.ui = {};
    if (!window.appState.ui.collapsedDays) {
      window.appState.ui.collapsedDays = getCollapsedDays();
    }
    const set = window.appState.ui.collapsedDays;
    const selector = `#month-${mesAno} .tx-day-items`;
    document.querySelectorAll(selector).forEach(el => {
      el.style.display = 'block';
      const key = el.getAttribute('data-day-key');
      if (key) set.delete(key);
    });
    // Atualizar chevrons
    document.querySelectorAll(`#month-${mesAno} .tx-day-chevron`).forEach(ch => ch.textContent = '▾');
    saveCollapsedDays(set);
  } catch {}
}

// Colapsa todos os dias do mês
export function collapseAllDays(mesAno) {
  try {
    if (!mesAno) return;
    if (!window.appState) window.appState = {};
    if (!window.appState.ui) window.appState.ui = {};
    if (!window.appState.ui.collapsedDays) {
      window.appState.ui.collapsedDays = getCollapsedDays();
    }
    const set = window.appState.ui.collapsedDays;
    const selector = `#month-${mesAno} .tx-day-items`;
    document.querySelectorAll(selector).forEach(el => {
      el.style.display = 'none';
      const key = el.getAttribute('data-day-key');
      if (key) set.add(key);
    });
    // Atualizar chevrons
    document.querySelectorAll(`#month-${mesAno} .tx-day-chevron`).forEach(ch => ch.textContent = '▸');
    saveCollapsedDays(set);
  } catch {}
}

// Normaliza a data de uma transação, suportando vários campos
export function getTransactionDate(t) {
  try {
  let v = t?.dataEfetivacao || t?.dataLancamento || t?.data || t?.date || t?.createdAt;
    if (!v) return null;
    if (v && typeof v.toDate === 'function') return v.toDate();
    // Firestore Timestamp (plain object)
    if (v && typeof v === 'object' && typeof v.seconds === 'number') {
      const d = new Date(v.seconds * 1000);
      return isNaN(d.getTime()) ? null : d;
    }
    // Se vier string, tratar 'YYYY-MM-DD' como data local para evitar shift de fuso horário
    if (typeof v === 'string') {
      const s = v.trim();
      const m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (m) {
        const y = parseInt(m[1], 10);
        const mon = parseInt(m[2], 10) - 1;
        const day = parseInt(m[3], 10);
        return new Date(y, mon, day);
      }
      const d = new Date(s);
      return isNaN(d.getTime()) ? null : d;
    }
    // Se vier timestamp numérico (ms ou s) ou Date
    if (typeof v === 'number') {
      const ms = v < 1e12 ? v * 1000 : v;
      const d = new Date(ms);
      return isNaN(d.getTime()) ? null : d;
    }
    if (v instanceof Date) return v;
    const d = new Date(v);
    return isNaN(d.getTime()) ? null : d;
  } catch {
    return null;
  }
}

// Extrai YYYY-MM de forma robusta a partir da transação (aceita vários formatos)
export function getTransactionYearMonth(t) {
  try {
    // Campos explícitos de competência (BR): MM/YYYY, YYYY-MM
    if (typeof t?.competencia === 'string') {
      const s = t.competencia.trim();
      let m;
      m = s.match(/^(\d{1,2})\/(\d{4})$/);
      if (m) return `${m[2]}-${String(parseInt(m[1], 10)).padStart(2, '0')}`;
      m = s.match(/^(\d{4})-(\d{2})$/);
      if (m) return `${m[1]}-${m[2]}`;
    }

    // Pares (mes, ano) em diferentes convenções
    const monthCandidates = [t?.mes, t?.mesReferencia, t?.mesLancamento, t?.mesCompetencia];
    const yearCandidates = [t?.ano, t?.anoReferencia, t?.anoLancamento, t?.anoCompetencia];
    const mesIdx = monthCandidates.findIndex(v => v !== undefined && v !== null && v !== '');
    const anoIdx = yearCandidates.findIndex(v => v !== undefined && v !== null && v !== '');
    if (mesIdx !== -1 && anoIdx !== -1) {
      const mon = parseInt(monthCandidates[mesIdx], 10);
      const y = parseInt(yearCandidates[anoIdx], 10);
      if (!Number.isNaN(mon) && mon >= 1 && mon <= 12 && !Number.isNaN(y) && y > 1900) {
        return `${y}-${String(mon).padStart(2, '0')}`;
      }
    }

  const v = t?.dataEfetivacao || t?.dataLancamento || t?.data || t?.date || t?.createdAt;
    if (!v) return null;

    // Firestore Timestamp
    if (v && typeof v.toDate === 'function') {
      const d = v.toDate();
      const y = d.getFullYear();
      const m = d.getMonth() + 1;
      return `${y}-${String(m).padStart(2, '0')}`;
    }

    // Firestore Timestamp (plain object with seconds)
    if (v && typeof v === 'object' && typeof v.seconds === 'number') {
      const d = new Date(v.seconds * 1000);
      if (!isNaN(d.getTime())) {
        const y = d.getFullYear();
        const m = d.getMonth() + 1;
        return `${y}-${String(m).padStart(2, '0')}`;
      }
      return null;
    }

    // Number epoch (ms or seconds)
    if (typeof v === 'number') {
      const ms = v < 1e12 ? v * 1000 : v; // tratar epoch em segundos
      const d = new Date(ms);
      if (!isNaN(d.getTime())) {
        const y = d.getFullYear();
        const m = d.getMonth() + 1;
        return `${y}-${String(m).padStart(2, '0')}`;
      }
      return null;
    }

    if (typeof v === 'string') {
      const s = v.trim();
      // ISO completo: YYYY-MM-DD...
      let m;
  m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
      if (m) return `${m[1]}-${m[2]}`;

      // ISO ano-mês: YYYY-MM
      m = s.match(/^(\d{4})-(\d{2})$/);
      if (m) return `${m[1]}-${m[2]}`;

      // BR: DD/MM/YYYY
      m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
      if (m) {
        const y = parseInt(m[3], 10);
        const mon = parseInt(m[2], 10);
        return `${y}-${String(mon).padStart(2, '0')}`;
      }

      // BR: MM/YYYY
      m = s.match(/^(\d{1,2})\/(\d{4})$/);
      if (m) {
        const y = parseInt(m[2], 10);
        const mon = parseInt(m[1], 10);
        return `${y}-${String(mon).padStart(2, '0')}`;
      }

      // Fallback: tentar Date
  const d = new Date(s);
      if (!isNaN(d.getTime())) {
        const y = d.getFullYear();
        const mon = d.getMonth() + 1;
        return `${y}-${String(mon).padStart(2, '0')}`;
      }
      return null;
    }

    return null;
  } catch {
    return null;
  }
}

// Formata a data para exibição
export function formatTransactionDisplayDate(t, anoCtx, mesCtx) {
  const d = getTransactionDate(t);
  if (d) return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  const ym = getTransactionYearMonth(t);
  if (ym) {
    const [y, m] = ym.split('-');
    return `${m}/${y}`;
  }
  if (anoCtx && mesCtx) {
    return `${String(mesCtx).padStart(2, '0')}/${anoCtx}`;
  }
  return '--/--';
}

// Handler: expand all collapsed months
export function loadAllOlderMonths() {
  try {
    const sections = document.querySelectorAll('[id^="month-"][data-loaded="0"]');
    sections.forEach(sec => {
      const mesAno = sec.dataset.mes;
      if (mesAno && window.loadMonthSection) window.loadMonthSection(mesAno);
    });
  } catch {}
}

// ===== Infinite scroll: observer por mês =====
function getInfiniteState() {
  if (!window.__txInfinite) {
    window.__txInfinite = { observers: {}, loading: {} };
  }
  return window.__txInfinite;
}

export function teardownInfiniteScroll() {
  try {
    const st = getInfiniteState();
    Object.values(st.observers).forEach(obs => {
      try { obs.disconnect(); } catch {}
    });
    st.observers = {};
    st.loading = {};
  } catch {}
}

export function setupInfiniteScrollForMonth(mesAno) {
  try {
    const st = getInfiniteState();
    // Evitar duplicar observers
    if (st.observers[mesAno]) { return; }
    const sentinel = document.getElementById(`scroll-sentinel-${mesAno}`);
    if (!sentinel) { return; }
    // Disponibilidade do IntersectionObserver (ambiente de testes pode não ter)
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return; // mantém fallback do botão "Carregar mais dias"
    }
  // Se o IO está disponível, podemos ocultar o botão de fallback para uma UX mais limpa
  const btn = document.getElementById(`more-days-${mesAno}`);
  if (btn) { btn.style.display = 'none'; }
    let obs;
    const cb = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          if (st.loading[mesAno]) return;
          // Verificar se ainda há o que carregar no cache
          const cache = ensureGroupCache();
          const state = cache[mesAno];
          if (!state) return;
          const { keys, nextIndex = 0 } = state;
          if (nextIndex >= keys.length) return; // nada a carregar
          st.loading[mesAno] = true;
          // Carregar próximo chunk; soltar flag após operação
          try { loadMoreDayGroups(mesAno); } finally {
            setTimeout(() => {
              st.loading[mesAno] = false;
              // Se acabou o conteúdo, desconectar e ocultar sentinel
              try {
                const s2 = ensureGroupCache()[mesAno];
                if (s2 && s2.nextIndex >= s2.keys.length) {
                  if (obs) { try { obs.disconnect(); } catch {} }
                  delete st.observers[mesAno];
                  const sen = document.getElementById(`scroll-sentinel-${mesAno}`);
                  if (sen) { sen.style.display = 'none'; }
                }
              } catch {}
            }, 0);
          }
        }
      }
    };
    obs = new window.IntersectionObserver(cb, { root: null, rootMargin: '600px 0px', threshold: 0 });
    obs.observe(sentinel);
    st.observers[mesAno] = obs;
  } catch {}
}

// Disponibiliza helpers apenas em testes (não exporta na build)
try {
  if (typeof window !== 'undefined' && typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.MODE === 'test') {
    window.__txTestHelpers = { ensureGroupCache, getDayGroupChunk };
  }
} catch {}
