<?php
session_start();

include 'db_connect.php';

if (!isset($_SESSION['token'])) {
	echo json_encode(['status' => 'error', 'message' => 'No token']);
	exit;
}

$card = $_POST['card'] ?? null;
$x = $_POST['x'] ?? null;
$y = $_POST['y'] ?? null;
$rot = $_POST['rot'] ?? null;


if (empty($card) || empty($x) || empty($y) || empty($rot)) {
	echo json_encode(['status' => 'error', 'message' => 'Not enough info']);
	exit;
}

$stmt = $pdo->prepare('SELECT s335141.check_and_place_card(:t, :card, :x, :y, :rot)');
$stmt->execute(['t' => $_SESSION['token'], 'card' => $card, 'x' => $x, 'y' => $y, 'rot' => $rot]);
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