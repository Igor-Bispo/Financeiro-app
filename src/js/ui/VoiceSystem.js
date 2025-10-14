// 🎤 SISTEMA DE COMANDO DE VOZ REESTRUTURADO
// Versão 2.0.0 - Completamente modular e robusto

class VoiceSystem {
  constructor() {
    this.isListening = false;
    this.isStarting = false;
    this.hasError = false;
    this.isProcessingCommand = false;
    this.recognition = null;
    this.currentType = null;
    this.isModalOpen = false;
    this.retryCount = 0;
    this.maxRetries = 3;
    this.microphonePermissionChecked = false; // Cache de permissão para evitar delays
    this.hasReceivedSpeech = false; // Flag para controlar se já recebeu fala
    this.hasRecognizedSomething = false; // Flag para controlar se reconheceu algo
    this.shouldKeepListening = true; // Flag para controlar se deve continuar escutando

    console.log('🎤 VoiceSystem inicializado');
    
    // Criar o modal no DOM se não existir
    this.createModalIfNeeded();
    
    // Inicializar sistema de aprendizagem v3.0
    this.inicializarSistemaAprendizagem();
  }

  // ===== CRIAÇÃO DO MODAL =====

  createModalIfNeeded() {
    // Verificar se o modal já existe
    const existingModal = document.getElementById('voice-modal');
    if (existingModal) {
      // Verificar se é a versão otimizada para mobile
      const contentElement = existingModal.querySelector('.voice-content-premium');
      if (!contentElement) {
        console.log('🎤 Modal antigo encontrado, recriando versão otimizada...');
        existingModal.remove();
      } else {
        console.log('🎤 Modal de voz otimizado já existe no DOM');
        return;
      }
    }

    console.log('🎤 Criando modal de voz premium otimizado para mobile...');

    const modalHTML = `
      <div id="voice-modal" class="voice-modal-premium" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 9999; justify-content: center; align-items: center; opacity: 0; pointer-events: none; transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);">
        
        <!-- Background animado com partículas -->
        <div class="voice-background" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(120, 200, 255, 0.3) 0%, transparent 50%), linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%); animation: backgroundShift 8s ease-in-out infinite;"></div>
        
        <!-- Partículas flutuantes -->
        <div class="floating-particles">
          <div class="particle" style="position: absolute; width: 4px; height: 4px; background: rgba(255,255,255,0.6); border-radius: 50%; animation: float1 6s ease-in-out infinite; top: 20%; left: 10%;"></div>
          <div class="particle" style="position: absolute; width: 6px; height: 6px; background: rgba(255,255,255,0.4); border-radius: 50%; animation: float2 8s ease-in-out infinite; top: 60%; right: 15%;"></div>
          <div class="particle" style="position: absolute; width: 3px; height: 3px; background: rgba(255,255,255,0.8); border-radius: 50%; animation: float3 7s ease-in-out infinite; bottom: 30%; left: 20%;"></div>
          <div class="particle" style="position: absolute; width: 5px; height: 5px; background: rgba(255,255,255,0.5); border-radius: 50%; animation: float4 9s ease-in-out infinite; top: 40%; right: 30%;"></div>
        </div>

        <!-- Modal principal - OTIMIZADO PARA MOBILE -->
        <div class="voice-content-premium" style="position: relative; background: rgba(255,255,255,0.95); backdrop-filter: blur(20px); border-radius: 12px; padding: 0; max-width: 320px; width: 85%; max-height: 75vh; text-align: center; box-shadow: 0 8px 16px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.1); transform: scale(0.8) translateY(20px); opacity: 0; transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); overflow: hidden; display: flex; flex-direction: column;">
          
          <!-- Header com gradiente - COMPACTO -->
          <div class="voice-header" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 8px 6px 6px; position: relative; overflow: hidden;">
            <!-- Efeito de brilho -->
            <div class="shine-effect" style="position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%); animation: shine 3s ease-in-out infinite;"></div>
            
            <!-- Ícone principal animado - MENOR -->
            <div class="voice-icon-container" style="position: relative; display: inline-block; margin-bottom: 2px;">
              <div class="voice-icon-glow" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 32px; height: 32px; background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%); border-radius: 50%; animation: iconGlow 2s ease-in-out infinite;"></div>
              <div class="voice-icon" style="font-size: 20px; position: relative; z-index: 2; animation: iconPulse 2s ease-in-out infinite; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));">🎤</div>
            </div>
            
            <!-- Título principal - MENOR -->
            <h3 class="voice-title" style="color: white; font-size: 14px; font-weight: 800; margin-bottom: 1px; text-shadow: 0 1px 2px rgba(0,0,0,0.3); letter-spacing: -0.5px;">Estou te ouvindo!</h3>
            
            <!-- Subtítulo - MENOR -->
            <p class="voice-subtitle" style="color: rgba(255,255,255,0.9); font-size: 9px; margin-bottom: 0; font-weight: 500; line-height: 1.1;">Fale naturalmente como você gastou ou recebeu dinheiro</p>
          </div>

          <!-- Corpo do modal - COMPACTO -->
          <div class="voice-body" style="padding: 6px; background: white; overflow-y: auto; flex: 1; max-height: calc(75vh - 100px); min-height: 120px;">
            
            <!-- Indicador de escuta avançado - COMPACTO -->
            <div class="voice-status-premium" style="display: flex; justify-content: center; align-items: center; gap: 4px; margin-bottom: 6px; padding: 4px; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 6px; border: 1px solid rgba(148, 163, 184, 0.1);">
              <div class="sound-wave" style="display: flex; gap: 1px; align-items: center;">
                <div class="wave-bar" style="width: 2px; height: 6px; background: linear-gradient(to top, #667eea, #764ba2); border-radius: 1px; animation: waveBar1 1.2s ease-in-out infinite;"></div>
                <div class="wave-bar" style="width: 2px; height: 8px; background: linear-gradient(to top, #667eea, #764ba2); border-radius: 1px; animation: waveBar2 1.2s ease-in-out infinite;"></div>
                <div class="wave-bar" style="width: 2px; height: 7px; background: linear-gradient(to top, #667eea, #764ba2); border-radius: 1px; animation: waveBar3 1.2s ease-in-out infinite;"></div>
                <div class="wave-bar" style="width: 2px; height: 8px; background: linear-gradient(to top, #667eea, #764ba2); border-radius: 1px; animation: waveBar4 1.2s ease-in-out infinite;"></div>
                <div class="wave-bar" style="width: 2px; height: 5px; background: linear-gradient(to top, #667eea, #764ba2); border-radius: 1px; animation: waveBar5 1.2s ease-in-out infinite;"></div>
              </div>
              <span style="color: #64748b; font-size: 9px; font-weight: 600; margin-left: 4px;">Escutando...</span>
            </div>
            
            <!-- Exemplos com design premium - COMPACTO -->
            <div class="examples-container" style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 6px; padding: 4px; margin-bottom: 4px; border: 1px solid rgba(148, 163, 184, 0.1);">
              <div style="display: flex; align-items: center; gap: 2px; margin-bottom: 4px;">
                <span style="font-size: 8px;">💡</span>
                <h4 style="color: #1e293b; font-size: 8px; font-weight: 700; margin: 0;">Como falar corretamente</h4>
              </div>
              
              <!-- Exemplos de Transação - ATUALIZADOS -->
              <div style="margin-bottom: 4px;">
                <div style="display: flex; align-items: center; gap: 2px; margin-bottom: 2px;">
                  <span style="font-size: 7px;">💰</span>
                  <h5 style="color: #1e293b; font-size: 7px; font-weight: 600; margin: 0;">Transações:</h5>
                </div>
                
                <div class="example-item" style="background: white; border-radius: 3px; padding: 2px; margin-bottom: 2px; border-left: 1px solid #667eea; box-shadow: 0 1px 1px rgba(0,0,0,0.05);">
                  <p style="color: #475569; font-size: 6px; margin: 0; font-weight: 500; line-height: 1.1;">
                    <strong>Despesa:</strong> descrição, valor, tipo, categoria
                  </p>
                </div>
                
                <div class="example-item" style="background: white; border-radius: 3px; padding: 2px; margin-bottom: 2px; border-left: 1px solid #10b981; box-shadow: 0 1px 1px rgba(0,0,0,0.05);">
                  <p style="color: #475569; font-size: 6px; margin: 0; font-weight: 500; line-height: 1.1;">
                    <strong>Receita:</strong> descrição, valor, tipo, categoria
                  </p>
                </div>
              </div>
              
              <!-- Exemplos de Categoria - ATUALIZADOS -->
              <div>
                <div style="display: flex; align-items: center; gap: 2px; margin-bottom: 2px;">
                  <span style="font-size: 7px;">📁</span>
                  <h5 style="color: #1e293b; font-size: 7px; font-weight: 600; margin: 0;">Categorias:</h5>
                </div>
                
                <div class="example-item" style="background: white; border-radius: 3px; padding: 2px; border-left: 1px solid #764ba2; box-shadow: 0 1px 1px rgba(0,0,0,0.05);">
                  <p style="color: #475569; font-size: 6px; margin: 0; font-weight: 500; line-height: 1.1;">
                    <strong>Básica:</strong> nome, tipo e limite
                  </p>
                </div>
              </div>
            </div>
            
            <!-- Botões de ação -->
            <div class="action-buttons" style="display: flex; flex-direction: column; gap: 6px; margin-top: 6px;">
              <!-- Botão para tentar novamente (móvel) -->
              <button onclick="window.restartVoiceRecognition()" class="restart-btn-mobile" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; border: none; padding: 10px 16px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3); position: relative; overflow: hidden; width: 100%; display: none;">
                <span style="position: relative; z-index: 2;">🎤 Falar Novamente</span>
              </button>
              
              <!-- Botão de cancelar premium - MAIOR E MAIS VISÍVEL -->
              <button onclick="window.closeVoiceModal()" class="cancel-btn-premium" style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; border: none; padding: 12px 20px; border-radius: 8px; font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 3px 6px rgba(239, 68, 68, 0.4); position: relative; overflow: hidden; width: 100%; flex-shrink: 0; text-transform: uppercase; letter-spacing: 0.5px;">
                <span style="position: relative; z-index: 2;">✕ Cancelar</span>
                <div class="btn-shine" style="position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent); transition: left 0.5s ease;"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Adicionar o modal ao body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Adicionar as animações premium via style tag
    const style = document.createElement('style');
    style.textContent = `
      @keyframes backgroundShift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      
      @keyframes float1 {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
      }
      
      @keyframes float2 {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-30px) rotate(-180deg); }
      }
      
      @keyframes float3 {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-25px) rotate(90deg); }
      }
      
      @keyframes float4 {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-35px) rotate(-90deg); }
      }
      
      @keyframes shine {
        0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
        100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
      }
      
      @keyframes iconGlow {
        0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
        50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.6; }
      }
      
      @keyframes iconPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      
      @keyframes waveBar1 {
        0%, 100% { height: 20px; }
        50% { height: 40px; }
      }
      
      @keyframes waveBar2 {
        0%, 100% { height: 32px; }
        50% { height: 50px; }
      }
      
      @keyframes waveBar3 {
        0%, 100% { height: 24px; }
        50% { height: 42px; }
      }
      
      @keyframes waveBar4 {
        0%, 100% { height: 28px; }
        50% { height: 46px; }
      }
      
      @keyframes waveBar5 {
        0%, 100% { height: 16px; }
        50% { height: 34px; }
      }
      
      .voice-modal-open .voice-modal-premium {
        opacity: 1 !important;
        pointer-events: auto !important;
      }
      
      .voice-modal-open .voice-content-premium {
        transform: scale(1) translateY(0) !important;
        opacity: 1 !important;
      }
      
      .example-item:hover {
        transform: translateY(-2px) !important;
        box-shadow: 0 4px 16px rgba(0,0,0,0.1) !important;
      }
      
      .cancel-btn-premium:hover {
        transform: translateY(-2px) !important;
        box-shadow: 0 8px 24px rgba(239, 68, 68, 0.4) !important;
      }
      
      .cancel-btn-premium:hover .btn-shine {
        left: 100% !important;
      }
      
      .cancel-btn-premium:active {
        transform: translateY(0) !important;
      }
      
      /* === RESPONSIVIDADE MOBILE OTIMIZADA === */
      @media (max-width: 480px) {
        .voice-content-premium {
          max-width: 90vw !important;
          width: 90vw !important;
          max-height: 70vh !important;
          margin: 0 5vw !important;
        }
        
        .voice-body {
          padding: 4px !important;
          max-height: calc(70vh - 80px) !important;
          min-height: 100px !important;
        }
        
        .voice-header {
          padding: 6px 4px 4px !important;
        }
        
        .voice-title {
          font-size: 12px !important;
        }
        
        .voice-subtitle {
          font-size: 8px !important;
        }
        
        .voice-icon {
          font-size: 18px !important;
        }
        
        .examples-container {
          padding: 3px !important;
          margin-bottom: 3px !important;
        }
        
        .cancel-btn-premium {
          padding: 10px 16px !important;
          font-size: 13px !important;
          margin-top: 4px !important;
        }
        
        .voice-status-premium {
          padding: 3px !important;
          margin-bottom: 4px !important;
        }
        
        .voice-status-premium span {
          font-size: 8px !important;
        }
      }
      
      /* === DISPOSITIVOS MUITO PEQUENOS === */
      @media (max-width: 360px) {
        .voice-content-premium {
          max-width: 95vw !important;
          width: 95vw !important;
          max-height: 65vh !important;
        }
        
        .voice-body {
          max-height: calc(65vh - 70px) !important;
          min-height: 90px !important;
        }
        
        .cancel-btn-premium {
          padding: 8px 12px !important;
          font-size: 12px !important;
        }
      }
    `;
    document.head.appendChild(style);

    console.log('✅ Modal de voz premium criado no DOM com responsividade otimizada');
  }

  // ===== INICIALIZAÇÃO =====

  init() {
    console.log('🎤 Inicializando VoiceSystem...');

    // Verificar suporte do navegador
    if (!this.checkBrowserSupport()) {
      console.error('❌ Navegador não suporta reconhecimento de voz');
      this.showError('Seu navegador não suporta reconhecimento de voz. Use Chrome ou Edge.');
      return false;
    }

    // Verificar HTTPS
    if (!this.checkHTTPS()) {
      console.error('❌ HTTPS necessário para reconhecimento de voz');
      this.showError('O reconhecimento de voz requer HTTPS. Por favor, acesse o site via HTTPS.');
      return false;
    }

    // Configurar reconhecimento
    try {
      this.setupRecognition();
      console.log('✅ Reconhecimento configurado');
    } catch (error) {
      console.error('❌ Erro ao configurar reconhecimento:', error);
      return false;
    }

    // Configurar eventos globais
    try {
      this.setupGlobalEvents();
      console.log('✅ Eventos globais configurados');
    } catch (error) {
      console.error('❌ Erro ao configurar eventos:', error);
    }

    console.log('✅ VoiceSystem inicializado com sucesso');
    return true;
  }

  // ===== VERIFICAÇÕES =====

  checkBrowserSupport() {
    const hasSupport = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    console.log('🔍 Suporte ao reconhecimento de voz:', hasSupport);
    return hasSupport;
  }

  checkHTTPS() {
    const isSecure = location.protocol === 'https:' || location.hostname === 'localhost';
    console.log('🔍 Protocolo seguro:', isSecure);
    return isSecure;
  }

  // ===== CONFIGURAÇÃO DO RECONHECIMENTO =====

  setupRecognition() {
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();

      // Detectar se é mobile/Android para configurações específicas
      const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isAndroid = /Android/i.test(navigator.userAgent);
      
      console.log('📱 Plataforma detectada:', { isMobile, isAndroid, userAgent: navigator.userAgent });

      // Configurações otimizadas para mobile e Android
      this.recognition.lang = 'pt-BR';
      
      // Para Android/mobile, usar configurações mais conservadoras
      if (isMobile || isAndroid) {
        console.log('📱 Aplicando configurações para mobile/Android');
        this.recognition.continuous = false;  // Desabilitar continuous no mobile para maior estabilidade
        this.recognition.interimResults = false;  // Apenas resultados finais no mobile
        this.recognition.maxAlternatives = 1;
      } else {
        console.log('💻 Aplicando configurações para desktop');
        this.recognition.continuous = true;  // Manter continuous para captura contínua no desktop
        this.recognition.interimResults = true;  // Resultados intermediários para feedback
        this.recognition.maxAlternatives = 1;
      }

      // Configurações adicionais para estabilidade
      if (this.recognition.serviceURI !== undefined) {
        // Configurações específicas do Chrome
        this.recognition.serviceURI = 'wss://www.google.com/speech-api/v2/recognize';
      }

      // Event listeners com logs detalhados
      this.recognition.onstart = () => this.handleRecognitionStart();
      this.recognition.onresult = (event) => this.handleRecognitionResult(event);
      this.recognition.onerror = (event) => this.handleRecognitionError(event);
      this.recognition.onend = () => this.handleRecognitionEnd();
      this.recognition.onspeechstart = () => this.handleSpeechStart();
      this.recognition.onspeechend = () => this.handleSpeechEnd();
      this.recognition.onsoundstart = () => this.handleSoundStart();
      this.recognition.onsoundend = () => this.handleSoundEnd();
      
      // Adicionar listener para áudio start/end (Android específico)
      if (this.recognition.onaudiostart) {
        this.recognition.onaudiostart = () => {
          console.log('🎧 Áudio iniciado (Android)');
          this.updateModalStatus('', 'Microfone ativo...', 'listening');
        };
      }
      
      if (this.recognition.onaudioend) {
        this.recognition.onaudioend = () => {
          console.log('🎧 Áudio finalizado (Android)');
        };
      }

      console.log('✅ Reconhecimento configurado com eventos adicionais', {
        continuous: this.recognition.continuous,
        interimResults: this.recognition.interimResults,
        lang: this.recognition.lang,
        isMobile,
        isAndroid
      });
    } catch (error) {
      console.error('❌ Erro ao configurar reconhecimento:', error);
      this.showError('Erro ao configurar reconhecimento de voz');
    }
  }

  // ===== EVENTOS DO RECONHECIMENTO =====

  handleRecognitionStart() {
    console.log('🎤 Reconhecimento iniciado');
    this.isListening = true;
    this.hasReceivedSpeech = false; // Flag para controlar se já recebeu fala
    this.updateModalStatus('', 'Aguardando sua voz...', 'listening');
  }

  handleSpeechStart() {
    console.log('🗣️ Fala detectada - início');
    this.hasReceivedSpeech = true;
    this.updateModalStatus('', 'Ouvindo...', 'listening');
  }

  handleSpeechEnd() {
    console.log('🗣️ Fala detectada - fim');
    // Não reiniciar imediatamente após o fim da fala
    // Aguardar o resultado final
  }

  handleSoundStart() {
    console.log('🔊 Som detectado - início');
  }

  handleSoundEnd() {
    console.log('🔊 Som detectado - fim');
  }

  handleRecognitionResult(event) {
    console.log('🎤 Resultado recebido:', event);
    console.log('🎤 Número total de resultados:', event.results.length);

    // Resetar contador de no-speech quando há sucesso
    this.noSpeechCount = 0;

    // Detectar se é mobile para comportamento específico
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    const lastResult = event.results[event.results.length - 1];
    const transcript = lastResult[0].transcript.trim();
    const confidence = lastResult[0].confidence || 0.8; // Fallback para Android
    const isFinal = lastResult.isFinal;

    // *** DEBUG MELHORADO - LOG DETALHADO DE ALTERNATIVAS ***
    console.log('🎤 Transcrição:', transcript);
    console.log('🎤 Confiança:', confidence);
    console.log('🎤 Final:', isFinal);
    console.log('🎤 Comprimento da transcrição:', transcript.length);
    
    // Log de todas as alternativas disponíveis para debugging
    if (lastResult.length > 1) {
      console.log('🎤 ALTERNATIVAS DISPONÍVEIS:');
      for (let i = 0; i < Math.min(lastResult.length, 3); i++) {
        console.log(`   ${i + 1}. "${lastResult[i].transcript}" (confiança: ${lastResult[i].confidence || 'N/A'})`);
      }
    }
    
    // Log do texto original vs normalizado
    const normalizedForComparison = this.normalizeText(transcript);
    console.log('🎤 COMPARAÇÃO:', {
      original: transcript,
      normalizado: normalizedForComparison,
      diferente: transcript !== normalizedForComparison
    });

    // Verificar se há transcrição válida
    if (!transcript || transcript.length < 2) {
      console.log('⚠️ Transcrição muito curta ou vazia, ignorando');
      return;
    }

    if (isFinal) {
      // Resultado final - processar imediatamente
      console.log('✅ Resultado final recebido, processando...');
      this.updateModalStatus('', `Você disse: "${transcript}"`, 'processing');

      // No mobile (continuous = false), processar imediatamente
      if (isMobile) {
        console.log('📱 Processamento imediato para mobile');
        if (!this.isProcessingCommand) {
          this.processCommand(transcript, confidence);
        }
      } else {
        // No desktop (continuous = true), aguardar um pouco
        console.log('💻 Processamento com delay para desktop');
        setTimeout(() => {
          if (!this.isProcessingCommand) {
            this.processCommand(transcript, confidence);
          }
        }, 200);
      }
    } else {
      // Resultado intermediário - mostrar feedback (apenas no desktop)
      if (!isMobile) {
        this.updateModalStatus('', `Ouvindo: "${transcript}..."`, 'listening');
      } else {
        console.log('📱 Resultado intermediário no mobile (não exibindo)');
      }
    }
  }

  handleRecognitionError(event) {
    console.error('🎤 Erro no reconhecimento:', event);
    this.isListening = false;
    this.isStarting = false;

    const errorMessage = this.getErrorMessage(event.error);

    // Marcar que houve erro para evitar reinicialização automática
    this.hasError = true;

    // Limpar flag de erro após um tempo
    setTimeout(() => {
      this.hasError = false;
    }, 5000);

    // Tratamento especial para 'no-speech'
    if (event.error === 'no-speech') {
      console.log('⚠️ Nenhuma fala detectada');

      // Incrementar contador de tentativas no-speech
      if (!this.noSpeechCount) this.noSpeechCount = 0;
      this.noSpeechCount++;

      // Se muitas tentativas seguidas, parar de reiniciar automaticamente
      if (this.noSpeechCount >= 5) {
        console.log('🛑 Muitas tentativas sem fala - parando reinicializações automáticas');
        this.updateModalStatus('', '🎤 Clique no botão do microfone para tentar novamente', 'waiting');
        this.noSpeechCount = 0;
        return;
      }

      // Se já recebeu fala antes, aguardar mais tempo
      if (this.hasReceivedSpeech) {
        console.log('ℹ️ Já havia recebido fala, aguardando mais tempo...');
        setTimeout(() => {
          if (this.isModalOpen && !this.isListening && !this.isStarting && !this.isProcessingCommand) {
            this.hasError = false;
            this.startListening(this.currentType);
          }
        }, 3000); // Aguardar mais tempo se já havia fala
      } else {
        console.log(`ℹ️ Tentativa ${this.noSpeechCount}/5 - reiniciando rapidamente...`);
        setTimeout(() => {
          if (this.isModalOpen && !this.isListening && !this.isStarting && !this.isProcessingCommand) {
            this.hasError = false;
            this.startListening(this.currentType);
          }
        }, 1000); // Reiniciar com delay maior
      }
      return;
    }

    this.updateModalStatus('', errorMessage, 'error');

    // Tentar novamente se for erro de rede ou serviço
    if (this.shouldRetry(event.error) && this.retryCount < this.maxRetries) {
      this.retryCount++;
      console.log(`🔄 Tentativa ${this.retryCount} de ${this.maxRetries}`);

      setTimeout(() => {
        if (this.isModalOpen) {
          this.hasError = false;
          this.startListening(this.currentType);
        }
      }, 2000);
    } else {
      // Fechar modal após erro
      setTimeout(() => {
        this.closeModal();
      }, 3000);
    }
  }

  handleRecognitionEnd() {
    console.log('🎤 Reconhecimento finalizado');
    this.isListening = false;
    this.isStarting = false;

    // Detectar se é mobile para comportamento específico
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    console.log('🎤 Estado após finalização:', {
      isModalOpen: this.isModalOpen,
      hasError: this.hasError,
      isProcessingCommand: this.isProcessingCommand,
      hasReceivedSpeech: this.hasReceivedSpeech,
      isMobile
    });

    // No mobile (continuous = false), não reiniciar automaticamente - aguardar novo comando manual
    if (isMobile) {
      console.log('📱 Mobile detectado - aguardando nova ativação manual');
      
      // Se não está processando comando e não houve erro, mostrar mensagem para tentar novamente
      if (this.isModalOpen && !this.isProcessingCommand && !this.hasError) {
        this.updateModalStatus('', 'Toque no microfone para falar novamente', 'waiting');
        
        // Mostrar botão de reiniciar no mobile
        const restartBtn = document.querySelector('.restart-btn-mobile');
        if (restartBtn) {
          restartBtn.style.display = 'block';
        }
        
        // Aguardar um tempo e fechar o modal se não houver ação
        setTimeout(() => {
          if (this.isModalOpen && !this.isProcessingCommand) {
            console.log('📱 Fechando modal após timeout no mobile');
            this.closeModal();
          }
        }, 5000);
      }
      return;
    }

    // Comportamento para desktop (continuous = true)
    console.log('💻 Desktop detectado - reinicialização automática');
    
    // Se recebeu fala mas não processou comando, aguardar mais tempo antes de reiniciar
    const restartDelay = this.hasReceivedSpeech && !this.isProcessingCommand ? 1000 : 500;

    // Só reiniciar se modal estiver aberto, não houve erro e não está processando comando
    if (this.isModalOpen && !this.isListening && !this.hasError && !this.isProcessingCommand) {
      console.log(`🔄 Reiniciando reconhecimento em ${restartDelay}ms...`);
      setTimeout(() => {
        if (this.isModalOpen && !this.isListening && !this.isStarting && !this.isProcessingCommand) {
          console.log('🔄 Executando reinicialização...');
          this.startListening(this.currentType);
        } else {
          console.log('🚫 Cancelando reinicialização - condições não atendidas');
        }
      }, restartDelay);
    } else {
      console.log('🚫 Não reiniciando - condições não atendidas:', {
        isModalOpen: this.isModalOpen,
        isListening: this.isListening,
        hasError: this.hasError,
        isProcessingCommand: this.isProcessingCommand
      });
    }
  }

  // ===== PROCESSAMENTO DE COMANDOS =====

  async processCommand(transcript, _confidence) {
    try {
      this.isProcessingCommand = true;
      console.log('🎤 Processando comando:', transcript);

      // Normalizar texto
      const normalizedText = this.normalizeText(transcript);
      console.log('🎤 Texto normalizado:', normalizedText);

      // Determinar tipo de comando
      const commandType = this.determineCommandType(normalizedText);
      console.log('🎤 Tipo de comando:', commandType);

      // PARAR RECONHECIMENTO IMEDIATAMENTE após receber comando
      console.log('🛑 [VoiceSystem] Parando reconhecimento após comando...');
      await this.stopAllRecognition();

      // Processar comando
      const result = await this.executeCommand(normalizedText, commandType);

      // Mostrar resultado
      this.showSuccess(result);

      // Fechar modal rapidamente após comando processado
      setTimeout(() => {
        this.closeModal();
      }, 1000);

    } catch (error) {
      console.error('❌ Erro ao processar comando:', error);
      this.showError(`Erro ao processar comando: ${error.message}`);

      setTimeout(() => {
        this.closeModal();
      }, 2000);
    } finally {
      this.isProcessingCommand = false;
    }
  }

  normalizeText(text) {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .trim();
  }

  determineCommandType(text) {
    console.log('🎯 ===== ANÁLISE CONTEXTUAL DE INTENÇÃO =====');
    console.log('🎯 Texto para análise:', text);

    // ETAPA 1: COMANDOS EXPLÍCITOS (prioridade máxima)
    const comandoExplicito = this.detectarComandoExplicito(text);
    if (comandoExplicito) {
      console.log(`✅ Comando explícito detectado: ${comandoExplicito.toUpperCase()}`);
      return comandoExplicito;
    }

    // ETAPA 2: ANÁLISE DE INTENÇÃO INTELIGENTE
    const analiseIntencao = this.analisarIntencao(text);
    console.log('🎯 Scores de intenção:', analiseIntencao);

    // ETAPA 3: ANÁLISE ESTRUTURAL (itens detectados)
    const analiseEstrutura = this.analisarEstrutura(text);
    console.log('🎯 Análise estrutural:', analiseEstrutura);

    // ETAPA 4: ANÁLISE CONTEXTUAL (padrões de linguagem)
    const analiseContexto = this.analisarContexto(text);
    console.log('🎯 Análise contextual:', analiseContexto);

    // ETAPA 5: CÁLCULO FINAL COM PESOS
    const scoresFinais = this.calcularScoresFinais(analiseIntencao, analiseEstrutura, analiseContexto);
    console.log('🎯 Scores finais ponderados:', scoresFinais);

    // ETAPA 6: DECISÃO BASEADA NO MAIOR SCORE
    const comandoFinal = this.determinarComandoFinal(scoresFinais, text);
    
    console.log('🎯 ===== RESULTADO FINAL =====');
    console.log(`🎯 Comando determinado: ${comandoFinal.toUpperCase()}`);
    console.log(`🎯 Confiança: ${(scoresFinais[comandoFinal] * 100).toFixed(1)}%`);
    console.log('🎯 ===========================');

    return comandoFinal;
  }

  // NOVO: Detectar comandos explícitos (mais óbvios)
  detectarComandoExplicito(text) {
    const padroes = {
      query: [
        /\b(saldo|qual.*saldo|saldo atual|quanto.*tenho|meu saldo)\b/i,
        /\b(quanto.*gastei|quanto.*recebi|total.*gastos)\b/i,
        /\b(consultar|verificar|mostrar).*\b(saldo|gastos|receitas)\b/i
      ],
      navigation: [
        /\b(ir para|va para|vá para|mostrar|abrir|navegar).*(dashboard|transacoes|transações|categorias|recorrentes)\b/i,
        /\b(abrir|mostrar).*(tela|página).*(dashboard|transacoes|transações|categorias)\b/i
      ],
      category: [
        /\b(nova categoria|criar categoria|adicionar categoria|inserir categoria)\b/i,
        /\b(categoria nova|categoria).*(criar|adicionar|nova)\b/i,
        /\b(quero|vou|preciso).*(criar|adicionar|fazer).*(categoria)\b/i
      ],
      transaction: [
        /\b(nova transacao|nova transação|criar transacao|criar transação|adicionar transacao|adicionar transação)\b/i,
        /\b(registrar|anotar).*(gasto|despesa|receita|compra)\b/i
      ]
    };

    for (const [tipo, padroesArray] of Object.entries(padroes)) {
      for (const padrao of padroesArray) {
        if (padrao.test(text)) {
          return tipo;
        }
      }
    }

    return null;
  }

  // NOVO: Análise de intenção baseada em verbos e contexto
  analisarIntencao(text) {
    const scores = { transaction: 0, category: 0, query: 0, navigation: 0 };

    // Verbos de transação (peso alto)
    const verbosTransacao = [
      'gastei', 'paguei', 'comprei', 'recebi', 'ganhei', 'custou', 'custa', 'pago',
      'despendi', 'investi', 'economizei', 'lucrei', 'perdi', 'transferi'
    ];
    
    for (const verbo of verbosTransacao) {
      if (text.includes(verbo)) {
        scores.transaction += 0.8;
        console.log(`🎯 Verbo de transação encontrado: "${verbo}" (+0.8)`);
      }
    }

    // Palavras de valor monetário (peso médio)
    const palavrasValor = [
      'reais', 'real', 'dinheiro', 'valor', 'preço', 'preco', 'custou', 'custa',
      'pagamento', 'quantia', 'montante', 'total'
    ];
    
    for (const palavra of palavrasValor) {
      if (text.includes(palavra)) {
        scores.transaction += 0.4;
        console.log(`🎯 Palavra de valor encontrada: "${palavra}" (+0.4)`);
      }
    }

    // Indicadores de categoria (peso alto)
    const indicadoresCategoria = [
      'categoria', 'tipo de gasto', 'classificacao', 'classificação', 'grupo',
      'limite', 'orcamento', 'orçamento'
    ];
    
    for (const indicador of indicadoresCategoria) {
      if (text.includes(indicador)) {
        scores.category += 0.7;
        console.log(`🎯 Indicador de categoria encontrado: "${indicador}" (+0.7)`);
      }
    }

    // Verbos de criação para categoria
    const verbosCriacao = ['criar', 'adicionar', 'inserir', 'nova', 'novo', 'fazer'];
    for (const verbo of verbosCriacao) {
      if (text.includes(verbo) && text.includes('categoria')) {
        scores.category += 0.6;
        console.log(`🎯 Verbo de criação + categoria: "${verbo}" (+0.6)`);
      }
    }

    // Indicadores de consulta
    const indicadoresConsulta = [
      'quanto', 'qual', 'como está', 'mostrar', 'verificar', 'consultar', 'saber'
    ];
    
    for (const indicador of indicadoresConsulta) {
      if (text.includes(indicador)) {
        scores.query += 0.5;
        console.log(`🎯 Indicador de consulta encontrado: "${indicador}" (+0.5)`);
      }
    }

    return scores;
  }

  // NOVO: Análise estrutural baseada nos itens detectados
  analisarEstrutura(text) {
    const items = this.extractCommandItems(text);
    const valores = items.filter(item => item.type === 'valor');
    const tipos = items.filter(item => item.type === 'tipo');
    const categorias = items.filter(item => item.type === 'categoria');
    const descricoes = items.filter(item => item.type === 'descricao');
    const comandos = items.filter(item => item.type === 'comando');

    const analise = {
      totalItens: items.length,
      valores: valores.length,
      tipos: tipos.length,
      categorias: categorias.length,
      descricoes: descricoes.length,
      comandos: comandos.length,
      scores: { transaction: 0, category: 0, query: 0, navigation: 0 }
    };

    console.log('🎯 Análise Estrutural Detalhada:');
    console.log(`🎯 Total de itens: ${items.length}`);
    console.log(`🎯 - Valores: ${valores.length}`);
    console.log(`🎯 - Tipos: ${tipos.length}`);  
    console.log(`🎯 - Categorias: ${categorias.length}`);
    console.log(`🎯 - Descrições: ${descricoes.length}`);
    console.log(`🎯 - Comandos: ${comandos.length}`);

    // ===== REGRA PRINCIPAL: 3 ITENS = CATEGORIA, 4+ ITENS = TRANSAÇÃO =====
    
    // CATEGORIA: Exatamente 3 itens significativos
    if (items.length === 3) {
      // Padrão típico: "nova categoria alimentacao despesa" 
      // ou "categoria transporte despesa" ou "criar saude receita"
      if (tipos.length >= 1) {
        analise.scores.category += 2.0; // Score altíssimo para 3 itens com tipo
        console.log('🎯 Estrutura: 3 itens com tipo = CATEGORIA (+2.0)');
      } else {
        analise.scores.category += 1.5; // Score alto para 3 itens
        console.log('🎯 Estrutura: 3 itens = CATEGORIA (+1.5)');
      }
    }

    // TRANSAÇÃO: 4 ou mais itens significativos  
    if (items.length >= 4) {
      analise.scores.transaction += 1.0; // Score máximo para 4+ itens
      console.log('🎯 Estrutura: 4+ itens = TRANSAÇÃO (+1.0)');
      
      // Bonus se tem valor (reforça transação)
      if (valores.length > 0) {
        analise.scores.transaction += 0.5;
        console.log('🎯 Estrutura: 4+ itens COM valor = TRANSAÇÃO FORTE (+0.5 bonus)');
      }
    }

    // CASOS ESPECIAIS ADICIONAIS:

    // Comando explícito "categoria" = forçar categoria
    if (comandos.some(cmd => cmd.value === 'categoria' || cmd.value === 'criar' || cmd.value === 'nova')) {
      analise.scores.category += 0.8;
      console.log('🎯 Estrutura: Comando "categoria/criar/nova" explícito (+0.8 para categoria)');
    }

    // Valor presente sem comando de categoria = favorece transação (MAS SÓ SE NÃO É 3 ITENS)
    if (valores.length > 0 && !comandos.some(cmd => ['categoria', 'criar', 'nova'].includes(cmd.value)) && items.length !== 3) {
      analise.scores.transaction += 0.7;
      console.log('🎯 Estrutura: Valor presente sem comando categoria (+0.7 para transação)');
    }

    // Muitas descrições = provável transação (MAS SÓ SE NÃO É 3 ITENS)
    if (descricoes.length >= 3 && items.length !== 3) {
      analise.scores.transaction += 0.4;
      console.log('🎯 Estrutura: Muitas descrições (+0.4 para transação)');
    }

    // Tipo sem valor = possível categoria
    if (tipos.length >= 1 && valores.length === 0 && items.length <= 3) {
      analise.scores.category += 0.5;
      console.log('🎯 Estrutura: Tipo sem valor (+0.5 para categoria)');
    }

    return analise;
  }

  // NOVO: Análise contextual avançada
  analisarContexto(text) {
    const contextos = {
      transaction: {
        locais: ['supermercado', 'restaurante', 'farmacia', 'farmácia', 'posto', 'shopping', 'loja'],
        acoes: ['compra', 'pagamento', 'gasto', 'despesa', 'receita', 'entrada'],
        temporais: ['hoje', 'ontem', 'semana', 'mes', 'mês', 'dia']
      },
      category: {
        organizacionais: ['organizar', 'classificar', 'separar', 'definir', 'estabelecer'],
        planejamento: ['planejar', 'controlar', 'gerenciar', 'administrar', 'limite', 'orçamento', 'orcamento']
      },
      query: {
        interrogativos: ['quanto', 'qual', 'como', 'onde', 'quando'],
        informativos: ['situação', 'situacao', 'estado', 'posição', 'posicao', 'balanço', 'balanco']
      }
    };

    const scores = { transaction: 0, category: 0, query: 0, navigation: 0 };

    // Analisar cada contexto
    for (const [tipo, categorias] of Object.entries(contextos)) {
      for (const [categoria, palavras] of Object.entries(categorias)) {
        for (const palavra of palavras) {
          if (text.includes(palavra)) {
            const peso = categoria === 'locais' ? 0.3 : 
                        categoria === 'acoes' ? 0.4 : 
                        categoria === 'temporais' ? 0.2 :
                        categoria === 'organizacionais' ? 0.5 :
                        categoria === 'planejamento' ? 0.4 :
                        categoria === 'interrogativos' ? 0.6 : 0.3;
            
            scores[tipo] += peso;
            console.log(`🎯 Contexto ${tipo}: "${palavra}" (${categoria}) +${peso}`);
          }
        }
      }
    }

    return scores;
  }

  // NOVO: Calcular scores finais com pesos
  calcularScoresFinais(intencao, estrutura, contexto) {
    const scores = { transaction: 0, category: 0, query: 0, navigation: 0 };

    // Pesos para cada tipo de análise
    const pesos = {
      intencao: 0.2,    // 20% - complementar
      estrutura: 0.6,   // 60% - REGRA PRINCIPAL (3 vs 4 itens)
      contexto: 0.2     // 20% - complementar
    };

    // Calcular score ponderado para cada comando
    for (const comando of Object.keys(scores)) {
      scores[comando] = 
        (intencao[comando] * pesos.intencao) +
        (estrutura.scores[comando] * pesos.estrutura) +
        (contexto[comando] * pesos.contexto);
    }

    // Normalizar scores (evitar valores muito altos)
    const maxScore = Math.max(...Object.values(scores));
    if (maxScore > 1.0) {
      for (const comando of Object.keys(scores)) {
        scores[comando] = scores[comando] / maxScore;
      }
    }

    return scores;
  }

  // NOVO: Determinar comando final com validações
  determinarComandoFinal(scores, originalText) {
    // Encontrar o comando com maior score
    let melhorComando = 'transaction'; // padrão
    let melhorScore = scores[melhorComando];

    for (const [comando, score] of Object.entries(scores)) {
      if (score > melhorScore) {
        melhorComando = comando;
        melhorScore = score;
      }
    }

    // Validações adicionais
    
    // Se score muito baixo, usar heurísticas simples
    if (melhorScore < 0.3) {
      console.log('⚠️ Score baixo, aplicando heurísticas de fallback');
      
      // Se tem número, provavelmente é transação
      if (/\b\d+\b/.test(originalText)) {
        return 'transaction';
      }
      
      // Se menciona categoria, provavelmente é categoria
      if (/categoria/i.test(originalText)) {
        return 'category';
      }
    }

    // Se diferença entre os dois maiores scores é muito pequena, aplicar tiebreaker
    const scoresOrdenados = Object.entries(scores).sort(([,a], [,b]) => b - a);
    const diferenca = scoresOrdenados[0][1] - scoresOrdenados[1][1];
    
    if (diferenca < 0.1) {
      console.log(`⚠️ Diferença pequena entre ${scoresOrdenados[0][0]} e ${scoresOrdenados[1][0]}, aplicando tiebreaker`);
      
      // Tiebreaker: preferir transação por ser mais comum
      if (scoresOrdenados[0][0] === 'category' && scoresOrdenados[1][0] === 'transaction') {
        return 'transaction';
      }
    }

    return melhorComando;
  }

  extractCommandItems(text) {
    console.log('🔍 ===== EXTRAINDO ITENS DO COMANDO =====');
    console.log('🔍 Texto original:', text);

    // Normalizar texto
    const normalizedText = text.toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .trim();

    console.log('🔍 Texto normalizado:', normalizedText);

    // *** DETECÇÃO MAIS INTELIGENTE DE ITENS ***
    const items = [];
    
    // 1. DETECTAR VALORES (números diretos ou por extenso)
    const valores = this.detectValues(normalizedText);
    valores.forEach(valor => items.push({ type: 'valor', value: valor, confidence: 'high' }));
    
    // 2. DETECTAR TIPOS (despesa/receita)
    const tipos = this.detectTypes(normalizedText);
    tipos.forEach(tipo => items.push({ type: 'tipo', value: tipo, confidence: 'high' }));
    
    // 3. DETECTAR CATEGORIAS (existentes ou novas)
    const categorias = this.detectCategories(normalizedText);
    categorias.forEach(categoria => items.push({ type: 'categoria', value: categoria.nome, confidence: categoria.confidence }));
    
    // 4. DETECTAR DESCRIÇÕES
    const descricoes = this.detectDescriptions(normalizedText, items);
    descricoes.forEach(descricao => items.push({ type: 'descricao', value: descricao, confidence: 'medium' }));
    
    // 5. DETECTAR PALAVRAS-CHAVE DE COMANDO
    const comandos = this.detectCommands(normalizedText);
    comandos.forEach(comando => items.push({ type: 'comando', value: comando, confidence: 'high' }));

    console.log('🔍 ===== RESULTADO DA EXTRAÇÃO =====');
    console.log('🔍 Total de itens encontrados:', items.length);
    items.forEach((item, index) => {
      console.log(`🔍 Item ${index + 1}: ${item.type} = "${item.value}" (confiança: ${item.confidence})`);
    });
    console.log('🔍 ===============================');
    
    return items;
  }

  detectValues(text) {
    console.log('💰 ===== DETECTANDO VALORES AVANÇADO =====');
    console.log('💰 Texto para análise:', text);
    const valores = [];
    
    // 1. NÚMEROS DIRETOS COM FORMATAÇÃO MELHORADA
    const regexNumerosDirectos = [
      /\b\d{1,3}(?:\.\d{3})*(?:,\d{2})?\b/g,  // 1.500,00 ou 1.500
      /\b\d{1,3}(?:,\d{3})*(?:\.\d{2})?\b/g,  // 1,500.00 ou 1,500
      /\b\d+[.,]\d{1,2}\b/g,                   // 100.50 ou 100,50
      /\b\d+\b/g                               // 100, 200, etc.
    ];
    
    for (const regex of regexNumerosDirectos) {
      const matches = text.match(regex);
      if (matches) {
        matches.forEach(match => {
          // Normalizar formato (converter para número)
          const valor = this.parseNumero(match);
          if (valor > 0 && !valores.includes(valor.toString())) {
            valores.push(valor.toString());
            console.log('💰 Número direto encontrado:', match, '→', valor);
          }
        });
      }
    }
    
    // 2. NÚMEROS POR EXTENSO COMPLETO
    const valorPorExtenso = this.parseNumeroPorExtensoCompleto(text);
    if (valorPorExtenso > 0) {
      valores.push(valorPorExtenso.toString());
      console.log('💰 Número por extenso encontrado:', valorPorExtenso);
    }
    
    // 3. PRIORIZAÇÃO POR VALOR (maiores primeiro)
    const valoresNumericos = valores.map(v => parseFloat(v)).sort((a, b) => b - a);
    const valoresFinais = valoresNumericos.map(v => v.toString());
    
    console.log('💰 ===== RESULTADO DETECÇÃO DE VALORES =====');
    console.log('💰 Valores encontrados:', valoresFinais);
    console.log('💰 Total de valores:', valoresFinais.length);
    console.log('💰 ==========================================');
    
    return valoresFinais;
  }

  // NOVO: Parser robusto para números diretos
  parseNumero(numeroStr) {
    if (!numeroStr) return 0;
    
    // Remover espaços
    let num = numeroStr.trim();
    
    // Detectar formato brasileiro (1.500,00) vs americano (1,500.00)
    const pontos = (num.match(/\./g) || []).length;
    const virgulas = (num.match(/,/g) || []).length;
    
    if (pontos > 0 && virgulas > 0) {
      // Formato misto: assumir brasileiro se vírgula for a última
      if (num.lastIndexOf(',') > num.lastIndexOf('.')) {
        // 1.500,00 (brasileiro)
        num = num.replace(/\./g, '').replace(',', '.');
      } else {
        // 1,500.00 (americano)
        num = num.replace(/,/g, '');
      }
    } else if (virgulas > 0 && pontos === 0) {
      // Só vírgulas: pode ser decimal (100,50) ou milhares (1,500)
      const partes = num.split(',');
      if (partes.length === 2 && partes[1].length <= 2) {
        // Decimal brasileiro: 100,50
        num = num.replace(',', '.');
      } else {
        // Milhares americano: 1,500
        num = num.replace(/,/g, '');
      }
    } else if (pontos > 0 && virgulas === 0) {
      // Só pontos: pode ser decimal (100.50) ou milhares (1.500)
      const partes = num.split('.');
      if (partes.length === 2 && partes[1].length <= 2) {
        // Já está no formato correto: 100.50
      } else {
        // Milhares brasileiro: 1.500
        num = num.replace(/\./g, '');
      }
    }
    
    const resultado = parseFloat(num);
    return isNaN(resultado) ? 0 : resultado;
  }

  // NOVO: Parser completo para números por extenso
  parseNumeroPorExtensoCompleto(text) {
    console.log('🔢 Iniciando parse de número por extenso:', text);
    
    // Mapa completo de números por extenso
    const numerosBasicos = {
      // Unidades
      'zero': 0, 'um': 1, 'uma': 1, 'dois': 2, 'duas': 2, 'tres': 3, 'três': 3,
      'quatro': 4, 'cinco': 5, 'seis': 6, 'sete': 7, 'oito': 8, 'nove': 9,
      
      // Dezenas especiais
      'dez': 10, 'onze': 11, 'doze': 12, 'treze': 13, 'catorze': 14, 'quatorze': 14,
      'quinze': 15, 'dezesseis': 16, 'dezessete': 17, 'dezoito': 18, 'dezenove': 19,
      
      // Dezenas
      'vinte': 20, 'trinta': 30, 'quarenta': 40, 'cinquenta': 50,
      'sessenta': 60, 'setenta': 70, 'oitenta': 80, 'noventa': 90,
      
      // Centenas
      'cem': 100, 'cento': 100, 'duzentos': 200, 'trezentos': 300,
      'quatrocentos': 400, 'quinhentos': 500, 'seiscentos': 600,
      'setecentos': 700, 'oitocentos': 800, 'novecentos': 900,
      
      // Milhares e mais
      'mil': 1000, 'milhao': 1000000, 'milhão': 1000000
    };
    
    // Buscar números simples primeiro
    for (const [palavra, valor] of Object.entries(numerosBasicos)) {
      const regex = new RegExp(`\\b${palavra}\\b`, 'i');
      if (regex.test(text)) {
        console.log('🔢 Número simples encontrado:', palavra, '=', valor);
        return valor;
      }
    }
    
    // Buscar combinações mais complexas
    const combinacoes = [
      // Padrões como "vinte e cinco", "cem e cinquenta"
      /\b(vinte|trinta|quarenta|cinquenta|sessenta|setenta|oitenta|noventa)\s+e\s+(um|dois|tres|quatro|cinco|seis|sete|oito|nove)\b/i,
      
      // Padrões como "mil e quinhentos", "dois mil"
      /\b(um|dois|tres|quatro|cinco|seis|sete|oito|nove)?\s*mil\s*(e\s*)?(duzentos|trezentos|quatrocentos|quinhentos|seiscentos|setecentos|oitocentos|novecentos|cem|cento)?\b/i,
      
      // Padrões como "cento e vinte", "duzentos e cinquenta"
      /\b(cento|duzentos|trezentos|quatrocentos|quinhentos|seiscentos|setecentos|oitocentos|novecentos)\s*e\s*(vinte|trinta|quarenta|cinquenta|sessenta|setenta|oitenta|noventa)\b/i
    ];
    
    for (const regex of combinacoes) {
      const match = text.match(regex);
      if (match) {
        const valorComplexo = this.calcularValorComplexo(match[0]);
        if (valorComplexo > 0) {
          console.log('� Número complexo encontrado:', match[0], '=', valorComplexo);
          return valorComplexo;
        }
      }
    }
    
    console.log('🔢 Nenhum número por extenso encontrado');
    return 0;
  }

  // NOVO: Calcular valor de expressões complexas
  calcularValorComplexo(expressao) {
    console.log('🧮 Calculando expressão complexa:', expressao);
    
    const numerosBasicos = {
      'um': 1, 'uma': 1, 'dois': 2, 'duas': 2, 'tres': 3, 'três': 3,
      'quatro': 4, 'cinco': 5, 'seis': 6, 'sete': 7, 'oito': 8, 'nove': 9,
      'dez': 10, 'vinte': 20, 'trinta': 30, 'quarenta': 40, 'cinquenta': 50,
      'sessenta': 60, 'setenta': 70, 'oitenta': 80, 'noventa': 90,
      'cem': 100, 'cento': 100, 'duzentos': 200, 'trezentos': 300,
      'quatrocentos': 400, 'quinhentos': 500, 'seiscentos': 600,
      'setecentos': 700, 'oitocentos': 800, 'novecentos': 900,
      'mil': 1000
    };
    
    const palavras = expressao.toLowerCase().split(/\s+/).filter(p => p !== 'e');
    let total = 0;
    let grupoAtual = 0;
    
    for (const palavra of palavras) {
      const valor = numerosBasicos[palavra];
      if (valor) {
        if (valor === 1000) {
          // Mil multiplica o grupo atual
          total += (grupoAtual || 1) * 1000;
          grupoAtual = 0;
        } else if (valor >= 100) {
          // Centenas
          grupoAtual += valor;
        } else {
          // Unidades e dezenas
          grupoAtual += valor;
        }
      }
    }
    
    total += grupoAtual;
    console.log('🧮 Resultado:', total);
    return total;
  }

  detectTypes(text) {
    console.log('🏷️ Detectando tipos em:', text);
    const tipos = [];
    
    if (/\b(despesa|despesas|gasto|gastos|gastar|gastei|paguei|comprei|compra|pagamento)\b/.test(text)) {
      tipos.push('despesa');
      console.log('🏷️ Tipo DESPESA detectado');
    }
    
    if (/\b(receita|receitas|entrada|entradas|renda|rendas|ganhei|recebi|salario|ganho)\b/.test(text)) {
      tipos.push('receita');
      console.log('🏷️ Tipo RECEITA detectado');
    }
    
    return tipos;
  }

  detectCategories(text) {
    console.log('📂 ===== DETECTANDO CATEGORIAS INTELIGENTE =====');
    console.log('📂 Texto para análise:', text);
    const categorias = [];
    
    if (!window.appState?.categories) {
      console.log('📂 Nenhuma categoria existente encontrada');
      return categorias;
    }
    
    // Sistema de análise avançada para cada categoria
    for (const cat of window.appState.categories) {
      const analise = this.analisarCompatibilidadeCategoria(text, cat);
      
      if (analise.score > 0.4) { // Threshold mais baixo para capturar mais possibilidades
        categorias.push({
          nome: cat.nome,
          id: cat.id,
          score: analise.score,
          confidence: this.calcularConfiancaCategoria(analise.score),
          existing: true,
          motivo: analise.motivo,
          detalhes: analise.detalhes
        });
        
        console.log(`📂 Categoria candidata: "${cat.nome}" (score: ${analise.score.toFixed(2)}, motivo: ${analise.motivo})`);
      }
    }
    
    // Ordenar por score (melhor primeiro)
    categorias.sort((a, b) => b.score - a.score);
    
    console.log('📂 ===== RESULTADO DETECÇÃO DE CATEGORIAS =====');
    console.log('📂 Categorias encontradas:', categorias.length);
    categorias.forEach((cat, index) => {
      console.log(`📂 ${index + 1}. ${cat.nome} - Score: ${cat.score.toFixed(2)} (${cat.confidence}) - ${cat.motivo}`);
    });
    console.log('📂 =============================================');
    
    return categorias;
  }

  // NOVO: Análise avançada de compatibilidade de categoria
  analisarCompatibilidadeCategoria(text, categoria) {
    const nomeCategoria = categoria.nome.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
    const textoNormalizado = text.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
    
    let score = 0;
    let motivo = '';
    const detalhes = [];
    
    // 1. CORRESPONDÊNCIA EXATA (peso alto)
    if (textoNormalizado.includes(nomeCategoria)) {
      score += 0.8;
      motivo = 'correspondência exata';
      detalhes.push(`Texto contém "${nomeCategoria}"`);
    }
    
    // 2. SIMILARIDADE DE STRINGS (Levenshtein)
    const similaridade = this.calcularSimilaridade(nomeCategoria, textoNormalizado);
    if (similaridade > 0.7) {
      score += similaridade * 0.6;
      motivo = motivo || 'similaridade de string';
      detalhes.push(`Similaridade: ${(similaridade * 100).toFixed(1)}%`);
    }
    
    // 3. CORRESPONDÊNCIA DE PALAVRAS
    const palavrasCategoria = nomeCategoria.split(' ').filter(p => p.length > 2);
    const palavrasTexto = textoNormalizado.split(' ').filter(p => p.length > 2);
    
    let palavrasEncontradas = 0;
    for (const palavra of palavrasCategoria) {
      if (palavrasTexto.some(pt => pt.includes(palavra) || palavra.includes(pt))) {
        palavrasEncontradas++;
      }
    }
    
    if (palavrasEncontradas > 0) {
      const ratioPalavras = palavrasEncontradas / palavrasCategoria.length;
      score += ratioPalavras * 0.5;
      motivo = motivo || 'correspondência de palavras';
      detalhes.push(`${palavrasEncontradas}/${palavrasCategoria.length} palavras encontradas`);
    }
    
    // 4. SISTEMA DE SINÔNIMOS INTELIGENTE
    const scoreSinonimos = this.verificarSinonimos(textoNormalizado, nomeCategoria, categoria.tipo);
    if (scoreSinonimos > 0) {
      score += scoreSinonimos;
      motivo = motivo || 'sinônimos detectados';
      detalhes.push(`Score de sinônimos: ${scoreSinonimos.toFixed(2)}`);
    }
    
    // 5. COMPATIBILIDADE POR TIPO
    const scoreContexto = this.verificarContextoCategoria(textoNormalizado, categoria.tipo);
    if (scoreContexto > 0) {
      score += scoreContexto * 0.3;
      detalhes.push(`Contexto de ${categoria.tipo}: ${scoreContexto.toFixed(2)}`);
    }
    
    return {
      score: Math.min(score, 1.0), // Limitar a 1.0
      motivo,
      detalhes
    };
  }

  // NOVO: Algoritmo de similaridade (baseado em Levenshtein simplificado)
  calcularSimilaridade(str1, str2) {
    if (str1 === str2) return 1.0;
    if (str1.length === 0 || str2.length === 0) return 0.0;
    
    // Se uma string contém a outra
    if (str1.includes(str2) || str2.includes(str1)) {
      return Math.max(str2.length / str1.length, str1.length / str2.length);
    }
    
    // Calcular distância de Levenshtein simplificada
    const maxLen = Math.max(str1.length, str2.length);
    let matches = 0;
    
    // Comparar caracteres próximos
    for (let i = 0; i < str1.length; i++) {
      for (let j = Math.max(0, i - 2); j <= Math.min(str2.length - 1, i + 2); j++) {
        if (str1[i] === str2[j]) {
          matches++;
          break;
        }
      }
    }
    
    return matches / maxLen;
  }

  // NOVO: Sistema avançado de sinônimos por categoria
  verificarSinonimos(texto, nomeCategoria, tipoCategoria) {
    const mapasSinonimos = {
      // Alimentação
      'alimentacao': ['comida', 'restaurante', 'supermercado', 'lanche', 'jantar', 'almoço', 'almoco', 'cafe', 'café', 'padaria', 'mercado', 'feira', 'hamburguer', 'pizza', 'delivery', 'ifood'],
      'alimentação': ['comida', 'restaurante', 'supermercado', 'lanche', 'jantar', 'almoço', 'almoco', 'cafe', 'café', 'padaria', 'mercado', 'feira', 'hamburguer', 'pizza', 'delivery', 'ifood'],
      'comida': ['alimentacao', 'alimentação', 'restaurante', 'supermercado', 'lanche', 'refeicao', 'refeição'],
      
      // Transporte
      'transporte': ['uber', 'taxi', 'onibus', 'ônibus', 'metro', 'metrô', 'gasolina', 'combustivel', 'combustível', 'posto', 'viagem', 'passagem', 'bilhete'],
      'carro': ['gasolina', 'combustivel', 'combustível', 'posto', 'estacionamento', 'mecanico', 'mecânico', 'lavagem'],
      'uber': ['transporte', 'taxi', 'corrida', 'viagem'],
      
      // Saúde
      'saude': ['farmacia', 'farmácia', 'medico', 'médico', 'hospital', 'remedio', 'remédio', 'consulta', 'exame', 'dentista'],
      'saúde': ['farmacia', 'farmácia', 'medico', 'médico', 'hospital', 'remedio', 'remédio', 'consulta', 'exame', 'dentista'],
      'farmacia': ['remedio', 'remédio', 'medicamento', 'saude', 'saúde'],
      
      // Casa/Moradia
      'casa': ['luz', 'agua', 'água', 'aluguel', 'condominio', 'condomínio', 'internet', 'telefone', 'limpeza', 'manutencao', 'manutenção'],
      'moradia': ['aluguel', 'casa', 'apartamento', 'condominio', 'condomínio'],
      'energia': ['luz', 'eletricidade', 'conta de luz'],
      
      // Educação
      'educacao': ['escola', 'faculdade', 'curso', 'livro', 'material escolar', 'mensalidade'],
      'educação': ['escola', 'faculdade', 'curso', 'livro', 'material escolar', 'mensalidade'],
      
      // Lazer
      'lazer': ['cinema', 'teatro', 'show', 'festa', 'viagem', 'diversao', 'diversão', 'jogo', 'streaming'],
      'entretenimento': ['cinema', 'netflix', 'streaming', 'jogo', 'diversao', 'diversão'],
      
      // Trabalho/Renda
      'trabalho': ['salario', 'salário', 'pagamento', 'renda', 'freelance', 'projeto'],
      'salario': ['trabalho', 'renda', 'pagamento', 'vencimento'],
      'salário': ['trabalho', 'renda', 'pagamento', 'vencimento']
    };
    
    let scoreTotal = 0;
    
    // Verificar sinônimos diretos da categoria
    const categoriaNormalizada = nomeCategoria.toLowerCase();
    const sinonimos = mapasSinonimos[categoriaNormalizada] || [];
    
    for (const sinonimo of sinonimos) {
      if (texto.includes(sinonimo)) {
        scoreTotal += 0.6; // Alto score para sinônimos diretos
        console.log(`🔍 Sinônimo encontrado: "${sinonimo}" para categoria "${nomeCategoria}"`);
      }
    }
    
    // Verificar sinônimos reversos (se o texto contém uma palavra que tem a categoria como sinônimo)
    for (const [palavra, listaSinonimos] of Object.entries(mapasSinonimos)) {
      if (texto.includes(palavra) && listaSinonimos.includes(categoriaNormalizada)) {
        scoreTotal += 0.4; // Score médio para correspondência reversa
        console.log(`� Correspondência reversa: "${palavra}" → "${nomeCategoria}"`);
      }
    }
    
    return Math.min(scoreTotal, 0.8); // Limitar para não dominar o score total
  }

  // NOVO: Verificar contexto por tipo de categoria
  verificarContextoCategoria(texto, tipoCategoria) {
    const contextosDespesa = [
      'gastei', 'paguei', 'comprei', 'custou', 'valor', 'preco', 'preço', 'dinheiro', 'reais'
    ];
    
    const contextosReceita = [
      'recebi', 'ganhei', 'salario', 'salário', 'renda', 'pagamento', 'entrada'
    ];
    
    let score = 0;
    
    if (tipoCategoria === 'despesa') {
      for (const contexto of contextosDespesa) {
        if (texto.includes(contexto)) {
          score += 0.2;
        }
      }
    } else if (tipoCategoria === 'receita') {
      for (const contexto of contextosReceita) {
        if (texto.includes(contexto)) {
          score += 0.2;
        }
      }
    }
    
    return Math.min(score, 0.6);
  }

  // NOVO: Calcular nível de confiança baseado no score
  calcularConfiancaCategoria(score) {
    if (score >= 0.8) return 'high';
    if (score >= 0.6) return 'medium';
    if (score >= 0.4) return 'low';
    return 'very-low';
  }

  detectDescriptions(text, existingItems) {
    console.log('📝 Detectando descrições em:', text);
    const descricoes = [];
    
    // Palavras a ignorar (incluindo tipos e palavras de comando)
    const ignoreWords = [
      'adicionar', 'nova', 'novo', 'criar', 'inserir', 'registrar',
      'de', 'da', 'do', 'na', 'no', 'em', 'para', 'por', 'com',
      'valor', 'reais', 'real', 'r$', 'dinheiro', 'categoria', 'transacao',
      'despesa', 'receita', 'gasto', 'entrada'
    ];
    
    // Obter TODOS os itens já detectados para excluir (valores, categorias, tipos, comandos)
    const itensJaDetectados = existingItems.map(item => {
      // Limpar pontuação da palavra para comparação
      return item.value.toLowerCase().replace(/[.,!?;:]/g, '');
    });
    
    const palavras = text.split(/\s+/)
      .filter(palavra => palavra.length > 2)
      .filter(palavra => {
        // Limpar pontuação da palavra para comparação
        const palavraLimpa = palavra.toLowerCase().replace(/[.,!?;:]/g, '');
        return !ignoreWords.includes(palavraLimpa);
      })
      .filter(palavra => {
        // Limpar pontuação da palavra para comparação
        const palavraLimpa = palavra.toLowerCase().replace(/[.,!?;:]/g, '');
        return !itensJaDetectados.includes(palavraLimpa);
      })
      .filter(palavra => !/^\d+([.,]\d+)?$/.test(palavra)) // Não incluir números puros
      .filter(palavra => palavra.replace(/[.,!?;:]/g, '').length > 0); // Não incluir apenas pontuação
    
    console.log('📝 Palavras candidatas a descrição:', palavras);
    descricoes.push(...palavras);
    
    return descricoes;
  }

  detectCommands(text) {
    console.log('⚡ Detectando comandos em:', text);
    const comandos = [];
    
    if (/\b(adicionar|nova|novo|criar|inserir|registrar)\b/.test(text)) {
      comandos.push('adicionar');
      console.log('⚡ Comando ADICIONAR detectado');
    }
    
    if (/\b(categoria)\b/.test(text)) {
      comandos.push('categoria');
      console.log('⚡ Comando CATEGORIA detectado');
    }
    
    if (/\b(transacao|transação)\b/.test(text)) {
      comandos.push('transacao');
      console.log('⚡ Comando TRANSAÇÃO detectado');
    }
    
    return comandos;
  }

  async executeCommand(text, type) {
    console.log('🎤 Executando comando:', type, text);

    switch (type) {
    case 'query':
      return await this.handleQueryCommand(text);
    case 'transaction':
      return await this.handleTransactionCommand(text);
    case 'category':
      return await this.handleCategoryCommand(text);
    case 'navigation':
      return await this.handleNavigationCommand(text);
    default:
      throw new Error('Tipo de comando não reconhecido');
    }
  }

  // ===== HANDLERS DE COMANDOS =====

  async handleQueryCommand(text) {
    console.log('🔍 Processando comando de consulta:', text);

    if (/\b(saldo|qual.*saldo|saldo atual)\b/.test(text)) {
      const saldo = this.calculateBalance();
      return `Saldo atual: R$ ${saldo.toFixed(2)}`;
    }

    if (/\b(despesas|gastos)\b/.test(text)) {
      const despesas = this.calculateExpenses();
      return `Total de despesas: R$ ${despesas.toFixed(2)}`;
    }

    if (/\b(receitas|entradas)\b/.test(text)) {
      const receitas = this.calculateIncome();
      return `Total de receitas: R$ ${receitas.toFixed(2)}`;
    }

    return 'Comando de consulta não reconhecido';
  }

  async handleTransactionCommand(text) {
    console.log('💰 Processando comando de transação:', text);

    // *** VERIFICAR NÚMERO DE ITENS PARA DECIDIR SE ABRE MODAL ***
    const items = this.extractCommandItems(text);
    console.log('🔍 Itens extraídos para transação:', items);
    console.log('🔍 Total de itens:', items.length);

    // Extrair informações da transação
    const transactionData = this.parseTransactionCommand(text);

    if (!transactionData) {
      throw new Error('Não foi possível entender os dados da transação');
    }

    // Preparar mensagem sobre categoria
    const categoriaInfo = transactionData.categoriaExistente
      ? `categoria existente "${transactionData.categoria}"`
      : `nova categoria "${transactionData.categoria}"`;

    // *** ABRIR MODAL AUTOMATICAMENTE PARA TRANSAÇÕES (4 ITENS) ***
    if (window.showAddTransactionModal) {
      // Armazenar dados da transação para pré-preenchimento do modal
      this.lastRecognizedTransaction = {
        descricao: transactionData.descricao,
        valor: transactionData.valor,
        tipo: transactionData.tipo,
        categoriaId: transactionData.categoriaId,
        data: new Date().toISOString().split('T')[0] // formato YYYY-MM-DD
      };

      console.log('🎤 Abrindo modal de transação com dados:', this.lastRecognizedTransaction);

      // *** ABRIR O MODAL DE TRANSAÇÃO ***
      setTimeout(() => {
        console.log('🎤 Executando showAddTransactionModal...');
        window.showAddTransactionModal();

        // Pré-preencher campos do modal após um delay maior para garantir que o modal seja renderizado
        setTimeout(() => {
          console.log('🎤 Tentando pré-preencher campos de transação...');
          this.preenchearCamposTransacao(this.lastRecognizedTransaction);
        }, 1000); // Aumentei para 1 segundo
      }, 500);

      const valorText = transactionData.valor !== null ? `de R$ ${transactionData.valor.toFixed(2)}` : '(valor a definir)';
      return `✅ Abrindo modal para transação: ${transactionData.tipo} ${valorText} na ${categoriaInfo}`;
    } else {
      // Fallback para função com confirmação
      if (window.addTransactionWithConfirmation) {
        await window.addTransactionWithConfirmation(transactionData);
        return `✅ Transação confirmada: ${transactionData.tipo} de R$ ${transactionData.valor.toFixed(2)} na ${categoriaInfo}`;
      } else if (window.addTransaction) {
        await window.addTransaction(transactionData);
        return `✅ Transação adicionada: ${transactionData.tipo} de R$ ${transactionData.valor.toFixed(2)} na ${categoriaInfo}`;
      } else {
        throw new Error('Função de adicionar transação não disponível');
      }
    }
  }

  async handleCategoryCommand(text) {
    console.log('📂 Processando comando de categoria:', text);

    // *** VERIFICAR NÚMERO DE ITENS PARA DECIDIR SE ABRE MODAL ***
    const items = this.extractCommandItems(text);
    console.log('🔍 Itens extraídos para categoria:', items);
    console.log('🔍 Total de itens:', items.length);

    // Extrair dados da categoria
    const categoryData = this.parseCategoryCommand(text);

    if (!categoryData || !categoryData.nome) {
      throw new Error('Nome da categoria não foi entendido');
    }

    // *** ABRIR MODAL AUTOMATICAMENTE PARA CATEGORIAS (3 ITENS) ***
    if (window.showAddCategoryModal) {
      // Armazenar dados da categoria para pré-preenchimento do modal
      this.lastRecognizedCategory = {
        nome: categoryData.nome,
        tipo: categoryData.tipo,
        limite: categoryData.limite || 0
      };

      console.log('🎤 Abrindo modal de categoria com dados:', this.lastRecognizedCategory);

      // *** ABRIR O MODAL DE CATEGORIA ***
      setTimeout(() => {
        console.log('🎤 Executando showAddCategoryModal...');
        window.showAddCategoryModal();

        // Pré-preencher campos do modal após um delay maior para garantir que o modal seja renderizado
        setTimeout(() => {
          console.log('🎤 Tentando pré-preencher campos de categoria...');
          this.preenchearCamposCategoria(this.lastRecognizedCategory);
        }, 1000); // Aumentei para 1 segundo
      }, 500);

      const limiteText = categoryData.limite > 0 ? ` com limite de R$ ${categoryData.limite.toFixed(2)}` : '';
      return `✅ Abrindo modal para categoria: "${categoryData.nome}" (${categoryData.tipo})${limiteText}`;
    } else {
      // Fallback para adicionar diretamente
      if (window.addCategory) {
        await window.addCategory(categoryData);
        const limiteText = categoryData.limite > 0 ? ` com limite de R$ ${categoryData.limite.toFixed(2)}` : '';
        return `✅ Categoria "${categoryData.nome}" (${categoryData.tipo})${limiteText} adicionada com sucesso`;
      } else {
        throw new Error('Função de adicionar categoria não disponível');
      }
    }
  }

  async handleNavigationCommand(text) {
    console.log('🧭 Processando comando de navegação:', text);

    if (/\b(dashboard|início|principal)\b/.test(text)) {
      window.location.hash = '#/dashboard';
      return 'Navegando para o Dashboard';
    }

    if (/\b(transações|transação)\b/.test(text)) {
      window.location.hash = '#/transactions';
      return 'Navegando para Transações';
    }

    if (/\b(categorias|categoria)\b/.test(text)) {
      window.location.hash = '#/dashboard';
      return 'Navegando para Dashboard';
    }

    if (/\b(recorrentes|recorrente)\b/.test(text)) {
      window.location.hash = '#/recorrentes';
      return 'Navegando para Recorrentes';
    }

    return 'Comando de navegação não reconhecido';
  }

  // ===== PARSERS =====

  parseTransactionCommand(text) {
    console.log('🔍 ===== INICIANDO PARSE DE TRANSAÇÃO =====');
    console.log('🔍 Texto original recebido:', `"${text}"`);
    console.log('🔍 Comprimento do texto:', text.length);
    console.log('🔍 Texto normalizado para análise:', `"${this.normalizeText(text)}"`);

    // Padrões para extrair informações
    const patterns = {
      tipo: {
        despesa: /\b(despesa|despesas|gasto|gastos|pago|comprei|gastei|pagar|gastar|comprar|pagamento|compra|saida|saidas)\b/i,
        receita: /\b(receita|receitas|entrada|entradas|ganhei|recebi|salario|ganhar|receber|renda|rendas|ganho|ganhos)\b/i
      },
      // Padrões mais flexíveis para valores
      valor: [
        // *** PATTERNS PRIORITÁRIOS - MAIS ESPECÍFICOS ***
        // Padrões com contexto monetário forte - com melhor captura de números
        /(?:custou|custaram|paguei|gastei|foi|foram)\s*(?:de\s*)?(\d+(?:[.,]\d{1,2})?)\s*(?:reais?|r\$|real)?/i,
        /(?:de|por|valor)\s*(?:de\s*)?(\d+(?:[.,]\d{1,2})?)\s*(?:reais?|r\$|real)?/i,
        /(\d+(?:[.,]\d{1,2})?)\s*(?:reais?|r\$|real|dinheiro|pila|pratas?)/i,
        
        // *** NÚMEROS DIRETOS - ALTA PRIORIDADE ***
        // Capturar números que estão sozinhos ou precedidos por palavras-chave
        /(?:valor|custo|custou|pago|gastei|gasto|paguei|de|por)\s+(\d+(?:[.,]\d{1,2})?)/i,
        /(?:^|\s)(\d+(?:[.,]\d{1,2})?)\s*(?:reais?|r\$|real|dinheiro|pila|pratas?|$)/i,
        
        // *** NÚMEROS POR EXTENSO - MAIS ABRANGENTES ***
        // Inclui variações com e sem acentos
        /\b(zero|uma?|dois|duas|três|tres|quatro|cinco|seis|sete|oito|nove|dez|onze|doze|treze|quatorze|catorze|quinze|dezesseis|dezessete|dezoito|dezenove|vinte|trinta|quarenta|cinquenta|sessenta|setenta|oitenta|noventa|cem|cento|duzentos|trezentos|quatrocentos|quinhentos|seiscentos|setecentos|oitocentos|novecentos|mil)\s*(?:reais?|r\$|real|dinheiro)?\b/i,
        
        // *** FALLBACKS - PATTERNS MAIS PERMISSIVOS ***
        // Qualquer número no texto (última tentativa)
        /(\d+(?:[.,]\d{1,2})?)/g,
        // Frases comuns brasileiras
        /foi\s*(\d+)/i,
        /deu\s*(\d+)/i,
        /custa\s*(\d+)/i
      ],
      // Padrões para categorias - mais flexíveis
      categoria: [
        /\b(?:categoria|para|em|de|na categoria|tipo)\s+([a-záàâãéèêíìîóòôõúùûç\s]+?)(?:\s*$|\s+(?:de|por|valor|reais?|r\$|custou|custa)\s*\d)/i,
        /\b(?:com|para|em|de)\s+([a-záàâãéèêíìîóòôõúùûç\s]+?)(?:\s*$|\s+(?:de|por|valor|reais?|r\$|custou|custa))/i,
        /([a-záàâãéèêíìîóòôõúùûç]+)\s*$/, // última palavra
      ]
    };

    // Determinar tipo
    let tipo = 'despesa'; // padrão
    if (patterns.tipo.receita.test(text)) {
      tipo = 'receita';
    }

    // Extrair valor - tentar múltiplas estratégias
    let valor = null;
    let valorMatch = null;

    console.log('🔍 ===== EXTRAINDO VALOR =====');
    console.log('🔍 Texto para análise de valor:', text);
    
    // *** ESTRATÉGIA 1: Procurar números diretos primeiro ***
    const numerosEncontrados = text.match(/\d+(?:[.,]\d{1,2})?/g);
    if (numerosEncontrados) {
      console.log('🔢 Números encontrados no texto:', numerosEncontrados);
      // Log específico para números problemáticos
      if (numerosEncontrados.includes('100')) console.log('🎯 NÚMERO 100 DETECTADO!');
      if (numerosEncontrados.includes('200')) console.log('🎯 NÚMERO 200 DETECTADO!');
      
      // *** PRIORIZAR NÚMEROS MAIORES E MAIS SIGNIFICATIVOS ***
      // Ordenar números por valor decrescente para pegar o maior primeiro
      const numerosOrdenados = numerosEncontrados
        .map(n => ({ original: n, valor: parseFloat(n.replace(',', '.')) }))
        .filter(n => !isNaN(n.valor) && n.valor > 0)
        .sort((a, b) => b.valor - a.valor);
      
      console.log('🔢 Números ordenados por prioridade:', numerosOrdenados);
      
      if (numerosOrdenados.length > 0) {
        const numeroEscolhido = numerosOrdenados[0];
        console.log('🎯 NÚMERO PRIORITÁRIO SELECIONADO:', numeroEscolhido);
        
        // Tentar usar o número prioritário primeiro
        valor = numeroEscolhido.valor;
        console.log('✅ VALOR PRIORITÁRIO DEFINIDO:', valor);
      }
    } else {
      console.log('🔢 Nenhum número direto encontrado');
    }

    // Mapa de números por extenso
    const numerosExtenso = {
      'zero': 0, 'um': 1, 'uma': 1, 'dois': 2, 'duas': 2, 'três': 3, 'tres': 3,
      'quatro': 4, 'cinco': 5, 'seis': 6, 'sete': 7, 'oito': 8, 'nove': 9,
      'dez': 10, 'onze': 11, 'doze': 12, 'treze': 13, 'quatorze': 14, 'catorze': 14,
      'quinze': 15, 'dezesseis': 16, 'dezessete': 17, 'dezoito': 18, 'dezenove': 19,
      'vinte': 20, 'trinta': 30, 'quarenta': 40, 'cinquenta': 50, 'sessenta': 60,
      'setenta': 70, 'oitenta': 80, 'noventa': 90, 'cem': 100, 'cento': 100,
      'duzentos': 200, 'trezentos': 300, 'quatrocentos': 400, 'quinhentos': 500,
      'seiscentos': 600, 'setecentos': 700, 'oitocentos': 800, 'novecentos': 900,
      'mil': 1000
    };

    // *** TESTE DE PATTERNS COM DEBUGGING DETALHADO (APENAS SE VALOR PRIORITÁRIO NÃO FOI ENCONTRADO) ***
    if (!valor || valor <= 0) {
      console.log('🔍 Valor prioritário não encontrado, testando padrões regex...');
      
      for (let i = 0; i < patterns.valor.length; i++) {
        const pattern = patterns.valor[i];
        console.log(`🔍 [Pattern ${i + 1}/${patterns.valor.length}] Testando:`, pattern.toString());

        valorMatch = text.match(pattern);
        if (valorMatch) {
          console.log('✅ MATCH ENCONTRADO:', {
            match: valorMatch,
            captured: valorMatch[1] || valorMatch[0],
            index: valorMatch.index,
            input: valorMatch.input
          });
          
          const valorCapturado = valorMatch[1] || valorMatch[0];
          console.log('📝 Valor capturado para conversão:', `"${valorCapturado}"`);

          // Verificar se é um número por extenso
          if (numerosExtenso[valorCapturado.toLowerCase()]) {
            valor = numerosExtenso[valorCapturado.toLowerCase()];
            console.log('🔢 Número por extenso convertido:', valor);
          } else {
            // É um número normal - limpar e converter
            const valorLimpo = valorCapturado.replace(/[^\d.,]/g, '').replace(',', '.');
            const valorConvertido = parseFloat(valorLimpo);
            
            // *** VALIDAR SE O VALOR CONVERTIDO FAZ SENTIDO ***
            if (!isNaN(valorConvertido) && valorConvertido > 0) {
              valor = valorConvertido;
              console.log('🔢 Número convertido:', {
                original: valorCapturado,
                limpo: valorLimpo,
                convertido: valor,
                tipo: typeof valor,
                isNaN: isNaN(valor),
                isValidNumber: !isNaN(valor) && valor > 0
              });
              
              // Log específico para valores problemáticos
              if (valorCapturado.includes('100')) {
                console.log('🎯 PROCESSANDO VALOR 100:', { valorCapturado, valorLimpo, valor });
              }
              if (valorCapturado.includes('200')) {
                console.log('🎯 PROCESSANDO VALOR 200:', { valorCapturado, valorLimpo, valor });
              }
            }
          }

          if (valor && valor > 0) {
            console.log('✅ VALOR VÁLIDO ENCONTRADO:', valor);
            break;
          } else {
            console.log('❌ Valor inválido, continuando busca...', { valor, tipo: typeof valor });
            valor = null;
            valorMatch = null;
          }
        } else {
          console.log('❌ Nenhum match para este padrão');
        }
      }
    } else {
      console.log('✅ USANDO VALOR PRIORITÁRIO:', valor);
    }

    // Se não encontrou valor numérico, tentar números por extenso
    if (!valor) {
      const numerosExtenso = {
        'zero': 0, 'um': 1, 'uma': 1, 'dois': 2, 'duas': 2, 'três': 3, 'tres': 3,
        'quatro': 4, 'cinco': 5, 'seis': 6, 'sete': 7, 'oito': 8, 'nove': 9,
        'dez': 10, 'onze': 11, 'doze': 12, 'treze': 13, 'quatorze': 14, 'catorze': 14,
        'quinze': 15, 'dezesseis': 16, 'dezessete': 17, 'dezoito': 18, 'dezenove': 19,
        'vinte': 20, 'trinta': 30, 'quarenta': 40, 'cinquenta': 50, 'sessenta': 60,
        'setenta': 70, 'oitenta': 80, 'noventa': 90, 'cem': 100, 'cento': 100,
        'duzentos': 200, 'trezentos': 300, 'quatrocentos': 400, 'quinhentos': 500,
        'seiscentos': 600, 'setecentos': 700, 'oitocentos': 800, 'novecentos': 900,
        'mil': 1000
      };

      // Primeiro, tentar encontrar padrões específicos para números por extenso
      const numeroPorExtensoPattern = /\b(zero|uma?|dois|duas|três|tres|quatro|cinco|seis|sete|oito|nove|dez|onze|doze|treze|quatorze|catorze|quinze|dezesseis|dezessete|dezoito|dezenove|vinte|trinta|quarenta|cinquenta|sessenta|setenta|oitenta|noventa|cem|cento|duzentos|trezentos|quatrocentos|quinhentos|seiscentos|setecentos|oitocentos|novecentos|mil)\b/i;

      const numeroMatch = text.match(numeroPorExtensoPattern);
      if (numeroMatch) {
        const numeroEncontrado = numeroMatch[1].toLowerCase();
        if (numerosExtenso[numeroEncontrado]) {
          valor = numerosExtenso[numeroEncontrado];
        }
      }

      // Se ainda não encontrou, tentar palavra por palavra (fallback)
      if (!valor) {
        const words = text.split(' ');
        for (const word of words) {
          if (numerosExtenso[word.toLowerCase()]) {
            valor = numerosExtenso[word.toLowerCase()];
            break;
          }
        }
      }
    }

    // Se não encontrou valor, definir como null para permitir preenchimento manual
    if (!valor) {
      console.log('⚠️ Valor não encontrado, será preenchido manualmente no modal');
      valor = null;
    }

    // ===== EXTRAINDO CATEGORIA =====
    console.log('🔍 ===== EXTRAINDO CATEGORIA =====');
    let categoria = 'Outros'; // padrão
    let categoriaMatch = null;
    let categoriaEncontrada = null;
    
    // *** ESTRATÉGIA DE EXTRAÇÃO DE CATEGORIA MAIS INTELIGENTE ***
    // Primeiro, remover o valor encontrado do texto para melhor análise da categoria
    let textoSemValor = text;
    if (valorMatch && valorMatch[0]) {
      textoSemValor = text.replace(valorMatch[0], '').trim();
      console.log('🔍 Texto sem valor para análise de categoria:', `"${textoSemValor}"`);
    }
    
    // Palavras que indicam categoria (preposições e conectivos a ignorar)
    const palavrasIgnorarCategoria = ['de', 'da', 'do', 'na', 'no', 'em', 'para', 'por', 'com', 'foi', 'custou', 'gastei', 'paguei', 'comprei', 'valor', 'reais', 'real', 'r$', 'dinheiro', 'adicionar', 'nova', 'criar', 'inserir', 'despesa', 'receita', 'transacao', 'gasto', 'entrada'];
    
    // Extrair palavras candidatas à categoria
    const palavrasCandidatas = textoSemValor
      .toLowerCase()
      .split(/\s+/)
      .filter(palavra => palavra.length > 2)
      .filter(palavra => !palavrasIgnorarCategoria.includes(palavra))
      .filter(palavra => !/^\d/.test(palavra)); // não começar com número
    
    console.log('🔍 Palavras candidatas à categoria:', palavrasCandidatas);

    // Primeiro, tentar encontrar categorias existentes no texto completo
    if (window.appState?.categories) {
      console.log('🔍 Procurando categorias existentes no texto:', text);

      // Buscar por correspondência exata ou parcial
      for (const cat of window.appState.categories) {
        const nomeCategoria = cat.nome.toLowerCase();
        const textoNormalizado = text.toLowerCase();

        // Verificar correspondência exata
        if (textoNormalizado.includes(nomeCategoria)) {
          categoriaEncontrada = cat;
          categoria = cat.nome;
          console.log('✅ Categoria encontrada (exata):', categoria);
          break;
        }

        // Verificar correspondência parcial (palavras-chave)
        const palavrasCategoria = nomeCategoria.split(' ');
        const palavrasTexto = textoNormalizado.split(' ');

        let correspondencias = 0;
        for (const palavra of palavrasCategoria) {
          if (palavra.length > 2 && palavrasTexto.some(p => p.includes(palavra) || palavra.includes(p))) {
            correspondencias++;
          }
        }

        // Se encontrou pelo menos 50% das palavras da categoria
        if (correspondencias > 0 && correspondencias >= palavrasCategoria.length * 0.5) {
          categoriaEncontrada = cat;
          categoria = cat.nome;
          console.log('✅ Categoria encontrada (parcial):', categoria, `(${correspondencias}/${palavrasCategoria.length} palavras)`);
          break;
        }
      }
    }

    // Se não encontrou categoria existente, tentar extrair do texto
    if (!categoriaEncontrada) {
      for (const pattern of patterns.categoria) {
        categoriaMatch = text.match(pattern);
        if (categoriaMatch && categoriaMatch[1]) {
          let categoriaExtraida = categoriaMatch[1].trim();
          // Limpar palavras comuns que não são categorias
          categoriaExtraida = categoriaExtraida.replace(/\b(de|por|valor|reais?|r\$|real|dinheiro|custou|custa)\b/gi, '').trim();

          if (categoriaExtraida.length > 2) { // só aceitar se tiver pelo menos 3 caracteres
            categoria = categoriaExtraida;
            console.log('📝 Categoria extraída do texto:', categoria);
            break;
          }
        }
      }
    }

    // PRIMEIRO: Extrair a primeira palavra significativa ANTES de qualquer limpeza
    console.log('🔍 Texto original para descrição:', text);

    const palavras = text.toLowerCase().split(' ');
    const palavrasIgnorar = ['adicionar', 'nova', 'criar', 'inserir', 'despesa', 'receita', 'transação', 'gasto', 'entrada', 'gastei', 'comprei', 'paguei', 'com', 'para', 'em', 'de', 'categoria', 'na', 'da', 'tipo', 'reais', 'real', 'dinheiro', 'valor', 'custou', 'custa', 'custando'];

    // Encontrar a primeira palavra significativa
    let palavraSignificativa = null;
    for (const palavra of palavras) {
      // Ignorar números
      if (/^\d+([.,]\d+)?$/.test(palavra)) continue;
      // Ignorar palavras comuns
      if (palavrasIgnorar.includes(palavra)) continue;
      // Ignorar categoria encontrada
      if (categoriaEncontrada && palavra === categoriaEncontrada.nome.toLowerCase()) continue;
      // Aceitar palavras com pelo menos 2 caracteres
      if (palavra.length >= 2) {
        palavraSignificativa = palavra;
        break;
      }
    }

    console.log('🔍 Primeira palavra significativa encontrada:', palavraSignificativa);

    let descricao;
    if (palavraSignificativa) {
      // Usar a primeira palavra significativa como descrição
      descricao = palavraSignificativa.charAt(0).toUpperCase() + palavraSignificativa.slice(1);
      console.log('🔍 Descrição definida como primeira palavra significativa:', descricao);
    } else {
      // Fallback: tentar extrair descrição do texto limpo
      descricao = text;

      // Remover valor encontrado
      if (valorMatch) {
        console.log('🔍 Removendo valor encontrado:', valorMatch[0]);
        descricao = descricao.replace(valorMatch[0], '');
      }

      // Remover categoria encontrada (se foi extraída por padrão)
      if (categoriaMatch) {
        console.log('🔍 Removendo categoria extraída:', categoriaMatch[0]);
        descricao = descricao.replace(categoriaMatch[0], '');
      }

      // Se categoria foi encontrada no sistema, remover do texto também
      if (categoriaEncontrada) {
        const nomeCategoria = categoriaEncontrada.nome.toLowerCase();
        const regex = new RegExp(`\\b${nomeCategoria.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
        console.log('🔍 Removendo categoria do sistema:', nomeCategoria);
        descricao = descricao.replace(regex, '');
      }

      // Limpar descrição de palavras comuns
      descricao = descricao
        .replace(/\b(adicionar|nova?|criar|inserir|transação|gasto|entrada|gastei|comprei|paguei)\b/gi, '')
        .replace(/\b(com|para|em|de|categoria|na categoria|da categoria|tipo)\b/gi, '')
        .replace(/\b(reais?|r\$|real|dinheiro|valor|custou|custa|custando)\b/gi, '')
        .replace(/\b(despesa|receita)\b(?=.*\w)/gi, '')
        .replace(/\s+/g, ' ')
        .trim();

      console.log('🔍 Descrição após limpeza (fallback):', descricao);

      // Se ainda ficou vazia, usar descrição padrão
      if (!descricao || descricao.length < 3) {
        if (valor !== null) {
          descricao = `${tipo.charAt(0).toUpperCase() + tipo.slice(1)} de R$ ${valor.toFixed(2)}`;
        } else {
          descricao = `${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`;
        }
        console.log('🔍 Usando descrição padrão (fallback final):', descricao);
      }
    }

    // *** RESULTADO FINAL COM LOG DETALHADO ***
    const resultado = {
      tipo,
      valor,
      categoria,
      categoriaId: categoriaEncontrada?.id || null,
      categoriaExistente: !!categoriaEncontrada,
      descricao,
      data: new Date().toISOString()
    };
    
    console.log('🔍 ===== RESULTADO FINAL DO PARSE =====');
    console.log('📊 Resultado completo:', resultado);
    console.log('📊 Resumo:');
    console.log('   - Tipo:', tipo);
    console.log('   - Valor:', valor ? `R$ ${valor.toFixed(2)}` : 'NÃO ENCONTRADO');
    console.log('   - Categoria:', categoria, categoriaEncontrada ? '(existente)' : '(nova)');
    console.log('   - Descrição:', `"${descricao}"`);
    console.log('🔍 ===================================');
    
    return resultado;
  }

  parseCategoryCommand(text) {
    console.log('🔍 Analisando comando de categoria:', text);

    // Verificar se é um comando de 3 itens
    const items = this.extractCommandItems(text);
    if (items.length === 3) {
      console.log('🔍 Processando comando de categoria com 3 itens');
      return this.parseCategoryCommandFromItems(items, text);
    }

    // Fallback para padrões tradicionais
    return this.parseCategoryCommandTraditional(text);
  }

  parseCategoryCommandFromItems(items, originalText) {
    console.log('🔍 Analisando comando de categoria com 3 itens:', items);

    let nome = null;
    let tipo = 'despesa'; // padrão
    let limite = 0;

    // Analisar cada item
    for (const item of items) {
      switch (item.type) {
      case 'valor':
        limite = parseFloat(item.value.replace(',', '.'));
        console.log('💰 Limite extraído:', limite);
        break;

      case 'tipo':
        if (/^(receita|entrada)s?$/.test(item.value)) {
          tipo = 'receita';
        } else {
          tipo = 'despesa';
        }
        console.log('📊 Tipo extraído:', tipo);
        break;

      case 'descricao':
        if (!nome) { // usar a primeira descrição como nome
          nome = item.value.charAt(0).toUpperCase() + item.value.slice(1);
          console.log('📝 Nome da categoria extraído:', nome);
        }
        break;
      }
    }

    // Se não encontrou nome, tentar extrair do texto original
    if (!nome) {
      const words = originalText.toLowerCase().split(' ');
      const wordsToIgnore = ['adicionar', 'nova', 'novo', 'criar', 'inserir', 'categoria', 'despesa', 'receita', 'de', 'da', 'do', 'na', 'no', 'em', 'para', 'por', 'com', 'valor', 'reais', 'real', 'r$', 'dinheiro'];

      for (const word of words) {
        if (word.length > 2 && !wordsToIgnore.includes(word) && !/^\d+([.,]\d+)?$/.test(word)) {
          nome = word.charAt(0).toUpperCase() + word.slice(1);
          console.log('📝 Nome da categoria extraído (fallback):', nome);
          break;
        }
      }
    }

    if (!nome) {
      throw new Error('Nome da categoria não foi entendido no comando de 3 itens');
    }

    console.log('✅ Categoria processada:', { nome, tipo, limite });

    return {
      nome,
      tipo,
      limite: limite || 0,
      cor: this.getRandomColor()
    };
  }

  parseCategoryCommandTraditional(text) {
    console.log('🔍 Analisando comando de categoria (método tradicional):', text);

    // Padrões para extrair informações da categoria
    const patterns = {
      nome: [
        /\b(?:categoria|categoria)\s+(?:chamada|de|para|com nome)\s+([a-záàâãéèêíìîóòôõúùûç\s]+?)(?:\s+(?:tipo|despesa|receita|limite)\b|\s*$)/i,
        /\b(?:nova|criar|adicionar)\s+(?:categoria|categoria)\s+(?:chamada|de|para|com nome)?\s*([a-záàâãéèêíìîóòôõúùûç\s]+?)(?:\s+(?:tipo|despesa|receita|limite)\b|\s*$)/i,
        /\b(?:categoria|categoria)\s+([a-záàâãéèêíìîóòôõúùûç\s]+?)(?:\s+(?:tipo|despesa|receita|limite)\b|\s*$)/i,
        /\b([a-záàâãéèêíìîóòôõúùûç\s]+?)\s+(?:categoria|despesa|receita)\b/i
      ],
      tipo: {
        despesa: /\b(despesa|despesas|gasto|gastos)\b/i,
        receita: /\b(receita|receitas|entrada|entradas|renda|rendas)\b/i
      },
      limite: [
        /\blimite\s+(?:de\s+)?(\d+(?:[.,]\d{1,2})?)/i,
        /(\d+(?:[.,]\d{1,2})?)\s*(?:reais?|r\$|real|dinheiro)/i,
        /(\d+(?:[.,]\d{1,2})?)/
      ]
    };

    // Extrair nome da categoria
    let nome = null;
    for (const pattern of patterns.nome) {
      const match = text.match(pattern);
      if (match && match[1]) {
        nome = match[1].trim();
        // Limpar palavras comuns que não são nomes de categoria
        nome = nome.replace(/\b(nova?|criar|adicionar|categoria|tipo|despesa|receita|limite|de|por|valor|reais?|r\$|real|dinheiro)\b/gi, '').trim();
        if (nome.length > 2) { // só aceitar se tiver pelo menos 3 caracteres
          break;
        }
      }
    }

    if (!nome) {
      throw new Error('Nome da categoria não foi entendido. Diga algo como "nova categoria chamada transporte"');
    }

    // Determinar tipo
    let tipo = 'despesa'; // padrão
    if (patterns.tipo.receita.test(text)) {
      tipo = 'receita';
    }

    // Extrair limite (opcional)
    let limite = 0;
    for (const pattern of patterns.limite) {
      const match = text.match(pattern);
      if (match) {
        limite = parseFloat(match[1].replace(',', '.'));
        break;
      }
    }

    // Se não encontrou limite numérico, tentar números por extenso
    if (!limite) {
      const numerosExtenso = {
        'zero': 0, 'um': 1, 'uma': 1, 'dois': 2, 'duas': 2, 'três': 3, 'tres': 3,
        'quatro': 4, 'cinco': 5, 'seis': 6, 'sete': 7, 'oito': 8, 'nove': 9,
        'dez': 10, 'onze': 11, 'doze': 12, 'treze': 13, 'quatorze': 14, 'catorze': 14,
        'quinze': 15, 'dezesseis': 16, 'dezessete': 17, 'dezoito': 18, 'dezenove': 19,
        'vinte': 20, 'trinta': 30, 'quarenta': 40, 'cinquenta': 50, 'sessenta': 60,
        'setenta': 70, 'oitenta': 80, 'noventa': 90, 'cem': 100, 'cento': 100,
        'duzentos': 200, 'trezentos': 300, 'quatrocentos': 400, 'quinhentos': 500,
        'seiscentos': 600, 'setecentos': 700, 'oitocentos': 800, 'novecentos': 900,
        'mil': 1000
      };

      // Primeiro, tentar encontrar padrões específicos para números por extenso
      const numeroPorExtensoPattern = /\b(zero|uma?|dois|duas|três|tres|quatro|cinco|seis|sete|oito|nove|dez|onze|doze|treze|quatorze|catorze|quinze|dezesseis|dezessete|dezoito|dezenove|vinte|trinta|quarenta|cinquenta|sessenta|setenta|oitenta|noventa|cem|cento|duzentos|trezentos|quatrocentos|quinhentos|seiscentos|setecentos|oitocentos|novecentos|mil)\b/i;

      const numeroMatch = text.match(numeroPorExtensoPattern);
      if (numeroMatch) {
        const numeroEncontrado = numeroMatch[1].toLowerCase();
        if (numerosExtenso[numeroEncontrado]) {
          limite = numerosExtenso[numeroEncontrado];
        }
      }

      // Se ainda não encontrou, tentar palavra por palavra (fallback)
      if (!limite) {
        const words = text.split(' ');
        for (const word of words) {
          if (numerosExtenso[word.toLowerCase()]) {
            limite = numerosExtenso[word.toLowerCase()];
            break;
          }
        }
      }
    }

    return {
      nome,
      tipo,
      limite: limite || 0,
      cor: this.getRandomColor()
    };
  }

  getRandomColor() {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
      '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
      '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // ===== CÁLCULOS =====

  calculateBalance() {
    if (!window.appState?.transactions) {
      return 0;
    }

    const receitas = window.appState.transactions
      .filter(t => t.tipo === 'receita')
      .reduce((sum, t) => sum + parseFloat(t.valor), 0);

    const despesas = window.appState.transactions
      .filter(t => t.tipo === 'despesa')
      .reduce((sum, t) => sum + parseFloat(t.valor), 0);

    return receitas - despesas;
  }

  calculateExpenses() {
    if (!window.appState?.transactions) {
      return 0;
    }

    return window.appState.transactions
      .filter(t => t.tipo === 'despesa')
      .reduce((sum, t) => sum + parseFloat(t.valor), 0);
  }

  calculateIncome() {
    if (!window.appState?.transactions) {
      return 0;
    }

    return window.appState.transactions
      .filter(t => t.tipo === 'receita')
      .reduce((sum, t) => sum + parseFloat(t.valor), 0);
  }

  // ===== UTILITÁRIOS =====

  getErrorMessage(error) {
    const errorMessages = {
      'not-allowed': 'Permissão do microfone negada. Clique no ícone do microfone na barra de endereços e permita o acesso.',
      'no-speech': 'Nenhuma fala detectada. Tente falar mais alto ou mais próximo do microfone.',
      'audio-capture': 'Erro ao capturar áudio. Verifique se o microfone está funcionando.',
      'network': 'Erro de rede. Verifique sua conexão com a internet.',
      'service-not-allowed': 'Serviço de reconhecimento de voz não permitido.',
      'not-supported': 'Reconhecimento de voz não suportado neste navegador.',
      'aborted': 'Reconhecimento de voz interrompido.',
      'audio-capture-device-not-found': 'Microfone não encontrado.',
      'audio-capture-device-in-use': 'Microfone em uso por outro aplicativo.'
    };

    return errorMessages[error] || `Erro desconhecido: ${error}`;
  }

  shouldRetry(error) {
    const retryableErrors = ['network', 'service-not-allowed', 'audio-capture-device-in-use'];
    return retryableErrors.includes(error);
  }

  getRandomColor() {
    const colors = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#06B6D4'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // ===== REINICIAR RECONHECIMENTO (MOBILE) =====

  restartRecognition() {
    console.log('🔄 Reiniciando reconhecimento manualmente (mobile)');
    
    // Parar qualquer reconhecimento ativo
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (error) {
        console.log('ℹ️ Erro ao parar reconhecimento:', error.message);
      }
    }
    
    // Resetar estados
    this.isListening = false;
    this.isStarting = false;
    this.hasError = false;
    this.hasReceivedSpeech = false;
    
    // Ocultar botão de reiniciar
    const restartBtn = document.querySelector('.restart-btn-mobile');
    if (restartBtn) {
      restartBtn.style.display = 'none';
    }
    
    // Iniciar novamente
    setTimeout(() => {
      this.startListening(this.currentType);
    }, 100);
  }

  // ===== CONTROLE DO MODAL =====

  openModal(type = 'transaction') {
    console.log('🎤 Abrindo modal de voz:', type);

    this.currentType = type;
    this.isModalOpen = true;
    this.retryCount = 0;

    // Garantir que o reconhecimento está configurado e funcionando
    if (!this.recognition) {
      console.log('🔄 Reconhecimento não encontrado, reinicializando...');
      if (!this.init()) {
        console.error('❌ Falha na reinicialização do reconhecimento');
        this.showError('Erro ao inicializar reconhecimento de voz');
        return;
      }
    } else {
      // Verificar se o reconhecimento está em estado válido
      console.log('🔍 Verificando estado do reconhecimento existente...');
      try {
        // Tentar reinicializar se houve problemas anteriores
        if (this.hasError || !this.recognition.continuous) {
          console.log('🔄 Reconhecimento em estado inválido, reinicializando...');
          this.recognition = null;
          if (!this.init()) {
            console.error('❌ Falha na reinicialização do reconhecimento');
            this.showError('Erro ao inicializar reconhecimento de voz');
            return;
          }
        }
      } catch (error) {
        console.warn('⚠️ Erro ao verificar reconhecimento, reinicializando:', error);
        this.recognition = null;
        if (!this.init()) {
          console.error('❌ Falha na reinicialização do reconhecimento');
          this.showError('Erro ao inicializar reconhecimento de voz');
          return;
        }
      }
    }

    // Garantir que o modal existe
    this.createModalIfNeeded();

    const modal = document.getElementById('voice-modal');
    const content = modal?.querySelector('.voice-content-premium');

    if (modal && content) {
      // Mostrar modal com animação premium
      modal.style.display = 'flex';
      modal.style.pointerEvents = 'auto';
      modal.style.opacity = '1';

      // Animar conteúdo premium
      content.style.transform = 'scale(1) translateY(0)';
      content.style.opacity = '1';

      // Adicionar classe ao body
      document.body.classList.add('voice-modal-open');

      // Iniciar reconhecimento
      setTimeout(() => {
        this.startListening(type);
      }, 500);

      console.log('✅ Modal de voz premium aberto');
    } else {
      console.error('❌ Modal de voz não encontrado:', { modal: !!modal, content: !!content });
      console.error('❌ Modal HTML:', modal?.outerHTML?.substring(0, 200));
    }
  }

  closeModal() {
    // Evitar múltiplas chamadas
    if (!this.isModalOpen) {
      return;
    }

    console.log('🎤 Fechando modal de voz premium');

    const modal = document.getElementById('voice-modal');
    const content = modal?.querySelector('.voice-content-premium');

    if (modal && content) {
      // PRIMEIRO: Parar reconhecimento ANTES de limpar estados
      this.stopAllRecognition().catch(error => {
        console.warn('⚠️ Erro ao parar reconhecimento no closeModal:', error);
      });

      // DEPOIS: Limpar estados de UI (mas preservar o objeto recognition)
      this.isModalOpen = false;
      this.isListening = false;
      this.isStarting = false;
      this.hasError = false;
      this.isProcessingCommand = false;
      this.retryCount = 0;
      this.shouldKeepListening = true; // Resetar para permitir nova abertura

      // Animar fechamento premium
      content.style.transform = 'scale(0.8) translateY(20px)';
      content.style.opacity = '0';
      modal.style.opacity = '0';

      // Remover classe do body
      document.body.classList.remove('voice-modal-open');

      setTimeout(() => {
        modal.style.pointerEvents = 'none';
        modal.style.display = 'none';
        console.log('✅ Modal de voz premium fechado');
      }, 500); // Tempo maior para animação premium
    }
  }

  updateModalStatus(title, description, status) {
    const modal = document.getElementById('voice-modal');
    if (!modal) return;

    const titleEl = modal.querySelector('h3');
    const descEl = modal.querySelector('p');
    const iconEl = modal.querySelector('.voice-icon div');
    const statusEl = modal.querySelector('.voice-status');
    const statusTextEl = statusEl?.querySelector('p');

    // Atualizar textos com mensagens mais amigáveis
    if (titleEl) {
      switch (status) {
      case 'listening':
        titleEl.textContent = '🎤 Estou te ouvindo!';
        break;
      case 'processing':
        titleEl.textContent = '🧠 Processando...';
        break;
      case 'error':
        titleEl.textContent = '❌ Ops! Algo deu errado';
        break;
      case 'success':
        titleEl.textContent = '✅ Perfeito!';
        break;
      default:
        titleEl.textContent = title || '🎤 Estou te ouvindo!';
      }
    }

    if (descEl) {
      switch (status) {
      case 'listening':
        descEl.textContent = 'Fale naturalmente como você gastou ou recebeu dinheiro';
        break;
      case 'processing':
        descEl.textContent = 'Entendendo o que você disse...';
        break;
      case 'error':
        descEl.textContent = description || 'Tente falar novamente de forma mais clara';
        break;
      case 'success':
        descEl.textContent = description || 'Transação adicionada com sucesso!';
        break;
      default:
        descEl.textContent = description || 'Fale naturalmente como você gastou ou recebeu dinheiro';
      }
    }

    // Atualizar ícone baseado no status
    if (iconEl) {
      iconEl.className = 'w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-lg';

      switch (status) {
      case 'listening':
        iconEl.classList.add('bg-gradient-to-r', 'from-green-400', 'to-blue-500', 'animate-pulse');
        break;
      case 'processing':
        iconEl.classList.add('bg-gradient-to-r', 'from-yellow-400', 'to-orange-500', 'animate-spin');
        break;
      case 'error':
        iconEl.classList.add('bg-gradient-to-r', 'from-red-400', 'to-pink-500');
        break;
      case 'success':
        iconEl.classList.add('bg-gradient-to-r', 'from-green-400', 'to-emerald-500');
        break;
      default:
        iconEl.classList.add('bg-gradient-to-r', 'from-green-400', 'to-blue-500', 'animate-pulse');
      }
    }

    // Atualizar indicadores de status e texto
    if (statusEl) {
      const dots = statusEl.querySelectorAll('div');

      // Atualizar animação dos pontos
      dots.forEach((dot, index) => {
        // Remover classes antigas
        dot.classList.remove('animate-bounce', 'animate-pulse', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-red-500');

        switch (status) {
        case 'listening':
          dot.classList.add('animate-bounce', 'bg-green-500');
          dot.style.animationDelay = `${index * 0.1}s`;
          break;
        case 'processing':
          dot.classList.add('animate-pulse', 'bg-yellow-500');
          dot.style.animationDelay = `${index * 0.2}s`;
          break;
        case 'error':
          dot.classList.add('bg-red-500');
          dot.style.animationDelay = '';
          break;
        case 'success':
          dot.classList.add('bg-green-500');
          dot.style.animationDelay = '';
          break;
        default:
          dot.classList.add('animate-bounce', 'bg-green-500');
          dot.style.animationDelay = `${index * 0.1}s`;
        }
      });

      // Atualizar texto do status
      if (statusTextEl) {
        switch (status) {
        case 'listening':
          statusTextEl.textContent = 'Microfone ativo';
          statusTextEl.className = 'text-xs text-green-600 dark:text-green-400 font-medium';
          break;
        case 'processing':
          statusTextEl.textContent = 'Processando comando...';
          statusTextEl.className = 'text-xs text-yellow-600 dark:text-yellow-400 font-medium';
          break;
        case 'error':
          statusTextEl.textContent = 'Erro no reconhecimento';
          statusTextEl.className = 'text-xs text-red-600 dark:text-red-400 font-medium';
          break;
        case 'success':
          statusTextEl.textContent = 'Comando executado!';
          statusTextEl.className = 'text-xs text-green-600 dark:text-green-400 font-medium';
          break;
        default:
          statusTextEl.textContent = 'Microfone ativo';
          statusTextEl.className = 'text-xs text-green-600 dark:text-green-400 font-medium';
        }
      }
    }
  }

  // ===== CONTROLE DO RECONHECIMENTO =====

  async startListening(type = 'transaction') {
    console.log('🎤 [VoiceSystem] Iniciando reconhecimento de voz...', {
      type,
      isListening: this.isListening,
      isStarting: this.isStarting,
      hasRecognition: !!this.recognition,
      isAndroid: /Android/i.test(navigator.userAgent),
      isCapacitor: !!window.Capacitor,
      userAgent: navigator.userAgent.substring(0, 100)
    });

    try {
      // ANDROID/CAPACITOR: Tentar plugin nativo primeiro
      const isAndroid = /Android/i.test(navigator.userAgent);
      const isCapacitor = !!window.Capacitor;
      
      if (isAndroid && isCapacitor) {
        console.log('📱 [VoiceSystem] Modo Android/Capacitor detectado - tentando plugin nativo');
        
        // Tentar usar plugin Capacitor nativo
        try {
          const success = await this.tryCapacitorSpeechRecognition(type);
          if (success) {
            console.log('✅ [VoiceSystem] Plugin nativo funcionando');
            return true;
          }
        } catch (nativeError) {
          console.warn('⚠️ [VoiceSystem] Plugin nativo falhou, tentando Web Speech API:', nativeError);
        }
        
        // Fallback para Web Speech API com configurações específicas
        console.log('🔄 [VoiceSystem] Fallback para Web Speech API...');
        
        // Verificar se o reconhecimento está configurado
        if (!this.recognition) {
          console.error('❌ [VoiceSystem] Reconhecimento não configurado');
          throw new Error('Reconhecimento não configurado');
        }

        // Configurar listeners específicos para Android
        this.setupAndroidListeners();
        
        // Pular verificações de permissão e iniciar diretamente
        console.log('⏭️ [VoiceSystem] Pulando verificações de permissão para Android');
        
      } else {
        // VERIFICAR PERMISSÕES PARA WEB/outros ambientes
        if (window.permissionManager) {
          console.log('🔐 [VoiceSystem] Verificando permissões do microfone...');
          
          const microphoneGranted = await window.permissionManager.requestMicrophonePermission();
          
          if (!microphoneGranted) {
            console.error('❌ [VoiceSystem] Permissão do microfone negada');
            this.isStarting = false;
            this.showError('Permissão do microfone necessária para usar comando de voz');
            return false;
          }
          
          console.log('✅ [VoiceSystem] Permissão do microfone concedida');
        } else {
          console.log('⚠️ [VoiceSystem] PermissionManager não disponível, usando verificação rápida');
          // Verificação rápida de permissão (sem aguardar stream completo)
          if (!this.microphonePermissionChecked) {
            console.log('🔍 [VoiceSystem] Verificação rápida de permissão...');
            const hasPermission = await this.quickPermissionCheck();
            if (!hasPermission) {
              console.log('❌ [VoiceSystem] Permissão do microfone negada');
              return false;
            }
            this.microphonePermissionChecked = true;
          }
        }
      }

      // Verificar se o reconhecimento está configurado
      if (!this.recognition) {
        console.error('❌ Reconhecimento não configurado');
        throw new Error('Reconhecimento não configurado');
      }

      // Se já está ouvindo, não fazer nada
      if (this.isListening) {
        console.log('⚠️ Reconhecimento já está ativo, ignorando nova tentativa');
        return true;
      }

      // Definir tipo atual imediatamente
      this.currentType = type;
      console.log('✅ Tipo de comando definido:', this.currentType);

      // Atualizar status do modal
      this.updateModalStatus('', 'Iniciando...', 'processing');

      // Parada rápida do reconhecimento anterior (sem delay)
      try {
        this.recognition.stop();
        console.log('🛑 Parando reconhecimento anterior (sem delay)...');
      } catch {
        console.log('ℹ️ Nenhum reconhecimento anterior para parar');
      }

      // Marcar como iniciando para evitar múltiplas tentativas
      this.isStarting = true;

      // Iniciar reconhecimento IMEDIATAMENTE (sem delays)
      console.log('🚀 Iniciando reconhecimento IMEDIATAMENTE...');
      this.recognition.start();
      console.log('✅ Reconhecimento iniciado com sucesso');

      // Limpar flag de iniciando após um tempo menor
      setTimeout(() => {
        this.isStarting = false;
      }, 500);

      return true;

    } catch (error) {
      console.error('❌ Erro ao iniciar reconhecimento:', error);
      this.isStarting = false;

      let errorMessage = 'Erro ao iniciar reconhecimento de voz';

      if (error.name === 'InvalidStateError') {
        console.log('🔄 Reconhecimento já ativo, aguardando...');
        // Aguardar um pouco e tentar novamente
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (!this.isListening && !this.isStarting) {
          console.log('🔄 Tentando novamente após aguardar...');
          return this.startListening(type);
        }
        errorMessage = 'Sistema de voz ocupado. Tente novamente em alguns segundos.';
      } else if (error.name === 'NotSupportedError') {
        errorMessage = 'Reconhecimento de voz não suportado neste navegador. Use Chrome ou Edge.';
      } else if (error.name === 'NetworkError') {
        errorMessage = 'Erro de conexão. Verifique sua internet e tente novamente.';
      }

      this.showError(errorMessage);
      return false;
    }
  }

  // Tentar usar plugin Capacitor nativo para reconhecimento de voz
  async tryCapacitorSpeechRecognition(type) {
    console.log('🎯 [VoiceSystem] Tentando plugin Capacitor nativo...');
    
    try {
      // Importar o plugin dinamicamente
      const { getCapacitorSpeechRecognition } = await import('../plugins/CapacitorSpeechRecognition.js');
      
      const speechPlugin = await getCapacitorSpeechRecognition();
      
      if (!speechPlugin.isAvailable) {
        console.log('❌ [VoiceSystem] Plugin nativo não disponível');
        return false;
      }
      
      // Definir tipo atual
      this.currentType = type;
      
      // Configurar callbacks do plugin nativo
      speechPlugin.addEventListener('start', () => {
        console.log('✅ [VoiceSystem] Plugin nativo iniciado');
        this.isListening = true;
        this.isStarting = false;
        this.updateModalStatus('🎤', 'Escutando... Fale agora!', 'listening');
        
        // Mostrar botão de restart no mobile
        const restartBtn = document.querySelector('.restart-btn-mobile');
        if (restartBtn) {
          restartBtn.style.display = 'block';
        }
      });
      
      speechPlugin.addEventListener('result', async (event) => {
        console.log('🎯 [VoiceSystem] Resultado do plugin nativo:', event);
        
        if (event.results && event.results.length > 0) {
          const transcript = event.results[0].transcript;
          console.log('📝 [VoiceSystem] Transcript recebido:', transcript);
          
          // Parar plugin imediatamente após receber resultado
          console.log('🛑 [VoiceSystem] Parando plugin após resultado...');
          try {
            await speechPlugin.stop();
          } catch (error) {
            console.warn('⚠️ [VoiceSystem] Erro ao parar plugin:', error);
          }
          
          // Processar comando usando a mesma lógica
          this.processCommand(transcript, 1.0);
        }
      });
      
      speechPlugin.addEventListener('error', (event) => {
        console.error('❌ [VoiceSystem] Erro no plugin nativo:', event.error);
        this.isListening = false;
        this.isStarting = false;
        this.showError('Erro no reconhecimento de voz: ' + event.error);
      });
      
      speechPlugin.addEventListener('end', () => {
        console.log('🏁 [VoiceSystem] Plugin nativo finalizado');
        this.isListening = false;
      });
      
      // Iniciar reconhecimento
      await speechPlugin.start();
      
      console.log('🚀 [VoiceSystem] Plugin nativo iniciado com sucesso');
      return true;
      
    } catch (error) {
      console.error('❌ [VoiceSystem] Erro no plugin nativo:', error);
      return false;
    }
  }

  // Parar todo tipo de reconhecimento (Web Speech API + Plugin Nativo)
  async stopAllRecognition() {
    console.log('🛑 [VoiceSystem] Parando todo reconhecimento...');
    
    // Parar Web Speech API
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
        console.log('🛑 [VoiceSystem] Web Speech API parado');
      } catch (error) {
        console.warn('⚠️ [VoiceSystem] Erro ao parar Web Speech API:', error);
      }
    }
    
    // Parar plugin Capacitor nativo se estiver ativo
    if (window.Capacitor && window.Capacitor.Plugins) {
      try {
        const { getCapacitorSpeechRecognition } = await import('../plugins/CapacitorSpeechRecognition.js');
        const speechPlugin = await getCapacitorSpeechRecognition();
        
        if (speechPlugin && speechPlugin.isListening) {
          await speechPlugin.stop();
          console.log('🛑 [VoiceSystem] Plugin nativo parado');
        }
      } catch (error) {
        console.warn('⚠️ [VoiceSystem] Erro ao parar plugin nativo:', error);
      }
    }
    
    // Atualizar estados
    this.isListening = false;
    this.isStarting = false;
    this.shouldKeepListening = false;
    
    console.log('✅ [VoiceSystem] Todo reconhecimento parado');
  }

  // Configurar listeners específicos para Android
  setupAndroidListeners() {
    console.log('📱 [VoiceSystem] Configurando listeners específicos para Android...');
    
    if (!this.recognition) {
      console.error('❌ [VoiceSystem] Reconhecimento não disponível para configurar listeners');
      return;
    }

    // Remover listeners existentes para evitar duplicatas
    this.recognition.onstart = null;
    this.recognition.onresult = null;
    this.recognition.onerror = null;
    this.recognition.onend = null;

    // Configurar listeners com logs detalhados para Android
    this.recognition.onstart = () => {
      console.log('✅ [VoiceSystem] Android - Reconhecimento INICIADO');
      this.isListening = true;
      this.isStarting = false;
      this.updateModalStatus('🎤', 'Escutando... Fale agora!', 'listening');
      
      // Mostrar botão de restart no mobile
      const restartBtn = document.querySelector('.restart-btn-mobile');
      if (restartBtn) {
        restartBtn.style.display = 'block';
        console.log('📱 [VoiceSystem] Botão de restart exibido');
      }
    };

    this.recognition.onresult = (event) => {
      console.log('🎯 [VoiceSystem] Android - Resultado recebido:', event);
      this.handleRecognitionResult(event);
    };

    this.recognition.onerror = (event) => {
      console.error('❌ [VoiceSystem] Android - Erro no reconhecimento:', event.error, event);
      this.handleRecognitionError(event);
    };

    this.recognition.onend = () => {
      console.log('🏁 [VoiceSystem] Android - Reconhecimento FINALIZADO');
      this.isListening = false;
      this.isStarting = false;
      
      // Para Android, tentar reiniciar automaticamente se não houve comando
      if (!this.hasRecognizedSomething && this.shouldKeepListening) {
        console.log('🔄 [VoiceSystem] Android - Reiniciando reconhecimento automaticamente...');
        setTimeout(() => {
          if (!this.isListening && !this.isStarting) {
            this.recognition.start();
          }
        }, 100);
      }
    };

    console.log('✅ [VoiceSystem] Listeners Android configurados');
  }

  // Verificação rápida de permissão (sem aguardar stream completo)
  async quickPermissionCheck() {
    console.log('⚡ Verificação rápida de permissão...');

    try {
      // Verificar se a API está disponível
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.warn('⚠️ API getUserMedia não disponível');
        this.showError('Navegador não suporta acesso ao microfone. Use Chrome, Edge ou Firefox.');
        return false;
      }

      // Verificar permissões via API de permissões (mais rápido)
      if (navigator.permissions) {
        try {
          const permission = await navigator.permissions.query({ name: 'microphone' });
          console.log('🔍 Status da permissão:', permission.state);

          if (permission.state === 'granted') {
            console.log('✅ Permissão já concedida');
            return true;
          } else if (permission.state === 'denied') {
            console.log('❌ Permissão negada');
            this.showError('Permissão do microfone negada. Permita o acesso ao microfone nas configurações do navegador.');
            return false;
          }
          // Se 'prompt', continuar com verificação completa
        } catch {
          console.log('ℹ️ API de permissões não disponível, usando método alternativo');
        }
      }

      // Verificação rápida com timeout
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), 1000)
      );

      const streamPromise = navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      try {
        const stream = await Promise.race([streamPromise, timeoutPromise]);

        // Parar o stream imediatamente (apenas para verificar permissão)
        stream.getTracks().forEach(track => track.stop());

        console.log('✅ Permissão do microfone concedida (verificação rápida)');
        return true;
      } catch (raceError) {
        if (raceError.message === 'Timeout') {
          console.log('⚠️ Timeout na verificação, assumindo permissão OK');
          return true; // Assumir que está OK para não bloquear
        }
        throw raceError;
      }

    } catch (error) {
      console.warn('⚠️ Erro na verificação rápida:', error.name);

      // Para erros de permissão, mostrar mensagem específica
      if (error.name === 'NotAllowedError') {
        this.showError('Permissão do microfone negada. Permita o acesso ao microfone nas configurações do navegador.');
        return false;
      } else if (error.name === 'NotFoundError') {
        this.showError('Nenhum microfone encontrado. Verifique se há um microfone conectado.');
        return false;
      }

      // Para outros erros, assumir que está OK para não bloquear
      console.log('ℹ️ Assumindo permissão OK para não bloquear o sistema');
      return true;
    }
  }

  async requestMicrophonePermission() {
    console.log('🎤 Solicitando permissão do microfone...');

    try {
      // Verificar se a API está disponível
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.warn('⚠️ API getUserMedia não disponível');
        return false;
      }

      // Tentar solicitar permissão primeiro (pode revelar dispositivos)
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          }
        });

        // Parar o stream imediatamente (apenas para verificar permissão)
        stream.getTracks().forEach(track => track.stop());

        console.log('✅ Permissão do microfone concedida');
        return true;

      } catch (permissionError) {
        console.warn('⚠️ Erro de permissão:', permissionError.name);

        // Se for erro de permissão, tentar enumerar dispositivos
        try {
          const devices = await navigator.mediaDevices.enumerateDevices();
          const audioDevices = devices.filter(device => device.kind === 'audioinput');

          console.log('🔍 Dispositivos encontrados:', devices.length);
          console.log('🎤 Dispositivos de áudio:', audioDevices.length);

          if (audioDevices.length === 0) {
            console.warn('⚠️ Nenhum dispositivo de áudio encontrado');
            this.showError('Nenhum microfone encontrado. Verifique se há um microfone conectado.');
            return false;
          } else {
            console.log('✅ Dispositivos de áudio disponíveis:', audioDevices.map(d => d.label || 'Microfone'));
            // Se há dispositivos mas permissão foi negada, mostrar mensagem específica
            this.showError('Permissão do microfone negada. Permita o acesso ao microfone nas configurações do navegador.');
            return false;
          }
        } catch (enumError) {
          console.error('❌ Erro ao enumerar dispositivos:', enumError);
          this.showError('Erro ao verificar dispositivos de áudio. Tente recarregar a página.');
          return false;
        }
      }

    } catch (error) {
      console.error('❌ Erro ao solicitar permissão:', error);

      // Tratar erros específicos
      let errorMessage = 'Erro ao acessar microfone';

      if (error.name === 'NotFoundError') {
        errorMessage = 'Nenhum microfone encontrado. Verifique se há um microfone conectado.';
      } else if (error.name === 'NotAllowedError') {
        errorMessage = 'Permissão do microfone negada. Permita o acesso ao microfone nas configurações do navegador.';
      } else if (error.name === 'NotReadableError') {
        errorMessage = 'Microfone em uso por outro aplicativo. Feche outros aplicativos que possam estar usando o microfone.';
      } else if (error.name === 'OverconstrainedError') {
        errorMessage = 'Configuração de microfone não suportada. Tente usar outro navegador.';
      } else if (error.name === 'TypeError') {
        errorMessage = 'Navegador não suporta acesso ao microfone. Use Chrome, Edge ou Firefox.';
      }

      this.showError(errorMessage);
      return false;
    }
  }

  // ===== NOTIFICAÇÕES =====

  showSuccess(message) {
    console.log('✅ Sucesso:', message);
    this.updateModalStatus('', message, 'success');

    // Usar nova API do Snackbar
    if (window.Snackbar && typeof window.Snackbar.success === 'function') {
      window.Snackbar.success(message);
    } else if (window.Snackbar && typeof window.Snackbar.show === 'function') {
      window.Snackbar.show(message, 'success');
    } else if (window.Snackbar && typeof window.Snackbar === 'function') {
      window.Snackbar({ message, type: 'success' });
    } else if (window.alert) {
      alert(`✅ ${message}`);
    }
  }

  showError(message) {
    console.error('❌ Erro:', message);
    this.updateModalStatus('', message, 'error');

    // Usar nova API do Snackbar com fallbacks
    if (window.Snackbar && typeof window.Snackbar.error === 'function') {
      window.Snackbar.error(message);
    } else if (window.Snackbar && typeof window.Snackbar.show === 'function') {
      window.Snackbar.show(message, 'error');
    } else if (window.Snackbar && typeof window.Snackbar === 'function') {
      window.Snackbar({ message, type: 'error' });
    } else if (window.alert) {
      alert(`❌ ${message}`);
    } else {
      console.error('Nenhum sistema de notificação disponível');
    }
  }

  // ===== EVENTOS GLOBAIS =====

  setupGlobalEvents() {
    // Remover event listeners existentes para evitar duplicação
    this.removeGlobalEvents();

    // Fechar modal com ESC
    this.escapeHandler = (e) => {
      if (e.key === 'Escape' && this.isModalOpen) {
        this.closeModal();
      }
    };
    document.addEventListener('keydown', this.escapeHandler);

    // Fechar modal ao clicar fora
    this.outsideClickHandler = (e) => {
      const modal = document.getElementById('voice-modal');
      if (e.target === modal && this.isModalOpen) {
        this.closeModal();
      }
    };
    document.addEventListener('click', this.outsideClickHandler);

    // Botão de fechar modal
    const closeBtn = document.getElementById('close-voice-modal');
    if (closeBtn) {
      // Remover event listeners existentes do botão
      const newCloseBtn = closeBtn.cloneNode(true);
      closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);

      this.closeBtnHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('❌ Close voice modal button clicked');
        this.closeModal();
      };
      newCloseBtn.addEventListener('click', this.closeBtnHandler);
    }
  }

  removeGlobalEvents() {
    // Remover event listeners existentes
    if (this.escapeHandler) {
      document.removeEventListener('keydown', this.escapeHandler);
      this.escapeHandler = null;
    }

    if (this.outsideClickHandler) {
      document.removeEventListener('click', this.outsideClickHandler);
      this.outsideClickHandler = null;
    }

    if (this.closeBtnHandler) {
      const closeBtn = document.getElementById('close-voice-modal');
      if (closeBtn) {
        closeBtn.removeEventListener('click', this.closeBtnHandler);
      }
      this.closeBtnHandler = null;
    }
  }

  // ===== FUNÇÕES PÚBLICAS =====

  start(type = 'transaction') {
    console.log('🎤 VoiceSystem.start chamado:', type);

    try {
      // Verificar se já está inicializado
      if (!this.recognition) {
        console.log('🔄 Inicializando VoiceSystem...');
        if (!this.init()) {
          console.error('❌ Falha na inicialização do VoiceSystem');
          return false;
        }
      }

      // Verificar se o modal existe
      const modal = document.getElementById('voice-modal');
      if (!modal) {
        console.error('❌ Modal de voz não encontrado no DOM');
        this.showError('Interface de voz não disponível');
        return false;
      }

      // Definir tipo atual
      this.currentType = type;
      console.log('✅ Tipo de comando definido:', this.currentType);

      // Abrir modal
      this.openModal(type);
      return true;

    } catch (error) {
      console.error('❌ Erro ao iniciar VoiceSystem:', error);
      this.showError(`Erro ao iniciar reconhecimento de voz: ${error.message}`);
      return false;
    }
  }

  stop() {
    console.log('🎤 VoiceSystem.stop chamado');
    this.closeModal();
  }

  // ===== DESTRUTOR =====

  destroy() {
    console.log('🎤 Destruindo VoiceSystem...');

    // Parar reconhecimento
    if (this.recognition) {
      this.recognition.stop();
      this.recognition = null;
    }

    // Remover event listeners
    this.removeGlobalEvents();

    // Fechar modal se estiver aberto
    if (this.isModalOpen) {
      this.closeModal();
    }

    // Resetar estado
    this.isListening = false;
    this.isModalOpen = false;
    this.retryCount = 0;

    console.log('✅ VoiceSystem destruído');
  }

  // ===== MÉTODOS UTILITÁRIOS PARA ACESSAR DADOS RECONHECIDOS =====

  /**
   * Retorna a última transação reconhecida por voz
   */
  getLastRecognizedTransaction() {
    return this.lastRecognizedTransaction || null;
  }

  /**
   * Retorna a última categoria reconhecida por voz
   */
  getLastRecognizedCategory() {
    return this.lastRecognizedCategory || null;
  }

  /**
   * Abre o modal de transação com os últimos dados reconhecidos
   */
  openTransactionModalWithLastData() {
    if (this.lastRecognizedTransaction && window.showAddTransactionModal) {
      console.log('🎤 Abrindo modal de transação com últimos dados reconhecidos');
      window.showAddTransactionModal(this.lastRecognizedTransaction);
      return true;
    }
    return false;
  }

  /**
   * Abre o modal de categoria com os últimos dados reconhecidos
   */
  openCategoryModalWithLastData() {
    if (this.lastRecognizedCategory && window.showAddCategoryModal) {
      console.log('🎤 Abrindo modal de categoria com últimos dados reconhecidos');
      window.showAddCategoryModal(this.lastRecognizedCategory);
      return true;
    }
    return false;
  }

  /**
   * Limpa os dados reconhecidos armazenados
   */
  clearRecognizedData() {
    this.lastRecognizedTransaction = null;
    this.lastRecognizedCategory = null;
    console.log('🎤 Dados reconhecidos limpos');
  }

  // *** MÉTODOS DE PREENCHIMENTO DOS MODAIS ***
  
  async preenchearCamposCategoria(dados) {
    console.log('📝 ===== PREENCHIMENTO ROBUSTO DE CATEGORIA =====');
    console.log('📝 Dados recebidos:', dados);
    
    try {
      // ETAPA 1: Aguardar carregamento completo do modal
      const modalCarregado = await this.aguardarCarregamentoModal();
      if (!modalCarregado) {
        console.warn('⚠️ Modal não carregou completamente, tentando preenchimento mesmo assim');
      }

      // ETAPA 2: Detectar campos disponíveis dinamicamente
      const campos = await this.detectarCamposFormulario('category');
      console.log('📝 Campos detectados:', campos);

      // ETAPA 3: Executar preenchimento com retry
      const sucesso = await this.executarPreenchimentoComRetry(campos, dados, 'category');
      
      if (sucesso) {
        console.log('✅ Preenchimento de categoria concluído com sucesso');
      } else {
        console.warn('⚠️ Preenchimento parcial ou com falhas');
      }

    } catch (error) {
      console.error('❌ Erro no preenchimento robusto de categoria:', error);
      // Fallback para método básico
      this.executarPreenchimentoCategoria(dados);
    }
  }

  async preenchearCamposTransacao(dados) {
    console.log('📝 ===== PREENCHIMENTO ROBUSTO DE TRANSAÇÃO =====');
    console.log('📝 Dados recebidos:', dados);
    
    try {
      // ETAPA 1: Aguardar carregamento completo do modal
      const modalCarregado = await this.aguardarCarregamentoModal();
      if (!modalCarregado) {
        console.warn('⚠️ Modal não carregou completamente, tentando preenchimento mesmo assim');
      }

      // ETAPA 2: Detectar campos disponíveis dinamicamente
      const campos = await this.detectarCamposFormulario('transaction');
      console.log('📝 Campos detectados:', campos);

      // ETAPA 3: Executar preenchimento com retry
      const sucesso = await this.executarPreenchimentoComRetry(campos, dados, 'transaction');
      
      if (sucesso) {
        console.log('✅ Preenchimento de transação concluído com sucesso');
      } else {
        console.warn('⚠️ Preenchimento parcial ou com falhas');
      }

    } catch (error) {
      console.error('❌ Erro no preenchimento robusto de transação:', error);
      // Fallback para método anterior
      this.executarPreenchimentoTransacao(dados);
    }
  }
  
  executarPreenchimentoTransacao(dados) {
    console.log('📝 ===== EXECUTANDO PREENCHIMENTO DE TRANSAÇÃO =====');
    console.log('📝 Dados:', dados);
    
    try {
      // *** BUSCAR TODOS OS CAMPOS POSSÍVEIS COM SELETORES MAIS ABRANGENTES ***
      console.log('🔍 Procurando campos no DOM...');
      
      // Lista de todos os inputs e selects visíveis
      const allInputs = Array.from(document.querySelectorAll('input, select, textarea'));
      console.log('🔍 Total de inputs encontrados:', allInputs.length);
      
      // *** DEBUG: MOSTRAR TODOS OS CAMPOS DISPONÍVEIS ***
      allInputs.forEach((input, index) => {
        console.log(`Campo ${index + 1}:`, {
          tagName: input.tagName,
          type: input.type || 'N/A',
          name: input.name || 'sem name',
          id: input.id || 'sem id',
          placeholder: input.placeholder || 'sem placeholder',
          className: input.className,
          value: input.value
        });
      });
      
      // *** BUSCA INTELIGENTE DE CAMPOS ***
      // Função para encontrar campo por múltiplas estratégias
      const findField = (type, searchTerms) => {
        console.log(`🔍 Procurando campo para: ${type}`);
        
        // Estratégia 1: Seletores específicos
        for (const term of searchTerms) {
          const field = document.querySelector(`[name="${term}"], #${term}, [id*="${term}"], [placeholder*="${term}"], [data-field="${term}"]`);
          if (field) {
            console.log(`✅ Campo ${type} encontrado por seletor específico:`, field);
            return field;
          }
        }
        
        // Estratégia 2: Busca por texto em placeholder
        for (const input of allInputs) {
          const placeholder = (input.placeholder || '').toLowerCase();
          const name = (input.name || '').toLowerCase();
          const id = (input.id || '').toLowerCase();
          
          for (const term of searchTerms) {
            if (placeholder.includes(term.toLowerCase()) ||
                name.includes(term.toLowerCase()) ||
                id.includes(term.toLowerCase())) {
              console.log(`✅ Campo ${type} encontrado por busca inteligente:`, input);
              return input;
            }
          }
        }
        
        console.log(`❌ Campo ${type} não encontrado`);
        return null;
      };
      
      // *** ESTRATÉGIA ALTERNATIVA: BUSCA POR TIPO DE CAMPO ***
      const findByType = (inputType, exclude = []) => {
        const fields = allInputs.filter(input => {
          const type = input.type || input.tagName.toLowerCase();
          const name = input.name || '';
          const id = input.id || '';
          
          return type === inputType &&
                 !exclude.some(ex => name.includes(ex) || id.includes(ex));
        });
        
        console.log(`🔍 Campos do tipo '${inputType}' encontrados:`, fields.length);
        return fields[0] || null;
      };
      
      // *** TENTAR PREENCHER DESCRIÇÃO ***
      const descricaoField = findField('descrição', ['descricao', 'description', 'desc']) ||
                             findByType('text', ['categoria', 'category', 'valor', 'value']);
      
      if (descricaoField && dados.descricao) {
        descricaoField.value = dados.descricao;
        descricaoField.dispatchEvent(new Event('input', { bubbles: true }));
        descricaoField.dispatchEvent(new Event('change', { bubbles: true }));
        console.log('✅ Descrição preenchida:', dados.descricao);
      } else {
        console.log('❌ Campo descrição não encontrado ou dados não disponíveis');
      }
      
      // *** TENTAR PREENCHER VALOR ***
      const valorField = findField('valor', ['valor', 'value', 'amount', 'price']) ||
                         findByType('number');
      
      if (valorField && dados.valor !== null) {
        valorField.value = dados.valor;
        valorField.dispatchEvent(new Event('input', { bubbles: true }));
        valorField.dispatchEvent(new Event('change', { bubbles: true }));
        console.log('✅ Valor preenchido:', dados.valor);
      } else {
        console.log('❌ Campo valor não encontrado ou dados não disponíveis');
      }
      
      // *** TENTAR PREENCHER TIPO ***
      const tipoField = findField('tipo', ['tipo', 'type']) ||
                        allInputs.find(input => input.tagName === 'SELECT' && input.innerHTML.includes('despesa'));
      
      if (tipoField && dados.tipo) {
        const options = tipoField.querySelectorAll('option');
        console.log('🔍 Opções de tipo encontradas:', Array.from(options).map(o => o.value + ' - ' + o.textContent));
        
        for (const option of options) {
          if (option.value === dados.tipo || option.textContent.toLowerCase().includes(dados.tipo)) {
            tipoField.value = option.value;
            tipoField.dispatchEvent(new Event('change', { bubbles: true }));
            console.log('✅ Tipo preenchido:', dados.tipo, '→', option.value);
            break;
          }
        }
      } else {
        console.log('❌ Campo tipo não encontrado ou dados não disponíveis');
      }
      
      // *** TENTAR PREENCHER CATEGORIA ***
      // Busca mais específica para o campo de categoria (deve ser um SELECT)
      const categoriaField = document.querySelector('select[name="categoriaId"], select[id="categoriaId"], select#categoriaId') ||
                             allInputs.find(input => input.tagName === 'SELECT' &&
                                           (input.name === 'categoriaId' || input.id === 'categoriaId' ||
                                            input.name === 'categoria' || input.id === 'categoria'));
      
      console.log('🔍 Campo categoria encontrado:', categoriaField);
      
      if (categoriaField && dados.categoriaId) {
        // Verificar se a categoria existe nas opções
        const options = categoriaField.querySelectorAll('option');
        console.log('🔍 Opções de categoria disponíveis:', Array.from(options).map(o => ({ value: o.value, text: o.textContent })));
        
        const optionExists = Array.from(options).some(option => option.value === dados.categoriaId);
        
        if (optionExists) {
          categoriaField.value = dados.categoriaId;
          categoriaField.dispatchEvent(new Event('change', { bubbles: true }));
          console.log('✅ Categoria preenchida:', dados.categoriaId);
        } else {
          console.log('⚠️ Categoria não encontrada nas opções disponíveis:', dados.categoriaId);
        }
      } else {
        console.log('❌ Campo categoria não encontrado ou dados não disponíveis');
        console.log('❌ Campo encontrado:', categoriaField);
        console.log('❌ CategoriaId:', dados.categoriaId);
      }
      
      console.log('📝 ===== PREENCHIMENTO CONCLUÍDO =====');
    } catch (error) {
      console.error('❌ Erro ao pré-preencher campos de transação:', error);
    }
  }

  executarPreenchimentoCategoria(dados) {
    console.log('📝 ===== EXECUTANDO PREENCHIMENTO DE CATEGORIA =====');
    console.log('📝 Dados:', dados);
    
    try {
      // *** BUSCAR CAMPOS DO MODAL DE CATEGORIA ***
      console.log('🔍 Procurando campos no DOM...');
      
      // Lista de todos os inputs e selects visíveis
      const allInputs = Array.from(document.querySelectorAll('input, select, textarea'));
      console.log('🔍 Total de inputs encontrados:', allInputs.length);
      
      // Função para encontrar campo por múltiplas estratégias
      const findField = (type, searchTerms) => {
        console.log(`🔍 Procurando campo para: ${type}`);
        
        // Estratégia 1: Seletores específicos
        for (const term of searchTerms) {
          const field = document.querySelector(`[name="${term}"], #${term}, [id*="${term}"], [placeholder*="${term}"]`);
          if (field) {
            console.log(`✅ Campo ${type} encontrado:`, field);
            return field;
          }
        }
        
        console.log(`❌ Campo ${type} não encontrado`);
        return null;
      };
      
      // *** PREENCHER NOME DA CATEGORIA ***
      const nomeField = findField('nome', ['nome', 'name', 'categoria', 'category']);
      if (nomeField && dados.nome) {
        nomeField.value = dados.nome;
        nomeField.dispatchEvent(new Event('input', { bubbles: true }));
        nomeField.dispatchEvent(new Event('change', { bubbles: true }));
        console.log('✅ Nome da categoria preenchido:', dados.nome);
      } else {
        console.log('❌ Campo nome não encontrado ou dados não disponíveis');
      }
      
      // *** PREENCHER TIPO DA CATEGORIA ***
      const tipoField = findField('tipo', ['tipo', 'type']);
      if (tipoField && dados.tipo) {
        tipoField.value = dados.tipo;
        tipoField.dispatchEvent(new Event('change', { bubbles: true }));
        console.log('✅ Tipo da categoria preenchido:', dados.tipo);
      } else {
        console.log('❌ Campo tipo não encontrado ou dados não disponíveis');
      }
      
      // *** PREENCHER LIMITE DA CATEGORIA ***
      const limiteField = findField('limite', ['limite', 'limit', 'valor', 'amount']);
      if (limiteField && dados.limite) {
        limiteField.value = dados.limite;
        limiteField.dispatchEvent(new Event('input', { bubbles: true }));
        limiteField.dispatchEvent(new Event('change', { bubbles: true }));
        console.log('✅ Limite da categoria preenchido:', dados.limite);
      } else {
        console.log('❌ Campo limite não encontrado ou dados não disponíveis');
      }
      
      console.log('📝 ===== PREENCHIMENTO DE CATEGORIA CONCLUÍDO =====');
    } catch (error) {
      console.error('❌ Erro ao pré-preencher campos de categoria:', error);
    }
  }

  // ===== MÉTODOS ROBUSTOS DE PREENCHIMENTO =====

  async aguardarCarregamentoModal(maxTentativas = 20, intervalo = 250) {
    console.log('⏳ Aguardando carregamento completo do modal...');
    
    for (let tentativa = 1; tentativa <= maxTentativas; tentativa++) {
      // Verificar se existe modal visível
      const modais = document.querySelectorAll('.modal, .dialog, [role="dialog"], [data-modal]');
      const modalVisivel = Array.from(modais).find(modal => {
        const estilo = window.getComputedStyle(modal);
        return estilo.display !== 'none' && estilo.visibility !== 'hidden';
      });

      if (modalVisivel) {
        // Verificar se tem campos de entrada
        const campos = modalVisivel.querySelectorAll('input, select, textarea');
        if (campos.length > 0) {
          // Aguardar um pouco mais para garantir que scripts tenham processado
          await this.sleep(200);
          console.log(`✅ Modal carregado na tentativa ${tentativa} (${campos.length} campos encontrados)`);
          return true;
        }
      }

      console.log(`⏳ Tentativa ${tentativa}/${maxTentativas} - aguardando modal...`);
      await this.sleep(intervalo);
    }

    console.warn('⚠️ Timeout aguardando carregamento do modal');
    return false;
  }

  async detectarCamposFormulario(tipoFormulario) {
    console.log(`🔍 Detectando campos para formulário tipo: ${tipoFormulario}`);
    
    const detectores = this.obterDetectoresCampos(tipoFormulario);
    const camposDetectados = {};

    for (const [nomeCampo, seletores] of Object.entries(detectores)) {
      console.log(`🔍 Procurando campo "${nomeCampo}"...`);
      
      let campo = null;
      
      // Tentar cada seletor até encontrar um campo
      for (const seletor of seletores) {
        try {
          const elementos = document.querySelectorAll(seletor);
          // Pegar o primeiro elemento visível
          for (const elemento of elementos) {
            if (this.ehElementoVisivel(elemento)) {
              campo = elemento;
              console.log(`✅ Campo "${nomeCampo}" encontrado com seletor: ${seletor}`);
              break;
            }
          }
          if (campo) break;
        } catch (error) {
          console.warn(`⚠️ Erro com seletor "${seletor}":`, error);
        }
      }

      if (campo) {
        camposDetectados[nomeCampo] = {
          elemento: campo,
          tipo: this.identificarTipoCampo(campo),
          estrategia: this.obterEstrategiaPreenchimento(campo)
        };
      } else {
        console.warn(`❌ Campo "${nomeCampo}" não encontrado`);
      }
    }

    console.log('🔍 Campos detectados:', Object.keys(camposDetectados));
    return camposDetectados;
  }

  obterDetectoresCampos(tipoFormulario) {
    const detectores = {
      transaction: {
        descricao: [
          'input[name="descricao"]', 'input[name="description"]', 'input[id*="descric"]',
          'input[placeholder*="descriç"]', 'input[placeholder*="description"]',
          'textarea[name="descricao"]', 'textarea[name="description"]',
          'input[type="text"]:not([name*="categoria"]):not([name*="category"]):not([name*="valor"]):not([name*="value"])'
        ],
        valor: [
          'input[name="valor"]', 'input[name="value"]', 'input[name="amount"]', 'input[name="price"]',
          'input[type="number"]', 'input[placeholder*="valor"]', 'input[placeholder*="value"]',
          'input[placeholder*="preço"]', 'input[placeholder*="quantia"]'
        ],
        categoria: [
          'select[name*="categoria"]', 'select[id*="categoria"]', 'select[name="categoriaId"]',
          'select[id="categoriaId"]', 'select:has(option:contains("Alimentação"))',
          'select:has(option:contains("Transporte"))', 'select:has(option[value*="cat"])',
          'select[name="category"]', 'select[id="category"]'
        ],
        tipo: [
          'select[name="tipo"]', 'select[name="type"]', 'select[id="tipo"]', 'select[id="type"]',
          'select:has(option[value="despesa"])', 'select:has(option[value="receita"])',
          'input[name="tipo"]', 'input[name="type"]'
        ]
      },
      category: {
        nome: [
          'input[name="nome"]', 'input[name="name"]', 'input[id*="nome"]', 'input[id*="name"]',
          'input[placeholder*="nome"]', 'input[placeholder*="name"]',
          'input[type="text"]:first-of-type'
        ],
        tipo: [
          'select[name="tipo"]', 'select[name="type"]', 'select[id="tipo"]', 'select[id="type"]',
          'select:has(option[value="despesa"])', 'select:has(option[value="receita"])'
        ],
        limite: [
          'input[name="limite"]', 'input[name="limit"]', 'input[name="budget"]',
          'input[type="number"]', 'input[placeholder*="limite"]'
        ]
      }
    };

    return detectores[tipoFormulario] || {};
  }

  ehElementoVisivel(elemento) {
    if (!elemento) return false;
    
    const estilo = window.getComputedStyle(elemento);
    return estilo.display !== 'none' &&
           estilo.visibility !== 'hidden' &&
           estilo.opacity !== '0' &&
           elemento.offsetParent !== null;
  }

  identificarTipoCampo(elemento) {
    if (elemento.tagName === 'SELECT') return 'select';
    if (elemento.tagName === 'TEXTAREA') return 'textarea';
    if (elemento.type === 'number') return 'number';
    if (elemento.type === 'text') return 'text';
    return 'input';
  }

  obterEstrategiaPreenchimento(elemento) {
    const tipo = this.identificarTipoCampo(elemento);
    
    const estrategias = {
      select: (valor) => this.preencherSelect(elemento, valor),
      number: (valor) => this.preencherNumerico(elemento, valor),
      text: (valor) => this.preencherTexto(elemento, valor),
      textarea: (valor) => this.preencherTexto(elemento, valor),
      input: (valor) => this.preencherTexto(elemento, valor)
    };

    return estrategias[tipo] || estrategias.input;
  }

  async executarPreenchimentoComRetry(campos, dados, tipoFormulario, maxTentativas = 3) {
    console.log('📝 Executando preenchimento com retry...');
    
    let sucessos = 0;
    let totalCampos = 0;
    
    const mapeamentoCampos = {
      transaction: {
        descricao: dados.descricao,
        valor: dados.valor,
        categoria: dados.categoriaId,
        tipo: dados.tipo
      },
      category: {
        nome: dados.nome,
        tipo: dados.tipo,
        limite: dados.limite
      }
    };

    const dadosCampos = mapeamentoCampos[tipoFormulario] || {};

    for (const [nomeCampo, valorCampo] of Object.entries(dadosCampos)) {
      if (!valorCampo && valorCampo !== 0) continue; // Pular valores nulos/undefined
      
      totalCampos++;
      const campo = campos[nomeCampo];
      
      if (!campo) {
        console.warn(`⚠️ Campo "${nomeCampo}" não disponível para preenchimento`);
        continue;
      }

      console.log(`📝 Preenchendo campo "${nomeCampo}" com valor:`, valorCampo);

      // Tentar preencher com retry
      let sucesso = false;
      for (let tentativa = 1; tentativa <= maxTentativas; tentativa++) {
        try {
          await campo.estrategia(valorCampo);
          
          // Verificar se o valor foi realmente definido
          await this.sleep(100);
          if (this.verificarPreenchimento(campo.elemento, valorCampo)) {
            console.log(`✅ Campo "${nomeCampo}" preenchido com sucesso (tentativa ${tentativa})`);
            sucessos++;
            sucesso = true;
            break;
          } else {
            console.warn(`⚠️ Tentativa ${tentativa} falhou para campo "${nomeCampo}"`);
          }
        } catch (error) {
          console.error(`❌ Erro na tentativa ${tentativa} para campo "${nomeCampo}":`, error);
        }
        
        if (tentativa < maxTentativas) {
          await this.sleep(200); // Aguardar antes da próxima tentativa
        }
      }

      if (!sucesso) {
        console.error(`❌ Falha total no preenchimento do campo "${nomeCampo}"`);
      }
    }

    const percentualSucesso = totalCampos > 0 ? (sucessos / totalCampos) * 100 : 0;
    console.log(`📊 Preenchimento concluído: ${sucessos}/${totalCampos} campos (${percentualSucesso.toFixed(1)}%)`);
    
    return percentualSucesso >= 50; // Considerar sucesso se pelo menos 50% preencheram
  }

  async preencherSelect(elemento, valor) {
    console.log('📝 Preenchendo SELECT:', { valor, opcoes: elemento.options.length });
    
    // Buscar por value exato primeiro
    for (let i = 0; i < elemento.options.length; i++) {
      if (elemento.options[i].value === valor || elemento.options[i].value === valor.toString()) {
        elemento.selectedIndex = i;
        this.dispararEventos(elemento);
        return;
      }
    }
    
    // Buscar por texto contido
    for (let i = 0; i < elemento.options.length; i++) {
      const textoOpcao = elemento.options[i].textContent.toLowerCase();
      const valorProcurado = valor.toString().toLowerCase();
      
      if (textoOpcao.includes(valorProcurado) || valorProcurado.includes(textoOpcao)) {
        elemento.selectedIndex = i;
        this.dispararEventos(elemento);
        return;
      }
    }
    
    console.warn('⚠️ Opção não encontrada no SELECT:', valor);
  }

  async preencherNumerico(elemento, valor) {
    console.log('📝 Preenchendo campo numérico:', valor);
    
    elemento.value = valor.toString();
    elemento.focus();
    this.dispararEventos(elemento);
  }

  async preencherTexto(elemento, valor) {
    console.log('📝 Preenchendo campo de texto:', valor);
    
    elemento.value = valor.toString();
    elemento.focus();
    this.dispararEventos(elemento);
  }

  dispararEventos(elemento) {
    // Disparar múltiplos eventos para garantir compatibilidade
    const eventos = ['input', 'change', 'blur', 'keyup'];
    eventos.forEach(evento => {
      elemento.dispatchEvent(new Event(evento, { bubbles: true }));
    });
  }

  verificarPreenchimento(elemento, valorEsperado) {
    const valorAtual = elemento.value;
    const valorEsperadoStr = valorEsperado.toString();
    
    // Para selects, verificar selectedIndex
    if (elemento.tagName === 'SELECT') {
      return elemento.selectedIndex > 0 || valorAtual === valorEsperadoStr;
    }
    
    // Para inputs, verificar se valor foi definido
    return valorAtual === valorEsperadoStr || 
           (valorAtual && valorAtual.includes(valorEsperadoStr));
  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // ===== SISTEMA DE APRENDIZAGEM E FEEDBACK =====

  inicializarSistemaAprendizagem() {
    console.log('🧠 Inicializando sistema de aprendizagem...');
    
    this.aprendizagem = {
      historico: this.carregarHistoricoAprendizagem(),
      patterns: this.carregarPatternsAprendidos(),
      feedbacks: [],
      melhorias: this.carregarMelhorias(),
      estatisticas: this.carregarEstatisticas()
    };

    // Configurar listeners para capturar interações do usuário
    this.configurarCapturaPadrao();
    
    console.log('🧠 Sistema de aprendizagem carregado:', {
      historico: this.aprendizagem.historico.length,
      patterns: Object.keys(this.aprendizagem.patterns).length,
      melhorias: Object.keys(this.aprendizagem.melhorias).length
    });
  }

  configurarCapturaPadrao() {
    // Capturar quando usuário corrige valores manualmente
    document.addEventListener('input', (event) => {
      if (this.estaGravando && event.target.matches('input, select, textarea')) {
        this.capturarCorrecaoUsuario(event.target);
      }
    });

    // Capturar quando formulários são submetidos
    document.addEventListener('submit', (event) => {
      if (this.ultimoComandoVoz) {
        this.registrarSucessoComando(event.target);
      }
    });
  }

  capturarCorrecaoUsuario(elemento) {
    const valorOriginal = elemento.dataset.voiceOriginal;
    const valorCorrigido = elemento.value;
    
    if (valorOriginal && valorOriginal !== valorCorrigido) {
      console.log('📝 Correção do usuário detectada:', {
        original: valorOriginal,
        corrigido: valorCorrigido,
        campo: this.identificarTipoCampo(elemento)
      });

      this.registrarFeedback({
        tipo: 'correcao',
        textoOriginal: this.ultimoTextoReconhecido,
        valorOriginal: valorOriginal,
        valorCorrigido: valorCorrigido,
        tipoCampo: this.identificarTipoCampo(elemento),
        timestamp: Date.now()
      });
    }
  }

  registrarFeedback(feedback) {
    console.log('📊 Registrando feedback:', feedback);
    
    this.aprendizagem.feedbacks.push(feedback);
    
    // Processar feedback imediatamente para melhorias
    this.processarFeedbackImediato(feedback);
    
    // Salvar periodicamente
    if (this.aprendizagem.feedbacks.length % 5 === 0) {
      this.salvarDadosAprendizagem();
    }
  }

  processarFeedbackImediato(feedback) {
    switch (feedback.tipo) {
      case 'correcao':
        this.aprenderCorrecao(feedback);
        break;
      case 'categoria_incorreta':
        this.aprenderCategoria(feedback);
        break;
      case 'valor_incorreto':
        this.aprenderValor(feedback);
        break;
    }
  }

  aprenderCorrecao(feedback) {
    const { textoOriginal, valorOriginal, valorCorrigido, tipoCampo } = feedback;
    
    // Criar padrão de melhoria baseado na correção
    const pattern = this.extrairPattern(textoOriginal, valorOriginal, valorCorrigido);
    
    if (pattern) {
      const chave = `${tipoCampo}_${pattern.tipo}`;
      
      if (!this.aprendizagem.patterns[chave]) {
        this.aprendizagem.patterns[chave] = [];
      }
      
      this.aprendizagem.patterns[chave].push({
        entrada: pattern.entrada,
        saida: pattern.saida,
        confianca: 1,
        usos: 1,
        criado: Date.now()
      });

      console.log('🧠 Novo padrão aprendido:', pattern);
    }
  }

  extrairPattern(texto, valorOriginal, valorCorrigido) {
    // Analisar diferentes tipos de correções
    
    // Correção de números
    if (this.ehNumero(valorOriginal) && this.ehNumero(valorCorrigido)) {
      return {
        tipo: 'numero',
        entrada: this.extrairContextoNumero(texto, valorOriginal),
        saida: valorCorrigido
      };
    }
    
    // Correção de categorias
    if (this.ehCategoria(valorOriginal, valorCorrigido)) {
      return {
        tipo: 'categoria',
        entrada: this.extrairContextoCategoria(texto, valorOriginal),
        saida: valorCorrigido
      };
    }
    
    // Correção de texto livre
    return {
      tipo: 'texto',
      entrada: texto.toLowerCase(),
      saida: valorCorrigido
    };
  }

  aplicarAprendizagem(texto, tipoDeteccao) {
    console.log('🤖 Aplicando aprendizagem para:', { texto, tipoDeteccao });
    
    const patterns = this.aprendizagem.patterns[tipoDeteccao] || [];
    
    for (const pattern of patterns.sort((a, b) => b.confianca - a.confianca)) {
      if (this.patternSeAplica(texto, pattern.entrada)) {
        console.log('✅ Padrão aplicado:', pattern);
        
        // Incrementar uso e confiança
        pattern.usos++;
        pattern.confianca = Math.min(pattern.confianca + 0.1, 2.0);
        
        return pattern.saida;
      }
    }
    
    return null; // Nenhum padrão aplicável encontrado
  }

  patternSeAplica(texto, patternEntrada) {
    const similaridade = this.calcularSimilaridade(texto.toLowerCase(), patternEntrada.toLowerCase());
    return similaridade > 0.8; // 80% de similaridade mínima
  }

  aprenderCategoria(feedback) {
    const { textoOriginal, categoriaOriginal, categoriaCorreta } = feedback;
    
    // Extrair palavras-chave do texto que indicam a categoria correta
    const palavrasChave = this.extrairPalavrasChave(textoOriginal);
    
    // Atualizar sinônimos de categoria
    if (!this.sinonimosCategoria[categoriaCorreta]) {
      this.sinonimosCategoria[categoriaCorreta] = [];
    }
    
    palavrasChave.forEach(palavra => {
      if (!this.sinonimosCategoria[categoriaCorreta].includes(palavra)) {
        this.sinonimosCategoria[categoriaCorreta].push(palavra);
        console.log(`🧠 Novo sinônimo aprendido: "${palavra}" → ${categoriaCorreta}`);
      }
    });
  }

  aprenderValor(feedback) {
    const { textoOriginal, valorOriginal, valorCorrigido } = feedback;
    
    // Analisar padrões de linguagem que resultaram em valor incorreto
    const contexto = this.extrairContextoNumero(textoOriginal, valorOriginal);
    
    this.registrarPadraoNumerico(contexto, valorCorrigido);
  }

  registrarPadraoNumerico(contexto, valorCorreto) {
    if (!this.aprendizagem.melhorias.numeros) {
      this.aprendizagem.melhorias.numeros = [];
    }
    
    this.aprendizagem.melhorias.numeros.push({
      contexto: contexto,
      valor: valorCorreto,
      timestamp: Date.now()
    });
  }

  extrairPalavrasChave(texto) {
    // Extrair substantivos e palavras relevantes
    const palavrasRelevantes = texto.toLowerCase()
      .replace(/[^\w\sáéíóúâêîôûàèìòùãõç]/g, '')
      .split(/\s+/)
      .filter(palavra => palavra.length > 2)
      .filter(palavra => !this.ehPalavraComum(palavra));
    
    return [...new Set(palavrasRelevantes)]; // Remover duplicatas
  }

  ehPalavraComum(palavra) {
    const palavrasComuns = [
      'que', 'para', 'com', 'uma', 'mais', 'foi', 'como', 'tem', 'são',
      'pelo', 'pela', 'suas', 'seus', 'esse', 'essa', 'isso', 'muito',
      'fazer', 'ter', 'ser', 'estar', 'dar', 'ver', 'usar', 'criar'
    ];
    
    return palavrasComuns.includes(palavra);
  }

  extrairContextoNumero(texto, numero) {
    // Extrair palavras antes e depois do número
    const regex = new RegExp(`(.{0,20})(${numero})(.{0,20})`, 'i');
    const match = texto.match(regex);
    
    if (match) {
      return {
        antes: match[1].trim(),
        numero: match[2],
        depois: match[3].trim()
      };
    }
    
    return { texto: texto, numero: numero };
  }

  extrairContextoCategoria(texto, categoria) {
    // Similar ao contexto de número, mas para categorias
    const regex = new RegExp(`(.{0,30})(${categoria})(.{0,30})`, 'i');
    const match = texto.match(regex);
    
    if (match) {
      return {
        antes: match[1].trim(),
        categoria: match[2],
        depois: match[3].trim()
      };
    }
    
    return { texto: texto, categoria: categoria };
  }

  // ===== MÉTODOS DE PERSISTÊNCIA =====

  carregarHistoricoAprendizagem() {
    try {
      const historico = localStorage.getItem('voiceSystem_historico');
      return historico ? JSON.parse(historico) : [];
    } catch (error) {
      console.warn('⚠️ Erro ao carregar histórico:', error);
      return [];
    }
  }

  carregarPatternsAprendidos() {
    try {
      const patterns = localStorage.getItem('voiceSystem_patterns');
      return patterns ? JSON.parse(patterns) : {};
    } catch (error) {
      console.warn('⚠️ Erro ao carregar patterns:', error);
      return {};
    }
  }

  carregarMelhorias() {
    try {
      const melhorias = localStorage.getItem('voiceSystem_melhorias');
      return melhorias ? JSON.parse(melhorias) : {};
    } catch (error) {
      console.warn('⚠️ Erro ao carregar melhorias:', error);
      return {};
    }
  }

  carregarEstatisticas() {
    try {
      const stats = localStorage.getItem('voiceSystem_stats');
      return stats ? JSON.parse(stats) : {
        comandosProcessados: 0,
        sucessos: 0,
        correcoes: 0,
        ultimaAtualizacao: Date.now()
      };
    } catch (error) {
      console.warn('⚠️ Erro ao carregar estatísticas:', error);
      return {
        comandosProcessados: 0,
        sucessos: 0,
        correcoes: 0,
        ultimaAtualizacao: Date.now()
      };
    }
  }

  salvarDadosAprendizagem() {
    try {
      localStorage.setItem('voiceSystem_historico', JSON.stringify(this.aprendizagem.historico));
      localStorage.setItem('voiceSystem_patterns', JSON.stringify(this.aprendizagem.patterns));
      localStorage.setItem('voiceSystem_melhorias', JSON.stringify(this.aprendizagem.melhorias));
      localStorage.setItem('voiceSystem_stats', JSON.stringify(this.aprendizagem.estatisticas));
      
      console.log('💾 Dados de aprendizagem salvos');
    } catch (error) {
      console.error('❌ Erro ao salvar dados de aprendizagem:', error);
    }
  }

  // ===== MÉTODOS DE ANÁLISE E RELATÓRIOS =====

  gerarRelatorioAprendizagem() {
    const relatorio = {
      resumo: {
        totalComandos: this.aprendizagem.estatisticas.comandosProcessados,
        taxaSucesso: this.calcularTaxaSucesso(),
        totalCorrecoes: this.aprendizagem.estatisticas.correcoes,
        patternsAprendidos: Object.keys(this.aprendizagem.patterns).length
      },
      melhoriasPorTipo: this.analisarMelhoriasPorTipo(),
      categoriasMaisCorrigidas: this.analisarCategoriasMaisCorrigidas(),
      padroesAprendidos: this.listarPadroesAprendidos(),
      recomendacoes: this.gerarRecomendacoes()
    };

    console.log('📊 Relatório de Aprendizagem:', relatorio);
    return relatorio;
  }

  calcularTaxaSucesso() {
    const total = this.aprendizagem.estatisticas.comandosProcessados;
    const sucessos = this.aprendizagem.estatisticas.sucessos;
    return total > 0 ? (sucessos / total * 100).toFixed(1) : 0;
  }

  analisarMelhoriasPorTipo() {
    const tipos = {};
    
    this.aprendizagem.feedbacks.forEach(feedback => {
      if (!tipos[feedback.tipo]) {
        tipos[feedback.tipo] = 0;
      }
      tipos[feedback.tipo]++;
    });
    
    return tipos;
  }

  analisarCategoriasMaisCorrigidas() {
    const categorias = {};
    
    this.aprendizagem.feedbacks
      .filter(f => f.tipo === 'correcao' && f.tipoCampo === 'categoria')
      .forEach(feedback => {
        const cat = feedback.valorCorrigido;
        if (!categorias[cat]) {
          categorias[cat] = 0;
        }
        categorias[cat]++;
      });
    
    return Object.entries(categorias)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);
  }

  listarPadroesAprendidos() {
    const patterns = [];
    
    Object.entries(this.aprendizagem.patterns).forEach(([tipo, lista]) => {
      lista.forEach(pattern => {
        patterns.push({
          tipo: tipo,
          confianca: pattern.confianca,
          usos: pattern.usos,
          entrada: pattern.entrada,
          saida: pattern.saida
        });
      });
    });
    
    return patterns.sort((a, b) => b.confianca - a.confianca).slice(0, 10);
  }

  gerarRecomendacoes() {
    const recomendacoes = [];
    
    // Recomendar baseado em padrões de erro
    const errosFrequentes = this.analisarErrosFrequentes();
    
    if (errosFrequentes.numeros > 5) {
      recomendacoes.push('Considere falar números de forma mais clara e pausada');
    }
    
    if (errosFrequentes.categorias > 3) {
      recomendacoes.push('Use nomes completos de categorias para melhor reconhecimento');
    }
    
    if (this.calcularTaxaSucesso() < 70) {
      recomendacoes.push('Sistema ainda está aprendendo seus padrões de fala');
    }
    
    return recomendacoes;
  }

  analisarErrosFrequentes() {
    const erros = { numeros: 0, categorias: 0, texto: 0 };
    
    this.aprendizagem.feedbacks.forEach(feedback => {
      if (feedback.tipoCampo === 'number' || feedback.tipoCampo === 'valor') {
        erros.numeros++;
      } else if (feedback.tipoCampo === 'select' || feedback.tipoCampo === 'categoria') {
        erros.categorias++;
      } else {
        erros.texto++;
      }
    });
    
    return erros;
  }

  // ===== MÉTODOS UTILITÁRIOS =====

  ehNumero(valor) {
    return !isNaN(parseFloat(valor)) && isFinite(valor);
  }

  ehCategoria(valorOriginal, valorCorrigido) {
    // Verificar se ambos valores são strings não-numéricas
    return isNaN(valorOriginal) && isNaN(valorCorrigido) && 
           typeof valorOriginal === 'string' && typeof valorCorrigido === 'string';
  }

  registrarSucessoComando(formulario) {
    this.aprendizagem.estatisticas.sucessos++;
    this.aprendizagem.estatisticas.comandosProcessados++;
    this.aprendizagem.estatisticas.ultimaAtualizacao = Date.now();
    
    // Salvar progresso
    this.salvarDadosAprendizagem();
  }

  registrarFalhaComando() {
    this.aprendizagem.estatisticas.comandosProcessados++;
    this.aprendizagem.estatisticas.ultimaAtualizacao = Date.now();
  }

  limparDadosAprendizagem() {
    console.log('🗑️ Limpando dados de aprendizagem...');
    
    localStorage.removeItem('voiceSystem_historico');
    localStorage.removeItem('voiceSystem_patterns');
    localStorage.removeItem('voiceSystem_melhorias');
    localStorage.removeItem('voiceSystem_stats');
    
    this.inicializarSistemaAprendizagem();
    
    console.log('✅ Dados de aprendizagem limpos e reinicializados');
  }

}

