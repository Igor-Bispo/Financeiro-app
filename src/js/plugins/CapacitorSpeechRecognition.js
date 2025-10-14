/**
 * 🎤 CAPACITOR SPEECH RECOGNITION PLUGIN
 * Plugin nativo para reconhecimento de voz no Android quando Web Speech API não funciona
 */

class CapacitorSpeechRecognition {
  constructor() {
    this.isListening = false;
    this.isAvailable = false;
    this.listeners = new Map();
    
    this.init();
  }

  async init() {
    console.log('🎤 [CapacitorSpeech] Inicializando plugin nativo...');
    
    try {
      if (!window.Capacitor || !window.Capacitor.Plugins) {
        console.log('⚠️ [CapacitorSpeech] Capacitor não disponível');
        return;
      }

      const { SpeechRecognitionPlugin } = window.Capacitor.Plugins;
      
      if (!SpeechRecognitionPlugin) {
        console.log('⚠️ [CapacitorSpeech] Plugin não encontrado');
        return;
      }

      // Verificar se está disponível
      const result = await SpeechRecognitionPlugin.isAvailable();
      this.isAvailable = result.available;
      
      console.log(`🎤 [CapacitorSpeech] Plugin disponível: ${this.isAvailable}`);

      // Configurar listeners para eventos do plugin
      await SpeechRecognitionPlugin.addListener('speechRecognitionEvent', (event) => {
        console.log('🎤 [CapacitorSpeech] Evento recebido:', event);
        this.handleNativeEvent(event);
      });

    } catch (error) {
      console.error('❌ [CapacitorSpeech] Erro na inicialização:', error);
      this.isAvailable = false;
    }
  }

  handleNativeEvent(event) {
    const { event: type, text, error } = event;
    
    switch (type) {
      case 'ready':
        console.log('✅ [CapacitorSpeech] Pronto para escutar');
        this.isListening = true;
        this.triggerEvent('start');
        break;
        
      case 'start':
        console.log('🎤 [CapacitorSpeech] Início da captura de voz');
        this.triggerEvent('speechstart');
        break;
        
      case 'result':
        console.log('🎯 [CapacitorSpeech] Resultado:', text);
        this.isListening = false;
        this.triggerEvent('result', { results: [{ transcript: text, confidence: 1.0 }] });
        break;
        
      case 'partial':
        console.log('⚡ [CapacitorSpeech] Resultado parcial:', text);
        this.triggerEvent('result', { results: [{ transcript: text, confidence: 0.5 }] });
        break;
        
      case 'end':
        console.log('🏁 [CapacitorSpeech] Fim da captura');
        this.isListening = false;
        this.triggerEvent('end');
        break;
        
      case 'error':
        console.error('❌ [CapacitorSpeech] Erro:', error);
        this.isListening = false;
        this.triggerEvent('error', { error: error });
        break;
    }
  }

  async start() {
    if (!this.isAvailable) {
      throw new Error('Speech recognition not available');
    }

    if (this.isListening) {
      console.log('⚠️ [CapacitorSpeech] Já está escutando');
      return;
    }

    console.log('🚀 [CapacitorSpeech] Iniciando reconhecimento...');
    
    try {
      const { SpeechRecognitionPlugin } = window.Capacitor.Plugins;
      await SpeechRecognitionPlugin.startListening();
    } catch (error) {
      console.error('❌ [CapacitorSpeech] Erro ao iniciar:', error);
      throw error;
    }
  }

  async stop() {
    if (!this.isListening) {
      return;
    }

    console.log('🛑 [CapacitorSpeech] Parando reconhecimento...');
    
    try {
      const { SpeechRecognitionPlugin } = window.Capacitor.Plugins;
      await SpeechRecognitionPlugin.stopListening();
      this.isListening = false;
    } catch (error) {
      console.error('❌ [CapacitorSpeech] Erro ao parar:', error);
    }
  }

  addEventListener(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }

  removeEventListener(event, callback) {
    if (this.listeners.has(event)) {
      const callbacks = this.listeners.get(event);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  triggerEvent(event, data = {}) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`❌ [CapacitorSpeech] Erro no callback ${event}:`, error);
        }
      });
    }
  }
}

// Criar instância global
let capacitorSpeechRecognition = null;

// Função para obter/criar instância
async function getCapacitorSpeechRecognition() {
  if (!capacitorSpeechRecognition) {
    capacitorSpeechRecognition = new CapacitorSpeechRecognition();
    await capacitorSpeechRecognition.init();
  }
  return capacitorSpeechRecognition;
}

// Exportar para o VoiceSystem
window.CapacitorSpeechRecognition = {
  getInstance: getCapacitorSpeechRecognition
};

export { CapacitorSpeechRecognition, getCapacitorSpeechRecognition };