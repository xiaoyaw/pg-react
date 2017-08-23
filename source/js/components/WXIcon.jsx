import {
	Router,
	Route,
	hashHistory
} from 'react-router';

var React = require('react');

var WXIcon = React.createClass({
	getInitialState: function() {
		return {
			down: false
		};
	},
	componentDidMount: function() {
		if (this.isMounted()) {
			var login = this.refs.login;
			var thiz = this;
			var hastouch = "ontouchstart" in window ? true : false, //判断是否为移动设备
				loginStart = hastouch ? "touchstart" : "mousedown",
				loginEnd = hastouch ? "touchend" : "mouseup";
			login.addEventListener(loginStart, function(e) {
				thiz.setState({
					down: true
				});
			}, false);
			login.addEventListener(loginEnd, function(e) {
				thiz.setState({
					down: false
				});
			}, false);
		}
	},
	handleClick: function(e) {
		document.location = Config.REDIRECT_URI;
	},
	render: function() {
		var image = this.state.down ? './img/downwechat.png': './img/wechat.png';
		return ( 
			<div className="navbar-fixed-bottom" style={{textAlign:"center"}}>
			< a href = {
				Config.REDIRECT_URI
			} > < img ref = "login"
			src={image}
			
			style = {
				{	
					marginBottom:"20px",
					width: "40px",
					height: "40px"
				}
			} /></a ></div>
		);
	}

});

module.exports = WXIcon;