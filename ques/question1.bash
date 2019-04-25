#!/bin/bash
# GUILLEUS Hugues CPI2 <hugues.guilleus@ens.uvsq.fr>

function somme() { echo $(( $1 + $2 )); }
function sous()  { echo $(( $1 - $2 )); }
function mult()  { echo $(( $1 * $2 )); }
function div()   { echo $(( $1 / $2 )); }

# la variable MAIN sert à savoir quel est le module appelé par l'utilisateur
if [[ -z $MAIN ]]; then
	echo "somme $1 $2 = `somme $1 $2`"
	echo "sous $1 $2 = `sous $1 $2`"
	echo "mult $1 $2 = `mult $1 $2`"
	echo "div $1 $2 = `div $1 $2`"
fi
