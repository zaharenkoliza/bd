export function initLogOutButton() {
	const buttons = document.getElementsByClassName('log-out');
	
	if (buttons.length === 0) return;
	
	for (let button of buttons) {
		button.addEventListener('click', function() {
			const confirmLogout = confirm('Вы уверены, что хотите выйти из аккаунта?');
			if (confirmLogout) {
				window.location.href = './logOut.php';
			}
		});
	};
}