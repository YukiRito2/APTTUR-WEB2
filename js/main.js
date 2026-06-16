/* ══════════════════════════════════════════════════════
   MAIN.JS — Global init, navbar scroll, scroll-to-top,
              component injection (navbar + footer)
   ══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  injectNavbar();
  injectFooter();
  injectFabLeyes();
  injectAsistente();
  initNavbarScroll();
  initMobileMenu();
  initScrollToTop();
  initHomeNewsRedirect();
  initHeroIntro();
  initHeroCounters();
});

/* ══════════════════════════════════════════════════════
   SVG ICONS (inline, reusable)
   ══════════════════════════════════════════════════════ */
const ICONS = {
  hamburger: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  chevronLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',
  chevronRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
  chevronUp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>',
  arrowRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
  arrowUpRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>',
  externalLink: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  mapPin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
  shieldCheck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>',
  handshake: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.42 4.58a5.4 5.4 0 00-7.65 0l-.77.78-.77-.78a5.4 5.4 0 00-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/></svg>',
  gavel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2.5l5 5-11 11-5-5z"/><path d="M3 21l3-3"/><path d="M19.5 2.5l2 2"/><path d="M2.5 19.5l2 2"/><line x1="18" y1="8" x2="22" y2="4"/></svg>',
  monitor: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
  graduationCap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5"/></svg>',
  quote: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z"/></svg>',
  send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
  checkCircle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
  alertCircle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
  trendingUp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
  fileCheck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><polyline points="9 15 11 17 15 13"/></svg>',
  badgePercent: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3.85 8.62a4 4 0 014.78-4.77 4 4 0 016.74 0 4 4 0 014.78 4.78 4 4 0 010 6.74 4 4 0 01-4.77 4.78 4 4 0 01-6.75 0 4 4 0 01-4.78-4.77 4 4 0 010-6.76z"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="15" x2="15.01" y2="15"/></svg>',
  building: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="9" y1="6" x2="9.01" y2="6"/><line x1="15" y1="6" x2="15.01" y2="6"/><line x1="9" y1="10" x2="9.01" y2="10"/><line x1="15" y1="10" x2="15.01" y2="10"/><line x1="9" y1="14" x2="9.01" y2="14"/><line x1="15" y1="14" x2="15.01" y2="14"/><line x1="9" y1="18" x2="15" y2="18"/></svg>',
  award: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>',
  messageSquare: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
};

/* ── Helper: get current page name ──────────────────── */
function getCurrentPage() {
  const path = window.location.pathname;
  const file = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
  return file;
}

/* ══════════════════════════════════════════════════════
   INJECT NAVBAR
   ══════════════════════════════════════════════════════ */
function injectNavbar() {
  const header = document.getElementById('main-header');
  if (!header) return;

  const page = getCurrentPage();

  const links = [
    { href: 'index.html', label: 'Inicio' },
    { href: 'quienes-somos.html', label: 'Quiénes Somos' },
    { href: 'asociados.html', label: 'Asociados' },
    { href: 'flota.html', label: 'Flota' },
    { href: 'leyes.html', label: 'Marco Legal' },
    { href: 'avances.html', label: 'Avances' },
  ];

  const navLinksHTML = links.map(l => {
    const isActive = page === l.href || (page === '' && l.href === 'index.html');
    return `<a href="${l.href}" role="menuitem" class="${isActive ? 'active' : ''}">${l.label}</a>`;
  }).join('');

  const mobileLinksHTML = links.map(l => {
    const isActive = page === l.href || (page === '' && l.href === 'index.html');
    return `<a href="${l.href}" class="${isActive ? 'active' : ''}">${l.label}</a>`;
  }).join('');

  header.classList.add('site-header');
  header.setAttribute('role', 'banner');
  header.innerHTML = `
    <nav class="navbar" aria-label="Navegación principal">
      <a href="index.html" class="navbar-logo" aria-label="APTTUR — Inicio">
        <img src="images/logo/aptturlogo.png" alt="APTTUR Logo" width="160" height="64" />
      </a>
      <div class="navbar-links" role="menubar">${navLinksHTML}</div>
      <div class="navbar-live-pill" id="navbar-live-pill" aria-label="Visitas totales">
        <span class="navbar-live-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>
        </span>
        <span class="navbar-live-copy">
          <strong>VISITAS</strong>
          <span id="navbar-live-count">—</span>
        </span>
      </div>
      <div class="navbar-cta">
        <a href="contactenos.html" class="btn-cta">Contáctanos ${ICONS.chevronRight}</a>
      </div>
      <button class="hamburger-btn" id="hamburger-btn" aria-label="Abrir menú" aria-expanded="false" aria-controls="mobile-menu">
        <span class="icon-hamburger">${ICONS.hamburger}</span>
        <span class="icon-close">${ICONS.x}</span>
      </button>
    </nav>
    <div class="mobile-menu" id="mobile-menu" role="menu">
      ${mobileLinksHTML}
      <a href="contactenos.html" class="btn-cta-mobile">Contáctanos ${ICONS.chevronRight}</a>
    </div>
  `;
}

