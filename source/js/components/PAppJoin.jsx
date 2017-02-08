import PJoinInput from './joinComponents/PJoinInput.jsx';
import JoinNav from './joinComponents/JoinNav.jsx';
import Switch from './joinComponents/Switch.jsx';
import {
	Router,
	Route,
	hashHistory
} from 'react-router';

var React = require('react');

var PAppJoin = React.createClass({
	componentWillMount: function() {
		if (sessionStorage.username || this.props.params.id == 'guest') {
			if (this.props.params.id == 'guest') {
				this.visitorLogin('guest', '111111');
			}
		} else {
			hashHistory.replace('/');
		}
	},
	componentDidMount: function() {
		if (this.isMounted()) {
			$('#headimage').on('click', function() {
				sessionStorage.clear();
				hashHistory.replace('/');
			})
		}
	},
	visitorLogin: function(user, pass) {
		var thiz = this;
		$.post("http://www.pictoshare.net/index.php?controller=apis&action=login", {
				login_info: user,
				password: pass
			},
			function(data, status) {
				if (data != '') {
					var value = JSON.parse(data);
						if (thiz.state.value.status == "success") {
							thiz.getUserInfo(thiz.state.value.tokenkey);
						} else {
							hashHistory.replace('/');
						}
				}
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
					var un = value.info.username;
					var pw = value.info.password;
					thiz.localSave(un, pw);
				} else {
					hashHistory.replace('/');
				}
			});
	},
	localSave: function(u, p) {
		if (typeof(Storage) !== "undefined") {
			sessionStorage.setItem("username", "guest" + Math.random());
			sessionStorage.setItem("password", p);
		}
	},
	render: function() {

		return ( < div >
			< JoinNav / >
			< PJoinInput / >
			< Switch / >
			< /div>
		);
	}

});

module.exports = PAppJoin;