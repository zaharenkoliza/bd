import { fetchDialog } from "../utils/fetchDialog.js";

export function initChangePassword() {
	const form = document.getElementById('changeForm');

	if (!form) return;

	form.addEventListener('submit', function (e) {
		e.preventDefault();
		const login = form.querySelector('input[name=login]').value;
		const password = form.querySelector('input[name=password]').value;
		const newPassword = form.querySelector('input[name=password-again]').value;

		fetch('../api/change_password.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: `login=${encodeURIComponent(login)}&password=${encodeURIComponent(password)}&newPassword=${encodeURIComponent(newPassword)}`
		})
		.then(response => {
			if (!response.ok) {
				return Promise.reject('An error occurred during the request');
			}
			return response.json();
		})
		.then(data => {
			if (data.status == 'success') {
				fetchDialog('Успех', 'Пароль успешно измненён.');
			}
			else {
				fetchDialog(data.status, data.message);
			}
		})
		.catch(error => {
			fetchDialog('Error fetching data:', error);
			console.error(error);
		});
	});
}