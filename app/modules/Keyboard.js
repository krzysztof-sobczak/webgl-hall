WGH.modules.Keyboard = (function() {

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
            if (pressedKeys[33]) {
                // Page Up
                this.state.z -= 0.05;
            }
            if (pressedKeys[34]) {
                // Page Down
                this.state.z += 0.05;
            }
            if (pressedKeys[37]) {
                // Page Up
                this.state.x -= 0.05;
            }
            if (pressedKeys[39]) {
                // Page Down
                this.state.x += 0.05;
            }
            if (pressedKeys[40]) {
                // Page Up
                this.state.y -= 0.05;
            }
            if (pressedKeys[38]) {
                // Page Down
                this.state.y += 0.05;
            }
        }
    };

    return Keyboard;

} () );