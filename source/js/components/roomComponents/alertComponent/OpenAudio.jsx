var React = require('react');

var OpenAudio = React.createClass({
	getInitialState: function() {
		var obj = this.calSize();
		var width = obj.width,
			height = obj.height,
			left = obj.left,
			top = obj.top;
		return {
			display:'none',
			height: width + 'px',
			width: height + 'px',
			left: left + 'px',
			top: top + 'px'
		};
	},
	componentDidMount: function() {
		if (this.isMounted()) {
			$('#openaudio').on('click', function() {
				if (typeof(Storage) !== "undefined") {
					sessionStorage.setItem("openaudio", "isOpen");
					var audio = document.getElementById("myaudio");
					audio.src='./img/welcome.mp3';
					audio.play();
					$('#openaudio').fadeOut();
				}
			});

			window.addEventListener('resize', this.handleResize);
		}
	},
	calSize: function() {
		var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		var top, left, height, width;
		if (w > h) {
			height = h / 5, width = h / 5;
			top = h / 2 - height / 2, left = w / 2 - width / 2;
		} else {
			width = w / 3, height = w / 3;
			top = h / 2 - height / 2, left = w / 2 - width / 2;
		}
		return {
			width: width,
			height: height,
			left: left,
			top: top
		}
	},
	handleResize: function(e) {
		if (this.isMounted()) {
			var obj = this.calSize();
			this.setState({
				width: obj.width,
				height: obj.height,
				left: obj.left,
				top: obj.top
			});
		}
	},
	render: function() {
		return ( < div >
			< img src = "img/play2.png"
			id = 'openaudio'
			style = {
				{	display:this.state.display,
					width: this.state.width,
					height: this.state.height,
					left: this.state.left,
					top: this.state.top,
				}
			}
			/ > < /div >
		);
	}

});

module.exports = OpenAudio;