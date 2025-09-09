// features/notifications/NotificationService.js
import { eventBus } from '@core/events/eventBus.js';

// FunÃ§Ã£o para enviar notificaÃ§Ã£o de nova transaÃ§Ã£o
export async function sendTransactionNotification(budgetId, senderUid, transactionData) {
  try {
    // Buscar informaÃ§Ãµes do orÃ§amento via repo
    const { serverTimestamp } = await import('firebase/firestore');
    const { getById: getBudgetById } = await import('@data/repositories/budgetsRepo.js');
    const budgetData = await getBudgetById(budgetId);

    if (!budgetData) {
      console.log('OrÃ§amento nÃ£o encontrado para notificaÃ§Ã£o');
      return;
    }

    // Verificar se Ã© um orÃ§amento compartilhado
    if (!budgetData.usuariosPermitidos || budgetData.usuariosPermitidos.length === 0) {
      console.log('OrÃ§amento nÃ£o compartilhado, nÃ£o enviando notificaÃ§Ã£o');
      return;
    }

    // Buscar informaÃ§Ãµes do usuÃ¡rio que adicionou a transaÃ§Ã£o
    const senderInfo = await getUserInfo(senderUid);
    const senderName = senderInfo?.displayName || senderInfo?.email || 'UsuÃ¡rio';

    // Buscar categoria da transaÃ§Ã£o
    let categoriaNome = 'Sem categoria';
    let categoriaTipo = null;
    let categoriaLimite = null;
    if (transactionData.categoriaId) {
      const { getById: getCategoryById } = await import('@data/repositories/categoriesRepo.js');
      const categoria = await getCategoryById(transactionData.categoriaId);
      if (categoria) {
        categoriaNome = categoria.nome;
        categoriaTipo = categoria.tipo ?? null;
        categoriaLimite = categoria.limite ?? null;
      }
    }

    // Preparar dados da notificaÃ§Ã£o
    const notificationData = {
      budgetId,
      budgetName: budgetData.nome || 'OrÃ§amento',
      senderUid,
      senderName,
      transactionId: transactionData.id,
      transactionDescricao: transactionData.descricao,
      transactionValor: transactionData.valor,
      transactionCategoria: categoriaNome,
      transactionTipo: transactionData.tipo || 'despesa',
      transactionCategoriaTipo: categoriaTipo,
      transactionCategoriaLimite: categoriaLimite,
      recorrenteId: transactionData.recorrenteId ?? null,
      recorrenteParcelaAtual: transactionData.recorrenteParcelaAtual ?? null,
      recorrenteParcelasTotal: transactionData.recorrenteParcelasTotal ?? null,
      createdAt: serverTimestamp(),
      read: false,
      type: 'new_transaction'
    };

    // Enviar notificaÃ§Ã£o para todos os usuÃ¡rios do orÃ§amento
    const rawRecipients = [...(budgetData.usuariosPermitidos || [])];
    if (budgetData.criadoPor && !rawRecipients.includes(budgetData.criadoPor)) {
      rawRecipients.push(budgetData.criadoPor);
    }
    const recipients = rawRecipients.filter((uid, idx) => !!uid && rawRecipients.indexOf(uid) === idx && uid !== senderUid);

    const { create: createNotification } = await import('@data/repositories/notificationsRepo.js');
    const notificationPromises = recipients.map(async (recipientUid) => {
      try {
        await createNotification({ ...notificationData, recipientUid });
        console.log(`ðŸ“§ NotificaÃ§Ã£o enviada para usuÃ¡rio: ${recipientUid}`);
      } catch (error) {
        console.error(`Erro ao enviar notificaÃ§Ã£o para ${recipientUid}:`, error);
      }
    });

    await Promise.all(notificationPromises);
    console.log('âœ… NotificaÃ§Ãµes enviadas com sucesso');
  } catch (error) {
    console.error('Erro ao enviar notificaÃ§Ãµes:', error);
  }
}

