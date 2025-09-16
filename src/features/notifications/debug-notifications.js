// debug-notifications.js - Script para debugar o sistema de notificações

import { eventBus } from '@core/events/eventBus.js';

export async function debugNotificationSystem() {
  console.log('🔍 [DebugNotifications] Iniciando debug do sistema de notificações...');
  
  try {
    // 1. Verificar estado atual
    const currentUser = window.appState?.currentUser;
    const currentBudget = window.appState?.currentBudget;
    const notifications = window.appState?.notifications;
    
    console.log('👤 [DebugNotifications] Usuário atual:', currentUser?.uid);
    console.log('💰 [DebugNotifications] Orçamento atual:', currentBudget?.id, currentBudget?.nome);
    console.log('📧 [DebugNotifications] Notificações atuais:', notifications?.length || 0);
    
    if (!currentUser?.uid) {
      console.error('❌ [DebugNotifications] Usuário não logado!');
      return;
    }
    
    if (!currentBudget?.id) {
      console.error('❌ [DebugNotifications] Nenhum orçamento selecionado!');
      return;
    }
    
    // 2. Verificar dados do orçamento
    const { getById: getBudgetById } = await import('@data/repositories/budgetsRepo.js');
    const budgetData = await getBudgetById(currentBudget.id);
    
    console.log('📊 [DebugNotifications] Dados do orçamento:', {
      id: budgetData?.id,
      nome: budgetData?.nome,
      criadoPor: budgetData?.criadoPor,
      usuariosPermitidos: budgetData?.usuariosPermitidos
    });
    
    // 3. Testar criação de notificação
    console.log('🧪 [DebugNotifications] Testando criação de notificação...');
    
    const { create: createNotification } = await import('@data/repositories/notificationsRepo.js');
    const { serverTimestamp } = await import('firebase/firestore');
    
    // Enviar para o dono do orçamento para teste
    const ownerUid = budgetData?.criadoPor || budgetData?.userId;
    
    const testNotification = {
      type: 'test_notification',
      budgetId: currentBudget.id,
      budgetName: currentBudget.nome || 'Orçamento',
      senderUid: currentUser.uid,
      senderName: currentUser.displayName || currentUser.email || 'Usuário',
      message: `Notificação de teste para debug - Enviada para dono: ${ownerUid}`,
      createdAt: serverTimestamp(),
      read: false,
      recipientUid: ownerUid, // Enviar para o dono do orçamento
    };
    
    console.log('🎯 [DebugNotifications] Enviando notificação para dono:', ownerUid);
    
    const notificationId = await createNotification(testNotification);
    console.log('✅ [DebugNotifications] Notificação de teste criada com ID:', notificationId);
    
    // 4. Aguardar um pouco e verificar se chegou
    setTimeout(async () => {
      console.log('⏳ [DebugNotifications] Verificando se a notificação chegou...');
      
      const { listByRecipient } = await import('@data/repositories/notificationsRepo.js');
      const userNotifications = await listByRecipient(currentUser.uid);
      
      console.log('📧 [DebugNotifications] Notificações do usuário:', userNotifications.length);
      console.log('📧 [DebugNotifications] Detalhes:', userNotifications.map(n => ({
        id: n.id,
        type: n.type,
        message: n.message,
        read: n.read,
        createdAt: n.createdAt
      })));
      
      // 5. Verificar se o listener está funcionando
      console.log('👂 [DebugNotifications] Verificando listener...');
      
      const { listenByRecipient } = await import('@data/repositories/notificationsRepo.js');
      const unsubscribe = listenByRecipient(currentUser.uid, (items) => {
        console.log('📡 [DebugNotifications] Listener recebeu dados:', items.length, 'itens');
        console.log('📡 [DebugNotifications] Detalhes do listener:', items.map(n => ({
          id: n.id,
          type: n.type,
          read: n.read
        })));
        
        // Parar o listener após receber os dados
        unsubscribe();
      });
      
    }, 2000);
    
  } catch (error) {
    console.error('❌ [DebugNotifications] Erro durante debug:', error);
  }
}

// Função para testar envio para usuários compartilhados
export async function debugSharedNotificationTest() {
  console.log('🔍 [DebugSharedNotifications] Testando envio para usuários compartilhados...');
  
  try {
    const currentUser = window.appState?.currentUser;
    const currentBudget = window.appState?.currentBudget;
    
    if (!currentUser?.uid || !currentBudget?.id) {
      console.error('❌ [DebugSharedNotifications] Dados insuficientes para teste');
      return;
    }
    
    // Verificar dados do orçamento
    const { getById: getBudgetById } = await import('@data/repositories/budgetsRepo.js');
    const budgetData = await getBudgetById(currentBudget.id);
    
    console.log('📊 [DebugSharedNotifications] Dados do orçamento:', {
      id: budgetData?.id,
      nome: budgetData?.nome,
      criadoPor: budgetData?.criadoPor,
      usuariosPermitidos: budgetData?.usuariosPermitidos
    });
    
    // Importar e executar a função de teste
    const { sendTestNotificationToShared } = await import('./NotificationService.js');
    
    console.log('📤 [DebugSharedNotifications] Enviando notificação de teste...');
    await sendTestNotificationToShared(currentBudget.id, currentUser.uid);
    
    console.log('✅ [DebugSharedNotifications] Teste de envio concluído');
    console.log('ℹ️ [DebugSharedNotifications] Nota: As notificações só aparecerão para os usuários que estão logados!');
    
  } catch (error) {
    console.error('❌ [DebugSharedNotifications] Erro durante teste:', error);
  }
}

// Função para verificar notificações de outros usuários
export async function debugCheckOtherUserNotifications() {
  console.log('🔍 [DebugOtherUser] Verificando notificações de outros usuários...');
  
  try {
    const currentBudget = window.appState?.currentBudget;
    
    if (!currentBudget?.id) {
      console.error('❌ [DebugOtherUser] Nenhum orçamento selecionado');
      return;
    }
    
    // Verificar dados do orçamento
    const { getById: getBudgetById } = await import('@data/repositories/budgetsRepo.js');
    const budgetData = await getBudgetById(currentBudget.id);
    
    const { listByRecipient } = await import('@data/repositories/notificationsRepo.js');
    
    // Verificar notificações do dono
    const ownerUid = budgetData?.criadoPor || budgetData?.userId;
    if (ownerUid) {
      console.log('👑 [DebugOtherUser] Verificando notificações do dono:', ownerUid);
      const ownerNotifications = await listByRecipient(ownerUid);
      console.log('📧 [DebugOtherUser] Notificações do dono:', ownerNotifications.length);
      console.log('📧 [DebugOtherUser] Detalhes do dono:', ownerNotifications.map(n => ({
        id: n.id,
        type: n.type,
        message: n.message,
        read: n.read,
        senderUid: n.senderUid
      })));
    }
    
    // Verificar notificações dos usuários compartilhados
    const sharedUsers = budgetData?.usuariosPermitidos || [];
    for (const userId of sharedUsers) {
      if (userId && userId !== ownerUid) {
        console.log('👥 [DebugOtherUser] Verificando notificações do usuário:', userId);
        const userNotifications = await listByRecipient(userId);
        console.log('📧 [DebugOtherUser] Notificações do usuário', userId, ':', userNotifications.length);
        console.log('📧 [DebugOtherUser] Detalhes do usuário', userId, ':', userNotifications.map(n => ({
          id: n.id,
          type: n.type,
          message: n.message,
          read: n.read,
          senderUid: n.senderUid
        })));
      }
    }
    
  } catch (error) {
    console.error('❌ [DebugOtherUser] Erro durante verificação:', error);
  }
}

// Função para testar o modal manualmente
export async function debugTestModal() {
  console.log('🧪 [DebugTestModal] Testando modal manualmente...');
  
  try {
    // Verificar se o modal existe no DOM
    let modal = document.getElementById('notification-modal');
    console.log('🔍 [DebugTestModal] Modal no DOM:', !!modal);
    
    // Sempre tentar criar/recriar o modal
    console.log('🏗️ [DebugTestModal] Importando e criando modal...');
    const { getNotificationModal } = await import('./ui/NotificationModal.js');
    const modalInstance = getNotificationModal();
    console.log('📱 [DebugTestModal] Instância do modal obtida:', !!modalInstance);
    
    // Verificar novamente se o modal foi criado no DOM
    modal = document.getElementById('notification-modal');
    console.log('🔍 [DebugTestModal] Modal no DOM após criação:', !!modal);
    
    if (modal) {
      // Criar notificação de teste
      const testNotification = {
        id: 'test-modal-' + Date.now(),
        type: 'test_notification',
        message: 'Teste manual do modal de notificação!',
        details: 'Este é um teste para verificar se o modal está funcionando.',
        read: false,
        createdAt: { toDate: () => new Date() }
      };
      
      console.log('📱 [DebugTestModal] Exibindo modal com notificação de teste...');
      modalInstance.show(testNotification);
      console.log('✅ [DebugTestModal] Modal de teste exibido com sucesso');
      
      // Aguardar um pouco e verificar se o modal está visível
      setTimeout(() => {
        const modalAfterShow = document.getElementById('notification-modal');
        if (modalAfterShow) {
          const computedStyle = window.getComputedStyle(modalAfterShow);
          console.log('🔍 [DebugTestModal] Modal após show():', {
            display: computedStyle.display,
            opacity: computedStyle.opacity,
            visibility: computedStyle.visibility,
            zIndex: computedStyle.zIndex,
            position: computedStyle.position
          });
          
          // Verificar se está realmente visível
          const rect = modalAfterShow.getBoundingClientRect();
          console.log('📐 [DebugTestModal] Modal dimensions:', {
            width: rect.width,
            height: rect.height,
            top: rect.top,
            left: rect.left,
            visible: rect.width > 0 && rect.height > 0
          });
        }
      }, 100);
      
    } else {
      console.error('❌ [DebugTestModal] Modal ainda não foi criado no DOM!');
      
      // Tentar forçar criação do HTML manualmente
      console.log('🔧 [DebugTestModal] Tentando forçar criação do HTML...');
      modalInstance.createModalHTML();
      
      // Verificar mais uma vez
      modal = document.getElementById('notification-modal');
      console.log('🔍 [DebugTestModal] Modal após forçar criação:', !!modal);
      
      if (modal) {
        const testNotification = {
          id: 'test-modal-' + Date.now(),
          type: 'test_notification',
          message: 'Teste manual do modal de notificação (forçado)!',
          details: 'Modal foi criado manualmente para teste.',
          read: false,
          createdAt: { toDate: () => new Date() }
        };
        
        modalInstance.show(testNotification);
        console.log('✅ [DebugTestModal] Modal exibido após criação forçada');
      }
    }
    
  } catch (error) {
    console.error('❌ [DebugTestModal] Erro durante teste:', error);
    console.error('❌ [DebugTestModal] Stack trace:', error.stack);
  }
}

// Função para verificar o estado do sistema
export function debugNotificationState() {
  console.log('🔍 [DebugNotificationState] Estado atual do sistema:');
  
  const state = {
    currentUser: window.appState?.currentUser?.uid,
    currentBudget: window.appState?.currentBudget?.id,
    notifications: window.appState?.notifications?.length || 0,
    notificationModal: !!document.getElementById('notification-modal'),
    eventBus: !!window.eventBus,
    snackbar: !!window.Snackbar
  };
  
  console.log('📊 [DebugNotificationState] Estado:', state);
  
  // Verificar listeners ativos
  const listeners = {
    notificationsUpdated: window.__notifUpdatesListenerBound,
    notificationModal: window.__notificationModalListenerBound
  };
  
  console.log('👂 [DebugNotificationState] Listeners ativos:', listeners);
  
  // Verificar se há notificações não lidas
  const notifications = window.appState?.notifications || [];
  const unreadCount = notifications.filter(n => !n.read && !n.archivedAt).length;
  console.log('📧 [DebugNotificationState] Notificações não lidas:', unreadCount);
  
  // Verificar última notificação
  if (notifications.length > 0) {
    const lastNotification = notifications[0];
    console.log('📧 [DebugNotificationState] Última notificação:', {
      id: lastNotification.id,
      type: lastNotification.type,
      read: lastNotification.read,
      createdAt: lastNotification.createdAt
    });
  }
  
  return state;
}

