#!/usr/bin/php
<?php
	// GUILLEUS Hugues CPI2 <hugues.guilleus@ens.uvsq.fr>

	if ( isset($main) == FALSE ) {
		$main = "q5" ;
	}

	ob_start();
	require_once './ques/question2.php' ;
	ob_end_clean();

	class q5 {
		/**
		* @param arg {[]String} liste des opérandes
		* @param print {Boolean} indique si il faut afficher les types en temps normale
		* @return {Boolean} false:OK, true:erreur
		*/
		function testSyntaxe($arg, $print) {
			try {
				$type = q2::typeAll($arg);
				if ( count($arg) == 0 ) {
					throw new Exception("err aucun arg");
				}
				if ( $print ) {
					foreach ($type as $e) {
						echo $e."\n";
					}
				}
				q5::alternance($type);
				q5::prem_dern($type);
				return FALSE;
			} catch (Exception $err) {
				if ( $print == FALSE ) {
					echo "Erreur de syntaxe:\n" ;
					foreach ($type as $e) {
						echo $e."\n";
					}
				}
				switch ($err->getMessage()) {
					case "err aucun arg":
						fwrite(STDERR, "** pas d'argument **\n");
						break;
					case "err alt":
						fwrite(STDERR, "** erreur alternance ! **\n");
						break;
					case "err para":
						fwrite(STDERR, "** erreur parenthèse ! **\n");
						break;
					case "err prem":
						fwrite(STDERR, "** erreur opérateur en premier **\n");
						break;
					case "err dern":
						fwrite(STDERR, "** erreur opérateur en dernier **\n");
						break;
					default:
						fwrite(STDERR, "\n");
						echo $err."\n";
						exit(2);
				}
				return TRUE;
			}
		}
		/**
		* @prama arg {[]String} La liste des types des arguments
		* Vérification du premier et du dernier éléments
		*/
		function prem_dern($arg) {
			switch($arg[0]){
				case 'mult':
				case 'div':
					throw new Exception("err prem");
					break;
			}
			switch ($arg[ count($arg)-1 ]) {
				case 'somme':
				case 'sous':
				case 'mult':
				case 'div':
					throw new Exception("err dern");
					break;
			}
		}
		/**
		* @prama arg {[]String} La liste des types des arguments
		* vérification de l'alternance entre les opérandes et des parnethèses
		*/
		function alternance($arg) {
			$para = 0 ;
			$before = "";
			foreach ($arg as $e) {
				switch ($e) {
					case 'para ouvrante':
						$para++;
						break;
					case 'para fermante':
						$para--;
						if ($para<0) {
							throw new Exception("err para");
						}
						if ($before=="para ouvrante" ||
							$before=="somme" ||
							$before=="sous" ||
							$before=="mult" ||
							$before=="div"
						) {
							throw new Exception("err alt");
						}
						break;
					case "somme":
					case "sous":
						if ($before=="somme"||
							$before=="sous"||
							$before=="mult"||
							$before=="div"
						) {
							throw new Exception("err alt");
						}
						break;
					case "mult":
					case "div":
						if ($before=="para ouvrante"||
							$before=="somme"||
							$before=="sous"||
							$before=="mult"||
							$before=="div"
						) {
							throw new Exception("err alt");
						}
						break;
					case "entier":
						if ($before=="entier") {
							throw new Exception("err alt");
						}
						break;
				}
				$before = $e ;
			}
			if ($para>0) {
				throw new Exception("err para");
			}
		}
	}

	if ( $main == "q5" ) {
		if ( q5::testSyntaxe( array_slice($argv,1), TRUE ) ) {
			exit(1);
		}
	}
?>
