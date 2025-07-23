export function Snackbar({ message, type = 'info', duration = 3000 }) {
  const snackbar = document.createElement('div');
  snackbar.className = `fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white z-50
    ${type === 'success' ? 'bg-green-600' : type === 'error' ? 'bg-red-600' : 'bg-gray-800'}`;
  snackbar.textContent = message;

  document.body.appendChild(snackbar);

  setTimeout(() => {
    snackbar.classList.add('opacity-0');
    setTimeout(() => snackbar.remove(), 500);
  }, duration);
} 