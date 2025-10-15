import { calcularStatusRecorrente, loadRecorrentes, aplicarRecorrentesDoMes, deleteRecorrente as svcDeleteRecorrente } from './service.js';
import { eventBus } from '@core/events/eventBus.js';
import { mountPeriodIndicator } from '../../ui/PeriodIndicator.js';

export async function render(container) {
  const root = document.createElement('div');
  root.className = 'recorrentes-page';

  // Header padrão das abas (sem seletor interativo de período)
  const header = document.createElement('div');
  header.className = 'tab-header mb-6';
  header.innerHTML = '<h1 class="text-2xl font-semibold text-gray-900 leading-tight">♻️ Recorrentes</h1>';
  root.appendChild(header);

  // Card inicial com ação
  const content = document.createElement('div');
  content.className = 'recorrentes-content';
  content.innerHTML = `
    <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
      <div class="flex justify-between items-center mb-6 gap-4">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white">🔁 Gerenciar Recorrentes</h3>
  <button onclick="window.showAddRecorrenteModal && window.showAddRecorrenteModal()" class="btn btn-primary btn-sm">
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
    console.log('🔧 [DEBUG-RENDER] renderRecorrentes chamado!');
    console.log('🔧 [DEBUG-RENDER] Hash atual:', window.location.hash);
    
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
        <div class="tab-header">
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-600">
            <div class="flex items-center justify-between w-full gap-4">
              <div class="flex items-center gap-3">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span class="text-white text-sm">♻️</span>
                  </div>
                  <div>
                    <h2 class="text-gray-800 dark:text-white font-semibold text-base">Recorrentes</h2>
                    <div class="flex items-center gap-1">
                      <span class="text-indigo-600 dark:text-indigo-400 text-xs">${items.length} ativos</span>
                    </div>
                  </div>
                </div>
              </div>
              <div id="rec-period-indicator"></div>
            </div>
          </div>
        </div>
        <div class="tab-content">
          <div class="content-spacing">
            <!-- ========== SEÇÃO 1: RESUMO COMPACTO ========== -->
            <div class="mb-12">
              <div class="flex items-center gap-2 mb-4">
                <div class="w-1 h-6 bg-gradient-to-b from-purple-500 to-green-500 rounded-full"></div>
                <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">♻️ Resumo</h2>
              </div>
              
              <div class="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl shadow-lg border border-blue-200 dark:border-gray-600 p-4 mb-6">
                <!-- Header Compacto -->
                <div class="flex items-center justify-between mb-4 gap-4">
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
            <div class="mb-12">
              <div class="flex items-center gap-2 mb-4">
                <div class="w-1 h-6 bg-gradient-to-b from-purple-500 to-green-500 rounded-full"></div>
                <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">🔧 Ações & Filtros</h2>
              </div>
              <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 flex flex-col md:flex-row gap-3 md:gap-4 md:items-center md:justify-between">
                <div class="text-sm text-gray-600 dark:text-gray-400">Período selecionado: <strong>${monthName}/${selYear}</strong></div>
                <div class="flex gap-2">
                  <button onclick="window.showAddRecorrenteModal && window.showAddRecorrenteModal()" class="btn btn-primary btn-sm">➕ Nova Recorrente</button>
                  <button ${pendentesMes === 0 ? 'disabled' : ''} onclick="window.efetivarRecorrentesMesAtual && window.efetivarRecorrentesMesAtual()" class="btn btn-outline btn-sm" ${pendentesMes === 0 ? 'disabled' : ''}>
                    ⚡ Efetivar Pendentes (${pendentesMes})
                  </button>
                </div>
              </div>
            </div>

            <div class="mb-12">
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
      listEl.innerHTML = `
        <div class="empty-state p-12 text-center">
          <div class="empty-icon text-6xl mb-6">♻️</div>
          <div class="empty-text text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">Nenhuma recorrente cadastrada</div>
          <div class="empty-description text-gray-500 dark:text-gray-400 mb-6">Crie sua primeira recorrente para automatizar lançamentos</div>
          <button onclick="window.showAddRecorrenteModal && window.showAddRecorrenteModal()" class="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 mx-auto">
            <span class="text-lg">➕</span>
            <span>Nova Recorrente</span>
          </button>
        </div>
      `;
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
        const valorNum = Number(it.valor ?? 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
        
        // Sistema de cores aprimorado baseado no progresso e status
        let statusColor = 'emerald';
        let statusIcon = '🔄';
        let statusText = 'Ativa';
        // let headerClass = 'bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-800'; // Não utilizado
        let progressBar = '';
        let statusInfo = '';
        // let progressBarColor = 'emerald'; // Não utilizado
        let progressBarGradient = 'from-emerald-400 to-emerald-500';
        
        // Badge de parcelas com cores dinâmicas
        let badge = '';
        if (st?.temParcelas) {
          const parcelaAtual = st.parcelaAtual || 1;
          const totalParcelas = st.totalParcelas || 1;
          const progressoPercentual = Math.round((parcelaAtual / totalParcelas) * 100);
          const parcelasRestantes = totalParcelas - parcelaAtual;
          
          // Sistema de cores mais refinado baseado no progresso
          let badgeColor = 'blue';
          if (progressoPercentual >= 75) badgeColor = 'yellow';
          if (progressoPercentual >= 90) badgeColor = 'orange';
          if (parcelasRestantes === 0) badgeColor = 'green';
          
          badge = `<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-${badgeColor}-100 text-${badgeColor}-800 dark:bg-${badgeColor}-900 dark:text-${badgeColor}-200 ml-3 border border-${badgeColor}-200 dark:border-${badgeColor}-700">${parcelaAtual}/${totalParcelas}</span>`;
          
          // Status e cores baseados no progresso com sistema aprimorado
          if (parcelasRestantes > 0) {
            if (progressoPercentual >= 90) {
              // Quase finalizada - tons de laranja/vermelho
              statusColor = 'orange';
              statusIcon = '⚡';
              statusText = 'Quase Finalizada';
              // headerClass = 'bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-800';
              // progressBarColor = 'orange';
              progressBarGradient = 'from-orange-400 via-orange-500 to-red-500';
            } else if (progressoPercentual >= 75) {
              // Em andamento avançado - tons de amarelo/laranja
              statusColor = 'yellow';
              statusIcon = '📈';
              statusText = 'Em Andamento';
              // headerClass = 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-800';
              // progressBarColor = 'yellow';
              progressBarGradient = 'from-yellow-400 via-yellow-500 to-orange-500';
            } else if (progressoPercentual >= 50) {
              // Em andamento médio - tons de azul/verde
              statusColor = 'blue';
              statusIcon = '🔄';
              statusText = 'Em Andamento';
              // headerClass = 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800';
              // progressBarColor = 'blue';
              progressBarGradient = 'from-blue-400 via-blue-500 to-indigo-500';
            } else {
              // Início - tons de verde/emerald
              statusColor = 'emerald';
              statusIcon = '🔄';
              statusText = 'Ativa';
              // headerClass = 'bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-800';
              // progressBarColor = 'emerald';
              progressBarGradient = 'from-emerald-400 via-emerald-500 to-teal-500';
            }
            
            statusInfo = `<div class="flex items-center justify-between text-sm mb-3">
              <div class="flex items-center gap-2">
                <span class="text-gray-600 dark:text-gray-400">${parcelasRestantes === 1 ? '1 parcela restante' : parcelasRestantes + ' parcelas restantes'}</span>
                <span class="w-1 h-1 bg-gray-400 rounded-full"></span>
                <span class="text-gray-500 dark:text-gray-500 text-xs">${parcelaAtual} de ${totalParcelas}</span>
              </div>
              <span class="font-bold text-${statusColor}-600 dark:text-${statusColor}-400 text-lg">${progressoPercentual}%</span>
            </div>`;
            
            // Barra de progresso com cores dinâmicas e efeitos visuais aprimorados
            progressBar = `<div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-5 overflow-hidden shadow-inner border border-gray-300 dark:border-gray-600">
              <div class="bg-gradient-to-r ${progressBarGradient} h-5 rounded-full transition-all duration-1000 ease-out relative flex items-center justify-end pr-3 shadow-sm" style="width: ${progressoPercentual}%">
                <div class="absolute inset-0 bg-white opacity-25 rounded-full"></div>
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 rounded-full"></div>
                <span class="text-xs font-bold text-white relative z-10 drop-shadow-sm">${progressoPercentual}%</span>
              </div>
            </div>`;
          } else if (parcelasRestantes === 0) {
            // Finalizada - tons de verde vibrante
            statusColor = 'green';
            statusIcon = '✅';
            statusText = 'Finalizada';
            // headerClass = 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800'; // Não utilizado
            // progressBarColor = 'green'; // Não utilizado
            progressBarGradient = 'from-green-400 via-green-500 to-emerald-500';
            
            statusInfo = `<div class="flex items-center justify-between text-sm mb-3">
              <div class="flex items-center gap-2">
                <span class="text-green-600 dark:text-green-400 font-medium">Recorrente finalizada</span>
                <span class="w-1 h-1 bg-green-400 rounded-full"></span>
                <span class="text-green-500 dark:text-green-500 text-xs">${totalParcelas} parcelas</span>
              </div>
              <span class="font-bold text-green-600 dark:text-green-400 text-lg">100%</span>
            </div>`;
            
            // Barra de progresso finalizada com efeito especial
            progressBar = `<div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-5 overflow-hidden shadow-inner border border-gray-300 dark:border-gray-600">
              <div class="bg-gradient-to-r ${progressBarGradient} h-5 rounded-full relative flex items-center justify-end pr-3 shadow-sm">
                <div class="absolute inset-0 bg-white opacity-25 rounded-full"></div>
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 rounded-full"></div>
                <span class="text-xs font-bold text-white relative z-10 drop-shadow-sm">100%</span>
              </div>
            </div>`;
          }
        }
        
        // Badge de aplicada
        const aplicado = st?.foiEfetivadaEsteMes ? '<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 ml-2">✅ aplicada</span>' : '';
        
        return `
          <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden mb-4 hover:shadow-xl transition-all duration-300 group">
            <!-- Header Principal -->
            <div class="p-5">
              <div class="flex items-start justify-between gap-4">
                <!-- Lado Esquerdo: Ícone e Nome -->
                <div class="flex items-center gap-4 flex-1 min-w-0">
                  <div class="w-14 h-14 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 border border-blue-200 dark:border-gray-600 shadow-sm">
                    ${statusIcon}
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="font-bold text-gray-900 dark:text-gray-100 truncate text-lg mb-2 ${!ativo ? 'line-through opacity-70' : ''}">${nome}</h3>
                    <div class="flex items-center gap-2 flex-wrap">
                      ${badge}
                      ${aplicado}
                    </div>
                  </div>
                </div>
                
                <!-- Lado Direito: Valor -->
                <div class="text-right">
                  <div class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">R$ ${valorNum}</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400 font-medium">valor da parcela</div>
                </div>
              </div>
            </div>
            
            <!-- Seção de Status e Progresso -->
            <div class="px-5 pb-4">
              <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                <div class="flex items-center justify-between mb-3">
                  <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Status</span>
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-${statusColor}-100 text-${statusColor}-800 dark:bg-${statusColor}-900 dark:text-${statusColor}-200 border border-${statusColor}-200 dark:border-${statusColor}-700">
                    ${statusText}
                  </span>
                </div>
                ${statusInfo}
                ${progressBar}
              </div>
            </div>
            
            <!-- Botões de Ação - Design Clean -->
            <div class="bg-gray-50 dark:bg-gray-800 px-5 py-3 border-t border-gray-200 dark:border-gray-700">
              <div class="flex items-center justify-end gap-2">
                <button onclick="window.editRecorrente && window.editRecorrente('${it.id}')" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-blue-200 dark:border-blue-800 transition-all duration-200" title="Editar recorrente">
                  <span>✏️</span>
                  <span>Editar</span>
                </button>
                <button onclick="window.showHistoricoRecorrente && window.showHistoricoRecorrente('${it.id}')" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/40 border border-purple-200 dark:border-purple-800 transition-all duration-200" title="Ver histórico">
                  <span>📊</span>
                  <span>Histórico</span>
                </button>
                <button onclick="window.deleteRecorrente && window.deleteRecorrente('${it.id}')" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 border border-red-200 dark:border-red-800 transition-all duration-200" title="Excluir recorrente">
                  <span>🗑️</span>
                  <span>Excluir</span>
                </button>
            </div>
            </div>
          </div>
        `;
      });
      const finalHtml = parts.filter(Boolean).join('');
      listEl.innerHTML = finalHtml || `
        <div class="empty-state p-12 text-center">
          <div class="empty-icon text-6xl mb-6">🗓️</div>
          <div class="empty-text text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">Nenhuma recorrente neste período</div>
          <div class="empty-description text-gray-500 dark:text-gray-400 mb-6">Altere o período ou crie uma recorrente válida para este mês</div>
          <button onclick="window.showAddRecorrenteModal && window.showAddRecorrenteModal()" class="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 mx-auto">
            <span class="text-lg">➕</span>
            <span>Nova Recorrente</span>
          </button>
        </div>
      `;
    }

    // 🔄 LISTENERS PARA ATUALIZAÇÃO AUTOMÁTICA
    // Remover listeners anteriores para evitar duplicação
    if (window._recorrenteUpdateListener) {
      document.removeEventListener('recorrente-adicionada', window._recorrenteUpdateListener);
      document.removeEventListener('dados-atualizados', window._recorrenteUpdateListener);
    }

    // Criar novo listener para atualização automática
    window._recorrenteUpdateListener = async (event) => {
      console.log('🔄 [LISTENER] Evento de atualização recebido:', event.type, event.detail);
      
      // Verificar se estamos na página de recorrentes
      if (window.location.hash.includes('/recorrentes')) {
        console.log('🔄 [LISTENER] Atualizando página de recorrentes...');
        try {
          // Pequeno delay para garantir que os dados foram salvos
          setTimeout(async () => {
            await loadRecorrentes();
            await renderRecorrentes();
            console.log('✅ [LISTENER] Página de recorrentes atualizada com sucesso!');
          }, 200);
        } catch (err) {
          console.error('❌ [LISTENER] Erro ao atualizar página:', err);
        }
      }
    };

    // Adicionar listeners
    document.addEventListener('recorrente-adicionada', window._recorrenteUpdateListener);
    document.addEventListener('dados-atualizados', window._recorrenteUpdateListener);
    console.log('✅ [LISTENERS] Listeners de atualização automática configurados');

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
  // Variável para prevenir double-click
  let _efetivandoRecorrentes = false;
  
  window.efetivarRecorrentesMesAtual = async function() {
    // 🔒 Proteção contra double-click
    if (_efetivandoRecorrentes) {
      console.log('🔒 [PROTEÇÃO] Já está efetivando recorrentes, ignorando chamada...');
      return;
    }
    
    _efetivandoRecorrentes = true;
    console.log('🚀 [EFETIVAR] Iniciando efetivação de recorrentes...');
    
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
    } finally {
      // 🔓 Liberar proteção contra double-click
      _efetivandoRecorrentes = false;
      console.log('🔓 [PROTEÇÃO] Efetivação concluída, liberando lock...');
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
