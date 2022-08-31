import { createLevelsChoose, } from "../../games/sprint-game";
import { auth } from "../../components/auth"
import { registration, logOut } from '../../components/auth';
import createHeader from '../../components/create-header/create-header';
import createSideBar from '../../components/create-sidebar/create-sidebar';
import createFooter from '../../components/create-footer/create-footer'
createSideBar('Textbook');
createFooter("pictures/rs_school_js.svg");
createHeader('Textbook', false);

let  ENTEREXITBUTTON: Element;
if(document.querySelector('.sign-in-or-log-in-button')){
  ENTEREXITBUTTON = document.querySelector('.sign-in-or-log-in-button')
  ENTEREXITBUTTON.addEventListener('click', registration);
}
else{
  ENTEREXITBUTTON = document.querySelector('.log-out');
  ENTEREXITBUTTON.addEventListener('click', logOut);
}
createLevelsChoose(document.querySelector('.gameHolder'));
let today = new Date();
console.log(`${today.getDate()} ${today.getMonth()} ${today.getFullYear()}`);