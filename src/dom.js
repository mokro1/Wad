// �����ȼ��� core �ټ��� dom
// �ڴ��ļ��� Wad ����غ������ݿ���ֱ��ʹ��
(function ( window ) {

var arr = [],
    push = arr.push,
    slice = arr.slice;

// extend
Wad.parseHTML = function ( html ) {
          
    // 1, ׼������
    var  div = document.createElement( 'div' );
    // 2, ���� innerHTML
    div.innerHTML = html;
    // 3, ȡ����( ���� )
    // return div.childNodes;
    var arr = [];
    for ( var i = 0; i < div.childNodes.length; i++ ) {
        arr.push( div.childNodes[ i ] );
    }
    return arr;  
};



})( window );