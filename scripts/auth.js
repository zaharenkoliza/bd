const form = document.getElementById('loginForm');

form.addEventListener('submit', function (event) {
	event.preventDefault();
	const login = form.querySelector('input[name=login]').value;
	const password = form.querySelector('input[name=password]').value;
	const messageDiv = document.getElementById('message');

	const xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/auth.php', true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				const response = JSON.parse(xhr.responseText);
				messageDiv.textContent = response.message;
			} else {
				messageDiv.textContent = 'An error occurred during the request';
			}
		}
	};

	xhr.send(`login=${encodeURIComponent(login)}&password=${encodeURIComponent(password)}`);
});