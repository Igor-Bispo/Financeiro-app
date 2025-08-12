// Script para corrigir recorrência com categoria órfã
console.log('🔧 === CORREÇÃO DE CATEGORIA ÓRFÃ NA RECORRÊNCIA ===');

/**
 * Função para corrigir a recorrência "teste" com categoria órfã
 */
function corrigirCategoriaOrfaRecorrente() {
  console.log('\n🔧 Iniciando correção da categoria órfã...');
  
  const recorrentes = window.appState?.recorrentes;
  const categorias = window.appState?.categories;
  
  if (!recorrentes || !categorias) {
    console.log('❌ Dados insuficientes para correção');
    return false;
  }
  
  // Encontrar a recorrência problemática
  const recorrenteProblematica = recorrentes.find(r => r.categoriaId === 'XXGOZw7X7fdgQkx0bRXk');
  
  if (!recorrenteProblematica) {
    console.log('✅ Nenhuma recorrência com categoria órfã encontrada');
    return true;
  }
  
  console.log(`🔍 Recorrência problemática encontrada: "${recorrenteProblematica.descricao}"`);
  console.log(`   - ID da recorrência: ${recorrenteProblematica.id}`);
  console.log(`   - Categoria órfã: ${recorrenteProblematica.categoriaId}`);
  
  // Opções de correção
  console.log('\n💡 Opções de correção disponíveis:');
  console.log('   1. Atribuir categoria "extra" (aSdM572EyobRyoJldNxd)');
  console.log('   2. Atribuir categoria "mercado" (MXB0CteXGbkrFcQvx3sK)');
  console.log('   3. Remover referência da categoria (deixar sem categoria)');
  
  // Aplicar correção automática - usar categoria "extra" como padrão
  const categoriaExtra = categorias.find(c => c.id === 'aSdM572EyobRyoJldNxd');
  
  if (categoriaExtra) {
    console.log(`\n🔧 Aplicando correção: atribuindo categoria "${categoriaExtra.nome}"...`);
    
    // Atualizar a recorrência no appState local
    recorrenteProblematica.categoriaId = categoriaExtra.id;
    
    console.log('✅ Correção aplicada localmente no appState');
    console.log(`   - Nova categoria: "${categoriaExtra.nome}" (${categoriaExtra.id})`);
    
    return true;
  } else {
    console.log('\n🔧 Categoria "extra" não encontrada, removendo referência...');
    
    // Remover a referência da categoria
    delete recorrenteProblematica.categoriaId;
    
    console.log('✅ Referência da categoria removida');
    
    return true;
  }
}

/**
 * Função para corrigir no Firestore (permanente)
 */
async function corrigirCategoriaOrfaFirestore() {
  console.log('\n💾 === CORREÇÃO PERMANENTE NO FIRESTORE ===');
  
  try {
    // Tentar importar Firebase
    let db;
    try {
      const firebase = await import('./src/js/firebase.js');
      db = firebase.db;
    } catch (error) {
      console.log('⚠️ Não foi possível importar Firebase, aplicando apenas correção local');
      return corrigirCategoriaOrfaRecorrente();
    }
    
    if (!db) {
      console.log('⚠️ Firestore não disponível, aplicando apenas correção local');
      return corrigirCategoriaOrfaRecorrente();
    }
    
    const currentUser = window.appState?.currentUser;
    const currentBudget = window.appState?.currentBudget;
    
    if (!currentUser || !currentBudget) {
      console.log('❌ Usuário ou orçamento não encontrado');
      return false;
    }
    
    // Encontrar a recorrência problemática
    const recorrentes = window.appState?.recorrentes;
    const recorrenteProblematica = recorrentes?.find(r => r.categoriaId === 'XXGOZw7X7fdgQkx0bRXk');
    
    if (!recorrenteProblematica) {
      console.log('✅ Nenhuma recorrência com categoria órfã encontrada');
      return true;
    }
    
    console.log(`🔧 Corrigindo recorrência "${recorrenteProblematica.descricao}" no Firestore...`);
    
    // Importar funções do Firestore
    const { doc, updateDoc } = await import('firebase/firestore');
    
    // Atualizar no Firestore
    const recorrenteRef = doc(db, 'recorrentes', recorrenteProblematica.id);
    
    await updateDoc(recorrenteRef, {
      categoriaId: 'aSdM572EyobRyoJldNxd' // Categoria "extra"
    });
    
    console.log('✅ Recorrência corrigida no Firestore');
    
    // Aplicar correção local também
    corrigirCategoriaOrfaRecorrente();
    
    return true;
    
  } catch (error) {
    console.error('❌ Erro ao corrigir no Firestore:', error);
    console.log('🔧 Aplicando correção local como fallback...');
    return corrigirCategoriaOrfaRecorrente();
  }
}

