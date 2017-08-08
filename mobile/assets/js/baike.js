mui('body').on('tap', '.nav-scroll li a', function(e) {
      e.preventDefault();
      var scrollHeight = jquery(jquery(this).attr("href")).offset().top - 88;
      jquery("html, body").animate({scrollTop: scrollHeight + "px"}, function() {
        jquery(this).parent().siblings().removeClass('active');
        jquery(this).parent().addClass('active');
      });
    });

    mui('body').on('tap', '.read-answer', function(e) {
      e.stopImmediatePropagation();
      var tag = jquery(this).prev();
      if (tag.hasClass('over-answer')) {
        jquery(this).prev().removeClass('over-answer');
        jquery(this).prev().find('.answer-cover').css('display', 'none');
        jquery(this).text('收起完整回答');
      } else {
        jquery(this).prev().addClass('over-answer');
        jquery(this).prev().find('.answer-cover').css('display', 'block');
        var scrollHeight = jquery(jquery(this).siblings('p.bk-question')).offset().top - 88;
        jquery("html, body").animate({scrollTop: scrollHeight + "px"});
        jquery(this).text('查看完整回答');
      }
    });

    mui('body').on('tap', '.ic-tab-nav li a', function() {
      jquery(this).parent().siblings().removeClass('active');
      jquery(this).parent().addClass('active');
      jquery(jquery(this).attr('href')).addClass('active');
      jquery(jquery(this).attr('href')).siblings().removeClass('active');
    });

    jquery(window).scroll(function(e){
      e.stopPropagation();
      jquery('#bk-nav').find('li a').each(function(i){
        var a = jquery(jquery(this).attr('href')).offset().top,
        b = jquery(jquery(this).attr('href')).outerHeight(),
        c =jquery(window).scrollTop() + 88;
        // console.log('a: '+jquery(jquery(this).attr('href'))+' div距离顶部高度: '+ a);
        // console.log('b: '+jquery(jquery(this).attr('href'))+' div实际高度: '+ b); 
        // console.log('c: '+jquery(jquery(this).attr('href'))+' 窗口滚动的顶部偏移量'+ c);
        if (c >= a && c <= a+b) {
          var obj = 'a[href="'+jquery(this).attr('href')+'"]';
          jquery('.nav-scroll li').siblings().removeClass('active');
          jquery('.nav-scroll li').find(obj).parent().addClass('active');
          //console.log("在这 "+jquery(this).attr('href'));
        }
     })
    });

    mui('body').on('tap', '.ic-nav-vertical .ic-lt-nav a', function(e) {
      console.log('123');
      jquery(this).siblings().removeClass('active');
      jquery(this).addClass('active');
      jquery(jquery(this).attr('href')).siblings().removeClass('active');
      jquery(jquery(this).attr('href')).addClass('active');
    });
     mui('body').on('tap', '.ic-nav-vertical-close', function() {
      jquery('.ic-nav-vertical').fadeOut();
    });
     mui('body').on('tap', '.open-nav', function() {
      jquery('.ic-nav-vertical').fadeIn();
    });