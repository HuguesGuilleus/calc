#!/bin/bash
# HENROTTE Hugo CPI <henrotte.hugo@gmail.com>

# on test si il n'y a aucun argument
if [[ $# == 0 ]]
then
	echo "** pas d'argument **"
	exit 1
fi

# on calcule chaque expression
res=$1
for i in `seq 2 2 $#`
do
	after=$(( i + 1 ))
	res=`ques/question3.bash $res ${!i} ${!after}`
done

# on affiche le résultat
echo "résultat = $res"
