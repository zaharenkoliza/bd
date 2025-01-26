<?php
session_start();

include 'db_connect.php';

$login = $_POST['login'] ?? null;
$password = $_POST['password'] ?? null;
$newPassword = $_POST['newPassword'] ?? null;

if (empty($login) || empty($password) || empty($newPassword)) {
	echo json_encode(['status' => 'error', 'message' => 'No login or password']);
	exit;
}

$stmt = $pdo->prepare('SELECT s335141.change_password(:login, :password, :newPassword)');
$stmt->execute(['login' => $login, 'password' => $password, 'newPassword' => $newPassword]);
$result = $stmt->fetchColumn();

$response = json_decode($result, true);

if ($response && isset($response['status']) && $response['status'] === 'success') {	
	echo json_encode([
		'message' => 'success',
		'info' => $response['message']
	]);
} else {
	echo json_encode([
		'status' => 'error',
		'message' => $response['message'] ?? 'Неверный логин или пароль.'
	]);
}
?>