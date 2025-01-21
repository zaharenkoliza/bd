import { Dialog } from "../dialog.js";
import { game_status, gameStatus, longPolling, span_game_status, timer, timerInterval } from "../game.js";
import { disable } from "./disable.js";

export const winOrLose = ( data ) => {
	console.log(game_status);
	gameStatus.game_status = data.game_status;

	const dialog = document.querySelector('dialog[data-dialog-name="end-dialog"]');

	if (data.you.role == 'dwarf') {
		if (game_status == 'win') {
			dialog.querySelector('.win').remove('hidden');
			span_game_status.innerHTML = 'Игра закончена, гномы-золотоискатели победили';
		}
		else {
			dialog.querySelector('.lose').remove('hidden');
			span_game_status.innerHTML = 'Игра закончена, гномы-вредители победили';
		}
		dialog.querySelector('.dwarf').remove('hidden');
	}
	else {
		if (game_status == 'win') {
			dialog.querySelector('.lose').remove('hidden');
			span_game_status.innerHTML = 'Игра закончена, гномы-золотоискатели победили';
		}
		else {
			dialog.querySelector('.win').remove('hidden');
			span_game_status.innerHTML = 'Игра закончена, гномы-вредители победили';
		}
		dialog.querySelector('.sabouter').remove('hidden');
	}

	clearInterval(timerInterval);
	clearInterval(longPolling);
	timer.innerHTML = '';
	disable();
	Dialog.openDialog(dialog, null);
}