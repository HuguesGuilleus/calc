#!/usr/bin/php
<?php
	// GUILLEUS Hugues CPI2 <hugues.guilleus@ens.uvsq.fr>

	if ( isset($main) == FALSE ) {
		$main = "q6+" ;
	}

	ob_start();
	require_once './ques/question2.php' ;
	require_once './ques/question6.php' ;
	ob_end_clean();

	class q6p extends q6 {
		/**
		* @arg args {[]{String|int)}
		* @return res {int} résultat // pas de priorité
		*/
		public function calcExprPrio($arg) {
			// on gérère les expression commançant par + ou -
			switch (q2::type($arg[0])) {
				case "somme":
					array_shift($arg);
					break;
				case "sous":
					array_splice($arg, 0,1, ["-1","x"] );
					break;
			}
			// on calcule les facteurs
			$termes=[];
			$facteurs=[$arg[0]];
			for ($i=1; $i<count($arg); $i+=2) {
				switch (q2::type($arg[$i])) {
					case "somme":
					case "sous":
						array_push($termes, q6p::calcExprSimple($facteurs), $arg[$i]);
						$facteurs = [ $arg[$i+1] ];
						break;
					case "mult":
					case "div":
						array_push($facteurs, $arg[$i], $arg[$i+1]);
						break;
				}
			}
			array_push($termes, q6p::calcExprSimple($facteurs));
			return q6p::calcExprSimple($termes) ;
		}
	}

	if ( $main == "q6+") {
		echo q6p::calcExprPrio(array_slice($argv,1))."\n";
	}
?>
