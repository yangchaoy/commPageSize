$(document).ready(function(){
	fhSlider();
})

/*发号切换*/
function fhSlider(){
	var sWidth = $('.slider').width();
	var len = $('.slider ul li').length;
	var index = 0;
	var picTimer;
	//
	var btn = "<div class='point'>";
	for(var i=0; i < len; i++) {
		btn += "<span>" + (i+1) + "</span>";
	}
	btn += "</div>"
	$(".point").append(btn);
	$(".point span").text('');
	//
	
	$('.slider .point span').mouseenter(function(){
		index = $('.slider .point span').index(this);
		showPics(index);
	}).eq(0).trigger('mouseenter');
	
	$('.slider ul').css("width",sWidth*(len+1));
	
	$('.slider').hover(function(){
		clearInterval(picTimer);
	},function(){
		picTimer = setInterval(function() {
			if( index==len){
				showFirPic();
				index = 0;
			} else{
				showPics(index);
			}
			index++;
		},3000)	
	}).trigger("mouseleave");
	
	function showPics(index) { 
		var nowLeft = -index*sWidth; 
		$(".slider ul").stop(true,false).animate({"left":nowLeft},500); 
		$(".slider .point span").removeClass("cur").eq(index).addClass("cur"); 
	}
	
	function showFirPic(){
		$('.slider ul').append($('.slider ul li:first').clone());
		var nowLeft = -len*sWidth;
		$('.slider ul').stop(true,false).animate({},500,function(){
			$('slider ul').css('left',0);
			$('slider ul li:last').remove();
		});
		$('.slider .point span').removeClass('cur').eq(0).addClass('cur');
	}
	
}



$(function(){
	var libao={count:500,'getlb':50};
	var getlb = libao.getlb,
		count = libao.count,
		oldWidth = 0,
		tranTime;
	function progress(a,b,c){
		var ratio= parseInt(10000 * (a/b))/ 100 ;
		tranTime = parseInt(ratio - oldWidth) / 3 * 50;
		console.log(tranTime);
		$("#bar").animate({"width":ratio+"%"},tranTime,function(){
			oldWidth = ratio;
		});
		$("#bar").attr("title",ratio+"%");
		$("#number").html(a+"/"+b);
	}
	progress(getlb,count,oldWidth);
	
	//按钮点击后执行
	$(".ling-btn").on("click",function(){
		getlb = getlb -1;
		progress(getlb,count,oldWidth);
	});
	
});



//弹出层
function show(cover,id){
	var showBoxCenter = function() {
		var objCover=document.getElementById(cover);
		var objId=document.getElementById(id);
		objCover.style.display="block";
		objId.style.display="block";
		var scrollW=document.documentElement.scrollWidth;
		var scrollH=document.documentElement.scrollHeight;
		var T=(document.documentElement.clientHeight-objId.clientHeight)/2+document.documentElement.scrollTop;
		var L=(document.documentElement.clientWidth-objId.clientWidth)/2+document.documentElement.scrollLeft;
		objCover.style.width=scrollW+"px";
		objCover.style.height=scrollH+"px";
		objId.style.top=T+"px";
		objId.style.left=L+"px";
	};
	showBoxCenter();
	window.onresize = function() {
		showBoxCenter();
	};
}
function hide(cover,id){
	var objCover=document.getElementById(cover);
	var objId=document.getElementById(id);
	objCover.style.display="none";
	objId.style.display="none";
}

















