window.onload = function () {

  (function() {

    if( !document.getElementById('map') ) return;

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