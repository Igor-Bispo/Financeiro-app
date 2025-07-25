import { Modal } from './ui/Modal.js';
import { RecorrenteForm } from './ui/RecorrenteForm.js';
import { addDespesaRecorrente, updateDespesaRecorrente } from './recorrentes.js';
import { Snackbar } from './ui/Snackbar.js';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

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
        // Esconder FAB enquanto o modal está aberto
        document.querySelector('.fab')?.classList.add('hidden');
        if (isEdicao && dados.id) {
          // Edição: atualizar recorrente existente
          await updateDespesaRecorrente(user.uid, dados.id, dadosForm);
        } else {
          // Nova recorrente
          const recRef = await addDespesaRecorrente(user.uid, budget.id, dadosForm);
          // Se marcado, efetivar no mês atual
          if (dadosForm.efetivarMesAtual) {
            const now = new Date();
            const mesAtual = now.getMonth() + 1;
            const anoAtual = now.getFullYear();
            // Buscar se já existe transação deste recorrente neste mês
            const db = window.FirebaseDB;
            const ref = collection(db, 'transactions');
            const snap = await getDocs(query(ref, where('userId', '==', user.uid), where('recorrenteId', '==', recRef.id || (recRef._key && recRef._key.path.segments?.slice(-1)[0]))));
            const jaExiste = snap.docs.some(doc => {
              const d = doc.data();
              const data = d.createdAt && d.createdAt.toDate ? d.createdAt.toDate() : (d.createdAt ? new Date(d.createdAt) : null);
              return data && data.getMonth() + 1 === mesAtual && data.getFullYear() === anoAtual;
            });
            if (!jaExiste) {
              await addDoc(collection(window.FirebaseDB, 'transactions'), {
                userId: user.uid,
                budgetId: budget.id,
                descricao: dadosForm.descricao,
                valor: dadosForm.valor,
                categoriaId: dadosForm.categoriaId,
                tipo: 'despesa',
                createdAt: now,
                recorrenteId: recRef.id || (recRef._key && recRef._key.path.segments?.slice(-1)[0])
              });
            }
          }
        }
        await new Promise(res => setTimeout(res, 200));
        await window.loadRecorrentes();
        modal.remove();
        setTimeout(() => {
          // Mostrar FAB novamente ao fechar o modal
          document.querySelector('.fab')?.classList.remove('hidden');
          if (window.location.hash.includes('recorrentes')) {
            window._renderRecorrentes();
          } else if (window.location.hash.includes('dashboard')) {
            window.renderDashboard();
          }
          Snackbar({ message: isEdicao ? 'Despesa recorrente editada!' : 'Despesa recorrente salva!', type: 'success' });
          document.dispatchEvent(new CustomEvent('recorrente-adicionada'));
        }, 50);
      } catch (err) {
        // Mostrar FAB novamente em caso de erro
        document.querySelector('.fab')?.classList.remove('hidden');
        console.error('Erro ao adicionar/editar recorrente:', err);
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
