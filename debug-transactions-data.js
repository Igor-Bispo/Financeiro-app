// Script para diagnosticar os dados das transações
console.log('🔍 Diagnosticando dados das transações...');

// Função para verificar os dados das transações
function verificarDadosTransacoes() {
  console.log('📊 Verificando dados das transações...');
  
  const transacoes = window.appState.transactions || [];
  const recorrentes = window.appState.recorrentes || [];
  
  // Transações que são recorrentes
  const transacoesRecorrentes = transacoes.filter(t => t.recorrenteId);
  
  console.log(`📊 Total de transações: ${transacoes.length}`);
  console.log(`📊 Transações recorrentes: ${transacoesRecorrentes.length}`);
  
  transacoesRecorrentes.forEach((t, index) => {
    const recorrente = recorrentes.find(r => r.id === t.recorrenteId);
    console.log(`\n🔘 Transação ${index + 1}: ${t.descricao}`);
    console.log(`   - ID: ${t.id}`);
    console.log(`   - Recorrente ID: ${t.recorrenteId}`);
    console.log(`   - Recorrente Nome: ${recorrente?.descricao || 'N/A'}`);
    console.log(`   - Parcela Atual: ${t.parcelaAtual} (tipo: ${typeof t.parcelaAtual})`);
    console.log(`   - Parcelas Total: ${t.parcelasTotal} (tipo: ${typeof t.parcelasTotal})`);
    console.log(`   - Valor: R$ ${t.valor}`);
    console.log(`   - Data: ${t.createdAt}`);
    
    // Verificar se os dados estão corretos
    if (t.parcelaAtual === undefined || t.parcelaAtual === null) {
      console.log(`   ❌ PROBLEMA: parcelaAtual está undefined/null`);
    } else {
      console.log(`   ✅ OK: parcelaAtual = ${t.parcelaAtual}`);
    }
    
    if (t.parcelasTotal === undefined || t.parcelasTotal === null) {
      console.log(`   ❌ PROBLEMA: parcelasTotal está undefined/null`);
    } else {
      console.log(`   ✅ OK: parcelasTotal = ${t.parcelasTotal}`);
    }
  });
}

// Função para verificar os dados das recorrentes
function verificarDadosRecorrentes() {
  console.log('\n📊 Verificando dados das recorrentes...');
  
  const recorrentes = window.appState.recorrentes || [];
  
  recorrentes.forEach((r, index) => {
    console.log(`\n🔘 Recorrente ${index + 1}: ${r.descricao}`);
    console.log(`   - ID: ${r.id}`);
    console.log(`   - Parcelas Total: ${r.parcelasTotal} (tipo: ${typeof r.parcelasTotal})`);
    console.log(`   - Parcelas Restantes: ${r.parcelasRestantes} (tipo: ${typeof r.parcelasRestantes})`);
    console.log(`   - Data Início: ${r.dataInicio}`);
    console.log(`   - Dia Lançamento: ${r.diaLancamento}`);
    console.log(`   - Ativa: ${r.ativa}`);
  });
}

// Função para simular o cálculo de parcela
function simularCalculoParcela() {
  console.log('\n🧪 Simulando cálculo de parcela...');
  
  const recorrentes = window.appState.recorrentes || [];
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  
  recorrentes.forEach((r, index) => {
    console.log(`\n🔘 Recorrente ${index + 1}: ${r.descricao}`);
    
    if (window.calcularParcelaRecorrente) {
      const parcelaAtual = window.calcularParcelaRecorrente(r, year, month);
      console.log(`   - Parcela calculada: ${parcelaAtual}`);
    } else {
      console.log(`   ❌ Função calcularParcelaRecorrente não disponível`);
    }
    
    if (window.calcularStatusRecorrente) {
      const status = window.calcularStatusRecorrente(r, window.appState.transactions || [], year, month);
      console.log(`   - Status: ${JSON.stringify(status)}`);
    } else {
      console.log(`   ❌ Função calcularStatusRecorrente não disponível`);
    }
  });
}

// Função para verificar se as transações foram criadas corretamente
function verificarCriacaoTransacoes() {
  console.log('\n🔍 Verificando criação das transações...');
  
  const transacoes = window.appState.transactions || [];
  const recorrentes = window.appState.recorrentes || [];
  
  const transacoesRecorrentes = transacoes.filter(t => t.recorrenteId);
  
  transacoesRecorrentes.forEach((t, index) => {
    const recorrente = recorrentes.find(r => r.id === t.recorrenteId);
    
    console.log(`\n🔘 Transação ${index + 1}: ${t.descricao}`);
    
    // Verificar se os dados estão corretos
    const problemas = [];
    
    if (!t.parcelaAtual && t.parcelaAtual !== 0) {
      problemas.push('parcelaAtual está undefined/null');
    }
    
    if (!t.parcelasTotal && t.parcelasTotal !== 0) {
      problemas.push('parcelasTotal está undefined/null');
    }
    
    if (!t.recorrenteId) {
      problemas.push('recorrenteId está undefined/null');
    }
    
    if (!recorrente) {
      problemas.push('recorrente não encontrada');
    }
    
    if (problemas.length > 0) {
      console.log(`   ❌ PROBLEMAS:`);
      problemas.forEach(p => console.log(`      - ${p}`));
    } else {
      console.log(`   ✅ Dados corretos`);
    }
  });
}

// Função principal
function diagnosticarTransacoes() {
  console.log('🚀 Iniciando diagnóstico das transações...');
  
  verificarDadosTransacoes();
  verificarDadosRecorrentes();
  simularCalculoParcela();
  verificarCriacaoTransacoes();
  
  console.log('\n💡 Para verificar novamente, use:');
  console.log('   diagnosticarTransacoes()');
}

// Executar diagnóstico
diagnosticarTransacoes();
