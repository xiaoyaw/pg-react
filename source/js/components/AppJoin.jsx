import JoinInput from './joinComponents/JoinInput.jsx';
import JoinNav from './joinComponents/JoinNav.jsx';


var React = require('react');

var AppJoin = React.createClass({

	render: function() {
		return ( < div >
			< JoinNav / >
			< JoinInput / >
			< /div>
		);
	}

});

module.exports = AppJoin;