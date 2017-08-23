var React = require('react');

var Share = React.createClass({
	getInitialState: function() {
		return {
			title: '飞播云板',
			desc: '邀请你点击进入课堂',
			imgUrl: 'http://pictoshare.net/PageShare/build/img/pageshare.png',
			url_now: document.location.href,
			type: '',
			dataUrl: ''
		};
	},
	componentDidMount: function() {
		var thiz = this;
		if (this.isMounted()) {
			// var u = navigator.userAgent;
			// var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			// if (!isiOS) {
			// 	$.ajax({
			// 		async: true,
			// 		url: "php/wx_share.php",
			// 		type: "GET",
			// 		data: {
			// 			urll: encodeURIComponent(document.location.href)
			// 		},
			// 		timeout: 5000,
			// 		success: function(result) {
			// 			var url_now = document.location.href;
			// 			var arry = result.split(":");
			// 			var appid = arry[0],
			// 				timestamp = arry[1],
			// 				noncestr = arry[2],
			// 				signature = arry[3];
			// 			wx.config({
			// 				debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			// 				appId: appid, // 必填，公众号的唯一标识
			// 				timestamp: timestamp, // 必填，生成签名的时间戳
			// 				nonceStr: noncestr, // 必填，生成签名的随机串
			// 				signature: signature, // 必填，签名，见附录1
			// 				jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'onMenuShareWeibo'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			// 			});
			// 			wx.ready(function() {
			// 				thiz.deal_wx_interface();
			// 			});
			// 			wx.error(function(res) {

			// 				console.log('room签名失败' + res);
			// 				// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

			// 			});
			// 		}
			// 	});
			// } else {
				thiz.deal_wx_interface();
			// }



			//微信分享接口
			$('#share').click(function() {
				$('#myInput').modal('toggle');
			});

			$('#sureMsg').click(
				function() {
					var msg = $('#shareMsg').val();
					if (msg != undefined) {
						var strs = msg.split('&');
						switch (strs.length) {
							case 0:

								break;

							case 1:
								thiz.setState({
									desc: msg
								}, function() {
									thiz.deal_wx_interface();
								});

								break;
							default:
								var req = new Object();
								for (var i = 0; i < strs.length; i++) {
									req[strs[i].split("=")[0]] = unescape(strs[i]
										.split("=")[1]);
								}
								//防止赋空值
								if (req['title'] != undefined) {
									thiz.setState({
										title: req['title']
									});
								}
								if (strs[0] != undefined) {
									thiz.setState({
										desc: strs[0]
									});
								}
								if (req['imgUrl'] != undefined) {
									thiz.setState({
										imgUrl: req['imgUrl']
									});
								}
								if (req['type'] != undefined) {
									thiz.setState({
										type: req['type']
									});
								}
								if (req['dataUrl'] != undefined) {
									thiz.setState({
										dataUrl: req['dataUrl']
									});
								}

								thiz.deal_wx_interface();

								break;
						}
					}

				});
		}
	},
	deal_wx_interface: function() {
		//验证签名，监听分享
		var title = this.state.title,
			desc = this.state.desc,
			imgurl = this.state.imgUrl,
			type = this.state.type,
			dataUrl = this.state.dataUrl,
			url_now = this.state.url_now;
		// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
		wx.onMenuShareAppMessage({
			title: title, // 分享标题
			desc: desc, // 分享描述
			link: url_now, // 分享链接
			imgUrl: imgurl, // 分享图标
			type: type, // 分享类型,music、video或link，不填默认为link
			dataUrl: dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
			success: function() {
				// 用户确认分享后执行的回调函数

			},
			cancel: function() {
				// 用户取消分享后执行的回调函数

			}
		});

		wx.onMenuShareTimeline({
			title: title, // 分享标题
			link: url_now, // 分享链接
			imgUrl: imgurl, // 分享图标
			success: function() {
				// 用户确认分享后执行的回调函数
			},
			cancel: function() {
				// 用户取消分享后执行的回调函数
			}
		});

		wx.onMenuShareQQ({
			title: title, // 分享标题
			desc: desc, // 分享描述
			link: url_now, // 分享链接
			imgUrl: imgurl, // 分享图标
			success: function() {
				// 用户确认分享后执行的回调函数
			},
			cancel: function() {
				// 用户取消分享后执行的回调函数
			}
		});

		wx.onMenuShareWeibo({
			title: title, // 分享标题
			desc: desc, // 分享描述
			link: url_now, // 分享链接
			imgUrl: imgurl, // 分享图标
			success: function() {
				// 用户确认分享后执行的回调函数
			},
			cancel: function() {
				// 用户取消分享后执行的回调函数
			}
		});

		wx.onMenuShareQZone({
			title: title, // 分享标题
			desc: desc, // 分享描述
			link: url_now, // 分享链接
			imgUrl: imgurl, // 分享图标
			success: function() {
				// 用户确认分享后执行的回调函数
			},
			cancel: function() {
				// 用户取消分享后执行的回调函数
			}
		});


	},
	render: function() {
		return ( < a id = 'share' > < span className = 'glyphicon glyphicon-share' > < /span> < /a > );
	}

});

module.exports = Share;