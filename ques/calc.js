#!/usr/bin/nodejs

const q5 = require("./ques/question5.js");
const q8 = require("./ques/question8.js");

const arg = process.argv;
arg.splice(0,2);

if (q5.testSyntaxe(arg,false))
{
	console.log("Erreur de syntaxe:");
	process.exit(1);
}

console.log(q8.calcExprPara(arg));