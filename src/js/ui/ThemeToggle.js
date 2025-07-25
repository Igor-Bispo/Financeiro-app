export function setupThemeToggle(buttonId = 'theme-toggle-btn') {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  const isDark = saved ? saved === 'dark' : prefersDark;

  root.classList.toggle('dark', isDark);
  updateIcon();

  const btn = document.getElementById(buttonId);
  if (btn) {
    btn.addEventListener('click', () => {
      const isDarkNow = root.classList.toggle('dark');
      localStorage.setItem('theme', isDarkNow ? 'dark' : 'light');
      updateIcon();
    });
  }

  function updateIcon() {
    const icon = document.getElementById('theme-icon');
    if (icon) {
      icon.textContent = root.classList.contains('dark') ? '🌙' : '☀️';
    }
  }
}
