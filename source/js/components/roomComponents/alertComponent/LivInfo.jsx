var React = require('react');

var LivInfo = React.createClass({
	getInitialState: function() {
		return {
			sessionID: '',
			target: '',
			course: ['请先查询指定房间内的liv课程']
		};
	},
	handleClick: function(val) {
		//查询liv文件加载
		if (val !== '') {
			var that = this;
			$.ajax({
				async: true,
				url: 'http://203.195.173.135:9000/play/list?sessionID=' + val,
				type: 'GET',
				timeout: 5000,
				success: function(res) {
					if (res.length == 0) {
						that.setState({
							course: ['此房间内没有可用文件']
						});
					} else {
						that.setState({
							course: res
						});
					}
				}
			});
		}
	},
	componentDidMount: function() {
		var that = this;
		if (this.isMounted) {
			$(this.refs.linput).val(this.props._roomid);
			//查询并显示list liv
			$('#liv_list').on('click', function() {
				that.handleClick($(that.refs.linput).val());
			});
			//播放
			$('#liv_play').on('click', function() {
				//console.log('file :  '+$('#liv_select').val()+'   sess  '+$(that.refs.linput).val()+'  tar  '+that.props._roomid);
					//检查状态是否可以播放
				$.ajax({
					async: true,
					url: 'http://203.195.173.135:9000/play/status?&sessionID=' + that.props._roomid,
					type: 'GET',
					timeout: 5000,
					success: function(res) {
						if (res.status == 'OK') {
							$.ajax({
								async: true,
								url: 'http://203.195.173.135:9000/play/start?file=' + $('#liv_select').val() + '&sessionID=' + $(that.refs.linput).val() + '&loop=true&target=' + that.props._roomid,
								type: 'GET',
								timeout: 5000,
								success: function(res) {
									$('#livModal').modal('hide');
								}
							});
						} else {
							//停止再播
							$.ajax({
								async: true,
								url: 'http://203.195.173.135:9000/play/stop?sessionID=' + that.props._roomid,
								type: 'GET',
								timeout: 5000,
								success: function(res) {
									$.ajax({
										async: true,
										url: 'http://203.195.173.135:9000/play/start?file=' + $('#liv_select').val() + '&sessionID=' + $(that.refs.linput).val() + '&loop=true&target=' + that.props._roomid,
										type: 'GET',
										timeout: 5000,
										success: function(res) {
											$('#livModal').modal('hide');
										}
									});
								}
							});
						}
					}
				});				
			});
			//取消
			$('#liv_cancel').on('click', function() {
				$('#livModal').modal('hide');
			});

			//停止
			$('#liv_stop').on('click', function() {
				$.ajax({
					async: true,
					url: 'http://203.195.173.135:9000/play/stop?sessionID=' + that.props._roomid,
					type: 'GET',
					timeout: 5000,
					success: function(res) {
						$('#livModal').modal('hide');
					}
				})
			});
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
				查询 < /button> < /span > < /div> < select className='livselect' id='liv_select'> {
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
		id = 'liv_stop'
		className = "btn btn-warning" > 停止 < /button> 

		< button type = "button"
		id = 'liv_play'
		className = "btn btn-primary" > 播放 < /button> 

		< /div > < /div > < /div > < /div >
	);
}

});

module.exports = LivInfo;