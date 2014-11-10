var toolbox = {};

toolbox.lightbox = (function() {

    "use strict";

    var $window = $(window),
        $lightbox = $('.lightbox'),
        $lightboxBg = $('.lightbox .bg'),
        $start = $('.start'),
        $close = $('.close a'),
        $contentContainer = $('.lightbox .content-container'),
        $innerContentContainer = $('.inner-content-container'),
        content = $('.content').html(); //Sample content

    var init = function() {
        bind();
    };

    var bind = function() {

        $start.click(function(e) {
            e.preventDefault();
            showOverlay(content);
        });

        $close.click(function(e) {
            e.preventDefault();
            closeOverlay();
        });

        $lightboxBg.click(function(e) {
            e.preventDefault();
            closeOverlay();
        });

        $window.resize(function() {
            repositionOverlay();
        });

    }

    var showOverlay = function(content) {

        //Add content to the lightbox before it is displayed
        $innerContentContainer.html(content);

        $lightbox
        //Pre-animation
        .velocity({
            opacity: 0,
            marginTop: '500px'
        }, {
            duration: 0,
            display: 'block'
        })
        //Animate in
        .velocity({
            opacity: 1,
            marginTop: '0'
        }, {
            duration: 300,
            display: 'block',
            begin: function() {
                $lightbox.toggleClass('open'); //Add "open" class for CSS styles/animations
                repositionOverlay(); //Make sure the lightbox is centered in the browser window
            }
        });

    };

    var closeOverlay = function() {
        $lightbox.velocity({
            opacity: 0,
            marginTop: '-500px'
        }, {
            duration: 300,
            display: 'none',
            begin: function() {
                $lightbox.toggleClass('open');
            }
        });
    };

    var repositionOverlay = function() {
        if ($contentContainer.height() > $window.height()) {
            $contentContainer.velocity({
                marginTop: '0',
                marginBottom: '0'
            });
        } else {
            $contentContainer.velocity({
                marginTop: ( $window.height() - $contentContainer.outerHeight() ) / 2
            }, {
                duration: 0    
            });
        }
    };

    init();

    return {};

}());