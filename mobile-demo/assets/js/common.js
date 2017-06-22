/* !
 *  Autoplus公用类
 *  author: lingweifeng
 *  date: 2016-11-06 
 */

// Autoplus公用类
var Ap = {

	// 屏幕适配
	_resize: function(){
		var wW = $(window).width();
		//if( wW < 640 )
		$('html').css( 'fontSize', 20*wW/375 );
	},

	// 2017-01-01 15:33:22
	getNowFormatDate: function() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                + " " + date.getHours() + seperator2 + date.getMinutes()
                + seperator2 + date.getSeconds();
        return currentdate;
    },

    // 单选按钮样式
    radioButtonInit: function(){
    	$(document).on( 'click', '.switch>label', function(){
    		if( !$(this).hasClass( 'active' ) ){
    			$(this).addClass( 'active' ).siblings( 'label' ).removeClass( 'active' );
    		}
    	});
    },
    // 单选按钮样式
    radioSwitchInit: function(){
   		$(document).on( 'click', '.radio-input', function(){
			
			var values = [];
			var $radios = $(this).find( '[type="radio"]' );
			$radios.each(function(){
				values.push( parseInt($(this).val()) );
			});
			this.values = values;
			var $wrap = $(this).parent( '.radio-wrap' );
			if( $wrap.hasClass( 'left' ) ){
				$wrap.removeClass( 'left' ).addClass( 'right' );
				$radios.eq(1).prop( 'checked', true );
				$radios.eq(0).prop( 'checked', false );
			}else{
				$wrap.removeClass( 'right' ).addClass( 'left' );
				this.val = this.values[0];
				$radios.eq(0).prop( 'checked', true );
				$radios.eq(1).prop( 'checked', false );
			}
		});
	},
    // tab
    tabInit: function(){
    	$(document).on( 'click', '.tabhead>a', function(){
    		var $content = $( $(this).attr( 'href' ) );
    		if( !$(this).hasClass( 'active' ) ){
    			$(this).addClass( 'active' ).siblings( 'a' ).removeClass( 'active' );
    			$content.show().siblings( '.tabcontent' ).hide();
    		}
    		return false;
    	});
    },

    // form-close
    formClearInit: function(){
    	$(document).on( 'click', '.input-clear', function(){
    		var $input = $(this).siblings( 'input' );
    		$input.val( '' );
    		return false;
    	});
    },

	// show mask
	showMask: function(fn){
		var callback = ( $.isFunction(fn) && fn ) ? fn : $.noop;
		if( $('body>.mask').length == 0 ) $( 'body' ).append( '<div class="mask" data-pop-hidepop></div>' );
		$( 'body' ).addClass( 'overflow-hidden' );
		$('body>.mask').height( $(document).height() ).show();
		callback.call( this );
		$( 'body>.mask' )[0].addEventListener( 'touchmove', function (e) {
	        e.preventDefault();
	    }, false);
	},
	// hide mask
	hideMask: function(){
		if( $( 'body>.mask').length > 0 ){
			$( 'body>.mask').hide();
			$( 'body' ).removeClass( 'overflow-hidden' );
		}
	},
	Msg: function( txt, time, fn ){
	    var callback = ( $.isFunction(fn) && fn ) ? fn : $.noop;
		if( $( '#Msg' ).length == 0 ){
			$( 'body' ).append( '<div id="Msg" class="msg"><span class="mask"></span><span class="content"></span></div>' );
		}
		var $alert = $( '#Msg' );
		$alert.find( '.content' ).text( txt );
		$alert.show().find( '.mask' ).show();
		$alert.show().addClass( 'bounceIn animated' );
		var time = time || 1000;
		// 动画
		setTimeout( function(){
			$alert.hide();
	        callback.call( this );
		}, time );
	},

	Alert: function( txt, fn ){
	    var callback = ( $.isFunction(fn) && fn ) ? fn : $.noop;
	    if( $( '#Alert' ).length == 0 ){
	        $( 'body' ).append( '<div id="Alert" class="alert">'+
			    '<div class="alert-title">提示</div>'+
			    '<div class="alert-main"></div>'+
			    '<div class="alert-footer">'+
			    '<button class="btn btn-orange btn-round btn-block btn-shadow btn-alert" type="button">确定</button>'+
			    '</div>'+
			    '</div>' );
	    };
	    function closeAlert(){
	        $( '#Alert' ).remove();
	        Ap.hideMask();
	    };
	    this.showMask();
	    $( '#Alert' ).show().addClass( 'bounceIn animated' ).find( '.alert-main' ).text( txt );
	    // 确定
	    $(document).on( 'click', '.btn-alert', function(){
	        closeAlert();
	        callback.call( this );
	    });
	    // 关闭
	    $(document).on( 'click', '.alert-close', function(){
	        closeAlert();
	    });
	},
	Confirm: function( txt, fn, noTxt, okTxt ){
	    var callback = ( $.isFunction(fn) && fn ) ? fn : $.noop,
	    	noTxt = noTxt || '取消',
	    	okTxt = okTxt || '确定';
	    if( $( '#Confirm' ).length == 0 ){
	        $( 'body' ).append( '<div id="Confirm" class="confirm">'+
			    '<div class="confirm-main"></div>'+
			    '<div class="confirm-footer">'+
			    '<button class="btn btn-cancel" type="button"></button>'+
			    '<button class="btn btn-confirm btn-orange" type="button"></button>'+
			    '</div>'+
			    '</div>' );
	    };
	    function closeConfirm(){
	        $( '#Confirm' ).remove();
	        Ap.hideMask();
	    };
	    this.showMask();
	    $( '#Confirm' ).show().addClass( 'bounceIn animated' ).find( '.confirm-main' ).text( txt );
	    $( '#Confirm' ).find( '.btn-cancel' ).text( noTxt ).siblings( '.btn-confirm' ).text( okTxt );
	    // 确定
	    $(document).on( 'click', '.btn-confirm', function(){
	        closeConfirm();
	        callback.call( this );
	    });
	    // 关闭
	    $(document).on( 'click', '.btn-cancel', function(){
	        closeConfirm();
	    });
	},
	// pop
	showModal: function( $obj, fn ){
		var callback = ( $.isFunction(fn) && fn ) ? fn : $.noop;
		var scrollTop = $(window).scrollTop();
		var wH = $(window).height();
		this.showMask();
		$obj.css( 'top', wH/2 + scrollTop ).show();
		// 弹窗禁止滚动
		$obj[0].addEventListener( 'touchmove', function (e) {
	        e.preventDefault();
	    }, false);
	    /*$( '.mask' )[0].addEventListener( 'touchmove', function (e) {
	        e.preventDefault();
	    }, false);*/
		callback.call( this );
	},
	// pop
	hideModal: function( fn ){
		var callback = ( $.isFunction(fn) && fn ) ? fn : $.noop;
		$('.modal').hide();
		Ap.hideMask();
		callback.call( this );
	},
	// 初始化
	init: function(){
		
		var self = this;

		// 屏幕自适应
		self._resize();

		// 单选按钮组件
		self.radioButtonInit();
		
		self.radioSwitchInit();

		// tabinit
		self.tabInit();

		// input clear
		self.formClearInit();

		// 显示弹窗
		$(document).on( 'click', '[data-modal-target]', function(){

			var $modal = $( $(this).data( 'modal-target' ) );
			self.showModal( $modal );			
			return false;
		});

		// 关闭弹窗
		$(document).on( 'click', '[data-modal-close]', function(){
			var $modal = $(this).closest( '.modal' );
			self.hideModal( $modal );
			return false;
		});

		// input style
		$(document).on( 'click', '.form-block>label', function(){
			var $formitem = $(this).siblings( '.txtinput' );
			$(this).hide();
			$formitem.focus();
		});
		$(document).on( 'blur', '.form-block>.txtinput', function(){
			var $label = $(this).siblings( 'label' ),
				val = $(this).val();
			if( val == '' ) $label.show();
		});
		
		// bootstrap datepicker
		if ( $().datepicker) {
	        $('.date-picker').datepicker({
	            language:"zh-CN",
	            rtl: 'left',
	            autoclose: true
	        });
	    };
	}

};

$(function(){
	// fast click
    FastClick.attach(document.body);  
	//初始化
	Ap.init();
});
