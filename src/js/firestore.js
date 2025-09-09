import {
  collection,
  getDocs,
  doc,
  setDoc,
  writeBatch
} from 'firebase/firestore';
import { db } from './firebase.js';

// NOTA: FunÃ§Ãµes de transaÃ§Ãµes movidas para app.js
// As novas funÃ§Ãµes estÃ£o em: src/js/app.js (addTransaction, loadTransactions, etc.)

// Salva todas as transaÃ§Ãµes do mÃªs em um documento de histÃ³rico mensal
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

// Limpa todas as transaÃ§Ãµes do usuÃ¡rio
export async function limparTransacoes(userId) {
  const ref = collection(db, 'users', userId, 'transacoes');
  const snapshot = await getDocs(ref);
  const batch = writeBatch(db);
  snapshot.forEach(doc => batch.delete(doc.ref));
  await batch.commit();
}

// NOTA: FunÃ§Ãµes de recorrentes movidas para recorrentes.js
// As novas funÃ§Ãµes estÃ£o em: src/js/recorrentes.js

// Busca um orÃ§amento pelo ID na coleÃ§Ã£o 'budgets'
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

// Busca e-mails dos usuÃ¡rios a partir de uma lista de UIDs
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

// Busca o UID de um usuÃ¡rio pelo e-mail na coleÃ§Ã£o 'users'
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
