/**
 * Sistema de Catch-up de Notificações
 * Verifica notificações pendentes quando o app é aberto
 * e mostra um popup com todas as notificações não lidas
 */

import { getNotificationsRepo } from '../../data/repositories/notificationsRepo.js';
import { getNotificationModal } from './ui/NotificationModal.js';

class CatchUpNotifications {
  constructor() {
    this.isChecking = false;
    this.lastCheckTime = null;
    this.pendingNotifications = [];
    this.catchUpModal = null;
  }

  /**
   * Inicializa o sistema de catch-up
   */
  async init() {
    console.log('[CatchUpNotifications] 🚀 Inicializando sistema de catch-up...');
    
    // TEMPORARIAMENTE DESABILITADO PARA RESOLVER LOOP INFINITO
    console.log('[CatchUpNotifications] ⚠️ Sistema de catch-up temporariamente desabilitado');
    return;
    
    // Configurar listener para mudanças de rota
    this.setupRouteListener();
    
    // Verificar notificações pendentes após um delay para não conflitar com modais
    setTimeout(async () => {
      await this.checkPendingNotifications();
    }, 30000); // 30 segundos de delay (depois do modal de notificação)
    
    console.log('[CatchUpNotifications] ✅ Sistema de catch-up inicializado');
  }

  /**
   * Verifica se há modais de notificação ativos
   */
  isNotificationModalActive() {
    const modal = document.getElementById('notification-modal');
    if (!modal) {
      console.log('[CatchUpNotifications] 🔍 Modal de notificação não existe');
      return false;
    }
    
    const styles = window.getComputedStyle(modal);
    const hasShowClass = modal.classList.contains('notification-modal-show');
    const isVisible = styles.display !== 'none' && 
                     styles.opacity !== '0' && 
                     styles.visibility !== 'hidden' &&
                     styles.zIndex !== 'auto' &&
                     hasShowClass;
    
    console.log('[CatchUpNotifications] 🔍 Verificando modal de notificação:', {
      exists: !!modal,
      display: styles.display,
      opacity: styles.opacity,
      visibility: styles.visibility,
      zIndex: styles.zIndex,
      hasShowClass,
      isVisible,
      classList: Array.from(modal.classList),
      innerHTML: modal.innerHTML.substring(0, 100) + '...'
    });
    
    return isVisible;
  }

  /**
   * Verifica notificações pendentes
   */
  async checkPendingNotifications() {
    if (this.isChecking) {
      console.log('[CatchUpNotifications] ⏳ Verificação já em andamento, pulando...');
      return;
    }

    // Verificar se já há um modal de notificação ativo
    if (this.isNotificationModalActive()) {
      console.log('[CatchUpNotifications] ⏳ Modal de notificação já ativo, pulando catch-up...');
      return;
    }

    // Aguardar um pouco mais e verificar novamente
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (this.isNotificationModalActive()) {
      console.log('[CatchUpNotifications] ⏳ Modal de notificação ativo após delay, pulando catch-up...');
      return;
    }

    this.isChecking = true;
    console.log('[CatchUpNotifications] 🔍 Verificando notificações pendentes...');

    try {
      const userId = this.getCurrentUserId();
      if (!userId) {
        console.log('[CatchUpNotifications] ❌ Usuário não autenticado');
        return;
      }

      const notificationsRepo = getNotificationsRepo();
      const notifications = await notificationsRepo.getUnreadNotifications(userId);
      
      console.log('[CatchUpNotifications] 📊 Notificações não lidas encontradas:', notifications.length);

      if (notifications.length > 0) {
        this.pendingNotifications = notifications;
        console.log('[CatchUpNotifications] 📋 Notificações pendentes:', notifications.map(n => ({ id: n.id, type: n.type, message: n.message })));
        await this.showCatchUpModal();
      } else {
        this.pendingNotifications = []; // Limpar array se não houver notificações
        console.log('[CatchUpNotifications] ✅ Nenhuma notificação pendente - array limpo');
      }

    } catch (error) {
      console.error('[CatchUpNotifications] ❌ Erro ao verificar notificações:', error);
    } finally {
      this.isChecking = false;
      this.lastCheckTime = new Date();
    }
  }

