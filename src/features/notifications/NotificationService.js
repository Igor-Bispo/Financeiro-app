// Envia notificação de lembrete de recorrente
export async function sendRecorrenteReminderNotification(budgetId, senderUid, recorrenteData) {
  try {
    const { serverTimestamp } = await import('firebase/firestore');
    const { getById: getBudgetById } = await import('@data/repositories/budgetsRepo.js');
    const budgetData = await getBudgetById(budgetId);
    if (!budgetData) return;
    const senderInfo = await getUserInfo(senderUid);
    const senderName = senderInfo?.displayName || senderInfo?.email || 'Usuário';
    const rawRecipients = [...(budgetData.usuariosPermitidos || [])];
    if (budgetData.criadoPor && !rawRecipients.includes(budgetData.criadoPor)) {
      rawRecipients.push(budgetData.criadoPor);
    }
    const recipients = rawRecipients.filter((uid, idx) => !!uid && rawRecipients.indexOf(uid) === idx);
    const { create: createNotification } = await import('@data/repositories/notificationsRepo.js');
    const notificationData = {
      type: 'recorrente_reminder',
      budgetId,
      budgetName: budgetData.nome || 'Orçamento',
      senderUid,
      senderName,
      recorrenteId: recorrenteData?.id || null,
      recorrenteNome: recorrenteData?.nome || 'Recorrente',
      recorrenteValor: recorrenteData?.valor || 0,
      recorrenteDescricao: recorrenteData?.descricao || '',
      createdAt: serverTimestamp(),
      read: false,
    };
    await Promise.all(recipients.map(async (recipientUid) => {
      try {
        await createNotification({ ...notificationData, recipientUid });
        console.log(`📧 Notificação de recorrente enviada para usuário: ${recipientUid}`);
      } catch (error) {
        console.error(`Erro ao enviar notificação de recorrente para ${recipientUid}:`, error);
      }
    }));
  } catch (error) {
    console.error('Erro ao enviar notificação de recorrente:', error);
  }
}

// Envia notificação de resumo semanal
export async function sendWeeklySummaryNotification(budgetId, senderUid, summaryData) {
  try {
    const { serverTimestamp } = await import('firebase/firestore');
    const { getById: getBudgetById } = await import('@data/repositories/budgetsRepo.js');
    const budgetData = await getBudgetById(budgetId);
    if (!budgetData) return;
    const senderInfo = await getUserInfo(senderUid);
    const senderName = senderInfo?.displayName || senderInfo?.email || 'Usuário';
    const rawRecipients = [...(budgetData.usuariosPermitidos || [])];
    if (budgetData.criadoPor && !rawRecipients.includes(budgetData.criadoPor)) {
      rawRecipients.push(budgetData.criadoPor);
    }
    const recipients = rawRecipients.filter((uid, idx) => !!uid && rawRecipients.indexOf(uid) === idx);
    const { create: createNotification } = await import('@data/repositories/notificationsRepo.js');
    const notificationData = {
      type: 'weekly_summary',
      budgetId,
      budgetName: budgetData.nome || 'Orçamento',
      senderUid,
      senderName,
      resumo: summaryData?.resumo,
      periodo: summaryData?.periodo,
      createdAt: serverTimestamp(),
      read: false,
    };
    await Promise.all(recipients.map(async (recipientUid) => {
      try {
        await createNotification({ ...notificationData, recipientUid });
        console.log(`📧 Notificação de resumo semanal enviada para usuário: ${recipientUid}`);
      } catch (error) {
        console.error(`Erro ao enviar notificação de resumo semanal para ${recipientUid}:`, error);
      }
    }));
  } catch (error) {
    console.error('Erro ao enviar notificação de resumo semanal:', error);
  }
}
// features/notifications/NotificationService.js
import { eventBus } from '@core/events/eventBus.js';

