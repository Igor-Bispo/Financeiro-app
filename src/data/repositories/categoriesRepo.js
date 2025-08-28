// data/repositories/categoriesRepo.js
// Repositório de categorias: encapsula acesso ao Firestore.

import { db } from '../firebase/client.js';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';

const COLL = 'categories';

export async function getById(id) {
  if (!id) {
    return null;
  }
  const ref = doc(db, COLL, id);
  const snap = await getDoc(ref);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function list(filters = {}) {
  const collRef = collection(db, COLL);
  const clauses = [];
  if (filters.budgetId) {
    clauses.push(where('budgetId', '==', filters.budgetId));
  }
  if (filters.userId) {
    clauses.push(where('userId', '==', filters.userId));
  }
  const q = clauses.length ? query(collRef, ...clauses) : query(collRef);
  const snap = await getDocs(q);
  const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  items.sort((a, b) => (a.nome || '').localeCompare(b.nome || ''));
  return items;
}

export async function create(dto) {
  const collRef = collection(db, COLL);
  const res = await addDoc(collRef, dto);
  return res.id;
}

export async function update(id, dto) {
  const ref = doc(db, COLL, id);
  await updateDoc(ref, dto);
  return true;
}

export async function remove(id) {
  const ref = doc(db, COLL, id);
  await deleteDoc(ref);
  return true;
}