// Função para testar criação manual de notificação
export async function debugCreateTestNotification() {
  console.log('🧪 [DebugCreateTest] Criando notificação de teste...');
  
  try {
    const currentUser = window.appState?.currentUser;
    const currentBudget = window.appState?.currentBudget;
    
    if (!currentUser?.uid || !currentBudget?.id) {
      console.error('❌ [DebugCreateTest] Usuário ou orçamento não encontrado');
      return;
    }
    
    const { create: createNotification } = await import('@data/repositories/notificationsRepo.js');
    const { serverTimestamp } = await import('firebase/firestore');
    
    const testNotification = {
      type: 'test_notification',
      budgetId: currentBudget.id,
      budgetName: currentBudget.nome || 'Orçamento',
      senderUid: currentUser.uid,
      senderName: currentUser.displayName || currentUser.email || 'Usuário',
      message: `Teste manual criado em ${new Date().toLocaleString('pt-BR')}`,
      details: 'Esta é uma notificação de teste criada manualmente para verificar se o sistema está funcionando.',
      createdAt: serverTimestamp(),
      read: false,
      recipientUid: currentUser.uid, // Enviar para o próprio usuário
    };
    
    console.log('📝 [DebugCreateTest] Dados da notificação:', testNotification);
    
    const notificationId = await createNotification(testNotification);
    console.log('✅ [DebugCreateTest] Notificação de teste criada com ID:', notificationId);
    
    // Aguardar um pouco e verificar se chegou
    setTimeout(() => {
      const notifications = window.appState?.notifications || [];
      const newNotification = notifications.find(n => n.id === notificationId);
      if (newNotification) {
        console.log('✅ [DebugCreateTest] Notificação encontrada no estado local:', newNotification);
      } else {
        console.warn('⚠️ [DebugCreateTest] Notificação não encontrada no estado local ainda');
      }
    }, 2000);
    
  } catch (error) {
    console.error('❌ [DebugCreateTest] Erro ao criar notificação de teste:', error);
  }
}

// Função para testar notificação de recorrente
export async function debugCreateRecorrenteNotification() {
  console.log('🔄 [DebugRecorrente] Criando notificação de recorrente de teste...');
  
  try {
    const currentUser = window.appState?.currentUser;
    const currentBudget = window.appState?.currentBudget;
    
    if (!currentUser?.uid || !currentBudget?.id) {
      console.error('❌ [DebugRecorrente] Usuário ou orçamento não encontrado');
      return;
    }
    
    const { create: createNotification } = await import('@data/repositories/notificationsRepo.js');
    const { serverTimestamp } = await import('firebase/firestore');
    
    const testNotification = {
      type: 'new_recorrente',
      budgetId: currentBudget.id,
      budgetName: currentBudget.nome || 'Orçamento',
      senderUid: currentUser.uid,
      senderName: currentUser.displayName || currentUser.email || 'Usuário',
      recorrenteId: 'test-recorrente-id',
      recorrenteNome: 'Teste de Despesa Recorrente',
      recorrenteValor: 150.00,
      recorrenteFrequencia: 'Mensal',
      recorrenteCategoria: 'Teste',
      recorrenteDescricao: 'Esta é uma despesa recorrente de teste',
      recorrenteParcelasRestantes: 5,
      recorrenteParcelasTotal: 12,
      createdAt: serverTimestamp(),
      read: false,
      recipientUid: currentUser.uid,
    };
    
    console.log('📝 [DebugRecorrente] Dados da notificação:', testNotification);
    
    const notificationId = await createNotification(testNotification);
    console.log('✅ [DebugRecorrente] Notificação de recorrente criada com ID:', notificationId);
    
    // Aguardar um pouco e verificar se chegou
    setTimeout(() => {
      const notifications = window.appState?.notifications || [];
      const newNotification = notifications.find(n => n.id === notificationId);
      if (newNotification) {
        console.log('✅ [DebugRecorrente] Notificação encontrada no estado local:', newNotification);
      } else {
        console.warn('⚠️ [DebugRecorrente] Notificação não encontrada no estado local ainda');
      }
    }, 2000);
    
  } catch (error) {
    console.error('❌ [DebugRecorrente] Erro ao criar notificação de recorrente:', error);
  }
}

// Função para verificar se o modal está funcionando
export async function debugModalStatus() {
  console.log('🔍 [DebugModal] Verificando status do modal...');
  
  const modal = document.getElementById('notification-modal');
  console.log('📱 [DebugModal] Modal no DOM:', !!modal);
  
  if (modal) {
    const computedStyle = window.getComputedStyle(modal);
    console.log('📱 [DebugModal] Estilos do modal:', {
      display: computedStyle.display,
      opacity: computedStyle.opacity,
      visibility: computedStyle.visibility,
      zIndex: computedStyle.zIndex,
      position: computedStyle.position
    });
    
    const rect = modal.getBoundingClientRect();
    console.log('📐 [DebugModal] Dimensões do modal:', {
      width: rect.width,
      height: rect.height,
      top: rect.top,
      left: rect.left,
      visible: rect.width > 0 && rect.height > 0
    });
  }
  
  // Verificar se o listener está ativo
  console.log('👂 [DebugModal] Listener notification:show-modal ativo:', window.__notificationModalListenerBound);
  
  // Verificar se o eventBus está funcionando
  console.log('📡 [DebugModal] EventBus disponível:', !!window.eventBus);
  
  return {
    modalExists: !!modal,
    listenerActive: window.__notificationModalListenerBound,
    eventBusAvailable: !!window.eventBus
  };
}

// Função para testar o modal diretamente
export async function debugTestModalDirect() {
  console.log('🧪 [DebugModalDirect] Testando modal diretamente...');
  
  try {
    const { getNotificationModal } = await import('./ui/NotificationModal.js');
    const modal = getNotificationModal();
    console.log('📱 [DebugModalDirect] Modal obtido:', !!modal);
    
    if (modal) {
      const testNotification = {
        id: 'test-modal-direct',
        type: 'test_notification',
        message: 'Teste direto do modal',
        details: 'Este é um teste direto do modal de notificações',
        createdAt: new Date(),
        read: false,
        senderName: 'Sistema de Debug',
        budgetName: 'Orçamento de Teste'
      };
      
      console.log('📱 [DebugModalDirect] Exibindo modal com notificação de teste...');
      modal.show(testNotification);
      console.log('✅ [DebugModalDirect] Modal exibido com sucesso');
      
      // Verificar se o modal está visível após 1 segundo
      setTimeout(() => {
        const modalElement = document.getElementById('notification-modal');
        if (modalElement) {
          const computedStyle = window.getComputedStyle(modalElement);
          console.log('📱 [DebugModalDirect] Modal após 1s:', {
            display: computedStyle.display,
            opacity: computedStyle.opacity,
            visibility: computedStyle.visibility,
            zIndex: computedStyle.zIndex
          });
          
          const rect = modalElement.getBoundingClientRect();
          console.log('📐 [DebugModalDirect] Dimensões do modal:', {
            width: rect.width,
            height: rect.height,
            visible: rect.width > 0 && rect.height > 0
          });
        } else {
          console.error('❌ [DebugModalDirect] Modal não encontrado no DOM após 1s');
        }
      }, 1000);
      
    } else {
      console.error('❌ [DebugModalDirect] Modal não foi obtido');
    }
    
  } catch (error) {
    console.error('❌ [DebugModalDirect] Erro durante teste direto:', error);
    console.error('❌ [DebugModalDirect] Stack trace:', error.stack);
  }
}

// Função para testar o eventBus diretamente
export async function debugTestEventBus() {
  console.log('📡 [DebugEventBus] Testando eventBus diretamente...');
  
  try {
    if (!window.eventBus) {
      console.error('❌ [DebugEventBus] EventBus não está disponível');
      return;
    }
    
    console.log('📡 [DebugEventBus] EventBus disponível:', !!window.eventBus);
    console.log('📡 [DebugEventBus] Métodos do EventBus:', Object.getOwnPropertyNames(window.eventBus));
    
    // Testar se o listener está ativo
    console.log('👂 [DebugEventBus] Listener ativo:', window.__notificationModalListenerBound);
    
    // Criar notificação de teste
    const testNotification = {
      id: 'test-eventbus',
      type: 'test_notification',
      message: 'Teste via EventBus',
      details: 'Este é um teste via EventBus',
      createdAt: new Date(),
      read: false,
      senderName: 'Sistema de Debug',
      budgetName: 'Orçamento de Teste'
    };
    
    console.log('📡 [DebugEventBus] Emitindo evento notification:show-modal...');
    window.eventBus.emit('notification:show-modal', testNotification);
    console.log('✅ [DebugEventBus] Evento emitido com sucesso');
    
  } catch (error) {
    console.error('❌ [DebugEventBus] Erro durante teste do EventBus:', error);
    console.error('❌ [DebugEventBus] Stack trace:', error.stack);
  }
}

// Função para verificar se o sistema de notificações está funcionando
export async function debugCheckNotificationSystem() {
  console.log('🔍 [DebugSystem] Verificando sistema de notificações...');
  
  try {
    // 1. Verificar estado do app
    console.log('📊 [DebugSystem] Estado do app:', {
      hasAppState: !!window.appState,
      hasCurrentUser: !!window.appState?.currentUser,
      hasCurrentBudget: !!window.appState?.currentBudget,
      hasNotifications: !!window.appState?.notifications,
      notificationsCount: window.appState?.notifications?.length || 0
    });
    
    // 2. Verificar EventBus
    console.log('📡 [DebugSystem] EventBus:', {
      hasEventBus: !!window.eventBus,
      hasOnMethod: !!window.eventBus?.on,
      hasEmitMethod: !!window.eventBus?.emit
    });
    
    // 3. Verificar listener de notificações
    const notifCtl = window.__notifCtl;
    console.log('👂 [DebugSystem] Controller de notificações:', {
      hasController: !!notifCtl,
      hasUnsub: !!notifCtl?.unsub,
      currentUid: notifCtl?.uid,
      lastIdsCount: notifCtl?.lastIds?.size || 0
    });
    
    // 4. Verificar preferências
    const userId = window.appState?.currentUser?.uid;
    if (userId) {
      try {
        const { getUserPrefs } = await import('@features/notifications/notificationsController.js');
        const prefs = await getUserPrefs(userId);
        console.log('⚙️ [DebugSystem] Preferências do usuário:', prefs);
      } catch (e) {
        console.warn('⚠️ [DebugSystem] Erro ao obter preferências:', e);
      }
    }
    
    // 5. Verificar modal
    const modal = document.getElementById('notification-modal');
    console.log('📱 [DebugSystem] Modal:', {
      exists: !!modal,
      visible: modal ? modal.style.display !== 'none' : false,
      hasContent: modal ? modal.innerHTML.length > 0 : false
    });
    
    // 6. Testar criação de notificação simples
    console.log('🧪 [DebugSystem] Testando criação de notificação...');
    const { create: createNotification } = await import('@data/repositories/notificationsRepo.js');
    const { serverTimestamp } = await import('firebase/firestore');
    
    const testNotification = {
      type: 'test_notification',
      budgetId: window.appState?.currentBudget?.id,
      budgetName: window.appState?.currentBudget?.nome || 'Orçamento',
      senderUid: window.appState?.currentUser?.uid,
      senderName: window.appState?.currentUser?.displayName || 'Usuário',
      message: 'Teste de sistema de notificações',
      createdAt: serverTimestamp(),
      read: false,
      recipientUid: window.appState?.currentUser?.uid,
    };
    
    const notificationId = await createNotification(testNotification);
    console.log('✅ [DebugSystem] Notificação de teste criada com ID:', notificationId);
    
    // 7. Aguardar e verificar se chegou
    setTimeout(() => {
      const notifications = window.appState?.notifications || [];
      const newNotification = notifications.find(n => n.id === notificationId);
      if (newNotification) {
        console.log('✅ [DebugSystem] Notificação de teste encontrada no estado local');
        console.log('📝 [DebugSystem] Dados da notificação:', newNotification);
      } else {
        console.warn('⚠️ [DebugSystem] Notificação de teste não encontrada no estado local');
      }
    }, 3000);
    
  } catch (error) {
    console.error('❌ [DebugSystem] Erro durante verificação:', error);
    console.error('❌ [DebugSystem] Stack trace:', error.stack);
  }
}

