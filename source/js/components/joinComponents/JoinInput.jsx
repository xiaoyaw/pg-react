import {
	Link
} from 'react-router';
import {
	hashHistory
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
			$('#go').on('click', function() {
				thiz.handleClick();
			});
			$(input).bind('input propertychange', function() {
				$(this).val($(this).val().replace(/\s/g,''));
				thiz.setState({
					text: $(this).val().toLowerCase()
				});
			});
		}
	},
	handleClick:function(){
		if(this.state.text==''){
			$('#warn').fadeIn();
			setTimeout(function() {
				$('#warn').fadeOut();
			}, 2000);
		}
	},
	render: function() {
		var text = this.state.text;
		return ( < div id = "bigScreen" >
			< div id = 'pageshare' >

			< img id = "page"
			src = "img/pageshare.png"
			style = {
				{
					width: '60%',
					height: '60%'
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
			placeholder = "roomID"
			width = "150px" / >

			< div className = "input-group-btn" >
			< Link to = {
				'/room/' + text
			}
			className = "btn btn-default"
			tabIndex = "-1"
			id = "go" > Join < /Link> 

			< /div > < /div >
			< /div > < /div >
				< div style = {
				{
					textAlign: 'center',textShadow: '2px 2px 5px #9B30FF',marginTop: '35px',display: 'none'
				}
			}
			id = "warn" > < font style = {
				{
					fontSize: '16px'
				}
			} > RoomID can not be empty！！！ < /font></div >

			< /div>
		);
	}

});

module.exports = JoinInput;