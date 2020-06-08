var fs = require('fs');

var filename = process.argv.slice(2)[0] || "default";
var mode = process.argv.slice(2)[1] || "default";
var parameter = process.argv.slice(4) || [];

console.log(parameter)

class makeClass {
	constructor(filename,mode){
		this.path = "..\\src\\js\\library\\"+filename+"Class.js"
		this.stylepath = "..\\src\\css\\"+filename+".css"
		this.code_list = [];
		this.style_list = [];
		switch(mode){
			case "server":
				this.MakeServerLib(filename);
				this.path = "..\\src\\js\\library\\"+filename+"Class.js"
				break;
			case "router":
				this.MakeServerRouter(filename);
				this.path = "..\\Router\\"+filename+".js"
				break;
			case "client":
				this.MakeClientStyle(filename);
				this.MakeClientLib(filename);
				this.path = "..\\src\\js\\ReactLibrary\\"+filename+".js"
				break;
			case "styleAnimation":
				this.path = "..\\src\\AnimationStyle\\"+filename+".css"
				this.initStylekeyframes();
				this.setClassStyle(filename)
				this.setkeyframes(filename)
				break;
			default:
		}
	}
	
	initStylekeyframes(){
		var valuelist = parameter[1].split(",");
		var len = valuelist.length
		
		switch(parameter[0]){
			case "width":
				for(var j = 0 ;j < len; j++) {
					this.style_list.push("width:"+valuelist[j]+";")
				}
				break;
			case "height":
				for(var j = 0 ;j < len; j++) {
					this.style_list.push("height:"+valuelist[j]+";")
				}
				break;
			case "background":
				for(var j = 0 ;j < len; j++) {
					this.style_list.push("background:"+valuelist[j]+";")
				}
				break;
			default:
		}
	}
	
	setClassStyle(name){
		this.code_list.push("."+name+"{");
		this.code_list.push("	animation:"+name+"keyframes 5s;");
		this.code_list.push("	-moz-animation:"+name+"keyframes 5s;");
		this.code_list.push("	-webkit-animation:"+name+"keyframes 5s;");
		this.code_list.push("	-o-animation:"+name+"keyframes 5s;");
		this.code_list.push("}");
		this.code_list.push("");
	}
	
	processStyle(){
		var result = [];
		var step = (1/this.style_list.length).toFixed(2)
		var len = this.style_list.length
		for(var j = 0 ;j < len; j++) {
			if(len-1 != j){
				result.push("	"+(j*step*100)+"%{");
				result.push("		"+this.style_list[j]);
				result.push("	}");
				result.push("");
			}else{
				result.push("	100%{");
				result.push("		"+this.style_list[j]);
				result.push("	}");
				result.push("");
			}
		}
		return result.join("\n");
	}
	
