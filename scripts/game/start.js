import { gameState, gameStatus, span_game_status } from "./game.js";
import { disable } from "./disable.js";

export const startGame = ( data ) => {
	console.log('a');
	gameStatus.game_status = 'process';
	span_game_status.innerHTML = 'Игра началась';

	if (!gameStatus.timerInterval) {
		gameStatus.timerInterval = setInterval(() => {
			if (Number(timer.innerHTML) - 1 >= 0) {
				timer.innerHTML = Number(timer.innerHTML) - 1;
			}
			else {
				gameState();
			}
		}, 1000);
	} 
	document.querySelector('section.field')?.classList.remove('waiting');
	// document.querySelector('ul.players-list')?.classList.toggle('waiting');
	document.querySelector('ul.cards-hand')?.classList.remove('waiting');
	document.querySelector('div.drop-card')?.classList.remove('waiting');
	document.querySelector('button#switch-cards')?.classList.remove('waiting');
	document.querySelector('.timer')?.classList.remove('waiting');
	document.getElementById('role').innerHTML = data.you.role === 'dwarf' ? 'Вы гном-золотоискатель' : 'Вы гном-вредитель';

	for (let i = 1; i <= 5; i+=2) {
		document.querySelector(`div[data-x="${9}"][data-y="${i}"]`).style.backgroundImage = `url('../img/cover.png')`;
	}
}