// Script para diagnosticar o problema com parcelas das recorrentes
console.log('🔍 Diagnosticando problema com parcelas das recorrentes...');

// Função para verificar uma transação específica
function verificarTransacaoRecorrente(transacaoId) {
  console.log('🔍 Verificando transação:', transacaoId);
  
  const transacao = window.appState.transactions?.find(t => t.id === transacaoId);
  if (!transacao) {
    console.log('❌ Transação não encontrada');
    return;
  }
  
  console.log('📊 Dados da transação:');
  console.log('   - Descrição:', transacao.descricao);
  console.log('   - Valor:', transacao.valor);
  console.log('   - Recorrente ID:', transacao.recorrenteId);
  console.log('   - Parcela Atual:', transacao.parcelaAtual);
  console.log('   - Parcelas Total:', transacao.parcelasTotal);
  console.log('   - Data de Criação:', transacao.createdAt);
  
  if (transacao.recorrenteId) {
    const recorrente = window.appState.recorrentes?.find(r => r.id === transacao.recorrenteId);
    if (recorrente) {
      console.log('\n📊 Dados da recorrente:');
      console.log('   - Descrição:', recorrente.descricao);
      console.log('   - Parcelas Total:', recorrente.parcelasTotal);
      console.log('   - Parcelas Restantes:', recorrente.parcelasRestantes);
      console.log('   - Data Início:', recorrente.dataInicio);
      console.log('   - Ativa:', recorrente.ativa);
      
      // Calcular parcela usando a função
      if (window.calcularParcelaRecorrente) {
        const parcelaCalculada = window.calcularParcelaRecorrente(recorrente);
        console.log('   - Parcela Calculada:', parcelaCalculada);
      }
      
      // Calcular status usando a função
      if (window.calcularStatusRecorrente) {
        const status = window.calcularStatusRecorrente(recorrente, window.appState.transactions || []);
        console.log('   - Status Calculado:', status);
      }
    } else {
      console.log('❌ Recorrente não encontrada');
    }
  }
}

// Função para listar todas as transações recorrentes
function listarTransacoesRecorrentes() {
  console.log('📋 Listando todas as transações recorrentes...');
  
  const transacoesRecorrentes = window.appState.transactions?.filter(t => t.recorrenteId) || [];
  console.log(`📊 Encontradas ${transacoesRecorrentes.length} transações recorrentes`);
  
  transacoesRecorrentes.forEach((t, index) => {
    console.log(`\n🔘 Transação ${index + 1}:`);
    console.log(`   - ID: ${t.id}`);
    console.log(`   - Descrição: ${t.descricao}`);
    console.log(`   - Recorrente ID: ${t.recorrenteId}`);
    console.log(`   - Parcela Atual: ${t.parcelaAtual}`);
    console.log(`   - Parcelas Total: ${t.parcelasTotal}`);
    console.log(`   - Data: ${t.createdAt}`);
    
    // Verificar se tem parcelas mas está mostrando infinito
    if (t.parcelasTotal && t.parcelasTotal > 1) {
      if (!t.parcelaAtual) {
        console.log(`   ❌ PROBLEMA: Tem parcelas (${t.parcelasTotal}) mas parcelaAtual é null/undefined`);
      } else {
        console.log(`   ✅ OK: Parcela ${t.parcelaAtual} de ${t.parcelasTotal}`);
      }
    } else {
      console.log(`   ℹ️ Infinito (parcelasTotal: ${t.parcelasTotal})`);
    }
  });
}

// Função para verificar recorrentes
function verificarRecorrentes() {
  console.log('📋 Verificando recorrentes...');
  
  const recorrentes = window.appState.recorrentes || [];
  console.log(`📊 Encontradas ${recorrentes.length} recorrentes`);
  
  recorrentes.forEach((r, index) => {
    console.log(`\n🔘 Recorrente ${index + 1}:`);
    console.log(`   - ID: ${r.id}`);
    console.log(`   - Descrição: ${r.descricao}`);
    console.log(`   - Parcelas Total: ${r.parcelasTotal}`);
    console.log(`   - Parcelas Restantes: ${r.parcelasRestantes}`);
    console.log(`   - Data Início: ${r.dataInicio}`);
    console.log(`   - Ativa: ${r.ativa}`);
    
    if (r.parcelasTotal && r.parcelasTotal > 1) {
      console.log(`   ✅ É parcelada: ${r.parcelasTotal} parcelas`);
    } else {
      console.log(`   ℹ️ É infinita`);
    }
  });
}

// Função para simular criação de transação
function simularCriacaoTransacao(recorrenteId) {
  console.log('🔧 Simulando criação de transação para recorrente:', recorrenteId);
  
  const recorrente = window.appState.recorrentes?.find(r => r.id === recorrenteId);
  if (!recorrente) {
    console.log('❌ Recorrente não encontrada');
    return;
  }
  
  console.log('📊 Dados da recorrente:');
  console.log('   - Descrição:', recorrente.descricao);
  console.log('   - Parcelas Total:', recorrente.parcelasTotal);
  console.log('   - Data Início:', recorrente.dataInicio);
  
  // Simular cálculo de parcela
  if (window.calcularParcelaRecorrente) {
    const parcelaAtual = window.calcularParcelaRecorrente(recorrente);
    console.log('   - Parcela Calculada:', parcelaAtual);
    
    // Simular dados da transação
    const transacaoData = {
      parcelaAtual: parcelaAtual,
      parcelasTotal: recorrente.parcelasTotal,
      recorrenteId: recorrente.id
    };
    
    console.log('   - Dados da transação simulada:', transacaoData);
  }
}

// Função principal
function diagnosticarRecorrentes() {
  console.log('🚀 Iniciando diagnóstico das recorrentes...');
  
  // Verificar estado do app
  console.log('📊 Estado do app:');
  console.log('   - Transações:', window.appState.transactions?.length || 0);
  console.log('   - Recorrentes:', window.appState.recorrentes?.length || 0);
  console.log('   - Função calcularParcelaRecorrente:', typeof window.calcularParcelaRecorrente);
  console.log('   - Função calcularStatusRecorrente:', typeof window.calcularStatusRecorrente);
  
  verificarRecorrentes();
  listarTransacoesRecorrentes();
  
  console.log('\n💡 Para verificar uma transação específica, use:');
  console.log('   verificarTransacaoRecorrente("ID_DA_TRANSACAO")');
  console.log('\n💡 Para simular criação de transação, use:');
  console.log('   simularCriacaoTransacao("ID_DA_RECORRENTE")');
}

// Executar diagnóstico
diagnosticarRecorrentes();
