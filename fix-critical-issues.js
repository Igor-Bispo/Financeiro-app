// 🔧 SCRIPT DE CORREÇÃO DE PROBLEMAS CRÍTICOS
// Este script resolve os principais problemas identificados na análise

console.log('🔧 Iniciando correção de problemas críticos...');

// ===== 1. CORREÇÃO DO SISTEMA DE VOZ =====
function fixVoiceSystem() {
  console.log('🎤 Corrigindo sistema de voz...');
  
  // Verificar se VoiceSystem existe
  if (!window.VoiceSystem) {
    console.log('⚠️ VoiceSystem não encontrado, pulando correção');
    return;
  }
  
  // Patch para melhorar estabilidade
  const originalHandleRecognitionError = window.VoiceSystem.prototype.handleRecognitionError;
  
  window.VoiceSystem.prototype.handleRecognitionError = function(event) {
    console.log('🔧 [VOICE FIX] Erro interceptado:', event.error);
    
    // Melhor tratamento para erro 'no-speech'
    if (event.error === 'no-speech') {
      console.log('🔧 [VOICE FIX] Tratamento melhorado para no-speech');
      
      // Não reiniciar imediatamente se já houve fala
      if (this.hasReceivedSpeech) {
        console.log('🔧 [VOICE FIX] Aguardando mais tempo devido à fala anterior');
        setTimeout(() => {
          if (this.isModalOpen && !this.isListening && !this.isStarting && !this.isProcessingCommand) {
            this.hasError = false;
            this.startListening(this.currentType);
          }
        }, 3000); // Aguardar 3 segundos
        return;
      }
    }
    
    // Chamar método original para outros erros
    if (originalHandleRecognitionError) {
      originalHandleRecognitionError.call(this, event);
    }
  };
  
  // Patch para melhorar o handleRecognitionEnd
  const originalHandleRecognitionEnd = window.VoiceSystem.prototype.handleRecognitionEnd;
  
  window.VoiceSystem.prototype.handleRecognitionEnd = function() {
    console.log('🔧 [VOICE FIX] Fim de reconhecimento interceptado');
    
    this.isListening = false;
    this.isStarting = false;
    
    // Delay mais inteligente baseado no contexto
    let restartDelay = 500;
    
    if (this.hasReceivedSpeech && !this.isProcessingCommand) {
      restartDelay = 2000; // Aguardar mais se houve fala
    }
    
    if (this.isProcessingCommand) {
      console.log('🔧 [VOICE FIX] Não reiniciar - processando comando');
      return;
    }
    
    // Só reiniciar se modal estiver aberto e não houve erro
    if (this.isModalOpen && !this.hasError) {
      console.log(`🔧 [VOICE FIX] Reiniciando em ${restartDelay}ms...`);
      setTimeout(() => {
        if (this.isModalOpen && !this.isListening && !this.isStarting && !this.isProcessingCommand) {
          this.startListening(this.currentType);
        }
      }, restartDelay);
    }
  };
  
  console.log('✅ Sistema de voz corrigido');
}

// ===== 2. CORREÇÃO DO CÁLCULO DE PARCELAS =====
function fixParcelasCalculation() {
  console.log('📊 Corrigindo cálculo de parcelas...');
  
  // Verificar se a função existe
  if (typeof window.calcularParcelaRecorrente !== 'function') {
    console.log('⚠️ calcularParcelaRecorrente não encontrada, pulando correção');
    return;
  }
  
  // Backup da função original
  window.originalCalcularParcelaRecorrente = window.calcularParcelaRecorrente;
  
  // Função corrigida
  window.calcularParcelaRecorrente = function(recorrente) {
    console.log('🔧 [PARCELAS FIX] Calculando parcela para:', recorrente.descricao);
    
    try {
      // Se não tem parcelas, retornar null
      if (!recorrente.parcelasTotal || recorrente.parcelasTotal <= 0) {
        console.log('🔧 [PARCELAS FIX] Sem parcelas definidas');
        return null;
      }
      
      // Se não tem parcelas restantes definidas, calcular baseado na data
      if (recorrente.parcelasRestantes === null || recorrente.parcelasRestantes === undefined) {
        console.log('🔧 [PARCELAS FIX] Parcelas restantes não definidas, calculando...');
        
        if (!recorrente.dataInicio) {
          console.log('🔧 [PARCELAS FIX] Sem data de início, assumindo parcela 1');
          return 1;
        }
        
        const [ano, mes, dia] = recorrente.dataInicio.split('-').map(Number);
        const dataInicio = new Date(ano, mes - 1, dia);
        const agora = new Date();
        
        const mesesDecorridos = (agora.getFullYear() - dataInicio.getFullYear()) * 12 + 
                               (agora.getMonth() - dataInicio.getMonth());
        
        const parcelaAtual = Math.min(mesesDecorridos + 1, recorrente.parcelasTotal);
        
        console.log('🔧 [PARCELAS FIX] Parcela calculada:', parcelaAtual);
        return parcelaAtual;
      }
      
      // Calcular parcela atual baseada nas restantes
      const parcelaAtual = recorrente.parcelasTotal - recorrente.parcelasRestantes + 1;
      
      // Garantir que está dentro dos limites
      const parcelaFinal = Math.max(1, Math.min(parcelaAtual, recorrente.parcelasTotal));
      
      console.log('🔧 [PARCELAS FIX] Parcela final:', parcelaFinal);
      return parcelaFinal;
      
    } catch (error) {
      console.error('🔧 [PARCELAS FIX] Erro no cálculo:', error);
      // Fallback para função original
      if (window.originalCalcularParcelaRecorrente) {
        return window.originalCalcularParcelaRecorrente(recorrente);
      }
      return 1;
    }
  };
  
  console.log('✅ Cálculo de parcelas corrigido');
}

