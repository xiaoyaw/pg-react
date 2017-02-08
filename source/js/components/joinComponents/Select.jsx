var React = require('react');
import {
	Link
} from 'react-router';
import {
	hashHistory
} from 'react-router';
var Select = React.createClass({
	getInitialState: function() {

		return {
			url_litLiv: 'http://203.195.173.135:9000/files/list?format=json',
			displayFile: []
		};
	},
	componentDidMount: function() {
		if (this.isMounted()) {
			var that = this;
			var user=this.getUser();
			if (user != null && user != undefined) {
				this.queryAllLiv(user);
			}
			$('#toread').on('click', function() {
				hashHistory.replace('/eread/' + $('#liv_select').val());
			});
			$(document).keydown(function(e) {
				var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
				if (eCode == "13") { //keyCode=13是回车键
					if ($('#liv_select').val() != '') {
						$('#toread').click();
					}
				}
			});
		}
	},
	getUser: function() {
		var user;
		if (sessionStorage.getItem('username')) {
			if (sessionStorage.getItem('username').substring(0, 5) == 'guest') {
				user = 'guest';
			} else {
				user = sessionStorage.getItem("username");
			}

		}
		if (sessionStorage.getItem('nickname')) {
			user = 'wechat';
		}
		return user
	},
	queryAllLiv: function(user) {
		var that = this;
		$.ajax({
				async: true,
				url: that.state.url_litLiv,
				type: 'GET',
				timeout: 5000,
				success: function(res) {
					var userRes = [];
					for (var i = 0; i < res.length; i++) {
						if (decodeURI(res[i].split('_')[0]) == user && res[i].split('_').length == 3) {
							userRes.push(decodeURI(res[i].split('.')[0]));
						}
					}
					that.setState({
						displayFile: userRes
					});
				}
			})
			//var res = ["add_addxx_add1_time.liv", "add_addzz_add2_time.liv", "lgd_lgd_lgd1_time.liv", "guest_lgdd_lgd2_time.liv", "guest_www_www1_time.liv", "guest_wwwzz_www2_time.liv", "allread.liv", "allread2.liv", "sijj_isdjai.liv"];

	},
	render: function() {
		return ( < div >
			< select id = "liv_select" > {
				this.state.displayFile.map(function(name) {
					return <option key = {
						name
					}
					value = {
						name
					} > {
						name.split('_')[2]
					} < /option>
				})
			} < /select > < a id = 'toread' > <span className = "glyphicon glyphicon-log-in" > < /span > < /a > < /div > );
	}
});

module.exports = Select;