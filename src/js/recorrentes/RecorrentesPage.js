﻿import {
  deleteDespesaRecorrente,
  updateDespesaRecorrente
} from '../recorrentes.js';
import { Snackbar } from '../ui/Snackbar.js';
// Firestore imports removidos - nÃ£o utilizados aqui
import { Modal } from '../ui/Modal.js';

async function handleDeleteRecorrente(id) {
  if (!confirm('Tem certeza que deseja excluir esta despesa recorrente?')) {
    return;
  }
  const user = window.appState?.currentUser;
  if (!user) {
    Snackbar({ message: 'UsuÃ¡rio nÃ£o autenticado.', type: 'error' });
    return;
  }
  await deleteDespesaRecorrente(user.uid, id);
  Snackbar({ message: 'Recorrente excluÃ­da com sucesso.', type: 'success' });
  await window.loadRecorrentes();
  renderRecorrentes();
}

function handleToggleRecorrente(rec) {
  const user = window.appState?.currentUser;
  if (!user) {
    Snackbar({ message: 'UsuÃ¡rio nÃ£o autenticado.', type: 'error' });
    return;
  }
  updateDespesaRecorrente(user.uid, rec.id, { ativa: !rec.ativa });
  Snackbar({ message: 'Status atualizado com sucesso.', type: 'info' });
  window.loadRecorrentes().then(renderRecorrentes);
}
window.handleDeleteRecorrente = handleDeleteRecorrente;
window.handleToggleRecorrente = handleToggleRecorrente;