// Função para testar se as notificações estão sendo enviadas para transações
export async function debugTestTransactionNotification() {
  console.log('💳 [DebugTransaction] Testando notificação de transação...');
  
  try {
    const currentUser = window.appState?.currentUser;
    const currentBudget = window.appState?.currentBudget;
    
    if (!currentUser?.uid || !currentBudget?.id) {
      console.error('❌ [DebugTransaction] Usuário ou orçamento não encontrado');
      return;
    }
    
    // Simular criação de transação
    const { create: createNotification } = await import('@data/repositories/notificationsRepo.js');
    const { serverTimestamp } = await import('firebase/firestore');
    
    const testNotification = {
      type: 'new_transaction',
      budgetId: currentBudget.id,
      budgetName: currentBudget.nome || 'Orçamento',
      senderUid: currentUser.uid,
      senderName: currentUser.displayName || currentUser.email || 'Usuário',
      transactionId: 'test-transaction-id',
      transactionDescricao: 'Teste de transação',
      transactionValor: 100.00,
      transactionTipo: 'despesa',
      transactionCategoria: 'Teste',
      createdAt: serverTimestamp(),
      read: false,
      recipientUid: currentUser.uid,
    };
    
    console.log('📝 [DebugTransaction] Dados da notificação:', testNotification);
    
    const notificationId = await createNotification(testNotification);
    console.log('✅ [DebugTransaction] Notificação de transação criada com ID:', notificationId);
    
    // Aguardar e verificar se chegou
    setTimeout(() => {
      const notifications = window.appState?.notifications || [];
      const newNotification = notifications.find(n => n.id === notificationId);
      if (newNotification) {
        console.log('✅ [DebugTransaction] Notificação encontrada no estado local:', newNotification);
      } else {
        console.warn('⚠️ [DebugTransaction] Notificação não encontrada no estado local ainda');
      }
    }, 2000);
    
  } catch (error) {
    console.error('❌ [DebugTransaction] Erro ao criar notificação de transação:', error);
  }
}

// Função para testar notificações de edição e exclusão de recorrentes
export async function debugTestRecurringEditDelete() {
  console.log('🔄 [DebugRecurringEditDelete] Testando notificações de edição e exclusão...');
  
  try {
    const currentUser = window.appState?.currentUser;
    const currentBudget = window.appState?.currentBudget;
    
    if (!currentUser?.uid || !currentBudget?.id) {
      console.error('❌ [DebugRecurringEditDelete] Usuário ou orçamento não encontrado');
      return;
    }
    
    console.log('📊 [DebugRecurringEditDelete] Dados do orçamento:', {
      id: currentBudget.id,
      nome: currentBudget.nome,
      usuariosPermitidos: currentBudget.usuariosPermitidos,
      usuariosPermitidosCount: currentBudget.usuariosPermitidos?.length || 0
    });
    
    // Testar notificação de edição
    console.log('✏️ [DebugRecurringEditDelete] Testando notificação de edição...');
    const { create: createNotification } = await import('@data/repositories/notificationsRepo.js');
    const { serverTimestamp } = await import('firebase/firestore');
    
    const editNotification = {
      type: 'updated_recorrente',
      budgetId: currentBudget.id,
      budgetName: currentBudget.nome || 'Orçamento',
      senderUid: currentUser.uid,
      senderName: currentUser.displayName || currentUser.email || 'Usuário',
      recorrenteId: 'test-edit-recorrente-id',
      recorrenteNome: 'Despesa Recorrente Editada',
      recorrenteValor: 200.00,
      recorrenteFrequencia: 'mensal',
      recorrenteCategoria: 'Teste',
      recorrenteDescricao: 'Esta despesa foi editada',
      recorrenteParcelasRestantes: 3,
      recorrenteParcelasTotal: 6,
      changes: {
        valor: { from: 150.00, to: 200.00 },
        parcelasRestantes: { from: 5, to: 3 }
      },
      prev: {
        nome: 'Despesa Recorrente Editada',
        valor: 150.00,
        frequencia: 'mensal',
        categoria: 'Teste',
        descricao: 'Esta despesa foi editada',
        parcelasRestantes: 5,
        parcelasTotal: 6
      },
      createdAt: serverTimestamp(),
      read: false,
      recipientUid: currentUser.uid, // Enviar para o próprio usuário para teste
    };
    
    console.log('📝 [DebugRecurringEditDelete] Dados da notificação de edição:', editNotification);
    
    const editNotificationId = await createNotification(editNotification);
    console.log('✅ [DebugRecurringEditDelete] Notificação de edição criada com ID:', editNotificationId);
    
    // Testar notificação de exclusão
    console.log('🗑️ [DebugRecurringEditDelete] Testando notificação de exclusão...');
    
    const deleteNotification = {
      type: 'deleted_recorrente',
      budgetId: currentBudget.id,
      budgetName: currentBudget.nome || 'Orçamento',
      senderUid: currentUser.uid,
      senderName: currentUser.displayName || currentUser.email || 'Usuário',
      recorrenteId: 'test-delete-recorrente-id',
      recorrenteNome: 'Despesa Recorrente Excluída',
      recorrenteValor: 100.00,
      recorrenteFrequencia: 'mensal',
      recorrenteCategoria: 'Teste',
      recorrenteDescricao: 'Esta despesa foi excluída',
      recorrenteParcelasRestantes: 2,
      recorrenteParcelasTotal: 4,
      createdAt: serverTimestamp(),
      read: false,
      recipientUid: currentUser.uid, // Enviar para o próprio usuário para teste
    };
    
    console.log('📝 [DebugRecurringEditDelete] Dados da notificação de exclusão:', deleteNotification);
    
    const deleteNotificationId = await createNotification(deleteNotification);
    console.log('✅ [DebugRecurringEditDelete] Notificação de exclusão criada com ID:', deleteNotificationId);
    
    // Aguardar e verificar se chegaram
    setTimeout(() => {
      const notifications = window.appState?.notifications || [];
      const editNotification = notifications.find(n => n.id === editNotificationId);
      const deleteNotification = notifications.find(n => n.id === deleteNotificationId);
      
      if (editNotification) {
        console.log('✅ [DebugRecurringEditDelete] Notificação de edição encontrada:', editNotification);
      } else {
        console.warn('⚠️ [DebugRecurringEditDelete] Notificação de edição não encontrada');
      }
      
      if (deleteNotification) {
        console.log('✅ [DebugRecurringEditDelete] Notificação de exclusão encontrada:', deleteNotification);
      } else {
        console.warn('⚠️ [DebugRecurringEditDelete] Notificação de exclusão não encontrada');
      }
    }, 3000);
    
  } catch (error) {
    console.error('❌ [DebugRecurringEditDelete] Erro durante teste:', error);
  }
}

// Função para diagnóstico completo do sistema de notificações
export async function debugFullNotificationDiagnosis() {
  console.log('🔍 [DebugFullDiagnosis] Iniciando diagnóstico completo do sistema de notificações...');
  
  try {
    // 1. Verificar estado básico
    console.log('📊 [DebugFullDiagnosis] === ESTADO BÁSICO ===');
    console.log('App State:', {
      hasAppState: !!window.appState,
      hasCurrentUser: !!window.appState?.currentUser,
      hasCurrentBudget: !!window.appState?.currentBudget,
      currentUserId: window.appState?.currentUser?.uid,
      currentBudgetId: window.appState?.currentBudget?.id,
      currentBudgetName: window.appState?.currentBudget?.nome,
      usuariosPermitidos: window.appState?.currentBudget?.usuariosPermitidos,
      usuariosCount: window.appState?.currentBudget?.usuariosPermitidos?.length || 0
    });
    
    // 2. Verificar EventBus
    console.log('📡 [DebugFullDiagnosis] === EVENTBUS ===');
    console.log('EventBus:', {
      exists: !!window.eventBus,
      hasOn: !!window.eventBus?.on,
      hasEmit: !!window.eventBus?.emit,
      hasOff: !!window.eventBus?.off
    });
    
    // 3. Verificar controller de notificações
    console.log('👂 [DebugFullDiagnosis] === CONTROLLER DE NOTIFICAÇÕES ===');
    const notifCtl = window.__notifCtl;
    console.log('Controller:', {
      exists: !!notifCtl,
      hasUnsub: !!notifCtl?.unsub,
      currentUid: notifCtl?.uid,
      lastIdsCount: notifCtl?.lastIds?.size || 0,
      lastSeenAt: notifCtl?.lastSeenAt
    });
    
    // 4. Verificar estado das notificações
    console.log('📧 [DebugFullDiagnosis] === ESTADO DAS NOTIFICAÇÕES ===');
    const notifications = window.appState?.notifications || [];
    console.log('Notificações:', {
      count: notifications.length,
      unreadCount: notifications.filter(n => !n.read).length,
      types: [...new Set(notifications.map(n => n.type))],
      recent: notifications.slice(-3).map(n => ({ id: n.id, type: n.type, read: n.read, createdAt: n.createdAt }))
    });
    
    // 5. Verificar modal
    console.log('📱 [DebugFullDiagnosis] === MODAL ===');
    const modal = document.getElementById('notification-modal');
    console.log('Modal:', {
      exists: !!modal,
      visible: modal ? modal.style.display !== 'none' : false,
      hasContent: modal ? modal.innerHTML.length > 0 : false,
      classes: modal ? modal.className : null
    });
    
    // 6. Testar criação de notificação simples
    console.log('🧪 [DebugFullDiagnosis] === TESTE DE CRIAÇÃO ===');
    try {
      const { create: createNotification } = await import('@data/repositories/notificationsRepo.js');
      const { serverTimestamp } = await import('firebase/firestore');
      
      const testNotification = {
        type: 'test_notification',
        budgetId: window.appState?.currentBudget?.id,
        budgetName: window.appState?.currentBudget?.nome || 'Orçamento',
        senderUid: window.appState?.currentUser?.uid,
        senderName: window.appState?.currentUser?.displayName || 'Usuário',
        message: 'Teste de diagnóstico completo',
        createdAt: serverTimestamp(),
        read: false,
        recipientUid: window.appState?.currentUser?.uid,
      };
      
      console.log('📝 [DebugFullDiagnosis] Criando notificação de teste...');
      const notificationId = await createNotification(testNotification);
      console.log('✅ [DebugFullDiagnosis] Notificação criada com ID:', notificationId);
      
      // 7. Aguardar e verificar se chegou
      setTimeout(() => {
        console.log('⏰ [DebugFullDiagnosis] Verificando se a notificação chegou...');
        const updatedNotifications = window.appState?.notifications || [];
        const newNotification = updatedNotifications.find(n => n.id === notificationId);
        
        if (newNotification) {
          console.log('✅ [DebugFullDiagnosis] Notificação encontrada no estado local:', newNotification);
        } else {
          console.warn('⚠️ [DebugFullDiagnosis] Notificação não encontrada no estado local');
          console.log('📊 [DebugFullDiagnosis] Estado atual das notificações:', updatedNotifications.length, 'itens');
        }
      }, 3000);
      
    } catch (error) {
      console.error('❌ [DebugFullDiagnosis] Erro ao criar notificação de teste:', error);
    }
    
    // 8. Verificar preferências do usuário
    console.log('⚙️ [DebugFullDiagnosis] === PREFERÊNCIAS ===');
    try {
      const { getUserPrefs } = await import('@features/notifications/notificationsController.js');
      const prefs = await getUserPrefs(window.appState?.currentUser?.uid);
      console.log('Preferências:', prefs);
    } catch (e) {
      console.warn('⚠️ [DebugFullDiagnosis] Erro ao obter preferências:', e);
    }
    
    // 9. Verificar localStorage
    console.log('💾 [DebugFullDiagnosis] === LOCALSTORAGE ===');
    const relevantKeys = [
      'notification_use_modal',
      'notification_toasts_enabled',
      'notification_types_enabled',
      'notification_period_filter'
    ];
    
    relevantKeys.forEach(key => {
      const value = localStorage.getItem(key);
      console.log(`${key}:`, value);
    });
    
    console.log('✅ [DebugFullDiagnosis] Diagnóstico completo finalizado!');
    
  } catch (error) {
    console.error('❌ [DebugFullDiagnosis] Erro durante diagnóstico:', error);
    console.error('❌ [DebugFullDiagnosis] Stack trace:', error.stack);
  }
}

