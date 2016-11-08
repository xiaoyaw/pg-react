/**
 * Created by qiangswa on 16-9-19.
 */
import React from 'react';

let BgImage = React.createClass({

    getInitialState: function() {
        return {
            width: 100,
            height: 200
        };
    },
    
    render: function() {
        return ( < img 
            style = {
                {
                    width:this.props._width,
                    height:this.props._height,
                    position: 'absolute',
                    zIndex: '-1',
                    left:this.props._left,
                    top:this.props._top
                }
            }
            src = {
                this.props._src
            }
            />
            //<img  src="img/pageshare.png" />
        );
    }
});

export default BgImage;