#!/usr/bin/php
<?php
	// GUILLEUS Hugues CPI2 <hugues.guilleus@ens.uvsq.fr>

	if ( isset($main) == FALSE ) {
		$main = "q2";
	}

	/**
	 * Renvoie les types
	 */
	class q2 {
		/**
		 * @param {String|int}
		 * @return {String} Le type de l'argument
		 */
		function type($e) {
			switch ($e) {
				case '(':
				case '\(':
					return "para ouvrante";
				case ')':
				case '\)':
					return "para fermante";
				case '+': return "somme";
				case '-': return "sous";
				case 'x': return "mult";
				case '/': return "div";
				default:
					return "entier" ;
			}
		}
		/**
		 * @param {[]String|[]int}
		 * @return {[]String} Les types des arguments
		 */
		function typeAll($arg) {
			$tabType = [];
			foreach ($arg as $i => $e) {
				$tabType[$i] = q2::type($e);
			}
			return $tabType ;
		}
	}

	if ( $main == "q2" ) {
		foreach ( q2::typeAll(array_slice($argv,1)) as $e) {
			echo $e."\n" ;
		}
	}

?>
