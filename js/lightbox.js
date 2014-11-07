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

        //Add visibility to get accurate dimensions of lightbox
        $lightbox.velocity({
            opacity: 1
        }, {
            duration: 100,
            display: 'block',
            complete: function() {
                $lightbox.toggleClass('open'); //Add "open" class for CSS styles 
                repositionOverlay(); //Make sure the lightbox is centered in the browser window
            }
        });

    };

    var closeOverlay = function() {
        $lightbox.velocity({
            opacity: 0
        }, {
            duration: 200,
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