/**
 * Created by giks on 30.10.14.
 */
WGH.core.VertexBufferObject = (function() {

    var GL;

    var VertexBufferObject = function() {
        GL = WGH.core.GL.getInstance();
        this.buffer = GL.createBuffer();
        this.itemSize = null;
        this.numItems = null;
    };

    VertexBufferObject.prototype = {
        init: function(elements, _itemSize, _numItems) {
            this.itemSize = _itemSize;
            this.numItems = _numItems;
            GL.bindBuffer(GL.ARRAY_BUFFER, this.buffer);
            GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(elements), GL.STATIC_DRAW);
        },
        bind: function(attribute) {
            GL.bindBuffer(GL.ARRAY_BUFFER, this.buffer);
            GL.vertexAttribPointer(attribute, this.itemSize, GL.FLOAT, false, 0, 0);
        }
    };

    return VertexBufferObject;

} () );