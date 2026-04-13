/* ══════════════════════════════════════════════════════
   AVANCES CAROUSEL — Auto-scroll + drag + arrows
   + spotlight, dots, countdown ring & ticker
   ══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.avances-carousel');
  if (!carousel) return;

  const track       = carousel.querySelector('.avances-track');
  const prevBtn     = carousel.querySelector('.avances-arrow-prev');
  const nextBtn     = carousel.querySelector('.avances-arrow-next');
  const progressBar = carousel.querySelector('.avances-progress-bar');
  const dotsWrap    = document.getElementById('avancesDots');
  const countdownF  = carousel.querySelector('.countdown-fill');
  const countdownN  = carousel.querySelector('.countdown-num');
  const cards       = track.querySelectorAll('.avance-card');

  if (!cards.length) return;

  let currentX      = 0;
  let currentIdx    = 0;
  let autoTimer     = null;
  let countdownRAF  = null;
  let countdownStart = 0;
  const AUTO_INTERVAL  = 2800;
  const CIRCUMFERENCE  = 2 * Math.PI * 15.5; // ~97.39

  /* ── Helpers ─────────────────────────────────── */
  function getGap() {
    return parseFloat(getComputedStyle(track).gap) || 16;
  }

  function getCardWidth() {
    return cards[0].offsetWidth + getGap();
  }

  function getMaxScroll() {
    return track.scrollWidth - carousel.offsetWidth + 32;
  }

  function moveTo(x, smooth) {
    currentX = Math.max(0, Math.min(x, getMaxScroll()));
    track.style.transition = smooth !== false
      ? 'transform 600ms cubic-bezier(0.25,0.46,0.45,0.94)'
      : 'none';
    track.style.transform = 'translateX(' + (-currentX) + 'px)';
    updateProgress();
    updateSpotlight();
  }

  function updateProgress() {
    var max = getMaxScroll();
    var pct = max > 0 ? (currentX / max) * 100 : 0;
    progressBar.style.width = pct + '%';
  }

  /* ── Figure out which card is closest to the viewport center ── */
  function getActiveIndex() {
    var step = getCardWidth();
    return Math.round(currentX / step);
  }

  /* ── Spotlight: highlight the active card ──── */
  function updateSpotlight() {
    var idx = getActiveIndex();
    if (idx !== currentIdx || idx === 0) {
      currentIdx = idx;
      cards.forEach(function(c, i) {
        c.classList.toggle('is-spotlight', i === idx);
      });
      updateDots(idx);
    }
  }

  /* ── Dots navigation ────────────────────────── */
  function buildDots() {
    if (!dotsWrap) return;
    var frag = document.createDocumentFragment();
    cards.forEach(function(_, i) {
      var btn = document.createElement('button');
      btn.className = 'avances-dot' + (i === 0 ? ' is-active' : '');
      btn.setAttribute('aria-label', 'Ir a noticia ' + (i + 1));
      btn.addEventListener('click', function() {
        goToCard(i);
        resetAuto();
      });
      frag.appendChild(btn);
    });
    dotsWrap.appendChild(frag);
  }

  function updateDots(idx) {
    if (!dotsWrap) return;
    var dots = dotsWrap.querySelectorAll('.avances-dot');
    dots.forEach(function(d, i) {
      d.classList.toggle('is-active', i === idx);
    });
  }

  function goToCard(idx) {
    var step = getCardWidth();
    var target = step * idx;
    moveTo(Math.min(target, getMaxScroll()));
  }

  /* ── Countdown ring ─────────────────────────── */
  function startCountdown() {
    stopCountdown();
    countdownStart = performance.now();
    if (countdownF) countdownF.style.strokeDashoffset = CIRCUMFERENCE;
    tickCountdown();
  }

  function tickCountdown() {
    var elapsed = performance.now() - countdownStart;
    var progress = Math.min(elapsed / AUTO_INTERVAL, 1);

    if (countdownF) {
      countdownF.style.strokeDashoffset = CIRCUMFERENCE * (1 - progress);
    }
    if (countdownN) {
      countdownN.textContent = Math.ceil((AUTO_INTERVAL - elapsed) / 1000);
    }

    if (progress < 1) {
      countdownRAF = requestAnimationFrame(tickCountdown);
    }
  }

  function stopCountdown() {
    if (countdownRAF) {
      cancelAnimationFrame(countdownRAF);
      countdownRAF = null;
    }
  }

  /* ── Arrow nav ──────────────────────────────── */
  function slideNext() {
    var step = getCardWidth();
    if (currentX >= getMaxScroll() - 10) {
      moveTo(0);
    } else {
      moveTo(currentX + step);
    }
  }

  function slidePrev() {
    var step = getCardWidth();
    if (currentX <= 10) {
      moveTo(getMaxScroll());
    } else {
      moveTo(currentX - step);
    }
  }

  nextBtn.addEventListener('click', function() { slideNext(); resetAuto(); });
  prevBtn.addEventListener('click', function() { slidePrev(); resetAuto(); });

  /* ── Auto-scroll ────────────────────────────── */
  function startAuto() {
    stopAuto();
    startCountdown();
    autoTimer = setInterval(function() {
      slideNext();
      startCountdown();
    }, AUTO_INTERVAL);
  }

  function stopAuto() {
    if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
    stopCountdown();
  }

  function resetAuto() {
    stopAuto();
    startAuto();
  }

  carousel.addEventListener('mouseenter', stopAuto);
  carousel.addEventListener('mouseleave', startAuto);

  /* ── Touch / drag ───────────────────────────── */
  var isDragging  = false;
  var startPos    = 0;
  var startScroll = 0;

  function onDragStart(e) {
    isDragging = true;
    startPos = (e.type === 'touchstart') ? e.touches[0].clientX : e.clientX;
    startScroll = currentX;
    track.classList.add('is-dragging');
    stopAuto();
  }

  function onDragMove(e) {
    if (!isDragging) return;
    var x = (e.type === 'touchmove') ? e.touches[0].clientX : e.clientX;
    var diff = startPos - x;
    moveTo(startScroll + diff, false);
  }

  function onDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    track.classList.remove('is-dragging');
    var step = getCardWidth();
    var snapped = Math.round(currentX / step) * step;
    moveTo(snapped);
    startAuto();
  }

  track.addEventListener('mousedown', onDragStart);
  track.addEventListener('touchstart', onDragStart, { passive: true });
  window.addEventListener('mousemove', onDragMove);
  window.addEventListener('touchmove', onDragMove, { passive: true });
  window.addEventListener('mouseup', onDragEnd);
  window.addEventListener('touchend', onDragEnd);
  track.addEventListener('dragstart', function(e) { e.preventDefault(); });

  /* ── Card click → redirect ──────────────────── */
  cards.forEach(function(card) {
    card.addEventListener('click', function() {
      if (Math.abs(currentX - startScroll) > 5) return;
      var id = card.dataset.newsId;
      if (id) window.location.href = 'avances.html?id=' + encodeURIComponent(id);
    });
  });

  /* ── Headlines ticker ───────────────────────── */
  function buildTicker() {
    var ticker = document.getElementById('tickerContent');
    if (!ticker) return;

    var headlines = [];
    cards.forEach(function(card) {
      var h3 = card.querySelector('.avance-body h3');
      var badge = card.querySelector('.avance-badge');
      if (h3) {
        headlines.push({
          text: h3.textContent,
          badge: badge ? badge.textContent : '',
          id: card.dataset.newsId
        });
      }
    });

    if (!headlines.length) return;

    // Duplicate for seamless loop
    var html = '';
    for (var r = 0; r < 2; r++) {
      headlines.forEach(function(h) {
        html += '<span class="news-ticker-item" data-id="' + (h.id || '') + '">'
              + h.text + '</span>';
      });
    }
    ticker.innerHTML = html;

    // Adjust speed based on content width
    requestAnimationFrame(function() {
      var w = ticker.scrollWidth / 2;
      var speed = Math.max(20, w / 60); // ~60px/sec
      ticker.style.setProperty('--ticker-duration', speed + 's');
    });

    // Click on ticker item → go to card
    ticker.addEventListener('click', function(e) {
      var item = e.target.closest('.news-ticker-item');
      if (!item) return;
      var id = item.dataset.id;
      if (id) window.location.href = 'avances.html?id=' + encodeURIComponent(id);
    });
  }

  /* ── Init ────────────────────────────────────── */
  buildDots();
  buildTicker();
  updateProgress();
  updateSpotlight();
  startAuto();
});
