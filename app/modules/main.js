WGH.modules.Main = (function() {

    var state;
    var keyboard;
    var webGL;
    var animation;

    var Main = function (_canvas) {
        state = WGH.modules.State.getInstance();
        keyboard = new WGH.handlers.Keyboard(state);

        webGL = new WGH.core.WebGL(_canvas);
        webGL.init();

        animation = new WGH.core.Animation(webGL);
        animation.addHandler(keyboard);
        animation.start();
    };

    function getState() {
        return state;
    }

    Main.prototype = {

    };

    return Main;

} () );