var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);








// parallax
var parallax = (function() {

  var bg        = $('.first__bg');
  var section   = $('.first__me  .me');
  var text      = $('.first__bg-text');
  var blogTitle = $('.first__title-wrap');

  return {
    move: function(el, windowScroll, strafeAmount) {
      var wScroll = $(window).scrollTop();

      var strafe = windowScroll / -strafeAmount + '%';
      var transformString = 'translate3d(0,' + strafe + ', 0)';

      el.css({
        'transform': transformString,
        '-webkit-transform': transformString
      });

    },

    init: function(wScroll) {
      this.move(bg, wScroll, 50);
      this.move(text, wScroll, 30);
      this.move(section, wScroll, 15);
      this.move(blogTitle, wScroll, 18);
    }
  };

})();




// blur
var blur = (function() {

  var blur      = $('[data-blur-elem="form"]');
  var container = $('[data-blur-container="form"]');


  return {
    set: function() {
      if (!blur.length || !container.length ) return;

      var imgWidth   = container.width();
      var offsetTop  = container.offset().top  - blur.offset().top;
      var offsetLeft = container.offset().left - blur.offset().left;

      blur.css({
        'background-size': imgWidth + 'px auto',
        'background-position': offsetLeft + 'px' + ' ' + offsetTop + 'px'
      });
    }
  };

})();




// graph init
var pie = (function() {
  var pieAll = null;



  return {
    init: function() {
      pieAll = $('.graph__in');
      if(pieAll.length === 0) return;

      pieAll.each(function(i, item) {
        var value = $(item).attr('stroke-dasharray');
        item.value = value;
        $(item).attr('stroke-dasharray', '0 100');
      });
    },

    getValue: function() {
      if(pieAll.length === 0) return;

      pieAll.each(function(i, item) {
        item.setAttribute('stroke-dasharray', item.value);
      });
    }
  };
})();





