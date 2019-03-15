#!/usr/bin/nodejs
// GUILLEUS Hugues CPI2 <hugues.guilleus@ens.uvsq.fr>

var cp = require('child_process');

try {
	if(process.argv===2)
		throw "pas d'arg";

	// on envoie les arguments vers Q2 pour analyse
	let arg = [];
	for(let i=2;i<process.argv.length;i++)
		arg.push(process.argv[i]);
	let stdout = cp.execFileSync("ques/question2.js", arg).toString();
	stdout = stdout.substring(0,stdout.length-1);
	console.log(stdout);

	alternance(stdout);
	debut_fin(stdout);
} catch (err) {
	switch (err) {
		case "err alt":
			console.log("** erreur d'alternance ! **");
			process.exit(1);
		case "pas d'arg":
			console.log("** erreur pas d'argument ! **");
			process.exit(1);
		case "err prem":
			console.log("** erreur opérateur en premier ! **");
			process.exit(1);
		case "err dern":
			console.log("** erreur opérateur en dernier ! **");
			process.exit(1);
		default:
			console.error(err);
			process.exit(2);
	}
}

function alternance(stdout){
	let before = null;
	for(let e of stdout.split('\n')){
		switch (e) {
			case "entier":
				if(before === "entier")
					throw "err alt";
				break;
			case "sous":
			case "somme":
			case "mult":
			case "div":
				if(before!=="entier" && before )
					throw "err alt";
				break;
		}
		before = e;
	}
}

function debut_fin(stdout){
	switch(stdout.split('\n')[0]){
		case "mult":
		case "div":
			throw "err prem";
	}
	switch (stdout.split('\n').pop()) {
		case "somme":
		case "sous":
		case "mult":
		case "div":
			throw "err dern";
	}
}
