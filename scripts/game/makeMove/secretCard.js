import { Dialog } from "../../dialog.js";
import { gameStateNoFetch } from "../game.js";

export const secretCard = async (x, y, cardId) => {
	try {
		const response = await fetch('../api/action_card_on_place.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: `card=${encodeURIComponent(cardId)}&x=${encodeURIComponent(x)}&y=${encodeURIComponent(y)}`
		});
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		const data = await response.json();

		if (data.status != 'success') {
			alert(data.message);
		}
		else {
			console.log(data);
			const dialog = document.querySelector('dialog[data-dialog-name="secret-dialog"]');
			dialog.querySelector('img').src = `../img/tunnel_cards/${data.info.secret_card.id_type_card}.png`;
			Dialog.openDialog('secret-dialog');
			console.log(data.info.secret_card);
			gameStateNoFetch(data.info.game);
		}
		console.log(data);
	} catch (error) {
		console.error('Error fetching data:', error);
	}
}