import {
  deleteDespesaRecorrente,
  updateDespesaRecorrente
} from '../recorrentes.js';
import { Snackbar } from '../ui/Snackbar.js';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where
} from 'firebase/firestore';
import { Modal } from '../ui/Modal.js';

async function handleDeleteRecorrente(id) {
  if (!confirm('Tem certeza que deseja excluir esta despesa recorrente?')) {
    return;
  }
  const user = window.appState?.currentUser;
  if (!user) {
    Snackbar({ message: 'Usuário não autenticado.', type: 'error' });
    return;
  }
  await deleteDespesaRecorrente(user.uid, id);
  Snackbar({ message: 'Recorrente excluída com sucesso.', type: 'success' });
  await window.loadRecorrentes();
  renderRecorrentes();
}

function handleToggleRecorrente(rec) {
  const user = window.appState?.currentUser;
  if (!user) {
    Snackbar({ message: 'Usuário não autenticado.', type: 'error' });
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
    Snackbar({ message: 'Usuário não autenticado.', type: 'error' });
    return;
  }
  
  const rec = (window.appState.recorrentes || []).find(
    r => r.id === recorrenteId
  );
  const descricao = rec ? rec.descricao : '';
  const budgetId = window.appState.currentBudget?.id;
  
  console.log('🔍 Iniciando busca de histórico para:', {
    recorrenteId,
    descricao,
    budgetId,
    userId: user.uid
  });
  
  // Mostrar loading/spinner com botão de fechar
  const modal = Modal({
    title: `Histórico de ${descricao}`,
    content: `<div class='flex flex-col items-center py-8'>
      <div class='loader mb-4'></div>
      <div>Carregando histórico...</div>
      <button onclick='closeModal()' class='mt-6 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600'>Fechar</button>
    </div>`
  });
  document.body.appendChild(modal);
  
  try {
    const { collection, getDocs, query, where } = await import('firebase/firestore');
    const { db } = await import('../firebase.js');
    let transacoes = [];
    
    console.log('🔍 Buscando transações na coleção principal...');
    
    // 1. Buscar na coleção principal por recorrenteId (SEM filtro de budgetId)
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
    
    console.log('📊 Transações encontradas na coleção principal:', transacoesPrincipais.length);
    transacoesPrincipais.forEach(t => {
      console.log('  -', t.descricao, 'R$', t.valor, 'BudgetId:', t.budgetId, 'ID:', t.id);
    });
    
    // Debug: Verificar se há transações no appState com este recorrenteId
    const transacoesAppState = window.appState.transactions || [];
    const transacoesAppStateFiltradas = transacoesAppState.filter(t => 
      t.recorrenteId === recorrenteId
    );
    console.log('🔍 Transações no appState com este recorrenteId:', transacoesAppStateFiltradas.length);
    transacoesAppStateFiltradas.forEach(t => {
      console.log('  - AppState:', t.descricao, 'R$', t.valor, 'BudgetId:', t.budgetId, 'ID:', t.id);
    });
    
    transacoes = transacoes.concat(transacoesPrincipais);
    
    // 2. Buscar também por descrição (para casos de backup restaurado)
    if (descricao) {
      console.log('🔍 Buscando transações por descrição:', descricao);
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
      
      console.log('📊 Transações encontradas por descrição:', transacoesPorDescricao.length);
      transacoesPorDescricao.forEach(t => {
        console.log('  -', t.descricao, 'R$', t.valor, 'RecorrenteId:', t.recorrenteId);
      });
      
      transacoes = transacoes.concat(transacoesPorDescricao);
    }
    
    // 3. Buscar no histórico mensal
    console.log('🔍 Buscando no histórico mensal...');
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
            console.log(`📊 Histórico ${ano}-${mesPad}:`, snapHist.docs.length, 'transações');
            const transacoesHist = snapHist.docs.map(doc => ({ 
              ...doc.data(), 
              id: doc.id,
              origem: `historico-${ano}-${mesPad}`
            }));
            transacoes = transacoes.concat(transacoesHist);
          }
        } catch (error) {
          console.log(`⚠️ Erro ao buscar histórico ${ano}-${mesPad}:`, error.message);
        }
      }
    }
    
    // 4. Se não encontrou transações no Firestore, buscar no appState
    if (transacoes.length === 0) {
      console.log('🔍 Nenhuma transação encontrada no Firestore, buscando no appState...');
      const transacoesAppState = window.appState.transactions || [];
      const transacoesAppStateFiltradas = transacoesAppState.filter(t => 
        t.recorrenteId === recorrenteId || 
        (descricao && t.descricao?.toLowerCase().includes(descricao.toLowerCase()))
      );
      
      console.log('📊 Transações encontradas no appState:', transacoesAppStateFiltradas.length);
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
    
    console.log('📊 Total de transações únicas encontradas:', transacoes.length);
    
    // 5. Ordenar por data
    transacoes.sort((a, b) => {
      const dataA = a.createdAt?.seconds ? a.createdAt.seconds : 0;
      const dataB = b.createdAt?.seconds ? b.createdAt.seconds : 0;
      return dataB - dataA; // Mais recentes primeiro
    });
    
    // 6. Atualizar conteúdo do modal
    const modalBody = modal.querySelector('.modal-body');
    modalBody.innerHTML = `
      <div class='space-y-2'>
        <div class='text-xs text-gray-400 mb-4'>
          <div><b>Recorrente ID:</b> ${recorrenteId}</div>
          <div><b>Budget ID:</b> ${budgetId || 'N/A'}</div>
          <div><b>Total encontrado:</b> ${transacoes.length} transações</div>
        </div>
        ${
          transacoes.length === 0
            ? `<div class='text-gray-500 p-4 bg-gray-50 rounded'>
                <p><b>Nenhuma aplicação encontrada.</b></p>
                <p class='text-sm mt-2'>Possíveis causas:</p>
                <ul class='text-sm mt-1 ml-4 list-disc'>
                  <li>A recorrente não foi efetivada neste mês</li>
                  <li>O orçamento selecionado é diferente</li>
                  <li>O campo recorrenteId está incorreto na transação</li>
                  <li>A transação foi salva em outro budgetId</li>
                </ul>
              </div>`
            : transacoes
                .map(t => `
                  <div class='flex justify-between items-center border-b pb-2 mb-2'>
                    <div class='flex-1'>
                      <div class='font-medium'>${t.descricao || 'Sem descrição'}</div>
                      <div class='text-xs text-gray-500'>
                        ${t.createdAt?.seconds ? new Date(t.createdAt.seconds * 1000).toLocaleDateString('pt-BR') : 'Data não disponível'}
                        ${t.origem ? ` • ${t.origem}` : ''}
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
    console.error('❌ Erro ao carregar histórico:', err);
    modal.querySelector('.modal-body').innerHTML =
      `<div class='text-red-600 text-center mt-4'>
        <p><b>Erro ao carregar histórico.</b></p>
        <p class='text-sm mt-2'>${err.message || err}</p>
      </div>
      <div class='flex justify-center mt-6'>
        <button onclick='closeModal()' class='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600'>Fechar</button>
      </div>`;
    Snackbar({
      message: 'Erro ao carregar histórico: ' + (err.message || err),
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
  content.innerHTML = `
    <div class="tab-container">
      <div class="tab-header">
        <h2 class="tab-title-highlight">Despesas Recorrentes</h2>
        <div class="flex flex-wrap gap-2">
          <!-- Botões de ação principais -->
          <div class="flex gap-1">
            <button onclick="window.verificarRecorrentes()" class="btn-secondary mobile-btn">
              <span class="icon-standard">🔍</span>
              <span class="hidden sm:inline">Verificar</span>
            </button>
            <button onclick="window.aplicarRecorrentes()" class="btn-primary mobile-btn">
              <span class="icon-standard">✅</span>
              <span class="hidden sm:inline">Aplicar</span>
            </button>
          </div>
          
          <!-- Botão de adicionar -->
          <button onclick="window.showAddRecorrenteModal()" class="btn-primary mobile-btn">
            <span class="icon-standard">➕</span>
            <span class="hidden sm:inline">Nova Recorrente</span>
          </button>
        </div>
      </div>
      <div class="tab-content">
        <div class="content-spacing">
          <div id="recorrentes-list" class="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
        </div>
      </div>
    </div>
  `;


  
  if (!user || !budget) {
    document.getElementById('recorrentes-list').innerHTML =
      '<p class="text-gray-500 dark:text-gray-300">Nenhum usuário ou orçamento ativo.</p>';
    return;
  }

  const recorrentes = window.appState.recorrentes || [];
  const transacoes = window.appState.transactions || [];
  const now = new Date();
  const anoAtual = now.getFullYear();
  const mesAtual = now.getMonth() + 1;
  
  // Filtrar recorrentes que já foram lançadas no mês atual
  const recorrentesLancadas = transacoes
    .filter(t => {
      if (!t.recorrenteId) return false;
      
      let transacaoData;
      if (t.createdAt && typeof t.createdAt === 'object' && t.createdAt.seconds) {
        // É um Firestore Timestamp
        transacaoData = new Date(t.createdAt.seconds * 1000);
      } else if (t.createdAt) {
        // É uma string ou Date
        transacaoData = new Date(t.createdAt);
      } else {
        return false;
      }
      
      return transacaoData.getFullYear() === anoAtual && 
             transacaoData.getMonth() + 1 === mesAtual;
    })
    .map(t => t.recorrenteId);

  const lista = document.getElementById('recorrentes-list');
  if (!recorrentes.length) {
    lista.innerHTML =
      '<p class="text-gray-500 dark:text-gray-300">Nenhuma despesa recorrente cadastrada.</p>';
    return;
  }

  lista.innerHTML = '';
  recorrentes.forEach(rec => {
    // Não exibir como "ativa" se já foi lançada no mês atual
    const jaLancadaEsteMes = recorrentesLancadas.includes(rec.id);
    const proximaData = calcularProximaData(
      rec.dataInicio,
      rec.diaLancamento || 1
    );
    const proximaStr = proximaData.toLocaleDateString('pt-BR');

    // Calcular status completo da recorrente
    const status = window.calcularStatusRecorrente ? 
      window.calcularStatusRecorrente(rec, transacoes, anoAtual, mesAtual) : 
      { parcelaAtual: null, totalParcelas: rec.parcelasTotal, foiEfetivadaEsteMes: jaLancadaEsteMes };



    const card = document.createElement('div');
    card.className = 'card-standard';
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
        statusParcela = `✅ Efetivada: ${status.parcelaAtual} de ${status.totalParcelas}`;
      } else if (status.proximaParcela && status.proximaParcela <= status.totalParcelas) {
        statusParcela = `📅 Agendada: ${status.proximaParcela} de ${status.totalParcelas}`;
      } else {
        statusParcela = `📊 Parcela ${status.parcelaAtual} de ${status.totalParcelas}`;
      }
    } else {
      statusParcela = '♾️ Infinito';
    }
    
    card.innerHTML = `
      <div class="flex items-center space-x-3 mb-3">
        <div class="w-4 h-4 rounded-full" style="background-color: ${rec.cor || '#4F46E5'}"></div>
        <span class="list-item-title">${rec.descricao}</span>
      </div>
      <p class="list-item-subtitle">Valor da parcela: R$ ${valorParcela.toFixed(2)}${status.totalParcelas && status.totalParcelas > 1 ? ` | Total: R$ ${valorTotal.toFixed(2)}` : ''}</p>
      <p class="list-item-subtitle">Categoria: ${rec.categoriaId || 'Sem categoria'}</p>
      <p class="list-item-subtitle font-semibold ${status.foiEfetivadaEsteMes ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'}">${statusParcela}</p>
      ${rec.ativa !== false && !status.foiEfetivadaEsteMes ? `<p class=\"text-sm text-green-500 mb-3\">Próxima aplicação: ${proximaStr}</p>` : status.foiEfetivadaEsteMes ? '<p class=\"text-sm text-blue-500 mb-3\">✅ Efetivada este mês</p>' : ''}
      <div class="flex flex-wrap gap-2 mt-4">
        <!-- Botões principais em linha -->
        <div class="flex gap-1 flex-1">
          <button class="btn-secondary mobile-btn flex-1" onclick="window.showAddRecorrenteModal(${JSON.stringify(rec).replace(/\"/g, '&quot;')})">
            <span class="icon-standard">✏️</span>
            <span class="hidden sm:inline">Editar</span>
          </button>
          <button class="btn-secondary mobile-btn flex-1" onclick='window.handleToggleRecorrente(${JSON.stringify(rec).replace(/\"/g, '&quot;')})'>
            <span class="icon-standard">${rec.ativa === false ? '▶️' : '⏸️'}</span>
            <span class="hidden sm:inline">${rec.ativa === false ? 'Ativar' : 'Pausar'}</span>
          </button>
        </div>
        
        <!-- Botões secundários em linha -->
        <div class="flex gap-1 flex-1">
          <button class="btn-secondary mobile-btn flex-1" onclick="window.showHistoricoRecorrente('${rec.id}')">
            <span class="icon-standard">📊</span>
            <span class="hidden sm:inline">Histórico</span>
          </button>
          <button class="btn-danger mobile-btn flex-1" onclick="window.handleDeleteRecorrente('${rec.id}')">
            <span class="icon-standard">🗑️</span>
            <span class="hidden sm:inline">Excluir</span>
          </button>
        </div>
      </div>
    `;
    lista.appendChild(card);
  });
}

export { showHistoricoRecorrente };
