import './textbook.css';
import '../../pictures/header-background.png';
import '../../pictures/favicon.png';
import '../../pictures/sprint.png';
import '../../pictures/audio.jpg';
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

let GROUPSBUTTONS: NodeListOf<Element>;

let  ENTEREXITBUTTON: Element;

let GAMELINKS: NodeListOf<Element>;
if(document.querySelector('.sign-in-or-log-in-button')){
  ENTEREXITBUTTON = document.querySelector('.sign-in-or-log-in-button')
  ENTEREXITBUTTON.addEventListener('click', registration);
  document.querySelector('main').innerHTML = `<div class="games-links">
  <button><img src="../pictures/sprint.png">Play to Sprint Game</button>
  <button><img src="../pictures/audio.jpg">Play to Audio Game</button>
  </div>
${document.querySelector('main').innerHTML}`;
  GAMELINKS = document.querySelectorAll('.games-links > button')
  GAMELINKS[0].addEventListener('click', () => {
    window.location.href = window.location.origin + '/pages/sprint.html'
  });
  GAMELINKS[1].addEventListener('click', () => {
    window.location.href = window.location.origin + '/pages/audio.html'
  });
  GROUPSBUTTONS = document.querySelectorAll('.circle-button');
}
else{
  document.querySelector('.groups').classList.add('login')
  document.querySelector('.groups').innerHTML += `
  <button class="circle-button">7</button>`;
  document.querySelector('main').innerHTML = `    <button class="learned-words">Learned Words</button>
  ${document.querySelector('main').innerHTML}`;
  document.querySelector('main').innerHTML = `<div class="games-links">
  <button><img src="../pictures/sprint.png">Play to Sprint Game</button>
  <button><img src="../pictures/audio.jpg">Play to Audio Game</button>
  </div>
${document.querySelector('main').innerHTML}`;
  GAMELINKS = document.querySelectorAll('.games-links > button')
  GAMELINKS[0].addEventListener('click', () => {
    window.location.href = window.location.origin + '/pages/sprint.html'
  });
  GAMELINKS[1].addEventListener('click', () => {
    window.location.href = window.location.origin + '/pages/audio.html'
  });
  GROUPSBUTTONS = document.querySelectorAll('.circle-button');
  document.querySelector('.learned-words').addEventListener('click', () => {
    if(!nextPageButton.hasAttribute('disabled')){
      nextPageButton.classList.remove('active');
      nextPageButton.removeEventListener('click', moveNextPage);
      nextPageButton.setAttribute("disabled", "disabled");

      lastPageButton.classList.remove('active');
      lastPageButton.removeEventListener('click', moveNextPage);
      lastPageButton.setAttribute("disabled", "disabled");
    }
    if(!firstPageButton.hasAttribute('disabled')){
      firstPageButton.classList.remove('active');
      firstPageButton.removeEventListener('click', moveNextPage);
      firstPageButton.setAttribute("disabled", "disabled");

      previousPageButton.classList.remove('active');
      previousPageButton.removeEventListener('click', moveNextPage);
      previousPageButton.setAttribute("disabled", "disabled");
    }
    GROUPSBUTTONS[group].classList.remove('active');
    numberOfPage.innerHTML = '1';
    document.querySelector('.learned-words').classList.add('active');
    page = 0;
    group = 7;
    localStorage.setItem('page', '0');
    localStorage.setItem('group', '0');
    localStorage.setItem('currentPage', '0');
    localStorage.setItem('currentGroup', '0');
    viewWordCards('word-cards-container', 0, page, FilterViewWordCard.learned)
  })
  document.querySelector('.circle-button:nth-of-type(7)').addEventListener('click', () => {
    if(!nextPageButton.hasAttribute('disabled')){
      nextPageButton.classList.remove('active');
      nextPageButton.removeEventListener('click', moveNextPage);
      nextPageButton.setAttribute("disabled", "disabled");

      lastPageButton.classList.remove('active');
      lastPageButton.removeEventListener('click', moveNextPage);
      lastPageButton.setAttribute("disabled", "disabled");
    }
    if(!firstPageButton.hasAttribute('disabled')){
      firstPageButton.classList.remove('active');
      firstPageButton.removeEventListener('click', moveNextPage);
      firstPageButton.setAttribute("disabled", "disabled");

      previousPageButton.classList.remove('active');
      previousPageButton.removeEventListener('click', moveNextPage);
      previousPageButton.setAttribute("disabled", "disabled");
    }
    group == 7 ? document.querySelector('.learned-words').classList.remove('active') : GROUPSBUTTONS[group].classList.remove('active');
    numberOfPage.innerHTML = '1';
    GROUPSBUTTONS[6].classList.add('active');
    page = 0;
    group = 6;
    localStorage.setItem('page', '0');
    localStorage.setItem('group', '6');
    localStorage.setItem('currentPage', '0');
    localStorage.setItem('currentGroup', '6');
    viewWordCards('word-cards-container', 0, page, FilterViewWordCard.difficult)
  })
  ENTEREXITBUTTON = document.querySelector('.log-out');
  ENTEREXITBUTTON.addEventListener('click', logOut);
}

