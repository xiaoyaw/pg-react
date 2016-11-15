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
			text: '',
			width:''
		};
	},
	componentDidMount: function() {
		if (this.isMounted()) {
			var thiz = this;
			var input = this.refs.textinput;
			//处理input是否为空
			$('#go').on('click', function() {
				thiz.handleClick();
			});

			//回车键提交
			$('#roomid').keydown(function(e) {
				var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
				if (eCode == "13") { //keyCode=13是回车键
					thiz.handleClick();
					hashHistory.replace('/room/' + thiz.state.text);
				}
			});
			//获取焦点
			$(input).focus();
			//实时获取input值
			$(input).bind('input propertychange', function() {
				$(this).val($(this).val().replace(/\s/g, ''));
				thiz.setState({
					text: $(this).val().toLowerCase()
				});
			});
		}
	},
	calLogoSize: function() {
		var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		if(w>h){
			this.setState({
				width:h*0.4,
			});
		}else{
			this.setState({
				width:w*0.6, 
			});
		}
	},
	handleClick: function() {
		if (this.state.text == '') {
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
					width: this.state.width,
					height: this.state.width
				}
			}
			/> < /div >
			< div className = "container" >
			< div className = "row" > < div id = 'input'
			style = {
				{
					width: '80%'
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

			< /div > < /div > < /div > < /div > < /div > < div style = {
				{
					textAlign: 'center',
					textShadow: '2px 2px 5px #9B30FF',
					marginTop: '35px',
					display: 'none'
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