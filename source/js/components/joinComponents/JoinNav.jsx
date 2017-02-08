import {
	Router,
	Route,
	hashHistory,
} from 'react-router';
var React = require('react');

var JoinNav = React.createClass({
	render: function() {
		return ( < nav className = "navbar navbar-default"
			role = "navigation"
			style = {
				{
					backgroundColor: '#d9edf7',
					display: 'block'
				}
			} >
			< div className = "navbar-header" >
			< a className = "navbar-brand navbar-left"
			href = "#"
			id = 'headimage'
			style = {
				{
					color: "#B452CD"
				}
			} > < span className = "glyphicon glyphicon-user"
			id = "span" > {
				this.props.nickname
			} < /span></a >
			< /div>  < /nav >
		);
	}

});

module.exports = JoinNav;