<?php
session_start();

include 'db_connect.php';

if (!isset($_SESSION['token'])) {
	echo json_encode(['status' => 'error', 'message' => 'No token']);
	exit;
}

$room = $_POST['room'] ?? null;
$name = $_POST['name'] ?? null;


if (empty($room) || empty($name)) {
	echo json_encode(['status' => 'error', 'message' => 'Write all the information']);
	exit;
}

$stmt = $pdo->prepare('SELECT s335141.join_room(:t, :room, :n)');
$stmt->execute(['t' => $_SESSION['token'], 'room' => $room, 'n' => $name]);
$result = $stmt->fetchColumn();

$response = json_decode($result, true);

if ($response && isset($response['status']) && $response['status'] === 'User successfully connected to the room') {
	$_SESSION['players'] = $response['players_in_room'];

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