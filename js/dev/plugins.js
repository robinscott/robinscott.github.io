
var SiteScripts = (function($) {
    
    var app = {};

    // Avoid `console` errors in browsers that lack a console.s
    app.handleConsoleReporting = function() {
        var method;
        var noop = function () {};
        var methods = [
            'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
            'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
            'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
            'timeStamp', 'trace', 'warn'
        ];
        var length = methods.length;
        var console = (window.console = window.console || {});

        while (length--) {
            method = methods[length];

            // Only stub undefined methods.
            if (!console[method]) {
                console[method] = noop;
            }
        }
    };

    // Setup Foundation off canvas navigation
    app.setupOffcanvasNavigation = function() {
        var $offCanvasWrap = $(".off-canvas-wrap");

        if (window.matchMedia(Foundation.media_queries.medium).matches) {
          $offCanvasWrap.addClass('off-canvas-custom');
          alert('medium and above');
        }
        
        $(window).on('resize', Foundation.utils.throttle(function(){
            if (window.matchMedia(Foundation.media_queries.medium).matches && (!$offCanvasWrap.hasClass("offcanvas-overlap") || !$offCanvasWrap.hasClass("off-canvas-custom"))) {
                $offCanvasWrap.addClass('off-canvas-custom');
                alert('medium and above');
            } else {
                $offCanvasWrap.removeClass("off-canvas-custom");
                alert('small');
            }
        }, 300));
    };

    return app;

}(jQuery));


SiteScripts.handleConsoleReporting();

$(function() {
  	SiteScripts.setupOffcanvasNavigation();
});
