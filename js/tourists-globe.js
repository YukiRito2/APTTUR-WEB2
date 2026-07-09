/* ══════════════════════════════════════════════════════
   TOURISTS-GLOBE.JS — amCharts 5 rotating globe
   (geoOrthographic) highlighting our main tourist origins

   amCharts' own touch panning blocks native page scroll
   regardless of its panX/panY settings (interactive polygons
   still capture the gesture). So amCharts panning is disabled
   entirely and touch dragging is implemented by hand instead,
   using the same horizontal/vertical gesture-detection pattern
   already used for the marquee carousels (js/marquee.js):
   a mostly-horizontal drag rotates the globe, a mostly-vertical
   drag is left alone so the page scrolls normally.
   ══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {
  var container = document.getElementById('tourists-globe');
  if (!container) return;
  if (typeof am5 === 'undefined' || typeof am5map === 'undefined') return;

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
  var RESUME_DELAY = 2500;
  var DRAG_SENSITIVITY = 0.35; // degrees of rotation per pixel dragged

  var featuredCountries = [
    { id: 'US', title: 'Estados Unidos', emoji: '🇺🇸', coordinates: [-98, 39] },
    { id: 'ES', title: 'España',         emoji: '🇪🇸', coordinates: [-3.7, 40.4] },
    { id: 'MX', title: 'México',         emoji: '🇲🇽', coordinates: [-102, 23] },
    { id: 'EC', title: 'Ecuador',        emoji: '🇪🇨', coordinates: [-78.5, -1.8] },
    { id: 'CO', title: 'Colombia',       emoji: '🇨🇴', coordinates: [-74.1, 4.7] },
    { id: 'BR', title: 'Brasil',         emoji: '🇧🇷', coordinates: [-47.9, -15.8] },
    { id: 'AR', title: 'Argentina',      emoji: '🇦🇷', coordinates: [-58.4, -34.6] },
    { id: 'CL', title: 'Chile',          emoji: '🇨🇱', coordinates: [-70.7, -33.4] }
  ];
  var featuredIds = featuredCountries.map(function (c) { return c.id; });

  am5.ready(function () {
    var root = am5.Root.new('tourists-globe');
    root.setThemes([am5themes_Animated.new(root)]);

    /* amCharts panning/interactivity fully off — we drive rotation
       ourselves so it never fights the page's own touch scrolling. */
    var chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: 'none',
        panY: 'none',
        projection: am5map.geoOrthographic(),
        paddingTop: 0,
        paddingBottom: 0
      })
    );

    /* Ocean / back-of-globe fill */
    var backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
    backgroundSeries.mapPolygons.template.setAll({
      fill: am5.color(0x1b2e22),
      fillOpacity: 1,
      strokeOpacity: 0
    });
    backgroundSeries.data.push({ geometry: am5map.getGeoRectangle(90, 180, -90, -180) });

    /* Countries */
    var polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, { geoJSON: am5geodata_worldLow })
    );
    /* Country hover tooltips are mouse-only: any polygon interactivity
       captures touch input and blocks page scroll, so it's off on touch. */
    polygonSeries.mapPolygons.template.setAll({
      tooltipText: isTouchDevice ? undefined : '{name}',
      interactive: !isTouchDevice,
      fill: am5.color(0x3a453d),
      stroke: am5.color(0x141710),
      strokeWidth: 0.5
    });
    polygonSeries.mapPolygons.template.states.create('hover', { fillOpacity: 0.8 });
    polygonSeries.mapPolygons.template.adapters.add('fill', function (fill, target) {
      var dataItem = target.dataItem;
      if (dataItem && featuredIds.indexOf(dataItem.get('id')) !== -1) {
        return am5.color(0x00a85a);
      }
      return fill;
    });

    /* Featured country markers */
    var pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));
    pointSeries.bullets.push(function () {
      return am5.Bullet.new(root, {
        sprite: am5.Label.new(root, {
          text: '{emoji}',
          populateText: true,
          fontSize: 18,
          centerX: am5.p50,
          centerY: am5.p50,
          interactive: !isTouchDevice,
          tooltipText: isTouchDevice ? undefined : '{title}'
        })
      });
    });
    pointSeries.data.setAll(
      featuredCountries.map(function (c) {
        return { geometry: { type: 'Point', coordinates: c.coordinates }, title: c.title, emoji: c.emoji };
      })
    );

    /* Initial framing: face the Americas */
    chart.set('rotationX', 90);
    chart.set('rotationY', -15);

    chart.appear(1000, 100);

    /* Auto-rotate, pausing while the user interacts */
    var rotationAnimation;
    var resumeTimer;

    function pauseAutoRotate() {
      if (rotationAnimation) rotationAnimation.pause();
    }
    function resumeAutoRotateSoon() {
      if (!rotationAnimation) return;
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(function () { rotationAnimation.resume(); }, RESUME_DELAY);
    }

    if (!prefersReducedMotion) {
      rotationAnimation = chart.animate({
        key: 'rotationX',
        from: 90,
        to: 450,
        duration: 60000,
        loops: Infinity
      });
    }

    /* Hint: fades out after the first interaction or a few seconds */
    var hint = document.getElementById('tourists-globe-hint');
    var hideHint = function () {
      if (hint) hint.classList.add('is-hidden');
    };
    if (hint) setTimeout(hideHint, 4000);

    if (isTouchDevice) {
      /* Manual drag: mostly-horizontal touches rotate the globe and are
         prevented from scrolling; mostly-vertical touches are left alone
         so the page scrolls exactly as it would anywhere else. */
      var touchStartX = 0;
      var touchStartY = 0;
      var touchDir = null; // null | 'x' | 'y'
      var dragStartRotation = 0;

      container.addEventListener('touchstart', function (e) {
        if (e.touches.length !== 1) return;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchDir = null;
        dragStartRotation = chart.get('rotationX') || 0;
      }, { passive: true });

      container.addEventListener('touchmove', function (e) {
        if (e.touches.length !== 1) return;
        var dx = e.touches[0].clientX - touchStartX;
        var dy = e.touches[0].clientY - touchStartY;

        if (touchDir === null && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
          touchDir = Math.abs(dx) >= Math.abs(dy) ? 'x' : 'y';
          if (touchDir === 'x') {
            pauseAutoRotate();
            hideHint();
          }
        }

        if (touchDir === 'x') {
          e.preventDefault();
          chart.set('rotationX', dragStartRotation + dx * DRAG_SENSITIVITY);
        }
        /* touchDir === 'y' (or undetermined): do nothing, let the browser scroll */
      }, { passive: false });

      container.addEventListener('touchend', function () {
        if (touchDir === 'x') resumeAutoRotateSoon();
        touchDir = null;
      });
    } else {
      /* Desktop: amCharts' own mouse-drag panning */
      chart.set('panX', 'rotateX');
      chart.seriesContainer.events.on('pointerdown', function () {
        pauseAutoRotate();
        hideHint();
      });
      chart.seriesContainer.events.on('globalpointerup', function () {
        if (rotationAnimation) rotationAnimation.resume();
      });
    }
  });
});