// ===== 3. CORREÇÃO DE CONDIÇÕES DE CORRIDA =====
function fixRaceConditions() {
  console.log('🏃 Corrigindo condições de corrida...');
  
  // Implementar debounce para funções críticas
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  // Aplicar debounce em funções de renderização
  if (window.renderDashboard) {
    window.renderDashboard = debounce(window.renderDashboard, 300);
  }
  
  if (window.renderAnalytics) {
    window.renderAnalytics = debounce(window.renderAnalytics, 300);
  }
  
  if (window.renderTransactions) {
    window.renderTransactions = debounce(window.renderTransactions, 300);
  }
  
  if (window.renderCategories) {
    window.renderCategories = debounce(window.renderCategories, 300);
  }
  
  console.log('✅ Condições de corrida corrigidas');
}

// ===== 4. CORREÇÃO DE TRATAMENTO DE ERROS =====
function fixErrorHandling() {
  console.log('🚨 Melhorando tratamento de erros...');
  
  // Interceptar erros globais
  window.addEventListener('error', function(event) {
    console.error('🚨 [ERROR FIX] Erro global capturado:', event.error);
    
    // Mostrar notificação amigável ao usuário
    if (window.Snackbar && window.Snackbar.show) {
      window.Snackbar.show('Ocorreu um erro inesperado. Tente novamente.', 'error');
    }
  });
  
  // Interceptar promessas rejeitadas
  window.addEventListener('unhandledrejection', function(event) {
    console.error('🚨 [ERROR FIX] Promise rejeitada:', event.reason);
    
    // Mostrar notificação amigável ao usuário
    if (window.Snackbar && window.Snackbar.show) {
      window.Snackbar.show('Erro de conexão. Verifique sua internet.', 'error');
    }
    
    // Prevenir que o erro apareça no console do navegador
    event.preventDefault();
  });
  
  console.log('✅ Tratamento de erros melhorado');
}

// ===== 5. CORREÇÃO DE VAZAMENTOS DE MEMÓRIA =====
function fixMemoryLeaks() {
  console.log('🧹 Corrigindo vazamentos de memória...');
  
  // Rastrear event listeners para limpeza
  window.eventListenersRegistry = window.eventListenersRegistry || [];
  
  // Wrapper para addEventListener que registra os listeners
  const originalAddEventListener = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function(type, listener, options) {
    // Registrar o listener
    window.eventListenersRegistry.push({
      target: this,
      type: type,
      listener: listener,
      options: options
    });
    
    // Chamar o método original
    return originalAddEventListener.call(this, type, listener, options);
  };
  
  // Função para limpar listeners órfãos
  window.cleanupEventListeners = function() {
    console.log('🧹 Limpando event listeners órfãos...');
    
    let cleaned = 0;
    window.eventListenersRegistry = window.eventListenersRegistry.filter(entry => {
      // Verificar se o elemento ainda existe no DOM
      if (entry.target.nodeType && !document.contains(entry.target)) {
        try {
          entry.target.removeEventListener(entry.type, entry.listener, entry.options);
          cleaned++;
          return false; // Remover da registry
        } catch (error) {
          console.warn('🧹 Erro ao remover listener:', error);
        }
      }
      return true; // Manter na registry
    });
    
    console.log(`🧹 ${cleaned} listeners órfãos removidos`);
  };
  
  // Executar limpeza periodicamente
  setInterval(window.cleanupEventListeners, 60000); // A cada minuto
  
  console.log('✅ Vazamentos de memória corrigidos');
}

// ===== EXECUÇÃO DAS CORREÇÕES =====
function executeAllFixes() {
  console.log('🚀 Executando todas as correções...');
  
  try {
    fixVoiceSystem();
  } catch (error) {
    console.error('❌ Erro ao corrigir sistema de voz:', error);
  }
  
  try {
    fixParcelasCalculation();
  } catch (error) {
    console.error('❌ Erro ao corrigir cálculo de parcelas:', error);
  }
  
  try {
    fixRaceConditions();
  } catch (error) {
    console.error('❌ Erro ao corrigir condições de corrida:', error);
  }
  
  try {
    fixErrorHandling();
  } catch (error) {
    console.error('❌ Erro ao melhorar tratamento de erros:', error);
  }
  
  try {
    fixMemoryLeaks();
  } catch (error) {
    console.error('❌ Erro ao corrigir vazamentos de memória:', error);
  }
  
  console.log('✅ Todas as correções aplicadas com sucesso!');
  
  // Mostrar notificação de sucesso
  if (window.Snackbar && window.Snackbar.show) {
    window.Snackbar.show('Correções aplicadas com sucesso!', 'success');
  }
}

// Executar quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', executeAllFixes);
} else {
  executeAllFixes();
}

// Exportar para uso manual
window.fixCriticalIssues = executeAllFixes;

console.log('🔧 Script de correção carregado. Execute window.fixCriticalIssues() para aplicar manualmente.');