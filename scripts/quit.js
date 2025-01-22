const button = document.getElementById('quit-button');

button.addEventListener('click', (e) => {
	e.preventDefault();

	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get('room');

	const idRoom = button.dataset.idRoom;

	const formData = new URLSearchParams();
	formData.append('room', idRoom);

	fetch('../api/quit.php', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: formData.toString()
	})
	.then(response => {
		if (!response.ok) {
			return Promise.reject('An error occurred during the request');
		}
		return response.json();
	})
	.then(data => {
		console.log(data.message);
		if (data.status === 'success') {
			window.location.href = './rooms.php';
		}
	})
	.catch(error => {
		console.error(error);
	});
});