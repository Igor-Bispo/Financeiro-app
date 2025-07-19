// Componente de Botão reutilizável com acessibilidade
export function createButton({ text, onClick, className = '', ariaLabel }) {
  const btn = document.createElement('button');
  btn.textContent = text;
  btn.className = `px-4 py-2 rounded bg-primary text-white font-semibold shadow focus:outline focus:outline-2 focus:outline-primary ${className}`;
  btn.onclick = onClick;
  if (ariaLabel) btn.setAttribute('aria-label', ariaLabel);
  btn.tabIndex = 0;
  return btn;
}
