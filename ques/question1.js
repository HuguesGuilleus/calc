#!/usr/bin/nodejs
// GUILLEUS Hugues CPI2 <hugues.guilleus@ens.uvsq.fr>

// fonction de calcule, les arguments sont des nombres
function somme(a,b) {
	return a+b;
}

function sous(a,b){
	return a-b;
}

function mult(a,b) {
	return a*b;
}

function div(a,b) {
	return Math.trunc(a/b);
}


// on regarde si le programme est lancé directement ou appelé dans un module
if( /.*question1\.js/.test(process.argv[1]) ){
	try{
		// on récupère les arguments que l'on transforme en entier
		var a = JSON.parse(process.argv[2]);
		var b = JSON.parse(process.argv[3]);

		// on calcule et on affiche les résultats
		console.log("somme",a,b,"=", somme(a,b));
		console.log("sous", a,b,"=", sous(a,b));
		console.log("mult", a,b,"=", mult(a,b));
		console.log("div",  a,b,"=", div(a,b));

	}catch(err){
		console.error("Q1: Error:",err);
		process.exit(1);
	}
} else {
	// on exportation dans un module les fonctions de calcule
	module.exports = {
		somme:somme,
		sous:sous,
		mult:mult,
		div:div,
	}
}
