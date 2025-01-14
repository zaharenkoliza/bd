<?php
session_start();

include 'db_connect.php';

$login = $_POST['login'] ?? null;
$password = $_POST['password'] ?? null;


if (empty($login) || empty($password)) {
	echo json_encode(['status' => 'error', 'message' => 'No login or password']);
	exit;
}

$stmt = $pdo->prepare('SELECT s335141.register(:login, :password)');
$stmt->execute(['login' => $login, 'password' => $password]);
$result = $stmt->fetchColumn();

$response = json_decode($result, true);

if ($response && isset($response['status']) && $response['status'] === 'success') {
	$_SESSION['token'] = $response['token'];
	$_SESSION['user'] = ['login' => $login];
	$_SESSION['users'] = $response['users'];

	echo "<pre>";
	print_r($response);
	print_r($_SESSION);
	echo "</pre>";
} else {
	echo json_encode([
		'status' => 'error',
		'message' => $response['message'] ?? 'Something is wrong'
	]);
}
?>