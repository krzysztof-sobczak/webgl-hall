WGH.core.GL = (function() {

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