// FunÃ§Ã£o para enviar notificaÃ§Ã£o de exclusÃ£o de transaÃ§Ã£o
export async function sendTransactionDeletedNotification(budgetId, senderUid, transactionData) {
  try {
    const { serverTimestamp } = await import('firebase/firestore');
    const { getById: getBudgetById } = await import('@data/repositories/budgetsRepo.js');
    const budgetData = await getBudgetById(budgetId);

    if (!budgetData) {
      console.log('OrÃ§amento nÃ£o encontrado para notificaÃ§Ã£o de exclusÃ£o');
      return;
    }

    // Verificar se Ã© um orÃ§amento compartilhado
    if (!budgetData.usuariosPermitidos || budgetData.usuariosPermitidos.length === 0) {
      console.log('OrÃ§amento nÃ£o compartilhado, nÃ£o enviando notificaÃ§Ã£o de exclusÃ£o');
      return;
    }

    // Buscar informaÃ§Ãµes do usuÃ¡rio que excluiu a transaÃ§Ã£o
    const senderInfo = await getUserInfo(senderUid);
    const senderName = senderInfo?.displayName || senderInfo?.email || 'UsuÃ¡rio';

    // Buscar categoria da transaÃ§Ã£o
    let categoriaNome = 'Sem categoria';
    let categoriaTipo = null;
    let categoriaLimite = null;
    if (transactionData?.categoriaId) {
      const { getById: getCategoryById } = await import('@data/repositories/categoriesRepo.js');
      const categoria = await getCategoryById(transactionData.categoriaId);
      if (categoria) {
        categoriaNome = categoria.nome;
        categoriaTipo = categoria.tipo ?? null;
        categoriaLimite = categoria.limite ?? null;
      }
    }

    // Preparar dados da notificaÃ§Ã£o
    const notificationData = {
      budgetId,
      budgetName: budgetData.nome || 'OrÃ§amento',
      senderUid,
      senderName,
      transactionId: transactionData?.id,
      transactionDescricao: transactionData?.descricao,
      transactionValor: transactionData?.valor,
      transactionCategoria: categoriaNome,
      transactionTipo: transactionData?.tipo || 'despesa',
      transactionCategoriaTipo: categoriaTipo,
      transactionCategoriaLimite: categoriaLimite,
      createdAt: serverTimestamp(),
      read: false,
      type: 'deleted_transaction'
    };

    // Enviar notificaÃ§Ã£o para todos os usuÃ¡rios do orÃ§amento
    const rawRecipients = [...(budgetData.usuariosPermitidos || [])];
    if (budgetData.criadoPor && !rawRecipients.includes(budgetData.criadoPor)) {
      rawRecipients.push(budgetData.criadoPor);
    }
    const recipients = rawRecipients.filter((uid, idx) => !!uid && rawRecipients.indexOf(uid) === idx && uid !== senderUid);

    const { create: createNotification } = await import('@data/repositories/notificationsRepo.js');
    const notificationPromises = recipients.map(async (recipientUid) => {
      try {
        await createNotification({ ...notificationData, recipientUid });
        console.log(`ðŸ“§ NotificaÃ§Ã£o de exclusÃ£o enviada para usuÃ¡rio: ${recipientUid}`);
      } catch (error) {
        console.error(`Erro ao enviar notificaÃ§Ã£o de exclusÃ£o para ${recipientUid}:`, error);
      }
    });

    await Promise.all(notificationPromises);
    console.log('âœ… NotificaÃ§Ãµes de exclusÃ£o enviadas com sucesso');
  } catch (error) {
    console.error('Erro ao enviar notificaÃ§Ãµes de exclusÃ£o:', error);
  }
}

