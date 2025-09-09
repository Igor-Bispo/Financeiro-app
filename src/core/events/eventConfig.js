// ConfiguraÃ§Ã£o centralizada de eventos da aplicaÃ§Ã£o
import { eventBus } from './eventBus.js';
import { logger } from '@core/logger/logger.js';
import * as globalUtils from '@core/utils/globalUtils.js';
import { Modal } from '@js/ui/Modal.js';

// Configurar todos os listeners de eventos
export function setupEventListeners() {
  logger.info('Configurando listeners de eventos...');

  // Eventos de notificaÃ§Ã£o
  eventBus.on('notification:show', ({ message, type }) => {
    // Implementar sistema de notificaÃ§Ãµes
    logger.info(`NotificaÃ§Ã£o [${type}]: ${message}`);
  });

  // Eventos de modal
  eventBus.on('modal:show', async (payload = {}) => {
    try {
      const { content, options = {}, title, type, data } = payload;
      const logHint = title || type || (content ? '[conteÃºdo HTML]' : 'sem conteÃºdo');
      logger.info('Modal solicitado:', logHint);

      // Se veio conteÃºdo HTML, renderiza diretamente
      if (content) {
        const modal = Modal({
          title: options.title || title || 'InformaÃ§Ã£o',
          content,
          onClose: () => modal.remove()
        });
        document.body.appendChild(modal);
        return;
      }

      // Sem conteÃºdo: encaminhar por tipo conhecido
      if (type === 'transaction') {
        // Carrega o modal moderno de transaÃ§Ã£o sob demanda
        await import('@js/showAddTransactionModal.js');
        if (typeof window.showAddTransactionModal === 'function') {
          window.showAddTransactionModal(data || {});
          return;
        }
      }

      if (type === 'category') {
        // Carrega o modal moderno de categoria sob demanda
        await import('@js/showAddCategoryModal.js');
        if (typeof window.showAddCategoryModal === 'function') {
          window.showAddCategoryModal(data || {});
          return;
        }
      }

      if (type === 'recorrente') {
        // Carrega o modal moderno de recorrente sob demanda
        await import('@js/showAddRecorrenteModal.js');
        if (typeof window.showAddRecorrenteModal === 'function') {
          window.showAddRecorrenteModal(data || {});
          return;
        }
      }

      // Fallback mÃ­nimo
      globalUtils.showSnackbar('NÃ£o foi possÃ­vel abrir o modal solicitado', 'error');
    } catch (err) {
      logger.error('Falha ao processar modal:show', err);
      globalUtils.showSnackbar('Erro ao abrir modal', 'error');
    }
  });

  eventBus.on('modal:hide', () => {
    // Esconder modal
    logger.info('Modal escondido');
  });

  // Eventos de snackbar
  eventBus.on('snackbar:show', ({ message, type }) => {
    // Implementar sistema de snackbar
    logger.info(`Snackbar [${type}]: ${message}`);
  });

  // Eventos de transaÃ§Ãµes
  eventBus.on('transaction:added', (transaction) => {
    logger.info('TransaÃ§Ã£o adicionada:', transaction.id);
    globalUtils.showSnackbar('TransaÃ§Ã£o adicionada com sucesso', 'success');
  });

  eventBus.on('transaction:updated', ({ id }) => {
    logger.info('TransaÃ§Ã£o atualizada:', id);
    globalUtils.showSnackbar('TransaÃ§Ã£o atualizada com sucesso', 'success');
  });

  eventBus.on('transaction:deleted', ({ id }) => {
    logger.info('TransaÃ§Ã£o removida:', id);
    globalUtils.showSnackbar('TransaÃ§Ã£o removida com sucesso', 'success');
  });

  // Eventos de orÃ§amentos
  eventBus.on('budget:created', (budget) => {
    logger.info('OrÃ§amento criado:', budget.id);
    globalUtils.showSnackbar('OrÃ§amento criado com sucesso', 'success');
  });

  eventBus.on('budget:updated', ({ id }) => {
    logger.info('OrÃ§amento atualizado:', id);
    globalUtils.showSnackbar('OrÃ§amento atualizado com sucesso', 'success');
  });

  eventBus.on('budget:deleted', ({ id }) => {
    logger.info('OrÃ§amento removido:', id);
    globalUtils.showSnackbar('OrÃ§amento removido com sucesso', 'success');
  });

  // Eventos de categorias
  eventBus.on('category:created', (category) => {
    try {
      const id = typeof category === 'string' ? category : category?.id;
      logger.info('Categoria criada:', id || '[sem id]');
    } catch {
      logger.warn('Evento category:created com payload inesperado:', category);
    }
    globalUtils.showSnackbar('Categoria criada com sucesso', 'success');
  });

  eventBus.on('category:updated', ({ id }) => {
    logger.info('Categoria atualizada:', id);
    globalUtils.showSnackbar('Categoria atualizada com sucesso', 'success');
  });

  eventBus.on('category:deleted', ({ id }) => {
    logger.info('Categoria removida:', id);
    globalUtils.showSnackbar('Categoria removida com sucesso', 'success');
  });

  // Eventos de recorrentes
  eventBus.on('transaction:recurring:applied', (transaction) => {
    logger.info('Recorrente aplicada:', transaction.id);
    globalUtils.showSnackbar('Despesa recorrente aplicada', 'info');
  });

  // Eventos de erro
  eventBus.on('error:transaction', (error) => {
    logger.error('Erro em transaÃ§Ã£o:', error);
    globalUtils.showSnackbar('Erro ao processar transaÃ§Ã£o', 'error');
  });

  eventBus.on('error:budget', (error) => {
    logger.error('Erro em orÃ§amento:', error);
    globalUtils.showSnackbar('Erro ao processar orÃ§amento', 'error');
  });

  eventBus.on('error:category', (error) => {
    logger.error('Erro em categoria:', error);
    globalUtils.showSnackbar('Erro ao processar categoria', 'error');
  });

  // Eventos de autenticaÃ§Ã£o
  eventBus.on('auth:login', (user) => {
    logger.info('UsuÃ¡rio logado:', user.uid);
    globalUtils.showSnackbar('Login realizado com sucesso', 'success');
  });

  eventBus.on('auth:logout', () => {
    logger.info('UsuÃ¡rio deslogado');
    globalUtils.showSnackbar('Logout realizado', 'info');
  });

  eventBus.on('auth:error', (error) => {
    logger.error('Erro de autenticaÃ§Ã£o:', error);
    globalUtils.showSnackbar('Erro de autenticaÃ§Ã£o', 'error');
  });

  // Eventos de aplicaÃ§Ã£o
  eventBus.on('app:ready', (appState) => {
    logger.info('AplicaÃ§Ã£o pronta:', appState);
    globalUtils.showSnackbar('AplicaÃ§Ã£o carregada', 'success');
  });

  eventBus.on('app:error', (error) => {
    logger.error('Erro na aplicaÃ§Ã£o:', error);
    globalUtils.showSnackbar('Erro ao carregar aplicaÃ§Ã£o', 'error');
  });

  logger.info('Listeners de eventos configurados');
}

// Limpar todos os listeners
export function cleanupEventListeners() {
  logger.info('Limpando listeners de eventos...');

  // Limpar todos os eventos registrados
  eventBus.off('notification:show');
  eventBus.off('modal:show');
  eventBus.off('modal:hide');
  eventBus.off('snackbar:show');
  eventBus.off('transaction:added');
  eventBus.off('transaction:updated');
  eventBus.off('transaction:deleted');
  eventBus.off('budget:created');
  eventBus.off('budget:updated');
  eventBus.off('budget:deleted');
  eventBus.off('category:created');
  eventBus.off('category:updated');
  eventBus.off('category:deleted');
  eventBus.off('transaction:recurring:applied');
  eventBus.off('error:transaction');
  eventBus.off('error:budget');
  eventBus.off('error:category');
  eventBus.off('auth:login');
  eventBus.off('auth:logout');
  eventBus.off('auth:error');
  eventBus.off('app:ready');
  eventBus.off('app:error');

  logger.info('Listeners de eventos limpos');
}
