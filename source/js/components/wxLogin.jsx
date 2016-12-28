/*
微信授权，获取用户信息，并存入sessionStorage
修改部分：58
*/

import {
	Router,
	Route,
	hashHistory
} from 'react-router';
var React = require('react');

var wxLogin = React.createClass({
	getInitialState: function() {
		return {
			code: '',
			isLogin: false,
			appid: '',
			release: 'dev'
		};
	},
	componentWillMount: function() {
		var req = new Object();
		req = this.getRequest();
		var code = req['code'];
		var appid = req['state'];
		if (code != '' && code != undefined && appid != '' && appid != undefined) {
			this.setState({
				code: code,
				isLogin: true,
				state: appid
			});
			sessionStorage.setItem("appid", this.state.appid);
		};
	},
	componentDidMount: function() {
		if (this.isMounted()) {
			if (sessionStorage.nickname) { //本地有则为返回，跳转回/join，否则第一次加入，需请求数据
				hashHistory.replace('/join');
			} else {
				if (this.state.isLogin) {
					var cc = this.state.code;
					var appid = this.this.appid;
					$.ajax({
						async: false,
						url: "php/oauth2_sub.php",
						type: "GET",
						data: {
							code: cc,
							appid: appid
						},
						timeout: 5000,
						success: function(result) {
							var arry = result.split(":");
							var subscribe = arry[3];
							this.localSave(arry[2], arry[3], arry[0], arry[1]);
							if (subscribe == 0 && subscribe != '' && subscribe != undefined && subscribe != 'undefined') {
								document.location = "http://mp.weixin.qq.com/mp/profile_ext?action=home&__biz="+arry[4]+"==&scene=110#&wechat_redirect";
							} else {
								hashHistory.replace('/join');
							}
						}.bind(this),
					});
				} else {
					switch (this.state.appid) {
						case 'wxe818778f16e4400d':
							document.location = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe818778f16e4400d&redirect_uri=http%3a%2f%2fpictoshare.net%2f' + this.state.release + '%2fbuild&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
							break;
						case 'wx6573103bb78bec40':
							document.location = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6573103bb78bec40&redirect_uri=http%3a%2f%2fwww.pictoshare.net%2f' + this.state.release + '%2fbuild&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
							break;
					}
					//修改授权地址wx6573103bb78bec40
					//document.location = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe818778f16e4400d&redirect_uri=http%3a%2f%2fpictoshare.net%2fdev%2fbuild&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
					//e课
					//document.location = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6573103bb78bec40&redirect_uri=http%3a%2f%2fwww.pictoshare.net%2fdev%2fbuild&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
				}
			}
		}
	},
	localSave: function(n, s, o, t) {
		if (typeof(Storage) !== "undefined") {
			sessionStorage.setItem("nickname", n);
			sessionStorage.setItem("subscribe", s);
			sessionStorage.setItem("username", o);
			sessionStorage.setItem("password", t);

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