#!/usr/bin/nodejs
// GUILLEUS Hugues CPI2 <hugues.guilleus@ens.uvsq.fr>

var cp = require('child_process');

try{
	if(process.argv.length===2)
		throw "err aucun arg";
	// on prépare les arguments, on lance Q2, on affiche stdout
	let arg = [];
	for(let i=2;i<process.argv.length;i++)
		arg.push(process.argv[i]);
	let stdout = cp.execFileSync("ques/question2.js", arg).toString();
	stdout = stdout.substring(0,stdout.length-1);
	console.log(stdout);

	alternance(stdout);
	prem_dern(stdout);
}catch(err){
	switch (err) {
		case "err aucun arg":
			console.log("** pas d'argument **");
			process.exit(1);
		case "err para":
			console.log("** erreur de parenthèses ! **");
			process.exit(1);
		case "err Alt":
			console.log("** erreur alternance ! **");
			process.exit(1);
		case "err prem":
			console.log("** erreur opérateur en premier **");
			process.exit(1);
		case "err dernier":
			console.log("** erreur opérateur en dernier **");
			process.exit(1);
		default:
			console.error(err);
	}
}

// vérification de l'alternance et des parnethèses
function alternance(stdout){
	let para = 0;
	let before = null;
	for (let e of stdout.split('\n') ) {
		switch(e){
			case "para ouvrante":
				para++;
				break;
			case "para fermante":
				para--;
				if(para<0)
					throw "err para";
				if(before==="para ouvrante" || before==="somme" || before==="sous" || before==="mult" || before==="div")
					throw "err Alt";
				break;
			case "somme":
			case "sous":
				if(before === "somme" || before === "sous" || before === "mult" || before === "div")
					throw "err Alt";
				break;
			case "mult":
			case "div":
				if(before==="para ouvrante" || before==="somme" || before==="sous" || before==="mult" || before==="div" )
					throw "err Alt";
				break;
			case "entier":
				if(before === "entier")
					throw "err Alt";
				break;
			}
			before = e ;
	}
}

/// Vérification du premier et du dernier éléments
function prem_dern(stdout){
	switch(stdout.split('\n')[0]){
		case 'mult':
		case 'div':
			throw "err prem";
			break;
	}
	switch (stdout.split('\n').pop()) {
		case "somme":
		case "sous":
		case "mult":
		case "div":
			throw "err dernier";
			break;
	}
}
