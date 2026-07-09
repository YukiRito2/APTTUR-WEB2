/* ══════════════════════════════════════════════════════
   TOURISTS-GLOBE.JS — amCharts 5 rotating globe
   (geoOrthographic) highlighting our main tourist origins

   amCharts' own touch panning blocks native page scroll
   regardless of its panX/panY settings (interactive polygons
   still capture the gesture). So amCharts panning is disabled
   entirely and touch dragging is implemented by hand instead,
   using the same horizontal/vertical gesture-detection +
   momentum pattern already used for the marquee carousels
   (js/marquee.js): a mostly-horizontal drag rotates the globe
   with inertia after release, a mostly-vertical drag is left
   alone so the page scrolls normally. Because the globe's own
   canvas has to stay non-interactive for that to work, tapping
   a country to see its name is implemented by hand too (a
   point-in-polygon test against the geo data), instead of
   relying on amCharts' built-in tooltip.
   ══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {
  var container = document.getElementById('tourists-globe');
  if (!container) return;
  if (typeof am5 === 'undefined' || typeof am5map === 'undefined') return;

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
  var RESUME_DELAY = 2500;
  var DRAG_SENSITIVITY = 0.35; // degrees of rotation per pixel dragged
  var TAP_MAX_MOVEMENT = 6;    // px — below this, a touch is a tap, not a drag

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

  /* ── Point-in-polygon country lookup (used for touch taps, since the
     globe's canvas is non-interactive there) ─────────────────────── */
  function pointInRing(lon, lat, ring) {
    var inside = false;
    for (var i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      var xi = ring[i][0], yi = ring[i][1];
      var xj = ring[j][0], yj = ring[j][1];
      var intersect = ((yi > lat) !== (yj > lat)) &&
        (lon < (xj - xi) * (lat - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  }
  function pointInGeometry(lon, lat, geometry) {
    if (!geometry) return false;
    var polygons = geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates;
    for (var p = 0; p < polygons.length; p++) {
      var rings = polygons[p];
      if (!pointInRing(lon, lat, rings[0])) continue;
      var inHole = false;
      for (var r = 1; r < rings.length; r++) {
        if (pointInRing(lon, lat, rings[r])) { inHole = true; break; }
      }
      if (!inHole) return true;
    }
    return false;
  }
  function findCountryNameAt(lon, lat) {
    var features = am5geodata_worldLow.features;
    for (var i = 0; i < features.length; i++) {
      if (pointInGeometry(lon, lat, features[i].geometry)) {
        return features[i].properties && features[i].properties.name;
      }
    }
    return null;
  }

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
       captures touch input and blocks page scroll, so it's off on touch
       (touch taps show the name via the manual lookup above instead). */
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

    /* Floating label that shows a tapped country's name (touch devices) */
    var tapLabel = document.createElement('span');
    tapLabel.className = 'tourists-globe-tap-label';
    document.getElementById('tourists-globe').parentElement.appendChild(tapLabel);
    var tapLabelTimer;
    function showTapLabel(name, clientX, clientY) {
      var rect = container.getBoundingClientRect();
      tapLabel.textContent = name;
      tapLabel.style.left = (clientX - rect.left) + 'px';
      tapLabel.style.top = (clientY - rect.top) + 'px';
      tapLabel.classList.add('is-visible');
      clearTimeout(tapLabelTimer);
      tapLabelTimer = setTimeout(function () {
        tapLabel.classList.remove('is-visible');
      }, 1800);
    }

    if (isTouchDevice) {
      /* Manual drag with momentum: mostly-horizontal touches rotate the
         globe (and glide on release, like the marquee carousels);
         mostly-vertical touches are left alone so the page scrolls.
         A touch that never really moves is treated as a tap and shows
         the tapped country's name. */
      var touchStartX = 0;
      var touchStartY = 0;
      var touchDir = null; // null | 'x' | 'y'
      var dragStartRotation = 0;
      var lastX = 0;
      var posHistory = [];
      var timeHistory = [];
      var momentumId = null;

      function cancelMomentum() {
        if (momentumId) {
          cancelAnimationFrame(momentumId);
          momentumId = null;
        }
      }

      function getSmoothedVelocity() {
        var now = Date.now();
        var recentTime = timeHistory.slice();
        var recentPos = posHistory.slice();
        while (recentTime.length > 0 && now - recentTime[0] > 100) {
          recentTime.shift();
          recentPos.shift();
        }
        if (recentPos.length >= 2) {
          var dt = recentTime[recentTime.length - 1] - recentTime[0];
          if (dt > 0) return (recentPos[recentPos.length - 1] - recentPos[0]) / dt;
        }
        /* Fallback for sparse sampling: velocity over the whole gesture */
        if (posHistory.length >= 2) {
          var totalDt = timeHistory[timeHistory.length - 1] - timeHistory[0];
          if (totalDt > 0) return (posHistory[posHistory.length - 1] - posHistory[0]) / totalDt;
        }
        return 0;
      }

      function startMomentum(vel) {
        var deg = vel * 16 * DRAG_SENSITIVITY; // px/ms -> deg/frame (~16ms/frame)
        var friction = 0.94;
        var minDeg = 0.05;

        function tick() {
          deg *= friction;
          if (Math.abs(deg) < minDeg) {
            momentumId = null;
            resumeAutoRotateSoon();
            return;
          }
          chart.set('rotationX', (chart.get('rotationX') || 0) + deg);
          momentumId = requestAnimationFrame(tick);
        }
        momentumId = requestAnimationFrame(tick);
      }

      container.addEventListener('touchstart', function (e) {
        if (e.touches.length !== 1) return;
        cancelMomentum();
        /* Pause immediately (not just once a drag is confirmed) so a tap's
           geo lookup at touchend always matches the position captured here,
           instead of drifting while the auto-rotation keeps running. */
        pauseAutoRotate();
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        lastX = touchStartX;
        touchDir = null;
        dragStartRotation = chart.get('rotationX') || 0;
        posHistory = [touchStartX];
        timeHistory = [Date.now()];
      }, { passive: true });

      container.addEventListener('touchmove', function (e) {
        if (e.touches.length !== 1) return;
        var x = e.touches[0].clientX;
        var y = e.touches[0].clientY;
        var dx = x - touchStartX;
        var dy = y - touchStartY;

        if (touchDir === null && (Math.abs(dx) > TAP_MAX_MOVEMENT || Math.abs(dy) > TAP_MAX_MOVEMENT)) {
          touchDir = Math.abs(dx) >= Math.abs(dy) ? 'x' : 'y';
          if (touchDir === 'x') hideHint();
        }

        if (touchDir === 'x') {
          e.preventDefault();
          chart.set('rotationX', dragStartRotation + dx * DRAG_SENSITIVITY);
          lastX = x;
          posHistory.push(x);
          timeHistory.push(Date.now());
          if (posHistory.length > 10) {
            posHistory.shift();
            timeHistory.shift();
          }
        }
        /* touchDir === 'y' (or undetermined): do nothing, let the browser scroll */
      }, { passive: false });

      container.addEventListener('touchend', function (e) {
        if (touchDir === 'x') {
          var vel = getSmoothedVelocity();
          if (Math.abs(vel) > 0.03) {
            startMomentum(vel); // resumes auto-rotate itself once it decays
          } else {
            resumeAutoRotateSoon();
          }
        } else {
          if (touchDir === null) {
            /* Plain tap: identify the country under the touch, if any.
               Rotation was paused on touchstart, so it hasn't drifted. */
            var rect = container.getBoundingClientRect();
            var geo = chart.invert({ x: touchStartX - rect.left, y: touchStartY - rect.top });
            if (geo) {
              var name = findCountryNameAt(geo.longitude, geo.latitude);
              if (name) showTapLabel(name, touchStartX, touchStartY);
            }
          }
          resumeAutoRotateSoon();
        }
        touchDir = null;
      });
    } else {
      /* Desktop: amCharts' own mouse-drag panning + native tooltips */
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
