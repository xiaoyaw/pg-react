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
							if (decodeURI(res[p][i].split('-').length) == 5 && decodeURI(res[p][i].split(':').length) == 3) {
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
					return timestamp2 - timestamp1
				});

				var newArry = userRes.concat(notimeliv);
				that.setState({
					displayFile: newArry
				});
			}
		})

	},
	formatLivName: function(name) {
		var formatname;
		//timestamp
		if (name.split('-').length == 5 && name.split(':').length == 3) {
			switch (name.split('_').length) {
				case 2:
					formatname = name.split('-')[4].split(':')[0] + ':' + name.split('-')[4].split(':')[1] + '-' + name.split('_')[1];
					break;
				case 3:
					if (name.split('_')[2].split('-') == '') {
						formatname = name.split('-')[4].split(':')[0] + ':' + name.split('-')[4].split(':')[1] + '-' + name.split('_')[1];
					} else {
						formatname = name.split('-')[4].split(':')[0] + ':' + name.split('-')[4].split(':')[1] + '-' + name.split('_')[2];
					}
					break;
				default:
					formatname = name.split('-')[4].split(':')[0] + ':' + name.split('-')[4].split(':')[1] + '-' + name.split('_')[2];
			}
		} else {
			//no timestamp
			switch (name.split('_').length) {
				case 2:
					formatname = name.split('_')[1];
					break;
				case 3:
					if (name.split('_')[2] == '') {
						formatname = name.split('_')[1];
					} else {
						formatname = name.split('_')[2];
					}
					break;
				default:
					formatname = name.split('_')[2];

			}
		}
		console.log(name.split('_'));
		return formatname
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