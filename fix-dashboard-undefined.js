/**
 * Script para corrigir o problema da recorrência "undefined" no dashboard
 * O problema está na seção "Despesas Recorrentes do Mês" onde transações
 * com recorrenteId órfão (sem recorrência correspondente) aparecem como "undefined"
 */

(async function() {
  console.log('🔧 Iniciando correção da recorrência "undefined" no dashboard...');
  
  // Verificar se temos acesso ao appState
  if (!window.appState) {
    console.log('❌ window.appState não encontrado');
    return;
  }
  
  const user = window.appState.currentUser;
  const transacoes = window.appState.transactions || [];
  const recorrentes = window.appState.recorrentes || [];
  
  if (!user) {
    console.log('❌ Usuário não encontrado');
    return;
  }
  
  console.log(`📊 Analisando ${transacoes.length} transações e ${recorrentes.length} recorrentes...`);
  
  // Encontrar transações com recorrenteId órfão
  const transacoesOrfas = transacoes.filter(t => {
    if (!t.recorrenteId) return false;
    
    // Verificar se existe uma recorrência correspondente
    const recorrenteExiste = recorrentes.some(r => r.id === t.recorrenteId);
    return !recorrenteExiste;
  });
  
  console.log(`🚨 Encontradas ${transacoesOrfas.length} transações órfãs (com recorrenteId sem recorrência correspondente):`);
  
  transacoesOrfas.forEach((t, index) => {
    console.log(`  ${index + 1}. "${t.descricao}" - recorrenteId: ${t.recorrenteId} - ID: ${t.id}`);
  });
  
  if (transacoesOrfas.length === 0) {
    console.log('✅ Nenhuma transação órfã encontrada!');
    return;
  }
  
  // Confirmar correção
  const confirmar = confirm(
    `Encontradas ${transacoesOrfas.length} transações com recorrenteId órfão.\n\n` +
    `Essas transações estão causando a exibição de "undefined" no dashboard.\n\n` +
    `Deseja remover o recorrenteId dessas transações?\n\n` +
    `(Isso manterá as transações, mas elas não aparecerão mais como recorrentes)`
  );
  
  if (!confirmar) {
    console.log('❌ Operação cancelada pelo usuário');
    return;
  }
  
  // Tentar encontrar o Firestore
  let db = null;
  
  if (window.firebase?.firestore) {
    db = window.firebase.firestore();
    console.log('✅ Firestore encontrado via window.firebase');
  } else if (window.db) {
    db = window.db;
    console.log('✅ Firestore encontrado via window.db');
  } else {
    try {
      // Tentar diferentes caminhos para o firebase.js
      let firebaseModule;
      try {
        firebaseModule = await import('./src/js/firebase.js');
      } catch {
        try {
          firebaseModule = await import('/src/js/firebase.js');
        } catch {
          firebaseModule = await import('src/js/firebase.js');
        }
      }
      
      if (firebaseModule.db) {
        db = firebaseModule.db;
        console.log('✅ Firestore encontrado via import');
      }
    } catch (error) {
      console.log('⚠️ Erro ao importar firebase:', error);
    }
  }
  
  if (!db) {
    console.log('❌ Firestore não disponível');
    return;
  }
  
  // Corrigir transações órfãs
  let corrigidas = 0;
  
  for (const transacao of transacoesOrfas) {
    try {
      // Remover o recorrenteId da transação
      const updateData = {
        recorrenteId: null,
        recorrenteNome: null,
        parcelaAtual: null,
        parcelasTotal: null
      };
      
      // Usar sintaxe do Firebase v9+ (modular)
      const { doc, updateDoc } = await import('firebase/firestore');
      await updateDoc(doc(db, 'transactions', transacao.id), updateData);
      
      console.log(`✅ Corrigida: "${transacao.descricao}" (ID: ${transacao.id})`);
      corrigidas++;
      
      // Atualizar também no appState local
      const transacaoLocal = window.appState.transactions.find(t => t.id === transacao.id);
      if (transacaoLocal) {
        transacaoLocal.recorrenteId = null;
        transacaoLocal.recorrenteNome = null;
        transacaoLocal.parcelaAtual = null;
        transacaoLocal.parcelasTotal = null;
      }
      
    } catch (error) {
      console.error(`❌ Erro ao corrigir "${transacao.descricao}":`, error);
    }
  }
  
  console.log(`\n📊 Resultado: ${corrigidas} transações corrigidas`);
  
  if (corrigidas > 0) {
    console.log('🔄 Recarregando dashboard...');
    
    // Recarregar o dashboard
    try {
      if (window.renderDashboard) {
        await window.renderDashboard();
        console.log('✅ Dashboard recarregado!');
      } else {
        console.log('🔄 Recarregando página...');
        window.location.reload();
      }
    } catch (error) {
      console.error('❌ Erro ao recarregar dashboard:', error);
      console.log('🔄 Recarregando página...');
      window.location.reload();
    }
  }
  
  console.log('🎉 Correção concluída!');
})();

// Função adicional para debug
window.debugTransacoesOrfas = function() {
  console.log('🔍 === DEBUG TRANSAÇÕES ÓRFÃS ===');
  
  const transacoes = window.appState.transactions || [];
  const recorrentes = window.appState.recorrentes || [];
  
  console.log(`📊 Total de transações: ${transacoes.length}`);
  console.log(`📊 Total de recorrentes: ${recorrentes.length}`);
  
  // Transações com recorrenteId
  const transacoesComRecorrente = transacoes.filter(t => t.recorrenteId);
  console.log(`📊 Transações com recorrenteId: ${transacoesComRecorrente.length}`);
  
  // Transações órfãs
  const transacoesOrfas = transacoes.filter(t => {
    if (!t.recorrenteId) return false;
    const recorrenteExiste = recorrentes.some(r => r.id === t.recorrenteId);
    return !recorrenteExiste;
  });
  
  console.log(`🚨 Transações órfãs: ${transacoesOrfas.length}`);
  
  transacoesOrfas.forEach((t, index) => {
    console.log(`  ${index + 1}. "${t.descricao}" - recorrenteId: ${t.recorrenteId}`);
  });
  
  // IDs de recorrentes existentes
  console.log('\n📋 IDs de recorrentes existentes:');
  recorrentes.forEach((r, index) => {
    console.log(`  ${index + 1}. ${r.id} - "${r.descricao}"`);
  });
};

console.log('\n💡 Para debug, execute: debugTransacoesOrfas()');