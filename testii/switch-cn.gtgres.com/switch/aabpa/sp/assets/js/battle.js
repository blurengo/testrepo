/*
 *
 * File Name : battle.js [use jquery]
 *
 */



var battle = (function(){
  var _battleTxt = $('#battleTxt').find('dl');

  // top slide
  var mySwiperTop = new Swiper ('#battleModeListInner', {
    loop: true,
    nextButton: '#btnBattleNext',
    prevButton: '#btnBattlePrev',
    spaceBetween: 50,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',

    onInit : function(swiper){
      // var _this = $('#battleModeListInner').find('.movie').eq(swiper.snapIndex);
      // var ytID = _this.attr('data-ytid');

      // if(ytID){
      //   var ytBox = _this.find('.yt');
      //   var ytBoxID = ytBox.attr('id');

      //   var youtubeHtml = '<iframe id="player_'+ ytBoxID +'" width="480" height="270" src="https://www.youtube.com/embed/'+ ytID +'?rel=0&amp;showinfo=0&amp;autoplay=0&playlist='+ ytID +'&enablejsapi=1&controls=0&wmode=transparent" frameborder="0" allowfullscreen></iframe>';

      //   ytBox.append(youtubeHtml);
      // }
    },

    onSlideChangeStart : function(swiper){
      var realIndex = swiper.realIndex;

      //_battleTxt.removeClass('active').eq(realIndex).addClass('active');

      // var _this = $('#battleModeListInner').find('.movie').eq(swiper.snapIndex);
      // var ytID = _this.attr('data-ytid');

      // $('.swiper-wrapper').find('iframe').remove();
      // $('#battleModeListInner').find('.movie img').removeClass('hide');
      // if(ytID){
      //   var ytBox = _this.find('.yt');
      //   var ytBoxID = ytBox.attr('id');

      //   var youtubeHtml = '<iframe id="player_'+ ytBoxID +'" width="480" height="270" src="https://www.youtube.com/embed/'+ ytID +'?rel=0&amp;showinfo=0&amp;autoplay=0&playlist='+ ytID +'&enablejsapi=1&controls=0&wmode=transparent" frameborder="0" allowfullscreen></iframe>';

      //   ytBox.append(youtubeHtml);
      // }
    },

    onSlideChangeEnd : function(swiper){
      // var _this = $('#battleModeListInner').find('.movie').eq(swiper.snapIndex);
      // setTimeout(function(){
      //   _this.find('img').addClass('hide');
      // }, 1000);
    }
  });


  // bottom slide
  var mySwiperBottom = new Swiper ('#stageWrap', {
    loop: true,
    slidesPerView: 3,
    freeMode: true
  });
})();
