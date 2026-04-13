/* ==============================================================
   NOTICIAS.JS - Renders the full Noticias page:
   A) Header  B) Featured card  C) Year-grouped grid  + Modal
   ============================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('noticias-root');
  if (!root) return;

  renderNoticiasPage(root);
  initImageFadeIn();
  initFadeInUpObserver();
  initNewsClicks();
  checkDeepLink();
});

/* ── SVG icon helpers ─────────────────────────────── */
const ICO = {
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  mapPin:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  clock:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  arrowUpRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>',
  x:        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
};

/* ── NEWS DATA ────────────────────────────────────── */
const NEWS_DATA = [
  { id:1,  title:'Presentaci\u00f3n del PDTL en la Municipalidad Metropolitana de Lima', excerpt:'APTTUR particip\u00f3 en la presentaci\u00f3n oficial del Plan de Desarrollo del Transporte Tur\u00edstico Terrestre ante autoridades de la Municipalidad Metropolitana de Lima.', date:'10 Feb 2026', year:2026, cat:'Institucional', loc:'Municipalidad de Lima', time:'3 min', imgs:['eventos-10-02-2026-presentacion-PDTL-mml.jpg','evento-10-02-2026-presentaci\u00f3n-PDTL-mml-02.jpg'] },
  { id:2,  title:'Reuni\u00f3n con ATU', excerpt:'Reuni\u00f3n de coordinaci\u00f3n con la Autoridad de Transporte Urbano para tratar temas vinculados al transporte tur\u00edstico en Lima Metropolitana y el Callao.', date:'03 Feb 2026', year:2026, cat:'Reuni\u00f3n', loc:'ATU - Lima', time:'3 min', img:'evento-03-02-2026-reunion-ATU.jpg' },
  { id:3,  title:'Reuni\u00f3n con la Polic\u00eda Nacional', excerpt:'Encuentro institucional con representantes de la Polic\u00eda Nacional del Per\u00fa para coordinar acciones conjuntas de seguridad en el transporte tur\u00edstico.', date:'26 Ene 2026', year:2026, cat:'Seguridad', loc:'Lima, Per\u00fa', time:'3 min', img:'evento-26-01-2026-reuni\u00f3n-con-pnp.jpg' },
  { id:4,  title:'Desayuno de trabajo APTTUR', excerpt:'Desayuno de trabajo entre directivos y asociados de APTTUR para evaluar avances del a\u00f1o y planificar las actividades del siguiente periodo.', date:'22 Dic 2025', year:2025, cat:'Gremial', loc:'Lima, Per\u00fa', time:'3 min', img:'evento-22-12-2025-desayuno-de-trabajo-Apttur-2025.jpg' },
  { id:5,  title:'Reuni\u00f3n con la Municipalidad Metropolitana de Lima', excerpt:'Sesi\u00f3n de trabajo con funcionarios de la Municipalidad Metropolitana de Lima sobre regulaci\u00f3n y ordenamiento del transporte tur\u00edstico.', date:'10 Dic 2025', year:2025, cat:'Reuni\u00f3n', loc:'Municipalidad de Lima', time:'3 min', img:'evento-10-12-2025-reunion-mml.jpg' },
  { id:6,  title:'Reuni\u00f3n con \u00e1rea de fiscalizaci\u00f3n de la Municipalidad Metropolitana de Lima', excerpt:'Coordinaci\u00f3n con el \u00e1rea de fiscalizaci\u00f3n municipal para establecer criterios claros en la supervisi\u00f3n del transporte tur\u00edstico.', date:'18 Sep 2025', year:2025, cat:'Reuni\u00f3n', loc:'Municipalidad de Lima', time:'3 min', img:'eventos-18-09-2025-reunion-\u00e1rea-fiscalizacion-mml.jpg' },
  { id:7,  title:'Mesa de trabajo del Comit\u00e9 Consultivo de Turismo de la Municipalidad Metropolitana de Lima', excerpt:'Participaci\u00f3n activa en la mesa de trabajo del comit\u00e9 consultivo, aportando propuestas para mejorar la experiencia tur\u00edstica en Lima.', date:'09 Sep 2025', year:2025, cat:'Mesa de Trabajo', loc:'Municipalidad de Lima', time:'4 min', img:'eventos-09-09-2025-mesa-de-trabajo-comite-consultivo-turismo-mml.jpg' },
  { id:8,  title:'Mesa de trabajo en Municipalidad de Miraflores', excerpt:'Reuni\u00f3n de coordinaci\u00f3n con la Municipalidad de Miraflores para abordar la regulaci\u00f3n del transporte tur\u00edstico en uno de los distritos m\u00e1s visitados de Lima.', date:'25 Ago 2025', year:2025, cat:'Mesa de Trabajo', loc:'Municipalidad de Miraflores', time:'3 min', img:'evento-25-08-2025-Mesa-de-trabajo-Municipalidad-de-Miraflores.jpg' },
  { id:9,  title:'Reuni\u00f3n con la Municipalidad de San Isidro', excerpt:'Encuentro con autoridades de San Isidro para coordinar acciones sobre el tr\u00e1nsito y estacionamiento de veh\u00edculos tur\u00edsticos en el distrito.', date:'15 Jul 2025', year:2025, cat:'Reuni\u00f3n', loc:'Municipalidad de San Isidro', time:'3 min', img:'evento-15-07-2025-reunion-municipalidad-san-isidro.jpg' },
  { id:10, title:'Reuni\u00f3n con la Municipalidad de Pueblo Libre', excerpt:'Sesi\u00f3n de trabajo con la Municipalidad de Pueblo Libre sobre la gesti\u00f3n del transporte tur\u00edstico en zonas con patrimonio cultural.', date:'14 Jul 2025', year:2025, cat:'Reuni\u00f3n', loc:'Municipalidad de Pueblo Libre', time:'3 min', img:'evento-14-07-2025-reuni\u00f3n-municipalidad-pueblo-libre.jpg' },
  { id:11, title:'Visita de reconocimiento al nuevo Aeropuerto Jorge Ch\u00e1vez', excerpt:'APTTUR realiz\u00f3 una visita t\u00e9cnica al nuevo terminal del Aeropuerto Internacional Jorge Ch\u00e1vez para evaluar las zonas de operaci\u00f3n del transporte tur\u00edstico.', date:'29 May 2025', year:2025, cat:'Visita T\u00e9cnica', loc:'Aeropuerto Jorge Ch\u00e1vez', time:'4 min', img:'evento-29-05-2025-visita-nuevo-aeropuerto-Jorge-Chavez.jpg' },
  { id:12, title:'Ayuda Social de APTTUR', excerpt:'Actividad de responsabilidad social organizada por APTTUR, llevando apoyo a comunidades necesitadas en \u00e9poca navide\u00f1a. Los asociados participaron activamente en la entrega de donaciones.', date:'14 Dic 2024', year:2024, cat:'Social', loc:'Lima, Per\u00fa', time:'3 min', imgs:['evento-ayuda-social-apttur-14-12-2024-01.jpg','evento-ayuda-social-apttur-14-12-2024-02.jpg'] },
  { id:13, title:'Asamblea Ordinaria - Diciembre 2024', excerpt:'Asamblea General Ordinaria de APTTUR donde se rindieron cuentas del periodo y se aprobaron las l\u00edneas de acci\u00f3n para el siguiente a\u00f1o.', date:'10 Dic 2024', year:2024, cat:'Asamblea', loc:'Lima, Per\u00fa', time:'4 min', img:'evento-10-12-2024-desayuno-de-trabajo.jpg' },
  { id:14, title:'Reuni\u00f3n con la ministra Elizabeth Galdo en MINCETUR', excerpt:'Encuentro de alto nivel con la ministra de Comercio Exterior y Turismo para tratar la agenda del transporte tur\u00edstico a nivel nacional.', date:'30 May 2024', year:2024, cat:'Reuni\u00f3n', loc:'MINCETUR - Lima', time:'4 min', img:'evento-reunion-ministra-Elizabeth-Galdo-MINCETUR-30-mayo-2024.jpg' },
  { id:15, title:'Mesa de trabajo Municipalidad Metropolitana de Lima', excerpt:'Mesa de trabajo con la Municipalidad Metropolitana de Lima para discutir propuestas de mejora en la regulaci\u00f3n del transporte tur\u00edstico.', date:'20 May 2024', year:2024, cat:'Mesa de Trabajo', loc:'Municipalidad de Lima', time:'3 min', img:'evento-20-mayo-2024-mesa-de-trabajo-mml.jpg' },
  { id:16, title:'Mesa de trabajo Municipalidad de Miraflores', excerpt:'Sesi\u00f3n de trabajo con la Municipalidad de Miraflores para coordinar acciones de ordenamiento del transporte tur\u00edstico en el distrito.', date:'15 Abr 2024', year:2024, cat:'Mesa de Trabajo', loc:'Municipalidad de Miraflores', time:'3 min', img:'evento.miraflores.abril-2024.jpg' },
  { id:17, title:'Asamblea Ordinaria - Diciembre 2023', excerpt:'Asamblea General Ordinaria de cierre de a\u00f1o, con balance de gesti\u00f3n y planificaci\u00f3n del periodo siguiente.', date:'Dic 2023', year:2023, cat:'Asamblea', loc:'Lima, Per\u00fa', time:'3 min', img:'eventos-APTTUR-DIRECTIVA-3.jpg' },
  { id:18, title:'Reuni\u00f3n Municipalidad de la Victoria', excerpt:'Reuni\u00f3n con autoridades de la Municipalidad de la Victoria para abordar temas de tr\u00e1nsito y operaci\u00f3n del transporte tur\u00edstico.', date:'Nov 2023', year:2023, cat:'Reuni\u00f3n', loc:'Municipalidad de la Victoria', time:'3 min', img:'evento-apttur-reunion-muni-victoria-nov-23.jpg' },
  { id:19, title:'Reuni\u00f3n con la Comisi\u00f3n de Turismo del Congreso de la Rep\u00fablica', excerpt:'APTTUR fue recibido por la Comisi\u00f3n de Turismo del Congreso para exponer las necesidades y propuestas del sector transporte tur\u00edstico.', date:'12 Jun 2023', year:2023, cat:'Institucional', loc:'Congreso de la Rep\u00fablica', time:'4 min', img:'evento.comisi\u00f3n.turismo.jpg' },
  { id:20, title:'APTTUR en el Comit\u00e9 Consultivo de Turismo de la Municipalidad Metropolitana de Lima', excerpt:'APTTUR forma parte oficial del Comit\u00e9 Consultivo de Turismo, consolidando su rol como representante del transporte tur\u00edstico ante las autoridades municipales.', date:'25 May 2023', year:2023, cat:'Institucional', loc:'Municipalidad de Lima', time:'4 min', imgs:['evento.comite.consultivo.1.jpg','evento.comite.consultivo.2.png','evento.comite.consultivo.3.jpg'] },
  { id:21, title:'Reuni\u00f3n ATU - Mayo 2023', excerpt:'Reuni\u00f3n de trabajo con la Autoridad de Transporte Urbano para discutir la normativa vigente y proyectos del transporte tur\u00edstico.', date:'May 2023', year:2023, cat:'Reuni\u00f3n', loc:'ATU - Lima', time:'3 min', img:'evento-apttur-reunion-sutran-mayo-23.jpg' },
  { id:22, title:'Feria APAVIT', excerpt:'APTTUR particip\u00f3 en la Feria de la Asociaci\u00f3n Peruana de Agencias de Viajes y Turismo, promoviendo el transporte tur\u00edstico formal y seguro.', date:'Mar 2023', year:2023, cat:'Feria', loc:'Lima, Per\u00fa', time:'3 min', img:'eventos-APTTUR-APAVIT-1.jpg' },
  { id:23, title:'Campeonato de fulbito APTTUR', excerpt:'Campeonato deportivo de confraternidad entre los asociados de APTTUR, fortaleciendo los lazos entre las empresas del gremio.', date:'Mar 2023', year:2023, cat:'Gremial', loc:'Lima, Per\u00fa', time:'2 min', imgs:['eventos-fulbito-1.jpg','eventos-fulbito-2.jpg','eventos-fulbito-flyer.jpg'] },
  { id:24, title:'Almuerzo de Confraternidad asociados APTTUR', excerpt:'Almuerzo anual de confraternidad que reuni\u00f3 a los asociados de APTTUR en un ambiente de camarader\u00eda y compromiso gremial.', date:'25 Oct 2022', year:2022, cat:'Gremial', loc:'Lima, Per\u00fa', time:'3 min', img:'evento.almuerzo.jpg' },
];

