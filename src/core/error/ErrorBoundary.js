// Error Boundary para capturar erros JavaScript
// Versão 1.0.0 - Tratamento robusto de erros

import { logger } from '../logger/logger.js';

export class ErrorBoundary {
  constructor() {
    this.errors = [];
    this.maxErrors = 10;
  }

  // Capturar erros JavaScript globais
  setupGlobalErrorHandlers() {
    // Erro JavaScript não capturado
    window.addEventListener('error', (event) => {
      this.handleError({
        type: 'javascript',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error,
        stack: event.error?.stack
      });
    });

    // Promise rejeitada não capturada
    window.addEventListener('unhandledrejection', (event) => {
      this.handleError({
        type: 'promise',
        message: event.reason?.message || 'Unhandled Promise Rejection',
        error: event.reason,
        stack: event.reason?.stack
      });
    });

    logger.info('Error boundary handlers configured');
  }

  // Tratar erro
  handleError(errorInfo) {
    // Adicionar timestamp
    errorInfo.timestamp = new Date().toISOString();
    errorInfo.userAgent = navigator.userAgent;
    errorInfo.url = window.location.href;

    // Log do erro
    logger.error('Error captured:', errorInfo);

    // Armazenar erro
    this.errors.push(errorInfo);
    if (this.errors.length > this.maxErrors) {
      this.errors.shift(); // Remover erro mais antigo
    }

    // Salvar no localStorage para análise posterior
    try {
      localStorage.setItem('app-errors', JSON.stringify(this.errors));
    } catch (e) {
      logger.warn('Could not save errors to localStorage:', e);
    }

    // Emitir evento para UI
    this.emitErrorEvent(errorInfo);

    // Prevenir comportamento padrão
    return false;
  }

  // Emitir evento de erro
  emitErrorEvent(errorInfo) {
    try {
      const event = new CustomEvent('app:error', {
        detail: errorInfo
      });
      window.dispatchEvent(event);
    } catch (e) {
      logger.warn('Could not emit error event:', e);
    }
  }

  // Obter erros armazenados
  getStoredErrors() {
    try {
      const stored = localStorage.getItem('app-errors');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      logger.warn('Could not retrieve stored errors:', e);
      return [];
    }
  }

  // Limpar erros armazenados
  clearStoredErrors() {
    try {
      localStorage.removeItem('app-errors');
      this.errors = [];
      logger.info('Stored errors cleared');
    } catch (e) {
      logger.warn('Could not clear stored errors:', e);
    }
  }

  // Verificar se há erros críticos
  hasCriticalErrors() {
    return this.errors.some(error => 
      error.type === 'javascript' && 
      error.message?.includes('Firebase') ||
      error.message?.includes('Authentication')
    );
  }
}

// Instância singleton
export const errorBoundary = new ErrorBoundary();

// Função helper para wrapping de funções com tratamento de erro
export function withErrorHandling(fn, context = 'unknown') {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      errorBoundary.handleError({
        type: 'function',
        context,
        message: error.message,
        error,
        stack: error.stack
      });
      throw error; // Re-throw para permitir tratamento específico
    }
  };
}

// Função helper para promises com tratamento de erro
export function safePromise(promise, context = 'unknown') {
  return promise.catch(error => {
    errorBoundary.handleError({
      type: 'promise',
      context,
      message: error.message,
      error,
      stack: error.stack
    });
    return null; // Retornar null em caso de erro
  });
}
