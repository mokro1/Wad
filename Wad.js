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
			init: function ( selector ) {

                  // 传入的如果是 0, '', nulll, undefined
                  if ( !selector ) return this;

                  // 获得元素, 设置 this 
                  // push.apply( this, Wad.select( selector ));
                  if ( typeof selector === 'string' ) {
                  // 选择器 或 html 字符串
                  // '   <div></div>'
                  // 第一个非空白字符, 如果是 < 那么就是标签, 否则就是选择器
                  // 1> trim, charAt( 0 ) == '<'
                  // 2> 正则表达式
                  // var r = /^\s*</; // 匹配第一个非空白字符为 < 的正则表达式
                        if ( /^\s*</.test( selector ) ) {
                        // html 格式的字符串
                        push.apply( this, Wad.parseHTML( selector ));
                        } else {
                        // 选择器
                        push.apply( this, Wad.select( selector ));
                        }
                      return this;
                    }
            
				// dom
				if ( selector.nodeType ) {
					// 将该 dom 元素转换成 Wad 对象
					this[ 0 ] = selector;
					this.length = 1;
					return this;
				}

				// Wad
				if ( selector.constructor == Wad ) {
				   // return selector; // 在课堂中没有任何问题

				   // 保留 this , 但是需要利用 selector 构造一个新的 Wad 对象
				   push.apply( this, selector );
				   return this;
				}
				//判断是不是 dom 元素  因为之后 dom 元素才会有 nodetype属性
				if ( selector.nodeType ) {
					//把这个dom sele伪数组 赋值个 实例this 上 存在this[0]上
					this[ 0 ] = selector;
					this.length = 1;
					return this;
				}
				//判断 是不是 jq 对象
				// 如果实例的 构造器是 F 那么这个对象就是F的实例
				if ( selector.constructor = Wad ) {
					// 把 伪数组 对象 依次添加到 实例this 中
					push.apply( this, selector );
					return this;
				}
				//判断是不是第一个 函数
				if ( typeof selector == "function" ) {
					//如果传入一个 参数 就是 函数 我们就需要 让他最后执行，把其他的 资源加载完毕
					//只有这样 函数内的 调用 才不会出错，所以 jq 中 把它当成 window.load 来处理 ，所以
					//我们 添加一个事件 就能解决  我们需要的 情况
					window.addEventListener( "load", selector );
				}				
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
				if ( typeof obj == "string" || typeof obj == "function" ){
					return false;
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
				// 扁平化处理
                return newArr.concat.apply( [], newArr );
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
                //var iobj = this.constructor();
                //var dom = this.get( 0 );
                //iobj[ 0 ] = dom;
                //iobj.length = 1;
                //return iobj;
				return this.eq( 0 );
            },
			eq: function ( index ){
				//获得对象，并构造Wad对象
				var iobj = this.constructor( );
				if ( index == null ) return iobj;
				var dom = this.get( index );
				if ( dom ){
					iobj[ 0 ] = dom;
                    iobj.length = 1; // 由于 iobj 是一个伪数组, 在 元素后应该长度 +1
				}
				return iobj;
			},
			last: function ( index ) {
				return this.eq( -1 );
			},
			pushStask: function( array ){
				// this 以前的 Itcast 对象
                // 栈结构
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