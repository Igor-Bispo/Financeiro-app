import { calcularStatusRecorrente, loadRecorrentes, aplicarRecorrentesDoMes, deleteRecorrente as svcDeleteRecorrente } from './service.js';
import { eventBus } from '@core/events/eventBus.js';
import { mountPeriodIndicator } from '../../ui/PeriodIndicator.js';

export async function render(container) {
  const root = document.createElement('div');
  root.className = 'recorrentes-page';

  // Header padrão das abas (sem seletor interativo de período)
  const header = document.createElement('div');
  header.className = 'tab-header mb-6';
  header.innerHTML = '<h2 class="tab-title-highlight">♻️ Recorrentes</h2>';
  root.appendChild(header);

  // Card inicial com ação
  const content = document.createElement('div');
  content.className = 'recorrentes-content';
  content.innerHTML = `
    <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white">🔁 Gerenciar Recorrentes</h3>
  <button onclick="window.showAddRecorrenteModal && window.showAddRecorrenteModal()" class="u-btn u-btn--primary mobile-btn">
          ➕ Nova Recorrente
        </button>
      </div>
      <div class="text-center py-8">
        <div class="text-4xl mb-4">♻️</div>
        <p class="text-gray-600 dark:text-gray-400">Página de recorrentes em desenvolvimento</p>
        <p class="text-sm text-gray-500 dark:text-gray-500 mt-2">Carregando recorrentes...</p>
      </div>
    </div>
  `;
  root.appendChild(content);

  // Limpar container e adicionar
  if (container) {
    container.innerHTML = '';
    container.appendChild(root);
  }

  // Carregar e renderizar visão completa
  await renderRecorrentes();
}

