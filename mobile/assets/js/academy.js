//关闭解锁更多弹窗
mui('body').on('tap', '.ic-dialog-close', function(event) {
	jquery('.ic-dialog').fadeOut();
	return false;
});
//关闭解锁更多弹窗
mui('body').on('tap', '.ic-dialog-btn-close', function(event) {
	jquery('.ic-dialog').fadeOut();
	return false;
});
//打开底部解锁
mui('body').on('tap', '.ic-lockcourse-trigger', function(event) {
	jquery('.ic-lockcourse-trigger').addClass('open');
	jquery('.ic-lock-tips').fadeOut();
	jquery('.ic-lock-bottom').fadeIn();
});
//关闭底部解锁
mui('body').on('tap', '.ic-lock-bottom .close-bottom', function(event) {
	event.stopPropagation();
	jquery('.ic-lockcourse-trigger').removeClass('open');
	jquery('.ic-lock-tips').fadeIn();
	jquery('.ic-lock-bottom').fadeOut();
});
//解锁更多触发弹窗
mui('body').on('tap', '.ic-buycourse-trigger', function(event) {
	var _myCredit = jquery('input[name="myCredit"]').val(),
	_needCredit = jquery('input[name="lockNeedCredit"]').val();
	console.log(_myCredit);
	if (parseInt(_myCredit) >= parseInt(_needCredit)) {
		jquery('.ic-dialog-locked').fadeIn();
	}else{
		jquery('.ic-dialog-buycourse').fadeIn();
	}	
});
(function() {
	if (jquery.cookie('ic_m_ad_site_vip') == null || localStorage.getItem('ic_m_ad_site_vip') == null) {
		jquery('.aca_to_ref_ad').css('display', 'block');
	}
})();
mui('body').on('tap', '.referral_ad_close', function(e) {
	jquery('.aca_to_ref_ad').css('display', 'none');
	jquery.cookie("ic_m_ad_site_vip", "true", {
		expires: 10000,
		path:'/'
	});
	localStorage.setItem("ic_m_ad_site_vip", 'true');
});
