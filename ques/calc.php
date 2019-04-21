#!/usr/bin/php
<?php
	// GUILLEUS Hugues CPI2 <hugues.guilleus@ens.uvsq.fr>

	if ( isset($main) == FALSE ) {
		$main = "calc" ;
	}

	ob_start();
	require_once './ques/question5.php' ;
	require_once './ques/question8.php' ;
	ob_end_clean();

	$arg = array_slice($argv,1) ;

	if ( q5::testSyntaxe($arg,FALSE) ) {
		exit(1);
	}
	echo q8::calcExprPara($arg) ."\n";
?>
