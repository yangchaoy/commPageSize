$(document).ready(function(){
	hotHover();
	tabHover();
	listHover();
	huaHover();
	/****  焦点图背景大图的获取 ********/
	var bgimgs = new Array();
	$.each($('#banner_wrap').find('ul.cont_banner li img'),function(i,n){
		bgimgs.push('url('+$(n).prop('src')+' ) no-repeat');
		
	});
	/****  焦点图背景大图的获取 ********/
	banner(bgimgs);
	tagList();
	gameHover();
	detaliSlider();
	//fhSlider();
	split();
	split1();
//	split2();
	
	
})
function hotHover(){
	$(".hot-list li").on("mouseover",function(){
		var index = $(this).index();
		
		$(this).parent().find("li").find(".hot-list-img").removeClass("current");
		$(this).parent().find("li").find(".hot-list-view").removeClass("current-hide");

		$(this).find(".hot-list-img").addClass("current");
		$(this).find(".hot-list-view").addClass("current-hide");
		if(index==9){
			$(this).find(".hot-list-img").css({"border-bottom":"none"});
			
		}
	})
}	

function tabHover(){
	$("#game_list li").on("mouseover",function(){
		var index = $(this).index();
		$(this).addClass("cur").siblings().removeClass("cur");
		$('#hot_game_show .hot_game_show').eq(index).show().siblings().hide();
	})
}

function listHover(){
	$('.list-item li').on("mouseover",function(){
		var index = $(this).index();
		$(this).addClass("cur").siblings().removeClass("cur");
	})
}

function huaHover(){
	var i= 46;
	$(".the-game dl").hover(function(){
		$(this).find("dd").stop().animate({bottom:0+"px"},200)	
	});
	$(".the-game dl").mouseout(function(){
		$(this).find("dd").stop().animate({bottom:-i+"px"},500)	
	});
}



function banner(bgimgs){
		var Bancount = 0,
			$cont_banner_option = $(".cont_banner li"),
			BanPicLen = $cont_banner_option.length,
			$c_point_option = $(".c_point b"),
			$small_img_div = $(".c_small_img div");
		var $cont_bg = $(".cont_bg");
		var	bg_img = bgimgs;
					
		
		//定时切换
		bannerFadeShow();
		function bannerFadeShow(){	
			var width = $(document).width();
			//console.log(width)
			if(Bancount == BanPicLen){
				Bancount = 0;
			};	
			$cont_banner_option.eq(Bancount).show().siblings().hide();
			$c_point_option.eq(Bancount).addClass('p_cur').siblings().removeClass();
			 
			$small_img_div.eq(Bancount).addClass("img_cur").siblings().removeClass();
			$cont_bg.css('background',bg_img[Bancount]);
			$cont_bg.css('background-size',"100% 100% ");
			//$cont_bg.css(width);
			//$cont_bg.css('width',width+'px');
			
			
			BannerTimer = setTimeout(function(){
				bannerFadeShow();
				Bancount++;
			}, 2000 );
		};
		
		$small_img_div.on({
			"mouseover":function(){
				var thisIndex = $(this).index(),
					NumCurIndex = $('.c_point b.p_cur').index();//求当前展示的
				if(NumCurIndex == thisIndex){}else{					
					Bancount = thisIndex;
					$cont_banner_option.eq(Bancount).show().siblings().hide();
					
					$c_point_option.eq(Bancount).addClass('p_cur').siblings().removeClass();
					$small_img_div.eq(Bancount).addClass("img_cur").siblings().removeClass();
					$cont_bg.css('background',bg_img[Bancount]);
					$cont_bg.css('background-size',"100% 100%  ");
					console.log($small_img_div.eq(Bancount));
				};
			}
		});		
		
		var $banner_cen = $(".banner_cen"),
			$step_div = $(".banner_cen .cont_step");
		$banner_cen.on({
			"mouseover":function(){
				clearTimeout(BannerTimer);
				$step_div.stop().show();
			},
			'mouseout':function(){
				bannerFadeShow();
				$step_div.stop().hide();
			}
		});
		
		var $s_left = $(".s_left"),
			$s_right = $(".s_right"),
			imgLen = $(".c_small_img>div").length - 1 ;
		
		$s_left.on("click",function(){
			if(Bancount == 0){
				Bancount = imgLen;
				takeTurns(Bancount);
			}else{
				Bancount--;
				takeTurns(Bancount);				
			}
		});
		
		$s_right.on("click",function(){
			if(Bancount == imgLen){
				Bancount = 0;
				takeTurns(Bancount);
			}else{
				Bancount++;
				takeTurns(Bancount);				
			}
		});
		
		function takeTurns(num){
			$cont_banner_option.eq(num).show().siblings().hide();
			$c_point_option.eq(num).addClass('p_cur').siblings().removeClass();
			$small_img_div.eq(num).addClass("img_cur").siblings().removeClass();
			$cont_bg.css('background',bg_img[num]);
			$cont_bg.css('background-size',"100% 100% ");
		}
}

