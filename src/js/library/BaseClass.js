class BaseClass {
	constructor() {
		this.version = "v0.02"
		console.log("BaseClass is constructor...")
	}

	GetQueryString(name){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r!=null) return unescape(r[2]); return null;
	}

	trace(text) {
		if (text[text.length - 1] === '\n') {
			text = text.substring(0, text.length - 1);
		}
		if (window.performance) {
			var now = (window.performance.now() / 1000).toFixed(3);
			console.log(now + ': ' + text);
		} else {
			console.log(text);
		}
	}
}

export default BaseClass;