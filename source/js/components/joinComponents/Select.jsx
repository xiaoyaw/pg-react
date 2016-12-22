var React = require('react');
import {
	Link
} from 'react-router';
import {
	hashHistory
} from 'react-router';
var Select = React.createClass({
	getInitialState: function() {
		return {
			course: ['请选择待播文件','asd']
		};
	},
	componentDidMount: function() {
		if (this.isMounted()) {
		
			this.queryAllLiv();

			$('#liv_select').on('change', function() {
				if ($(liv_select).val() != '请选择待播文件') {
					var audio = document.getElementById("myaudio");
					audio.src = 'img/sure.mp3';
					audio.play();
					hashHistory.push('/eread/' + $('#liv_select').val());
				}
			});
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
					course: that.state.course.concat(res)
				});
			}
		})
	},
	render: function() {
		return ( < div > < select name = "livfile"
			className = "container"
			id = "liv_select" > {
				this.state.course.map(function(name) {
					return <option key = {
						name
					}
					value = {
						name
					} > {
						name.split('.')[0]
					} < /option>
				})
			} < /select> < /div >
		);
	}

});

module.exports = Select;