/**
 * Função para verificar se a correção funcionou
 */
function verificarCorrecao() {
  console.log('\n🔍 === VERIFICAÇÃO DA CORREÇÃO ===');
  
  const recorrentes = window.appState?.recorrentes;
  const categorias = window.appState?.categories;
  
  if (!recorrentes || !categorias) {
    console.log('❌ Dados não disponíveis para verificação');
    return;
  }
  
  // Verificar se ainda há categorias órfãs
  const categoriasOrfas = recorrentes.filter(rec => {
    if (!rec.categoriaId) return false;
    const categoria = categorias.find(c => c.id === rec.categoriaId);
    return !categoria;
  });
  
  if (categoriasOrfas.length === 0) {
    console.log('✅ Correção bem-sucedida! Nenhuma categoria órfã encontrada.');
    
    // Mostrar estado atual das recorrências
    console.log('\n📊 Estado atual das recorrências:');
    recorrentes.forEach((rec, index) => {
      const categoria = categorias.find(c => c.id === rec.categoriaId);
      const nomeCategoria = categoria?.nome || 'Sem categoria';
      console.log(`   ${index + 1}. "${rec.descricao}" → "${nomeCategoria}"`);
    });
    
  } else {
    console.log(`❌ Ainda existem ${categoriasOrfas.length} recorrências com categorias órfãs:`);
    categoriasOrfas.forEach((rec, index) => {
      console.log(`   ${index + 1}. "${rec.descricao}" → categoria ID: ${rec.categoriaId}`);
    });
  }
}

/**
 * Função principal
 */
async function executarCorrecaoCompleta() {
  console.log('🚀 Executando correção completa da categoria órfã...');
  
  // Tentar correção no Firestore primeiro
  const sucesso = await corrigirCategoriaOrfaFirestore();
  
  if (sucesso) {
    // Verificar se a correção funcionou
    verificarCorrecao();
    
    // Recarregar o dashboard
    console.log('\n🔄 Recarregando dashboard...');
    if (window.refreshCurrentView) {
      window.refreshCurrentView();
      console.log('✅ Dashboard recarregado');
    } else if (window.renderDashboard) {
      window.renderDashboard();
      console.log('✅ Dashboard renderizado');
    } else {
      console.log('⚠️ Função de recarregamento não encontrada, recarregue a página manualmente');
    }
    
  } else {
    console.log('❌ Falha na correção');
  }
}

// Executar correção automaticamente
executarCorrecaoCompleta();

// Disponibilizar funções globalmente
window.fixCategoriaOrfa = {
  corrigirCategoriaOrfaRecorrente,
  corrigirCategoriaOrfaFirestore,
  verificarCorrecao,
  executarCorrecaoCompleta
};

console.log('\n🛠️ Funções disponíveis em window.fixCategoriaOrfa:');
console.log('   - corrigirCategoriaOrfaRecorrente() // Correção local');
console.log('   - corrigirCategoriaOrfaFirestore() // Correção permanente');
console.log('   - verificarCorrecao() // Verificar se funcionou');
console.log('   - executarCorrecaoCompleta() // Executar tudo');