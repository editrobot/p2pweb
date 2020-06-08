import BaseClass from './BaseClass.js';

class CommunicationClass extends BaseClass{
	constructor() {
		super();
	}

	initclient(){
		var that = this;
		if(this.port === null){
			// window.location="http://localhost:3001/auto";
		}
		this.wss = new WebSocket('wss://localhost:443')
		switch (this.wss.readyState) {
			case WebSocket.CONNECTING:
				that.trace('WebSocket.CONNECTING');
			  break;
			case WebSocket.OPEN:
				that.trace('WebSocket.OPEN');
			  break;
			case WebSocket.CLOSING:
				that.trace('WebSocket.CLOSING');
			  break;
			case WebSocket.CLOSED:
				that.trace('WebSocket.CLOSED');
			  break;
			default:
				that.trace('never happens');
			  break;
		}

		this.wss.onopen = function () {
			that.trace('[SERVER] onopen wss://localhost:443');
		};
		this.wss.onmessage = function (message) {
			that.trace('[SERVER] reply:'+JSON.parse(message.data));
		}
		this.onclose();
	}
	
	onclose(){
		var that = this;
		this.wss.onclose = function (message) {
			that.trace("close")
			that.initclient()
		}
	}
}

export default CommunicationClass;