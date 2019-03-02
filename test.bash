#!/bin/bash

clear

for lang in `cat lang.txt`
do
	for test in output/*.txt
	do
		name=`awk '{ if(NR==1) print $0 }' $test`
		prog=`awk '{ if(NR==2) print $0 }' $test`
		argv=`awk '{ if(NR==3) print $0 }' $test`
		code=`awk '{ if(NR==4) print $0 }' $test`
		expe=`awk '{ if(NR>=5) print $0 }' $test`
		
		printf "\033[01;34mTest $lang $prog :: «$name» => \033[0m"
		
		if [[ !( -x ques/$prog.$lang)  ]]
		then
			printf "file expected\033[0m\n"
			echo "//Le fichier doit exister et être exécutable!"
		else
			ques/$prog.$lang $argv > out.log 2> err.log
			retu=$?
			out=`cat out.log`
			if [[ $out == $expe ]]
			then
				printf "\033[32mOK\033[0m\n"
			else
				printf "\033[31mERREUR\033[0m\n"
				printf "Attendu: [[[$expe]]]\n"
				printf "Sortie:  [[[$out]]]\n"
			fi
			
			echo "int:$retu"
			
		fi
		
	done
done


if [[ -e out.log ]]
then
	rm out.log
fi
