#!/bin/bash
# HENROTTE Hugo CPI <henrotte.hugo@gmail.com>

MAIN="q7"
source ques/question2.bash
source ques/question6.bash

int_para="" # Les opérandes présents dans une parenthèse
int_global="" # Les opérandes sans les parenthèses
mode_para=false # Sommes-nous dans une parenthèse?
for i in $*
do
	type=`type $i`
	if [[ $type == "para_ouvrante" ]]; then
		mode_para=true
		int_para=""
	elif [[ $type == "para_fermante" ]]; then
		mode_para=false
		int_global="$int_global `calcExpr $int_para`"
	elif ( $mode_para ); then
	 	int_para="$int_para $i"
	else
		int_global="$int_global $i"
	fi
done

printf "résultat = "
calcExpr $int_global
