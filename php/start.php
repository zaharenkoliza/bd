
<!DOCTYPE html>
<html>
	<?php @include './head.tpl'; ?>
	
	<main>
		<h1>Саботёр</h1>
		<p>онлайн настольная игра</p>
		<div>
			<button data-show-dialog="auth-dialog">войти</button>
			<button data-show-dialog="register-dialog">регистрация</button>
			<button>правила</button>
		</div>

		<dialog data-dialog-name="auth-dialog">
			<form id="loginForm" method="POST">
				<h2>Войти</h2>
				<input name="login" type="text">
				<input name="password" type="text">
				<button type="submit">Войти</button>
			</form>
		</dialog>

		<dialog data-dialog-name="register-dialog">
			<form id="registerForm" method="POST">
				<h2>Регистрация</h2>
				<input name="login" type="text">
				<input name="password" type="text">
				<button type="submit">Зарегистрироваться</button>
			</form>
		</dialog>
		<div id="message"></div>
	</main>
	<script type="module" src="../scripts/index.js"></script>
	<script type="module" src="../scripts/auth.js"></script>
</html>