// Script para corrigir a exibição das recorrentes efetivadas no dashboard
console.log('🔧 Corrigindo exibição das recorrentes efetivadas no dashboard...');

// Função para verificar o estado atual das recorrentes no dashboard
function verificarRecorrentesDashboard() {
  console.log('🔍 Verificando estado atual das recorrentes no dashboard...');
  
  const transacoes = window.appState.transactions || [];
  const recorrentes = window.appState.recorrentes || [];
  
  // Recorrentes que foram aplicadas como transações
  const recorrentesAplicadas = transacoes.filter(t => t.recorrenteId);
  console.log(`📊 Recorrentes aplicadas como transações: ${recorrentesAplicadas.length}`);
  
  recorrentesAplicadas.forEach((t, index) => {
    const recorrente = recorrentes.find(r => r.id === t.recorrenteId);
    console.log(`\n🔘 Transação ${index + 1}: ${t.descricao}`);
    console.log(`   - Recorrente: ${recorrente?.descricao || 'N/A'}`);
    console.log(`   - Parcela Atual: ${t.parcelaAtual}`);
    console.log(`   - Parcelas Total: ${t.parcelasTotal}`);
    console.log(`   - Data: ${t.createdAt}`);
  });
  
  // Recorrentes que NÃO foram aplicadas (agendadas)
  const recorrentesNaoAplicadas = recorrentes.filter(rec => {
    const jaLancada = recorrentesAplicadas.some(t => t.recorrenteId === rec.id);
    return !jaLancada;
  });
  
  console.log(`\n📊 Recorrentes não aplicadas (agendadas): ${recorrentesNaoAplicadas.length}`);
  recorrentesNaoAplicadas.forEach((r, index) => {
    console.log(`\n🔘 Recorrente ${index + 1}: ${r.descricao}`);
    console.log(`   - Parcelas Total: ${r.parcelasTotal}`);
    console.log(`   - Data Início: ${r.dataInicio}`);
  });
}

// Função para simular a lógica do dashboard
function simularDashboardRecorrentes() {
  console.log('🧪 Simulando lógica do dashboard...');
  
  const transacoes = window.appState.transactions || [];
  const recorrentes = window.appState.recorrentes || [];
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  
  // Recorrentes aplicadas como transações
  const recorrentesAplicadas = transacoes.filter(t => t.recorrenteId);
  
  // Recorrentes não aplicadas (agendadas)
  const recorrentesNaoAplicadas = recorrentes.filter(rec => {
    const jaLancada = recorrentesAplicadas.some(t => t.recorrenteId === rec.id);
    return !jaLancada;
  });
  
  console.log(`📊 Dashboard atual mostra:`);
  console.log(`   - Recorrentes aplicadas: ${recorrentesAplicadas.length}`);
  console.log(`   - Recorrentes agendadas: ${recorrentesNaoAplicadas.length}`);
  
  // Mostrar como deveria ser
  console.log(`\n💡 Como deveria ser:`);
  console.log(`   - Recorrentes efetivadas: ${recorrentesAplicadas.length} (com "1 de 3")`);
  console.log(`   - Recorrentes agendadas: ${recorrentesNaoAplicadas.length} (com "2 de 3")`);
}

// Função para corrigir a exibição
function corrigirExibicaoDashboard() {
  console.log('🔧 Corrigindo exibição do dashboard...');
  
  // Forçar recarregamento do dashboard
  if (window.refreshCurrentView) {
    window.refreshCurrentView();
    console.log('✅ Dashboard recarregado');
  } else {
    console.log('❌ Função refreshCurrentView não disponível');
  }
}

// Função para testar uma recorrente específica no dashboard
function testarRecorrenteDashboard(recorrenteId) {
  console.log('🧪 Testando recorrente no dashboard:', recorrenteId);
  
  const recorrente = window.appState.recorrentes?.find(r => r.id === recorrenteId);
  if (!recorrente) {
    console.log('❌ Recorrente não encontrada');
    return;
  }
  
  const transacoes = window.appState.transactions || [];
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  
  // Verificar se foi aplicada
  const transacaoAplicada = transacoes.find(t => t.recorrenteId === recorrenteId);
  
  if (transacaoAplicada) {
    console.log('📊 Recorrente EFETIVADA no mês atual:');
    console.log(`   - Descrição: ${recorrente.descricao}`);
    console.log(`   - Parcela: ${transacaoAplicada.parcelaAtual} de ${transacaoAplicada.parcelasTotal}`);
    console.log(`   - Deveria mostrar: "✅ Efetivada: ${transacaoAplicada.parcelaAtual} de ${transacaoAplicada.parcelasTotal}"`);
  } else {
    console.log('📊 Recorrente AGENDADA para o mês atual:');
    console.log(`   - Descrição: ${recorrente.descricao}`);
    
    if (window.calcularStatusRecorrente) {
      const status = window.calcularStatusRecorrente(recorrente, transacoes, year, month);
      console.log(`   - Parcela: ${status.parcelaAtual} de ${status.totalParcelas}`);
      console.log(`   - Deveria mostrar: "📅 Agendada: ${status.parcelaAtual} de ${status.totalParcelas}"`);
    }
  }
}

// Função principal
function diagnosticarDashboard() {
  console.log('🚀 Iniciando diagnóstico do dashboard...');
  
  verificarRecorrentesDashboard();
  simularDashboardRecorrentes();
  
  console.log('\n💡 Para testar uma recorrente específica, use:');
  console.log('   testarRecorrenteDashboard("ID_DA_RECORRENTE")');
  console.log('\n💡 Para corrigir a exibição, use:');
  console.log('   corrigirExibicaoDashboard()');
}

// Executar diagnóstico
diagnosticarDashboard();
