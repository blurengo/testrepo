/*
 *
 * File Name : function.js [use jquery]
 *
 */



/*********************************************************************************************/
// OSチェック
// ex) if(util.isTablet){ ... } // true or false
/*********************************************************************************************/
var util = (function(u){
  return {
    isTablet:(u.indexOf("windows") != -1 && u.indexOf("touch") != -1 && u.indexOf("tablet pc") == -1) || u.indexOf("ipad") != -1 || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1),

    isAndroid:(u.indexOf("windows") != -1 && u.indexOf("phone") != -1) || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1),

    isIOS:(u.indexOf("windows") != -1 && u.indexOf("phone") != -1) || u.indexOf("iphone") != -1 || u.indexOf("ipod") != -1,

    isWebview:(/iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) && /twitter|fbav|line/.test(navigator.userAgent.toLowerCase()))
  };
})(window.navigator.userAgent.toLowerCase());
/*********************************************************************************************/



/*********************************************************************************************/
// OSのバージョン判断
/*********************************************************************************************/
// iOS
function ios_ver(){
  var ua = navigator.userAgent.toLowerCase();
  if (ua.match(/iphone/i) !== null || ua.match(/ipod/i) !== null || ua.match(/ipad/i) !== null) {
    var versionInfo = ua.match(/os (\d+)_(\d+)_?(\d+)?/);
    var version = parseInt(versionInfo[1],10);
    return version;
  }
}

// Android
function and_ver(){
  var and_ua = navigator.userAgent;
  if( and_ua.indexOf("Android") > 0 ) {
    var version = parseFloat(and_ua.slice(and_ua.indexOf("Android")+8));
    return version;
  }
}
/*********************************************************************************************/



 /*********************************************************************************************/
 // スムーズスクロール
 /*********************************************************************************************/
 var isHtmlScroll = (function(){
   var html = $('html'), top = html.scrollTop();
   var el = $('<div/>').height(10000).prependTo('body');
   html.scrollTop(10000);
   var rs = !!html.scrollTop();
   html.scrollTop(top);
   el.remove();
   return rs;
 })();

 function smoothScroll(target, callback){
   var speed = 1000;
   var easing = 'easeOutExpo';
   //var t = ( window.chrome || 'WebkitAppearance' in document.documentElement.style )? 'body' : 'html';
   var t = $(isHtmlScroll ? 'html' : 'body');
   $(t).queue([]).stop();
   var $targetElement = $(target);
   var scrollTo = $targetElement.offset().top;
   var maxScroll;
   if (window.scrollMaxY) {
     maxScroll = window.scrollMaxY;
   } else {
     maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
   }
   if (scrollTo > maxScroll){
     scrollTo = maxScroll;
   }
   $(t).stop(true,true).animate({ scrollTop: scrollTo }, speed, easing, function(){
     if(typeof callback === 'function' && callback()){
       callback();
     }
   });
 }
 /*********************************************************************************************/


 /*********************************************************************************************/
 // スロール位置に合わせてclass追加
 /*********************************************************************************************/
 (function($){
   $.fn.scrollClass = function(c){
     var defaults = {};
     var config = $.extend(defaults, c);
     var target = this;
     var _window = $(window);

     function addAction(){
       var length = target.length;
       for(var i=0; i<length; i++){
         if(target.eq(i).hasClass('action')) continue;

         var in_position = target.eq(i).offset().top + 200;
         //var in_position = target.eq(i).offset().top + (_window.height()/3);
         var window_bottom_position = _window.scrollTop() + _window.height();
         if(in_position < window_bottom_position){
           target.eq(i).addClass('action');
         }
       }
     }
     addAction();

     $(window).on('scroll', function(){
       addAction();
     });
     return target;
   };
 })(jQuery);
 /*********************************************************************************************/


/*********************************************************************************************/
// swiper overlay
/*********************************************************************************************/
function swiperOverlay(swiperObj){
  var _ovBG = $('#ovBG');
  var _ovBody = $('#ovBody');
  var _btnClose = $('.btn_close');
  var _targetBtn = $('.modal').find('a');

  _targetBtn.on('click', function(){
    var modalID = $(this).attr('data-id');

    _ovBG.addClass('active');
    _ovBody.addClass('active');
    var swiperIndex = Number(modalID) === 0 ? swiperObj.loopedSlides : modalID;
    swiperObj.slideTo(swiperIndex);
  });

  _btnClose.on('click', function(){
    _ovBG.removeClass('active');
    _ovBody.removeClass('active');
    $('.swiper-wrapper').find('iframe').remove();
  });
}
/*********************************************************************************************/



/*********************************************************************************************/
// youtube video control
/*********************************************************************************************/
function videoControl(action, targetID){
  var $playerWindow = $('#'+targetID)[0].contentWindow;
  $playerWindow.postMessage('{"event":"command","func":"'+action+'","args":""}', '*');
}
/*********************************************************************************************/
