var React = require('react');

var PlayLiv = React.createClass({
	handleClick:function(){
		$('#livModal').modal('show');
	},
	componentDidMount: function() {
		if (this.isMounted) {
			
		}
	},
	render: function() {
		return ( < a id = "liv" onClick={this.handleClick}> < span className = "glyphicon glyphicon-film"> < /span></a > );
	}

});

module.exports = PlayLiv;