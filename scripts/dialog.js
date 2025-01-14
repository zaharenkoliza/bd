// import { blockPage } from "../../../utils/blockPage";

/**
 * Инициализация диалогов на странице. Выбираются все `dialog[data-dialog-name]`, и назначаются `*[data-show-dialog]` на диалоги с соответствующим именем.
 * 
 * Диалог может находиться в разных состояниях, записываемых в его `data-state`. Состояние диалога влияет на то, какой из его детей с атрибутом `data-state` будет виден.
 * 
 * Для открытия и закрытия диалогов используйте `openDialog(dialogName: string)` и `closeDialog(dialogName: string)`, а для установки состояния — `setState(dialogName: string, stateName: string)`.
 * 
 * Можно подключиться на событие, когда диалог открывается, если на элемент накинуть слушатель события dialog_open.
 * 
 * В диалог можно поместить кнопку, которая его будет закрывать — это должен быть элемент, выбирающийся по `button.close`.
 */
function initDialogs() {
	initDialogOpeners(document.querySelectorAll("[data-show-dialog]"));

	let mouseStartY;
	let mouseCurrentY;

	let dialogs = document.querySelectorAll("dialog");
	dialogs.forEach(dialog => {
		setState(dialog.dataset.dialogName, dialog.dataset.defaultState || "default");

		dialog.addEventListener("mousedown", e => {
			let rect = dialog.getBoundingClientRect();
			let outOfBounds = e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom;
			let closeOnClickSelf = dialog.dataset.closeOnClickSelf && e.target == dialog;

			if (e.target.classList.contains("close") || closeOnClickSelf || outOfBounds) {
				closeDialog(dialog.dataset.dialogName);
			}
		});

		dialog.addEventListener("touchstart", e => {
			let y = e.touches.item(0).clientY;
			let rect = dialog.getBoundingClientRect();

			if (y < rect.top + 80) {
				mouseStartY = y;
			}
		});

		dialog.addEventListener("touchmove", e => {
			mouseCurrentY = e.touches.item(0).clientY;

			if (mouseStartY && mouseCurrentY > mouseStartY + 40) {
				mouseStartY = null;
				closeDialog(dialog.dataset.dialogName);
			}
		});

		dialog.querySelectorAll("button.close").forEach(closer => {
			closer.addEventListener("click", () => {
				closeDialog(dialog.dataset.dialogName);
			});
		});
	});
}

/**
 * Проинициализировать открыватели диалогов на странице. Уже проинициализированные диалоги не будут инициализироваться снова.
 * @param {NodeListOf<Element>} dialogOpeners 
 */
function initDialogOpeners(dialogOpeners) {
	dialogOpeners.forEach(opener => {
		if (opener.hasAttribute("data-init")) {
			return;
		}

		opener.addEventListener("click", () => {
			let dialogName = opener.dataset.showDialog;
			openDialog(dialogName, opener);
			opener.setAttribute("data-init", "");
		});
	});
}

/**
 * Открыть диалог по названию, также можно передать указатель на элемент, который привёл к его открытию, если понадобится.
 * 
 * Здесь бросается событие `dialog_open`, которое содержит в `detail` поля `firstTimeOpen: boolean` (открывается ли диалог впервые) и `opener: HTMLElement?` (указатель на элемент, который привёл к открытию диалога, например кнопка). 
 * @param {string} dialogName
 * @param {HTMLElement?} opener
 * @returns {HTMLDialogElement}
 */
function openDialog(dialogName, opener) {
	let allDialogs = document.querySelectorAll("dialog[data-dialog-name]");
	allDialogs.forEach(dialog => {
		if (dialog.dataset.dialogName !== dialogName) {
			closeDialog(dialog.dataset.dialogName);
		}
	});

	let dialog = $(dialogName);

	if ( !dialog )
	{
		return;
	}

	dialog.removeAttribute("inert");
	setTimeout(() => {
		dialog.showModal();

	}, 1);

	dialog.dispatchEvent(new CustomEvent("dialog_open", {
		detail: {
			firstTimeOpen: !dialog.dataset.hasBeenOpened,
			opener: opener
		}
	}));

	if (!dialog.dataset.hasBeenOpened) {
		dialog.dataset.hasBeenOpened = true;
	}

	blockPage.on();

	return dialog;
}

/**
 * Закрыть диалог по названию.
 * @param {string} dialogName
 * @returns {HTMLDialogElement}
 */
function closeDialog(dialogName) {
	let dialog = $(dialogName);

	dialog.dispatchEvent(new CustomEvent("dialog_close"));

	dialog.close();

	setTimeout(() => {
		dialog.setAttribute("inert", "");
		setState(dialogName, dialog.dataset.defaultState || "default");
	}, 300);

	blockPage.off();

	return dialog;
}

/**
 * Установить состояние диалога, обновляет его содержимое: включает только одного из детей с состоянием такого же названия.
 * @param {string} dialogName 
 * @param {string} stateName 
 */
function setState(dialogName, stateName) {
	let dialog = $(dialogName);

	dialog.dataset.state = stateName;
	dialog.querySelectorAll(`[data-state]:not([data-state="${stateName}"])`).forEach(container => {
		container.classList.add("hide");
	});
	dialog.querySelector(`[data-state="${stateName}"]`)?.classList.remove("hide");
}

/**
 * Возвращает диалог по его названию.
 * @param {string} dialogName
 * @return {HTMLDialogElement}
 */
function $(dialogName) {
	return document.querySelector(`dialog[data-dialog-name="${dialogName}"]`);
}

export const Dialog = {
	initDialogs,
	initDialogOpeners,
	openDialog,
	closeDialog,
	setState,
	$
};
