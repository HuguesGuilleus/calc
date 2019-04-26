#!/bin/bash
# GUILLEUS Hugues CPI2 <hugues.guilleus@ens.uvsq.fr>

clear

for lang in bash php js
do
	# Vérification du bon fonctionnement de l'interpréteur avec un "Hello World"
	if [[ !( -x hello/world.$lang ) ]]; then
		printf "\033[01;33mERREUR le programme hello/world.$lang n'existe pas ou n'est pas exécutable\n\n"
		continue
	elif [[ `hello/world.$lang 2>&1` != "Hello World" ]]; then
		printf "\033[01;31mERREUR le langage <$lang> n'est pas implémenté\n\n"
		continue
	fi

	total=0
	reussite=0
	timeBefore=`date +%s`
	for test in dataTest/*/*.txt
	do
		(( total += 1 ))
		name=`sed -n "1 p" $test`
		prog=`sed -n "2 p" $test`
		argv=`sed -n "3 p" $test`
		norm_ret=`sed -n "4 p" $test`
		norm_out=`awk 'BEGIN{e=0}{if(NR>4 && $0==""){e=1}else if(NR>4&&e==0) print $0}' $test`
		norm_err=`awk 'BEGIN{e=0}{if(NR>4 && $0==""){e=1}else if(NR>4&&e==1) print $0}' $test`

		printf "\033[01;34mTest $lang $prog «$name» :: "

		# Vérification que le programme existe et est exécutable
		if [[ !( -e ques/$prog.$lang)  ]]
		then
			printf "\033[33mERREUR <ques/$prog.$lang> n'existe pas\033[0m\n"
		elif [[ !( -x ques/$prog.$lang ) ]]
		then
			printf "\033[33mERREUR <ques/$prog.$lang> n'est pas exécutable\033[0m\n"
		else
			# On lance le programme et on récupère stdout, stderr et le code de retour
			ques/$prog.$lang $argv 1> out.log 2> err.log
			recu_ret=$?
			recu_out=`cat out.log`
			recu_err=`cat err.log`

			if [[ $norm_out != $recu_out ]]
			then
				printf "\033[31mERREUR stdout\033[0m\n"
				echo "Arguments: [[[$argv]]]"
				echo "Attendu: [[[$norm_out]]]"
				echo "Sortie: [[[$recu_out]]]"
			elif [[ $norm_err != $recu_err ]]
			then
				printf "\033[31mERREUR stderr\033[0m\n"
				echo "Arguments: [[[$argv]]]"
				echo "Attendu: [[[$norm_err]]]"
				echo "Sortie: [[[$recu_err]]]"
			elif [[ $norm_ret != $recu_ret ]]
			then
				printf "\033[31mERREUR code de retour\033[0m\n"
				echo "Arguments: [[[$argv]]]"
				echo "Attendu: $norm_ret"
				echo "Reçu:    $recu_ret"
			else
				printf "\033[32mOK\033[0m\n"
				(( reussite += 1 ))
			fi
		fi
	done
	timeAfter=`date +%s`
	printf "\033[01;35mTotal: $reussite/$total en $(( timeAfter - timeBefore )) s"
	if [[ $reussite == $total ]]; then
		printf "\033[32m * Full Sucess *\033[0m\n\n"
	else
		printf "\033[0m\n\n"
	fi
done


# on supprime les fichiers qui recevaient stdout et stderr
for file in out.log err.log
do
	if [[ -e $file ]]
	then
		rm $file
	fi
done