// FunÃ§Ã£o para enviar notificaÃ§Ã£o de atualizaÃ§Ã£o de transaÃ§Ã£o
export async function sendTransactionUpdatedNotification(budgetId, senderUid, transactionData) {
  try {
    const { serverTimestamp } = await import('firebase/firestore');
    const { getById: getBudgetById } = await import('@data/repositories/budgetsRepo.js');
    const budgetData = await getBudgetById(budgetId);

    if (!budgetData) { return; }
    if (!budgetData.usuariosPermitidos || budgetData.usuariosPermitidos.length === 0) { return; }

    const senderInfo = await getUserInfo(senderUid);
    const senderName = senderInfo?.displayName || senderInfo?.email || 'UsuÃ¡rio';

    let categoriaNome = 'Sem categoria';
    let categoriaTipo = null;
    let categoriaLimite = null;
    let prevCategoriaNome = null;
    if (transactionData?.categoriaId) {
      const { getById: getCategoryById } = await import('@data/repositories/categoriesRepo.js');
      const categoria = await getCategoryById(transactionData.categoriaId);
      if (categoria) {
        categoriaNome = categoria.nome;
        categoriaTipo = categoria.tipo ?? null;
        categoriaLimite = categoria.limite ?? null;
      }
    }
    if (transactionData?.prev?.categoriaId) {
      try {
        const { getById: getCategoryById } = await import('@data/repositories/categoriesRepo.js');
        const catPrev = await getCategoryById(transactionData.prev.categoriaId);
        if (catPrev?.nome) { prevCategoriaNome = catPrev.nome; }
      } catch {}
    }

    // Normaliza conjunto de mudanÃ§as se vier do caller
    const changes = {};
    const cs = transactionData?.changeSet || {};
    if (cs.valor && (cs.valor.from !== cs.valor.to)) {
      changes.valor = { from: cs.valor.from, to: cs.valor.to };
    }
    if (cs.descricao && (cs.descricao.from !== cs.descricao.to)) {
      changes.descricao = { from: cs.descricao.from, to: cs.descricao.to };
    }
    if (cs.tipo && (cs.tipo.from !== cs.tipo.to)) {
      changes.tipo = { from: cs.tipo.from, to: cs.tipo.to };
    }
    if (cs.categoriaId && (cs.categoriaId.from !== cs.categoriaId.to)) {
      changes.categoria = { from: prevCategoriaNome || transactionData.prev?.categoriaId || null, to: categoriaNome || cs.categoriaId.to };
    }

    const notificationData = {
      budgetId,
      budgetName: budgetData.nome || 'OrÃ§amento',
      senderUid,
      senderName,
      transactionId: transactionData?.id,
      transactionDescricao: transactionData?.descricao,
      transactionValor: transactionData?.valor,
      transactionCategoria: categoriaNome,
      transactionTipo: transactionData?.tipo || 'despesa',
      transactionCategoriaTipo: categoriaTipo,
      transactionCategoriaLimite: categoriaLimite,
      changes,
      // snapshot anterior resumido para render opcional
      prev: transactionData?.prev ? {
        descricao: transactionData.prev.descricao ?? null,
        valor: transactionData.prev.valor ?? null,
        categoria: prevCategoriaNome ?? null,
        tipo: transactionData.prev.tipo ?? null,
      } : null,
      createdAt: serverTimestamp(),
      read: false,
      type: 'updated_transaction'
    };

    const rawRecipients = [...(budgetData.usuariosPermitidos || [])];
    if (budgetData.criadoPor && !rawRecipients.includes(budgetData.criadoPor)) {
      rawRecipients.push(budgetData.criadoPor);
    }
    const recipients = rawRecipients.filter((uid, idx) => !!uid && rawRecipients.indexOf(uid) === idx && uid !== senderUid);

    const { create: createNotification } = await import('@data/repositories/notificationsRepo.js');
    await Promise.all(recipients.map(async (recipientUid) => {
      try {
        await createNotification({ ...notificationData, recipientUid });
        console.log(`ðŸ“§ NotificaÃ§Ã£o de atualizaÃ§Ã£o enviada para usuÃ¡rio: ${recipientUid}`);
      } catch (err) {
        console.error(`Erro ao enviar notificaÃ§Ã£o de atualizaÃ§Ã£o para ${recipientUid}:`, err);
      }
    }));
  } catch (error) {
    console.error('Erro ao enviar notificaÃ§Ãµes de atualizaÃ§Ã£o:', error);
  }
}

// FunÃ§Ã£o genÃ©rica para notificar mudanÃ§as de categoria
export async function sendCategoryChangeNotification(budgetId, senderUid, categoryData, changeType, prevData = null) {
  try {
    const { serverTimestamp } = await import('firebase/firestore');
    const { getById: getBudgetById } = await import('@data/repositories/budgetsRepo.js');
    const budgetData = await getBudgetById(budgetId);

    if (!budgetData) { return; }
    if (!budgetData.usuariosPermitidos || budgetData.usuariosPermitidos.length === 0) { return; }

    const senderInfo = await getUserInfo(senderUid);
    const senderName = senderInfo?.displayName || senderInfo?.email || 'UsuÃ¡rio';

    // Build changeSet when prevData exists
    const changes = {};
    if (prevData) {
      if (prevData.nome !== categoryData?.nome) {
        changes.nome = { from: prevData.nome ?? null, to: categoryData?.nome ?? null };
      }
      if (prevData.tipo !== categoryData?.tipo) {
        changes.tipo = { from: prevData.tipo ?? null, to: categoryData?.tipo ?? null };
      }
      if (prevData.limite !== categoryData?.limite) {
        changes.limite = { from: prevData.limite ?? null, to: categoryData?.limite ?? null };
      }
    }

    const notificationData = {
      budgetId,
      budgetName: budgetData.nome || 'OrÃ§amento',
      senderUid,
      senderName,
      categoryId: categoryData?.id,
      categoryNome: categoryData?.nome,
      categoryTipo: categoryData?.tipo,
      categoryLimite: categoryData?.limite,
      changes,
      prev: prevData ? {
        nome: prevData.nome ?? null,
        tipo: prevData.tipo ?? null,
        limite: prevData.limite ?? null,
      } : null,
      createdAt: serverTimestamp(),
      read: false,
      type: changeType // 'category_added' | 'category_updated' | 'category_deleted'
    };

    const rawRecipients = [...(budgetData.usuariosPermitidos || [])];
    if (budgetData.criadoPor && !rawRecipients.includes(budgetData.criadoPor)) {
      rawRecipients.push(budgetData.criadoPor);
    }
    const recipients = rawRecipients.filter((uid, idx) => !!uid && rawRecipients.indexOf(uid) === idx && uid !== senderUid);

    const { create: createNotification } = await import('@data/repositories/notificationsRepo.js');
    await Promise.all(recipients.map(async (recipientUid) => {
      try {
        await createNotification({ ...notificationData, recipientUid });
        console.log(`ðŸ“§ NotificaÃ§Ã£o de categoria (${changeType}) enviada para usuÃ¡rio: ${recipientUid}`);
      } catch (err) {
        console.error(`Erro ao enviar notificaÃ§Ã£o de categoria para ${recipientUid}:`, err);
      }
    }));
  } catch (error) {
    console.error('Erro ao enviar notificaÃ§Ãµes de categoria:', error);
  }
}

