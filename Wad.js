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
			init: function ( selector ) {

                  // ���������� 0, '', nulll, undefined
                  if ( !selector ) return this;

                  // ���Ԫ��, ���� this 
                  // push.apply( this, Wad.select( selector ));
                  if ( typeof selector === 'string' ) {
                  // ѡ���� �� html �ַ���
                  // '   <div></div>'
                  // ��һ���ǿհ��ַ�, ����� < ��ô���Ǳ�ǩ, �������ѡ����
                  // 1> trim, charAt( 0 ) == '<'
                  // 2> ������ʽ
                  // var r = /^\s*</; // ƥ���һ���ǿհ��ַ�Ϊ < ��������ʽ
                        if ( /^\s*</.test( selector ) ) {
                        // html ��ʽ���ַ���
                        push.apply( this, Wad.parseHTML( selector ));
                        } else {
                        // ѡ����
                        push.apply( this, Wad.select( selector ));
                        }
                      return this;
                    }
            
				// dom
				if ( selector.nodeType ) {
					// ���� dom Ԫ��ת���� Wad ����
					this[ 0 ] = selector;
					this.length = 1;
					return this;
				}

				// Wad
				if ( selector.constructor == Wad ) {
				   // return selector; // �ڿ�����û���κ�����

				   // ���� this , ������Ҫ���� selector ����һ���µ� Wad ����
				   push.apply( this, selector );
				   return this;
				}
				//�ж��ǲ��� dom Ԫ��  ��Ϊ֮�� dom Ԫ�زŻ��� nodetype����
				if ( selector.nodeType ) {
					//�����dom seleα���� ��ֵ�� ʵ��this �� ����this[0]��
					this[ 0 ] = selector;
					this.length = 1;
					return this;
				}
				//�ж� �ǲ��� jq ����
				// ���ʵ���� �������� F ��ô����������F��ʵ��
				if ( selector.constructor = Wad ) {
					// �� α���� ���� ������ӵ� ʵ��this ��
					push.apply( this, selector );
					return this;
				}
				//�ж��ǲ��ǵ�һ�� ����
				if ( typeof selector == "function" ) {
					//�������һ�� ���� ���� ���� ���Ǿ���Ҫ �������ִ�У��������� ��Դ�������
					//ֻ������ �����ڵ� ���� �Ų���������� jq �� �������� window.load ������ ������
					//���� ���һ���¼� ���ܽ��  ������Ҫ�� ���
					window.addEventListener( "load", selector );
				}				
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
				if ( typeof obj == "string" || typeof obj == "function" ){
					return false;
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
				// ��ƽ������
                return newArr.concat.apply( [], newArr );
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
                //var iobj = this.constructor();
                //var dom = this.get( 0 );
                //iobj[ 0 ] = dom;
                //iobj.length = 1;
                //return iobj;
				return this.eq( 0 );
            },
			eq: function ( index ){
				//��ö��󣬲�����Wad����
				var iobj = this.constructor( );
				if ( index == null ) return iobj;
				var dom = this.get( index );
				if ( dom ){
					iobj[ 0 ] = dom;
                    iobj.length = 1; // ���� iobj ��һ��α����, �� Ԫ�غ�Ӧ�ó��� +1
				}
				return iobj;
			},
			last: function ( index ) {
				return this.eq( -1 );
			},
			pushStask: function( array ){
				// this ��ǰ�� Itcast ����
                // ջ�ṹ
                var tmp = this.constructor();
                push.apply( tmp , array );
                tmp.prevObject = this;
                return tmp;				
			},
			end: function (){
				return  this.prevObject || this.constructor();
			}
		});
		
	
	
	window.Wad = window.W = Wad;
})( window );