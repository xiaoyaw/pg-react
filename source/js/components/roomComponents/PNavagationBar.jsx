import MyVideo from './navBar/MyVideo.jsx';
import Home from './navBar/Home.jsx';
import Edit from './navBar/Edit.jsx';
import Share from './navBar/Share.jsx';

var React = require('react');

var PNavagationBar = React.createClass({

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
			src = 'img/pageshare.png' / > < /li>  < li > < Home / > < /li > < li > < MyAudio / > < /li>  < li > < Edit / > < /li > < /ul >
			< /div>
		);
	}

});

module.exports = PNavagationBar;