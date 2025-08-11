// Script para testar a correção do dashboard
console.log('🧪 Testando correção do dashboard...');

// Função para verificar se a correção foi aplicada
function verificarCorrecao() {
  console.log('🔍 Verificando se a correção foi aplicada...');
  
  // Forçar recarregamento do dashboard
  if (window.refreshCurrentView) {
    window.refreshCurrentView();
    console.log('✅ Dashboard recarregado');
  } else {
    console.log('❌ Função refreshCurrentView não disponível');
  }
}

// Função para verificar o estado atual
function verificarEstadoAtual() {
  console.log('📊 Verificando estado atual...');
  
  const transacoes = window.appState.transactions || [];
  const recorrentes = window.appState.recorrentes || [];
  
  // Recorrentes efetivadas
  const recorrentesEfetivadas = transacoes.filter(t => t.recorrenteId).map(t => {
    const recorrente = recorrentes.find(r => r.id === t.recorrenteId);
    return {
      descricao: recorrente?.descricao || t.descricao,
      parcelaAtual: t.parcelaAtual,
      parcelasTotal: t.parcelasTotal,
      valor: t.valor,
      status: `✅ Efetivada: ${t.parcelaAtual} de ${t.parcelasTotal}`
    };
  });
  
  console.log(`📊 Recorrentes efetivadas que devem aparecer no dashboard:`);
  recorrentesEfetivadas.forEach((r, index) => {
    console.log(`   ${index + 1}. ${r.descricao} - ${r.status} - R$ ${r.valor}`);
  });
  
  if (recorrentesEfetivadas.length === 0) {
    console.log('   ℹ️ Nenhuma recorrente efetivada encontrada');
  }
  
  // Recorrentes agendadas
  const recorrentesAgendadas = recorrentes.filter(rec => {
    const jaEfetivada = recorrentesEfetivadas.some(r => r.descricao === rec.descricao);
    return !jaEfetivada;
  });
  
  console.log(`\n📊 Recorrentes agendadas que devem aparecer no dashboard:`);
  recorrentesAgendadas.forEach((r, index) => {
    console.log(`   ${index + 1}. ${r.descricao} - ${r.parcelasTotal} parcelas - R$ ${r.valor}`);
  });
  
  if (recorrentesAgendadas.length === 0) {
    console.log('   ℹ️ Nenhuma recorrente agendada encontrada');
  }
  
  console.log(`\n📊 Total esperado no dashboard: ${recorrentesEfetivadas.length + recorrentesAgendadas.length} recorrentes`);
}

// Função para simular a nova lógica
function simularNovaLogica() {
  console.log('🧪 Simulando nova lógica do dashboard...');
  
  const transacoes = window.appState.transactions || [];
  const recorrentes = window.appState.recorrentes || [];
  
  // Recorrentes efetivadas
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
  
  // Recorrentes agendadas
  const recorrentesAgendadas = recorrentes.filter(rec => {
    const jaEfetivada = recorrentesEfetivadas.some(r => r.id === rec.id);
    return !jaEfetivada;
  });
  
  // Combinar para exibição
  const todasRecorrentes = [...recorrentesEfetivadas, ...recorrentesAgendadas];
  
  console.log(`📊 Nova lógica do dashboard:`);
  console.log(`   - Recorrentes efetivadas: ${recorrentesEfetivadas.length}`);
  recorrentesEfetivadas.forEach((r, index) => {
    console.log(`     ${index + 1}. ${r.descricao} - ✅ Efetivada: ${r.parcelaAtual} de ${r.parcelasTotal}`);
  });
  
  console.log(`   - Recorrentes agendadas: ${recorrentesAgendadas.length}`);
  recorrentesAgendadas.forEach((r, index) => {
    console.log(`     ${index + 1}. ${r.descricao} - 📅 Agendada`);
  });
  
  console.log(`   - Total: ${todasRecorrentes.length} recorrentes`);
}

// Função principal
function testarCorrecao() {
  console.log('🚀 Iniciando teste da correção...');
  
  verificarEstadoAtual();
  simularNovaLogica();
  
  console.log('\n💡 Para aplicar a correção, use:');
  console.log('   verificarCorrecao()');
}

// Executar teste
testarCorrecao();
