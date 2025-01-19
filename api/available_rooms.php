<?php
session_start();

include 'db_connect.php';

$stmt = $pdo->prepare('SELECT s335141.available_rooms()');
$stmt->execute();
$result = $stmt->fetchColumn();

$response = json_decode($result, true);

if ($response && isset($response['message'])) {
	$_SESSION['rooms'] = $response;

	echo json_encode([
		'status' => 'no-success',
		'info' => $response['message']
	]);
} else if ($response) {
	$_SESSION['rooms'] = $response;

	echo json_encode([
		'status' => 'success',
		'info' => $response
	]);
}else {
	echo json_encode([
		'status' => 'error',
		'message' => 'Error'
	]);
}
?>