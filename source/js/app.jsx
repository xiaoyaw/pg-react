/*
Copyrighted, 版权所有，奕甲智能技术（上海）有限公司 2015-2018
*/


import React from 'react';
import ReactDOM from 'react-dom';
import AppRoom from './components/AppRoom.jsx';
import AppJoin from './components/AppJoin.jsx';
import wxLogin from './components/wxLogin.jsx';
import Login from './components/Login.jsx';
import EreadRoom from './components/readComponents/EreadRoom.jsx';
import {
	Router,
	Route,
	hashHistory
} from 'react-router';
// import { browserHistory } from 'react-router';
// if (is_weixin()) {
	//route of wechat
	ReactDOM.render(
 <Router history={hashHistory}>
 	<Route path="/" component={Login}/>
 	<Route path="/wxlogin"  component={wxLogin}/>
  	<Route path="/join" component={AppJoin}/>
  	<Route path="/eread/:id" component={EreadRoom}/>
   	<Route path="/room/:id" component={AppRoom}/>
</Router>,document.getElementById('app'));
// }else{
	//route of pc
// ReactDOM.render(
//  <Router history={browserHistory}>
//  	<Route path="/dev/build/" component={Login}/>
//   	<Route path="/dev/build/join" component={AppJoin}/>
//   	<Route path="/dev/build/eread/:id" component={EreadRoom}/>
//    	<Route path="/dev/build/room/:id" component={PAppRoom}/>
// </Router>,document.getElementById('app'));	

// }

function is_weixin() {
	var ua = navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == "micromessenger") {
		return true;
	} else {
		return false;
	}
}


