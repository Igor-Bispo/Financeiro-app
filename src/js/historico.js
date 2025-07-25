import {
  getFirestore,
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc
} from 'firebase/firestore';

const db = getFirestore();

export async function salvarHistoricoMensal(userId, transacoes, dataReferencia) {
  const mesAno = `${dataReferencia.getFullYear()}-${String(dataReferencia.getMonth()).padStart(2, '0')}`;
  const destino = collection(db, 'users', userId, 'historico', mesAno, 'transacoes');

  for (const t of transacoes) {
    await addDoc(destino, t);
  }
}

export async function limparTransacoes(userId) {
  const ref = collection(db, 'transactions');
  const snapshot = await getDocs(ref);
  for (const docSnap of snapshot.docs) {
    const t = docSnap.data();
    if (t.userId === userId) {
      await deleteDoc(doc(db, 'transactions', docSnap.id));
    }
  }
}
