window.onload = function () {

  (function() {

    var map;

    DG.then(function () {
        map = DG.map('map', {
            center: [57.925, 56.05],
            zoom: 11,
              zoomControl: false,
              scrollWheelZoom: false,
              fullscreenControl: false
        });
    });

  })();

};