/**
 * Script para executar no console do navegador
 * Remove recorrências com descrição 'undefined' ou vazias
 * Versão final adaptada para a estrutura do appState
 */

(async function() {
  console.log('🔧 Iniciando correção de recorrência "undefined"...');
  
  // Verificar se temos acesso ao appState
  if (!window.appState) {
    console.log('❌ window.appState não encontrado');
    return;
  }
  
  // Verificar usuário via appState.currentUser
  let user = null;
  let userId = null;
  
  if (window.appState.currentUser?.uid) {
    user = window.appState.currentUser;
    userId = user.uid;
    console.log('✅ Usuário encontrado via appState.currentUser');
  } else {
    console.log('❌ Usuário não encontrado no appState.currentUser');
    console.log('🔍 Estrutura do appState:', Object.keys(window.appState));
    return;
  }
  
  console.log(`👤 Usuário ID: ${userId}`);
  
  // Verificar recorrentes via appState
  let recorrentes = [];
  
  if (window.appState.recorrentes && Array.isArray(window.appState.recorrentes)) {
    recorrentes = window.appState.recorrentes;
    console.log('✅ Recorrentes encontradas via appState');
  } else {
    console.log('❌ Recorrentes não encontradas no appState');
    console.log('🔍 Chaves disponíveis:', Object.keys(window.appState));
    return;
  }
  
  if (recorrentes.length === 0) {
    console.log('❌ Nenhuma recorrente encontrada');
    return;
  }
  
  console.log(`📋 Verificando ${recorrentes.length} recorrentes...`);
  
  // Encontrar recorrentes problemáticas
  const problematicas = recorrentes.filter(rec => {
    return !rec.descricao || 
           rec.descricao === 'undefined' || 
           rec.descricao.trim() === '' ||
           rec.descricao === 'null';
  });
  
  if (problematicas.length === 0) {
    console.log('✅ Nenhuma recorrência "undefined" encontrada!');
    console.log('📋 Recorrentes válidas:');
    recorrentes.forEach((rec, index) => {
      console.log(`  ${index + 1}. "${rec.descricao}" - R$ ${rec.valor}`);
    });
    return;
  }
  
  console.log(`🚨 Encontradas ${problematicas.length} recorrências problemáticas:`);
  problematicas.forEach((rec, index) => {
    console.log(`  ${index + 1}. "${rec.descricao}" - Valor: R$ ${rec.valor} - ID: ${rec.id}`);
  });
  
  // Confirmar remoção
  const confirmar = confirm(`Encontradas ${problematicas.length} recorrências com descrição inválida.\n\nDeseja removê-las?\n\nEsta ação é irreversível!`);
  
  if (!confirmar) {
    console.log('❌ Operação cancelada pelo usuário');
    return;
  }
  
  // Tentar encontrar o Firestore de diferentes formas
  let db = null;
  
  // Verificação 1: window.firebase
  if (window.firebase?.firestore) {
    db = window.firebase.firestore();
    console.log('✅ Firestore encontrado via window.firebase');
  }
  // Verificação 2: window.db
  else if (window.db) {
    db = window.db;
    console.log('✅ Firestore encontrado via window.db');
  }
  // Verificação 3: Tentar importar
  else {
    try {
      const firebaseModule = await import('./src/js/firebase.js');
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
    console.log('🔍 Variáveis disponíveis:', {
      'window.firebase': !!window.firebase,
      'window.db': !!window.db,
      'window.firestore': !!window.firestore
    });
    return;
  }
  
  // Remover recorrências problemáticas
  let removidas = 0;
  
  for (const rec of problematicas) {
    try {
      if (rec.id) {
        await db.collection('users')
          .doc(userId)
          .collection('recorrentes')
          .doc(rec.id)
          .delete();
        
        console.log(`✅ Removida: "${rec.descricao}" (ID: ${rec.id})`);
        removidas++;
      } else {
        console.log(`⚠️ Recorrente sem ID: "${rec.descricao}"`);
      }
    } catch (error) {
      console.error(`❌ Erro ao remover "${rec.descricao}":`, error);
    }
  }
  
  console.log(`\n📊 Resultado: ${removidas} recorrências removidas`);
  
  if (removidas > 0) {
    console.log('🔄 Recarregando dados...');
    
    // Múltiplas tentativas de recarregar
    try {
      if (window.loadUserData) {
        await window.loadUserData();
        console.log('✅ Dados recarregados via loadUserData!');
      } else if (window.loadRecorrentes) {
        await window.loadRecorrentes();
        console.log('✅ Recorrentes recarregadas!');
      } else {
        console.log('🔄 Recarregando página...');
        window.location.reload();
      }
    } catch (error) {
      console.error('❌ Erro ao recarregar dados:', error);
      console.log('🔄 Recarregando página...');
      window.location.reload();
    }
  }
  
  console.log('🎉 Correção concluída!');
})();

// Função adicional para debug
window.debugRecorrentes = function() {
  console.log('🔍 === DEBUG RECORRENTES ===');
  console.log('window.appState:', window.appState);
  console.log('window.firebase:', window.firebase);
  console.log('window.db:', window.db);
  console.log('window.firestore:', window.firestore);
  console.log('localStorage user:', localStorage.getItem('user'));
  
  if (window.appState) {
    console.log('\n📋 Estrutura do appState:');
    Object.keys(window.appState).forEach(key => {
      console.log(`  ${key}:`, typeof window.appState[key], Array.isArray(window.appState[key]) ? `(${window.appState[key].length} items)` : '');
    });
    
    if (window.appState.recorrentes) {
      console.log('\n🔄 Recorrentes encontradas:');
      window.appState.recorrentes.forEach((rec, index) => {
        console.log(`  ${index + 1}. "${rec.descricao}" - R$ ${rec.valor} - ID: ${rec.id}`);
      });
    }
  }
};

// Função para tentar diferentes métodos de acesso ao Firestore
window.testFirestore = function() {
  console.log('🔥 === TESTE FIRESTORE ===');
  console.log('window.firebase:', window.firebase);
  console.log('window.db:', window.db);
  console.log('window.firestore:', window.firestore);
  
  if (window.firebase) {
    try {
      const db = window.firebase.firestore();
      console.log('✅ Firestore via firebase.firestore():', db);
    } catch (e) {
      console.log('❌ Erro ao acessar firebase.firestore():', e);
    }
  }
};