// 必须先加载 core 再加载 dom
// 在此文件中 Wad 的相关核心内容可以直接使用
(function ( window ) {

var arr = [],
    push = arr.push,
    slice = arr.slice;

// extend
Wad.parseHTML = function ( html ) {
          
    // 1, 准备容器
    var  div = document.createElement( 'div' );
    // 2, 设置 innerHTML
    div.innerHTML = html;
    // 3, 取出来( 数组 )
    // return div.childNodes;
    var arr = [];
    for ( var i = 0; i < div.childNodes.length; i++ ) {
        arr.push( div.childNodes[ i ] );
    }
    return arr;  
};

// 简单优化
    Wad.fn.appendTo = function ( arr ) {
        // this, 是伪数组, 要加的是 this[ 0 ]
        // 将其加到 arr[ i ] 中
        var tmp = [], tmpNode;
        for ( var j = 0; j < this.length; j++ ) {
            for ( var i = 0; i < arr.length; i++ ) {
                tmpNode = i == arr.length - 1 ? this[ j ] : this[ j ].cloneNode( true );
                tmp.push( tmpNode );
                arr[ i ].appendChild( tmpNode );
            }
        }
        return tmp; // 最终要返回的是 Wad 对象
    }



})( window );