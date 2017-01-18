/*
 * 播放音频，暂停音频
 * 按钮state的改变
 */

var React = require('react');

var MyAudio = React.createClass({

	getInitialState: function() {
		return {
			clicked: false,
			playState: "glyphicon glyphicon-volume-off",
			isfirst: true
		};
	},
	handleClick: function() {
		var audio = document.getElementById("myaudio");
		var thiz = this;
		if (this.state.isfirst) { //第一次点击还原按钮，并触发声音
			this.setState({
				playState: "glyphicon glyphicon-headphones",
				isfirst: false
			}, function() {
				audio.src = 'img/sure.mp3';
				audio.play();
			});
		} else { //不是第一次点击，根据clicked状态设置按钮状态
			this.setState({
				clicked: !this.state.clicked
			}, function() {
				if (thiz.state.clicked) {
					if (audio.duration > 0) {
						audio.play();
						var is_playFinish = setInterval(
							function() {
								if (audio.ended) {
									thiz.setState({
										clicked: false,
										playState: "glyphicon glyphicon-headphones"
									});
									window
										.clearInterval(is_playFinish);
								}
							}, 10);
					}
					thiz.setState({
						playState: "glyphicon glyphicon-pause"
					});
				} else {
					audio.pause();
					thiz.setState({
						playState: "glyphicon glyphicon-headphones"
					});
				}
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
		return ( < a ref = "btnAudio"
			id = 'voice' >
			< span className = {
				this.state.playState
			} > < /span>	 < /a >
		);
	}

});

module.exports = MyAudio;