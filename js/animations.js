/* ══════════════════════════════════════════════════════
   ANIMATIONS.JS — IntersectionObserver fade-in-up
   ══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.fade-in-up');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '-80px 0px 0px 0px' }
  );

  elements.forEach(el => observer.observe(el));
});
