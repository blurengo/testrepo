/*
 *
 * File Name : top.js [use jquery]
 *
 */


var _player = null;
var top = (function(){
  var _mainMovie = $('#mainMovie');
  var _movThumb = $('#movThumb');



  var init = function(){
    overlay();
  };

  function getScrollTop(scroller) {
    scroller = scroller || document.body;
    if (scroller === document.body) {
      return document.body.scrollTop || document.documentElement.scrollTop;
    }
    return -scroller.getBoundingClientRect().top
  }
  
  var toggleScrollThrough = (function toggleScrollThrough() {
    var scrollTop;
    var scroller = document.getElementById('mkWrapper');
    return function (active) {
        if (active) {
          scrollTop = getScrollTop(scroller);
          scroller.style.position = 'fixed';
          scroller.style.top = '-' + scrollTop + 'px';
        } else {
            // 恢复时，需要还原之前的滚动位置
            scroller.style.position = 'static';
            scroller.style.top = '0px';
            window.scrollTo(0, scrollTop);
        }
    };
  }());
  window.toggle = toggleScrollThrough

  var overlay = function(){
    var _ovBG = $('#ovBG');
    var _ovBody = $('#ovBody');
    var _btnClose = $('.btn_close');
    var _targetBtn = $('.modal').find('a');

    _targetBtn.on('click', function(){
      var modalID = $(this).attr('data-id');
      var ytID = $(this).attr('data-ytid');

      if(modalID === 'deluxe'){
        $('#charaModalList').hide();
        $('#courseModalList').hide();
        $('#itemModalList').hide();
        $('#btnClose').hide();
        $('#movie').hide();
      } else {
        $('#charaModalList').show();
        $('#courseModalList').show();
        $('#itemModalList').show();
        $('#btnClose').show();
        $('#movie').show();
      }

      $('#'+modalID).show();
      _ovBG.addClass('active');
      _ovBody.addClass('active');
      toggleScrollThrough(true);

      // youtube set
      if(ytID){
        setYT(ytID);
      }
    });

    _btnClose.on('click', function(){
      _ovBG.removeClass('active');
      _ovBody.removeClass('active');
      toggleScrollThrough(false);
      _ovBody.find('section').hide();
      if(_player){
        _player.pause();
        _player.destroy();
        _player = null;
      }
      _mainMovie.empty();
      setTimeout(function(){
        $('#charaModalList').show();
        $('#courseModalList').show();
        $('#itemModalList').show();
        $('#btnClose').show();
        $('#movie').show();
      }, 300);
    });
  };


  // set youtube
  _movThumb.find('a').on('click', function(){
    var ytid = $(this).attr('data-ytid');

    setYT(ytid);
  });

  var setYT = function(ytid){

    // var youtubeHtml = '<iframe id="player_'+ ytid +'" width="920" height="520" src="https://www.youtube.com/embed/'+ ytid +'?rel=0&amp;showinfo=0&enablejsapi=1" frameborder="0" allowfullscreen></iframe>';
    // _mainMovie.empty().append(youtubeHtml);

    // setTimeout(function(){
    //   //videoControl('mute', 'player_'+ytBoxID);
    //   //videoControl('playVideo', 'player_'+ytid);
    // },1000);
    _player = new Txplayer({
      containerId: 'mainMovie',
      vid: ytid,
      width: 920,
      height: 520,
      autoplay: true
    });
  };

    //ハッシュを確認してmovieならムービーを表示
    //console.log( "location.hash = " +  location.hash );

    if( location.hash == "#movieContents" )
    {
        setTimeout(function()
        {
            setYT( "HljJvwifETg" );
            var _ovBG = $('#ovBG');
            var _ovBody = $('#ovBody');
            var _btnClose = $('.btn_close');
            var _targetBtn = $('.modal').find('a');
            var modalID = _targetBtn.attr('data-id');
            var ytID = _targetBtn.attr('data-ytid');

            $('#'+modalID).show();
            _ovBG.addClass('active');
            _ovBody.addClass('active');

        },2000);
    }


  $(init);
})();