async function showHistoricoRecorrente(recorrenteId) {
  const user = window.appState?.currentUser;
  if (!user) {
    Snackbar({ message: 'UsuÃ¡rio nÃ£o autenticado.', type: 'error' });
    return;
  }

  const rec = (window.appState.recorrentes || []).find(
    r => r.id === recorrenteId
  );
  const descricao = rec ? rec.descricao : '';
  const budgetId = window.appState.currentBudget?.id;

  console.log('ðŸ” Iniciando busca de histÃ³rico para:', {
    recorrenteId,
    descricao,
    budgetId,
    userId: user.uid
  });

  // Mostrar loading/spinner com botÃ£o de fechar
  const modal = Modal({
    title: `HistÃ³rico de ${descricao}`,
    content: `<div class='flex flex-col items-center py-8'>
      <div class='loader mb-4'></div>
      <div>Carregando histÃ³rico...</div>
      <button onclick='closeModal()' class='mt-6 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600'>Fechar</button>
    </div>`
  });
  document.body.appendChild(modal);

  try {
    const { collection, getDocs, query, where } = await import('firebase/firestore');
    const { db } = await import('../firebase.js');
    let transacoes = [];

    console.log('ðŸ” Buscando transaÃ§Ãµes na coleÃ§Ã£o principal...');

    // 1. Buscar na coleÃ§Ã£o principal por recorrenteId (SEM filtro de budgetId)
    const refAtual = collection(db, 'transactions');
    const snapAtual = await getDocs(
      query(
        refAtual,
        where('userId', '==', user.uid),
        where('recorrenteId', '==', recorrenteId)
      )
    );

    const transacoesPrincipais = snapAtual.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
      origem: 'principal'
    }));

    console.log('ðŸ“Š TransaÃ§Ãµes encontradas na coleÃ§Ã£o principal:', transacoesPrincipais.length);
    transacoesPrincipais.forEach(t => {
      console.log('  -', t.descricao, 'R$', t.valor, 'BudgetId:', t.budgetId, 'ID:', t.id);
    });

    // Debug: Verificar se hÃ¡ transaÃ§Ãµes no appState com este recorrenteId
    const transacoesAppState = window.appState.transactions || [];
    const transacoesAppStateFiltradas = transacoesAppState.filter(t =>
      t.recorrenteId === recorrenteId
    );
    console.log('ðŸ” TransaÃ§Ãµes no appState com este recorrenteId:', transacoesAppStateFiltradas.length);
    transacoesAppStateFiltradas.forEach(t => {
      console.log('  - AppState:', t.descricao, 'R$', t.valor, 'BudgetId:', t.budgetId, 'ID:', t.id);
    });

    transacoes = transacoes.concat(transacoesPrincipais);

    // 2. Buscar tambÃ©m por descriÃ§Ã£o (para casos de backup restaurado)
    if (descricao) {
      console.log('ðŸ” Buscando transaÃ§Ãµes por descriÃ§Ã£o:', descricao);
      const snapDescricao = await getDocs(
        query(
          refAtual,
          where('userId', '==', user.uid),
          where('descricao', '==', descricao)
        )
      );

      const transacoesPorDescricao = snapDescricao.docs
        .map(doc => ({
          ...doc.data(),
          id: doc.id,
          origem: 'descricao'
        }))
        .filter(t => !t.recorrenteId || t.recorrenteId !== recorrenteId); // Evitar duplicatas

      console.log('ðŸ“Š TransaÃ§Ãµes encontradas por descriÃ§Ã£o:', transacoesPorDescricao.length);
      transacoesPorDescricao.forEach(t => {
        console.log('  -', t.descricao, 'R$', t.valor, 'RecorrenteId:', t.recorrenteId);
      });

      transacoes = transacoes.concat(transacoesPorDescricao);
    }

    // 3. Buscar no histÃ³rico mensal
    console.log('ðŸ” Buscando no histÃ³rico mensal...');
    const now = new Date();
    const anoAtual = now.getFullYear();
    const mesAtual = now.getMonth() + 1;

    for (let ano = 2023; ano <= anoAtual; ano++) {
      const mesLimite = ano === anoAtual ? mesAtual : 12;
      for (let mes = 1; mes <= mesLimite; mes++) {
        const mesPad = String(mes).padStart(2, '0');
        const refHist = collection(
          db,
          'users',
          user.uid,
          'historico',
          `${ano}-${mesPad}`,
          'transacoes'
        );

        try {
          const snapHist = await getDocs(
            query(refHist, where('recorrenteId', '==', recorrenteId))
          );

          if (!snapHist.empty) {
            console.log(`ðŸ“Š HistÃ³rico ${ano}-${mesPad}:`, snapHist.docs.length, 'transaÃ§Ãµes');
            const transacoesHist = snapHist.docs.map(doc => ({
              ...doc.data(),
              id: doc.id,
              origem: `historico-${ano}-${mesPad}`
            }));
            transacoes = transacoes.concat(transacoesHist);
          }
        } catch (error) {
          console.log(`âš ï¸ Erro ao buscar histÃ³rico ${ano}-${mesPad}:`, error.message);
        }
      }
    }

    // 4. Se nÃ£o encontrou transaÃ§Ãµes no Firestore, buscar no appState
    if (transacoes.length === 0) {
      console.log('ðŸ” Nenhuma transaÃ§Ã£o encontrada no Firestore, buscando no appState...');
      const transacoesAppState = window.appState.transactions || [];
      const transacoesAppStateFiltradas = transacoesAppState.filter(t =>
        t.recorrenteId === recorrenteId ||
        (descricao && t.descricao?.toLowerCase().includes(descricao.toLowerCase()))
      );

      console.log('ðŸ“Š TransaÃ§Ãµes encontradas no appState:', transacoesAppStateFiltradas.length);
      transacoesAppStateFiltradas.forEach(t => {
        console.log('  - AppState:', t.descricao, 'R$', t.valor, 'BudgetId:', t.budgetId, 'ID:', t.id);
      });

      transacoes = transacoesAppStateFiltradas.map(t => ({
        ...t,
        origem: 'appState'
      }));
    }

    // 5. Remover duplicatas baseado no ID
    const transacoesUnicas = [];
    const idsVistos = new Set();

    transacoes.forEach(t => {
      if (!idsVistos.has(t.id)) {
        idsVistos.add(t.id);
        transacoesUnicas.push(t);
      }
    });

    transacoes = transacoesUnicas;

    console.log('ðŸ“Š Total de transaÃ§Ãµes Ãºnicas encontradas:', transacoes.length);

    // 5. Ordenar por data
    transacoes.sort((a, b) => {
      const dataA = a.createdAt?.seconds ? a.createdAt.seconds : 0;
      const dataB = b.createdAt?.seconds ? b.createdAt.seconds : 0;
      return dataB - dataA; // Mais recentes primeiro
    });

    // 6. Atualizar conteÃºdo do modal
    const modalBody = modal.querySelector('.modal-body');
    modalBody.innerHTML = `
      <div class='space-y-2'>
        <div class='text-xs text-gray-400 mb-4'>
          <div><b>Recorrente ID:</b> ${recorrenteId}</div>
          <div><b>Budget ID:</b> ${budgetId || 'N/A'}</div>
          <div><b>Total encontrado:</b> ${transacoes.length} transaÃ§Ãµes</div>
        </div>
        ${
  transacoes.length === 0
    ? `<div class='text-gray-500 p-4 bg-gray-50 rounded'>
                <p><b>Nenhuma aplicaÃ§Ã£o encontrada.</b></p>
                <p class='text-sm mt-2'>PossÃ­veis causas:</p>
                <ul class='text-sm mt-1 ml-4 list-disc'>
                  <li>A recorrente nÃ£o foi efetivada neste mÃªs</li>
                  <li>O orÃ§amento selecionado Ã© diferente</li>
                  <li>O campo recorrenteId estÃ¡ incorreto na transaÃ§Ã£o</li>
                  <li>A transaÃ§Ã£o foi salva em outro budgetId</li>
                </ul>
              </div>`
    : transacoes
      .map(t => `
                  <div class='flex justify-between items-center border-b pb-2 mb-2'>
                    <div class='flex-1'>
                      <div class='font-medium'>${t.descricao || 'Sem descriÃ§Ã£o'}</div>
                      <div class='text-xs text-gray-500'>
                        ${t.createdAt?.seconds ? new Date(t.createdAt.seconds * 1000).toLocaleDateString('pt-BR') : 'Data nÃ£o disponÃ­vel'}
                        ${t.origem ? ` â€¢ ${t.origem}` : ''}
                      </div>
                    </div>
                    <div class='text-right'>
                      <div class='font-bold ${t.tipo === 'receita' ? 'text-green-600' : 'text-red-600'}'>
                        ${t.tipo === 'receita' ? '+' : '-'}R$ ${parseFloat(t.valor || 0).toFixed(2)}
                      </div>
                      <div class='text-xs text-gray-400'>ID: ${t.id || '-'}</div>
                    </div>
                  </div>
                `)
      .join('')
}
      </div>
      <div class='flex justify-center mt-6'>
        <button onclick='closeModal()' class='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600'>Fechar</button>
      </div>
    `;

  } catch (err) {
    console.error('âŒ Erro ao carregar histÃ³rico:', err);
    modal.querySelector('.modal-body').innerHTML =
      `<div class='text-red-600 text-center mt-4'>
        <p><b>Erro ao carregar histÃ³rico.</b></p>
        <p class='text-sm mt-2'>${err.message || err}</p>
      </div>
      <div class='flex justify-center mt-6'>
        <button onclick='closeModal()' class='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600'>Fechar</button>
      </div>`;
    Snackbar({
      message: 'Erro ao carregar histÃ³rico: ' + (err.message || err),
      type: 'error'
    });
  }
}
window.showHistoricoRecorrente = showHistoricoRecorrente;

