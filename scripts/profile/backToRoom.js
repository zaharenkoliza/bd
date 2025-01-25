export const initBackButton = () => {
	const buttons = document.querySelectorAll('.back-to-room');
	console.log(buttons);

	if (!buttons.length) return;

	buttons.forEach(button => {
		button.addEventListener('click', (e) => {
			e.preventDefault();
			const idRoom = button.dataset.idRoom;
			window.location.href = './game.php?room=' + idRoom;
		})
	});

}