#!/bin/bash

arg=`echo $* | sed 's#\\\\*(#\\\\(#g' | sed 's#\\\\*)#\\\\)#g'`

# on test la syntaxe
std=$(ques/question5.bash $arg 2>&1)
if [[ $? != 0 ]]; then
	printf "Erreur de syntaxe:\n$std\n"
	exit 1
fi

# on calcule
ques/question8.bash $arg
