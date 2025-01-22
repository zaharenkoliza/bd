import { fetchDialog } from "../utils/fetchDialog.js";

export function initAuthForm() {
	const form = document.getElementById('loginForm');

	if (!form) return;

	form.addEventListener('submit', function (event) {

		event.preventDefault();

		const login = form.querySelector('input[name=login]').value;
		const password = form.querySelector('input[name=password]').value;

		fetch('../api/auth.php', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: `login=${encodeURIComponent(login)}&password=${encodeURIComponent(password)}`
		})
		.then(response => {
			if (!response.ok) {
				return Promise.reject('An error occurred during the request');
			}
			return response.json();
		})
		.then(data => {
			fetchDialog(data.status, data.message);
			console.log(data.message);
			if (data.message === 'success') {
				window.location.href = './rooms.php';  // Переход на страницу профиля
			}
		})
		.catch(error => {
			fetchDialog('Error fetching data:', error);
			console.error(error);
		});
	});
}
