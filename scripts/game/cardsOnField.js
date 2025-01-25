import { getTunnelTypeId } from "./getType.js";

export const cardOnField = async (data) => {
	if (!data.cards_on_field) return;

	for (const element of data.cards_on_field) {
		const div = document.querySelector(`div[data-x*="${element['x']}"][data-y*="${element['y']}"]`);
		
		const typeId = await getTunnelTypeId(element['id_card']);
		if (typeId.status == 'success'){
			div.style.backgroundImage = `url('../img/tunnel_cards/${Number(typeId.message)}.png')`;
			if (element['rotation'] != 0) {
				div.classList.add('switch');
			}
			div.classList.remove('empty');
		}
		else {
			console.log(typeId);
		}
	};
}