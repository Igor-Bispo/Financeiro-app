import { collection, addDoc } from 'firebase/firestore';

export async function registrarAplicacaoNoLog(db, userId, mesAno, dados) {
  const destino = collection(db, 'users', userId, 'logs', mesAno, 'itens');
  await addDoc(destino, dados);
}
