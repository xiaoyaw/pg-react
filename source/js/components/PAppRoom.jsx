import React from 'react';
import ReactDOM from 'react-dom';
import Application from './roomComponents/Application.jsx';
import Slider from './roomComponents/Slider.jsx';
import PNavagationBar from './roomComponents/PNavagationBar.jsx';
import NetTip from './roomComponents/NetTip.jsx';


var PAppRoom = React.createClass({

  render: function() {
    var text=this.props.params.id;
    return ( 
      < div >
      < Slider  _roomid={text}/ >
      < Application  _roomid={text}  / >
      < PNavagationBar / >
      < NetTip / >
      < /div>
    );
  }

});

module.exports = PAppRoom;
