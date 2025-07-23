export function FAB() {
  const fab = document.createElement('div');
  fab.className = 'fixed bottom-5 right-5 flex flex-col items-end z-50 fab';
  fab.style.zIndex = '2001';
  fab.style.bottom = '70px';
  fab.innerHTML = `
    <div id="fab-actions" class="hidden mb-2 space-y-3 transition-all duration-300">
      <button id="fab-transacao" class="bg-blue-600 text-white px-4 py-2 rounded-xl shadow-xl text-sm hover:bg-blue-700 transition">
        ➕ Nova Transação
      </button>
      <button id="fab-recorrente" class="bg-purple-600 text-white px-4 py-2 rounded-xl shadow-xl text-sm hover:bg-purple-700 transition">
        ♻️ Nova Recorrente
      </button>
    </div>
    <button id="fab-main" class="bg-gradient-to-tr from-indigo-500 to-blue-500 text-white w-16 h-16 rounded-full shadow-2xl text-3xl hover:scale-105 transform transition">
      +
    </button>
  `;

  setTimeout(() => {
    const main = fab.querySelector('#fab-main');
    const actions = fab.querySelector('#fab-actions');
    const btnTransacao = fab.querySelector('#fab-transacao');
    const btnRecorrente = fab.querySelector('#fab-recorrente');

    main.addEventListener('click', () => {
      actions.classList.toggle('hidden');
    });

    btnTransacao.addEventListener('click', () => {
      window.showAddTransactionModal();
      actions.classList.add('hidden');
    });

    btnRecorrente.addEventListener('click', () => {
      window.showAddRecorrenteModal();
      actions.classList.add('hidden');
    });
  }, 100);

  return fab;
}