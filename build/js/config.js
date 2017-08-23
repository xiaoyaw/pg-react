	//配置信息
	var Config;
if(document.location.href.split('pageshare').length==2){//e课
	Config={
		//wx_getuserinfo
		WX_USERINFO_URL:"php/oauth2_sub.php",
		//jsapi
		WX_JSAPI_URL:"php/wx_share.php",
		//APPID
		APPID:"wx6573103bb78bec40",//e课
		//redirect
		REDIRECT_URI:"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6573103bb78bec40&redirect_uri=http%3a%2f%2fh5.pageshare.net%2fdev%2fbuild%2f%23%2fwxlogin&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect",
		//liv download
		LIV_URL:"http://h5.pageshare.net/liv/",
		//xmpp bosh
		XMPP_BOSH_SERVICE:"http://123.206.192.84:7070/http-bind/",
		//xmpp domain
		XMPP_DOMAIN:"123.206.192.84",
		//PC login url
		LOGIN_URL:"http://www.pictoshare.net/index.php?controller=apis&action=login",
		//pc get userInfo
		USERINFO_URL:"http://www.pictoshare.net/index.php?controller=apis&action=getmemberinfo"
	}
}else{
	Config={
		//wx_getuserinfo
		WX_USERINFO_URL:"php/oauth2_sub.php",
		//jsapi
		WX_JSAPI_URL:"php/wx_share.php",
		//APPID
		APPID:"wxe818778f16e4400d",//奕甲
		//redirect
		REDIRECT_URI:"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe818778f16e4400d&redirect_uri=http%3a%2f%2fh5.pageshare.net%2fpageshare%2fbuild%2f%23%2fwxlogin&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect",
		//liv download
		LIV_URL:"http://h5.pageshare.net/liv/",
		//xmpp bosh
		XMPP_BOSH_SERVICE:"http://123.206.192.84:7070/http-bind/",
		//xmpp domain
		XMPP_DOMAIN:"123.206.192.84",
		//PC login url
		LOGIN_URL:"http://www.pictoshare.net/index.php?controller=apis&action=login",
		//pc get userInfo
		USERINFO_URL:"http://www.pictoshare.net/index.php?controller=apis&action=getmemberinfo"
	}
}

	


