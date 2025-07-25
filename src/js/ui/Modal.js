export function Modal({ title = '', content = '', onClose = null }) {
  const overlay = document.createElement('div');
  overlay.id = 'app-modal';
  overlay.className = 'modal fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50';
  overlay.onclick = (e) => {
    if (e.target === overlay && onClose) {onClose();}
    if (window.toggleFABOnModal) {window.toggleFABOnModal();}
  };

  const modal = document.createElement('div');
  modal.className = 'bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 max-w-md w-full relative';
  modal.innerHTML = `
    <button class="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:text-gray-200 text-2xl" aria-label="Fechar" id="modal-close-btn">&times;</button>
    <h2 class="text-xl font-bold mb-4">${title}</h2>
    <div class="modal-body">${content}</div>
  `;

  overlay.appendChild(modal);

  modal.querySelector('#modal-close-btn').onclick = (e) => {
    e.stopPropagation();
    if (onClose) {onClose();}
    if (window.toggleFABOnModal) {window.toggleFABOnModal();}
  };

  if (window.toggleFABOnModal) {window.toggleFABOnModal();}
  return overlay;
}