function imgUrl(photo) {
  return 'images/noticias/' + photo;
}

/* Helper: get images array from item (supports both img and imgs) */
function getImages(item) { return item.imgs || [item.img]; }
function getMainImg(item) { return getImages(item)[0]; }

/* ── Render full page ─────────────────────────────── */
function renderNoticiasPage(root) {
  var html = '';

  /* A) Header */
  html += '<div class="noticias-header fade-in-up">';
  html += '  <p class="noticias-label">ACTUALIDAD</p>';
  html += '  <h1 class="noticias-title" id="noticias-title">\u00daltimas <span>Noticias</span></h1>';
  html += '  <p class="noticias-desc">Mantente informado sobre los eventos, capacitaciones y novedades m\u00e1s recientes del transporte tur\u00edstico peruano.</p>';
  html += '  <div class="noticias-line"></div>';
  html += '</div>';

  /* B) Featured card (ID 1) */
  var feat = NEWS_DATA[0];
  html += '<article class="featured-news fade-in-up" data-news-id="' + feat.id + '">';
  html += '  <div class="featured-news-img">';
  html += '    <img src="' + imgUrl(getMainImg(feat)) + '" alt="' + escAttr(feat.title) + '" loading="eager" />';
  html += '    <span class="featured-news-badge" data-cat="' + feat.cat + '">' + feat.cat + '</span>';
  html += '  </div>';
  html += '  <div class="featured-news-body">';
  html += '    <span class="featured-news-year">' + feat.year + '</span>';
  html += '    <h2>' + esc(feat.title) + '</h2>';
  html += '    <p class="featured-news-excerpt">' + esc(feat.excerpt) + '</p>';
  html += '    <div class="featured-news-meta">';
  html += metaItem(ICO.calendar, '<time>' + feat.date + '</time>');
  html += metaItem(ICO.mapPin, feat.loc);
  html += metaItem(ICO.clock, feat.time);
  html += '    </div>';
  html += '    <span class="featured-news-link">Ver detalle ' + ICO.arrowUpRight + '</span>';
  html += '  </div>';
  html += '</article>';

  /* C) Grid grouped by year (IDs 2-26) */
  var rest = NEWS_DATA.slice(1);
  var groups = {};
  var yearOrder = [];
  rest.forEach(function(n) {
    if (!groups[n.year]) { groups[n.year] = []; yearOrder.push(n.year); }
    groups[n.year].push(n);
  });

  yearOrder.forEach(function(year, gi) {
    html += '<div class="year-separator fade-in-up' + (gi === 0 ? ' first' : '') + '"><span>' + year + '</span></div>';
    html += '<div class="noticias-grid">';
    groups[year].forEach(function(n, i) {
      var delay = i % 8;
      html += '<article class="noticia-card fade-in-up" data-delay="' + delay + '" data-news-id="' + n.id + '" role="button" tabindex="0">';
      html += '  <div class="noticia-card-img">';
      html += '    <img src="' + imgUrl(getMainImg(n)) + '" alt="' + escAttr(n.title) + '" loading="lazy" />';
      html += '    <span class="noticia-card-badge" data-cat="' + n.cat + '">' + n.cat + '</span>';
      html += '    <div class="noticia-card-overlay"><span>Ver detalle</span></div>';
      html += '  </div>';
      html += '  <div class="noticia-card-body">';
      html += '    <h3>' + esc(n.title) + '</h3>';
      html += '    <p class="noticia-excerpt">' + esc(n.excerpt) + '</p>';
      html += '    <div class="noticia-card-meta">';
      html += metaItem(ICO.calendar, '<time>' + n.date + '</time>');
      html += metaItem(ICO.mapPin, n.loc);
      html += metaItem(ICO.clock, n.time);
      html += '    </div>';
      html += '  </div>';
      html += '</article>';
    });
    html += '</div>';
  });

  root.innerHTML = html;
}

