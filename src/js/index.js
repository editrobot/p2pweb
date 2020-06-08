'use strict'

import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import App from './app.js';
import '../css/styles.css';


if ('serviceWorker' in navigator) {
   window.addEventListener('load', () => {
     navigator.serviceWorker.register('/service-worker.js').then(registration => {
       console.log('SW registered: ', registration);
     }).catch(registrationError => {
       console.log('SW registration failed: ', registrationError);
     });
   });
}

if (process.env.NODE_ENV !== 'production') {
    console.log('It is development mode!');
}

ReactDOM.render(<App />, document.querySelector('body'));


/*
function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    btn.innerHTML = '点击这里，，然后查看 console！';
    btn.onclick = printMe;

    local_video();
    remote_video();
    connect_button();
    leave_button();
    link_video_button();
    close_video_button();

    element.appendChild(btn);

    return element;
}

let element = component(); // 存储 element，以在 print.js 修改时重新渲染
document.body.appendChild(element);

if (module.hot) {
    module.hot.accept(
      './app.js',
      function() {
        console.log('Accepting the updated module!');
        document.body.removeChild(element);
        element = component(); // Re-render the "component" to update the click handler
        document.body.appendChild(element);
    })
}
*/
