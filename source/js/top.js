
    // go top
    $(window).scroll(function() {

        var scrolledFromtop = $(window).scrollTop(),
            footerTopPx = $('footer').scrollTop(),
            btnTop = $('#goTop');

        if ($(window).scrollTop() + $(window).height() > $(document).height() - 150) {
            btnTop.addClass('bottom');
        } else {
            btnTop.removeClass('bottom');
        };
    });
    $('#goTop').click(function() {
        $('body,html').stop(false, false).animate({
            scrollTop: 0
        }, 800);
        return false;
    });