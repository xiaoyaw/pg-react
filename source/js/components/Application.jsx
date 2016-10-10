/*
* 包裹canvas,bgimg的组件
* 连接websocket，handleMessage
* 计算尺寸大小位置以及resize以后重新计算
* 在handleMessage中播放video，audio。1、没有加入video子组件的原因是 导航栏按钮无法获取此子组件的DOM节点
* 2、没有放在canvas中处理视频的原因是 此组件任何state变化都会导致render方法执行，从而导致视频或音频重复播放
*/

import React from 'react';
import Canvas from './Canvas.jsx';
import BgImage from './BgImage.jsx';

let Application = React.createClass({
  getInitialState: function() {
    //初始化websocket
    var ws;
    if (ws == null || ws.readyState != 1) {
      ws = new WebSocket('ws://203.195.173.135:9999/ws');
    }
    //随机账号密码
    var username = "user_" + Math.random();
    var password = "pass_" + Math.random();
    //连接websocket
    this.connectWebSocket(ws, username, password, 'addxx');
    return {
      scaleX: null, //给canvas  X轴图片或笔迹伸缩量
      scaleY: null, //给canvas  Y轴图片或笔迹伸缩量
      websocket: ws,
      src: null, //给imgae的
      width: null, //给image  canvse的
      height: null, //给image  canvse的
      left: null, //给image  canvse的
      top: null, //给image  canvse的
      data: null, //从ws接收的数据传递给canvas处理
      img_width: null, //将图片原始宽高传递过去，计算加入者尺寸和图片尺寸比例
      img_height: null, //将图片原始宽高传递过去，计算加入者尺寸和图片尺寸比例
      startVideo: '',
      allVideo: ''
    };
  },

  //发送data打开连接
  connectWebSocket: function(ws, user, pw, id) {
    ws.onerror = function(e) {
      // console.log("error");
    }
    ws.onopen = function(e) {
      var UserMsg = {
        'cmd': 'login',
        'userName': user,
        'passWord': pw,
        'sessionID': id
      };
      ws.send(JSON.stringify(UserMsg));
    }
    ws.onclose = function(e) {
      // console.log("closed");
      // alert('ws断开连接');
    }
  },

  handleResize: function(e) {
    this.calculateImgProp();

  },


  //获取屏幕的宽高
  getWindowSize: function(nav_h) {
    var ww = window.innerWidth;
    var wh = window.innerHeight - nav_h;
    if (window.innerWidth) { // 兼容火狐，谷歌,safari等浏览器
      ww = window.innerWidth;
    } else if ((document.body) && (document.body.clientWidth)) { // 兼容IE浏览器
      ww = document.body.clientWidth;
    }
    if (window.innerHeight) {
      wh = window.innerHeight - nav_h;
    } else if ((document.body) && (document.body.clientHeight)) {
      wh = document.body.clientHeight - nav_h;
    }
    return {
      window_width: ww,
      window_height: wh
    };

  },

  //渲染以后？ 设置为以前收不到Message
  componentDidMount: function() {
    var ws = this.state.websocket;
    var thiz = this;
    if (this.isMounted()) {
      window.addEventListener('resize', this.handleResize);
      ws.onmessage = function(msg) {
        thiz.handleMessage(msg);
      }
    }
  },

  calculateImgProp: function() {
    //先提取state数据
    var src = this.state.src;
    var width = this.state.width;
    var height = this.state.height;
    var left = this.state.left;
    var top = this.state.top;
    var scaleX = this.state.scaleX;
    var scaleY = this.state.scaleY;
    var img_width = this.state.img_width;
    var img_height = this.state.img_height;
    //预先获取图片的宽高
    var pic = new Image();
    pic.src = src;
    //先计算图片长宽比例
    var ratio = pic.width / pic.height;
    //获取屏幕宽高
    var w = this.getWindowSize(0).window_width;
    var h = this.getWindowSize(0).window_height;
    //按照高度缩放
    if (h * ratio <= w) {

      this.setState({
        img_width: pic.width,
        img_height: pic.height,
        scaleY: h / pic.height, //X坐标需要伸缩量
        scaleX: h * ratio / pic.width, //Y坐标需要伸缩量
        width: h * ratio, //canvas,图片宽
        height: h, //canvas,图片高
        left: (w - h * ratio) / 2, //居中后偏左多少
        top: 0 //居中后偏右多少
      });
    } else { //顶齐top

      var offtop = (h - w / ratio) / 2 - 80;
      this.setState({
        img_width: pic.width,
        img_height: pic.height,
        scaleY: w / ratio / pic.height,
        scaleX: w / pic.width,
        width: w,
        height: w / ratio,
        left: 0,
      });
      if (offtop > 0) { //顶部留位置
        this.setState({
          top: offtop
        });
      }
    }
  },

  handleMessage: function(msg) {
    this.setState({
      isResize: false
    });
    var json = msg.data;
    var value = JSON.parse(json);
    var src, data;
    switch (value.cmd) {
      case "login":
        //账号密码为空时
        break;
      case "Error":
        //roomID为空时
        break;
      case "startSession":
        //不知道什么时候触发
        src = this.state.src;
        src = 'img/welcome.png';
        this.setState({
          src: src
        });
        this.calculateImgProp();

        break;
      case "joinSession":
        //加入房间后触发，先判断有无历史记录背景图
        if (value.image != undefined) {
          src = this.state.src;
          src = 'data:image/png;base64,' + value.image;
          this.setState({
            src: src,
            data: null
          });
          this.calculateImgProp();
        } else { //没有背景图计算并展示welcome
          src = this.state.src;
          src = 'img/welcome.png';
          this.setState({
            src: src,
            data: null
          });
          this.calculateImgProp();
        }

        break;

      case "image":
        //注意：换background的时候，需要将data置空
        src = this.state.src;
        src = 'data:image/png;base64,' + value.image;
        this.setState({
          src: src,
          data: null
        });
        this.calculateImgProp();
        break;

      case "urlvoice":
        var audio = document.getElementById("myaudio");
        audio.pause();
        audio.src = value.url;
        audio.play();
        break;

      case "voice":
        var audio = document.getElementById("myaudio");
        audio.pause();
        audio.src = "data:audio/mpeg;base64," + value.voice;
        audio.play();
        break;

      case "urlvideo":
        var video = document.getElementById('myvideo');
        video.src = value.url;
        video.play();
        break;

      case "openvideo":
        this.setState({
          startVideo: this.state.startVideo + value.video,
          allVideo: ''
        });
        break;

      case "video":
        $('#myvideo').fadeIn();
        this.setState({
          allVideo: this.state.startVideo + value.video,
          startVideo: ''
        });
        var video = document.getElementById('myvideo');
        video.src = 'data:video/mp4;base64,' + this.state.allVideo;
        video.play();
        var is_playFinish = setInterval(function() {
          if (video.ended) {
            $('#myvideo').fadeOut();
            window.clearInterval(is_playFinish);
          }
        }, 10);
        break;

      default:
        data = this.state.data;
        data = value;
        this.setState({
          data: data
        });
    }
  },

  render: function() {
    //  resize  video size and position
        var video = document.getElementById('myvideo');
        video.width = this.state.width;
        video.height = this.state.height;
        video.style.left = this.state.left + 'px';
        video.style.top = this.state.top;

    return ( < div className = "container" >

      < BgImage _src = {
        this.state.src
      }
      _width = {
        this.state.width
      }
      _height = {
        this.state.height
      }
      _left = {
        this.state.left
      }
      _top = {
        this.state.top
      }
      />    

      < Canvas _img_width = {
        this.state.img_width
      }
      _img_height = {
        this.state.img_height
      }

      _scaleX = {
        this.state.scaleX
      }
      _scaleY = {
        this.state.scaleY
      }
      _data = {
        this.state.data
      }
      _left = {
        this.state.left
      }
      _top = {
        this.state.top
      }
      _width = {
        this.state.width
      }
      _height = {
        this.state.height
      }
      / >   < /div >
    );
  }


});

export default Application;