/**
 * Created by giks on 30.10.14.
 */
WGH.textures.Texture = (function() {

    var instance;
    var GL;
    var assetPath = "assets/textures/nehe.gif";
    var texture;

    var Texture = function() {
        GL = WGH.core.GL.getInstance();
    };

    Texture.prototype = {
        init: function() {
            var texture = GL.createTexture();
            texture.image = new Image();
            var self = this;
            texture.image.onload = function() {
                self.handleLoadedTexture(texture);
            };
            texture.image.onerror = function(message) {
                console.log(message);
            };

            texture.image.src = assetPath;
        },
        handleLoadedTexture: function(texture) {
            GL.bindTexture(GL.TEXTURE_2D, texture);
            GL.pixelStorei(GL.UNPACK_FLIP_Y_WEBGL, true);
            GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, texture.image);
            GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.NEAREST);
            GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.NEAREST);
            GL.bindTexture(GL.TEXTURE_2D, null);
        },
        getTexture: function() {
            return texture;
        }
    };

    function createInstance() {
        instance = new Texture();
        instance.init();
    }

    return {
        getInstance: function () {
            if (!instance) {
                createInstance();
            }
            return instance;
        }
    };
} () );