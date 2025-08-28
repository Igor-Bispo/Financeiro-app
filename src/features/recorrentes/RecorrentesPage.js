import { getRecorrentesDoOrcamento } from './service.js';

export async function render(container) {
  const root = document.createElement('div');
  root.innerHTML = '<h2 class="text-lg font-bold mb-2">Recorrentes (stub)</h2>';

  const list = document.createElement('ul');
  try {
    const budgetId = window?.appState?.currentBudget?.id; // compat durante migração
    if (budgetId) {
      const items = await getRecorrentesDoOrcamento(budgetId);
      for (const it of items) {
        const li = document.createElement('li');
        li.textContent = `${it.nome || it.name || it.id}`;
        list.appendChild(li);
      }
    } else {
      const li = document.createElement('li');
      li.textContent = 'Sem orçamento selecionado';
      list.appendChild(li);
    }
  } catch {
    const li = document.createElement('li');
    li.textContent = 'Erro ao carregar recorrentes';
    list.appendChild(li);
  }

  root.appendChild(list);
  container.appendChild(root);
}
