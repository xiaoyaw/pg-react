/*
 * 包裹canvas,bgimg的组件
 * 连接websocket，handleMessage
 * 计算尺寸大小位置以及resize以后重新计算
 * 在handleMessage中播放video，audio。1、没有加入video子组件的原因是 导航栏按钮无法获取此子组件的DOM节点
 * 2、没有放在canvas中处理视频的原因是 此组件任何state变化都会导致render方法执行，从而导致视频或音频重复播放
 */
import React from 'react';
import Canvas from '../roomComponents/blackBoard/Canvas.jsx';
import BgImage from '../roomComponents/blackBoard/BgImage.jsx';
import OpenAudio from '../roomComponents/alertComponent/OpenAudio.jsx';
import Loading from '../roomComponents/alertComponent/Loading.jsx';
import {
  hashHistory
} from 'react-router';
let ReadApplication = React.createClass({
  getInitialState: function() {
    var audio = document.getElementById('myaudio');
    var video = document.getElementById('myvideo');
    //禁止选中
    if (typeof(document.onselectstart) != "undefined") {
      // IE下禁止元素被选取        
      document.onselectstart = new Function("return false");
    }

    return {
      //liv
      livArry: [],
      isLivLeft: false,
      livStop: false,
      pageTurn: false,
      lineIndex: 0,
      pageIndex: -1,
      timeout: null,
      audio: audio,
      audioCollect: [],
      video: video,
      scaleX: null, //给canvas  X轴图片或笔迹伸缩量
      scaleY: null, //给canvas  Y轴图片或笔迹伸缩量
      src: '', //给imgae的
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

  //搁置
  handleResize: function(e) {
    if (this.isMounted()) {
      this.calculateImgProp(this.state.src);
    }
  },
  componentWillUnmount() {
    var audio = document.getElementById('myaudio');
    var video = document.getElementById('myvideo');
    audio.pause();
    audio.src = '';
    video.pause();
    video.src = '';
  },

  //渲染以后？ 设置为以前收不到Message
  componentDidMount: function() {
    var thiz = this;
    if (this.isMounted()) {
      //如果是分享出来的
      var fileName = this.props.file;
      var url;
      var pageArry = [];
      //get test
      $.get(Config.LIV_URL + fileName+".liv", function(res) {
        var livArry = res.split("\n"); //行数 Message

        for (var i = 0; i <= livArry.length; i++) {
          if (livArry[i] != "" && livArry[i] != undefined) {
            if (livArry[i].indexOf("!!##image##!!") > 0) {
              pageArry.push(i); //页数获取
            }
          }
        }
        thiz.setState({
          livArry: livArry
        }, function() {
          $('#loading').fadeOut(1000, function() {
            if (sessionStorage.getItem('openaudio') != 'isOpen') {
              $('#openaudio').fadeIn(function(){
                $('#openaudio').on('click',function(){
                   $("#liv_Nav").fadeIn();
                   thiz.readLineLiv(thiz.state.lineIndex);
                });
              });
            }else{
              $("#liv_Nav").fadeIn();
              thiz.readLineLiv(thiz.state.lineIndex);
            }
          });
        });
      });
      //get test

      //liv stop
      $('#liv_stop').on('click', function() {
        thiz.setState({
          livStop: !thiz.state.livStop
        }, function() {
          thiz.readLineLiv(thiz.state.lineIndex)
        });
      });
      //liv stop

      //liv left
      $('#liv_left').on('click', function() {
        clearTimeout(thiz.state.timeout);
        thiz.state.audio.pause();
        if (thiz.state.pageIndex > 0) {
          thiz.setState({
            pageTurn: true,
            isLivLeft: true,
            lineIndex: pageArry[thiz.state.pageIndex - 1]
          }, function() {
            thiz.readLineLiv(thiz.state.lineIndex);
          });
        }
      });
      //liv left

      //liv right
      $('#liv_right').on('click', function() {
        clearTimeout(thiz.state.timeout);
        thiz.state.audio.pause();
        if (thiz.state.pageIndex < pageArry.length - 1) {
          thiz.setState({
            pageTurn: true,
            lineIndex: pageArry[thiz.state.pageIndex + 1]
          }, function() {
            thiz.readLineLiv(thiz.state.lineIndex);
          });
        }
      });
      //liv right
      //点击按钮时下载数据并播放
      $('#exit').on('click', function() {
        clearTimeout(thiz.state.timeout);
        thiz.setState({
          isStop: true
        });
      });
      window.addEventListener('resize', this.handleResize);
    }
  },

  readLineLiv: function(num) {
    if (!this.state.livStop) {
      if (num <= this.state.livArry.length - 1) {
        if (this.state.livArry[num] != "" && this.state.livArry[num] != undefined) {
          this.resolveLine(this.state.livArry[num], num);
        }
      }
    } else {
      clearTimeout(this.state.timeout);
      this.state.audio.pause();
    }
  },
  resolveLine: function(strLine, num) {
    var thiz = this;
    var timeGap;
    if (!this.state.pageTurn) {
      timeGap = strLine.split(":")[2]; //时间
    } else {
      timeGap = 0;
    }
    var msg = null;
    var cmd = strLine.split("##")[1].substring(0, 4);
    switch (cmd) {
      case "imag":
        this.setState({
          pageTurn: false
        });
        msg = {
          cmd: "image",
          image: strLine.split("!!##image##!!")[1]
        }
        break;
      case "path":
        var properties = strLine.split("!!##path[")[1].split("]##!!")[0].split(",");
        var oo = JSON.parse(window.atob(strLine.split("]##!!")[1]));
        oo.properties = {
          color: properties[0],
          weight: properties[1],
          width: properties[2],
          height: properties[3]
        }
        oo.cmd = "path";
        msg = oo;
        break;
      case "text":
        var stext = strLine.split("!!##text[")[1].split("]")[0].split(",");
        msg = {
          cmd: "text",
          stext: {
            width: stext[2],
            height: stext[3],
            color: stext[4],
            line: stext[5],
            text: stext[6],
            x: stext[0],
            y: stext[1]
          }
        }
        break;
      case "icon":
        var sicon = strLine.split("!!##icon[")[1].split("]")[0].split(",");
        msg = {
          cmd: "icon",
          sicon: {
            rid: sicon[6],
            width: sicon[4],
            height: sicon[5],
            x: sicon[0],
            y: sicon[1],
            x2: sicon[2],
            y2: sicon[3]
          }

        }
        break;
      case "eras":
        var properties = strLine.split("!!##erase[")[1].split("]##!!")[0].split(",");
        var oo = JSON.parse(window.atob(strLine.split("]##!!")[1]));
        oo.properties = {
          width: properties[2],
          height: properties[3]
        };
        oo.cmd = "erase";
        msg = oo;
        break;
      case "sour":
        var source = strLine.split("!!##source[")[1].split("]##!!")[0].split(",");
        switch (source[0]) {
          case "voice":
            msg = {
              cmd: "urlvoice",
              url: source[1]
            }
            break;
          case "video":
            msg = {
              cmd: "urlvideo",
              url: source[1]
            }
            break;
        }
        break;

    }
    thiz.state.timeout = setTimeout(function() {
      thiz.setState({
        lineIndex: num + 1
      }, function() {
        thiz.handleMessage(msg);
        thiz.readLineLiv(thiz.state.lineIndex);
      });
    }, timeGap);
  },
  getWindowSize: function() {
    var ww = window.innerWidth;
    var wh = window.innerHeight;
    if (window.innerWidth) { // 兼容火狐，谷歌,safari等浏览器
      ww = window.innerWidth;
    } else if ((document.body) && (document.body.clientWidth)) { // 兼容IE浏览器
      ww = document.body.clientWidth;
    }
    if (window.innerHeight) {
      wh = window.innerHeight;
    } else if ((document.body) && (document.body.clientHeight)) {
      wh = document.body.clientHeight;
    }
    return {
      window_width: ww,
      window_height: wh
    };

  },
  calculateImgProp: function(src) {
    var thiz = this;
    //预先获取图片的宽高
    var pic = new Image();
    pic.src = src;
    //先计算图片长宽比例
    pic.onload = function() {
      var ratio = pic.width / pic.height;
      //获取屏幕宽高
      var w = thiz.getWindowSize().window_width;
      var h = thiz.getWindowSize().window_height;
      //按照高度缩放
      if (h * ratio <= w) {
        thiz.setState({
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

        var offtop = (h - w / ratio) / 2;
        if (offtop < $('#nnn').height()) {
          thiz.setState({
            img_width: pic.width,
            img_height: pic.height,
            scaleY: w / ratio / pic.height,
            scaleX: w / pic.width,
            width: w,
            height: w / ratio,
            left: 0,
            top: 0
          });
        } else {
          thiz.setState({
            img_width: pic.width,
            img_height: pic.height,
            scaleY: w / ratio / pic.height,
            scaleX: w / pic.width,
            width: w,
            height: w / ratio,
            left: 0,
            top: offtop
          });
        }
      }
      thiz.setState({
        src: src
      });
    }
  },
  playbothaudio: function() {
    var that = this;
    var audio = this.state.audio;
    if (audio.ended || audio.paused) {
      if (this.state.audioCollect.length > 0) {
        audio.src = this.state.audioCollect.shift();
        audio.play();
      }
    } else {
      var is_playFinish = setInterval(
        function() {
          if (audio.ended) {
            that.playbothaudio();
            window
              .clearInterval(is_playFinish);
          }
        }, 10);
    }
  },
  saveaudio: function(src) {
    var newArry = this.state.audioCollect;
    newArry.push(src);
    this.setState({
      audioCollect: newArry
    }, function() {
      this.playbothaudio();
    });
  },
  handleMessage: function(msg) {
    var thiz = this;
    this.setState({
      isResize: false
    });
    if (msg != null && msg != "") {
      var value = msg;
      switch (value.cmd) {
        case "startSession":
          //不知道什么时候触发
          this.calculateImgProp('img/welcome.png');
          break;
        case "joinSession":
          //加入房间后触发，先判断有无历史记录背景图
          if (value.image != undefined) {
            this.calculateImgProp('data:image/png;base64,' + value.image);
          } else { //没有背景图计算并展示welcome
            this.calculateImgProp('img/welcome.png');
          }
          break;

        case "image":
          //注意：换background的时候，需要将data置空
          if (this.state.isLivLeft) {
            this.setState({
              data: null,
              isLivLeft: false,
              audioCollect: [],
              pageIndex: this.state.pageIndex - 1
            }, function() {
              this.state.audio.pause();
            });
          } else {
            this.setState({
              data: null,
              audioCollect: [],
              pageIndex: this.state.pageIndex + 1
            }, function() {
              this.state.audio.pause();
            });
          }
          this.calculateImgProp('data:image/png;base64,' + value.image);

          break;


        case "urlvoice":
          if (sessionStorage.getItem('openaudio') == 'isOpen') {
            this.saveaudio(value.url);
          }
          break;

        case "voice":
          if (sessionStorage.getItem('openaudio') == 'isOpen') {
            this.saveaudio("data:audio/mpeg;base64," + value.voice);
          }
          break;

        case "urlvideo":
          $('#myvideo').fadeIn();
          var video = document.getElementById('myvideo');
          video.src = value.url;
          video.play();
          var is_playFinish = setInterval(function() {
            if (video.ended) {
              $('#myvideo').fadeOut();
              window.clearInterval(is_playFinish);
            }
          }, 100);
          break;

        case "openvideo":
          this.setState({
            startVideo: this.state.startVideo + value.video,
            allVideo: ''
          });
          break;

        case "video":
          if (this.state.startVideo != '') { //过滤若为历史记录video片段
            $('#myvideo').fadeIn();
            this.setState({
              allVideo: this.state.startVideo + value.video,
              startVideo: ''
            });
            var video = document.getElementById('myvideo');
            video.src = 'data:video/mp4;base64,' + this.state.allVideo;
            video.play();
            var is_playFinish = setInterval(function() {
              if (video.ended || video.paused) {
                $('#myvideo').fadeOut();
                window.clearInterval(is_playFinish);
              }
            }, 10);
          }
          break;

        default:
          this.setState({
            data: value
          });
      }
    }
  },

  render: function() {
    //  resize  video size and position
    var video = document.getElementById('myvideo');
    video.width = this.state.width;
    video.height = this.state.height;
    video.style.left = this.state.left + 'px';
    video.style.top = this.state.top + 'px';

    return ( < div >

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
      />   < Canvas _img_width = {
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
    / >   < OpenAudio / > < Loading / > < /div >
  );
}


});

export default ReadApplication;