import './textbook.css';
import '../../pictures/header-background.png';
import '../../pictures/favicon.png';
import { registration, logOut } from '../../components/auth';
import createHeader from '../../components/create-header/create-header';
import createSideBar from '../../components/create-sidebar/create-sidebar';
import createFooter from '../../components/create-footer/create-footer';
import { viewWordCards } from '../../components/viewWordCards/viewWordCards';
import { FilterViewWordCard } from '../../components/viewWordCards/typeViewWordCards'
import '../../components/viewWordCards/viewWordCards.css'

createSideBar('Textbook');
createFooter("../../pictures/rs_school_js.svg");
createHeader('Textbook', false);



let  ENTEREXITBUTTON: Element;
if(document.querySelector('.sign-in-or-log-in-button')){
  ENTEREXITBUTTON = document.querySelector('.sign-in-or-log-in-button')
  ENTEREXITBUTTON.addEventListener('click', registration);
}
else{
  document.querySelector('.groups').classList.add('login')
  document.querySelector('.groups').innerHTML += `
  <button class="circle-button">7</button>`;
  document.querySelector('.circle-button:nth-of-type(7)').addEventListener('click', () => {
    page = 0;
    group = 0;
    localStorage.setItem('page', '0');
    localStorage.setItem('group', '0');
    viewWordCards('word-cards-container', page, group, FilterViewWordCard.difficult)
  })
  ENTEREXITBUTTON = document.querySelector('.log-out');
  ENTEREXITBUTTON.addEventListener('click', logOut);
}

if(!localStorage.getItem('page')){
  localStorage.setItem('page', '0');
  localStorage.setItem('group', '0');
  localStorage.setItem('difficultView', 'false');
}

let page = Number(localStorage.getItem('page'));
let group = Number(localStorage.getItem('group'));

if(localStorage.getItem('difficultView') === 'true' && document.querySelector('.sign-in-or-log-in-button')){
  viewWordCards('word-cards-container', 0, 0);
  localStorage.setItem('page', '0');
  localStorage.setItem('group', '0');
  localStorage.setItem('difficultView', 'false');
  page = 0;
  group = 0;
}
else if(localStorage.getItem('difficultView') === 'true'){
  viewWordCards('word-cards-container', page, group, FilterViewWordCard.difficult);
}
else {
  viewWordCards('word-cards-container', page, group);
}

const GROUPSBUTTONS = document.querySelectorAll('.circle-button');

GROUPSBUTTONS[group].classList.add('active')

for(let i = 0; i < 6; i++){
  GROUPSBUTTONS[i].addEventListener('click', () => {
    GROUPSBUTTONS[group].classList.remove('active');
    group = i;
    localStorage.setItem('group', `${group}`);
    GROUPSBUTTONS[i].classList.add('active')
    viewWordCards('word-cards-container', 0, i)
  })
}
