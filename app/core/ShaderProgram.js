WGH.core.ShaderProgram = (function() {

    var SHADERS_PATH = "app/shaders/";
    var FRAGMENT_TYPE_PREFIX = "fragment";
    var VERTEX_TYPE_PREFIX = "vertex";
    var GLShaderProgram;
    var GL;
    var shaders;
    var attributes;
    var uniforms;

    var ShaderProgram = function () {
        GL = WGH.core.GL.getInstance();
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

                    var info = GL.getShaderInfoLog(shader);
                    return info;
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
                throw new Error("Could not initialize shaders");
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