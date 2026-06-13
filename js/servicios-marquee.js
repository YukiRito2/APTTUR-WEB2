/* ══════════════════════════════════════════════════════
   SERVICIOS MARQUEE — 3 rows with fleet photos + logos
   ══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {
  const root = document.getElementById('servicios-marquee-root');
  if (!root) return;

  const exampleImages = [
    'images/noticias/evento-03-02-2026-reunion-ATU.jpg',
    'images/noticias/evento-10-02-2026-presentación-PDTL-mml-02.jpg',
    'images/noticias/evento-10-12-2024-desayuno-de-trabajo.jpg',
    'images/noticias/evento-10-12-2025-reunion-mml.jpg',
    'images/noticias/evento-14-07-2025-reunión-municipalidad-pueblo-libre.jpg',
    'images/noticias/evento-15-07-2025-reunion-municipalidad-san-isidro.jpg',
    'images/noticias/evento-20-mayo-2024-mesa-de-trabajo-mml.jpg',
    'images/noticias/evento-22-12-2025-desayuno-de-trabajo-Apttur-2025.jpg',
    'images/noticias/evento-25-08-2025-Mesa-de-trabajo-Municipalidad-de-Miraflores.jpg',
    'images/noticias/evento-26-01-2026-reunión-con-pnp.jpg',
    'images/noticias/evento-29-05-2025-visita-nuevo-aeropuerto-Jorge-Chavez.jpg',
    'images/noticias/evento-apttur-reunion-muni-victoria-nov-23.jpg'
  ];

  const companies = [
    { nombre: 'Dos Más Dos', logo: 'images/empresas/DOSMASDOS.png', image: exampleImages[0], tag: 'Premium' },
    { nombre: 'AKI Tours', logo: 'images/empresas/LOGOAKI.jpg', image: exampleImages[1], tag: 'Movilidad' },
    { nombre: 'Alicar', logo: 'images/empresas/logoalicar.png', image: exampleImages[2], tag: 'Turismo' },
    { nombre: 'Alpamayo', logo: 'images/empresas/logoalpamayo.jpg', image: exampleImages[3], tag: 'Andes' },
    { nombre: 'Aranda', logo: 'images/empresas/logoaranda.png', image: exampleImages[4], tag: 'Safari' },
    { nombre: 'Avalos Tours', logo: 'images/empresas/LOGOAVALOS.png', image: exampleImages[5], tag: 'Confort' },
    { nombre: 'AYV Transportes', logo: 'images/empresas/logoAYV.jpg', image: exampleImages[6], tag: 'Flota' },
    { nombre: 'Black Tours', logo: 'images/empresas/logoblack.jpg', image: exampleImages[7], tag: 'Elegancia' },
    { nombre: 'Brazin', logo: 'images/empresas/logobrazin.png', image: exampleImages[8], tag: 'Grupo' },
    { nombre: 'Buganvilla', logo: 'images/empresas/logoBuganvilla.jpg', image: exampleImages[9], tag: 'Eco' },
    { nombre: 'ByM Tours', logo: 'images/empresas/LogoByM.jpg', image: exampleImages[10], tag: 'Clásico' },
    { nombre: 'Chaski Tours', logo: 'images/empresas/logochaski.png', image: exampleImages[11], tag: 'Expreso' }
  ];

  function escAttr(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;');
  }

  function createCard(item) {
    return [
      '<article class="servicio-marquee-card" data-name="' + escAttr(item.nombre) + '">',
      '  <div class="servicio-marquee-visual" style="background-image:url(\'' + escAttr(item.image) + '\');"></div>',
      '  <div class="servicio-marquee-overlay"></div>',
      '  <span class="servicio-marquee-badge">' + escAttr(item.tag) + '</span>',
      '  <div class="servicio-marquee-foot">',
      '    <strong>' + escAttr(item.nombre) + '</strong>',
      '    <span>Unidad de servicio</span>',
      '  </div>',
      '  <img class="servicio-marquee-logo" src="' + escAttr(item.logo) + '" alt="' + escAttr(item.nombre) + '" loading="lazy" />',
      '</article>'
    ].join('');
  }

  const rows = [
    { items: companies.slice(0, 4), duration: '42s', direction: 'left' },
    { items: companies.slice(4, 8), duration: '48s', direction: 'right' },
    { items: companies.slice(8, 12), duration: '44s', direction: 'left' }
  ];

  root.innerHTML = rows.map(function (row) {
    return [
      '<div class="marquee-row">',
      '  <div class="marquee-track animate-marquee-' + row.direction + '" style="--marquee-speed:' + row.duration + '; touch-action: pan-x;">',
      row.items.map(createCard).join('') + row.items.map(createCard).join(''),
      '  </div>',
      '</div>'
    ].join('');
  }).join('');

  function initDrag() {
    root.querySelectorAll('.marquee-row').forEach(function (rowEl) {
      const track = rowEl.querySelector('.marquee-track');
      if (!track) return;

      let isDragging = false;
      let startX = 0;
      let dragOffset = 0;
      let lastX = 0;
      let didDrag = false;

      function getTranslateX() {
        const style = window.getComputedStyle(track);
        const matrix = style.transform || style.webkitTransform;
        if (!matrix || matrix === 'none') return 0;
        const vals = matrix.match(/matrix.*\((.+)\)/);
        if (!vals) return 0;
        return parseFloat(vals[1].split(', ')[4]) || 0;
      }

      function setTranslateX(tx) {
        track.style.transform = 'translateX(' + tx + 'px)';
      }

      function resumeFrom(tx) {
        const isLeft = track.classList.contains('animate-marquee-left');
        const animName = isLeft ? 'marquee-left' : 'marquee-right';
        const speed = track.style.getPropertyValue('--marquee-speed') || (isLeft ? '42s' : '48s');
        track.style.animation = animName + ' ' + speed + ' linear infinite';
        track.style.removeProperty('transition');
        track.style.transform = 'translateX(' + tx + 'px)';
      }

      function onDragStart(x) {
        isDragging = true;
        didDrag = false;
        startX = x;
        lastX = x;
        dragOffset = getTranslateX();
        track.style.animation = 'none';
        track.style.transition = 'none';
        track.style.cursor = 'grabbing';
      }

      function onDragMove(x) {
        if (!isDragging) return;
        didDrag = didDrag || Math.abs(x - startX) > 3;
        setTranslateX(dragOffset + (x - startX));
        lastX = x;
      }

      function onDragEnd() {
        if (!isDragging) return;
        isDragging = false;
        track.style.cursor = 'grab';
        const finalTx = dragOffset + (lastX - startX);
        resumeFrom(finalTx);
      }

      track.addEventListener('mousedown', function (e) {
        e.preventDefault();
        onDragStart(e.clientX);
      });
      track.addEventListener('mousemove', function (e) {
        onDragMove(e.clientX);
      });
      track.addEventListener('mouseup', onDragEnd);
      track.addEventListener('mouseleave', onDragEnd);

      track.addEventListener('touchstart', function (e) {
        onDragStart(e.touches[0].clientX);
      }, { passive: true });
      track.addEventListener('touchmove', function (e) {
        onDragMove(e.touches[0].clientX);
      }, { passive: true });
      track.addEventListener('touchend', onDragEnd);

      track.addEventListener('click', function (e) {
        if (didDrag) {
          e.preventDefault();
          e.stopPropagation();
        }
      }, true);
    });
  }

  initDrag();

  const input = document.getElementById('servicios-search-input');
  const clear = document.getElementById('servicios-search-clear');
  const cards = root.querySelectorAll('.servicio-marquee-card');

  if (input) {
    function normalize(value) {
      return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    }

    function filterCards(query) {
      const q = normalize(query.trim());
      cards.forEach(function (card) {
        const name = normalize(card.dataset.name || '');
        const visible = !q || name.includes(q);
        card.classList.toggle('is-hidden', !visible);
        card.classList.toggle('search-match', visible && q.length > 0);
      });
    }

    input.addEventListener('input', function () {
      filterCards(this.value);
      clear.classList.toggle('visible', this.value.length > 0);
    });

    clear.addEventListener('click', function () {
      input.value = '';
      clear.classList.remove('visible');
      filterCards('');
      input.focus();
    });
  }
});
