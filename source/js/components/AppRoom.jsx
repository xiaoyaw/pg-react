import React from 'react';
import ReactDOM from 'react-dom';
import Application from './roomComponents/Application.jsx';
import Slider from './roomComponents/Slider.jsx';
import NavagationBar from './roomComponents/NavagationBar.jsx';
import NetTip from './roomComponents/NetTip.jsx';


var AppRoom = React.createClass({

  render: function() {
    var text=this.props.params.id;
    return ( 
      < div >
      < Slider  _roomid={text}/ >
      < Application  _roomid={text}  / >
      < NavagationBar / >
      < NetTip / >
      < /div>
    );
  }

});

module.exports = AppRoom;
