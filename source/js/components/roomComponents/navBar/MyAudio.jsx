/*
 * 播放音频，暂停音频
 * 按钮state的改变
 */

var React = require('react');

var MyAudio = React.createClass({

	getInitialState: function() {
		return {
			clicked: false,
			isOpened: false,
			isFirstClick: false
		};
	},
	componentWillMount: function() {
		if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {

		} else {
			this.setState({
				isOpened:true,
				isFirstClick:true 
			});
		}
	},
	handleClick: function() {
		var thiz = this;
		var audio = document.getElementById("myaudio");
		if (this.state.isFirstClick) {
			this.setState({
				clicked: !this.state.clicked
			});
			if (this.state.clicked) {
				if (audio.duration > 0) {
					audio.play();
					var is_playFinish = setInterval(
						function() {
							if (audio.ended) {
								thiz.setState({
									clicked: false
								});
								window
									.clearInterval(is_playFinish);
							}
						}, 10);
				}
			} else {
				audio.pause();
			}
		} else {
			this.setState({
				isOpened: true,
				isFirstClick: true
			}, function() {
				audio.src = 'img/sure.mp3';
				audio.play();
				var is_playFinish = setInterval(
					function() {
						if (audio.ended) {
							audio.src = '';
							window
								.clearInterval(is_playFinish);
						}
					}, 10);
			});
		}
	},
	componentDidMount: function() {
		var voice = this.refs.btnAudio;

		if (this.isMounted()) {
			voice.addEventListener('click', this.handleClick);

		}
	},
	render: function() {
		//设置按钮状态
		if (this.state.isOpened) {
			var voiceImg = this.state.clicked ? 'glyphicon glyphicon-pause' : 'glyphicon glyphicon-headphones';
		} else {
			var voiceImg = 'glyphicon glyphicon-volume-off';
		}

		//设置audio的播放还是暂停

		return ( < a ref = "btnAudio"
			id = 'voice' >
			< span className = {
				voiceImg
			} > < /span>	 < /a >
		);
	}

});

module.exports = MyAudio;