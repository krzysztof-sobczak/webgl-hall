/**
 * Created by giks on 30.10.14.
 */
WGH.modules.Drawable = (function() {

    var GL;
    var positionBuffer;
    var colorBuffer;
    var normalBuffer;
    var indexBuffer;

    var Drawable = function(primitive) {
        GL = WGH.modules.GL.getInstance();
        positionBuffer = new WGH.modules.VertexBufferObject();
        colorBuffer = new WGH.modules.VertexBufferObject();
        normalBuffer = new WGH.modules.VertexBufferObject();
        indexBuffer = new WGH.modules.IndexBufferObject();

        positionBuffer.init(primitive.getVertices().elements, primitive.getVertices().itemSize, primitive.getVertices().numItems);
        colorBuffer.init(primitive.getColors().elements, primitive.getColors().itemSize, primitive.getColors().numItems);
        normalBuffer.init(primitive.getNormals().elements, primitive.getNormals().itemSize, primitive.getNormals().numItems);
        indexBuffer.init(primitive.getIndices().elements, primitive.getIndices().itemSize, primitive.getIndices().numItems);
    };

    Drawable.prototype = {
        draw: function(shaderProgram, projectionMatrix, modelViewMatrix, state) {

            positionBuffer.bind(shaderProgram.getAttribute("vertexPositionAttribute"));
            normalBuffer.bind(shaderProgram.getAttribute("vertexNormalAttribute"));
            colorBuffer.bind(shaderProgram.getAttribute("vertexColorAttribute"));
            indexBuffer.bind();

            var normalMatrix = mat3.create();
            mat3.fromMat4(normalMatrix, modelViewMatrix);
            mat3.invert(normalMatrix, normalMatrix);
            mat3.transpose(normalMatrix, normalMatrix);

            shaderProgram.setUniformMatrix4("pMatrixUniform", projectionMatrix);
            shaderProgram.setUniformMatrix4("mvMatrixUniform", modelViewMatrix);
            shaderProgram.setUniformMatrix3("nMatrixUniform", normalMatrix);

            shaderProgram.setUniformValue("materialShininessUniform", state.materialShininess);

            shaderProgram.setUniformVector3("ambientColorUniform", state.ambientLight);
            shaderProgram.setUniformVector3("pointLightingLocationUniform", state.lightPosition);
            shaderProgram.setUniformVector3("pointLightingSpecularColorUniform", state.specularLight);
            shaderProgram.setUniformVector3("pointLightingDiffuseColorUniform", state.diffuseLight);

            GL.drawElements(GL.TRIANGLES, indexBuffer.numItems, GL.UNSIGNED_SHORT, 0);
        }
    };

    return Drawable;
} () );