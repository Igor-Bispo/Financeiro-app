// Script para corrigir o problema das parcelas das recorrentes
console.log('🔧 Corrigindo problema das parcelas das recorrentes...');

// Função para corrigir transações recorrentes sem parcelaAtual
function corrigirTransacoesRecorrentes() {
  console.log('🔧 Verificando transações recorrentes...');
  
  const transacoesRecorrentes = window.appState.transactions?.filter(t => t.recorrenteId) || [];
  console.log(`📊 Encontradas ${transacoesRecorrentes.length} transações recorrentes`);
  
  let corrigidas = 0;
  
  transacoesRecorrentes.forEach((t, index) => {
    console.log(`\n🔘 Verificando transação ${index + 1}: ${t.descricao}`);
    
    // Verificar se tem recorrenteId mas não tem parcelaAtual
    if (t.recorrenteId && (!t.parcelaAtual || !t.parcelasTotal)) {
      console.log(`   ❌ PROBLEMA: Transação tem recorrenteId mas não tem parcelaAtual/parcelasTotal`);
      
      // Buscar a recorrente
      const recorrente = window.appState.recorrentes?.find(r => r.id === t.recorrenteId);
      if (recorrente) {
        console.log(`   📊 Recorrente encontrada: ${recorrente.descricao}`);
        console.log(`   📊 Parcelas Total: ${recorrente.parcelasTotal}`);
        
        // Calcular parcela atual
        if (window.calcularParcelaRecorrente) {
          const parcelaAtual = window.calcularParcelaRecorrente(recorrente);
          console.log(`   📊 Parcela Calculada: ${parcelaAtual}`);
          
          // Corrigir a transação
          t.parcelaAtual = parcelaAtual;
          t.parcelasTotal = recorrente.parcelasTotal;
          
          console.log(`   ✅ CORRIGIDO: Parcela ${parcelaAtual} de ${recorrente.parcelasTotal}`);
          corrigidas++;
        } else {
          console.log(`   ❌ Função calcularParcelaRecorrente não disponível`);
        }
      } else {
        console.log(`   ❌ Recorrente não encontrada`);
      }
    } else if (t.parcelaAtual && t.parcelasTotal) {
      console.log(`   ✅ OK: Parcela ${t.parcelaAtual} de ${t.parcelasTotal}`);
    } else {
      console.log(`   ℹ️ Infinito ou sem parcelas`);
    }
  });
  
  console.log(`\n✅ Total de transações corrigidas: ${corrigidas}`);
  return corrigidas;
}

// Função para forçar recarregamento das transações
async function recarregarTransacoes() {
  console.log('🔄 Recarregando transações...');
  
  if (window.loadTransactions) {
    await window.loadTransactions();
    console.log('✅ Transações recarregadas');
  } else {
    console.log('❌ Função loadTransactions não disponível');
  }
}

// Função para forçar recarregamento das recorrentes
async function recarregarRecorrentes() {
  console.log('🔄 Recarregando recorrentes...');
  
  if (window.loadRecorrentes) {
    await window.loadRecorrentes();
    console.log('✅ Recorrentes recarregadas');
  } else {
    console.log('❌ Função loadRecorrentes não disponível');
  }
}

// Função para atualizar a interface
function atualizarInterface() {
  console.log('🔄 Atualizando interface...');
  
  // Recarregar a página atual
  if (window.refreshCurrentView) {
    window.refreshCurrentView();
    console.log('✅ Interface atualizada');
  } else {
    console.log('❌ Função refreshCurrentView não disponível');
  }
}

// Função para verificar se as funções estão disponíveis
function verificarFuncoes() {
  console.log('🔍 Verificando funções disponíveis...');
  
  const funcoes = [
    'calcularParcelaRecorrente',
    'calcularStatusRecorrente',
    'loadTransactions',
    'loadRecorrentes',
    'refreshCurrentView'
  ];
  
  funcoes.forEach(funcao => {
    const disponivel = typeof window[funcao] === 'function';
    console.log(`   ${disponivel ? '✅' : '❌'} ${funcao}: ${disponivel ? 'Disponível' : 'Não disponível'}`);
  });
}

// Função principal
async function corrigirRecorrentes() {
  console.log('🚀 Iniciando correção das recorrentes...');
  
  // Verificar funções
  verificarFuncoes();
  
  // Recarregar dados
  await recarregarRecorrentes();
  await recarregarTransacoes();
  
  // Corrigir transações
  const corrigidas = corrigirTransacoesRecorrentes();
  
  if (corrigidas > 0) {
    console.log(`\n🔄 Atualizando interface...`);
    atualizarInterface();
  }
  
  console.log('\n✅ Correção concluída!');
  console.log('💡 Se ainda houver problemas, recarregue a página.');
}

// Função para testar uma recorrente específica
function testarRecorrente(recorrenteId) {
  console.log('🧪 Testando recorrente:', recorrenteId);
  
  const recorrente = window.appState.recorrentes?.find(r => r.id === recorrenteId);
  if (!recorrente) {
    console.log('❌ Recorrente não encontrada');
    return;
  }
  
  console.log('📊 Dados da recorrente:');
  console.log('   - Descrição:', recorrente.descricao);
  console.log('   - Parcelas Total:', recorrente.parcelasTotal);
  console.log('   - Data Início:', recorrente.dataInicio);
  
  // Calcular parcela
  if (window.calcularParcelaRecorrente) {
    const parcelaAtual = window.calcularParcelaRecorrente(recorrente);
    console.log('   - Parcela Calculada:', parcelaAtual);
    
    // Simular dados da transação
    const transacaoData = {
      parcelaAtual: parcelaAtual,
      parcelasTotal: recorrente.parcelasTotal,
      recorrenteId: recorrente.id
    };
    
    console.log('   - Dados da transação:', transacaoData);
  }
}

// Executar correção
corrigirRecorrentes();
