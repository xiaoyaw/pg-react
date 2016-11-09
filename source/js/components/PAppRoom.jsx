import React from 'react';
import ReactDOM from 'react-dom';
import Application from './roomComponents/Application.jsx';
import Slider from './roomComponents/Slider.jsx';
import PNavagationBar from './roomComponents/PNavagationBar.jsx';
import NetTip from './roomComponents/NetTip.jsx';


var PAppRoom = React.createClass({


  componentWillMount: function() {
    if (typeof(Storage) !== "undefined") {
      if (sessionStorage.username) {

      } else {
        var username = "user_" + Math.random();
        var password = "pass_" + Math.random();
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("password", password);
      }
    }
  },
  render: function() {
    var text = this.props.params.id;
    return ( < div >
      < Slider _roomid = {
        text
      }
      / > < Application _roomid = {
        text
      }
      / > < PNavagationBar / >
      < NetTip / >
      < /div>
    );
  }

});

module.exports = PAppRoom;