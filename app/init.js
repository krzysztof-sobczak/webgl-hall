var WGH = window.WGH || {}; // namespace
WGH.modules = {}; // namespace for modules

WGH.modules.Main = (function() {

    var state;
    var keyboard;
    var webGL;
    var animation;

    var Main = function (_canvas) {
        state = new WGH.modules.State();
        keyboard = new WGH.modules.Keyboard(state);
        canvas = _canvas;

        webGL = new WGH.modules.WebGL(canvas);

        animation = new WGH.modules.Animation(webGL);
        animation.addHandler(keyboard);
        animation.start();
    };

    Main.prototype = {

    };

    return Main;

} () );

WGH.modules.WebGL = (function(){

    var GL;
    var shaderProgram;
    var canvas;

    var WebGL = function (_canvas) {
        canvas = _canvas;
        GL = new WGH.modules.GL.createInstance(canvas);
        shaderProgram = new WGH.modules.ShaderProgram();
    };

    return WebGL;

} () );

WGH.modules.GL = (function() {

    var instance;

    function createInstance(canvas) {
        var objectGL;
        try {
            // Try to grab the standard context. If it fails, fallback to experimental.
            objectGL = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
            objectGL.viewportWidth = canvas.width;
            objectGL.viewportHeight = canvas.height;
        }
        catch(e) {

        }

        // If we don't have a GL context, give up now
        if (!objectGL) {
            console.error("Unable to initialize WebGL. Your browser may not support it.");
            objectGL = null;
        }
        instance = objectGL;
        return instance;
    }

    return {

        getInstance: function () {
            if (!instance) {
                throw new Error("GL not initialized.");
            }
            return instance;
        },

        createInstance: createInstance

    };

} () );

WGH.modules.ShaderProgram = (function() {

    var SHADERS_PATH = "app/shaders/";
    var FRAGMENT_TYPE_PREFIX = "fragment";
    var VERTEX_TYPE_PREFIX = "vertex";
    var GLShaderProgram;
    var GL;
    var shaders;
    var attributes;
    var uniforms;

    var ShaderProgram = function () {
        GL = WGH.modules.GL.getInstance();
        GLShaderProgram = GL.createProgram();
        shaders = [];
        attributes = {};
        uniforms = {};
    };

    ShaderProgram.prototype = {
        getShader: function(shaderName) {
            var shader = null;
            var shaderRequest = $.ajax({

                url: SHADERS_PATH + shaderName,
                async: false,

                success: function (shaderSource) {
                    if (shaderName.indexOf(FRAGMENT_TYPE_PREFIX) == 0) {
                        shader = GL.createShader(GL.FRAGMENT_SHADER);
                    } else if (shaderName.indexOf(VERTEX_TYPE_PREFIX) == 0) {
                        shader = GL.createShader(GL.VERTEX_SHADER);
                    } else {
                        throw new Error("Invalid type of shader script.");
                    }

                    GL.shaderSource(shader, shaderSource);
                    GL.compileShader(shader);

                    if (!GL.getShaderParameter(shader, GL.COMPILE_STATUS)) {
                        throw new Error(GL.getShaderInfoLog(shader));
                    }
                }

            });

            if(shader == null){
                throw new Error("Cannot get shader script.");
            }
            return shader;
        },
        addShader: function(shaderName) {
            shaders.push(this.getShader(shaderName));
        },
        run: function() {
            shaders.forEach(function(shader) {
                GL.attachShader(GLShaderProgram, shader);
            });
            GL.linkProgram(GLShaderProgram);
            if (!GL.getProgramParameter(GLShaderProgram, GL.LINK_STATUS)) {
                throw new Error("Could not initialise shaders");
            }
            GL.useProgram(GLShaderProgram);
        },
        addAttribute: function(key, name) {
            attributes[key] = GL.getAttribLocation(GLShaderProgram, name);
            GL.enableVertexAttribArray(attributes[key]);
        },
        getAttribute: function(key) {
            if(attributes.hasOwnProperty(key)) {
                return attributes[key];
            } else {
                throw new Error("Attribute doesn't exist.");
            }
        },
        addUniform: function(key, name) {
            uniforms[key] = GL.getUniformLocation(GLShaderProgram, name);
        },
        setUniformMatrix4: function(key, matrix) {
            GL.uniformMatrix4fv(uniforms[key], false, matrix);
        },
        setUniformMatrix3: function(key, matrix) {
            GL.uniformMatrix3fv(uniforms[key], false, matrix);
        },
        setUniformVector3: function(key, vector3) {
            GL.uniform3fv(uniforms[key], vector3);
        },
        setUniformValue: function(key, value) {
            GL.uniform1f(uniforms[key], value);
        }
    };

    return ShaderProgram;

} () );


WGH.modules.State = (function() {

    var State = function () {
        this.x = 0.0;
        this.y = 0.0;
        this.z = 0.0;
        this.ambientLight = vec3.fromValues(0.2, 0.2, 0.2);
        this.diffuseLight = vec3.fromValues(0.8, 0.8, 0.8);
        this.specularLight = vec3.fromValues(0.8, 0.8, 0.8);
        this.lightPosition = vec3.fromValues(-10.0, 4.0, -20.0);
        this.materialShininess = 32.0;
    };

    return State;

} () );

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

$(document).ready(function(){
    var canvas = document.getElementById("app-canvas");
    var main = new WGH.modules.Main(canvas);
});