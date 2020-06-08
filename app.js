'use strict'

var http = require('http');
var https = require('https');
var path = require('path');
var fs = require('fs');
var express = require('express');
var serveIndex = require('serve-index');

var app = express();
const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;

class base {
	constructor() {
		// console.log("BaseClass")
	}
}

app.use(serveIndex('./public'));
app.use('/', express.static(path.join(__dirname, './public')));

console.log("http run on :",process.argv.slice(2)[0] || 80)
console.log("https run on :",process.argv.slice(2)[1] || 443)

class ss extends base {
	constructor() {
		super();
		this.DefineEnvironment();
		this.CreateHttpServer();
		this.CreateHttpServer_SSL();
		this.CreateWebSocket();
	}
	DefineEnvironment(){
		this.ssl_options = {
			key  : fs.readFileSync('./ssl/ca.key'),
			cert : fs.readFileSync('./ssl/cert.crt')
		}
		this.eth = '0.0.0.0'
	}
	CreateHttpServer(){
		//http server
		this.http_server = http.createServer(app);
		this.http_server.listen(process.argv.slice(2)[0], this.eth);
	}
	CreateHttpServer_SSL(){
		//https server
		this.https_server = https.createServer(this.ssl_options, app);
		this.https_server.listen(process.argv.slice(2)[1], this.eth);
	}
	CreateWebSocket(){
		var that = this;
		this.wss = new WebSocketServer({
			server: this.https_server
		});

		this.wss.on('connection', this.WebSocket_connection);
		this.wss.broadcast = function (data) {
			that.wss.clients.forEach(function (client) {
				if (client.readyState === WebSocket.OPEN) {
					client.send(data);
				}
			});
		};
	}
	WebSocket_connection(ws, req){
		ws.on('message', function (message) {
			console.log(message);
		})
		ws.on('close', function (message) {
			console.log(message);
		})
		ws.on('error', function (message) {
			console.log('erro');
			console.log(message);
		})
	}
}


let cc= new ss();