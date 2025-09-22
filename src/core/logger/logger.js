// Sistema de Logging Condicional
// Versão 2.0.0 - Logging inteligente baseado em ambiente

class Logger {
  constructor() {
    this.isDev = import.meta.env.DEV;
    this.isDebug = import.meta.env.VITE_DEBUG_MODE === 'true';
    this.enabled = this.isDev || this.isDebug;
    
    // Configurações por nível
    this.levels = {
      ERROR: 0,
      WARN: 1,
      INFO: 2,
      DEBUG: 3
    };
    
    this.currentLevel = this.isDev ? this.levels.DEBUG : this.levels.ERROR;
  }

  _shouldLog(level) {
    return this.enabled && level <= this.currentLevel;
  }

  _formatMessage(level, message, ...args) {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level}]`;
    return [prefix, message, ...args];
  }

  error(message, ...args) {
    if (this._shouldLog(this.levels.ERROR)) {
      console.error(...this._formatMessage('ERROR', message, ...args));
    }
  }

  warn(message, ...args) {
    if (this._shouldLog(this.levels.WARN)) {
      console.warn(...this._formatMessage('WARN', message, ...args));
    }
  }

  info(message, ...args) {
    if (this._shouldLog(this.levels.INFO)) {
      console.info(...this._formatMessage('INFO', message, ...args));
    }
  }

  debug(message, ...args) {
    if (this._shouldLog(this.levels.DEBUG)) {
      console.log(...this._formatMessage('DEBUG', message, ...args));
    }
  }

  // Métodos específicos para diferentes contextos
  auth(message, ...args) {
    this.debug(`[AUTH] ${message}`, ...args);
  }

  firebase(message, ...args) {
    this.debug(`[FIREBASE] ${message}`, ...args);
  }

  ui(message, ...args) {
    this.debug(`[UI] ${message}`, ...args);
  }

  performance(message, ...args) {
    this.debug(`[PERF] ${message}`, ...args);
  }

  // Método para logs críticos (sempre exibidos)
  critical(message, ...args) {
    console.error('🚨 CRITICAL:', message, ...args);
  }
}

// Instância singleton
export const logger = new Logger();

// Exportar também como default para compatibilidade
export default logger;