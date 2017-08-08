$(document).ready(function() {

  var globalHandler = {
      windowHeight: function() {
        return $(window).height();
      },
      scrollTop: function(inner, box) {
          var a, b, c;
          if (inner.length > 0 && box.length > 0) {
            a = inner.offset().top;
            b = box.offset().top;
            c = a - b;
            if (c != 0) {
              $(".connect-list").animate({
                scrollTop: c
              }, 700);
            }
          }
        }
        // ,
        // affix : function (argument,value) {
        //     var top='';
        //     value ? top = value : top = 10;
        //     if ($(argument) && $(argument).length()>0) {
        //         $(argument).affix({
        //             offset: {
        //                 top: top
        //             }
        //         });
        //     }  
        // }
    }
    //content内容高度随屏幕大小适应
  var golbalHeight = globalHandler.windowHeight();
  //var windowHeight = globalHandler.windowHeight()-240;
  var windowHeight = globalHandler.windowHeight() - 97;
  $('.content').css('min-height', windowHeight);
  $('.content-container').css('min-height', windowHeight);
  $('.content.buy-content').css('min-height', golbalHeight);

  //$('.companylist-container').css('min-height',globalHandler.windowHeight()-500);

  globalHandler.scrollTop($(".connect-list ul li ol li a.active").parents('ol').parent('li'), $(".connect-list"));
  //globalHandler.affix('.fixit');

  //首页hover
  $('.hover-trigger.banner-hover').hover(function(e) {
    var _this = $(this);
    _this.parents().next('img').fadeIn();
  });
  $('.ic-banner-block .hover-img').hover(function(e) {
    var _this = $(this);
    _this.fadeIn();
  }, function() {
    var _this = $(this);
    _this.fadeOut();
  });
  $('.hover-trigger.corporation').hover(function(e) {
    var _this = $(this);
    _this.find('.hover-img').fadeIn();
  }, function() {
    var _this = $(this);
    _this.find('.hover-img').fadeOut();
  });

  $('.bk-book-dl').click(function() {
    if ($.cookie('ot_home_login') == 1 || localStorage.getItem('ot_home_login') == 1) {
      //$(this).attr("href","/File/download/id/1");
      console.log('login');
      return true;
    } else {
      console.log('not login');
      $('#dltologin').click();
      return false;
    }
  });

  // $("#dltologin").fancybox({
  //   helpers: {
  //     overlay: {
  //       css: {
  //         'background': 'rgba(255, 215, 50, 0.9)',
  //         'overlayOpacity': 0.9
  //       }
  //     }
  //   }
  // });
  // $(".popup-trigger").fancybox({
  //   helpers: {
  //     overlay: {
  //       css: {
  //         'background': 'rgba(255, 215, 50, 0.9)',
  //         'overlayOpacity': 0.9
  //       }
  //     }
  //   }
  // });
  $('.nav-switch a').click(function(e) {
    e.preventDefault()
    $(this).tab('show')
  });
   $('i.ic-icon-badge').on('mouseover',
      function(e) {
        e.stopPropagation();
        var a = $(this).find('label').is(':hidden');
        a ? ($(this).find('label').fadeIn()):'';
        }),
    $('i.ic-icon-badge').on('mouseleave',
      function(e) {
        e.stopPropagation();
        var a = $(this).find('label').is(':hidden');
        a ? '':($(this).find('label').fadeOut());
      });
  //footer hover效果
  $(".focusus").hover(function() {
    $('.jd_share_success2').css('visibility', 'visible');
    $('.jd_share_success2').animate({
      opacity: 1
    });
  }, function() {
    $('.jd_share_success2').css('visibility', 'hidden');
    $('.jd_share_success2').animate({
      opacity: 0
    });
  });
  $('.ft_share').click(function(event) {
    $(this).unbind("mouseover");
    $(this).unbind("mouseout");
    if ($(this).hasClass("share_open2")) {
      $(this).removeClass('share_open2');
      $(this).removeClass("share_click2");
      $(this).removeClass("share_hover2");
    } else {
      $(this).addClass('share_open2');
      $(this).addClass("share_click2");
      $(this).find("span#share_jd2").addClass("dn");
    }
    /*$(this).find("span#share_jd2").addClass("dn") ;*/
    event.stopPropagation();
  });

  $('#login_minpop').bind('click', function() {
    $.colorbox({
      inline: true,
      href: "#login_min"
    });
  });

  var handler = function(hash) {
    var target = document.getElementById(hash.slice(1));
    if (!target) return;
    var targetOffset = $(target).offset().top - 100;
    $('html,body').animate({
      scrollTop: targetOffset
    }, 400);
  }

  $('a[href^=#][href!=#]').click(function() {
    handler(this.hash)
  });

  if ($('.main-content #bk-nav')) {
    handler(location.hash)
  }
  // if ($.cookie('ot_home_login')== 1 || localStorage.getItem('ot_home_login')==1) {
  //   console.log($.cookie('ot_home_login'));
  //   console.log( localStorage.getItem('ot_home_login'));
  //   console.log('login');
  // }else{
  //   console.log($.cookie('ot_home_login'));
  //   console.log( localStorage.getItem('ot_home_login'));
  //   console.log('no login');
  // }
  $('.dialog-close').click(function(event) {
    var _this = $(this);
    _this.parent().fadeOut();
  });
  $('.trigger-overlay').on('click tap',
    function(e) {
      e.stopImmediatePropagation();
      $('.overlay-sideup').toggleClass('showNav hideNav').removeClass('hidden');
      $(this).toggleClass('overlay-animated');
      return false;
    });

  $('.trigger-overlay-cat').on('click tap',
    function(e) {
      e.stopImmediatePropagation();
      $('.overlay-sideup-cat').toggleClass('showNav hideNav').removeClass('hidden');
      $(this).toggleClass('overlay-animated');
      return false;
    });

  $('.hover-trigger').on('click',
      function(e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        $('.hover-content').fadeIn('600');
        $('.hover-content-inline').css('display', 'inline-block');
        $('.hover-content-table').css('display', 'table-row');
      }),
    $('.hover-trigger').on('mouseleave',
      function(e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        $('.hover-content').fadeOut('600');
      });
  // $('#cid').click(function(e) {
  //     var a,c;
  //     e.stopImmediatePropagation();
  //     c = $(this).parent().find('.xl_list');
  //     a = c.is(":hidden"),
  //     console.log(a),
  //     a ?  c.show() : c.hide();

  // });
  // $('#myTabs a').click(function(e) {
  //     e.preventDefault() ;
  //     $(this).tab('show');
  // });
  $('#myTabs a').click(function(e) {
    e.preventDefault();
    $(this).tab('show');
  });
  $('#aca-nav li').click(function() {
    $(this).addClass("active").siblings().removeClass("active");
    $(".main-content.academy-green .academy-block").eq($('#aca-nav li').index(this)).addClass("active").siblings().removeClass("active")
  });

  // $('[data-spy="scroll"]').each(function() {
  //     $(this).scrollspy();
  // });
  if ($('#bk-nav') && $('#bk-nav').length > 0) {
    $('body').scrollspy({
      target: '#bk-nav',
      offset: 100
    });
  }

  // $('body').scrollspy({ target: '#bk-nav'});
  //偏移量解决
  // var offset = 100;
  // $('ul.nav li a').click(function(event) {
  //     event.preventDefault();
  //     $($(this).attr('href'))[0].scrollIntoView();
  //     scrollBy(0, -offset);
  // });

  $('.read-answer').click(function(e) {
    e.stopImmediatePropagation();
    var tag = $(this).prev();
    if (tag.hasClass('over-answer')) {
      $(this).prev().removeClass('over-answer');
      $(this).prev().find('.answer-cover').css('display', 'none');
      $(this).text('收起完整回答');
    } else {
      $(this).prev().addClass('over-answer');
      $(this).prev().find('.answer-cover').css('display', 'block');
      $(this).text('显示完整回答');
    }
    // $(this).prev().removeClass('over-answer');
    // $(this).prev().find('.answer-cover').css('display','none');
    // $(this).text('收起完整回答');
  });
  $("div").delegate(".normal_s", "click",
    //$('.normal_s').bind("click",
    function(a) {
      var b, c;
      b = $(this).find(".xl_list"),
        c = b.is(":hidden"),
        console.log(c),
        $(".xl_list").hide(),
        c ? b.show() : b.hide(),
        a.stopImmediatePropagation();
      // a.stopPropagation()
    });
  $(document).mouseup(function(e) {
    var _con = $('.normal_s'); // 设置目标区域
    if (!_con.is(e.target) && _con.has(e.target).length === 0) { // Mark 1
      $(".xl_list").hide()
    }
  });

  // if ($('#bk-head') && $('#bk-head').length>0) {
  //   $('#bk-head').affix({
  //       offset: {
  //           top: $('#bk-head').offset().top
  //       }
  //   });
  // }
  if ($('.fixit') && $('.fixit').length > 0) {
    $('.fixit').affix({
      offset: {
        top: 70,
        bottom: function() {
          return (this.bottom =
            $('.bs-footer').outerHeight(true))
        }
      }
    });
  }
  if ($('#bk-head') && $('#bk-head').length > 0) {
    $('#bk-head').affix({
      offset: {
        top: 70,
        bottom: function() {
          return (this.bottom =
            $('.bs-footer').outerHeight(true))
        }
      }
    });
  }
  // if ($('#aside') && $('#aside').length>0) {
  //   $('#aside').affix({
  //       offset: {
  //           //top: $('#aside').offset().top
  //           top: $('#aside').height()
  //       }
  //   });
  // }
  // if ($('#nav-aside') && $('#nav-aside').length>0) {
  //   $('#nav-aside').affix({
  //       offset: {
  //           top: $('#nav-aside').offset().top
  //       }
  //   });
  // }



  $('.position li').click(function() {
    var data = $(this).attr('data-id');
    editForm("positionInput", data);
    $(this).addClass("active").siblings().removeClass("active");
  });

  $(".baike-cat li").click(function() {
    var checkText = $(this).attr('data-cid');
    var data = "";
    editForm("positionInput", data);
    editForm("cidInput", checkText);
  });


  // $(".share-button").mouseover(function () {
  //   // var h = $(this).outerHeight();
  //   // $('.jiathis_style_24x24').css('bottom',h);
  //     // $('.jiathis_style_24x24').show("fast");
  //     $('.jiathis_style_24x24').css('display','block');
  // });
  // $(".share-block").mouseleave(function () {
  //     //$('.jiathis_style_24x24').hide("fast");
  //     $('.jiathis_style_24x24').css('display','none');
  // });
  $('.share-button').on('click ',
      function(e) {
        e.stopImmediatePropagation();
        $('.jiathis_style_24x24').css('display', 'block');
      }),
    $('.share-button').on('mouseleave',
      function(e) {
        e.stopImmediatePropagation();
        $('.jiathis_style_24x24').css('display', 'none');
      });
  $('.jiathis_style_24x24').on('mouseover ',
      function(e) {
        e.stopImmediatePropagation();
        $('.jiathis_style_24x24').css('display', 'block');
      }),
    $('.jiathis_style_24x24').on('mouseleave',
      function(e) {
        e.stopImmediatePropagation();
        $('.jiathis_style_24x24').css('display', 'none');
      });

  // $(".share-button").onmouseover(
  // function(){
  // $("#div2").attr("display","block");
  // }
  // ); 
  var bkwbe = $('.main-content').width();
  $('#bk-head').css('width', bkwbe);

  var companynav = $('.company-nav').width();
  $('nav.company-nav').css('width', companynav);

  var aside = $('.aside').width();
  // $('.aside').css('width',aside-5 );
  $('.aside .nav-aside').css('width', aside);
  //$('.aside .lt-banner').css('width',aside );
  $('.loginpop').click(function(event) {
    var type = $(this).attr('data-type');
    if (type == 'reg') {
      $('.login-tab li').eq(1).addClass("active").siblings().removeClass("active");
      $(".login-container .tab-pane").eq(1).addClass("active").siblings().removeClass("active");
    } else if (type == 'log') {
      $('.login-tab li').eq(0).addClass("active").siblings().removeClass("active");
      $(".login-container .tab-pane").eq(0).addClass("active").siblings().removeClass("active");
    }
  });
  $('.login-tab li').click(function() {
    $(this).addClass("active").siblings().removeClass("active");
    $(".login-container .tab-pane").eq($('.login-tab li').index(this)).addClass("active").siblings().removeClass("active")
  });
  $('.tab-to-login').click(function(event) {
    $('.login-tab li:first-child').addClass("active").siblings().removeClass("active");
    $(".login-container .tab-pane:first-child").addClass("active").siblings().removeClass("active");
  });
  $('#tab1,.header,#footer').bind("click", function() {
    $('.tip-container').each(function() {
      if ($(this).attr('class') == 'tip-container') {
        $(this).addClass('dn');
      }
    })
  });

  //cookie操作
  /*顶部广告*/
  // if ($.cookie('ic_ad_site_vip')== null || localStorage.getItem('ic_ad_site_vip')== null) {
  //   $('.ad-site').css('display','block');
  // }
  // $('.ad-site .close-ad-site').click(function(event) {
  //   $.cookie("ic_ad_site_vip", "true",{ expires: 10000 , path: '/' });
  //   localStorage.setItem("ic_ad_site_vip", 'true');
  //   $('.ad-site').slideUp();
  // });
  //companylist 第一次点击收藏提示
  // if ($.cookie('ic_tip_collect')== null || localStorage.getItem('ic_tip_collect')== null) {
  //    $('.jd_col').click(function(event) {
  //        $('.collect-tips').css('display','block');
  //    });

  //    $('#close-collect-tips').click(function(event) {
  //      $('.collect-tips').css('display','none');
  //      if ($('input[name="collectTips"]') .is(':checked')) {
  //        $.cookie("ic_tip_collect", "true",{ expires: 10000 });
  //        localStorage.setItem("ic_tip_collect", 'true');
  //      }
  //    });
  //  }
  //companylist 一键闪填问好弹窗
  $('.ic_tip_flash').click(function(event) {
    $('.stick_tips.flash_tips').css('display', 'block');
  });
  // if ($.cookie('ic_tip_flash')== null || localStorage.getItem('ic_tip_flash')== null) {
  //   $('.stick_tips.flash_tips').css('display','block');
  // }
  $('#close-flash-tips').click(function(event) {
    $('.stick_tips.flash_tips').css('display', 'none');
    // $.cookie("ic_tip_flash", "true",{ expires: 10000 });
    // localStorage.setItem("ic_tip_flash", 'true');
  });
  //var ispc = IsPCReturn();

  //学院提示
  // if ($.cookie('ic_tip_tophone') == null || localStorage.getItem('ic_tip_tophone') == null) {
  //   $('.tipToPhone').css('display', 'block');
  // }
  // $('.tipToPhone .tipToPhone-close').click(function(event) {
  //   $('.tipToPhone').fadeOut();
  //   $.cookie("ic_tip_tophone", "ic_tip_tophone", {
  //     expires: 10000
  //   });
  //   localStorage.setItem("ic_tip_tophone", 'ic_tip_tophone');
  // });
  //msg
  // if ($.cookie('ic_tip_freecourse')== null || localStorage.getItem('ic_tip_freecourse')== null) {
  //    $('#tipforfreecourse').css('display','block');
  //    $('#aca-nav ul.nav li#list').click(function(event) {
  //      $('#tipforfreecourse').css('display','none');
  //      $.cookie("ic_tip_freecourse", "ic_tip_freecourse",{ expires: 10000 });
  //      localStorage.setItem("ic_tip_freecourse", 'ic_tip_freecourse');
  //    });
  //  }
  // var unreads = '';

  // function setLocal(key,value){
  //      var curtime = new Date().getTime();//获取当前时间
  //      localStorage.setItem(key,JSON.stringify({val:value,time:curtime}));//转换成json字符串序列
  // }

  // function getLocal(key,exp)//exp是设置的过期时间
  // {
  //       var val = localStorage.getItem(key);//获取存储的元素
  //       var dataobj = JSON.parse(val);//解析出json对象
  //     if(new Date().getTime() - dataobj.time > exp)//如果当前时间-减去存储的元素在创建时候设置的时间 > 过期时间
  //     {
  //       // console.log("expires");//提示过期
  //     }
  //     else{
  //       // console.log("val="+dataobj.val);
  //        return dataobj.val
  //     }

  // }

  // // var temps  = getLocal('redSpot',100000)

  // // console.log(temps);

  // if (!localStorage.getItem('redSpot')) {
  //     setLocal('redSpot',false);
  // }
  // $('#btnUser').click(function(){
  //     // console.log('btnUser游标点击');
  //     setLocal('redSpot',true);
  //     // console.log( ' localStorage.BtnUser'+localStorage.btnUser);
  //     $('#spotpos').addClass('displayNoneUser');

  // })
  //   getmessage();
  //   setInterval(function(){
  //     getmessage();
  //   },60000);
  //   function getmessage(){
  //     $.ajax({
  //       url : '/index/getmessage',
  //       type : 'post',
  //       dataType:'json',
  //       success : function(data){
  //         // data = JSON.parse(data);
  //         // console.log(data);
  // /*        $("#btnUser").text(data.unread);
  //         $("#newsNum").text(data.unread+'个新消息'); */
  //         if (localStorage.getItem('redSpotData')) {
  //             // console.log('被执行');
  //             if (data.unread == getLocal('redSpotData',10000000)){
  //                 // setLocal('redSpot',false);
  //                 $('#spotpos').addClass('displayNoneUser');
  //             }else{
  //               setLocal('redSpotData',data.unread);
  //                setLocal('redSpot',false);
  //               $('#spotpos').removeClass('displayNoneUser');
  //             }
  //         }

  //         if (!localStorage.getItem('redSpotData')) {
  //              setLocal('redSpotData',data.unread);
  //         } 
  //         if (data.unread == '0') {
  //              $('#spotpos').addClass('displayNoneUser')
  //         }

  //         // if (data.changeData == true) {
  //         //     $('#spotpos').removeClass('displayNoneUser')
  //         // }else{
  //         //     $('#spotpos').addClass('displayNoneUser')
  //         // }
  //         if (getLocal('redSpot',10000000) == false) {
  //             $('#spotpos').removeClass('displayNoneUser');
  //             // console.log('同样被执行');
  //         }
  //       }
  //     })
  //   }
  //   //end msg

});