// Função para testar o EventBus e o sistema de eventos
export async function debugTestEventBusSystem() {
  console.log('📡 [DebugEventBusSystem] Testando sistema de EventBus...');
  
  try {
    // 1. Verificar se o EventBus existe
    if (!window.eventBus) {
      console.error('❌ [DebugEventBusSystem] EventBus não está disponível');
      return;
    }
    
    console.log('✅ [DebugEventBusSystem] EventBus encontrado');
    
    // 2. Testar emissão de evento simples
    console.log('🧪 [DebugEventBusSystem] Testando emissão de evento simples...');
    let eventReceived = false;
    
    // Criar listener temporário
    const testListener = (data) => {
      console.log('✅ [DebugEventBusSystem] Evento de teste recebido:', data);
      eventReceived = true;
    };
    
    window.eventBus.on('test-event', testListener);
    
    // Emitir evento
    window.eventBus.emit('test-event', { message: 'Teste do EventBus', timestamp: Date.now() });
    
    // Aguardar um pouco
    setTimeout(() => {
      if (eventReceived) {
        console.log('✅ [DebugEventBusSystem] EventBus está funcionando corretamente');
      } else {
        console.warn('⚠️ [DebugEventBusSystem] Evento não foi recebido');
      }
      
      // Remover listener temporário
      window.eventBus.off('test-event', testListener);
    }, 1000);
    
    // 3. Testar evento de notificação
    console.log('📱 [DebugEventBusSystem] Testando evento de notificação...');
    
    const testNotification = {
      id: 'test-eventbus-notification',
      type: 'test_notification',
      message: 'Teste do EventBus para notificações',
      createdAt: new Date(),
      read: false
    };
    
    // Emitir evento de notificação
    window.eventBus.emit('notification:show-modal', testNotification);
    console.log('📤 [DebugEventBusSystem] Evento notification:show-modal emitido');
    
    // 4. Verificar se o listener global está ativo
    console.log('🔍 [DebugEventBusSystem] Verificando listener global...');
    console.log('Listener global ativo:', !!window.__notificationModalListenerBound);
    
    // 5. Testar outros eventos relacionados
    console.log('🔄 [DebugEventBusSystem] Testando outros eventos...');
    
    const testEvents = [
      'notifications:updated',
      'snackbar:show',
      'transactions:updated',
      'categories:updated'
    ];
    
    testEvents.forEach(eventName => {
      try {
        window.eventBus.emit(eventName, { test: true, timestamp: Date.now() });
        console.log(`✅ [DebugEventBusSystem] Evento ${eventName} emitido com sucesso`);
      } catch (error) {
        console.error(`❌ [DebugEventBusSystem] Erro ao emitir evento ${eventName}:`, error);
      }
    });
    
  } catch (error) {
    console.error('❌ [DebugEventBusSystem] Erro durante teste do EventBus:', error);
  }
}

// Função para testar notificação de recorrente com todos os campos
export async function debugTestRecurringNotificationComplete() {
  console.log('🔄 [DebugRecurringComplete] Testando notificação de recorrente completa...');
  
  try {
    const currentUser = window.appState?.currentUser;
    const currentBudget = window.appState?.currentBudget;
    
    if (!currentUser?.uid || !currentBudget?.id) {
      console.error('❌ [DebugRecurringComplete] Usuário ou orçamento não encontrado');
      return;
    }
    
    const { create: createNotification } = await import('@data/repositories/notificationsRepo.js');
    const { serverTimestamp } = await import('firebase/firestore');
    
    const testNotification = {
      type: 'new_recorrente',
      budgetId: currentBudget.id,
      budgetName: currentBudget.nome || 'Orçamento',
      senderUid: currentUser.uid,
      senderName: currentUser.displayName || currentUser.email || 'Usuário',
      recorrenteId: 'test-recorrente-complete-id',
      recorrenteNome: 'Despesa Recorrente Completa',
      recorrenteValor: 250.00,
      recorrenteFrequencia: 'mensal',
      recorrenteCategoria: 'Teste Completo',
      recorrenteDescricao: 'Esta é uma despesa recorrente de teste completa',
      recorrenteParcelasRestantes: 8,
      recorrenteParcelasTotal: 12,
      createdAt: serverTimestamp(),
      read: false,
      recipientUid: currentUser.uid,
    };
    
    console.log('📝 [DebugRecurringComplete] Dados da notificação:', testNotification);
    console.log('🔍 [DebugRecurringComplete] Campos de parcelas:', {
      parcelasRestantes: testNotification.recorrenteParcelasRestantes,
      parcelasTotal: testNotification.recorrenteParcelasTotal,
      temParcelas: testNotification.recorrenteParcelasTotal > 1
    });
    
    const notificationId = await createNotification(testNotification);
    console.log('✅ [DebugRecurringComplete] Notificação de recorrente criada com ID:', notificationId);
    
    // Aguardar e verificar se chegou
    setTimeout(() => {
      const notifications = window.appState?.notifications || [];
      const newNotification = notifications.find(n => n.id === notificationId);
      
      if (newNotification) {
        console.log('✅ [DebugRecurringComplete] Notificação encontrada no estado local:', newNotification);
        console.log('🔍 [DebugRecurringComplete] Campos de parcelas na notificação recebida:', {
          parcelasRestantes: newNotification.recorrenteParcelasRestantes,
          parcelasTotal: newNotification.recorrenteParcelasTotal,
          temParcelas: newNotification.recorrenteParcelasTotal > 1
        });
        console.log('📅 [DebugRecurringComplete] Data da notificação:', newNotification.createdAt);
        console.log('📊 [DebugRecurringComplete] Posição na lista:', notifications.findIndex(n => n.id === notificationId));
      } else {
        console.warn('⚠️ [DebugRecurringComplete] Notificação não encontrada no estado local');
      }
    }, 3000);
    
  } catch (error) {
    console.error('❌ [DebugRecurringComplete] Erro ao criar notificação de recorrente:', error);
  }
}

// Função para testar o EventBus e modal
export async function debugEventBusAndModal() {
  console.log('🔍 [DebugEventBus] Verificando EventBus e Modal...');
  
  // Verificar EventBus
  console.log('🔍 [DebugEventBus] window.eventBus:', !!window.eventBus);
  console.log('🔍 [DebugEventBus] window.eventBus.emit:', typeof window.eventBus?.emit);
  console.log('🔍 [DebugEventBus] window.eventBus.on:', typeof window.eventBus?.on);
  console.log('🔍 [DebugEventBus] window.__notificationModalListenerBound:', window.__notificationModalListenerBound);
  
  // Testar EventBus
  if (window.eventBus && typeof window.eventBus.emit === 'function') {
    const testNotification = {
      id: 'test-' + Date.now(),
      type: 'new_transaction',
      message: 'Teste de EventBus',
      transactionDescricao: 'Teste de transação',
      transactionValor: 100.50,
      createdAt: new Date(),
      read: false
    };
    
    console.log('📤 [DebugEventBus] Emitindo evento notification:show-modal...');
    window.eventBus.emit('notification:show-modal', testNotification);
    console.log('✅ [DebugEventBus] Evento emitido');
  } else {
    console.error('❌ [DebugEventBus] EventBus não disponível');
  }
}

// Função específica para debug em produção
export async function debugProductionModal() {
  console.log('🏭 [DebugProduction] === DIAGNÓSTICO DE PRODUÇÃO ===');
  
  // 1. Verificar ambiente
  console.log('🌍 [DebugProduction] Ambiente:', {
    isProduction: import.meta.env?.PROD || false,
    isDevelopment: import.meta.env?.DEV || false,
    userAgent: navigator.userAgent,
    location: window.location.href
  });
  
  // 2. Verificar EventBus
  console.log('📡 [DebugProduction] EventBus:', {
    exists: !!window.eventBus,
    hasOn: !!window.eventBus?.on,
    hasEmit: !!window.eventBus?.emit,
    listenerBound: !!window.__notificationModalListenerBound
  });
  
  // 3. Verificar modal no DOM
  const modal = document.getElementById('notification-modal');
  console.log('📱 [DebugProduction] Modal DOM:', {
    exists: !!modal,
    inDocument: document.contains(modal),
    display: modal ? window.getComputedStyle(modal).display : 'N/A',
    visibility: modal ? window.getComputedStyle(modal).visibility : 'N/A',
    opacity: modal ? window.getComputedStyle(modal).opacity : 'N/A',
    zIndex: modal ? window.getComputedStyle(modal).zIndex : 'N/A'
  });
  
  // 4. Verificar CSS
  const modalCSS = document.querySelector('link[href*="notification-modal"]') || 
                   document.querySelector('style[data-notification-modal]');
  console.log('🎨 [DebugProduction] CSS Modal:', {
    cssLoaded: !!modalCSS,
    cssHref: modalCSS?.href || 'N/A'
  });
  
  // 5. Testar importação do modal
  try {
    console.log('📦 [DebugProduction] Testando importação do modal...');
    const { getNotificationModal } = await import('@features/notifications/ui/NotificationModal.js');
    const modalInstance = getNotificationModal();
    console.log('✅ [DebugProduction] Modal importado:', !!modalInstance);
    console.log('✅ [DebugProduction] Modal show method:', typeof modalInstance?.show);
  } catch (error) {
    console.error('❌ [DebugProduction] Erro ao importar modal:', error);
  }
  
  // 6. Testar evento
  if (window.eventBus) {
    console.log('📤 [DebugProduction] Testando evento...');
    const testNotification = {
      id: 'test-production-' + Date.now(),
      type: 'test_notification',
      message: 'Teste de Produção',
      createdAt: new Date(),
      read: false
    };
    
    window.eventBus.emit('notification:show-modal', testNotification);
    console.log('✅ [DebugProduction] Evento emitido');
    
    // Verificar se o modal apareceu após 1 segundo
    setTimeout(() => {
      const modalAfter = document.getElementById('notification-modal');
      console.log('📱 [DebugProduction] Modal após evento:', {
        exists: !!modalAfter,
        display: modalAfter ? window.getComputedStyle(modalAfter).display : 'N/A',
        visibility: modalAfter ? window.getComputedStyle(modalAfter).visibility : 'N/A',
        opacity: modalAfter ? window.getComputedStyle(modalAfter).opacity : 'N/A'
      });
    }, 1000);
  }
  
  console.log('🏭 [DebugProduction] === FIM DO DIAGNÓSTICO ===');
}

// Função para testar o modal diretamente
export async function debugTestModalDirectly() {
  console.log('📱 [DebugModalDirect] Testando modal diretamente...');
  
  try {
    // 1. Verificar se o modal existe no DOM
    let modal = document.getElementById('notification-modal');
    console.log('🔍 [DebugModalDirect] Modal no DOM:', !!modal);
    
    if (!modal) {
      console.log('🔧 [DebugModalDirect] Modal não existe, criando...');
      // Importar e criar o modal
      const { getNotificationModal } = await import('@features/notifications/ui/NotificationModal.js');
      modal = getNotificationModal();
      console.log('✅ [DebugModalDirect] Modal criado:', !!modal);
    }
    
    // 2. Verificar se o modal está visível
    if (modal) {
      console.log('📊 [DebugModalDirect] Estado do modal:', {
        exists: !!modal,
        visible: modal.style.display !== 'none',
        hasContent: modal.innerHTML.length > 0,
        classes: modal.className
      });
    }
    
    // 3. Criar notificação de teste
    const testNotification = {
      id: 'test-modal-direct',
      type: 'test_notification',
      message: 'Teste direto do modal',
      createdAt: new Date(),
      read: false,
      senderName: 'Sistema de Teste',
      budgetName: 'Orçamento de Teste'
    };
    
    console.log('📝 [DebugModalDirect] Notificação de teste:', testNotification);
    
    // 4. Tentar mostrar o modal diretamente
    if (modal) {
      console.log('🚀 [DebugModalDirect] Tentando mostrar modal...');
      
      // Importar a função show do modal
      const { getNotificationModal } = await import('@features/notifications/ui/NotificationModal.js');
      const modalInstance = getNotificationModal();
      
      if (modalInstance && typeof modalInstance.show === 'function') {
        console.log('✅ [DebugModalDirect] Função show encontrada, executando...');
        modalInstance.show(testNotification);
        console.log('✅ [DebugModalDirect] Modal.show() executado');
        
        // Verificar se o modal ficou visível
        setTimeout(() => {
          const updatedModal = document.getElementById('notification-modal');
          if (updatedModal) {
            console.log('📊 [DebugModalDirect] Estado após show():', {
              visible: updatedModal.style.display !== 'none',
              hasContent: updatedModal.innerHTML.length > 0,
              opacity: updatedModal.style.opacity,
              zIndex: updatedModal.style.zIndex
            });
          }
        }, 1000);
        
      } else {
        console.error('❌ [DebugModalDirect] Função show não encontrada no modal');
      }
    }
    
    // 5. Testar via EventBus
    console.log('📡 [DebugModalDirect] Testando via EventBus...');
    if (window.eventBus) {
      console.log('✅ [DebugModalDirect] EventBus encontrado, emitindo evento...');
      window.eventBus.emit('notification:show-modal', testNotification);
      console.log('✅ [DebugModalDirect] Evento notification:show-modal emitido');
      
      // Verificar se o modal ficou visível
      setTimeout(() => {
        const updatedModal = document.getElementById('notification-modal');
        if (updatedModal) {
          console.log('📊 [DebugModalDirect] Estado após EventBus:', {
            visible: updatedModal.style.display !== 'none',
            hasContent: updatedModal.innerHTML.length > 0,
            opacity: updatedModal.style.opacity,
            zIndex: updatedModal.style.zIndex
          });
        }
      }, 1000);
    } else {
      console.error('❌ [DebugModalDirect] EventBus não encontrado');
    }
    
  } catch (error) {
    console.error('❌ [DebugModalDirect] Erro durante teste:', error);
    console.error('❌ [DebugModalDirect] Stack trace:', error.stack);
  }
}

