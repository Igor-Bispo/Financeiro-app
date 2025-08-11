import {
  collection,
  getDocs,
  doc,
  setDoc,
  writeBatch
} from 'firebase/firestore';
import { db } from './firebase.js';

// NOTA: Funções de transações movidas para app.js
// As novas funções estão em: src/js/app.js (addTransaction, loadTransactions, etc.)

// Salva todas as transações do mês em um documento de histórico mensal
export async function salvarHistoricoMensal(
  userId,
  transacoes,
  dataFechamento
) {
  const ref = collection(db, 'users', userId, 'historicoMensal');
  const mesAno = dataFechamento.toISOString().slice(0, 7); // YYYY-MM
  await setDoc(doc(ref, mesAno), {
    transacoes,
    dataFechamento: dataFechamento.toISOString()
  });
}

// Limpa todas as transações do usuário
export async function limparTransacoes(userId) {
  const ref = collection(db, 'users', userId, 'transacoes');
  const snapshot = await getDocs(ref);
  const batch = writeBatch(db);
  snapshot.forEach(doc => batch.delete(doc.ref));
  await batch.commit();
}

// NOTA: Funções de recorrentes movidas para recorrentes.js
// As novas funções estão em: src/js/recorrentes.js

// Busca um orçamento pelo ID na coleção 'budgets'
export async function buscarOrcamentoPorId(budgetId) {
  const { doc, getDoc } = await import('firebase/firestore');
  const { db } = await import('./firebase.js');
  const ref = doc(db, 'budgets', budgetId);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    return { id: snap.id, ...snap.data() };
  }
  return null;
}

// Busca e-mails dos usuários a partir de uma lista de UIDs
export async function buscarEmailsPorUids(uids) {
  const { doc, getDoc } = await import('firebase/firestore');
  const { db } = await import('./firebase.js');
  const results = [];
  for (const uid of uids) {
    const ref = doc(db, 'users', uid);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      results.push({ uid, ...snap.data() });
    } else {
      results.push({ uid });
    }
  }
  return results;
}

// Busca o UID de um usuário pelo e-mail na coleção 'users'
export async function buscarUidPorEmail(email) {
  const { collection, getDocs, query, where } = await import(
    'firebase/firestore'
  );
  const { db } = await import('./firebase.js');
  const q = query(collection(db, 'users'), where('email', '==', email));
  const snap = await getDocs(q);
  if (!snap.empty) {
    const docSnap = snap.docs[0];
    return docSnap.id;
  }
  return null;
}
