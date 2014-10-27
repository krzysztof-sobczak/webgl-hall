WGH.modules.Animation = (function() {

    var webGL;
    var handlers;

    var Animation = function (_webGL) {
        webGL = _webGL;
        handlers = [];

        window.requestAnimFrame = (function(callback) {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
        })();
    };

    Animation.prototype = {
        addHandler: function(handler) {
            handlers.push(handler);
        },
        start: function() {
            function tick() {
                requestAnimFrame(tick);
                handlers.forEach(function(handler) {
                    handler.handle();
                });
                //webGL.draw(state);
            }

            tick();
        }
    };

    return Animation;

} () );