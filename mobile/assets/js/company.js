	mui.init();
	//全屏遮罩菜单
    if (document.getElementById("overlay-container")) {
		var overlayWrapper = document.getElementById("overlay-container");
		var overlayWrapperClassList = overlayWrapper.classList;

		if (document.getElementById("trigger-overlay")) {
			document.getElementById("trigger-overlay").addEventListener('tap', toggleMenu);
		}
		if (document.getElementById("overlay-close")) {
			document.getElementById("overlay-close").addEventListener('tap', toggleMenu);
		}
		
		jquery.each(document.querySelectorAll('#overlay-container .nav-list ul li'), 
			function() {
				this.addEventListener('tap', toggleMenu);
		});		

		function toggleMenu() {
			if (overlayWrapperClassList.contains('mui-active')) {
				document.body.classList.remove('menu-open');
				overlayWrapper.className = 'overlay-container slideOutUp animated';
				setTimeout(function() {
					overlayWrapper.classList.add('hidden');
				}, 500);
			} else {
				document.body.classList.add('menu-open');
				overlayWrapper.className = 'overlay-container slideInDown animated mui-active';
			}
		}
	}
	jquery(function(){ 
		if (jquery('.empty-container-center').length>0) {
			jquery('.empty-container-center .mui-pull-bottom-tips').remove();
		}
	}); 
	(function(jquery) {
		var deleteHost = window.location.href;
		console.log("deleteHost"+deleteHost);
		if (deleteHost.indexOf('delete=success') != -1) {
			console.log("success");
			document.querySelector('.ic-alert-success').style.display = 'block';
			setTimeout(function() {
				document.querySelector('.ic-alert-success').style.display = 'none';
			}, 1500);
		}
		
		//阻尼系数
		var deceleration = mui.os.ios?0.003:0.0009;
		jquery('.mui-scroll-wrapper').scroll({
			bounce: false,
			indicators: true, //是否显示滚动条
			deceleration:deceleration
		});
		jquery.ready(function() {
			//循环初始化所有下拉刷新，上拉加载。
			jquery.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
				if (index>0) { //内推除去
				jquery(pullRefreshEl).pullToRefresh({
					up: {
						callback: function() {
							var self = this;
							setTimeout(function() {
								var ul = self.element.querySelector('.mui-table-view');
								createFragment(ul, index, 5);
								isRefresh(ul,staticData(index),index);
								var flag =isRefresh(ul,staticData(index),index);
								console.log("flag"+flag);
								if (flag) {self.endPullUpToRefresh();}
								else{self.endPullUpToRefresh(true);}
							}, 1000);
						}
					}
				});
				}
			});
			var createFragment = function(ul, index, count, reverse) {
				var length = ul.querySelectorAll('li').length;
     			getData(ul,staticData(index),index);
			};        
		});
		//所有下拉刷新，上拉加载 获取值
		function staticData(index) {
			var li,obj, type,cid,num,search,collect,order;
			console.log(index);
			if (index == 1) {type = 'fulltime';obj=document.querySelector('input[name="fullajax"]');}
			else if (index == 2){type = 'parttime';obj=document.querySelector('input[name="partajax"]');}
			cid = obj.getAttribute('data-cid');
			num = obj.getAttribute('data-num');
			order = obj.getAttribute('data-order');
			search = obj.getAttribute('data-search')?obj.getAttribute('data-search'):'';
            collect = obj.getAttribute('data-collect')?obj.getAttribute('data-collect'):'';
            data = {cid: cid,num: num,type: type,order: order,search:search,collect:collect};
            console.log(data);
            return data;
		}
		//上拉加载 判断是否还有值
		function isRefresh(ul,data,index) {
			var flag = '';
			jquery.ajax({
                type: "post", //数据提交的类型（post或者get）
                url: "/Company/getMoreData", //数据提交得地址
                data: data, //提交的数据(自定义的一些后台程序需要的参数)
                dataType: "json", //返回的数据类型
                async:false,
                success: function(data) {
                	console.log(data);
                	if (data.data) {flag = true;}else{flag = false;}
                }
            });
            return flag;
		}
		//上拉加载 拼接返回值
		function getData(ul,data,index) {
			//console.log(data);
		  	jquery.ajax({
                type: "post", //数据提交的类型（post或者get）
                url: "/Company/getMoreData", //数据提交得地址
                data: data, //提交的数据(自定义的一些后台程序需要的参数)
                dataType: "json", //返回的数据类型
                async:false,
                success: function(data) {
                    //console.log(data);
                    if (data.data) {
                    var fragment = document.createDocumentFragment();
	                for (var i = 0; i < data.data.length; i++) {
	                	var timeflag='',company_name='',time='',like='',spring_recruit='';
	                	
						li = document.createElement('li');
						li.className = 'mui-table-view-cell';
						//公司名
						if (data.data[i].company_name.length >8) {
							company_name = data.data[i].company_name.substr(0,8);
						}else{
							company_name = data.data[i].company_name;
						}
						//时间
						if (data.data[i].openstatus == 1) {
							switch(data.data[i].timeflag){
							case '1':
								if (data.data[i].start_time != null && data.data[i].start_time != '') {timeflag = '('+data.data[i].start_time+' 开始)';}
								time = '<span class="ic-time">未开始 '+timeflag+'</span>';
								break;
							case '2':
								if (data.data[i].end_time != null && data.data[i].end_time != '') {timeflag = '('+data.data[i].end_time+' 截止)';}
								time = '<span class="ic-time start">已开始 '+timeflag+'</span>';
								break;
							case '3':
								if (data.data[i].end_time != null && data.data[i].end_time != '') {timeflag = '('+data.data[i].end_time+' 截止)';}
								time = '<span class="ic-time">已结束 '+timeflag+'</span>';
								break;
							case '4':
								if (data.data[i].end_time != null && data.data[i].end_time != '') {timeflag = '('+data.data[i].end_time+' 截止)';}
								time = '<span class="ic-time start">已开始 '+timeflag+'</span>';
								break;
							default:
								timeflag ='';time='';
								break;
							}
						}else{
							if (data.data[i].start_time != null) {timeflag = '('+data.data[i].start_time+' 开始)';}
							time = '<span class="ic-time">未开始 '+timeflag+'</span>';
						}

						//收藏
						if (document.querySelector('input[name="loginStatus"]').value == 1 && data.data[i].keepcid != null) {
							like = '<span class="ic-icon-fav collected text-taro" cid="'+data.data[i].id+'" kid="'+data.data[i].kid+'"><i class="nc-icon-glyph ui-2_favourite-31 icon-favourite"></i></span>';
						}else if(document.querySelector('input[name="loginStatus"]').value == 1 && data.data[i].keepcid == null){
							like = '<span class="ic-icon-fav jobCollection text-grey" cid="'+data.data[i].id+'"><i class="nc-icon-outline  ui-2_favourite-31 icon-favourite"></i></span>';
						}else{
							like = '<span class="ic-icon-fav text-grey"><a href="/user/login" open-type="common"><i class="nc-icon-outline  ui-2_favourite-31 icon-favourite"></i></a></span>';
						}	
						//春招							
						data.data[i].spring_recruit == 1 ? spring_recruit = '<i class="spring-recruit"></i>' :'' ;
						//拼接
				
						li.innerHTML = '<img class="company-img" src="'+data.data[i].path+'"/><a href="'+data.data[i].url_link+'" open-type="common" ><span class="company-name" >'+company_name+spring_recruit+'</span></a>'+time+like;
						fragment.appendChild(li);
					}
					ul.appendChild(fragment);	
					document.querySelector('input[name="fullajax"]').setAttribute('data-num',data.num);

					}else{
	
                    }
                },
                error:function(xhr,type,errorThrown){
					alert('服务器开小差了，请稍后重试');
				}
            })
		}
		//搜索按钮 弹出搜索框
		mui(document).on('tap', '.icon-search', function() {
			document.querySelector('.ic-search-nav').classList.remove('dn');
		});
		//搜索按钮 关闭搜索框
		mui(document).on('tap', '.icon-search-cancel', function() {
			document.querySelector('.ic-search-nav').classList.add('dn');
		});
		//收藏
		mui(document).on('tap', '.jobCollection', function() {
		    var obj = this;
		    var child = this.children[0];
		    var cid = this.getAttribute('cid');
		    
		    jquery.ajax({
		        type: "POST",
		        url: "/Company/keep",
		        data: {
		            cid: cid,
		        },
		        success: function(data) {
		            console.log(data);
		            if (data != 0 && data != -1) {
		            	obj.classList.toggle('collected');
		            	obj.classList.toggle('jobCollection');
		            	obj.classList.toggle('text-grey');
		            	obj.classList.toggle('text-taro');
		            	child.classList.toggle('nc-icon-glyph');
		            	child.classList.toggle('nc-icon-outline');
		            	obj.setAttribute('kid', data);
		            	document.getElementById('fav-cb').style.display = 'block';
		            	setTimeout("document.getElementById('fav-cb').classList.add('fadeIn');document.getElementById('fav-cb').classList.remove('fadeOut')", 300);
		            	setTimeout("document.getElementById('fav-cb').classList.add('fadeOut');document.getElementById('fav-cb').classList.toggle('fadeIn');", 800);
		            	setTimeout("document.getElementById('fav-cb').classList.remove('fadeOut');document.getElementById('fav-cb').style.display = 'none';", 1000);
		            }
		            if (data == -1) {console.log('已收藏');}
		            if (data == 0) {console.log('登录后收藏');}
		        }
		    });
		    return false;
		});
		//取消收藏
		mui(document).on('tap', '.collected', function() {
			var obj = this;
			var child = this.children[0];
		    var cid = this.getAttribute('cid');
		    var kid = this.getAttribute('kid');
			console.log('canceled');
			jquery.ajax({
                type: "POST",
                url: "/Company/cancelKeep",
                data: {
                    kid: kid,
                },
                success: function(data) {
                    console.log(data);
                    if (data == 1) {
                        obj.classList.toggle('collected');
		            	obj.classList.toggle('jobCollection');
		            	obj.classList.toggle('text-grey');
		            	obj.classList.toggle('text-taro');
		            	child.classList.toggle('nc-icon-glyph');
		            	child.classList.toggle('nc-icon-outline');
                    }
                    if (data == -1) {console.log('已取消');}
                    if (data == 0) {console.log('取消失败');}
                }
            });
			return false;
		});
	})(mui);

	