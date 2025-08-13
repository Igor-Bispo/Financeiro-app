/**
 * Notifications Clean - Versão melhorada da aba de notificações
 * 
 * Este módulo fornece uma interface melhorada para gerenciar
 * notificações seguindo o padrão visual do dashboard.
 */

/**
 * Renderiza a página de notificações melhorada
 */
export async function renderCleanNotifications() {
  console.log('🔄 Renderizando notificações melhoradas...');
  
  // Aplicar tema
  applyThemeToNotifications();
  
  // Criar container principal
  const container = document.createElement('div');
  container.className = 'notifications-clean';
  
  // Adicionar header
  container.innerHTML = `
    <div class="notifications-header">
      <div class="notifications-title">
        🔔 Notificações
      </div>
      <div class="notifications-actions">
        <button class="btn-notifications success" onclick="markAllNotificationsAsRead()" title="Marcar todas como lidas">
          ✔️
        </button>
      </div>
    </div>
  `;
  
  // Adicionar loader
  const loader = createLoader();
  container.appendChild(loader);
  
  try {
    // Carregar notificações
    await loadNotifications();
    const notifications = window.appState.notifications || [];
    
    // Remover loader
    container.removeChild(loader);
    
    // Renderizar conteúdo
    container.appendChild(renderNotificationsSections(notifications));
    
  } catch (error) {
    console.error('❌ Erro ao carregar notificações:', error);
    container.removeChild(loader);
    container.appendChild(renderErrorState(error.message));
  }
  
  return container;
}

/**
 * Aplica tema às notificações
 */
function applyThemeToNotifications() {
  const themeColor = localStorage.getItem('themeColor') || 'blue';
  const root = document.documentElement;
  root.setAttribute('data-theme-color', themeColor);
  console.log('🎨 Tema aplicado nas notificações:', themeColor);
}

/**
 * Carrega notificações do Firebase
 */
async function loadNotifications() {
  const user = window.appState?.currentUser;
  if (!user) {
    throw new Error('Usuário não autenticado');
  }
  
  try {
    const { collection, getDocs, query, where, limit } = await import('firebase/firestore');
    const { db } = await import('./firebase.js');
    
    const notificationsRef = collection(db, 'notifications');
    const q = query(
      notificationsRef,
      where('recipientId', '==', user.uid),
      limit(50)
    );
    
    const snapshot = await getDocs(q);
    const notifications = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Ordenar localmente por data de criação (mais recente primeiro)
    notifications.sort((a, b) => {
      const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0);
      const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0);
      return dateB - dateA;
    });
    
    // Atualizar estado global
    window.appState.notifications = notifications;
    console.log('📊 Notificações carregadas:', notifications.length);
    
    return notifications;
  } catch (error) {
    console.error('❌ Erro ao carregar notificações:', error);
    throw error;
  }
}

/**
 * Marca uma notificação como lida
 */
async function markNotificationAsRead(notificationId) {
  const user = window.appState?.currentUser;
  if (!user) {
    throw new Error('Usuário não autenticado');
  }
  
  try {
    const { doc, updateDoc } = await import('firebase/firestore');
    const { db } = await import('./firebase.js');
    
    const notificationRef = doc(db, 'notifications', notificationId);
    await updateDoc(notificationRef, {
      read: true,
      readAt: new Date()
    });
    
    // Atualizar estado local
    const notifications = window.appState.notifications || [];
    const index = notifications.findIndex(n => n.id === notificationId);
    if (index !== -1) {
      notifications[index].read = true;
      notifications[index].readAt = new Date();
    }
    
    console.log('✅ Notificação marcada como lida:', notificationId);
    
    // Re-renderizar
    const content = document.getElementById('app-content');
    if (content) {
      const newContainer = await renderCleanNotifications();
      content.innerHTML = '';
      content.appendChild(newContainer);
    }
    
  } catch (error) {
    console.error('❌ Erro ao marcar notificação como lida:', error);
    throw error;
  }
}

/**
 * Marca todas as notificações como lidas
 */
async function markAllNotificationsAsRead() {
  const user = window.appState?.currentUser;
  if (!user) {
    throw new Error('Usuário não autenticado');
  }
  
  try {
    const { collection, getDocs, query, where, writeBatch, doc } = await import('firebase/firestore');
    const { db } = await import('./firebase.js');
    
    const notificationsRef = collection(db, 'notifications');
    const q = query(
      notificationsRef,
      where('recipientId', '==', user.uid)
    );
    
    const snapshot = await getDocs(q);
    const batch = writeBatch(db);
    let updatedCount = 0;
    
    snapshot.docs.forEach(docSnapshot => {
      const data = docSnapshot.data();
      if (!data.read) {
        const notificationRef = doc(db, 'notifications', docSnapshot.id);
        batch.update(notificationRef, {
          read: true,
          readAt: new Date()
        });
        updatedCount++;
      }
    });
    
    if (updatedCount > 0) {
      await batch.commit();
    }
    
    // Atualizar estado local
    const notifications = window.appState.notifications || [];
    notifications.forEach(notification => {
      if (!notification.read) {
        notification.read = true;
        notification.readAt = new Date();
      }
    });
    
    console.log('✅ Todas as notificações marcadas como lidas');
    
    // Re-renderizar
    const content = document.getElementById('app-content');
    if (content) {
      const newContainer = await renderCleanNotifications();
      content.innerHTML = '';
      content.appendChild(newContainer);
    }
    
  } catch (error) {
    console.error('❌ Erro ao marcar todas as notificações como lidas:', error);
    throw error;
  }
}

