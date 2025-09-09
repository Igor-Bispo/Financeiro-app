// Recorrentes repository - Firestore access layer
import { db } from '@data/firebase/client.js';
import { collection, query, where, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc } from 'firebase/firestore';

const COL = 'recorrentes';

export async function listByBudget(budgetId) {
  const q = query(collection(db, COL), where('budgetId', '==', budgetId));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// Fallback: lista todas as recorrentes do usuÃ¡rio (independente de orÃ§amento)
export async function listByUser(userId) {
  const q = query(collection(db, COL), where('userId', '==', userId));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export function create(data) {
  return addDoc(collection(db, COL), data);
}

export function update(id, data) {
  return updateDoc(doc(db, COL, id), data);
}

export function remove(id) {
  return deleteDoc(doc(db, COL, id));
}

export async function getById(id) {
  const d = await getDoc(doc(db, COL, id));
  return d.exists() ? { id: d.id, ...d.data() } : null;
}
