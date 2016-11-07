import {
	Link
} from 'react-router';
import {
	browserHistory
} from 'react-router';

var React = require('react');
var JoinInput = React.createClass({

	getInitialState: function() {
		return {
			text: ''
		};
	},
	componentDidMount: function() {
		if (this.isMounted()) {
			var thiz = this;
			var input = this.refs.textinput;
			$(input).bind('input propertychange', function() {
				thiz.setState({
					text: $(this).val().toLowerCase()
				});
			});
		}
	},

	render: function() {
		var text=this.state.text;
		return ( < div id = "bigScreen" >
			< div id = 'pageshare' >

			< img id = "page"
			src = "http://pictoshare.net/dev/build/img/pageshare.png"
			style = {
				{
					width: '20%',
					height: '20%'
				}
			}
			/> < /div >

			< div className = "render"
			style = {
				{
					textAlign: 'center'
				}
			} > < /div> < div className = "row" > < div id = 'input'
			style = {
				{
					width: '60%'
				}
			} >

			< div className = "input-group" >

			< input type = "text"
			ref = "textinput"
			className = "form-control"
			id = "roomid"
			placeholder = "roomID"
			width = "150px" / >

			< div className = "input-group-btn" >
			< Link to = {'/dev/build/room/'+text}
			className = "btn btn-default"
			tabIndex = "-1"
			id = "go" > Join < /Link> 

			< /div > < /div >
			< /div > < /div >
			< /div>
		);
	}

});

module.exports = JoinInput;