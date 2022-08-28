import './textbook.css';
import '../../pictures/header-background.png';
import '../../pictures/favicon.png';
import { registration, logOut } from '../../components/auth';
import createHeader from '../../components/create-header/create-header';

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