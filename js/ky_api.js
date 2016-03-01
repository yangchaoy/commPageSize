/*	
	version: 1.0
	author: mxd
	Email: mengxiande@kuaiyong.com	
*/
var _kyurl='',
_browser_type = (function()
{
	var browserName = navigator.userAgent.toLowerCase();
	var browserType = "unknown";
	if (/msie/i.test(browserName) && !/opera/.test(browserName)) {
		browserType = "IE";
	} else if (/firefox/i.test(browserName)) {
		browserType = "Firefox";
	} else if (/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName)) {
		if(/360EE/i.test(browserName)){
			browserType = "SB360";
		}else{
			browserType = "Chrome";
		}
	}else if (/opera/i.test(browserName)) {
		browserType = "Opera";
	} else if (/webkit/i.test(browserName) && !(/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName))) {
		browserType = "Safari";
	}
	return browserType;
})(),
_cooperate_site_url=(function(){
	var local=window.location.hostname.toLowerCase();
	local=local.replace(/\./g,'');
	return local;
})();

function _filldwnlink(urls) {
	var plat = navigator.platform;
	plat = plat ? plat.toLowerCase() : null;
	if (plat && (plat.indexOf('win') == 0 || plat.indexOf('mac') == 0)) {
		if (urls) {
			var local_uri = null;
			var ds = [];
			for (var k in urls) {
				var url = urls[k];
				if (url && url.length > 0) {
					if (!local_uri) {
						local_uri = url;
					}
					ds.push(urls[k]);
				}
			}
			//_kyurl="http://appdown.wanmeiyueyu.com/Data/product/setup/KYSetup_2103B1_2012.exe";
			_kyurl=ds[0];
		}
	}
}
function _getId(id){
	var e=document.getElementById(id);
	if(typeof(e)!=='undefined'){
		return e;
	}else{
		return null;	
	}	
};
function _createDom(tag,id,Obj,hide){
	var nbox = _getId(id);
	if(!nbox){
		nbox = document.createElement(tag);
		nbox.id = id;
		if (typeof(Obj) != 'undefined' && Obj) {
			for (k in Obj) nbox[k] = Obj[k];
		}
		if (typeof(hide)!='undefined') nbox.style.cssText='display:none;';
		document.body.appendChild(nbox);
	}
	return nbox;
}
function _posi_Cetr(idobj){
	var id=_getId(idobj);
	if(id==null){
		return;
	}	
	var obj=_getId(idobj);
	if (window.XMLHttpRequest){    //非IE6浏览器
        obj.style.top=(document.documentElement.clientHeight-obj.offsetHeight)/2+"px";
        obj.style.left=(document.documentElement.clientWidth-obj.offsetWidth)/2+"px";                 
	} else {
        obj.style.top=(document.documentElement.scrollTop+document.body.scrollTop+(document.documentElement.clientHeight-obj.offsetHeight)/2)+"px";
        obj.style.left=(document.documentElement.scrollLeft+(document.documentElement.clientWidth-obj.offsetWidth)/2)+"px";                 
	}
}
function _addHandler(element, type, handler){
	if(element){
		if (element.addEventListener){
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent){
			element.attachEvent("on" + type, handler);
		} else {
			element["on" + type] = handler;
		}
	}
}

function _createPlugin() {
	var device = _getId('kyObject');
	if (!device) device = _createDom('div', 'kyObject');
	if(device.innerHTML.length<=0){
		if(_browser_type == 'IE') device.innerHTML='<object id="gl" style="Z-INDEX: 8" classid="CLSID:284D793B-92CD-4642-9198-93A77F8F12E6" width="10" height="10"></object>';
		else device.innerHTML = '<embed id="gl" type="application/np_kyplugin" width="3" height="2">';
	}
	var gl = _getId('gl');
	if (gl && typeof(gl.status) != 'undefined') return gl;
	return null;
}
function _remotePlugin() {
	var device = _getId('kyObject');
	if (device) document.body.removeChild(device);
}

