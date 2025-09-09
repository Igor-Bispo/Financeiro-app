import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase.js';

export async function renderLogAplicacoes() {
  const user = window.FirebaseAuth?.currentUser;
  const content = document.getElementById('app-content');
  content.innerHTML =
    '<h2 class="text-xl font-bold mb-4">Log de Aplicações Automáticas</h2>';

  if (!user) {
    content.innerHTML +=
      '<p class="text-gray-500">Usuário não autenticado.</p>';
    return;
  }

  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const mesAno = `${ano}-${mes}`;
  const ref = collection(db, 'users', user.uid, 'logs', mesAno, 'itens');
  const snap = await getDocs(ref);

  if (snap.empty) {
    content.innerHTML +=
      '<p class="text-gray-500">Nenhum log encontrado para este mês.</p>';
    return;
  }

  const lista = document.createElement('div');
  lista.className = 'space-y-3';

  snap.forEach(doc => {
    const item = doc.data();
    const card = document.createElement('div');
    card.className =
      'p-3 rounded-lg shadow bg-white dark:bg-gray-800 flex justify-between items-start';
    card.innerHTML = `
      <div>
        <p class="font-semibold">${item.descricao}</p>
        <p class="text-sm text-gray-500">R$ ${parseFloat(item.valor).toFixed(2)} • ${item.categoriaId || 'Sem categoria'}</p>
        <p class="text-xs text-gray-400">Aplicado em: ${item.createdAt?.seconds ? new Date(item.createdAt.seconds * 1000).toLocaleDateString() : '-'}</p>
      </div>
    `;
    lista.appendChild(card);
  });

  content.appendChild(lista);
}
