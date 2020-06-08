import React from 'react';


import BaseClass from './library/BaseClass.js';
import CommunicationClass from './library/CommunicationClass.js';


let b = new BaseClass();
let c = new CommunicationClass();
c.initclient();

function App() {
  return (
    <div className="App">
      <div>
        <label>audio input device:</label>
        <select id="audioSource"></select>
      </div>
      <div>
        <label>audio output device:</label>
        <select id="audioOutput"></select>
      </div>
      <div>
        <label>video input device:</label>
        <select id="videoSource"></select>
      </div>
      <div id="preview">
				<div >
					<h2>Local:</h2>
					<video id="localvideo" autoplay playsinline muted></video>
					<h2>Local SDP:</h2>
					<textarea id="offer"></textarea>
				</div>
				<div>
					<h2>Remote:</h2>
					<video id="remotevideo" autoplay playsinline muted></video>
					<h2>Remote SDP:</h2>
					<textarea id="answer"></textarea>
				</div>
			</div>
			<div>
				<button id="start">start</button>
				<button id="call">call</button>
				<button id="hangup">hang up</button>
			</div>
    </div>
  );
}

export default App;