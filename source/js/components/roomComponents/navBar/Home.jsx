import {
	IndexLink
} from 'react-router';

var React = require('react');

var Home = React.createClass({


	render: function() {
		return ( < IndexLink id = 'exit'
			to = "/"
			ref = 'toexit' > < span className = "glyphicon glyphicon-home" > < /span> </IndexLink >
		);
	}


});

module.exports = Home;