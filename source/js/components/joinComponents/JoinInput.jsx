import Select from './Select.jsx';
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
			width: '',
			isRead: false
		};
	},
	componentWillMount: function() {
		this.calLogoSize();
	},
	componentDidMount: function() {
		if (this.isMounted()) {
			var thiz = this;
			$('#switch').on('click', function() {
				var model = sessionStorage.getItem('model');
				if (model == 'false') {
					thiz.setState({
						isRead: false
					});
					thiz.addEventtoinput();
				} else {
					thiz.setState({
						isRead: true
					});
				}
			})
			this.addEventtoinput();
			window.addEventListener('resize', thiz.handleResize);
		}
	},
	addEventtoinput: function() {
		var thiz = this;
		var input = this.refs.textinput;
		//处理Input值是否为空
		$('#go').on('click', function() {
			thiz.handleClick();
		});
		//回车键提交
		$('#roomid').keydown(function(e) {
			var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
			if (eCode == "13") { //keyCode=13是回车键
				thiz.handleClick();
			}
		});
		//实时获取text
		$(input).on('keyup', function() {
			$(input).val($(input).val().replace(/\s/g, ''));
			thiz.setState({
				text: $(this).val().toLowerCase()
			});
		});
	},
	calLogoSize: function() {
		var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		if (w > h) {
			this.setState({
				width: h * 0.4,
				inputWidth: w*0.6+'px'
			});
		} else {
			this.setState({
				width: w * 0.6,
				inputWidth: w*0.8+'px'
			});
		}
	},
	handleClick: function() {
		if (this.state.text == '') {
			$('#warn').fadeIn();
			setTimeout(function() {
				$('#warn').fadeOut();
			}, 2000);
		} else {
			$(this.refs.textinput).blur();
			hashHistory.replace('/room/' + this.state.text);
		}
	},
	render: function() {
		if (this.state.isRead) {
			return ( < div >
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
				< div className = "row" >
				< div id = 'input'
				style = {
					{
						width: this.state.inputWidth
					}
				} >
				< Select / >
				< /div > < /div > < /div >  < /div>);
			}
			else {
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
					< div className = "row" >
					< div id = 'input'
					style = {
						{
							width: this.state.inputWidth
						}
					} >

					< div className = "input-group" >

					< input type = "text"
					ref = "textinput"
					className = "form-control"
					id = "roomid"
					placeholder = "roomID" / >

					< div className = "input-group-btn" >
					< a className = "btn btn-default"
					tabIndex = "-1"
					id = "go" > Join < /a> 

					< /div >  < /div > < /div > < /div > < /div > < div style = { {
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

}

});

module.exports = JoinInput;