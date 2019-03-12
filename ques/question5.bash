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


# Analyse et affichage de chaque éléments
para=0 # para sera le niveau de parenthèsage, para>=0
before=0
for t in `echo $out | sed 's#para #para_#g'`
do
	case $t in
		"para_ouvrante")	
			(( para++ ))
			echo "para ouvrante" ;;
		"para_fermante")
			(( para-- ))
			# Si ($rapa < 0) => on fera une erreur après l'itération
			if [[ $para -lt 0 ]]
			then
				errPara=true
			fi
			echo "para fermante";;
		"somme")
			echo $t
			if [[ $before == "somme" || $before == "sous" || $before == "mult" || $before == "div" ]]
			then
				errAlt=true
			fi
			;;
		"sous")
			echo $t
			if [[ $before == "somme" || $before == "sous" || $before == "mult" || $before == "div" ]]
			then
				errAlt=true
			fi
			;;
		*) echo $t ;;
	esac
	before=$t
done


# on affiche les erreurs de parenthèses
if [[ $para != 0 || $errPara ]]
then
	echo "** erreur parenthèse ! **"
	exit 1
fi


# on affiche les erreurs d'alternance
if [[ $errAlt ]]
then
	echo "** erreur alternance ! **"
	exit 1
fi


# Analyse du premier argument
t1=`ques/question2.bash $1`
if [[ $t1 == "mult" || $t1 == "div" ]]
then
	echo "** erreur opérateur en premier **"
	exit 1
fi


# Analyse du dernier argument
t1=`ques/question2.bash ${!#}`
if [[ $t1 == "somme" || $t1 == "sous" || $t1 == "mult" || $t1 == "div" ]]
then
	echo "** erreur opérateur en dernier **"
	exit 1
fi
