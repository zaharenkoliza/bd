<?php

$host = 'pg';
$db = 'studs';
$db_user = 's335141';
$db_password = 'rKux7MCx0SKISIWe'; 

$dsn = "pgsql:host=$host;port=5432;dbname=$db;";

try {
	$pdo = new PDO($dsn, $db_user, $db_password, [
		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
		PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
		PDO::ATTR_EMULATE_PREPARES => false
	]);
} catch (PDOException $e) {
	die("Ошибка подключения к базе данных: " . $e->getMessage());
}

?>