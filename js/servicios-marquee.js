/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   SERVICIOS MARQUEE â€” 3 rows with fleet photos + logos
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

document.addEventListener('DOMContentLoaded', function () {
  const root = document.getElementById('servicios-marquee-root');
  if (!root) return;

  const exampleImages = [
    'images/noticias/evento-03-02-2026-reunion-ATU.jpg',
    'images/noticias/evento-10-02-2026-presentaciÃ³n-PDTL-mml-02.jpg',
    'images/noticias/evento-10-12-2024-desayuno-de-trabajo.jpg',
    'images/noticias/evento-10-12-2025-reunion-mml.jpg',
    'images/noticias/evento-14-07-2025-reuniÃ³n-municipalidad-pueblo-libre.jpg',
    'images/noticias/evento-15-07-2025-reunion-municipalidad-san-isidro.jpg',
    'images/noticias/evento-20-mayo-2024-mesa-de-trabajo-mml.jpg',
    'images/noticias/evento-22-12-2025-desayuno-de-trabajo-Apttur-2025.jpg',
    'images/noticias/evento-25-08-2025-Mesa-de-trabajo-Municipalidad-de-Miraflores.jpg',
    'images/noticias/evento-26-01-2026-reuniÃ³n-con-pnp.jpg',
    'images/noticias/evento-29-05-2025-visita-nuevo-aeropuerto-Jorge-Chavez.jpg',
    'images/noticias/evento-apttur-reunion-muni-victoria-nov-23.jpg'
  ];

  const tags = ['Premium', 'Turismo', 'Movilidad', 'Confort', 'Flota', 'Andes', 'Lima', 'Expreso', 'Grupo', 'Eco'];

  const allCompanies = [
    { nombre: 'Dos MÃ¡s Dos',      logo: 'images/empresas/DOSMASDOS.png',        url: 'https://dosmasdosa.com/'                        },
    { nombre: 'AKI Tours',        logo: 'images/empresas/LOGOAKI.jpg',          url: 'https://akimovil.com.pe/'                       },
    { nombre: 'Alicar',           logo: 'images/empresas/logoalicar.png',       url: 'https://www.alicartours.com'                    },
    { nombre: 'Alpamayo',         logo: 'images/empresas/logoalpamayo.jpg',     url: 'https://www.alpamayotours.com'                  },
    { nombre: 'Aranda',           logo: 'images/empresas/logoaranda.png',       url: 'https://www.arandatours.com'                    },
    { nombre: 'Avalos Tours',     logo: 'images/empresas/LOGOAVALOS.png',       url: 'https://www.avalostours.com'                    },
    { nombre: 'AYV Transportes',  logo: 'images/empresas/logoAYV.jpg',          url: 'https://www.ayvtransportes.com'                 },
    { nombre: 'Black Tours',      logo: 'images/empresas/logoblack.jpg',        url: 'https://blacktransporte.com/'                   },
    { nombre: 'Brazin',           logo: 'images/empresas/logobrazin.png',       url: 'https://www.brazintours.com'                    },
    { nombre: 'Buganvilla',       logo: 'images/empresas/logoBuganvilla.jpg',   url: 'https://buganvillatours.com/en/home/'            },
    { nombre: 'ByM Tours',        logo: 'images/empresas/LogoByM.jpg',          url: 'https://www.bymtours.com/'                      },
    { nombre: 'Chaski Tours',     logo: 'images/empresas/logochaski.png',       url: 'https://www.chaskitours.com'                    },
    { nombre: 'ChavÃ­n Tours',     logo: 'images/empresas/logochavin.jpg',       url: 'https://www.chavintours.com'                    },
    { nombre: 'Connecting',       logo: 'images/empresas/logoconnecting.jpg',   url: 'https://www.connectingtours.com/'               },
    { nombre: 'Crown Tours',      logo: 'images/empresas/logocrown.jpg',        url: 'https://www.crowntours.com/'                    },
    { nombre: 'DC Tours',         logo: 'images/empresas/logodc.jpg',           url: 'https://transporteturisticoperu.com/'           },
    { nombre: 'Destinos',         logo: 'images/empresas/logodestinos.png',     url: 'https://www.transportedestinos.com/'            },
    { nombre: 'DRC Tours',        logo: 'images/empresas/logodrc.jpg',          url: 'https://drc-tours.com/'                         },
    { nombre: 'Edu Tours',        logo: 'images/empresas/logoedu.png',          url: 'https://www.edutoursperu.com'                   },
    { nombre: 'Elegance',         logo: 'images/empresas/LOGOELEGANCE.jpg',     url: 'https://www.eleganceclasstravel.com/'           },
    { nombre: 'Eminiari',         logo: 'images/empresas/logoeminiari.jpg',     url: 'https://www.eminiari.com'                       },
    { nombre: 'Giin Tours',       logo: 'images/empresas/logogiin.png',         url: 'https://www.giintours.com'                      },
    { nombre: 'Inka Tours',       logo: 'images/empresas/logoinka.png',         url: 'https://www.inkaexpress.com/es/'                },
    { nombre: 'J&M Tours',        logo: 'images/empresas/LogoJ&M.jpg',          url: 'https://www.jmtoursperu.com'                    },
    { nombre: 'Jamuy Tours',      logo: 'images/empresas/logojamuy.jpg',        url: 'https://perujamuytravel.com/'                   },
    { nombre: 'Jhony Tours',      logo: 'images/empresas/logojhony.png',        url: 'https://www.jhonytours.com'                     },
    { nombre: 'Joggys Tours',     logo: 'images/empresas/Logojoggys.jpg',       url: 'https://joggystours.com.pe/'                    },
    { nombre: 'Koni Tours',       logo: 'images/empresas/logokoni.jpg',         url: 'https://konitours.com/'                         },
    { nombre: 'Kusa Tours',       logo: 'images/empresas/LOGOKUSA.jpg',         url: 'https://www.kusatravel.com/'                    },
    { nombre: 'Levita Tours',     logo: 'images/empresas/logolevita.png',       url: 'https://www.levitatours.com/'                   },
    { nombre: 'Lore Tours',       logo: 'images/empresas/logolore.jpg',         url: 'https://loretours.blogspot.com/'                },
    { nombre: 'Manchego Tours',   logo: 'images/empresas/LogoManchego.png',     url: 'https://www.manchegoturismo.com/'               },
    { nombre: 'Maximino Tours',   logo: 'images/empresas/logomaximino.jpg',     url: 'https://www.maximino.com.pe/'                   },
    { nombre: 'MB Tours',         logo: 'images/empresas/LOGOMB.jpg',           url: 'https://www.mbtoursperu.com'                    },
    { nombre: 'Monteverde',       logo: 'images/empresas/logomonteverde.jpg',   url: 'https://transportesmonteverde.com/'             },
    { nombre: 'MovilBus',         logo: 'images/empresas/logoMovilBus.png',     url: 'https://www.movilbus.pe/'                       },
    { nombre: 'Peru V Tours',     logo: 'images/empresas/logoperuv.jpg',        url: 'https://colcacanyontours-arequipa.com/'         },
    { nombre: 'Rubens Tours',     logo: 'images/empresas/logorubens.jpg',       url: 'https://www.rubenstours.com'                    },
    { nombre: 'Schnell Tours',    logo: 'images/empresas/logoschnell.jpg',      url: 'https://www.schnelltours.com'                   },
    { nombre: 'Soluciones',       logo: 'images/empresas/logosoluciones.png',   url: 'https://www.solucionestours.com'                },
    { nombre: 'Soncollay',        logo: 'images/empresas/logosoncollay.jpg',    url: 'https://www.perusoncollaytravel.com/es/'        },
    { nombre: 'Taruka Tours',     logo: 'images/empresas/LogoTarukaTours.png',  url: 'https://taruka.tours/'                          },
    { nombre: 'Transitur',        logo: 'images/empresas/LOGOTRANSITUR.jpg',    url: 'https://www.transitours.com/'                   },
    { nombre: 'Trans Martins',    logo: 'images/empresas/logotransmartins.png', url: 'https://transmartin.com/'                       },
    { nombre: 'Travel Bus',       logo: 'images/empresas/logotravelbus.jpg',    url: 'https://www.travelbus.com.pe/'                  },
    { nombre: 'Tumi Tours',       logo: 'images/empresas/logotumi.jpg',         url: 'https://www.tumitours.com'                      },
    { nombre: 'Valenz Tours',     logo: 'images/empresas/logovalenz.jpg',       url: 'https://www.valenztours.com'                    },
    { nombre: 'Xpert Tours',      logo: 'images/empresas/Logoxpert.jpg',        url: 'https://www.peruexpertours.com/'                },
    { nombre: 'Yacar Tours',      logo: 'images/empresas/logoyacar.jpg',        url: 'https://www.yacartours.com'                     },
    { nombre: 'PST Tours',        logo: 'images/empresas/PSTLOGO.png',          url: 'https://www.psttours.com'                       }
  ];

  const companies = allCompanies.map(function (c, i) {
    return {
      nombre: c.nombre,
      logo:   c.logo,
      url:    c.url,
      image:  exampleImages[i % exampleImages.length],
      tag:    tags[i % tags.length]
    };
  });

  function escAttr(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;');
  }

  function createCard(item) {
    return [
      '<article class="servicio-marquee-card" data-name="' + escAttr(item.nombre) + '" data-url="' + escAttr(item.url) + '">',
      '  <div class="servicio-marquee-visual" style="background-image:url(\'' + escAttr(item.image) + '\');"></div>',
      '  <div class="servicio-marquee-overlay"></div>',
      '  <div class="servicio-marquee-foot">',
      '    <strong>' + escAttr(item.nombre) + '</strong>',
      '    <span>Unidad de servicio</span>',
      '  </div>',
      '  <img class="servicio-marquee-logo" src="' + escAttr(item.logo) + '" alt="' + escAttr(item.nombre) + '" loading="lazy" />',
      '</article>'
    ].join('');
  }

  const rows = [
    { items: companies.slice(0, 17),  duration: '62s', direction: 'left'  },
    { items: companies.slice(17, 34), duration: '70s', direction: 'right' },
    { items: companies.slice(34, 50), duration: '65s', direction: 'left'  }
  ];

  root.innerHTML = rows.map(function (row) {
    return [
      '<div class="marquee-row">',
      '  <div class="marquee-track animate-marquee-' + row.direction + '" style="--marquee-speed:' + row.duration + '; touch-action: pan-y;">',
      row.items.map(createCard).join('') + row.items.map(createCard).join(''),
      '  </div>',
      '</div>'
    ].join('');
  }).join('');

  function initDrag() {
    root.querySelectorAll('.marquee-row').forEach(function (rowEl) {
      var track = rowEl.querySelector('.marquee-track');
      if (!track) return;

      var isDragging = false;
      var didDrag = false;
      var startX = 0;
      var dragOffset = 0;
      var lastX = 0;
      var isHovering = false;
      var momentumId = null;
      var posHistory = [];
      var timeHistory = [];

      var isLeft = track.classList.contains('animate-marquee-left');
      var animName = isLeft ? 'marquee-left' : 'marquee-right';
      var speed = track.style.getPropertyValue('--marquee-speed') || (isLeft ? '42s' : '48s');

      track.style.cursor = 'grab';

      function getTranslateX() {
        var style = window.getComputedStyle(track);
        var matrix = style.transform || style.webkitTransform;
        if (!matrix || matrix === 'none') return 0;
        var vals = matrix.match(/matrix.*\((.+)\)/);
        if (!vals) return 0;
        return parseFloat(vals[1].split(', ')[4]) || 0;
      }

      function setTranslateX(tx) {
        track.style.transform = 'translateX(' + tx + 'px)';
      }

      function getSmoothedVelocity() {
        var now = Date.now();
        while (timeHistory.length > 0 && now - timeHistory[0] > 80) {
          timeHistory.shift();
          posHistory.shift();
        }
        if (posHistory.length < 2) return 0;
        var dt = timeHistory[timeHistory.length - 1] - timeHistory[0];
        if (dt === 0) return 0;
        var dx = posHistory[posHistory.length - 1] - posHistory[0];
        return dx / dt;
      }

      function cancelMomentum() {
        if (momentumId) {
          cancelAnimationFrame(momentumId);
          momentumId = null;
        }
      }

      function calcDelay(tx) {
        var halfW = track.scrollWidth / 2;
        if (halfW === 0) return '0s';
        var speedSec = parseFloat(speed);
        var normalized = ((tx % halfW) + halfW) % halfW;
        var progress = isLeft ? (halfW - normalized) / halfW : normalized / halfW;
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

      function startMomentum(currentTx, vel) {
        var tx = currentTx;
        var v = vel * 16;
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

      rowEl.addEventListener('mouseenter', function () {
        isHovering = true;
        if (!isDragging) track.style.animationPlayState = 'paused';
      });

      rowEl.addEventListener('mouseleave', function () {
        isHovering = false;
        if (isDragging) {
          onDragEnd();
        } else {
          track.style.removeProperty('animation-play-state');
        }
      });

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
        setTranslateX(dragOffset + (x - startX));
        lastX = x;
        posHistory.push(x);
        timeHistory.push(Date.now());
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

      track.addEventListener('mousedown', function (e) {
        e.preventDefault();
        onDragStart(e.clientX);
      });
      track.addEventListener('mousemove', function (e) {
        onDragMove(e.clientX);
      });
      track.addEventListener('mouseup', onDragEnd);

      var touchStartX = 0;
      var touchStartY = 0;
      var touchDir    = null; // null | 'x' | 'y'

      track.addEventListener('touchstart', function (e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchDir    = null;
      }, { passive: true });

      track.addEventListener('touchmove', function (e) {
        var dx = Math.abs(e.touches[0].clientX - touchStartX);
        var dy = Math.abs(e.touches[0].clientY - touchStartY);

        if (touchDir === null && (dx > 6 || dy > 6)) {
          touchDir = dx >= dy ? 'x' : 'y';
          if (touchDir === 'x') onDragStart(touchStartX);
        }

        if (touchDir === 'x') {
          e.preventDefault();
          onDragMove(e.touches[0].clientX);
        }
      }, { passive: false });

      track.addEventListener('touchend', function () {
        isHovering = false;
        if (touchDir === 'x') onDragEnd();
        touchDir = null;
      });

      track.addEventListener('click', function (e) {
        if (didDrag) {
          e.preventDefault();
          e.stopPropagation();
        }
      }, true);
    });
  }

  initDrag();

  (function initSearch() {
    var input   = document.getElementById('flota-search-input');
    var clear   = document.getElementById('flota-search-clear');
    var results = document.getElementById('flota-search-results');
    if (!input || !results) return;

    var activeIdx = -1;

    function normalize(s) {
      return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    }

    function escStr(s) {
      return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
    }

    function highlightText(name, query) {
      var norm = normalize(name);
      var idx  = norm.indexOf(normalize(query));
      if (idx === -1) return escStr(name);
      return escStr(name.slice(0, idx))
        + '<mark>' + escStr(name.slice(idx, idx + query.length)) + '</mark>'
        + escStr(name.slice(idx + query.length));
    }

    function highlightCards(matches) {
      var names = {};
      matches.forEach(function (c) { names[c.nombre] = true; });

      root.querySelectorAll('.marquee-track').forEach(function (track) {
        var rowCards = track.querySelectorAll('.servicio-marquee-card');
        var firstMatch = null;
        var hasMatch = false;

        rowCards.forEach(function (card) {
          if (names[card.dataset.name || '']) {
            card.classList.add('search-match');
            card.classList.remove('search-dim');
            hasMatch = true;
            if (!firstMatch) firstMatch = card;
          } else {
            card.classList.remove('search-match');
            card.classList.add('search-dim');
          }
        });

        if (hasMatch && firstMatch) {
          track.style.animation  = 'none';
          track.style.transition = 'transform 0.6s cubic-bezier(.4,0,.2,1)';
          var rowWidth  = track.parentElement.offsetWidth;
          var cardLeft  = firstMatch.offsetLeft;
          var cardWidth = firstMatch.offsetWidth;
          track.style.transform = 'translateX(' + -(cardLeft - (rowWidth / 2) + (cardWidth / 2)) + 'px)';
        } else {
          track.style.animation  = '';
          track.style.transition = '';
          track.style.transform  = '';
        }
      });
    }

    function unhighlightAll() {
      root.querySelectorAll('.servicio-marquee-card').forEach(function (card) {
        card.classList.remove('search-match', 'search-dim');
      });
      root.querySelectorAll('.marquee-track').forEach(function (track) {
        track.style.transition = '';
        track.style.transform  = '';
        track.style.animation  = '';
      });
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
      var matches = companies.filter(function (c) {
        return normalize(c.nombre).indexOf(q) !== -1;
      });

      if (matches.length === 0) {
        results.innerHTML = '<li class="search-empty">No se encontr\u00f3 ninguna empresa</li>';
        results.classList.add('open');
        unhighlightAll();
        return;
      }

      var html = '';
      matches.forEach(function (c, i) {
        html += '<li data-nombre="' + escStr(c.nombre) + '" data-index="' + i + '">';
        html += '<img src="' + escStr(c.logo) + '" alt="" />';
        html += '<span>' + highlightText(c.nombre, query.trim()) + '</span>';
        html += '</li>';
      });
      results.innerHTML = html;
      results.classList.add('open');
      highlightCards(matches);
    }

    function updateActive(items) {
      items.forEach(function (li, i) {
        li.classList.toggle('active', i === activeIdx);
        if (i === activeIdx) li.scrollIntoView({ block: 'nearest' });
      });
    }

    input.addEventListener('input', function () {
      renderResults(this.value);
      clear.classList.toggle('visible', this.value.length > 0);
    });

    clear.addEventListener('click', function () {
      input.value = '';
      clear.classList.remove('visible');
      renderResults('');
      input.focus();
    });

    input.addEventListener('keydown', function (e) {
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
      } else if (e.key === 'Escape') {
        input.value = '';
        clear.classList.remove('visible');
        renderResults('');
        input.blur();
      }
    });

    results.addEventListener('click', function (e) {
      var li = e.target.closest('li');
      if (!li || li.classList.contains('search-empty')) return;
      results.classList.remove('open');
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest('#flota-search')) {
        results.classList.remove('open');
        unhighlightAll();
      }
    });

    input.addEventListener('focus', function () {
      if (this.value.trim()) renderResults(this.value);
    });
  })();

  (function initLightbox() {
    var lb = document.createElement('div');
    lb.className = 'flota-lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.innerHTML = [
      '<div class="flota-lightbox-backdrop"></div>',
      '<div class="flota-lightbox-card">',
      '  <div class="flota-lightbox-visual"></div>',
      '  <div class="flota-lightbox-gradient"></div>',
      '  <img class="flota-lightbox-logo" src="" alt="" />',
      '  <div class="flota-lightbox-info">',
      '    <strong class="flota-lightbox-name"></strong>',
      '    <p class="flota-lightbox-sub">Empresa asociada a APTTUR</p>',
      '  </div>',
      '  <a class="flota-lightbox-visit" href="#" target="_blank" rel="noopener noreferrer" aria-label="Visitar sitio web">',
      '    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
      '    <span>Visitar web</span>',
      '  </a>',
      '  <button class="flota-lightbox-close" aria-label="Cerrar">',
      '    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
      '  </button>',
      '</div>'
    ].join('');
    document.body.appendChild(lb);

    var lbVisual   = lb.querySelector('.flota-lightbox-visual');
    var lbLogo     = lb.querySelector('.flota-lightbox-logo');
    var lbName     = lb.querySelector('.flota-lightbox-name');
    var lbVisit    = lb.querySelector('.flota-lightbox-visit');
    var lbClose    = lb.querySelector('.flota-lightbox-close');
    var lbBackdrop = lb.querySelector('.flota-lightbox-backdrop');

    function openLightbox(card) {
      var visual = card.querySelector('.servicio-marquee-visual');
      var logo   = card.querySelector('.servicio-marquee-logo');
      var url    = card.dataset.url || '#';

      lbVisual.style.backgroundImage = visual ? visual.style.backgroundImage : '';
      lbLogo.src = logo ? logo.getAttribute('src') : '';
      lbLogo.alt = card.dataset.name || '';
      lbName.textContent = card.dataset.name || '';
      lbVisit.href = url;

      lb.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lb.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    /* Click delegation on root â€” drag handler already blocks clicks after drag */
    root.addEventListener('click', function (e) {
      var card = e.target.closest('.servicio-marquee-card');
      if (card) openLightbox(card);
    });

    lbClose.addEventListener('click', closeLightbox);
    lbBackdrop.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });
  })();
});


