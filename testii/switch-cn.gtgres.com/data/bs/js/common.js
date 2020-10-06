'use strict';
// =======================================================================
// 関数定義
// =======================================================================

// postid指定の場合
function _BS_getById(originData, id){
	var destData = [];
	for (var i = 0; i<originData.length; i++) {
		if(originData[i].id===id){
			destData.push(originData[i]);
			break;
		}
	}
	return destData;
}

// カテゴリ指定の場合
function _BS_getByCategory(originData, category){
	var destData = [];
	for (var j = 0; j<originData.length; j++) {
		for(var jj = 0; jj<originData[j]._embedded['wp:term'][0].length; jj++){
			if(decodeURI(originData[j]._embedded['wp:term'][0][jj].slug)===category){
				destData.push(originData[j]);
			}
		}
	}
	return destData;
}

// タグ指定の場合
function _BS_getByTag (originData, tag){
	var destData = [];
	for (var j = 0; j<originData.length; j++) {
		for(var jj = 0; jj<originData[j]._embedded['wp:term'][1].length; jj++){
			if(decodeURI(originData[j]._embedded['wp:term'][1][jj].slug)===tag){
				destData.push(originData[j]);
			}
		}
	}
	return destData;
}

// 日付指定の場合
function _BS_getByDate (originData, start, end){
	var destData = [];
	var s_y = start.getUTCFullYear();
	var s_m = start.getUTCMonth();
	var s_d = start.getUTCDate();

	for (var i = 0; i<originData.length; i++) {
		var a = new Date(originData[i].date);
		var a_y = a.getUTCFullYear();
		var a_m = a.getUTCMonth();
		var a_d = a.getUTCDate();

		// year が新しければ抜き出す
		if(a_y > s_y){
			destData.push(originData[i]);

		// year が同じでも month が新しければ抜き出す
		}else if( (a_y === s_y) && (a_m > s_m) ){
			destData.push(originData[i]);

		// year, month が同じでも day が新しければ抜き出す
		}else if( (a_y === s_y) && (a_m === s_m) && (a_d > s_d) ){
			destData.push(originData[i]);
		}
	}

	// 期間の終わりが指定されていたら更に処理
	if(end){
		var destData2 = [];
		var e_y = end.getUTCFullYear();
		var e_m = end.getUTCMonth();
		var e_d = end.getUTCDate();

		for (var j = 0; j<destData.length; j++) {
			var a2 = new Date(destData[j].date);
			var a2_y = a2.getUTCFullYear();
			var a2_m = a2.getUTCMonth();
			var a2_d = a2.getUTCDate();

			// year が新しければ抜き出す
			if(a2_y < e_y){
				destData2.push(destData[j]);

			// year が同じでも month が新しければ抜き出す
			}else if( (a2_y === e_y) && (a2_m < e_m) ){
				destData2.push(destData[i]);

			// year, month が同じでも day が新しければ抜き出す
			}else if( (a2_y === e_y) && (a2_m === e_m) && (a2_d < e_d) ){
				destData2.push(destData[i]);
			}
		}
		destData = destData2;
	}
	return destData;
}

// 数の指定
function _BS_getByNumber (originData, number, offset){
	if(number===undefined){
		number = originData.length;
	}
	var destData = [];
	for (var k = offset; k<(number+offset); k++) {
		if(originData[k]){
			destData.push(originData[k]);
		}
	}
	return destData;
}



var _BS = {};
_BS.status = false; // ステータス。全データjsonを取得したら true に変わる。

