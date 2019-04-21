#!/usr/bin/php
<?php // GUILLEUS Hugues CPI2 <hugues.guilleus@ens.uvsq.fr>

	if ( isset($main) == FALSE ) {
		$main = "q1" ;
	}

	/**
	 * Les fonctions suivantes pernnent des int en paramètres
	 */
	class q1 {
		function somme($a,$b) {
			return (int)$a + (int)$b ;
		}
		function sous($a,$b) {
			return $a - $b ;
		}
		function mult($a,$b) {
			return $a * $b ;
		}
		function div($a,$b) {
			return (int)($a/$b) ;
		}
	}

	if ( $main == "q1" ) {
		$a = (int)$argv[1];
		$b = (int)$argv[2];
		echo "somme $a $b = ".q1::somme($a,$b)."\n" ;
		echo "sous $a $b = ".q1::sous($a,$b)."\n";
		echo "mult $a $b = ".q1::mult($a,$b)."\n";
		echo "div $a $b = ".q1::div($a,$b)."\n";
	}

?>
