mui('body').on('tap','.referral-container .r-p a',function(event){
  var _this = jquery(this);
  var href = _this.attr('href');
  window.location.href=href;
});
mui('body').on('tap','.referral-container .referral-card a',function(event){
  var _this = jquery(this);
  var href = _this.attr('href');
  window.location.href=href;
});
//alert box
mui('body').on('tap','.alert-trigger',function(event){
  var _this = jquery(this),target = _this.attr('alert-target'),ishidden = jquery(target).is(":hidden");
  if (ishidden) {jquery(target).fadeIn();}else{jquery(target).fadeOut();}
  //overlay
  if (target && jquery(target).siblings('.alert-overlay').length>0 && ishidden) {
    jquery(target).siblings('.alert-overlay').fadeIn();
  }else if(target && jquery(target).siblings('.alert-overlay').length>0 && !ishidden){
    jquery(target).siblings('.alert-overlay').fadeOut();
  }
});
  //会员0分兑换按钮
mui('body').on('tap','.ref-trigger',function(){
   var _this = jquery(this),type = jquery('input[name="usertype"]').val(),
      _title = jquery('input[name="rtitle"]').val(),
      _credit = jquery('input[name="myCredit"]').val(),
      _needCredit = jquery('input[name="needCredit"]').val(),
      _enough;
      parseInt(_credit) >= parseInt(_needCredit) ?_enough = 1: _enough=0;
        console.log(type);
        jquery('.bottom-wrapper a.pull-left').removeClass('btn-0-refferal-credit btn-refferal-credit btn-bottom-close ref-credit-trigger alert-trigger');
      jquery('.bottom-wrapper a.pull-right').removeClass('btn-0-refferal-credit btn-refferal-credit btn-bottom-close ref-credit-trigger');
        if (type === "3" || type === "4") {
          jquery('.bottom-wrapper .bottom-tip').html('同学，你已是白熊VIP，点击上方黄色按钮可 0 积分兑换内推喔！');
          jquery('.bottom-wrapper a.pull-left').html('分多，我任性').addClass('ref-credit-trigger');
          jquery('.bottom-wrapper a.pull-right').html('谢谢提醒').addClass('btn-bottom-close');
      }else if ((type === "1" || type === "2") && _enough) {
          jquery('.bottom-wrapper .bottom-tip').html('当前积分 <span class="text-taro">'+_credit+'</span> 分，确认 <span class="text-taro">'+_needCredit+'</span> 积分兑换「'+_title+'」内推？');
          jquery('.bottom-wrapper a.pull-left').html('取消').addClass('btn-bottom-close');
          jquery('.bottom-wrapper a.pull-right').html('立即兑换').addClass('btn-refferal-credit');
      }else if ((type === "1" || type === "2") && _enough == 0) {
          jquery('.bottom-wrapper .bottom-tip').html('当前积分 <span class="text-taro">'+_credit+'</span> 分，积分不够兑换。');
          jquery('.bottom-wrapper a.pull-left').html('如何赚取积分').attr({href: '/company/setting',target: '_blank','open-type':'common'});
          jquery('.bottom-wrapper a.pull-right').html('下次再兑').addClass('btn-bottom-close');
      }
    var menuWrapper = document.getElementById("bottom-wrapper");
    var menuWrapperClassList = menuWrapper.classList;
    if (menuWrapperClassList.contains('mui-active')) {
      menuWrapper.className = 'bottom-wrapper slideOutDown animated';
    } else {
      menuWrapper.className = 'bottom-wrapper slideInUp animated mui-active';
    }
});  
//积分兑换
mui('body').on('tap','.ref-credit-trigger',function(){
   event.preventDefault();
  jquery('.bottom-wrapper a.pull-left').removeClass('btn-0-refferal-credit btn-refferal-credit btn-bottom-close ref-credit-trigger alert-trigger');
  jquery('.bottom-wrapper a.pull-right').removeClass('btn-0-refferal-credit btn-refferal-credit btn-bottom-close ref-credit-trigger');
  var _title = jquery('input[name="rtitle"]').val(),_credit = jquery('input[name="myCredit"]').val(),_needCredit = jquery('input[name="needCredit"]').val(),_enough;
  parseInt(_credit) >= parseInt(_needCredit) ?_enough = 1: _enough=0;
  if (_enough) {
      jquery('.bottom-wrapper .bottom-tip').html('当前积分 <span class="text-taro">'+_credit+'</span> 分，确认 <span class="text-taro">'+_needCredit+'</span> 积分兑换「'+_title+'」内推？');
      jquery('.bottom-wrapper a.pull-left').html('取消').addClass('btn-bottom-close');
      jquery('.bottom-wrapper a.pull-right').html('立即兑换').addClass('btn-refferal-credit');
  }else if (_enough == 0) {
      jquery('.bottom-wrapper .bottom-tip').html('当前积分 <span class="text-taro">'+_credit+'</span> 分，积分不够兑换。');
      jquery('.bottom-wrapper a.pull-left').html('如何赚取积分').attr({href: '/company/setting',target: '_blank','open-type':'common'});
      jquery('.bottom-wrapper a.pull-right').html('下次再兑').addClass('btn-bottom-close');
  }
});
//0积分兑换按钮
mui('body').on('tap', '.ref-free-trigger', function() {
  event.preventDefault();
  jquery('.bottom-wrapper a.pull-left').removeClass('btn-0-refferal-credit btn-refferal-credit btn-bottom-close ref-credit-trigger alert-trigger');
  jquery('.bottom-wrapper a.pull-right').removeClass('btn-0-refferal-credit btn-refferal-credit btn-bottom-close ref-credit-trigger');
   var _this = jquery(this),type = jquery('input[name="usertype"]').val(),_title = jquery('input[name="rtitle"]').val(),_credit = jquery('input[name="myCredit"]').val(),_needCredit = jquery('input[name="needCredit"]').val(),_enough;
   if (type === "3" || type === "4") {
      jquery('.bottom-wrapper .bottom-tip').html('当前积分 <span class="text-taro">'+_credit+'</span> 分，确认 <span class="text-taro">0</span> 积分兑换「'+_title+'」内推？');
      jquery('.bottom-wrapper a.pull-left').html('取消').addClass('btn-bottom-close');
      jquery('.bottom-wrapper a.pull-right').html('立即兑换').addClass('btn-0-refferal-credit');
  }else if (type === "1" || type === "2") {
      jquery('.bottom-wrapper .bottom-tip').html('你还不是白熊VIP，不能 0 积分兑换。');
      jquery('.bottom-wrapper a.pull-left').html('了解白熊VIP').addClass('btn-bottom-close alert-trigger').attr('alert-target', '#whatisvip');
      jquery('.bottom-wrapper a.pull-right').html('100 积分兑换').addClass('ref-credit-trigger');
  }
  var menuWrapper = document.getElementById("bottom-wrapper");
    var menuWrapperClassList = menuWrapper.classList;
    if (menuWrapperClassList.contains('mui-active')) {
      menuWrapper.className = 'bottom-wrapper slideOutDown animated';
    } else {
      menuWrapper.className = 'bottom-wrapper slideInUp animated mui-active';
    }
});  
mui('body').on('tap','.btn-bottom-close',function(){
  var menuWrapper = document.getElementById("bottom-wrapper");
  var menuWrapperClassList = menuWrapper.classList;
  if (menuWrapperClassList.contains('mui-active')) {
    menuWrapper.className = 'bottom-wrapper slideOutDown animated';
  } else {
    menuWrapper.className = 'bottom-wrapper slideInUp animated mui-active';
  }
}); 
//dialog close
 mui('body').on('tap', '.ic-dialog-btn-close', function() {
  //$('body').on('click', '.ic-dialog-btn-close', function(event) {
  jquery('.ic-dialog').fadeOut(); return false;
});
mui('body').on('tap', '.card-list .card-item .referral-forward', function() {
  window.location.href = '/company/referraldetail?rid='+this.getAttribute('rid');
});
mui('body').on('tap', '.ic-filter-cancel', function() {
  mui.trigger(document.getElementById('filter-menu-backdrop'),'tap');
});

