var React = require('react');

var OpenApp = React.createClass({

	render: function() {
		return (
			<div className="modal fade" id="myopen" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div className="modal-dialog">
		<div className="modal-content">
			<div className="modal-header">
				<button type="button" className="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 className="modal-title" id="myModalLabel">
					请输入参数打开app
				</h4>
			</div>
			<div className="modal-body">
				<div><label>roomID:<input className="form-control" id="app_roomid"/></label></div>
				<div><label>filePath:<input className="form-control" id="app_filepath"/></label></div>
			</div>
			<div className="modal-footer">
				<button type="button" className="btn btn-default" id="app_open">打开app
				</button>
				<button type="button" className="btn btn-primary" id="app_download">
					去下载
				</button>
			</div>
		</div>
	</div>
</div>
		);
	}

});

module.exports = OpenApp;