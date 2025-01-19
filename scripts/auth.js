const form = document.getElementById('loginForm');

form.addEventListener('submit', function (event) {
	// event.preventDefault();
	// const login = form.querySelector('input[name=login]').value;
	// const password = form.querySelector('input[name=password]').value;
	// const messageDiv = document.getElementById('message');

	// const xhr = new XMLHttpRequest();
	// xhr.open('POST', '../api/auth.php', true);
	// xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

	// xhr.onreadystatechange = function () {
	// 	if (xhr.readyState === 4) {
	// 		if (xhr.status === 200) {
	// 			const response = JSON.parse(xhr.responseText);
	// 			messageDiv.textContent = response.message;
	// 			console.log(response.message);
	// 			console.log(response.message === 'success');

	// 			window.location.href = './profile.php';

	// 			// if (response.message === 'success') {
	// 			// 	window.location.href = 'php/profile.php';
	// 			// }
	// 			// if (response.message === 'success') {
	// 			// 	fetch('php/profile.php')
	// 			// 		.then(response => response.text())
	// 			// 		.then(html => {
	// 			// 			document.body.innerHTML = html;
	// 			// 		});
	// 			// }
	// 		} else {
	// 			messageDiv.textContent = 'An error occurred during the request';
	// 		}
	// 	}
	// };

	// xhr.send(`login=${encodeURIComponent(login)}&password=${encodeURIComponent(password)}`);

	event.preventDefault();
    
    const login = form.querySelector('input[name=login]').value;
    const password = form.querySelector('input[name=password]').value;
    const messageDiv = document.getElementById('message');

    const formData = new URLSearchParams();
    formData.append('login', login);
    formData.append('password', password);

    fetch('../api/auth.php', {
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
        messageDiv.textContent = data.message;
        console.log(data.message);
        if (data.message === 'success') {
            window.location.href = './profile.php';  // Переход на страницу профиля
        }
    })
    .catch(error => {
        messageDiv.textContent = error;
        console.error(error);
    });
});