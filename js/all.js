'use strict';

$(document).ready(function () {

    var $html = $('body,html'),
        $body = $('body'),
        $itmMenu = $('.header_menu > li'),
        $itmMenuA = $('.header_menu > li > a'),
        $scrollDown = $('.btnScroll'),
        $ligBox = $('#lightBox'),
        $ligBoxWrap = $('#lightBoxWrap'),
        $btnOpen = $('.btn_list'),
        $btnGoto = $('.btn_goto');

    // element rellax START
    // var rellax = new Rellax('.rellax');
    // element rellax END
    // element paroller START
    $('.rellax').paroller();
    // element paroller END

    // img lazy START
    $('.lazy').Lazy({
        // effect: 'fadeIn',
        // effectTime: 100,
        threshold: 500
    });
    // img lazy END

    // img tilt START
    $('.js-tilt').tilt();
    // img tilt END

    // WOW START
    // new WOW().init();
    // WOW END

    // scroll_down START    
    $scrollDown.on('click', function (e) {
        e.preventDefault();
        $html.stop(false, false).animate({
            // 
            scrollTop: $($(this).attr('href')).offset().top + 'px'
        }, 800);
        return false;
    });
    // scroll_down END

    // header_menu START
    // Add scrollspy to <body>
    $body.scrollspy({
        target: ".navbar",
        offset: 50
    });

    // Add smooth scrolling on all links inside the navbar
    $itmMenuA.on('click', function (event) {

        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $html.animate({
            scrollTop: $(hash).offset().top
        }, 800, function () {

            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
        });
    });

    //
    var box = $(".wheel_point");
    var boxCenter = [box.offset().left + box.width() / 2, box.offset().top + box.height() / 2];

    $(document).mousemove(function (e) {
        var angle = Math.atan2(e.pageX - boxCenter[0], -(e.pageY - boxCenter[1])) * (180 / Math.PI);

        box.css({
            "-webkit-transform": 'rotate(' + angle + 'deg)'
        });
        box.css({
            '-moz-transform': 'rotate(' + angle + 'deg)'
        });
        box.css({
            'transform': 'rotate(' + angle + 'deg)'
        });
    });
    //

    // lightBox START
    function ligBoxClose() {
        $body.removeClass('overlay');
        $ligBoxWrap.removeClass('flash slideInUp').addClass('slideOutDown');
        $ligBox.addClass('closeing');
    }
    $btnOpen.on('click', function (e) {
        e.preventDefault();
        $body.addClass('overlay');
        $ligBox.addClass('active in');
        setTimeout(function () {
            $ligBoxWrap.addClass('active');
        }, 600);
    });
    $ligBox.on('click', '.btn_close', function (e) {
        e.preventDefault();
        ligBoxClose();
        setTimeout(function () {
            $ligBox.removeClass('closeing').removeClass('in').removeClass('active');
            $ligBoxWrap.removeClass('slideOutDown active').addClass('flash slideInUp');
        }, 600);
    });
    $ligBox.on('click', '.btn_goto', function (e) {
        e.preventDefault();
        var $this = $(this);
        ligBoxClose();
        setTimeout(function () {
            $ligBox.removeClass('closeing').removeClass('in').removeClass('active');
            $ligBoxWrap.removeClass('slideOutDown active').addClass('flash slideInUp');
            $html.stop(false, false).animate({
                // 
                scrollTop: $($this.attr('href')).offset().top + 'px'
            }, 800);
            return false;
        }, 600);
    });
    // lightBox END

    var $sec = $('.sec');
    $(window).on('scroll load', function () {
        var winH = $(this).height();
        var scrollT = $(this).scrollTop();

        $sec.each(function (index) {
            var elemH = $(this).height();
            var elemT = $(this).position().top;

            if (elemT < scrollT + winH && scrollT < elemT + elemH) {
                $(this).addClass("active");
            }
        });
    });

    // $(window).on('load resize', function() {
    //     firefoxResizeCommon();
    // });
});

// function firefoxResizeCommon() {
// 
// var sectionCurtainH = $('.sec-curtain'),
//     sectionHalfH = $('.sec-half'),
//     sectionFullH = $('.sec-fullHeight'),
//     mobileFullH = $('.sec-fullHeight-responsive'),
//     mobileAutoH = $('.sec-fullHeight.sec-autoHeight-responsive');
// var winW = $(window).width(),
//     winH = $(window).innerHeight();
// var winT = $(window).scrollTop(),
//     winH = $(window).innerHeight();
// var winB = winT + winH;

// mobileFullH.height(winH);
// mobileAutoH.height(winH);
// sectionFullH.height(winH);
// sectionCurtainH.height(winH * 0.75);
// sectionHalfH.height(winH * 0.5);

// if (winW < 992 || winW <= 1279 && (window.orientation === 90 || window.orientation === -90)) {
//     mobileAutoH.height('auto');
// }

// var $sec = $('.sec');
// $sec.each(function() {
// var distance = $(this).offset().top + 200;
// if (winB >= distance) {
// $(this).addClass('active');
// } else {
//     $(this).removeClass('active');
// };
// });
// }
//# sourceMappingURL=all.js.map
