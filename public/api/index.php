<?php

define('APPLICATION_PATH', dirname(__FILE__).'/../../api');
require_once APPLICATION_PATH.'/../vendor/autoload.php';
$application = new Yaf_Application( APPLICATION_PATH . "/../conf/application.ini");

$application->bootstrap()->run();
?>
