import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, setDoc, writeBatch } from 'firebase/firestore';
import { db } from './firebase.js';

export async function addTransacao(userId, data) {
  const ref = collection(db, 'users', userId, 'transacoes');
  return await addDoc(ref, data);
}

export async function getTransacoes(userId) {
  const ref = collection(db, 'users', userId, 'transacoes');
  const snap = await getDocs(ref);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Salva todas as transações do mês em um documento de histórico mensal
export async function salvarHistoricoMensal(userId, transacoes, dataFechamento) {
  const ref = collection(db, 'users', userId, 'historicoMensal');
  const mesAno = dataFechamento.toISOString().slice(0,7); // YYYY-MM
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

// CRUD para despesas recorrentes
export async function addDespesaRecorrente(userId, data) {
  const ref = collection(db, 'users', userId, 'despesasRecorrentes');
  await addDoc(ref, data);
}

export async function getDespesasRecorrentes(userId) {
  const ref = collection(db, 'users', userId, 'despesasRecorrentes');
  const snapshot = await getDocs(ref);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function updateDespesaRecorrente(userId, id, data) {
  const ref = doc(db, 'users', userId, 'despesasRecorrentes', id);
  await updateDoc(ref, data);
}

export async function deleteDespesaRecorrente(userId, id) {
  const ref = doc(db, 'users', userId, 'despesasRecorrentes', id);
  await deleteDoc(ref);
} 