function metaItem(icon, text) {
  return '<span class="meta-item">' + icon + ' ' + text + '</span>';
}
function esc(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
function escAttr(s) { return s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;'); }

/* ── Image fade-in ────────────────────────────────── */
function initImageFadeIn() {
  document.querySelectorAll('.featured-news-img img, .noticia-card-img img').forEach(function(img) {
    if (img.complete && img.naturalWidth > 0) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', function() { img.classList.add('loaded'); });
    }
  });
}

/* ── Fade-in-up observer ──────────────────────────── */
function initFadeInUpObserver() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.fade-in-up').forEach(function(el) { el.classList.add('is-visible'); });
    return;
  }
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.05 });
  document.querySelectorAll('#noticias-root .fade-in-up').forEach(function(el) { obs.observe(el); });
}

/* ── Click / keyboard handlers ────────────────────── */
function initNewsClicks() {
  document.addEventListener('click', function(e) {
    var card = e.target.closest('[data-news-id]');
    if (card) { e.preventDefault(); openNewsModal(parseInt(card.dataset.newsId, 10)); }
  });
  document.addEventListener('keydown', function(e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var card = e.target.closest('.noticia-card[data-news-id]');
    if (card) { e.preventDefault(); openNewsModal(parseInt(card.dataset.newsId, 10)); }
  });
}

