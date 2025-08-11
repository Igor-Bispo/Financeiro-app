// Script simples para investigar o histórico de recorrentes
console.log('🔍 INVESTIGAÇÃO SIMPLES: Verificando histórico...');

// Função para investigar
async function investigar() {
  try {
    console.log('🔍 Iniciando investigação...');
    
    // 1. Verificar transações no appState
    const transacoes = window.appState.transactions || [];
    console.log('📊 Total de transações no appState:', transacoes.length);
    
    // 2. Buscar transações da recorrente Fralda
    const transacoesFralda = transacoes.filter(t => 
      t.recorrenteId === '1z6gLBeGbJG2DvdizaDc' || 
      t.descricao?.toLowerCase().includes('fralda')
    );
    
    console.log('🔍 Transações da Fralda no appState:', transacoesFralda.length);
    transacoesFralda.forEach((t, index) => {
      console.log(`  ${index + 1}. ${t.descricao} - R$ ${t.valor} - RecorrenteId: ${t.recorrenteId} - BudgetId: ${t.budgetId} - ID: ${t.id}`);
    });
    
    // 3. Verificar recorrentes
    const recorrentes = window.appState.recorrentes || [];
    const recorrenteFralda = recorrentes.find(r => r.id === '1z6gLBeGbJG2DvdizaDc');
    
    if (recorrenteFralda) {
      console.log('✅ Recorrente Fralda encontrada:', {
        id: recorrenteFralda.id,
        descricao: recorrenteFralda.descricao,
        valor: recorrenteFralda.valor,
        ativa: recorrenteFralda.ativa
      });
    }
    
    // 4. Verificar budget atual
    const budgetAtual = window.appState.currentBudget;
    console.log('💰 Budget atual:', {
      id: budgetAtual?.id,
      nome: budgetAtual?.nome,
      mes: budgetAtual?.mes,
      ano: budgetAtual?.ano
    });
    
    // 5. Testar histórico diretamente
    console.log('🔍 Testando histórico...');
    if (window.showHistoricoRecorrente) {
      await window.showHistoricoRecorrente('1z6gLBeGbJG2DvdizaDc');
    } else {
      console.error('❌ Função showHistoricoRecorrente não encontrada');
    }
    
  } catch (error) {
    console.error('❌ Erro na investigação:', error);
  }
}

// Executar investigação
investigar(); 