$( document ).ready(function() {

  pie.init();
  blur.set();
  parallax.init();

  // parallax on the welcome page
  var mouseParallax = (function() {

    var layerAll = $('.parallax__layer');

    $(window).on('mousemove', function(e) {
      var mouseX = e.pageX;
      var mouseY = e.pageY;

      var w = (window.innerWidth / 2)  - mouseX;
      var h = (window.innerHeight / 2) - mouseY;

      layerAll.map(function(i,item) {
         var wPos = w * ((i + 1) / 175);
         var hPos = h * ((i + 1) / 220);

         $(item).css({
            'transform': 'translate3d('+ wPos +'px,' + hPos + 'px, 0)'
         });
      });
    });

  })();

  // preloader
  (function() {

    var imgs = [];

    $('*').each(function () {
      var $this      = $(this);
      var background = $this.css('background-image');
      var isImg      = $this.is('img');

      if (background !== 'none') {
        var path = background.replace('url("', '').replace('")', '');

        if( path.indexOf('-gradient(') !== -1 ) return;

        imgs.push(path);
      }

      if (isImg) {
        var path = $this.attr('src');

        if (!path) return;
        imgs.push(path);
      }
    });


    var percentsTotal = 1;

    for (var i = 0; i < imgs.length; i++) {
      var image = $('<img>', {
        attr: {
          src: imgs[i]
        }
      });

      image.one({
        load : function () {
          setPercents(imgs.length, percentsTotal);
          percentsTotal++;
        },
        error : function () {
          percentsTotal++;
        }
      });
    }

    function setPercents(total, current) {
      var percent = Math.ceil(current / total * 100);

      if (percent >= 100) {
        $('.preloader').fadeOut();
      }

      $('.preloader__value').text(percent);
    }

  })();










  // Работа главного меню
  (function() {

    $(document).on('click', '.nav__trigger', function(e) {
      var trigger = $(this);
      var nav     = trigger.closest('.nav');
      var drop    = nav.find('.nav__drop');
      var header  = $('.header');


      if(nav.hasClass('nav--open')) {

        drop.fadeOut( 500 , function() {
          nav.removeClass('nav--open');
          $('body').css('overflow', '');
        });

        header.css('z-index', '');

      } else {

        drop.show(0, function() {
          nav.addClass('nav--open');
          header.css('z-index', 100);
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
        var duration = duration || 1000;


        $("body, html").animate({
          scrollTop: position
        }, duration);
      }


      if (target == 'top') {
        scrollToPosition();
      }

      if (target == 'next') {
        container = btn.closest('.section');
        scrollToPosition( container.height() );
      }
    });

  })();





  // sticky-меню на странице блога
  (function() {
    var container = $('.blog__in');
    var menu      = container.find('.blog__menu');

    if (menu.length === 0 || isMobile) return;

    var containerBottom = container.offset().top + container.height() - 40;
    var edgeTop         = menu.offset().top;
    var menuHeight      = menu.height();


    $(window).on('scroll', function() {
      if(edgeTop < $(window).scrollTop()) {
        if(containerBottom < $(window).scrollTop() + menuHeight) {
          menu
            .addClass('blog__menu--fix-bottom')
            .removeClass('blog__menu--sticky');
        } else {
          menu
            .addClass('blog__menu--sticky')
            .removeClass('blog__menu--fix-bottom');
        }
      } else {
        menu.removeClass('blog__menu--sticky');
      }
    });

  })();





  // Прокрутка до выбранной статьи в блоге
  (function() {
    var articleAll = $('.post');
    var linksAll   = $('.blog__menu .menu__link');

    if(articleAll.length === 0) return;

    showSection(window.location.hash, false);


    function showSection(section, isAnimate) {
      var target        = section.replace('#', '');
      var reqSection    = articleAll.filter('[data-id="' + target + '"]');
      var duration      = 750;

      if (reqSection.length === 0) return;
      var reqSectionPos = reqSection.offset().top;

      if(isAnimate) {
        $('body, html').animate({ scrollTop: reqSectionPos }, duration);
      } else {
        $('body, html').scrollTop(reqSectionPos);
      }
    }



    function checkSection() {
      articleAll.each(function(i, item) {
        var article    = $(item);
        var topEdge    = article.offset().top - 200;
        var bottomEdge = topEdge + article.height();
        var topScroll  = $(window).scrollTop();

        if (topEdge < topScroll && bottomEdge > topScroll) {
          var currentId = article.data('id');
          var reqLink   = linksAll.filter('[href="#' + currentId + '"]');

          reqLink.closest('.menu__item')
            .addClass('menu__item--active')
            .siblings()
              .removeClass('menu__item--active');

          window.location.hash = currentId;
        }
      });
    }


    $(window).on('scroll', function() {
      checkSection();
    });


    $(document).on('click', '.blog__menu .menu__link', function(e) {
      e.preventDefault();
      showSection($(this).attr('href'), true);
    });

  })();





  // Боковавя панель на странице блога
  (function() {
    var trigger     = $('.blog__side-trigger');
    var activeClass = 'blog__side--show';
    var container;

    if( trigger.length === 0) return;

    container = trigger.closest('.blog__side');;


    trigger.on('click', function(e) {
      e.preventDefault();
      container.toggleClass( activeClass );
    });


    $(document).on('click', '.blog__menu  .menu__item', function() {
      var item      = $(this);

      if(item.hasClass('menu__item--active')) return;
      container.removeClass( activeClass );
    });


    $(window).on('resize', function() {
      if( $(document).width() >= 960 && container.hasClass( activeClass ) ) {
        container.removeClass( activeClass );
      }
    });

  })();





  // Слайдер
  (function() {
    var transitionEnd = 'transitionend webkitTransitionEnd oTransitionEnd';

    function Slider(options) {
       var gallery     = options.elem;
       var prev        = gallery.find('.slider__control--prev');
       var next        = gallery.find('.slider__control--next');

       var slides         = gallery.find('.slider__view  .slides__item');
       var activeSlide    = slides.filter('.slides__item--active');
       var slidesCnt      = slides.length;
       var activeSlideIdx = activeSlide.index();

       var mainSlider = gallery.find('.slider__view  .slides');
       var mainSlides = mainSlider.find('.slides__item');

       var prevSlider = gallery.find('.slider__control--prev  .slides');
       var prevSlides = prevSlider.find('.slides__item');

       var nextSlider = gallery.find('.slider__control--next  .slides');
       var nextSlides = nextSlider.find('.slides__item');
       var isReady    = false;


       var desc  = gallery.find('.slider__desc');
       var title = desc.find('.slider__title');
       var tools = desc.find('.slider__info');
       var link  = desc.find('.slider__link');

       var data      = gallery.find('.slider__data');
       var dataItems = data.find('.slider-data__item');


       // init
       function init() {
          showedSlide(nextSlides, getIdx(activeSlideIdx, 'next'));
          showedSlide(prevSlides, getIdx(activeSlideIdx, 'prev'));
          updateDesc(dataItems.eq(activeSlideIdx));
          isReady = true;
       }
       init();

       function showedSlide(slider, idx) {
          slider
             .eq(idx).addClass('slides__item--active')
             .siblings().removeClass('slides__item--active');
       }

       function dataChange(direction) {
          activeSlideIdx = (direction === 'next') ? getIdx(activeSlideIdx, 'next') : getIdx(activeSlideIdx, 'prev');
       }

       function getIdx(currentIdx, dir) {
          if(dir === 'prev') {
            return (currentIdx - 1 < 0) ? slidesCnt - 1 : currentIdx - 1 ;
          }
          if(dir === 'next') {
            return (currentIdx + 1 >= slidesCnt) ? 0 : currentIdx + 1 ;
          }

          return currentIdx;
       }

       function changeSlide(slides, direction, className) {
          var currentSlide    = slides.filter('.slides__item--active');
          var currentSlideIdx = currentSlide.index();
          var newSlideIdx;

          if (direction === 'prev') {
             newSlideIdx = getIdx(currentSlideIdx, 'prev');
          }
          if (direction === 'next') {
             newSlideIdx = getIdx(currentSlideIdx, 'next');
          }

          slides.eq(newSlideIdx)
             .addClass( className )
             .one(transitionEnd, function() {
                $(this)
                   .removeClass( className )
                   .addClass('slides__item--active')
                   .trigger('changed-slide');
             });

          currentSlide
             .addClass( className )
             .one(transitionEnd, function() {
                $(this).removeClass('slides__item--active ' + className);
             });
       }

       function changeAll(direction) {
          changeSlide(mainSlides, direction, 'slides__item--animate-fade');
          changeSlide(prevSlides, direction, 'slides__item--animate-down');
          changeSlide(nextSlides, direction, 'slides__item--animate-up');
       }

       function updateDesc(data) {
          title.text( data.attr('data-title') );
          tools.text( data.attr('data-tools') );
          link.attr('href', data.attr('data-link') );
       }

       $(document).on('changed-slide', function() {
          isReady = true;
       });



       this.prev = function() {
          if( !isReady ) return;
          isReady = false;

          changeAll('prev')
          dataChange('prev');

          updateDesc(dataItems.eq(activeSlideIdx));
       };


       this.next = function() {
          if( !isReady ) return;
          isReady = false;

          changeAll('next')
          dataChange('next');

          updateDesc(dataItems.eq(activeSlideIdx));
       };

       prev.on('click', this.prev);
       next.on('click', this.next);
    } // Slider


    var slider = new Slider({
       elem: $('#js-slider')
    });
  })();





  // Обработка и отправка форм
  (function() {
    $('form').attr('novalidate', true);

    /* При фокусе убирать красную обводку */
    $(document).on('focus', 'input, textarea', function(e) {
      $(this)
        .removeClass('field--error')
        .removeClass('field--ok');
    });

    $(document).on('reset', 'form', function(e) {
      $(this).find('input, textarea')
        .removeClass('field--error')
        .removeClass('field--ok');
    });


    // Валидация полей формы
    function validateForm(form) {
      var inputs     = form.find('[required]');
      var isValidate = true;

      inputs.removeClass('field--error');

      inputs.each(function(i, item) {
        var input = $(item);
        var value = input.val();
        var type  = input.attr('type');

        if(type == 'checkbox') {
          if(!input.is(':checked')) {
            input.addClass('field--error');
            isValidate = false;
          }
          return;
        }

        if(value.trim() == '') {
          input.addClass('field--error');
          isValidate = false;
        } else {
          input
            .removeClass('field--error')
            .addClass('field--ok');
        }
      });

      return isValidate;
    } // validateForm();




    /* Отправка форм */
    function sendForm(form, method, url, dataType) {
        if( !validateForm(form) ) return;

        $.ajax({
          type: method,
          url:  url,
          data: form.serialize()
        })
        .done(function(answer) {
          console.log('form send');
          form.trigger('reset');
        })
        .fail(function() {
          // console.log('form send: error');
        });
    } // sendForm();


    $('.form-modal--callback').on('submit', function(e) {
      e.preventDefault();
      sendForm($(this), 'POST', 'mail.php');
    });


    $('#form-authorization').on('submit', function(e) {
      e.preventDefault();
      sendForm($(this), 'POST', 'authorization.php');
    });

  })();





  // Карта
  (function() {

    var map = document.getElementById('map');

    if( map === null ) return;


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

});





$(window).on('load', function() {
  $('body').addClass('loaded');
  pie.getValue();
});



$( window ).on('scroll', function() {
  parallax.init( $(window).scrollTop() );
});



$( window ).on('resize', function() {
  blur.set();
});