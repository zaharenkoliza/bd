import { placeCard } from "./makeMove/placeCard.js";
import { playCard } from "./makeMove/playCard.js";
import { secretCard } from "./makeMove/secretCard.js";
import { dropCard } from "./makeMove/dropCard.js";

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

const switchButton = document.getElementById('switch-cards');
const ul = document.querySelector('ul.cards-hand');
export let rot = 0;
switchButton.addEventListener('click', () => {
	rot = rot == 0 ? 180 : 0;
	ul.classList.toggle('switch');
})

