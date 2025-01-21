import { Dialog } from "../dialog.js";

export function fetchDialog( h2, p ) {
	const alertDialog = document.querySelector('dialog[data-dialog-name="alert-dialog"]');
	alertDialog.querySelector('h2').textContent = h2;
	alertDialog.querySelector('p').textContent = p;
	Dialog.openDialog("alert-dialog");
}