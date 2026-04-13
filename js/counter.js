/* ══════════════════════════════════════════════════════
   COUNTER.JS — Animated counters with loop, ring progress
   & floating particles
   ══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Settings ──────────────────────────────────── */
  const DURATION    = 2500;   // count-up time (ms)
  const LOOP_DELAY  = 7000;   // pause before re-count (ms)
  const PARTICLE_COUNT = 18;  // floating dots

  /* ── Easing ────────────────────────────────────── */
  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  /* ── Animate a single counter ──────────────────── */
  function animateCounter(el, onDone) {
    const end    = parseInt(el.dataset.end, 10);
    const suffix = el.dataset.suffix || '';
    if (isNaN(end)) return;

    el.classList.add('is-counting');
    const start = performance.now();

    function tick(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / DURATION, 1);
      const value    = Math.round(easeOutQuart(progress) * end);
      el.textContent = value + suffix;

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.classList.remove('is-counting');
        if (onDone) onDone();
      }
    }

    requestAnimationFrame(tick);
  }

  /* ── Activate rings & mini-bars inside an impact-bar ── */
  function activateVisuals(bar) {
    bar.querySelectorAll('.impact-ring-progress').forEach(ring => {
      ring.classList.add('is-active');
    });
    bar.querySelectorAll('.impact-mini-fill').forEach(fill => {
      fill.classList.add('is-active');
    });
  }

  /* ── Deactivate rings & mini-bars (for re-loop) ─────── */
  function deactivateVisuals(bar) {
    bar.querySelectorAll('.impact-ring-progress').forEach(ring => {
      ring.classList.remove('is-active');
    });
    bar.querySelectorAll('.impact-mini-fill').forEach(fill => {
      fill.classList.remove('is-active');
    });
  }

  /* ── Generate floating particles ───────────────── */
  function createParticles(container) {
    if (!container) return;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const dot = document.createElement('span');
      dot.className = 'impact-particle';
      dot.style.left     = Math.random() * 100 + '%';
      dot.style.bottom   = Math.random() * 30 + '%';
      dot.style.animationDelay    = (Math.random() * 6).toFixed(2) + 's';
      dot.style.animationDuration = (4 + Math.random() * 4).toFixed(2) + 's';
      dot.style.width  = (2 + Math.random() * 3) + 'px';
      dot.style.height = dot.style.width;
      container.appendChild(dot);
    }
  }

  /* ── Loop: re-animate all counters in a bar ────── */
  function startLoop(bar, counters) {
    function runCycle() {
      // Reset numbers to 0 with quick fade
      counters.forEach(el => { el.textContent = '0'; });
      deactivateVisuals(bar);

      // Small delay so user sees the "reset"
      setTimeout(() => {
        activateVisuals(bar);
        let finished = 0;
        counters.forEach(el => {
          animateCounter(el, () => {
            finished++;
            if (finished === counters.length) {
              // Wait then loop again
              setTimeout(runCycle, LOOP_DELAY);
            }
          });
        });
      }, 300);
    }

    // First run after initial count
    setTimeout(runCycle, LOOP_DELAY);
  }

  /* ── Init: observe impact bars ─────────────────── */
  const impactBars = document.querySelectorAll('.impact-bar');

  impactBars.forEach(bar => {
    const counters  = bar.querySelectorAll('[data-end]');
    const particles = bar.querySelector('.impact-particles');

    if (particles) createParticles(particles);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // First count
            activateVisuals(bar);
            counters.forEach(el => animateCounter(el));
            // Start the perpetual loop
            startLoop(bar, counters);
            observer.unobserve(bar);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(bar);
  });

  /* ── Fallback: standalone counters outside impact-bar ── */
  const standaloneCounters = document.querySelectorAll('[data-end]:not(.impact-bar [data-end])');
  if (standaloneCounters.length) {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    standaloneCounters.forEach(c => obs.observe(c));
  }
});
