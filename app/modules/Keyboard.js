WGH.modules.Keyboard = (function() {

    var state;

    var Keyboard = function (_state) {
        state = _state;
        var pressedKeys = {};

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
            if (this.pressedKeys[33]) {
                // Page Up
                this.state.z -= 0.05;
            }
            if (this.pressedKeys[34]) {
                // Page Down
                this.state.z += 0.05;
            }
            if (this.pressedKeys[37]) {
                // Page Up
                this.state.x -= 0.05;
            }
            if (this.pressedKeys[39]) {
                // Page Down
                this.state.x += 0.05;
            }
            if (this.pressedKeys[40]) {
                // Page Up
                this.state.y -= 0.05;
            }
            if (this.pressedKeys[38]) {
                // Page Down
                this.state.y += 0.05;
            }
        }
    };

    return Keyboard;

} () );