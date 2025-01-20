<?php
session_start();

if (!isset($_SESSION['token'])) {
	header("Location: ./start.php");
}

$idRoom = $_GET['room'];

include '../api/db_connect.php';

$stmt = $pdo->prepare('SELECT * FROM s335141.users_in_rooms where login_user =:login and id_room =:room');
$stmt->execute(['login' => $_SESSION['user']['login'], 'room' => $idRoom]);
$result = $stmt->fetch();

if (!$result) {
	header("Location: ./rooms.php");
}

$stmt = $pdo->prepare('SELECT s335141.get_game_state(:t, :room)');
$stmt->execute(['t' => $_SESSION['token'], 'room' => $idRoom]);
$result = $stmt->fetchColumn();

$response = json_decode($result, true);

if ($response && !isset($response['error']) && isset($response['players_in_room'])) {
	$_SESSION['players' . $idRoom] = $response['players_in_room'];
	$_SESSION['game'] = $response;
}

$stmt = $pdo->prepare('SELECT id FROM s335141.players where login_user =:login and id_room =:room');
$stmt->execute(['login' => $_SESSION['user']['login'], 'room' => $idRoom]);
$result = $stmt->fetch();

if ($response && !isset($response['error'])) {
	$_SESSION['id_player' . $idRoom] = $response;
	print_r($_SESSION['token']);
}
?>

<!DOCTYPE html>
<html>
	<?php @include './head.tpl'; ?>
	
	<main class='game'>
		<section class='aside'>
			<div>
				<span>Саботёр</span>
				<button data-show-dialog="rules-dialog">правила</button>
				<button id="quit-button" data-id-room="<?php echo $idRoom; ?>" onclick="">выйти из игры</button>
				<div id='timer'></div>
			</div>

			<ul class="players-list"></ul>
			<div class="drop-card">Выбросить карту</div>
			<ul class="cards-hand"></ul>
		</section>

		<section class='field waiting'>
			<div>
			<?php
				for ($y = 5; $y > 0; $y--) {
					echo '<div class="row">';
					for ($x = 1; $x < 10; $x++) {
						echo '<div class="card empty" data-x=' . $x . ' data-y=' . $y . '>';
						echo '<img src="" alt="" />';
						echo '</div>';
					}
					echo '</div>';
		}?>
		</div>
		</section>
		<?php @include './rules.tpl'; ?>
		<div id="message"></div>
	</main>

	<script type="module" src="../scripts/index.js"></script>
	<script type="module" src="../scripts/quit.js"></script>
	<script type="module" src="../scripts/game.js"></script>
	<script type="module" src="../scripts/cards.js"></script>
</html>