// Função para diagnóstico completo do sistema de notificações e modal
export async function debugCompleteSystemDiagnosis() {
  console.log('🔍 [DebugCompleteSystem] Iniciando diagnóstico completo do sistema...');
  
  try {
    // 1. Verificar estado básico
    console.log('📊 [DebugCompleteSystem] === ESTADO BÁSICO ===');
    console.log('App State:', {
      hasAppState: !!window.appState,
      hasCurrentUser: !!window.appState?.currentUser,
      hasCurrentBudget: !!window.appState?.currentBudget,
      currentUserId: window.appState?.currentUser?.uid,
      currentBudgetId: window.appState?.currentBudget?.id,
      currentBudgetName: window.appState?.currentBudget?.nome,
      usuariosPermitidos: window.appState?.currentBudget?.usuariosPermitidos,
      usuariosCount: window.appState?.currentBudget?.usuariosPermitidos?.length || 0
    });
    
    // 2. Verificar EventBus
    console.log('📡 [DebugCompleteSystem] === EVENTBUS ===');
    console.log('EventBus:', {
      exists: !!window.eventBus,
      hasOn: !!window.eventBus?.on,
      hasEmit: !!window.eventBus?.emit,
      hasOff: !!window.eventBus?.off
    });
    
    // 3. Verificar controller de notificações
    console.log('👂 [DebugCompleteSystem] === CONTROLLER DE NOTIFICAÇÕES ===');
    const notifCtl = window.__notifCtl;
    console.log('Controller:', {
      exists: !!notifCtl,
      hasUnsub: !!notifCtl?.unsub,
      currentUid: notifCtl?.uid,
      lastIdsCount: notifCtl?.lastIds?.size || 0,
      lastSeenAt: notifCtl?.lastSeenAt
    });
    
    // 4. Verificar estado das notificações
    console.log('📧 [DebugCompleteSystem] === ESTADO DAS NOTIFICAÇÕES ===');
    const notifications = window.appState?.notifications || [];
    console.log('Notificações:', {
      count: notifications.length,
      unreadCount: notifications.filter(n => !n.read).length,
      types: [...new Set(notifications.map(n => n.type))],
      recent: notifications.slice(-3).map(n => ({ id: n.id, type: n.type, read: n.read, createdAt: n.createdAt }))
    });
    
    // 5. Verificar modal
    console.log('📱 [DebugCompleteSystem] === MODAL ===');
    const modal = document.getElementById('notification-modal');
    console.log('Modal:', {
      exists: !!modal,
      visible: modal ? modal.style.display !== 'none' : false,
      hasContent: modal ? modal.innerHTML.length > 0 : false,
      classes: modal ? modal.className : null
    });
    
    // 6. Verificar listener global
    console.log('🎧 [DebugCompleteSystem] === LISTENER GLOBAL ===');
    console.log('Listener Global:', {
      bound: !!window.__notificationModalListenerBound,
      eventBusExists: !!window.eventBus
    });
    
    // 7. Testar criação de notificação
    console.log('🧪 [DebugCompleteSystem] === TESTE DE CRIAÇÃO ===');
    try {
      const { create: createNotification } = await import('@data/repositories/notificationsRepo.js');
      const { serverTimestamp } = await import('firebase/firestore');
      
      const testNotification = {
        type: 'test_notification',
        budgetId: window.appState?.currentBudget?.id,
        budgetName: window.appState?.currentBudget?.nome || 'Orçamento',
        senderUid: window.appState?.currentUser?.uid,
        senderName: window.appState?.currentUser?.displayName || 'Usuário',
        message: 'Teste de diagnóstico completo do sistema',
        createdAt: serverTimestamp(),
        read: false,
        recipientUid: window.appState?.currentUser?.uid,
      };
      
      console.log('📝 [DebugCompleteSystem] Criando notificação de teste...');
      const notificationId = await createNotification(testNotification);
      console.log('✅ [DebugCompleteSystem] Notificação criada com ID:', notificationId);
      
      // 8. Aguardar e verificar se chegou
      setTimeout(() => {
        console.log('⏰ [DebugCompleteSystem] Verificando se a notificação chegou...');
        const updatedNotifications = window.appState?.notifications || [];
        const newNotification = updatedNotifications.find(n => n.id === notificationId);
        
        if (newNotification) {
          console.log('✅ [DebugCompleteSystem] Notificação encontrada no estado local:', newNotification);
        } else {
          console.warn('⚠️ [DebugCompleteSystem] Notificação não encontrada no estado local');
          console.log('📊 [DebugCompleteSystem] Estado atual das notificações:', updatedNotifications.length, 'itens');
        }
      }, 3000);
      
    } catch (error) {
      console.error('❌ [DebugCompleteSystem] Erro ao criar notificação de teste:', error);
    }
    
    // 9. Testar EventBus diretamente
    console.log('📡 [DebugCompleteSystem] === TESTE DO EVENTBUS ===');
    if (window.eventBus) {
      console.log('✅ [DebugCompleteSystem] EventBus encontrado, testando...');
      
      // Testar evento simples
      let eventReceived = false;
      const testListener = (data) => {
        console.log('✅ [DebugCompleteSystem] Evento de teste recebido:', data);
        eventReceived = true;
      };
      
      window.eventBus.on('test-complete-system', testListener);
      window.eventBus.emit('test-complete-system', { message: 'Teste do sistema completo', timestamp: Date.now() });
      
      setTimeout(() => {
        if (eventReceived) {
          console.log('✅ [DebugCompleteSystem] EventBus está funcionando');
        } else {
          console.warn('⚠️ [DebugCompleteSystem] EventBus pode não estar funcionando');
        }
        window.eventBus.off('test-complete-system', testListener);
      }, 1000);
      
      // Testar evento de notificação
      console.log('📱 [DebugCompleteSystem] Testando evento de notificação...');
      const testNotificationEvent = {
        id: 'test-complete-system-notification',
        type: 'test_notification',
        message: 'Teste do sistema completo',
        createdAt: new Date(),
        read: false,
        senderName: 'Sistema de Teste',
        budgetName: 'Orçamento de Teste'
      };
      
      window.eventBus.emit('notification:show-modal', testNotificationEvent);
      console.log('📤 [DebugCompleteSystem] Evento notification:show-modal emitido');
      
    } else {
      console.error('❌ [DebugCompleteSystem] EventBus não encontrado');
    }
    
    // 10. Verificar preferências
    console.log('⚙️ [DebugCompleteSystem] === PREFERÊNCIAS ===');
    try {
      const { getUserPrefs } = await import('@features/notifications/notificationsController.js');
      const prefs = await getUserPrefs(window.appState?.currentUser?.uid);
      console.log('Preferências:', prefs);
    } catch (e) {
      console.warn('⚠️ [DebugCompleteSystem] Erro ao obter preferências:', e);
    }
    
    // 11. Verificar localStorage
    console.log('💾 [DebugCompleteSystem] === LOCALSTORAGE ===');
    const relevantKeys = [
      'notification_use_modal',
      'notification_toasts_enabled',
      'notification_types_enabled',
      'notification_period_filter'
    ];
    
    relevantKeys.forEach(key => {
      const value = localStorage.getItem(key);
      console.log(`${key}:`, value);
    });
    
    console.log('✅ [DebugCompleteSystem] Diagnóstico completo finalizado!');
    
  } catch (error) {
    console.error('❌ [DebugCompleteSystem] Erro durante diagnóstico:', error);
    console.error('❌ [DebugCompleteSystem] Stack trace:', error.stack);
  }
}

// Função para testar notificações de recorrentes e categorias
export async function debugTestRecurringAndCategoryNotifications() {
  console.log('🧪 [DebugRecurringCategory] Testando notificações de recorrentes e categorias...');
  
  try {
    const currentUser = window.appState?.currentUser;
    const currentBudget = window.appState?.currentBudget;
    
    if (!currentUser || !currentBudget) {
      console.error('❌ [DebugRecurringCategory] Usuário ou orçamento não encontrado');
      return;
    }
    
    console.log('📊 [DebugRecurringCategory] Estado atual:', {
      userId: currentUser.uid,
      budgetId: currentBudget.id,
      budgetName: currentBudget.nome,
      usuariosPermitidos: currentBudget.usuariosPermitidos
    });
    
    // 1. Testar notificação de categoria
    console.log('📁 [DebugRecurringCategory] === TESTE DE CATEGORIA ===');
    try {
      const { sendCategoryChangeNotification } = await import('@features/notifications/NotificationService.js');
      
      const testCategory = {
        id: 'test-category-' + Date.now(),
        nome: 'Categoria de Teste',
        descricao: 'Descrição da categoria de teste',
        cor: '#ff0000',
        tipo: 'expense',
        limite: 1000,
        budgetId: currentBudget.id,
        userId: currentUser.uid
      };
      
      console.log('📝 [DebugRecurringCategory] Enviando notificação de categoria...');
      await sendCategoryChangeNotification(
        currentBudget.id,
        currentUser.uid,
        testCategory,
        'category_added'
      );
      console.log('✅ [DebugRecurringCategory] Notificação de categoria enviada');
      
    } catch (error) {
      console.error('❌ [DebugRecurringCategory] Erro ao enviar notificação de categoria:', error);
    }
    
    // 2. Testar notificação de recorrente
    console.log('🔄 [DebugRecurringCategory] === TESTE DE RECORRENTE ===');
    try {
      const { sendRecorrenteChangeNotification } = await import('@features/notifications/NotificationService.js');
      
      const testRecorrente = {
        id: 'test-recorrente-' + Date.now(),
        nome: 'Recorrente de Teste',
        valor: 500,
        frequencia: 'mensal',
        categoria: 'Alimentação',
        descricao: 'Descrição do recorrente de teste',
        parcelasRestantes: 10,
        parcelasTotal: 12,
        budgetId: currentBudget.id,
        userId: currentUser.uid
      };
      
      console.log('📝 [DebugRecurringCategory] Enviando notificação de recorrente...');
      await sendRecorrenteChangeNotification(
        currentBudget.id,
        currentUser.uid,
        testRecorrente,
        'new_recorrente'
      );
      console.log('✅ [DebugRecurringCategory] Notificação de recorrente enviada');
      
    } catch (error) {
      console.error('❌ [DebugRecurringCategory] Erro ao enviar notificação de recorrente:', error);
    }
    
    // 3. Aguardar e verificar se as notificações chegaram
    console.log('⏰ [DebugRecurringCategory] Aguardando notificações chegarem...');
    setTimeout(() => {
      const notifications = window.appState?.notifications || [];
      const recentNotifications = notifications.filter(n => 
        n.type === 'category_added' || n.type === 'new_recorrente'
      ).slice(-2);
      
      console.log('📧 [DebugRecurringCategory] Notificações recentes encontradas:', recentNotifications.length);
      recentNotifications.forEach(notif => {
        console.log('📋 [DebugRecurringCategory] Notificação:', {
          id: notif.id,
          type: notif.type,
          read: notif.read,
          createdAt: notif.createdAt
        });
      });
      
      if (recentNotifications.length === 0) {
        console.warn('⚠️ [DebugRecurringCategory] Nenhuma notificação recente encontrada');
        console.log('📊 [DebugRecurringCategory] Total de notificações:', notifications.length);
      }
    }, 3000);
    
    // 4. Testar se o modal está funcionando
    console.log('📱 [DebugRecurringCategory] === TESTE DO MODAL ===');
    if (window.eventBus) {
      const testModalNotification = {
        id: 'test-modal-recurring-category',
        type: 'category_added',
        message: 'Teste de modal para categoria',
        createdAt: new Date(),
        read: false,
        senderName: 'Sistema de Teste',
        budgetName: currentBudget.nome,
        categoryNome: 'Categoria de Teste',
        categoryDescricao: 'Descrição da categoria',
        categoryCor: '#ff0000',
        categoryTipo: 'expense',
        categoryLimite: 1000
      };
      
      console.log('📤 [DebugRecurringCategory] Emitindo evento para modal...');
      window.eventBus.emit('notification:show-modal', testModalNotification);
      console.log('✅ [DebugRecurringCategory] Evento emitido');
      
      // Verificar se o modal apareceu
      setTimeout(() => {
        const modal = document.getElementById('notification-modal');
        if (modal && modal.style.display !== 'none') {
          console.log('✅ [DebugRecurringCategory] Modal apareceu corretamente');
        } else {
          console.warn('⚠️ [DebugRecurringCategory] Modal não apareceu');
        }
      }, 1000);
    }
    
    console.log('✅ [DebugRecurringCategory] Teste de recorrentes e categorias finalizado!');
    
  } catch (error) {
    console.error('❌ [DebugRecurringCategory] Erro durante teste:', error);
    console.error('❌ [DebugRecurringCategory] Stack trace:', error.stack);
  }
}

