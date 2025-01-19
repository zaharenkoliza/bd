import { Dialog } from "./dialog.js";
import { initLogOutButton } from "./logOut.js";
import { initNewRoom } from "./newRoom.js";
import { initRegisterForm } from "./register.js";
// import { loadPage } from './load.js';

Dialog.initDialogs();
initNewRoom();
initLogOutButton();
initRegisterForm();
