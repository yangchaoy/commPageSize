
var mgBag = {

    categoryId: 1, //默认cate id
   deviceId: 1, //默认设备id
    currloadAjax: null, //当前请求
    allPage: 0,
    firstAjax: true,  //第一次请求
    pageNumber: 0, 

    beforeAjax: function(ele){
    	$(ele).html('<img src="http://img2.7659.com/0e/6e/0f46d7504242302bc8055ad9c8c2.gif"/><span class="load-con">加载中,请稍候...</span>');
    },

	
    loadData: function(num){
        mgBag.currloadAjax = $.ajax({
        　　url : "http://sy.kuaiyong.com/e/interface/wap/libaoList.php?order=0&type=0&"+"?page="+num,
        　　type : "get",
            dataType: "jsonp",
            jsonp: "callback",
			jsonpCallback:"commonmybag",
            timeout: 30000,
            beforeSend: function(){
               $(".my-bag-list").html('<div class="loading-before"><img src="http://img2.7659.com/0e/6e/0f46d7504242302bc8055ad9c8c2.gif"/><span>加载中,请稍候...</span></div>');
            },
        　　success : function(data) {
                
				if(data.code==1){
					var resultData = data.data.data,
                        html = "";
                   
                    mgBag.allPage = data.data.total;
					//alert(data.total);
					
                    $.each(resultData,function(index){
						html+='<li class="clearfix">';
						html+='	  <dl>';
						html+='		   <dt><img src="'+resultData[index].titlepic+'"/><p></p></dt>';
						html+='		   <dd>';
						html+='		   		<h3><a href="'+resultData[index].titleurl+'" title="'+resultData[index].fname+'">'+resultData[index].fname+'</a></h3>';
						html+='				<span class="name">游戏名称：<i>'+resultData[index].title+'</i></span>';
						html+='				<span>有效期至：<i>'+resultData[index].endtime+'</i></span>';
						html+='				<span>礼包码：<i>'+resultData[index].code+'</i></span>';
						html+='			</dd>';
						html+='	  </dl>';
						html+='		<a class="bag-detail" href="'+resultData[index].titleurl+'">礼包详情</a>';
						html+='</li>';
                    })
				}
                $(".my-bag-list").html(html); 
                if(mgBag.firstAjax){
					mgBag.pageAjax(".page",mgBag.allPage,1,mgBag.dataCallback);
					$(".prev").hide();
				}
				if(data.data.total>1){
					$(".page").show();
				}else{
					$(".page").hide();
				}   
                    
                // mediaLazyload();
        　　},
            error: function(xhr){
                if(xhr.statusText!=='abort'){
                   alert("您的网速有点慢,请稍后重试");
                }
            }
        });
    },
    //分页
    pageAjax: function(ele,allNum,pageSize,fuc){
        $(ele).pagination(allNum, 
            {
                callback: fuc,
                prev_text: '上一页',       //上一页按钮里text
                next_text: '下一页',       //下一页按钮里text
                items_per_page: pageSize,  //显示条数
                num_display_entries: 3,    //连续分页主体部分分页条目数
                current_page: 0,   //当前页索引
                num_edge_entries: 2      //两侧首尾分页条目数
               
            }
        );
    },
    dataCallback: function(index){
        mgBag.pageNumber = index+1;
        if(mgBag.pageNumber>1){
            mgBag.firstAjax = false;
            mgBag.loadData(mgBag.pageNumber);
			$(".prev").show();
        }
        if(!mgBag.firstAjax&&mgBag.pageNumber==1){
            mgBag.loadData(mgBag.pageNumber);
			$(".prev").hide();
        }
		if(mgBag.allPage==mgBag.pageNumber){
			$(".next").hide();
		}
    }
}


mgBag.loadData(1);




var mediaLazyload = function()
	{
		var SP_URL_IMG='images/';
		$("img[media_src]").lazyload({srcName:"media_src",placeholder:""});
}

