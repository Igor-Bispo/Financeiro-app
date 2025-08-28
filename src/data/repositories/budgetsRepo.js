// data/repositories/budgetsRepo.js
// Repositório de orçamentos: esconde Firebase atrás de um contrato estável.

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

const COLL = 'budgets';

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
  if (filters.userId) {
    clauses.push(where('userId', '==', filters.userId));
  }
  const q = clauses.length ? query(collRef, ...clauses) : collRef;
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function listOwn(userId) {
  return list({ userId });
}

export async function listShared(userId) {
  const collRef = collection(db, COLL);
  const q = query(collRef, where('usuariosPermitidos', 'array-contains', userId));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
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

// Adiciona um usuário ao orçamento (array usuariosPermitidos)
export async function addUser(id, userId) {
  if (!id || !userId) {
    return false;
  }
  const ref = doc(db, COLL, id);
  // Evitar importar arrayUnion aqui; fazer leitura-escrita simples por compatibilidade
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    return false;
  }
  const data = snap.data() || {};
  const atual = Array.isArray(data.usuariosPermitidos) ? data.usuariosPermitidos.slice() : [];
  if (!atual.includes(userId)) {
    atual.push(userId);
  }
  await updateDoc(ref, { usuariosPermitidos: atual });
  return true;
}
