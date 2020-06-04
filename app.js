'use strict'

var https = require('https');
var fs = require('fs');

var options = {
  key  : fs.readFileSync('../fmchl.com/fmchl.com.crt'),
  cert : fs.readFileSync('../fmchl.com/fmchl.com.pem')
}

var app = https.createServer(options, function(req, res){
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('HTTPS:Hello World!\n');


}).listen(3000, '0.0.0.0');
