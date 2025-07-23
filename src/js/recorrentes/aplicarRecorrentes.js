import { registrarAplicacaoNoLog } from './logAplicacoes.js';
import { getDespesasRecorrentes, updateDespesaRecorrente } from '../recorrentes.js';
import { db } from '../firebase.js';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export async function aplicarRecorrentesDoMes(userId, budgetId) {
  const agora = new Date();
  const mesAno = agora.toISOString().slice(0, 7); // ex: "2025-07"
  const chaveLocal = `recorrentes-executadas-${mesAno}`;

  if (localStorage.getItem(chaveLocal)) return;

  const recorrentes = await getDespesasRecorrentes(userId, budgetId);
  const ativos = recorrentes.filter(r => r.ativa !== false);

  for (const rec of ativos) {
    const data = new Date();
    data.setDate(rec.diaLancamento || 1);

    const dadosTransacao = {
      userId,
      budgetId,
      descricao: rec.descricao,
      valor: rec.valor,
      categoriaId: rec.categoriaId,
      tipo: 'despesa',
      createdAt: Timestamp.fromDate(data)
    };
    await addDoc(collection(db, 'transactions'), dadosTransacao);
    await registrarAplicacaoNoLog(db, userId, mesAno, dadosTransacao);

    if (rec.parcelasRestantes !== null && rec.parcelasRestantes > 1) {
      await updateDespesaRecorrente(userId, rec.id, {
        parcelasRestantes: rec.parcelasRestantes - 1
      });
      await addDoc(collection(db, 'transactions'), dadosTransacao);
      await registrarAplicacaoNoLog(db, userId, mesAno, dadosTransacao);
    }

    if (rec.parcelasRestantes === 1) {
      await updateDespesaRecorrente(userId, rec.id, { ativa: false });
      await addDoc(collection(db, 'transactions'), dadosTransacao);
      await registrarAplicacaoNoLog(db, userId, mesAno, dadosTransacao);
    }
  }

  localStorage.setItem(chaveLocal, 'true');
}