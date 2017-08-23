var React = require('react');

var Edit = React.createClass({

	getInitialState: function() {
		return {
			isAndroid: false,
			isIOS: false
		};
	},
	componentWillMount: function() {
		this.checkAndroid_IOS();
	},

	componentDidMount: function() {
		var thiz = this;
		if (this.isMounted()) {

			$('#edit').click(function() {
				if (thiz.state.isIOS || thiz.state.isAndroid) {
					$('#myopen').modal('toggle');
				}
			});

			$('#app_download').on('click', function() {
				if (thiz.state.isIOS) {
					var the_href = 'itms-apps://itunes.apple.com/us/app/pageshare/id1135319277?mt=8';
					document.location = the_href;
				}
				if (thiz.state.isAndroid) {
					var the_href = 'http://pictoshare.net/download/'; // 获得下载链接
					document.location = the_href;
				}
			});
			$('#app_open').on('click', function() {
				if ($('#app_roomid').val() != "" && $('#app_filepath').val() != "") {
					document.location = "pageshare://pictoshare.net/course?roomID=" + $('#app_roomid').val() + "&filePath=" + $('#app_filepath').val();
				} else {
					document.location = "pageshare://pictoshare.net/app";
				}
			});
		}
	},

	checkAndroid_IOS: function() {
		var u = navigator.userAgent;
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
			isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		this.setState({
			isAndroid: isAndroid,
			isIOS: isiOS
		});
	},
	render: function() {
		return ( < a id = 'edit' > < span className = 'glyphicon glyphicon-pencil' > < /span > < /a > );
	}

});

module.exports = Edit;