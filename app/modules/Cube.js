/**
 * Created by giks on 30.10.14.
 */
WGH.modules.Cube = (function() {

    var vertices;
    var normals;
    var colors;
    var indices;

    var Cube = function() {

        vertices = {
            elements: [
                // Front face
                -1.0, -1.0, 1.0,
                1.0, -1.0, 1.0,
                1.0, 1.0, 1.0,
                -1.0, 1.0, 1.0,

                // Back face
                -1.0, -1.0, -1.0,
                -1.0, 1.0, -1.0,
                1.0, 1.0, -1.0,
                1.0, -1.0, -1.0,

                // Top face
                -1.0, 1.0, -1.0,
                -1.0, 1.0, 1.0,
                1.0, 1.0, 1.0,
                1.0, 1.0, -1.0,

                // Bottom face
                -1.0, -1.0, -1.0,
                1.0, -1.0, -1.0,
                1.0, -1.0, 1.0,
                -1.0, -1.0, 1.0,

                // Right face
                1.0, -1.0, -1.0,
                1.0, 1.0, -1.0,
                1.0, 1.0, 1.0,
                1.0, -1.0, 1.0,

                // Left face
                -1.0, -1.0, -1.0,
                -1.0, -1.0, 1.0,
                -1.0, 1.0, 1.0,
                -1.0, 1.0, -1.0
            ],
            itemSize: 3,
            numItems: 24
        };

        normals = {
            elements: [
                // Front face
                0.0, 0.0, 1.0,
                0.0, 0.0, 1.0,
                0.0, 0.0, 1.0,
                0.0, 0.0, 1.0,

                // Back face
                0.0, 0.0, -1.0,
                0.0, 0.0, -1.0,
                0.0, 0.0, -1.0,
                0.0, 0.0, -1.0,

                // Top face
                0.0, 1.0, 0.0,
                0.0, 1.0, 0.0,
                0.0, 1.0, 0.0,
                0.0, 1.0, 0.0,

                // Bottom face
                0.0, -1.0, 0.0,
                0.0, -1.0, 0.0,
                0.0, -1.0, 0.0,
                0.0, -1.0, 0.0,

                // Right face
                1.0, 0.0, 0.0,
                1.0, 0.0, 0.0,
                1.0, 0.0, 0.0,
                1.0, 0.0, 0.0,

                // Left face
                -1.0, 0.0, 0.0,
                -1.0, 0.0, 0.0,
                -1.0, 0.0, 0.0,
                -1.0, 0.0, 0.0
            ],
            itemSize: 3,
            numItems: 24
        };

        colors = {
            elements: [
                1.0, 0.0, 0.0, 1.0, // Front face
                1.0, 0.0, 0.0, 1.0, // Front face
                1.0, 0.0, 0.0, 1.0, // Front face
                1.0, 0.0, 0.0, 1.0, // Front face
                1.0, 1.0, 0.0, 1.0, // Back face
                1.0, 1.0, 0.0, 1.0, // Back face
                1.0, 1.0, 0.0, 1.0, // Back face
                1.0, 1.0, 0.0, 1.0, // Back face
                0.0, 1.0, 0.0, 1.0, // Top face
                0.0, 1.0, 0.0, 1.0, // Top face
                0.0, 1.0, 0.0, 1.0, // Top face
                0.0, 1.0, 0.0, 1.0, // Top face
                1.0, 0.5, 0.5, 1.0, // Bottom face
                1.0, 0.5, 0.5, 1.0, // Bottom face
                1.0, 0.5, 0.5, 1.0, // Bottom face
                1.0, 0.5, 0.5, 1.0, // Bottom face
                1.0, 0.0, 1.0, 1.0, // Right face
                1.0, 0.0, 1.0, 1.0, // Right face
                1.0, 0.0, 1.0, 1.0, // Right face
                1.0, 0.0, 1.0, 1.0, // Right face
                0.0, 0.0, 1.0, 1.0,  // Left face
                0.0, 0.0, 1.0, 1.0,  // Left face
                0.0, 0.0, 1.0, 1.0,  // Left face
                0.0, 0.0, 1.0, 1.0  // Left face
            ],
            itemSize: 4,
            numItems: 24
        };

        indices = {
            elements: [
                0, 1, 2,      0, 2, 3,    // Front face
                4, 5, 6,      4, 6, 7,    // Back face
                8, 9, 10,     8, 10, 11,  // Top face
                12, 13, 14,   12, 14, 15, // Bottom face
                16, 17, 18,   16, 18, 19, // Right face
                20, 21, 22,   20, 22, 23  // Left face
            ],
            itemSize: 1,
            numItems: 36
        };
    };

    Cube.prototype = {
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

    return Cube;

} () );