function calcularProximaData(dataISO, diaLancamento) {
  try {
    const hoje = new Date();
    const base = new Date(dataISO);
    const ano =
      hoje.getMonth() > base.getMonth()
        ? hoje.getFullYear()
        : base.getFullYear();
    const mes = hoje.getMonth() + (diaLancamento <= hoje.getDate() ? 1 : 0);
    const data = new Date(ano, mes, diaLancamento);
    return data;
  } catch {
    return new Date();
  }
}

export function renderRecorrentes() {
  const user = window.appState?.currentUser;
  const budget = window.appState?.currentBudget;
  const content = document.getElementById('app-content');
 
  // Calcular estatÃ­sticas das recorrentes
  const recorrentes = window.appState.recorrentes || [];
  const transacoes = window.appState.transactions || [];
  // Usar perÃ­odo global selecionado (Dashboard) como fonte da verdade
  const { year: anoAtual, month: mesAtual } = (typeof window.getSelectedPeriod === 'function')
    ? window.getSelectedPeriod()
    : {
      year: window.appState?.selectedYear || new Date().getFullYear(),
      month: window.appState?.selectedMonth || new Date().getMonth() + 1
    };
      };
  
  // Filtrar recorrentes que jÃ¡ foram lanÃ§adas no mÃªs atual
  const recorrentesLancadas = transacoes
    .filter(t => {
      if (!t.recorrenteId) return false;

      
      let transacaoData;
      if (t.createdAt && typeof t.createdAt === 'object' && t.createdAt.seconds) {
        transacaoData = new Date(t.createdAt.seconds * 1000);
      } else if (t.createdAt) {
        transacaoData = new Date(t.createdAt);
      } else {
        return false;
      }

      return transacaoData.getFullYear() === anoAtual &&
      
      return transacaoData.getFullYear() === anoAtual && 
             transacaoData.getMonth() + 1 === mesAtual;
    })
    .map(t => t.recorrenteId);

  const totalRecorrentes = recorrentes.length;
  const recorrentesAtivas = recorrentes.filter(r => r.ativa !== false).length;
  const recorrentesEfetivadas = recorrentesLancadas.length;
  const valorTotalRecorrentes = recorrentes.reduce((sum, r) => sum + parseFloat(r.valor), 0);

  
  const periodoSel = (typeof window.getSelectedPeriod === 'function')
    ? window.getSelectedPeriod()
    : { year: window.appState?.selectedYear || new Date().getFullYear(), month: window.appState?.selectedMonth || new Date().getMonth() + 1 };
  const nomeMes = ['Janeiro','Fevereiro','MarÃ§o','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'][Math.max(0, Math.min(11, (periodoSel.month||1)-1))];
  // PreferÃªncia para exibir recorrentes encerradas
  let showClosed = false;
  try { showClosed = localStorage.getItem('recorrentes_showClosed') === '1'; } catch {}

  // Handler global simples para alternar preferÃªncia e re-renderizar
  window._toggleShowClosedRec = (el) => {
    try { localStorage.setItem('recorrentes_showClosed', el.checked ? '1' : '0'); } catch {}
    renderRecorrentes();
  };

  content.innerHTML = `
    <div class="tab-container">
      <div class="tab-header">
  <h2 class="tab-title-highlight">ðŸ”„ Recorrentes</h2>
  <div id="rec-period-indicator"></div>
      </div>
      <div class="tab-content">
        <div class="content-spacing">
          
          <div class="mb-2">
          <label class="inline-flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
            <input type="checkbox" ${showClosed ? 'checked' : ''} onchange="_toggleShowClosedRec(this)" class="rounded border-gray-300 dark:border-gray-600">
            Mostrar encerradas
          </label>
          </div>
          
          <!-- ========== SEÃ‡ÃƒO 1: RESUMO DAS RECORRENTES ========== -->
          <div class="mb-8">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">ðŸ“Š VisÃ£o Geral</h2>
            </div>
            
            <div class="bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 rounded-2xl shadow-xl p-6 md:p-8 text-white mb-6">
              <!-- Header do Card -->
              <div class="flex items-center justify-between mb-6">
                <div>
                  <h3 class="text-xl md:text-2xl font-bold">Controle de Recorrentes</h3>
                  <p class="text-sm opacity-90">${totalRecorrentes} recorrentes cadastradas</p>
                </div>
                <div class="text-right">
                  <div class="text-2xl md:text-3xl font-bold ${recorrentesEfetivadas > 0 ? 'text-green-200' : 'text-yellow-200'}">
                    ${recorrentesEfetivadas}
                  </div>
                  <p class="text-xs opacity-90">${recorrentesEfetivadas > 0 ? 'âœ… Efetivadas' : 'â³ Pendentes'}</p>
                </div>
              </div>
              
              <!-- Grid de MÃ©tricas -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div class="text-2xl mb-2">ðŸ”„</div>
                  <div class="text-2xl md:text-3xl font-bold">${totalRecorrentes}</div>
                  <div class="text-sm opacity-90">Total</div>
                </div>
                
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div class="text-2xl mb-2">âœ…</div>
                  <div class="text-2xl md:text-3xl font-bold text-green-200">${recorrentesAtivas}</div>
                  <div class="text-sm opacity-90">Ativas</div>
                </div>
                
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div class="text-2xl mb-2">ðŸ’°</div>
                  <div class="text-2xl md:text-3xl font-bold text-red-200">R$ ${valorTotalRecorrentes.toFixed(2)}</div>
                  <div class="text-sm opacity-90">Valor Total</div>
                </div>
                
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div class="text-2xl mb-2">ðŸ“…</div>
                  <div class="text-2xl md:text-3xl font-bold">${recorrentesEfetivadas}/${totalRecorrentes}</div>
                  <div class="text-sm opacity-90">Este MÃªs</div>
                </div>
              </div>
            </div>
          </div>

          <!-- ========== SEÃ‡ÃƒO 2: AÃ‡Ã•ES E CONTROLES ========== -->
          <div class="mb-8">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">ðŸ”§ AÃ§Ãµes & Controles</h2>
            </div>
            
            <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <!-- Header -->
              <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
                <div class="flex flex-wrap justify-between items-center gap-2">
                  <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">Gerenciar Recorrentes</h3>
                  <div class="flex gap-2 flex-wrap">
                    <button onclick="window.verificarRecorrentes()" class="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg">
                      ðŸ” Verificar
                    </button>
                    <button onclick="window.aplicarRecorrentes()" class="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg">
                      âœ… Aplicar
                    </button>
                    <button onclick="window.showAddRecorrenteModal()" class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg">
                      + Nova Recorrente
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ========== SEÃ‡ÃƒO 3: LISTA DE RECORRENTES ========== -->
          <div class="mb-8">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-green-500 to-teal-500 rounded-full"></div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">ðŸ“‹ Todas as Recorrentes</h2>
            </div>
            
            <div id="recorrentes-list">
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Injetar indicador de perÃ­odo padrÃ£o
  (async () => {
    try {
      const { createPeriodIndicator } = await import('../ui/PeriodIndicator.js');
      const holder = document.getElementById('rec-period-indicator');
      if (holder) {
        holder.innerHTML = '';
        holder.appendChild(createPeriodIndicator({ onChange: () => renderRecorrentes() }));
      }
    } catch (e) {
      console.warn('PeriodIndicator indisponÃ­vel:', e);
      // fallback pequeno somente leitura
      const holder = document.getElementById('rec-period-indicator');
      if (holder) {
        holder.innerHTML = `<div class="text-sm text-gray-600 dark:text-gray-300">PerÃ­odo: <span class="font-semibold">${nomeMes} / ${periodoSel.year}</span></div>`;
      }
    }
  })();

  if (!user || !budget) {
    document.getElementById('recorrentes-list').innerHTML = `
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="text-center py-12">
          <div class="text-6xl mb-4">âš ï¸</div>
          <div class="text-xl font-semibold text-gray-800 dark:text-white mb-2">Nenhum usuÃ¡rio ou orÃ§amento ativo</div>
          <div class="text-gray-600 dark:text-gray-400">FaÃ§a login e selecione um orÃ§amento para continuar</div>
        </div>
      </div>
    `;
    return;
  }

  const lista = document.getElementById('recorrentes-list');

  if (!recorrentes.length) {
    lista.innerHTML = `
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="text-center py-12">
          <div class="text-6xl mb-4">ðŸ”„</div>
          <div class="text-xl font-semibold text-gray-800 dark:text-white mb-2">Nenhuma recorrente cadastrada</div>
          <div class="text-gray-600 dark:text-gray-400 mb-4">Crie sua primeira despesa recorrente para automatizar seus gastos</div>
          <button onclick="window.showAddRecorrenteModal()" class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg">
            ðŸ”„ Criar Primeira Recorrente
          </button>
        </div>
      </div>
    `;
    return;
  }

    return;
  }

  const lista = document.getElementById('recorrentes-list');
  
  if (!recorrentes.length) {
    lista.innerHTML = `
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="text-center py-12">
          <div class="text-6xl mb-4">ðŸ”„</div>
          <div class="text-xl font-semibold text-gray-800 dark:text-white mb-2">Nenhuma recorrente cadastrada</div>
          <div class="text-gray-600 dark:text-gray-400 mb-4">Crie sua primeira despesa recorrente para automatizar seus gastos</div>
          <button onclick="window.showAddRecorrenteModal()" class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg">
            ðŸ”„ Criar Primeira Recorrente
          </button>
        </div>
      </div>
    `;
    return;
  }

  // Renderizar cards modernos
  // Filtrar recorrentes cujas parcelas jÃ¡ terminaram no perÃ­odo selecionado
  const recorrentesFiltradas = recorrentes.filter(rec => {
    try {
      const st = window.calcularStatusRecorrente ? window.calcularStatusRecorrente(rec, transacoes, anoAtual, mesAtual) : null;
      if (!st) return true;
      if (st.temParcelas && st.aposUltimaParcela && !showClosed) return false;
      return true;
    } catch { return true; }
  });

  lista.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      ${recorrentesFiltradas.map(rec => {
    const jaLancadaEsteMes = recorrentesLancadas.includes(rec.id);
    const proximaData = calcularProximaData(rec.dataInicio, rec.diaLancamento || 1);
    const proximaStr = proximaData.toLocaleDateString('pt-BR');

    // Calcular status completo da recorrente
    const status = window.calcularStatusRecorrente ?
      window.calcularStatusRecorrente(rec, transacoes, anoAtual, mesAtual) :
      { parcelaAtual: null, totalParcelas: rec.parcelasTotal, foiEfetivadaEsteMes: jaLancadaEsteMes };

    const valorParcela = parseFloat(rec.valor);
    const valorTotal = rec.valorTotal
      ? parseFloat(rec.valorTotal)
      : status.totalParcelas && status.totalParcelas > 1
        ? valorParcela * status.totalParcelas
        : valorParcela;

    // Gerar texto de status da parcela
    let statusParcela = '';
    if (status.temParcelas) {
      if (status.foiEfetivadaEsteMes) {
        statusParcela = `âœ… Efetivada: ${status.parcelaAtual} de ${status.totalParcelas}`;
      } else {
        // Mostrar a parcela do perÃ­odo selecionado, nÃ£o a prÃ³xima
        statusParcela = `ï¿½ Agendada: ${status.parcelaAtual} de ${status.totalParcelas}`;
      }
    } else {
      statusParcela = 'â™¾ï¸ Infinito';
    }

    const categoria = window.appState.categories?.find(c => c.id === rec.categoriaId);
    const isAtiva = rec.ativa !== false;
    const isEfetivada = status.foiEfetivadaEsteMes;

    return `
        const jaLancadaEsteMes = recorrentesLancadas.includes(rec.id);
        const proximaData = calcularProximaData(rec.dataInicio, rec.diaLancamento || 1);
        const proximaStr = proximaData.toLocaleDateString('pt-BR');
        
        // Calcular status completo da recorrente
        const status = window.calcularStatusRecorrente ? 
          window.calcularStatusRecorrente(rec, transacoes, anoAtual, mesAtual) : 
          { parcelaAtual: null, totalParcelas: rec.parcelasTotal, foiEfetivadaEsteMes: jaLancadaEsteMes };

        const valorParcela = parseFloat(rec.valor);
        const valorTotal = rec.valorTotal
          ? parseFloat(rec.valorTotal)
          : status.totalParcelas && status.totalParcelas > 1
            ? valorParcela * status.totalParcelas
            : valorParcela;
        
        // Gerar texto de status da parcela
        let statusParcela = '';
        if (status.temParcelas) {
          if (status.foiEfetivadaEsteMes) {
            statusParcela = `âœ… Efetivada: ${status.parcelaAtual} de ${status.totalParcelas}`;
          } else {
            // Mostrar a parcela do perÃ­odo selecionado, nÃ£o a prÃ³xima
            statusParcela = `ï¿½ Agendada: ${status.parcelaAtual} de ${status.totalParcelas}`;
          }
        } else {
          statusParcela = 'â™¾ï¸ Infinito';
        }

        const categoria = window.appState.categories?.find(c => c.id === rec.categoriaId);
        const isAtiva = rec.ativa !== false;
        const isEfetivada = status.foiEfetivadaEsteMes;
        
        return `
          <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-300 group ${isEfetivada ? 'ring-2 ring-green-200 dark:ring-green-800' : !isAtiva ? 'ring-2 ring-gray-200 dark:ring-gray-800' : ''}">
            <!-- Header da Recorrente -->
            <div class="bg-gradient-to-r ${isEfetivada ? 'from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800' : !isAtiva ? 'from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800' : 'from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-800'} p-4 border-b border-gray-200 dark:border-gray-700">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-full flex items-center justify-center text-2xl" style="background-color: ${rec.cor || '#4F46E5'}20; color: ${rec.cor || '#4F46E5'}">
                    ðŸ”„
                  </div>
                  <div>
                    <h3 class="font-bold text-gray-900 dark:text-gray-100 truncate">${rec.descricao}</h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400">${categoria?.nome || 'Sem categoria'}</p>
                  </div>
                </div>
                <div class="text-right">
                  ${isEfetivada ? '<div class="text-2xl">âœ…</div>' : !isAtiva ? '<div class="text-2xl">â¸ï¸</div>' : '<div class="text-2xl">â³</div>'}
                </div>
              </div>
            </div>
            
            <!-- ConteÃºdo da Recorrente -->
            <div class="p-4">
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600 dark:text-gray-400">Valor da Parcela</span>
                  <span class="font-bold text-gray-900 dark:text-gray-100">R$ ${valorParcela.toFixed(2)}</span>
                </div>
                
                ${status.totalParcelas && status.totalParcelas > 1 ? `
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Valor Total</span>
                    <span class="font-bold text-red-600">R$ ${valorTotal.toFixed(2)}</span>
                  </div>
                ` : ''}
                
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600 dark:text-gray-400">Status</span>
                  <span class="font-medium ${isEfetivada ? 'text-green-600' : !isAtiva ? 'text-gray-500' : 'text-blue-600'}">${statusParcela}</span>
                </div>
                
                ${isAtiva && !isEfetivada ? `
                  <div class="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                    <div class="text-sm text-blue-800 dark:text-blue-200">
                      ðŸ“… PrÃ³xima aplicaÃ§Ã£o: ${proximaStr}
                    </div>
                  </div>
                ` : isEfetivada ? `
                  <div class="bg-green-50 dark:bg-green-900 dark:bg-opacity-20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                    <div class="text-sm text-green-800 dark:text-green-200">
                      âœ… Efetivada este mÃªs
                    </div>
                  </div>
                ` : `
                  <div class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                    <div class="text-sm text-gray-600 dark:text-gray-400">
                      â¸ï¸ Recorrente pausada
                    </div>
                  </div>
                `}
              </div>
            </div>
            
            <!-- BotÃµes de AÃ§Ã£o -->
            <div class="bg-gray-50 dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700">
              <div class="grid grid-cols-2 gap-2">
                <button onclick="window.showAddRecorrenteModal(${JSON.stringify(rec).replace(/\"/g, '&quot;')})" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2">
                  âœï¸ Editar
                </button>
                <button onclick="window.handleToggleRecorrente(${JSON.stringify(rec).replace(/\"/g, '&quot;')})" class="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2">
                  ${rec.ativa === false ? 'â–¶ï¸ Ativar' : 'â¸ï¸ Pausar'}
                </button>
                <button onclick="window.showHistoricoRecorrente('${rec.id}')" class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2">
                  ðŸ“Š HistÃ³rico
                </button>
                <button onclick="window.handleDeleteRecorrente('${rec.id}')" class="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2">
                  ðŸ—‘ï¸ Excluir
                </button>
              </div>
            </div>
          </div>
        `;
  }).join('')}
    </div>
  `;
}

// Expor a funÃ§Ã£o no escopo global para o roteador legado em app.js
try {
  if (typeof window !== 'undefined') {
    // Compatibilidade com verificaÃ§Ãµes existentes em app.js
    window._renderRecorrentes = renderRecorrentes;
    window.renderRecorrentes = renderRecorrentes;
  }
} catch {}

export { showHistoricoRecorrente };
