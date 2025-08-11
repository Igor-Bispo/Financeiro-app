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
      '• TODOS os recorrentes\n' +
      '• TODOS os logs\n\n' +
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

    // Usar as funções já disponíveis no app
    const { db } = await import('./src/js/firebase.js');
    const { collection, query, where, getDocs, deleteDoc, doc, writeBatch } = await import('firebase/firestore');

    const batch = writeBatch(db);
    let totalDeletados = 0;

    // 1. Limpar transações
    console.log('🗑️ Limpando transações...');
    const transacoesQuery = query(collection(db, 'transactions'), where('budgetId', '==', budgetId));
    const transacoesSnapshot = await getDocs(transacoesQuery);
    
    transacoesSnapshot.forEach((docSnapshot) => {
      batch.delete(doc(db, 'transactions', docSnapshot.id));
      totalDeletados++;
    });
    console.log(`✅ ${transacoesSnapshot.size} transações marcadas para exclusão`);

    // 2. Limpar categorias
    console.log('🗑️ Limpando categorias...');
    const categoriasQuery = query(collection(db, 'categories'), where('budgetId', '==', budgetId));
    const categoriasSnapshot = await getDocs(categoriasQuery);
    
    categoriasSnapshot.forEach((docSnapshot) => {
      batch.delete(doc(db, 'categories', docSnapshot.id));
      totalDeletados++;
    });
    console.log(`✅ ${categoriasSnapshot.size} categorias marcadas para exclusão`);

    // 3. Limpar recorrentes
    console.log('🗑️ Limpando recorrentes...');
    const recorrentesQuery = query(collection(db, 'recorrentes'), where('budgetId', '==', budgetId));
    const recorrentesSnapshot = await getDocs(recorrentesQuery);
    
    recorrentesSnapshot.forEach((docSnapshot) => {
      batch.delete(doc(db, 'recorrentes', docSnapshot.id));
      totalDeletados++;
    });
    console.log(`✅ ${recorrentesSnapshot.size} recorrentes marcados para exclusão`);

    // 4. Limpar logs
    console.log('🗑️ Limpando logs...');
    const logsQuery = query(collection(db, 'logAplicacoes'), where('userId', '==', window.appState.currentUser));
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
    alert(`🎉 Limpeza concluída!\n\n${totalDeletados} itens foram excluídos.\n\nA página será recarregada.`);

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