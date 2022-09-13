import { createLevelsChoose, createAudioGame} from "../../games/audio-game";
import { auth } from "../../components/auth"
import { Api } from "../../api/api";
import { registration, logOut } from '../../components/auth';
import createHeader from '../../components/create-header/create-header';
import createSideBar from '../../components/create-sidebar/create-sidebar';

createSideBar('Audio');
createHeader('Audio', false);
let  ENTEREXITBUTTON: Element;
if(document.querySelector('.sign-in-or-log-in-button')){
  ENTEREXITBUTTON = document.querySelector('.sign-in-or-log-in-button')
  ENTEREXITBUTTON.addEventListener('click', registration);
}
else{
  ENTEREXITBUTTON = document.querySelector('.log-out');
  ENTEREXITBUTTON.addEventListener('click', logOut);
}
if (localStorage.getItem('currentPage')) {
  createAudioGame(+localStorage.getItem('currentGroup'), +localStorage.getItem('currentPage'), document.querySelector('.gameHolder'))
} else { createLevelsChoose(document.querySelector('.gameHolder')); }
document.addEventListener('keydown', (e)=>{
if (e.key === '1'){
  document.querySelector("#word1").dispatchEvent(new Event("click"));
}
if (e.key === '2'){
  document.querySelector("#word2").dispatchEvent(new Event("click"));
}
if (e.key === '3'){
  document.querySelector("#word3").dispatchEvent(new Event("click"));
}
if (e.key === '4'){
  document.querySelector("#word4").dispatchEvent(new Event("click"));
}
})
