;(function($, window, document,undefined) {
	"use strict";
    //定义Beautifier的构造函数
    var Beautifier = function(ele, opt) {
        this.$element = ele,
        this.defaults = {
            'color': 'red',
            'fontSize': '12px',
            'textDecoration': 'none'
        },
        this.options = $.extend({}, this.defaults, opt)
    }
    //定义Beautifier的方法
    Beautifier.prototype = {
        beautify: function() {
            return this.$element.css({
                'color': this.options.color,
                'fontSize': this.options.fontSize,
                'textDecoration': this.options.textDecoration
            });
        }
    }
    //在插件中使用Beautifier对象
    $.fn.Beautifier = function(options) {
        //创建Beautifier的实体
        var beautifier = new Beautifier(this, options);
        //调用其方法
        return beautifier.beautify();
    }

    
    /*提示信息 按钮返回
     默认参数是*/
    //定义Dialog的构造函数
 //    $('.vp-dialog-trigger').click(function(event) {
	// 	var ta = this.getAttribute('dialog-target');
	// 	$('.vp-dialog[dialog-target="'+ta+'"]').fadeIn();
	// });
	// $('.vp-dialog .btn-dialog-close').click(function(event) {
	// 	event.stopPropagation();
	// 	$('.vp-dialog').fadeOut();
	// });
    var Dialog = function(ele, opt, content) {
    	//定义基本常用class
    	this.dom = {
    		'container':'vp-dialog',
    		'content':'vp-content',
    		'target':'dialog-target',
    		'closeIcon':'nc-icon-outline ui-1_simple-remove',
    		'closeClass' : 'btn-dialog-close'
    	},
        this.$element = ele,
        this.defaults = {
            'height': '300px',
            'fontSize': '18px',
            'textDecoration': 'none'
        },
        this.options = $.extend({}, this.defaults, opt, content)
        this.dom = $.extend([], this.dom)
    }
    //定义Dialog的方法
    Dialog.prototype = {
    	init: function () {
    		this.open();
    		this.close();
    		var html = '<div class="'+ this.dom.container +'"><i class="'+ this.dom.closeIcon + this.dom.closeClass +' "></i><p class="'+ this.dom.content +'"></p><div class="btn-group clearfloat"><a class="ic-btn ic-btn-brown width150 pull-left btn-dialog-close">取消</a><a class="ic-btn ic-btn-brown width150 pull-right ic-chapter-unlocked">确认</a></div></div>';
    		// this.style();
    		// this.inner();
    	},
    	
        style: function() {
            return this.$element.css({
                'height': this.options.height,
                'fontSize': this.options.fontSize,
                'textDecoration': this.options.textDecoration
            });
        },
        inner: function () {
        	console.log(this.content);
        	console.log(this.dom);
        	// var target = this.getAttribute(this.dom.target);
        	// return $('.vp-dialog[dialog-target="'+target+'"]').find('p').html(this.content);
        },
        open: function () {
        	this.$element.on('click', this.$element, function(event) {
        		event.preventDefault();
        		console.log(this.dom);
        		// var target = this.getAttribute(this.dom.target);
        		// $('.vp-dialog[dialog-target="'+target+'"]').fadeIn();
        	});
        },
        close: function () {
	    	$('.vp-dialog .btn-dialog-close').click(function(event) {
				event.stopPropagation();
				$('.vp-dialog').fadeOut();
			});
        }
    }
    
    //在插件中使用dialog对象
    $.fn.vpdialog = function(options,content) {
        //创建dialog的实体
        var dialog = new Dialog(this, options, content);
        //调用其方法
        return dialog.init();
    }
})(jQuery, window, document);