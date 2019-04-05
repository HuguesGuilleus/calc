#!/bin/bash
# HENROTTE Hugo CPI <henrotte.hugo@gmail.com>

int_global=""
mode_para=false
for i in `echo $* | sed 's#\\\\*(#\\\\(#g' | sed 's#\\\\*)#\\\\)#g'`
do
	type=`ques/question2.bash $i`
			
	if [[ $type == "para ouvrante" ]]; then 
		mode_para=true
		int_para=""
	elif [[ $type == "para fermante" ]]; then
		mode_para=false
		int_global="$int_global `ques/question6.bash $int_para | sed 's/résultat = //'`"
	elif ( $mode_para ); then
	 	int_para="$int_para $i"
	else
		int_global="$int_global $i"
	fi	
done

ques/question6.bash $int_global