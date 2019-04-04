#!/usr/bin/nodejs
// GUILLEUS Hugues CPI2 <hugues.guilleus@ens.uvsq.fr>


if ( require.main === module ) {
	// le programme est un processus seul
	for(let i=2;i<process.argv.length;i++){
		console.log(type(process.argv[i]));
	}
} else {
	// le programme est un module et on exporte la fonction type
	module.exports = {
		type:type,
	}
};

// retourne le type (String) de la chaîne prise en argument
function type(el){
	switch (el) {
		case "\\(":
		case "(":
			return "para ouvrante";
		case "\\)":
		case ")":
			return "para fermante";
		case "+":	return "somme";
		case "-":	return "sous";
		case "x":	return "mult";
		case "/":	return "div";
		default:
			if( /[+-?\d+]/.test(el))
				return "entier";
			else
				return "argument inconnu";
	}
}
