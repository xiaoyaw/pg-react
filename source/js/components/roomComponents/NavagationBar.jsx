import MyAudio from './navBar/MyAudio.jsx';
import MyVideo from './navBar/MyVideo.jsx';
import Home from './navBar/Home.jsx'
import Edit from './navBar/Edit.jsx'
import Help from './navBar/Help.jsx'


var React = require('react');

var NavagationBar = React.createClass({

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
			src = 'http://pictoshare.net/dev/pageHTML/pic/pageshare.png' / > < /li>  < li > < Home / > < /li > < li > < MyAudio / > < /li>  < li > < MyVideo / > < /li>  < li > < Edit / > < /li > < li > < Help / > < /li > < /ul >  < /div>
		);
	}

});

module.exports = NavagationBar;