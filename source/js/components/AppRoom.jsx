import React from 'react';
import ReactDOM from 'react-dom';
import Application from './roomComponents/Application.jsx';
import Slider from './roomComponents/Slider.jsx';
import NavagationBar from './roomComponents/NavagationBar.jsx';
import NetTip from './roomComponents/NetTip.jsx';

var AppRoom = React.createClass({
  componentWillMount: function() {
    if (typeof(Storage) !== "undefined") {
      if (sessionStorage.username) {} else {
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
    / > < NavagationBar _roomid = {
    text
  }
  / > 

  < NetTip / >
  < /div>
);
}

});

module.exports = AppRoom;