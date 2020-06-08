'use strict'

var os = require('os');
var child_process = require('child_process');

function getProcessInfo(){
	const memUsage = process.memoryUsage();//memory
	const cpuUsage = process.cpuUsage();//cpu
	const cfg = process.config;//config
	const env = process.env;//用户环境
	const pwd = process.cwd();//工作目录
	const execPath = process.execPath;//node.exe目录
	const pf = process.platform;//运行nodejs的操作系统平台
	const release = process.release;//nodejs发行版本
	const pid = process.pid;//nodejs进程号
	const arch = process.arch;//运行nodejs的操作系统架构
	const uptime = process.uptime();//nodejs进程运行时间
	return {
		memUsage,cpuUsage,cfg,env,pwd,execPath,pf,release,pid,arch,uptime
	}
}


var portcount = process.argv.slice(2)[0] || 80;
var portsslcount = process.argv.slice(2)[1] || 443;
var portdevcount = process.argv.slice(2)[2] || 9230;

var processList = [];

processList.push({
	port:portcount,
	portssl:portsslcount,
	portdev:portdevcount,
	file:"app.js",
	workerHandle:null,
	model:"cellmaster",
	clients:0
});
portcount++;
portsslcount++;
portdevcount++;

console.log("this machine has ",os.cpus().length," processor")

function spawn(point) {
	processList[point].workerHandle = child_process.spawn(
		'node',
		[
			"--inspect="+processList[point].portdev,
			processList[point].file,
			processList[point].port,
			processList[point].portssl
		]
	)
	console.log(processList[point].file,
		"http on port",
		processList[point].port,
		"https on port",
		processList[point].portssl,
		"dev port ",
		processList[point].portdev)

	processList[point].workerHandle.stdout.on('data', (data) => {
		console.log(new Buffer(data).toString('utf-8'));
	});

	processList[point].workerHandle.stderr.on('data', (data) => {
		console.log(new Buffer(data).toString('utf-8'));
	});

	processList[point].workerHandle.on('exit', function (code) {
		if (code !== 0) {
			spawn(point);
		}
	});
}



spawn(0);