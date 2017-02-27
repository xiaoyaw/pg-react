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
			// url_litLiv: 'http://203.195.173.135:9000/files/list?format=json',
			url_litLiv: 'http://182.254.223.23:9000/play/list?format=json',
			displayFile: []
		};
	},
	componentDidMount: function() {
		if (this.isMounted()) {
			var timestamp1 = new Date('2017', '1', '27', '11', '04', '00'),
				timestamp2 = new Date();
			var d = timestamp1.getTime() - timestamp2.getTime();
			console.log(d);
			var that = this;
			var user = this.getUser();
			if (user != null && user != undefined) {
				this.queryAllLiv(user);
			}
			$('#toread').on('click', function() {
				if ($('#liv_select').val() != '' && $('#liv_select').val() != null) {
					hashHistory.replace('/eread/' + $('#liv_select').val());
				}
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
		var user = '';
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
				var userRes = [],
					notimeliv = [];
				for (var p in res) {
					for (var i = 0; i < res[p].length; i++) {
						if (decodeURI(res[p][i].split('_')[0]) == user && res[p][i].split('_').length >= 2) {
							//exist timestamp
							if (decodeURI(res[p][i].split('-')).length == 5 && decodeURI(res[p][i].split(':')).length == 3) {
								userRes.push(decodeURI(res[p][i].split('.')[0]));
							} else {
								//not exist timestap
								notimeliv.push(decodeURI(res[p][i].split('.')[0]));
							}
						}
					}
				}
				//sort the array  -2017-02-08-12:37:34.liv
				userRes.sort(function(a, b) {
					var timestamp1 = new Date(a.split('-')[1], a.split('-')[2], a.split('-')[3], a.split('-')[4].split(':')[0], a.split('-')[4].split(':')[1], a.split('-')[4].split(':')[2].split('.')[0]).getTime();
					var timestamp2 = new Date(b.split('-')[1], b.split('-')[2], b.split('-')[3], b.split('-')[4].split(':')[0], b.split('-')[4].split(':')[1], b.split('-')[4].split(':')[2].split('.')[0]).getTime();
					return timestamp1 - timestamp2
				});

				var newArry = notimeliv.concat(userRes);
				that.setState({
					displayFile: newArry
				});
			}
		})
	},
	formatLivName: function(name) {
		var user = this.getUser().length;
		var liv_name = (name.substring(user + 1, name.length)).replace(/_/g, '-');
		if (liv_name.lastIndexOf('-') == liv_name.length - 1) {
			return liv_name.substring(0, liv_name.length - 1)
		} else {
			return liv_name
		}
	},
	render: function() {
		var that = this;
		return ( < div >
			< select id = "liv_select" > {
				this.state.displayFile.map(function(name) {
					return <option key = {
						name
					}
					value = {
						name
					} > {
						that.formatLivName(name)
					} < /option>
				})
			} < /select > < button className='btn btn-default' id = 'toread' > <span className = "glyphicon glyphicon-log-in" > < /span > < /button > < /div > );
	}
});

module.exports = Select;