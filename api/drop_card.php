<?php
session_start();

include 'db_connect.php';

if (!isset($_SESSION['token'])) {
	echo json_encode(['status' => 'error', 'message' => 'No token']);
	exit;
}

$card = $_POST['card'] ?? null;


if (empty($card)) {
	echo json_encode(['status' => 'error', 'message' => 'What card do you want to drop?']);
	exit;
}

$stmt = $pdo->prepare('SELECT s335141.drop_card(:t, :card)');
$stmt->execute(['t' => $_SESSION['token'], 'card' => $card]);
$result = $stmt->fetchColumn();

$response = json_decode($result, true);

if ($response && !isset($response['error'])) {
	$_SESSION['game_status'] = $response['game_status'];

	echo "<pre>";
	print_r($response);
	print_r($_SESSION);
	echo "</pre>";
} else {
	echo json_encode([
		'status' => 'error',
		'message' => $response['error'] ?? 'Error'
	]);
}
?>