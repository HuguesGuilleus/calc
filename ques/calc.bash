#!/bin/bash

MAIN="calc"
source ques/question5.bash
source ques/question8.bash

# on test la syntaxe
err=`testSyntaxe $*`
if [[ $? != 0 ]]; then
	echo "Erreur de syntaxe:"
	for t in `type $*`
	do
		echo $t
	done
	echo "$err" >&2
	exit 1
fi

# on calcule
calcExprPara $*
