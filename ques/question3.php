#!/usr/bin/php
<?php
	// GUILLEUS Hugues CPI2 <hugues.guilleus@ens.uvsq.fr>

	if ( isset($main) == FALSE ) {
		$main = "q3" ;
	}

	// ob_start() et ob_end_clean() servent à ne pas afficher les shebangs
	ob_start();
	require_once './ques/question1.php' ;
	require_once './ques/question2.php' ;
	ob_end_clean();

	class q3 {
		/**
			* @param a,op,b {string,int} les nb et l'opérateur
			* @return {int} résultat
		*/
		function calcSimple($a,$op,$b) {
			if ( !is_int($a) ) {
				$a = (int)$a ;
			}
			if ( !is_int($b) ) {
				$b = (int)$b ;
			}
			switch ( q2::type($op) ) {
				case "somme": return q1::somme($a,$b) ;
				case "sous": return q1::sous($a,$b);
				case "mult": return q1::mult($a,$b) ;
				case "div": return q1::div($a,$b);
				default:
					return 0;
			}
		}
	}

	if ( $main == "q3" ) {
		echo q3::calcSimple( $argv[1], $argv[2], $argv[3] )."\n" ;
	}

?>
