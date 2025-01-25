import { fetchDialog } from "../utils/fetchDialog.js";

export const initDeleteTokens = () => {
	const button = document.querySelector('.remove-tokens');

	if (!button) return;

	button.addEventListener('click', () => {
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
			if (data.status === 'success' || data.message === 'You are already in this room') {
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