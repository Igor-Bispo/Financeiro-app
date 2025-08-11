// 🎤 SCRIPT DE TESTE DO SISTEMA DE VOZ
// Execute este script no console do navegador para testar o sistema

console.log('🎤 Iniciando teste do sistema de voz...');

// Função para testar o sistema de voz
async function testVoiceSystem() {
  console.log('🔍 Verificando disponibilidade do sistema...');
  
  // 1. Verificar se as funções globais existem
  console.log('📋 Verificando funções globais:');
  console.log('  - openVoiceModal:', typeof window.openVoiceModal === 'function');
  console.log('  - closeVoiceModal:', typeof window.closeVoiceModal === 'function');
  console.log('  - startVoiceRecognition:', typeof window.startVoiceRecognition === 'function');
  
  // 2. Verificar se o modal existe no DOM
  const modal = document.getElementById('voice-modal');
  console.log('  - Modal no DOM:', !!modal);
  
  if (modal) {
    console.log('  - Modal classes:', modal.className);
    console.log('  - Modal style display:', modal.style.display);
  }
  
  // 3. Verificar botão de voz
  const voiceBtn = document.getElementById('voice-btn');
  console.log('  - Botão de voz:', !!voiceBtn);
  
  // 4. Verificar suporte do navegador
  const hasWebkitSpeech = 'webkitSpeechRecognition' in window;
  const hasSpeech = 'SpeechRecognition' in window;
  console.log('  - Suporte webkitSpeechRecognition:', hasWebkitSpeech);
  console.log('  - Suporte SpeechRecognition:', hasSpeech);
  console.log('  - Protocolo:', location.protocol);
  console.log('  - Hostname:', location.hostname);
  
  // 5. Verificar permissões de microfone
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    try {
      console.log('🎤 Testando acesso ao microfone...');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      console.log('✅ Acesso ao microfone OK');
    } catch (error) {
      console.error('❌ Erro de acesso ao microfone:', error.name, error.message);
    }
  } else {
    console.warn('⚠️ API getUserMedia não disponível');
  }
  
  // 6. Testar abertura do modal
  console.log('🧪 Testando abertura do modal...');
  if (typeof window.openVoiceModal === 'function') {
    try {
      const result = window.openVoiceModal('transaction');
      console.log('✅ Modal aberto:', result);
      
      // Aguardar um pouco e fechar
      setTimeout(() => {
        if (typeof window.closeVoiceModal === 'function') {
          window.closeVoiceModal();
          console.log('✅ Modal fechado');
        }
      }, 3000);
      
    } catch (error) {
      console.error('❌ Erro ao abrir modal:', error);
    }
  } else {
    console.error('❌ Função openVoiceModal não disponível');
  }
}

// Função para testar comandos específicos
function testCommands() {
  console.log('🧪 Testando reconhecimento de comandos...');
  
  const testCases = [
    'gastei cem reais com alimentação',
    'despesa de cinquenta reais para transporte',
    'receita de mil reais salário',
    'comprei algo por duzentos reais',
    'paguei trezentos reais de conta',
    'recebi quinhentos reais freelance'
  ];
  
  testCases.forEach((command, index) => {
    console.log(`📝 Teste ${index + 1}: "${command}"`);
    
    // Simular processamento do comando
    try {
      // Normalizar texto
      const normalizedText = command
        .toLowerCase()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .trim();
      
      console.log(`   Normalizado: "${normalizedText}"`);
      
      // Verificar padrões de detecção
      const hasNumber = /\b(cem|mil|duzentos|trezentos|quatrocentos|quinhentos|seiscentos|setecentos|oitocentos|novecentos|vinte|trinta|quarenta|cinquenta|sessenta|setenta|oitenta|noventa)\b/.test(normalizedText);
      const hasTransaction = /\b(gastei|paguei|comprei|recebi|despesa|receita)\b/.test(normalizedText);
      const hasValue = /\b\d+.*(?:reais?|real|r\$)\b/.test(normalizedText) || hasNumber;
      
      console.log(`   Tem número: ${hasNumber}`);
      console.log(`   Tem transação: ${hasTransaction}`);
      console.log(`   Tem valor: ${hasValue}`);
      console.log(`   Seria detectado como transação: ${hasTransaction || hasValue}`);
      
    } catch (error) {
      console.error(`   ❌ Erro no teste: ${error.message}`);
    }
    
    console.log('');
  });
}

// Função para verificar estado do app
function checkAppState() {
  console.log('🔍 Verificando estado do app...');
  console.log('  - window.appState:', !!window.appState);
  
  if (window.appState) {
    console.log('  - currentUser:', !!window.appState.currentUser);
    console.log('  - currentBudget:', !!window.appState.currentBudget);
    console.log('  - categories:', window.appState.categories?.length || 0);
    console.log('  - transactions:', window.appState.transactions?.length || 0);
  }
  
  console.log('  - addTransaction:', typeof window.addTransaction === 'function');
  console.log('  - addCategory:', typeof window.addCategory === 'function');
}

// Executar todos os testes
async function runAllTests() {
  console.log('🚀 Executando todos os testes...');
  console.log('');
  
  checkAppState();
  console.log('');
  
  await testVoiceSystem();
  console.log('');
  
  testCommands();
  console.log('');
  
  console.log('✅ Testes concluídos!');
  console.log('');
  console.log('💡 Para testar manualmente:');
  console.log('   1. Execute: window.openVoiceModal()');
  console.log('   2. Fale um comando como: "gastei cem reais com alimentação"');
  console.log('   3. Verifique se o comando foi processado corretamente');
}

// Executar testes automaticamente
runAllTests();

// Exportar funções para uso manual
window.testVoiceSystem = testVoiceSystem;
window.testCommands = testCommands;
window.checkAppState = checkAppState;
window.runAllTests = runAllTests;

console.log('🎤 Script de teste carregado! Use runAllTests() para executar novamente.');