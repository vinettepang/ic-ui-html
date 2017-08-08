var menu = null,
	main = null;
var showMenu = false;
mui.init({
	swipeBack: true,
	statusBarBackground: '#fff',
	gestureConfig: {
		doubletap: true
	}
});
var jquery = $.noConflict();
// mui.back = function(){
// 	var btn = ["确定","取消"];
// 		mui.confirm('确认关闭当前窗口？','Hello MUI',btn,function(e){
// 		if(e.index==0){
// 			mui.currentWebview.close();
// 		}
// 	});
// }
var globalHandler = {
	getVisibleHeight: function(el, topnav, secnav, ftnav, other) {
		var a, b, c, d;
		a = window.outerHeight;
		b = document.querySelector(el);
		c = b.offsetHeight;
		console.log(a, b, c);
		topnav ? topnav = '44' : topnav = '0';
		secnav ? secnav = '44' : secnav = '0';
		ftnav ? ftnav = '50' : ftnav = '0';
		other ? other : other = '0';
		d = a - c - topnav - secnav - ftnav - other;
		console.log(d);
		//var arr = new Array(a,b,c,d,topnav);
		return d;
	}
};

//根据url选中状态
// function pathname(el) {
// 	var pathname = window.location.pathname;
// 	el ? pathname = el : pathname;
// 	console.log(pathname);
// 	var footernav = document.getElementById("footer-nav");
// 	if (pathname.indexOf('/academy') != -1 && footernav) {
// 		if (pathname.indexOf('mycourse') != -1) {
// 			footernav.querySelector('.mui-tab-item').classList.remove('mui-active');
// 			footernav.querySelectorAll('.mui-tab-item')[1].classList.add('mui-active');
// 			console.log('mycourse');
// 		} else if (pathname.indexOf('setting') != -1) {
// 			footernav.querySelector('.mui-tab-item').classList.remove('mui-active');
// 			footernav.querySelectorAll('.mui-tab-item')[2].classList.add('mui-active');
// 			console.log('setting');
// 		} else {
// 			footernav.querySelector('.mui-tab-item').classList.remove('mui-active');
// 			footernav.querySelectorAll('.mui-tab-item')[0].classList.add('mui-active');
// 			console.log('index');
// 		}
// 	}
// }
//监听键盘事件
function keyUp(e) {
	var currKey = 0,
		e = e || event;
	currKey = e.keyCode || e.which || e.charCode;
	var keyName = String.fromCharCode(currKey);
	//禁用键盘向下事件
	if (currKey == "40" || currKey == "9") {
		event.keyCode = 0;
		event.returnValue = false;
	}
}

//baike 下载高度
if (jquery('div.bk-book-detail').length > 0) {
	downheight = document.body.clientHeight - 360;
	jquery('div.bk-book-detail').css('min-height', downheight + 'px');
}

