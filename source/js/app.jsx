import React from 'react';
import ReactDOM from 'react-dom';
import AppRoom from './components/AppRoom.jsx';
import AppJoin from './components/AppJoin.jsx';
import PAppJoin from './components/PAppJoin.jsx';
import wxLogin from './components/wxLogin.jsx';
import {
	Router,
	Route,
	browserHistory,
} from 'react-router';

if (is_weixin()) {
	//微信端路由
	ReactDOM.render(
 <Router history={browserHistory}>
 	<Route path="/" component={wxLogin}/>
  	<Route path="/join" component={AppJoin}/>
   	<Route path="/room/:id" component={AppRoom}/>
</Router>,document.getElementById('app'));
}else{
	//PC端路由
ReactDOM.render(
 <Router history={browserHistory}>
  	<Route path="/" component={PAppJoin}/>
   	<Route path="/room/:id" component={AppRoom}/>
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


