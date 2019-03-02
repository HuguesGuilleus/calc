#!/usr/bin/nodejs
// GUILLEUS Hugues CPI2 <hugues.guilleus@ens.uvsq.fr>

for(let i=2; i<process.argv.length ;i++){
	switch(process.argv[i]){
		case '\\(': console.log("para ouvrante"); break;
		case '\\)': console.log("para fermante"); break;
		case '+':  console.log("somme"); break;
		case '-':  console.log("sous"); break;
		case 'x':  console.log("mult"); break;
		case '/':  console.log("div"); break;
		default:
			if( /[+-]?\d+/.test(process.argv[i]) )
				console.log("entier");
			else{
				console.error("argument inconnu ::",process.argv[i]);
				process.exit(1);
			}
	}
}
