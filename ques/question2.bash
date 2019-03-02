#!/bin/bash
# GUILLEUS Hugues CPI2 <hugues.guilleus@ens.uvsq.fr>

for i in `seq 1 $#`
do
	case ${!i} in
		'+')	echo "somme" ;;
		'-')	echo "sous"  ;;
		'x')	echo "mult"  ;;
		'/')	echo "div"   ;;
		'\(')	echo "para ouvrante" ;;
		'\)')	echo "para fermante" ;;
		*)		echo "entier" ;;
	esac
done