// Função para enviar notificação de nova transação
export async function sendTransactionNotification(budgetId, senderUid, transactionData) {
  try {
    // Buscar informações do orçamento via repo
    const { serverTimestamp } = await import('firebase/firestore');
    const { getById: getBudgetById } = await import('@data/repositories/budgetsRepo.js');
    const budgetData = await getBudgetById(budgetId);

    if (!budgetData) {
      console.log('Orçamento não encontrado para notificação');
      return;
    }

    // Verificar se é um orçamento compartilhado
    if (!budgetData.usuariosPermitidos || budgetData.usuariosPermitidos.length === 0) {
      console.log('Orçamento não compartilhado, não enviando notificação');
      return;
    }

    // Buscar informações do usuário que adicionou a transação
    const senderInfo = await getUserInfo(senderUid);
    const senderName = senderInfo?.displayName || senderInfo?.email || 'Usuário';

    // Buscar categoria da transação
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

    // Preparar dados da notificação
    const notificationData = {
      budgetId,
      budgetName: budgetData.nome || 'Orçamento',
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

    // Enviar notificação para todos os usuários do orçamento
    const rawRecipients = [...(budgetData.usuariosPermitidos || [])];
    if (budgetData.criadoPor && !rawRecipients.includes(budgetData.criadoPor)) {
      rawRecipients.push(budgetData.criadoPor);
    }
    const recipients = rawRecipients.filter((uid, idx) => !!uid && rawRecipients.indexOf(uid) === idx && uid !== senderUid);

    const { create: createNotification } = await import('@data/repositories/notificationsRepo.js');
    const notificationPromises = recipients.map(async (recipientUid) => {
      try {
        await createNotification({ ...notificationData, recipientUid });
        console.log(`📧 Notificação enviada para usuário: ${recipientUid}`);
      } catch (error) {
        console.error(`Erro ao enviar notificação para ${recipientUid}:`, error);
      }
    });

    await Promise.all(notificationPromises);
    console.log('✅ Notificações enviadas com sucesso');
  } catch (error) {
    console.error('Erro ao enviar notificações:', error);
  }
}

// Função para enviar notificação de exclusão de transação
export async function sendTransactionDeletedNotification(budgetId, senderUid, transactionData) {
  try {
    const { serverTimestamp } = await import('firebase/firestore');
    const { getById: getBudgetById } = await import('@data/repositories/budgetsRepo.js');
    const budgetData = await getBudgetById(budgetId);

    if (!budgetData) {
      console.log('Orçamento não encontrado para notificação de exclusão');
      return;
    }

    // Verificar se é um orçamento compartilhado
    if (!budgetData.usuariosPermitidos || budgetData.usuariosPermitidos.length === 0) {
      console.log('Orçamento não compartilhado, não enviando notificação de exclusão');
      return;
    }

    // Buscar informações do usuário que excluiu a transação
    const senderInfo = await getUserInfo(senderUid);
    const senderName = senderInfo?.displayName || senderInfo?.email || 'Usuário';

    // Buscar categoria da transação
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

    // Preparar dados da notificação
    const notificationData = {
      budgetId,
      budgetName: budgetData.nome || 'Orçamento',
      senderUid,
      senderName,
      transactionId: transactionData?.id ?? null,
      transactionDescricao: transactionData?.descricao ?? null,
      transactionValor: transactionData?.valor ?? null,
      transactionCategoria: categoriaNome,
      transactionTipo: transactionData?.tipo || 'despesa',
      transactionCategoriaTipo: categoriaTipo,
      transactionCategoriaLimite: categoriaLimite,
      createdAt: serverTimestamp(),
      read: false,
      type: 'deleted_transaction'
    };

    // Enviar notificação para todos os usuários do orçamento
    const rawRecipients = [...(budgetData.usuariosPermitidos || [])];
    if (budgetData.criadoPor && !rawRecipients.includes(budgetData.criadoPor)) {
      rawRecipients.push(budgetData.criadoPor);
    }
    const recipients = rawRecipients.filter((uid, idx) => !!uid && rawRecipients.indexOf(uid) === idx && uid !== senderUid);

    const { create: createNotification } = await import('@data/repositories/notificationsRepo.js');
    const notificationPromises = recipients.map(async (recipientUid) => {
      try {
        await createNotification({ ...notificationData, recipientUid });
        console.log(`📧 Notificação de exclusão enviada para usuário: ${recipientUid}`);
      } catch (error) {
        console.error(`Erro ao enviar notificação de exclusão para ${recipientUid}:`, error);
      }
    });

    await Promise.all(notificationPromises);
    console.log('✅ Notificações de exclusão enviadas com sucesso');
  } catch (error) {
    console.error('Erro ao enviar notificações de exclusão:', error);
  }
}

// Função para enviar notificação de atualização de transação
export async function sendTransactionUpdatedNotification(budgetId, senderUid, transactionData) {
  try {
    const { serverTimestamp } = await import('firebase/firestore');
    const { getById: getBudgetById } = await import('@data/repositories/budgetsRepo.js');
    const budgetData = await getBudgetById(budgetId);

    if (!budgetData) { return; }
    if (!budgetData.usuariosPermitidos || budgetData.usuariosPermitidos.length === 0) { return; }

    const senderInfo = await getUserInfo(senderUid);
    const senderName = senderInfo?.displayName || senderInfo?.email || 'Usuário';

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

    // Normaliza conjunto de mudanças se vier do caller
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
      budgetName: budgetData.nome || 'Orçamento',
      senderUid,
      senderName,
      transactionId: transactionData?.id ?? null,
      transactionDescricao: transactionData?.descricao ?? null,
      transactionValor: transactionData?.valor ?? null,
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
        console.log(`📧 Notificação de atualização enviada para usuário: ${recipientUid}`);
      } catch (err) {
        console.error(`Erro ao enviar notificação de atualização para ${recipientUid}:`, err);
      }
    }));
  } catch (error) {
    console.error('Erro ao enviar notificações de atualização:', error);
  }
}

