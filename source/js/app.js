window.onload = function () {

  // Работа главного меню
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





  // Работа двухсторонней карточки на главной странице
  (function() {

    var welcome = $('.welcome');

    if( !welcome === 0 ) return;


    welcome.on('click', '[data-flip="toggle"]', function(e) {
      var trigger     = $(this);
      var initTrigger = welcome.find('.welcome__btn-auth');
      var flipper     = welcome.find('.welcome__flipper');
      var duration    = 500;


      flipper.toggleClass('welcome__flipper--flip');

      if(flipper.hasClass('welcome__flipper--flip')) {
        initTrigger.fadeOut( duration );
      } else {
        initTrigger.fadeIn( duration );
      }

    });

  })();





  // Прокрутить страницу до ...
  (function() {

    $(document).on('click', '[data-go]', function(e) {
      e.preventDefault();

      var btn        = $(this);
      var target     = btn.attr('data-go');
      var container  = null;


      function scrollToPosition(position, duration) {
        var position = position || 0;
        var duration = duration || 500;


        $("body, html").animate({
          scrollTop: position
        }, duration);
      }


      if (target == 'top') {
        scrollToPosition();
      }

      if (target == 'next') {
        container = btn.closest('.section');
        scrollToPosition( container.height(), 1000 );
      }
    });

  })();





  // Карта
  (function() {

    var map = document.getElementById('map');

    if( map.length === 0 ) return;


    // параметры карты
    var latitude  = 58.0223849;
    var longitude = 56.2338462;
    var mapZoom  = 15;


    // Стилизация карты
    var mainСolor = "#61DAC9";

    var style = [
      {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#444444"
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
          {
            "color": "#f2f2f2"
          }
        ]
      },
      {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
          {
            "saturation": -100
          },
          {
            "lightness": 45
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#d6d6d6"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
          {
            "color": "#46bcec"
          },
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": mainСolor
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      }
    ]



    // Настройки карты
    var mapOptions = {
      center: new google.maps.LatLng(latitude, longitude),
      zoom: mapZoom,
      panControl: false,
      zoomControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: false,
      styles: style,
    }

    // Инициализация карты
    var googleMap = new google.maps.Map(map, mapOptions);

  })();

};