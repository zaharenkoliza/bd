import { fetchDialog } from "../utils/fetchDialog.js";

export const initDeleteTokens = () => {
	const button = document.querySelector('.remove-tokens');

	if (!button) return;

	button.addEventListener('click', () => {

		const confirmLogout = confirm('Вы уверены, что хотите выйти из всех аккаунтов?');
		if (!confirmLogout) {
			return;
		}

		fetch('../api/remove_tokens.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: ``
		})
		.then(response => response.json())
		.then(data => {	
			console.log(data);
			if (data.status === 'success') {
				form.querySelector('button').textContent = 'Выход...';
				window.location.href = './start.php';
			}
			else {
				fetchDialog(data.status, data.message);
			}
		})
		.catch(error => {
			console.error(error);
		});
	});
}