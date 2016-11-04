/*
* 点击按钮显示并播放视频，播放完毕自动隐藏，或点击按钮后暂停并隐藏
* 改变按钮state
*/

var React = require('react');

var MyVideo = React.createClass({
	getInitialState: function() {
		return {
			clicked:false 
		};
	},
	handleClick: function() {
		var thiz = this;
		this.setState({
			clicked: !this.state.clicked
		});
		var video = document.getElementById('myvideo');
		if (this.state.clicked) {
			if (video.duration>0) {
				video.play();
				$('#myvideo').fadeIn();
				var is_playFinish = setInterval(
					function() {
						if (video.ended) {
							thiz.setState({
								clicked: false
							});
							$('#myvideo').fadeOut();
							window
								.clearInterval(is_playFinish);
						}
					}, 10);
			}
		} else {
			video.pause();
			$('#myvideo').fadeOut();
		}

	},
componentDidMount: function() {
		var video = this.refs.btnVideo;

		if (this.isMounted()) {
			video.addEventListener('click', this.handleClick);

		}
	},
	render: function() {
		//设置按钮状态
		var videoImg = this.state.clicked ? 'glyphicon glyphicon-pause' : 'glyphicon glyphicon-facetime-video';
			//设置audio的播放还是暂停
		return (
			< a ref='btnVideo' id='film'>
			
			< span className = {
				videoImg
			} > < /span>	 < /a >
		);
	}

});

module.exports = MyVideo;