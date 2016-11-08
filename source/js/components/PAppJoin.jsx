import PJoinInput from './joinComponents/PJoinInput.jsx';
import JoinNav from './joinComponents/JoinNav.jsx';


var React = require('react');

var PAppJoin = React.createClass({


	render: function() {
		return ( < div >
			< JoinNav / >
			< PJoinInput / >
			< /div>
		);
	}

});

module.exports = PAppJoin;