/* ══════════════════════════════════════════════════════
   COUNTER.JS — Animated counters with IntersectionObserver
   ══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('[data-end]');
  if (!counters.length) return;

  const DURATION = 2500; // ms

  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function animateCounter(el) {
    const end = parseInt(el.dataset.end, 10);
    const suffix = el.dataset.suffix || '';
    if (isNaN(end)) return;

    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / DURATION, 1);
      const value = Math.round(easeOutQuart(progress) * end);
      el.textContent = value + suffix;

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  counters.forEach(c => observer.observe(c));
});
