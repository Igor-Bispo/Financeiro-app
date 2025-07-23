export function enableSwipeNavigation(containerSelector = '#app-content') {
  let touchStartX = 0;
  let touchEndX = 0;

  const minSwipeDistance = 50;
  const tabs = ['/dashboard', '/transactions', '/categories', '/recorrentes', '/settings'];

  function handleGesture() {
    const currentTab = document.querySelector('.nav-btn.active')?.getAttribute('data-route');
    const currentIndex = tabs.indexOf(currentTab);

    if (touchEndX < touchStartX - minSwipeDistance && currentIndex < tabs.length - 1) {
      router(tabs[currentIndex + 1]);
    }
    if (touchEndX > touchStartX + minSwipeDistance && currentIndex > 0) {
      router(tabs[currentIndex - 1]);
    }
  }

  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  });

  container.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
  });
}