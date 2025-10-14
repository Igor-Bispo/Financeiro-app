/**
 * Sistema de gerenciamento de conectividade e resilência de rede
 */
class NetworkHandler {
  constructor() {
    this.retryAttempts = 3;
    this.retryDelay = 2000;
    this.isOnline = navigator.onLine;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.setupNetworkListeners();
    console.log('🌐 [NetworkHandler] Inicializado');
  }

  setupNetworkListeners() {
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.reconnectAttempts = 0;
      console.log('🌐 [NetworkHandler] Conexão restaurada');
      this.handleReconnection();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      console.log('🚫 [NetworkHandler] Conexão perdida');
      this.handleOffline();
    });

    // Verificar conectividade periodicamente
    setInterval(() => this.checkConnectivity(), 30000);
  }

  async checkConnectivity() {
    if (!this.isOnline) return;

    try {
      await fetch('https://www.google.com/favicon.ico', {
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-cache'
      });
      
      if (!this.isOnline) {
        this.isOnline = true;
        this.handleReconnection();
      }
    } catch {
      if (this.isOnline) {
        this.isOnline = false;
        this.handleOffline();
      }
    }
  }

  async retryOperation(operation, context = 'operação') {
    for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
      try {
        console.log(`🔄 [NetworkHandler] Tentativa ${attempt}/${this.retryAttempts} para ${context}`);
        const result = await operation();
        console.log(`✅ [NetworkHandler] ${context} bem-sucedida na tentativa ${attempt}`);
        return result;
      } catch (error) {
        console.warn(`⚠️ [NetworkHandler] Tentativa ${attempt} falhou:`, error.message);
        
        // Se é erro de rede, aguardar mais tempo
        if (this.isNetworkError(error)) {
          await this.delay(this.retryDelay * attempt * 2);
        } else {
          await this.delay(this.retryDelay * attempt);
        }
        
        if (attempt === this.retryAttempts) {
          console.error(`❌ [NetworkHandler] ${context} falhou após ${this.retryAttempts} tentativas`);
          throw new Error(`Falha na ${context} após múltiplas tentativas: ${error.message}`);
        }
      }
    }
  }

  isNetworkError(error) {
    const networkErrors = [
      'network-request-failed',
      'ERR_NETWORK',
      'ERR_INTERNET_DISCONNECTED',
      'ERR_ABORTED',
      'Failed to fetch'
    ];
    
    return networkErrors.some(errorType =>
      error.message?.includes(errorType) ||
      error.code?.includes(errorType)
    );
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  handleReconnection() {
    console.log('🔄 [NetworkHandler] Iniciando processo de reconexão...');
    
    // Emitir evento de reconexão
    if (window.eventBus) {
      window.eventBus.emit('network:reconnected');
    }

    // Mostrar notificação de reconexão
    if (window.Snackbar) {
      window.Snackbar({
        message: '✅ Conexão restaurada',
        type: 'success',
        duration: 3000
      });
    }

    // Tentar reconectar Firebase listeners
    this.reconnectFirebaseListeners();
  }

  handleOffline() {
    console.log('🚫 [NetworkHandler] Aplicação offline');
    
    // Emitir evento offline
    if (window.eventBus) {
      window.eventBus.emit('network:offline');
    }

    // Mostrar notificação offline
    if (window.Snackbar) {
      window.Snackbar({
        message: '🚫 Sem conexão. Trabalhando offline.',
        type: 'warning',
        duration: 5000
      });
    }
  }

  reconnectFirebaseListeners() {
    if (window.eventBus) {
      window.eventBus.emit('firebase:reconnect-listeners');
    }
  }

  // Verificar se uma operação pode ser executada
  canExecuteOperation() {
    return this.isOnline;
  }

  // Aguardar conexão
  async waitForConnection(timeout = 10000) {
    if (this.isOnline) return true;

    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error('Timeout aguardando conexão'));
      }, timeout);

      const checkConnection = () => {
        if (this.isOnline) {
          clearTimeout(timeoutId);
          resolve(true);
        } else {
          setTimeout(checkConnection, 500);
        }
      };

      checkConnection();
    });
  }
}

// Instância global
const networkHandler = new NetworkHandler();
window.NetworkHandler = networkHandler;
export default networkHandler;