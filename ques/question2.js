#!/usr/bin/nodejs
// GUILLEUS Hugues CPI2 <hugues.guilleus@ens.uvsq.fr>

if ( require.main === module ) {
	// la méthode slice sert à récupérer que les arguments utiles
	// t coorespond au type de chaque argument
	for (let t of typeAll(process.argv.slice(2)) ) {
		console.log(t);
	}
} else {
	module.exports = {
		type:type,
		typeAll:typeAll,
	}
};

/**
	@arg e {String} L'Élément dont on veut déterminer le type
	@return {String} le type de l'élément donné
*/
function type(e){
	switch (e) {
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
			if( /[+-?\d+]/.test(e))
				return "entier";
			else
				return "argument inconnu";
	}
}

/**
	@arg tab {[]String} les paramètres qui serons analysés
	@return ret {[]String} la liste des types pour chaque paramètres
*/
function typeAll(tab) {
	var ret=[];
	for (let e of tab) {
		ret.push(type(e))
	}
	return ret;
}
