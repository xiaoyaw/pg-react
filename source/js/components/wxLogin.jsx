/*
wechat login
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
	componentDidMount: function() {
		if (this.isMounted()) {
			if (sessionStorage.nickname) { 
				hashHistory.replace('/join');
			} else {
				var req = new Object();
				req = this.getRequest();
				var code = req['code'];
				var appid = req['state'];
				if (code != '' && code != undefined && appid != '' && appid != undefined) {
					this.setState({
						code: code,
						isLogin: true,
						appid: appid
					}, function() {
						this.getuserinfo();
						sessionStorage.setItem("appid", this.state.appid);
					});

				}
			}
		}
	},
	getuserinfo: function() {
		if (this.state.isLogin) {
			var cc = this.state.code;
			var appid = this.state.appid;
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
						document.location = "http://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=" + arry[4] + "==&scene=110#&wechat_redirect";
					}
					if (arry[2] != '' && arry[0] != '' && arry[1] != '' && arry[3] != '') {
						hashHistory.replace('/join');
					} else {
						this.toWhere();
					}
				}.bind(this),
			});
		} else {
			this.toWhere();
		}
	},
	toWhere: function() {
		switch (this.state.appid) {
			//oneplus
			case 'wxe818778f16e4400d':
				document.location = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe818778f16e4400d&redirect_uri=http%3a%2f%2fwww.pictoshare.net%2f' + this.state.release + '%2fbuild&response_type=code&scope=snsapi_userinfo&state=' + this.state.appid + '#wechat_redirect';
				break;
				//eClass
			case 'wx6573103bb78bec40':
				document.location = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6573103bb78bec40&redirect_uri=http%3a%2f%2fwww.pictoshare.net%2f' + this.state.release + '%2fbuild&response_type=code&scope=snsapi_userinfo&state=' + this.state.appid + '#wechat_redirect';
				break;
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