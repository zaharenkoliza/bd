export const disable = () => {
	document.querySelector('section.field')?.classList.toggle('waiting');
	// document.querySelector('ul.players-list')?.classList.toggle('waiting');
	document.querySelector('ul.cards-hand')?.classList.toggle('waiting');
	document.querySelector('div.drop-card')?.classList.toggle('waiting');
	document.querySelector('button#switch-cards')?.classList.toggle('waiting');
}