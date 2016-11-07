import {
	Router,
	Route,
	browserHistory
} from 'react-router';
var React = require('react');

var wxLogin = React.createClass({
	componentWillMount: function() {
		var req = new Object();
		req = this.getRequest();
		var code = req['code'];
		if (code != '' && code != undefined) {
			this.getWXdata(code);
		}else{
			document.location = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe818778f16e4400d&redirect_uri=http%3a%2f%2fpictoshare.net%2fdev%2fbuild&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
		};
	},
	getWXdata: function(cde) {
			$.post("http://pictoshare.net/dev/build/php/oauth2_sub.php", {
					code: cde
				},
				function(data, status) {
						var arry = data.split(":");
						var subscribe = arry[3];
						this.localSave(arry[2], arry[3], arry[0], arry[1]);
						if (subscribe == 0 && subscribe != '' && subscribe != undefined && subscribe != 'undefined') {
							document.location = "http://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzIyNzE3NjM1Nw==&scene=110#&wechat_redirect";
						} else {
							browserHistory.replace('/dev/build/join');
						}
				});
	},
	localSave: function(n, s, o, t) {
		if (typeof(Storage) !== "undefined") {
			sessionStorage.setItem("nickname", n);
			sessionStorage.setItem("subscribe", s);
			sessionStorage.setItem("openid", o);
			sessionStorage.setItem("accesstoken", t);
		}
	},
	getRequest: function() {
		var url = document.location.search;
		var theRequest = new Object();
		var strs;
		if (url.indexOf("?") != -1) {
			var str = url.substr(1);
			strs = str.split("&");
			for (var i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
			}
		}
		return theRequest;
	},
	render: function() {
		return ( < div / > );
	}

});

module.exports = wxLogin;