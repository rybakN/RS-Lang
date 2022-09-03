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
    viewWordCards('word-cards-container', group, page, FilterViewWordCard.difficult)
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
  viewWordCards('word-cards-container', group, page, FilterViewWordCard.difficult);
}
else {
  viewWordCards('word-cards-container', group, page);
}

const GROUPSBUTTONS = document.querySelectorAll('.circle-button');

GROUPSBUTTONS[group].classList.add('active')

for(let i = 0; i < 6; i++){
  GROUPSBUTTONS[i].addEventListener('click', () => {
    GROUPSBUTTONS[group].classList.remove('active');
    group = i;
    page = 0;
    localStorage.setItem('page', '0');
    localStorage.setItem('group', `${group}`);
    GROUPSBUTTONS[i].classList.add('active')
    viewWordCards('word-cards-container', i, 0)
  })
}

const numberOfPage = document.querySelector('.number-of-page');
numberOfPage.innerHTML = String(page + 1);

const firstPageButton = document.querySelector('.first-page');
const previousPageButton = document.querySelector('.previous-page');
const nextPageButton = document.querySelector('.next-page');
const lastPageButton = document.querySelector('.last-page');


const moveFirstPage = () => {
  page = 0;
  if(nextPageButton.hasAttribute('disabled')){
    nextPageButton.removeAttribute("disabled");
    nextPageButton.classList.add('active');
    nextPageButton.addEventListener('click', moveNextPage);
    lastPageButton.removeAttribute("disabled");
    lastPageButton.classList.add('active');
    lastPageButton.addEventListener('click', moveLastPage);
  }
  firstPageButton.classList.remove('active');
  firstPageButton.removeEventListener('click', moveNextPage);
  firstPageButton.setAttribute("disabled", "disabled");

  previousPageButton.classList.remove('active');
  previousPageButton.removeEventListener('click', moveNextPage);
  previousPageButton.setAttribute("disabled", "disabled");
  localStorage.setItem('page', `${page}`);
  viewWordCards('word-cards-container', group, 0);
  numberOfPage.innerHTML = String(page + 1);
}

const movePreviousPage = () => {
  page--;
  if(nextPageButton.hasAttribute('disabled')){
    nextPageButton.removeAttribute("disabled");
    nextPageButton.classList.add('active');
    nextPageButton.addEventListener('click', moveNextPage);
    lastPageButton.removeAttribute("disabled");
    lastPageButton.classList.add('active');
    lastPageButton.addEventListener('click', moveLastPage);
  }
  if(page === 0){
    firstPageButton.classList.remove('active');
    firstPageButton.removeEventListener('click', moveNextPage);
    firstPageButton.setAttribute("disabled", "disabled");

    previousPageButton.classList.remove('active');
    previousPageButton.removeEventListener('click', moveNextPage);
    previousPageButton.setAttribute("disabled", "disabled");
  }
  localStorage.setItem('page', `${page}`);
  viewWordCards('word-cards-container', group, page);
  numberOfPage.innerHTML = String(page + 1);
}

const moveNextPage = () => {
  page++;
  if(firstPageButton.hasAttribute('disabled')){
    firstPageButton.removeAttribute("disabled");
    firstPageButton.classList.add('active');
    firstPageButton.addEventListener('click', moveFirstPage);
    previousPageButton.removeAttribute("disabled");
    previousPageButton.classList.add('active');
    previousPageButton.addEventListener('click', movePreviousPage);
  }
  if(page === 29){
    nextPageButton.classList.remove('active');
    nextPageButton.removeEventListener('click', moveNextPage);
    nextPageButton.setAttribute("disabled", "disabled");

    lastPageButton.classList.remove('active');
    lastPageButton.removeEventListener('click', moveNextPage);
    lastPageButton.setAttribute("disabled", "disabled");
  }
  localStorage.setItem('page', `${page}`);
  viewWordCards('word-cards-container', group, page);
  numberOfPage.innerHTML = String(page + 1);
}

const moveLastPage = () => {
  page = 29;
  if(firstPageButton.hasAttribute('disabled')){
    firstPageButton.removeAttribute("disabled");
    firstPageButton.classList.add('active');
    firstPageButton.addEventListener('click', moveFirstPage);
    previousPageButton.removeAttribute("disabled");
    previousPageButton.classList.add('active');
    previousPageButton.addEventListener('click', movePreviousPage);
  }
  nextPageButton.classList.remove('active');
  nextPageButton.removeEventListener('click', moveNextPage);
  nextPageButton.setAttribute("disabled", "disabled");

  lastPageButton.classList.remove('active');
  lastPageButton.removeEventListener('click', moveNextPage);
  lastPageButton.setAttribute("disabled", "disabled");
  localStorage.setItem('page', `${page}`);
  viewWordCards('word-cards-container', group, 29);
  numberOfPage.innerHTML = String(page + 1);
}


if(page == 0){
  firstPageButton.setAttribute("disabled", "disabled");
  previousPageButton.setAttribute("disabled", "disabled");
  nextPageButton.classList.add('active');
  nextPageButton.addEventListener('click', moveNextPage);

  lastPageButton.classList.add('active');
  lastPageButton.addEventListener('click', moveLastPage);
}
else if(page > 0 && page < 29){
  firstPageButton.classList.add('active');
  firstPageButton.addEventListener('click', moveFirstPage);

  previousPageButton.classList.add('active');
  previousPageButton.addEventListener('click', movePreviousPage);

  nextPageButton.classList.add('active');
  nextPageButton.addEventListener('click', moveNextPage);

  lastPageButton.classList.add('active');
  lastPageButton.addEventListener('click', moveLastPage);
}
else{
  firstPageButton.classList.add('active');
  firstPageButton.addEventListener('click', moveFirstPage);

  previousPageButton.classList.add('active');
  previousPageButton.addEventListener('click', movePreviousPage);

  nextPageButton.setAttribute("disabled", "disabled");
  lastPageButton.setAttribute("disabled", "disabled");
}
