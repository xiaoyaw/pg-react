var React = require('react');

var AppEdit = React.createClass({

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
				if (thiz.state.isIOS) {
					var clickedAt = +new Date;
					var the_href = 'itms-apps://itunes.apple.com/us/app/pageshare/id1135319277?mt=8'; // 获得下载链接
					document.location = "pageshare://www.pictoshare.net/app?roomID=public3001"; // 打开某手机上的某个app应用
					setTimeout(function() {
						if (+new Date - clickedAt < 2000) {
							document.location = the_href;
						}
					}, 1000);
				}
				if (thiz.state.isAndroid) {
					var the_href = 'http://pictoshare.net/download/'; // 获得下载链接
					var clickedAt = +new Date;
					document.location = "pageshare://pictoshare.net/app?roomID=public3001"; // 打开某手机上的某个app应用
					setTimeout(function() {
						if (+new Date - clickedAt < 2000) {
							document.location = the_href;
						}
					}, 1000);
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
		return ( < a id = 'edit'> < span className = 'glyphicon glyphicon-pencil' > < /span > < /a > );
	}

});

module.exports = AppEdit;