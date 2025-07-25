import { getFirestore, collection, getDocs } from 'firebase/firestore';

const db = getFirestore();

export async function renderHistoricoMensal(userId, ano, mes) {
  const mesPad = String(mes).padStart(2, '0');
  const mesAno = `${ano}-${mesPad}`;
  const ref = collection(db, 'users', userId, 'historico', mesAno, 'transacoes');
  const snapshot = await getDocs(ref);
  const transacoes = snapshot.docs.map(doc => doc.data());

  const content = document.getElementById('app-content');
  content.innerHTML = `
    <h2 class="text-xl font-bold mb-4">Histórico - ${mesPad}/${ano}</h2>
    ${transacoes.length === 0 ? '<p class="text-gray-500">Nenhuma transação encontrada.</p>' : ''}
    <div class="space-y-3">
      ${transacoes.map(t => `
        <div class="p-3 border rounded-lg flex justify-between items-center">
          <div>
            <p class="font-medium">${t.descricao}</p>
            <p class="text-sm text-gray-500">${t.categoria || 'Sem categoria'} • ${new Date(t.createdAt).toLocaleDateString()}</p>
          </div>
          <span class="font-bold ${t.tipo === 'receita' ? 'text-green-600' : 'text-red-600'}">
            ${t.tipo === 'receita' ? '+' : '-'} R$ ${parseFloat(t.valor).toFixed(2)}
          </span>
        </div>
      `).join('')}
    </div>
  `;
}
