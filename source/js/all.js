var header = document.querySelector('header');
    var headroom = new Headroom(header);
    headroom.init();

    // menu
    $('.drawer').drawer();
    $('[data-submenu]').submenupicker();
    // wow
    wow = new WOW({
        mobile: false
    })
    wow.init();