/* ══════════════════════════════════════════════════════
   HERO.JS — Slider with autoplay
   ══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const track = hero.querySelector('.hero-track');
  const slides = hero.querySelectorAll('.hero-slide');
  const dots = hero.querySelectorAll('.hero-dot');
  const prevBtn = hero.querySelector('.hero-arrow-prev');
  const nextBtn = hero.querySelector('.hero-arrow-next');

  if (!track || slides.length === 0) return;

  let current = 0;
  let autoplayTimer = null;
  const AUTOPLAY_DELAY = 6000;

  function goTo(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    current = index;
    track.style.transform = `translateX(-${current * 100}%)`;

    dots.forEach((d, i) => {
      d.classList.toggle('active', i === current);
      d.setAttribute('aria-selected', i === current);
    });
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(next, AUTOPLAY_DELAY);
  }

  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  // Arrow clicks
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); startAutoplay(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); startAutoplay(); });

  // Dot clicks
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); startAutoplay(); });
  });

  // Touch swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoplay();
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
    startAutoplay();
  }, { passive: true });

  // Pause on hover
  hero.addEventListener('mouseenter', stopAutoplay);
  hero.addEventListener('mouseleave', startAutoplay);

  // Init
  goTo(0);
  startAutoplay();
});
