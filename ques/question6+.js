#!/usr/bin/nodejs
// GUILLEUS Hugues CPI2 <hugues.guilleus@ens.uvsq.fr>

var cp = require('child_process');

try {
	// on copie les arguments utiles passés au programme
	args=process.argv.slice(2);

	// on regarde si le premier argument est une somme ou une soustraction
	switch (cp.execSync("ques/question2.js "+args[0]).toString().replace("\n","")) {
		case "somme":
			args.shift();
			break;
		case "sous":
			args.splice(0,1, "-1", "x");
			break;
	}

	// on sépare les opérations mult et div que l'on calcule
	groupeop=[]; // groupe d'opération somme et sous
	g = [args[0]]; // groupe d'opération mult et div
	for (let i = 1; i < args.length; i+=2) {
		switch (cp.execSync("ques/question2.js "+args[i]).toString().replace("\n","")) {
			case "mult":
			case "div":
				g.push(args[i], args[i+1])
				break;
			case "somme":
			case "sous":
				groupeop.push( calcule(g), args[i]);
				g = [args[i+1]];
				break;
		}
	}

	// on fait le calcule du dernier argument
	groupeop.push( calcule(g));

	// on calule tout et on affiche
	console.log( calcule(groupeop) );
} catch (err) {
	console.error(err);
	process.exit(1)
}


// fonction qui calcule le tableau d'argument: ['5', '+', '5', '/', "4"]
function calcule(tab) {
	var res = tab[0];
	for (let i = 1; i < tab.length; i+=2) {
		// on calcule grâce à la question 3,
		// on récupère stdout que l'on tranforme en chaîne de caractères
		// et on enlève la dernière ligne
		res = cp.execSync("ques/question3.js "+res+" "+tab[i]+" "+tab[i+1])
			.toString().replace("\n","");
	}
	return res;
}
