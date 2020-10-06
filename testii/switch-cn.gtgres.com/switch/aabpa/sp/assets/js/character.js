/*
 *
 * File Name : character.js [use jquery]
 *
 */



var character = (function(){
  var playFlag = false;
  var charaSwiper = new Swiper ('#charaModalListInner', {
    //loop: true,
    nextButton: '.btn_next',
    prevButton: '.btn_prev',
    spaceBetween: 30,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto'
  });

  var toggleImg = function(bigImg, smallImg, targetParent){
    var _this = targetParent;

    _this.parents('.info').prev('.img').find('img').addClass('hide').attr('src', smallImg);
    _this.find('.thumb img').attr('src', bigImg);
  };

  swiperOverlay(charaSwiper);
})();
