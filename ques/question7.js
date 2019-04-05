#!/usr/bin/nodejs
// GUILLEUS Hugues CPI2 <hugues.guilleus@ens.uvsq.fr>
// hugo

var cp = require('child_process');

try {
	var int_global=[];
	var mode_para = false;
	for (let i=2;i<process.argv.length;i++) {
		let type = cp.execFileSync("ques/question2.js", [process.argv[i]] ).toString().replace(/\n$/,"");

		if (type == "para ouvrante") {
			mode_para=true;
			var int_para=[];
		} else if (type == "para fermante") {
			mode_para=false;
			int_global.push( cp.execFileSync("ques/question6.js", int_para).toString()
				.replace(/résultat = ([+-]?\d+)\n/, "$1") );
		} else if (mode_para) {
			int_para.push(process.argv[i])
		} else {
			int_global.push(process.argv[i])
		}
	}
	console.log( cp.execFileSync("ques/question6.js", int_global).toString().replace(/\n$/,"") );
} catch (e) {
	console.error(e);
}
