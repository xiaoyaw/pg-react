var React = require('react');

var OpenShare = React.createClass({
	getInitialState: function() {
		var isChines=(navigator.language||navigator.browserLanguage).substring(0,2)=="zh";
		return {
			isChines:isChines 
		};
	},
	render: function() {
		return (
    <div className="modal fade" id="myInput" tabIndex="-1" role="dialog"
        aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal"
                        aria-hidden="true">&times;</button>
                    <h4 className="modal-title" id="myModalLabel">{this.state.isChines?"请输入标题:":"Please enter the title"}</h4>
                </div>
                <div className="modal-body">
                    <input type="text" className="form-control" id='shareMsg'/>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal"
                        id='initShare'>{this.state.isChines?"取消":"Cancel"}</button>
                    <button type="button" className="btn btn-primary" data-dismiss="modal"
                        id='sureMsg'>{this.state.isChines?"提交":"Commit"}</button>
                </div>
            </div>
        </div>
    </div>
		);
	}

});

module.exports = OpenShare;