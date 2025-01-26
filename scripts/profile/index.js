import { initBackButton } from "./backToRoom.js";
import { initChangePassword } from "./changePassword.js";
import { initDeleteTokens } from "./deleteTokens.js";

export function initProfilePage() {
	initDeleteTokens();
	initBackButton();
	initChangePassword();
}