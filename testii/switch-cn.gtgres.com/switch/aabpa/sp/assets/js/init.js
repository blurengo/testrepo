/*
 *
 * File Name : init.js [use jquery]
 *
 */



var mk = (function(){
  var loading = function(callback){
  var loading = {};

  var _loadingBar = $(".loadingBar");

  var loadCount = 0,
      imgLength = $("img").size();
  $("img").each(function() {
    var src = $(this).attr("src");
    $("<img>")
      .attr("src", src)
      .load(function() {
        loadCount++;
      });
  });

  var timer = setInterval(function() {
    _loadingBar.css({
      "width": (loadCount / imgLength) * 100 + "%"
    });
    if((loadCount / imgLength) * 100 == 100){
      clearInterval(timer);
      _loadingBar.delay(200).animate({
        "opacity": 0
      }, 200);

      if(typeof callback === 'function' && callback()){
        callback();
      }
    }
  }, 5);

  return loading;
};



$(function(){
  var init = new loading(function(){
    $('#loading').delay(400).fadeOut(1000, function(){

    });

    $('a.scroll').on('click', function(){
      var hash = $(this).attr('href');
      smoothScroll(hash);
      return false;
    });

    $('.target').scrollClass();

    if(util.isAndroid){
      $('body').addClass('android');
    }
    else {
      $('body').addClass('ios');
    }
  });
});
})();
