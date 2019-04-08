#!/bin/bash
# GUILLEUS Hugues CPI2 <hugues.guilleus@ens.uvsq.fr>

clear

for lang in `cat lang.txt`
do
	# On teste si le laguage est bien supporté
	if [[ !( -x hello/word.$lang ) ]]; then
		printf "\033[01;33mERREUR le programme hello/word.$lang n'existe pas ou n'est pas exécutable\n\n"
		continue
	elif [[ `hello/word.$lang 2>&1` != "Hello Word" ]]; then
		printf "\033[01;31mERREUR le language <$lang> n'est pas implémenté\n\n"
		continue
	fi

	# On fait tout les tests
	total=0
	reussite=0
	timeBefore=`date +%s`
	for test in dataTest/*/*.txt
	do
		(( total += 1 ))
		name=`awk '{ if(NR==1) print $0 }' $test`
		prog=`awk '{ if(NR==2) print $0 }' $test`
		argv=`awk '{ if(NR==3) print $0 }' $test`
		code=`awk '{ if(NR==4) print $0 }' $test`
		expe=`awk '{ if(NR>=5) print $0 }' $test`

		printf "\033[01;34mTest $lang $prog «$name» :: "

		if [[ !( -e ques/$prog.$lang)  ]]
		then
			printf "\033[33mERREUR <ques/$prog.$lang> n'existe pas\033[0m\n"
		elif [[ !( -x ques/$prog.$lang ) ]]
		then
			printf "\033[33mERREUR <ques/$prog.$lang> n'est pas exécutable\033[0m\n"
		else
			ques/$prog.$lang $argv 1> out.log 2> err.log
			retu=$?
			out=`cat out.log`
			err=`cat err.log`

			if [[ $err ]]
			then
				printf "\033[31mERREUR stderr\033[0m\n"
				echo "Arguments: [[[$argv]]]"
				echo "[[[$err]]]"
			elif [[ $expe != $out ]]
			then
				printf "\033[31mERREUR stdout\033[0m\n"
				echo "Arguments: [[[$argv]]]"
				echo "Attendu: [[[$expe]]]"
				echo "Sortie: [[[$out]]]"
			elif [[ $code != $retu ]]
			then
				printf "\033[31mERREUR return code\033[0m\n"
				echo "attendu: $code"
				echo "Reçu:    $retu"
			else
				printf "\033[32mOK\033[0m\n"
				(( reussite += 1 ))
			fi
		fi
	done
	timeAfter=`date +%s`
	printf "\033[01;35mTotal: $reussite/$total en $(( timeAfter - timeBefore )) s\033[0m\n\n"
done


for file in out.log err.log
do
	if [[ -e $file ]]
	then
		rm $file
	fi
done