// ===== EXPORT =====
export { VoiceSystem };

// ===== AUTO-INICIALIZAÇÃO PARA TESTES =====
// Inicializar o sistema automaticamente quando o módulo é carregado
if (typeof window !== 'undefined' && !window.voiceSystem) {
  console.log('🔧 Auto-inicializando VoiceSystem para testes...');
  window.voiceSystem = new VoiceSystem();
  console.log('✅ VoiceSystem inicializado automaticamente:', window.voiceSystem);
}

// ===== FUNÇÕES GLOBAIS =====
let voiceSystem = null;

// Função global para abrir modal de voz
window.openVoiceModal = function(type = 'transaction') {
  console.log('🎤 openVoiceModal chamado:', type);

  if (!voiceSystem) {
    voiceSystem = new VoiceSystem();
  }

  return voiceSystem.start(type);
};

// Função global para fechar modal de voz
window.closeVoiceModal = async function() {
  console.log('🎤 closeVoiceModal chamado');

  if (voiceSystem) {
    // Parar todo reconhecimento primeiro
    await voiceSystem.stopAllRecognition();
    // Depois fechar o modal
    voiceSystem.stop();
  }
};

// Função global para iniciar reconhecimento de voz
window.startVoiceRecognition = function(type = 'transaction') {
  console.log('🎤 startVoiceRecognition chamado:', type);

  if (!voiceSystem) {
    voiceSystem = new VoiceSystem();
  }

  return voiceSystem.start(type);
};

