
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
		<h1>Саботёр</h1>
		<p>онлайн настольная игра</p>
		<div>
			<button data-show-dialog="auth-dialog">войти</button>
			<button>регистрация</button>
			<button>правила</button>
		</div>

		<dialog data-dialog-name="auth-dialog">
		<form id="loginForm" action="api/auth.php" method="POST">
			<h2>Войти</h2>
			<input name="login" type="text">
			<input name="password" type="text">
			<button type="submit">Войти</button>
		</form>
		</dialog>
		<div id="message"></div>
	</main>
	<script type="module" src="../scripts/index.js"></script>
	<script type="module" src="../scripts/auth.js"></script>
</html>