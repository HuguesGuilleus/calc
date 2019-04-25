#!/bin/bash
# GUILLEUS Hugues CPI2 <hugues.guilleus@ens.uvsq.fr>

if [[ -z $MAIN ]]; then
	MAIN="q3"
fi

source ques/question1.bash
source ques/question2.bash

# @arg $1,$3 entier
# @arg $2 opérateur
# @retrn (stdout) résultat
# Nous utilisons stdout car le retour est non signé et limité à un octet
function calcSimple() {
	case `type $2` in
		'somme') somme $1 $3 ;;
		'sous') sous  $1 $3 ;;
		'mult') mult  $1 $3 ;;
		'div') div   $1 $3 ;;
		*) echo "Opération inconnu" 1>&2 ;;
	esac
}

if [[ $MAIN == "q3" ]]; then
	calcSimple $1 $2 $3
fi
