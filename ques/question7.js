#!/usr/bin/nodejs
// GUILLEUS Hugues CPI2 <hugues.guilleus@ens.uvsq.fr>
// HENROTTE Hugo CPI2 <henrotte.hugo@gmail.com>

const q2 = require("./ques/question2.js") ;
const calcExpr = require("./ques/question6.js").calcExpr ;

if (require.main === module) {
	console.log("résultat =", calcExpr1Para(process.argv.slice(2)) );
} else {
	module.exports = {
		calcExpr1Para:calcExpr1Para,
	};
}

/**
	@arg arg {[]String} une exprésion avec un seul niveau de parenthèses
	@return {Number} le résultat (pas de priorité des opérateurs)
*/
function calcExpr1Para(arg) {
	var int_global=[];
	var mode_para=false;
	for (let e of arg) {
		let type = q2.type(e);
		if (type === "para ouvrante") {
			mode_para=true;
			var int_para=[];
		} else if (type === "para fermante") {
			mode_para=false;
			int_global.push( calcExpr(int_para) );
		} else if (mode_para) {
			int_para.push(e)
		} else {
			int_global.push(e)
		}
	}
	return calcExpr(int_global);
}
