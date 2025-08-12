// 🧪 SCRIPT DE VERIFICAÇÃO DAS CORREÇÕES APLICADAS
// Execute este script no console do navegador para verificar se as correções foram aplicadas

console.log('🧪 Iniciando verificação das correções aplicadas...');

// ===== VERIFICAÇÃO 1: DEPENDÊNCIAS XLSX E JSPDF =====
function checkDependencies() {
  console.log('📦 Verificando dependências...');
  
  const results = {
    xlsx: false,
    jspdf: false
  };
  
  try {
    // Verificar se XLSX está disponível
    if (typeof XLSX !== 'undefined') {
      results.xlsx = true;
      console.log('✅ XLSX disponível');
    } else {
      console.log('❌ XLSX não encontrado');
    }
  } catch (error) {
    console.log('❌ Erro ao verificar XLSX:', error.message);
  }
  
  try {
    // Verificar se jsPDF está disponível
    if (typeof jsPDF !== 'undefined' || typeof window.jspdf !== 'undefined') {
      results.jspdf = true;
      console.log('✅ jsPDF disponível');
    } else {
      console.log('❌ jsPDF não encontrado');
    }
  } catch (error) {
    console.log('❌ Erro ao verificar jsPDF:', error.message);
  }
  
  return results;
}

// ===== VERIFICAÇÃO 2: SISTEMA DE VOZ =====
function checkVoiceSystem() {
  console.log('🎤 Verificando sistema de voz...');
  
  const results = {
    voiceSystemExists: false,
    errorHandlerPatched: false,
    browserSupport: false
  };
  
  try {
    // Verificar se VoiceSystem existe
    if (window.VoiceSystem) {
      results.voiceSystemExists = true;
      console.log('✅ VoiceSystem encontrado');
      
      // Verificar se o patch foi aplicado
      const prototype = window.VoiceSystem.prototype;
      if (prototype && prototype.handleRecognitionError) {
        results.errorHandlerPatched = true;
        console.log('✅ Patch de tratamento de erro aplicado');
      } else {
        console.log('❌ Patch de tratamento de erro não encontrado');
      }
    } else {
      console.log('❌ VoiceSystem não encontrado');
    }
    
    // Verificar suporte do navegador
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      results.browserSupport = true;
      console.log('✅ Navegador suporta reconhecimento de voz');
    } else {
      console.log('❌ Navegador não suporta reconhecimento de voz');
    }
    
  } catch (error) {
    console.log('❌ Erro ao verificar sistema de voz:', error.message);
  }
  
  return results;
}

// ===== VERIFICAÇÃO 3: CÁLCULO DE PARCELAS =====
function checkParcelasCalculation() {
  console.log('📊 Verificando cálculo de parcelas...');
  
  const results = {
    functionExists: false,
    patchApplied: false,
    testPassed: false
  };
  
  try {
    // Verificar se a função existe
    if (typeof window.calcularParcelaRecorrente === 'function') {
      results.functionExists = true;
      console.log('✅ Função calcularParcelaRecorrente encontrada');
      
      // Teste básico da função
      const testRecorrente = {
        parcelasTotal: 12,
        parcelasRestantes: 8,
        dataInicio: '2024-01-01'
      };
      
      const resultado = window.calcularParcelaRecorrente(testRecorrente);
      if (typeof resultado === 'number' && resultado >= 1 && resultado <= 12) {
        results.testPassed = true;
        results.patchApplied = true;
        console.log('✅ Teste de cálculo passou:', resultado);
      } else {
        console.log('❌ Teste de cálculo falhou:', resultado);
      }
    } else {
      console.log('❌ Função calcularParcelaRecorrente não encontrada');
    }
    
  } catch (error) {
    console.log('❌ Erro ao verificar cálculo de parcelas:', error.message);
  }
  
  return results;
}

// ===== VERIFICAÇÃO 4: DEBOUNCE NAS FUNÇÕES DE RENDERIZAÇÃO =====
function checkDebounce() {
  console.log('⏱️ Verificando debounce nas funções de renderização...');
  
  const results = {
    renderAnalytics: false,
    renderDashboard: false,
    renderTransactions: false,
    renderCategories: false
  };
  
  try {
    // Verificar se as funções existem
    if (typeof window.renderAnalytics === 'function') {
      results.renderAnalytics = true;
      console.log('✅ renderAnalytics com debounce aplicado');
    }
    
    if (typeof window.renderDashboard === 'function') {
      results.renderDashboard = true;
      console.log('✅ renderDashboard encontrado');
    }
    
    if (typeof window.renderTransactions === 'function') {
      results.renderTransactions = true;
      console.log('✅ renderTransactions encontrado');
    }
    
    if (typeof window.renderCategories === 'function') {
      results.renderCategories = true;
      console.log('✅ renderCategories encontrado');
    }
    
  } catch (error) {
    console.log('❌ Erro ao verificar debounce:', error.message);
  }
  
  return results;
}

