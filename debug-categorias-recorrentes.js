// Script para diagnosticar problemas de categorias nas recorrências do dashboard
console.log('🔍 === DIAGNÓSTICO DE CATEGORIAS NAS RECORRÊNCIAS ===');

/**
 * Função para verificar o estado das categorias no appState
 */
function verificarCategoriasAppState() {
  console.log('\n📂 === VERIFICAÇÃO DAS CATEGORIAS NO APPSTATE ===');
  
  const categorias = window.appState?.categories;
  
  if (!categorias) {
    console.log('❌ window.appState.categories não existe');
    return false;
  }
  
  if (!Array.isArray(categorias)) {
    console.log('❌ window.appState.categories não é um array:', typeof categorias);
    return false;
  }
  
  console.log(`✅ Categorias carregadas: ${categorias.length}`);
  
  categorias.forEach((cat, index) => {
    console.log(`\n📂 Categoria ${index + 1}:`);
    console.log(`   - ID: ${cat.id}`);
    console.log(`   - Nome: ${cat.nome}`);
    console.log(`   - Tipo: ${cat.tipo}`);
    console.log(`   - Cor: ${cat.cor}`);
    console.log(`   - Limite: ${cat.limite}`);
  });
  
  return true;
}

/**
 * Função para verificar as recorrências e suas categorias
 */
function verificarRecorrenciasECategorias() {
  console.log('\n🔄 === VERIFICAÇÃO DAS RECORRÊNCIAS E SUAS CATEGORIAS ===');
  
  const recorrentes = window.appState?.recorrentes;
  const categorias = window.appState?.categories;
  
  if (!recorrentes) {
    console.log('❌ window.appState.recorrentes não existe');
    return;
  }
  
  if (!categorias) {
    console.log('❌ window.appState.categories não existe');
    return;
  }
  
  console.log(`📊 Recorrências encontradas: ${recorrentes.length}`);
  
  recorrentes.forEach((rec, index) => {
    console.log(`\n🔄 Recorrência ${index + 1}: "${rec.descricao}"`);
    console.log(`   - ID: ${rec.id}`);
    console.log(`   - Categoria ID: ${rec.categoriaId}`);
    
    // Buscar a categoria
    const categoria = categorias.find(c => c.id === rec.categoriaId);
    
    if (categoria) {
      console.log(`   ✅ Categoria encontrada: "${categoria.nome}" (${categoria.tipo})`);
    } else {
      console.log(`   ❌ Categoria NÃO encontrada para ID: ${rec.categoriaId}`);
      console.log(`   🔍 Categorias disponíveis:`);
      categorias.forEach(cat => {
        console.log(`      - ${cat.id}: ${cat.nome}`);
      });
    }
  });
}

/**
 * Função para simular a lógica do dashboard
 */
function simularLogicaDashboard() {
  console.log('\n🖥️ === SIMULAÇÃO DA LÓGICA DO DASHBOARD ===');
  
  const transacoes = window.appState?.transactions || [];
  const recorrentes = window.appState?.recorrentes || [];
  const categorias = window.appState?.categories || [];
  
  console.log(`📊 Dados disponíveis:`);
  console.log(`   - Transações: ${transacoes.length}`);
  console.log(`   - Recorrências: ${recorrentes.length}`);
  console.log(`   - Categorias: ${categorias.length}`);
  
  // Simular recorrentes efetivadas
  const recorrentesEfetivadas = transacoes.filter(t => t.recorrenteId).map(t => {
    const recorrente = recorrentes.find(r => r.id === t.recorrenteId);
    return {
      ...recorrente,
      efetivada: true,
      parcelaAtual: t.parcelaAtual,
      parcelasTotal: t.parcelasTotal,
      transacaoId: t.id,
      valor: t.valor
    };
  });
  
  // Simular recorrentes agendadas
  const recorrentesAgendadas = recorrentes.filter(rec => {
    const jaEfetivada = recorrentesEfetivadas.some(r => r.id === rec.id);
    return !jaEfetivada;
  });
  
  // Combinar todas
  const todasRecorrentes = [...recorrentesEfetivadas, ...recorrentesAgendadas];
  
  console.log(`\n📊 Resultado da simulação:`);
  console.log(`   - Recorrentes efetivadas: ${recorrentesEfetivadas.length}`);
  console.log(`   - Recorrentes agendadas: ${recorrentesAgendadas.length}`);
  console.log(`   - Total: ${todasRecorrentes.length}`);
  
  // Verificar cada recorrente e sua categoria
  console.log(`\n🔍 Verificação detalhada das recorrentes no dashboard:`);
  
  todasRecorrentes.forEach((rec, index) => {
    console.log(`\n${index + 1}. "${rec.descricao}"`);
    console.log(`   - Categoria ID: ${rec.categoriaId}`);
    
    // Simular a busca da categoria como no dashboard
    const categoria = categorias.find(c => c.id === rec.categoriaId);
    const nomeCategoria = categoria?.nome || 'Sem categoria';
    
    console.log(`   - Categoria encontrada: ${categoria ? 'SIM' : 'NÃO'}`);
    console.log(`   - Nome da categoria: "${nomeCategoria}"`);
    console.log(`   - Status: ${rec.efetivada ? 'Efetivada' : 'Agendada'}`);
    
    if (!categoria && rec.categoriaId) {
      console.log(`   ⚠️ PROBLEMA: Categoria com ID "${rec.categoriaId}" não foi encontrada!`);
    }
  });
}

