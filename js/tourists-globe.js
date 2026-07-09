/* ══════════════════════════════════════════════════════
   TOURISTS-GLOBE.JS — amCharts 5 rotating globe
   (geoOrthographic) highlighting our main tourist origins
   ══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {
  var container = document.getElementById('tourists-globe');
  if (!container) return;
  if (typeof am5 === 'undefined' || typeof am5map === 'undefined') return;

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

    var chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: 'rotateX',
        panY: 'rotateY',
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
    polygonSeries.mapPolygons.template.setAll({
      tooltipText: '{name}',
      interactive: true,
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
          tooltipText: '{title}'
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

    /* Auto-rotate, pausing while the user drags */
    if (!prefersReducedMotion) {
      var rotationAnimation = chart.animate({
        key: 'rotationX',
        from: 90,
        to: 450,
        duration: 60000,
        loops: Infinity
      });

      chart.seriesContainer.events.on('pointerdown', function () {
        if (rotationAnimation) rotationAnimation.pause();
      });
      chart.seriesContainer.events.on('globalpointerup', function () {
        if (rotationAnimation) rotationAnimation.resume();
      });
    }
  });
});
