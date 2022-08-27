import './index.css';
import './pictures/header-background.png';
import './pictures/textbook.png';
import './pictures/statistics.png';
import './pictures/game.png';
import './pictures/dictionary.png';
import './pictures/favicon.png';
import './pictures/profile-picture.jpg';
import './pictures/git-logo.png';
import { registration, logOut } from './components/auth';
import createHeader from './components/create-header/create-header';
import createSideBar from './components/create-sidebar/create-sidebar';
import createFooter from './components/create-footer/create-footer'

createSideBar();
createFooter("./pictures/rs_school_js.svg");
createHeader('Rs Lang', true);

let  ENTEREXITBUTTON: Element;
if(document.querySelector('.sign-in-or-log-in-button')){
  ENTEREXITBUTTON = document.querySelector('.sign-in-or-log-in-button')
  ENTEREXITBUTTON.addEventListener('click', registration);
}
else{
  ENTEREXITBUTTON = document.querySelector('.log-out');
  ENTEREXITBUTTON.addEventListener('click', logOut);
}

document.querySelector('aside li:nth-child(1)').classList.add('active');
