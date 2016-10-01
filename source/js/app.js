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