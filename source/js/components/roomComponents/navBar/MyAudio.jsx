/*
 * 播放音频，暂停音频
 * 按钮state的改变
 */

var React = require('react');

var MyAudio = React.createClass({

	getInitialState: function() {
		return {
			isFirst: true,
			clicked: false
		};
	},
	handleClick: function() {
		var thiz = this;
		if (!this.state.isFirst) {
			this.setState({
				clicked: !this.state.clicked
			});
			var audio = document.getElementById("myaudio");
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
		}
	},
	componentDidMount: function() {
		var voice = this.refs.btnAudio;
		var that=this;
		if (this.isMounted()) {
			voice.addEventListener('click', this.handleClick);
			$('#openaudio').on('click',function(){
				that.setState({
					isFirst:false 
				});
			});
		}
	},
	render: function() {
		//设置按钮状态
		var voiceImg = this.state.clicked ? 'glyphicon glyphicon-pause' : 'glyphicon glyphicon-headphones';
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