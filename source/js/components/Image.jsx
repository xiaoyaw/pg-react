/**
 * Created by qiangswa on 16-9-19.
 */
import React from 'react';

let Image = React.createClass({

    getInitialState: function () {

        return {
            width: 100,
            height:200
        };
    },

    render: function () {
        return (
            <img  src="img/pageshare.png" />
        );
    }
});

export default Image;
