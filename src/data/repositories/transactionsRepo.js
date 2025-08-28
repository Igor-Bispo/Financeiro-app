import { db } from '@data/firebase/client.js';
import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';

const COL = 'transactions';

// Map Firestore doc to plain object with id
function mapDoc(d) {
  return { id: d.id, ...d.data() };
}

// List transactions with optional filters. Common usage: list({ budgetId })
export async function list({ budgetId, userId } = {}) {
  const colRef = collection(db, COL);
  const clauses = [];
  if (budgetId) {
    clauses.push(where('budgetId', '==', budgetId));
  }
  if (userId) {
    clauses.push(where('userId', '==', userId));
  }
  const q = clauses.length ? query(colRef, ...clauses) : query(colRef);
  const snap = await getDocs(q);
  const items = snap.docs.map(mapDoc);
  // Sort by createdAt desc client-side to avoid index requirements
  items.sort((a, b) => {
    const toDate = (v) => {
      return v?.toDate ? v.toDate() : (v?.seconds ? new Date(v.seconds * 1000) : (v ? new Date(v) : new Date(0)));
    };
    return toDate(b.createdAt) - toDate(a.createdAt);
  });
  return items;
}

export async function getById(id) {
  const ref = doc(db, COL, id);
  const snap = await getDoc(ref);
  return snap.exists() ? mapDoc(snap) : null;
}

export async function create(dto) {
  const now = serverTimestamp();
  const payload = { ...dto };
  if (!payload.createdAt) {
    payload.createdAt = now;
  }
  if (!payload.updatedAt) {
    payload.updatedAt = now;
  }
  const ref = await addDoc(collection(db, COL), payload);
  return { id: ref.id };
}

export async function update(id, dto) {
  const ref = doc(db, COL, id);
  await updateDoc(ref, { ...dto, updatedAt: serverTimestamp() });
}

export async function remove(id) {
  const ref = doc(db, COL, id);
  await deleteDoc(ref);
}

// Existing helper to create a transaction from a recurring record
export async function createFromRecurring({ userId, budgetId, rec, createdDate, parcelaAtual }) {
  const data = {
    userId,
    budgetId,
    descricao: rec.descricao,
    valor: rec.valor,
    categoriaId: rec.categoriaId,
    tipo: 'despesa',
    createdAt: Timestamp.fromDate(createdDate),
    recorrenteId: rec.id,
    recorrenteNome: rec.descricao,
    parcelaAtual: parcelaAtual ?? null,
    parcelasTotal: rec.parcelasTotal ?? null,
  };
  const ref = await addDoc(collection(db, COL), data);
  return { id: ref.id };
}