// Função para teste detalhado de cada etapa das notificações
export async function debugDetailedNotificationTest() {
  console.log('🔬 [DebugDetailed] Iniciando teste detalhado de notificações...');
  
  try {
    const currentUser = window.appState?.currentUser;
    const currentBudget = window.appState?.currentBudget;
    
    if (!currentUser || !currentBudget) {
      console.error('❌ [DebugDetailed] Usuário ou orçamento não encontrado');
      console.log('📊 [DebugDetailed] Estado atual:', {
        hasUser: !!currentUser,
        hasBudget: !!currentBudget,
        userId: currentUser?.uid,
        budgetId: currentBudget?.id
      });
      return;
    }
    
    console.log('📊 [DebugDetailed] Estado inicial:', {
      userId: currentUser.uid,
      budgetId: currentBudget.id,
      budgetName: currentBudget.nome,
      usuariosPermitidos: currentBudget.usuariosPermitidos
    });
    
    // 1. Testar importação das funções
    console.log('📦 [DebugDetailed] === TESTE DE IMPORTAÇÃO ===');
    try {
      const { sendCategoryChangeNotification, sendRecorrenteChangeNotification } = await import('@features/notifications/NotificationService.js');
      console.log('✅ [DebugDetailed] Funções importadas:', {
        hasCategoryFunction: !!sendCategoryChangeNotification,
        hasRecorrenteFunction: !!sendRecorrenteChangeNotification
      });
    } catch (error) {
      console.error('❌ [DebugDetailed] Erro ao importar funções:', error);
      return;
    }
    
    // 2. Testar criação direta de notificação no Firebase
    console.log('🔥 [DebugDetailed] === TESTE DIRETO NO FIREBASE ===');
    try {
      const { create: createNotification } = await import('@data/repositories/notificationsRepo.js');
      const { serverTimestamp } = await import('firebase/firestore');
      
      const directNotification = {
        type: 'test_direct_firebase',
        budgetId: currentBudget.id,
        budgetName: currentBudget.nome,
        senderUid: currentUser.uid,
        senderName: currentUser.displayName || 'Usuário',
        message: 'Teste direto no Firebase',
        createdAt: serverTimestamp(),
        read: false,
        recipientUid: currentUser.uid,
      };
      
      console.log('📝 [DebugDetailed] Criando notificação direta...');
      const notificationId = await createNotification(directNotification);
      console.log('✅ [DebugDetailed] Notificação direta criada com ID:', notificationId);
      
      // Aguardar e verificar se chegou
      setTimeout(() => {
        const notifications = window.appState?.notifications || [];
        const directNotif = notifications.find(n => n.id === notificationId);
        if (directNotif) {
          console.log('✅ [DebugDetailed] Notificação direta chegou ao estado local');
        } else {
          console.warn('⚠️ [DebugDetailed] Notificação direta não chegou ao estado local');
        }
      }, 2000);
      
    } catch (error) {
      console.error('❌ [DebugDetailed] Erro ao criar notificação direta:', error);
    }
    
    // 3. Testar função de categoria com logs detalhados
    console.log('📁 [DebugDetailed] === TESTE DE CATEGORIA DETALHADO ===');
    try {
      const { sendCategoryChangeNotification } = await import('@features/notifications/NotificationService.js');
      
      const testCategory = {
        id: 'test-category-detailed-' + Date.now(),
        nome: 'Categoria Detalhada',
        descricao: 'Descrição da categoria detalhada',
        cor: '#00ff00',
        tipo: 'expense',
        limite: 2000,
        budgetId: currentBudget.id,
        userId: currentUser.uid
      };
      
      console.log('📝 [DebugDetailed] Dados da categoria de teste:', testCategory);
      console.log('📤 [DebugDetailed] Chamando sendCategoryChangeNotification...');
      
      await sendCategoryChangeNotification(
        currentBudget.id,
        currentUser.uid,
        testCategory,
        'category_added'
      );
      
      console.log('✅ [DebugDetailed] sendCategoryChangeNotification executada sem erro');
      
    } catch (error) {
      console.error('❌ [DebugDetailed] Erro em sendCategoryChangeNotification:', error);
      console.error('❌ [DebugDetailed] Stack trace:', error.stack);
    }
    
    // 4. Testar função de recorrente com logs detalhados
    console.log('🔄 [DebugDetailed] === TESTE DE RECORRENTE DETALHADO ===');
    try {
      const { sendRecorrenteChangeNotification } = await import('@features/notifications/NotificationService.js');
      
      const testRecorrente = {
        id: 'test-recorrente-detailed-' + Date.now(),
        nome: 'Recorrente Detalhado',
        valor: 750,
        frequencia: 'mensal',
        categoria: 'Alimentação',
        descricao: 'Descrição do recorrente detalhado',
        parcelasRestantes: 8,
        parcelasTotal: 10,
        budgetId: currentBudget.id,
        userId: currentUser.uid
      };
      
      console.log('📝 [DebugDetailed] Dados do recorrente de teste:', testRecorrente);
      console.log('📤 [DebugDetailed] Chamando sendRecorrenteChangeNotification...');
      
      await sendRecorrenteChangeNotification(
        currentBudget.id,
        currentUser.uid,
        testRecorrente,
        'new_recorrente'
      );
      
      console.log('✅ [DebugDetailed] sendRecorrenteChangeNotification executada sem erro');
      
    } catch (error) {
      console.error('❌ [DebugDetailed] Erro em sendRecorrenteChangeNotification:', error);
      console.error('❌ [DebugDetailed] Stack trace:', error.stack);
    }
    
    // 5. Verificar estado das notificações após testes
    console.log('⏰ [DebugDetailed] Aguardando 5 segundos para verificar notificações...');
    setTimeout(() => {
      const notifications = window.appState?.notifications || [];
      console.log('📧 [DebugDetailed] Estado final das notificações:', {
        total: notifications.length,
        recent: notifications.slice(-5).map(n => ({
          id: n.id,
          type: n.type,
          read: n.read,
          createdAt: n.createdAt
        }))
      });
      
      // Verificar se alguma das notificações de teste chegou
      const testNotifications = notifications.filter(n => 
        n.type === 'test_direct_firebase' || 
        n.type === 'category_added' || 
        n.type === 'new_recorrente'
      );
      
      console.log('🧪 [DebugDetailed] Notificações de teste encontradas:', testNotifications.length);
      testNotifications.forEach(notif => {
        console.log('📋 [DebugDetailed] Notificação de teste:', {
          id: notif.id,
          type: notif.type,
          read: notif.read,
          createdAt: notif.createdAt
        });
      });
      
      if (testNotifications.length === 0) {
        console.warn('⚠️ [DebugDetailed] NENHUMA notificação de teste chegou ao estado local!');
        console.log('🔍 [DebugDetailed] Possíveis causas:');
        console.log('  - Listener de notificações não está funcionando');
        console.log('  - Firebase não está salvando as notificações');
        console.log('  - Problema de sincronização');
        console.log('  - Erro nas funções de notificação');
      }
    }, 5000);
    
    // 6. Testar EventBus diretamente
    console.log('📡 [DebugDetailed] === TESTE DO EVENTBUS ===');
    if (window.eventBus) {
      console.log('✅ [DebugDetailed] EventBus encontrado');
      
      // Testar evento simples
      let eventReceived = false;
      const testListener = (data) => {
        console.log('✅ [DebugDetailed] Evento de teste recebido:', data);
        eventReceived = true;
      };
      
      window.eventBus.on('test-detailed-notification', testListener);
      window.eventBus.emit('test-detailed-notification', { 
        message: 'Teste detalhado', 
        timestamp: Date.now() 
      });
      
      setTimeout(() => {
        if (eventReceived) {
          console.log('✅ [DebugDetailed] EventBus está funcionando');
        } else {
          console.warn('⚠️ [DebugDetailed] EventBus pode não estar funcionando');
        }
        window.eventBus.off('test-detailed-notification', testListener);
      }, 1000);
      
    } else {
      console.error('❌ [DebugDetailed] EventBus não encontrado');
    }
    
    console.log('✅ [DebugDetailed] Teste detalhado finalizado!');
    
  } catch (error) {
    console.error('❌ [DebugDetailed] Erro durante teste detalhado:', error);
    console.error('❌ [DebugDetailed] Stack trace:', error.stack);
  }
}

// Função para debug específico da descrição da categoria
export async function debugCategoryDescriptionIssue() {
  console.log('🔍 [DebugCategoryDesc] Investigando problema da descrição da categoria...');
  
  try {
    const currentUser = window.appState?.currentUser;
    const currentBudget = window.appState?.currentBudget;
    
    if (!currentUser || !currentBudget) {
      console.error('❌ [DebugCategoryDesc] Usuário ou orçamento não encontrado');
      return;
    }
    
    // 1. Testar criação de categoria com descrição
    console.log('📁 [DebugCategoryDesc] === TESTE DE CATEGORIA COM DESCRIÇÃO ===');
    try {
      const { sendCategoryChangeNotification } = await import('@features/notifications/NotificationService.js');
      
      const testCategory = {
        id: 'test-category-desc-' + Date.now(),
        nome: 'Categoria com Descrição',
        descricao: 'Esta é uma descrição de teste para verificar se aparece no modal',
        cor: '#ff6b6b',
        tipo: 'expense',
        limite: 1500,
        budgetId: currentBudget.id,
        userId: currentUser.uid
      };
      
      console.log('📝 [DebugCategoryDesc] Dados da categoria de teste:', testCategory);
      console.log('📤 [DebugCategoryDesc] Enviando notificação...');
      
      await sendCategoryChangeNotification(
        currentBudget.id,
        currentUser.uid,
        testCategory,
        'category_added'
      );
      
      console.log('✅ [DebugCategoryDesc] Notificação enviada');
      
    } catch (error) {
      console.error('❌ [DebugCategoryDesc] Erro ao enviar notificação:', error);
    }
    
    // 2. Aguardar e verificar se a notificação chegou
    console.log('⏰ [DebugCategoryDesc] Aguardando notificação chegar...');
    setTimeout(() => {
      const notifications = window.appState?.notifications || [];
      const categoryNotification = notifications.find(n => 
        n.type === 'category_added' && n.categoryNome === 'Categoria com Descrição'
      );
      
      if (categoryNotification) {
        console.log('✅ [DebugCategoryDesc] Notificação encontrada:', categoryNotification);
        console.log('📋 [DebugCategoryDesc] Dados da notificação:', {
          id: categoryNotification.id,
          type: categoryNotification.type,
          categoryNome: categoryNotification.categoryNome,
          categoryDescription: categoryNotification.categoryDescription,
          categoryDescricao: categoryNotification.categoryDescricao, // Verificar se há outro campo
          categoryTipo: categoryNotification.categoryTipo,
          categoryLimite: categoryNotification.categoryLimite,
          categoryColor: categoryNotification.categoryColor
        });
        
        // 3. Testar modal diretamente
        console.log('📱 [DebugCategoryDesc] Testando modal diretamente...');
        if (window.eventBus) {
          window.eventBus.emit('notification:show-modal', categoryNotification);
          console.log('📤 [DebugCategoryDesc] Evento de modal emitido');
        }
        
      } else {
        console.warn('⚠️ [DebugCategoryDesc] Notificação não encontrada');
        console.log('📊 [DebugCategoryDesc] Notificações disponíveis:', notifications.length);
        notifications.forEach(n => {
          if (n.type === 'category_added') {
            console.log('📋 [DebugCategoryDesc] Notificação de categoria encontrada:', {
              id: n.id,
              categoryNome: n.categoryNome,
              categoryDescription: n.categoryDescription
            });
          }
        });
      }
    }, 3000);
    
    // 4. Verificar se há algum problema com o campo descrição
    console.log('🔍 [DebugCategoryDesc] === VERIFICAÇÃO DE CAMPOS ===');
    console.log('📊 [DebugCategoryDesc] Verificando se há inconsistência nos nomes dos campos...');
    
    // Verificar se o campo é 'descricao' ou 'description'
    const testData = {
      descricao: 'Teste descricao',
      description: 'Teste description'
    };
    
    console.log('📝 [DebugCategoryDesc] Campos de teste:', testData);
    console.log('🔍 [DebugCategoryDesc] Verificando mapeamento...');
    console.log('  - categoryData?.descricao:', testData.descricao);
    console.log('  - categoryData?.description:', testData.description);
    
    console.log('✅ [DebugCategoryDesc] Debug da descrição da categoria finalizado!');
    
  } catch (error) {
    console.error('❌ [DebugCategoryDesc] Erro durante debug:', error);
    console.error('❌ [DebugCategoryDesc] Stack trace:', error.stack);
  }
}

