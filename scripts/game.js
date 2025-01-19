import { addListenerForPlayer, addListenersForPlayers } from "./cards.js";

const getTunnelTypeId = async (card) => {
	const messageDiv = document.getElementById('message');

	try {
		const response = await fetch('../api/type_tunnel_card.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: `card=${encodeURIComponent(card)}&room=${encodeURIComponent(idRoom)}`
		});
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		const data = await response.json();
		return data;
	} catch (error) {
		messageDiv.textContent = 'An error occurred during the request';
		console.error('Error fetching data:', error);
		return false;
	}
}

const getActionTypeId = async (card) => {
	const messageDiv = document.getElementById('message');

	try {
		const response = await fetch('../api/type_action_card.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: `card=${encodeURIComponent(card)}&room=${encodeURIComponent(idRoom)}`
		});
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		const data = await response.json();
		return data;
	} catch (error) {
		messageDiv.textContent = 'An error occurred during the request';
		console.error('Error fetching data:', error);
		return false;
	}
}
const cardOnField = async (data) => {
	if (!data.cards_on_field) return;

	for (const element of data.cards_on_field) {
		const div = document.querySelector(`div[data-x*="${element['x']}"][data-y*="${element['y']}"]`);
		
		const typeId = await getTunnelTypeId(element['id_card']);
		if (typeId.status == 'success'){
			div.querySelector('img').src = `../img/tunnel_cards/${Number(typeId.message)}.png`;
			div.classList.remove('empty');
		}
		else {
			console.log(typeId);
		}
	};
}

const cardInHand = async (data) => {
	if (!data.cards_in_hand) return;

	const hand = document.querySelector('ul.cards-hand');

	const currentCards = new Map();
	hand.querySelectorAll('li').forEach(li => {
		const cardId = li.getAttribute('data-card-id');
		currentCards.set(cardId, li);
	});

	for (const cardId of data.cards_in_hand) {
		if (currentCards.has(cardId.toString())) {
			currentCards.delete(cardId.toString());
		} else {
			const li = document.createElement('li');
			li.setAttribute('data-card-id', cardId);
			const img = document.createElement('img');
			li.addEventListener('dragstart', (e) => {
				e.dataTransfer.setData('cardId', cardId);
			});
			li.appendChild(img);
			
			let typeId = await getActionTypeId(cardId);
			if (typeId.status == 'success') {
				img.src = `../img/action_cards/${Number(typeId.message)}.png`;
			} else {
				typeId = await getTunnelTypeId(cardId);
				if (typeId.status == 'success') {
					img.src = `../img/tunnel_cards/${typeId.message}.png`;
				}
			}
			hand.appendChild(li);
		}
	}

	currentCards.forEach((li, cardId) => {
		hand.removeChild(li);
	});

	// addListenersForCards();
}

const players = async (data) => {
	if (!data.players) return;

	const ul = document.querySelector('ul.players-list');

	const currentPlayers = new Map();
	ul.querySelectorAll('li').forEach(li => {
		const playerId = li.getAttribute('data-player-id');
		currentPlayers.set(playerId, li);
	});

	for (const player of data.players) {
		const { player_id, player_name } = player;

		if (currentPlayers.has(player_id.toString())) {
			currentPlayers.delete(player_id.toString());
		} else {
			const li = document.createElement('li');
			li.setAttribute('data-player-id', player_id);
			li.textContent = player_name;
			ul.appendChild(li);
			addListenerForPlayer(li);
		}
	};

	currentPlayers.forEach((li, playerId) => {
		ul.removeChild(li);
	});
}

const gameState = () => {
	const name = 'lliza';
	const messageDiv = document.getElementById('message');

	fetch('../api/get_game_state.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: `room=${encodeURIComponent(idRoom)}`
	})
	.then(response => response.json())
	.then(data => {
		// messageDiv.textContent = JSON.stringify(data.info);
		cardOnField(data.info);
		cardInHand(data.info);
		players(data.info);
	})
	.catch(error => {
		messageDiv.textContent = 'An error occurred during the request';
	});
}

const urlParams = new URLSearchParams(window.location.search);
const idRoom = urlParams.get('room');

gameState();
setInterval(gameState, 5000);