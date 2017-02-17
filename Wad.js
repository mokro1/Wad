(function ( window ) {
	var arr = [],
	    push = arr.push,
		slice = arr.slice;
		
		//对外公开的函数，原型和构造函数相同，而且constructor 也是该函数
		//因此Wad （--12.17--）也是构造函数
		function Wad ( selector ) {
			return new Wad.fn.init( selector );
		}
		
	    //原型的设置（ 核心成员 ）
		Wad.fn = Wad.prototype = {
			constructor: Wad,
			length:0,
			init: function ( selector ){
				//如果传入的是 0，''，null,undefined
				if ( !selector ) return this;
				
				//获取元素，设置this
				push.apply( this , Wad.select( selector ) );
				
			}	
		};
		//共享原型
		Wad.fn.init.prototype = Wad.fn;
		
		//添加了扩展的方法
		Wad.extend = Wad.fn.extend = function ( obj ) {
			for ( var k in obj ){
			    this[k] = obj[k];
			}
			return this;
		}
		
		
		//写好工具方法，静态方法
		Wad.extend({
			//获取元素的函数
		    select: function ( selector ) {
				return document.querySelectorAll( selector );
			},
			//判断传入的对象是否是数组或者伪数组
			isArrayLike: function ( obj ) {
				if ( object.prototype.tostring.call( obj ) == '[object Array]') {
					return true;
				}
				var length = 'length' in obj && obj.length;
				return typeof length === 'number' && length >= 0;
			},
			
			//each方法函数
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
			
			//map的方法函数
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
		
		
		//写好核心方法，实例方法（遍历有关的方法）
		Wad.fn.extend({
			each: function ( callback ) {
				return Wad.each( this , callback );
			}, 
			map: function ( callback ) {
				return Wad.map( this , callback );
			}	
		});
		
		//写好核心方法，实例方法（数组有关的方法）
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