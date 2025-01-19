<?php
session_start();

include 'db_connect.php';

if (!isset($_SESSION['token'])) {
	echo json_encode(['status' => 'error', 'message' => 'No token']);
	exit;
}

$room = $_GET['room'] ?? null;

if (empty($room)) {
	echo json_encode(['status' => 'error', 'message' => 'Where are you?']);
	exit;
}

$stmt = $pdo->prepare('SELECT s335141.skip_move(:t, :room)');
$stmt->execute(['t' => $_SESSION['token'], 'room' => $room]);
$result = $stmt->fetchColumn();

$response = json_decode($result, true);

if ($response && !isset($response['error'])) {
	$_SESSION['game_status'] = $response['game_status'];

	echo json_encode([
		'message' => 'success',
		'info' => $response
	]);
} else {
	echo json_encode([
		'status' => 'error',
		'message' => $response['error'] ?? 'Error'
	]);
}
?>