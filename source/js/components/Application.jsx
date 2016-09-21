import React from 'react';
import Canvas from './Canvas.jsx';
import Image from './Image.jsx';

let Application = React.createClass({

    getInitialState: function () {
        //websocket ...
        return {
            width: 100,
            height:200
        };
    },

  render: function () {
    return (
      <div className="container">
          <Canvas />
          <Image />
      </div>
    );
  }
});

export default Application;
