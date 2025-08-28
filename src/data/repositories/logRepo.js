import { db } from '@data/firebase/client.js';
import { collection, addDoc, serverTimestamp, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';

const COL = 'logAplicacoes';

export async function addRecurringApplication({ userId, mesAno, transacaoId, transacaoData }) {
  const logData = {
    userId,
    mesAno,
    recorrenteId: transacaoData.recorrenteId,
    descricao: transacaoData.descricao,
    valor: transacaoData.valor,
    dataAplicacao: serverTimestamp(),
    aplicacaoImediata: false,
  };
  if (transacaoId) {
    logData.transacaoId = transacaoId;
  }
  await addDoc(collection(db, COL), logData);
}

export async function deleteOlderThanOneYear(userId, limitDate) {
  const q = query(
    collection(db, COL),
    where('userId', '==', userId),
    where('dataAplicacao', '<', limitDate)
  );
  const snapshot = await getDocs(q);
  let count = 0;
  for (const d of snapshot.docs) {
    await deleteDoc(doc(db, COL, d.id));
    count++;
  }
  return count;
}
