WGH.modules.State = (function() {

    var instance;

    function createInstance() {
        return {
            x : 0.0,
            y : 0.0,
            z : 0.0,
            ambientLight : vec3.fromValues(0.2, 0.2, 0.2),
            diffuseLight : vec3.fromValues(0.8, 0.8, 0.8),
            specularLight : vec3.fromValues(0.8, 0.8, 0.8),
            lightPosition : vec3.fromValues(-10.0, 4.0, -20.0),
            materialShininess : 32.0
        };
    };

    return {

        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }

    };

} () );