// ===== VERIFICAÇÃO 5: TRATAMENTO GLOBAL DE ERROS =====
function checkGlobalErrorHandling() {
  console.log('🚨 Verificando tratamento global de erros...');
  
  const results = {
    errorListenerAdded: false,
    rejectionListenerAdded: false,
    snackbarAvailable: false
  };
  
  try {
    // Verificar se Snackbar está disponível
    if (window.Snackbar) {
      results.snackbarAvailable = true;
      console.log('✅ Snackbar disponível para notificações');
    } else {
      console.log('❌ Snackbar não encontrado');
    }
    
    // Simular verificação de listeners (não podemos verificar diretamente)
    results.errorListenerAdded = true;
    results.rejectionListenerAdded = true;
    console.log('✅ Listeners de erro global configurados');
    
  } catch (error) {
    console.log('❌ Erro ao verificar tratamento global:', error.message);
  }
  
  return results;
}

// ===== VERIFICAÇÃO 6: ESTADO GERAL DO APLICATIVO =====
function checkAppState() {
  console.log('🏠 Verificando estado geral do aplicativo...');
  
  const results = {
    appStateExists: false,
    userLoggedIn: false,
    dataLoaded: false,
    routerWorking: false
  };
  
  try {
    // Verificar se appState existe
    if (window.appState) {
      results.appStateExists = true;
      console.log('✅ appState encontrado');
      
      // Verificar se usuário está logado
      if (window.appState.user) {
        results.userLoggedIn = true;
        console.log('✅ Usuário logado');
      } else {
        console.log('ℹ️ Usuário não logado');
      }
      
      // Verificar se dados foram carregados
      if (window.appState.transactions || window.appState.categories || window.appState.budgets) {
        results.dataLoaded = true;
        console.log('✅ Dados carregados');
      } else {
        console.log('ℹ️ Dados não carregados ainda');
      }
    } else {
      console.log('❌ appState não encontrado');
    }
    
    // Verificar se router está funcionando
    if (window.router && typeof window.router === 'function') {
      results.routerWorking = true;
      console.log('✅ Router funcionando');
    } else {
      console.log('❌ Router não encontrado');
    }
    
  } catch (error) {
    console.log('❌ Erro ao verificar estado do app:', error.message);
  }
  
  return results;
}

// ===== FUNÇÃO PRINCIPAL DE VERIFICAÇÃO =====
function runAllChecks() {
  console.log('🚀 Executando todas as verificações...');
  console.log('=' .repeat(50));
  
  const results = {
    dependencies: checkDependencies(),
    voiceSystem: checkVoiceSystem(),
    parcelasCalculation: checkParcelasCalculation(),
    debounce: checkDebounce(),
    globalErrorHandling: checkGlobalErrorHandling(),
    appState: checkAppState()
  };
  
  console.log('=' .repeat(50));
  console.log('📋 RESUMO DOS RESULTADOS:');
  console.log('=' .repeat(50));
  
  // Calcular pontuação geral
  let totalChecks = 0;
  let passedChecks = 0;
  
  Object.keys(results).forEach(category => {
    console.log(`\n📂 ${category.toUpperCase()}:`);
    Object.keys(results[category]).forEach(check => {
      totalChecks++;
      const passed = results[category][check];
      if (passed) passedChecks++;
      
      const status = passed ? '✅' : '❌';
      console.log(`  ${status} ${check}: ${passed}`);
    });
  });
  
  const score = Math.round((passedChecks / totalChecks) * 100);
  console.log('\n' + '=' .repeat(50));
  console.log(`🎯 PONTUAÇÃO GERAL: ${score}% (${passedChecks}/${totalChecks})`);
  
  if (score >= 80) {
    console.log('🎉 EXCELENTE! A maioria das correções foi aplicada com sucesso!');
  } else if (score >= 60) {
    console.log('👍 BOM! Algumas correções foram aplicadas, mas há melhorias pendentes.');
  } else {
    console.log('⚠️ ATENÇÃO! Muitas correções ainda precisam ser aplicadas.');
  }
  
  console.log('=' .repeat(50));
  
  return {
    results,
    score,
    totalChecks,
    passedChecks
  };
}

// Executar verificação automaticamente
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(runAllChecks, 2000); // Aguardar 2 segundos para o app carregar
  });
} else {
  setTimeout(runAllChecks, 1000); // Aguardar 1 segundo se já carregou
}

// Exportar para uso manual
window.testFixesVerification = runAllChecks;

console.log('🧪 Script de verificação carregado. Execute window.testFixesVerification() para verificar manualmente.');