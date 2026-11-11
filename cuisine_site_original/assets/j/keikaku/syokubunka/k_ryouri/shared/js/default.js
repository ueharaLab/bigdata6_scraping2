$(function(){

	//スマートフォン、タブレット判定
	var ua = navigator.userAgent;
	if (ua.indexOf('iPhone') > -1 || (ua.indexOf('Android') > -1 && ua.indexOf('Mobile') > -1)) {
		// スマートフォン
		$('.jsPrintBtn').css('display','none');
	} else if (ua.indexOf('iPad') > -1 || ua.indexOf('Android') > -1) {
		// タブレット
		$('.jsPrintBtn').css('display','none');
	} else {
		// PC
		$('.jsPrintBtn').css('display','block');
	}

	//ナビゲーション固定
	var fixedNav = function(){
		var $win = $(window);
		var $body = $('body');
		var $nav = $('.main_navi');
		if ($nav.hasClass('typeImg')) {
			var $navH = 0;
		} else {
			var $navH = $nav.outerHeight();
		}
		//console.log($navH);

		var $navPos1 = $('.header_up_bg').outerHeight();
		var $navPos2 = $('.gnav').outerHeight() + 10;
		var $navPos3 = $('.breadcrumb').outerHeight() + 30;
		var $navPos4 = $('.content h1').outerHeight() + 20;
		var $winW = $(window).width();
		if ($winW < 768) {
			var navPos = $navPos1 + $navPos3 + $navPos4;
    } else {
			var navPos = $navPos1 + $navPos2 + $navPos3 + $navPos4;
    }
		//console.log(navPos);
		var fixedClass = 'is-fixed';
		$win.on('load scroll', function() {
			if ( $(this).scrollTop() > navPos ) {
				$nav.addClass(fixedClass);
				$body.css('padding-top', $navH);
			} else {
				$nav.removeClass(fixedClass);
				$body.css('padding-top', '0');
			}
		});
	}
	fixedNav();

	//ウィンドウリサイズ後実行
	/*
	var resizeTimer = false;
	$(window).resize(function(){
		if (resizeTimer !== false){
			clearTimeout(resizeTimer);
		}
		resizeTimer = setTimeout(function () {
			fixedNav();
		}, 200);
	});
	*/

	//詳細を18件ごとに表示
	var division    = 18;
	var divlength   = $('.more_list > *.list').length;

	dlsizePerResult = divlength / division;
	for(i = 1; i < dlsizePerResult; i++){
		$('.more_list > *.list').eq(division * i-1).after('<div class="more_btn btn01 mt20 link'+i+'"><a class="hover" href="javascript:void(0);">read more</a></div>');
	}
	$('.more_list > *.list, .more_btn').hide();

	for(j = 0; j < division; j++){
		$('.more_list > *.list').eq(j).show();
		$('.more_list img').eq(j).each(function() {
			this.src = $(this).data('src');
		});
	}

	$('.more_btn.link1').show();
	$('.more_btn').click(function(){
		index = $(this).index('.more_btn');
		src = $(this).data('src');
		for(k = 0; k < (index + 2) * division; k++){
			$('.more_list > *.list').eq(k).fadeIn();
			$('.more_list img').eq(k).each(function() {
				this.src = $(this).data('src');
			});
		}
		$('.more_btn').hide();
		$('.more_btn').eq(index+1).show();
	});

	//タブエリア
	$('.tab_link > *').on('click', function(){
		var listNum = $(this).index();

		if($(this).hasClass('all')) {
			$('.tab_list > *').css('display','block');
			$('.tab_link > *').removeClass('cl');
			$('.tab_link > *').eq(listNum).addClass('cl');
		} else {
			$('.tab_list > *').css('display','none');
			$('.tab_list > *').eq(listNum).css('display','block');
			$('.tab_link > *').removeClass('cl');
			$('.tab_link > *').eq(listNum).addClass('cl');
		}
	});

	//モーダルウインドウ
	/*
	$('.js_modal01 .dl_btn.cl, .close').on('click', function(){
		//$('.modal, .close').addClass('hidden');
		$('.wrap').addClass('hidden');
	});
	$('.js_modal01 .dl_btn').on('click', function () {
		//$('.modal, .close').addClass('hidden');
		$('.wrap').addClass('hidden');
		//$(this).siblings('.close').removeClass('hidden');
		$(this).siblings('.wrap').removeClass('hidden');
		var result1 = $(this).data('name');
		var result2 = $(this).data('file-s');
		var result3 = $(this).data('file-m');
		var result4 = $(this).data('file-l');
		var result5 = '.' + $(this).data('number');
		var resultNone = undefined;
		//console.log(result5);

		var htmlStr = '';
		htmlStr += '<div class="modal_win">';
		htmlStr += '<ul class="modal_list">';
		if(result2 != resultNone){
			htmlStr += '<li><a href="./images/' + result1 + '/' + result2 + '" target="_blank"><div class="modal_txt01">1920 × 1080 px | 72dpi</div><div class="modal_txt02">JPG</div></a></li>';
		}
		if(result3 != resultNone){
			htmlStr += '<li><a href="./images/' + result1 + '/' + result3 + '" target="_blank"><div class="modal_txt01">3508 × 1973 px | 72dpi</div><div class="modal_txt02">JPG</div></a></li>';
		}
		if(result4 != resultNone){
			htmlStr += '<li><a href="./images/' + result1 + '/' + result4 + '" target="_blank"><div class="modal_txt01">3568 × 2002 px | 72dpi</div><div class="modal_txt02">JPG</div></a></li>';
		}
		htmlStr += '</ul>';
		htmlStr += '</div>';
		//htmlStr += '<div class="close"><img class="resp_img" src="./images/modal_close.png" alt="CLOSE" /></div>';
		$('' + result5 + '').html(htmlStr);
		$('' + result5 + '').removeClass('hidden');
	});
	*/

	//印刷ボタン
	$('.jsPrintBtn').on('click', function(){
		window.print();
		return false;
	});

	//SP用ナビ
	$('.sp_navi').on('click',function(){
		$(this).toggleClass('cl').siblings('.navi').toggleClass('cl');
		$('.main_navi').toggleClass('cl');
	});

	//TOPメインスライダー画像、PC、SP画像差し替え
	var changeImg = function(){
		var $win_w = $(window).width();
		$('.jsChangeImg').each(function(){
			if( $win_w < 481 ){
				$(this).attr('src',$(this).attr('src').replace('_pc','_sp'));
			} else { //PC
				$(this).attr('src',$(this).attr('src').replace('_sp','_pc'));
			}
		});
	};
	changeImg();

	//ウィンドウリサイズ中実行
	$(window).on('load resize',function(){
		changeImg();
	});

	//スムーズスクロール
	$('a[href^="#"]').click(function() {
		var $win_w = $(window).width();
		var $navPos = $('.main_navi').outerHeight() + 10;
		console.log($win_w);
		console.log($navPos);
		var speed = 300;
		var href= $(this).attr('href');
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top - $navPos;
		$('body,html').animate({scrollTop:position}, speed, 'swing');
		return false;
	});
});