// FunÃ§Ã£o para sair de um orÃ§amento compartilhado
export async function leaveSharedBudget(budgetId) {
  try {
    const { updateDoc, doc, arrayRemove } = await import('firebase/firestore');
    const { db } = await import('@data/firebase/client.js');
    const user = window.appState.currentUser;

    if (!user) {
      console.error('UsuÃ¡rio nÃ£o autenticado');
      return;
    }

    const budgetRef = doc(db, 'budgets', budgetId);
    await updateDoc(budgetRef, {
      usuariosPermitidos: arrayRemove(user.uid)
    });

    console.log('âœ… UsuÃ¡rio removido do orÃ§amento compartilhado');

    if (window.Snackbar) {
      window.Snackbar({
        message: 'âœ… SaÃ­da do orÃ§amento realizada com sucesso',
        type: 'success'
      });
    }
  } catch (error) {
    console.error('Erro ao sair do orÃ§amento:', error);
    if (window.Snackbar) {
      window.Snackbar({
        message: 'âŒ Erro ao sair do orÃ§amento',
        type: 'error'
      });
    }
  }
}

// FunÃ§Ã£o para remover usuÃ¡rio de um orÃ§amento compartilhado
export async function removeUserFromBudget(budgetId, userUid) {
  try {
    const { updateDoc, doc, arrayRemove } = await import('firebase/firestore');
    const { db } = await import('@data/firebase/client.js');
    const currentUser = window.appState.currentUser;

    if (!currentUser) {
      console.error('UsuÃ¡rio nÃ£o autenticado');
      return;
    }

    const budgetRef = doc(db, 'budgets', budgetId);
    await updateDoc(budgetRef, {
      usuariosPermitidos: arrayRemove(userUid)
    });

    console.log('âœ… UsuÃ¡rio removido do orÃ§amento compartilhado');

    if (window.Snackbar) {
      window.Snackbar({
        message: 'âœ… UsuÃ¡rio removido com sucesso',
        type: 'success'
      });
    }
  } catch (error) {
    console.error('Erro ao remover usuÃ¡rio:', error);
    if (window.Snackbar) {
      window.Snackbar({
        message: 'âŒ Erro ao remover usuÃ¡rio',
        type: 'error'
      });
    }
  }
}

// FunÃ§Ã£o auxiliar para buscar informaÃ§Ãµes do usuÃ¡rio
export async function getUserInfo(uid) {
  try {
    const { getDoc, doc } = await import('firebase/firestore');
    const { db } = await import('@data/firebase/client.js');
    const userDoc = await getDoc(doc(db, 'users', uid));

    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      return {
        displayName: 'UsuÃ¡rio desconhecido',
        email: 'email@desconhecido.com'
      };
    }
  } catch (error) {
    console.error('Erro ao buscar informaÃ§Ãµes do usuÃ¡rio:', error);
    return {
      displayName: 'Erro ao carregar',
      email: 'erro@carregar.com'
    };
  }
}

