// 🎤 Teste do Sistema de Voz Reestruturado
console.log('🧪 Iniciando teste do sistema de voz reestruturado...');

// Função para testar o sistema de voz
function testVoiceSystem() {
  console.log('🔍 Testando sistema de voz...');
  
  // Verificar se o VoiceSystem está disponível
  console.log('🔧 Verificando VoiceSystem:');
  console.log('  - VoiceSystem disponível:', typeof VoiceSystem !== 'undefined');
  console.log('  - voiceSystem global:', !!window.voiceSystem);
  
  // Verificar funções globais
  console.log('🔧 Verificando funções globais:');
  console.log('  - openVoiceModal:', !!window.openVoiceModal);
  console.log('  - closeVoiceModal:', !!window.closeVoiceModal);
  console.log('  - startVoiceRecognition:', !!window.startVoiceRecognition);
  
  // Verificar modal de voz
  const voiceModal = document.getElementById('voice-modal');
  const voiceContent = voiceModal?.querySelector('.voice-content');
  
  console.log('🔧 Verificando modal de voz:');
  console.log('  - Modal encontrado:', !!voiceModal);
  console.log('  - Conteúdo encontrado:', !!voiceContent);
  
  if (voiceModal && voiceContent) {
    console.log('✅ Modal de voz encontrado e funcional');
  } else {
    console.error('❌ Modal de voz não encontrado');
  }
  
  // Verificar suporte do navegador
  console.log('🔧 Verificando suporte do navegador:');
  console.log('  - SpeechRecognition:', !!window.SpeechRecognition);
  console.log('  - webkitSpeechRecognition:', !!window.webkitSpeechRecognition);
  console.log('  - mediaDevices:', !!navigator.mediaDevices);
  console.log('  - getUserMedia:', !!navigator.mediaDevices?.getUserMedia);
  
  // Verificar HTTPS
  const isHTTPS = location.protocol === 'https:' || location.hostname === 'localhost';
  console.log('  - HTTPS/Localhost:', isHTTPS);
}

// Função para testar comandos de voz
function testVoiceCommands() {
  console.log('🎤 Testando comandos de voz...');
  
  const testCommands = [
    {
      text: 'adicionar despesa de 50 reais com alimentação',
      type: 'transaction',
      expected: 'transaction'
    },
    {
      text: 'nova categoria chamada transporte',
      type: 'category',
      expected: 'category'
    },
    {
      text: 'qual é o meu saldo',
      type: 'query',
      expected: 'query'
    },
    {
      text: 'ir para o dashboard',
      type: 'navigation',
      expected: 'navigation'
    }
  ];
  
  testCommands.forEach((command, index) => {
    console.log(`🔧 Testando comando ${index + 1}:`, command.text);
    
    // Simular processamento do comando
    const normalizedText = command.text
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '');
    
    console.log('  - Texto normalizado:', normalizedText);
    console.log('  - Tipo esperado:', command.expected);
    console.log('  - Tipo fornecido:', command.type);
  });
}

// Função para testar parsing de transações
function testTransactionParsing() {
  console.log('💰 Testando parsing de transações...');
  
  const testTransactions = [
    'gastei 50 reais com alimentação',
    'recebi 1000 reais de salário',
    'paguei 25 reais no transporte',
    'ganhei 500 reais de bônus'
  ];
  
  testTransactions.forEach((text, index) => {
    console.log(`🔧 Testando transação ${index + 1}:`, text);
    
    // Simular parsing
    const normalizedText = text.toLowerCase();
    
    // Extrair tipo
    let tipo = 'despesa';
    if (/\b(recebi|ganhei)\b/.test(normalizedText)) {
      tipo = 'receita';
    }
    
    // Extrair valor
    const valorMatch = text.match(/(\d+(?:[.,]\d{1,2})?)\s*(?:reais?|r\$|real)/i);
    const valor = valorMatch ? parseFloat(valorMatch[1].replace(',', '.')) : null;
    
    // Extrair categoria
    const categoriaMatch = text.match(/\b(com|para|em)\s+([a-záàâãéèêíìîóòôõúùûç\s]+?)(?:\s+(?:de|com|para|em)\s+\d|$)/i);
    const categoria = categoriaMatch ? categoriaMatch[2].trim() : 'Outros';
    
    console.log('  - Tipo:', tipo);
    console.log('  - Valor:', valor);
    console.log('  - Categoria:', categoria);
  });
}

// Função para testar parsing de categorias
function testCategoryParsing() {
  console.log('📂 Testando parsing de categorias...');
  
  const testCategories = [
    'nova categoria chamada transporte',
    'criar categoria alimentação',
    'adicionar categoria lazer',
    'categoria chamada saúde'
  ];
  
  testCategories.forEach((text, index) => {
    console.log(`🔧 Testando categoria ${index + 1}:`, text);
    
    // Simular parsing
    const patterns = [
      /\b(?:categoria|categoria)\s+(?:chamada|de|para)\s+([a-záàâãéèêíìîóòôõúùûç\s]+?)(?:\s*$)/i,
      /\b(?:nova|criar|adicionar)\s+(?:categoria|categoria)\s+([a-záàâãéèêíìîóòôõúùûç\s]+?)(?:\s*$)/i,
      /\b(?:categoria|categoria)\s+([a-záàâãéèêíìîóòôõúùûç\s]+?)(?:\s*$)/i
    ];
    
    let categoryName = null;
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        categoryName = match[1].trim();
        break;
      }
    }
    
    console.log('  - Nome da categoria:', categoryName);
  });
}

