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

		if (y == 9 && (x == 1 || x == 3 || x == 5)) {
			secretCard(x, y, cardId);
		}
		else {
			placeCard(cardId, x, y, 0);
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

const placeCard = (card, x, y, rot = Number(0)) => {
	console.log(card, x, y);
	const messageDiv = document.getElementById('message');

	fetch('../api/check_and_place_card.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: `card=${encodeURIComponent(card)}&x=${encodeURIComponent(x)}&y=${encodeURIComponent(y)}&rot=${encodeURIComponent(0)}`
	})
	.then(response => response.json())
	.then(data => {
		if (data.status != 'success') {
			alert(data.message);
		}
		console.log(data);
	})
	.catch(error => {
		messageDiv.textContent = 'An error occurred during the request';
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
		console.log(data);
	})
	.catch(error => {
		messageDiv.textContent = 'An error occurred during the request';
	});
}

const secretCard = (x, y, cardId) => {
	console.log(x, y, cardId);
	const messageDiv = document.getElementById('message');

	fetch('../api/action_card_on_place.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: `card=${encodeURIComponent(cardId)}&x=${encodeURIComponent(x)}&y=${encodeURIComponent(y)}`
	})
	.then(response => response.json())
	.then(data => {
		if (data.status != 'success') {
			alert(data.message);
		}
		console.log(data);
	})
	.catch(error => {
		messageDiv.textContent = 'An error occurred during the request';
	});
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
		console.log(data);
	})
	.catch(error => {
		messageDiv.textContent = 'An error occurred during the request';
	});
}