/* ══════════════════════════════════════════════════════
   LEYES.JS — Category filter for Marco Legal page
   ══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  const filtros = document.querySelectorAll('.leyes-filtro');
  const cards   = document.querySelectorAll('.ley-card');

  if (!filtros.length) return;

  filtros.forEach(btn => {
    btn.addEventListener('click', () => {
      /* Update active button */
      filtros.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      /* Show / hide cards */
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
});
