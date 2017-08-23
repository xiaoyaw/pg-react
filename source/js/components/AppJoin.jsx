import JoinInput from './joinComponents/JoinInput.jsx';
import JoinNav from './joinComponents/JoinNav.jsx';
import Switch from './joinComponents/Switch.jsx';
import ShareJoin from './ShareJoin.jsx';
import {
	Router,
	Route,
	hashHistory
} from 'react-router';

var React = require('react');

var AppJoin = React.createClass({
	getInitialState: function() {
		return {
			nickname: ''
		};
	},
	componentWillMount: function() {
		if (sessionStorage.username&&sessionStorage.nickname) {
			this.setState({
				nickname: sessionStorage.getItem('nickname')
			});
		} else if (sessionStorage.username) {
			this.setState({
				nickname: sessionStorage.getItem('username')
			});
		} else {
			hashHistory.replace('/');
		}
	},
	componentDidMount: function() {
		if (this.isMounted()) {
			$('#headimage').on('click', function() {
				sessionStorage.clear();
				hashHistory.replace('/');
			})
		}
	},
	render: function() {

		return ( < div >
			< JoinNav nickname = {
				this.state.nickname
			}
			/ > < JoinInput / >
			<ShareJoin/>
			< Switch / >
			< /div>
		);
	}

});

module.exports = AppJoin;