// Função para verificar por que o modal parou de aparecer
export async function debugModalNotAppearing() {
  console.log('🔍 [DebugModalNotAppearing] Investigando por que o modal parou de aparecer...');
  
  try {
    // 1. Verificar estado básico
    console.log('📊 [DebugModalNotAppearing] === ESTADO BÁSICO ===');
    console.log('App State:', {
      hasAppState: !!window.appState,
      hasCurrentUser: !!window.appState?.currentUser,
      hasCurrentBudget: !!window.appState?.currentBudget,
      currentUserId: window.appState?.currentUser?.uid,
      currentBudgetId: window.appState?.currentBudget?.id
    });
    
    // 2. Verificar EventBus
    console.log('📡 [DebugModalNotAppearing] === EVENTBUS ===');
    console.log('EventBus:', {
      exists: !!window.eventBus,
      hasOn: !!window.eventBus?.on,
      hasEmit: !!window.eventBus?.emit
    });
    
    // 3. Verificar listener global
    console.log('🎧 [DebugModalNotAppearing] === LISTENER GLOBAL ===');
    console.log('Listener Global:', {
      bound: !!window.__notificationModalListenerBound,
      eventBusExists: !!window.eventBus
    });
    
    // 4. Verificar localStorage
    console.log('💾 [DebugModalNotAppearing] === LOCALSTORAGE ===');
    const useModal = localStorage.getItem('notification_use_modal');
    console.log('notification_use_modal:', useModal);
    console.log('useModal !== false:', useModal !== 'false');
    
    // 5. Verificar controller de notificações
    console.log('👂 [DebugModalNotAppearing] === CONTROLLER DE NOTIFICAÇÕES ===');
    const notifCtl = window.__notifCtl;
    console.log('Controller:', {
      exists: !!notifCtl,
      hasUnsub: !!notifCtl?.unsub,
      currentUid: notifCtl?.uid,
      lastIdsCount: notifCtl?.lastIds?.size || 0
    });
    
    // 6. Verificar estado das notificações
    console.log('📧 [DebugModalNotAppearing] === ESTADO DAS NOTIFICAÇÕES ===');
    const notifications = window.appState?.notifications || [];
    console.log('Notificações:', {
      count: notifications.length,
      unreadCount: notifications.filter(n => !n.read).length,
      recent: notifications.slice(-3).map(n => ({ id: n.id, type: n.type, read: n.read }))
    });
    
    // 7. Testar EventBus diretamente
    console.log('📡 [DebugModalNotAppearing] === TESTE DO EVENTBUS ===');
    if (window.eventBus) {
      console.log('✅ [DebugModalNotAppearing] EventBus encontrado, testando...');
      
      // Testar evento simples
      let eventReceived = false;
      const testListener = (data) => {
        console.log('✅ [DebugModalNotAppearing] Evento de teste recebido:', data);
        eventReceived = true;
      };
      
      window.eventBus.on('test-modal-not-appearing', testListener);
      window.eventBus.emit('test-modal-not-appearing', { 
        message: 'Teste do modal não aparecendo', 
        timestamp: Date.now() 
      });
      
      setTimeout(() => {
        if (eventReceived) {
          console.log('✅ [DebugModalNotAppearing] EventBus está funcionando');
        } else {
          console.warn('⚠️ [DebugModalNotAppearing] EventBus pode não estar funcionando');
        }
        window.eventBus.off('test-modal-not-appearing', testListener);
      }, 1000);
      
      // Testar evento de notificação
      console.log('📱 [DebugModalNotAppearing] Testando evento de notificação...');
      const testNotificationEvent = {
        id: 'test-modal-not-appearing',
        type: 'test_notification',
        message: 'Teste do modal não aparecendo',
        createdAt: new Date(),
        read: false,
        senderName: 'Sistema de Teste',
        budgetName: 'Orçamento de Teste'
      };
      
      window.eventBus.emit('notification:show-modal', testNotificationEvent);
      console.log('📤 [DebugModalNotAppearing] Evento notification:show-modal emitido');
      
      // Verificar se o modal apareceu
      setTimeout(() => {
        const modal = document.getElementById('notification-modal');
        if (modal && modal.style.display !== 'none') {
          console.log('✅ [DebugModalNotAppearing] Modal apareceu corretamente');
        } else {
          console.warn('⚠️ [DebugModalNotAppearing] Modal não apareceu');
          console.log('📊 [DebugModalNotAppearing] Estado do modal:', {
            exists: !!modal,
            visible: modal ? modal.style.display !== 'none' : false,
            hasContent: modal ? modal.innerHTML.length > 0 : false
          });
        }
      }, 2000);
      
    } else {
      console.error('❌ [DebugModalNotAppearing] EventBus não encontrado');
    }
    
    // 8. Testar criação de notificação
    console.log('🧪 [DebugModalNotAppearing] === TESTE DE CRIAÇÃO DE NOTIFICAÇÃO ===');
    try {
      const { create: createNotification } = await import('@data/repositories/notificationsRepo.js');
      const { serverTimestamp } = await import('firebase/firestore');
      
      const testNotification = {
        type: 'test_notification',
        budgetId: window.appState?.currentBudget?.id,
        budgetName: window.appState?.currentBudget?.nome || 'Orçamento',
        senderUid: window.appState?.currentUser?.uid,
        senderName: window.appState?.currentUser?.displayName || 'Usuário',
        message: 'Teste do modal não aparecendo',
        createdAt: serverTimestamp(),
        read: false,
        recipientUid: window.appState?.currentUser?.uid,
      };
      
      console.log('📝 [DebugModalNotAppearing] Criando notificação de teste...');
      const notificationId = await createNotification(testNotification);
      console.log('✅ [DebugModalNotAppearing] Notificação criada com ID:', notificationId);
      
      // Aguardar e verificar se chegou
      setTimeout(() => {
        const notifications = window.appState?.notifications || [];
        const newNotification = notifications.find(n => n.id === notificationId);
        if (newNotification) {
          console.log('✅ [DebugModalNotAppearing] Notificação encontrada no estado local:', newNotification);
        } else {
          console.warn('⚠️ [DebugModalNotAppearing] Notificação não encontrada no estado local');
        }
      }, 3000);
      
    } catch (error) {
      console.error('❌ [DebugModalNotAppearing] Erro ao criar notificação de teste:', error);
    }
    
    console.log('✅ [DebugModalNotAppearing] Investigação finalizada!');
    
  } catch (error) {
    console.error('❌ [DebugModalNotAppearing] Erro durante investigação:', error);
    console.error('❌ [DebugModalNotAppearing] Stack trace:', error.stack);
  }
}


// Função para testar notificação de categoria com descrição
export async function debugCreateCategoryNotification() {
  console.log('📁 [DebugCategory] Criando notificação de categoria de teste...');
  
  try {
    const currentUser = window.appState?.currentUser;
    const currentBudget = window.appState?.currentBudget;
    
    if (!currentUser?.uid || !currentBudget?.id) {
      console.error('❌ [DebugCategory] Usuário ou orçamento não encontrado');
      return;
    }
    
    const { create: createNotification } = await import('@data/repositories/notificationsRepo.js');
    const { serverTimestamp } = await import('firebase/firestore');
    
    const testNotification = {
      type: 'category_added',
      budgetId: currentBudget.id,
      budgetName: currentBudget.nome || 'Orçamento',
      senderUid: currentUser.uid,
      senderName: currentUser.displayName || currentUser.email || 'Usuário',
      categoryId: 'test-category-id',
      categoryNome: 'Categoria de Teste',
      categoryTipo: 'despesa',
      categoryLimite: 500.00,
      categoryDescription: 'Esta é uma categoria de teste com descrição',
      categoryColor: '#3b82f6',
      createdAt: serverTimestamp(),
      read: false,
      recipientUid: currentUser.uid,
    };
    
    console.log('📝 [DebugCategory] Dados da notificação:', testNotification);
    
    const notificationId = await createNotification(testNotification);
    console.log('✅ [DebugCategory] Notificação de categoria criada com ID:', notificationId);
    
    // Aguardar um pouco e verificar se chegou
    setTimeout(() => {
      const notifications = window.appState?.notifications || [];
      const newNotification = notifications.find(n => n.id === notificationId);
      if (newNotification) {
        console.log('✅ [DebugCategory] Notificação encontrada no estado local:', newNotification);
        console.log('📝 [DebugCategory] Descrição da categoria:', newNotification.categoryDescription);
      } else {
        console.warn('⚠️ [DebugCategory] Notificação não encontrada no estado local ainda');
      }
    }, 2000);
    
  } catch (error) {
    console.error('❌ [DebugCategory] Erro ao criar notificação de categoria:', error);
  }
}

// Função para testar integração completa de recorrentes
export async function debugTestRecorrenteIntegration() {
  console.log('🔄 [DebugIntegration] Testando integração completa de recorrentes...');
  
  try {
    const currentUser = window.appState?.currentUser;
    const currentBudget = window.appState?.currentBudget;
    
    if (!currentUser?.uid || !currentBudget?.id) {
      console.error('❌ [DebugIntegration] Usuário ou orçamento não encontrado');
      return;
    }
    
    // Importar o serviço de recorrentes
    const { addRecorrente, updateRecorrente, deleteRecorrente } = await import('@features/recorrentes/service.js');
    
    console.log('📝 [DebugIntegration] Criando despesa recorrente de teste...');
    
    // 1. Criar uma despesa recorrente
    const dadosRecorrente = {
      nome: 'Teste de Integração',
      valor: 200.00,
      frequencia: 'Mensal',
      categoria: 'Teste',
      descricao: 'Despesa recorrente para testar integração de notificações',
      parcelasTotal: 12,
      parcelasRestantes: 12,
      efetivarMesAtual: false
    };
    
    const recorrenteId = await addRecorrente(currentUser.uid, currentBudget.id, dadosRecorrente);
    console.log('✅ [DebugIntegration] Despesa recorrente criada com ID:', recorrenteId);
    
    // Aguardar um pouco para a notificação ser processada
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('📝 [DebugIntegration] Atualizando despesa recorrente...');
    
    // 2. Atualizar a despesa recorrente
    const dadosAtualizacao = {
      ...dadosRecorrente,
      valor: 250.00,
      nome: 'Teste de Integração Atualizado',
      budgetId: currentBudget.id
    };
    
    await updateRecorrente(currentUser.uid, recorrenteId, dadosAtualizacao);
    console.log('✅ [DebugIntegration] Despesa recorrente atualizada');
    
    // Aguardar um pouco para a notificação ser processada
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('📝 [DebugIntegration] Excluindo despesa recorrente...');
    
    // 3. Excluir a despesa recorrente
    await deleteRecorrente(currentUser.uid, recorrenteId);
    console.log('✅ [DebugIntegration] Despesa recorrente excluída');
    
    console.log('🎉 [DebugIntegration] Teste de integração completo! Verifique se as notificações apareceram no modal.');
    
  } catch (error) {
    console.error('❌ [DebugIntegration] Erro durante teste de integração:', error);
  }
}

// Exportar funções para uso global
window.debugNotificationSystem = debugNotificationSystem;
window.debugSharedNotificationTest = debugSharedNotificationTest;
window.debugCheckOtherUserNotifications = debugCheckOtherUserNotifications;
window.debugTestModal = debugTestModal;
window.debugNotificationState = debugNotificationState;
window.debugCreateTestNotification = debugCreateTestNotification;
window.debugCreateRecorrenteNotification = debugCreateRecorrenteNotification;
window.debugModalStatus = debugModalStatus;
window.debugTestRecorrenteIntegration = debugTestRecorrenteIntegration;
window.debugTestModalDirect = debugTestModalDirect;
window.debugTestEventBus = debugTestEventBus;
window.debugCreateCategoryNotification = debugCreateCategoryNotification;
window.debugCheckNotificationSystem = debugCheckNotificationSystem;
window.debugTestTransactionNotification = debugTestTransactionNotification;
window.debugTestRecurringEditDelete = debugTestRecurringEditDelete;
window.debugFullNotificationDiagnosis = debugFullNotificationDiagnosis;
window.debugTestEventBusSystem = debugTestEventBusSystem;
window.debugTestRecurringNotificationComplete = debugTestRecurringNotificationComplete;
window.debugTestModalDirectly = debugTestModalDirectly;
window.debugCompleteSystemDiagnosis = debugCompleteSystemDiagnosis;
window.debugTestRecurringAndCategoryNotifications = debugTestRecurringAndCategoryNotifications;
window.debugDetailedNotificationTest = debugDetailedNotificationTest;
window.debugCategoryDescriptionIssue = debugCategoryDescriptionIssue;
window.debugModalNotAppearing = debugModalNotAppearing;

