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
