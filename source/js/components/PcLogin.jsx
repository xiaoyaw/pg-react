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
			width: '',
			warning: ''
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
				} else {
					thiz.setState({
						warning: '请输入账号密码！'
					}, function() {
						thiz.handleMsg();
					});
				}
			});
		}
	},
	testBackup: function(token) {
		var thiz = this;
		$.post(" http://www.pictoshare.net/index.php?controller=apis&action=backup_putFile", {
				tokenkey: token,
				file_name: $('#test').val()
			},
			function(data, status) {
					console.log(data);
			});
	},
	testgetBackup: function(token) {
		var thiz = this;
		$.post(" http://www.pictoshare.net/index.php?controller=apis&action=backup_putFile", {
				tokenkey: token,
				file_name: $('#test').val()
			},
			function(data, status) {
					console.log(data);
			});
	},
	testdeleteBackup: function(token) {
		var thiz = this;
		$.post(" http://www.pictoshare.net/index.php?controller=apis&action=backup_delFile", {
				tokenkey: token,
				file_name: $('#test').val()
			},
			function(data, status) {
				console.log(data);
			});
	},
	testlistBackup: function(token) {
		var thiz = this;
		$.post(" http://www.pictoshare.net/index.php?controller=apis&action=backup_listFile", {
				Tokenkey: token,
				dir: $('#test').val()
			},
			function(data, status) {
					console.log(data);
			});
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
				if (data != '') {
					var value = JSON.parse(data);
					thiz.setState({
						value: value
					}, function() {
						if (thiz.state.value.status == "success") {
							thiz.getUserInfo(thiz.state.value.tokenkey);
						} else {
							thiz.setState({
								warning: '账号密码输入有误！'
							}, function() {
								thiz.handleMsg();
							});
						}
					});
				} else {
					thiz.setState({
						warning: '密码位数不正确！'
					}, function() {
						thiz.handleMsg();
					});
				}
			});
	},
	getUserInfo: function(token) {


		var thiz = this;

		$('#up').on('click', function() {
			thiz.testBackup(token);
		})
		$('#load').on('click', function() {
			thiz.testgetBackup();
		})
		$('#delete').on('click', function() {
			thiz.testdeleteBackup();
		})
		$('#list').on('click', function() {
			thiz.testlistBackup();
		})

		$.post("http://www.pictoshare.net/index.php?controller=apis&action=getmemberinfo", {
				tokenkey: token
			},
			function(data, status) {
				var value = JSON.parse(data);
				if (value.status == "success") {
					var un = value.info.username;
					var pw = value.info.password;
					thiz.localSave(un, pw);
					if (un != '' && un != null && pw != '' && pw != null) {
						//hashHistory.replace('/join');
					}
				} else {
					thiz.setState({
						warning: '系统繁忙！'
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
			< input id = 'test' / >
			< div className = "checkbox pull-right" >
			< label >
			< input value = "remember-me"
			type = "checkbox" / > < /label> < /div > < button className = "btn btn-lg btn-primary btn-block"
			type = "submit"
			id = 'login' > Sign in < /button>  < div style = { {
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
	< /div > < button id = 'up' > up < /button > < button id = 'load' > load < /button > < button id = 'delete' > delete < /button > < button id = 'list' > list < /button > < /div>
);
}

});

module.exports = PcLogin;