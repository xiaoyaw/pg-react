/**
 * Created by qiangswa on 16-9-19.
 * 处理和canvas有关的Message from websocket
 * click to hide or show nav
 */
import React from 'react';

let Canvas = React.createClass({
    getInitialState: function() {
        return {
            canvas: null,
            clicked: false //监听状态隐藏显示导航栏
        };
    },

    //隐藏/显示导航栏
    handleClick: function(e) {
        this.setState({
            clicked: !this.state.clicked
        });

        if (this.state.clicked) {
            $('#nnn').fadeOut();
        } else {
            $('#nnn').fadeIn();
        }
    },

    //获取Context('2d')
    componentDidMount: function() {
        if (this.isMounted()) {
            var thiz = this;
            var can = this.refs.myCanvas;
            can.addEventListener('click', this.handleClick);
            var canvas = this.refs.myCanvas.getContext('2d');
            this.setState({
                canvas: canvas
            });
        }
    },

    handleData: function(data) {
        var canvas = this.state.canvas;
        var sX = this.props._scaleX;
        var sY = this.props._scaleY;
        if (sX != null && sY != null) {
            if (data == 'clearAll') {
                //clearAll
                canvas.clearRect(0, 0, this.props._width, this.props._height);
            } else {
                switch (data.cmd) {
                    case "text":
                        var oX = this.props._img_width / data.stext.width;
                        var oY = this.props._img_height / data.stext.height;
                        var text = data.stext.text;
                        var x = data.stext.x * sX * oX;
                        var y = data.stext.y * sY * oY;
                        canvas.fillStyle = this.getcolor(data.stext.color);
                        // canvas.lineWidth = '0.5';
                        canvas.font = "bold " + (data.stext.line * 1.7).toString() + "px" + " Arial";
                        canvas.fillText(text, x, y);
                        break;
                    case "path":
                        var paths = data.paths;
                        var oX = this.props._img_width / data.properties.width;
                        var oY = this.props._img_height / data.properties.height;
                        //手机性能不好的话 OX OY值为0
                        canvas.beginPath();
                        // （Android系统色） 设置颜色先取补数 再转换为16进制
                        canvas.strokeStyle = this.getcolor(data.properties.color);
                        canvas.lineWidth = data.properties.weight / 2.5;
                        canvas.lineCap = 'round';
                        if (paths[0].path.length != 0) {
                            for (var i = 0; i < paths.length; i++) {
                                var path = paths[i].path;
                                var x1 = path[0].x * sX * oX;
                                var y1 = path[0].y * sY * oY;
                                //path第一个点处理
                                if (canvas.lineWidth % 2 === 0) {
                                    canvas.moveTo(x1, y1);
                                } else {
                                    canvas.moveTo(x1 + 0.5, y1 + 0.5);
                                }
                                var ref = path.slice(1);
                                for (var j = 0; j < ref.length; j++) {
                                    var lx = path[j].x * sX * oX;
                                    var ly = path[j].y * sY * oY;
                                    if (canvas.lineWidth % 2 === 0) {
                                        canvas.lineTo(lx, ly);
                                    } else {
                                        canvas.lineTo(lx + 0.5, ly + 0.5);
                                    }
                                }
                            }
                        }
                        canvas.stroke();
                        canvas.closePath();
                        break;
                    case "erase":
                        var paths = data.paths;
                        var oX = this.props._img_width / data.properties.width;
                        var oY = this.props._img_height / data.properties.height;
                        // console.log(oX + " " + oY);
                        canvas.beginPath();
                        // （Android系统色） 设置颜色先取补数 再转换为16进制
                        canvas.strokeStyle = this.getcolor(data.properties.color);
                        canvas.lineWidth = 15;
                        canvas.lineCap = 'round';
                        canvas.lineJoin = 'round';
                        canvas.globalCompositeOperation = 'destination-out';
                        if (paths[0].path.length != 0) {
                            for (var i = 0; i < paths.length; i++) {
                                var path = paths[i].path;
                                var x1 = path[0].x * sX * oX;
                                var y1 = path[0].y * sY * oY;
                                canvas.moveTo(x1, y1);
                                for (var j = 1; j < path.length; j++) {
                                    var lx = path[j].x * sX * oX;
                                    var ly = path[j].y * sY * oY;
                                    canvas.lineTo(lx, ly);       
                                }
                            }
                        }
                        canvas.stroke();
                        canvas.closePath();
                        canvas.globalCompositeOperation = 'source-over';
                        break;
                    case "icon":
                        var rid = data.sicon.rid;
                        var oX = this.props._img_width / data.sicon.width;
                        var oY = this.props._img_height / data.sicon.height;
                        if (rid == 21) {
                            this.drawLine(data.sicon.x * sX * oX, data.sicon.y * sY * oY, data.sicon.x2 * sX * oX, data.sicon.y2 * sY * oY);
                        } else if (rid == 22) {
                            this.drawRect(data.sicon.x * sX * oX, data.sicon.y * sY * oY, data.sicon.x2 * sX * oX, data.sicon.y2 * sY * oY);
                        } else if (rid == 24) {
                            this.drawCir(data.sicon.x * sX * oX, data.sicon.y * sY * oY,
                                data.sicon.x2 * sX * oX, data.sicon.y2 * sY * oY);
                        } else {
                            var img = new Image();
                            var xpos = data.sicon.x * sX * oX;
                            var ypos = data.sicon.y * sY * oY;
                            img.onload = function draw() {
                                canvas.drawImage(img, xpos - img.width * sX * oX / 2, ypos - img.height * sY * oY, img.width * sX * oX,
                                    img.height * sY * oY);
                            }
                            var imgsrc = data.sicon.icon;
                            img.src = 'data:image/png;base64,' + imgsrc;
                        }
                        break;


                }
            }
        }


    },

    getcolor: function(color) {
        if (color <= 0) {
            var s = (16777216 + color).toString(16);
            while (s.length < 6) {
                s = "0" + s;
            }
            return "#" + s;
        } else { // ios发过来的颜色带透明度时数据为正数
            var s = color.toString(16);
            var col = s.substring(2, s.length);
            while (col.length < 6) {
                col = "0" + col;
            }
            return "#" + col;
        }
    },
    drawLine: function(xl, yl, x2l, y2l) {
        var canvas = this.state.canvas;
        canvas.beginPath();
        canvas.lineWidth = 3;
        canvas.strokeStyle = '#ff0000';
        if (xl < x2l) {
            canvas.moveTo(xl, yl);
            canvas.lineTo(x2l, yl);
            canvas.stroke();
            canvas.closePath();
        } else {
            canvas.moveTo(x2l, y2l);
            canvas.lineTo(xl, y2l);
            canvas.stroke();
            canvas.closePath();
        }
    },
    drawRect: function(x1, y1, x2, y2) {
        var canvas = this.state.canvas;
        var l = Math.abs(x1 - x2);
        var k = Math.abs(y1 - y2);
        canvas.beginPath();
        canvas.lineWidth = 3;
        canvas.strokeStyle = '#ff0000';
        if (x1 < x2 && y1 < y2) {
            canvas.rect(x1, y1, l, k);
            canvas.stroke();
        } else if (x2 < x1 && y2 > y1) {
            canvas.rect(x2, y1, l, k);
            canvas.stroke();
        } else if (x2 > x1 && y2 < y1) {
            canvas.rect(x1, y2, l, k);
            canvas.stroke();
        } else {
            canvas.rect(x2, y2, l, k);
            canvas.stroke();
        }
    },
    drawCir(x1, y1, x2, y2) {
        var canvas = this.state.canvas;
        var a = (Math.abs(x1 - x2)) / 2;
        var b = (Math.abs(y1 - y2)) / 2;
        var x = (x1 + x2) / 2;
        var y = (y1 + y2) / 2;
        var step = (a > b) ? 1 / a : 1 / b;
        canvas.beginPath();
        canvas.lineWidth = 3;
        canvas.strokeStyle = '#ff0000';
        canvas.moveTo(x + a, y);
        for (var i = 0; i < 2 * Math.PI; i += step) {
            canvas.lineTo(x + a * Math.cos(i), y + b * Math.sin(i));
        }
        canvas.closePath();
        canvas.stroke();
    },
    render: function() {
        //接收数据
        var _data = this.props._data;
        if (_data != null) {
            //console.log('收到笔记了');
            this.handleData(_data);
        } else {
            //console.log('速度擦黑板');
            this.handleData('clearAll');
        }
        return ( < canvas ref = 'myCanvas'
            width = {
                this.props._width
            }
            height = {
                this.props._height
            }
            style = {
                {
                    cursor: 'url("img/"),auto',
                    opacity: 0.6,
                    position: 'absolute',
                    zIndex: '2',
                    left: this.props._left,
                    top: this.props._top
                }
            } > 您的浏览器不支持Canvas, 请尽快升级 < /canvas>
        );
    }
});

export default Canvas;