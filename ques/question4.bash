#!/bin/bash
# GUILLEUS Hugues CPI2 <hugues.guilleus@ens.uvsq.fr>

if [[ $# == 0 ]]
then
	echo "** pas d'argument **"
	exit 1
fi

# On met les parenthèses sous la forme \( ou \) et on envoi ça dans la Q2 puis affiche les types
argv=`echo $* | sed 's#(#\\(#g' | sed 's#)#\\)#g'`
out=`ques/question2.bash $argv`

# Analyse de chaque élément
errAlt=false
before=""
for t in `echo $out | sed 's/para /para_/'`
do
	echo $t | sed 's/para_/para /'
	case $t in
		"somme" | "sous" | "mult" | "div" )
			if [[ $before == "somme" || $before == "sous" || $before == "mult" || $before == "div" ]]
			then
				errAlt=true
			fi ;;
		"entier")
			if [[ $before == "entier" ]]
			then
				errAlt=true
			fi ;;
		*)
			echo "** erreur élément inconnu ! **"
	esac
	before=$t
done


if [[ $errAlt == true ]]
then
	echo "** erreur d'alternance ! **"
	exit 1
fi

# On test le premier élément
case `ques/question2.bash $1` in
	"mult" | "div" )
		echo "** erreur opérateur en premier ! **"
		exit 1 ;;
esac

# on test le dernier élément
case `ques/question2.bash ${!#}` in
	"somme" | "sous" | "mult" | "div" )
		echo "** erreur opérateur en dernier ! **"
		exit 1 ;;
esac
