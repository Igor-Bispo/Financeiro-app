import { Modal } from './ui/Modal.js';
import { RecorrenteForm } from './ui/RecorrenteForm.js';
import { addDespesaRecorrente } from './recorrentes.js';
import { Snackbar } from './ui/Snackbar.js';

window.showAddRecorrenteModal = function () {
  const modal = Modal({
    title: 'Nova Despesa Recorrente',
    content: '',
    onClose: () => modal.remove()
  });

  const user = window.FirebaseAuth.currentUser;
  const budget = window.appState.currentBudget;
  if (!user || !budget) return;

  const form = RecorrenteForm({
    onSubmit: async (dados) => {
      try {
        await addDespesaRecorrente(user.uid, budget.id, dados);
        modal.remove();
        Snackbar({ message: 'Despesa recorrente salva!', type: 'success' });
        if (typeof window.loadRecorrentes === 'function') {
          await window.loadRecorrentes();
        }
        if (window.location.hash.includes('recorrentes')) {
          if (typeof window.renderRecorrentes === 'function') await window.renderRecorrentes();
        } else {
          if (typeof window.renderDashboard === 'function') await window.renderDashboard();
        }
      } catch (err) {
        console.error(err);
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