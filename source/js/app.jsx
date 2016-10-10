import React from 'react';
import ReactDOM from 'react-dom';
import Application from './components/Application.jsx';
import MyAudio from './components/MyAudio.jsx';
import MyVideo from './components/MyVideo.jsx';

ReactDOM.render( < Application / > , document.querySelector('[data-react-application]'));
ReactDOM.render( < MyAudio / > , document.getElementById('voice'));
ReactDOM.render( < MyVideo / > , document.getElementById('film'));