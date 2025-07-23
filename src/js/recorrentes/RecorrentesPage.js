import { getDespesasRecorrentes, deleteDespesaRecorrente, updateDespesaRecorrente } from '../recorrentes.js';
import { Snackbar } from '../ui/Snackbar.js';

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
    <div class="bg-white rounded-xl shadow-lg p-4 flex justify-between items-center mb-4 font-inter">
      <h2 class="text-xl font-bold text-gray-900 font-inter">Despesas Recorrentes</h2>
      <button onclick="window.showAddRecorrenteModal()" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm font-semibold font-inter">+ Nova Recorrente</button>
    </div>
    <div id="recorrentes-list"></div>
  `;

  if (!user || !budget) {
    document.getElementById('recorrentes-list').innerHTML = '<p class="text-gray-500">Nenhum usuário ou orçamento ativo.</p>';
    return;
  }

  const recorrentes = window.appState.recorrentes || [];
  console.log('RenderRecorrentes:', recorrentes);
  const lista = document.getElementById('recorrentes-list');
  if (!recorrentes.length) {
    lista.innerHTML = '<p class="text-gray-500">Nenhuma despesa recorrente cadastrada.</p>';
    return;
  }

  lista.innerHTML = '';
  recorrentes.forEach(rec => {
    const proximaData = calcularProximaData(rec.dataInicio, rec.diaLancamento || 1);
    const proximaStr = proximaData.toLocaleDateString('pt-BR');
    const card = document.createElement('div');
    card.className = 'p-3 rounded-xl shadow-md bg-white dark:bg-gray-800 flex justify-between items-start mb-2 font-inter';
    card.innerHTML = `
      <div>
        <p class="font-semibold">${rec.descricao}</p>
        <p class="text-sm text-gray-500">R$ ${parseFloat(rec.valor).toFixed(2)} 2 ${rec.categoriaId || 'Sem categoria'}</p>
        <p class="text-xs text-gray-400">${rec.parcelasRestantes === null ? 'Infinito' : rec.parcelasRestantes + ' parcelas restantes'}</p>
        ${rec.ativa !== false ? '<p class="text-xs text-green-500 mt-1">Próxima aplicação: ' + proximaStr + '</p>' : ''}
      </div>
      <div class="flex flex-col items-end gap-2">
        <button class="text-sm text-blue-500 hover:underline font-inter" onclick="window.showAddRecorrenteModal(${JSON.stringify(rec).replace(/\"/g, '&quot;')})">Editar</button>
        <button class="text-sm text-red-500 hover:underline font-inter" onclick="window.handleDeleteRecorrente('${rec.id}')">Excluir</button>
        <button class="text-sm text-yellow-500 hover:underline font-inter" onclick='window.handleToggleRecorrente(${JSON.stringify(rec).replace(/\"/g, '&quot;')})'>
          ${rec.ativa === false ? '\u25b6\ufe0f Ativar' : '\u23f8\ufe0f Pausar'}
        </button>
      </div>
    `;
    lista.appendChild(card);
  });
}

document.addEventListener('recorrente-adicionada', () => {
  renderRecorrentes();
});