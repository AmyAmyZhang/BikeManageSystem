import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Life from './pages/demo/Life';
import registerServiceWorker from './registerServiceWorker';
import  IRouter from './pages/router_demo/router3/router';
import Router from './router';

ReactDOM.render(
   < Router />    
    , document.getElementById('root'));
registerServiceWorker(); 