// Função genérica para notificar mudanças de despesa recorrente
export async function sendRecorrenteChangeNotification(budgetId, senderUid, recorrenteData, changeType, prevData = null) {
  try {
    const { serverTimestamp } = await import('firebase/firestore');
    const { getById: getBudgetById } = await import('@data/repositories/budgetsRepo.js');
    const budgetData = await getBudgetById(budgetId);

    if (!budgetData) { return; }
    if (!budgetData.usuariosPermitidos || budgetData.usuariosPermitidos.length === 0) { return; }

    const senderInfo = await getUserInfo(senderUid);
    const senderName = senderInfo?.displayName || senderInfo?.email || 'Usuário';

    // Build changeSet when prevData exists
    const changes = {};
    if (prevData) {
      if (prevData.nome !== recorrenteData?.nome) {
        changes.nome = { from: prevData.nome ?? null, to: recorrenteData?.nome ?? null };
      }
      if (prevData.valor !== recorrenteData?.valor) {
        changes.valor = { from: prevData.valor ?? null, to: recorrenteData?.valor ?? null };
      }
      if (prevData.frequencia !== recorrenteData?.frequencia) {
        changes.frequencia = { from: prevData.frequencia ?? null, to: recorrenteData?.frequencia ?? null };
      }
      if (prevData.categoria !== recorrenteData?.categoria) {
        changes.categoria = { from: prevData.categoria ?? null, to: recorrenteData?.categoria ?? null };
      }
      if (prevData.descricao !== recorrenteData?.descricao) {
        changes.descricao = { from: prevData.descricao ?? null, to: recorrenteData?.descricao ?? null };
      }
      if (prevData.parcelasRestantes !== recorrenteData?.parcelasRestantes) {
        changes.parcelasRestantes = { from: prevData.parcelasRestantes ?? null, to: recorrenteData?.parcelasRestantes ?? null };
      }
      if (prevData.parcelasTotal !== recorrenteData?.parcelasTotal) {
        changes.parcelasTotal = { from: prevData.parcelasTotal ?? null, to: recorrenteData?.parcelasTotal ?? null };
      }
    }

    const notificationData = {
      budgetId,
      budgetName: budgetData.nome || 'Orçamento',
      senderUid,
      senderName,
      recorrenteId: recorrenteData?.id ?? null,
      recorrenteNome: recorrenteData?.nome ?? null,
      recorrenteValor: recorrenteData?.valor ?? null,
      recorrenteFrequencia: recorrenteData?.frequencia ?? null,
      recorrenteCategoria: recorrenteData?.categoria ?? null,
      recorrenteDescricao: recorrenteData?.descricao ?? null,
      recorrenteParcelasRestantes: recorrenteData?.parcelasRestantes ?? null,
      recorrenteParcelasTotal: recorrenteData?.parcelasTotal ?? null,
      changes,
      prev: prevData ? {
        nome: prevData.nome ?? null,
        valor: prevData.valor ?? null,
        frequencia: prevData.frequencia ?? null,
        categoria: prevData.categoria ?? null,
        descricao: prevData.descricao ?? null,
        parcelasRestantes: prevData.parcelasRestantes ?? null,
        parcelasTotal: prevData.parcelasTotal ?? null,
      } : null,
      type: changeType,
      createdAt: serverTimestamp(),
      read: false,
    };

    // Enviar para todos os usuários do orçamento
    const { create } = await import('@data/repositories/notificationsRepo.js');
    
    // Verificar se há outros usuários além do remetente
    const otherUsers = budgetData.usuariosPermitidos.filter(uid => uid !== senderUid);
    
    if (otherUsers.length === 0) {
      // Se não há outros usuários, enviar para o próprio usuário (modo de teste)
      console.log(`[NotificationService] Nenhum outro usuário no orçamento, enviando notificação para o próprio usuário (${senderUid})`);
      try {
        await create({
          ...notificationData,
          recipientUid: senderUid,
        });
        console.log(`Notificação de ${changeType} de despesa recorrente enviada para o próprio usuário (${senderUid})`);
      } catch (err) {
        console.error(`Erro ao enviar notificação de ${changeType} de despesa recorrente para o próprio usuário:`, err);
      }
    } else {
      // Enviar para outros usuários (comportamento normal)
      await Promise.all(otherUsers.map(async (recipientUid) => {
        try {
          await create({
            ...notificationData,
            recipientUid,
          });
          console.log(`Notificação de ${changeType} de despesa recorrente enviada para ${recipientUid}`);
        } catch (err) {
          console.error(`Erro ao enviar notificação de ${changeType} de despesa recorrente para ${recipientUid}:`, err);
        }
      }));
    }
  } catch (error) {
    console.error('Erro ao enviar notificações de mudança de despesa recorrente:', error);
  }
}

