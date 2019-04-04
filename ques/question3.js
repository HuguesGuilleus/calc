#!/usr/bin/nodejs
// GUILLEUS Hugues CPI2 <hugues.guilleus@ens.uvsq.fr>

const q1 = require("./ques/question1.js");
const q2 = require("./ques/question2.js");

if (require.main === module) {
	console.log(calc( process.argv[2],process.argv[3],process.argv[4] ));
} else {
	module.exports = {
		calc:calc,
	}
}

// renvoie le résultat simple d'un calcule
function calc(a,op,b) {
	// on transforme les chaîne de caractère en nombre
	if(typeof a === "string")
		a = JSON.parse(a);
	if(typeof b === "string")
		b = JSON.parse(b);

	switch( q2.type(op) ){
		case "somme":
			return q1.somme(a,b);
		case "sous":
			return q1.sous(a,b);
		case "mult":
			return q1.mult(a,b);
		case "div":
			return q1.div(a,b);
		default:
			throw "Q3 Operateur inconnu"+op ;
	}
}
