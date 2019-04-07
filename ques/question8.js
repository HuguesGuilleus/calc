#!/usr/bin/nodejs
// GUILLEUS Hugues CPI2 <hugues.guilleus@ens.uvsq.fr>

const q2 = require("./ques/question2.js");
const calcExprPrio = require("./ques/question6+.js").calcExprPrio;


if (require.main === module) {
	console.log(calcExprPara(process.argv.slice(2)));
} else {
	module.exports = {
		calcExprPara:calcExprPara,
	};
}


/**
	@rag argBrute {[]String} l'expression à préparer
	@return {Number} Le résultat
*/
function calcExprPara(argBrute) {
	var arg = [];
	var paramax = 0;

	let paran = 0;
	let tbefore = null;
	for (let e of argBrute) {
		// ajoute si besoin des "x" avant ou après des parenthèses
		let type = q2.type(e);
		if (type==="para ouvrante" &&
			(tbefore==="entier" || tbefore==="para fermante")) {
				arg.push("x",e);
		} else if (tbefore==="para fermante" && type==="entier") {
			arg.push("x",e);
		} else {
			arg.push(e);
		}
		tbefore=type;

		// mesure le niveau maximale de parenthèses
		switch (type) {
			case "para ouvrante":
				paran++;
				if(paran>paramax)
					paramax=paran;
				break;
			case "para fermante":
				paran--;
		}
	}

	// on calcule à chaque fois ce qu'il y a dans le niveau maximale de parnenthèses
	for (; paramax >= 0; paramax--) {
		let para=0;
		let calcule=false; // indique s'il faut calculer ou attendre le bon niveau de parnethèses
		let subArg=[]; // l'expression dans la parnthèse calculé
		let newArg=[];
		for (let e of arg) {
			if (q2.type(e)==="para fermante") {
				para--;
				if (calcule) {
					newArg.push( calcExprPrio(subArg) );
					calcule=false;
				} else {
					newArg.push(")");
				}
			} else if (calcule) {
				subArg.push(e);
			} else if (q2.type(e)==="para ouvrante") {
				para++;
				if (para===paramax) {
					calcule=true;
					subArg=[];
				} else {
					newArg.push("(");
				}
			} else {
				newArg.push(e);
			}
		}
		arg=newArg;
	}
	return calcExprPrio(arg);
}
