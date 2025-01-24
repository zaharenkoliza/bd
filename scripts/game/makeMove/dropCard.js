import { gameStateNoFetch } from "../game.js";

export const dropCard = (cardId) => {
	fetch('../api/drop_card.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: `card=${encodeURIComponent(cardId)}`
	})
	.then(response => response.json())
	.then(data => {
		if (data.status != 'success') {
			alert(data.message);
		}
		else {
			gameStateNoFetch(data.info);
		}
		console.log(data);
	})
	.catch(error => {
		console.error('Error fetching data:', error);
	});
}