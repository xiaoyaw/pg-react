import {
	hashHistory
} from 'react-router';

var React = require('react');

var Home = React.createClass({

	componentDidMount:function(){
		if(this.isMounted()){
			$('#exit').on('click',function(){
				hashHistory.replace('/');
			})
		}
	},
	render: function() {
		return ( < a id = 'exit'
			ref = 'toexit' > < span className = "glyphicon glyphicon-home" > < /span> </a >
		);
	}


});

module.exports = Home;