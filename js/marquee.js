/* ══════════════════════════════════════════════════════
   MARQUEE.JS — Renders company logo cards in 3 marquee rows
   ══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {
  var root = document.getElementById('marquee-root');
  if (!root) return;

    // Detectar si es móvil
    function isMobile() {
      return window.matchMedia('(max-width: 640px)').matches;
    }

  /* ── Real companies with logos and links  ─────────── */
   /* ── Los siguientes clientes potenciales ___Dos Más Dos, Alicar, Alpamay, trasnportes aranda, Transportes AyV,

    Brazin,  bym tours,chavin tours, drc tours, Edu Tours, Eminiari tours, Giin travel,loretours, rubens ,Schnell Tours,Soluciones,
    Tumi Tours, Valenz Tours, Yacar Tours, PST Tours─────────── */
  var companies = [
    { id:1,  nombre:'Dos Más Dos',            logo:'DOSMASDOS.png',        url:'https://dosmasdosa.com/' },
    { id:2,  nombre:'AKI Tours',              logo:'LOGOAKI.jpg',          url:'https://akimovil.com.pe/' },
    { id:3,  nombre:'Alicar',                 logo:'logoalicar.png',       url:'https://www.alicartours.com' },
    { id:4,  nombre:'Alpamayo',               logo:'logoalpamayo.jpg',     url:'https://www.alpamayotours.com' },
    { id:5,  nombre:'Aranda',                 logo:'logoaranda.png',       url:'https://www.arandatours.com' },
    { id:6,  nombre:'Avalos Tours',           logo:'LOGOAVALOS.png',       url:'https://www.avalostours.com' },
    { id:7,  nombre:'AYV Transportes',        logo:'logoAYV.jpg',          url:'https://www.ayvtransportes.com' },
    { id:8,  nombre:'Black Tours',            logo:'logoblack.jpg',        url:'https://blacktransporte.com/' },
    { id:9,  nombre:'Brazin',                 logo:'logobrazin.png',       url:'https://www.brazintours.com' },
    { id:10, nombre:'Buganvilla',             logo:'logoBuganvilla.jpg',   url:'https://buganvillatours.com/en/home/' },
    { id:11, nombre:'ByM Tours',              logo:'LogoByM.jpg',          url:'https://www.bymtours.com/' },
    { id:12, nombre:'Chaski Tours',           logo:'logochaski.png',       url:'https://www.chaskitours.com' },
    { id:13, nombre:'Chavín Tours',           logo:'logochavin.jpg',       url:'https://www.chavintours.com' },
    { id:14, nombre:'Connecting',             logo:'logoconnecting.jpg',   url:'https://www.connectingtours.com/' },
    { id:15, nombre:'Crown Tours',            logo:'logocrown.jpg',        url:'https://www.crowntours.com/' },
    { id:16, nombre:'DC Tours',               logo:'logodc.jpg',           url:'https://transporteturisticoperu.com/' },
    { id:17, nombre:'Destinos',               logo:'logodestinos.png',     url:'https://www.transportedestinos.com/' },
    { id:18, nombre:'DRC Tours',              logo:'logodrc.jpg',          url:'https://drc-tours.com/' },
    { id:19, nombre:'Edu Tours',              logo:'logoedu.png',          url:'https://www.edutoursperu.com' },
    { id:20, nombre:'Elegance',               logo:'LOGOELEGANCE.jpg',     url:'https://www.eleganceclasstravel.com/' },
    { id:21, nombre:'Eminiari',               logo:'logoeminiari.jpg',     url:'https://www.eminiari.com' },
    { id:22, nombre:'Giin Tours',             logo:'logogiin.png',         url:'https://www.giintours.com' },
    { id:23, nombre:'Inka Tours',             logo:'logoinka.png',         url:'https://www.inkaexpress.com/es/' },
    { id:24, nombre:'J&M Tours',              logo:'LogoJ&M.jpg',          url:'https://www.jmtoursperu.com' },
    { id:25, nombre:'Jamuy Tours',            logo:'logojamuy.jpg',        url:'https://perujamuytravel.com/' },
    { id:26, nombre:'Jhony Tours',            logo:'logojhony.png',        url:'https://www.jhonytours.com' },
    { id:27, nombre:'Joggys Tours',           logo:'Logojoggys.jpg',       url:'https://joggystours.com.pe/' },
    { id:28, nombre:'Koni Tours',             logo:'logokoni.jpg',         url:'https://konitours.com/' },
    { id:29, nombre:'Kusa Tours',             logo:'LOGOKUSA.jpg',         url:'https://www.kusatravel.com/' },
    { id:30, nombre:'Levita Tours',           logo:'logolevita.png',       url:'https://www.levitatours.com/' },
    { id:31, nombre:'Lore Tours',             logo:'logolore.jpg',         url:'https://loretours.blogspot.com/' },
    { id:32, nombre:'Manchego Tours',         logo:'LogoManchego.png',     url:'https://www.manchegoturismo.com/' },
    { id:33, nombre:'Maximino Tours',         logo:'logomaximino.jpg',     url:'https://www.maximino.com.pe/' },
    { id:34, nombre:'MB Tours',               logo:'LOGOMB.jpg',           url:'https://www.mbtoursperu.com' },
    { id:35, nombre:'Monteverde',             logo:'logomonteverde.jpg',   url:'https://transportesmonteverde.com/' },
    { id:36, nombre:'MovilBus',               logo:'logoMovilBus.png',     url:'https://www.movilbus.pe/' },
    { id:37, nombre:'Peru V Tours',           logo:'logoperuv.jpg',        url:'https://colcacanyontours-arequipa.com/' },
    { id:38, nombre:'Rubens Tours',           logo:'logorubens.jpg',       url:'https://www.rubenstours.com' },
    { id:39, nombre:'Schnell Tours',          logo:'logoschnell.jpg',      url:'https://www.schnelltours.com' },
    { id:40, nombre:'Soluciones',             logo:'logosoluciones.png',   url:'https://www.solucionestours.com' },
    { id:41, nombre:'Soncollay',              logo:'logosoncollay.jpg',    url:'https://www.perusoncollaytravel.com/es/' },
    { id:42, nombre:'Taruka Tours',           logo:'LogoTarukaTours.png',  url:'https://taruka.tours/' },
    { id:43, nombre:'Transitur',              logo:'LOGOTRANSITUR.jpg',    url:'https://www.transitours.com/' },
    { id:44, nombre:'Trans Martins',          logo:'logotransmartins.png', url:'https://transmartin.com/' },
    { id:45, nombre:'Travel Bus',             logo:'logotravelbus.jpg',    url:'https://www.travelbus.com.pe/' },
    { id:46, nombre:'Tumi Tours',             logo:'logotumi.jpg',         url:'https://www.tumitours.com' },
    { id:47, nombre:'Valenz Tours',           logo:'logovalenz.jpg',       url:'https://www.valenztours.com' },
    { id:48, nombre:'Xpert Tours',            logo:'Logoxpert.jpg',        url:'https://www.peruexpertours.com/' },
    { id:49, nombre:'Yacar Tours',            logo:'logoyacar.jpg',        url:'https://www.yacartours.com' },
    { id:50, nombre:'PST Tours',              logo:'PSTLOGO.png',          url:'https://www.psttours.com' }
  ];

  function escAttr(s) {
    return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  }

  function createCard(empresa) {
    var html = '<a class="empresa-card" href="' + escAttr(empresa.url) + '" target="_blank" rel="noopener noreferrer">';
    html += '<img class="empresa-logo-img" src="images/empresas/' + empresa.logo + '" alt="' + escAttr(empresa.nombre) + '" loading="lazy" />';
    html += '<span class="empresa-name">' + escAttr(empresa.nombre) + '</span>';
    html += '<span class="empresa-tooltip">' + escAttr(empresa.nombre) + '</span>';
    html += '<span class="empresa-ext-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg></span>';
    html += '</a>';
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

  root.innerHTML = html;

  // ── Drag + hover para todas las pantallas ─────────
  (function initInteraction() {
    var rowsEls = root.querySelectorAll('.marquee-row');
    rowsEls.forEach(function(rowEl) {
      var track = rowEl.querySelector('.marquee-track');
      if (!track) return;

      var isDragging = false;
      var didDrag = false;
      var startX = 0;
      var dragOffset = 0;
      var lastX = 0;
      var isHovering = false;
      var momentumId = null;

      // Historial de posiciones para calcular velocidad suavizada
      var posHistory = [];
      var timeHistory = [];

      // Detectar dirección y nombre de la animación
      var isLeft = track.classList.contains('animate-marquee-left');
      var animName = isLeft ? 'marquee-left' : 'marquee-right';
      var speed = track.style.getPropertyValue('--marquee-speed') || (isLeft ? '45s' : '50s');

      track.style.cursor = 'grab';

      // ── Helpers ──
      function getTranslateX() {
        var style = window.getComputedStyle(track);
        var matrix = style.transform || style.webkitTransform;
        if (!matrix || matrix === 'none') return 0;
        var vals = matrix.match(/matrix.*\((.+)\)/);
        if (!vals) return 0;
        return parseFloat(vals[1].split(', ')[4]) || 0;
      }

      function getTrackHalfWidth() {
        return track.scrollWidth / 2;
      }

      function setTranslateX(tx) {
        track.style.transform = 'translateX(' + tx + 'px)';
      }

      // Calcula la velocidad promedio de los últimos ~80ms
      function getSmoothedVelocity() {
        var now = Date.now();
        // Filtrar solo las muestras de los últimos 80ms
        while (timeHistory.length > 0 && now - timeHistory[0] > 80) {
          timeHistory.shift();
          posHistory.shift();
        }
        if (posHistory.length < 2) return 0;
        var dt = timeHistory[timeHistory.length - 1] - timeHistory[0];
        if (dt === 0) return 0;
        var dx = posHistory[posHistory.length - 1] - posHistory[0];
        return dx / dt; // px por ms
      }

      function cancelMomentum() {
        if (momentumId) {
          cancelAnimationFrame(momentumId);
          momentumId = null;
        }
      }

      // Calcula el animation-delay negativo para reanudar desde una posición
      function calcDelay(tx) {
        var halfW = getTrackHalfWidth();
        if (halfW === 0) return '0s';
        var speedSec = parseFloat(speed);
        var normalized = ((tx % halfW) + halfW) % halfW;
        var progress;
        if (isLeft) {
          progress = (halfW - normalized) / halfW;
        } else {
          progress = normalized / halfW;
        }
        return '-' + (progress * speedSec).toFixed(3) + 's';
      }

      function resumeFromPosition(tx) {
        var delay = calcDelay(tx);
        track.style.removeProperty('transform');
        track.style.removeProperty('transition');
        track.style.animation = animName + ' ' + speed + ' linear infinite';
        track.style.animationDelay = delay;
        if (isHovering) {
          track.style.animationPlayState = 'paused';
        } else {
          track.style.removeProperty('animation-play-state');
        }
      }

      // Momentum con deceleración suave por frame
      function startMomentum(currentTx, vel) {
        var tx = currentTx;
        var v = vel * 16; // convertir de px/ms a px/frame (~16ms)
        var friction = 0.95;
        var minV = 0.3;

        function tick() {
          v *= friction;
          if (Math.abs(v) < minV) {
            resumeFromPosition(tx);
            return;
          }
          tx += v;
          setTranslateX(tx);
          momentumId = requestAnimationFrame(tick);
        }
        momentumId = requestAnimationFrame(tick);
      }

      // ── Hover: pause / resume ──
      rowEl.addEventListener('mouseenter', function() {
        isHovering = true;
        if (!isDragging) {
          track.style.animationPlayState = 'paused';
        }
      });

      rowEl.addEventListener('mouseleave', function() {
        isHovering = false;
        if (isDragging) {
          onDragEnd();
        } else {
          track.style.removeProperty('animation-play-state');
        }
      });

      // ── Drag ──
      function onDragStart(x) {
        cancelMomentum();
        isDragging = true;
        didDrag = false;
        startX = x;
        lastX = x;
        posHistory = [x];
        timeHistory = [Date.now()];
        dragOffset = getTranslateX();
        track.style.animation = 'none';
        setTranslateX(dragOffset);
        track.style.transition = 'none';
        track.style.cursor = 'grabbing';
      }

      function onDragMove(x) {
        if (!isDragging) return;
        didDrag = didDrag || Math.abs(x - startX) > 3;
        var tx = dragOffset + (x - startX);
        setTranslateX(tx);
        lastX = x;
        // Guardar historial
        posHistory.push(x);
        timeHistory.push(Date.now());
        // Mantener solo las últimas muestras
        if (posHistory.length > 10) {
          posHistory.shift();
          timeHistory.shift();
        }
      }

      function onDragEnd() {
        if (!isDragging) return;
        isDragging = false;
        track.style.cursor = 'grab';

        var finalTx = dragOffset + (lastX - startX);
        var vel = getSmoothedVelocity();

        if (Math.abs(vel) > 0.1) {
          startMomentum(finalTx, vel);
        } else {
          resumeFromPosition(finalTx);
        }
      }

      // Mouse drag
      track.addEventListener('mousedown', function(e) {
        e.preventDefault();
        onDragStart(e.clientX);
      });
      track.addEventListener('mousemove', function(e) {
        onDragMove(e.clientX);
      });
      track.addEventListener('mouseup', function() {
        onDragEnd();
      });

      // Touch
      track.addEventListener('touchstart', function(e) {
        onDragStart(e.touches[0].clientX);
      }, { passive: true });
      track.addEventListener('touchmove', function(e) {
        onDragMove(e.touches[0].clientX);
      }, { passive: true });
      track.addEventListener('touchend', function() {
        isHovering = false; // no hay hover en touch
        onDragEnd();
      });

      // Bloquear click si se arrastró
      track.addEventListener('click', function(e) {
        if (didDrag) {
          e.preventDefault();
          e.stopPropagation();
        }
      }, true);
    });
  })();

  /* ── Fade-in-up: trigger visibility ──────────────── */
  if (root.classList.contains('fade-in-up')) {
    setTimeout(function () { root.classList.add('is-visible'); }, 100);
  }

  /* ── Desktop search with prediction ────────────────
     Only active on LG+ (the HTML/CSS is hidden otherwise) */
  (function initSearch() {
    var input   = document.getElementById('asociados-search-input');
    var clear   = document.getElementById('asociados-search-clear');
    var results = document.getElementById('asociados-search-results');
    if (!input || !results) return;

    var activeIdx = -1;

    function normalize(s) {
      return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    }

    function highlightText(name, query) {
      var norm = normalize(name);
      var idx  = norm.indexOf(normalize(query));
      if (idx === -1) return escAttr(name);
      var before = escAttr(name.slice(0, idx));
      var match  = escAttr(name.slice(idx, idx + query.length));
      var after  = escAttr(name.slice(idx + query.length));
      return before + '<mark>' + match + '</mark>' + after;
    }

    function renderResults(query) {
      activeIdx = -1;
      if (!query.trim()) {
        results.innerHTML = '';
        results.classList.remove('open');
        unhighlightAll();
        return;
      }

      var q = normalize(query.trim());
      var matches = companies.filter(function(c) {
        return normalize(c.nombre).indexOf(q) !== -1;
      });

      if (matches.length === 0) {
        results.innerHTML = '<li class="search-empty">No se encontró ninguna empresa</li>';
        results.classList.add('open');
        unhighlightAll();
        return;
      }

      var html = '';
      matches.forEach(function(c, i) {
        html += '<li data-id="' + c.id + '" data-index="' + i + '">';
        html += '<img src="images/empresas/' + c.logo + '" alt="" />';
        html += '<span>' + highlightText(c.nombre, query.trim()) + '</span>';
        html += '</li>';
      });
      results.innerHTML = html;
      results.classList.add('open');

      highlightCards(matches);
    }

    /* Highlight matching cards in marquee — only pause the row with a match, others keep moving */
    function highlightCards(matches) {
      var ids = {};
      matches.forEach(function(c) { ids[c.nombre] = true; });

      var tracks = root.querySelectorAll('.marquee-track');
      tracks.forEach(function(track) {
        var rowCards = track.querySelectorAll('.empresa-card');
        var firstMatchInRow = null;
        var hasMatch = false;

        rowCards.forEach(function(card) {
          var name = card.querySelector('.empresa-name');
          if (name && ids[name.textContent]) {
            card.classList.add('search-match');
            card.classList.remove('search-dim');
            hasMatch = true;
            if (!firstMatchInRow) firstMatchInRow = card;
          } else {
            card.classList.remove('search-match');
            card.classList.add('search-dim');
          }
        });

        if (hasMatch && firstMatchInRow) {
          /* Stop this row and slide to the match */
          track.style.animation = 'none';
          track.style.transition = 'transform 0.6s cubic-bezier(.4,0,.2,1)';
          var rowEl = track.parentElement;
          var rowWidth = rowEl.offsetWidth;
          var cardLeft = firstMatchInRow.offsetLeft;
          var cardWidth = firstMatchInRow.offsetWidth;
          var offset = -(cardLeft - (rowWidth / 2) + (cardWidth / 2));
          track.style.transform = 'translateX(' + offset + 'px)';
        } else {
          /* No match in this row — keep animation running, just dim cards */
          track.style.animation = '';
          track.style.transition = '';
          track.style.transform = '';
        }
      });
    }

    function unhighlightAll() {
      var allCards = root.querySelectorAll('.empresa-card');
      allCards.forEach(function(card) {
        card.classList.remove('search-match', 'search-dim');
      });
      /* Restore CSS marquee animation on every track */
      var tracks = root.querySelectorAll('.marquee-track');
      tracks.forEach(function(track) {
        track.style.transition = '';
        track.style.transform = '';
        track.style.animation = '';
      });
    }

    function selectResult(li) {
      if (!li || li.classList.contains('search-empty')) return;
      var id = parseInt(li.dataset.id, 10);
      var empresa = companies.find(function(c) { return c.id === id; });
      if (empresa && empresa.url) {
        window.open(empresa.url, '_blank', 'noopener,noreferrer');
      }
    }

    /* Input + clear */
    input.addEventListener('input', function() {
      renderResults(this.value);
      clear.classList.toggle('visible', this.value.length > 0);
    });

    clear.addEventListener('click', function() {
      input.value = '';
      clear.classList.remove('visible');
      renderResults('');
      input.focus();
    });

    /* Keyboard navigation */
    input.addEventListener('keydown', function(e) {
      var items = results.querySelectorAll('li:not(.search-empty)');
      if (!items.length) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIdx = Math.min(activeIdx + 1, items.length - 1);
        updateActive(items);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIdx = Math.max(activeIdx - 1, 0);
        updateActive(items);
      } else if (e.key === 'Enter' && activeIdx >= 0) {
        e.preventDefault();
        selectResult(items[activeIdx]);
      } else if (e.key === 'Escape') {
        input.value = '';
        clear.classList.remove('visible');
        renderResults('');
        input.blur();
      }
    });

    function updateActive(items) {
      items.forEach(function(li, i) {
        li.classList.toggle('active', i === activeIdx);
        if (i === activeIdx) li.scrollIntoView({ block: 'nearest' });
      });
    }

    /* Click on result */
    results.addEventListener('click', function(e) {
      var li = e.target.closest('li');
      if (li) selectResult(li);
    });

    /* Close dropdown on outside click */
    document.addEventListener('click', function(e) {
      if (!e.target.closest('#asociados-search')) {
        results.classList.remove('open');
        unhighlightAll();
      }
    });

    /* Re-open on focus if there's a query */
    input.addEventListener('focus', function() {
      if (this.value.trim()) renderResults(this.value);
    });
  })();
});
