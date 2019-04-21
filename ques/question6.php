#!/usr/bin/php
<?php
	// GUILLEUS Hugues CPI2 <hugues.guilleus@ens.uvsq.fr>

	if ( isset($main) == FALSE ) {
		$main = "q6" ;
	}

	ob_start();
	require_once './ques/question3.php' ;
	ob_end_clean();

	class q6 extends q3 {
		/**
		* @arg args {[]{String|int)}
		* @return res {int} résultat // pas de priorité
		*/
		public function calcExprSimple($args) {
			$res = $args[0] ;
			for ($i=1; $i<count($args); $i+=2) {
				$res = q3::calcSimple($res,$args[$i],$args[$i+1]) ;
			}
			return $res ;
		}
	}

	if ( $main == "q6") {
		echo "résultat = ".q6::calcExprSimple(array_slice($argv,1)) ."\n";
	}

?>
