import {
	Router,
	Route,
	browserHistory
} from 'react-router';
var React = require('react');

var wxLogin = React.createClass({
			getInitialState: function() {
					$('#log').text($('#log').text()+"| begin");
				return {
					code:'',
					isLogin: false
				};
			},
			componentWillMount: function() {
				var req = new Object();
				req = this.getRequest();
				var code = req['code'];
				if (code != '' && code != undefined) {
					$('#log').text($('#log').text()+"| code is ok");
					this.setState({
						code:code,
						isLogin: true
					});
				};
			},
			componentDidMount: function() {
				$('#log').text($('#log').text()+"| begin to get from php");
				if (this.state.isLogin) {
					$
						.ajax({
							async: false,
							url: "http://pictoshare.net/dev/build/php/oauth2_sub.php",
							type: "GET",
							data: {
								code: this.state.code
							},
							timeout: 5000,
							success: function(result) {
								
								var arry = result.split(":");
								var subscribe=arry[3];
								this.localSave(arry[2],arry[3],arry[0],arry[1]);
								$('#log').text($('#log').text()+"|  data is ok ="+arry[2]);
								if (subscribe == 0 && subscribe != '' && subscribe != undefined && subscribe != 'undefined') {
									document.location = "http://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzIyNzE3NjM1Nw==&scene=110#&wechat_redirect";
								} else {
									browserHistory.replace('/dev/build/join');
										$('#log').text($('#log').text()+"|  all is ok");
								}
							},
						});
				} else {
					//修改授权地址
					document.location = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe818778f16e4400d&redirect_uri=http%3a%2f%2fpictoshare.net%2fdev%2fbuild&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
				}
			},
			localSave: function(n,s,o,t) {
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
				return ( < div />);
				}

			});

		module.exports = wxLogin;