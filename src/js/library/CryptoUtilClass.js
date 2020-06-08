'use strict';

var crypto = require('crypto');
var NodeRSA = require('node-rsa');
var FilepathClass = require('./FilepathClass');

/*
密码学工具类。
*/

class CryptoUtilClass extends FilepathClass {
	constructor() {
		super();
		// console.log("CryptoUtilClass is loading...")
		this.publicDer = "";
		this.privateDer = "";
	}

	/*
	根据公钥(public key)推算出账户地址，使用以太坊的算法，先KECCAK-256计算哈希值(32位)，取后20位作为账户地址。
	比特币地址算法：http://www.infoq.com/cn/articles/bitcoin-and-block-chain-part03
	以太坊地址算法：http://ethereum.stackexchange.com/questions/3542/how-are-ethereum-addresses-generated
	*/
	SHA256(data){
		var sha256 = crypto.createHash('sha256');
		sha256.update(data);
		return sha256.digest('hex');
	}

	/*
	生成公私钥对，使用以太坊的ECDSA算法(secp256k1)。
	*/
	generateKeyPair(username){
		var key = new NodeRSA({b: 512}); //生成新的512位长度密钥
		var publicDer = key.exportKey('public');
		var privateDer = key.exportKey('private');

		this.writekey(username+".publickey.txt",publicDer)
		this.writekey(username+".privatekey.txt",privateDer)
		
		publicDer = publicDer.split("\n");
		publicDer.shift()
		publicDer.pop()
		this.publicDer = publicDer.join("");

		privateDer = privateDer.split("\n");
		privateDer.shift();
		privateDer.pop();
		this.privateDer = privateDer.join("");
	}

	/*
	发送方用私钥对交易Transaction进行签名。
	*/
	sign(data, privateKey){
		var key = new NodeRSA(privateKey); //利用私钥创建NodeRSA对象。
		
		var encryptPassword = key.encryptPrivate(data,'base64');  //用base64,因为解密只支持base64和buffer

		// encryptPassword = encryptPassword.replace(/\+/g,"~"); //base64里面有 + / = 不利于ajax数据传输，替换掉
		// encryptPassword = encryptPassword.replace(/\//g,',');
		// encryptPassword = encryptPassword.replace(/=/g,'$');

		return encryptPassword;

	}

	/*
	验证交易Transaction签名的有效性。
	*/
	verifySignature(publicKey,signature,data){

		var key = new NodeRSA(publicKey); //利用公钥创建NodeRSA对象。
		// signature = signature.replace(/~/g,"+"); //signature是传输的加密数据，先把传递过来的数据还原
		// signature = signature.replace(/,/g,"/");
		// signature = signature.replace(/$/g,"=");
		var decryptedPassword = key.decryptPublic(signature,'utf8');
		console.log(decryptedPassword)
		if (data === decryptedPassword){
			return true;
		}else{
			return false;
		}
	}

}

module.exports = CryptoUtilClass;
// example code:
/*

var CryptoUtilClass = require('../library/CryptoUtilClass');
var CryptoUtil = new CryptoUtilClass();

*/