// Função para testar cálculos
function testCalculations() {
  console.log('🧮 Testando cálculos...');
  
  // Simular dados de transações
  const mockTransactions = [
    { tipo: 'receita', valor: 1000 },
    { tipo: 'receita', valor: 500 },
    { tipo: 'despesa', valor: 300 },
    { tipo: 'despesa', valor: 200 }
  ];
  
  // Calcular receitas
  const receitas = mockTransactions
    .filter(t => t.tipo === 'receita')
    .reduce((sum, t) => sum + parseFloat(t.valor), 0);
  
  // Calcular despesas
  const despesas = mockTransactions
    .filter(t => t.tipo === 'despesa')
    .reduce((sum, t) => sum + parseFloat(t.valor), 0);
  
  // Calcular saldo
  const saldo = receitas - despesas;
  
  console.log('  - Receitas:', receitas);
  console.log('  - Despesas:', despesas);
  console.log('  - Saldo:', saldo);
}

// Função para testar modal
function testModal() {
  console.log('📱 Testando modal de voz...');
  
  const modal = document.getElementById('voice-modal');
  const content = modal?.querySelector('.voice-content');
  const title = modal?.querySelector('h3');
  const description = modal?.querySelector('p');
  const icon = modal?.querySelector('.voice-icon div');
  const status = modal?.querySelector('.voice-status');
  const closeBtn = modal?.querySelector('#close-voice-modal');
  
  console.log('🔧 Elementos do modal:');
  console.log('  - Modal:', !!modal);
  console.log('  - Conteúdo:', !!content);
  console.log('  - Título:', !!title);
  console.log('  - Descrição:', !!description);
  console.log('  - Ícone:', !!icon);
  console.log('  - Status:', !!status);
  console.log('  - Botão fechar:', !!closeBtn);
  
  // Testar animações
  if (modal && content) {
    console.log('🎬 Testando animações do modal...');
    
    // Simular abertura
    modal.style.display = 'flex';
    modal.style.pointerEvents = 'auto';
    modal.style.background = 'rgba(0, 0, 0, 0.95)';
    modal.style.backdropFilter = 'blur(30px)';
    content.style.transform = 'scale(1)';
    content.style.opacity = '1';
    
    console.log('✅ Modal aberto');
    
    // Simular fechamento após 2 segundos
    setTimeout(() => {
      content.style.transform = 'scale(0.95)';
      content.style.opacity = '0';
      modal.style.background = 'rgba(0, 0, 0, 0)';
      modal.style.backdropFilter = 'blur(0px)';
      
      setTimeout(() => {
        modal.style.pointerEvents = 'none';
        modal.style.display = 'none';
        console.log('✅ Modal fechado');
      }, 300);
    }, 2000);
  }
}

// Função para testar permissões
async function testPermissions() {
  console.log('🔐 Testando permissões...');
  
  try {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      console.log('✅ getUserMedia disponível');
      
      // Verificar dispositivos de áudio
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audioDevices = devices.filter(device => device.kind === 'audioinput');
      
      console.log('🔧 Dispositivos de áudio:', audioDevices.length);
      audioDevices.forEach((device, index) => {
        console.log(`  - Dispositivo ${index + 1}:`, device.label || `Microfone ${index + 1}`);
      });
      
      // Testar permissão
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log('✅ Permissão de microfone concedida');
        stream.getTracks().forEach(track => track.stop());
      } catch (error) {
        console.warn('⚠️ Permissão de microfone negada:', error.message);
      }
    } else {
      console.warn('⚠️ getUserMedia não disponível');
    }
  } catch (error) {
    console.error('❌ Erro ao testar permissões:', error);
  }
}

// Função para testar reconhecimento de voz
function testSpeechRecognition() {
  console.log('🎤 Testando reconhecimento de voz...');
  
  const hasSupport = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  console.log('  - Suporte ao reconhecimento:', hasSupport);
  
  if (hasSupport) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'pt-BR';
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      
      console.log('✅ Reconhecimento configurado');
      console.log('  - Idioma:', recognition.lang);
      console.log('  - Contínuo:', recognition.continuous);
      console.log('  - Resultados intermediários:', recognition.interimResults);
      console.log('  - Alternativas máximas:', recognition.maxAlternatives);
      
    } catch (error) {
      console.error('❌ Erro ao configurar reconhecimento:', error);
    }
  }
}

// Executar todos os testes
function runVoiceTests() {
  console.log('🧪 Executando testes do sistema de voz...');
  
  // Aguardar um pouco para o sistema carregar
  setTimeout(() => {
    testVoiceSystem();
    
    setTimeout(() => {
      testVoiceCommands();
      
      setTimeout(() => {
        testTransactionParsing();
        
        setTimeout(() => {
          testCategoryParsing();
          
          setTimeout(() => {
            testCalculations();
            
            setTimeout(() => {
              testModal();
              
              setTimeout(() => {
                testPermissions();
                
                setTimeout(() => {
                  testSpeechRecognition();
                  console.log('✅ Todos os testes do sistema de voz concluídos');
                }, 1000);
              }, 1000);
            }, 1000);
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
}

// Executar testes se o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runVoiceTests);
} else {
  runVoiceTests();
}

console.log('🧪 Teste do sistema de voz reestruturado configurado. Verifique o console para resultados.');