  /**
   * Mostra o modal de catch-up com notificações pendentes
   */
  async showCatchUpModal() {
    // Verificar se há notificações pendentes
    if (!this.pendingNotifications || this.pendingNotifications.length === 0) {
      console.log('[CatchUpNotifications] ❌ Nenhuma notificação pendente, não mostrando modal');
      return;
    }

    if (this.catchUpModal) {
      console.log('[CatchUpNotifications] 🔄 Modal de catch-up já existe, removendo...');
      this.catchUpModal.remove();
    }

    console.log('[CatchUpNotifications] 📱 Mostrando modal de catch-up com', this.pendingNotifications.length, 'notificações...');
    
    const modal = this.createCatchUpModal();
    document.body.appendChild(modal);
    this.catchUpModal = modal;

    // Mostrar modal com animação
    setTimeout(() => {
      modal.classList.add('catch-up-modal-show');
    }, 100);

    // Auto-fechar após 30 segundos (mais tempo para ler)
    setTimeout(() => {
      this.closeCatchUpModal();
    }, 30000);
  }

  /**
   * Cria o modal de catch-up
   */
  createCatchUpModal() {
    const isDarkTheme = document.body.classList.contains('dark') || 
                       document.documentElement.classList.contains('dark') ||
                       window.matchMedia('(prefers-color-scheme: dark)').matches;

    const bgColor = isDarkTheme ? '#1f2937' : 'white';
    const textColor = isDarkTheme ? '#f9fafb' : '#111827';
    const borderColor = isDarkTheme ? '#374151' : '#e5e7eb';
    const accentColor = isDarkTheme ? '#3b82f6' : '#2563eb';

    const modal = document.createElement('div');
    modal.className = 'catch-up-modal-overlay';
    modal.innerHTML = `
      <div class="catch-up-modal-container" style="
        background: ${bgColor};
        color: ${textColor};
        border: 1px solid ${borderColor};
        border-radius: 16px;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow: hidden;
        transform: scale(0.9) translateY(20px);
        opacity: 0;
        transition: all 0.3s ease;
      ">
        <div class="catch-up-modal-header" style="
          padding: 20px 24px 16px;
          border-bottom: 1px solid ${borderColor};
          display: flex;
          align-items: center;
          justify-content: space-between;
        ">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="
              width: 40px;
              height: 40px;
              background: ${accentColor};
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 18px;
              font-weight: bold;
            ">
              ${this.pendingNotifications.length}
            </div>
            <div>
              <h3 style="
                margin: 0;
                font-size: 18px;
                font-weight: 600;
                color: ${textColor};
              ">
                Notificações Pendentes
              </h3>
              <p style="
                margin: 4px 0 0;
                font-size: 14px;
                color: ${isDarkTheme ? '#9ca3af' : '#6b7280'};
              ">
                Você tem ${this.pendingNotifications.length} notificação${this.pendingNotifications.length > 1 ? 'ões' : ''} não lida${this.pendingNotifications.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <button id="catch-up-modal-close" style="
            background: none;
            border: none;
            color: ${isDarkTheme ? '#9ca3af' : '#6b7280'};
            font-size: 24px;
            cursor: pointer;
            padding: 4px;
            border-radius: 4px;
            transition: all 0.2s ease;
          " title="Fechar">
            ×
          </button>
        </div>

        <div class="catch-up-modal-content" style="
          padding: 16px 24px;
          max-height: 400px;
          overflow-y: auto;
        ">
          ${this.pendingNotifications.map(notification => `
            <div class="catch-up-notification-item" style="
              padding: 16px;
              background: ${isDarkTheme ? '#374151' : '#f9fafb'};
              border-radius: 12px;
              margin-bottom: 12px;
              border: 1px solid ${isDarkTheme ? '#4b5563' : '#e5e7eb'};
              transition: all 0.2s ease;
            ">
              <div style="display: flex; align-items: flex-start; gap: 12px;">
                <div style="
                  width: 32px;
                  height: 32px;
                  background: ${this.getNotificationColor(notification.type)};
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: white;
                  font-size: 14px;
                  font-weight: bold;
                  flex-shrink: 0;
                ">
                  ${this.getNotificationIcon(notification.type)}
                </div>
                <div style="flex: 1; min-width: 0;">
                  <h4 style="
                    margin: 0 0 4px;
                    font-size: 14px;
                    font-weight: 600;
                    color: ${textColor};
                  ">
                    ${this.getNotificationTitle(notification.type)}
                  </h4>
                  <p style="
                    margin: 0 0 8px;
                    font-size: 13px;
                    color: ${isDarkTheme ? '#d1d5db' : '#374151'};
                    line-height: 1.4;
                  ">
                    ${notification.message || this.getDefaultMessage(notification.type)}
                  </p>
                  <div style="
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-size: 12px;
                    color: ${isDarkTheme ? '#9ca3af' : '#6b7280'};
                  ">
                    <span>${this.formatDate(notification.createdAt)}</span>
                    <span>${notification.budgetName || 'Orçamento'}</span>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="catch-up-modal-footer" style="
          padding: 16px 24px 20px;
          border-top: 1px solid ${borderColor};
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        ">
          <button id="catch-up-modal-mark-all-read" style="
            background: ${accentColor};
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
          ">
            Marcar Todas como Lidas
          </button>
          <button id="catch-up-modal-view-all" style="
            background: ${isDarkTheme ? '#374151' : '#f3f4f6'};
            color: ${textColor};
            border: 1px solid ${borderColor};
            padding: 10px 20px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
          ">
            Ver Todas
          </button>
        </div>
      </div>
    `;

    // Adicionar estilos CSS
    this.addCatchUpModalStyles();

    // Vincular eventos
    this.bindCatchUpModalEvents(modal);

    return modal;
  }

  /**
   * Adiciona estilos CSS para o modal de catch-up
   */
  addCatchUpModalStyles() {
    if (document.getElementById('catch-up-modal-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'catch-up-modal-styles';
    styles.textContent = `
      .catch-up-modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
      }