/* ══════════════════════════════════════════════════════
   INJECT FOOTER
   ══════════════════════════════════════════════════════ */
function injectFooter() {
  const footer = document.getElementById('main-footer');
  if (!footer) return;

  footer.classList.add('site-footer');
  footer.innerHTML = `
    <div class="footer-grid">
      <!-- Brand -->
      <div class="footer-brand fade-in-up">
        <a href="index.html"><img src="images/logo/aptturlogo.png" alt="APTTUR" width="160" height="56" /></a>
        <p>Asociación Peruana de Transporte Turístico. Desde 2019 fortaleciendo y modernizando el sector del transporte turístico en el Perú.</p>
        <div class="footer-social">
          <a href="https://www.facebook.com/profile.php?id=100047348003965" target="_blank" rel="noopener noreferrer" aria-label="Facebook">${ICONS.facebook}</a>
          <a href="https://www.instagram.com/aptturperu/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">${ICONS.instagram}</a>
        </div>
      </div>

      <!-- Quick Links -->
      <div class="footer-col fade-in-up" data-delay="1">
        <h4>Enlaces Rápidos</h4>
        <ul class="footer-links">
          <li><a href="index.html"><span class="bullet"></span>Inicio</a></li>
          <li><a href="quienes-somos.html"><span class="bullet"></span>Quiénes Somos</a></li>
          <li><a href="asociados.html"><span class="bullet"></span>Asociados</a></li>
          <li><a href="flota.html"><span class="bullet"></span>Flota</a></li>
          <li><a href="leyes.html"><span class="bullet"></span>Marco Legal</a></li>
          <li><a href="avances.html"><span class="bullet"></span>Avances</a></li>
          <li><a href="contactenos.html"><span class="bullet"></span>Contáctenos</a></li>
        </ul>
      </div>

      <!-- Institutional Links -->
      <div class="footer-col fade-in-up" data-delay="2">
        <h4>Enlaces Institucionales</h4>
        <a href="https://www.gob.pe/mtc" target="_blank" rel="noopener noreferrer" class="footer-inst-link">
          ${ICONS.externalLink}
          <div><strong>MTC</strong><span>Ministerio de Transportes</span></div>
        </a>
        <a href="https://www.atu.gob.pe" target="_blank" rel="noopener noreferrer" class="footer-inst-link">
          ${ICONS.externalLink}
          <div><strong>ATU</strong><span>Autoridad de Transporte Urbano</span></div>
        </a>
        <a href="https://www.gob.pe/mincetur" target="_blank" rel="noopener noreferrer" class="footer-inst-link">
          ${ICONS.externalLink}
          <div><strong>MINCETUR</strong><span>Min. Comercio Exterior y Turismo</span></div>
        </a>
      </div>

      <!-- Contact -->
      <div class="footer-col fade-in-up" data-delay="3">
        <h4>Contacto</h4>
        <div class="footer-contact-item">
          ${ICONS.mapPin}
          <a href="https://maps.google.com/?q=Calle+Cayetano+Heredia+400+Jesus+Maria+Lima" target="_blank" rel="noopener noreferrer">Calle Cayetano Heredia Nº 400, Jesús María</a>
        </div>
        <div class="footer-contact-item">
          ${ICONS.phone}
          <a href="tel:+51998755600">(+51) 998755600</a>
        </div>
        <div class="footer-contact-item">
          ${ICONS.mail}
          <a href="mailto:info@apttur.com">info@apttur.com</a>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="footer-bottom">
      <p class="footer-copy">&copy; 2026 APTTUR — Asociación Peruana de Transporte Turístico. Todos los derechos reservados.</p>
      <button class="scroll-to-top" id="scroll-to-top" aria-label="Volver arriba">${ICONS.chevronUp}</button>
    </div>
  `;
}

