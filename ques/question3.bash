#!/bin/bash
# GUILLEUS Hugues CPI2 <hugues.guilleus@ens.uvsq.fr>

function somme {
	ques/question1.bash $1 $2 | grep 'somme' | sed 's#.*= \(.*\)#\1#'
}

function sous {
	ques/question1.bash $1 $2 | grep 'sous' | sed 's#.*= \(.*\)#\1#'
}

function mult {
	ques/question1.bash $1 $2 | grep 'mult' | sed 's#.*= \(.*\)#\1#'
}

function div {
	ques/question1.bash $1 $2 | grep 'div' | sed 's#.*= \(.*\)#\1#'
}


case $2 in
	'+') somme $1 $3 ;;
	'-') sous  $1 $3 ;;
	'x') mult  $1 $3 ;;
	'/') div   $1 $3 ;;
	*) echo "Opération inconnu" ;;
esac
