var React = require('react');

var LivInfo = React.createClass({
	getInitialState: function() {
		return {
			sessionID: '',
			target: '',
			course: ['abc', 'def', 'kate']
		};
	},
	handleClick: function(val) {
		if (val !== '') {
			$.ajax({
				async: true,
				url: 'http://203.195.173.135:9000/play/list?sessionID='+val,
				type: 'GET',
				timeout: 5000,
				success: function(res) {
					console.log(res);
				}
			});
		}
	},
	componentDidMount: function() {
		var that = this;
		if (this.isMounted) {
			$('#liv_list').on('click', function() {
				that.handleClick($(that.refs.linput).val());
			})
		}
	},
	render: function() {
		var names = this.state.course;
		return ( < div className = "modal fade"
				id = "livModal"
				tabIndex = "-1"
				role = "dialog" >
				< div className = "modal-dialog" >

				< div className = "modal-content" >

				< div className = "modal-body" >
				< div className = "input-group" >
				< input type = "text"
				ref = 'linput'
				className = "form-control" / >
				< span className = "input-group-btn" >
				< button id = 'liv_list'
				className = "btn btn-default"
				type = "button" >
				查询 < /button> < /span > < /div> < select > {
				names.map(function(name) {
					return <option key = {
						name
					} > {
						name
					} < /option>
				})
			} < /select> < /div >

			< div className = "modal-footer" >

			< button type = "button"
		id = 'liv_cancel'
		className = "btn btn-default" > 取消 < /button>

		< button type = "button"
		id = 'liv_play'
		className = "btn btn-primary" > 播放 < /button> 

		< /div > < /div > < /div > < /div >
	);
}

});

module.exports = LivInfo;