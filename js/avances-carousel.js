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

  /* ── Clone cards for infinite loop ──────────── */
  var originalCards = Array.from(cards);
  var totalOriginal = originalCards.length;
  originalCards.forEach(function(card) {
    var clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    clone.classList.add('is-clone');
    track.appendChild(clone);
  });
  // Re-select all cards (originals + clones) for click handlers
  var allCards = track.querySelectorAll('.avance-card');

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

  /* Width of all original cards (used for seamless loop reset) */
  function getOriginalSetWidth() {
    return getCardWidth() * totalOriginal;
  }

  function moveTo(x, smooth) {
    currentX = Math.max(0, x);
    track.style.transition = smooth !== false
      ? 'transform 400ms cubic-bezier(0.22,0.68,0.35,1)'
      : 'none';
    track.style.transform = 'translateX(' + (-currentX) + 'px)';
    updateProgress();
    updateSpotlight();
  }

  /* Seamless reset after transition ends */
  function checkLoopReset() {
    var setWidth = getOriginalSetWidth();
    if (currentX >= setWidth) {
      currentX -= setWidth;
      track.style.transition = 'none';
      track.style.transform = 'translateX(' + (-currentX) + 'px)';
    } else if (currentX < 0) {
      currentX += setWidth;
      track.style.transition = 'none';
      track.style.transform = 'translateX(' + (-currentX) + 'px)';
    }
  }
  track.addEventListener('transitionend', checkLoopReset);

  function updateProgress() {
    var setWidth = getOriginalSetWidth();
    var pct = setWidth > 0 ? ((currentX % setWidth) / setWidth) * 100 : 0;
    progressBar.style.width = pct + '%';
  }

  /* ── Figure out which card is closest to the viewport center ── */
  function getActiveIndex() {
    var step = getCardWidth();
    var raw = Math.round(currentX / step);
    return ((raw % totalOriginal) + totalOriginal) % totalOriginal;
  }

  /* ── Spotlight: highlight the active card ──── */
  function updateSpotlight() {
    var idx = getActiveIndex();
    if (idx !== currentIdx || idx === 0) {
      currentIdx = idx;
      allCards.forEach(function(c, i) {
        c.classList.toggle('is-spotlight', (i % totalOriginal) === idx);
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
    var setWidth = getOriginalSetWidth();
    var next = currentX + step;
    // If we'd go past the clones, reset first then move
    if (next > setWidth + step) {
      currentX -= setWidth;
      track.style.transition = 'none';
      track.style.transform = 'translateX(' + (-currentX) + 'px)';
      // Force reflow before animating
      void track.offsetWidth;
      next = currentX + step;
    }
    moveTo(next);
  }

  function slidePrev() {
    var step = getCardWidth();
    var setWidth = getOriginalSetWidth();
    if (currentX <= 0) {
      // Jump to the clone set, then animate back
      currentX += setWidth;
      track.style.transition = 'none';
      track.style.transform = 'translateX(' + (-currentX) + 'px)';
      void track.offsetWidth;
    }
    moveTo(currentX - step);
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

  /* ── Touch / drag with momentum ─────────────── */
  var isDragging   = false;
  var startPos     = 0;
  var startScroll  = 0;
  var lastMoveX    = 0;
  var lastMoveTime = 0;
  var velocity     = 0;

  function onDragStart(e) {
    isDragging = true;
    var x = (e.type === 'touchstart') ? e.touches[0].clientX : e.clientX;
    startPos    = x;
    lastMoveX   = x;
    lastMoveTime = Date.now();
    velocity     = 0;
    startScroll  = currentX;
    track.classList.add('is-dragging');
    stopAuto();
  }

  function onDragMove(e) {
    if (!isDragging) return;
    var x = (e.type === 'touchmove') ? e.touches[0].clientX : e.clientX;
    var now = Date.now();
    var dt  = now - lastMoveTime;
    if (dt > 0) {
      velocity = (x - lastMoveX) / dt; // px/ms (positive = swipe right)
    }
    lastMoveX    = x;
    lastMoveTime = now;
    var diff = startPos - x;
    moveTo(startScroll + diff, false);
  }

  function onDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    track.classList.remove('is-dragging');

    var step       = getCardWidth();
    var swipeDist  = Math.abs(currentX - startScroll);
    var SWIPE_THRESHOLD   = step * 0.15;   // 15% of card width
    var VELOCITY_THRESHOLD = 0.3;          // px/ms

    var targetX;
    // Fast flick or sufficient drag distance → advance one card in swipe direction
    if (Math.abs(velocity) > VELOCITY_THRESHOLD || swipeDist > SWIPE_THRESHOLD) {
      if (velocity < 0 || (velocity === 0 && currentX > startScroll)) {
        // Swiped left → next card
        targetX = (Math.floor(startScroll / step) + 1) * step;
      } else {
        // Swiped right → previous card
        targetX = (Math.ceil(startScroll / step) - 1) * step;
      }
    } else {
      // Small drag → snap back to nearest
      targetX = Math.round(currentX / step) * step;
    }

    targetX = Math.max(0, Math.min(targetX, getMaxScroll()));
    moveTo(targetX);
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
  allCards.forEach(function(card) {
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

    /* All news headlines for the ticker */
    var headlines = [
      { id:'1',  text:'Presentación del PDTL en la Municipalidad Metropolitana de Lima' },
      { id:'2',  text:'Reunión con ATU' },
      { id:'3',  text:'Reunión con la Policía Nacional del Perú' },
      { id:'4',  text:'Desayuno de trabajo APTTUR' },
      { id:'5',  text:'Reunión con la Municipalidad Metropolitana de Lima' },
      { id:'6',  text:'Reunión con área de fiscalización de la MML' },
      { id:'7',  text:'Mesa de trabajo del Comité Consultivo de Turismo' },
      { id:'8',  text:'Mesa de trabajo en Municipalidad de Miraflores' },
      { id:'9',  text:'Reunión con la Municipalidad de San Isidro' },
      { id:'10', text:'Reunión con la Municipalidad de Pueblo Libre' },
      { id:'11', text:'Visita de reconocimiento al nuevo Aeropuerto Jorge Chávez' },
      { id:'12', text:'Ayuda Social de APTTUR' },
      { id:'13', text:'Asamblea Ordinaria - Diciembre 2024' },
      { id:'14', text:'Reunión con la ministra Elizabeth Galdo en MINCETUR' },
      { id:'15', text:'Mesa de trabajo Municipalidad Metropolitana de Lima' },
      { id:'16', text:'Mesa de trabajo Municipalidad de Miraflores' },
      { id:'17', text:'Asamblea Ordinaria - Diciembre 2023' },
      { id:'18', text:'Reunión Municipalidad de la Victoria' },
      { id:'19', text:'Reunión con la Comisión de Turismo del Congreso' },
      { id:'20', text:'APTTUR en el Comité Consultivo de Turismo de la MML' },
      { id:'21', text:'Reunión ATU - Mayo 2023' },
      { id:'22', text:'Feria APAVIT' },
      { id:'23', text:'Campeonato de fulbito APTTUR' },
      { id:'24', text:'Almuerzo de Confraternidad asociados APTTUR' }
    ];

    if (!headlines.length) return;

    // Duplicate for seamless loop
    var html = '';
    for (var r = 0; r < 2; r++) {
      headlines.forEach(function(h) {
        html += '<span class="news-ticker-item" data-id="' + h.id + '">'
              + h.text + '</span>';
      });
    }
    ticker.innerHTML = html;

    // Smooth infinite scroll with requestAnimationFrame
    var tickerOffset = 0;
    var tickerPaused = false;
    var halfWidth = 0;
    var lastTime = 0;

    function measureHalf() {
      halfWidth = ticker.scrollWidth / 2;
    }

    function tickerLoop(timestamp) {
      if (!lastTime) lastTime = timestamp;
      var dt = timestamp - lastTime;
      lastTime = timestamp;

      if (!tickerPaused && halfWidth > 0) {
        var isMobile = window.matchMedia('(max-width: 639px)').matches;
        var pxPerSec = isMobile ? 55 : 40;
        tickerOffset += pxPerSec * (dt / 1000);

        // When we've scrolled one full copy, reset seamlessly
        if (tickerOffset >= halfWidth) {
          tickerOffset -= halfWidth;
        }

        ticker.style.transform = 'translateX(' + (-tickerOffset) + 'px)';
      }

      requestAnimationFrame(tickerLoop);
    }

    // Pause on hover
    ticker.addEventListener('mouseenter', function() { tickerPaused = true; });
    ticker.addEventListener('mouseleave', function() { tickerPaused = false; });

    // Start
    requestAnimationFrame(function() {
      measureHalf();
      requestAnimationFrame(tickerLoop);
    });

    // Recalculate on resize
    window.addEventListener('resize', measureHalf);

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
