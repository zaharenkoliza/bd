import { Dialog } from "./dialog.js";
import { initLogOutButton } from "./logOut.js";
import { initNewRoom } from "./newRoom.js";
import { initStartPage } from "./start/index.js";
import { initProfilePage } from "./profile/index.js";

Dialog.initDialogs();
initNewRoom();
initLogOutButton();
initStartPage();
initProfilePage();
