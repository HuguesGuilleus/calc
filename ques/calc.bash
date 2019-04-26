#!/bin/bash

MAIN="calc"
source ques/question5.bash

arg=`echo $* | sed 's#\\\\*(#\\\\(#g' | sed 's#\\\\*)#\\\\)#g'`

# on test la syntaxe
err=`testSyntaxe $arg`
if [[ $? != 0 ]]; then
	echo "Erreur de syntaxe:"
	for t in `type $arg`
	do
		echo $t
	done
	echo "$err" >&2
	exit 1
fi

# on calcule
ques/question8.bash $arg
