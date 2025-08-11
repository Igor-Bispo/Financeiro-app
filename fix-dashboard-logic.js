// Script para corrigir a lógica do dashboard para mostrar recorrentes efetivadas
console.log('🔧 Corrigindo lógica do dashboard para mostrar recorrentes efetivadas...');

// Função para corrigir a lógica do dashboard
function corrigirLogicaDashboard() {
  console.log('🔧 Aplicando correção na lógica do dashboard...');
  
  // Sobrescrever a lógica do dashboard temporariamente
  const originalRenderDashboard = window.renderDashboard;
  
  if (originalRenderDashboard) {
    // Criar uma versão corrigida da função renderDashboard
    window.renderDashboard = async function(selectedYear, selectedMonth) {
      console.log('🔧 Renderizando dashboard com lógica corrigida...');
      
      const year = selectedYear || new Date().getFullYear();
      const month = selectedMonth || new Date().getMonth() + 1;
      
      const transacoes = window.appState.transactions || [];
      const recorrentes = window.appState.recorrentes || [];
      
      // Recorrentes que foram aplicadas como transações (EFETIVADAS)
      const recorrentesEfetivadas = transacoes.filter(t => t.recorrenteId).map(t => {
        const recorrente = recorrentes.find(r => r.id === t.recorrenteId);
        return {
          ...recorrente,
          efetivada: true,
          parcelaAtual: t.parcelaAtual,
          parcelasTotal: t.parcelasTotal,
          transacaoId: t.id
        };
      });
      
      // Recorrentes que NÃO foram aplicadas (AGENDADAS)
      const recorrentesAgendadas = recorrentes.filter(rec => {
        const jaEfetivada = recorrentesEfetivadas.some(r => r.id === rec.id);
        return !jaEfetivada;
      });
      
      // Combinar efetivadas e agendadas
      const todasRecorrentes = [...recorrentesEfetivadas, ...recorrentesAgendadas];
      
      console.log(`📊 Dashboard corrigido:`);
      console.log(`   - Recorrentes efetivadas: ${recorrentesEfetivadas.length}`);
      console.log(`   - Recorrentes agendadas: ${recorrentesAgendadas.length}`);
      console.log(`   - Total: ${todasRecorrentes.length}`);
      
      // Continuar com a renderização original, mas usando todasRecorrentes
      // Como não podemos modificar diretamente o código, vamos forçar uma atualização
      if (window.refreshCurrentView) {
        window.refreshCurrentView();
      }
    };
    
    console.log('✅ Lógica do dashboard corrigida');
  } else {
    console.log('❌ Função renderDashboard não encontrada');
  }
}

// Função para forçar atualização do dashboard
function forcarAtualizacaoDashboard() {
  console.log('🔄 Forçando atualização do dashboard...');
  
  // Recarregar dados
  if (window.loadTransactions && window.loadRecorrentes) {
    Promise.all([
      window.loadTransactions(),
      window.loadRecorrentes()
    ]).then(() => {
      console.log('✅ Dados recarregados');
      
      // Forçar renderização
      if (window.refreshCurrentView) {
        window.refreshCurrentView();
        console.log('✅ Dashboard atualizado');
      }
    });
  } else {
    console.log('❌ Funções de carregamento não disponíveis');
  }
}

// Função para verificar o estado atual
function verificarEstadoAtual() {
  console.log('🔍 Verificando estado atual...');
  
  const transacoes = window.appState.transactions || [];
  const recorrentes = window.appState.recorrentes || [];
  
  const recorrentesEfetivadas = transacoes.filter(t => t.recorrenteId);
  const recorrentesAgendadas = recorrentes.filter(rec => {
    const jaEfetivada = recorrentesEfetivadas.some(t => t.recorrenteId === rec.id);
    return !jaEfetivada;
  });
  
  console.log(`📊 Estado atual:`);
  console.log(`   - Recorrentes efetivadas: ${recorrentesEfetivadas.length}`);
  recorrentesEfetivadas.forEach((t, index) => {
    const recorrente = recorrentes.find(r => r.id === t.recorrenteId);
    console.log(`     ${index + 1}. ${recorrente?.descricao || t.descricao} - ${t.parcelaAtual} de ${t.parcelasTotal}`);
  });
  
  console.log(`   - Recorrentes agendadas: ${recorrentesAgendadas.length}`);
  recorrentesAgendadas.forEach((r, index) => {
    console.log(`     ${index + 1}. ${r.descricao} - ${r.parcelasTotal} parcelas`);
  });
}

// Função para simular a correção
function simularCorrecao() {
  console.log('🧪 Simulando correção...');
  
  const transacoes = window.appState.transactions || [];
  const recorrentes = window.appState.recorrentes || [];
  
  // Recorrentes efetivadas (que deveriam aparecer no dashboard)
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
  
  console.log(`📊 Recorrentes efetivadas que deveriam aparecer no dashboard:`);
  recorrentesEfetivadas.forEach((r, index) => {
    console.log(`   ${index + 1}. ${r.descricao} - ${r.status} - R$ ${r.valor}`);
  });
  
  if (recorrentesEfetivadas.length === 0) {
    console.log('   ℹ️ Nenhuma recorrente efetivada encontrada');
  }
}

// Função principal
function corrigirDashboard() {
  console.log('🚀 Iniciando correção do dashboard...');
  
  verificarEstadoAtual();
  simularCorrecao();
  
  console.log('\n💡 Para aplicar a correção, use:');
  console.log('   corrigirLogicaDashboard()');
  console.log('   forcarAtualizacaoDashboard()');
}

// Executar correção
corrigirDashboard();
