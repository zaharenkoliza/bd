const button = document.getElementById('roomIn');

button.addEventListener('click', function (event) {
	event.preventDefault();

	const xhr = new XMLHttpRequest();
	xhr.open('POST', '../api/available_rooms.php', true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				const response = JSON.parse(xhr.responseText);
				console.log(response.message);
				console.log(response.message === 'success');

				window.location.href = './rooms.php';
			} else {
			}
		}
	};

	xhr.send();
});