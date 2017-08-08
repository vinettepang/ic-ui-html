mui.init();
//初始化单页view
var viewApi = mui('#app').view({
	defaultPage: '#setting'
});
//初始化单页的区域滚动
mui('.mui-scroll-wrapper').scroll();

var view = viewApi.view;
(function($) {
	//处理view的后退与webview后退
	var oldBack = $.back;
	$.back = function() {
		if (viewApi.canBack()) { //如果view可以后退，则执行view的后退
			viewApi.back();
		} else { //执行webview后退
			oldBack();
		}
	};
	//监听页面切换事件方案1,通过view元素监听所有页面切换事件，目前提供pageBeforeShow|pageShow|pageBeforeBack|pageBack四种事件(before事件为动画开始前触发)
	//第一个参数为事件名称，第二个参数为事件回调，其中e.detail.page为当前页面的html对象
	view.addEventListener('pageBeforeShow', function(e) {
		//				console.log(e.detail.page.id + ' beforeShow');
	});
	view.addEventListener('pageShow', function(e) {
		//				console.log(e.detail.page.id + ' show');
	});
	view.addEventListener('pageBeforeBack', function(e) {
		//				console.log(e.detail.page.id + ' beforeBack');
	});
	view.addEventListener('pageBack', function(e) {
		//				console.log(e.detail.page.id + ' back');
	});
	// 点击事件状态
	// var clickCredits = document.getElementById('ic-clickCredits'),
	// 	signStatus = 0,
	// 	clickCreditsNum = document.getElementById('ic-clickCreditsNum');

	// 天数变化
	// var daytemps = clickCreditsNum.innerText;
	// daynums = parseInt(daytemps.substring(0, daytemps.indexOf('天')).substr(3, 5));

	// 积分变化,截取渲染积分
	// var userCredit = document.getElementById('ic-center-userCredit'),
	// 	userCreditTemp = parseInt(userCredit.innerText.substr(5, userCredit.innerText.length - 5));

	// 定义微信头像
	//var userwx = document.getElementById('ic-wx')

	// console.log(userCreditTemp);

	function ibb_nicetime(daynums) {
		// 大于多少天
		if (daynums > 99) {
			// 已签到99天
			clickCreditsNum.innerHTML = '已签到99+天';
		}
	}
	//ibb_nicetime(daynums);
	// user/sign----->	//tip    status
	// 未签到  -2
	// 已签到  -1
	// 签到成功  0
	// 连续五天  1
	// 断签重置  2
	mui.ajax('/user/sign', {
		data: {},
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 1000000, //超时时间设置为1000秒；
		// headers:{'Content-Type':'application/json'},	              
		success: function(data) {
			console.log(data);
			// 防止未登录
			if (data.url) {
				window.location.href = data.url;
			}
			if (data.keepsign) {
				for (var i = 0; i < data.keepsign; i++) {
					jquery('.sign-dot em').eq(i).addClass('full');
				}
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理:
			console.log(type);
		}
	});
	
	
	// 微信改变灰色
	// console.log(userwx.innerText);
	// if(userwx.innerText != '微信'){
	// 	// console.log(userwx.innerText);
	// 	document.getElementById('chengewxs').innerHTML = '已绑定';
	// 	//？
	// 	document.getElementById('ic-wx').style.backgroundImage="url(/Public/Home/images/assets/wechat-green.png)"
	// }
	// clickCredits.style.display = 'block';

	// 点击签到
	// clickCredits.addEventListener('tap', function() {
	// 		clickCredits.style.display = 'none';
	document.getElementById('ic-btn-sign').addEventListener('tap', function() {		
			//签到提示
			if (jquery.cookie('ic_signup') == null || localStorage.getItem('ic_signup') == null) {
				//jquery('.ic-dialog.ic-signup').css('display', 'block');
			}
			mui.ajax('/user/sign', {
				data: {
					'signup': 1
				},

				dataType: 'json',
				type: 'post',
				timeout: 100000,
				// headers:{'Content-Type':'application/json'},	              
				success: function(data) {
					console.log(data);
					//clickCredits.style.display = 'none';
					signStatus = data.status;
					// console.log(signStatus);
					ibb_nicetime();
					if (signStatus == 0 || signStatus == 2) { // 成功或断签
						if (jquery('.sign-dot ').find('em.full').length == 5) {
		                    jquery('.sign-dot ').find('em.full').removeClass('full');
		                    jquery('.sign-dot em').eq(0).addClass('full');
		                  }else{
		                    jquery('.sign-dot em').eq(jquery('.sign-dot ').find('em.full').length).addClass('full');
		                  }
						document.getElementById('ic-signAlartBingo').style.display = 'block';
						setTimeout("document.getElementById('ic-signAlartBingo').style.display = 'none'", 3000);
						//jquery('.sign-dot em').eq(jquery('.sign-dot ').find('em.full').length).addClass('full');
						//userCredit.innerHTML = '我的积分：' + parseInt(userCreditTemp + 50);
						//积分任务列表每日签到
						document.getElementById('myCreditsign').disabled=true; 
						document.getElementById('myCreditsign').innerText='已完成';

					} else if (signStatus == 1) { //连续签到5天
						document.getElementById('ic-signFiveAlartBingo').style.display = 'block';
						setTimeout("document.getElementById('ic-signAlartBingo').style.display = 'none'", 3000);
						jquery('.sign-dot em').eq(jquery('.sign-dot ').find('em.full').length).addClass('full');
						//积分任务列表每日签到
						document.getElementById('myCreditsign').disabled=true; 
						document.getElementById('myCreditsign').innerText='已完成';
						//userCredit.innerHTML = '我的积分：' + parseInt(userCreditTemp + 50)
					}			
					// clickCreditsNum.style.display = 'block';
					// clickCreditsNum.style.opacity = 1;
					document.getElementById('ic-btn-sign').setAttribute('disabled','disabled');
					jquery('#ic-btn-sign span').html('已签到');
					// clickCreditsNum.innerHTML = '已签到'+parseInt(daynums+1)+'天';
				},
				error: function(xhr, type, errorThrown) {
					//异常处理:
					// console.log(type);
				}
			});
			// console.log(signStatus)
		})
		//签到提示
	mui(document).on('tap', 'i.sign-tips', function(e) {
		jquery('.ic-dialog.sign-dialog').fadeIn();
	});
		
	mui('.ic-dialog.ic-signup').on('tap', 'a.ic-btn', function(e) {
		jquery('.ic-dialog.ic-signup').css('display', 'none');
		jquery.cookie("ic_signup", "ic_signup", {
			expires: 10000
		});
		localStorage.setItem("ic_signup", 'ic_signup');
	});
	// console.log(document.getElementById('oldnickname').innerText);
	// 修改昵称
	var oresetnicknamesubmit = document.getElementById('resetnicknamesubmit');
	oresetnicknamesubmit.addEventListener('tap', function(e) {
		var btnNickname = document.getElementById('resetnicknamesubmit')
		var nickname = document.getElementById('oldnickname').value;
		// console.log(nickname);
		mui(btnNickname).button('loading');
		mui.ajax('/user/resetnickname/', {
			data: {
				"nickname": nickname
			},
			dataType: 'json',
			type: 'post',
			timeout: 10000,
			success: function(data) {
				//console.log(data);
				//console.log(data.info);
				if (data.status == 0) {
					document.getElementById('ic-chengenickname-error').innerHTML = data.info;
					document.getElementById('ic-chengenickname-error').style.display = 'block';

					// 反馈
					// document.getElementById('ic-changeAlartError').style.display = 'block';
					// setTimeout(function(){
					// 	document.getElementById('ic-changeAlartError').style.display = 'none';
					// },1000);

				} else if (data.nickname == nickname) {
					document.getElementById('ic-center-username').innerHTML = '';
					// 反馈
					document.getElementById('ic-center-username').innerHTML = nickname;
					document.getElementById('ic-chengenickname-error').style.display = 'none'
					document.getElementById('ic-changeAlartBingo').style.display = 'block';
					setTimeout(function() {
						document.getElementById('ic-changeAlartBingo').style.display = 'none';
					}, 1000);
				}
				mui(btnNickname).button('reset')
			},
			error: function(xhr, type, errorThrown) {
				//异常处理:
				//console.log(type);
				document.getElementById('ic-changeAlartError').style.display = 'block';
				setTimeout(function() {
					document.getElementById('ic-changeAlartError').style.display = 'none';
				}, 1000);
			}
		});
	})



	// 修改密码
	var oicCenterNewpwd = document.getElementById('ic-center-newpwdbtn');
	oicCenterNewpwd.addEventListener('tap', function(e) {
		var icCenterOldpwd = document.getElementById('ic-center-oldpwd').value;
		var icCenterNewpwd = document.getElementById('ic-center-newpwd').value;
		// console.log(icCenterOldpwd);
		// console.log(icCenterNewpwd);
		var iccenternewpwdbtn = document.getElementById('ic-center-newpwdbtn');
		mui(iccenternewpwdbtn).button('loading');
		mui.ajax('/user/resetpassword', {
			data: {
				"oldpassword": icCenterOldpwd,
				"newpassword": icCenterNewpwd
			},
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；          
			success: function(data) {
				// console.log(data);
				if (data.status == 0) {
					document.getElementById('ic-chengephone-error').style.display = 'block';
					document.getElementById('ic-chengephone-error').innerHTML = data.info;
					// document.getElementById('ic-changeAlartError').style.display = 'block';
					// setTimeout(function(){
					// 	document.getElementById('ic-changeAlartError').style.display = 'none';
					// },1000);

				} else {
					document.getElementById('ic-chengephone-error').innerHTML = ''
					document.getElementById('ic-changeAlartBingo').style.display = 'block';
					setTimeout(function() {
						document.getElementById('ic-changeAlartBingo').style.display = 'none';
					}, 1000);


				}
				mui(iccenternewpwdbtn).button('reset')
			},
			error: function(xhr, type, errorThrown) {
				//异常处理:
				//console.log(type);
				document.getElementById('ic-changeAlartError').style.display = 'block';
				setTimeout(function() {
					document.getElementById('ic-changeAlartError').style.display = 'none';
				}, 1000);
			}
		});
	})

	// 修改个人资料
	var objProfile = document.getElementById('ic-profilebtn');
	objProfile.addEventListener('tap', function(e) {
		var nickname = document.getElementById('oldnickname-profile').value;
		var icCenterOldpwd = document.getElementById('ic-center-oldpwd-profile').value;
		var icCenterNewpwd = document.getElementById('ic-center-newpwd-profile').value;
		console.log(nickname);
		console.log(icCenterOldpwd);
		console.log(icCenterNewpwd);
		var btnProfile = document.getElementById('ic-profilebtn');
		mui(btnProfile).button('loading');
		mui.ajax('/user/editProfile', {
			data: {
				"nickname" : nickname,
				"oldpassword": icCenterOldpwd,
				"newpassword": icCenterNewpwd
			},
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 100000, //超时时间设置为100秒；          
			success: function(data) {
				 console.log(data);
				if (data.nickname.status == -1 && data.password.status == -1) {
					document.getElementById('ic-nickname-error').style.display = 'block';
					if (data.nickname.info) {document.getElementById('ic-nickname-error').innerHTML = data.nickname.info;}
					document.getElementById('ic-password-error').style.display = 'block';
					if (data.password.info) {document.getElementById('ic-password-error').innerHTML = data.password.info;}
				}else if (data.nickname.status == -1) {
					document.getElementById('ic-nickname-error').style.display = 'block';
					document.getElementById('ic-password-error').style.display = 'none';
					if (data.nickname.info) {document.getElementById('ic-nickname-error').innerHTML = data.nickname.info;}
					
				}else if (data.password.status == -1){
					document.getElementById('ic-password-error').style.display = 'block';
					document.getElementById('ic-nickname-error').style.display = 'none';
					if (data.password.info) {document.getElementById('ic-password-error').innerHTML = data.password.info;}
				}else if(data.nickname.status == 0 && data.password.status == 0){
					mui(btnProfile).button('reset');
					return false;
				}else {
					document.getElementById('ic-nickname-error').style.display = 'none';
					document.getElementById('ic-password-error').style.display = 'none';
					document.getElementById('ic-changeAlartBingo').style.display = 'block';
					setTimeout(function() {
						document.getElementById('ic-changeAlartBingo').style.display = 'none';
					}, 1000);
				}
				// if (data.status == 0) {
				// 	document.getElementById('ic-chengephone-error').style.display = 'block';
				// 	document.getElementById('ic-chengephone-error').innerHTML = data.info;
				// } else {
				// 	document.getElementById('ic-chengephone-error').innerHTML = ''
				// 	document.getElementById('ic-changeAlartBingo').style.display = 'block';
				// 	setTimeout(function() {
				// 		document.getElementById('ic-changeAlartBingo').style.display = 'none';
				// 	}, 1000);
				// }
				mui(btnProfile).button('reset');
			},
			error: function(xhr, type, errorThrown) {
				//异常处理:
				//console.log(type);
				document.getElementById('ic-changeAlartError').style.display = 'block';
				setTimeout(function() {
					document.getElementById('ic-changeAlartError').style.display = 'none';
				}, 1000);
				mui(btnProfile).button('reset');
			}
		});
	})

	//
	// jquery('.unbindwx').click(function(event) {
	// 	/* Act on the event */
	// });
	mui(document).on('tap', 'span.unbindwx', function(e) {
		jquery('.ic-dialog-unbingwxtip').fadeIn();
	});
	mui(document).on('tap', '.ic-btn-dialog-close', function(e) {
		jquery('.ic-dialog').fadeOut();
		console.log('dialog out');
	});
	mui(document).on('tap', '#wxUnbind', function(e) {
		jquery('.ic-profile-wxunbind').fadeIn();
	});
	
	// 图片验证码  
	var verifyphoneimgTemp = document.getElementById('verifyphoneimg');
	// console.log(verifyphoneimgTemp);
	var verifyphoneimg = verifyphoneimgTemp.getAttribute('src');

	verifyphoneimgTemp.addEventListener('tap', function() {
		if (verifyphoneimg.indexOf('?') > 0) {
			var tempradom = verifyphoneimg + '&random=' + Math.random();
			// console.log('tempradom');
			verifyphoneimgTemp.setAttribute("src", "tempradom");
		} else {
			var tempradoms = verifyphoneimg.replace(/\?.*$/, '') + '?' + Math.random();
			// console.log(tempradoms);
			verifyphoneimgTemp.setAttribute("src", tempradoms);
		}
	});



	// 延迟 变化天数解决方法  一加载就变化。
	// console.log(daynums);
	// if (clickCredits.style.display == "none") {
	// 	// console.log('none');
	// 	clickCreditsNum.innerHTML = '已签到' + parseInt(daynums) + '天';
	// } else {
	// 	clickCreditsNum.innerHTML = '已签到' + parseInt(daynums + 1) + '天';
	// }

})(mui);

jquery(document).ready(function() {
	// 修改手机部分
	// var jquery = $.noConflict();
	jquery('.ic-close-nav').on('tap', function() {
		jquery('#footer-nav').hide();
	});
	jquery('.ic-open-nav').on('tap', function() {
		jquery('#footer-nav').show();
	});
	// jquery('#edit-accounts').on('tap', function() {
	// 	jquery('#footer-nav').hide();
	// 	// console.log('1');
	// });
	// jquery('#edit-accountBack').on('tap', function() {
	// 	jquery('#footer-nav').show();
	// })
	// jquery('#edit-accounts').on('tap', function() {
	// 	jquery('#footer-nav').hide();
	// })
	
	// jquery('#ic-newPwds').on('tap', function() {
	// 	jquery('#footer-nav').hide();
	// })
	// jquery('#ic-newPwdBack').on('tap', function() {
	// 	jquery('#footer-nav').show();
	// })
	// jquery('#bindingBack').on('tap', function() {
	// 	jquery('#footer-nav').show();
	// })
	// jquery('#bindings').on('tap', function() {
	// 	jquery('#footer-nav').hide();
	// })

	// 手机消息中心部分
	var tempSySMess = 0; //未读系统新消息个数
	var tempSySMyMess = 0; //未读我的提问新消息个数
	var okRight = true; //中间变量
	var okLeft = true;

	var Is_slider = function() {
		// console.log('hehehhe正在滚动');
		if (jquery('.ic-slider-indicator').find('a').eq(0).hasClass('mui-active') || jquery('.ic-slider-indicator').find('a').eq(1).hasClass('mui-active')) {
			jquery('.ic-slider-indicator').find('a').eq(0).removeClass('ic-active-other');
			document.getElementById('ic-slider').removeEventListener('slide', Is_slider)
				// console.log('移除other类');
		}
	}
	document.getElementById('ic-slider').addEventListener('slide', Is_slider);

	getmessage();

	function getmessage() { //后台传输数据接口
		jquery.ajax({
			url: '/index/getmessage',
			type: 'post',
			dataType: 'json',
			success: function(data) {}
		})
	}

	jquery.ajax({ //获取系统消息接口
		type: "post",
		url: "/index/message", //路径
		async: true,
		// dataType:'json',
		success: function(data) { //返回数据根据结果进行相应的处理
			var dataToli = data;
			//console.log("系统总数："+dataToli.length);
			if (dataToli.length == 0) {
				jquery('.empty').eq(0).css('display', 'block');
				jquery('.notempty').eq(0).css('display', 'none');
				jquery('.loading').eq(0).css('display', 'none');
			} else {
				jquery('.notempty').eq(0).css('display', 'block');
				jquery('.empty').eq(0).css('display', 'none');
				jquery('.loading').eq(0).css('display', 'none');
				for (var i = 0; i < dataToli.length; i++) {
					jquery('#itemOneMobile').find('ul').eq(1).append('<li class="ic-table-view-cell"><p><span class="news-title"><a href="' + dataToli[i].url + '\"> ' + dataToli[i].content + ' </a></span></p> <span class="news-time">' + dataToli[i].datetime + '</span></li>');
					if (dataToli[i].isread == '1') {
						tempSySMess++;
						jquery('#itemOneMobile').find('ul').eq(1).find('li').eq(i).addClass('ic-not-read');
					}
				}
				//console.log("系统未读数"+tempSySMess);
				if (tempSySMess > 0) {
					jquery('.ic-news-one').find('span').html(tempSySMess);
					jquery('#itemOneMobile').find('ul').eq(0).animate({
						height: 44
					}, 100);
					jquery('#itemOneMobile').find('ul').eq(0).css('border-bottom', '1px solid rgba(0,0,0,0.1)');
					jquery('#ic-news-two').css('display', 'inline-block');
				}

				jquery('#itemOneMobile').find('ul').eq(1).each(function() {
					mui(this).on("tap", 'li', function() {
						var which = jquery(this).index();
						//console.log('点击了第'+jquery(this).index()+'个系统消息');
						if (jquery(this).hasClass('ic-not-read')) {
							//console.log('并且点击的消息是没有读过的');
							jquery(this).removeClass('ic-not-read');
							tempSySMess--;
							jquery('.ic-news-one').find('span').html(tempSySMess);
							if (tempSySMess == 0) {
								jquery('#itemOneMobile').find('ul').eq(0).animate({
									height: 0
								}, 100);
								jquery('#itemOneMobile').find('ul').eq(0).css('border-bottom', 'none');
								jquery('#ic-news-two').css('display', 'none');
							}
							dataToli[which].isread = '0';
							jquery.ajax({ //********************************************************************************点击某条系统消息接口
								type: "POST",
								url: "/index/receivemessage",
								data: dataToli[which],
								success: function(message) {
									//console.log('成功读过一条消息');
								},
								error: function(message) {
									// console.log('读一条消息出错');
								}
							});
						} else {
							//console.log('并且点击的消息是已经读的');
						}
						setTimeout(function() {
							window.location.href = dataToli[which].url;
						}, 200);
					});
				});
			}
		},
		error: function(message) {
			//console.log('左边错误了');
		}
	});

	jquery.ajax({ //***************************************************************************************获取我的消息接口
		type: "post",
		url: "/index/mymessage", //路径
		async: true,
		// dataType:'json',
		success: function(data) {
			var dataToli = data;
			//console.log("提问总数"+dataToli.length);
			if (dataToli.length == 0) {
				jquery('.empty').eq(1).css('display', 'block');
				jquery('.notempty').eq(1).css('display', 'none');
				jquery('.loading').eq(1).css('display', 'none');
			} else {
				jquery('.notempty').eq(1).css('display', 'block');
				jquery('.empty').eq(1).css('display', 'none');
				jquery('.loading').eq(1).css('display', 'none');
				for (var i = 0; i < dataToli.length; i++) {
					jquery('#itemTwoMobile').find('ul').eq(1).append('<li class="ic-table-view-cell"><p><span class="news-name">' + dataToli[i].nickname + '</span> 回复了你:</p><a href="' + dataToli[i].url + '\"><span class="news-content">' + dataToli[i].content + '</span></a><span class="news-time">' + dataToli[i].datetime + '</span> </li>');
					if (dataToli[i].isread == '1') {
						tempSySMyMess++;
						jquery('#itemTwoMobile').find('ul').eq(1).find('li').eq(i).addClass('ic-not-read');
					}
				}
				//console.log("提问未读数"+tempSySMyMess);
				if (tempSySMyMess > 0) {
					//console.log(tempSySMyMess);
					jquery('.ic-content-one').find('span').html(tempSySMyMess);
					jquery('#itemTwoMobile').find('ul').eq(0).animate({
						height: 44
					}, 100);
					jquery('#itemTwoMobile').find('ul').eq(0).css('border-bottom', '1px solid rgba(0,0,0,0.1)');
					jquery('#ic-content-two').css('display', 'inline-block');
				}

				jquery('#itemTwoMobile').find('ul').eq(1).each(function() {
					mui(this).on("tap", 'li', function() {
						var which = jquery(this).index();
						//console.log('点击了第'+jquery(this).index()+'个我的消息');
						//                                console.log(jquery(this).attr('class'));
						if (jquery(this).hasClass('ic-not-read')) {
							//console.log('并且点击的消息是没有读过的');
							jquery(this).removeClass('ic-not-read');
							tempSySMyMess--;
							jquery('.ic-content-one').find('span').html(tempSySMyMess);
							if (tempSySMyMess == 0) {
								jquery('#itemTwoMobile').find('ul').eq(0).animate({
									height: 0
								}, 100);
								jquery('#itemTwoMobile').find('ul').eq(0).css('border-bottom', 'none');
								jquery('#ic-content-two').css('display', 'none');
							}
							dataToli[which].isread = '0';
							jquery.ajax({ //********************************************************************************点击某条我的消息接口
								type: "POST",
								url: "/index/receivemessage",
								data: dataToli[which],
								success: function(message) {
									//console.log('成功读过一条消息');
								},
								error: function(message) {
									// console.log('读一条消息出错');
								}
							});
						} else {
							//console.log('并且点击的消息是已经读的');
						}
						setTimeout(function() {
							window.location.href = dataToli[which].url;
						}, 200);
					});
				});
			}
		},
		error: function(message) {
			//console.log('右边错误了');
		}
	});

	jquery.ajax({ //判断红点是否显示接口
		url: '/index/querySpotStatus',
		type: 'post',
		dataType: 'json',
		// data:传递totalspot为1表示icon被点击过;   0表示未点击
		success: function(data) {
			//console.log(data);
			if (data.totalspot == '1') { ///////////////////////////////////////////////////////////////////////////////这里添加总红点
				//console.log('总红点不存在');
				total_point();
			} else if (data.totalspot == '0') {
				//console.log('总红点存在');
				jquery('#news-center').find('span').css('display', 'inline-block');
				total_point();
			}
			if (data.leftspot == '1') {
				//console.log('系统消息红点不存在');
				jquery('.mui-control-item').eq(0).children('.ic-red-point').eq(0).css('display', 'none');
			} else if (data.leftspot == '0') {
				//console.log('系统新消息红点存在');
				jquery('.mui-control-item').eq(0).children('.ic-red-point').eq(0).css('display', 'inline-block');
				slid_left();
			}
			if (data.rightspot == '1') {
				//console.log('我的消息红点不存在');
				jquery('.mui-control-item').eq(1).children('.ic-red-point').eq(0).css('display', 'none');
			} else if (data.rightspot == '0') {
				//console.log('我的消息红点存在');
				jquery('.mui-control-item').eq(1).children('.ic-red-point').eq(0).css('display', 'inline-block');
				slid_right();
			}
		}
	});


	function slid_left() {
		//console.log('监听消除左侧红点。。。。。。');
		if (jquery('.ic-slider-indicator').find('a').eq(0).hasClass('mui-active')) {
			//console.log("左侧——if");
			jquery.ajax({ //************************************************************************清除左侧栏系统消息红点接口
				url: '/index/leftSpotCancel',
				type: 'post',
				dataType: 'json',
				// data:传递leftspot为1   表示icon被点击过;   0表示未点击
				success: function(data) {
					//console.log('leftSpotCancel');
				}
			});
			if (jquery('.mui-control-item').eq(0).children('.ic-red-point').eq(0).css('display') != 'none') {
				jquery('.mui-control-item').eq(0).children('.ic-red-point').eq(0).css('display', 'none');
			}
			jquery.ajax({
				url: '/index/totalSpotCancel',
				type: 'post',
				dataType: 'json',
				success: function(data) {
					//console.log('总红点消失');
				}
			});
			jquery('#news-center').find('span').css('display', 'none');
		} else if (jquery('.mui-control-item').eq(0).children('.ic-red-point').eq(0).css('display') != 'none') {
			//console.log("左侧——else if");
			if (okLeft) {
				document.getElementById('ic-slider').addEventListener('slide', SliderLeft);
			}
		}
	}

	var SliderLeft = function() {
		if (jquery('.mui-control-item').eq(0).hasClass('mui-active')) {
			//console.log('刚刚是显示右侧页标识');
			jquery.ajax({
				url: '/index/leftSpotCancel',
				type: 'post',
				dataType: 'json',
				// data:传递leftspot为1   表示icon被点击过;   0表示未点击
				success: function(data) {
					//console.log('leftSpotCancel');
				}
			});
			jquery('.mui-control-item').eq(0).children('.ic-red-point').eq(0).css('display', 'none');
			jquery.ajax({
				url: '/index/totalSpotCancel',
				type: 'post',
				dataType: 'json',
				success: function(data) {
					//console.log('总红点消失');
				}
			});
			jquery('#news-center').find('span').css('display', 'none');
			okLeft = false;
			document.getElementById('ic-slider').removeEventListener("slide", SliderLeft);
		}
	}

	function slid_right() {
		//console.log('监听消除右侧红点。。。。。。');
		if (jquery('.ic-slider-indicator').find('a').eq(1).hasClass('mui-active')) {
			//console.log("右侧——if");
			jquery.ajax({ //************************************************************************清除右侧栏我的消息红点接口
				url: '/index/rightSpotCancel',
				type: 'post',
				dataType: 'json',
				// data:传递rightspot为1   表示icon被点击过;   0表示未点击
				success: function(data) {
					//console.log('rightSpotCancel');
				}
			});
			if (jquery('.mui-control-item').eq(1).children('.ic-red-point').eq(0).css('display') != 'none') {
				jquery('.mui-control-item').eq(1).children('.ic-red-point').eq(0).css('display', 'none');
			}
			jquery.ajax({
				url: '/index/totalSpotCancel',
				type: 'post',
				dataType: 'json',
				success: function(data) {
					//console.log('总红点消失');
				}
			});
			jquery('#news-center').find('span').css('display', 'none');
		} else if (jquery('.mui-control-item').eq(1).children('.ic-red-point').eq(0).css('display') != 'none') {
			//console.log("右侧——else if");
			if (okRight) {
				document.getElementById('ic-slider').addEventListener('slide', SliderRight);
			}
		}
	}

	var SliderRight = function() {
		//console.log('刚刚是显示左侧页标识');
		jquery.ajax({
			url: '/index/rightSpotCancel',
			type: 'post',
			dataType: 'json',
			// data:传递rightspot为1   表示icon被点击过;   0表示未点击
			success: function(data) {
				//console.log('rightSpotCancel');
			}
		});
		jquery('.mui-control-item').eq(1).children('.ic-red-point').eq(0).css('display', 'none');
		jquery.ajax({
			url: '/index/totalSpotCancel',
			type: 'post',
			dataType: 'json',
			success: function(data) {
				//console.log('总红点消失');
			}
		});
		jquery('#news-center').find('span').css('display', 'none');
		okRight = false;
		document.getElementById('ic-slider').removeEventListener("slide", SliderRight);
	}

	function total_point() {
		//console.log('总红点点击监听事件');
		mui(jquery('#news-center').parent('.mui-table-view-cell')).on("tap", 'a', function() {
			//console.log('总红点被点击');
			if (jquery('#news-center').find('span').css('display') != 'none') {
				jquery.ajax({
					url: '/index/totalSpotCancel',
					type: 'post',
					dataType: 'json',
					success: function(data) {
						//console.log('总红点消失');
					}
				});
				jquery('#news-center').find('span').css('display', 'none');
			}
		});
	}


	jquery('#ic-news-two').click(function() {
		jquery.ajax({ //*********************************************************************系统消息全标记为已读接口
			type: "POST",
			url: "/index/receivemessage",
			// data: {
			// 	'SysType' : 1,
			// },
			data: {
				'SysType': 1
			},
			dataType: 'json',
			success: function(message) {
				//console.log(message);
			},
			error: function(message) {}
		});
		jquery('.mui-control-item').eq(0).children('.ic-red-point').eq(0).css('display', 'none');
		for (var i = 0; i < jquery('#itemOneMobile').find('ul').eq(1).find('li').length; i++) {
			if (jquery('#itemOneMobile').find('ul').eq(1).find('li').eq(i).css('background-color') != 'white') {
				jquery('#itemOneMobile').find('ul').eq(1).find('li').eq(i).removeClass('ic-not-read');
			} else {
				break;
			}
		}
		jquery('#itemOneMobile').find('ul').eq(0).animate({
			height: 0
		}, 100);
		jquery('#itemOneMobile').find('ul').eq(0).css('border-bottom', 'none');
		jquery('#ic-news-two').css('display', 'none');
	});

	jquery('#ic-content-two').click(function() {
		jquery.ajax({ //*********************************************************************************************我的消息全标记为已读接口
			type: "POST",
			url: "/index/receivemessage",
			data: {
				'MyType': 1
			},
			dataType: 'json',
			success: function(message) {
				// console.log('成功Sys');
			},
			error: function(message) {
				// console.log('错误了');
			}
		});
		jquery('.mui-control-item').eq(1).children('.ic-red-point').eq(0).css('display', 'none');
		for (var i = 0; i < jquery('#itemTwoMobile').find('ul').eq(1).find('li').length; i++) {
			if (jquery('#itemTwoMobile').find('ul').eq(1).find('li').eq(i).css('background-color') != 'white') {
				jquery('#itemTwoMobile').find('ul').eq(1).find('li').eq(i).removeClass('ic-not-read');
			} else {
				break;
			}
		}
		jquery('#itemTwoMobile').find('ul').eq(0).animate({
			height: 0
		}, 100);
		jquery('#itemTwoMobile').find('ul').eq(0).css('border-bottom', 'none');
		jquery('#ic-content-two').css('display', 'none');
	});

	//解绑微信
	//jquery(".ic-wx-unbind").click(function() {
	mui(document).on("tap", '.ic-wx-unbind', function() {
		uid = jquery(".ic-wx-unbind").attr('uid');
		jquery.ajax({
			type: 'POST',
			url: '/user/unbind',
			data: {
				'uid': uid,
			},
			success: function(data) {
				location.reload();
			}
		})
	})
	
	//绑定微信
	mui(document).on("tap", '.ic-wx-bind', function() {
		uid = jquery(".ic-wx-unbind").attr('uid');
		/*var userinfo = jquery.cookie('userinfo');
		if (typeof userinfo != undefined &&  userinfo != null) {
			type = 'POST';
		}else{
			type = 'GET';
		}*/
		jquery.ajax({
			type: 'POST',
			url: '/user/mpbind',
			data: {
				'uid': uid,
			},
			success: function(data) {
				// alert(JSON.stringify(data));
				// alert(data);
				if(data.status == 1){
					//window.location.href=window.location.href+'#success-mpbind';
					document.getElementById('ic-bindAlartBingo').style.display = 'block';
					setTimeout("document.getElementById('ic-bindAlartBingo').style.display = 'none'", 1000 );
					setTimeout("location.reload()", 1200 );
				}else{
					alert(data.info);
				}
			}
		})
	});
	
	//邀请好友
	mui(document).on("tap", '.btn-invite-friend', function() {
		 var href = this.getAttribute('data-href');
		 window.location.href= href;
	});
	
	
	var hash = window.location.hash;
	var localhref = window.location.href;
	if (hash == "#myCredit") {
		// jquery('#myCredits').dblclick();
		console.log(hash);
		//var btn = document.getElementById("myCredits");
		// //监听点击事件
		// btn.addEventListener("tap",function () {
		//   console.log("tap event trigger");
		// });
		//触发submit按钮的点击事件
		
		//mui.trigger(btn,'tap');
	}
	if (localhref.indexOf("success-mpbind") != -1) {
		
	}

});