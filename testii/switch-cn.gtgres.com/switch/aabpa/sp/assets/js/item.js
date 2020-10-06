/*
 *
 * File Name : item.js [use jquery]
 *
 */



var item = (function(){
  var itemSwiper = new Swiper ('#itemModalListInner', {
    //loop: true,
    nextButton: '.btn_next',
    prevButton: '.btn_prev',
    spaceBetween: 20,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',

    onSlideChangeEnd : function(swiper){
      // var _this = $('#itemModalListInner').find('.item').eq(swiper.snapIndex);
      // var ytID = _this.attr('data-ytid');

      // $('.swiper-wrapper').find('iframe').remove();
      // if(ytID){
      //   var ytBox = _this.find('.yt');
      //   var ytBoxID = ytBox.attr('id');

      //   var youtubeHtml = '<iframe id="player_'+ ytBoxID +'" width="450" height="200" src="https://www.youtube.com/embed/'+ ytID +'?rel=0&amp;showinfo=0&enablejsapi=1&controls=0" frameborder="0" allowfullscreen></iframe>';

      //   ytBox.append(youtubeHtml);

      //   setTimeout(function(){
      //     videoControl('mute', 'player_'+ytBoxID);
      //     //videoControl('playVideo', 'player_'+ytBoxID);
      //   },1000);
      // }
    }
  });

  swiperOverlay(itemSwiper);
})();
