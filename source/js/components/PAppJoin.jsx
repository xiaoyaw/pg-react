import PJoinInput from './joinComponents/PJoinInput.jsx';
import JoinNav from './joinComponents/JoinNav.jsx';
import Switch from './joinComponents/Switch.jsx';
import {
	Router,
	Route,
	hashHistory
} from 'react-router';

var React = require('react');

var PAppJoin = React.createClass({

	componentWillMount: function() {
		if (sessionStorage.username) {

		} else {
			hashHistory.replace('/');
		}
	},
	componentDidMount:function(){
		if(this.isMounted()){
			$('#headimage').on('click',function(){
				sessionStorage.clear();
				hashHistory.replace('/');
			})
		}
	},
	render: function() {

		return ( < div >
			< JoinNav / >
			< PJoinInput / >
			< Switch / >
			< /div>
		);
	}

});

module.exports = PAppJoin;