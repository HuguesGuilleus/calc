#!/bin/bash
# GUILLEUS Hugues CPI2 <hugues.guilleus@ens.uvsq.fr>

if [[ -z $MAIN ]]; then
	MAIN="q5"
fi
source ques/question2.bash


# Affiche les erreurs (stdout)
# @retourn 0: Ok, autre:erreur
function testSyntaxe() {
	# on vérifie qu'il y ai bien des arguments
	if [[ $# == 0 ]]
	then
		echo "** pas d'argument **"
		return 1
	fi

	# Analyse de chaque éléments
	para=0 # para sera le niveau de parenthèsage, para>=0
	before=0
	# On met les parenthèses sous la forme \( ou \) et on envoi ça dans la Q2 puis affiche les types
	argv=`echo $* | sed 's#(#\\(#g' | sed 's#)#\\)#g'`
	for t in `type $argv`
	do
		case $t in
			"para_ouvrante")
				(( para++ )) ;;
			"para_fermante")
				(( para-- ))
				# Si ($rapa < 0) => on fera une erreur après l'itération
				if [[ $para -lt 0 ]]
				then
					echo "** erreur parenthèse ! **"
					return 1
				fi
				if [[ $before == "para_ouvrante" || $before == "somme" || $before == "sous" || $before == "mult" || $before == "div" ]]
				then
					echo "** erreur alternance ! **"
					return 1
				fi ;;
			"somme")
				if [[ $before == "somme" || $before == "sous" || $before == "mult" || $before == "div" ]]
				then
					echo "** erreur alternance ! **"
					return 1
				fi ;;
			"sous")
				if [[ $before == "somme" || $before == "sous" || $before == "mult" || $before == "div" ]]
				then
					echo "** erreur alternance ! **"
					return 1
				fi ;;
			"mult")
				if [[ $before == "para_ouvrante"
					|| $before == "somme" || $before == "sous" || $before == "mult" || $before == "div" ]]
				then
					echo "** erreur alternance ! **"
					return 1
				fi ;;
			"div")
				if [[ $before == "para_ouvrante"
					|| $before == "somme" || $before == "sous" || $before == "mult" || $before == "div" ]]
				then
					echo "** erreur alternance ! **"
					return 1
				fi ;;
			"entier" | *)
				if [[ $before == "entier" ]]
				then
					echo "** erreur alternance ! **"
					return 1
				fi ;;
		esac
		before=$t
	done

	# on affiche les erreurs de parenthèses
	if [[ $para != 0 ]]
	then
		echo "** erreur parenthèse ! **"
		return 1
	fi

	# Analyse du premier argument
	t=`type $1`
	if [[ $t == "mult" || $t == "div" ]]
	then
		echo "** erreur opérateur en premier **"
		return 1
	fi

	# Analyse du dernier argument
	if [[ $before == "somme" || $before == "sous" || $before == "mult" || $before == "div" ]]
	then
		echo "** erreur opérateur en dernier **"
		return 1
	fi

}

if [[ $MAIN == "q5" ]]; then
	# On affiche les types
	for t in `type $*`
	do
		echo "$t" | sed 's/_/ /'
	done
	# On test la syntaxe
	err=`testSyntaxe $*`
	if [[ $? != 0 ]]; then
		echo "$err" >&2
		exit 1
	fi
fi
