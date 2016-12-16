var React = require('react');
var LivInfo = React.createClass({
	getInitialState: function() {
		return {
			sessionID: '',
			target: '',
			course: ['aaaaa', 'bbbbb', 'ccccc', 'ddddd', 'eeeee'],
			sessionID: []
		};
	},
	handleClick: function() {
		//查询liv文件加载
		this.queryAllLiv();
	},
	componentDidMount: function() {
		var that = this;
		if (this.isMounted) {
			//查询并list所有liv
			this.queryAllLiv();
			//再次刷新liv列表			
			$('#liv_list').on('click', function() {
				that.handleClick();
			});

			//播放
			$('#liv_play').on('click', function() {
				console.log($('#liv_select').val());
				//检查状态是否可以播放
				// $.ajax({
				// 	async: true,
				// 	url: 'http://203.195.173.135:9000/play/status?&sessionID=' + that.props._roomid,
				// 	type: 'GET',
				// 	timeout: 5000,
				// 	success: function(res) {
				// 		if (res.status == 'OK') {
				// 			$.ajax({
				// 				async: true,
				// 				url: 'http://203.195.173.135:9000/play/start?file=' + $(that.refs.linput).val() + '&sessionID=' + that.state.sessionID[that.state.course.indexOf($(that.refs.linput).val())] + '&loop=true&target=' + that.props._roomid,
				// 				type: 'GET',
				// 				timeout: 5000,
				// 				success: function(res) {
				// 					$('#livModal').modal('hide');
				// 				}
				// 			});
				// 		} else {
				// 			//停止再播
				// 			$.ajax({
				// 				async: true,
				// 				url: 'http://203.195.173.135:9000/play/stop?sessionID=' + that.props._roomid,
				// 				type: 'GET',
				// 				timeout: 5000,
				// 				success: function(res) {
				// 					$.ajax({
				// 						async: true,
				// 						url: 'http://203.195.173.135:9000/play/start?file=' + $(that.refs.linput).val() + '&sessionID=' + that.state.sessionID[that.state.course.indexOf($(that.refs.linput).val())] + '&loop=true&target=' + that.props._roomid,
				// 						type: 'GET',
				// 						timeout: 5000,
				// 						success: function(res) {
				// 							$('#livModal').modal('hide');
				// 						}
				// 					});
				// 				}
				// 			});
				// 		}
				// 	}
				// });
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
	queryAllLiv: function() {
		var that = this;
		$.ajax({
			async: true,
			url: 'http://203.195.173.135:9000/play/list',
			type: 'GET',
			timeout: 5000,
			success: function(res) {
				var a = [],
					b = [];
				for (var p in res) {
					if (res[p].length != 0) {
						for (var i = 0; i < res[p].length; i++) {
							b.push(p);
							a.push(res[p][i]);
						}
					}
				}
				that.setState({
					course: a,
					sessionID: b
				});
			}
		})
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
			< div >
			< select name = "livfile"
			className = "container"
			id = "liv_select" > {
				names.map(function(name) {
					return <option key = {
						name
					}
					value = {
						name
					} > {
						name
					} < /option>
				})
			} < /select>

			< /div>

			< /div >

			< div className = "modal-footer" >

			< button type = "button"
			id = 'liv_list'
			className = "btn btn-info pull-left" > 刷新列表 < /button>

			< button type = "button"
			id = 'liv_cancel'
			className = "btn btn-default" > 取消 < /button>

			< button type = "button"
			id = 'liv_stop'
			className = "btn btn-warning" > 停止 < /button> 

			< button type = "button"
			id = 'liv_play'
			className = "btn btn-primary" > 播放 < /button> 

			< /div > </div > < /div > </div >
		);
	}

});

module.exports = LivInfo;