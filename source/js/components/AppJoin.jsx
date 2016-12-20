//修改部分：137

import JoinInput from './joinComponents/JoinInput.jsx';
import JoinNav from './joinComponents/JoinNav.jsx';
import {
	Router,
	Route,
	hashHistory
} from 'react-router';

var React = require('react');

var AppJoin = React.createClass({

	componentDidMount: function() {
		if (sessionStorage.nickname) { //分享设置
			$.ajax({
				async: true,
				url: "php/wx_share.php",
				type: "GET",
				data: {
					urll: document.location.href.split('#')[0],
				},
				timeout: 5000,
				success: function(result) {
					var url_now = document.location.href.split('#')[0];
					var arry = result.split(":");
					var appid = arry[0],
						timestamp = arry[1],
						noncestr = arry[2],
						signature = arry[3];
					//验证签名，监听分享
					var title = '飞播云板',
						desc = '我有东西show你!',
						imgurl = 'http://pictoshare.net/dev/build/img/pageshare.png';
					var is_hasData = setInterval(
						function() {
							if (signature != undefined && signature != "" && signature != 'undefined') {
								//微信分享接口
								wx.config({
									debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
									appId: appid, // 必填，公众号的唯一标识
									timestamp: timestamp, // 必填，生成签名的时间戳
									nonceStr: noncestr, // 必填，生成签名的随机串
									signature: signature, // 必填，签名，见附录1
									jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'onMenuShareWeibo'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
								});

								wx.ready(function() {
									// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
									wx.onMenuShareAppMessage({
										title: title, // 分享标题
										desc: desc, // 分享描述
										link: url_now, // 分享链接
										imgUrl: imgurl, // 分享图标
										type: '', // 分享类型,music、video或link，不填默认为link
										dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
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

								});
								wx.error(function(res) {

									console.log('签名失败');
									// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

								});

								window
									.clearInterval(is_hasData);
							}
						}, 50);

				},
			});

		} else {
			//分享join界面url，先授权获取到username再跳/JOIN
			//	document.location = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe818778f16e4400d&redirect_uri=http%3a%2f%2fpictoshare.net%2fdev%2fbuild&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
			//e课
			document.location = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6573103bb78bec40&redirect_uri=http%3a%2f%2fwww.pictoshare.net%2fdev%2fbuild&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';

		}
	},
	render: function() {
		return ( < div >
			< JoinNav / >
			< JoinInput / >
			< /div>
		);
	}

});

module.exports = AppJoin;