// Render completo seguindo o padrão de tab-container
export async function renderRecorrentes() {
  try {
    // Render somente se a rota ativa for Recorrentes
    const hh = (window.location.hash || '').split('?')[0];
    if (hh !== '#/recorrentes') {
      return;
    }
    // Rate limit para evitar piscadas
    const now = Date.now();
    if (window.__lastRecorrentesRender && (now - window.__lastRecorrentesRender) < 300) {
      return;
    }
    window.__lastRecorrentesRender = now;

    // Garantir dados carregados
    await loadRecorrentes();


    const content = document.getElementById('app-content');
    const { year: selYear, month: selMonth } = getSelectedPeriod();

    // Filtrar recorrentes pelo orçamento selecionado
    const currentBudgetId = window.appState?.currentBudget?.id;
    let items = (window.appState.recorrentes || []);
    if (currentBudgetId) {
      items = items.filter(r => r.budgetId === currentBudgetId || !r.budgetId);
    }
    items = items.slice().sort((a, b) => String(a.descricao || a.nome || '').localeCompare(String(b.descricao || b.nome || '')));
    const transacoes = window.appState.transactions || [];

    const mesesNomes = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
    const monthName = mesesNomes[selMonth - 1] || '';


  // Métricas do resumo
  let total = items.length;
  let aplicadasMes = 0;
  let pendentesMes = 0;
  let valorPotencialMes = 0;
  let valorAplicadoMes = 0;
  let valorPendenteMes = 0;
  for (const it of items) {
    const ativo = it.ativa !== false;
    const v = Number(it.valor ?? 0);
    const st = calcularStatusRecorrente(it, transacoes, selYear, selMonth);
    const aplicadaEsteMes = !!st?.foiEfetivadaEsteMes;
    const estaNaJanela = !st?.aposUltimaParcela && !st?.antesDaPrimeiraParcela;

    // Contabilizar como aplicada mesmo que esteja inativa após auto-inativação
    if (aplicadaEsteMes) {
      valorPotencialMes += v;
      aplicadasMes++;
      valorAplicadoMes += v;
      continue;
    }

    // Pendentes contam somente se ainda ativas e dentro da janela do mês
    if (ativo && estaNaJanela) {
      valorPotencialMes += v;
      pendentesMes++;
      valorPendenteMes += v;
    }
  }
  // Observação: breakdown ativas/inativas foi removido do subtítulo para seguir o padrão das outras páginas.
  const ativasPeriodo = aplicadasMes + pendentesMes; // Ativas no mês (na janela): aplicadas + pendentes

    // Habilitar modo compacto automático em telas pequenas
    const compactClass = (typeof window !== 'undefined' && window.innerWidth <= 480) ? 'recorrentes-compact' : '';
    content.innerHTML = `
      <div class="tab-container ${compactClass}">
        <div class="tab-header flex items-center justify-between">
          <h2 class="tab-title-highlight">♻️ Recorrentes</h2>
          <div id="rec-period-indicator"></div>
        </div>
        <div class="tab-content">
          <div class="content-spacing">
            <!-- ========== SEÇÃO 1: RESUMO COMPACTO ========== -->
            <div class="mb-8">
              <div class="flex items-center gap-2 mb-4">
                <div class="w-1 h-6 bg-gradient-to-b from-purple-500 to-green-500 rounded-full"></div>
                <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">♻️ Resumo</h2>
              </div>
              
              <div class="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl shadow-lg border border-blue-200 dark:border-gray-600 p-4 mb-6">
                <!-- Header Compacto -->
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                      <span class="text-xl">♻️</span>
                      Controle de Recorrentes
                    </h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">${total} recorrentes • ${String(selMonth).padStart(2,'0')}/${selYear}</p>
                  </div>
                  <div class="text-right">
                    <div class="text-lg font-bold text-purple-600 dark:text-purple-400">
                      R$ ${valorPotencialMes.toFixed(2)}
                    </div>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Potencial</p>
                  </div>
                </div>
                
                <!-- Métricas Compactas -->
                <div class="grid grid-cols-3 gap-3 mb-4">
                  <div class="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-gray-200 dark:border-gray-600">
                    <div class="text-lg mb-1">✅</div>
                    <div class="text-lg font-bold text-green-600 dark:text-green-400">${aplicadasMes}</div>
                    <div class="text-xs text-gray-600 dark:text-gray-400">Aplicadas</div>
                  </div>
                  
                  <div class="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-gray-200 dark:border-gray-600">
                    <div class="text-lg mb-1">⏳</div>
                    <div class="text-lg font-bold text-orange-600 dark:text-orange-400">${pendentesMes}</div>
                    <div class="text-xs text-gray-600 dark:text-gray-400">Pendentes</div>
                  </div>
                  
                  <div class="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-gray-200 dark:border-gray-600">
                    <div class="text-lg mb-1">🟢</div>
                    <div class="text-lg font-bold text-blue-600 dark:text-blue-400">${ativasPeriodo}</div>
                    <div class="text-xs text-gray-600 dark:text-gray-400">Ativas</div>
                  </div>
                </div>

                <!-- Resumo Financeiro Compacto -->
                <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-600">
                  <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
                    <span>💰</span>
                    Resumo Financeiro
                  </h5>
                  <div class="space-y-1">
                    <div class="flex justify-between text-xs">
                      <span class="text-gray-600 dark:text-gray-400">Aplicado:</span>
                      <span class="font-medium text-green-600 dark:text-green-400">R$ ${valorAplicadoMes.toFixed(2)}</span>
                    </div>
                    <div class="flex justify-between text-xs">
                      <span class="text-gray-600 dark:text-gray-400">Pendente:</span>
                      <span class="font-medium text-orange-600 dark:text-orange-400">R$ ${valorPendenteMes.toFixed(2)}</span>
                    </div>
                    <div class="flex justify-between text-xs border-t border-gray-200 dark:border-gray-600 pt-1">
                      <span class="text-gray-600 dark:text-gray-400">Total:</span>
                      <span class="font-bold text-purple-600 dark:text-purple-400">
                        R$ ${valorPotencialMes.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mb-8">
              <div class="flex items-center gap-2 mb-4">
                <div class="w-1 h-6 bg-gradient-to-b from-purple-500 to-green-500 rounded-full"></div>
                <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">🔧 Ações & Filtros</h2>
              </div>
              <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 flex flex-col md:flex-row gap-3 md:gap-4 md:items-center md:justify-between">
                <div class="text-sm text-gray-600 dark:text-gray-400">Período selecionado: <strong>${monthName}/${selYear}</strong></div>
                <div class="flex gap-2">
                  <button onclick="window.showAddRecorrenteModal && window.showAddRecorrenteModal()" class="u-btn u-btn--primary mobile-btn">➕ Nova Recorrente</button>
                  <button ${pendentesMes === 0 ? 'disabled' : ''} onclick="window.efetivarRecorrentesMesAtual && window.efetivarRecorrentesMesAtual()" class="u-btn u-btn--outline mobile-btn" ${pendentesMes === 0 ? 'disabled' : ''}>
                    ⚡ Efetivar Pendentes (${pendentesMes})
                  </button>
                </div>
              </div>
            </div>

            <div class="mb-8">
              <div class="flex items-center gap-2 mb-4">
                <div class="w-1 h-6 bg-gradient-to-b from-green-500 to-teal-500 rounded-full"></div>
                <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">📋 Lista de Recorrentes</h2>
              </div>
              <div id="rec-list" class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4"></div>
            </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Atualizar modo compacto em resize para telas pequenas (evitar múltiplos listeners)
    try {
      const tabContainer = content.querySelector('.tab-container');
      const key = '__recResizeHandler';
      if (window[key]) {
        window.removeEventListener('resize', window[key]);
      }
      const updateCompact = () => {
        if (!tabContainer) return;
        if (window.innerWidth <= 480) {
          tabContainer.classList.add('recorrentes-compact');
        } else {
          tabContainer.classList.remove('recorrentes-compact');
        }
      };
      window[key] = updateCompact;
      updateCompact();
      window.addEventListener('resize', updateCompact, { passive: true });
    } catch {}

    // Montar indicador de período padrão no cabeçalho
    try { mountPeriodIndicator('#rec-period-indicator'); } catch {}

    // Renderizar lista
    const listEl = document.getElementById('rec-list');
    // Toggle de detalhes do resumo
    try {
      const toggle = document.getElementById('rec-summary-toggle');
      const details = document.getElementById('rec-summary-details');
      if (toggle && details) {
        toggle.addEventListener('click', () => {
          const isHidden = details.classList.contains('hidden');
          if (isHidden) {
            details.classList.remove('hidden');
            toggle.textContent = 'Ocultar detalhes';
          } else {
            details.classList.add('hidden');
            toggle.textContent = 'Mostrar detalhes';
          }
        });
      }
    } catch {}

    if (!items.length) {
      listEl.innerHTML = '<div class="empty-state"><div class="empty-icon">♻️</div><div class="empty-text">Nenhuma recorrente cadastrada</div><div class="empty-description">Crie sua primeira recorrente para automatizar lançamentos</div><div class="mt-2"><button class="u-btn u-btn--primary mobile-btn w-full" onclick="window.showAddRecorrenteModal && window.showAddRecorrenteModal()">➕ Nova Recorrente</button></div></div>';
    } else {
      const ano = selYear; const mes = selMonth;
      const parts = items.map(it => {
        const st = calcularStatusRecorrente(it, transacoes, ano, mes);
        // Fora da janela do mês selecionado:
        // - Já passou da última parcela
        // - Ainda não chegou na primeira parcela (início futuro)
        if (st?.aposUltimaParcela || st?.antesDaPrimeiraParcela) {
          return null;
        }
        const nome = it.descricao || it.nome || it.name || it.id;
        const ativo = it.ativa !== false;
        const badge = st?.temParcelas ? `<span class=\"ml-2 text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-800\">${st.parcelaAtual}/${st.totalParcelas}</span>` : '';
        const aplicado = st?.foiEfetivadaEsteMes ? '<span class=\"text-xs text-green-600 ml-2\">aplicada</span>' : '';
        const valorNum = Number(it.valor ?? 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
        return `
          <div class=\"p-3 rounded border border-gray-200 dark:border-gray-700 flex justify-between items-center mb-2\">
            <div class=\"truncate\">
              <div class=\"font-medium ${ativo ? '' : 'line-through opacity-70'}\">${nome}${badge}${aplicado}</div>
              <div class=\"text-sm text-gray-500\">R$ ${valorNum}</div>
            </div>
            <div class=\"flex items-center gap-2\">
              <div class=\"text-xs ${ativo ? 'text-green-600' : 'text-gray-400'}\">${ativo ? 'Ativa' : 'Inativa'}</div>
              <button
                class=\"p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-gray-900\"
                title=\"Editar\"
                onclick=\"window.editRecorrente && window.editRecorrente('${it.id}')\"
                aria-label=\"Editar recorrente\"
              >✏️</button>
              <button
                class=\"p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 hover:text-red-700\"
                title=\"Apagar\"
                onclick=\"window.deleteRecorrente && window.deleteRecorrente('${it.id}')\"
                aria-label=\"Apagar recorrente\"
              >🗑️</button>
            </div>
          </div>
        `;
      });
      const finalHtml = parts.filter(Boolean).join('');
      listEl.innerHTML = finalHtml || '<div class="empty-state"><div class="empty-icon">🗓️</div><div class="empty-text">Nenhuma recorrente neste período</div><div class="empty-description">Altere o período ou crie uma recorrente válida para este mês</div></div>';
    }
  } catch (e) {
    console.error('Erro ao renderizar recorrentes:', e);
  }
}

