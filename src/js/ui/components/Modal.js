// Componente de Modal reutilizável com acessibilidade
export function createModal({ title, content, onClose }) {
  const overlay = document.createElement('div');
  overlay.className = 'fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50';
  const modal = document.createElement('div');
  modal.className = 'bg-white rounded-lg shadow-lg p-6 max-w-md w-full';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', title);
  const header = document.createElement('h2');
  header.textContent = title;
  header.className = 'text-xl font-bold mb-4';
  const body = document.createElement('div');
  body.innerHTML = content;
  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'Fechar';
  closeBtn.className = 'mt-6 px-4 py-2 rounded bg-primary text-white font-semibold focus:outline focus:outline-2 focus:outline-primary';
  closeBtn.onclick = () => {
    overlay.remove();
    if (onClose) onClose();
  };
  closeBtn.setAttribute('aria-label', 'Fechar modal');
  closeBtn.tabIndex = 0;
  modal.appendChild(header);
  modal.appendChild(body);
  modal.appendChild(closeBtn);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
  // Foco inicial no botão fechar
  closeBtn.focus();
  return overlay;
}
