/**
 * Created by giks on 30.10.14.
 */
WGH.modules.IndexBufferObject = (function() {

    var GL;

    var IndexBufferObject = function() {
        GL = WGH.modules.GL.getInstance();
        this.buffer = GL.createBuffer();
        this.itemSize = null;
        this.numItems = null;
    };

    IndexBufferObject.prototype = {
        init: function(elements, _itemSize, _numItems) {
            this.itemSize = _itemSize;
            this.numItems = _numItems;
            GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this.buffer);
            GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Uint16Array(elements), GL.STATIC_DRAW);
        },
        bind: function() {
            GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this.buffer);
        }
    };

    return IndexBufferObject;

} () );