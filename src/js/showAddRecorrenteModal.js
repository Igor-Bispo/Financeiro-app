import { Modal } from './ui/Modal.js';
import { RecorrenteForm } from './ui/RecorrenteForm.js';
import {
  addDespesaRecorrente,
  updateDespesaRecorrente
} from './recorrentes.js';
import { Snackbar } from './ui/Snackbar.js';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

console.log('🔍 [DEBUG] showAddRecorrenteModal.js carregado!');
console.log('🔍 [DEBUG] Imports carregados:', { Modal: typeof Modal, RecorrenteForm: typeof RecorrenteForm });window.showAddRecorrenteModal = function (dados = {}) {
  console.log('🔍 [DEBUG] showAddRecorrenteModal chamada com dados:', dados);
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

  // 🔥 DEBUG SUPER CRÍTICO: Verificar se o callback está sendo criado
  console.log('🔥 [DEBUG-CALLBACK-CREATION] Criando callback onSubmit...');
  console.log('🔥 [DEBUG-CALLBACK-CREATION] Dados iniciais para RecorrenteForm:', dados);
  
  const form = RecorrenteForm({
    initialData: dados,
    onSubmit: async dadosForm => {
      try {
        // 🚨🚨🚨 LOG CRÍTICO IMEDIATO - PRIMEIRA LINHA DO CALLBACK
        console.log('🚨🚨🚨 [CALLBACK-SHOWADDRECORRENTE] *** CALLBACK INICIADO! ***');
        console.log('🚨🚨🚨 [CALLBACK-SHOWADDRECORRENTE] dadosForm recebido:', dadosForm);
        console.log('🚨🚨🚨 [CALLBACK-SHOWADDRECORRENTE] Tipo de dadosForm:', typeof dadosForm);
        console.log('🚨🚨🚨 [CALLBACK-SHOWADDRECORRENTE] dadosForm.efetivarMesAtual:', dadosForm.efetivarMesAtual);
        
        // 🚨 VERIFICAR SE É PARA EFETIVAR NO MÊS ATUAL
        if (dadosForm.efetivarMesAtual === true) {
          console.log('🚨🚨🚨 [CALLBACK-SHOWADDRECORRENTE] *** DEVE CRIAR TRANSAÇÃO AUTOMÁTICA! ***');
        } else {
          console.log('🚨🚨🚨 [CALLBACK-SHOWADDRECORRENTE] *** NÃO DEVE CRIAR TRANSAÇÃO AUTOMÁTICA ***');
        }
        
        // 🚨 DEBUG CRÍTICO: Primeiro log absoluto
        console.log('🚨 [DEBUG-CRÍTICO] onSubmit EXECUTADO! dadosForm:', dadosForm);
        // 🔧 DEBUG: Verificar dados recebidos do formulário
        console.log('🔧 [DEBUG-FORM] Dados recebidos do formulário:', dadosForm);
        console.log('🔧 [DEBUG-FORM] dadosForm.efetivarMesAtual (valor):', dadosForm.efetivarMesAtual);
        console.log('🔧 [DEBUG-FORM] dadosForm.efetivarMesAtual (tipo):', typeof dadosForm.efetivarMesAtual);
        
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
            console.log('🚀 [DEBUG] Checkbox marcado - Efetivando recorrente no mês atual...');
            console.log('🚀 [DEBUG] dadosForm.efetivarMesAtual:', dadosForm.efetivarMesAtual);
            console.log('🚀 [DEBUG] recorrenteId:', recorrenteId);
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
              console.log('✅ [DEBUG] Não existe transação para este mês, criando...');
              // Declarar variáveis no escopo correto
              let transacaoId = null;
              let parcelaAtualFinal = 1;

              // Criar transação para o mês atual usando a função correta
              try {
                const { createFromRecurring } = await import('@data/repositories/transactionsRepo.js');
                const { calcularParcelaRecorrente } = await import('@features/recorrentes/service.js');

                // Preparar dados do recorrente para a função
                const recData = {
                  id: recorrenteId,
                  descricao: dadosForm.descricao,
                  valor: dadosForm.valor,
                  categoriaId: dadosForm.categoriaId,
                  parcelasTotal: dadosForm.parcelasTotal,
                  parcelasRestantes: dadosForm.parcelasRestantes,
                  dataInicio: dadosForm.dataInicio || now.toISOString().split('T')[0] // Usar data atual se não especificada
                };

                // Calcular parcela atual
                const parcelaAtual = calcularParcelaRecorrente(recData, anoAtual, mesAtual);

                // Se a função retornar null ou NaN, usar 1 como fallback
                parcelaAtualFinal = (parcelaAtual && !isNaN(parcelaAtual)) ? parcelaAtual : 1;

                // Criar transação usando a função correta
                console.log('🔄 [DEBUG] Chamando createFromRecurring com:', {
                  userId: user.uid,
                  budgetId: budget.id,
                  rec: recData,
                  createdDate: now,
                  parcelaAtual: parcelaAtualFinal
                });
                const { id } = await createFromRecurring({
                  userId: user.uid,
                  budgetId: budget.id,
                  rec: recData,
                  createdDate: now,
                  parcelaAtual: parcelaAtualFinal
                });

                transacaoId = id;
                console.log('✅ [DEBUG] Transação criada para mês atual:', transacaoId);
              } catch (error) {
                console.error('❌ Erro ao criar transação usando createFromRecurring:', error);
                // Fallback para o método antigo
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
                transacaoId = transacaoRef.id;
                console.log('✅ Transação criada para mês atual (fallback):', transacaoId);
              }

              // Enviar notificação para membros do orçamento (recorrente aplicada imediatamente)
              try {
                const { sendTransactionNotification } = await import('@features/notifications/NotificationService.js');
                const txNotify = {
                  id: transacaoId,
                  descricao: dadosForm.descricao,
                  valor: dadosForm.valor,
                  categoriaId: dadosForm.categoriaId,
                  tipo: 'despesa',
                  recorrenteId: recorrenteId,
                  recorrenteParcelaAtual: parcelaAtualFinal ?? null,
                  recorrenteParcelasTotal: dadosForm.parcelasTotal ?? null,
                };
                await sendTransactionNotification(budget.id, user.uid, txNotify);
              } catch (notifyErr) {
                console.warn('Falha ao enviar notificação de recorrente imediata:', notifyErr);
              }

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
                  transacaoId: transacaoId,
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
              console.log('⏭️ [DEBUG] Transação já existe para este mês, pulando...');
            }
          }
        }
        await new Promise(res => setTimeout(res, 200));
        console.log('🔄 [DEBUG] Carregando recorrentes após salvar...');
        try {
          const { loadRecorrentes } = await import('@features/recorrentes/service.js');
          await loadRecorrentes();
          console.log('✅ [DEBUG] loadRecorrentes executado com sucesso');
        } catch (e) {
          console.warn('⚠️ [DEBUG] Erro no loadRecorrentes:', e);
          if (typeof window.loadRecorrentes === 'function') {
            await window.loadRecorrentes();
            console.log('✅ [DEBUG] window.loadRecorrentes executado como fallback');
          } else {
            console.warn('❌ [DEBUG] loadRecorrentes indisponível:', e);
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

        // 🔄 ATUALIZAÇÃO IMEDIATA DA PÁGINA DE RECORRENTES
        console.log('🔄 [ATUALIZAÇÃO] Iniciando atualização imediata da página...');
        
        // 1. Recarregar dados de recorrentes IMEDIATAMENTE
        try {
          console.log('🔄 [ATUALIZAÇÃO] Recarregando dados de recorrentes...');
          const { loadRecorrentes } = await import('@features/recorrentes/service.js');
          await loadRecorrentes();
          console.log('✅ [ATUALIZAÇÃO] Dados de recorrentes recarregados');
        } catch (err) {
          console.warn('⚠️ [ATUALIZAÇÃO] Erro ao recarregar recorrentes:', err);
        }

        // 2. Atualizar a interface IMEDIATAMENTE se estiver na página de recorrentes
        if (window.location.hash.includes('/recorrentes')) {
          console.log('✅ [ATUALIZAÇÃO] Usuário está na página de recorrentes, atualizando interface...');
          try {
            const { renderRecorrentes } = await import('@features/recorrentes/RecorrentesPage.js');
            await renderRecorrentes();
            console.log('✅ [ATUALIZAÇÃO] Interface de recorrentes atualizada com sucesso!');
          } catch (e) {
            console.error('❌ [ATUALIZAÇÃO] Erro ao atualizar interface:', e);
          }
        }

        // Sincronização completa de todos os dados (com delay menor)
        setTimeout(async () => {
          document.querySelector('.fab')?.classList.remove('hidden');

          // Se for edição, recalcular transações aplicadas (se função existir)
          if (isEdicao && dados.id && typeof window.recalcularTransacoesRecorrente === 'function') {
            try {
              console.log('🔄 Recalculando transações da recorrente editada:', dados.id);
              await window.recalcularTransacoesRecorrente(dados.id, dadosForm);
            } catch (err) {
              console.warn('Falha ao recalcular transações da recorrente:', err);
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
              console.warn('Falha ao recarregar transações:', err);
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
          console.log('🔄 [DEBUG] Atualizando abas - location.hash:', window.location.hash);
          if (window.location.hash.includes('/recorrentes')) {
            console.log('🔄 [DEBUG] Atualizando aba de recorrentes...');
            try {
              // Usar a função moderna de renderização
              const { renderRecorrentes } = await import('@features/recorrentes/RecorrentesPage.js');
              await renderRecorrentes();
              console.log('✅ [DEBUG] renderRecorrentes moderno executado');
            } catch (e) {
              console.error('❌ [DEBUG] Erro ao executar renderRecorrentes moderno:', e);
              // Fallback para função legada
              if (typeof window._renderRecorrentes === 'function') {
                window._renderRecorrentes();
                console.log('✅ [DEBUG] window._renderRecorrentes executado como fallback');
              } else {
                console.warn('⚠️ [DEBUG] Nenhuma função de renderização encontrada');
              }
            }
          } else if (window.location.hash.includes('/dashboard')) {
            try { typeof window.renderDashboard === 'function' && window.renderDashboard(); } catch {}
          } else if (window.location.hash.includes('/transactions')) {
            try { typeof window.renderTransactions === 'function' && window.renderTransactions(); } catch {}
          }

          // Disparar evento para sincronização
          document.dispatchEvent(new CustomEvent('recorrente-adicionada', {
            detail: {
              isEdicao,
              dados: dadosForm,
              timestamp: Date.now()
            }
          }));
          document.dispatchEvent(new CustomEvent('dados-atualizados', {
            detail: {
              tipo: 'recorrente',
              acao: isEdicao ? 'editar' : 'criar',
              timestamp: Date.now()
            }
          }));
          
          // 🚨 FORÇAR ATUALIZAÇÃO ADICIONAL se ainda estiver na página de recorrentes
          setTimeout(async () => {
            if (window.location.hash.includes('/recorrentes')) {
              console.log('🔄 [ATUALIZAÇÃO-FINAL] Forçando atualização final da página de recorrentes...');
              try {
                const { renderRecorrentes } = await import('@features/recorrentes/RecorrentesPage.js');
                await renderRecorrentes();
                console.log('✅ [ATUALIZAÇÃO-FINAL] Página de recorrentes atualizada com sucesso!');
              } catch (e) {
                console.error('❌ [ATUALIZAÇÃO-FINAL] Erro na atualização final:', e);
              }
            }
          }, 500);
        }, 100);
      } catch (err) {
        // Mostrar FAB novamente em caso de erro
        document.querySelector('.fab')?.classList.remove('hidden');
        console.error('❌🚨🚨🚨 [CALLBACK-SHOWADDRECORRENTE] ERRO NO CALLBACK:', err);
        console.error('❌🚨🚨🚨 [CALLBACK-SHOWADDRECORRENTE] Stack do erro:', err.stack);
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

// Função para editar recorrente
window.editRecorrente = async function (recorrenteId) {
  try {
    const recorrente = window.appState.recorrentes?.find(r => r.id === recorrenteId);
    if (!recorrente) {
      Snackbar({ message: 'Recorrente não encontrada', type: 'error' });
      return;
    }
    window.showAddRecorrenteModal(recorrente);
  } catch (err) {
    console.error('Erro ao editar recorrente:', err);
    Snackbar({ message: 'Erro ao editar recorrente', type: 'error' });
  }
};

// Função para excluir recorrente
window.deleteRecorrente = async function (recorrenteId) {
  try {
    const recorrente = window.appState.recorrentes?.find(r => r.id === recorrenteId);
    if (!recorrente) {
      Snackbar({ message: 'Recorrente não encontrada', type: 'error' });
      return;
    }

    const confirmar = confirm(`Deseja realmente excluir a recorrente "${recorrente.descricao || recorrente.nome}"?`);
    if (!confirmar) return;

    const user = window.appState.currentUser;
    if (!user) {
      Snackbar({ message: 'Você precisa estar logado', type: 'error' });
      return;
    }

    const { deleteDespesaRecorrente } = await import('./recorrentes.js');
    await deleteDespesaRecorrente(user.uid, recorrenteId);
    
    Snackbar({ message: 'Recorrente excluída com sucesso!', type: 'success' });
  } catch (err) {
    console.error('Erro ao excluir recorrente:', err);
    Snackbar({ message: 'Erro ao excluir recorrente', type: 'error' });
  }
};

// Função para mostrar histórico da recorrente
window.showHistoricoRecorrente = async function (recorrenteId) {
  console.log('🚀 [Histórico] FUNÇÃO CHAMADA! ID:', recorrenteId);
  console.log('🚀 [Histórico] Tipo de recorrenteId:', typeof recorrenteId);
  console.log('🚀 [Histórico] window.appState existe?', !!window.appState);
  
  try {
    console.log('📊 [Histórico] Iniciando... ID:', recorrenteId);
    console.log('📊 [Histórico] window.appState:', window.appState);
    console.log('📊 [Histórico] Recorrentes:', window.appState.recorrentes);
    
    const recorrente = window.appState.recorrentes?.find(r => r.id === recorrenteId);
    console.log('📊 [Histórico] Recorrente encontrada:', recorrente);
    
    if (!recorrente) {
      console.error('❌ [Histórico] Recorrente não encontrada!');
      Snackbar({ message: 'Recorrente não encontrada', type: 'error' });
      return;
    }

    // Buscar todas as transações relacionadas a esta recorrente
    const transacoes = (window.appState.transactions || []).filter(t => t.recorrenteId === recorrenteId);
    console.log('📊 [Histórico] Transações encontradas:', transacoes.length);
    
    // Ordenar por data (mais recente primeiro)
    transacoes.sort((a, b) => {
      const dataA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
      const dataB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
      return dataB - dataA;
    });

    console.log('📊 [Histórico] Criando modal...');
    // Criar modal de histórico
    const modal = Modal({
      title: `📊 Histórico: ${recorrente.descricao || recorrente.nome}`,
      content: '',
      onClose: () => modal.remove()
    });
    console.log('📊 [Histórico] Modal criado:', modal);

    const body = modal.querySelector('.modal-body');
    
    if (transacoes.length === 0) {
      body.innerHTML = `
        <div class="text-center py-12">
          <div class="text-6xl mb-4">📭</div>
          <p class="text-gray-600 dark:text-gray-400 text-lg">Nenhuma transação encontrada para esta recorrente</p>
          <p class="text-sm text-gray-500 dark:text-gray-500 mt-2">As transações aparecerão aqui quando forem efetivadas</p>
        </div>
      `;
    } else {
      const formatarData = (data) => {
        const d = data?.toDate ? data.toDate() : new Date(data);
        return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
      };

      const formatarValor = (valor) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
      };

      const linhas = transacoes.map(t => {
        const data = formatarData(t.createdAt);
        const valor = formatarValor(t.valor || 0);
        const tipo = t.tipo === 'receita' ? '💰' : '💸';
        const cor = t.tipo === 'receita' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
        
        return `
          <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <div class="flex items-center gap-3">
              <span class="text-2xl">${tipo}</span>
              <div>
                <div class="font-semibold text-gray-900 dark:text-gray-100">${t.descricao || 'Sem descrição'}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">${data}</div>
              </div>
            </div>
            <div class="text-right">
              <div class="font-bold ${cor} text-lg">${valor}</div>
              ${t.parcela ? `<div class="text-xs text-gray-500 dark:text-gray-400">Parcela ${t.parcela}</div>` : ''}
            </div>
          </div>
        `;
      }).join('');

      body.innerHTML = `
        <div class="space-y-3 max-h-96 overflow-y-auto">
          <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-4">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Total de transações</div>
                <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">${transacoes.length}</div>
              </div>
              <div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Valor total</div>
                <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">${formatarValor(transacoes.reduce((sum, t) => sum + (t.valor || 0), 0))}</div>
              </div>
            </div>
          </div>
          ${linhas}
        </div>
      `;
    }

    console.log('📊 [Histórico] Adicionando modal ao body...');
    document.body.appendChild(modal);
    console.log('✅ [Histórico] Modal adicionado com sucesso!');
  } catch (err) {
    console.error('❌ [Histórico] Erro ao mostrar histórico:', err);
    console.error('❌ [Histórico] Stack:', err.stack);
    Snackbar({ message: 'Erro ao carregar histórico', type: 'error' });
  }
};

// NOTA: Função window.efetivarRecorrentesMesAtual removida daqui para evitar duplicação
// A implementação oficial está em RecorrentesPage.js
