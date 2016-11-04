var React = require('react');

var NetTip = React.createClass({

	render: function() {
		return (
			<div className="alert alert-danger alert-dismissable"  id="nettip" style={{width: '50%',marginTop:'30%',display:'none'}}>
            <button type="button" className="close" data-dismiss="alert"
                aria-hidden="true">
                    &times;
            </button>
            <strong>time out ！</strong>连接已断开！
        </div>
		);
	}

});

module.exports = NetTip;