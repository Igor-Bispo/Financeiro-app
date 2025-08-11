// Script para limpar todas as despesas e categorias
// Copie e cole este código no console do navegador (F12)

(async function limparDados() {
  try {
    console.log('🧹 Iniciando limpeza de dados...');
    
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

    // Importar Firebase
    const { collection, query, where, getDocs, deleteDoc, doc, writeBatch } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
    const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
    
    // Configuração do Firebase (substitua pelos seus dados)
    const firebaseConfig = {
      apiKey: "AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      authDomain: "financas-app-819a8.firebaseapp.com",
      projectId: "financas-app-819a8",
      storageBucket: "financas-app-819a8.appspot.com",
      messagingSenderId: "123456789",
      appId: "1:123456789:web:abcdef123456"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // Criar batch para operações em lote
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

    // Executar exclusões
    console.log('🚀 Executando exclusões em lote...');
    await batch.commit();

    console.log(`🎉 Limpeza concluída! ${totalDeletados} itens foram excluídos.`);
    console.log('🔄 Recarregando a página...');

    setTimeout(() => {
      window.location.reload();
    }, 2000);

  } catch (error) {
    console.error('❌ Erro durante a limpeza:', error);
    alert('Erro durante a limpeza: ' + error.message);
  }
})(); 