#!/usr/bin/nodejs
// GUILLEUS Hugues CPI2 <hugues.guilleus@ens.uvsq.fr>

const q2 = require("./ques/question2.js");
const q3 = require("./ques/question3.js");
const q6 = require("./ques/question6.js");

if (require.main === module) {
	console.log( calcExprPrio(process.argv.slice(2)) );
} else {
	module.exports = {
		calcExprPrio:calcExprPrio,
	};
}

/**
	@argument args {[]String} legal La liste des opérandes
	@return res {Number} résultat du calcule (priorité des opérateurs)
*/
function calcExprPrio(arg){
	// Si le premier élément est un plus ou un moins
	switch (q2.type(arg[0])) {
		case "somme":
			arg.shift();
			break;
		case "sous":
			arg.splice(0,1,"-1","x");
			break;
	}

	// nous séléctionnons les groupes de multiplication et de duivision
	var termes = []; // somme et soustraction
	var facteurs = [arg[0]]; // multiplication et division
	for(let i=1; i<arg.length; i+=2){
		switch (q2.type(arg[i])) {
			case "mult":
			case "div":
				facteurs.push(arg[i], arg[i+1]);
				break;
			default:
				termes.push( q6.calcExpr(facteurs), arg[i] )
				facteurs = [arg[i+1]];
		}
	}
	termes.push(q6.calcExpr(facteurs));
	// on calcule les sommes et les soustractions
	return q6.calcExpr(termes);
}
