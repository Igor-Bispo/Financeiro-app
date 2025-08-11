// Script para limpar todas as despesas e categorias
// Execute este script no console do navegador (F12)

console.log('🧹 Iniciando limpeza de dados...');

async function limparTodosOsDados() {
  try {
    // Verificar se o usuário está logado
    if (!window.appState?.currentUser) {
      console.error('❌ Usuário não está logado!');
      return;
    }

    const budgetId = window.appState.currentBudget?.id;
    if (!budgetId) {
      console.error('❌ Nenhum orçamento selecionado!');
      return;
    }

    console.log('🔍 Budget ID:', budgetId);
    console.log('👤 User ID:', window.appState.currentUser);

    // Importar funções do Firebase
    const { 
      collection, 
      query, 
      where, 
      getDocs, 
      deleteDoc, 
      doc,
      writeBatch 
    } = await import('firebase/firestore');

    const { db } = await import('./src/js/firebase.js');

    // Criar batch para operações em lote
    const batch = writeBatch(db);
    let totalDeletados = 0;

    // 1. Limpar todas as transações
    console.log('🗑️ Limpando transações...');
    const transacoesQuery = query(
      collection(db, 'transactions'),
      where('budgetId', '==', budgetId)
    );
    const transacoesSnapshot = await getDocs(transacoesQuery);
    
    transacoesSnapshot.forEach((docSnapshot) => {
      batch.delete(doc(db, 'transactions', docSnapshot.id));
      totalDeletados++;
    });
    console.log(`✅ ${transacoesSnapshot.size} transações marcadas para exclusão`);

    // 2. Limpar todas as categorias
    console.log('🗑️ Limpando categorias...');
    const categoriasQuery = query(
      collection(db, 'categories'),
      where('budgetId', '==', budgetId)
    );
    const categoriasSnapshot = await getDocs(categoriasQuery);
    
    categoriasSnapshot.forEach((docSnapshot) => {
      batch.delete(doc(db, 'categories', docSnapshot.id));
      totalDeletados++;
    });
    console.log(`✅ ${categoriasSnapshot.size} categorias marcadas para exclusão`);

    // 3. Limpar todos os recorrentes
    console.log('🗑️ Limpando recorrentes...');
    const recorrentesQuery = query(
      collection(db, 'recorrentes'),
      where('budgetId', '==', budgetId)
    );
    const recorrentesSnapshot = await getDocs(recorrentesQuery);
    
    recorrentesSnapshot.forEach((docSnapshot) => {
      batch.delete(doc(db, 'recorrentes', docSnapshot.id));
      totalDeletados++;
    });
    console.log(`✅ ${recorrentesSnapshot.size} recorrentes marcados para exclusão`);

    // 4. Limpar logs de aplicação
    console.log('🗑️ Limpando logs de aplicação...');
    const logsQuery = query(
      collection(db, 'logAplicacoes'),
      where('userId', '==', window.appState.currentUser)
    );
    const logsSnapshot = await getDocs(logsQuery);
    
    logsSnapshot.forEach((docSnapshot) => {
      batch.delete(doc(db, 'logAplicacoes', docSnapshot.id));
      totalDeletados++;
    });
    console.log(`✅ ${logsSnapshot.size} logs marcados para exclusão`);

    // Executar todas as exclusões
    console.log('🚀 Executando exclusões em lote...');
    await batch.commit();

    console.log(`🎉 Limpeza concluída! ${totalDeletados} itens foram excluídos.`);
    console.log('🔄 Recarregando a página...');

    // Recarregar a página após 2 segundos
    setTimeout(() => {
      window.location.reload();
    }, 2000);

  } catch (error) {
    console.error('❌ Erro durante a limpeza:', error);
    alert('Erro durante a limpeza: ' + error.message);
  }
}

// Função para confirmar antes de limpar
function confirmarLimpeza() {
  const confirmacao = confirm(
    '⚠️ ATENÇÃO! Esta ação irá:\n\n' +
    '• Apagar TODAS as transações\n' +
    '• Apagar TODAS as categorias\n' +
    '• Apagar TODOS os recorrentes\n' +
    '• Apagar TODOS os logs\n\n' +
    'Esta ação NÃO pode ser desfeita!\n\n' +
    'Tem certeza que deseja continuar?'
  );

  if (confirmacao) {
    const segundaConfirmacao = confirm(
      '🔴 ÚLTIMA CHANCE!\n\n' +
      'Você está prestes a apagar TODOS os dados do orçamento atual.\n' +
      'Esta ação é IRREVERSÍVEL!\n\n' +
      'Digite "CONFIRMO" para continuar:'
    );

    if (segundaConfirmacao) {
      limparTodosOsDados();
    } else {
      console.log('❌ Limpeza cancelada pelo usuário.');
    }
  } else {
    console.log('❌ Limpeza cancelada pelo usuário.');
  }
}

// Executar a função de confirmação
confirmarLimpeza(); 