// Função genérica para notificar mudanças de categoria
export async function sendCategoryChangeNotification(budgetId, senderUid, categoryData, changeType, prevData = null) {
  try {
    const { serverTimestamp } = await import('firebase/firestore');
    const { getById: getBudgetById } = await import('@data/repositories/budgetsRepo.js');
    const budgetData = await getBudgetById(budgetId);

    if (!budgetData) { return; }
    if (!budgetData.usuariosPermitidos || budgetData.usuariosPermitidos.length === 0) { return; }

    const senderInfo = await getUserInfo(senderUid);
    const senderName = senderInfo?.displayName || senderInfo?.email || 'Usuário';

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
      if (prevData.descricao !== categoryData?.descricao) {
        changes.descricao = { from: prevData.descricao ?? null, to: categoryData?.descricao ?? null };
      }
      if (prevData.cor !== categoryData?.cor) {
        changes.cor = { from: prevData.cor ?? null, to: categoryData?.cor ?? null };
      }
    }

    const notificationData = {
      budgetId,
      budgetName: budgetData.nome || 'Orçamento',
      senderUid,
      senderName,
      categoryId: categoryData?.id ?? null,
      categoryNome: categoryData?.nome ?? null,
      categoryTipo: categoryData?.tipo ?? null,
      categoryLimite: categoryData?.limite ?? null,
      categoryDescription: categoryData?.descricao ?? null,
      categoryColor: categoryData?.cor ?? null,
      changes,
      prev: prevData ? {
        nome: prevData.nome ?? null,
        tipo: prevData.tipo ?? null,
        limite: prevData.limite ?? null,
        descricao: prevData.descricao ?? null,
        cor: prevData.cor ?? null,
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
        console.log(`📧 Notificação de categoria (${changeType}) enviada para usuário: ${recipientUid}`);
      } catch (err) {
        console.error(`Erro ao enviar notificação de categoria para ${recipientUid}:`, err);
      }
    }));
  } catch (error) {
    console.error('Erro ao enviar notificações de categoria:', error);
  }
}

