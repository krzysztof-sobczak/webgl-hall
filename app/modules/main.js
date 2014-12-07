WGH.modules.Main = (function() {

    var state;
    var keyboard;
    var webGL;
    var animation;

    var Main = function (_canvas) {
        state = WGH.modules.State.getInstance();
        keyboard = new WGH.modules.Keyboard(state);

        webGL = new WGH.modules.WebGL(_canvas);
        webGL.init();

        animation = new WGH.modules.Animation(webGL);
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