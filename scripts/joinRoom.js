const buttons = document.querySelectorAll('.join-room');

buttons.forEach(button => {
	button.addEventListener('click', (e) => {
		e.preventDefault();
		const idRoom = button.dataset.idRoom;
		const name = document.querySelector('input[name="name"]').value.trim();

		if (!name) {
			alert('Введите имя!');
		}
		else {
			fetch('../api/join_room.php', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: `room=${encodeURIComponent(idRoom)}&name=${encodeURIComponent(name)}`
			})
			.then(response => response.json())
			.then(data => {	
				if (data.status === 'success' || data.message === 'You are already in this room') {
					window.location.href = './game.php?room=' + idRoom;
				}
			})
			.catch(error => {
				console.error(error);
			});
		}
	});
});