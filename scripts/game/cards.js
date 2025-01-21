import { gameStateNoFetch } from "./game.js";
import { Dialog } from "../dialog.js";

const cards = document.querySelector('.cards-hand');
const gameField = document.querySelector('section.field');
const drop = document.querySelector('.drop-card');

gameField.querySelectorAll('div').forEach(place => {
	place.addEventListener('dragover', (e) => {
		e.preventDefault();
		place.classList.add('drag-on');
	});

	place.addEventListener('dragleave', (event) => {
		place.classList.remove('drag-on');
	});

	place.addEventListener('drop', (e) => {
		e.preventDefault();

		place.classList.remove('drag-on');
	
		const cardId = e.dataTransfer.getData('cardId');
		console.log(cardId);
		const card = document.querySelector(`li[data-card-id="${cardId}"`);

		const x = place.dataset.x;
		const y = place.dataset.y;

		if (x == 9 && (y == 1 || y == 3 || y == 5)) {
			secretCard(x, y, cardId);
		}
		else {
			placeCard(cardId, x, y, rot);
		}

		card.setAttribute('draggable', 'false');
	});
});

drop.addEventListener('dragover', (e) => {
	e.preventDefault();
	drop.classList.add('drag-on');
});

drop.addEventListener('dragleave', (event) => {
	drop.classList.remove('drag-on');
});

drop.addEventListener('drop', (e) => {
	e.preventDefault();

	drop.classList.remove('drag-on');

	const cardId = e.dataTransfer.getData('cardId');
	const card = document.querySelector(`li[data-card-id="${cardId}"`);

	dropCard(cardId);

	card.setAttribute('draggable', 'false');
});

export const addListenersForPlayers = () => {
	const players = document.querySelector('ul.players-list');

	if (!players) return;

	players.querySelectorAll('li').forEach(player => {
		player.addEventListener('dragover', (e) => {
			e.preventDefault();
			player.classList.add('drag-on');
		});
	
		player.addEventListener('dragleave', (event) => {
			player.classList.remove('drag-on');
		});
	
		player.addEventListener('drop', (e) => {
			e.preventDefault();
	
			player.classList.remove('drag-on');
		
			const playerId = player.dataset.playerId;
			const cardId = e.dataTransfer.getData('cardId');
			const card = document.querySelector(`li[data-card-id="${cardId}"`);
	
			playCard(cardId, playerId);
	
			card.setAttribute('draggable', 'false');
		});
	});
}

export const addListenerForPlayer = (li) => {
	if (!li) return;

	li.addEventListener('dragover', (e) => {
		e.preventDefault();
		li.classList.add('drag-on');
	});

	li.addEventListener('dragleave', (event) => {
		li.classList.remove('drag-on');
	});

	li.addEventListener('drop', (e) => {
		e.preventDefault();

		li.classList.remove('drag-on');
	
		const playerId = li.dataset.playerId;
		const cardId = e.dataTransfer.getData('cardId');
		console.log(cardId);
		const card = document.querySelector(`li[data-card-id="${cardId}"`);

		playCard(cardId, playerId);

		card.setAttribute('draggable', 'false');
	});
}

const placeCard = (card, x, y, rot) => {
	console.log(card, x, y);
	
	if (!card || !x || !y) return;

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

const playCard = (card, playerId) => {
	console.log(card, playerId);
	const messageDiv = document.getElementById('message');

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

const secretCard = async (x, y, cardId) => {
	console.log(x, y, cardId);

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
			const dialog = document.querySelector('dialog[data-dialog-name="secret-dialog"]');
			dialog.querySelector('img').src = `../img/tunnel_cards/${data.secret_card.id_type_card}.png`;
			Dialog.openDialog(secret-dialog);
			console.log(data.info.secret_card);
			gameStateNoFetch(data.info);
		}
		console.log(data);
	} catch (error) {
		console.error('Error fetching data:', error);
	}
}

const dropCard = (cardId) => {
	console.log(cardId);
	const messageDiv = document.getElementById('message');

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

const switchButton = document.getElementById('switch-cards');
const ul = document.querySelector('ul.cards-hand');
export let rot = 0;
switchButton.addEventListener('click', () => {
	rot = rot == 0 ? 180 : 0;
	ul.classList.toggle('switch');
})

