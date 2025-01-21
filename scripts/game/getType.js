import { idRoom } from "./game.js";

export const getTunnelTypeId = async (card) => {
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

export const getActionTypeId = async (card) => {
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

export const getActionItem = async (card) => {
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