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
      message: 'Você precisa estar logado para adicionar recorrentes.',
      type: 'error'
    });
    return;
  }
  if (!budget) {
    Snackbar({
      message: 'Selecione um orçamento antes de adicionar recorrentes.',
      type: 'error'
    });
    return;
  }

  const form = RecorrenteForm({
    initialData: dados,
    onSubmit: async dadosForm => {
      try {
        // Esconder FAB enquanto o modal está aberto
        document.querySelector('.fab')?.classList.add('hidden');
        if (isEdicao && dados.id) {
          // Edição: atualizar recorrente existente
          await updateDespesaRecorrente(user.uid, dados.id, dadosForm);
        } else {
          // Nova recorrente
          const recorrenteId = await addDespesaRecorrente(
            user.uid,
            budget.id,
            dadosForm
          );
          // Se marcado, efetivar no mês atual
          if (dadosForm.efetivarMesAtual) {
            console.log('🚀 Efetivando recorrente no mês atual...');
            const now = new Date();
            const mesAtual = now.getMonth() + 1;
            const anoAtual = now.getFullYear();

            // Buscar se já existe transação deste recorrente neste mês
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

            console.log('🔍 Já existe transação neste mês?', jaExiste);

            if (!jaExiste) {
              // Criar transação para o mês atual
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
                '✅ Transação criada para mês atual:',
                transacaoRef.id
              );

              // NÃO decrementar parcelas para aplicação imediata
              // As parcelas só devem ser decrementadas quando aplicadas via "Aplicar Recorrentes"

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
                console.log('📝 Aplicação imediata registrada no log');
              } catch (error) {
                console.error(
                  'Erro ao registrar aplicação imediata no log:',
                  error
                );
              }
            } else {
              console.log('⏭️ Transação já existe para este mês, pulando...');
            }
          }
        }
        await new Promise(res => setTimeout(res, 200));
        await window.loadRecorrentes();

        // Fechar modal e mostrar feedback
        modal.remove();
        Snackbar({
          message: isEdicao
            ? 'Despesa recorrente editada!'
            : 'Despesa recorrente salva!',
          type: 'success'
        });

        // Sincronização completa de todos os dados
        setTimeout(async () => {
          document.querySelector('.fab')?.classList.remove('hidden');
          
          // Se for edição, recalcular transações aplicadas
          if (isEdicao && dados.id) {
            console.log('🔄 Recalculando transações da recorrente editada:', dados.id);
            await window.recalcularTransacoesRecorrente(dados.id, dadosForm);
          }
          
          // Recarregar todos os dados
          await window.loadRecorrentes();
          await window.loadTransactions();
          await window.loadCategories();
          
          // Atualizar todas as abas
          if (window.location.hash.includes('recorrentes')) {
            window._renderRecorrentes();
          } else if (window.location.hash.includes('dashboard')) {
            window.renderDashboard();
          } else if (window.location.hash.includes('transacoes')) {
            window.renderTransactions();
          }
          
          // Disparar evento para sincronização
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