/*游戏淘标签*/
function tagList(){
	$('.tag-con span').click(function(){
		// alert($(this).html())
		if($(this).html() == "<b></b>收起"){
			$(this).removeClass().addClass("tag-more");
			$(this).parent().parent().removeClass('block');
			$(this).addClass('tag-more').removeClass('tag-close').html('<b><\/b>更多');
			
		} else if($(this).html() == "<b></b>更多"){
			$(this).removeClass().addClass("tag-close");
			$(this).addClass('tag-close').removeClass('tag-more').html('<b><\/b>收起');
			$(this).parent().parent().addClass('block');
		}
	})
}

/*游戏淘列表*/
function gameHover(){
		/*var delayTime = [];
		$(".list-game ul li").on({
			"mouseenter":function(){
				//$(this).find('.game-list-img').css({"border":"1px solid #14a0e6"});
				var index=$(this).index();
				var height=$(this).height();
				$(this).parent().find("li").find(".game-list-img").eq(index).animate({'margin-top':-height});
				//(this).parent().find("li").find(".game-list-img").slideToggle('slow');
			},
			'mouseleave':function(){
				var index=$(this).index();
				var height=$(this).height();
				$(this).parent().find("li").find(".game-list-view").eq(index).animate({'margin-top':0});
				$(this).parent().find("li").find(".game-list-img").eq(index).animate({'margin-top':0});
			}
		});
		$('.list-game ul li').each(function(index){
			$(this).hover(function(){
				var height=$(this).height();
				$(this).parent().find("li").find(".game-list-img").eq(index).animate({'margin-top':0});
			})
		})*/
		
		/*var delayTime = [];
    $('.list-game ul li').each(function(index) {
	
        $(this).hover(function() {
		//alert(55)
			var height=$(this).height();
            delayTime[index] = setTimeout(function() {
               $(this).parent().find("li").find(".game-list-img").eq(index).animate({'margin-top':0})
            },
            400)
        },
        function() {
            clearTimeout(delayTime[index]);
            $(this).parent().find("li").find(".game-list-img").eq(index).animate({'margin-top':0})
        })
    });*/
	var _mytimer;
	$(".list-game ul li").on({
		"mouseenter":function(){
			var index=$(this).index();
			var height=$(this).height();
			var _this=this;

			_mytimer=setTimeout(function(){
				$(_this).parent().find("li").find(".game-list-img").eq(index).animate({'margin-top':-height});
			},400);
			
		},
		'mouseleave':function(){
			var index=$(this).index();
			var height=$(this).height();
			clearTimeout(_mytimer);
			$(this).parent().find("li").find(".game-list-view").eq(index).stop().delay(300).animate({'margin-top':0});
			$(this).parent().find("li").find(".game-list-img").eq(index).stop().delay(300).animate({'margin-top':0});
		}
	});	
}	