/**
 * Renderiza seções de notificações
 */
function renderNotificationsSections(notifications) {
  const sections = document.createElement('div');
  sections.className = 'notifications-sections';
  
  // Separar notificações por status
  const unread = notifications.filter(n => !n.read);
  const read = notifications.filter(n => n.read);
  
  // Seção de Notificações Não Lidas
  if (unread.length > 0) {
    sections.appendChild(renderNotificationsSection('Não Lidas', unread, 'unread'));
  }
  
  // Seção de Notificações Lidas
  if (read.length > 0) {
    sections.appendChild(renderNotificationsSection('Lidas', read, 'read'));
  }
  
  // Estado vazio se não há notificações
  if (notifications.length === 0) {
    sections.appendChild(renderEmptyState('Você não tem notificações no momento'));
  }
  
  return sections;
}

/**
 * Renderiza uma seção de notificações
 */
function renderNotificationsSection(title, notifications, type) {
  const section = document.createElement('div');
  section.className = 'notifications-section';
  
  const icon = type === 'unread' ? '🔔' : '📬';
  
  section.innerHTML = `
    <div class="section-header">
      <div class="section-title">
        <div class="section-icon">${icon}</div>
        ${title} (${notifications.length})
      </div>
    </div>
    <div class="section-content">
      ${notifications.map(notification => renderNotificationCard(notification, type)).join('')}
    </div>
  `;
  
  return section;
}

/**
 * Renderiza um card de notificação
 */
function renderNotificationCard(notification, type) {
  const isUnread = !notification.read;
  const transactionTipo = notification.transactionTipo || 'transação';
  const transactionDescricao = notification.transactionDescricao || 'Transação';
  const transactionCategoria = notification.transactionCategoria || 'Categoria';
  const transactionValor = notification.transactionValor || 0;
  const senderName = notification.senderName || 'Usuário';
  const budgetName = notification.budgetName || 'Orçamento';
  
  // Formatar data
  let formattedDate = 'Data não disponível';
  if (notification.createdAt) {
    if (notification.createdAt.toDate) {
      formattedDate = notification.createdAt.toDate().toLocaleString('pt-BR');
    } else if (notification.createdAt instanceof Date) {
      formattedDate = notification.createdAt.toLocaleString('pt-BR');
    } else {
      formattedDate = new Date(notification.createdAt).toLocaleString('pt-BR');
    }
  }
  
  return `
    <div class="notification-card ${isUnread ? 'unread' : ''}">
      <div class="notification-header">
        <div class="notification-icon">
          ${transactionTipo === 'receita' ? '💰' : '💸'}
        </div>
        <div class="notification-info">
          <div class="notification-title">
            Nova ${transactionTipo} no orçamento "${budgetName}"
            ${isUnread ? '<span class="notification-badge">Nova</span>' : ''}
          </div>
          <div class="notification-subtitle">
            ${senderName} adicionou uma ${transactionTipo}
          </div>
        </div>
      </div>
      
      <div class="notification-content">
        <div class="notification-highlight">
          <div class="notification-transaction">
            <div class="transaction-info">
              <div class="transaction-title">${transactionDescricao}</div>
              <div class="transaction-category">${transactionCategoria}</div>
            </div>
            <div class="transaction-value ${transactionTipo === 'receita' ? 'positive' : 'negative'}">
              R$ ${parseFloat(transactionValor).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
      
      <div class="notification-meta">
        <div class="notification-date">
          ${formattedDate}
        </div>
        ${isUnread ? `
          <div class="notification-actions">
            <button class="action-btn success" onclick="markNotificationAsRead('${notification.id}')">
              ✔️ Marcar como lida
            </button>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

/**
 * Cria loader
 */
function createLoader() {
  const loader = document.createElement('div');
  loader.className = 'loading-state';
  loader.innerHTML = `
    <div class="loading-spinner"></div>
    <span>Carregando notificações...</span>
  `;
  return loader;
}

/**
 * Renderiza estado vazio
 */
function renderEmptyState(message) {
  const container = document.createElement('div');
  container.className = 'empty-state';
  container.innerHTML = `
    <div class="empty-icon">🔔</div>
    <div class="empty-title">Nenhuma Notificação</div>
    <div class="empty-description">${message}</div>
  `;
  return container;
}

/**
 * Renderiza estado de erro
 */
function renderErrorState(message) {
  const container = document.createElement('div');
  container.className = 'empty-state';
  container.innerHTML = `
    <div class="empty-icon">❌</div>
    <div class="empty-title">Erro ao Carregar</div>
    <div class="empty-description">${message}</div>
    <button class="empty-btn" onclick="window.location.reload()">
      🔄 Tentar Novamente
    </button>
  `;
  return container;
}

// Adicionar à janela global
window.renderCleanNotifications = renderCleanNotifications;
window.markNotificationAsRead = markNotificationAsRead;
window.markAllNotificationsAsRead = markAllNotificationsAsRead;
