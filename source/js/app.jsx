/*
Copyrighted, 版权所有，奕甲智能技术（上海）有限公司 2015-2018
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
	//route of wechat
	ReactDOM.render(
 <Router history={hashHistory}>
 	<Route path="/"  component={wxLogin}/>
  	<Route path="/join" component={AppJoin}/>
  	<Route path="/eread/:id" component={EreadRoom}/>
   	<Route path="/room/:id" component={AppRoom}/>
</Router>,document.getElementById('app'));
}else{
	//route of pc
ReactDOM.render(
 <Router history={hashHistory}>
 	<Route path="/" component={PcLogin}/>
  	<Route path="/join(/:id)" component={PAppJoin}/>
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


