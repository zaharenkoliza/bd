<dialog data-dialog-name="create-room-dialog">
	<form id="create-room-form" method="POST">
		<h2>Создать комнату</h2>
		<label for="amount-players">
			Введите количество игроков (от 3 до 10)
			<input name="amount-players" type="number">
		</label>
		<label for="time-move">
			Введите время для хода (в секундах)
			<input name="time-move" type="number">
		</label>
		<button type="submit">Создать</button>
	</form>
</dialog>