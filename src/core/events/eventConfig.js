// Configuração centralizada de eventos da aplicação
import { eventBus } from './eventBus.js';
import { logger } from '@core/logger/logger.js';
import * as globalUtils from '@core/utils/globalUtils.js';
import { Modal } from '@js/ui/Modal.js';

// Configurar todos os listeners de eventos
export function setupEventListeners() {
  logger.info('Configurando listeners de eventos...');

  // Eventos de notificação
  eventBus.on('notification:show', ({ message, type }) => {
    // Implementar sistema de notificações
    logger.info(`Notificação [${type}]: ${message}`);
  });

  // Eventos de modal
  eventBus.on('modal:show', async (payload = {}) => {
    try {
      const { content, options = {}, title, type, data } = payload;
      const logHint = title || type || (content ? '[conteúdo HTML]' : 'sem conteúdo');
      logger.info('Modal solicitado:', logHint);

      // Se veio conteúdo HTML, renderiza diretamente
      if (content) {
        const modal = Modal({
          title: options.title || title || 'Informação',
          content,
          onClose: () => modal.remove()
        });
        document.body.appendChild(modal);
        return;
      }

      // Sem conteúdo: encaminhar por tipo conhecido
      if (type === 'transaction') {
        // Verificar se a função já está disponível (carregada diretamente no entry.js)
        if (typeof window.showAddTransactionModal === 'function') {
          window.showAddTransactionModal(data || {});
          return;
        }

        // Fallback: tentar import dinâmico
        try {
          await import('@js/showAddTransactionModal.js');
          if (typeof window.showAddTransactionModal === 'function') {
            window.showAddTransactionModal(data || {});
            return;
          }
        } catch (importError) {
          console.warn('Falha ao importar modal de transação:', importError);
        }
      }

      if (type === 'category') {
        // Carrega o modal moderno de categoria sob demanda
        try {
          const { default: showAddCategoryModal } = await import('@js/showAddCategoryModal.js');
          // Definir a função global para evitar loops
          if (typeof window.showAddCategoryModal !== 'function') {
            window.showAddCategoryModal = showAddCategoryModal;
          }
          showAddCategoryModal(data || {});
          return;
        } catch (importError) {
          console.warn('Falha ao importar modal de categoria:', importError);
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

      // Fallback mínimo
      globalUtils.showSnackbar('Não foi possível abrir o modal solicitado', 'error');
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

  // Eventos de transações
  eventBus.on('transaction:added', (transaction) => {
    logger.info('Transação adicionada:', transaction.id);
    globalUtils.showSnackbar('Transação adicionada com sucesso', 'success');
  });

  eventBus.on('transaction:updated', ({ id }) => {
    logger.info('Transação atualizada:', id);
    globalUtils.showSnackbar('Transação atualizada com sucesso', 'success');
  });

  eventBus.on('transaction:deleted', ({ id }) => {
    logger.info('Transação removida:', id);
    globalUtils.showSnackbar('Transação removida com sucesso', 'success');
  });

  // Eventos de orçamentos
  eventBus.on('budget:created', (budget) => {
    logger.info('Orçamento criado:', budget.id);
    globalUtils.showSnackbar('Orçamento criado com sucesso', 'success');
  });

  eventBus.on('budget:updated', ({ id }) => {
    logger.info('Orçamento atualizado:', id);
    globalUtils.showSnackbar('Orçamento atualizado com sucesso', 'success');
  });

  eventBus.on('budget:deleted', ({ id }) => {
    logger.info('Orçamento removido:', id);
    globalUtils.showSnackbar('Orçamento removido com sucesso', 'success');
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
    logger.error('Erro em transação:', error);
    globalUtils.showSnackbar('Erro ao processar transação', 'error');
  });

  eventBus.on('error:budget', (error) => {
    logger.error('Erro em orçamento:', error);
    globalUtils.showSnackbar('Erro ao processar orçamento', 'error');
  });

  eventBus.on('error:category', (error) => {
    logger.error('Erro em categoria:', error);
    globalUtils.showSnackbar('Erro ao processar categoria', 'error');
  });

  // Eventos de autenticação
  eventBus.on('auth:login', (user) => {
    logger.info('Usuário logado:', user.uid);
    globalUtils.showSnackbar('Login realizado com sucesso', 'success');
  });

  eventBus.on('auth:logout', () => {
    logger.info('Usuário deslogado');
    globalUtils.showSnackbar('Logout realizado', 'info');
  });

  eventBus.on('auth:error', (error) => {
    logger.error('Erro de autenticação:', error);
    globalUtils.showSnackbar('Erro de autenticação', 'error');
  });

  // Eventos de aplicação
  eventBus.on('app:ready', (appState) => {
    logger.info('Aplicação pronta:', appState);
    // Snackbar removido para evitar duplicação com outros listeners
    // globalUtils.showSnackbar('Aplicação carregada', 'success');
  });

  eventBus.on('app:error', (error) => {
    logger.error('Erro na aplicação:', error);
    globalUtils.showSnackbar('Erro ao carregar aplicação', 'error');
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
