import { addDoc, collection, doc, getDocs, onSnapshot, query, updateDoc, where, writeBatch } from 'firebase/firestore';

const COL = 'notifications';

function mapDoc(d) {
  return { id: d.id, ...d.data() };
}

function sortByCreatedAtDesc(items) {
  const toDate = (v) => v?.toDate ? v.toDate() : (v?.seconds ? new Date(v.seconds * 1000) : (v ? new Date(v) : new Date(0)));
  return items.sort((a, b) => toDate(b.createdAt) - toDate(a.createdAt));
}

export async function listByRecipient(recipientUid, max = 50) {
  if (!recipientUid) { return []; }
  const q = query(collection(db, COL), where('recipientUid', '==', recipientUid));
  const snap = await getDocs(q);
  let items = snap.docs.map(mapDoc);
  items = sortByCreatedAtDesc(items).slice(0, max);
  return items;
}

export async function listenByRecipient(recipientUid, onData, max = 50) {
  if (!recipientUid || typeof onData !== 'function') { 
    console.log('[NotificationsRepo] ❌ listenByRecipient - Parâmetros inválidos:', { recipientUid, onData: typeof onData }); 
    return () => {}; 
  }
  console.log('[NotificationsRepo] 👂 listenByRecipient - Iniciando listener para:', recipientUid);
  
  // Importar db dinamicamente para garantir que está inicializado
  const { db } = await import('@data/firebase/client.js');
  
  const q = query(collection(db, COL), where('recipientUid', '==', recipientUid));
  return onSnapshot(q, (snap) => {
    let items = [];
    snap.forEach((d) => items.push(mapDoc(d)));
    items = sortByCreatedAtDesc(items).slice(0, max);
    console.log('[NotificationsRepo] 👂 listenByRecipient - Itens recebidos:', items.length);
    console.log('[NotificationsRepo] 👂 listenByRecipient - Detalhes:', items.map(n => ({ id: n.id, type: n.type, read: n.read })));
    onData(items);
  });
}

// Cria uma notificação (documento único) e retorna o ID
export async function create(notification) {
  console.log('[NotificationsRepo] 📝 Criando notificação:', { 
    type: notification.type, 
    recipientUid: notification.recipientUid, 
    senderUid: notification.senderUid,
    budgetId: notification.budgetId 
  });
  
  // Importar db dinamicamente
  const { db } = await import('@data/firebase/client.js');
  
  const ref = await addDoc(collection(db, COL), notification);
  console.log('[NotificationsRepo] ✅ Notificação criada com ID:', ref.id);
  return ref.id;
}

// Marca uma notificação como lida
export async function markAsRead(notificationId) {
  if (!notificationId) { return; }
  
  // Importar db dinamicamente
  const { db } = await import('@data/firebase/client.js');
  
  await updateDoc(doc(db, COL, notificationId), { read: true });
}

// Marca várias notificações como lidas
export async function markManyAsRead(notificationIds = []) {
  if (!Array.isArray(notificationIds) || notificationIds.length === 0) { return; }
  
  // Importar db dinamicamente
  const { db } = await import('@data/firebase/client.js');
  
  const batch = writeBatch(db);
  notificationIds.forEach((id) => {
    batch.update(doc(db, COL, id), { read: true });
  });
  await batch.commit();
}

// Apaga várias notificações pelos IDs
export async function deleteMany(notificationIds = []) {
  if (!Array.isArray(notificationIds) || notificationIds.length === 0) { return; }
  
  // Importar db dinamicamente
  const { db } = await import('@data/firebase/client.js');
  
  const batch = writeBatch(db);
  notificationIds.forEach((id) => {
    batch.delete(doc(db, COL, id));
  });
  await batch.commit();
}

// Apaga uma notificação
export async function deleteOne(notificationId) {
  if (!notificationId) { return; }
  // Reutiliza a operação em lote para consistência
  await deleteMany([notificationId]);
}

// Marca uma notificação como fixada/desfixada
export async function pin(notificationId, pinned = true) {
  if (!notificationId) { return; }
  await updateDoc(doc(db, COL, notificationId), { pinned: !!pinned });
}

// Marca várias como fixadas/desfixadas
export async function pinMany(notificationIds = [], pinned = true) {
  if (!Array.isArray(notificationIds) || notificationIds.length === 0) { return; }
  const batch = writeBatch(db);
  notificationIds.forEach((id) => {
    batch.update(doc(db, COL, id), { pinned: !!pinned });
  });
  await batch.commit();
}

// Arquiva/Desarquiva uma notificação
export async function archive(notificationId, archived = true) {
  if (!notificationId) { return; }
  const payload = archived ? { archivedAt: new Date().toISOString() } : { archivedAt: null };
  await updateDoc(doc(db, COL, notificationId), payload);
}

// Arquiva em lote notificações lidas
export async function archiveMany(notificationIds = []) {
  if (!Array.isArray(notificationIds) || notificationIds.length === 0) { return; }
  const batch = writeBatch(db);
  const ts = new Date().toISOString();
  notificationIds.forEach((id) => {
    batch.update(doc(db, COL, id), { archivedAt: ts });
  });
  await batch.commit();
}

// Obtém notificações não lidas de um usuário
export async function getUnreadNotifications(recipientUid, max = 50) {
  if (!recipientUid) { return []; }
  
  // Importar db dinamicamente
  const { db } = await import('@data/firebase/client.js');
  
  const q = query(
    collection(db, COL), 
    where('recipientUid', '==', recipientUid),
    where('read', '==', false)
  );
  const snap = await getDocs(q);
  let items = snap.docs.map(mapDoc);
  items = sortByCreatedAtDesc(items).slice(0, max);
  return items;
}

// Classe para encapsular o repositório
class NotificationsRepo {
  async listByRecipient(recipientUid, max = 50) {
    return listByRecipient(recipientUid, max);
  }

  async listenByRecipient(recipientUid, onData, max = 50) {
    return listenByRecipient(recipientUid, onData, max);
  }

  async create(notification) {
    return create(notification);
  }

  async markAsRead(notificationId) {
    return markAsRead(notificationId);
  }

  async markManyAsRead(notificationIds) {
    return markManyAsRead(notificationIds);
  }

  async deleteMany(notificationIds) {
    return deleteMany(notificationIds);
  }

  async deleteOne(notificationId) {
    return deleteOne(notificationId);
  }

  async pin(notificationId, pinned = true) {
    return pin(notificationId, pinned);
  }

  async pinMany(notificationIds, pinned = true) {
    return pinMany(notificationIds, pinned);
  }

  async archive(notificationId, archived = true) {
    return archive(notificationId, archived);
  }

  async archiveMany(notificationIds) {
    return archiveMany(notificationIds);
  }

  async getUnreadNotifications(recipientUid, max = 50) {
    return getUnreadNotifications(recipientUid, max);
  }
}

// Instância singleton
let notificationsRepoInstance = null;

/**
 * Obtém a instância do repositório de notificações
 */
export function getNotificationsRepo() {
  if (!notificationsRepoInstance) {
    notificationsRepoInstance = new NotificationsRepo();
  }
  return notificationsRepoInstance;
}
