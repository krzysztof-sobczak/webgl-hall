WGH.modules.Main = (function() {

    var state;
    var keyboard;
    var webGL;
    var animation;

    var Main = function (_canvas) {
        state = new WGH.modules.State();
        keyboard = new WGH.modules.Keyboard(state);

        webGL = new WGH.modules.WebGL(_canvas);

        animation = new WGH.modules.Animation(webGL);
        animation.addHandler(keyboard);
        animation.start();
    };

    Main.prototype = {

    };

    return Main;

} () );