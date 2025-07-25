import { getDespesasRecorrentes, deleteDespesaRecorrente, updateDespesaRecorrente } from '../recorrentes.js';
import { Snackbar } from '../ui/Snackbar.js';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { Modal } from '../ui/Modal.js';

async function handleDeleteRecorrente(id) {
  if (!confirm('Tem certeza que deseja excluir esta despesa recorrente?')) return;
  const user = window.FirebaseAuth?.currentUser;
  if (!user) return;
  await deleteDespesaRecorrente(user.uid, id);
  Snackbar({ message: 'Recorrente excluída com sucesso.', type: 'success' });
  await window.loadRecorrentes();
  renderRecorrentes();
}

function handleToggleRecorrente(rec) {
  const user = window.FirebaseAuth?.currentUser;
  if (!user) return;
  updateDespesaRecorrente(user.uid, rec.id, { ativa: !rec.ativa });
  Snackbar({ message: 'Status atualizado com sucesso.', type: 'info' });
  window.loadRecorrentes().then(renderRecorrentes);
}
window.handleDeleteRecorrente = handleDeleteRecorrente;
window.handleToggleRecorrente = handleToggleRecorrente;

async function showHistoricoRecorrente(recorrenteId) {
  const user = window.FirebaseAuth?.currentUser;
  if (!user) {
    Snackbar({ message: 'Usuário não autenticado.', type: 'error' });
    return;
  }
  const rec = (window.appState.recorrentes || []).find(r => r.id === recorrenteId);
  const descricao = rec ? rec.descricao : '';
  const db = getFirestore();
  let transacoes = [];
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
    // Buscar no mês atual
    const refAtual = collection(db, 'transactions');
    const snapAtual = await getDocs(query(refAtual, where('userId', '==', user.uid), where('recorrenteId', '==', recorrenteId)));
    transacoes = snapAtual.docs.map(doc => ({...doc.data(), id: doc.id}));
    // Buscar no histórico mensal (limitar até o mês atual)
    const now = new Date();
    const anoAtual = now.getFullYear();
    const mesAtual = now.getMonth() + 1;
    for (let ano = 2023; ano <= anoAtual; ano++) {
      const mesLimite = (ano === anoAtual) ? mesAtual : 12;
      for (let mes = 1; mes <= mesLimite; mes++) {
        const mesPad = String(mes).padStart(2, '0');
        const refHist = collection(db, 'users', user.uid, 'historico', `${ano}-${mesPad}`, 'transacoes');
        const snapHist = await getDocs(query(refHist, where('recorrenteId', '==', recorrenteId)));
        transacoes = transacoes.concat(snapHist.docs.map(doc => doc.data()));
      }
    }
    transacoes.sort((a, b) => (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0));
    console.log('[DEBUG] Histórico recorrente', {
      recorrenteId,
      transacoes,
      userId: user.uid,
      budgetId: window.appState.currentBudget?.id
    });
    // Atualizar conteúdo do modal
    modal.querySelector('.modal-body').innerHTML = `
      <div class='space-y-2'>
        <div class='text-xs text-gray-400'>Recorrente ID: <b>${recorrenteId}</b></div>
        ${transacoes.length === 0 ? `<p class="text-gray-500">Nenhuma aplicação encontrada.<br>Verifique se a recorrente foi efetivada neste mês, se o orçamento selecionado é o mesmo e se o campo <b>recorrenteId</b> está correto na transação.</p>` :
          transacoes.map(t => `
            <div class='flex justify-between items-center border-b pb-1'>
              <span>${t.descricao || ''}</span>
              <span class='text-xs text-gray-500'>${t.createdAt?.seconds ? new Date(t.createdAt.seconds * 1000).toLocaleDateString() : ''}</span>
              <span class='font-bold ${t.tipo === 'receita' ? 'text-green-600' : 'text-red-600'}'>${t.tipo === 'receita' ? '+' : '-'}R$ ${parseFloat(t.valor).toFixed(2)}</span>
              <span class='text-xs text-gray-400 ml-2'>ID: ${t.id || '-'}</span>
            </div>
          `).join('')}
      </div>
      <div class='flex justify-center mt-6'>
        <button onclick='closeModal()' class='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600'>Fechar</button>
      </div>
    `;
  } catch (err) {
    modal.querySelector('.modal-body').innerHTML = `<div class='text-red-600 text-center mt-4'>Erro ao carregar histórico. Tente novamente.</div>
      <div class='flex justify-center mt-6'>
        <button onclick='closeModal()' class='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600'>Fechar</button>
      </div>`;
    Snackbar({ message: 'Erro ao carregar histórico: ' + (err.message || err), type: 'error' });
  }
}
window.showHistoricoRecorrente = showHistoricoRecorrente;

