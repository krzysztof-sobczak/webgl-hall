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