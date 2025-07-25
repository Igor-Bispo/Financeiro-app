import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where
} from 'firebase/firestore';
import { db } from './firebase.js';

export async function getDespesasRecorrentes(userId, budgetId) {
  const ref = collection(db, 'users', userId, 'despesasRecorrentes');
  let q = ref;
  if (budgetId) {
    q = query(ref, where('budgetId', '==', budgetId));
  }
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function addDespesaRecorrente(userId, budgetId, dados) {
  return await addDoc(collection(db, 'users', userId, 'despesasRecorrentes'), {
    ...dados,
    userId,
    budgetId
  });
}

export async function updateDespesaRecorrente(userId, id, dados) {
  return await updateDoc(doc(db, 'users', userId, 'despesasRecorrentes', id), dados);
}

export async function deleteDespesaRecorrente(userId, id) {
  return await deleteDoc(doc(db, 'users', userId, 'despesasRecorrentes', id));
}