if(!localStorage.getItem('page')){
  localStorage.setItem('page', '0');
  localStorage.setItem('group', '0');
}

let page = Number(localStorage.getItem('page'));
let group = Number(localStorage.getItem('group'));

if(!localStorage.getItem('currentPage')){
  localStorage.setItem('currentPage', `${page}`);
  localStorage.setItem('currentGroup', `${group}`);
}

if(localStorage.getItem('difficultView') === 'true' && document.querySelector('.sign-in-or-log-in-button')){
  viewWordCards('word-cards-container', 0, 0);
  localStorage.setItem('page', '0');
  localStorage.setItem('group', '0');
  localStorage.setItem('currentPage', '0');
  localStorage.setItem('currentGroup', '0');
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

GROUPSBUTTONS[group].classList.add('active')

for(let i = 0; i < 6; i++){
  GROUPSBUTTONS[i].addEventListener('click', () => {
    if(nextPageButton.hasAttribute('disabled')){
      nextPageButton.removeAttribute("disabled");
      nextPageButton.classList.add('active');
      nextPageButton.addEventListener('click', moveNextPage);
      lastPageButton.removeAttribute("disabled");
      lastPageButton.classList.add('active');
      lastPageButton.addEventListener('click', moveLastPage);
    }
    if(!firstPageButton.hasAttribute('disabled')){
      firstPageButton.classList.remove('active');
      firstPageButton.removeEventListener('click', moveNextPage);
      firstPageButton.setAttribute("disabled", "disabled");

      previousPageButton.classList.remove('active');
      previousPageButton.removeEventListener('click', moveNextPage);
      previousPageButton.setAttribute("disabled", "disabled");
    }
    group == 7 ? document.querySelector('.learned-words').classList.remove('active') : GROUPSBUTTONS[group].classList.remove('active');
    group = i;
    page = 0;
    numberOfPage.innerHTML = '1';
    localStorage.setItem('page', '0');
    localStorage.setItem('group', `${group}`);
    localStorage.setItem('currentPage', '0');
    localStorage.setItem('currentGroup', `${group}`);
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
  localStorage.setItem('currentPage', `${page}`);
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
  localStorage.setItem('currentPage', `${page}`);
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
  localStorage.setItem('currentPage', `${page}`);
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
  localStorage.setItem('currentPage', `${page}`);
  viewWordCards('word-cards-container', group, 29);
  numberOfPage.innerHTML = String(page + 1);
}

if(group == 6 || group == 7){
  firstPageButton.setAttribute("disabled", "disabled");
  previousPageButton.setAttribute("disabled", "disabled");
  nextPageButton.setAttribute("disabled", "disabled");
  lastPageButton.setAttribute("disabled", "disabled");
}
else if(page == 0){
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
