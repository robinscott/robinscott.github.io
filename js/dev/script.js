// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

// Place any jQuery/helper plugins in here.
$(document).ready(function() {
    var $offCanvasWrap = $(".off-canvas-wrap");
    console.log('ok');
    $(window).resize(function() {
        if(this.outerWidth > 640 && $offCanvasWrap.hasClass("move-left")) {
            $(".exit-off-canvas").trigger("click");
        }
    });
});