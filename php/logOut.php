<?php
session_start();

include '../api/db_connect.php';

$stmt = $pdo->prepare('DELETE FROM s335141.tokens where login_user =:login');
$stmt->execute(['login' => $_SESSION['user']['login']]);
echo  $_SESSION['user']['login'];

session_destroy();

header("Location: ./start.php");
exit;
?>