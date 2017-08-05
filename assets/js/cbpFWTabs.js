/**
 * cbpFWTabs.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2014, Codrops
 * http://www.codrops.com
 */
 //left tabs
;( function( window ) {
	
	'use strict';

	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

	function CBPFWTabs( el, options ) {
		this.el = el;
		this.options = extend( {}, this.options );
  		extend( this.options, options );
  		this._init();
	}

	CBPFWTabs.prototype.options = {
		start : 0
	};

	CBPFWTabs.prototype._init = function() {
		// tabs elems
		this.tabs = [].slice.call( this.el.querySelectorAll( 'nav > ul > li' ) );
		// content items
		this.items = [].slice.call( this.el.querySelectorAll( '.content-wrap > section' ) );
		// current index
		this.current = -1;
		// show current content item
		this._show();
		// init events
		this._initEvents();
	};

	CBPFWTabs.prototype._initEvents = function() {
		var self = this;
		this.tabs.forEach( function( tab, idx ) {
			tab.addEventListener( 'click', function( ev ) {
				ev.preventDefault();
				self._show( idx );
			} );
		} );
	};

	CBPFWTabs.prototype._show = function( idx ) {
		if( this.current >= 0 ) {
			this.tabs[ this.current ].className = this.items[ this.current ].className = '';
		}
		// change current
		this.current = idx != undefined ? idx : this.options.start >= 0 && this.options.start < this.items.length ? this.options.start : 0;
		this.tabs[ this.current ].className = 'tab-current';
		this.items[ this.current ].className = 'content-current';
	};

	// add to global namespace
	window.CBPFWTabs = CBPFWTabs;

})( window );


//radiocheck
 +function(a, b) {
    "use strict";
    function c(c) {
        return this.each(function() {
            var e = b(this),
            f = e.data("radiocheck"),
            g = "object" == typeof c && c;
            if (f || "destroy" != c) {
                f || e.data("radiocheck", f = new d(this, g)),
                "string" == typeof c && f[c]();
                var h = /mobile|tablet|phone|ip(ad|od)|android|silk|webos/i.test(a.navigator.userAgent);
                h === !0 && e.parent().hover(function() {
                    e.addClass("nohover")
                },
                function() {
                    e.removeClass("nohover")
                })
            }
        })
    }
    var d = function(a, b) {
        this.init("radiocheck", a, b)
    };
    d.DEFAULTS = {
        checkboxClass: "custom-checkbox",
        radioClass: "custom-radio",
        checkboxTemplate: '<span class="icons"><span class="icon-unchecked"></span><span class="icon-checked"></span></span>',
        radioTemplate: '<span class="icons"><span class="icon-unchecked"></span><span class="icon-checked"></span></span>'
    },
    d.prototype.init = function(a, c, e) {
        this.$element = b(c),
        this.options = b.extend({},
        d.DEFAULTS, this.$element.data(), e),
        "checkbox" == this.$element.attr("type") ? (this.$element.addClass(this.options.checkboxClass), this.$element.after(this.options.checkboxTemplate)) : "radio" == this.$element.attr("type") && (this.$element.addClass(this.options.radioClass), this.$element.after(this.options.radioTemplate))
    },
    d.prototype.check = function() {
        this.$element.prop("checked", !0),
        this.$element.trigger("change.radiocheck").trigger("checked.radiocheck")
    },
    d.prototype.uncheck = function() {
        this.$element.prop("checked", !1),
        this.$element.trigger("change.radiocheck").trigger("unchecked.radiocheck")
    },
    d.prototype.toggle = function() {
        this.$element.prop("checked",
        function(a, b) {
            return ! b
        }),
        this.$element.trigger("change.radiocheck").trigger("toggled.radiocheck")
    },
    d.prototype.indeterminate = function() {
        this.$element.prop("indeterminate", !0),
        this.$element.trigger("change.radiocheck").trigger("indeterminated.radiocheck")
    },
    d.prototype.determinate = function() {
        this.$element.prop("indeterminate", !1),
        this.$element.trigger("change.radiocheck").trigger("determinated.radiocheck")
    },
    d.prototype.disable = function() {
        this.$element.prop("disabled", !0),
        this.$element.trigger("change.radiocheck").trigger("disabled.radiocheck")
    },
    d.prototype.enable = function() {
        this.$element.prop("disabled", !1),
        this.$element.trigger("change.radiocheck").trigger("enabled.radiocheck")
    },
    d.prototype.destroy = function() {
        this.$element.removeData().removeClass(this.options.checkboxClass + " " + this.options.radioClass).next(".icons").remove(),
        this.$element.trigger("destroyed.radiocheck")
    };
    var e = b.fn.radiocheck;
    b.fn.radiocheck = c,
    b.fn.radiocheck.Constructor = d,
    b.fn.radiocheck.noConflict = function() {
        return b.fn.radiocheck = e,
        this
    }
} (this, jQuery);