function calcularProximaData(dataISO, diaLancamento) {
  try {
    const hoje = new Date();
    const base = new Date(dataISO);
    const ano = hoje.getMonth() > base.getMonth() ? hoje.getFullYear() : base.getFullYear();
    const mes = hoje.getMonth() + (diaLancamento <= hoje.getDate() ? 1 : 0);
    const data = new Date(ano, mes, diaLancamento);
    return data;
  } catch {
    return new Date();
  }
}

function tentarNotificar(rec) {
  if (!('Notification' in window)) return;
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      const hoje = new Date();
      const proxima = calcularProximaData(rec.dataInicio, rec.diaLancamento || 1);
      const diff = Math.ceil((proxima - hoje) / (1000 * 60 * 60 * 24));
      if (diff === 1) {
        new Notification('Lembrete de Despesa Recorrente', {
          body: `Amanhã será lançada: ${rec.descricao} - R$ ${parseFloat(rec.valor).toFixed(2)}`
        });
      }
    }
  });
}

export function renderRecorrentes() {
  const user = window.FirebaseAuth?.currentUser;
  const budget = window.appState?.currentBudget;
  const content = document.getElementById('app-content');
  content.innerHTML = `
    <div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-2 md:p-6 border border-gray-300 dark:border-gray-700">
      <div class="flex flex-wrap justify-between items-center gap-1 md:gap-0 mb-4">
        <h2 class="tab-title-highlight bg-white dark:bg-gray-900 rounded-2xl px-6 py-2 shadow text-gray-900 dark:text-white">Despesas Recorrentes</h2>
        <button onclick="window.showAddRecorrenteModal()" class="bg-blue-500 text-white px-2 py-1 md:px-6 md:py-3 rounded-lg hover:bg-blue-600 flex items-center space-x-2 text-xs md:text-base font-semibold font-inter shadow-md">
          <span>+ Nova Recorrente</span>
        </button>
      </div>
      <div id="recorrentes-list" class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6"></div>
    </div>
  `;

  if (!user || !budget) {
    document.getElementById('recorrentes-list').innerHTML = '<p class="text-gray-500 dark:text-gray-300">Nenhum usuário ou orçamento ativo.</p>';
    return;
  }

  const recorrentes = window.appState.recorrentes || [];
  const transacoes = window.appState.transactions || [];
  const now = new Date();
  const anoAtual = now.getFullYear();
  const mesAtual = now.getMonth() + 1;
  // Filtrar recorrentes que já foram lançadas no mês atual
  const recorrentesLancadas = transacoes.filter(t => t.recorrenteId && new Date(t.createdAt).getFullYear() === anoAtual && (new Date(t.createdAt).getMonth() + 1) === mesAtual).map(t => t.recorrenteId);

  const lista = document.getElementById('recorrentes-list');
  if (!recorrentes.length) {
    lista.innerHTML = '<p class="text-gray-500 dark:text-gray-300">Nenhuma despesa recorrente cadastrada.</p>';
    return;
  }

  lista.innerHTML = '';
  recorrentes.forEach(rec => {
    // Não exibir como "ativa" se já foi lançada no mês atual
    const jaLancadaEsteMes = recorrentesLancadas.includes(rec.id);
    const proximaData = calcularProximaData(rec.dataInicio, rec.diaLancamento || 1);
    const proximaStr = proximaData.toLocaleDateString('pt-BR');
    // Calcular parcelas restantes dinâmicas para o mês atual
    const dataInicio = new Date(rec.dataInicio);
    const anoInicio = dataInicio.getFullYear();
    const mesInicio = dataInicio.getMonth() + 1;
    let mesesDesdeInicio = (anoAtual - anoInicio) * 12 + (mesAtual - mesInicio);
    if (!rec.efetivarMesAtual && (anoAtual > anoInicio || (anoAtual === anoInicio && mesAtual > mesInicio))) {
      mesesDesdeInicio -= 1;
    }
    const parcelasRestantesExibidas = rec.parcelasRestantes !== null && rec.parcelasRestantes !== undefined ? rec.parcelasRestantes - mesesDesdeInicio : null;
    const numParcela = rec.parcelasRestantes !== null && rec.parcelasRestantes !== undefined ? (rec.parcelasRestantes - parcelasRestantesExibidas + 1) : null;
    const card = document.createElement('div');
    card.className = 'border border-gray-300 dark:border-gray-700 rounded-lg p-2 md:p-4 bg-white dark:bg-gray-900';
    const valorParcela = parseFloat(rec.valor);
    const valorTotal = rec.valorTotal ? parseFloat(rec.valorTotal) : (rec.parcelasRestantes && rec.parcelasRestantes > 1 ? valorParcela * rec.parcelasRestantes : valorParcela);
    card.innerHTML = `
      <div class="flex items-center space-x-2 md:space-x-3 mb-2">
        <div class="w-4 h-4 rounded-full" style="background-color: ${rec.cor || '#4F46E5'}"></div>
        <span class="font-semibold text-xs md:text-base text-gray-900 dark:text-gray-100">${rec.descricao}</span>
      </div>
      <p class="text-xs md:text-sm text-gray-500 dark:text-gray-300">Valor da parcela: R$ ${valorParcela.toFixed(2)}${(rec.parcelasRestantes && rec.parcelasRestantes > 1) ? ` &nbsp;|&nbsp; <span class='text-gray-400'>Total: R$ ${valorTotal.toFixed(2)}</span>` : ''}</p>
      <p class="text-xs md:text-sm text-gray-500 dark:text-gray-300">Categoria: ${rec.categoriaId || 'Sem categoria'}</p>
      <p class="text-xs md:text-sm text-gray-500 dark:text-gray-300">${parcelasRestantesExibidas === null ? 'Infinito' : `Parcela ${numParcela} de ${rec.parcelasRestantes}`}</p>
      ${rec.ativa !== false && !jaLancadaEsteMes ? `<p class=\"text-xs text-green-500 mb-2\">Próxima aplicação: ${proximaStr}</p>` : jaLancadaEsteMes ? `<p class=\"text-xs text-blue-500 mb-2\">Efetivada este mês</p>` : ''}
      <div class="flex flex-wrap justify-end gap-1 md:space-x-2 mt-2">
        <button class="text-blue-600 hover:text-blue-800 text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 rounded" onclick="window.showAddRecorrenteModal(${JSON.stringify(rec).replace(/\"/g, '&quot;')})">Editar</button>
        <button class="text-red-600 hover:text-red-800 text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 rounded" onclick="window.handleDeleteRecorrente('${rec.id}')">Excluir</button>
        <button class="text-yellow-500 hover:text-yellow-700 text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 rounded" onclick='window.handleToggleRecorrente(${JSON.stringify(rec).replace(/\"/g, '&quot;')})'>${rec.ativa === false ? 'Ativar' : 'Pausar'}</button>
        <button class="text-gray-600 hover:text-gray-800 dark:text-gray-300 text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 rounded" onclick="window.showHistoricoRecorrente('${rec.id}')">Histórico</button>
      </div>
    `;
    lista.appendChild(card);
  });
}

export { showHistoricoRecorrente };