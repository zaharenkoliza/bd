import { gameStateNoFetch } from "../game.js";

export const playCard = (card, playerId) => {

	fetch('../api/play_card_on_player.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: `card=${encodeURIComponent(card)}&player=${encodeURIComponent(playerId)}`
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