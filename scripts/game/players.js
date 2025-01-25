import { addListenerForPlayer } from "./cards.js";
import { getActionItem } from "./getType.js";

const playedCards = async ( played_cards, li ) => {
	const allAttributes = li.getAttributeNames();

	for (const attribute of allAttributes) {
		if (attribute.startsWith('data-played-card-')) {
			const cardId = attribute.replace('data-played-card-', '');
			if (!played_cards.includes(Number(cardId))) {
				li.removeAttribute(attribute);
				const item = await getActionItem(cardId);
				if (item.status == 'success') {
					li.querySelector(`.extra-icon.${item.message}`)?.remove();
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
					// li.classList.add(`${item.message}`);
					const div = document.createElement('div');
					div.classList.add('extra-icon');
					div.classList.add(`${item.message}`);
					li.appendChild(div);
				}
			}
		}
	}
}

export const players = async (data) => {
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
			if (!li.querySelector('span')) {
				li.innerHTML = '';
				const span = document.createElement('span');
				span.textContent = data.you.name + ' (вы)';
				li.appendChild(span);
			}
		}
	};

	currentPlayers.forEach((li, playerId) => {
		ul.removeChild(li);
	});
}
