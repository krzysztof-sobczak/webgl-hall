/**
 * Created by giks on 30.10.14.
 */
WGH.modules.Primitive = (function () {

    var vertices;
    var normals;
    var colors;
    var indices;

    var Primitive = function() {
        vertices = null;
        normals = null;
        colors = null;
        indices = null;
    };

    Primitive.prototype = {
        getVertices: function() {
            return vertices;
        },
        getNormals: function() {
            return normals;
        },
        getColors: function() {
            return colors;
        },
        getIndices: function() {
            return indices;
        }
    };

} ());