var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
if (isiOS || isAndroid) {
	var height = jquery(window).height();
	if(jquery('.footer-nav.ic-academy-detail').length > 0){
		height = height - 148;
	}else if (jquery('.footer-nav').length > 0 || jquery('#footer-nav').length > 0) {
		height = height - 138;
	}else {
		height = height - 88;
	}

	if (jquery('#myCredit').length > 0 || jquery('#news').length > 0) {
		var height = jquery(window).height();
		//height = height - 220;
		height = height - 88;
	}

	jquery('.mui-control-content').css('height', height + 'px');
	jquery('.mui-control-content').css('min-height', height + 'px');
	jquery('.mui-slider-group').css('height', height + 'px');
	jquery('.mui-slider-group').css('min-height', height + 'px');
}
// alert('是否是Android：'+isAndroid);
// alert('是否是iOS：'+isiOS);
// alert('mui-slider-group'+jquery('.mui-slider-group').css('min-height'));
// alert('mui-slider-groupheight'+jquery('.mui-slider-group').css('height'));
// alert('window'+ jquery(window).height());
(function($) {
	//监听键盘输入
	document.onkeyup = keyUp;

	var scroll = mui('.mui-scroll-wrapper').scroll({
		scrollY: true, //是否竖向滚动
		scrollX: false, //是否横向滚动
		startX: 0, //初始化时滚动至x
		startY: 0, //初始化时滚动至y
		indicators: true, //是否显示滚动条
		deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
		bounce: true //是否启用回弹
	});

	//暂时停止调用
	jquery(".mui-scroll-wrapper").on('dragend', 'div', function() {
		//置空
	});

	//滑动内容块监听 
	//禁用回弹
	// if (jquery('.ic-slider').length >0) {
	// 	jquery(".mui-scroll-wrapper").on('swipeup','div',function(){
	// 		if(jquery(this).css('transform') != "matrix(1, 0, 0, 1, 0, 0)"){
	// 			document.querySelector('.ic-slider').classList.add('move-to-top');
	// 		}
	// 	}); 
	// 	jquery(".mui-scroll-wrapper").on('swipedown','div',function(){
	// 		if(jquery(this).css('transform') == "matrix(1, 0, 0, 1, 0, 0)"){
	// 			document.querySelector('.ic-slider').classList.remove('move-to-top');
	// 		}
	// 	}); 
	// }
	//使用回弹
	if (jquery('.ic-slider').length > 0) {
		jquery(".mui-scroll-wrapper").on('swipeup', 'div', function() {
			var scrollArr = jquery(this).css('transform').replace(/[^0-9\-,]/g, '').split(',');
			//console.log(scrollArr[5]);
			if (scrollArr[5] <= 0) {
				document.querySelector('.ic-slider').classList.add('move-to-top');
			}
		});
		jquery(".mui-scroll-wrapper").on('swipedown', 'div', function() {
			var scrollArr = jquery(this).css('transform').replace(/[^0-9\-,]/g, '').split(',');
			//console.log(scrollArr[5]);
			if (scrollArr[5] >= 0) {
				document.querySelector('.ic-slider').classList.remove('move-to-top');
			}
		});
	}

	/*学院底部导航定位*/
	//pathname();

	/*tab切换*/
	var segmentedControl = document.getElementById('segmentedControl');
	$('.mui-input-group').on('change', 'input', function() {
		if (this.checked) {
			var styleEl = document.querySelector('input[name="style"]:checked');
			var colorEl = document.querySelector('input[name="color"]:checked');
			if (styleEl && colorEl) {
				var style = styleEl.value;
				var color = colorEl.value;
				segmentedControl.className = 'mui-segmented-control' + (style ? (' mui-segmented-control-' + style) : '') + ' mui-segmented-control-' + color;
			}
		}
	});

	//后退监听
	// pushHistory(); 
	// window.addEventListener("popstate", function(e) { 
	// 	//暴力修改成后退刷新 之后有时间再修改成状态
	// 	//var url = window.history.back();
	// 	window.location.href=history.back(-1);
	// 	setTimeout("location.reload()", 200);
	// 	//alert(document.referrer);
	// 	//pathname(document.referrer); 
	// }, false); 
	// function pushHistory() { 
	// 	var state = { title: "title", url: "#"}; 
	// 	window.history.pushState(state, "title", "#"); 
	// } 

	//暂时注释全局底部按钮红点==========================
	// jquery.ajax({ //判断红点是否显示接口
	// 	url: '/index/querySpotStatus',
	// 	type: 'post',
	// 	dataType: 'json',
	// 	// data:传递totalspot为1表示icon被点击过;   0表示未点击
	// 	success: function(data) {
	// 		console.log(data);
	// 		if (data.totalspot == '1') { ////////这里添加总红点
	// 			//console.log('总红点不存在');
	// 		} else if (data.totalspot == '0') {
	// 			//console.log('总红点存在');
	// 			jquery('#footer-nav').find('.ic-red-point').css('display', 'block');
	// 		}
	// 	}
	// });
})(mui);