var ii = 0;
function ky_pluginRefresh() {	
	if(_browser_type == 'IE')
	{	
		var timer = setInterval(function() {
	//document.title = ii++;
			try {
				var gl = _createPlugin();
				
				if (gl) {
					if (typeof(gl.status) != 'undefined'){
						clearInterval(timer);
						location.replace(location.href);
						return;
					}
				}
			}
			catch(e) {}
		}, 1000);		
		}
	else
	{	
		var	timer = setInterval(function() {
	//document.title = ii++;
			try {
				_createPlugin();
				var pls = navigator.plugins;
				pls.refresh(false);
				var len = pls.length;
				for (var i = 0; i < len; i++) {
					var p = pls[i];
					if (p.name.indexOf('Ky Plugin') >= 0) {
						clearInterval(timer);
						location.replace(location.href);
						return;						
						break;
					}
				}
			}
			catch(e) {}
		}, 1000);
	}	
}
function ky_startApp(appName,appSrc,appid)
{	
	this._ky_api = this._ky_api || (function() {
		var kyapi=this;
		kyapi.nloadok = 0,
		kyapi.che_gl_sta = '',
		kyapi.StartOk = 0,
		kyapi.iframeId='ky_iframe1',
		kyapi.verjspath = 'http://www.kuaiyong.com/data/ver.js';
		kyapi.obj_scroll = function(){		
			_posi_Cetr("ky-alert-outer");
			//_posi_Cetr('ky-graybg');
		},
		kyapi.searchKy = function(){
			var iframe1=_getId('ky_iframe1');
			if(_browser_type == 'Opera'){
				var pl_pls=window.navigator.plugins,
					plsArr=new Array();
					for(var k=0; k<pl_pls.length;k++){
						plsArr.push(pl_pls[k].name);			
					}	
					var plsStr=plsArr.toString();			
					if(plsStr.indexOf('Ky Plugin')>0){
						kyapi.removeIframeContent(iframe1);
					}else{
						kyapi.addIframeContent(iframe1);
					}
				return;
			}	
			if(_browser_type!='IE'){
				var pls=window.navigator.plugins;
				for (var i = 0; i < pls.length; i++) {
					var p = pls[i];
					if (p.name == 'Ky Plugin') {
						kyapi.removeIframeContent(iframe1);
						break;
					}else{		
						kyapi.addIframeContent(iframe1);						
					}
				}
			}else{		
				if(typeof(gl) == 'undefined'){
					document.body.appendChild(kyapi.createObject());
				}
				if (typeof(gl.status)=='undefined'){		
					kyapi.addIframeContent(iframe1);					
					return;
				}else{
					kyapi.removeIframeContent(iframe1);
				}
				
			}
		};

		kyapi.AppDownLoad = function(id)
		{
			var ret = gl.status;				
			if(ret == 3) {
				kyapi.StartOk=0;
				gl.callmethod('app_setfrom',_cooperate_site_url);
				gl.callmethod('app_download',id);
				//kyapi.timeCheckCall();
			}		
			else if (ret == 4) alert("调用正在执行");
			else if (ret == 5) {
				kyapi.alertky(appName,imgPath);
				kyapi.StartOk=0;
			}
		};
		kyapi.createEmbed = function (){	
			var embed=document.createElement('embed');
				embed.type='application/np_kyplugin';
				embed.height='1';
				embed.width='1';
				embed.id='embed1';
				return embed;
		};
		kyapi.createObject = function(){
				var object=document.createElement('object');
				object.classid='clsid:284d793b-92cd-4642-9198-93a77f8f12e6';
				object.id='gl';
				object.width='10';
				object.height='3';
				object.style.zIndex='8';
				return object;
		};
		kyapi.addIframeContent=function(id){
			var iObj = id.contentWindow;
			try{
                iObj.document.write('<script>parent.ky_pluginRefresh()</script>');
			}catch(e){
			    document.body.removeChild(id);
                var ifr = document.createElement('iframe');
                ifr.id = i_ky_api.iframeId;
                ifr.frameborder = 0;
                ifr.style.cssText = 'display:none;';
                ifr.src = 'javascript:void((function(){var d=document;d.open();d.domain="' + document.domain + '";d.write("<script>document.domain="' + document.domain + '";parent.ky_pluginRefresh()</script>");d.close()})())';
            }
		};
		kyapi.removeIframeContent=function(id){
			if(!id){return;}
			var iObj = id.contentWindow;
			iObj.document.designMode = 'On';
			iObj.document.contentEditable = true;
			iObj.document.open();
			iObj.document.writeln("<html><head></head><body></body></html>");
			iObj.document.close();
		};
		kyapi.alertky=function (appName,imgPath){	
			var ky_box='<div class="ky-alert-box"><div class="ky-ab-t"><a href="javascript:void(0)"id="ky_close"title="关闭"><img src="http://www.kuaiyong.com/app/img/close.jpg"alt="关闭"/></a></div><div class="ky-folder"><h3><span>将使用快用苹果助手为您一键安装</span><b>'+unescape(appName)+'</b><span><img src="'+imgPath+'"/><b></b></span></h3></div><div class="ky-instal-path"><div class="ky_insta_img"id="ky_inst_img1"></div><div class="ky_insta_img"id="ky_inst_img2"></div><div class="ky_insta_img"id="ky_inst_img3"></div><div class="ky_insta_img"id="ky_inst_img4"></div><div class="ky_insta_img"id="ky_inst_img5"></div></div><div class="ky-install-pcont"><ul><li class="kyp_1">下载安装快用苹果助手</li><li class="kyp_2">返回页面点击<span class="pas_red">快用下载</span>按钮</li><li class="kyp_3">应用自动下载安装</li></ul><div class="clear"></div></div><div class="ky-ab-b"><a id="ky-agree"style="left:220px;"href="javascript:void(0);">立即下载</a><a id="ky-cancel"style="left:325px; display:none;"href="javascript:void(0);">关闭</a></div><div class="clear"></div></div><div class="clear"></div>';
				_createDom('link','kyconfirm',{rel:'stylesheet',href:'http://www.kuaiyong.com/app/css/ky_confirm.css'});
				var confirmCss=_getId('kyconfirm'),outerbox,graybg;
				_createDom('div','ky-alert-outer',{innerHTML:ky_box});
				
				outerbox=_getId('ky-alert-outer');
				outerbox.style.cssText='width:548px;height:275px;';
				_createDom('div','ky-graybg');
				graybg=_getId('ky-graybg');
				graybg.style.height=document.body.scrollHeight+"px";
                graybg.style.width=document.body.scrollWidth+"px";
				var closekyalert=function(){
					document.body.removeChild(_getId('ky-alert-outer'));
					document.body.removeChild(_getId('ky-graybg'));
					document.body.removeChild(confirmCss);
					document.body.removeChild(_getId("kyverjs"));
					return false;								 
				};
				_addHandler(_getId('ky-cancel'),'click',closekyalert);
				_addHandler(_getId('ky_close'),'click',closekyalert);
				_addHandler(_getId('ky-agree'),'click',function(){
					closekyalert();					
					top.location.href=_kyurl;
					kyapi.StartOk=0;					
					return false;												
				});
			window.onresize=function(){
				graybg.style.height="0px";
				_posi_Cetr("ky-alert-outer");
                graybg.style.height=document.body.scrollHeight+"px";
                graybg.style.width=document.body.scrollWidth+"px";
				//_posi_Cetr('ky-graybg');
			};
			window.onscroll=function(){
				if(typeof(kyapi) != 'null' && typeof(kyapi) != 'undefined'){
					_posi_Cetr("ky-alert-outer");
					//_posi_Cetr('ky-graybg');
				}
			};
			_posi_Cetr('ky-alert-outer');
			//_posi_Cetr('ky-graybg');
			//_posi_Cetr('ky-alert-outer');
			//_posi_Cetr('ky-graybg');
		};
		_createDom('script','kyverjs',{src:kyapi.verjspath,type:'text/javascript'});
		return kyapi;		
	})();
	var i_ky_api = this._ky_api;
	i_ky_api.appName = appName;
	i_ky_api.imgPath = appSrc;
	if(!_getId("kyverjs")){
		_createDom('script','kyverjs',{src:i_ky_api.verjspath,type:'text/javascript'});
	}

	var gl = _createPlugin();
	if (!gl) {
		var iframe1 = _createDom('iframe', i_ky_api.iframeId, null, true);
		i_ky_api.addIframeContent(iframe1);
	}
	else {
		var iframe1 = _getId('ky_iframe1');
		if (iframe1) document.body.removeChild(iframe1);
	}
	var kystat = -1;
	try { if (typeof(gl.status) != 'undefined') kystat = gl.status; } catch(e) { kystat = -1 }
	var timer = null;
	var started = false;
	if (kystat < 0) {
		i_ky_api.alertky(i_ky_api.appName, i_ky_api.imgPath);
		i_ky_api.StartOk = 0;
		return;
	}
	function chkstat() {
		switch (gl.status) {
		case 0:
			gl.startapp('','kyapp');
			break;
		case 3:
			if (!started) {
				gl.callmethod('app_setfrom',_cooperate_site_url);
				gl.callmethod('app_download', appid);
				started = true;
			}
			clearInterval(timer);
			timer = null;
			break;
		case 1:
		case 2:
		case 4:
		case 5:
			clearInterval(timer);
			timer = null;
			i_ky_api.alertky(appName, imgPath, '安装之后请重新启动IE浏览器。');
			break;
		}
	}
	switch (kystat) {
	case 0:
		if (!timer) timer = setInterval(chkstat, 500);
		break;
	case 1:
		alert("正在启动应用..");
		break;
	case 2:
		alert("启动错误: error=" + kystat);
		break;
	case 3:
		gl.callmethod('app_setfrom',_cooperate_site_url);
		gl.callmethod('app_download', appid);
		break;
	case 4:
		alert("调用正在执行");
		break;
	case 5:
		i_ky_api.alertky(appName, imgPath);
		break;
	}

}


