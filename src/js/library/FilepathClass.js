'use strict';

var fs = require('fs');
var BaseClass = require('./BaseClass');

class FilepathClass extends BaseClass {
	constructor() {
		super();
		// console.log("FilepathClass is loading...")
		this.root = "";
		this.library = "library";
		this.blockchain = "blockchain";
		this.key = "key";
		this.config = "config";
		this.cache = "cache";
	}

	writeBlockchain(username,chain){
		fs.writeFile(this.root+this.blockchain+"/"+username+".json", JSON.stringify(chain), (err) => {
			if (err) throw err;
		});
	}
	readBlockchain(username){
		return JSON.parse(fs.readFileSync(this.root+this.blockchain+"/"+username+".json").toString("utf-8"));
	}

	writekey(keyname,keydata){
		fs.writeFile(this.root+this.key+"/"+keyname, keydata, (err) => {
			if (err) throw err;
		});
	}
	readkey(keyname,full){
		if(full){
			return fs.readFileSync(this.root+this.key+"/"+keyname).toString("utf-8");
		}
		else{
			var ttt = fs.readFileSync(this.root+this.key+"/"+keyname).toString("utf-8").split("\n");
			ttt.shift();
			ttt.pop();
			return ttt.join("");
		}
	}

	writeconfig(filename,configData){
		fs.writeFile(this.root+this.config+"/"+filename+".json", JSON.stringify(configData), (err) => {
			if (err) throw err;
		});
	}
	readconfig(filename){
		return JSON.parse(fs.readFileSync(this.root+this.config+"/"+filename+".json").toString("utf-8"));
	}
}

module.exports = FilepathClass;
// example code:
/*

var FilepathClass = require('../library/FilepathClass');
var Filepath = new FilepathClass();

*/