import { Modal } from './ui/Modal.js';
import { RecorrenteForm } from './ui/RecorrenteForm.js';
import {
  addDespesaRecorrente,
  updateDespesaRecorrente
} from './recorrentes.js';
import { Snackbar } from './ui/Snackbar.js';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

window.showAddRecorrenteModal = function (dados = {}) {
  const isEdicao = !!dados && Object.keys(dados).length > 0;
  const modal = Modal({
    title: isEdicao ? 'Editar Despesa Recorrente' : 'Nova Despesa Recorrente',
    content: '',
    onClose: () => modal.remove()
  });

  const user = window.appState.currentUser;
  const budget = window.appState.currentBudget;
  if (!user) {
    Snackbar({
      message: 'VocÃª precisa estar logado para adicionar recorrentes.',
      type: 'error'
    });
    return;
  }
  if (!budget) {
    Snackbar({
      message: 'Selecione um orÃ§amento antes de adicionar recorrentes.',
      type: 'error'
    });
    return;
  }

  const form = RecorrenteForm({
    initialData: dados,
    onSubmit: async dadosForm => {
      try {
        // Esconder FAB enquanto o modal estÃ¡ aberto
        document.querySelector('.fab')?.classList.add('hidden');
        if (isEdicao && dados.id) {
          // EdiÃ§Ã£o: atualizar recorrente existente
          await updateDespesaRecorrente(user.uid, dados.id, dadosForm);
        } else {
          // Nova recorrente
          const recorrenteId = await addDespesaRecorrente(
            user.uid,
            budget.id,
            dadosForm
          );
          // Se marcado, efetivar no mÃªs atual
          if (dadosForm.efetivarMesAtual) {
            console.log('ðŸš€ Efetivando recorrente no mÃªs atual...');
            const now = new Date();
            const mesAtual = now.getMonth() + 1;
            const anoAtual = now.getFullYear();

            // Buscar se jÃ¡ existe transaÃ§Ã£o deste recorrente neste mÃªs
            const { db } = await import('./firebase.js');
            const ref = collection(db, 'transactions');
            const snap = await getDocs(
              query(
                ref,
                where('userId', '==', user.uid),
                where('recorrenteId', '==', recorrenteId)
              )
            );

            const jaExiste = snap.docs.some(doc => {
              const d = doc.data();
              const data =
                d.createdAt && d.createdAt.toDate
                  ? d.createdAt.toDate()
                  : d.createdAt
                    ? new Date(d.createdAt)
                    : null;
              return (
                data &&
                data.getMonth() + 1 === mesAtual &&
                data.getFullYear() === anoAtual
              );
            });

            console.log('ðŸ” JÃ¡ existe transaÃ§Ã£o neste mÃªs?', jaExiste);

            if (!jaExiste) {
              // Criar transaÃ§Ã£o para o mÃªs atual
              const transacaoData = {
                userId: user.uid,
                budgetId: budget.id,
                descricao: dadosForm.descricao,
                valor: dadosForm.valor,
                categoriaId: dadosForm.categoriaId,
                tipo: 'despesa',
                createdAt: now,
                recorrenteId: recorrenteId,
                recorrenteNome: dadosForm.descricao
              };

              const transacaoRef = await addDoc(
                collection(db, 'transactions'),
                transacaoData
              );
              console.log(
                'âœ… TransaÃ§Ã£o criada para mÃªs atual:',
                transacaoRef.id
              );

              // Enviar notificaÃ§Ã£o para membros do orÃ§amento (recorrente aplicada imediatamente)
              try {
                const { sendTransactionNotification } = await import('@features/notifications/NotificationService.js');
                let parcelaAtual = null;
                try {
                  const { calcularParcelaRecorrente } = await import('@features/recorrentes/service.js');
                  parcelaAtual = calcularParcelaRecorrente(dadosForm);
                } catch {}
                const txNotify = {
                  id: transacaoRef.id,
                  descricao: transacaoData.descricao,
                  valor: transacaoData.valor,
                  categoriaId: transacaoData.categoriaId,
                  tipo: transacaoData.tipo,
                  recorrenteId: recorrenteId,
                  recorrenteParcelaAtual: parcelaAtual ?? null,
                  recorrenteParcelasTotal: dadosForm.parcelasTotal ?? null,
                };
                await sendTransactionNotification(budget.id, user.uid, txNotify);
              } catch (notifyErr) {
                console.warn('Falha ao enviar notificaÃ§Ã£o de recorrente imediata:', notifyErr);
              }

              // NÃƒO decrementar parcelas para aplicaÃ§Ã£o imediata
              // As parcelas sÃ³ devem ser decrementadas quando aplicadas via "Aplicar Recorrentes"

              // Registrar no log
              try {
                await addDoc(collection(db, 'logAplicacoes'), {
                  userId: user.uid,
                  mesAno: `${anoAtual}-${String(mesAtual).padStart(2, '0')}`,
                  recorrenteId: recorrenteId,
                  descricao: dadosForm.descricao,
                  valor: dadosForm.valor,
                  dataAplicacao: now,
                  transacaoId: transacaoRef.id,
                  aplicacaoImediata: true
                });
                console.log('ðŸ“ AplicaÃ§Ã£o imediata registrada no log');
              } catch (error) {
                console.error(
                  'Erro ao registrar aplicaÃ§Ã£o imediata no log:',
                  error
                );
              }
            } else {
              console.log('â­ï¸ TransaÃ§Ã£o jÃ¡ existe para este mÃªs, pulando...');
            }
          }
        }
        await new Promise(res => setTimeout(res, 200));
        try {
          const { loadRecorrentes } = await import('@features/recorrentes/service.js');
          await loadRecorrentes();
        } catch (e) {
          if (typeof window.loadRecorrentes === 'function') {
            await window.loadRecorrentes();
          } else {
            console.warn('loadRecorrentes indisponÃ­vel:', e);
          }
        }

        // Fechar modal e mostrar feedback
        modal.remove();
        Snackbar({
          message: isEdicao
            ? 'Despesa recorrente editada!'
            : 'Despesa recorrente salva!',
          type: 'success'
        });

        // SincronizaÃ§Ã£o completa de todos os dados
        setTimeout(async () => {
          document.querySelector('.fab')?.classList.remove('hidden');

          // Se for ediÃ§Ã£o, recalcular transaÃ§Ãµes aplicadas (se funÃ§Ã£o existir)
          if (isEdicao && dados.id && typeof window.recalcularTransacoesRecorrente === 'function') {
            try {
              console.log('ðŸ”„ Recalculando transaÃ§Ãµes da recorrente editada:', dados.id);
              await window.recalcularTransacoesRecorrente(dados.id, dadosForm);
            } catch (err) {
              console.warn('Falha ao recalcular transaÃ§Ãµes da recorrente:', err);
            }
          }

          // Recarregar todos os dados usando services diretamente (com fallback)
          try {
            const { loadRecorrentes } = await import('@features/recorrentes/service.js');
            await loadRecorrentes();
          } catch (err) {
            if (typeof window.loadRecorrentes === 'function') {
              await window.loadRecorrentes();
            } else {
              console.warn('Falha ao recarregar recorrentes:', err);
            }
          }

          try {
            const { loadTransactions } = await import('@features/transactions/service.js');
            const budgetId = window.appState?.currentBudget?.id;
            const userId = window.appState?.currentUser?.uid;
            await loadTransactions(budgetId, userId);
          } catch (err) {
            if (typeof window.loadTransactions === 'function') {
              await window.loadTransactions();
            } else {
              console.warn('Falha ao recarregar transaÃ§Ãµes:', err);
            }
          }

          try {
            const { loadCategories } = await import('@features/categories/service.js');
            const budgetId = window.appState?.currentBudget?.id;
            await loadCategories(budgetId);
          } catch (err) {
            if (typeof window.loadCategories === 'function') {
              await window.loadCategories();
            } else {
              console.warn('Falha ao recarregar categorias:', err);
            }
          }

          // Atualizar todas as abas
          if (window.location.hash.includes('/recorrentes')) {
            try { typeof window._renderRecorrentes === 'function' && window._renderRecorrentes(); } catch {}
          } else if (window.location.hash.includes('/dashboard')) {
            try { typeof window.renderDashboard === 'function' && window.renderDashboard(); } catch {}
          } else if (window.location.hash.includes('/transactions')) {
            try { typeof window.renderTransactions === 'function' && window.renderTransactions(); } catch {}
          }

          // Disparar evento para sincronizaÃ§Ã£o
          document.dispatchEvent(new CustomEvent('recorrente-adicionada'));
          document.dispatchEvent(new CustomEvent('dados-atualizados'));
        }, 100);
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
