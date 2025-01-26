<dialog data-dialog-name="change-password-dialog">
	<button class="close"></button>

	<form id="changeForm" method="POST">
		<h2>Сменить пароль</h2>
		<div class='forms'>
			<div class="form-group">
				<input name="login" type="text" placeholder=" " required>
				<label for="login">
					Введите логин
				</label>
			</div>
			<div class="form-group">
				<input name="password" type="password"  placeholder=" " required>
				<label for="password">
					Введите старый пароль
				</label>
			</div>
			<div class="form-group">
				<input name="password-again" type="password" placeholder=" " required>
				<label for="password-again">
					Введите новый пароль
				</label>
			</div>
		</div>
		<button type="submit">сменить</button>
	</form>
</dialog>