// Função para sair de um orçamento compartilhado
export async function leaveSharedBudget(budgetId) {
  try {
    const { updateDoc, doc, arrayRemove } = await import('firebase/firestore');
    const { db } = await import('@data/firebase/client.js');
    const user = window.appState.currentUser;

    if (!user) {
      console.error('Usuário não autenticado');
      return;
    }

    const budgetRef = doc(db, 'budgets', budgetId);
    await updateDoc(budgetRef, {
      usuariosPermitidos: arrayRemove(user.uid)
    });

    console.log('✅ Usuário removido do orçamento compartilhado');

    if (window.Snackbar) {
      window.Snackbar({
        message: '✅ Saída do orçamento realizada com sucesso',
        type: 'success'
      });
    }
  } catch (error) {
    console.error('Erro ao sair do orçamento:', error);
    if (window.Snackbar) {
      window.Snackbar({
        message: '❌ Erro ao sair do orçamento',
        type: 'error'
      });
    }
  }
}

// Função para remover usuário de um orçamento compartilhado
export async function removeUserFromBudget(budgetId, userUid) {
  try {
    const { updateDoc, doc, arrayRemove } = await import('firebase/firestore');
    const { db } = await import('@data/firebase/client.js');
    const currentUser = window.appState.currentUser;

    if (!currentUser) {
      console.error('Usuário não autenticado');
      return;
    }

    const budgetRef = doc(db, 'budgets', budgetId);
    await updateDoc(budgetRef, {
      usuariosPermitidos: arrayRemove(userUid)
    });

    console.log('✅ Usuário removido do orçamento compartilhado');

    if (window.Snackbar) {
      window.Snackbar({
        message: '✅ Usuário removido com sucesso',
        type: 'success'
      });
    }
  } catch (error) {
    console.error('Erro ao remover usuário:', error);
    if (window.Snackbar) {
      window.Snackbar({
        message: '❌ Erro ao remover usuário',
        type: 'error'
      });
    }
  }
}

// Função auxiliar para buscar informações do usuário
async function getUserInfo(uid) {
  try {
    const { getDoc, doc } = await import('firebase/firestore');
    const { db } = await import('@data/firebase/client.js');
    const userDoc = await getDoc(doc(db, 'users', uid));

    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      return {
        displayName: 'Usuário desconhecido',
        email: 'email@desconhecido.com'
      };
    }
  } catch (error) {
    console.error('Erro ao buscar informações do usuário:', error);
    return {
      displayName: 'Erro ao carregar',
      email: 'erro@carregar.com'
    };
  }
}

