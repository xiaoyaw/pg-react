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

	componentDidMounted:function(){
		if(this.isMounted()){
			if(sessionStorage.username){

			}else{
				hashHistory.replace('/');
			}
		}
	},
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