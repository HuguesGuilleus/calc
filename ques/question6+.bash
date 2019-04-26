#!/bin/bash
# GUILLEUS Hugues CPI2 <hugues.guilleus@ens.uvsq.fr>

if [[ -z $MAIN ]]; then
	MAIN="q6+"
fi
source ques/question2.bash
source ques/question6.bash

# Calcule d'expression avec la priorité
function calcExprPrio(){
	# Si le premier argument est une addition ou une soustraction
	case `type $1` in
		"somme" )
			# on supprime le premier argument: '+'
			shift ;;
		"sous")
			# on supprime le premier argument: '-'
			# Le s permet que set n'interprète pas -1 comme une option
			set s -1 "x" ${*:2}
			shift ;;
	esac

	# on calcule tout les facteurs
	termes=""
	facteurs="$1"
	for i in `seq 2 2 $#`
	do
		after=$(( i + 1 ))
		case `type ${!i}` in
			"mult" | "div" )
				facteurs="$facteurs ${!i} ${!after}" ;;
			"somme" | "sous")
				termes="$termes `calcExpr $facteurs` ${!i}"
				facteurs="${!after}"
				;;
			*)
				echo "type inconnue:: ${!i}"
		esac
	done
	# on calcule le dernier groupe d'argument
	termes="$termes `calcExpr $facteurs`"
	# on calcule les sommes et les soustractions et on affiche le résultat
	calcExpr $termes
}

if [[ $MAIN == "q6+" ]]; then
	calcExprPrio $*
fi
