<?php
session_start();

include 'db_connect.php';

if (!isset($_SESSION['token'])) {
	echo json_encode(['status' => 'error', 'message' => 'No token']);
	exit;
}

$room = $_POST['room'] ?? null;

if (empty($room)) {
	echo json_encode(['status' => 'error', 'message' => 'Write all the information']);
	exit;
}

$stmt = $pdo->prepare('SELECT s335141.get_game_state(:t, :room)');
$stmt->execute(['t' => $_SESSION['token'], 'room' => $room]);
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