import {
	Router,
	Route,
	hashHistory
} from 'react-router';
import WXIcon from './WXIcon.jsx';
var React = require('react');

var Login = React.createClass({
	getInitialState: function() {
		var isEnglish=this.getLanguage();
		var language=this.setLanguage(isEnglish);
		var is_weixin = this.is_weixin();
		return {
			language:language,
			value: null,
			width: '',
			warning: '',
			is_weixin: is_weixin
		};
	},
	componentWillMount: function() {
		this.calLogoSize();
		// if (sessionStorage.username) {
		// 	var once = sessionStorage.username.substring(0, 5);
		// 	var oncepw = sessionStorage.password.substring(0, 5);
		// 	if (once != 'user_' && oncepw != 'pass_') {
		// 		hashHistory.replace('/join');
		// 	}
		// } else {
		// 	if(this.state.is_weixin){
		// 		var code = req['code'];
		// 		if (code != '' && code != undefined && appid != '' && appid != undefined) {
		// 			hashHistory.replace('/wxlogin');
		// 		}else{
		// 			document.location = Config.REDIRECT_URI;
		// 		}				
		// 	}
		// }
	},
	componentDidMount: function() {
		if (this.isMounted()) {
			var thiz = this;
			window.addEventListener('resize',function(){
				thiz.calLogoSize;
			},false)
			$('#guestlogin').on('click', function() {
				thiz.getcode("guest", "111111");
			});
			$('#login').on('click', function() {
				var un = $('#us').val();
				var pw = $('#pw').val();
				if (un != '' && pw != '') {
					thiz.getcode(un, pw);
				} else {
					thiz.setState({
						warning: thiz.state.language.nullInput
					}, function() {
						thiz.handleMsg();
					});
				}
			});
		}
	},
	calLogoSize: function() {
		var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		if (w > h) {
			this.setState({
				width: '35%'
			});
		} else {
			this.setState({
				width: '80%'
			});
		}
	},
	getcode: function(user, pass) {
		var thiz = this;
		$.post(Config.LOGIN_URL, {
				login_info: user,
				password: pass
			},
			function(data, status) {
				if (data != '') {
					var value = JSON.parse(data);
					thiz.setState({
						value: value
					}, function() {
						if (thiz.state.value.status == "success") {
							thiz.getUserInfo(thiz.state.value.tokenkey);
						} else {
							thiz.setState({
								warning: thiz.state.language.wrong1
							}, function() {
								thiz.handleMsg();
							});
						}
					});
				} else {
					thiz.setState({
						warning: thiz.state.language.wrong2
					}, function() {
						thiz.handleMsg();
					});
				}
			});
	},
	getUserInfo: function(token) {
		var thiz = this;
		$.post(Config.USERINFO_URL, {
				tokenkey: token
			},
			function(data, status) {
				var value = JSON.parse(data);
				if (value.status == "success") {
					var un = value.info.username;
					var pw = value.info.password;
					thiz.localSave(un, pw);
					if (un != '' && un != null && pw != '' && pw != null) {
						hashHistory.replace('/join');
					}
				} else {
					thiz.setState({
						warning: thiz.state.language.wrong3
					}, function() {
						thiz.handleMsg();
					});
				}
			});
	},
	localSave: function(u, p) {
		if (typeof(Storage) !== "undefined") {
			sessionStorage.setItem("username", u);
			sessionStorage.setItem("password", p);
		}
	},
	handleMsg: function() {
		$('#warning').fadeIn();
		setTimeout(function() {
			$('#warning').fadeOut();
		}, 2000);
	},
	is_weixin: function() {
		var ua = navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == "micromessenger") {
			return true;
		} else {
			return false;
		}
	},
	handleResize:function(e){
		this.calLogoSize();
	},
	getLanguage:function(){
		var language=navigator.browserLanguage || navigator.language;
		if(language.substring(0,2)=="zh"){
			return false;
		}else{
			return true;
		}
	},
	setLanguage:function(isEnglish){
		if(isEnglish){
			return {
				title:"PageShare",
				usa:"Username",
				pwd:"Password",
				guest:"guest",
				login:"Sign in",
				nullInput:"Please enter your account number and password !",
				wrong1:"Incorrect input ！",
				wrong2:"The number of digits is incorrect ！",
				wrong3:"The server is busy now ！"
			}
		}else{
			return {
				title:"PageShare",
				usa:"用户名",
				pwd:"密码",
				guest:"游客登录",
				login:"登录",
				nullInput:"请输入账号和密码 ！",
				wrong1:"输入有误 ！",
				wrong2:"密码位数不正确 ！",
				wrong3:"服务器繁忙 ！"
			}
		}
	},
	render: function() {
		return ( < div className = "container"
			style = {
				{
					margin: '5%',
					width: this.state.width
				}
			} >
			< div className = "form-signin" >
			< h2 className = "form-signin-heading" > {this.state.language.title} < /h2> <br/ > < label className = "sr-only" > Email address < /label> < input id = "us"
			className = "form-control"
			placeholder = {this.state.language.usa}
			required = "" / >
			< label className = "sr-only" > Password < /label> < input id = "pw"
			className = "form-control"
			placeholder = {this.state.language.pwd}
			required = ""
			type = "password" / >
			< div className = "checkbox pull-right" >
			< label >
			< a id = 'guestlogin' > {this.state.language.guest} < /a> < /label > < /div > < button className = "btn btn-lg btn-primary btn-block"
			type = "submit"
			id = 'login' > {this.state.language.login} < /button> < div style = {
				{
					textAlign: 'center',
					textShadow: '2px 2px 5px #9B30FF',
					marginTop: '35px',
					display: 'none'
				}
			}
			id = "warning" > < font style = {
				{
					fontSize: '16px'
				}
			} > {
				this.state.warning
			} < /font></div >
			< /div >
			 {
				this.state.is_weixin ? < div > < WXIcon / > < /div > : < div > < /div >
			}
			< /div >
		);
	}

});

module.exports = Login;