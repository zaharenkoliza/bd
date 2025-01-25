<dialog data-dialog-name="create-room-dialog">
	<button class="close"></button>
	<form id="create-room-form" method="POST">
		<h2>Создать комнату</h2>
		<div class="form-group">
			<input name="time-move" type="number" placeholder=" " required>
			<label for="time-move">
				Введите время для хода (в секундах)
			</label>
		</div>
		<div class="form-group">
			<input name="amount-players" type="number" placeholder=" " required>
			<label for="amount-players">
				Введите количество игроков (от 3 до 10)
			</label>
		</div>
		<button type="submit">Создать</button>
	</form>
</dialog>