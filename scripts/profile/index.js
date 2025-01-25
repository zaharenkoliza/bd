import { initBackButton } from "./backToRoom.js";
import { initDeleteTokens } from "./deleteTokens.js";

export function initProfilePage() {
	initDeleteTokens();
	initBackButton();
}