// Envia uma notificação de teste para o DONO do orçamento
export async function sendTestNotificationToOwner(budgetId, senderUid) {
  try {
    const { serverTimestamp } = await import('firebase/firestore');
    const { getById: getBudgetById } = await import('@data/repositories/budgetsRepo.js');
    const { create: createNotification } = await import('@data/repositories/notificationsRepo.js');

    const budget = await getBudgetById(budgetId);
    if (!budget) {
      throw new Error('Orçamento não encontrado');
    }
    const ownerUid = budget.criadoPor || budget.userId;
    if (!ownerUid) {
      throw new Error('Dono do orçamento não encontrado');
    }

    const senderInfo = await getUserInfo(senderUid);
    const senderName = senderInfo?.displayName || senderInfo?.email || 'Usuário';

    if (ownerUid === senderUid) {
      // Evitar enviar para si próprio, manter padrão das outras funções
      try { (window.Snackbar && window.Snackbar.info) ? window.Snackbar.info('Você é o dono deste orçamento', 2500) : eventBus.emit('snackbar:show', { message: 'Você é o dono deste orçamento', type: 'info', duration: 2500 }); } catch {}
      return;
    }

    const payload = {
      type: 'test_notification',
      budgetId,
      budgetName: budget.nome || 'Orçamento',
      senderUid,
      senderName,
      message: 'Mensagem de teste enviada para o dono do orçamento',
      createdAt: serverTimestamp(),
      read: false,
      recipientUid: ownerUid,
    };

    await createNotification(payload);
    try { (window.Snackbar && window.Snackbar.success) ? window.Snackbar.success('Notificação de teste enviada ao dono', 2500) : eventBus.emit('snackbar:show', { message: 'Notificação de teste enviada ao dono', type: 'success', duration: 2500 }); } catch {}
  } catch (error) {
    console.error('Erro ao enviar notificação de teste (dono):', error);
    try { (window.Snackbar && window.Snackbar.error) ? window.Snackbar.error('Erro ao enviar teste para dono', 2500) : eventBus.emit('snackbar:show', { message: 'Erro ao enviar teste para dono', type: 'error', duration: 2500 }); } catch {}
  }
}

// Envia uma notificação de teste para TODOS os usuários compartilhados (exclui remetente)
export async function sendTestNotificationToShared(budgetId, senderUid) {
  try {
    const { serverTimestamp } = await import('firebase/firestore');
    const { getById: getBudgetById } = await import('@data/repositories/budgetsRepo.js');
    const { create: createNotification } = await import('@data/repositories/notificationsRepo.js');

    const budget = await getBudgetById(budgetId);
    if (!budget) {
      throw new Error('Orçamento não encontrado');
    }
    const shared = Array.isArray(budget.usuariosPermitidos) ? budget.usuariosPermitidos.slice() : [];
    // Garantir unicidade e remover vazios
    const recipients = Array.from(new Set(shared.filter(Boolean))).filter((uid) => uid !== senderUid);
    if (!recipients.length) {
      try { (window.Snackbar && window.Snackbar.info) ? window.Snackbar.info('Nenhum usuário compartilhado para notificar', 2500) : eventBus.emit('snackbar:show', { message: 'Nenhum usuário compartilhado para notificar', type: 'info', duration: 2500 }); } catch {}
      return;
    }

    const senderInfo = await getUserInfo(senderUid);
    const senderName = senderInfo?.displayName || senderInfo?.email || 'Usuário';

    await Promise.all(recipients.map((recipientUid) => createNotification({
      type: 'test_notification',
      budgetId,
      budgetName: budget.nome || 'Orçamento',
      senderUid,
      senderName,
      message: 'Mensagem de teste enviada para usuários compartilhados',
      createdAt: serverTimestamp(),
      read: false,
      recipientUid,
    })));
    try { (window.Snackbar && window.Snackbar.success) ? window.Snackbar.success('Notificação de teste enviada aos compartilhados', 2500) : eventBus.emit('snackbar:show', { message: 'Notificação de teste enviada aos compartilhados', type: 'success', duration: 2500 }); } catch {}
  } catch (error) {
    console.error('Erro ao enviar notificação de teste (compartilhados):', error);
    try { (window.Snackbar && window.Snackbar.error) ? window.Snackbar.error('Erro ao enviar teste para compartilhados', 2500) : eventBus.emit('snackbar:show', { message: 'Erro ao enviar teste para compartilhados', type: 'error', duration: 2500 }); } catch {}
  }
}

// Exportar função auxiliar para uso externo
export { getUserInfo };
