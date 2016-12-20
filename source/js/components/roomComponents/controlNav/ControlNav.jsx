var React = require('react');

var ControlNav = React.createClass({
	getInitialState: function() {
		return {
			clicked: false
		};
	},
	handleClick: function() {
		this.setState({
			clicked: !this.state.clicked
		});
	},

	render: function() {

		var stopstate = this.state.clicked ? 'glyphicon glyphicon-play' : 'glyphicon glyphicon-pause';

		return ( < div className = "navbar-fixed-bottom "
			id = "liv_Nav"
			style = {
				{
					display:'none',
					zIndex: 10,
					opacity: 0.5
				}
			} >
			< button id = "liv_left"
			className = "liv_control" >
			< span className = "glyphicon glyphicon-chevron-left" > < /span> < /button >


			< button id = "liv_stop"
			onClick={this.handleClick}
			className = "liv_control" >
			< span className = {stopstate} > < /span> < /button >


			< button id = "liv_right"
			className = "liv_control" >
			< span className = "glyphicon glyphicon-chevron-right" > < /span> < /button > < /div>
		);
	}

});

module.exports = ControlNav;