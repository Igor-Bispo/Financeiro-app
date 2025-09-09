import { calcularStatusRecorrente, loadRecorrentes, aplicarRecorrentesDoMes, deleteRecorrente as svcDeleteRecorrente } from './service.js';
import { eventBus } from '@core/events/eventBus.js';
import { mountPeriodIndicator } from '../../ui/PeriodIndicator.js';

export async function render(container) {
  const root = document.createElement('div');
  root.className = 'recorrentes-page';

  // Header padrÃ£o das abas (sem seletor interativo de perÃ­odo)
  const header = document.createElement('div');
  header.className = 'tab-header mb-6';
  header.innerHTML = '<h2 class="tab-title-highlight">â™»ï¸ Recorrentes</h2>';
  root.appendChild(header);

  // Card inicial com aÃ§Ã£o
  const content = document.createElement('div');
  content.className = 'recorrentes-content';
  content.innerHTML = `
    <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white">ðŸ” Gerenciar Recorrentes</h3>
  <button onclick="window.showAddRecorrenteModal && window.showAddRecorrenteModal()" class="u-btn u-btn--primary mobile-btn">
          âž• Nova Recorrente
        </button>
      </div>
      <div class="text-center py-8">
        <div class="text-4xl mb-4">â™»ï¸</div>
        <p class="text-gray-600 dark:text-gray-400">PÃ¡gina de recorrentes em desenvolvimento</p>
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

  // Carregar e renderizar visÃ£o completa
  await renderRecorrentes();
}

// Render completo seguindo o padrÃ£o de tab-container
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

    // Preparar lista ordenada e status
    const items = (window.appState.recorrentes || []).slice().sort((a, b) => String(a.descricao || a.nome || '').localeCompare(String(b.descricao || b.nome || '')));
    const transacoes = window.appState.transactions || [];

    const mesesNomes = ['Janeiro','Fevereiro','MarÃ§o','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
    const monthName = mesesNomes[selMonth - 1] || '';

  // MÃ©tricas do resumo
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

      // Contabilizar como aplicada mesmo que esteja inativa apÃ³s auto-inativaÃ§Ã£o
      if (aplicadaEsteMes) {
        valorPotencialMes += v;
        aplicadasMes++;
        valorAplicadoMes += v;
        continue;
      }

      // Pendentes contam somente se ainda ativas e dentro da janela do mÃªs
      if (ativo && estaNaJanela) {
        valorPotencialMes += v;
        pendentesMes++;
        valorPendenteMes += v;
      }
    }
  // ObservaÃ§Ã£o: breakdown ativas/inativas foi removido do subtÃ­tulo para seguir o padrÃ£o das outras pÃ¡ginas.
    const ativasPeriodo = aplicadasMes + pendentesMes; // Ativas no mÃªs (na janela): aplicadas + pendentes

    // Habilitar modo compacto automÃ¡tico em telas pequenas
    const compactClass = (typeof window !== 'undefined' && window.innerWidth <= 480) ? 'recorrentes-compact' : '';
    content.innerHTML = `
      <div class="tab-container ${compactClass}">
        <div class="tab-header flex items-center justify-between">
          <h2 class="tab-title-highlight">â™»ï¸ Recorrentes</h2>
          <div id="rec-period-indicator"></div>
        </div>
        <div class="tab-content">
          <div class="content-spacing">
            <!-- ========== SEÃ‡ÃƒO 1: RESUMO ========== -->
            <div class="mb-8">
              <div class="flex items-center gap-2 mb-4">
                <div class="w-1 h-6 bg-gradient-to-b from-purple-500 to-green-500 rounded-full"></div>
                <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">ðŸ’¡ Resumo</h2>
              </div>
              <div class="bg-gradient-to-br from-purple-500 via-green-500 to-teal-600 rounded-2xl shadow-xl p-6 md:p-8 text-white mb-6 summary-card">
                <div class="flex items-center justify-between mb-6">
                  <div>
                    <h3 class="text-xl md:text-2xl font-bold">VisÃ£o Geral</h3>
                    <p class="text-xs opacity-90 mt-1">PerÃ­odo: ${String(selMonth).padStart(2,'0')}/${selYear}</p>
                    <button id="rec-summary-toggle" class="text-[11px] underline opacity-90 mt-1 hover:opacity-100 focus:outline-none">Mostrar detalhes</button>
                  </div>
                  <div class="text-right">
                    <div class="text-2xl md:text-3xl font-bold summary-value">R$ ${valorPotencialMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                    <p class="text-xs opacity-90">Valor mensal potencial (ativas)</p>
                  </div>
                </div>
                <div id="rec-summary-details" class="hidden text-[12px] md:text-xs opacity-90 bg-white bg-opacity-10 rounded-lg p-3 mb-4">
                  <div class="flex flex-col gap-1">
                    <div>Total de recorrentes cadastradas: <strong>${total}</strong></div>
                    <div class="opacity-90">Dica: use as setas no topo para navegar entre meses.</div>
                  </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                    <div class="text-2xl mb-2">âœ…</div>
                    <div class="text-2xl md:text-3xl font-bold summary-value">${aplicadasMes}</div>
                    <div class="text-sm opacity-90">Aplicadas no mÃªs</div>
                    <div class="text-xs opacity-90 mt-1">R$ ${valorAplicadoMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                  </div>
                  <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                    <div class="text-2xl mb-2">â³</div>
                    <div class="text-2xl md:text-3xl font-bold summary-value">${pendentesMes}</div>
                    <div class="text-sm opacity-90">Pendentes neste mÃªs</div>
                    <div class="text-xs opacity-90 mt-1">R$ ${valorPendenteMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                  </div>
                  <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                    <div class="text-2xl mb-2">ðŸŸ¢</div>
                    <div class="text-2xl md:text-3xl font-bold summary-value">${ativasPeriodo}</div>
                    <div class="text-sm opacity-90">Ativas neste mÃªs</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mb-8">
              <div class="flex items-center gap-2 mb-4">
                <div class="w-1 h-6 bg-gradient-to-b from-purple-500 to-green-500 rounded-full"></div>
                <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">ðŸ”§ AÃ§Ãµes & Filtros</h2>
              </div>
              <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 flex flex-col md:flex-row gap-3 md:gap-4 md:items-center md:justify-between">
                <div class="text-sm text-gray-600 dark:text-gray-400">PerÃ­odo selecionado: <strong>${monthName}/${selYear}</strong></div>
                <div class="flex gap-2">
                  <button onclick="window.showAddRecorrenteModal && window.showAddRecorrenteModal()" class="u-btn u-btn--primary mobile-btn">âž• Nova Recorrente</button>
                  <button ${pendentesMes === 0 ? 'disabled' : ''} onclick="window.efetivarRecorrentesMesAtual && window.efetivarRecorrentesMesAtual()" class="u-btn u-btn--outline mobile-btn" ${pendentesMes === 0 ? 'disabled' : ''}>
                    âš¡ Efetivar Pendentes (${pendentesMes})
                  </button>
                </div>
              </div>
            </div>

            <div class="mb-8">
              <div class="flex items-center gap-2 mb-4">
                <div class="w-1 h-6 bg-gradient-to-b from-green-500 to-teal-500 rounded-full"></div>
                <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">ðŸ“‹ Lista de Recorrentes</h2>
              </div>
              <div id="rec-list" class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4"></div>
            </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Atualizar modo compacto em resize para telas pequenas (evitar mÃºltiplos listeners)
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

    // Montar indicador de perÃ­odo padrÃ£o no cabeÃ§alho
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
      listEl.innerHTML = '<div class="empty-state"><div class="empty-icon">â™»ï¸</div><div class="empty-text">Nenhuma recorrente cadastrada</div><div class="empty-description">Crie sua primeira recorrente para automatizar lanÃ§amentos</div><div class="mt-2"><button class="u-btn u-btn--primary mobile-btn w-full" onclick="window.showAddRecorrenteModal && window.showAddRecorrenteModal()">âž• Nova Recorrente</button></div></div>';
    } else {
      const ano = selYear; const mes = selMonth;
      const parts = items.map(it => {
        const st = calcularStatusRecorrente(it, transacoes, ano, mes);
        // Fora da janela do mÃªs selecionado:
        // - JÃ¡ passou da Ãºltima parcela
        // - Ainda nÃ£o chegou na primeira parcela (inÃ­cio futuro)
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
              >âœï¸</button>
              <button
                class=\"p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 hover:text-red-700\"
                title=\"Apagar\"
                onclick=\"window.deleteRecorrente && window.deleteRecorrente('${it.id}')\"
                aria-label=\"Apagar recorrente\"
              >ðŸ—‘ï¸</button>
            </div>
          </div>
        `;
      });
      const finalHtml = parts.filter(Boolean).join('');
      listEl.innerHTML = finalHtml || '<div class="empty-state"><div class="empty-icon">ðŸ—“ï¸</div><div class="empty-text">Nenhuma recorrente neste perÃ­odo</div><div class="empty-description">Altere o perÃ­odo ou crie uma recorrente vÃ¡lida para este mÃªs</div></div>';
    }
  } catch (e) {
    console.error('Erro ao renderizar recorrentes:', e);
  }
}

// Helper: obter perÃ­odo selecionado (reuso do padrÃ£o das outras abas)
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
} catch {}

// Expor aÃ§Ã£o global para efetivar recorrentes pendentes do mÃªs atual
if (typeof window !== 'undefined') {
  window.efetivarRecorrentesMesAtual = async function() {
    try {
      const userId = window.appState?.currentUser?.uid;
      const budgetId = window.appState?.currentBudget?.id;
      if (!userId || !budgetId) {
        window.Snackbar ? window.Snackbar({ message: 'UsuÃ¡rio ou orÃ§amento nÃ£o encontrado', type: 'error' }) : alert('UsuÃ¡rio ou orÃ§amento nÃ£o encontrado');
        return;
      }
      const agora = new Date();
      const y = window.appState?.selectedYear || agora.getFullYear();
      const m = window.appState?.selectedMonth || (agora.getMonth() + 1);
      // Aplicar com forÃ§ar aplicaÃ§Ã£o
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
          window.Snackbar({ message: 'Nenhuma recorrente para efetivar neste mÃªs.', type: 'info' });
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
        window.Snackbar ? window.Snackbar({ message: 'Recorrente nÃ£o encontrada', type: 'error' }) : alert('Recorrente nÃ£o encontrada');
        return;
      }
      if (typeof window.showAddRecorrenteModal === 'function') {
        window.showAddRecorrenteModal(rec);
      }
    } catch (err) {
      console.error('Erro ao editar recorrente:', err);
    }
  };

  // Apagar recorrente: confirma, remove no repositÃ³rio e re-renderiza
  window.deleteRecorrente = async function(id) {
    const userId = window.appState?.currentUser?.uid;
    if (!userId) {
      window.Snackbar ? window.Snackbar({ message: 'UsuÃ¡rio nÃ£o autenticado', type: 'error' }) : alert('UsuÃ¡rio nÃ£o autenticado');
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