/**
 * Função para verificar se há problemas de carregamento
 */
function verificarCarregamento() {
  console.log('\n⏳ === VERIFICAÇÃO DE CARREGAMENTO ===');
  
  // Verificar se o appState existe
  if (!window.appState) {
    console.log('❌ window.appState não existe');
    return;
  }
  
  console.log('✅ window.appState existe');
  
  // Verificar propriedades do appState
  const propriedades = ['currentUser', 'currentBudget', 'transactions', 'categories', 'recorrentes'];
  
  propriedades.forEach(prop => {
    const valor = window.appState[prop];
    if (valor === undefined) {
      console.log(`❌ appState.${prop} é undefined`);
    } else if (valor === null) {
      console.log(`⚠️ appState.${prop} é null`);
    } else if (Array.isArray(valor)) {
      console.log(`✅ appState.${prop} é array com ${valor.length} itens`);
    } else {
      console.log(`✅ appState.${prop} existe (${typeof valor})`);
    }
  });
}

/**
 * Função para corrigir problemas de categoria
 */
function tentarCorrigirCategorias() {
  console.log('\n🔧 === TENTATIVA DE CORREÇÃO ===');
  
  const categorias = window.appState?.categories;
  const recorrentes = window.appState?.recorrentes;
  
  if (!categorias || !recorrentes) {
    console.log('❌ Não é possível corrigir: dados insuficientes');
    return;
  }
  
  // Verificar se há categorias órfãs
  const categoriasOrfas = [];
  
  recorrentes.forEach(rec => {
    if (rec.categoriaId) {
      const categoria = categorias.find(c => c.id === rec.categoriaId);
      if (!categoria) {
        categoriasOrfas.push({
          recorrencia: rec.descricao,
          categoriaId: rec.categoriaId
        });
      }
    }
  });
  
  if (categoriasOrfas.length > 0) {
    console.log(`⚠️ Encontradas ${categoriasOrfas.length} recorrências com categorias órfãs:`);
    categoriasOrfas.forEach((item, index) => {
      console.log(`   ${index + 1}. "${item.recorrencia}" → categoria ID: ${item.categoriaId}`);
    });
    
    console.log('\n💡 Sugestões de correção:');
    console.log('   1. Verificar se as categorias foram carregadas corretamente');
    console.log('   2. Recriar as categorias faltantes');
    console.log('   3. Atualizar os IDs das categorias nas recorrências');
  } else {
    console.log('✅ Todas as recorrências têm categorias válidas');
  }
}

/**
 * Função principal de diagnóstico
 */
function diagnosticarCategoriasRecorrentes() {
  console.log('🚀 Iniciando diagnóstico completo...');
  
  verificarCarregamento();
  
  const categoriasOk = verificarCategoriasAppState();
  
  if (categoriasOk) {
    verificarRecorrenciasECategorias();
    simularLogicaDashboard();
    tentarCorrigirCategorias();
  }
  
  console.log('\n🎯 === DIAGNÓSTICO CONCLUÍDO ===');
  console.log('\n💡 Para recarregar o dashboard após correções:');
  console.log('   window.refreshCurrentView && window.refreshCurrentView()');
}

// Executar diagnóstico
diagnosticarCategoriasRecorrentes();

// Disponibilizar funções globalmente para uso manual
window.debugCategorias = {
  verificarCategoriasAppState,
  verificarRecorrenciasECategorias,
  simularLogicaDashboard,
  verificarCarregamento,
  tentarCorrigirCategorias,
  diagnosticarCategoriasRecorrentes
};

console.log('\n🛠️ Funções disponíveis em window.debugCategorias:');
console.log('   - verificarCategoriasAppState()');
console.log('   - verificarRecorrenciasECategorias()');
console.log('   - simularLogicaDashboard()');
console.log('   - verificarCarregamento()');
console.log('   - tentarCorrigirCategorias()');
console.log('   - diagnosticarCategoriasRecorrentes()');