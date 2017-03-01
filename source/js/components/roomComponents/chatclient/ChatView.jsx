var React = require('react');

var ChatView = React.createClass({
	getInitialState: function() {
		var width, height;
		var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		if (w > h) {
			height = h + 'px';
			width = h * 0.618 + 'px';
		} else {
			height = h;
			width = w;
		}
		return {
			width: width,
			height: height
		};
	},
	handleResize: function() {
		var width, height;
		var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		if (w > h) {
			height = h + 'px';
			width = h * 0.618 + 'px';
		} else {
			height = h;
			width = w;
		}
		this.setState({
			height: height,
			width: width
		});
	},
	componentWillMount: function() {

	},
	componentDidMount: function() {
		if (this.isMounted()) {
			$('#chat-cancel').on('click', function() {
				$('#chat-room').fadeOut();
			});
			$('#chat-close').on('click', function() {
				$('#chat-room').fadeOut();
			});
			$('#chat-send').on('click', function() {
				console.log('send');
			});

			window.addEventListener('resize', this.handleResize);
		}
	},
	render: function() {
			return ( < div id = 'chat-room'
				className = 'pull-right'
				style = {
					{
						width: this.state.width,
						height: this.state.height
					}
				} >
				< div id = 'chat-title' >
				< a className = 'pull-right' id='chat-close'> < span className = "glyphicon glyphicon-remove"
				style = {
					{
						color: '#FFFFFF',
						fontSize: '25px'
					}
				} > < /span></a >
				< /div> < div id = 'chat-message' > 

				< /div> < div id = 'chat-setting' > 

				< /div> < div id = 'chat-input' > < textarea defaultValue='' style = { {
				width: '100%',
				height: '100%'
			}
		} >< /textarea> < /div > < div id = 'chat-submit' >
		< div className = 'pull-right' >
		< button className = 'btn btn-default'
	id = 'chat-cancel' > 关闭 < /button>< button className = 'btn btn-default'  id='chat-send'> 发送 < /button > < /div>< /div > < /div >
);
}

});

module.exports = ChatView;