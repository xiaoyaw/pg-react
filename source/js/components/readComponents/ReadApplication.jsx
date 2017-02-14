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
import {
  hashHistory
} from 'react-router';
let ReadApplication = React.createClass({
  getInitialState: function() {
    this.calculateImgProp('img/welcome.png');
    var audio = document.getElementById('myaudio');
    var video = document.getElementById('myvideo');
    //禁止选中
    if (typeof(document.onselectstart) != "undefined") {
      // IE下禁止元素被选取        
      document.onselectstart = new Function("return false");
    }

    return {
      //liv
      url_getLiv: 'http://182.254.223.23/download/records/',
      timeout: null,
      isStop: false,
      isfirst: true,
      pageIndex: 0,
      pageNum: 0,
      res: null,
      livsize: [],
      dataNow: 0,
      pathover: false,
      audio: audio,
      video: video,
      scaleX: null, //给canvas  X轴图片或笔迹伸缩量
      scaleY: null, //给canvas  Y轴图片或笔迹伸缩量
      src: 'img/welcome.png', //给imgae的
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

  callivMsgSize: function(res) {
    var livsize = []
    for (var p in res) {
      livsize.push(p);
    }
    return livsize;
  },
  playLivFile: function(res) {
    var livsize = this.callivMsgSize(res);
    this.setState({
      livsize: livsize,
      res: res,
      pageNum: livsize.length
    }, function() {
      this.diguiliv();
      $('#liv_Nav').fadeIn();
      this.addControl();
    });
  },
  addControl: function() {
    var thiz = this;
    //向左
    $('#liv_left').on('click', function() {
        if (thiz.state.pageIndex <= thiz.state.pageNum && thiz.state.pageIndex > 0) {
          thiz.state.audio.pause();
          thiz.state.video.pause();
          clearTimeout(thiz.state.timeout);
          if (!thiz.state.pathover&&thiz.state.pageIndex>=1) {
            thiz.setState({
              pageIndex: thiz.state.pageIndex - 1,
              dataNow: 0,
              isfirst: true
            }, function() {
              thiz.diguiliv();
            });
          } else if(thiz.state.pathover&&thiz.state.pageIndex>=2){
            thiz.setState({
              pageIndex: thiz.state.pageIndex - 2,
              dataNow: 0,
              isfirst: true
            }, function() {
              thiz.diguiliv();
            });
          }
        }
      })
      //向右
    $('#liv_right').on('click', function() {
        if (thiz.state.pageIndex < thiz.state.pageNum) {
          thiz.state.audio.pause();
          thiz.state.video.pause();
          clearTimeout(thiz.state.timeout);
          if (!thiz.state.pathover) {
            thiz.setState({
              dataNow: 0,
              pageIndex: thiz.state.pageIndex + 1,
              isfirst: true
            }, function() {
              thiz.diguiliv();
            });
          } else {
            thiz.setState({
              dataNow: 0,
              isfirst: true
            }, function() {
              thiz.diguiliv();
            });
          }
        }
      })
      //停止
    $('#liv_stop').on('click', function() {
      if (!thiz.state.isStop) {
        thiz.state.audio.pause();
        thiz.state.video.pause();
        clearTimeout(thiz.state.timeout);
        thiz.setState({
          isStop: true
        });
      } else { //正在播放的话
        thiz.setState({
          isStop: false
        }, function() {
          if (thiz.state.audio.paused) {
            thiz.state.audio.play();
          }
          thiz.diguiliv();
        });
      }
    })
  },
  //递归liv播放
  diguiliv: function() {
    var thiz = this;
    if (!thiz.state.isStop) {
      if (thiz.state.isfirst) { //第一笔不停留时间
        if (thiz.state.pageIndex < thiz.state.pageNum) {
          //页数未到末尾
          if (thiz.state.dataNow < thiz.state.res[thiz.state.livsize[thiz.state.pageIndex]].length) {
            //本页未到最后一笔
            thiz.handleMessage(thiz.state.res[thiz.state.livsize[thiz.state.pageIndex]][thiz.state.dataNow].data); //画
            thiz.setState({
              dataNow: thiz.state.dataNow + 1,
              pathover: false,
              isfirst: false
            }, function() {
              thiz.diguiliv();
            });
          } else { //本页最后一笔画完，翻页并递归
            thiz.setState({
              pageIndex: thiz.state.pageIndex + 1,
              pathover: true,
              dataNow: 0
            }, function() {
              thiz.diguiliv();
            });
          }
        }
      } else {
        //停留时间
        if (thiz.state.pageIndex < thiz.state.pageNum) {
          //页数未到末尾
          if (thiz.state.dataNow < thiz.state.res[thiz.state.livsize[thiz.state.pageIndex]].length) {
            //本页未到最后一笔
            thiz.state.timeout = setTimeout(function() {
              thiz.handleMessage(thiz.state.res[thiz.state.livsize[thiz.state.pageIndex]][thiz.state.dataNow].data); //画
              thiz.setState({
                dataNow: thiz.state.dataNow + 1,
                pathover: false
              }, function() {
                thiz.diguiliv();
              });
            }, thiz.state.res[thiz.state.livsize[thiz.state.pageIndex]][thiz.state.dataNow].time);
          } else { //本页最后一笔画完，翻页并递归
            thiz.setState({
              pageIndex: thiz.state.pageIndex + 1,
              pathover: true,
              dataNow: 0
            }, function() {
              thiz.diguiliv();
            });
          }
        }
      }

    }
  },

  //渲染以后？ 设置为以前收不到Message
  componentDidMount: function() {
    var thiz = this;
    if (this.isMounted()) {
      //如果是分享出来的
      var fileName = thiz.props.file;
      var url;
      if (fileName.split('_').length == 2) {
        url = thiz.state.url_getLiv + fileName.split('_')[1].split('.')[0] + '/' + encodeURI(encodeURI(fileName)) + '.liv';
      } else {
        url = thiz.state.url_getLiv + fileName.split('_')[1] + '/' + encodeURI(encodeURI(fileName)) + '.liv';
      }
      $.get(url, function(res) {
        thiz.playLivFile(JSON.parse(res));
      });

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
          this.setState({
            data: null
          });
          this.calculateImgProp('data:image/png;base64,' + value.image);

          break;

        case "urlvoice":
          var audio = document.getElementById("myaudio");
          audio.pause();
          audio.src = value.url;
          if (sessionStorage.getItem('openaudio') == 'isOpen') {
            audio.play();
          } else {
            $('#openaudio').fadeIn();
          }
          break;

        case "voice":
          var audio = document.getElementById("myaudio");
          audio.pause();
          audio.src = "data:audio/mpeg;base64," + value.voice;
          if (sessionStorage.getItem('openaudio') == 'isOpen') {
            audio.play();
          } else {
            $('#openaudio').fadeIn();
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
    / >   < OpenAudio / > < /div >
  );
}


});

export default ReadApplication;