      .catch-up-modal-overlay.catch-up-modal-show {
        opacity: 1;
        visibility: visible;
      }

      .catch-up-modal-overlay.catch-up-modal-show .catch-up-modal-container {
        transform: scale(1) translateY(0);
        opacity: 1;
      }

      .catch-up-notification-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      #catch-up-modal-close:hover {
        background: rgba(0, 0, 0, 0.1);
        color: #ef4444;
      }

      #catch-up-modal-mark-all-read:hover {
        background: #1d4ed8;
        transform: translateY(-1px);
      }

      #catch-up-modal-view-all:hover {
        background: #e5e7eb;
        transform: translateY(-1px);
      }

      .catch-up-modal-content::-webkit-scrollbar {
        width: 6px;
      }

      .catch-up-modal-content::-webkit-scrollbar-track {
        background: transparent;
      }

      .catch-up-modal-content::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 3px;
      }

      .catch-up-modal-content::-webkit-scrollbar-thumb:hover {
        background: rgba(0, 0, 0, 0.3);
      }
    `;
    document.head.appendChild(styles);
  }

  /**
   * Vincula eventos do modal de catch-up
   */
  bindCatchUpModalEvents(modal) {
    const closeBtn = modal.querySelector('#catch-up-modal-close');
    const markAllReadBtn = modal.querySelector('#catch-up-modal-mark-all-read');
    const viewAllBtn = modal.querySelector('#catch-up-modal-view-all');
    const overlay = modal;

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeCatchUpModal());
    }

    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          this.closeCatchUpModal();
        }
      });
    }

    if (markAllReadBtn) {
      markAllReadBtn.addEventListener('click', () => this.markAllAsRead());
    }

    if (viewAllBtn) {
      viewAllBtn.addEventListener('click', () => this.viewAllNotifications());
    }

    // Fechar com ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.catchUpModal) {
        this.closeCatchUpModal();
      }
    });
  }

  /**
   * Fecha o modal de catch-up
   */
  closeCatchUpModal() {
    if (!this.catchUpModal) return;

    console.log('[CatchUpNotifications] 🔒 Fechando modal de catch-up...');
    
    this.catchUpModal.classList.remove('catch-up-modal-show');
    
    setTimeout(() => {
      if (this.catchUpModal) {
        this.catchUpModal.remove();
        this.catchUpModal = null;
      }
    }, 300);
  }

  /**
   * Marca todas as notificações como lidas
   */
  async markAllAsRead() {
    console.log('[CatchUpNotifications] ✅ Marcando todas as notificações como lidas...');
    
    try {
      const notificationsRepo = getNotificationsRepo();
      const userId = this.getCurrentUserId();
      
      for (const notification of this.pendingNotifications) {
        await notificationsRepo.markAsRead(notification.id);
      }
      
      console.log('[CatchUpNotifications] ✅ Todas as notificações marcadas como lidas');
      this.closeCatchUpModal();
      
      // Mostrar snackbar de confirmação
      if (window.Snackbar) {
        window.Snackbar.show('Todas as notificações foram marcadas como lidas', 'success');
      }
      
    } catch (error) {
      console.error('[CatchUpNotifications] ❌ Erro ao marcar notificações como lidas:', error);
    }
  }

  /**
   * Navega para a página de notificações
   */
  viewAllNotifications() {
    console.log('[CatchUpNotifications] 📬 Navegando para página de notificações...');
    this.closeCatchUpModal();
    window.location.hash = '#/notifications';
  }

  /**
   * Configura listener para mudanças de rota
   */
  setupRouteListener() {
    // Verificar notificações pendentes ao mudar de rota
    window.addEventListener('hashchange', () => {
      setTimeout(() => {
        this.checkPendingNotifications();
      }, 5000); // 5 segundos para mudanças de rota
    });
  }

  /**
   * Obtém o ID do usuário atual
   */
  getCurrentUserId() {
    // Tentar obter do estado da aplicação
    if (window.appState?.user?.uid) {
      return window.appState.user.uid;
    }
    
    // Tentar obter do currentUser global
    if (window.currentUser?.uid) {
      return window.currentUser.uid;
    }
    
    // Tentar obter do Firebase Auth
    if (window.firebase?.auth?.currentUser?.uid) {
      return window.firebase.auth.currentUser.uid;
    }
    
    return null;
  }

  /**
   * Obtém a cor da notificação baseada no tipo
   */
  getNotificationColor(type) {
    const colors = {
      'transaction_created': '#10b981',
      'transaction_updated': '#f59e0b',
      'transaction_deleted': '#ef4444',
      'category_created': '#8b5cf6',
      'category_updated': '#f59e0b',
      'category_deleted': '#ef4444',
      'recurring_created': '#06b6d4',
      'recurring_updated': '#f59e0b',
      'recurring_deleted': '#ef4444',
      'budget_shared': '#3b82f6',
      'budget_unshared': '#6b7280',
      'test_notification': '#8b5cf6'
    };
    return colors[type] || '#6b7280';
  }

  /**
   * Obtém o ícone da notificação baseado no tipo
   */
  getNotificationIcon(type) {
    const icons = {
      'transaction_created': '💰',
      'transaction_updated': '✏️',
      'transaction_deleted': '🗑️',
      'category_created': '📁',
      'category_updated': '✏️',
      'category_deleted': '🗑️',
      'recurring_created': '🔄',
      'recurring_updated': '✏️',
      'recurring_deleted': '🗑️',
      'budget_shared': '👥',
      'budget_unshared': '👤',
      'test_notification': '🧪'
    };
    return icons[type] || '📢';
  }

  /**
   * Obtém o título da notificação baseado no tipo
   */
  getNotificationTitle(type) {
    const titles = {
      'transaction_created': 'Nova Transação',
      'transaction_updated': 'Transação Atualizada',
      'transaction_deleted': 'Transação Excluída',
      'category_created': 'Nova Categoria',
      'category_updated': 'Categoria Atualizada',
      'category_deleted': 'Categoria Excluída',
      'recurring_created': 'Nova Recorrente',
      'recurring_updated': 'Recorrente Atualizada',
      'recurring_deleted': 'Recorrente Excluída',
      'budget_shared': 'Orçamento Compartilhado',
      'budget_unshared': 'Orçamento Descompartilhado',
      'test_notification': 'Notificação de Teste'
    };
    return titles[type] || 'Notificação';
  }

  /**
   * Obtém a mensagem padrão baseada no tipo
   */
  getDefaultMessage(type) {
    const messages = {
      'transaction_created': 'Uma nova transação foi criada',
      'transaction_updated': 'Uma transação foi atualizada',
      'transaction_deleted': 'Uma transação foi excluída',
      'category_created': 'Uma nova categoria foi criada',
      'category_updated': 'Uma categoria foi atualizada',
      'category_deleted': 'Uma categoria foi excluída',
      'recurring_created': 'Uma nova transação recorrente foi criada',
      'recurring_updated': 'Uma transação recorrente foi atualizada',
      'recurring_deleted': 'Uma transação recorrente foi excluída',
      'budget_shared': 'Um orçamento foi compartilhado com você',
      'budget_unshared': 'Um orçamento foi descompartilhado',
      'test_notification': 'Esta é uma notificação de teste'
    };
    return messages[type] || 'Nova notificação disponível';
  }

  /**
   * Formata a data da notificação
   */
  formatDate(date) {
    if (!date) return 'Agora';
    
    const now = new Date();
    const notificationDate = new Date(date);
    const diffInMinutes = Math.floor((now - notificationDate) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Agora';
    if (diffInMinutes < 60) return `${diffInMinutes}min atrás`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h atrás`;
    return `${Math.floor(diffInMinutes / 1440)}d atrás`;
  }
}

// Instância singleton
let catchUpNotificationsInstance = null;

/**
 * Obtém a instância do sistema de catch-up
 */
export function getCatchUpNotifications() {
  if (!catchUpNotificationsInstance) {
    catchUpNotificationsInstance = new CatchUpNotifications();
  }
  return catchUpNotificationsInstance;
}

/**
 * Inicializa o sistema de catch-up
 */
export async function initCatchUpNotifications() {
  const catchUp = getCatchUpNotifications();
  await catchUp.init();
  return catchUp;
}

// Expor globalmente para debug
if (typeof window !== 'undefined') {
  window.getCatchUpNotifications = getCatchUpNotifications;
  window.initCatchUpNotifications = initCatchUpNotifications;
}
