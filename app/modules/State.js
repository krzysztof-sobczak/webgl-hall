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