/**
 * Created by giks on 30.10.14.
 */
WGH.objects.Drawable = (function() {

    var GL;
    var positionBuffer;
    var colorBuffer;
    var normalBuffer;
    var indexBuffer;

    var Drawable = function(primitive) {
        GL = WGH.core.GL.getInstance();
        positionBuffer = new WGH.core.VertexBufferObject();
        colorBuffer = new WGH.core.VertexBufferObject();
        textureBuffer = new WGH.core.VertexBufferObject();
        normalBuffer = new WGH.core.VertexBufferObject();
        indexBuffer = new WGH.core.IndexBufferObject();

        positionBuffer.init(primitive.getVertices().elements, primitive.getVertices().itemSize, primitive.getVertices().numItems);
        colorBuffer.init(primitive.getColors().elements, primitive.getColors().itemSize, primitive.getColors().numItems);
        textureBuffer.init(primitive.getTexture().elements, primitive.getTexture().itemSize, primitive.getTexture().numItems);
        normalBuffer.init(primitive.getNormals().elements, primitive.getNormals().itemSize, primitive.getNormals().numItems);
        indexBuffer.init(primitive.getIndices().elements, primitive.getIndices().itemSize, primitive.getIndices().numItems);
    };

    Drawable.prototype = {
        draw: function(shaderProgram, projectionMatrix, modelViewMatrix, state) {

            positionBuffer.bind(shaderProgram.getAttribute("vertexPositionAttribute"));
            normalBuffer.bind(shaderProgram.getAttribute("vertexNormalAttribute"));
            colorBuffer.bind(shaderProgram.getAttribute("vertexColorAttribute"));
            textureBuffer.bind(shaderProgram.getAttribute("textureCoordAttribute"));
            indexBuffer.bind();

            var texture = WGH.textures.Texture.getInstance().getTexture();
            GL.activeTexture(GL.TEXTURE0);
            GL.bindTexture(GL.TEXTURE_2D, texture);
            GL.uniform1i(shaderProgram.getUniforms()["samplerUniform"], 0);

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