#!/usr/bin/nodejs
// GUILLEUS Hugues CPI2 <hugues.guilleus@ens.uvsq.fr>

const q2 = require("./ques/question2.js");

if (require.main === module) {
	let test = testSyntaxe( process.argv.slice(2), true ) ;
	if (test.pb) {
		console.log(test.type);
		console.error(test.err);
		process.exit(1);
	} else {
		console.log(test.type);
	}
} else {
	module.exports = {
		testSyntaxe:testSyntaxe,
	};
}


/**
	@param arg {[]String} liste des opérandes
	@return {Object}
		pb{Boolean}: Y-a-til eu un problème,
		type{String}: Les types
		err {String}: L'erreur
*/
function testSyntaxe(arg) {
	try {
		var typeOut = "";
		var erreur="";
		var pb = false;
		if ( arg.length === 0 ) {
			throw "err aucun arg";
		}
		var type = q2.typeAll(arg);
		for (let t of type) {
			typeOut += t + "\n";
		}
		// on retire le dernier caractère qui est un retour à la ligne
		typeOut = typeOut.slice(0,typeOut.length-1)
		// on teste
		alternance(type);
		prem_dern(type);
	} catch (err) {
		pb = true ;
		switch (err) {
			case "err aucun arg":
				erreur = "** pas d'argument **" ;
				break;
			case "err alt":
				erreur = "** erreur alternance ! **" ;
				break;
			case "err para":
				erreur = "** erreur parenthèse ! **" ;
				break;
			case "err prem":
				erreur = "** erreur opérateur en premier **" ;
				break;
			case "err dern":
				erreur = "** erreur opérateur en dernier **" ;
				break;
			default:
				console.error(err,typeOut);
				process.exit(2);
		}
	} finally {
		return {
			pb:pb,
			type:typeOut,
			err:erreur,
		};
	}
}


/**
	@prama arg {[]String} La liste des types des arguments
	Vérification du premier et du dernier éléments
*/
function prem_dern(arg){
	switch(arg[0]){
		case 'mult':
		case 'div':
			throw "err prem";
	}
	switch (arg[arg.length-1]) {
		case "somme":
		case "sous":
		case "mult":
		case "div":
			throw "err dern";
	}
}


/**
	@prama arg {[]String} La liste des types des arguments
	Vérification de l'alternance entre les opérandes et des parnethèses
*/
function alternance(arg){
	let para = 0;
	let before = null;
	for (let e of arg ) {
		switch(e){
			case "para ouvrante":
				para++;
				break;
			case "para fermante":
				para--;
				if(para<0)
					throw "err para";
				if(before==="para ouvrante" || before==="somme" || before==="sous" || before==="mult" || before==="div")
					throw "err alt";
				break;
			case "somme":
			case "sous":
				if(before === "somme" || before === "sous" || before === "mult" || before === "div")
					throw "err alt";
				break;
			case "mult":
			case "div":
				if(before==="para ouvrante" || before==="somme" || before==="sous" || before==="mult" || before==="div" )
					throw "err alt";
				break;
			case "entier":
				if(before === "entier")
					throw "err alt";
				break;
			}
			before = e ;
	}
	if(para>0)
		throw "err para"
}
