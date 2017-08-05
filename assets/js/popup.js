$(function(){
	
	/*****************************
	* 验证表单login弹窗
	*/

   	 	$("#registerForm").validate({
	        /*onkeyup: false,
	    	focusCleanup:true,*/
/*   	        rules: {
		    	   	email: {
		    	    	required: true,
		    	    	email: !0,
		    	    	isMobile:!0,
		    	    	maxlength:100
		    	   	},
		    	   	password: {
		    	    	required: true
		    	   	}
		    	},
		    	messages: {
		    	   	email: {
		    	    	required: "请输入邮箱或手机号",
		    	    	isMobile:"请输入正确的手机号",
		    	    	email: "请输入正确的邮箱",
		    	    	maxlength:"请输入100字以内的邮箱地址"
		    	   	},
		    	   	password: {
		    	    	required: "请输入密码"
		    	   	}
		    	},*/
		    	submitHandler:function(form){
		    		if($('#remember').prop("checked")){
		      			$('#remember').val(1);
		      		}else{
		      			$('#remember').val(null);
		      		}
		    		var email = $('#email').val();
		    		var password = $('#password').val();
		    		var remember = $('#remember').val();
		    		$(form).find(":submit").attr("disabled", true);
		            $.ajax({
		            	type:'POST',
		            	data:{email:email,password:password,autoLogin:remember},
		            	url:ctx+'/user/login'
		            }).done(function(result) {
		            	//alert(result);
						if(result.success){
							$('#beError').hide();
							var value = $(".collect_position").val() == "" ? null : $(".collect_position").val() ;
							if(value == "collected"){
								var collection = $('#jobCollection');
								collect(collection, result.resubmitToken);
							}
							top.location.reload();
						}else{
							$('#beError').text(result.msg).show();
						}
						$(form).find(":submit").attr("disabled", false);
		            }); 
		        }  
   		});
   		 $("#registerphoneForm").submit(function() {
	        $("#phone_beError").hide();
	        var self = $(this);
	        $.post(self.attr("action"), self.serialize(), success, "json");
	        return false;

	        function success(data) {
	            if (data.status) {
	                window.location.href = data.url; //"/Home/User/";//
	            } else {
	                //self.find(".Validform_checktip").text(data.info);
	                $("#phone_beError").show();
	                $("#phone_beError").text(data.info);
	                $(".verifyimg").click(); //刷新验证码
	            }
	        }
	    });

/*   	  $("#registerphoneForm").validate({
          onkeyup: false,
        focusCleanup:true,
        rules: {
              nickname: {
                required: true
              },
              phone:{
                required: true,
                isPhone: !0,
                maxlength:11
              }
          },
        messages: {
            nickname: {
              required: "请输入昵称"
            },
            phone:{
              required: "请输入手机号",
              isPhone: "请输入正确的手机号",
              maxlength:"请输入11字的手机号"
            }
        }
      });*/
   	 jQuery.validator.addMethod("isPhone", function(value, element) {    
      var tel = /^(\d{3,4}-?)?\d{7,9}$/g;    
      return this.optional(element) || (tel.test(value));    
    }, "请正确填写您的电话号码。");
   	 /************************
   		 * colorbox错误弹窗信息提示
   		 */
   		 $("body").on("click","a.btn_s",function(){
   			$.colorbox.close();
   			parent.jQuery.colorbox.close();
   		});
   		$(".inline").colorbox({
   			inline:true
   		});
   		$(".errorTips").click(function(){
   			errorTips("上传附件格式错误!");
   		});
		
	/************************
   		 * 关闭弹窗
   		 */	
		$(".report_cancel").on("click",function(){	
		$.colorbox.close();	
	   })
   		
   		/***************************
   		 * 注册激活页: 重新发送验证邮件
   		 */
   		$('#resend').click(function(){
   			$.ajax({
   	        	type:'POST',
   	        	url:ctx+'/user/resendActivatedMail'
   	        }).done(function(result) {
   	        	if(result.success){
   	        		$.colorbox({inline:true, href:"#resend_success",title:"验证邮件发送成功"});
   	        	}else{
   	        		alert(result.msg);
   	        	}
   	        });
   		});
		$('#wxlogin').click(function(){
			window.location.href = ctx + "user/wxlogin";
		})
});