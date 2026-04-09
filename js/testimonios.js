/* ══════════════════════════════════════════════════════
   TESTIMONIOS.JS — Swiper carousel for testimonials
   ══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  const el = document.querySelector('.testimonial-swiper');
  if (!el || typeof Swiper === 'undefined') return;

  new Swiper('.testimonial-swiper', {
    effect: 'fade',
    fadeEffect: { crossFade: true },
    speed: 800,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    loop: true,
  });
});
