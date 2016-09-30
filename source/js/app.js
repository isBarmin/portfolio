window.onload = function () {

  (function() {

    $(document).on('click', '.nav__trigger', function(e) {
      var trigger = $(this);
      var nav     = trigger.closest('.nav');
      var drop    = nav.find('.nav__drop');

      if(nav.hasClass('nav--open')) {

        drop.fadeOut( 500 , function() {
          nav.removeClass('nav--open');
        });

        $('body').css('overflow', '');

      } else {

        drop.show(0, function() {
          nav.addClass('nav--open');
        });
        $('body').css('overflow', 'hidden');

      }
    });

  })();





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