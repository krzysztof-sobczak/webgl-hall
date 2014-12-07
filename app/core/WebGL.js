WGH.core.WebGL = (function(){

    var GL;
    var shaderProgram;
    var canvas;
    var projectionMatrix;
    var modelViewMatrix;

    var WebGL = function (_canvas) {
        canvas = _canvas;
        GL = WGH.core.GL.createInstance(canvas);
        shaderProgram = new WGH.core.ShaderProgram();
        setShaders();
        projectionMatrix = mat4.create();
        modelViewMatrix = mat4.create();
    };

    function setShaders() {
        shaderProgram.addShader("vertex-shader");
        shaderProgram.addShader("fragment-shader");

        shaderProgram.run();

        shaderProgram.addAttribute("vertexPositionAttribute", "aVertexPosition");
        shaderProgram.addAttribute("vertexNormalAttribute", "aVertexNormal");
        shaderProgram.addAttribute("vertexColorAttribute", "aVertexColor");
        shaderProgram.addAttribute("textureCoordAttribute", "aTextureCoord");

        shaderProgram.addUniform("samplerUniform", "uSampler");
        shaderProgram.addUniform("pMatrixUniform", "uPMatrix");
        shaderProgram.addUniform("mvMatrixUniform", "uMVMatrix");
        shaderProgram.addUniform("nMatrixUniform", "uNMatrix");
        shaderProgram.addUniform("materialShininessUniform", "uMaterialShininess");
        shaderProgram.addUniform("pointLightingLocationUniform", "uPointLightingLocation");
        shaderProgram.addUniform("pointLightingSpecularColorUniform", "uPointLightingSpecularColor");
        shaderProgram.addUniform("pointLightingDiffuseColorUniform", "uPointLightingDiffuseColor");
    }

    WebGL.prototype = {
        draw: function(state) {
            this.drawScene();

            mat4.perspective(projectionMatrix, 45, GL.viewportWidth / GL.viewportHeight, 0.1, 100.0);
            mat4.identity(modelViewMatrix);
            mat4.translate(modelViewMatrix, modelViewMatrix, [state.x, state.y, state.z]);
            mat4.scale(modelViewMatrix, modelViewMatrix, [6.0, 1.0, 6.0]);

            var cubeData = new WGH.objects.Cube();
            var drawableCube = new WGH.objects.Drawable(cubeData);
            drawableCube.draw(shaderProgram, projectionMatrix, modelViewMatrix, state);
        },
        drawScene: function() {
            GL.viewport(0, 0, GL.viewportWidth, GL.viewportHeight);
            GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
        },
        init: function() {
            if (GL) {
                GL.clearColor(0.5, 0.5, 0.5, 1.0);                                 // Set clear color to black, fully opaque
                GL.enable(GL.DEPTH_TEST);                                     // Enable depth testing
                GL.depthFunc(GL.LEQUAL);                                      // Near things obscure far things
                GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);     // Clear the color as well as the depth buffer.

            } else {
                throw new Error("WebGL is not initialized.");
            }
        }
    };

    return WebGL;

} () );