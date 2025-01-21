export function initNewRoom() {
	const form = document.getElementById('create-room-form');

	if (!form) return;

	form.addEventListener('submit', function (e) {
		e.preventDefault();
		const amountPlayers = form.querySelector('input[name=amount-players]').value;
		const timeMove = form.querySelector('input[name=time-move]').value;
		const messageDiv = document.getElementById('message');

		fetch('../api/new_room.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: `amount_of_players=${encodeURIComponent(amountPlayers)}&time_for_move=${encodeURIComponent(timeMove)}`
		})
		.then(response => {
			if (!response.ok) {
				return Promise.reject('An error occurred during the request');
			}
			return response.json();
		})
		.then(data => {
			console.log(data.message);
			if (data.message === 'success') {
				const idRoom = data['info']['id_room'];
				console.log(idRoom);
				alert("Id созданной вами комнаты:" + idRoom);
				window.location.href = './rooms.php';
			}
		})
		.catch(error => {
			console.error(error);
		});
	});
}