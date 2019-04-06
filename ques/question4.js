#!/usr/bin/nodejs
// GUILLEUS Hugues CPI2 <hugues.guilleus@ens.uvsq.fr>

const q2 = require('./ques/question2.js');

if (require.main === module) {
	let arg=[];
	for (let i=2; i < process.argv.length; i++) {
		arg.push(process.argv[i]);
	}
	if(testSyntaxe(arg)){
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

		let argType = q2.typeAll(arg);
		for (let e of argType) {
			console.log(e);
		}
		alternance(argType);
		debut_fin(argType);

		return false;
	} catch (err) {
		switch (err) {
			case "pas d'arg":
				console.log("** pas d'argument **");
				break;
			case "err alt":
				console.log("** erreur d'alternance ! **");
				break;
			case "err prem":
				console.log("** erreur opérateur en premier ! **");
				break;
			case "err dern":
				console.log("** erreur opérateur en dernier ! **");
				break;
			default:
				console.error(err);
				process.exit(2);
		}
		return true;
	}
}


/**
	@param {[]String} La liste des types de chaque paramètres
	Lève un exeption si il y a un problème
*/
function alternance(tab){
	let before = null;
	for(let e of tab){
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
	@param {[]String} La liste des types de chaque paramètres
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
