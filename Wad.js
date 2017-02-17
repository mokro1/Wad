(function ( window ) {
	var arr = [],
	    push = arr.push,
		slice = arr.slice;
		
		//���⹫���ĺ�����ԭ�ͺ͹��캯����ͬ������constructor Ҳ�Ǹú���
		//���Wad ��--12.17--��Ҳ�ǹ��캯��
		function Wad ( selector ) {
			return new Wad.fn.init( selector );
		}
		
	    //ԭ�͵����ã� ���ĳ�Ա ��
		Wad.fn = Wad.prototype = {
			constructor: Wad,
			length:0,
			init: function ( selector ){
				//���������� 0��''��null,undefined
				if ( !selector ) return this;
				
				//��ȡԪ�أ�����this
				push.apply( this , Wad.select( selector ) );
				
			}	
		};
		//����ԭ��
		Wad.fn.init.prototype = Wad.fn;
		
		//�������չ�ķ���
		Wad.extend = Wad.fn.extend = function ( obj ) {
			for ( var k in obj ){
			    this[k] = obj[k];
			}
			return this;
		}
		
		
		//д�ù��߷�������̬����
		Wad.extend({
			//��ȡԪ�صĺ���
		    select: function ( selector ) {
				return document.querySelectorAll( selector );
			},
			//�жϴ���Ķ����Ƿ����������α����
			isArrayLike: function ( obj ) {
				if ( object.prototype.tostring.call( obj ) == '[object Array]') {
					return true;
				}
				var length = 'length' in obj && obj.length;
				return typeof length === 'number' && length >= 0;
			},
			
			//each��������
			each: function( arr , callback ) {
				if ( Wad.isArrayLike( arr ) ) {
				    for ( var i ; i < arr.length ; i++ ){
				  	   if ( callback.call( arr[i] , i , arr[i] ) == false ) break;
			     	}
				}else{
					for ( var k in arr ) {
					   if ( callback.call( arr[i] , i , arr[i] ) == false ) break;
					}
				}
				return arr;
			},
			
			//map�ķ�������
			map: function ( arr , callback ) {
				var newArr = [] ,tmp;
				if ( Wad.isArrayLike( arr ) ) {
					for( var i ; i < arr.length ; i++ ){
						tmp = callback ( arr[i], i );
						if ( tmp != null ) {
							newArr.push(tmp);
						}
					}
				}else{
					for( var k in arr ){
						tmp = callback ( arr[k] , k );
						if ( tmp != null ) {
							newArr.push(tmp);
						}
					}
				}
				return newArr;
			},
	    });
		
		
		//д�ú��ķ�����ʵ�������������йصķ�����
		Wad.fn.extend({
			each: function ( callback ) {
				return Wad.each( this , callback );
			}, 
			map: function ( callback ) {
				return Wad.map( this , callback );
			}	
		});
		
		//д�ú��ķ�����ʵ�������������йصķ�����
		Wad.fn.extend({
		    toArray: function () {
				return slice.call( this );
			},	
			get: function ( index ) {
				if ( index == undefined ){
					return this.toArray;
				}
				if ( index < 0 ) {
					return this[ this.length + index ];
				}else{
					return this[ index ];
				}
			},
			first: function (  ) {
                var iobj = this.constructor();
                var dom = this.get( 0 );
                iobj[ 0 ] = dom;
                iobj.length = 1;
                return iobj;
            }
		});
		
	
	
	window.Wad = window.W = Wad;
})( window );