// data/repositories/invitationsRepo.js
// Encapsula acesso à coleção de convites de orçamento

import { db } from '@data/firebase/client.js';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';

const COLL = 'budgetInvitations';

export async function listByBudget(budgetId) {
  const q = query(collection(db, COLL), where('budgetId', '==', budgetId));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function remove(id) {
  await deleteDoc(doc(db, COLL, id));
  return true;
}
