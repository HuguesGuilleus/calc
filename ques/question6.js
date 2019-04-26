#!/usr/bin/nodejs
// GUILLEUS Hugues CPI2 <hugues.guilleus@ens.uvsq.fr>

const q3 = require("./ques/question3.js");

if (require.main === module) {
	console.log("résultat =", calcExpr( process.argv.slice(2) ) );
} else {
	module.exports = {
		calcExpr:calcExpr,
	}
}

/**
	@arg args {[]String|Number} Liste des opérandes
	@return res {Number} résultat du calcule (pas de priorité des opérateurs)
*/
function calcExpr(args) {
	var res = args[0];
	for (let i=1; i<args.length; i+=2) {
		res = q3.calc(res, args[i], args[i+1]);
	}
	return res;
}