//academy
mui(document.body).on('tap', '.alisubmit', function(e) {
	document.getElementById("academy-payform").submit();
});
//学院支付
jquery('input[name="pay"]').click(function(event) {
	var pay = jquery('input[name="pay"]:checked').val();
	if (pay == 'alipay') {
		jquery('#academy-payform').attr('action', '/alipay/paycourse');
	} else if (pay == 'jdpay') {
		jquery('#academy-payform').attr('action', '/jdpay/paycourse');
	} else if (pay == 'wechatpay') {
		jquery('#academy-payform').attr('action', '/wechatpay/paycourse');
	}
});
var aniShow = "pop-in";
mui('body').on('tap', 'a', function() {
	var id = this.getAttribute('href');
	var href = this.href;
	var type = this.getAttribute("open-type");
	//不使用父子模板方案的页面
	if (type == "common") {
		var webview_style = {
			popGesture: "close"
		};
		//侧滑菜单需动态控制一下zindex值；
		if (~id.indexOf('offcanvas-')) {
			webview_style.zindex = 9998;
			webview_style.popGesture = ~id.indexOf('offcanvas-with-right') ? "close" : "none";
		}
		//图标界面需要启动硬件加速
		// if(~id.indexOf('icons.html')){
		// 	webview_style.hardwareAccelerated = true;
		// }
		mui.openWindow({
			id: id,
			url: this.href,
			styles: webview_style,
			show: {
				aniShow: aniShow
			},
			waiting: {
				autoShow: false
			}
		});
	} else if (id && ~id.indexOf('.html')) {
		if (!mui.os.plus || (!~id.indexOf('popovers.html') && mui.os.ios)) {
			mui.openWindow({
				id: id,
				url: this.href,
				styles: {
					popGesture: 'close'
				},
				show: {
					aniShow: aniShow
				},
				waiting: {
					autoShow: false
				}
			});
		} else {
			//TODO  by chb 当初这么设计，是为了一个App中有多个模板，目前仅有一个模板的情况下，实际上无需这么复杂
			//使用父子模板方案打开的页面
			//获得共用模板组
			var template = getTemplate('default');
			//判断是否显示右上角menu图标；
			var showMenu = ~href.indexOf('popovers.html') ? true : false;
			//获得共用父模板
			var headerWebview = template.header;
			//获得共用子webview
			var contentWebview = template.content;
			var title = this.innerText.trim();
			//通知模板修改标题，并显示隐藏右上角图标；
			mui.fire(headerWebview, 'updateHeader', {
				title: title,
				showMenu: showMenu,
				target: href,
				aniShow: aniShow
			});

			if (mui.os.ios || (mui.os.android && parseFloat(mui.os.version) < 4.4)) {
				var reload = true;
				if (!template.loaded) {
					if (contentWebview.getURL() != this.href) {
						contentWebview.loadURL(this.href);
					} else {
						reload = false;
					}
				} else {
					reload = false;
				}
				(!reload) && contentWebview.show();

				headerWebview.show(aniShow, 150);
			}
		}
	}
});


//菜单
if (document.getElementById("menu-wrapper")) {
	var menuWrapper = document.getElementById("menu-wrapper");
	var menu = document.getElementById("menu");
	var menuWrapperClassList = menuWrapper.classList;
	var backdrop = document.getElementById("menu-backdrop");
	var info = document.getElementById("info");
	var dropIcon = document.querySelector('#icon-menu i');

	backdrop.addEventListener('tap', toggleMenu);
	//document.getElementById("menu-btn").addEventListener('tap', toggleMenu);
	document.getElementById("icon-menu").addEventListener('tap', toggleMenu)
		//下沉菜单中的点击事件
	mui('#menu').on('tap', 'a', function() {
		toggleMenu();
		info.innerHTML = '你已选择：' + this.innerHTML;
	});
	var busying = false;

	function toggleMenu() {
		if (busying) {
			return;
		}
		busying = true;
		if (menuWrapperClassList.contains('mui-active')) {
			document.body.classList.remove('menu-open');
			menuWrapper.className = 'menu-wrapper slideOutUp animated';
			menu.className = 'menu slideOutUp animated';
			dropIcon.className = 'nc-icon-outline arrows-1_minimal-up rotateUp animated';
			setTimeout(function() {
				backdrop.style.opacity = 0;
				menuWrapper.classList.add('hidden');
			}, 500);
		} else {
			document.body.classList.add('menu-open');
			menuWrapper.className = 'menu-wrapper slideInDown animated mui-active';
			menu.className = 'menu slideInDown animated';
			dropIcon.className = 'nc-icon-outline arrows-1_minimal-down rotateDown animated';
			backdrop.style.opacity = 1;
		}
		setTimeout(function() {
			busying = false;
		}, 500);
	}
}