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

// ���Ż�
    Wad.fn.appendTo = function ( arr ) {
        // this, ��α����, Ҫ�ӵ��� this[ 0 ]
        // ����ӵ� arr[ i ] ��
        var tmp = [], tmpNode;
        for ( var j = 0; j < this.length; j++ ) {
            for ( var i = 0; i < arr.length; i++ ) {
                tmpNode = i == arr.length - 1 ? this[ j ] : this[ j ].cloneNode( true );
                tmp.push( tmpNode );
                arr[ i ].appendChild( tmpNode );
            }
        }
        return tmp; // ����Ҫ���ص��� Wad ����
    }



})( window );