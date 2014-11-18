
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

    // Close the Foundation off canvas navigation when the window resizes
    app.resizeClosesNavigation = function() {
        var $offCanvasWrap = $(".off-canvas-wrap");
        $(window).on('resize', Foundation.utils.throttle(function(e){
            if(this.outerWidth > 640 && $offCanvasWrap.hasClass("move-left")) {
                $(".exit-off-canvas").trigger("click");
            }
        }, 300));
    };

    return app;

}(jQuery));


SiteScripts.handleConsoleReporting();

$(function() {
  	SiteScripts.resizeClosesNavigation();
});
