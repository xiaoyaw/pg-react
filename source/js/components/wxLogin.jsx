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
			code: ''
		};
	},
	componentDidMount: function() {
		if (this.isMounted()) {
				var req = new Object();
				req = this.getRequest();
				var code = req['code'];
				if (code != '' && code != undefined) {
					this.setState({
						code: code
					}, function() {
						this.getuserinfo();
					});
				}
		}
	},
	getuserinfo: function() {
			var cc = this.state.code;
			$.ajax({
				async: true,
				url: Config.WX_USERINFO_URL,
				type: "POST",
				data: {
					code: cc,
					appid: Config.APPID
				},
				timeout: 5000,
				success: function(result) {
					var arry = result.split(":");
					var subscribe = arry[3];
					if (subscribe == 0&&subscribe !="" ) {
						document.location = "http://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=" + arry[4] + "==&scene=110#&wechat_redirect";
					} else {
						if (arry[2] != '' && arry[0] != '' && arry[1] != '' && arry[3] != '') {
							this.localSave(arry[2], arry[3], arry[0], arry[1]);
							hashHistory.replace('/join');
						}
					}
				}.bind(this),
			});
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