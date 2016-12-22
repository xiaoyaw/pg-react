import {
	Link
} from 'react-router';
import {
	hashHistory
} from 'react-router';

var React = require('react');

var EreadSelect = React.createClass({

	getInitialState: function() {
		return {
			course: ['1207新格式.liv']
		};
	},
	componentWillMount: function() {
		
	},
	componentDidMount: function() {
		if (this.isMounted()) {
			$(document).focus();
			this.queryAllLiv();
			var thiz = this;
			//处理input是否为空
			$('#go').on('click', function() {
				thiz.setState({
						text:$('#liv_select').val()
					},function(){
						thiz.handleClick();
					});
			});
			//回车键提交
			$(document).keydown(function(e) {
				var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
				if (eCode == "13") { //keyCode=13是回车键
					thiz.setState({
						text:$('#liv_select').val()
					},function(){
						thiz.handleClick();
					});
					
				}
			});
		}
	},
	handleClick: function() {
		if (this.state.text != '') {
			hashHistory.replace('/eread/'+this.state.text);
		}
	},
	queryAllLiv: function() {
		var that = this;
		$.ajax({
			async: true,
			url: 'http://203.195.173.135:9000/files/list?format=json',
			type: 'GET',
			timeout: 5000,
			success: function(res) {
				that.setState({
					course: res
				});
			}
		})
	},
	render: function() {
		return (
			<div />
		);
	}

});

module.exports = EreadSelect;
