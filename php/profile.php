<?php
session_start();

if (!isset($_SESSION['token'])) {
	header("Location: ./start.php");
}
?>

<!DOCTYPE html>
<html>
	<?php @include './head.tpl'; ?>
	
	<main>
		<div>
		<span>Саботёр</span>
			<button>правила</button>
			<button class='log-out'>выйти из аккаунта</button>
		</div>

		<div>
			<h2> 
				<?php 
					echo $_SESSION['user']['login'];
				?>
			</h2>
			<button data-show-dialog="create-room-dialog">создать игру</button>
			<button id='roomIn'>войти в игру</button>
		</div>

		<?php @include './createRoomDialog.tpl'; ?>

		<div id="message"></div>
	</main>
	<script type="module" src="../scripts/index.js"></script>
	<script type="module" src="../scripts/availableRooms.js"></script>
</html>