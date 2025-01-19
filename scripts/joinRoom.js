const buttons = document.querySelectorAll('.join-room');

buttons.forEach(button => {
	button.addEventListener('click', (e) => {
		e.preventDefault();
		const idRoom = button.dataset.idRoom;
		const name = 'lliza';
		const messageDiv = document.getElementById('message');

		fetch('../api/join_room.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: `room=${encodeURIComponent(idRoom)}&name=${encodeURIComponent(name)}`
		})
		.then(response => response.json())
		.then(data => {
			messageDiv.textContent = data.message;

			if (data.status === 'success' || data.message === 'You are already in this room') {
				window.location.href = './game.php?room=' + idRoom;
			}
		})
		.catch(error => {
			messageDiv.textContent = 'An error occurred during the request';
		});
	});
});