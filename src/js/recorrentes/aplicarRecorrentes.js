import { registrarAplicacaoNoLog } from './logAplicacoes.js';
import { getDespesasRecorrentes, updateDespesaRecorrente } from '../recorrentes.js';
import { db } from '../firebase.js';
import { collection, addDoc, Timestamp, query, where, getDocs } from 'firebase/firestore';

export async function aplicarRecorrentesDoMes(userId, budgetId) {
  const agora = new Date();
  const mes = agora.getMonth() + 1;
  const ano = agora.getFullYear();
  const mesAno = `${ano}-${String(mes).padStart(2, '0')}`; // ex: "2025-07"
  const chaveLocal = `recorrentes-executadas-${mesAno}`;

  if (localStorage.getItem(chaveLocal)) {return;}

  const recorrentes = await getDespesasRecorrentes(userId, budgetId);
  const ativos = recorrentes.filter(r => r.ativa !== false);

  for (const rec of ativos) {
    // Checar se já existe transação deste recorrente para este mês
    const dataLancamento = new Date(ano, mes - 1, rec.diaLancamento || 1);
    const q = query(
      collection(db, 'transactions'),
      where('userId', '==', userId),
      where('budgetId', '==', budgetId),
      where('recorrenteId', '==', rec.id),
      where('createdAt', '>=', Timestamp.fromDate(new Date(ano, mes - 1, 1))),
      where('createdAt', '<', Timestamp.fromDate(new Date(ano, mes, 1)))
    );
    const snap = await getDocs(q);
    if (!snap.empty) {continue;} // Já existe, não lança de novo

    const dadosTransacao = {
      userId,
      budgetId,
      descricao: rec.descricao,
      valor: rec.valor,
      categoriaId: rec.categoriaId,
      tipo: 'despesa',
      createdAt: Timestamp.fromDate(dataLancamento),
      recorrenteId: rec.id
    };
    await addDoc(collection(db, 'transactions'), dadosTransacao);
    await registrarAplicacaoNoLog(db, userId, mesAno, dadosTransacao);

    // Decrementar parcelasRestantes se for parcelada
    if (rec.parcelasRestantes !== null && rec.parcelasRestantes !== undefined) {
      if (rec.parcelasRestantes > 1) {
        await updateDespesaRecorrente(userId, rec.id, {
          parcelasRestantes: rec.parcelasRestantes - 1
        });
      } else if (rec.parcelasRestantes === 1) {
        await updateDespesaRecorrente(userId, rec.id, { ativa: false, parcelasRestantes: 0 });
      }
    }
  }

  localStorage.setItem(chaveLocal, 'true');
}
