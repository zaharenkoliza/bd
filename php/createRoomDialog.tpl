<dialog data-dialog-name="create-room-dialog">
	<form id="create-room-form" method="POST">
		<h2>Создать комнату</h2>
		<label for="amount-players">
			Введите количество игроков (от 3 до 10)
		</label>
		<input name="amount-players" type="number">
		<label for="time-move">
			Введите время для хода (в секундах)
		</label>
		<input name="time-move" type="number">
		<button type="submit">Создать</button>
	</form>
</dialog>