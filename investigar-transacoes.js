// Script para investigar todas as transações e verificar se a recorrente foi aplicada
console.log('🔍 INVESTIGAÇÃO: Verificando todas as transações...');

// Função para investigar todas as transações
async function investigarTransacoes() {
  try {
    const user = window.FirebaseAuth?.currentUser;
    if (!user) {
      console.error('❌ Usuário não autenticado');
      return;
    }

    console.log('🔍 Iniciando investigação completa...');
    
    // 1. Verificar transações no appState
    const transacoesAppState = window.appState.transactions || [];
    console.log('📊 Transações no appState:', transacoesAppState.length);
    
    if (transacoesAppState.length > 0) {
      console.log('🔍 Primeiras 5 transações no appState:');
      transacoesAppState.slice(0, 5).forEach((t, index) => {
        console.log(`  ${index + 1}. ${t.descricao} - R$ ${t.valor} - RecorrenteId: ${t.recorrenteId || 'N/A'} - BudgetId: ${t.budgetId}`);
      });
    }

    // 2. Verificar transações diretamente no Firestore
    const { collection, getDocs, query, where } = await import('firebase/firestore');
    const { db } = await import('./src/js/firebase.js');
    
    console.log('🔍 Buscando TODAS as transações no Firestore...');
    
    const refAtual = collection(db, 'transactions');
    const snapAtual = await getDocs(
      query(
        refAtual,
        where('userId', '==', user.uid)
      )
    );
    
    console.log('📊 Total de transações no Firestore:', snapAtual.docs.length);
    
    if (snapAtual.docs.length > 0) {
      console.log('🔍 Primeiras 10 transações no Firestore:');
      snapAtual.docs.slice(0, 10).forEach((doc, index) => {
        const data = doc.data();
        console.log(`  ${index + 1}. ${data.descricao} - R$ ${data.valor} - RecorrenteId: ${data.recorrenteId || 'N/A'} - BudgetId: ${data.budgetId} - ID: ${doc.id}`);
      });
    }

    // 3. Verificar se há transações com "Fralda" no nome
    console.log('🔍 Buscando transações com "Fralda" no nome...');
    const transacoesFralda = snapAtual.docs.filter(doc => {
      const data = doc.data();
      return data.descricao && data.descricao.toLowerCase().includes('fralda');
    });
    
    console.log('📊 Transações com "Fralda" no nome:', transacoesFralda.length);
    transacoesFralda.forEach((doc, index) => {
      const data = doc.data();
      console.log(`  ${index + 1}. ${data.descricao} - R$ ${data.valor} - RecorrenteId: ${data.recorrenteId || 'N/A'} - BudgetId: ${data.budgetId} - ID: ${doc.id}`);
    });

    // 4. Verificar recorrentes
    const recorrentes = window.appState.recorrentes || [];
    console.log('📊 Recorrentes disponíveis:', recorrentes.length);
    recorrentes.forEach((rec, index) => {
      console.log(`  ${index + 1}. ${rec.descricao} (ID: ${rec.id}) - Ativa: ${rec.ativa} - Valor: R$ ${rec.valor}`);
    });

    // 5. Verificar se a recorrente "Fralda" foi aplicada recentemente
    const recorrenteFralda = recorrentes.find(r => r.descricao.toLowerCase().includes('fralda'));
    if (recorrenteFralda) {
      console.log('🔍 Recorrente Fralda encontrada:', {
        id: recorrenteFralda.id,
        descricao: recorrenteFralda.descricao,
        valor: recorrenteFralda.valor,
        ativa: recorrenteFralda.ativa,
        dataInicio: recorrenteFralda.dataInicio,
        diaLancamento: recorrenteFralda.diaLancamento
      });
      
      // Verificar se deveria ter sido aplicada
      const agora = new Date();
      const mesAtual = agora.getMonth() + 1;
      const anoAtual = agora.getFullYear();
      
      console.log('📅 Verificando se deveria ter sido aplicada:', {
        mesAtual,
        anoAtual,
        dataInicio: recorrenteFralda.dataInicio,
        diaLancamento: recorrenteFralda.diaLancamento
      });
    }

    // 6. Verificar budget atual
    const budgetAtual = window.appState.currentBudget;
    console.log('💰 Budget atual:', {
      id: budgetAtual?.id,
      nome: budgetAtual?.nome,
      mes: budgetAtual?.mes,
      ano: budgetAtual?.ano
    });

    // 7. Verificar se há transações com o budgetId atual
    const transacoesBudgetAtual = snapAtual.docs.filter(doc => {
      const data = doc.data();
      return data.budgetId === budgetAtual?.id;
    });
    
    console.log('📊 Transações com budgetId atual:', transacoesBudgetAtual.length);
    if (transacoesBudgetAtual.length > 0) {
      console.log('🔍 Primeiras 5 transações do budget atual:');
      transacoesBudgetAtual.slice(0, 5).forEach((doc, index) => {
        const data = doc.data();
        console.log(`  ${index + 1}. ${data.descricao} - R$ ${data.valor} - RecorrenteId: ${data.recorrenteId || 'N/A'} - ID: ${doc.id}`);
      });
    }

    console.log('✅ Investigação concluída!');

  } catch (error) {
    console.error('❌ Erro na investigação:', error);
  }
}

// Função para verificar se uma recorrente específica foi aplicada
async function verificarRecorrenteAplicada(recorrenteId) {
  try {
    console.log('🔍 Verificando se recorrente foi aplicada:', recorrenteId);
    
    const user = window.FirebaseAuth?.currentUser;
    if (!user) {
      console.error('❌ Usuário não autenticado');
      return;
    }

    const { collection, getDocs, query, where } = await import('firebase/firestore');
    const { db } = await import('./src/js/firebase.js');
    
    // Buscar transações desta recorrente
    const refAtual = collection(db, 'transactions');
    const snapAtual = await getDocs(
      query(
        refAtual,
        where('userId', '==', user.uid),
        where('recorrenteId', '==', recorrenteId)
      )
    );
    
    console.log('📊 Transações encontradas para esta recorrente:', snapAtual.docs.length);
    snapAtual.docs.forEach((doc, index) => {
      const data = doc.data();
      console.log(`  ${index + 1}. ${data.descricao} - R$ ${data.valor} - BudgetId: ${data.budgetId} - ID: ${doc.id} - Data: ${data.createdAt?.toDate?.() || data.createdAt}`);
    });

  } catch (error) {
    console.error('❌ Erro ao verificar recorrente:', error);
  }
}

// Expor funções globalmente
window.investigarTransacoes = investigarTransacoes;
window.verificarRecorrenteAplicada = verificarRecorrenteAplicada;

console.log('✅ Script de investigação carregado!');
console.log('📝 Comandos disponíveis:');
console.log('  - window.investigarTransacoes() - Investiga todas as transações');
console.log('  - window.verificarRecorrenteAplicada("ID_DA_RECORRENTE") - Verifica uma recorrente específica'); 