import {
	Router,
	Route,
	hashHistory
} from 'react-router';
var React = require('react');

var PcLogin = React.createClass({
	getInitialState: function() {
		return {
			value: null,
			width: ''
		};
	},
	componentWillMount: function() {
		this.calLogoSize();
		if (sessionStorage.username) {
			var once = sessionStorage.username.substring(0, 5);
			var oncepw = sessionStorage.password.substring(0, 5);
			if (once != 'user_' && oncepw != 'pass_') {
				hashHistory.replace('/join');
			}
		}
	},
	componentDidMount: function() {
		if (this.isMounted()) {
			var thiz = this;
			$('#login').on('click', function() {
				var un = $('#us').val();
				var pw = $('#pw').val();
				if (un != '' && pw != '') {
					thiz.getcode(un, pw);
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
		$.post("http://www.pictoshare.net/index.php?controller=apis&action=login", {
				login_info: user,
				password: pass
			},
			function(data, status) {
				var value = JSON.parse(data);
				thiz.setState({
					value: value
				}, function() {
					if (thiz.state.value.status == "success") {
						thiz.getUserInfo(thiz.state.value.tokenkey);
					} else {
						console.log('账号密码是错误的');
					}
				});
			});

	},
	getUserInfo: function(token) {
		var thiz = this;
		$.post("http://www.pictoshare.net/index.php?controller=apis&action=getmemberinfo", {
				tokenkey: token
			},
			function(data, status) {
				var value = JSON.parse(data);
				if (value.status == "success") {
					un = value.info.username;
					pw = value.info.password;
					thiz.localSave(un, pw);
					if (un != '' && un != null && pw != '' && pw != null) {
						hashHistory.replace('/join');
					}
				} else {
					console.log('没拿到用户信息');
				}
			});
	},
	localSave: function(u, p) {
		if (typeof(Storage) !== "undefined") {
			sessionStorage.setItem("username", u);
			sessionStorage.setItem("password", p);
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
			< h2 className = "form-signin-heading" > PageShare < /h2> < label
			className = "sr-only" > Email address < /label> < input id = "us"
			className = "form-control"
			placeholder = "Username"
			required = "" / >
			< label className = "sr-only" > Password < /label> < input id = "pw"
			className = "form-control"
			placeholder = "Password"
			required = ""
			type = "password" / >
			< div className = "checkbox" >
			< label >
			< input value = "remember-me"
			type = "checkbox" / > < /label> < /div > < button className = "btn btn-lg btn-primary btn-block"
			type = "submit"
			id = 'login' > Sign in < /button> < /div >

			< /div>
		);
	}

});

module.exports = PcLogin;