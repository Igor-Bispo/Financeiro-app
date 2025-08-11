// Script para debugar o histórico de recorrentes
console.log('🔍 DEBUG: Iniciando verificação do histórico de recorrentes...');

// Função para verificar transações de uma recorrente específica
async function debugHistoricoRecorrente(recorrenteId) {
  try {
    const user = window.FirebaseAuth?.currentUser;
    if (!user) {
      console.error('❌ Usuário não autenticado');
      return;
    }

    console.log('🔍 Verificando recorrente ID:', recorrenteId);
    
    // 1. Verificar se a recorrente existe
    const recorrente = window.appState.recorrentes?.find(r => r.id === recorrenteId);
    if (!recorrente) {
      console.error('❌ Recorrente não encontrada no appState');
      return;
    }
    
    console.log('✅ Recorrente encontrada:', {
      id: recorrente.id,
      descricao: recorrente.descricao,
      valor: recorrente.valor,
      categoriaId: recorrente.categoriaId
    });

    // 2. Verificar transações no appState
    const transacoesAppState = window.appState.transactions || [];
    console.log('📊 Total de transações no appState:', transacoesAppState.length);
    
    const transacoesRecorrente = transacoesAppState.filter(t => 
      t.recorrenteId === recorrenteId || t.descricao === recorrente.descricao
    );
    
    console.log('🔍 Transações da recorrente no appState:', transacoesRecorrente.length);
    transacoesRecorrente.forEach((t, index) => {
      console.log(`  Transação ${index + 1}:`, {
        id: t.id,
        descricao: t.descricao,
        valor: t.valor,
        recorrenteId: t.recorrenteId,
        createdAt: t.createdAt,
        budgetId: t.budgetId
      });
    });

    // 3. Verificar transações diretamente no Firestore
    const { collection, getDocs, query, where } = await import('firebase/firestore');
    const { db } = await import('./src/js/firebase.js');
    
    console.log('🔍 Buscando transações no Firestore...');
    
    // Buscar na coleção principal
    const refAtual = collection(db, 'transactions');
    const snapAtual = await getDocs(
      query(
        refAtual,
        where('userId', '==', user.uid),
        where('recorrenteId', '==', recorrenteId)
      )
    );
    
    console.log('📊 Transações encontradas no Firestore (por recorrenteId):', snapAtual.docs.length);
    snapAtual.docs.forEach((doc, index) => {
      const data = doc.data();
      console.log(`  Transação ${index + 1}:`, {
        id: doc.id,
        descricao: data.descricao,
        valor: data.valor,
        recorrenteId: data.recorrenteId,
        createdAt: data.createdAt,
        budgetId: data.budgetId
      });
    });

    // Buscar por descrição também
    const snapDescricao = await getDocs(
      query(
        refAtual,
        where('userId', '==', user.uid),
        where('descricao', '==', recorrente.descricao)
      )
    );
    
    console.log('📊 Transações encontradas no Firestore (por descrição):', snapDescricao.docs.length);
    snapDescricao.docs.forEach((doc, index) => {
      const data = doc.data();
      console.log(`  Transação ${index + 1}:`, {
        id: doc.id,
        descricao: data.descricao,
        valor: data.valor,
        recorrenteId: data.recorrenteId,
        createdAt: data.createdAt,
        budgetId: data.budgetId
      });
    });

    // 4. Verificar histórico mensal
    console.log('🔍 Verificando histórico mensal...');
    const now = new Date();
    const anoAtual = now.getFullYear();
    const mesAtual = now.getMonth() + 1;
    
    for (let ano = 2023; ano <= anoAtual; ano++) {
      const mesLimite = ano === anoAtual ? mesAtual : 12;
      for (let mes = 1; mes <= mesLimite; mes++) {
        const mesPad = String(mes).padStart(2, '0');
        const refHist = collection(
          db,
          'users',
          user.uid,
          'historico',
          `${ano}-${mesPad}`,
          'transacoes'
        );
        
        try {
          const snapHist = await getDocs(
            query(refHist, where('recorrenteId', '==', recorrenteId))
          );
          
          if (!snapHist.empty) {
            console.log(`📊 Histórico ${ano}-${mesPad}:`, snapHist.docs.length, 'transações');
            snapHist.docs.forEach((doc, index) => {
              const data = doc.data();
              console.log(`  Transação ${index + 1}:`, {
                id: doc.id,
                descricao: data.descricao,
                valor: data.valor,
                recorrenteId: data.recorrenteId,
                createdAt: data.createdAt
              });
            });
          }
        } catch (error) {
          console.log(`⚠️ Erro ao buscar histórico ${ano}-${mesPad}:`, error.message);
        }
      }
    }

    console.log('✅ Debug concluído!');

  } catch (error) {
    console.error('❌ Erro no debug:', error);
  }
}

// Função para listar todas as recorrentes
function listarRecorrentes() {
  const recorrentes = window.appState.recorrentes || [];
  console.log('📋 Recorrentes disponíveis:');
  recorrentes.forEach((rec, index) => {
    console.log(`${index + 1}. ${rec.descricao} (ID: ${rec.id})`);
  });
}

// Expor funções globalmente
window.debugHistoricoRecorrente = debugHistoricoRecorrente;
window.listarRecorrentes = listarRecorrentes;

console.log('✅ Script de debug carregado!');
console.log('📝 Comandos disponíveis:');
console.log('  - window.listarRecorrentes() - Lista todas as recorrentes');
console.log('  - window.debugHistoricoRecorrente("ID_DA_RECORRENTE") - Debug de uma recorrente específica'); 