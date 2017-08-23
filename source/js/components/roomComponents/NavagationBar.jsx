import MyVideo from './navBar/MyVideo.jsx';
import Home from './navBar/Home.jsx';
import Share from './navBar/Share.jsx';
import Edit from './navBar/Edit.jsx';

var React = require('react');

var NavagationBar = React.createClass({
	getInitialState: function() {
		var iswx=this.is_weixin();
		return {
			isWeixin: iswx
		};
	},
	componentWillMount: function() {
		document.body.addEventListener('touchstart', function() {
			//绑定touch  IOS按钮active兼容性
		});
	},
	is_weixin: function() {
		var ua = navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == "micromessenger") {
			return true;
		} else {
			return false;
		}
	},
	render: function() {
		return ( < div id = 'nnn'
			style = {
				{
					zIndex: 10,
					opacity: 0.7,
					position: 'absolute',
					left: '0px',
					top: '0px',
					width: '100%'
				}
			} >

			< ul className = 'nav nav-pills' >
			< li > < img id = 'logo'
			src = 'img/pageshare.png' / > < /li>  < li > < Home / > < /li > < li > < MyVideo / > < /li> < li > {this.state.isWeixin?< Share / >:<Edit/>} < /li > < /ul > < /div>
		);
	}

});

module.exports = NavagationBar;