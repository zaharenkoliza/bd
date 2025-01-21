import { gameStatus, span_game_status, timerInterval } from "../game.js";
import { disable } from "./disable.js";

export const startGame = ( data ) => {
	gameStatus.game_status = 'process';
	span_game_status.innerHTML = 'Игра началась';

	if (!timerInterval) {
		timerInterval = setInterval(() => {
			if (Number(timer.innerHTML) - 1 >= 0) {
				timer.innerHTML = Number(timer.innerHTML) - 1;
			}
			else {
				gameState();
			}
		}, 1000);
	} 
	disable();
	document.getElementById('role').innerHTML = data.you.role === 'dwarf' ? 'Гном-золотоискатель' : 'Гном-вредитель';

	for (i = 1; i <= 5; i+=2) {
		document.querySelector(`div[data-x="${9}"][data-y="${i}"]`).querySelector('img').src = `../img/cover.png`;
	}
}