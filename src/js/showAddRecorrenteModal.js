import { Modal } from './ui/Modal.js';
import { RecorrenteForm } from './ui/RecorrenteForm.js';
import { addDespesaRecorrente } from './recorrentes.js';
import { Snackbar } from './ui/Snackbar.js';

window.showAddRecorrenteModal = function (dados = {}) {
  const isEdicao = !!dados && Object.keys(dados).length > 0;
  const modal = Modal({
    title: isEdicao ? 'Editar Despesa Recorrente' : 'Nova Despesa Recorrente',
    content: '',
    onClose: () => modal.remove()
  });

  const user = window.FirebaseAuth.currentUser;
  const budget = window.appState.currentBudget;
  if (!user) {
    Snackbar({ message: 'Você precisa estar logado para adicionar recorrentes.', type: 'error' });
    return;
  }
  if (!budget) {
    Snackbar({ message: 'Selecione um orçamento antes de adicionar recorrentes.', type: 'error' });
    return;
  }

  const form = RecorrenteForm({
    initialData: dados,
    onSubmit: async (dadosForm) => {
      try {
        console.log('Iniciando adição de recorrente');
        await addDespesaRecorrente(user.uid, budget.id, dadosForm);
        console.log('Recorrente adicionada, aguardando delay');
        await new Promise(res => setTimeout(res, 200));
        console.log('Delay concluído, carregando recorrentes');
        await window.loadRecorrentes();
        modal.remove();
        setTimeout(() => {
          // Remover alternância de abas automática
          if (window.location.hash.includes('recorrentes')) {
            window._renderRecorrentes();
          } else if (window.location.hash.includes('dashboard')) {
            window.renderDashboard();
          }
          Snackbar({ message: isEdicao ? 'Despesa recorrente editada!' : 'Despesa recorrente salva!', type: 'success' });
          document.dispatchEvent(new CustomEvent('recorrente-adicionada'));
        }, 50);
      } catch (err) {
        console.error('Erro ao adicionar recorrente:', err);
        Snackbar({ message: 'Erro ao salvar recorrente', type: 'error' });
      }
    }
  });

  const body = modal.querySelector('.modal-body');
  if (body) {
    body.appendChild(form);
  } else {
    modal.appendChild(form);
  }
  document.body.appendChild(modal);
};