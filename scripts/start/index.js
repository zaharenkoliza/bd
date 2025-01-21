import { initAuthForm } from "./auth.js";
import { initRegisterForm } from "./register.js";

export function initStartPage() {
	initRegisterForm();
	initAuthForm();
}