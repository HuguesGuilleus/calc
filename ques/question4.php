#!/usr/bin/php
<?php
	// GUILLEUS Hugues CPI2 <hugues.guilleus@ens.uvsq.fr>

	if ( isset($main) == FALSE ) {
		$main = "q4" ;
	}

	ob_start();
	require_once './ques/question2.php' ;
	ob_end_clean();

	class q4 extends q2 {
		/**
		* @param arg {[]String} liste des opérandes
		* @return {Boolean} false:OK, true:erreur
		*/
		function testSyntaxe($arg) {
			try {
				$type = q4::typeAll($arg);
				if ( count($arg) == 0 ) {
					throw new Exception("err aucun arg");
				}
				foreach ($type as $e) {
					echo $e."\n";
				}
				q4::alternance($type);
				q4::debut_fin($type);
				return FALSE;
			} catch (Exception $err) {
				switch ($err->getMessage()) {
					case "err aucun arg":
						fwrite(STDERR, "** pas d'argument **\n");
						break;
					case "err alt":
						fwrite(STDERR, "** erreur d'alternance ! **\n");
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
						fwrite(STDERR, $err."\n");
						exit(2);
				}
				return TRUE;
			}
		}
		function alternance($arg) {
			$before = "";
			foreach ($arg as $e) {
				switch ($e) {
					case "entier":
						if ($before == "entier") {
							throw new Exception("err alt");
						}
						break;
					case "sous":
					case "somme":
					case "mult":
					case "div":
						if ($before!=="entier" && $before != "") {
							throw new Exception("err alt");
						}
						break;
				}
				$before = $e ;
			}
		}
		function debut_fin($arg) {
			switch ($arg[0]) {
				case "mult":
				case "div":
					throw new Exception("err prem");
			}
			switch ($arg[count($arg) -1]) {
				case "somme":
				case "sous":
				case "mult":
				case "div":
					throw new Exception("err dern");
			}
		}
	}

	if ( $main == "q4" ) {
		if ( q4::testSyntaxe(array_slice($argv,1)) ) {
			exit(1);
		}
	}

?>