$(window).resize(function() {
  var bkw = $('.main-content').width();
  $('#bk-head').css('width', bkw);
  // var aside  = $('.aside').width();
  // $('.aside .nav-aside').css('width',aside );
  //  $('#aside').css('width',aside );
});

function IsPCReturn(e) {
  var userAgentInfo = navigator.userAgent;
  var Agents = ["Android", "iPhone",
    "SymbianOS", "Windows Phone",
    "iPad", "iPod"
  ];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}
//多条件筛选表单
// function selectFilter(a,b,c){
//   var $ = function(e){return document.getElementById(e);}
//   var ipts = $(c).getElementsByTagName('input'),result=[];
//   for(var i=0,l=ipts.length;i<l;i++){
//     if(ipts[i].getAttribute('to')=='filter'){
//       result.push(ipts[i]);
//     }
//   }
//   if($(a)){
//     $(a).value = b;
//     for(var j=0,len=result.length;j<len;j++){
//       if(result[j].value=='' || result[j].value=='0'){
//         result[j].parentNode.removeChild(result[j]);
//       }
//     }
//     document.forms[c].submit();
//   }
//   return false;
// } 
//搜索方法
function editForm(inputId, inputValue) {
  $("#" + inputId).val(inputValue);
  var keyword = $.trim($('#search_input').val());
  var reg = /[`~!@\$%\^\&\*\(\)_<>\?:"\{\},\\\/;'\[\]]/ig;
  var re = /#/g;
  var r = /\./g;
  var kw = keyword.replace(reg, " ");
  if (kw == '') {
    $('#baikeSearchForm').attr('action', '?/Baike/index.html').submit();
  } else {
    kw = kw.replace(re, '井');
    kw = kw.replace(r, '。');
    $('#baikeSearchForm').attr('action', '?/Baike/index.html?kw=' + kw).submit();
  }
  //$("#baikeSearchForm").submit();
}


$('nav#companyaffix li').click(function(event) {
  event.stopPropagation();
  pageScroll();
});