/**
 * Script simplificado para corrigir a recorrência "undefined" no dashboard
 * Usa apenas o appState local sem depender do Firestore
 */

(function() {
  console.log('🔧 Iniciando correção simplificada da recorrência "undefined"...');
  
  // Verificar se temos acesso ao appState
  if (!window.appState) {
    console.log('❌ window.appState não encontrado');
    return;
  }
  
  const user = window.appState.currentUser;
  const transacoes = window.appState.transactions || [];
  const recorrentes = window.appState.recorrentes || [];
  
  if (!user) {
    console.log('❌ Usuário não encontrado');
    return;
  }
  
  console.log(`📊 Analisando ${transacoes.length} transações e ${recorrentes.length} recorrentes...`);
  
  // Encontrar transações com recorrenteId órfão
  const transacoesOrfas = transacoes.filter(t => {
    if (!t.recorrenteId) return false;
    
    // Verificar se existe uma recorrência correspondente
    const recorrenteExiste = recorrentes.some(r => r.id === t.recorrenteId);
    return !recorrenteExiste;
  });
  
  console.log(`🚨 Encontradas ${transacoesOrfas.length} transações órfãs:`);
  
  transacoesOrfas.forEach((t, index) => {
    console.log(`  ${index + 1}. "${t.descricao}" - recorrenteId: ${t.recorrenteId} - ID: ${t.id}`);
  });
  
  if (transacoesOrfas.length === 0) {
    console.log('✅ Nenhuma transação órfã encontrada!');
    return;
  }
  
  // Confirmar correção
  const confirmar = confirm(
    `Encontradas ${transacoesOrfas.length} transações com recorrenteId órfão.\n\n` +
    `Essas transações estão causando a exibição de "undefined" no dashboard.\n\n` +
    `Deseja corrigir localmente? (Apenas no appState, sem alterar o Firestore)`
  );
  
  if (!confirmar) {
    console.log('❌ Operação cancelada pelo usuário');
    return;
  }
  
  // Corrigir transações órfãs localmente
  let corrigidas = 0;
  
  transacoesOrfas.forEach(transacaoOrfa => {
    // Encontrar a transação no appState e remover o recorrenteId
    const transacaoLocal = window.appState.transactions.find(t => t.id === transacaoOrfa.id);
    if (transacaoLocal) {
      transacaoLocal.recorrenteId = null;
      transacaoLocal.recorrenteNome = null;
      transacaoLocal.parcelaAtual = null;
      transacaoLocal.parcelasTotal = null;
      
      console.log(`✅ Corrigida localmente: "${transacaoLocal.descricao}" (ID: ${transacaoLocal.id})`);
      corrigidas++;
    }
  });
  
  console.log(`\n📊 Resultado: ${corrigidas} transações corrigidas localmente`);
  
  if (corrigidas > 0) {
    console.log('🔄 Recarregando dashboard...');
    
    // Recarregar o dashboard
    try {
      if (window.renderDashboard) {
        window.renderDashboard();
        console.log('✅ Dashboard recarregado!');
      } else {
        console.log('⚠️ Função renderDashboard não encontrada. Recarregue a página manualmente.');
      }
    } catch (error) {
      console.error('❌ Erro ao recarregar dashboard:', error);
      console.log('⚠️ Recarregue a página manualmente para ver as alterações.');
    }
  }
  
  console.log('🎉 Correção local concluída!');
  console.log('⚠️ NOTA: Esta correção é apenas local. Para corrigir permanentemente, use o script fix-dashboard-undefined.js');
})();

// Função adicional para debug
window.debugTransacoesOrfasSimples = function() {
  console.log('🔍 === DEBUG TRANSAÇÕES ÓRFÃS (SIMPLES) ===');
  
  const transacoes = window.appState.transactions || [];
  const recorrentes = window.appState.recorrentes || [];
  
  console.log(`📊 Total de transações: ${transacoes.length}`);
  console.log(`📊 Total de recorrentes: ${recorrentes.length}`);
  
  // Transações com recorrenteId
  const transacoesComRecorrente = transacoes.filter(t => t.recorrenteId);
  console.log(`📊 Transações com recorrenteId: ${transacoesComRecorrente.length}`);
  
  // Transações órfãs
  const transacoesOrfas = transacoes.filter(t => {
    if (!t.recorrenteId) return false;
    const recorrenteExiste = recorrentes.some(r => r.id === t.recorrenteId);
    return !recorrenteExiste;
  });
  
  console.log(`🚨 Transações órfãs: ${transacoesOrfas.length}`);
  
  transacoesOrfas.forEach((t, index) => {
    console.log(`  ${index + 1}. "${t.descricao}" - recorrenteId: ${t.recorrenteId}`);
  });
  
  // IDs de recorrentes existentes
  console.log('\n📋 IDs de recorrentes existentes:');
  recorrentes.forEach((r, index) => {
    console.log(`  ${index + 1}. ${r.id} - "${r.descricao}"`);
  });
};

console.log('\n💡 Para debug, execute: debugTransacoesOrfasSimples()');