import { Dialog } from "../dialog.js";
import { gameStatus, longPolling, span_game_status, timer } from "./game.js";
import { disable } from "./disable.js";

export const winOrLose = ( data ) => {
	gameStatus.game_status = data.game_status;

	const dialog = document.querySelector('dialog[data-dialog-name="end-dialog"]');

	if (data.you.role == 'dwarf') {
		if (gameStatus.game_status == 'win') {
			dialog.querySelector('.win').classList.remove('hidden');
			span_game_status.innerHTML = 'Игра закончена, гномы-золотоискатели победили';
			dialog.querySelector('.dwarf').classList.remove('hidden');
		}
		else {
			dialog.querySelector('.lose').classList.remove('hidden');
			span_game_status.innerHTML = 'Игра закончена, гномы-вредители победили';
			dialog.querySelector('.sabouter').classList.remove('hidden');
		}
	}
	else {
		if (gameStatus.game_status == 'win') {
			dialog.querySelector('.lose').classList.remove('hidden');
			span_game_status.innerHTML = 'Игра закончена, гномы-золотоискатели победили';
			dialog.querySelector('.dwarf').classList.remove('hidden');
		}
		else {
			dialog.querySelector('.win').classList.remove('hidden');
			span_game_status.innerHTML = 'Игра закончена, гномы-вредители победили';
			dialog.querySelector('.sabouter').classList.remove('hidden');
		}
	}

	clearInterval(gameStatus.timerInterval);
	clearInterval(longPolling);
	timer.innerHTML = '';
	document.querySelector('section.field')?.classList.add('waiting');
	// document.querySelector('ul.players-list')?.classList.toggle('waiting');
	document.querySelector('ul.cards-hand')?.classList.add('waiting');
	document.querySelector('div.drop-card')?.classList.add('waiting');
	document.querySelector('button#switch-cards')?.classList.add('waiting');
	Dialog.openDialog("end-dialog");
}