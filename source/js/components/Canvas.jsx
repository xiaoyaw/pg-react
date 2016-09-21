/**
 * Created by qiangswa on 16-9-19.
 */
import React from 'react';

let Canvas = React.createClass({

    getInitialState: function () {

        return {
            width: 100,
            height:200


        };
    },

    render: function () {
        const props = this.props;
        return (
            <canvas id="bgcanvas" style={{border: 0,width:this.state.width,height:this.state.height,
                color: 'white',
                backgroundColor: 'blue'}}>
            </canvas>
        );
    }
});

export default Canvas;
