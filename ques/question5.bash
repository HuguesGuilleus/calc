#!/bin/bash
# GUILLEUS Hugues CPI2 <hugues.guilleus@ens.uvsq.fr>

if [[ -z $MAIN ]]; then
	MAIN="q5"
fi
source ques/question2.bash


# Affichage des erreurs (stdout)
# @retourn 0: Ok, autre:erreur
function testSyntaxe() {
	# on vérifie qu'il y ait bien des arguments
	if [[ $# == 0 ]]
	then
		echo "** pas d'argument **"
		return 1
	fi

	para=0 # para sera le niveau de parenthèsage, para>=0
	before=0
	for t in `type $*`
	do
		case $t in
			"para_ouvrante")
				(( para++ )) ;;
			"para_fermante")
				(( para-- ))
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
			"somme" | "sous" )
				if [[ $before == "somme" || $before == "sous" || $before == "mult" || $before == "div" ]]
				then
					echo "** erreur alternance ! **"
					return 1
				fi ;;
			"mult" | "div" )
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

	# erreur si les parenthèses ne sont pas fermées
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

	return 0
}

if [[ $MAIN == "q5" ]]; then
	# On affiche les types
	for t in `type $*`
	do
		echo "$t" | sed 's/_/ /'
	done
	# On teste la syntaxe
	err=`testSyntaxe $*`
	if [[ $? != 0 ]]; then
		echo "$err" >&2
		exit 1
	fi
fi
