import { gameStateNoFetch } from "../game.js";

export const placeCard = (card, x, y, rot) => {	
	if (!card || !x || !y || !rot) return;

	fetch('../api/check_and_place_card.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: `card=${encodeURIComponent(card)}&x=${encodeURIComponent(x)}&y=${encodeURIComponent(y)}&rot=${encodeURIComponent(rot)}`
	})
	.then(response => response.json())
	.then(data => {
		if (data.status != 'success') {
			alert(data.message);
		}
		else{
			gameStateNoFetch(data.info);
		}
		console.log(data);
	})
	.catch(error => {
		console.error('Error fetching data:', error);
	});
}