// Helper: obter período selecionado (reuso do padrão das outras abas)
function getSelectedPeriod() {
  try {
    if (window?.appState?.selectedYear && window?.appState?.selectedMonth) {
      return { year: window.appState.selectedYear, month: window.appState.selectedMonth };
    }
  } catch {}
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth() + 1 };
}

// Bind eventos para re-render (somente quando a aba recorrentes estiver ativa)
try {
  const rerender = async () => {
    const hh = (window.location.hash || '').split('?')[0];
    if (hh !== '#/recorrentes') return;
    try { await loadRecorrentes(); } catch {}
    return renderRecorrentes();
  };
  eventBus.on('period:changed', () => queueMicrotask(() => rerender()));
  eventBus.on('budget:changed', () => queueMicrotask(() => rerender()));
  // Atualizar recorrentes ao adicionar/editar/excluir transação
  eventBus.on('transactions:updated', () => queueMicrotask(() => rerender()));
  eventBus.on('transaction:added', () => queueMicrotask(() => rerender()));
  eventBus.on('transaction:updated', () => queueMicrotask(() => rerender()));
  eventBus.on('transaction:deleted', () => queueMicrotask(() => rerender()));
} catch {}

// Expor ação global para efetivar recorrentes pendentes do mês atual
if (typeof window !== 'undefined') {
  window.efetivarRecorrentesMesAtual = async function() {
    try {
      const userId = window.appState?.currentUser?.uid;
      const budgetId = window.appState?.currentBudget?.id;
      if (!userId || !budgetId) {
        window.Snackbar ? window.Snackbar({ message: 'Usuário ou orçamento não encontrado', type: 'error' }) : alert('Usuário ou orçamento não encontrado');
        return;
      }
      const agora = new Date();
      const y = window.appState?.selectedYear || agora.getFullYear();
      const m = window.appState?.selectedMonth || (agora.getMonth() + 1);
      // Aplicar com forçar aplicação
      const res = await aplicarRecorrentesDoMes(userId, budgetId, true, y, m);
      // Recarregar dados relevantes
      if (typeof window.loadTransactions === 'function') {
        await window.loadTransactions();
      }
      await loadRecorrentes();
      // Notificar e re-renderizar
      if (window.Snackbar) {
        if (res?.aplicadas > 0) {
          window.Snackbar({ message: `Efetivadas ${res.aplicadas} recorrentes. ${res.pendentes} pendentes.`, type: 'success' });
        } else {
          window.Snackbar({ message: 'Nenhuma recorrente para efetivar neste mês.', type: 'info' });
        }
      }
      try {
        const budgetId2 = window.appState?.currentBudget?.id;
        eventBus.emit('transactions:updated', { budgetId: budgetId2, transactions: window.appState?.transactions || [] });
      } catch {}
      try {
        const budgetId3 = window.appState?.currentBudget?.id;
        eventBus.emit('categories:updated', { budgetId: budgetId3, categories: window.appState?.categories || [] });
      } catch {}
      try { eventBus.emit('recorrentes:updated'); } catch {}
      // Atualizar UI principal
      try { if (window.renderDashboard) window.renderDashboard(); } catch {}
      await renderRecorrentes();
    } catch (err) {
      console.error('Erro ao efetivar recorrentes:', err);
      window.Snackbar ? window.Snackbar({ message: 'Erro ao efetivar recorrentes', type: 'error' }) : alert('Erro ao efetivar recorrentes');
    }
  };

  // Editar recorrente: abre o modal com os dados preenchidos
  window.editRecorrente = function(id) {
    try {
      const rec = (window.appState?.recorrentes || []).find(r => r.id === id);
      if (!rec) {
        window.Snackbar ? window.Snackbar({ message: 'Recorrente não encontrada', type: 'error' }) : alert('Recorrente não encontrada');
        return;
      }
      if (typeof window.showAddRecorrenteModal === 'function') {
        window.showAddRecorrenteModal(rec);
      }
    } catch (err) {
      console.error('Erro ao editar recorrente:', err);
    }
  };

  // Apagar recorrente: confirma, remove no repositório e re-renderiza
  window.deleteRecorrente = async function(id) {
    const userId = window.appState?.currentUser?.uid;
    if (!userId) {
      window.Snackbar ? window.Snackbar({ message: 'Usuário não autenticado', type: 'error' }) : alert('Usuário não autenticado');
      return;
    }
    const ok = typeof window.confirm === 'function' ? window.confirm('Excluir esta recorrente?') : true;
    if (!ok) return;
    try {
      await svcDeleteRecorrente(userId, id);
      await loadRecorrentes();
      try { if (typeof window.loadTransactions === 'function') await window.loadTransactions(); } catch {}
      window.Snackbar ? window.Snackbar({ message: 'Recorrente apagada', type: 'success' }) : null;
      await renderRecorrentes();
      try { eventBus.emit('recorrentes:updated'); } catch {}
    } catch (err) {
      console.error('Erro ao excluir recorrente:', err);
      window.Snackbar ? window.Snackbar({ message: 'Erro ao excluir recorrente', type: 'error' }) : alert('Erro ao excluir recorrente');
    }
  };
}