// Função global para reiniciar reconhecimento
window.restartVoiceRecognition = function() {
  console.log('🔄 restartVoiceRecognition chamado');

  if (voiceSystem) {
    voiceSystem.restartRecognition();
  }
};

// ===== SISTEMA DE DEBUG =====
if (typeof window !== 'undefined') {
  window.debugVoiceSystem = {
    // Testar parse de comando
    testParse: (texto) => {
      console.log('🧪 ===== TESTE DE PARSE =====');
      console.log('🧪 Texto:', `"${texto}"`);
      
      const vs = window.voiceSystem;
      if (!vs) {
        console.error('❌ VoiceSystem não encontrado');
        return null;
      }
      
      const resultado = vs.parseTransactionCommand(texto);
      console.log('🧪 ===== RESULTADO =====');
      console.table(resultado);
      return resultado;
    },
    
    // Simular entrada de voz completa
    simulate: (texto) => {
      console.log('🎭 ===== SIMULAÇÃO DE VOZ =====');
      console.log('🎭 Texto:', `"${texto}"`);
      
      const vs = window.voiceSystem;
      if (!vs) {
        console.error('❌ VoiceSystem não encontrado');
        return null;
      }
      
      const normalizedText = vs.normalizeText(texto);
      const commandType = vs.determineCommandType(normalizedText);
      
      console.log('🎭 Tipo detectado:', commandType);
      
      if (commandType === 'transaction') {
        const resultado = vs.parseTransactionCommand(texto);
        console.log('🎭 Resultado:', resultado);
        return resultado;
      }
      
      return null;
    },
    
    // Testar apenas normalização
    testNormalize: (texto) => {
      console.log('📝 Original:', `"${texto}"`);
      const vs = window.voiceSystem;
      if (!vs) {
        console.error('❌ VoiceSystem não encontrado');
        return null;
      }
      const normalizado = vs.normalizeText(texto);
      console.log('📝 Normalizado:', `"${normalizado}"`);
      return normalizado;
    },
    
    // Testar abertura de modais
    testModalOpen: (tipo, texto) => {
      console.log('🎭 ===== TESTE DE ABERTURA DE MODAL =====');
      console.log('🎭 Tipo:', tipo, 'Texto:', texto);
      
      const vs = window.voiceSystem;
      if (!vs) {
        console.error('❌ VoiceSystem não encontrado');
        return null;
      }
      
      if (tipo === 'transacao' && window.showAddTransactionModal) {
        const resultado = vs.parseTransactionCommand(texto);
        console.log('🎭 Dados:', resultado);
        window.showAddTransactionModal();
        setTimeout(() => vs.preenchearCamposTransacao(resultado), 1000);
      } else if (tipo === 'categoria' && window.showAddCategoryModal) {
        const resultado = vs.parseCategoryCommand(texto);
        console.log('🎭 Dados:', resultado);
        window.showAddCategoryModal();
        setTimeout(() => vs.preenchearCamposCategoria(resultado), 1000);
      }
    },
    
    // Inspecionar campos disponíveis no modal
    inspectModal: () => {
      console.log('🔍 ===== INSPEÇÃO DE CAMPOS DO MODAL =====');
      
      const allInputs = Array.from(document.querySelectorAll('input, select, textarea'));
      console.log('🔍 Total de campos encontrados:', allInputs.length);
      
      allInputs.forEach((field, index) => {
        console.log(`Campo ${index + 1}:`, {
          tagName: field.tagName,
          type: field.type || 'N/A',
          name: field.name || 'sem name',
          id: field.id || 'sem id',
          placeholder: field.placeholder || 'sem placeholder',
          className: field.className || 'sem classe',
          value: field.value || 'vazio'
        });
      });
      
      return allInputs;
    },
    
    // Testar preenchimento direto
    testFill: (dados) => {
      console.log('🧪 ===== TESTE DE PREENCHIMENTO DIRETO =====');
      console.log('🧪 Dados:', dados);
      
      const vs = window.voiceSystem;
      if (!vs) {
        console.error('❌ VoiceSystem não encontrado');
        return null;
      }
      
      if (dados.tipo === 'transacao') {
        vs.preenchearCamposTransacao(dados);
      } else if (dados.tipo === 'categoria') {
        vs.preenchearCamposCategoria(dados);
      }
    },
    
    // Teste de reconhecimento completo
    testReconhecimento: () => {
      console.log('🧪 ===== TESTE COMPLETO DE RECONHECIMENTO =====');
      
      const vs = window.voiceSystem;
      if (!vs) {
        console.error('❌ VoiceSystem não encontrado');
        return null;
      }
      
      const testeCasos = [
        // TESTES DE TRANSAÇÃO (4+ itens)
        { texto: 'gastei 100 reais com supermercado despesa', esperado: 'transaction' },
        { texto: 'comprei 200 reais de roupas despesa', esperado: 'transaction' },
        { texto: 'recebi 1500 salario receita trabalho', esperado: 'transaction' },
        { texto: 'paguei 50 farmacia saude despesa', esperado: 'transaction' },
        { texto: '150 reais supermercado alimentacao despesa', esperado: 'transaction' },
        
        // TESTES DE CATEGORIA (3 itens)
        { texto: 'nova categoria alimentacao despesa', esperado: 'category' },
        { texto: 'criar categoria transporte despesa', esperado: 'category' },
        { texto: 'categoria saude receita', esperado: 'category' },
        { texto: 'lazer categoria despesa', esperado: 'category' },
        { texto: 'educacao despesa categoria', esperado: 'category' },
        
        // CASOS LIMÍTROFES
        { texto: 'alimentacao despesa 100', esperado: 'transaction' }, // 3 itens mas com valor = transação
        { texto: 'categoria casa', esperado: 'category' }, // 2 itens com "categoria" = categoria  
        { texto: 'nova categoria', esperado: 'category' }, // 2 itens com "nova categoria" = categoria
      ];
      
      console.log('🧪 Testando', testeCasos.length, 'casos...\n');
      
      testeCasos.forEach((caso, index) => {
        console.log(`\n🎯 TESTE ${index + 1}: "${caso.texto}"`);
        console.log(`🎯 Esperado: ${caso.esperado.toUpperCase()}`);
        
        const tipoDetectado = vs.determineCommandType(caso.texto);
        const acertou = tipoDetectado === caso.esperado;
        
        console.log(`🎯 Detectado: ${tipoDetectado.toUpperCase()}`);
        console.log(`🎯 Resultado: ${acertou ? '✅ CORRETO' : '❌ INCORRETO'}`);
      });
      
      return 'Teste de reconhecimento concluído!';
    },
    
    // Teste específico da regra 3 vs 4 itens
    testRegra3vs4: () => {
      console.log('🧪 ===== TESTE REGRA 3 vs 4 ITENS =====');
      
      const vs = window.voiceSystem;
      if (!vs) {
        console.error('❌ VoiceSystem não encontrado');
        return null;
      }
      
      const casos = [
        // DEVE SER CATEGORIA (3 itens)
        { texto: 'categoria alimentacao despesa', esperado: 'category', itens: 3 },
        { texto: 'criar lazer receita', esperado: 'category', itens: 3 },
        { texto: 'nova transporte despesa', esperado: 'category', itens: 3 },
        
        // DEVE SER TRANSAÇÃO (4+ itens)
        { texto: 'gastei 100 reais supermercado despesa', esperado: 'transaction', itens: 5 },
        { texto: 'comprei 50 farmacia saude despesa', esperado: 'transaction', itens: 5 },
        { texto: '200 reais roupas alimentacao despesa', esperado: 'transaction', itens: 5 }
      ];
      
      console.log('🧪 Testando regra fundamental...\n');
      
      casos.forEach((caso, index) => {
        console.log(`🎯 TESTE ${index + 1}: "${caso.texto}"`);
        
        // Extrair itens
        const items = vs.extractCommandItems(caso.texto);
        console.log(`   📊 Itens encontrados: ${items.length}`);
        console.log(`   📝 Itens detalhados:`, items.map(i => `${i.type}=${i.value}`));
        
        // Detectar tipo  
        const tipoDetectado = vs.determineCommandType(caso.texto);
        const acertou = tipoDetectado === caso.esperado;
        
        console.log(`   🎯 Esperado: ${caso.esperado.toUpperCase()}`);
        console.log(`   🎯 Detectado: ${tipoDetectado.toUpperCase()}`);
        console.log(`   🎯 Resultado: ${acertou ? '✅ CORRETO' : '❌ INCORRETO'}`);
        
        if (!acertou) {
          console.log(`   ⚠️ FALHA: ${items.length} itens deveria resultar em ${caso.esperado}`);
          console.log(`   🔍 Execute: window.debugVoiceSystem.simulate("${caso.texto}") para debug completo`);
        }
        console.log('');
      });
      
      return 'Teste da regra 3 vs 4 itens concluído!';
    },

    // Teste específico de contagem de itens
    testItemCount: (texto) => {
      console.log('🔢 ===== TESTE DE CONTAGEM DE ITENS =====');
      console.log('🔢 Texto:', texto);
      
      const items = window.voiceSystem.extractItems(texto);
      console.log('🔢 Total de itens extraídos:', items.length);
      
      const tipos = items.filter(item => item.type === 'tipo');
      const valores = items.filter(item => item.type === 'valor');
      const categorias = items.filter(item => item.type === 'categoria');
      const descricoes = items.filter(item => item.type === 'descricao');
      const comandos = items.filter(item => item.type === 'comando');
      
      console.log('🔢 Breakdown por tipo:');
      console.log(`  - Tipos: ${tipos.length}`, tipos.map(t => t.value));
      console.log(`  - Valores: ${valores.length}`, valores.map(t => t.value));
      console.log(`  - Categorias: ${categorias.length}`, categorias.map(t => t.value));
      console.log(`  - Descrições: ${descricoes.length}`, descricoes.map(t => t.value));
      console.log(`  - Comandos: ${comandos.length}`, comandos.map(t => t.value));
      
      const comandoDetectado = window.voiceSystem.detectCommandType(texto);
      console.log('🔢 Comando detectado:', comandoDetectado);
      console.log('🔢 =====================================');
      
      return {
        total: items.length,
        breakdown: { tipos, valores, categorias, descricoes, comandos },
        comando: comandoDetectado
      };
    },

    // Método para mostrar ajuda
    ajuda: () => {
      console.log('🛠️ ===== MÉTODOS DE DEBUG DISPONÍVEIS =====');
      console.log('📝 Parse e simulação:');
      console.log('   window.debugVoiceSystem.testParse("texto")');
      console.log('   window.debugVoiceSystem.simulate("texto")');
      console.log('   window.debugVoiceSystem.testNormalize("texto")');
      console.log('   window.debugVoiceSystem.testItemCount("texto") // 🆕 NOVO');
      console.log('');
      console.log('🎭 Teste de modais:');
      console.log('   window.debugVoiceSystem.testModalOpen("transacao", "gastei 20 reais")');
      console.log('   window.debugVoiceSystem.testModalOpen("categoria", "categoria alimentação")');
      console.log('');
      console.log('🔍 Depuração de campos:');
      console.log('   window.debugVoiceSystem.inspectModal()');
      console.log('   window.debugVoiceSystem.testFill({tipo: "transacao", valor: 25})');
      console.log('');
      console.log('🎯 Testes específicos:');
      console.log('   window.debugVoiceSystem.testReconhecimento() // Teste completo');
      console.log('   window.debugVoiceSystem.testRegra3vs4() // Teste regra 3 vs 4 itens');
      console.log('🛠️ =========================================');
    }
  };
  
  // Mostrar ajuda automaticamente na primeira carga
  console.log('🔧 Sistema de debug do VoiceSystem carregado!');
  window.debugVoiceSystem.ajuda();
}
    
