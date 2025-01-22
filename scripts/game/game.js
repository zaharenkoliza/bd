import { cardOnField } from "./cardsOnField.js";
import { winOrLose } from "./end.js";
import { getTunnelTypeId, getActionTypeId } from "./getType.js";
import { players } from "./players.js";
import { startGame } from "./start.js";

const urlParams = new URLSearchParams(window.location.search);
export const idRoom = urlParams.get('room');
export const timer = document.getElementById('timer');

export const gameStatus = {
	game_status: null,
	timerInterval: null
};

export const span_game_status = document.getElementById('game_status');
span_game_status.innerHTML = 'Ожидание игроков';

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

const updateTimer = (data) => {
	if (!data.current_move?.end_time) return;
	console.log(data);

	timer.innerHTML = parseTimeToSeconds(data.current_move.end_time);
}

export function gameStateNoFetch( data ) {
	cardOnField(data);
	cardInHand(data);
	players(data);
	updateTimer(data);
	console.log(data);
	if (data.game_status != gameStatus.game_status && data.game_status =='process') {
		startGame(data);
	}
	if (data.game_status != gameStatus.game_status && (data.info.game_status =='win' || data.info.game_status =='lose')) {
		winOrLose(data.info);
	}
	gameStatus.game_status = data.game_status;
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
		console.log(gameStatus.game_status);
		if (data.info.game_status != gameStatus.game_status && data.info.game_status =='process') {
			console.log(gameStatus.game_status);
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

gameState();
export let longPolling = setInterval(gameState, 5000);