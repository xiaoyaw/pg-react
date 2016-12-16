var React = require('react');

var ControlNav = React.createClass({

	render: function() {
		return ( < div className = "navbar-fixed-bottom "
			id = "liv_Nav"
			style = {
				{
					display: 'none',
					zIndex: 10,
					opacity: 0.5
				}
			} >
			< button id = "liv_left"
			className = "liv_control" >
			< span className = "glyphicon glyphicon-chevron-left" > < /span> < /button >


			< button id = "liv_stop"
			className = "liv_control" >
			< span className = "glyphicon glyphicon-stop" > < /span> < /button >


			< button id = "liv_right"
			className = "liv_control" >
			< span className = "glyphicon glyphicon-chevron-right" > < /span> < /button > < /div>
		);
	}

});

module.exports = ControlNav;