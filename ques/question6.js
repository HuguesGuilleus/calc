#!/usr/bin/nodejs
// GUILLEUS Hugues CPI2 <hugues.guilleus@ens.uvsq.fr>

var cp = require('child_process');

try {
	var res = process.argv[2];
	for (let i = 3; i < process.argv.length; i+=2) {
		// on clclue grâce à la question 3,
		// on récupère stdout que l'on tranforme en chaîne de caractères
		// et on enlève la dernière ligne
		res = cp.execSync("ques/question3.js "+res+" "+process.argv[i]+" "+process.argv[i+1])
			.toString().replace("\n","");
	}
} catch (err) {
	console.error(err);
	process.exit(1);
}

console.log("résultat =", res);
