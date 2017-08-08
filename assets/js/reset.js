/**
 * Author : Liuliangyu
 * 2016-05-09
 */
$(document).ready(function(){
	$(function(){
		$('#resetnicknamesubmit').click(function(){
			var nickname = $("#oldnickname").val();
			$.ajax({
				type : 'post',
				url : ctx + 'user/resetnickname/',
				data : {"nickname" : nickname},
				success : function(data){
                    //console.log(data);
					if(data.status){
						$('#resetname_beError').text(data.info).hide();
						$('.save_ok').fadeIn();
						setTimeout("$('.save_ok').fadeOut();",700);
                        $('.username').text(nickname);
						//alert(data.info);
					}else{
						$('#resetname_beError').text(data.info).show();	
						//alert('修改成功');
					}
				}
			})
		})

		//更新头像
		$('#updateheadsubmit').click(function(){
			var headpath = $("#path").val();
			$.ajax({
				type : 'post',
				url : ctx + 'User/updateHead/',
				data : {"path" : headpath},
				success : function(data){
					console.log(data);
					if(data.status){
                        changesessionobj.sessionajax(headpath);//保存成功时写入将头像写入当前session（小头像使用）
                        $('.head-container #head').children().show();
                        $('.upload-action').fadeOut('300');
                        $('.head-container #head').animate({left:'120px',right:'0'});
                        $('.save_ok').fadeIn();
                        setTimeout("$('.save_ok').fadeOut();",700);
                        $('.minihead').css("backgroundImage","url("+headpath+")");//更新右上方小头像

					}else{
                        $('.upload-tips').text('上传失败！支持文件PNG、JPG、 JPEG，大小不超过600KB').addClass('error');
					}
				}
			})
		});

		//删除头像
		$('#deletehead').click(function(){
			var headpath = $("#pic").attr('src');

			$.ajax({
				type : 'post',
				url : ctx + 'User/deleteHead/',
				data : {"path" : headpath},
				success : function(data){
					console.log(data);
					$("#pic").attr('src','/Public/Home/images/default_headpic_chajian.png');
					if(data.info){
						$('#updatehead_beError').text(data.info).show();
						//alert(data.info);
					}else{
						$('#updatehead_beError').text(data.info).hide();
						$('.save_ok').fadeIn();
						setTimeout("$('.save_ok').fadeOut();",700);
						//alert('修改成功');
					}
				}
			})
		});

		$('#resetpswsubmit').click(function(){
			var oldpassword = $("#oldpassword").val();
			var newpassword = $("#newpassword").val();
			$.ajax({
				type : 'post',
				url : ctx + 'user/resetpassword',
				data : {"oldpassword" : oldpassword,"newpassword" : newpassword},
				success : function(data){
                    //console.log(data);
					if(data.info){
						$('#resetpw_beError').text(data.info).show();
						//alert(data.info);
					}else{
						$('#resetpw_beError').text(data.info).hide();
						$('.save_ok').fadeIn();
						setTimeout("$('.save_ok').fadeOut();",700);
						//alert('密码重置成功');
					}
				}
			})
		})
	})
})