/* ══════════════════════════════════════════════════════
   NAVBAR SCROLL EFFECT
   ══════════════════════════════════════════════════════ */
function initNavbarScroll() {
  const header = document.getElementById('main-header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ══════════════════════════════════════════════════════
   MOBILE MENU TOGGLE
   ══════════════════════════════════════════════════════ */
function initMobileMenu() {
  const btn = document.getElementById('hamburger-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen);
    btn.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    document.body.classList.toggle('menu-open', isOpen);
  });

  // Close on link click
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    });
  });

  // Close on click outside menu
  document.addEventListener('click', (e) => {
    if (!menu.classList.contains('open')) return;
    if (!menu.contains(e.target) && !btn.contains(e.target)) {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    }
  });
}

/* ══════════════════════════════════════════════════════
   SCROLL TO TOP
   ══════════════════════════════════════════════════════ */
function initScrollToTop() {
  // Delay to wait for footer injection
  setTimeout(() => {
    const btn = document.getElementById('scroll-to-top');
    if (!btn) return;
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }, 100);
}

/* ══════════════════════════════════════════════════════
   FLOATING LEGAL BUTTON
   ══════════════════════════════════════════════════════ */
function injectFabLeyes() {
  // Don't show on the leyes page itself
  if (getCurrentPage() === 'leyes.html') return;

  const fab = document.createElement('a');
  fab.href = 'leyes.html';
  fab.className = 'fab-leyes';
  fab.setAttribute('aria-label', 'Marco Legal — Leyes que nos avalan');
  fab.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <polyline points="9 12 11 14 15 10"/>
    </svg>
    <span class="fab-leyes-label">Marco Legal</span>
  `;
  document.body.appendChild(fab);
}

/* ══════════════════════════════════════════════════════
   HOME NEWS REDIRECT — click news cards → avances.html?id=X
   ══════════════════════════════════════════════════════ */
function initHomeNewsRedirect() {
  const bento = document.querySelector('.home-news-bento');
  if (!bento) return;

  bento.addEventListener('click', (e) => {
    const card = e.target.closest('[data-news-id]');
    if (!card) return;
    e.preventDefault();
    const id = card.dataset.newsId;
    window.location.href = 'avances.html?id=' + encodeURIComponent(id);
  });

  bento.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const card = e.target.closest('[data-news-id]');
    if (!card) return;
    e.preventDefault();
    const id = card.dataset.newsId;
    window.location.href = 'avances.html?id=' + encodeURIComponent(id);
  });
}

/* ══════════════════════════════════════════════════════
   HERO INTRO — pantalla completa 10 s → barra inferior
   ══════════════════════════════════════════════════════ */
function initHeroIntro() {
  var intro = document.getElementById('hero-intro');
  if (!intro) return;

  var bar = document.querySelector('.hero-stats');
  var collapsed = false;
  var progressRaf = null;
  var progressStart = null;
  var INTRO_DURATION = 10000;

  /* ── Ocultar barra sin transición (JS la controla) ─ */
  if (bar) {
    bar.style.transition = 'none';
    bar.style.transform = 'translateY(14px)'; /* nudge mínimo — no 110% */
    bar.style.opacity = '0';
    bar.style.willChange = 'transform, opacity';
    void bar.offsetHeight;
  }
  intro.style.willChange = 'opacity, transform';

  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  /* ── Contador principal 0 → 2000 ───────────────── */
  var numEl   = document.getElementById('hero-intro-num');
  var plusEl  = document.getElementById('hero-intro-plus');

  if (numEl) {
    var mainTarget   = 2000;
    var mainDuration = 2400;
    var mainStart    = null;

    function animateMain(ts) {
      if (!mainStart) mainStart = ts;
      var prog = Math.min((ts - mainStart) / mainDuration, 1);
      var val  = Math.floor(easeOutCubic(prog) * mainTarget);
      numEl.textContent = val.toLocaleString('es-PE');
      if (prog < 1) {
        requestAnimationFrame(animateMain);
      } else {
        numEl.textContent = mainTarget.toLocaleString('es-PE');
        if (plusEl) plusEl.classList.add('is-visible');
        plusEl.textContent = '+';
      }
    }

    setTimeout(function() { requestAnimationFrame(animateMain); }, 700);
  }

  /* ── Chips secundarios 0 → target ──────────────── */
  var chips = intro.querySelectorAll('.hi-chip-num[data-target]');
  chips.forEach(function(chip) {
    var chipTarget   = parseInt(chip.getAttribute('data-target'), 10);
    var chipSuffix   = chip.getAttribute('data-suffix') || '';
    var chipDuration = 1600;
    var chipStart    = null;

    function animateChip(ts) {
      if (!chipStart) chipStart = ts;
      var prog = Math.min((ts - chipStart) / chipDuration, 1);
      var val  = Math.floor(easeOutCubic(prog) * chipTarget);
      chip.textContent = val + (prog >= 1 ? chipSuffix : '');
      if (prog < 1) requestAnimationFrame(animateChip);
    }

    setTimeout(function() { requestAnimationFrame(animateChip); }, 900);
  });

  /* ── fillEl: referencia a la barra de progreso ───── */
  var fillEl = document.getElementById('hero-intro-progress-fill');

  /* ── Botón skip ─────────────────────────────────── */
  var skipBtn = document.getElementById('hero-intro-skip');
  if (skipBtn) skipBtn.addEventListener('click', collapseWithAnimation);

  /* ── Scroll-driven transition ───────────────────── */
  /*  220 px de scroll → dos fases sin solapamiento brusco:
      Fase 1 (0→75%):  intro se desvanece y sube.
      Fase 2 (60→100%): barra aparece con fade + nudge mínimo.
      El solapamiento 60-75% es intencional: cuando la barra
      empieza a verse el intro ya está al 80% desvanecido.   */
  var SCROLL_THRESHOLD = 220;
  var scrollRafPending  = false;

  function ss(x) { return x * x * (3 - 2 * x); } /* smoothstep */

  function applyScrollProgress() {
    scrollRafPending = false;
    if (collapsed) return;

    var rawP = Math.min(window.scrollY / SCROLL_THRESHOLD, 1);

    /* ── Fase 1: intro desaparece en el 75% inicial ── */
    var introP = ss(Math.min(rawP / 0.75, 1));
    intro.style.opacity      = String(1 - introP);
    intro.style.transform    = 'translateY(' + (-introP * 20) + 'px)';
    intro.style.pointerEvents = introP > 0.5 ? 'none' : '';

    /* ── Fase 2: barra aparece entre 60% y 100% ────── */
    var barP = ss(Math.max((rawP - 0.60) / 0.40, 0));
    if (bar) {
      bar.style.opacity   = String(barP);
      bar.style.transform = 'translateY(' + (1 - barP) * 14 + 'px)';
    }

    if (rawP >= 1) {
      finalize();
    }
  }

  function onScroll() {
    if (!scrollRafPending && !collapsed) {
      scrollRafPending = true;
      requestAnimationFrame(applyScrollProgress);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Finalizar (post-scroll) ────────────────────── */
  function finalize() {
    if (collapsed) return;
    collapsed = true;
    if (progressRaf) cancelAnimationFrame(progressRaf);
    window.removeEventListener('scroll', onScroll);

    intro.style.opacity      = '0';
    intro.style.pointerEvents = 'none';
    if (bar) {
      bar.style.transform = 'translateY(0)';
      bar.style.opacity   = '1';
    }
    setTimeout(function() {
      intro.style.display    = 'none';
      intro.style.willChange = 'auto';
      if (bar) bar.style.willChange = 'auto';
    }, 60);
  }

  /* ── Collapse con animación CSS (skip / timeout) ── */
  function collapseWithAnimation() {
    if (collapsed) return;
    collapsed = true;
    if (progressRaf) cancelAnimationFrame(progressRaf);
    window.removeEventListener('scroll', onScroll);

    /* Intro: fade + sube */
    intro.style.transition    = 'opacity 0.4s ease, transform 0.4s ease';
    intro.style.opacity       = '0';
    intro.style.transform     = 'translateY(-18px)';
    intro.style.pointerEvents = 'none';

    /* Barra: fade + nudge suave */
    setTimeout(function() {
      if (bar) {
        bar.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
        bar.style.opacity    = '1';
        bar.style.transform  = 'translateY(0)';
      }
    }, 200);

    setTimeout(function() {
      intro.style.display    = 'none';
      intro.style.willChange = 'auto';
      if (bar) bar.style.willChange = 'auto';
    }, 700);
  }

  /* ── Barra de progreso 10 s ─────────────────────── */
  function tickProgress(ts) {
    if (!progressStart) progressStart = ts;
    var pct = Math.min((ts - progressStart) / INTRO_DURATION * 100, 100);
    if (fillEl) fillEl.style.width = pct + '%';
    if (pct < 100 && !collapsed) {
      progressRaf = requestAnimationFrame(tickProgress);
    } else if (!collapsed) {
      collapseWithAnimation();
    }
  }
  progressRaf = requestAnimationFrame(tickProgress);
}

/* ══════════════════════════════════════════════════════
   HERO STAT COUNTERS
   ══════════════════════════════════════════════════════ */
function initHeroCounters() {
  var nums = document.querySelectorAll('.hero-stat-num[data-target]');
  if (!nums.length) return;

  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  nums.forEach(function(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1800;
    var startTime = null;

    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var val = Math.floor(easeOutCubic(progress) * target);
      el.textContent = val.toLocaleString('es-PE') + (progress >= 1 ? suffix : '');
      if (progress < 1) requestAnimationFrame(step);
    }

    setTimeout(function() { requestAnimationFrame(step); }, 500);
  });
}

const VISITOR_COUNTER_ENDPOINT = '/api/visitor-counter';
const VISITOR_COUNTER_STORAGE_KEY = 'apttur_visitor_number';
const VISITOR_COUNTER_COOKIE_KEY = 'apttur_visitor_number';
const ASSISTANT_INTRO_DURATION = 20000;
const ASSISTANT_TIP_DURATION = 10000;

function readStorageItem(key) {
  try {
    return window.localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

function writeStorageItem(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch (error) {
    // Ignore storage failures and keep cookie persistence as backup.
  }
}

function getCookie(name) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = document.cookie.match(new RegExp('(?:^|; )' + escapedName + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name, value, days) {
  const expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expiresAt + '; path=/; SameSite=Lax';
}

function readStoredVisitorNumber() {
  const storageValue = readStorageItem(VISITOR_COUNTER_STORAGE_KEY);
  if (/^\d+$/.test(storageValue || '')) {
    return Number(storageValue);
  }

  const cookieValue = getCookie(VISITOR_COUNTER_COOKIE_KEY);
  if (/^\d+$/.test(cookieValue || '')) {
    writeStorageItem(VISITOR_COUNTER_STORAGE_KEY, cookieValue);
    return Number(cookieValue);
  }

  return null;
}

function persistVisitorNumber(visitorNumber) {
  const value = String(visitorNumber);
  writeStorageItem(VISITOR_COUNTER_STORAGE_KEY, value);
  setCookie(VISITOR_COUNTER_COOKIE_KEY, value, 365);
}

async function fetchVisitorCounterValue() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000);

  try {
    const response = await fetch(VISITOR_COUNTER_ENDPOINT, {
      method: 'GET',
      cache: 'no-store',
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error('No se pudo consultar el contador');
    }

    const payload = await response.json();

    if (!payload || typeof payload.value !== 'number' || typeof payload.totalVisits !== 'number') {
      throw new Error('Respuesta invalida del contador');
    }

    return payload;
  } finally {
    clearTimeout(timeoutId);
  }
}

function updateTotalVisitsDisplay(totalVisits) {
  const formatter = new Intl.NumberFormat('es-PE');

  const el = document.querySelector('[data-total-visits]');
  if (el) {
    el.dataset.end = String(totalVisits);
    const rect = el.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (isVisible && typeof window.animateImpactCounter === 'function') {
      window.animateImpactCounter(el);
    }
  }

  const navCount = document.getElementById('navbar-live-count');
  if (navCount) {
    navCount.textContent = formatter.format(totalVisits);
  }
}

async function resolveVisitorCounterMessage() {
  const formatter = new Intl.NumberFormat('es-PE');
  const storedVisitorNumber = readStoredVisitorNumber();

  try {
    const payload = await fetchVisitorCounterValue();
    persistVisitorNumber(payload.value);
    updateTotalVisitsDisplay(payload.totalVisits);

    if (storedVisitorNumber) {
      return '🌟 <strong>¡Qué gusto tenerte de vuelta!</strong> Tu número de visita es el <strong>' + formatter.format(payload.value) + '</strong> y esta web ya lleva <strong>' + formatter.format(payload.totalVisits) + '</strong> visitas acumuladas. Gracias por regresar y acompañarnos una vez más.';
    }

    if (payload.isReturning) {
      return '🤝 <strong>¡Me alegra verte otra vez!</strong> Tu número de visita es el <strong>' + formatter.format(payload.value) + '</strong>. Hasta ahora esta página ha registrado <strong>' + formatter.format(payload.totalVisits) + '</strong> visitas en total. Siéntete con total confianza de navegar por nuestra web y descubrir todo lo que APTTUR tiene para ti.';
    }

    return '🎉 <strong>¡Bienvenido a APTTUR!</strong> Nos alegra mucho recibirte. Eres la visita número <strong>' + formatter.format(payload.value) + '</strong> de <strong>' + formatter.format(payload.totalVisits) + '</strong> visitas acumuladas en esta página. Guardaré este número para recordártelo cada vez que regreses desde este navegador.';
  } catch (error) {
    if (storedVisitorNumber) {
      return '🌟 <strong>¡Qué gusto tenerte de vuelta!</strong> Tu número de visita es el <strong>' + formatter.format(storedVisitorNumber) + '</strong>. Gracias por regresar y acompañarnos una vez más.';
    }

    return '💚 <strong>¡Bienvenido a APTTUR!</strong> Qué bueno tenerte aquí. En este momento no pude consultar tu número de visita, pero igual me quedaré contigo para orientarte con nuestros consejos.';
  }
}

/* ══════════════════════════════════════════════════════
   FLOATING HELP ASSISTANT — SVG Tour Guide + Tips Legales
   ══════════════════════════════════════════════════════ */
async function injectAsistente() {
  /* ── Frases que el bot va relatando ────────────────── */
  const frases = [
    '👋 <strong>¡Hola, conductor!</strong> Soy tu guía legal de APTTUR. ¿Sabías que tienes derechos en cada intervención policial?',

    /* 1. Derecho a grabar */
    '📹 <strong>¡Puedes grabar!</strong> No existe ley en Perú que prohíba filmar a un funcionario público en la vía. El Tribunal Constitucional lo respalda.',
    '🎥 <strong>Tip:</strong> Graba sin obstruir al policía y di: "Oficial, por mi seguridad y la suya, estoy grabando la intervención".',
    '📋 Tu grabación sirve como <strong>prueba legal</strong> ante abuso de autoridad o pedido de coima (Código Procesal Penal).',

    /* 2. Solo Policía de Tránsito sanciona */
    '🚦 <strong>Ojo:</strong> Solo la Policía de Tránsito o Carreteras puede pedirte licencia, SOAT y tarjeta de propiedad para multarte.',
    '👮 Un policía "de a pie" solo puede detenerte por <strong>delito flagrante</strong> o para identificación (DNI). Si pide documentos de tránsito, solicita un efectivo de tránsito.',

    /* 3. Las 3 causas únicas de intervención */
    '🛑 La policía <strong>NO</strong> puede pararte "solo para ver si todo está en orden". Solo por: infracción flagrante, operativo policial o fiscalización.',
    '🔶 En un operativo deben usar <strong>conos y señalética</strong>. Tienes derecho a preguntar el nombre del operativo.',

    /* 4. No estás obligado a bajar */
    '🚗 <strong>No tienes que bajar del auto</strong> a menos que existan indicios de ebriedad o delito. Entrega documentos desde tu asiento.',
    '💡 <strong>Tip nocturno:</strong> Manos visibles sobre el volante + luz interior encendida = menos tensión y más seguridad para ambos.',

    /* 5. Registro del vehículo */
    '🔍 Para revisar tu maletera necesitan: <strong>tu consentimiento</strong> o <strong>causa probable</strong> (olor a drogas, armas a la vista, orden judicial).',
    '🗣️ Si piden abrir sin motivo, pregunta: "¿Existe algún indicio de delito para el registro?" y deja constancia en tu grabación.',

    /* 6. Defensoría del Pueblo */
    '📞 <strong>Línea 1818 (Opción 3)</strong> — Denuncia abusos policiales al Ministerio del Interior. Mencionarlo cambia el tono del efectivo.',
    '🛡️ La <strong>Defensoría del Pueblo</strong> es tu aliada. Si la intervención es arbitraria, reporta y cita a Inspectoría.',

    /* Resumen de documentos */
    '📄 <strong>Recuerda:</strong> Después de verificar tus documentos, el policía DEBE devolverlos de inmediato. No pueden retener tu licencia como presión.',

    /* Cierre */
    '✅ <strong>Conoce tus derechos, conduce tranquilo.</strong> APTTUR te respalda. ¡Buen viaje! 🚌'
  ];

  let indice = 0;
  let autoTimer = null;
  let introActivo = false;
  const saludoInicial = '💬 <strong>Bienvenido a APTTUR.</strong> Dame unos segundos, estoy preparando tu saludo y tu número de visita con mucho gusto...';

  const el = document.createElement('div');
  el.className = 'asistente';
  el.setAttribute('aria-label', 'Asistente legal APTTUR');
  el.innerHTML = `
    <div class="asistente-bubble">${saludoInicial}</div>
    <div class="asistente-avatar" title="Clic para siguiente tip">
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Head -->
        <circle cx="32" cy="26" r="14" fill="#FFD6A0"/>
        <!-- Eyes -->
        <ellipse cx="27" cy="23" rx="2.2" ry="2.5" fill="#333"/>
        <ellipse cx="37" cy="23" rx="2.2" ry="2.5" fill="#333"/>
        <!-- Eye shine -->
        <circle cx="27.8" cy="22.2" r="0.8" fill="#fff"/>
        <circle cx="37.8" cy="22.2" r="0.8" fill="#fff"/>
        <!-- Eyebrows -->
        <path d="M24 19.5 Q27 17.5 30 19" stroke="#8B6914" stroke-width="1.2" fill="none" stroke-linecap="round"/>
        <path d="M34 19 Q37 17.5 40 19.5" stroke="#8B6914" stroke-width="1.2" fill="none" stroke-linecap="round"/>
        <!-- Big smile -->
        <path d="M25.5 29 Q32 36 38.5 29" stroke="#333" stroke-width="1.6" fill="none" stroke-linecap="round"/>
        <!-- Cheeks -->
        <circle cx="22.5" cy="28" r="2.5" fill="#FFB5B5" opacity="0.45"/>
        <circle cx="41.5" cy="28" r="2.5" fill="#FFB5B5" opacity="0.45"/>
        <!-- Hat brim -->
        <ellipse cx="32" cy="16" rx="17" ry="4.5" fill="#FFFFFF"/>
        <!-- Hat top -->
        <rect x="21" y="5" width="22" height="12" rx="4" fill="#FFFFFF"/>
        <!-- Hat band -->
        <rect x="21" y="13" width="22" height="3.5" fill="#1B3A5C"/>
        <!-- Insignia "A" -->
        <text x="32" y="12.5" text-anchor="middle" font-size="8" font-weight="bold" fill="#1B3A5C" font-family="sans-serif">A</text>
        <!-- Body / Uniform -->
        <path d="M19 40 Q19 33 32 33 Q45 33 45 40 L47 56 H17 Z" fill="#1B3A5C"/>
        <!-- Collar -->
        <path d="M27 33 L32 40 L37 33" fill="#FFFFFF"/>
        <!-- Badge -->
        <circle cx="26" cy="43" r="2.5" fill="#FFD700" stroke="#DAA520" stroke-width="0.5"/>
        <text x="26" y="44.5" text-anchor="middle" font-size="3" font-weight="bold" fill="#8B6914" font-family="sans-serif">★</text>
        <!-- Arms with hands waving -->
        <rect x="13" y="37" width="6" height="15" rx="3" fill="#FFD6A0"/>
        <rect x="45" y="34" width="6" height="15" rx="3" fill="#FFD6A0" transform="rotate(-15 48 34)"/>
        <!-- Waving hand lines -->
        <path d="M53 30 L56 28" stroke="#FFD700" stroke-width="1.2" stroke-linecap="round" opacity="0.7"/>
        <path d="M54 33 L57 32" stroke="#FFD700" stroke-width="1.2" stroke-linecap="round" opacity="0.7"/>
      </svg>
    </div>
  `;
  document.body.appendChild(el);

  const bubble = el.querySelector('.asistente-bubble');
  const avatar = el.querySelector('.asistente-avatar');

  function renderBubble(message) {
    bubble.classList.add('asistente-bubble--switching');
    setTimeout(() => {
      bubble.innerHTML = message;
      bubble.classList.remove('asistente-bubble--switching');
    }, 250);
  }

  function renderCurrentTip() {
    renderBubble(frases[indice]);
  }

  function renderNextTip() {
    indice = (indice + 1) % frases.length;
    renderCurrentTip();
  }

  function startAutoRotation() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => {
      renderNextTip();
    }, ASSISTANT_TIP_DURATION);
  }

  /* ── Cambiar frase al hacer clic en el avatar ──── */
  avatar.addEventListener('click', () => {
    if (introActivo) return;
    renderNextTip();
    startAutoRotation();
  });

  /* Pausar auto-rotación al pasar el mouse */
  el.addEventListener('mouseenter', () => clearInterval(autoTimer));
  el.addEventListener('mouseleave', () => {
    if (!introActivo) {
      startAutoRotation();
    }
  });

  /* ── Partículas de colores ───────────────────────── */
  const particleColors = ['#FFD700','#FF6B8A','#00C9A7','#845EF7','#FF9F43','#54A0FF','#FF6348','#2ED573'];

  function spawnParticles(count) {
    for (let i = 0; i < count; i++) {
      const p = document.createElement('span');
      p.className = 'asistente-particle';
      const color = particleColors[Math.floor(Math.random() * particleColors.length)];
      const angle = Math.random() * Math.PI * 2;
      const dist = 50 + Math.random() * 90;
      const px = Math.cos(angle) * dist;
      const py = Math.sin(angle) * dist;
      const size = 6 + Math.random() * 7;
      p.style.cssText = `background:${color};width:${size}px;height:${size}px;left:50%;top:50%;--px:${px.toFixed(0)}px;--py:${py.toFixed(0)}px;animation-delay:${(Math.random()*0.35).toFixed(2)}s;`;
      avatar.appendChild(p);
      p.addEventListener('animationend', () => p.remove());
    }
  }

  /* Partículas al hacer clic */
  avatar.addEventListener('click', () => spawnParticles(30));

  /* Lluvia constante de partículas cada 500ms */
  setInterval(() => spawnParticles(8), 500);

  introActivo = true;
  renderBubble(await resolveVisitorCounterMessage());
  setTimeout(() => {
    introActivo = false;
    indice = 0;
    renderCurrentTip();
    startAutoRotation();
  }, ASSISTANT_INTRO_DURATION);

  /* ── Desktop: roaming assistant with tilt ────────── */
  function isDesktop() {
    return window.matchMedia('(min-width: 768px)').matches;
  }

  // Assistant icon stays static (no automatic roaming across the screen).
}
