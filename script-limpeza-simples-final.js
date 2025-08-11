// Script para limpar todas as despesas e categorias
// Copie e cole este código no console do navegador (F12)

console.log('🧹 Script de limpeza iniciado...');

// Função para limpar dados
async function limparDados() {
  try {
    // Verificar se está logado
    if (!window.appState?.currentUser) {
      alert('❌ Você precisa estar logado!');
      return;
    }

    const budgetId = window.appState.currentBudget?.id;
    if (!budgetId) {
      alert('❌ Nenhum orçamento selecionado!');
      return;
    }

    console.log('🔍 Budget ID:', budgetId);
    console.log('👤 User ID:', window.appState.currentUser);

    // Confirmar ação
    const confirmacao = confirm(
      '⚠️ ATENÇÃO!\n\n' +
      'Esta ação irá apagar:\n' +
      '• TODAS as transações\n' +
      '• TODAS as categorias\n' +
      '• TODOS os recorrentes\n\n' +
      'Esta ação é IRREVERSÍVEL!\n\n' +
      'Tem certeza que deseja continuar?'
    );

    if (!confirmacao) {
      console.log('❌ Limpeza cancelada pelo usuário.');
      return;
    }

    // Segunda confirmação
    const segundaConfirmacao = confirm(
      '🔴 ÚLTIMA CHANCE!\n\n' +
      'Você está prestes a apagar TODOS os dados.\n' +
      'Esta ação NÃO pode ser desfeita!\n\n' +
      'Clique OK para confirmar:'
    );

    if (!segundaConfirmacao) {
      console.log('❌ Limpeza cancelada pelo usuário.');
      return;
    }

    console.log('🚀 Iniciando limpeza...');

    let totalDeletados = 0;

    // 1. Limpar transações usando a função do app
    console.log('🗑️ Limpando transações...');
    const transacoes = window.appState.transactions || [];
    console.log(`📋 Encontradas ${transacoes.length} transações`);
    
    for (const transacao of transacoes) {
      try {
        await deleteTransaction(transacao.id);
        totalDeletados++;
        console.log(`✅ Transação ${transacao.id} deletada`);
      } catch (error) {
        console.log(`❌ Erro ao deletar transação ${transacao.id}:`, error);
      }
    }

    // 2. Limpar categorias usando a função do app
    console.log('🗑️ Limpando categorias...');
    const categorias = window.appState.categories || [];
    console.log(`📋 Encontradas ${categorias.length} categorias`);
    
    for (const categoria of categorias) {
      try {
        await deleteCategory(categoria.id);
        totalDeletados++;
        console.log(`✅ Categoria ${categoria.id} deletada`);
      } catch (error) {
        console.log(`❌ Erro ao deletar categoria ${categoria.id}:`, error);
      }
    }

    // 3. Limpar recorrentes
    console.log('🗑️ Limpando recorrentes...');
    const recorrentes = window.appState.recorrentes || [];
    console.log(`📋 Encontrados ${recorrentes.length} recorrentes`);
    
    for (const recorrente of recorrentes) {
      try {
        // Tentar usar a função de delete de recorrentes se disponível
        if (typeof deleteRecorrente === 'function') {
          await deleteRecorrente(recorrente.id);
        } else {
          // Deletar manualmente usando Firebase
          const { deleteDoc, doc } = await import('firebase/firestore');
          const { db } = await import('./src/js/firebase.js');
          await deleteDoc(doc(db, 'recorrentes', recorrente.id));
        }
        totalDeletados++;
        console.log(`✅ Recorrente ${recorrente.id} deletado`);
      } catch (error) {
        console.log(`❌ Erro ao deletar recorrente ${recorrente.id}:`, error);
      }
    }

    console.log(`🎉 Limpeza concluída! ${totalDeletados} itens foram processados.`);
    alert(`🎉 Limpeza concluída!\n\n${totalDeletados} itens foram processados.\n\nA página será recarregada.`);

    // Recarregar a página
    setTimeout(() => {
      window.location.reload();
    }, 2000);

  } catch (error) {
    console.error('❌ Erro durante a limpeza:', error);
    alert('❌ Erro durante a limpeza: ' + error.message);
  }
}

// Executar a função
limparDados(); 