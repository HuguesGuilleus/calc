#!/bin/bash
# HENROTTE Hugo CPI <henrotte.hugo@gmail.com>

if [[ -z $MAIN ]]; then
	MAIN="q6"
fi
source ques/question3.bash

# Calcule de l'expression sans priorité
function calcExpr() {
	res=$1
	for i in `seq 2 2 $#`
	do
		after=$(( i + 1 ))
		res=`calcSimple $res ${!i} ${!after}`
	done
	echo $res
}

if [[ $MAIN == "q6" ]]; then
	# on affiche le résultat
	printf "résultat = "
	calcExpr $*
fi
