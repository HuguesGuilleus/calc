#!/usr/bin/nodejs
// GUILLEUS Hugues CPI2 <hugues.guilleus@ens.uvsq.fr>

const q2 = require("./ques/question2.js");
const q3 = require("./ques/question3.js");

if (require.main === module) {
	console.log( calcExprPrio(process.argv.slice(2)) );
} else {
	module.exports = {
		calcExpr:calcExprPrio,
	};
}


/**
	@argument args {[]String}
	@ret res {Number} résultat du calcule (priorité des opérateurs)
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

	var termes = []; // somme et soustraction
	var facteurs = [arg[0]]; // multiplication et division
	for(let i=1; i<arg.length; i+=2){
		switch (q2.type(arg[i])) {
			case "mult":
			case "div":
				facteurs.push(arg[i], arg[i+1]);
				break;
			default:
				termes.push( calcExprSimple(facteurs), arg[i] )
				facteurs = [arg[i+1]];
		}
	}
	termes.push(calcExprSimple(facteurs));
	return calcExprSimple(termes);
}


/**
	@argument args {[]String}
	@ret res {Number} résultat du calcule (pas de priorité des opérateurs)
*/
function calcExprSimple(arg) {
	resultat = arg[0];
	for(let i=1; i<arg.length; i+=2){
		resultat = q3.calc(resultat,arg[i],arg[i+1]);
	}
	return resultat;
}