	setkeyframes(name){
		this.code_list.push("@keyframes "+name+"keyframes{");
		this.code_list.push(this.processStyle());
		this.code_list.push("}");
		this.code_list.push("");
		this.code_list.push("@-moz-keyframes "+name+"{");
		this.code_list.push(this.processStyle());
		this.code_list.push("}");
		this.code_list.push("");
		this.code_list.push("@-webkit-keyframes "+name+"{");
		this.code_list.push(this.processStyle());
		this.code_list.push("}");
		this.code_list.push("");
		this.code_list.push("@-o-keyframes "+name+"{");
		this.code_list.push(this.processStyle());
		this.code_list.push("}");
		this.code_list.push("");
	}
	MakeServerLib(filename){

		this.code_list.push("'use strict';");
		this.code_list.push("");
		this.code_list.push("var FilepathClass = require('./FilepathClass');");
		this.code_list.push("var CryptoUtilClass = require('./CryptoUtilClass');");
		this.code_list.push("");
		this.code_list.push("class "+filename+"Class extends FilepathClass {");
		this.code_list.push("	constructor() {");
		this.code_list.push("		super();");
		this.code_list.push("		\/\/ console.log(\""+filename+"Class is loading...\")");
		this.code_list.push("		this.aaa = \"\";");
		this.code_list.push("		this.bbb = \"\";");
		this.code_list.push("		this.ccc = \"\";");
		this.code_list.push("	}");
		this.code_list.push("");
		this.code_list.push("	methodaaa() {");
		this.code_list.push("		this.aaa = \"\";");
		this.code_list.push("		this.bbb = \"\";");
		this.code_list.push("		this.ccc = \"\";");
		this.code_list.push("	}");
		this.code_list.push("");
		this.code_list.push("	methodbbb() {");
		this.code_list.push("		this.aaa = \"\";");
		this.code_list.push("		this.bbb = \"\";");
		this.code_list.push("		this.ccc = \"\";");
		this.code_list.push("	}");
		this.code_list.push("}");
		this.code_list.push("");
		this.code_list.push("module.exports = "+filename+"Class;");
		this.code_list.push("\/\/ example code:");
		this.code_list.push("\/*");
		this.code_list.push("");
		this.code_list.push("var "+filename+"Class = require('../src/js/library/"+filename+"Class');");
		this.code_list.push("var "+filename+" = new "+filename+"Class();");
		this.code_list.push("");
		this.code_list.push("*\/");

	}
	MakeServerRouter(filename){
		
		this.code_list.push("'use strict';");
		this.code_list.push("var express = require('express');");
		this.code_list.push("var router = express.Router();");
		this.code_list.push("var path = require('path');");
		this.code_list.push("");
		this.code_list.push("router.all('/', (req, res) => {");
		this.code_list.push("	res.json({\"pagename\":\""+filename+"\",\"method\":\"all\"});");
		this.code_list.push("});");
		this.code_list.push("");
		this.code_list.push("router.post('/post', (req, res) => {");
		this.code_list.push("	res.json({\"pagename\":\""+filename+"\",\"method\":\"post\"});");
		this.code_list.push("});");
		this.code_list.push("");
		this.code_list.push("router.get('/get', (req, res) => {");
		this.code_list.push("	res.json({\"pagename\":\""+filename+"\",\"method\":\"get\"});");
		this.code_list.push("});");
		this.code_list.push("");
		this.code_list.push("module.exports = router;");
		this.code_list.push("\/\/ example code:");
		this.code_list.push("\/*");
		this.code_list.push("");
		this.code_list.push("var "+filename+" = require('./Router/"+filename+"');");
		this.code_list.push("app.use('/"+filename+"',"+filename+");");
		this.code_list.push("");
		this.code_list.push("*\/");
		
	}
	MakeClientStyle(filename){
		this.style_list.push("."+filename+"{");
		this.style_list.push("}");
	}
	MakeClientLib(filename){

		this.code_list.push("import React, { Component } from 'react';");
		this.code_list.push("import ReactDOM from 'react-dom';");
		this.code_list.push("// import '../../css/"+filename+".css';");
		this.code_list.push("// import $ from \"jquery\";");
		this.code_list.push("// import * as d3 from \"d3\";");
		this.code_list.push("");
		this.code_list.push("class "+filename+" extends Component{");
		this.code_list.push("	constructor(props) {");
		this.code_list.push("		super(props);");
		this.code_list.push("		this.state = {};");
		this.code_list.push("	}");
		this.code_list.push("	componentDidMount() {");
		this.code_list.push("		// console.log(\"componentDidMount\")");
		this.code_list.push("	}");
		this.code_list.push("	componentWillUnmount() {");
		this.code_list.push("		// console.log(\"componentWillUnmount\")");
		this.code_list.push("	}");
		this.code_list.push("	componentDidUpdate() {");
		this.code_list.push("		// console.log(\"componentDidUpdate\")");
		this.code_list.push("	}");
		this.code_list.push("	render(){");
		this.code_list.push("		var that = this;");
		this.code_list.push("		return (");
		this.code_list.push("			<div className=\""+filename+"\"></div>");
		this.code_list.push("		);");
		this.code_list.push("	}");
		this.code_list.push("}");
		this.code_list.push("");
		this.code_list.push("");
		this.code_list.push("");
		this.code_list.push("");
		this.code_list.push("");
		this.code_list.push("export default "+filename+";");
		this.code_list.push("\/\/ example code:");
		this.code_list.push("\/*");
		this.code_list.push("");
		this.code_list.push("import "+filename+" from './ReactLibrary/"+filename+"';");
		this.code_list.push("<"+filename+" />");
		this.code_list.push("");
		this.code_list.push("*\/");

	}
	
}


var make = new makeClass(filename,mode);


switch(mode){
	case "server":
		break;
	case "client":
		fs.open(make.stylepath,"w",0777,function(e,fd){
			if(e) throw e;
			fs.write(fd,make.style_list.join("\n"),0,'utf8',function(e){
				if(e) throw e;
				fs.closeSync(fd);
			})
		});
		break;
	default:
}

fs.open(make.path,"w",0777,function(e,fd){
	if(e) throw e;
	fs.write(fd,make.code_list.join("\n"),0,'utf8',function(e){
		if(e) throw e;
		fs.closeSync(fd);
	})
});