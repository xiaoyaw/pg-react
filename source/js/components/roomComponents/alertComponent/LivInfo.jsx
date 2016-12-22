var React = require('react');
var LivInfo = React.createClass({
	getInitialState: function() {
		return {
			course: []
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
			$('#liv').on('click', function() {
				that.handleClick();
			});

			$('#liv_play').on('click', function() {
				$('#livModal').modal('hide');
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
						name.split('.')[0]
					} < /option>
				})
			} < /select>

			< /div>

			< /div >

			< div className = "modal-footer" >


			< button type = "button"
			id = 'liv_play'
			className = "btn btn-primary" > 播放 < /button> 

			< /div > </div > < /div > </div >
		);
	}

});

module.exports = LivInfo;