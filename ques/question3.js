#!/usr/bin/nodejs
// GUILLEUS Hugues CPI2 <hugues.guilleus@ens.uvsq.fr>

var cp = require('child_process');
var q1 = require('./ques/question1.js');


var a = JSON.parse(process.argv[2]);
var b = JSON.parse(process.argv[4]);
var resultat ;
switch(process.argv[3]){
	case "+":
		resultat = q1.somme(a,b);
		break;
	case "-":
		resultat = q1.sous(a,b);
		break;
	case "x":
		resultat = q1.mult(a,b);
		break;
	case "/":
		resultat = q1.div(a,b);
		break;
	default:
		console.error("Q3: Argument 3 est operateur inconnu");
		process.exit(1);
}
console.log(resultat);
