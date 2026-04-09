/* ══════════════════════════════════════════════════════
   MARQUEE.JS — Renders 50 company cards in 3 marquee rows
   ══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {
  var root = document.getElementById('marquee-root');
  if (!root) return;

    // Detectar si es móvil
    function isMobile() {
      return window.matchMedia('(max-width: 640px)').matches;
    }

  /* ── Brand colours for avatars ───────────────────── */
  var BRAND_COLORS = [
    '#00A85A','#008A49','#0D9488','#0891B2','#2563EB',
    '#4F46E5','#7C3AED','#9333EA','#C026D3','#DB2777',
    '#E11D48','#DC2626','#EA580C','#D97706','#CA8A04',
    '#65A30D','#16A34A','#059669','#0284C7','#6366F1'
  ];

  /* ── Generate 50 companies ───────────────────────── */
  var companies = [];
  for (var i = 1; i <= 50; i++) {
    companies.push({ id: i, nombre: 'Empresa Asociada ' + i, logo: '', url: '' });
  }

  function getInitials(name) {
    var parts = name.split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  }

  function getBrandColor(id) {
    return BRAND_COLORS[(id - 1) % BRAND_COLORS.length];
  }

  function escAttr(s) {
    return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  }

  function createCard(empresa) {
    var color = getBrandColor(empresa.id);
    var initials = getInitials(empresa.nombre);

    var html = '<div class="empresa-card">';
    html += '<div class="empresa-avatar" style="background-color:' + color + ';">' + initials + '</div>';
    html += '<span class="empresa-name">' + escAttr(empresa.nombre) + '</span>';
    html += '<span class="empresa-tooltip">' + escAttr(empresa.nombre) + '</span>';
    html += '<span class="empresa-ext-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg></span>';
    html += '</div>';
    return html;
  }

  /* ── 3 rows: 1-17, 18-34, 35-50 ─────────────────── */
  var rows = [
    { items: companies.slice(0, 17),  duration: '45s', direction: 'left'  },
    { items: companies.slice(17, 34), duration: '50s', direction: 'right' },
    { items: companies.slice(34, 50), duration: '42s', direction: 'left'  }
  ];

  var html = '';

  rows.forEach(function (row) {
    var cardsHtml = '';
    row.items.forEach(function (emp) {
      cardsHtml += createCard(emp);
    });
    html += '<div class="marquee-row">';
    html += '<div class="marquee-track animate-marquee-' + row.direction + '" style="--marquee-speed:' + row.duration + '; touch-action: pan-x;">';
    html += cardsHtml + cardsHtml; /* duplicate for seamless loop */
    html += '</div>';
    html += '</div>';
  });
  // ── Swipe/drag soporte móvil ─────────────────────
  if (isMobile()) {
    var rowsEls = root.querySelectorAll('.marquee-row');
    rowsEls.forEach(function(rowEl) {
      var track = rowEl.querySelector('.marquee-track');
      if (!track) return;
      var animClass = Array.from(track.classList).find(function(c){return c.startsWith('animate-marquee-');});
      var isDragging = false, startX = 0, scrollLeft = 0, lastX = 0, velocity = 0, rafId = null;

      // Hacer track "scrollable" manual
      track.style.overflowX = 'auto';
      track.style.scrollBehavior = 'auto';
      track.style.webkitOverflowScrolling = 'touch';
      track.style.cursor = 'grab';

      // Detener animación automática al tocar
      function pauseAnim() {
        if (animClass) track.classList.remove(animClass);
      }
      function resumeAnim(dir) {
        if (animClass) track.classList.remove('animate-marquee-left','animate-marquee-right');
        if (dir) track.classList.add('animate-marquee-' + dir);
        else if (animClass) track.classList.add(animClass);
      }

      // Touch events
      track.addEventListener('touchstart', function(e) {
        isDragging = true;
        startX = e.touches[0].clientX;
        scrollLeft = track.scrollLeft;
        lastX = startX;
        velocity = 0;
        pauseAnim();
      }, {passive:true});

      track.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        var x = e.touches[0].clientX;
        var dx = x - lastX;
        velocity = dx;
        track.scrollLeft = scrollLeft - (x - startX);
        lastX = x;
      }, {passive:true});

      track.addEventListener('touchend', function(e) {
        isDragging = false;
        // Detectar dirección swipe
        var dir = (velocity < 0) ? 'left' : 'right';
        resumeAnim(dir);
      });
      // Opcional: soporte mouse drag en desktop
      var mouseDown = false, mouseStartX = 0, mouseScrollLeft = 0;
      track.addEventListener('mousedown', function(e) {
        mouseDown = true;
        mouseStartX = e.clientX;
        mouseScrollLeft = track.scrollLeft;
        pauseAnim();
        track.style.cursor = 'grabbing';
      });
      track.addEventListener('mousemove', function(e) {
        if (!mouseDown) return;
        var dx = e.clientX - mouseStartX;
        track.scrollLeft = mouseScrollLeft - dx;
      });
      track.addEventListener('mouseup', function(e) {
        mouseDown = false;
        // Detectar dirección
        var dir = (e.movementX < 0) ? 'left' : 'right';
        resumeAnim(dir);
        track.style.cursor = 'grab';
      });
      track.addEventListener('mouseleave', function(e) {
        if (mouseDown) {
          mouseDown = false;
          resumeAnim();
          track.style.cursor = 'grab';
        }
      });
    });
  }

  root.innerHTML = html;

  /* ── Fade-in-up: trigger visibility ──────────────── */
  if (root.classList.contains('fade-in-up')) {
    setTimeout(function () { root.classList.add('is-visible'); }, 100);
  }
});
