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
			isright: true
		};
	},
	componentWillMount: function() {
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

	getcode: function(user, pass) {
		var thiz = this;
		$.post("http://www.pictoshare.net/index.php?controller=apis&action=login", {
				login_info: user,
				password: pass
			},
			function(data, status) {
				value = JSON.parse(data);
				thiz.setState({
					value: value
				}, function() {
					if (thiz.state.value.status == "success") {
						thiz.getUserInfo(thiz.state.value.tokenkey);
					} else {
						thiz.setState({
							isright:false 
						});
					}
				});
			});

	},
	getUserInfo: function(token) {
		var thiz=this;
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
		return ( < nav className = "navbar navbar-default"
			role = "navigation" >
			< div className = "container-fluid" >
			< div className = "navbar-header" >
			< a className = "navbar-brand"
			href = "#" > PageShare < /a> < /div > < div >
			< div className = "navbar-form navbar-right"
			role = "search" >
			< div className = "form-group" >
			< input type = "text"
			className = "form-control"
			id = 'us'
			placeholder = "username" / >
			< /div> < div className = "form-group" > < input type = "text"
			id = 'pw'
			className = "form-control"
			placeholder = "password" / >
			< /div> < button 
			className = "btn btn-default"
			id = 'login' > 登录 < /button> < /div > < /div> < /div > < /nav>
		);
	}

});

module.exports = PcLogin;