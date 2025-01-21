import { Dialog } from "./dialog.js";
import { initLogOutButton } from "./logOut.js";
import { initNewRoom } from "./newRoom.js";
import { initRegisterForm } from "./register.js";
import { initStartPage } from "./start/index.js";

Dialog.initDialogs();
initNewRoom();
initLogOutButton();
initStartPage();
