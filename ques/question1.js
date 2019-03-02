#!/usr/bin/nodejs
// GUILLEUS Hugues CPI2 <hugues.guilleus@ens.uvsq.fr>

try{
	
	var a = Math.floor( JSON.parse(process.argv[2]) );
	var b = Math.floor( JSON.parse(process.argv[3]) );
	
	console.log("somme",a,b,"=", a+b);
	console.log("sous", a,b,"=", a-b);
	console.log("mult", a,b,"=", a*b);
	
	let div = Math.floor(a/b) ;
	if(div<0)
		div++;
	console.log("div",  a,b,"=", div );
	
}catch(err){
	console.error("Erreur lors de l'analyse des arguments");
	process.exit(1);
}
process.exit(0);