mui('body').on('tap', '.filter-box .f-item', function() {
  var self = this;
  if (self.classList.contains('active')) {
    self.classList.remove('active');
  }else{
    self.classList.add('active');
  }
});

mui('body').on('tap', '.filter-select .f-select', function() {
  var self = this;
  console.log(self);
  var formName = self.firstChild.getAttribute('filter-form');
  var filterName = self.firstChild.getAttribute('filter');
  var filterStatus = self.firstChild.getAttribute('filter-status');
  var ipts = document.getElementById(formName).getElementsByTagName('input'),result=[];
  for(var i=0,l=ipts.length;i<l;i++){
    console.log(ipts[i]);
      if(ipts[i].getAttribute('to')=='filter'){result.push(ipts[i]);}
   }
   if(document.getElementById(filterName)){
      document.getElementById(filterName).value = filterStatus;
      for(var j=0,len=result.length;j<len;j++){
        if(result[j].value=='' || result[j].value=='0'){
          console.log(result[j]);
          result[j].parentNode.removeChild(result[j]);
        }
      }
      document.forms[formName].submit();
    }
    return false;
});
      
mui('body').on('tap', '.filter-submit', function() {
  var filterArr = document.querySelectorAll('.filter-box .f-item');
  var cid = document.querySelector('input[name="cid"]');
  var conditions = new Array();
  var url = '' , b = '' ,c='';
  jquery.each(filterArr, 
  function() {
    var self = this;
    if (self.classList.contains('active')) {
      var item = self.getAttribute('filter-type');
      conditions.push(item);
    } 
  });
  for (var i = 0; i < conditions.length; i++) {
    (i>=1)?(b = '&'+conditions[i]+'=1'):(b = conditions[i]+'=1');
    url+=b;
  }
  (cid)?(c ='/company/referral/cid/'+cid):(c = '/company/referral');
  window.location.href =c+'?'+url;
});
//点击内推换按钮
mui('body').on('tap', '.btn-0-refferal-credit', function() {
    var _self = jquery(this),
    rid = jquery('input[name="rid"]').val();
    _self.html('兑换中...');
  
    jquery.ajax({
      type: 'POST',
      timeout : 30000, //超时时间设置，单位毫秒
      url: '/Company/referralExchange',
      data: {'rid': rid,'exchangeStatus':0,},
      success: function(data) {
        console.log(data);
        if (data.status == 1) {
          jquery('.bottom-wrapper').fadeOut('700', function() {
            jquery('.ic-alert-success').fadeIn().find('.alert-tip').html('兑换成功');
            setTimeout(function() {
              jquery('.ic-alert-success').fadeOut('fast', function() {
                window.location.reload();
              });
            }, 1500);
          });
        }else if (data.status == 0){

        }
      },
      error: function (textStatus) {
        console.error(textStatus);
      },
      complete: function (XMLHttpRequest,status) {
        if(status == 'timeout') {
          xhr.abort();    // 超时后中断请求
          jquery.alert("网络超时，请刷新", function () {
            location.reload();
          })
        }
      }
    });
});
//点击内推换按钮
mui('body').on('tap', '.btn-refferal-credit', function() {
    var _self = jquery(this),
    rid = jquery('input[name="rid"]').val();
    _self.html('兑换中...');
  
    jquery.ajax({
      type: 'POST',
      timeout : 30000, //超时时间设置，单位毫秒
      url: '/Company/referralExchange',
      data: {'rid': rid,'exchangeStatus':1,},
      success: function(data) {
        console.log(data);
        if (data.status == 1) {
          jquery('.bottom-wrapper').fadeOut('700', function() {
            jquery('.ic-alert-success').fadeIn().find('.alert-tip').html('兑换成功');
            setTimeout(function() {
              jquery('.ic-alert-success').fadeOut('fast', function() {
                window.location.reload();
              });
            }, 1500);
          });
        }else if (data.status == 0){

        }
      },
      error: function (textStatus) {
        console.error(textStatus);
      },
      complete: function (XMLHttpRequest,status) {
        if(status == 'timeout') {
          xhr.abort();    // 超时后中断请求
          jquery.alert("网络超时，请刷新", function () {
            location.reload();
          })
        }
      }
    });
});