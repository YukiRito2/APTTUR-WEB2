/* ══════════════════════════════════════════════════════
   AVANCES CAROUSEL — Auto-scroll + drag + arrows
   ══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.avances-carousel');
  if (!carousel) return;

  const track     = carousel.querySelector('.avances-track');
  const prevBtn   = carousel.querySelector('.avances-arrow-prev');
  const nextBtn   = carousel.querySelector('.avances-arrow-next');
  const progressBar = carousel.querySelector('.avances-progress-bar');
  const cards     = track.querySelectorAll('.avance-card');

  if (!cards.length) return;

  let currentX    = 0;
  let autoTimer   = null;
  let progressTimer = null;
  const AUTO_INTERVAL = 4000; // ms between auto slides

  /* ── Helpers ─────────────────────────────────── */
  function getGap() {
    return parseFloat(getComputedStyle(track).gap) || 16;
  }

  function getCardWidth() {
    return cards[0].offsetWidth + getGap();
  }

  function getMaxScroll() {
    return track.scrollWidth - carousel.offsetWidth + 32; // +padding
  }

  function moveTo(x, smooth) {
    currentX = Math.max(0, Math.min(x, getMaxScroll()));
    track.style.transition = smooth !== false ? 'transform 500ms cubic-bezier(0.25,0.46,0.45,0.94)' : 'none';
    track.style.transform = 'translateX(' + (-currentX) + 'px)';
    updateProgress();
  }

  function updateProgress() {
    const max = getMaxScroll();
    const pct = max > 0 ? (currentX / max) * 100 : 0;
    progressBar.style.width = pct + '%';
  }

  /* ── Arrow nav ──────────────────────────────── */
  function slideNext() {
    const step = getCardWidth();
    if (currentX >= getMaxScroll() - 10) {
      moveTo(0); // loop back
    } else {
      moveTo(currentX + step);
    }
  }

  function slidePrev() {
    const step = getCardWidth();
    if (currentX <= 10) {
      moveTo(getMaxScroll()); // loop to end
    } else {
      moveTo(currentX - step);
    }
  }

  nextBtn.addEventListener('click', () => { slideNext(); resetAuto(); });
  prevBtn.addEventListener('click', () => { slidePrev(); resetAuto(); });

  /* ── Auto-scroll with progress ──────────────── */
  function startAuto() {
    stopAuto();
    autoTimer = setInterval(slideNext, AUTO_INTERVAL);
  }

  function stopAuto() {
    if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
  }

  function resetAuto() {
    stopAuto();
    startAuto();
  }

  /* Pause on hover */
  carousel.addEventListener('mouseenter', stopAuto);
  carousel.addEventListener('mouseleave', startAuto);

  /* ── Touch / drag ───────────────────────────── */
  let isDragging = false;
  let startPos   = 0;
  let startScroll = 0;

  function onDragStart(e) {
    isDragging = true;
    startPos = (e.type === 'touchstart') ? e.touches[0].clientX : e.clientX;
    startScroll = currentX;
    track.classList.add('is-dragging');
    stopAuto();
  }

  function onDragMove(e) {
    if (!isDragging) return;
    const x = (e.type === 'touchmove') ? e.touches[0].clientX : e.clientX;
    const diff = startPos - x;
    moveTo(startScroll + diff, false);
  }

  function onDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    track.classList.remove('is-dragging');
    // Snap to nearest card
    const step = getCardWidth();
    const snapped = Math.round(currentX / step) * step;
    moveTo(snapped);
    startAuto();
  }

  track.addEventListener('mousedown', onDragStart);
  track.addEventListener('touchstart', onDragStart, { passive: true });
  window.addEventListener('mousemove', onDragMove);
  window.addEventListener('touchmove', onDragMove, { passive: true });
  window.addEventListener('mouseup', onDragEnd);
  window.addEventListener('touchend', onDragEnd);

  /* Prevent link/image drag */
  track.addEventListener('dragstart', function(e) { e.preventDefault(); });

  /* ── Card click → redirect ──────────────────── */
  cards.forEach(function(card) {
    card.addEventListener('click', function(e) {
      // Only navigate if not dragging
      if (Math.abs(currentX - startScroll) > 5) return;
      var id = card.dataset.newsId;
      if (id) window.location.href = 'avances.html?id=' + encodeURIComponent(id);
    });
  });

  /* ── Init ────────────────────────────────────── */
  updateProgress();
  startAuto();
});
