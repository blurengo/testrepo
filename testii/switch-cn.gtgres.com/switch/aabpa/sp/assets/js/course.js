/*
 *
 * File Name : course.js [use jquery]
 *
 */



var course = (function(){
  var _courseModalCup = $('#courseModalCup');
  var _cupBtn = _courseModalCup.find('a');

  var courseSwiper = new Swiper ('#courseModalListInner', {
    loop: true,
    nextButton: '.btn_next',
    prevButton: '.btn_prev',
    spaceBetween: 70,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',


    onSlideChangeStart : function(swiper){
      var _this = $('#courseModalListInner').find('.stage').eq(swiper.snapIndex);
      var cupID = _this.attr('data-cup');
      $('.swiper-wrapper').find('iframe').remove();
      $('#courseModalListInner').find('.stage .img').removeClass('hide');
      _cupBtn.removeClass('active').eq(cupID).addClass('active');
    }
  });

  _cupBtn.on('click', function(){
    var _this = $(this);
    var cupID = _this.attr('data-slide-index');
    var slideIndex = Number(cupID) === 0 ? courseSwiper.loopedSlides  : cupID
    courseSwiper.slideTo(slideIndex);

    _cupBtn.removeClass('active');
    _this.addClass('active');
  });

  swiperOverlay(courseSwiper);

})();
