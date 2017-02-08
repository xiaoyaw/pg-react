import {
	Router,
	Route,
	hashHistory,
} from 'react-router';
var React = require('react');

var JoinNav = React.createClass({
	getInitialState: function() {
		return {
			nickname: '飞播e课'
		};
	},

	componentDidMount: function() {
		if (this.isMounted()) {
			if (sessionStorage.nickname) {
				this.setState({
					nickname: sessionStorage.getItem("nickname")
				});
			} else {
				var usn = sessionStorage.getItem("username");
				if (usn.substring(0, 5) == 'guest') {
					this.setState({
						nickname: usn.substring(0, 5)
					});
				} else {
					this.setState({
						nickname: usn
					});
				}

			}
		}

	},
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
				this.state.nickname
			} < /span></a >
			< /div>  < /nav >
		);
	}

});

module.exports = JoinNav;