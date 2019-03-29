#!/bin/bash

# nous mettons des * aux endrois appropriés et nous mesurons le nombre maximale de parenthèses
arg=""
paran=0
paramax=0
for e in `echo $* | sed 's#\\\\*(#\\\\(#g' | sed 's#\\\\*)#\\\\)#g'`
do
	type=`ques/question2.bash $e`
	if [[ $type == "para ouvrante" && ( $tbefore == "entier" || $tbefore == "para fermante" ) ]]; then
		arg="$arg x $e"
	elif [[ $tbefore == 'para fermante' && $type == "entier" ]]; then
		arg="$arg x $e"
	else
		arg="$arg $e"
	fi
	tbefore=$type

	# mesure le niveau maximal de parenthèsage
	case $type in
		"para ouvrante" )
			(( paran++ ))
			if [[ $paran -ge $paramax ]]; then
				paramax=$paran
			fi
			;;
		"para fermante" )
			(( paran-- ))
			;;
	esac
done


while [[ $paramax -ge 0 ]]; do
	para=0
	calcule=false # ce mode indique si il faut calculer ou attendre le bon niveau de parenthèsage
	g="" # le groupe d'opération à calculer
	newArg=""
	for i in $arg
	do
		if [[ $i == "\)" ]] ; then
			(( para-- ))
			if $calcule ; then
				newArg="$newArg `ques/question6+.bash $g`"
				calcule=false
				g="14"
			else
				newArg="$newArg \)"
			fi
		elif $calcule ; then
			g="$g $i"
		elif [[ $i == "\(" ]]; then
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

ques/question6+.bash $arg
