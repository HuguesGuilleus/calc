#!/bin/bash
# GUILLEUS Hugues CPI2 <hugues.guilleus@ens.uvsq.fr>

# Donne le type des opérandes
function type() {
	for i in `seq 1 $#`
	do
		case ${!i} in
			'+')	echo "somme" ;;
			'-')	echo "sous"  ;;
			'x')	echo "mult"  ;;
			'/')	echo "div"   ;;
			'\(')	echo "para_ouvrante" ;;
			'\)')	echo "para_fermante" ;;
			*)		echo "entier" ;;
		esac
	done
}

if [[ -z $MAIN ]]; then
	type $* | sed 's/_/ /'
fi