/*游戏淘切换*/
function detaliSlider(){
	var tab = {
		startNum: 0,
		prevBtn: $(".btn-prev"),
		nextBtn: $(".btn-next"),
		btnTab: $(".btn-tab span"),
		btnTabNum: $(".pic-vertical-wrap .pic-con").size(),
		imgContainer: $(".pic-container .pic-con"),
		firstImgsrc: $(".pic-container .pic-con ").eq(0).attr("src"),
		currentIndex: 0,
		offSetWidth: $(".pic-vertical-wrap").width(),


		tabSwitch: function(n){
			tab.imgContainer.eq(n).find("a").each(function(){
				$(this).find("img").attr("src",$(this).find("img").attr("src"));
			})
			$(".btn-tab>span").removeClass("on").eq(n).addClass("on");
			 $(".pic-vertical-wrap").animate({left: -tab.offSetWidth*n},250);
		},
		init: function(){
			tab.imgContainer.eq(0).find("a").each(function(){
				$(this).find("img").attr("src",$(this).find("img").attr("src"));
			})
			/*tab.tabSize(tab.btnTabNum);*/
		   $(".pic-vertical-wrap").width(tab.btnTabNum*tab.offSetWidth);

		}
	}


	tab.init();
	if(tab.btnTabNum==1||tab.btnTabNum==0){
		tab.nextBtn.fadeOut();
	}
	for(var i=0;i<tab.btnTabNum;i++){
		$(".btn-tab").append('<span></span>');
	}
	$(".btn-tab>span").eq(0).addClass("on");
	tab.prevBtn.on("click",function(){
		tab.currentIndex--;
		if(tab.currentIndex<0){
			return false;
		}
		if(tab.currentIndex==0){
			tab.prevBtn.fadeOut();
		}
		if(tab.currentIndex<tab.btnTabNum-1){
			tab.nextBtn.fadeIn();
		}
		tab.tabSwitch(tab.currentIndex);
	   
	})
	tab.nextBtn.on("click",function(){
		tab.currentIndex++;
		var index = tab.currentIndex;
		var imgCon = $(".pic-container a").eq(index).find("img");
	   
		if(tab.currentIndex>tab.btnTabNum-1){
			return false;
		}
		if(tab.currentIndex>0){
			tab.prevBtn.fadeIn();
		}
		if(tab.currentIndex==tab.btnTabNum-1){
			tab.nextBtn.fadeOut();
		}
		tab.tabSwitch(tab.currentIndex);
		if(imgCon.attr("src")==undefined){
			
			imgCon.attr("src",imgCon.attr("src"));
		}
		
	})

	//按钮事件
	$(".btn-tab span").on("click",function(){
		
		tab.currentIndex = $(this).index();
		var imgCon = $(".pic-container a").eq(tab.currentIndex).find("img");
	   
		if(tab.currentIndex==0){
			tab.prevBtn.fadeOut();
		}
		if(tab.currentIndex>0){
			tab.prevBtn.fadeIn();
		}
		if(tab.currentIndex==tab.btnTabNum-1){
			tab.nextBtn.fadeOut();
		}else{
			tab.nextBtn.fadeIn();
		}
		$(".pic-vertical-wrap").animate({left: -tab.offSetWidth*tab.currentIndex},200);
		tab.tabSwitch(tab.currentIndex);
		if(imgCon.attr("src")==undefined){
			imgCon.attr("src",imgCon.attr("src"));
		}
	})

	//按钮事件
	$(".btn-tab span").on("click",function(){
		
		tab.currentIndex = $(this).index();
		var imgCon = $(".pic-container a").eq(tab.currentIndex).find("img");
	   
		if(tab.currentIndex==0){
			tab.prevBtn.fadeOut();
		}
		if(tab.currentIndex>0){
			tab.prevBtn.fadeIn();
		}
		if(tab.currentIndex==tab.btnTabNum-1){
			tab.nextBtn.fadeOut();
		}else{
			tab.nextBtn.fadeIn();
		}
		tab.tabSwitch(tab.currentIndex);
		if(imgCon.attr("src")==undefined){
			imgCon.attr("src",imgCon.attr("game-src"));
		}
	})
}
/*游戏淘切换*/





/*回到顶部*/
window.onload=function(){
	var av_height = $(window).height();
	var av_width = $(window).width();
	var go_top= $("#go-top");
	var Gotop_w = go_top.width()+2;
	var Gotop_h = go_top.height()+2;
	var doc_width = 1020;
	var Gotop_x = (av_width>doc_width?0.5*av_width+0.5*doc_width:av_width-Gotop_w);
	var Gotop_y = av_height-Gotop_h;
	var ie6Hack = "<style>.go-top{position:absolute; top:expression(documentElement.scrollTop+documentElement.clientHeight - this.offsetHeight-40);</style>";
	if ('undefined' == typeof(document.body.style.maxHeight)){
		$("body").append(ie6Hack);
	}
	function setGotop(){
		av_height = $(window).height();
		av_width = $(window).width();
		Gotop_y = av_height-Gotop_h-40;
		Gotop_x = (av_width>doc_width?0.5*av_width+0.5*doc_width:av_width-Gotop_w);
		if($(window).scrollTop()>0){
			go_top.fadeIn(200);
		}else{
			go_top.fadeOut(200);
		}
		if ('undefined' == typeof(document.body.style.maxHeight)){
			go_top.animate({"left":Gotop_x},0);
		return false;
		}
		go_top.animate({"left":Gotop_x,"top":Gotop_y},0);
	}
	setGotop();
	$(window).resize(function(){
		setGotop();
	})
	$(window).scroll(function(){
		setGotop();
	})
	go_top.click(function(){
		$("html , body").animate({scrollTop:"0"},100);
	})


}
/*截取字符串*/
function elipsis(str, max){
	var len = str.length, list = str.split(''), i, t = 0;
	
	for (i=0; i<len; i++){
		t++;
		if (/[^\x00-\x80]/g.test(list[i])){
			t++;
		}
		if (t>=max){
			return str.slice(0, i)+'...';
		}
		
	}
	
	return str;
}
function split(){
	var str = $('.game-base-info .intro-info p.name strong').text() ;
	var newHtml = (elipsis(str ,21));
	$('.game-base-info .intro-info p.name strong').html(newHtml) ;
}

function split1(){
	var str = $('.game-list-view p').text() ;
	var newHtml = (elipsis(str ,47));
	$('.game-list-view p').html(newHtml) ;
}
/*function split2(){
	var str = $('.game-list-view h2').text() ;
	var newHtml = (elipsis(str ,15));
	$('.game-list-view h2').html(newHtml) ;
}*/


/*截取字符串*/	