// =======================================================================
// 記事データの取得
// =======================================================================
_BS.getJSON = function(options){

	// ----------------------------------------------------------
	// 全データjsonがなければ取得する（リクエストされた最初の1回の想定）
	// ----------------------------------------------------------
	if(!_BS.allJSON){
    var jsonpath;
    if (!window.NC3) {
      jsonpath = '/data/bs/' + options.name + '/json/' + options.name + '.json';
    } else {
      jsonpath = window.NC3.depth + '/data/bs/' + options.name + '/json/' + options.name + '.json';
    }

		var req = new XMLHttpRequest();
		req.onreadystatechange = function(){
			if(req.readyState === 4 && req.status === 200){
				_BS.allJSON = JSON.parse(req.responseText);
				_BS.status = true;
			}
		};
		req.open("GET", jsonpath, false);
		req.send(null);
	}

	// 全データjsonを整形用（最後に返す）変数に入れる。
	// これ以降のjson整形はこの変数に対して行い。
	// リクエストごとに最初からやり直す。
	var returnJSON = _BS.allJSON;


	// ----------------------------------------------------------
	// ここからパラメータを元にjson整形
	// ----------------------------------------------------------

	// id指定があれば優先
	if(options.postid){
		returnJSON = _BS_getById(returnJSON, options.postid);

	// カテゴリとタグが両方していされていたらエラーを返す
	}else if(options.category && options.tag){
		returnJSON = 'error';

	// idが指定無しで、カテゴリとタグが両方指定されていなければ
	// その他のパラメータを元に整形
	}else{

		// カテゴリもしくはタグの指定があれば抜き出す。
		if(options.category){
			returnJSON = _BS_getByCategory(returnJSON, options.category);
		}
		if(options.tag){
			returnJSON = _BS_getByTag(returnJSON, options.tag);
		}

		// 日付の指定があれば抜き出す。
		if(options.date){
			returnJSON = _BS_getByDate(returnJSON, options.date[0], options.date[1]);
		}

		// ここから件数の調整
		// ----------------------------------------------------

		// offsetあり・numberあり：
		// 「**件目から**件目までのデータ」
		if(options.offset && options.number){
			returnJSON = _BS_getByNumber(returnJSON, options.number, options.offset);

		// offsetだけ：
		// 「**件目以降のデータ全部」
		}else if(options.offset && !options.number){
			returnJSON = _BS_getByNumber(returnJSON, undefined, options.offset);

		// numberのみ：
		// 「最初から**件分のデータ」
		}else if(!options.offset && options.number){
			returnJSON = _BS_getByNumber(returnJSON, options.number, 0);
		}
	}

	// 整形した json を返す
	return returnJSON;
};



// =======================================================================
// カテゴリの取得
// =======================================================================
_BS.getCategoryList = function(options){
	if(!_BS.categoryJSON){
		var jsonpath = '/data/bs/' + options.name + '/json/' + options.name + '_cate.json';
		var req = new XMLHttpRequest();
		req.onreadystatechange = function(){
			if(req.readyState === 4 && req.status === 200){
				_BS.categoryJSON = JSON.parse(req.responseText);
			}
		};
		req.open("GET", jsonpath, false);
		req.send(null);
	}
	return _BS.categoryJSON;
};

// =======================================================================
// タグの取得
// =======================================================================
_BS.getTagList = function(options){
	if(!_BS.tagJSON){
		var jsonpath = '/data/bs/' + options.name + '/json/' + options.name + '_tag.json';
		var req = new XMLHttpRequest();
		req.onreadystatechange = function(){
			if(req.readyState === 4 && req.status === 200){
				_BS.tagJSON = JSON.parse(req.responseText);
			}
		};
		req.open("GET", jsonpath, false);
		req.send(null);
	}
	return _BS.tagJSON;
};

// =======================================================================
// 記事数の取得
// =======================================================================
_BS.getCount = function(options){

	// ----------------------------------------------------------
	// 全データjsonがなければ取得する（リクエストされた最初の1回の想定）
	// ----------------------------------------------------------
	if(!_BS.allJSON){
		var jsonpath = '/data/bs/' + options.name + '/json/' + options.name + '.json';
		var req = new XMLHttpRequest();
		req.onreadystatechange = function(){
			if(req.readyState === 4 && req.status === 200){
				_BS.allJSON = JSON.parse(req.responseText);
				_BS.status = true;
			}
		};
		req.open("GET", jsonpath, false);
		req.send(null);
	}

	// 全データjsonを整形用（最後に返す）変数に入れる。
	// これ以降のjson整形はこの変数に対して行い。
	// リクエストごとに最初からやり直す。
	var countJSON = _BS.allJSON;

	if(options.category && options.tag){
		countJSON = 'error';
	}else{
		if(options.category){
			countJSON = _BS_getByCategory(countJSON, options.category);
		}
		if(options.tag){
			countJSON = _BS_getByTag(countJSON, options.tag);
		}

		// 日付の指定があれば抜き出す。
		if(options.date){
			countJSON = _BS_getByDate(countJSON, options.date[0], options.date[1]);
		}
	}
	return countJSON.length;
};


