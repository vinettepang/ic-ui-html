;(function ($, window, document,undefined) {
	"use strict";
	$('.vp-dialog-trigger').click(function(event) {
		event.stopPropagation();
		$('.vp-dialog[dialog-target="'+this.getAttribute('dialog-target')+'"]').fadeIn();
	});
	$('.vp-dialog').on('click', '.btn-dialog-close', function(event) {
		event.stopPropagation();
		$('.vp-dialog').fadeOut();
		return false;
	});
})(jQuery, window, document)