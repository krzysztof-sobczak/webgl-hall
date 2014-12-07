WGH.handlers.Keyboard = (function() {

    var state;
    var pressedKeys;

    var Keyboard = function (_state) {
        state = _state;
        pressedKeys = {};

        document.onkeydown = this.handleKeyDown;
        document.onkeyup = this.handleKeyUp;
        this.pressedKeys = pressedKeys;
    };

    Keyboard.prototype = {

        handleKeyDown: function (event) {
            pressedKeys[event.keyCode] = true;
        },

        handleKeyUp: function (event) {
            pressedKeys[event.keyCode] = false;
        },
        handle: function() {
            if (pressedKeys[87]) {
                // Page Up
                state.z -= 0.05;
            }
            if (pressedKeys[83]) {
                // Page Down
                state.z += 0.05;
            }
            if (pressedKeys[37]) {
                // Page Up
                state.x -= 0.05;
            }
            if (pressedKeys[39]) {
                // Page Down
                state.x += 0.05;
            }
            if (pressedKeys[40]) {
                // Page Up
                state.y -= 0.05;
            }
            if (pressedKeys[38]) {
                // Page Down
                state.y += 0.05;
            }
        }
    };

    return Keyboard;

} () );