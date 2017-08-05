$(document).ready(function(){
  jQuery.cookie = function(name, value, options) {
      if (typeof value != 'undefined') { // name and value given, set cookie
          options = options || {};
          if (value === null) {
              value = '';
              options.expires = -1;
          }
          var expires = '';
          if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
              var date;
              if (typeof options.expires == 'number') {
                  date = new Date();
                  date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
              } else {
                  date = options.expires;
              }
              expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
          }
          var path = options.path ? '; path=' + options.path : '';
          var domain = options.domain ? '; domain=' + options.domain : '';
          var secure = options.secure ? '; secure' : '';
          document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
      } else { // only name given, get cookie
          var cookieValue = null;
          if (document.cookie && document.cookie != '') {
              var cookies = document.cookie.split(';');
              for (var i = 0; i < cookies.length; i++) {
                  var cookie = jQuery.trim(cookies[i]);
                  // Does this cookie string begin with the name we want?
                  if (cookie.substring(0, name.length + 1) == (name + '=')) {
                      cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                      break;
                  }
              }
          }
          return cookieValue;
      }
  };

  // if ($.cookie('openFirstNew')== null || localStorage.getItem('openFirstNew')== null) {
  //   $('#loading-mask').css('display','block');
  //   $('#loading-download').css('display','block');
  //   $('#private-alert').css('display','block');
  //   $.cookie("openFirstNew", "openFirstNew",{ expires: 10000 });
  //   localStorage.setItem("openFirstNew", 'openFirstNew');
  //   disable_scroll();
  //   //$("body").css({overflow:"hidden"});    //禁用滚动条
  // }
  // if ($.cookie('creditAlert')== null || localStorage.getItem('creditAlert')== null) {
  //   $('#credit-alert').css('display','block');
  //   $.cookie("creditAlert", "creditAlert",{ expires: 10000 });
  //   localStorage.setItem("creditAlert", 'creditAlert');
  //   //$("body").css({overflow:"hidden"});    //禁用滚动条
  // }
  // else if ($.cookie('openFirstNew')=="openFirstNew" || localStorage.getItem('openFirstNew')=="openFirstNew" ){
  //  // $('#opentip').css('display','none');
  //   $('#loading-mask').css('display','none');
  //   $('#loading-download').css('display','none');
  //   $('#private-alert').css('display','none');
  // }
  $('#close-switchtip').click(function(){
    $(this).parent().css('display', 'none');
  });
  $('#close-opentip').click(function(){
    $(this).parent().css('display', 'none');
  });
  // $('#closeloaddl').click(function(){
  //   $(this).parent().css('display', 'none');
  //   $('#loading-mask').css('display','none');
  //   $('#opentip').css('display','block');
  // });
  //  $('#todownload').click(function(){
  //   $(this).parent().css('display', 'none');
  //   $('#loading-mask').css('display','none');
  //   $('#opentip').css('display','block');
  // });
  // $('.close-mask').click(function(){
  //   $(this).parent().css('display', 'none');
  //   $('#loading-mask').css('display','none');
  //   enable_scroll();
  //   //$("body").css({overflow:"auto"});    //滚动条
  // });
  //   $('.close-private').click(function(){
  //   $(this).parent().css('display', 'none');
  //   $('#private-alert').css('display','none');
  // });
 

  // left: 37, up: 38, right: 39, down: 40,
  // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
  var keys = [37, 38, 39, 40];

  function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;  
  }

  function keydown(e) {
      for (var i = keys.length; i--;) {
          if (e.keyCode === keys[i]) {
              preventDefault(e);
              return;
          }
      }
  }

  function wheel(e) {
    preventDefault(e);
  }

  function disable_scroll() {
    if (window.addEventListener) {
        window.addEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = wheel;
    document.onkeydown = keydown;
  }

  function enable_scroll() {
      if (window.removeEventListener) {
          window.removeEventListener('DOMMouseScroll', wheel, false);
      }
      window.onmousewheel = document.onmousewheel = document.onkeydown = null;  
  }
});
