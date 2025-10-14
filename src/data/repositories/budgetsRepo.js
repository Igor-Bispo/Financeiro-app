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
  deleteDoc,
  onSnapshot
} from 'firebase/firestore';

const COLL = 'budgets';

export async function getById(id) {
  if (!id) return null;
  const ref = doc(db, COLL, id);
  const snap = await getDoc(ref);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function list(filters = {}) {
  console.log('🔍 [BudgetsRepo] list - Filtros:', filters);
  console.log('🔍 [BudgetsRepo] list - Coleção:', COLL);
  const collRef = collection(db, COLL);
  const clauses = [];
  if (filters.userId) clauses.push(where('userId', '==', filters.userId));
  const q = clauses.length ? query(collRef, ...clauses) : collRef;
  console.log('🔍 [BudgetsRepo] list - Query preparada, executando getDocs...');
  const snap = await getDocs(q);
  console.log('📊 [BudgetsRepo] list - Documentos retornados:', snap.docs.length);
  const result = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  console.log('📋 [BudgetsRepo] list - Dados mapeados:', result);
  return result;
}

export async function listOwn(userId) {
  console.log('🔍 [BudgetsRepo] listOwn - userId:', userId);
  const result = await list({ userId });
  console.log('📊 [BudgetsRepo] listOwn - Resultados:', result.length, 'orçamentos');
  console.log('📋 [BudgetsRepo] listOwn - Dados:', result);
  return result;
}

export async function listShared(userId) {
  console.log('🔍 [BudgetsRepo] listShared - userId:', userId);
  const collRef = collection(db, COLL);
  const q = query(collRef, where('usuariosPermitidos', 'array-contains', userId));
  const snap = await getDocs(q);
  const result = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  console.log('📊 [BudgetsRepo] listShared - Resultados:', result.length, 'orçamentos');
  console.log('📋 [BudgetsRepo] listShared - Dados:', result);
  return result;
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

// Listener em tempo real para mudanças
export function listenToChanges(userId, callback) {
  const colRef = collection(db, COLL);
  // Sem orderBy; ordenar no cliente para evitar índices
  const q = query(colRef, where('userId', '==', userId));

  return onSnapshot(q, (snapshot) => {
    const toDate = (v) => v?.toDate ? v.toDate() : (v?.seconds ? new Date(v.seconds * 1000) : (v ? new Date(v) : new Date(0)));
    const budgets = snapshot.docs
      .map(d => ({ id: d.id, ...d.data() }))
      .sort((a, b) => toDate(b.createdAt) - toDate(a.createdAt));
    callback(budgets);
  });
}

// Adiciona um usuário ao orçamento (array usuariosPermitidos)
export async function addUser(id, userId) {
  if (!id || !userId) return false;
  const ref = doc(db, COLL, id);
  // Evitar importar arrayUnion aqui; fazer leitura-escrita simples por compatibilidade
  const snap = await getDoc(ref);
  if (!snap.exists()) return false;
  const data = snap.data() || {};
  const atual = Array.isArray(data.usuariosPermitidos) ? data.usuariosPermitidos.slice() : [];
  if (!atual.includes(userId)) atual.push(userId);
  await updateDoc(ref, { usuariosPermitidos: atual });
  return true;
}
