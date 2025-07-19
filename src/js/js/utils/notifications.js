// Gerenciador de Notificações
class NotificationManager {
  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'notification-container';
    document.body.appendChild(this.container);
  }

  show(message, type = 'info', duration = 5000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;

    const icon = this.getIcon(type);
    notification.innerHTML = `
            ${icon}
            <span>${message}</span>
            <span class="notification-close">&times;</span>
        `;

    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => this.removeNotification(notification));

    this.container.appendChild(notification);

    if (duration > 0) {
      setTimeout(() => this.removeNotification(notification), duration);
    }

    return notification;
  }

  removeNotification(notification) {
    if (notification && notification.parentNode) {
      notification.classList.add('fade-out');
      setTimeout(() => notification.remove(), 500);
    }
  }

  getIcon(type) {
    const icons = {
      info: 'ℹ️',
      success: '✅',
      warning: '⚠️',
      error: '❌',
    };
    return `<span class="notification-icon">${icons[type] || ''}</span>`;
  }
}

// Função global para compatibilidade
function showNotification(message, type = 'info', duration = 5000) {
  if (window.NotificationManager) {
    return window.NotificationManager.show(message, type, duration);
  } else {
    // Fallback simples
    console.log(`${type.toUpperCase()}: ${message}`);
    return null;
  }
}

// Disponibiliza globalmente
window.NotificationManager = NotificationManager;
window.showNotification = showNotification;

console.log('Módulo de notificações carregado');
