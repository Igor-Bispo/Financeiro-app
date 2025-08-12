// 🎤 TESTE DE DUPLICAÇÃO DE EVENT LISTENERS NO SISTEMA DE VOZ
// Execute este script no console do navegador para testar as correções

console.log('🎤 Iniciando teste de duplicação de event listeners...');

// Função para contar event listeners (aproximação)
function countEventListeners() {
  const results = {
    escapeListeners: 0,
    clickListeners: 0,
    closeButtonListeners: 0
  };
  
  // Verificar se o VoiceSystem existe
  if (typeof window.openVoiceModal !== 'function') {
    console.log('❌ VoiceSystem não encontrado');
    return results;
  }
  
  console.log('✅ VoiceSystem encontrado');
  return results;
}

// Função para testar abertura e fechamento múltiplo
async function testMultipleOpenClose() {
  console.log('\n🔄 Testando abertura e fechamento múltiplo...');
  
  for (let i = 1; i <= 3; i++) {
    console.log(`\n--- Teste ${i} ---`);
    
    // Abrir modal
    console.log('🔓 Abrindo modal...');
    if (typeof window.openVoiceModal === 'function') {
      window.openVoiceModal('transaction');
    }
    
    // Aguardar um pouco
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Fechar modal
    console.log('🔒 Fechando modal...');
    if (typeof window.closeVoiceModal === 'function') {
      window.closeVoiceModal();
    }
    
    // Aguardar um pouco
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n✅ Teste de abertura/fechamento múltiplo concluído');
}

// Função para simular clique no botão de fechar
function testCloseButton() {
  console.log('\n🔘 Testando botão de fechar...');
  
  // Abrir modal primeiro
  if (typeof window.openVoiceModal === 'function') {
    window.openVoiceModal('transaction');
    
    setTimeout(() => {
      const closeBtn = document.getElementById('close-voice-modal');
      if (closeBtn) {
        console.log('🔘 Clicando no botão de fechar...');
        closeBtn.click();
      } else {
        console.log('❌ Botão de fechar não encontrado');
      }
    }, 1000);
  }
}

// Função para verificar logs de duplicação
function checkDuplicationLogs() {
  console.log('\n📋 Verificando logs de duplicação...');
  console.log('Observe os logs do console para:');
  console.log('- 🧹 Removendo event listeners existentes...');
  console.log('- 🔧 Configurando eventos globais do VoiceSystem...');
  console.log('- ✅ Event listener do botão de fechar configurado');
  console.log('- ❌ Close voice modal button clicked (deve aparecer apenas uma vez por clique)');
}

// Executar testes
async function runTests() {
  console.log('🎤 === TESTE DE DUPLICAÇÃO DE EVENT LISTENERS ===\n');
  
  // Verificar estado inicial
  console.log('📊 Estado inicial:');
  countEventListeners();
  
  // Verificar logs
  checkDuplicationLogs();
  
  // Testar abertura/fechamento múltiplo
  await testMultipleOpenClose();
  
  // Testar botão de fechar
  setTimeout(() => {
    testCloseButton();
  }, 2000);
  
  console.log('\n🎤 === TESTE CONCLUÍDO ===');
  console.log('\n📝 INSTRUÇÕES:');
  console.log('1. Observe os logs do console durante os testes');
  console.log('2. Verifique se "Close voice modal button clicked" aparece apenas uma vez por clique');
  console.log('3. Verifique se os event listeners são removidos e reconfigurados corretamente');
  console.log('4. Teste manualmente: abra o FAB, clique em voz, feche o modal várias vezes');
}

// Executar testes automaticamente
runTests();

// Exportar funções para uso manual
window.testVoiceEventListeners = {
  runTests,
  testMultipleOpenClose,
  testCloseButton,
  countEventListeners,
  checkDuplicationLogs
};

console.log('\n🔧 Funções disponíveis em window.testVoiceEventListeners');