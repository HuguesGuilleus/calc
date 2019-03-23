#!/bin/bash
# GUILLEUS Hugues CPI2 <hugues.guilleus@ens.uvsq.fr>

# fonction qui calcule ce qu'on lui envoie en argument
calcule(){
	res=$1
	for j in `seq 2 2 $#`
	do
		local after=$(( j + 1 ))
		res=`ques/question3.bash $res ${!j} ${!after}`
	done
	return $res
}

# fonction qui fait le calule (avec priorité des opérateurs)
priorite(){
	groupeop=""
	g="$1"
	for i in `seq 2 2 $#`
	do
		after=$(( i + 1 ))
		case `ques/question2.bash ${!i}` in
			"mult" | "div" )
				g="$g ${!i} ${!after}" ;;
			"somme" | "sous")
				calcule $g
				groupeop="$groupeop $? ${!i}"
				g="${!after}"
				;;
			*)
				echo "type inconnue:: ${!i}"
		esac
	done

	# on calcule le dernier groupe d'argument
	calcule $g
	groupeop="$groupeop $?"

	# on calcule les sommes et les soustraction et on affiche le résultat
	calcule $groupeop
	echo $?
}

# Si premier argument est une addition ou une soustraction
case `ques/question2.bash $1` in
	"somme" )
		shift # on supprime le premier argument: '+'
		args="$*" ;;
	"sous")
		shift # on supprime le premier argument: '-'
		args="-1 x $*" ;;
	*)
		args="$*" ;;
esac

priorite $args
