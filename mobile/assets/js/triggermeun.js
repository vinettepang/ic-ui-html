//通用筛选菜单trigger 带指向  点击对象、目标对象、遮罩、筛选内容框
function filtertrigger(selector,targetSelector,filterDrop,filterContainer) {
	var filterWrapper = document.querySelectorAll(selector);
	var filterDrop = document.getElementById(filterDrop);
	var container = document.getElementById(filterContainer);
	var targetS = document.querySelectorAll(targetSelector);
	var targetSelectorElement = targetSelector.substring(1);
	
	filterDrop.addEventListener('tap', clearStatus);
	jquery.each(filterWrapper, 
		function() {
			this.addEventListener('tap', filterToggleMenu);
	});
	var busying = false;
	function clearStatus() {
		var flag= false;
		var clearFlag = false;
		jquery.each(filterWrapper, 
		function() {
			var self = this;
			if (self.classList.contains('ic-active')) {
				flag= true;
				self.classList.remove('ic-active');
				// if (self.childNodes[1].classList.contains('animated')) {
				// 	self.childNodes[1].className = 'nc-icon-outline arrows-1_minimal-up rotateUp animated';
				// }
			}		
		});
		if (flag) {
			document.body.classList.remove('fmenu-open');
			filterDrop.style.opacity = 0;
			filterDrop.classList.remove('menu-open');
			jquery(targetSelector).removeClass('menu-open');
			container.classList.remove('menu-open');
			jquery.each(targetS, 
				function() {
					var self = this;
					self.className = targetSelectorElement+' slideOutUp animated';	
			});
			clearFlag = true;
		}
		return clearFlag;
	}
	function filterToggleMenu() {
		var clearFlag = clearStatus();
		if (busying) {
			return;
		}
		busying = true;
		var filterWrapperClassList = this.classList;
		//var filterDropIcon = this.childNodes[1];
		var target = this.getAttribute('ic-target');
		var targetWrapper = document.querySelector(target);
		var menu = document.querySelector(target).childNodes[1];
		if (filterWrapperClassList.contains('ic-active')) {
			document.body.classList.remove('fmenu-open');
			filterWrapperClassList.remove('ic-active');
			filterDrop.classList.remove('menu-open');
			container.classList.remove('menu-open');
			targetWrapper.className = targetSelectorElement+' slideOutUp animated';
			//filterDropIcon.className = 'nc-icon-outline arrows-1_minimal-up rotateUp animated';
			setTimeout(function() {
				filterDrop.style.opacity = 0;
				targetWrapper.classList.add('hidden');
			}, 500);
		}else if(!clearFlag) {
			document.body.classList.add('fmenu-open');
			filterWrapperClassList.add('ic-active');
			filterDrop.classList.add('menu-open');
			container.classList.add('menu-open');
			targetWrapper.classList.remove('hidden');
			targetWrapper.className = targetSelectorElement+' slideInDown animated mui-active';
			//filterDropIcon.className = 'nc-icon-outline arrows-1_minimal-down rotateDown animated';
			filterDrop.style.opacity = 0.4;
			filterDrop.style.background = '#ffd733';
		}
		setTimeout(function() {
			busying = false;
		}, 500);
	}
}
if (jquery('.filter-menu-trigger').length>0) {
filtertrigger('.filter-menu-trigger','.filter-menu-wrapper','filter-menu-backdrop','ic-nav-filter');
}
if (document.getElementById("menu-wrapper")) {
	var menuWrapper = document.getElementById("menu-wrapper");
	var menu = document.getElementById("menu");
	var menuWrapperClassList = menuWrapper.classList;
	var backdrop = document.getElementById("menu-backdrop");
	var info = document.getElementById("info");
	var dropIcon = document.querySelector('#icon-menu i');

	backdrop.addEventListener('click', toggleMenu);
	//document.getElementById("menu-btn").addEventListener('click', toggleMenu);
	document.getElementById("icon-menu").addEventListener('click', toggleMenu)
		//下沉菜单中的点击事件
	jquery('#menu').click(function(event) {
		toggleMenu();
		console.log('123');
		info.innerHTML = '你已选择：' + this.innerHTML;
	});
	// jquery('#menu').on('tap', 'a', function() {
	// 	toggleMenu();
	// 	info.innerHTML = '你已选择：' + this.innerHTML;
	// });
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