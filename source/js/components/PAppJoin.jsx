import PJoinInput from './joinComponents/PJoinInput.jsx';
import JoinNav from './joinComponents/JoinNav.jsx';
import Switch from './joinComponents/Switch.jsx';

var React = require('react');

var PAppJoin = React.createClass({
	render: function() {

		return ( < div >
			< JoinNav / >
			< PJoinInput / >
			<Switch/>
			< /div>
		);
	}

});

module.exports = PAppJoin;