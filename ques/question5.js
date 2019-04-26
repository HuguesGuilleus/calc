#!/usr/bin/nodejs
// GUILLEUS Hugues CPI2 <hugues.guilleus@ens.uvsq.fr>

const q2 = require("./ques/question2.js");

if (require.main === module) {
	let test = testSyntaxe( process.argv.slice(2), true ) ;
	// console.log(test);
	if (test.pb) {
		console.log(test.out);
		console.error(test.err);
		process.exit(1);
	} else {
		console.log(test.out);
	}
} else {
	module.exports = {
		testSyntaxe:testSyntaxe,
	};
}


/**
	@param arg {[]String} liste des opérandes
	@ret {Object}
		pb{Boolean}: Y-a-til eu un problème,
		out{String}: Les types
		err {String}: L'erreur
*/
function testSyntaxe(arg) {
	try {
		var out = "";
		var erreur="";
		var probleme = false;
		if (arg.length===0) {
			throw "err aucun arg";
		}
		var type = q2.typeAll(arg);
		// on affiche tout les type
		for (var i = 0; i < type.length-1; i++) {
			out += type[i]+"\n" ;
		}
		out += type[type.length-1] ;
		// on teste
		alternance(type);
		prem_dern(type);
	} catch (err) {
		probleme = true ;
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
				console.error(err,out);
				process.exit(2);
		}
	} finally {
		return {
			pb:probleme,
			out:out,
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
			break;
	}
	switch (arg[arg.length-1]) {
		case "somme":
		case "sous":
		case "mult":
		case "div":
			throw "err dern";
			break;
	}
}


/**
	@prama arg {[]String} La liste des types des arguments
	vérification de l'alternance entre les opérandes et des parnethèses
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
