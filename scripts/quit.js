const button = document.getElementById('quit-button');

button.addEventListener('click', (e) => {
	e.preventDefault();

	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get('room');

	const idRoom = button.dataset.idRoom;
	const messageDiv = document.getElementById('message');

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
		messageDiv.textContent = data.status;
		console.log(data.message);
		if (data.status === 'success') {
			window.location.href = './profile.php';
		}
	})
	.catch(error => {
		messageDiv.textContent = error;
		console.error(error);
	});
});