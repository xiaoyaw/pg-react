import Slider from '../roomComponents/Slider.jsx';
import ReadApplication from './ReadApplication.jsx';
import MyAudio from '../roomComponents/navBar/MyAudio.jsx';
import MyVideo from '../roomComponents/navBar/MyVideo.jsx';
import Home from '../roomComponents/navBar/Home.jsx';
import Share from '../roomComponents/navBar/Share.jsx';
import ControlNav from '../roomComponents/ControlNav/ControlNav.jsx'

var React = require('react');

var EreadRoom = React.createClass({
	getInitialState: function() {
		return {
			needShare: false
		};
	},
	componentWillMount: function() {
		this.is_weixin();
	},
	is_weixin: function() {
		var ua = navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == "micromessenger") {
			this.setState({
				needShare: true
			});
		} else {
			this.setState({
				needShare: false
			});
		}
	},
	render: function() {
		var file = this.props.params.id;
		return ( < div >
			< Slider _roomid = {
				file
			}
			/ >  < ReadApplication file = {
			file
		}
		/> < ControlNav / >
		< div id = 'nnn'
		style = {
			{
				zIndex: 10,
				opacity: 0.7,
				position: 'absolute',
				left: '0px',
				top: '0px',
				width: '100%'
			}
		} > {
			this.state.needShare ? < ul className = 'nav nav-pills' >
			< li > < img id = 'logo'
			src = 'img/pageshare.png' / > < /li>  < li > < Home / > < /li > < li > < MyAudio / > < /li>  < li > < MyVideo / > < /li >  < li > < Share / > < /li>< /ul > : < ul className = 'nav nav-pills' >
				< li > < img id = 'logo'
			src = 'img/pageshare.png' / > < /li>  < li > < Home / > < /li > < li > < MyAudio / > < /li>  < li > < MyVideo / > < /li >  < /ul >
		} < /div > < /div >
	);
}



});

module.exports = EreadRoom;