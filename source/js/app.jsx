/* 判断是微信或是PC，走不同的路由
可直接加room
*/

import React from 'react';
import ReactDOM from 'react-dom';
import AppRoom from './components/AppRoom.jsx';
import PAppRoom from './components/PAppRoom.jsx';
import AppJoin from './components/AppJoin.jsx';
import PAppJoin from './components/PAppJoin.jsx';
import wxLogin from './components/wxLogin.jsx';
import PcLogin from './components/PcLogin.jsx';
import EreadRoom from './components/readComponents/EreadRoom.jsx';

import {
	Router,
	Route,
	hashHistory
} from 'react-router';

if (is_weixin()) {
	//微信端路由
	ReactDOM.render(
 <Router history={hashHistory}>
 	<Route path="/"  component={wxLogin}/>
  	<Route path="/join" component={AppJoin}/>
  	<Route path="/eread/:id" component={EreadRoom}/>
   	<Route path="/room/:id" component={AppRoom}/>
</Router>,document.getElementById('app'));
}else{
	//PC端路由
ReactDOM.render(
 <Router history={hashHistory}>
 	<Route path="/" component={PcLogin}/>
  	<Route path="/join" component={PAppJoin}/>
  	<Route path="/eread/:id" component={EreadRoom}/>
   	<Route path="/room/:id" component={PAppRoom}/>
</Router>,document.getElementById('app'));	

}

function is_weixin() {
	var ua = navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == "micromessenger") {
		return true;
	} else {
		return false;
	}
}


