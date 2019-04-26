#!/bin/bash
# GUILLEUS Hugues CPI2 <hugues.guilleus@ens.uvsq.fr>

if [[ -z $MAIN ]]; then
	MAIN="q4"
fi
source ques/question2.bash

# Affiche les erreurs
# @retourn 0: Ok, autre:erreur
function testSyntaxe() {
	# Vérification de l'existance des arguments
	if [[ $# == 0 ]]
	then
		echo "** pas d'argument **"
		return 1
	fi

	before=""
	for t in `type $*`
	do
		case $t in
			"somme" | "sous" | "mult" | "div" )
				if [[ $before == "somme" || $before == "sous" || $before == "mult" || $before == "div" ]]
				then
					echo "** erreur d'alternance ! **"
					return 1
				fi ;;
			"entier")
				if [[ $before == "entier" ]]
				then
					echo "** erreur d'alternance ! **"
					return 1
				fi ;;
			*)
				echo "** erreur élément inconnu ! **"
				return 2
		esac
		before=$t
	done

	# On test le premier élément
	case `type $1` in
		"mult" | "div" )
			echo "** erreur opérateur en premier ! **"
			return 1 ;;
	esac

	# on test le dernier élément
	case $before in
		"somme" | "sous" | "mult" | "div" )
			echo "** erreur opérateur en dernier ! **"
			return 1 ;;
	esac

	return 0
}


if [[ $MAIN == "q4" ]]; then
	# on affiche les types
	for e in $*
	do
		type $e
	done
	# on test la syntaxe
	err=`testSyntaxe $*`
	if (( $? != 0 )); then
		echo "$err" >&2
		exit 1
	fi
fi
