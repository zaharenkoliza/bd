<?php
session_start();

include 'db_connect.php';

$card = $_POST['card'] ?? null;

if (empty($card)) {
	echo json_encode(['status' => 'error', 'message' => 'Write all the information']);
	exit;
}

$stmt = $pdo->prepare('select toc.tool from s335141.type_action_card tac 
join s335141.action_cards ac
on ac.id_type_card = tac.id
join s335141.tools_on_cards toc on toc.id_type_card = tac.id
where ac.id_card =:card');
$stmt->execute(['card' => $card]);
$result = $stmt->fetchColumn();

if ($result === null || $result === false) {
	echo json_encode([
		'status' => 'error',
		'message' => 'No card found'
	]);
} else {
    echo json_encode([
		'status' => 'success',
		'message' => $result
	]);
}
?>