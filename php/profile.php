<?php
session_start();

if (!isset($_SESSION['token'])) {
	header("Location: ./start.php");
}

include '../api/db_connect.php';

$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stmt = $pdo->prepare("select * from s335141.users_in_rooms u join s335141.rooms r on u.id_room = r.id where u.login_user=:login and r.status IN ('waiting', 'process');");
$stmt->execute(['login' => $_SESSION['user']['login']]);
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html>
	<?php @include './head.tpl'; ?>
	
	<main class="profile">
		<div class='header'>
			<h2>Добро пожаловать,
				<?php 
					echo $_SESSION['user']['login'];
				?>
			</h2>

			<div>
				<span data-show-dialog="change-password-dialog">сменить пароль</span>
				<span class='remove-tokens'>выйти из всех устройств</span>
				<span class='log-out'>выйти из аккаунта</span>
				<button data-show-dialog="rules-dialog"></button>
			</div>

		</div>

		<div class="games">
			<h3>Список комнат, в которых вы находитесь</h3>
			<?php
				echo '<ul class="rooms-list">';
				if ($result){
				foreach ($result as $room) {
					echo '<li>';
					echo '<span>№' . htmlspecialchars($room['id']) . '</span>';
					if ($room['status'] == 'process') {
						echo '<span>Игра началась</span>';
					}
					else {
						echo '<span>Ожидание игроков</span>';
					}
					echo '<span>' . htmlspecialchars($room['time_for_move']) . ' с на ход</span>';
					echo '<button class="back-to-room" data-id-room="' . $room['id'] . '">вернуться в игру</button>';
					echo '</li>';
				}
			}
			else {
				echo '<p>Вы не находитесь ни в одной комнате</p>';
			}
				echo '</ul>';?>

			<div>
				<button data-show-dialog="create-room-dialog">создать игру</button>
				<button onclick="window.location.href = './rooms.php';">существующие игры</button>
			</div>
		</div>

		<?php 
		include './rules.tpl'; 
		include './alertDialog.tpl' ;
		include './createRoomDialog.tpl';
		include './changePasswordDialog.tpl';
		?>
	</main>
	<script type="module" src="../scripts/index.js"></script>
</html>