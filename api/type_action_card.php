<?php
session_start();

include 'db_connect.php';

$room = $_POST['room'] ?? null;
$card = $_POST['card'] ?? null;

if (empty($room)) {
	echo json_encode(['status' => 'error', 'message' => 'Write all the information']);
	exit;
}

$stmt = $pdo->prepare('select id_type_card from s335141.action_cards tc join s335141.cards c on tc.id_card = c.id where c.id_room =:room and c.id =:card');
$stmt->execute(['card' => $card, 'room' => $room]);
$result = $stmt->fetchColumn();

if (!$result) {
	echo json_encode([
		'status' => 'error',
		'message' => $response['message'] ?? 'No card found'
	]);
} else {
	echo json_encode([
		'status' => 'success',
		'message' => $result
	]);
}
?>