console.log('🔧 [DebugNotifications] Funções de debug carregadas:');
console.log('  - debugNotificationSystem() - Debug completo do sistema');
console.log('  - debugSharedNotificationTest() - Teste de envio para compartilhados');
console.log('  - debugCheckOtherUserNotifications() - Verificar notificações de outros usuários');
console.log('  - debugTestModal() - Testar modal manualmente');
console.log('  - debugNotificationState() - Verificar estado atual');
console.log('  - debugCreateTestNotification() - Criar notificação de teste manualmente');
console.log('  - debugCreateRecorrenteNotification() - Criar notificação de recorrente de teste');
console.log('  - debugModalStatus() - Verificar status do modal');
console.log('  - debugTestRecorrenteIntegration() - Testar integração completa de recorrentes');
console.log('  - debugTestModalDirect() - Testar modal diretamente');
console.log('  - debugTestEventBus() - Testar EventBus diretamente');
console.log('  - debugCreateCategoryNotification() - Criar notificação de categoria de teste');
console.log('  - debugCheckNotificationSystem() - Verificar se o sistema está funcionando');
console.log('  - debugTestTransactionNotification() - Testar notificação de transação');
console.log('  - debugTestRecurringEditDelete() - Testar notificações de edição e exclusão de recorrentes');
console.log('  - debugFullNotificationDiagnosis() - Diagnóstico completo do sistema de notificações');
console.log('  - debugTestEventBusSystem() - Testar sistema de EventBus e eventos');
console.log('  - debugTestRecurringNotificationComplete() - Testar notificação de recorrente completa');
console.log('  - debugTestModalDirectly() - Testar modal diretamente');
console.log('  - debugCompleteSystemDiagnosis() - Diagnóstico completo do sistema de notificações e modal');
console.log('  - debugTestRecurringAndCategoryNotifications() - Testar notificações de recorrentes e categorias');
console.log('  - debugDetailedNotificationTest() - Teste detalhado de cada etapa das notificações');
console.log('  - debugCategoryDescriptionIssue() - Debug específico da descrição da categoria no modal');
console.log('  - debugModalNotAppearing() - Investigar por que o modal de notificação parou de aparecer');
console.log('  - debugProductionModal() - Diagnóstico específico para produção');
  console.log('  - debugModalWhenNotificationsArrive() - Testar modal quando notificações chegam mas não aparecem');
  console.log('  - debugCatchUpSystem() - Testar sistema de catch-up de notificações');

// Função de debug específica para testar o modal quando notificações chegam mas não aparecem
async function debugModalWhenNotificationsArrive() {
  console.log('🔍 [Debug] Testando modal quando notificações chegam mas não aparecem...');
  
  try {
    // 1. Verificar se o EventBus está funcionando
    console.log('1️⃣ Verificando EventBus...');
    if (typeof window.eventBus === 'undefined') {
      console.error('❌ EventBus não está disponível globalmente');
      return;
    }
    console.log('✅ EventBus disponível:', typeof window.eventBus);
    
    // 2. Verificar se o listener está configurado
    console.log('2️⃣ Verificando listener notification:show-modal...');
    const hasListener = window.__notificationModalListenerBound;
    console.log('Listener configurado:', hasListener);
    
    // 3. Verificar se o modal pode ser criado
    console.log('3️⃣ Testando criação do modal...');
    const { getNotificationModal } = await import('@features/notifications/ui/NotificationModal.js');
    const modal = getNotificationModal();
    console.log('Modal obtido:', !!modal);
    
    // 4. Verificar se o modal está no DOM
    console.log('4️⃣ Verificando modal no DOM...');
    const existingModal = document.getElementById('notification-modal');
    console.log('Modal no DOM:', !!existingModal);
    
    // 5. Verificar CSS
    console.log('5️⃣ Verificando CSS...');
    const cssLink = document.querySelector('link[href*="notification-modal.css"]');
    console.log('CSS carregado:', !!cssLink);
    
    // 6. Testar evento diretamente
    console.log('6️⃣ Testando evento diretamente...');
    const testNotification = {
      id: 'test-' + Date.now(),
      type: 'test_notification',
      message: 'Teste de modal quando notificações chegam',
      createdAt: new Date(),
      read: false
    };
    
    console.log('Emitindo evento notification:show-modal...');
    window.eventBus.emit('notification:show-modal', testNotification);
    
    // 7. Verificar se o modal apareceu
    setTimeout(() => {
      console.log('7️⃣ Verificando se modal apareceu...');
      const modalAfter = document.getElementById('notification-modal');
      if (modalAfter) {
        const styles = window.getComputedStyle(modalAfter);
        console.log('Modal após evento:', {
          display: styles.display,
          opacity: styles.opacity,
          visibility: styles.visibility,
          zIndex: styles.zIndex
        });
      } else {
        console.error('❌ Modal não foi criado após evento');
      }
    }, 1000);
    
  } catch (error) {
    console.error('❌ Erro no debug:', error);
  }
}

// Função de debug para testar o sistema de catch-up
async function debugCatchUpSystem() {
  console.log('🔍 [Debug] Testando sistema de catch-up de notificações...');
  try {
    console.log('1️⃣ Verificando sistema de catch-up...');
    const { getCatchUpNotifications } = await import('@features/notifications/CatchUpNotifications.js');
    const catchUp = getCatchUpNotifications();
    console.log('Sistema de catch-up obtido:', !!catchUp);
    
    console.log('2️⃣ Verificando usuário atual...');
    const userId = catchUp.getCurrentUserId();
    console.log('ID do usuário:', userId);
    
    if (!userId) {
      console.error('❌ Usuário não autenticado');
      return;
    }
    
    console.log('3️⃣ Verificando notificações não lidas...');
    const { getNotificationsRepo } = await import('@data/repositories/notificationsRepo.js');
    const notificationsRepo = getNotificationsRepo();
    const unreadNotifications = await notificationsRepo.getUnreadNotifications(userId);
    console.log('Notificações não lidas encontradas:', unreadNotifications.length);
    console.log('Detalhes:', unreadNotifications.map(n => ({ id: n.id, type: n.type, message: n.message })));
    
    console.log('4️⃣ Testando verificação de notificações pendentes...');
    await catchUp.checkPendingNotifications();
    
    console.log('5️⃣ Verificando se modal de catch-up foi criado...');
    const catchUpModal = document.querySelector('.catch-up-modal-overlay');
    console.log('Modal de catch-up no DOM:', !!catchUpModal);
    
    if (catchUpModal) {
      const styles = window.getComputedStyle(catchUpModal);
      console.log('Modal de catch-up estilos:', {
        display: styles.display,
        opacity: styles.opacity,
        visibility: styles.visibility,
        zIndex: styles.zIndex
      });
    }
    
    console.log('✅ Teste do sistema de catch-up concluído');
  } catch (error) {
    console.error('❌ Erro no teste do sistema de catch-up:', error);
  }
}

// Função para testar o EventBus de notificações
export function debugTestEventBusNotifications() {
  console.log('🔧 [DebugNotifications] Testando EventBus de notificações...');
  
  try {
    // Verificar se o EventBus está disponível
    if (typeof window !== 'undefined' && window.eventBus) {
      console.log('✅ [DebugNotifications] EventBus disponível:', window.eventBus);
      
      // Testar emitindo evento de notificação
      const testNotification = {
        id: 'test-eventbus-' + Date.now(),
        type: 'transaction',
        title: 'Teste EventBus',
        message: 'Esta é uma notificação de teste via EventBus.',
        timestamp: new Date(),
        read: false,
        data: {
          transactionId: 'test-eventbus-transaction'
        }
      };
      
      console.log('🔧 [DebugNotifications] Emitindo evento notification:show-modal:', testNotification);
      window.eventBus.emit('notification:show-modal', testNotification);
      console.log('✅ [DebugNotifications] Evento emitido com sucesso');
      
    } else {
      console.error('❌ [DebugNotifications] EventBus não disponível');
    }
    
  } catch (error) {
    console.error('❌ [DebugNotifications] Erro ao testar EventBus:', error);
  }
}

// Função para simular uma notificação real de transação
export function debugTestRealTransactionNotification() {
  console.log('🔧 [DebugNotifications] Simulando notificação real de transação...');
  
  try {
    // Verificar se o EventBus está disponível
    if (typeof window !== 'undefined' && window.eventBus) {
      console.log('✅ [DebugNotifications] EventBus disponível:', window.eventBus);
      
      // Simular notificação real como seria criada pelo sistema
      const realNotification = {
        id: 'real-transaction-' + Date.now(),
        type: 'new_transaction',
        budgetId: window.appState?.currentBudget?.id || 'test-budget',
        budgetName: window.appState?.currentBudget?.nome || 'Teste',
        recipientUid: window.appState?.currentUser?.uid || 'test-user',
        senderUid: window.appState?.currentUser?.uid || 'test-user',
        title: 'Nova Transação',
        message: 'Uma nova transação foi adicionada ao orçamento.',
        createdAt: new Date(),
        read: false,
        data: {
          transactionId: 'real-transaction-' + Date.now(),
          amount: 100.00,
          description: 'Teste de transação real'
        }
      };
      
      console.log('🔧 [DebugNotifications] Simulando notificação real:', realNotification);
      console.log('🔧 [DebugNotifications] Emitindo evento notification:show-modal...');
      window.eventBus.emit('notification:show-modal', realNotification);
      console.log('✅ [DebugNotifications] Evento de notificação real emitido com sucesso');
      
    } else {
      console.error('❌ [DebugNotifications] EventBus não disponível');
    }
    
  } catch (error) {
    console.error('❌ [DebugNotifications] Erro ao simular notificação real:', error);
  }
}

// Função para verificar o status do sistema de notificações
export function debugCheckNotificationSystemStatus() {
  console.log('🔍 [DebugNotifications] Verificando status do sistema de notificações...');
  
  try {
    // 1. Verificar EventBus
    console.log('1️⃣ EventBus:', {
      exists: !!window.eventBus,
      hasOn: !!(window.eventBus && window.eventBus.on),
      hasEmit: !!(window.eventBus && window.eventBus.emit)
    });
    
    // 2. Verificar appState
    console.log('2️⃣ AppState:', {
      exists: !!window.appState,
      hasCurrentUser: !!(window.appState && window.appState.currentUser),
      hasCurrentBudget: !!(window.appState && window.appState.currentBudget),
      hasNotifications: !!(window.appState && window.appState.notifications),
      notificationsCount: window.appState?.notifications?.length || 0
    });
    
    // 3. Verificar notificationsController
    const notifCtl = window.__notifCtl;
    console.log('3️⃣ NotificationsController:', {
      exists: !!notifCtl,
      hasUnsub: !!(notifCtl && notifCtl.unsub),
      uid: notifCtl?.uid,
      lastSeenAt: notifCtl?.lastSeenAt,
      lastIdsCount: notifCtl?.lastIds?.size || 0
    });
    
    // 4. Verificar localStorage
    console.log('4️⃣ LocalStorage:', {
      notification_use_modal: localStorage.getItem('notification_use_modal'),
      notification_toasts_enabled: localStorage.getItem('notification_toasts_enabled')
    });
    
    // 5. Verificar Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then(registration => {
        console.log('5️⃣ Service Worker:', {
          exists: !!registration,
          scope: registration?.scope,
          state: registration?.active?.state
        });
      });
    }
    
    console.log('✅ [DebugNotifications] Verificação de status concluída');
    
  } catch (error) {
    console.error('❌ [DebugNotifications] Erro na verificação de status:', error);
  }
}

// Expor funções de debug globalmente
if (typeof window !== 'undefined') {
  window.debugEventBusAndModal = debugEventBusAndModal;
  window.debugProductionModal = debugProductionModal;
  window.debugTestModalDirectly = debugTestModalDirectly;
  window.debugFullNotificationDiagnosis = debugFullNotificationDiagnosis;
  window.debugCompleteSystemDiagnosis = debugCompleteSystemDiagnosis;
  window.debugDetailedNotificationTest = debugDetailedNotificationTest;
  window.debugTestRecurringAndCategoryNotifications = debugTestRecurringAndCategoryNotifications;
  window.debugTestEventBusSystem = debugTestEventBusSystem;
  window.debugTestRecurringNotificationComplete = debugTestRecurringNotificationComplete;
  window.debugTestTransactionNotification = debugTestTransactionNotification;
  window.debugTestRecurringEditDelete = debugTestRecurringEditDelete;
  window.debugCategoryDescriptionIssue = debugCategoryDescriptionIssue;
  window.debugModalNotAppearing = debugModalNotAppearing;
  window.debugModalWhenNotificationsArrive = debugModalWhenNotificationsArrive;
  window.debugCatchUpSystem = debugCatchUpSystem;
  window.debugTestEventBusNotifications = debugTestEventBusNotifications;
  window.debugTestRealTransactionNotification = debugTestRealTransactionNotification;
  window.debugCheckNotificationSystemStatus = debugCheckNotificationSystemStatus;
  console.log('🔧 [DebugNotifications] Funções de debug expostas globalmente');
}
