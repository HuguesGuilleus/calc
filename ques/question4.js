#!/usr/bin/nodejs
// GUILLEUS Hugues CPI2 <hugues.guilleus@ens.uvsq.fr>

const q2 = require('./ques/question2.js');

if (require.main === module) {
	if(testSyntaxe( process.argv.slice(2) )){
		process.exit(1);
	}
} else {
	module.exports = {
		testSyntaxe:testSyntaxe,
	}
}


/**
	@param arg {[]String} liste des opérandes
	@ret {Boolean} false:OK, true:erreur
*/
function testSyntaxe(arg) {
	try {
		if (arg.length===0) {
			throw "pas d'arg"
		}

		// on trouve les types
		let argType = q2.typeAll(arg);
		for (let e of argType) {
			console.log(e);
		}
		// on teste
		alternance(argType);
		debut_fin(argType);

		return false;
	} catch (err) {
		switch (err) {
			case "pas d'arg":
				console.error("** pas d'argument **");
				break;
			case "err alt":
				console.error("** erreur d'alternance ! **");
				break;
			case "err prem":
				console.error("** erreur opérateur en premier ! **");
				break;
			case "err dern":
				console.error("** erreur opérateur en dernier ! **");
				break;
			default:
				console.error(err);
		}
		return true;
	}
}


/**
	@arg argType {[]String} La liste des types de chaque paramètres
	Lève un exeption si il y a un problème
*/
function alternance(argType){
	let before = null;
	for(let e of argType){
		switch (e) {
			case "entier":
				if(before === "entier")
					throw "err alt";
				break;
			case "sous":
			case "somme":
			case "mult":
			case "div":
				if( before!=="entier" && before )
					throw "err alt";
				break;
		}
		before = e;
	}
}

/**
	@arg argType {[]String} La liste des types de chaque paramètres
	Lève un exeption si il y a un problème par rapport au premier ou au dernier éléments
*/
function debut_fin(argType){
	switch(argType[0]){
		case "mult":
		case "div":
			throw "err prem";
	}
	switch (argType[argType.length-1]) {
		case "somme":
		case "sous":
		case "mult":
		case "div":
			throw "err dern";
	}
}
