<?php
session_start();

if (!isset($_SESSION['token'])) {
	header("Location: ./start.php");
}
echo $_SESSION['token'];
function updateSessionFromApi() {
	$apiUrl = 'https://se.ifmo.ru/~s335141/bd/api/available_rooms.php';
	$response = file_get_contents($apiUrl);

	if ($response === false) {
		echo json_encode(['status' => 'error', 'message' => 'Не удалось выполнить запрос']);
		exit;
	}
	return json_decode($response, true);
}

$response = updateSessionFromApi();
echo '<pre>';
echo $response;
echo '</pre>';

if (isset($response['status']) && $response['status'] === 'success') {
	$_SESSION['rooms'] = $response['info'];
} else if (isset($response['status']) && $response['status'] === 'no-success') {
	$_SESSION['rooms'] = null;
	echo 'Нет доступных комнат';
} else {
	echo 'Ошибка при обновлении сессии: ' . ($response['message'] ?? 'Неизвестная ошибка');
}
?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Saboteur</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" href="../css/index.css">

		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="https://fonts.googleapis.com/css2?family=Rubik+Doodle+Shadow&display=swap" rel="stylesheet">

		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="https://fonts.googleapis.com/css2?family=Advent+Pro:ital,wght@0,100..900;1,100..900&family=Handjet:wght@100..900&family=Rubik+Doodle+Shadow&display=swap" rel="stylesheet">
	</head>
	<main>
	<div>
		<span>Саботёр</span>
			<button>правила</button>
			<button onclick="">выйти из аккаунта</button>
		</div>

		<h2>Список игр, доступных для подключения</h2>
		<?php
			echo '<ul class="rooms-list">';
			if ($_SESSION['rooms']){
			foreach ($_SESSION['rooms'] as $room) {
				echo '<li>';
				echo '<span>' . htmlspecialchars($room['id']) . '</span>';
				echo '<span>' . htmlspecialchars($room['count']) . '</span>';
				echo '<span>' . htmlspecialchars($room['time_for_move']) . '</span>';
				echo '<span>' . htmlspecialchars($room['amount_of_players']) . '</span>';
				echo '<button class="join-room" data-id-room="' . $room['id'] . '">войти в игру</button>';
				echo '</li>';
			}
		}
		else {
			echo '<span>Нет доступных комнат</span>';
			echo '<button>создать игру</button>';
		}
			echo '</ul>';?>
		<div id="message"></div>
	</main>
	<script type="module" src="../scripts/index.js"></script>
	<script type="module" src="../scripts/joinRoom.js"></script>
</html>