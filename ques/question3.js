#!/usr/bin/nodejs
// GUILLEUS Hugues CPI2 <hugues.guilleus@ens.uvsq.fr>

var cp = require('child_process');

/*
console.log(
"./question1.js "+process.argv[2]+" "+process.argv[4]
);
*/

cp.exec("ques/question1.js "+process.argv[2]+" "+process.argv[4], (err,stdout,stderr)=>{
	stdout = stdout.split('\n');
	
	switch(process.argv[3]){
		case '+': var ligne = 0; break;
		case '-': var ligne = 1; break;
		case 'x': var ligne = 2; break;
		case '/': var ligne = 3; break;
		default:
			process.exit(1);
	}
	
	var nb = stdout[ligne].replace(/.*= ([+-]?\d+)/, "$1");
	console.log( nb );
	
	process.exit(0);
});
