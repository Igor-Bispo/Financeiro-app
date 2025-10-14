// features/notifications/ui/NotificationModal.js
import { eventBus } from '@core/events/eventBus.js';
import { markOneAsRead } from '../notificationsController.js';

class NotificationModal {
  constructor() {
    this.isOpen = false;
    this.currentNotification = null;
    this.autoCloseTimer = null;
    this.notificationQueue = []; // Fila de notificações
    this.isProcessing = false; // Flag para controlar processamento
    this.init();
  }

  init() {
    console.log('[NotificationModal] 🚀 Inicializando modal...');
    this.createModalHTML();
    console.log('[NotificationModal] ✅ Modal inicializado com sucesso');
  }

  createModalHTML() {
    console.log('[NotificationModal] 🏗️ Criando HTML do modal...');

    // Remover modal existente se houver
    const existingModal = document.getElementById('notification-modal');
    if (existingModal) {
      console.log('[NotificationModal] 🗑️ Removendo modal existente...');
      existingModal.remove();
    }

    const modalHTML = `
      <div id="notification-modal" class="notification-modal-overlay" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 10000; opacity: 0; visibility: hidden;">
        <div class="notification-modal-container">
          <div class="notification-modal-header">
            <div class="notification-modal-icon">
              <span id="notification-modal-icon">🔔</span>
            </div>
            <div class="notification-modal-title">
              <h3 id="notification-modal-title">Nova Notificação</h3>
              <p id="notification-modal-time" class="notification-modal-time"></p>
            </div>
            <button id="notification-modal-close" class="notification-modal-close" aria-label="Fechar">
              <span>×</span>
            </button>
          </div>
          
          <div class="notification-modal-body">
            <div id="notification-modal-content" class="notification-modal-content">
              <!-- Conteúdo da notificação será inserido aqui -->
            </div>
          </div>
          
          <div class="notification-modal-footer">
            <button id="notification-modal-mark-read" class="notification-modal-btn notification-modal-btn-secondary">
              ✅ Marcar como lida
            </button>
            <button id="notification-modal-view-all" class="notification-modal-btn notification-modal-btn-primary">
              📬 Ver todas as notificações
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    console.log('[NotificationModal] ✅ HTML do modal inserido no DOM');

    // Verificar se foi inserido corretamente
    const insertedModal = document.getElementById('notification-modal');
    console.log('[NotificationModal] 🔍 Modal inserido verificado:', !!insertedModal);

    if (insertedModal) {
      console.log('[NotificationModal] 🔍 Modal inserido com sucesso, vinculando eventos...');
      this.bindEvents();
    } else {
      console.error('[NotificationModal] ❌ Modal não foi inserido no DOM!');
    }
  }

  bindEvents() {
    console.log('[NotificationModal] 🔗 Vinculando eventos...');
    const modal = document.getElementById('notification-modal');
    const closeBtn = document.getElementById('notification-modal-close');
    const markReadBtn = document.getElementById('notification-modal-mark-read');
    const viewAllBtn = document.getElementById('notification-modal-view-all');
    const overlay = modal;

    console.log('[NotificationModal] 🔍 Elementos encontrados:', {
      modal: !!modal,
      closeBtn: !!closeBtn,
      markReadBtn: !!markReadBtn,
      viewAllBtn: !!viewAllBtn
    });

    // Fechar modal
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        console.log('[NotificationModal] 🔒 Botão fechar clicado');
        this.close();
      });
    }

    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          console.log('[NotificationModal] 🔒 Overlay clicado');
          this.close();
        }
      });
    }

    // Marcar como lida
    if (markReadBtn) {
      markReadBtn.addEventListener('click', async () => {
        console.log('[NotificationModal] ✅ Botão marcar como lida clicado');
        if (this.currentNotification) {
          await this.markAsRead(this.currentNotification.id);
          this.close();
        }
      });
    }

    // Ver todas as notificações
    if (viewAllBtn) {
      viewAllBtn.addEventListener('click', () => {
        console.log('[NotificationModal] 📬 Botão ver todas clicado');
        this.close();
        window.location.hash = '#/notifications';
      });
    }

    // Fechar com ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        console.log('[NotificationModal] 🔒 Tecla ESC pressionada');
        this.close();
      }
    });

    console.log('[NotificationModal] ✅ Eventos vinculados com sucesso');
  }

  show(notification) {
    console.log('[NotificationModal] 🚀 show() chamado com notificação:', notification);
    console.log('[NotificationModal] 🔍 Estado atual:', {
      isOpen: this.isOpen,
      hasAutoCloseTimer: !!this.autoCloseTimer,
      currentNotification: !!this.currentNotification,
      queueLength: this.notificationQueue.length,
      isProcessing: this.isProcessing
    });

    if (!notification) {
      console.log('[NotificationModal] ❌ Notificação inválida, retornando');
      return;
    }

    // Adicionar à fila
    this.notificationQueue.push(notification);
    console.log('[NotificationModal] 📋 Notificação adicionada à fila. Total na fila:', this.notificationQueue.length);

    // Processar fila se não estiver processando
    if (!this.isProcessing) {
      this.processQueue();
    }
  }

  async processQueue() {
    if (this.isProcessing || this.notificationQueue.length === 0) {
      return;
    }

    this.isProcessing = true;
    console.log('[NotificationModal] 🔄 Processando fila de notificações...');

    while (this.notificationQueue.length > 0) {
      const notification = this.notificationQueue.shift();
      console.log('[NotificationModal] 📱 Processando notificação da fila:', notification.id);

      await this.showNotification(notification);

      // Aguardar 3 segundos entre notificações
      if (this.notificationQueue.length > 0) {
        console.log('[NotificationModal] ⏳ Aguardando 3 segundos antes da próxima notificação...');
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    }

    this.isProcessing = false;
    console.log('[NotificationModal] ✅ Fila de notificações processada');
  }

  async showNotification(notification) {
    // Fechar modal anterior se existir
    if (this.isOpen) {
      console.log('[NotificationModal] 🔄 Fechando modal anterior...');
      this.close();
      // Aguardar fechamento
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    this.currentNotification = notification;
    this.isOpen = true;

    console.log('[NotificationModal] 📝 Atualizando conteúdo do modal...');
    // Atualizar conteúdo do modal
    this.updateModalContent(notification);

    // Mostrar modal
    let modal = document.getElementById('notification-modal');
    console.log('[NotificationModal] 🔍 Modal encontrado:', !!modal);

    if (!modal) {
      console.log('[NotificationModal] 🔧 Modal não encontrado, recriando...');
      this.createModalHTML();
      modal = document.getElementById('notification-modal');
      console.log('[NotificationModal] 🔍 Modal após recriação:', !!modal);

      if (!modal) {
        console.error('[NotificationModal] ❌ Modal ainda não encontrado após recriação!');
        return;
      }
    }

    if (modal) {
      console.log('[NotificationModal] 📱 Mostrando modal...');
      console.log('[NotificationModal] 🔍 Modal antes da modificação:', {
        display: window.getComputedStyle(modal).display,
        opacity: window.getComputedStyle(modal).opacity,
        visibility: window.getComputedStyle(modal).visibility,
        zIndex: window.getComputedStyle(modal).zIndex
      });

      // Remover classe de overlay se existir
      modal.classList.remove('notification-modal-overlay');

      // Remover qualquer estilo que possa estar escondendo o modal
      modal.removeAttribute('style');

      // Forçar visibilidade com estilos inline
      modal.style.cssText = `
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        background: rgba(0, 0, 0, 0.6) !important;
        backdrop-filter: blur(4px) !important;
        z-index: 10000 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        padding: 20px !important;
        opacity: 1 !important;
        visibility: visible !important;
        pointer-events: auto !important;
      `;

      // Forçar exibição também via atributo
      modal.setAttribute('style', modal.style.cssText);

      // Adicionar classe de visibilidade
      modal.classList.add('notification-modal-show');

      console.log('[NotificationModal] 🎨 Estilos aplicados, verificando resultado...');
      console.log('[NotificationModal] 🔍 Modal após aplicação de estilos:', {
        display: window.getComputedStyle(modal).display,
        opacity: window.getComputedStyle(modal).opacity,
        visibility: window.getComputedStyle(modal).visibility,
        zIndex: window.getComputedStyle(modal).zIndex,
        position: window.getComputedStyle(modal).position
      });

      console.log('[NotificationModal] 🎨 Estilos inline aplicados');
      console.log('[NotificationModal] 📊 Modal computed styles:', {
        display: window.getComputedStyle(modal).display,
        opacity: window.getComputedStyle(modal).opacity,
        visibility: window.getComputedStyle(modal).visibility,
        zIndex: window.getComputedStyle(modal).zIndex,
        pointerEvents: window.getComputedStyle(modal).pointerEvents
      });

      // Log adicional para debug
      console.log('[NotificationModal] 🔍 Modal element:', modal);
      console.log('[NotificationModal] 🔍 Modal parent:', modal.parentNode);
      console.log('[NotificationModal] 🔍 Modal in DOM:', document.contains(modal));

      // Verificar se o container está visível
      const container = modal.querySelector('.notification-modal-container');
      if (container) {
        // Detectar tema atual
        const isDarkTheme = document.body.classList.contains('dark') ||
                           document.documentElement.classList.contains('dark') ||
                           window.matchMedia('(prefers-color-scheme: dark)').matches;

        const bgColor = isDarkTheme ? '#1f2937' : 'white';
        const textColor = isDarkTheme ? '#f9fafb' : '#111827';
        const borderColor = isDarkTheme ? '#374151' : '#e5e7eb';

        container.style.cssText = `
          background: ${bgColor} !important;
          color: ${textColor} !important;
          border: 1px solid ${borderColor} !important;
          border-radius: 16px !important;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3) !important;
          max-width: 500px !important;
          width: 100% !important;
          max-height: 80vh !important;
          overflow: hidden !important;
          transform: scale(1) translateY(0) !important;
          opacity: 1 !important;
        `;

        // Aplicar cores nos elementos de texto
        const titleEl = container.querySelector('#notification-modal-title');
        const timeEl = container.querySelector('#notification-modal-time');
        const messageEl = container.querySelector('#notification-modal-message');
        const detailsEl = container.querySelector('#notification-modal-details');

        if (titleEl) titleEl.style.color = textColor;
        if (timeEl) timeEl.style.color = isDarkTheme ? '#9ca3af' : '#6b7280';
        if (messageEl) messageEl.style.color = textColor;
        if (detailsEl) detailsEl.style.color = isDarkTheme ? '#d1d5db' : '#374151';

        console.log('[NotificationModal] 🎨 Container estilizado para tema:', isDarkTheme ? 'escuro' : 'claro');
      }

      // Animação de entrada
      setTimeout(() => {
        console.log('[NotificationModal] ✨ Adicionando classe de animação...');
        modal.classList.add('notification-modal-show');

        // Verificar se a classe foi adicionada
        console.log('[NotificationModal] 🔍 Classe notification-modal-show adicionada:', modal.classList.contains('notification-modal-show'));
      }, 10);
    } else {
      console.error('[NotificationModal] ❌ Modal ainda não encontrado no DOM após recriação!');
      return;
    }

    // Auto-fechar após 8 segundos se não interagir (tempo otimizado para múltiplas notificações)
    this.autoCloseTimer = setTimeout(() => {
      console.log('[NotificationModal] ⏰ Auto-fechando modal após 8 segundos...');
      console.log('[NotificationModal] 🔍 Timer executado, modal ainda aberto?', this.isOpen);
      this.close();
    }, 8000);

    console.log('[NotificationModal] ⏰ Timer de auto-fechamento configurado para 8 segundos');

    console.log('[NotificationModal] ✅ Modal exibido com sucesso');

    // Verificação final
    setTimeout(() => {
      const finalModal = document.getElementById('notification-modal');
      if (finalModal) {
        const finalStyles = window.getComputedStyle(finalModal);
        console.log('[NotificationModal] 🔍 Verificação final do modal:', {
          display: finalStyles.display,
          opacity: finalStyles.opacity,
          visibility: finalStyles.visibility,
          zIndex: finalStyles.zIndex,
          position: finalStyles.position
        });
      }
    }, 100);
  }

  updateModalContent(notification) {
    const iconEl = document.getElementById('notification-modal-icon');
    const titleEl = document.getElementById('notification-modal-title');
    const timeEl = document.getElementById('notification-modal-time');
    const contentEl = document.getElementById('notification-modal-content');

    if (!iconEl || !titleEl || !timeEl || !contentEl) return;

    // Detectar tema atual
    const isDarkTheme = document.body.classList.contains('dark') ||
                       document.documentElement.classList.contains('dark') ||
                       window.matchMedia('(prefers-color-scheme: dark)').matches;

    const textColor = isDarkTheme ? '#f9fafb' : '#111827';
    const secondaryTextColor = isDarkTheme ? '#9ca3af' : '#6b7280';
    const detailsTextColor = isDarkTheme ? '#d1d5db' : '#374151';

    // Ícone baseado no tipo
    const typeIcons = {
      new_transaction: '💰',
      updated_transaction: '✏️',
      deleted_transaction: '🗑️',
      category_added: '📁',
      category_updated: '📝',
      category_deleted: '❌',
      new_recorrente: '🔄',
      updated_recorrente: '✏️',
      deleted_recorrente: '🗑️',
      recorrente_reminder: '⏰',
      test_notification: '🧪',
    };

    // Título baseado no tipo
    const typeTitles = {
      new_transaction: 'Nova Transação',
      updated_transaction: 'Transação Atualizada',
      deleted_transaction: 'Transação Excluída',
      category_added: 'Nova Categoria',
      category_updated: 'Categoria Atualizada',
      category_deleted: 'Categoria Excluída',
      new_recorrente: 'Nova Despesa Recorrente',
      updated_recorrente: 'Despesa Recorrente Atualizada',
      deleted_recorrente: 'Despesa Recorrente Excluída',
      recorrente_reminder: 'Lembrete de Despesa Recorrente',
      test_notification: 'Notificação de Teste',
    };

    // Data/hora
    const createdAt = notification.createdAt?.toDate ?
      notification.createdAt.toDate() :
      new Date(notification.createdAt);

    const timeStr = createdAt.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Atualizar elementos
    iconEl.textContent = typeIcons[notification.type] || '🔔';
    titleEl.textContent = typeTitles[notification.type] || 'Nova Notificação';
    titleEl.style.color = textColor;
    timeEl.textContent = timeStr;
    timeEl.style.color = secondaryTextColor;

    // Conteúdo da notificação com informações contextuais
    const contextualContent = this.generateContextualContent(notification, textColor, detailsTextColor);
    contentEl.innerHTML = contextualContent;
  }

  generateContextualContent(notification, textColor, detailsTextColor) {
    // Detectar tema atual
    const isDarkTheme = document.body.classList.contains('dark') ||
                       document.documentElement.classList.contains('dark') ||
                       window.matchMedia('(prefers-color-scheme: dark)').matches;

    const formatCurrency = (value) => {
      if (typeof value === 'number') {
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(value);
      }
      return value;
    };

    const formatDate = (date) => {
      if (!date) return '';
      const d = date.toDate ? date.toDate() : new Date(date);
      return d.toLocaleDateString('pt-BR');
    };

    switch (notification.type) {
    case 'new_transaction':
      return `
          <div class="notification-modal-message" style="color: ${textColor}; margin-bottom: 12px;">
            <strong>Nova transação adicionada:</strong>
          </div>
          <div class="notification-modal-details" style="color: ${detailsTextColor}; background: ${isDarkTheme ? '#374151' : '#f9fafb'}; padding: 12px; border-radius: 8px; border-left: 4px solid #10b981;">
            <div style="margin-bottom: 8px;">
              <strong>💰 Valor:</strong> ${formatCurrency(notification.transactionValor)}
            </div>
            <div style="margin-bottom: 8px;">
              <strong>📝 Descrição:</strong> ${notification.transactionDescricao || 'Sem descrição'}
            </div>
            <div style="margin-bottom: 8px;">
              <strong>📁 Categoria:</strong> ${notification.transactionCategoria || 'Sem categoria'}
            </div>
            <div style="margin-bottom: 8px;">
              <strong>💳 Tipo:</strong> ${notification.transactionTipo || 'Não especificado'}
            </div>
            <div>
              <strong>📅 Data:</strong> ${formatDate(notification.transactionData)}
            </div>
          </div>
        `;

    case 'updated_transaction':
      const changes = Array.isArray(notification.changes) ? notification.changes : [];
      const prev = notification.prev;

      let changeDetails = '';
      if (changes.includes('valor') && prev?.valor && notification.transactionValor) {
        changeDetails += `
            <div style="margin-bottom: 8px;">
              <strong>💰 Valor alterado:</strong> 
              <span style="color: #ef4444;">${formatCurrency(prev.valor)}</span> 
              <span style="margin: 0 8px;">→</span> 
              <span style="color: #10b981;">${formatCurrency(notification.transactionValor)}</span>
            </div>
          `;
      }
      if (changes.includes('descricao') && prev?.descricao) {
        changeDetails += `
            <div style="margin-bottom: 8px;">
              <strong>📝 Descrição alterada:</strong> 
              <span style="color: #ef4444;">"${prev.descricao}"</span> 
              <span style="margin: 0 8px;">→</span> 
              <span style="color: #10b981;">"${notification.transactionDescricao}"</span>
            </div>
          `;
      }
      if (changes.includes('categoria') && prev?.categoria) {
        changeDetails += `
            <div style="margin-bottom: 8px;">
              <strong>📁 Categoria alterada:</strong> 
              <span style="color: #ef4444;">${prev.categoria}</span> 
              <span style="margin: 0 8px;">→</span> 
              <span style="color: #10b981;">${notification.transactionCategoria}</span>
            </div>
          `;
      }
      if (changes.includes('data') && prev?.data) {
        changeDetails += `
            <div style="margin-bottom: 8px;">
              <strong>📅 Data alterada:</strong> 
              <span style="color: #ef4444;">${formatDate(prev.data)}</span> 
              <span style="margin: 0 8px;">→</span> 
              <span style="color: #10b981;">${formatDate(notification.transactionData)}</span>
            </div>
          `;
      }
      if (changes.includes('tipo') && prev?.tipo) {
        changeDetails += `
            <div style="margin-bottom: 8px;">
              <strong>💳 Tipo alterado:</strong> 
              <span style="color: #ef4444;">${prev.tipo}</span> 
              <span style="margin: 0 8px;">→</span> 
              <span style="color: #10b981;">${notification.transactionTipo}</span>
            </div>
          `;
      }

      return `
          <div class="notification-modal-message" style="color: ${textColor}; margin-bottom: 12px;">
            <strong>Transação atualizada:</strong>
          </div>
          <div class="notification-modal-details" style="color: ${detailsTextColor}; background: ${isDarkTheme ? '#374151' : '#f9fafb'}; padding: 12px; border-radius: 8px; border-left: 4px solid #3b82f6;">
            ${changeDetails || `
              <div style="margin-bottom: 8px;">
                <strong>📝 Descrição:</strong> ${notification.transactionDescricao || 'Sem descrição'}
              </div>
              <div>
                <strong>💰 Valor:</strong> ${formatCurrency(notification.transactionValor)}
              </div>
            `}
          </div>
        `;

    case 'deleted_transaction':
      return `
          <div class="notification-modal-message" style="color: ${textColor}; margin-bottom: 12px;">
            <strong>Transação excluída:</strong>
          </div>
          <div class="notification-modal-details" style="color: ${detailsTextColor}; background: ${isDarkTheme ? '#374151' : '#f9fafb'}; padding: 12px; border-radius: 8px; border-left: 4px solid #ef4444;">
            <div style="margin-bottom: 8px;">
              <strong>📝 Descrição:</strong> ${notification.transactionDescricao || 'Transação excluída'}
            </div>
            <div style="margin-bottom: 8px;">
              <strong>💰 Valor:</strong> ${formatCurrency(notification.transactionValor)}
            </div>
            <div style="margin-bottom: 8px;">
              <strong>📁 Categoria:</strong> ${notification.transactionCategoria || 'Sem categoria'}
            </div>
            <div>
              <strong>💳 Tipo:</strong> ${notification.transactionTipo || 'Não especificado'}
            </div>
          </div>
        `;

    case 'recorrente_reminder':
      return `
          <div class="notification-modal-message" style="color: ${textColor}; margin-bottom: 12px;">
            <strong>Lembrete de despesa recorrente:</strong>
          </div>
          <div class="notification-modal-details" style="color: ${detailsTextColor}; background: ${isDarkTheme ? '#374151' : '#f9fafb'}; padding: 12px; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <div style="margin-bottom: 8px;">
              <strong>📝 Nome:</strong> ${notification.recorrenteNome || 'Recorrente'}
            </div>
            <div style="margin-bottom: 8px;">
              <strong>💰 Valor:</strong> ${formatCurrency(notification.recorrenteValor)}
            </div>
            <div>
              <strong>📄 Descrição:</strong> ${notification.recorrenteDescricao || 'Sem descrição'}
            </div>
          </div>
        `;

    case 'category_added':
      return `
          <div class="notification-modal-message" style="color: ${textColor}; margin-bottom: 12px;">
            <strong>Nova categoria criada:</strong>
          </div>
          <div class="notification-modal-details" style="color: ${detailsTextColor}; background: ${isDarkTheme ? '#374151' : '#f9fafb'}; padding: 12px; border-radius: 8px; border-left: 4px solid #10b981;">
            <div style="margin-bottom: 8px;">
              <strong>📁 Nome:</strong> ${notification.categoryNome || notification.categoryName || 'Nova categoria'}
            </div>
            <div style="margin-bottom: 8px;">
              <strong>🎨 Cor:</strong> <span style="background: ${notification.categoryColor || '#6b7280'}; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.8em;">${notification.categoryColor || '#6b7280'}</span>
            </div>
            <div style="margin-bottom: 8px;">
              <strong>💳 Tipo:</strong> ${notification.categoryTipo === 'receita' ? 'Receita' : 'Despesa'}
            </div>
            <div>
              <strong>💰 Limite:</strong> ${notification.categoryLimite !== null && notification.categoryLimite !== undefined ? formatCurrency(notification.categoryLimite) : 'Sem limite'}
            </div>
          </div>
        `;

    case 'category_updated':
      const categoryChanges = notification.changes || {};
      const categoryPrev = notification.prev;

      let categoryChangeDetails = '';
      if (categoryChanges.nome && categoryPrev?.nome !== undefined) {
        categoryChangeDetails += `
            <div style="margin-bottom: 8px;">
              <strong>📁 Nome alterado:</strong> 
              <span style="color: #ef4444;">"${categoryPrev.nome || 'Sem nome'}"</span> 
              <span style="margin: 0 8px;">→</span> 
              <span style="color: #10b981;">"${notification.categoryNome || 'Sem nome'}"</span>
            </div>
          `;
      }
      if (categoryChanges.tipo && categoryPrev?.tipo !== undefined) {
        categoryChangeDetails += `
            <div style="margin-bottom: 8px;">
              <strong>💳 Tipo alterado:</strong> 
              <span style="color: #ef4444;">${categoryPrev.tipo === 'receita' ? 'Receita' : 'Despesa'}</span> 
              <span style="margin: 0 8px;">→</span> 
              <span style="color: #10b981;">${notification.categoryTipo === 'receita' ? 'Receita' : 'Despesa'}</span>
            </div>
          `;
      }
      if (categoryChanges.limite && categoryPrev?.limite !== undefined) {
        const prevLimit = categoryPrev.limite !== null && categoryPrev.limite !== undefined ? formatCurrency(categoryPrev.limite) : 'Sem limite';
        const newLimit = notification.categoryLimite !== null && notification.categoryLimite !== undefined ? formatCurrency(notification.categoryLimite) : 'Sem limite';
        categoryChangeDetails += `
            <div style="margin-bottom: 8px;">
              <strong>💰 Limite alterado:</strong> 
              <span style="color: #ef4444;">${prevLimit}</span> 
              <span style="margin: 0 8px;">→</span> 
              <span style="color: #10b981;">${newLimit}</span>
            </div>
          `;
      }
      if (categoryChanges.cor && categoryPrev?.cor) {
        categoryChangeDetails += `
            <div style="margin-bottom: 8px;">
              <strong>🎨 Cor alterada:</strong> 
              <span style="background: ${categoryPrev.cor}; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.8em; margin-right: 8px;">${categoryPrev.cor}</span>
              <span style="margin: 0 8px;">→</span> 
              <span style="background: ${notification.categoryColor}; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.8em;">${notification.categoryColor}</span>
            </div>
          `;
      }

      return `
          <div class="notification-modal-message" style="color: ${textColor}; margin-bottom: 12px;">
            <strong>Categoria atualizada:</strong>
          </div>
          <div class="notification-modal-details" style="color: ${detailsTextColor}; background: ${isDarkTheme ? '#374151' : '#f9fafb'}; padding: 12px; border-radius: 8px; border-left: 4px solid #3b82f6;">
            ${categoryChangeDetails || `
              <div style="margin-bottom: 8px;">
                <strong>📁 Nome:</strong> ${notification.categoryNome || notification.categoryName || 'Categoria'}
              </div>
              <div style="margin-bottom: 8px;">
                <strong>💳 Tipo:</strong> ${notification.categoryTipo === 'receita' ? 'Receita' : 'Despesa'}
              </div>
              <div style="margin-bottom: 8px;">
                <strong>💰 Limite:</strong> ${notification.categoryLimite !== null && notification.categoryLimite !== undefined ? formatCurrency(notification.categoryLimite) : 'Sem limite'}
              </div>
              <div>
                <strong>🎨 Cor:</strong> <span style="background: ${notification.categoryColor || '#6b7280'}; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.8em;">${notification.categoryColor || '#6b7280'}</span>
              </div>
            `}
          </div>
        `;

    case 'category_deleted':
      return `
          <div class="notification-modal-message" style="color: ${textColor}; margin-bottom: 12px;">
            <strong>Categoria excluída:</strong>
          </div>
          <div class="notification-modal-details" style="color: ${detailsTextColor}; background: ${isDarkTheme ? '#374151' : '#f9fafb'}; padding: 12px; border-radius: 8px; border-left: 4px solid #ef4444;">
            <div style="margin-bottom: 8px;">
              <strong>📁 Nome:</strong> ${notification.categoryNome || notification.categoryName || 'Categoria excluída'}
            </div>
            <div style="margin-bottom: 8px;">
              <strong>💳 Tipo:</strong> ${notification.categoryTipo === 'receita' ? 'Receita' : 'Despesa'}
            </div>
            <div style="margin-bottom: 8px;">
              <strong>💰 Limite:</strong> ${notification.categoryLimite !== null && notification.categoryLimite !== undefined ? formatCurrency(notification.categoryLimite) : 'Sem limite'}
            </div>
            <div>
              <strong>🎨 Cor:</strong> <span style="background: ${notification.categoryColor || '#6b7280'}; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.8em;">${notification.categoryColor || '#6b7280'}</span>
            </div>
          </div>
        `;

    case 'new_recorrente':
      const parcelasInfo = notification.recorrenteParcelasTotal && notification.recorrenteParcelasTotal > 1
        ? `<div style="margin-bottom: 8px;">
               <strong>🔢 Parcelas:</strong> ${notification.recorrenteParcelasRestantes || notification.recorrenteParcelasTotal}/${notification.recorrenteParcelasTotal}
             </div>`
        : '';

      return `
          <div class="notification-modal-message" style="color: ${textColor}; margin-bottom: 12px;">
            <strong>Nova despesa recorrente criada:</strong>
          </div>
          <div class="notification-modal-details" style="color: ${detailsTextColor}; background: ${isDarkTheme ? '#374151' : '#f9fafb'}; padding: 12px; border-radius: 8px; border-left: 4px solid #10b981;">
            <div style="margin-bottom: 8px;">
              <strong>📝 Nome:</strong> ${notification.recorrenteNome || 'Nova despesa recorrente'}
            </div>
            <div style="margin-bottom: 8px;">
              <strong>💰 Valor:</strong> ${formatCurrency(notification.recorrenteValor)}
            </div>
            <div style="margin-bottom: 8px;">
              <strong>📅 Frequência:</strong> ${notification.recorrenteFrequencia || 'Mensal'}
            </div>
            <div style="margin-bottom: 8px;">
              <strong>📁 Categoria:</strong> ${notification.recorrenteCategoria || 'Sem categoria'}
            </div>
            ${parcelasInfo}
            <div>
              <strong>📄 Descrição:</strong> ${notification.recorrenteDescricao || 'Sem descrição'}
            </div>
          </div>
        `;

    case 'updated_recorrente':
      const recorrenteChanges = Array.isArray(notification.changes) ? notification.changes : [];
      const recorrentePrev = notification.prev;

      let recorrenteChangeDetails = '';
      if (recorrenteChanges.includes('nome') && recorrentePrev?.nome) {
        recorrenteChangeDetails += `
            <div style="margin-bottom: 8px;">
              <strong>📝 Nome alterado:</strong> 
              <span style="color: #ef4444;">"${recorrentePrev.nome}"</span> 
              <span style="margin: 0 8px;">→</span> 
              <span style="color: #10b981;">"${notification.recorrenteNome}"</span>
            </div>
          `;
      }
      if (recorrenteChanges.includes('valor') && recorrentePrev?.valor) {
        recorrenteChangeDetails += `
            <div style="margin-bottom: 8px;">
              <strong>💰 Valor alterado:</strong> 
              <span style="color: #ef4444;">${formatCurrency(recorrentePrev.valor)}</span> 
              <span style="margin: 0 8px;">→</span> 
              <span style="color: #10b981;">${formatCurrency(notification.recorrenteValor)}</span>
            </div>
          `;
      }
      if (recorrenteChanges.includes('frequencia') && recorrentePrev?.frequencia) {
        recorrenteChangeDetails += `
            <div style="margin-bottom: 8px;">
              <strong>📅 Frequência alterada:</strong> 
              <span style="color: #ef4444;">${recorrentePrev.frequencia}</span> 
              <span style="margin: 0 8px;">→</span> 
              <span style="color: #10b981;">${notification.recorrenteFrequencia}</span>
            </div>
          `;
      }
      if (recorrenteChanges.includes('categoria') && recorrentePrev?.categoria) {
        recorrenteChangeDetails += `
            <div style="margin-bottom: 8px;">
              <strong>📁 Categoria alterada:</strong> 
              <span style="color: #ef4444;">${recorrentePrev.categoria}</span> 
              <span style="margin: 0 8px;">→</span> 
              <span style="color: #10b981;">${notification.recorrenteCategoria}</span>
            </div>
          `;
      }
      if (recorrenteChanges.includes('descricao') && recorrentePrev?.descricao) {
        recorrenteChangeDetails += `
            <div style="margin-bottom: 8px;">
              <strong>📄 Descrição alterada:</strong> 
              <span style="color: #ef4444;">"${recorrentePrev.descricao}"</span> 
              <span style="margin: 0 8px;">→</span> 
              <span style="color: #10b981;">"${notification.recorrenteDescricao}"</span>
            </div>
          `;
      }
      if (recorrenteChanges.includes('parcelasRestantes') && recorrentePrev?.parcelasRestantes !== undefined) {
        recorrenteChangeDetails += `
            <div style="margin-bottom: 8px;">
              <strong>🔢 Parcelas restantes alteradas:</strong> 
              <span style="color: #ef4444;">${recorrentePrev.parcelasRestantes || 'Ilimitadas'}</span> 
              <span style="margin: 0 8px;">→</span> 
              <span style="color: #10b981;">${notification.recorrenteParcelasRestantes || 'Ilimitadas'}</span>
            </div>
          `;
      }
      if (recorrenteChanges.includes('parcelasTotal') && recorrentePrev?.parcelasTotal !== undefined) {
        recorrenteChangeDetails += `
            <div style="margin-bottom: 8px;">
              <strong>🔢 Total de parcelas alterado:</strong> 
              <span style="color: #ef4444;">${recorrentePrev.parcelasTotal || 'Ilimitadas'}</span> 
              <span style="margin: 0 8px;">→</span> 
              <span style="color: #10b981;">${notification.recorrenteParcelasTotal || 'Ilimitadas'}</span>
            </div>
          `;
      }

      return `
          <div class="notification-modal-message" style="color: ${textColor}; margin-bottom: 12px;">
            <strong>Despesa recorrente atualizada:</strong>
          </div>
          <div class="notification-modal-details" style="color: ${detailsTextColor}; background: ${isDarkTheme ? '#374151' : '#f9fafb'}; padding: 12px; border-radius: 8px; border-left: 4px solid #3b82f6;">
            ${recorrenteChangeDetails || `
              <div style="margin-bottom: 8px;">
                <strong>📝 Nome:</strong> ${notification.recorrenteNome || 'Despesa recorrente'}
              </div>
              <div>
                <strong>💰 Valor:</strong> ${formatCurrency(notification.recorrenteValor)}
              </div>
            `}
          </div>
        `;

    case 'deleted_recorrente':
      const deletedParcelasInfo = notification.recorrenteParcelasTotal && notification.recorrenteParcelasTotal > 1
        ? `<div style="margin-bottom: 8px;">
               <strong>🔢 Parcelas:</strong> ${notification.recorrenteParcelasRestantes || notification.recorrenteParcelasTotal}/${notification.recorrenteParcelasTotal}
             </div>`
        : '';

      return `
          <div class="notification-modal-message" style="color: ${textColor}; margin-bottom: 12px;">
            <strong>Despesa recorrente excluída:</strong>
          </div>
          <div class="notification-modal-details" style="color: ${detailsTextColor}; background: ${isDarkTheme ? '#374151' : '#f9fafb'}; padding: 12px; border-radius: 8px; border-left: 4px solid #ef4444;">
            <div style="margin-bottom: 8px;">
              <strong>📝 Nome:</strong> ${notification.recorrenteNome || 'Despesa recorrente excluída'}
            </div>
            <div style="margin-bottom: 8px;">
              <strong>💰 Valor:</strong> ${formatCurrency(notification.recorrenteValor)}
            </div>
            <div style="margin-bottom: 8px;">
              <strong>📅 Frequência:</strong> ${notification.recorrenteFrequencia || 'Mensal'}
            </div>
            <div style="margin-bottom: 8px;">
              <strong>📁 Categoria:</strong> ${notification.recorrenteCategoria || 'Sem categoria'}
            </div>
            ${deletedParcelasInfo}
            <div>
              <strong>📄 Descrição:</strong> ${notification.recorrenteDescricao || 'Sem descrição'}
            </div>
          </div>
        `;

    case 'test_notification':
      return `
          <div class="notification-modal-message" style="color: ${textColor}; margin-bottom: 12px;">
            <strong>Notificação de teste:</strong>
          </div>
          <div class="notification-modal-details" style="color: ${detailsTextColor}; background: ${isDarkTheme ? '#374151' : '#f9fafb'}; padding: 12px; border-radius: 8px; border-left: 4px solid #8b5cf6;">
            <div>
              <strong>🧪 Mensagem:</strong> ${notification.message || 'Teste do sistema de notificações'}
            </div>
          </div>
        `;

    default:
      return `
          <div class="notification-modal-message" style="color: ${textColor};">
            ${notification.message || 'Você tem uma nova notificação.'}
          </div>
          ${notification.details ? `
            <div class="notification-modal-details" style="color: ${detailsTextColor};">
              <strong>Detalhes:</strong> ${notification.details}
            </div>
          ` : ''}
        `;
    }
  }

  async markAsRead(notificationId) {
    try {
      await markOneAsRead(notificationId);

      // Emitir evento para atualizar a interface
      eventBus.emit('snackbar:show', {
        message: 'Notificação marcada como lida',
        type: 'success',
        duration: 2000
      });
    } catch (error) {
      console.error('[NotificationModal] Erro ao marcar como lida:', error);
      eventBus.emit('snackbar:show', {
        message: 'Erro ao marcar notificação como lida',
        type: 'error',
        duration: 3000
      });
    }
  }

  hide() {
    const modal = document.getElementById('notification-modal');
    if (modal) {
      modal.classList.remove('notification-modal-show');
      // Remove the modal from DOM after animation
      setTimeout(() => {
        if (this.isOpen && this.currentNotification && !this.currentNotification.read) {
          // Mark as read only if it's still the current notification and not already read
          this.markAsRead(this.currentNotification.id);
        }
        modal.remove(); // Remove from DOM
        this.isOpen = false;
        this.currentNotification = null;
      }, 300); // Match CSS transition duration
    }
  }

  close() {
    if (!this.isOpen) {
      console.log('[NotificationModal] ⚠️ Tentativa de fechar modal já fechado');
      return;
    }

    console.log('[NotificationModal] 🔒 Fechando modal...');
    console.log('[NotificationModal] 🔍 Estado antes do fechamento:', {
      isOpen: this.isOpen,
      hasAutoCloseTimer: !!this.autoCloseTimer,
      currentNotification: !!this.currentNotification
    });

    this.isOpen = false;
    this.currentNotification = null;

    const modal = document.getElementById('notification-modal');
    if (modal) {
      modal.classList.remove('notification-modal-show');

      setTimeout(() => {
        modal.style.display = 'none';
        modal.style.opacity = '0';
        modal.style.visibility = 'hidden';
      }, 300);
    }

    // Limpar timer de auto-fechamento
    if (this.autoCloseTimer) {
      clearTimeout(this.autoCloseTimer);
      this.autoCloseTimer = null;
    }
  }

  destroy() {
    this.close();
    const modal = document.getElementById('notification-modal');
    if (modal) {
      modal.remove();
    }
  }
}

// Instância global
let notificationModalInstance = null;

export function getNotificationModal() {
  if (!notificationModalInstance) {
    notificationModalInstance = new NotificationModal();
  }
  return notificationModalInstance;
}

export function showNotificationModal(notification) {
  const modal = getNotificationModal();
  modal.show(notification);
}

export function closeNotificationModal() {
  if (notificationModalInstance) {
    notificationModalInstance.close();
  }
}

export default NotificationModal;
