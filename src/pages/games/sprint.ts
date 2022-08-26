import { createLevelsChoose, } from "../../games/sprint-game";
import { auth } from "../../components/auth"
auth();
createLevelsChoose(document.querySelector('.gameHolder'));