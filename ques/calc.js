#!/usr/bin/nodejs

const q5 = require("./ques/question5.js");
const q8 = require("./ques/question8.js");

const arg = process.argv;
arg.splice(0,2);

var test = q5.testSyntaxe(arg,false);
if (test.pb)
{
	console.log("Erreur de syntaxe:\n"+test.out);
	process.exit(1);
}

console.log(q8.calcExprPara(arg));