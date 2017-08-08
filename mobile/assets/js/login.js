//var jquery = $.noConflict();
jquery(function() {
    //国家区号选择
    // if (jquery("#country-code").length>0) {
    //     jquery("#country-code").intlTelInput();
    // }
    //login reg tab切换
    mui(document.body).on('tap', '.login-tab', function(e) {
        var data = this.getAttribute('data-link');
        var loginslider = mui('.mui-slider');
        if (data == "login") {
            loginslider.slider().gotoItem(0);
        }
    });

    //点击切换验证码
    var verifyimg = jquery(".verifyimg").attr("src");
    jquery(".reloadverify").click(function() {
        if (verifyimg.indexOf('?') > 0) {
            jquery(".verifyimg").attr("src", verifyimg + '&random=' + Math.random());
        } else {
            jquery(".verifyimg").attr("src", verifyimg.replace(/\?.*$/, '') + '?' + Math.random());
        }
    });

    //发送短信
    var countdown = 60;

    function cbsettime(obj) {
        var obj = jquery(obj);
        if (countdown == 0) {
            obj.html("获取验证码").removeClass("grey phoneverify").attr('disabled', false);
            countdown = 60;
            return;
        } else {
            obj.html("<span class='num'>" + countdown + "秒</span>后重新发送").addClass("grey phoneverify").attr('disabled', 'disabled');
            countdown--;
        }
        setTimeout(function() {
            cbsettime(obj)
        }, 1000)
    }
    //发送短信前表单验证
    //mui(document.body).on('click', '.phoneverify', function(e) {
    jquery('.phoneverify').click(function(e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        var flag = 1;
        var that = jquery(this);
        var phoneobj = jquery('input[name="phone"]');
        var verifyobj = jquery('input[name="verify"]');
        phoneobj.parent().hasClass('right') && verifyobj.parent().hasClass('right') ? flag = 1 : flag = 0;
        if (flag) {
            var phone = phoneobj.val();
            jquery.ajax({
                type: 'post',
                url: ctx + 'user/registerphoneverify',
                data: {
                    "phone": phone,
                },
                success: function(data) {
                    cbsettime(that);
                }
            })
        } else {
            jquery('input[name="phone"]').valid();
            jquery('input[name="verify"]').valid();
            return false;
        }
    });
    jquery('#ic-center-sendMsg').click(function(e) {
        console.log('click button sendmsg');
        //e.stopPropagation();
        e.stopImmediatePropagation();
        var flag = 1;
        var that = jquery(this);
        var phoneobj = jquery('input[name="newphone"]');
        var verifyobj = jquery('input[name="centerverify"]');
        phoneobj.hasClass('right') && verifyobj.hasClass('right') ? flag = 1 : flag = 0;
        console.log('flag+'+flag);
        if (flag) {
            var phone = phoneobj.val();
            jquery.ajax({
                type: 'post',
                url: '/user/registerphoneverify',
                data: {
                    "phone": phone,
                },
                success: function(data) {
                    cbsettime(that);
                }
            })
        } else {
            if (phoneobj.hasClass('right')) {
                jquery('input[name="centerverify"]').valid();
            }else{
                jquery('input[name="newphone"]').valid();
            }
            return false;
        }
    });
    
    //=======表单提交=========
    mui(document.body).on('tap', '#ic-btn-login', function(e) {
        jquery('#loginForm').submit();
    });
    mui(document.body).on('tap', '#ic-btn-reg', function(e) {
        jquery('#regForm').submit();
    });
    mui(document.body).on('tap', '#ic-btn-findpw', function(e) {
        jquery('#findPasswordForm').submit();
    });
    mui(document.body).on('tap', '#ic-btn-bingphone', function(e) {
        jquery('#bindingForm').submit();
    });
    mui(document.body).on('tap', '#ic-center-savePhoneChange', function(e) {
        jquery('#ic-center-formPhoneChange').submit();
    });
    //=======表单验证=========
    //中英文字符长度判断
    jQuery.validator.addMethod("byteRangeLength", function(value, element, param) {
        var length = value.length;
        for (var i = 0; i < value.length; i++) {
            if (value.charCodeAt(i) > 127) {
                length++;
            }
        }
        return this.optional(element) || (length >= param[0] && length <= param[1]);
    }, jQuery.validator.format("请确保输入的值在{0}-{1}个字节之间(一个中文字算2个字节)"));

    //手机号码判断
    jQuery.validator.addMethod('phone', function(value, element) {
        //var telmatch = /^1[0-9]{10}$/;
        var telmatch = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
        return this.optional(element) || (telmatch.test(value));
    }, '请输入正确的手机号码');

    //手机号码或邮箱格式判断
    jQuery.validator.addMethod('loginphone', function(value, element) {
        var telmatch = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
        var emailreg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        return this.optional(element) || (telmatch.test(value)) || (emailreg.test(value));
    }, '请输入正确的手机号码或邮箱');

    //登录表单验证
    jquery('#loginForm').validate({
        errorElement: 'span',
        errorClass: 'false',
        validClass: 'right',
        onkeyout: function(element) { //onkeyup
            jquery(element).valid();
        },
        //  onsubmit:function(element){    
        //     jquery(element).valid();
        // },
        errorPlacement: function(error, element) {
            element.parent().append(error);
        },
        highlight: function(element, errorClass, validClass) {
            jquery(element).removeClass('right').addClass('false');
            jquery(element).parent().removeClass('right').addClass('false').find('i').html('&#xe606;');
        },
        success: function(span) {
            span.parent().removeClass('false').addClass('right');
            span.prev('.iconfont').html('&#xe607;');
        },
        rules: {
            loginphone: {
                required: true,
                loginphone: true,
                remote: {
                    url: "/User/logincheckphone",
                    type: "post",
                    dataType: 'json',
                    data: {
                        'loginphone': function() {
                            return jquery('input[name="loginphone"]').val();
                        }
                    }
                }
            },
            loginpassword: {
                required: true,
                remote: {
                    url: "/User/logincheckpw",
                    data: {
                        loginphone: function() {
                            return jquery('input[name="loginphone"]').val();
                        },
                        loginpassword: function() {
                            return jquery('input[name="loginpassword"]').val();
                        }
                    },
                    type: "post",
                    dataType: 'json'
                }
            }
        },
        messages: {
            loginphone: {
                required: '*请输入手机或邮箱',
                loginphone: '*请输入正确的手机或邮箱',
                remote: '*手机号或邮箱不存在'
            },
            loginpassword: {
                required: '*请输入密码',
                remote: '*密码输入错误'
            }
        },
        submitHandler: function(a) {
            var c = jquery('input[name="loginphone"]', a).val(),
                d = jquery('input[name="loginpassword"]', a).val();
            mui('#ic-btn-login').button('loading');
            //jquery(a).find(":submit").val("登录中...").attr("disabled", !0),
            jquery.ajax({
                url: ctx + "User/loginphonenew",
                type: "post",
                data: {
                    nickname: c,
                    password: d,
                },
                dataType: "json"
            }).done(function(data) {
                console.log(data);
                mui('#ic-btn-login').button('reset');
                if (data.status) {
                    console.log(data);
                    if (data.isbindphone != undefined && data.isbindphone != 1) {
                        location.href = "/user/bindingphone";
                    }else{
                        if (window.location.hash == "#mycourse") {
                            location.href = "/academy/mycourse";
                        }else if(window.location.hash == "#academysetting"){
                            location.href = "/academy/setting";
                        }else{
                            location.href = data.url;
                        }
                    }
                    //console.log(document.referrer);
                    //location.href = document.referrer;
                } else {
                    jquery('#login-cb-error').css('display', 'block').text(data.error);
                    jquery(".verifyimg").click();
                }
            })
        }
    }); //login 

    //注册表单验证
    jquery('#regForm').validate({
        errorElement: 'span',
        errorClass: 'false',
        validClass: 'right',
        onkeyout: function(element) {
            jquery(element).valid();
        },
        errorPlacement: function(error, element) {
            element.parent().append(error);
        },
        highlight: function(element, errorClass, validClass) {
            jquery(element).removeClass('right').addClass('false');
            jquery(element).parent().removeClass('right').addClass('false').find('i').html('&#xe606;');
        },
        success: function(span) {
            span.parent().removeClass('false').addClass('right');
            span.prev('.iconfont').html('&#xe607;');
        },
        rules: {
            nickname: {
                required: true,
                //minlength: 4,
                //maxlength: 10
                remote:{
                    url: "/User/checknickname",
                    type: "post",
                    dataType: 'json',
                    data: {
                        'nickname': function(){return jquery('input[name="nickname"]').val();}
                    }
                },
                byteRangeLength: [4,10]
            },
            password: {
                required: true,
                minlength: 8,
                maxlength: 16
            }, 
            phone: {
                required: true,
                //phone: true,
                //minlength: 11,
                //maxlength: 11,
                //isphoneexist: '/User/checkphonenum',
                remote:{
                    url: "/User/checkphonenum",
                    type: "post",
                    dataType: 'json',
                    data: {
                        'phone': function(){return jquery('input[name="phone"]').val();}
                    }
                },
                digits: true
            },
            verify: {
                required: true,
               // maxlength: 4,
                remote:{
                    url: "/User/checkverify",
                    type: "post",
                    dataType: 'json',
                    data: {
                        'verify': function(){return jquery('input[name="verify"]').val();}
                    }
                }
            },
            phoneverify: {
                required: true,
               // maxlength: 4,
                remote:{
                    url: "/User/checkphonecerify",
                    type: "post",
                    dataType: 'json',
                    data: {
                        'phoneverify': function(){return jquery('input[name="phoneverify"]').val();}
                    }
                }
            }
        },
        messages: {
            nickname: {
                required: '*请设置一个用户名',
                remote:'*昵称已被注册',
                //minlength: '请输入2-5个汉字（4-10个字母）',
                byteRangeLength:'*请输入2-5个汉字(4-10个字母)'
               // maxlength: '请输入4-10个字符'
            },
            password: {
                required: '*请设置一个密码',
                minlength: '*密码长度不小于8个字符',
                maxlength: '*密码长度不大于16个字符'
            },
            phone: {
                remote:'*手机号已存在',
                required: '*请输入您的常用手机号码',
                minlength: '*手机号码长度为11位',
                maxlength: '*手机号码长度为11位',
                digits: '*手机号码只能输入数字'
            },
            verify: {
                required: '*请输入验证码',
                //maxlength:'max 4',
                remote: '*验证码输入错误'
            },
            phoneverify:{
                required: '*请输入验证码',
                //maxlength:'max 4',
                remote: '*验证码输入错误'
            }
        },
        submitHandler: function(a) {
            var c = jquery('input[name="nickname"]', a).val(),
                d = jquery('input[name="password"]', a).val(),
                e = jquery('input[name="phone"]', a).val(),
                f = jquery('input[name="verify"]', a).val(),
                g = jquery('input[name="phoneverify"]', a).val();
                h = jquery('input[name="recomid"]', a).val();
               // j = jquery('input[name="countrycode"]', a).val();
            mui('#ic-btn-reg').button('loading');
            jquery.ajax({
                url: ctx + "User/registerphonenew",
                type: "post",
                data: {
                    nickname: c,
                    password: d,
                    phone: e,
                    verify: f,
                    phoneverify: g,
                    recomid: h,
                    //countrycode:j,
                },
                dataType: "json"
            }).done(function(data) {
                console.log(data);
                mui('#ic-btn-reg').button('reset');
                if (data.status && data.url == '/index') {
                    location.href = document.referrer;
                }else if(data.status && data.url == 'recomid'){
                	location.href = '/index';//临时方案
                } else {
                    jquery('#reg-cb-error').css('display', 'block').text(data.error);
                    jquery(".verifyimg").click();
                }
            })
        }
    }); //reg

    //找回密码表单验证
    jquery('#findPasswordForm').validate({
        errorElement: 'span',
        errorClass: 'false',
        validClass: 'right',
        onkeyout: function(element) {
            jquery(element).valid();
        },
        errorPlacement: function(error, element) {
            element.parent().append(error);
        },
        highlight: function(element, errorClass, validClass) {
            jquery(element).removeClass('right').addClass('false');
            jquery(element).parent().removeClass('right').addClass('false').find('i').html('&#xe606;');
        },
        success: function(span) {
            span.parent().removeClass('false').addClass('right');
            span.prev('.iconfont').html('&#xe607;');
        },
        rules: {
            newPassword: {
                required: true,
                minlength: 8,
                maxlength: 16
            },
            phone: {
                required: true,
                minlength: 11,
                maxlength: 11,
                remote: {
                    url: "/User/logincheckphone",
                    type: "post",
                    dataType: 'json',
                    data: {
                        'loginphone': function() {
                            return jquery('input[name="phone"]').val();
                        }
                    }
                }
            },
            verify: {
                required: true,
                remote: {
                    url: "/User/checkverify",
                    type: "post",
                    dataType: 'json',
                    data: {
                        'verify': function() {
                            return jquery('input[name="verify"]').val();
                        }
                    }
                }
            },
            phoneverify: {
                required: true,
                remote: {
                    url: "/User/checkphonecerify",
                    type: "post",
                    dataType: 'json',
                    data: {
                        'phoneverify': function() {
                            return jquery('input[name="phoneverify"]').val();
                        }
                    }
                }
            }
        },
        messages: {
            newPassword: {
                required: '*请设置一个密码',
                minlength: '*密码长度不小于8个字符',
                maxlength: '*密码长度不大于16个字符'
            },
            phone: {
                remote: '*手机号不存在',
                required: '*请输入您的手机号码',
                minlength: '*手机号码长度为11位',
                maxlength: '*手机号码长度为11位',
                digits: '*手机号码只能输入数字'
            },
            verify: {
                required: '*请输入验证码',
                remote: '*验证码输入错误'
            },
            phoneverify: {
                required: '*请输入短信验证码',
                remote: '*短信验证码输入错误'
            }
        },
        submitHandler: function(a) {
            var d = jquery('input[name="newPassword"]', a).val(),
                e = jquery('input[name="phone"]', a).val();
            mui('#ic-btn-findpw').button('loading');
            jquery.ajax({
                url: ctx + "User/findpasswordphonenew",
                type: "post",
                data: {
                    // nickname: c,
                    newPassword: d,
                    phone: e,
                    // verify: f,
                    // phoneverify: g,
                },
                dataType: "json"
            }).done(function(data) {
                mui('#ic-btn-findpw').button('reset');
                //console.log(data);  
                if (data.status) {
                    mui.toast('重置成功');
                    // jquery('#findpw-cb-error').css('display', 'block').text(data.info).addClass('right');
                    // hreflink = ctx + data.url;
                    setTimeout('window.location.href = "/user/login"', 1500);
                } else {
                    jquery('#findpw-cb-error').css('display', 'block').text(data.info).addClass('false');
                }
            });
        }
    });

    //邮箱注册用户登录绑定手机号
    jquery('#bindingForm').validate({
        errorElement: 'span',
        errorClass: 'false',
        validClass: 'right',

        onkeyout: function(element) {
            jquery(element).valid();
        },
        errorPlacement: function(error, element) {
            element.parent().append(error);
        },
        highlight: function(element, errorClass, validClass) {
            jquery(element).removeClass('right').addClass('false');
            jquery(element).parent().removeClass('right').addClass('false').find('i').html('&#xe606;');
        },
        success: function(span) {
            span.parent().removeClass('false').addClass('right');
            span.prev('.iconfont').html('&#xe607;');
        },
        rules: {
            phone: {
                required: true,
                phone: true,
                minlength: 11,
                maxlength: 11,
                remote: {
                    url: "/User/checkphonenum",
                    type: "post",
                    dataType: 'json',
                    data: {
                        'phone': function() {
                            return jquery('input[name="phone"]').val();
                        }
                    }
                }
            },
            verify: {
                required: true,
                // maxlength: 4,
                remote: {
                    url: "/User/checkverify",
                    type: "post",
                    dataType: 'json',
                    data: {
                        'verify': function() {
                            return jquery('input[name="verify"]').val();
                        }
                    }
                }
            },
            phoneverify: {
                required: true,
                remote: {
                    url: "/User/checkphonecerify",
                    type: "post",
                    dataType: 'json',
                    data: {
                        'phoneverify': function() {
                            return jquery('input[name="phoneverify"]').val();
                        }
                    }
                }
            }
        },
        messages: {
            phone: {
                required: '*请输入您的常用手机号码',
                minlength: '*手机号码长度为11位',
                maxlength: '*手机号码长度为11位',
                digits: '*手机号码只能输入数字',
                remote: '*该手机号已经被绑定'
            },
            verify: {
                required: '*请输入验证码',
                remote: '*验证码输入错误'
            },
            phoneverify: {
                required: '*请输入验证码',
                remote: '*验证码输入错误'
            }
        },
        submitHandler: function(a) {
            var e = jquery('input[name="phone"]', a).val(),
                f = jquery('input[name="verify"]', a).val(),
                g = jquery('input[name="phoneverify"]', a).val();
            mui('#ic-btn-bingphone').button('loading');
            jquery.ajax({
                url: ctx + "User/boundUserPhone",
                type: "post",
                data: {
                    phone: e,
                    verify: f,
                    phoneverify: g,
                },
                dataType: "json"
            }).done(function(data) {
                if (data.status) {
                    jquery('#binding-cb-error').css('display', 'none').text(data.error);
                    if (window.location.hash == "#mycourse") {
                        location.href = "/academy/mycourse";
                    }else if(window.location.hash == "#academysetting"){
                        location.href = "/academy/setting";
                    }else{
                        location.href = "/academy";
                    }
                } else {
                    jquery('#binding-cb-error').css('display', 'block').text(data.error);
                    //$(".verifyimg").click();
                }
            });
        }
    });


    jquery('#ic-center-formPhoneChange').validate({
        errorElement: 'span',
        errorClass: 'false',
        validClass: 'right',

        onkeyout: function(element) {
            jquery(element).valid();
        },
        errorPlacement: function(error, element) {
            element.parent().parent().parent().find('.ic-changePhone-Error').html(error);
        },
        highlight: function(element, errorClass, validClass) {
            jquery(element).removeClass('right').addClass('false');
            jquery(element).parent().removeClass('right').addClass('false').find('i').html('&#xe606;');
        },
        success: function(span) {
            span.parent().removeClass('false').addClass('right');
            span.prev('.iconfont').html('&#xe607;');
        },
        rules: {
            newphone: {
                required: true,
                phone: true,
                minlength: 11,
                maxlength: 11,
                remote: {
                    url: "/User/checkphonenum",
                    type: "post",
                    dataType: 'json',
                    data: {
                        'phone': function() {
                            return jquery('input[name="newphone"]').val();
                        }
                    }
                }
            },
            centerverify: {
                required: true,
                // maxlength: 4,
                remote: {
                    url: "/User/checkverify",
                    type: "post",
                    dataType: 'json',
                    data: {
                        'verify': function() {
                            return jquery('input[name="centerverify"]').val();
                        }
                    }
                }
            },
            toPhoneCode: {
                required: true,
                remote: {
                    url: "/User/checkphonecerify",
                    type: "post",
                    dataType: 'json',
                    data: {
                        'phoneverify': function() {
                            return jquery('input[name="toPhoneCode"]').val();
                        }
                    }
                }
            }
        },
        messages: {
            newphone: {
                required: '*请输入您的常用手机号码',
                minlength: '*手机号码长度为11位',
                maxlength: '*手机号码长度为11位',
                digits: '*手机号码只能输入数字',
                remote: '*该手机号已经被绑定'
            },
            centerverify: {
                required: '*请输入验证码',
                remote: '*验证码输入错误'
            },
            toPhoneCode: {
                required: '*请输入短信验证码',
                remote: '*短信验证码输入错误'
            }
        },
        submitHandler: function(a) {
            mui('#ic-center-savePhoneChange').button('loading');
            jquery.ajax({
                url:  "/User/boundUserPhone",
                type: "post",
                data: {
                    phone: jquery('input[name="newphone"]', a).val(),
                    verify: jquery('input[name="centerverify"]', a).val(),
                    phoneverify: jquery('input[name="toPhoneCode"]', a).val(),
                },
                dataType: "json"
            }).done(function(data) {
                console.log(data);
                if (data.status) {
                    jquery('#ic-changePhone-Error').css('display', 'none').text(data.error);
                    document.getElementById('ic-changeAlartBingo').style.display = 'block';
                    setTimeout(function(){
                        document.getElementById('ic-changeAlartBingo').style.display = 'none';
                    },1000);
                    mui('#ic-center-savePhoneChange').button('reset');
                    jquery('.ic-iphones').html(data.phone);
                    setTimeout(function(){mui.back();},1300);
                    jquery('#ic-center-formPhoneChange')[0].reset()
                } else {
                    document.getElementById('ic-changeAlartError').style.display = 'block';
                    setTimeout(function(){
                        document.getElementById('ic-changeAlartError').style.display = 'none';
                    },1000);
                    jquery('#ic-changePhone-Error').css('display', 'block').text(data.error);
                    mui('#ic-center-savePhoneChange').button('reset');
                    //$(".verifyimg").click();
                }
            });
        }
    });
});