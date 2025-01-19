<?php
session_start();

include 'db_connect.php';

if (!isset($_SESSION['token'])) {
	echo json_encode(['status' => 'error', 'message' => 'No token']);
	exit;
}

$room = $_POST['room'] ?? null;
$name = $_POST['name'] ?? null;


if (empty($room)) {
	echo json_encode(['status' => 'error', 'message' => 'No room']);
	exit;
}

$stmt = $pdo->prepare('SELECT s335141.join_room(:t, :room, :n)');
$stmt->execute(['t' => $_SESSION['token'], 'room' => $room, 'n' => $name ? $name : 'Гость']);
$result = $stmt->fetchColumn();

$response = json_decode($result, true);

if ($response && isset($response['status']) && $response['status'] === 'User successfully connected to the room') {
	$_SESSION['players' . $room] = $response['players_in_room'];
	$_SESSION['id_player' . $room] = $response['id_player'];

	echo json_encode([
		'status' => 'success',
		'info' => $response
	]);
} else {
	echo json_encode([
		'status' => 'error',
		'message' => $response['error'] ?? 'Error'
	]);
}
?>