// Envia uma notificaÃ§Ã£o de teste para o DONO do orÃ§amento
export async function sendTestNotificationToOwner(budgetId, senderUid) {
  try {
    const { serverTimestamp } = await import('firebase/firestore');
    const { getById: getBudgetById } = await import('@data/repositories/budgetsRepo.js');
    const { create: createNotification } = await import('@data/repositories/notificationsRepo.js');

    const budget = await getBudgetById(budgetId);
    if (!budget) {
      throw new Error('OrÃ§amento nÃ£o encontrado');
    }
    const ownerUid = budget.criadoPor || budget.userId;
    if (!ownerUid) {
      throw new Error('Dono do orÃ§amento nÃ£o encontrado');
    }

    const senderInfo = await getUserInfo(senderUid);
    const senderName = senderInfo?.displayName || senderInfo?.email || 'UsuÃ¡rio';

    if (ownerUid === senderUid) {
      // Evitar enviar para si prÃ³prio, manter padrÃ£o das outras funÃ§Ãµes
      try { (window.Snackbar && window.Snackbar.info) ? window.Snackbar.info('VocÃª Ã© o dono deste orÃ§amento', 2500) : eventBus.emit('snackbar:show', { message: 'VocÃª Ã© o dono deste orÃ§amento', type: 'info', duration: 2500 }); } catch {}
      return;
    }

    const payload = {
      type: 'test_notification',
      budgetId,
      budgetName: budget.nome || 'OrÃ§amento',
      senderUid,
      senderName,
      message: 'Mensagem de teste enviada para o dono do orÃ§amento',
      createdAt: serverTimestamp(),
      read: false,
      recipientUid: ownerUid,
    };

    await createNotification(payload);
    try { (window.Snackbar && window.Snackbar.success) ? window.Snackbar.success('NotificaÃ§Ã£o de teste enviada ao dono', 2500) : eventBus.emit('snackbar:show', { message: 'NotificaÃ§Ã£o de teste enviada ao dono', type: 'success', duration: 2500 }); } catch {}
  } catch (error) {
    console.error('Erro ao enviar notificaÃ§Ã£o de teste (dono):', error);
    try { (window.Snackbar && window.Snackbar.error) ? window.Snackbar.error('Erro ao enviar teste para dono', 2500) : eventBus.emit('snackbar:show', { message: 'Erro ao enviar teste para dono', type: 'error', duration: 2500 }); } catch {}
  }
}

// Envia uma notificaÃ§Ã£o de teste para TODOS os usuÃ¡rios compartilhados (exclui remetente)
export async function sendTestNotificationToShared(budgetId, senderUid) {
  try {
    const { serverTimestamp } = await import('firebase/firestore');
    const { getById: getBudgetById } = await import('@data/repositories/budgetsRepo.js');
    const { create: createNotification } = await import('@data/repositories/notificationsRepo.js');

    const budget = await getBudgetById(budgetId);
    if (!budget) {
      throw new Error('OrÃ§amento nÃ£o encontrado');
    }
    const shared = Array.isArray(budget.usuariosPermitidos) ? budget.usuariosPermitidos.slice() : [];
    // Garantir unicidade e remover vazios
    const recipients = Array.from(new Set(shared.filter(Boolean))).filter((uid) => uid !== senderUid);
    if (!recipients.length) {
      try { (window.Snackbar && window.Snackbar.info) ? window.Snackbar.info('Nenhum usuÃ¡rio compartilhado para notificar', 2500) : eventBus.emit('snackbar:show', { message: 'Nenhum usuÃ¡rio compartilhado para notificar', type: 'info', duration: 2500 }); } catch {}
      return;
    }

    const senderInfo = await getUserInfo(senderUid);
    const senderName = senderInfo?.displayName || senderInfo?.email || 'UsuÃ¡rio';

    await Promise.all(recipients.map((recipientUid) => createNotification({
      type: 'test_notification',
      budgetId,
      budgetName: budget.nome || 'OrÃ§amento',
      senderUid,
      senderName,
      message: 'Mensagem de teste enviada para usuÃ¡rios compartilhados',
      createdAt: serverTimestamp(),
      read: false,
      recipientUid,
    })));
    try { (window.Snackbar && window.Snackbar.success) ? window.Snackbar.success('NotificaÃ§Ã£o de teste enviada aos compartilhados', 2500) : eventBus.emit('snackbar:show', { message: 'NotificaÃ§Ã£o de teste enviada aos compartilhados', type: 'success', duration: 2500 }); } catch {}
  } catch (error) {
    console.error('Erro ao enviar notificaÃ§Ã£o de teste (compartilhados):', error);
    try { (window.Snackbar && window.Snackbar.error) ? window.Snackbar.error('Erro ao enviar teste para compartilhados', 2500) : eventBus.emit('snackbar:show', { message: 'Erro ao enviar teste para compartilhados', type: 'error', duration: 2500 }); } catch {}
  }
}
