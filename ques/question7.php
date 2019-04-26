#!/usr/bin/php
<?php
	// GUILLEUS Hugues CPI2 <hugues.guilleus@ens.uvsq.fr>

	if ( isset($main) == FALSE ) {
		$main = "q7" ;
	}

	ob_start();
	require_once './ques/question2.php' ;
	require_once './ques/question6.php' ;
	ob_end_clean();

	class q7 extends q6 {
		/**
		* @arg args {[]{String|int)} expression ave un niveau de parenthèses
		* @return res {int} résultat // pas de priorité
		*/
		public function calcExpr1Para($arg) {
			// tableau contenant les opérandes hors des parenthèses calc
			$int_global=[];
			// indique si l'on se trouve dans une parenthèse
			$mode_para = false;
			foreach ($arg as $e) {
				$type = q2::type($e);
				if ($type=="para ouvrante") {
					$mode_para=true;
					$int_para=[];
				} elseif ($type=="para fermante") {
					$mode_para=false;
					array_push($int_global, q7::calcExprSimple($int_para));
				} elseif ($mode_para) {
					array_push($int_para, $e);
				} else {
					array_push($int_global, $e);
				}
			}
			return q7::calcExprSimple($int_global);
		}
	}

	if ( $main == "q7") {
		echo "résultat = ".q7::calcExpr1Para(array_slice($argv,1))."\n";
	}
?>
