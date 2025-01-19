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
	const curPlayer = data.current_move?.id_player;

	const currentPlayers = new Map();
	ul.querySelectorAll('li').forEach(li => {
		const playerId = li.getAttribute('data-player-id');
		currentPlayers.set(playerId, li);
	});

	for (const player of data.players) {
		const { player_id, player_name } = player;
		let li = null;

		if (currentPlayers.has(player_id.toString())) {
			li = document.querySelector(`li[data-player-id="${player_id}"]`);
			currentPlayers.delete(player_id.toString());
		} else {
			li = document.createElement('li');
			li.setAttribute('data-player-id', player_id);
			li.textContent = player_name;
			ul.appendChild(li);
			addListenerForPlayer(li);
		}

		if (player_id == curPlayer) {
			li.classList.add('cur-move');
		}
		else {
			li.classList.remove('cur-move');
		}
	};

	currentPlayers.forEach((li, playerId) => {
		ul.removeChild(li);
	});
}

const updateTimer = (data) => {
	if (!data) return;

	timer.innerHTML = parseTimeToSeconds(data.end_time);
}

const startGame = () => {
	if (!timerTimeout) {
		const timerTimeout = setTimeout(() => {
			timer.innerHTML = Number(timer.innerHTML) - 1;
		}, 1000);
	}
}

export const gameState = () => {
	fetch('../api/get_game_state.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: `room=${encodeURIComponent(idRoom)}`
	})
	.then(response => response.json())
	.then(data => {
		cardOnField(data.info);
		cardInHand(data.info);
		players(data.info);
		updateTimer(data.info['current_move']);
		console.log(data);
		if (data.info.game_status != game_status && data.info.game_status =='process') {
			startGame();
		}
		game_status = data.info.game_status;
	})
	.catch(error => {
		console.error('Error fetching data:', error);
	});
}

function parseTimeToSeconds(timeString) {
	const [hours, minutes, seconds] = timeString.split(':');

	const totalSeconds = 
		parseInt(hours, 10) * 3600 +
		parseInt(minutes, 10) * 60 +
		parseFloat(seconds);

	return Math.round(totalSeconds);
}


const urlParams = new URLSearchParams(window.location.search);
const idRoom = urlParams.get('room');
const timer = document.getElementById('timer');
let timerTimeout = null;
let game_status = null;

gameState();
setInterval(gameState, 5000);