#!/usr/bin/php
<?php
	// GUILLEUS Hugues CPI2 <hugues.guilleus@ens.uvsq.fr>

	if ( isset($main) == FALSE ) {
		$main = "q8" ;
	}

	ob_start();
	require_once './ques/question2.php' ;
	require_once './ques/question6+.php' ;
	ob_end_clean();

	class q8 extends q6p {
		/**
		* @arg args {[]{String|int)} expression avec des parenthèses
		* @return res {int} résultat
		*/
		public function calcExprPara($argBrute) {
			$oldArg=[];
			$paramax=0;
			$paran=0;
			$tbefore="";
			foreach ($argBrute as $e) {
				$type=q2::type($e);
				// on met des x explicite là où il étaient implicites
				if ($type=="para ouvrante" &&
					($tbefore=="entier" || $tbefore=="para fermante")) {
					array_push($oldArg, "x", $e);
				} elseif ($tbefore=="para fermante"&&$type=="entier") {
					array_push($oldArg, "x",$e);
				} else {
					array_push($oldArg, $e);
				}
				// mesure le niveau maximale de parenthèses
				switch ($type) {
					case "para ouvrante":
						$paran++;
						if ($paran>$paramax) {
							$paramax=$paran;
						}
						break;
					case "para fermante":
						$paran--;
				}
				$tbefore=$type;
			}
			// on calcule le niveau max de parenthèses
			// print_r($oldArg) ;
			// return 0 ;
			// $oldArg = [ "3","+","2","x","2" ];
			// return q8::calcExprPrio($oldArg);
			for(; $paramax>=0;$paramax--) {
				$para=0;
				// indique s'il faut calculer ou attendre le bon niveau de parenthèses
				$calcule=false;
				$subArg=[];
				$newArg=[];
				foreach ($oldArg as $e) {
					if (q2::type($e)=="para fermante") {
						$para--;
						if ($calcule) {
							array_push($newArg,q8::calcExprPrio($subArg));
							$calcule=false;
						} else {
							array_push($newArg, ")");
						}
					} elseif ($calcule) {
						array_push($subArg, $e);
					} elseif (q2::type($e)=="para ouvrante") {
						$para++;
						if ($para==$paramax) {
							$calcule=true;
							$subArg=[];
						} else {
							array_push($newArg, "(");
						}
					} else {
						array_push($newArg, $e);
					}
				}
				$oldArg=$newArg;
			}
			return q8::calcExprPrio($oldArg);
		}
	}

	if ( $main == "q8") {
		echo q8::calcExprPara(array_slice($argv,1))."\n";
	}
?>
