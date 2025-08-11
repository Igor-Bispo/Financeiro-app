// 🧪 TESTE DE CORREÇÃO DO SISTEMA DE VOZ
// Verifica se o erro InvalidStateError foi resolvido

console.log('🧪 === TESTE DE CORREÇÃO DO SISTEMA DE VOZ ===');

// Função para testar múltiplas aberturas rápidas
async function testMultipleOpens() {
  console.log('\n🔄 Testando múltiplas aberturas rápidas...');
  
  try {
    // Abrir modal várias vezes rapidamente
    for (let i = 1; i <= 5; i++) {
      console.log(`\n📱 Tentativa ${i}:`);
      
      // Abrir modal
      if (window.openVoiceModal) {
        window.openVoiceModal();
        console.log(`✅ Modal aberto (tentativa ${i})`);
        
        // Aguardar um pouco
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Fechar modal
        const voiceSystem = window.voiceSystemInstance;
        if (voiceSystem && voiceSystem.closeModal) {
          voiceSystem.closeModal();
          console.log(`✅ Modal fechado (tentativa ${i})`);
        }
        
        // Aguardar antes da próxima tentativa
        await new Promise(resolve => setTimeout(resolve, 300));
      } else {
        console.error('❌ Função openVoiceModal não encontrada');
        break;
      }
    }
    
    console.log('\n✅ Teste de múltiplas aberturas concluído sem erros!');
    
  } catch (error) {
    console.error('❌ Erro durante teste:', error);
  }
}

// Função para testar abertura rápida consecutiva
async function testRapidConsecutiveOpens() {
  console.log('\n⚡ Testando aberturas consecutivas rápidas...');
  
  try {
    // Abrir 3 vezes seguidas sem aguardar
    console.log('📱 Abrindo 3 vezes seguidas...');
    
    if (window.openVoiceModal) {
      window.openVoiceModal();
      window.openVoiceModal();
      window.openVoiceModal();
      
      console.log('✅ Três aberturas executadas');
      
      // Aguardar e fechar
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const voiceSystem = window.voiceSystemInstance;
      if (voiceSystem && voiceSystem.closeModal) {
        voiceSystem.closeModal();
        console.log('✅ Modal fechado');
      }
    }
    
    console.log('✅ Teste de aberturas consecutivas concluído!');
    
  } catch (error) {
    console.error('❌ Erro durante teste consecutivo:', error);
  }
}

// Função para verificar estado do sistema
function checkSystemState() {
  console.log('\n🔍 Verificando estado do sistema...');
  
  const voiceSystem = window.voiceSystemInstance;
  if (voiceSystem) {
    console.log('📊 Estado atual:');
    console.log('  - isListening:', voiceSystem.isListening);
    console.log('  - isStarting:', voiceSystem.isStarting);
    console.log('  - hasError:', voiceSystem.hasError);
    console.log('  - isModalOpen:', voiceSystem.isModalOpen);
    console.log('  - retryCount:', voiceSystem.retryCount);
  } else {
    console.log('⚠️ VoiceSystem não encontrado');
  }
}

// Executar testes
async function runTests() {
  console.log('🚀 Iniciando testes...\n');
  
  // Verificar estado inicial
  checkSystemState();
  
  // Teste 1: Múltiplas aberturas
  await testMultipleOpens();
  
  // Verificar estado após teste 1
  checkSystemState();
  
  // Aguardar um pouco
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Teste 2: Aberturas consecutivas
  await testRapidConsecutiveOpens();
  
  // Verificar estado final
  checkSystemState();
  
  console.log('\n🎉 Todos os testes concluídos!');
  console.log('💡 Se não houve erros "InvalidStateError", a correção funcionou!');
}

// Executar testes automaticamente
runTests().catch(error => {
  console.error('❌ Erro geral nos testes:', error);
});

// Exportar funções para uso manual
window.testVoiceFix = {
  runTests,
  testMultipleOpens,
  testRapidConsecutiveOpens,
  checkSystemState
};

console.log('\n💡 Funções disponíveis:');
console.log('  - testVoiceFix.runTests() - Executar todos os testes');
console.log('  - testVoiceFix.testMultipleOpens() - Testar múltiplas aberturas');
console.log('  - testVoiceFix.testRapidConsecutiveOpens() - Testar aberturas consecutivas');
console.log('  - testVoiceFix.checkSystemState() - Verificar estado do sistema');