/* ── Deep link ────────────────────────────────────── */
function checkDeepLink() {
  var params = new URLSearchParams(window.location.search);
  var id = parseInt(params.get('id'), 10);
  if (id) setTimeout(function() { openNewsModal(id); }, 350);
}

/* ── Modal ────────────────────────────────────────── */
function openNewsModal(id) {
  var item = NEWS_DATA.find(function(n) { return n.id === id; });
  if (!item || document.querySelector('.news-modal-overlay')) return;

  var images = getImages(item);
  var hasGallery = images.length > 1;
  var isLong = item.excerpt.length > 200;
  var overlay = document.createElement('div');
  overlay.className = 'news-modal-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', item.title);

  /* Build gallery HTML */
  var galleryHtml = '';
  if (hasGallery) {
    galleryHtml += '<div class="news-modal-image news-modal-gallery">';
    galleryHtml += '  <div class="gallery-track">';
    images.forEach(function(img, i) {
      galleryHtml += '<img src="' + imgUrl(img) + '" alt="' + escAttr(item.title) + '" class="gallery-slide' + (i === 0 ? ' active' : '') + '" loading="' + (i === 0 ? 'eager' : 'lazy') + '" />';
    });
    galleryHtml += '  </div>';
    galleryHtml += '  <button class="gallery-prev" aria-label="Anterior"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button>';
    galleryHtml += '  <button class="gallery-next" aria-label="Siguiente"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"/></svg></button>';
    galleryHtml += '  <div class="gallery-dots">';
    images.forEach(function(_, i) {
      galleryHtml += '<span class="gallery-dot' + (i === 0 ? ' active' : '') + '" data-index="' + i + '"></span>';
    });
    galleryHtml += '  </div>';
    galleryHtml += '  <span class="gallery-counter">1 / ' + images.length + '</span>';
    galleryHtml += '  <span class="modal-badge" data-cat="' + item.cat + '">' + item.cat + '</span>';
    galleryHtml += '</div>';
  } else {
    galleryHtml += '<div class="news-modal-image">';
    galleryHtml += '  <img src="' + imgUrl(getMainImg(item)) + '" alt="' + escAttr(item.title) + '" />';
    galleryHtml += '  <span class="modal-badge" data-cat="' + item.cat + '">' + item.cat + '</span>';
    galleryHtml += '</div>';
  }

  overlay.innerHTML =
    '<div class="news-modal-backdrop"></div>' +
    '<div class="news-modal-container' + (isLong ? ' long-text' : '') + '">' +
    '  <button class="news-modal-close" aria-label="Cerrar">' + ICO.x + '</button>' +
    galleryHtml +
    '  <div class="news-modal-text">' +
    '    <div class="news-modal-header">' +
    '      <div class="news-modal-avatar"><img src="images/logo/aptturlogo.png" alt="APTTUR" /></div>' +
    '      <div>' +
    '        <span class="news-modal-author-name">APTTUR</span>' +
    '        <span class="news-modal-author-location">' + esc(item.loc) + '</span>' +
    '      </div>' +
    '    </div>' +
    '    <h2>' + esc(item.title) + '</h2>' +
    '    <p class="news-modal-desc">' + esc(item.excerpt) + '</p>' +
    '    <div class="news-modal-meta">' +
    metaItem(ICO.calendar, '<time>' + item.date + '</time>') +
    metaItem(ICO.mapPin, item.loc) +
    metaItem(ICO.clock, item.time) +
    '    </div>' +
    '  </div>' +
    '</div>';

  document.body.appendChild(overlay);
  document.body.classList.add('modal-open');

  /* Gallery navigation */
  if (hasGallery) {
    var currentSlide = 0;
    var slides = overlay.querySelectorAll('.gallery-slide');
    var dots   = overlay.querySelectorAll('.gallery-dot');
    var counter = overlay.querySelector('.gallery-counter');

    function goToSlide(idx) {
      slides[currentSlide].classList.remove('active');
      dots[currentSlide].classList.remove('active');
      currentSlide = (idx + images.length) % images.length;
      slides[currentSlide].classList.add('active');
      dots[currentSlide].classList.add('active');
      counter.textContent = (currentSlide + 1) + ' / ' + images.length;
    }

    overlay.querySelector('.gallery-prev').addEventListener('click', function(e) {
      e.stopPropagation(); goToSlide(currentSlide - 1);
    });
    overlay.querySelector('.gallery-next').addEventListener('click', function(e) {
      e.stopPropagation(); goToSlide(currentSlide + 1);
    });
    dots.forEach(function(dot) {
      dot.addEventListener('click', function(e) {
        e.stopPropagation(); goToSlide(parseInt(this.dataset.index, 10));
      });
    });
  }

  /* Stop clicks inside the card from closing */
  overlay.querySelector('.news-modal-container').addEventListener('click', function(e) { e.stopPropagation(); });

  var closeModal = function() {
    overlay.classList.add('closing');
    setTimeout(function() {
      overlay.remove();
      document.body.classList.remove('modal-open');
      history.replaceState(null, '', window.location.pathname);
    }, 250);
    document.removeEventListener('keydown', onKey);
  };

  overlay.querySelector('.news-modal-close').addEventListener('click', closeModal);
  overlay.querySelector('.news-modal-backdrop').addEventListener('click', closeModal);

  var onKey = function(e) { if (e.key === 'Escape') closeModal(); };
  document.addEventListener('keydown', onKey);
}

/* Expose for other pages */
window.NEWS_DATA = NEWS_DATA;
window.openNewsModal = openNewsModal;
