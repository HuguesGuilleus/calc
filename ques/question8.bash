#!/bin/bash
# GUILLEUS Hugues CPI2 <hugues.guilleus@ens.uvsq.fr>

if [[ -z $MAIN ]]; then
	MAIN="q8"
fi
source ques/question2.bash
source ques/question6+.bash

# Calule d'expression avec des parenthèses et la priorité des opérateurs
function calcExprPara() {
	arg=""
	paran=0
	paramax=0
	for e in $*
	do
		# nous mettons des 'x' aux endrois appropriés
		type=`type $e`
		if [[ $type == "para_ouvrante" && ( $tbefore == "entier" || $tbefore == "para_fermante" ) ]]; then
			arg="$arg x $e"
		elif [[ $tbefore == 'para_fermante' && $type == "entier" ]]; then
			arg="$arg x $e"
		else
			arg="$arg $e"
		fi
		tbefore=$type
		# mesure le niveau maximal de parenthèsage
		case $type in
			"para_ouvrante" )
				(( paran++ ))
				if [[ $paran -ge $paramax ]]; then
					paramax=$paran
				fi
				;;
			"para_fermante" )
				(( paran-- ))
				;;
		esac
	done

	while [[ $paramax -ge 0 ]]; do
		para=0 # le niveau actuel de parenthèse
		calcule=false # ce mode indique si il faut calculer ou attendre le bon niveau de parenthèsage
		g="" # le groupe d'opération à calculer
		newArg="" # La nouvelle expression avec un niveau de parenthèsage en moins
		for i in $arg
		do
			if [[ `type $i` == "para_fermante" ]] ; then
				(( para-- ))
				if $calcule ; then
					newArg="$newArg `calcExprPrio $g`"
					calcule=false
					g="14"
				else
					newArg="$newArg \)"
				fi
			elif $calcule ; then
				g="$g $i"
			elif [[ `type $i` == "para_ouvrante" ]]; then
				(( para++ ))
				if [[ $para == $paramax ]]; then
					calcule=true
					g=""
				else
					newArg="$newArg \("
				fi
			else
				newArg="$newArg $i"
			fi
		done
		arg="$newArg"
		(( paramax-- ))
	done

	calcExprPrio $arg
}

if [[ $MAIN == "q8" ]]; then
	calcExprPara $*
fi
