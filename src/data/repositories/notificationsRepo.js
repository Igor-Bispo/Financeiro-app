import { db } from '@data/firebase/client.js';
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
  if (!recipientUid) {
    return [];
  }
  const q = query(collection(db, COL), where('recipientUid', '==', recipientUid));
  const snap = await getDocs(q);
  let items = snap.docs.map(mapDoc);
  items = sortByCreatedAtDesc(items).slice(0, max);
  return items;
}

export function listenByRecipient(recipientUid, onData, max = 50) {
  if (!recipientUid || typeof onData !== 'function') {
    return () => {};
  }
  const q = query(collection(db, COL), where('recipientUid', '==', recipientUid));
  return onSnapshot(q, (snap) => {
    let items = [];
    snap.forEach((d) => items.push(mapDoc(d)));
    items = sortByCreatedAtDesc(items).slice(0, max);
    onData(items);
  });
}

// Cria uma notificação (documento único) e retorna o ID
export async function create(notification) {
  const ref = await addDoc(collection(db, COL), notification);
  return ref.id;
}

// Marca uma notificação como lida
export async function markAsRead(notificationId) {
  if (!notificationId) {
    return;
  }
  await updateDoc(doc(db, COL, notificationId), { read: true });
}

// Marca várias notificações como lidas
export async function markManyAsRead(notificationIds = []) {
  if (!Array.isArray(notificationIds) || notificationIds.length === 0) {
    return;
  }
  const batch = writeBatch(db);
  notificationIds.forEach((id) => {
    batch.update(doc(db, COL, id), { read: true });
  });
  await batch.commit();
}

// Apaga várias notificações pelos IDs
export async function deleteMany(notificationIds = []) {
  if (!Array.isArray(notificationIds) || notificationIds.length === 0) {
    return;
  }
  const batch = writeBatch(db);
  notificationIds.forEach((id) => {
    batch.delete(doc(db, COL, id));
  });
  await batch.commit();
}
