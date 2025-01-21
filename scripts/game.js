import { addListenerForPlayer, addListenersForPlayers } from "./cards.js";
import { winOrLose } from "./game/end.js";

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

const getActionItem = async (card) => {
	try {
		const response = await fetch('../api/item_action_card.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: `card=${encodeURIComponent(card)}`
		});
		if (!response.ok) {
			const errorText = await response.text();
			console.error('Error response:', response.status, errorText);
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
			if (element['rotation'] != 0) {
				div.querySelector('img').classList.add('switch');
			}
			div.classList.remove('empty');
		}
		else {
			console.log(typeId);
		}
	};
}

let isProcessing = false;

const cardInHand = async (data) => {
	if (isProcessing) return;
	isProcessing = true;

	if (!data.cards_in_hand) {
		isProcessing = false;
		return;
	}

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

	isProcessing = false;
}

const playedCards = async ( played_cards, li ) => {
	const allAttributes = li.getAttributeNames();

	for (const attribute of allAttributes) {
		if (attribute.startsWith('data-played-card-')) {
			const cardId = attribute.replace('data-played-card-', '');
			if (!played_cards.includes(Number(cardId))) {
				li.removeAttribute(attribute);
				const item = await getActionItem(cardId);
				if (item.status == 'success') {
					li.classList.remove(`${item.message}`);
				}
			}
		}
	}
	if (played_cards[0] !== null) {
		for (const card of played_cards) {
			const targetAttribute = `data-played-card-${card}`;
			const value = li.getAttribute(targetAttribute);
			if (!value) {
				const item = await getActionItem(card);
				if (item.status == 'success') {
					console.log(item);
					li.setAttribute(targetAttribute, item.message);
					li.classList.add(`${item.message}`);
				}
			}
		}
	}
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
		const { player_id, player_name, played_cards } = player;
		let li = null;

		if (currentPlayers.has(player_id.toString())) {
			li = document.querySelector(`li[data-player-id="${player_id}"]`);
			playedCards(played_cards, li);
			currentPlayers.delete(player_id.toString());
		} else {
			li = document.createElement('li');
			li.setAttribute('data-player-id', player_id);
			li.textContent = player_name;
			ul.appendChild(li);
			addListenerForPlayer(li);
			playedCards(played_cards, li);
		}

		if (player_id == curPlayer) {
			li.classList.add('cur-move');
		}
		else {
			li.classList.remove('cur-move');
		}

		if (player_id == data.you.id_player) {
			li.innerHTML = data.you.name + ' (вы)';
		}
	};

	currentPlayers.forEach((li, playerId) => {
		ul.removeChild(li);
	});
}

const updateTimer = (data) => {
	if (!data.current_move?.end_time) return;
	console.log(data);

	timer.innerHTML = parseTimeToSeconds(data.current_move.end_time);
}

const startGame = ( data ) => {
	gameStatus.game_status = 'process';
	span_game_status.innerHTML = 'Игра началась';

	if (!timerInterval) {
		const timerInterval = setInterval(() => {
			if (Number(timer.innerHTML) - 1 >= 0) {
				timer.innerHTML = Number(timer.innerHTML) - 1;
			}
			else {
				gameState();
			}
		}, 1000);
	} 
	section.classList.remove('waiting');
	drop.classList.remove('waiting');
	document.getElementById('role').innerHTML = data.you.role === 'dwarf' ? 'Гном-золотоискатель' : 'Гном-вредитель';

	document.querySelector(`div[data-x="${9}"][data-y="${1}"]`).querySelector('img').src = `../img/cover.png`;
	document.querySelector(`div[data-x="${9}"][data-y="${3}"]`).querySelector('img').src = `../img/cover.png`;
	document.querySelector(`div[data-x="${9}"][data-y="${5}"]`).querySelector('img').src = `../img/cover.png`;
}

export function gameStateNoFetch( data ) {
	cardOnField(data);
	cardInHand(data);
	players(data);
	updateTimer(data);
	console.log(data);
	if (data.game_status != game_status && data.game_status =='process') {
		startGame(data);
	}
	if (data.game_status != game_status && data.game_status =='win') {
		win(data);
	}
	if (data.game_status != game_status && data.game_status =='lose') {
		lose(data);
	}
	game_status = data.game_status;
}

export function gameState() {
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
		updateTimer(data.info);
		console.log(data);
		if (data.info.game_status != gameStatus.game_status && data.info.game_status =='process') {
			startGame(data.info);
		}
		if (data.info.game_status != gameStatus.game_status && (data.info.game_status =='win' || data.info.game_status =='lose')) {
			winOrLose(data.info);
		}
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
export const timer = document.getElementById('timer');

export let timerInterval = null;
export var game_status = null;

export const gameStatus = {
	game_status: null,
	current_player: null,
	players: []
};

const section = document.querySelector('section.field');
const drop = document.querySelector('.drop-card');

export const span_game_status = document.getElementById('game_status');
span_game_status.innerHTML = 'Ожидание игроков';

gameState();
export let longPolling = setInterval(gameState, 5000);