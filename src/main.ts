import './index.css';
import './pictures/header-background.png';
import './pictures/textbook.png';
import './pictures/statistics.png';
import './pictures/game.png';
import './pictures/dictionary.png';
import './pictures/favicon.png';
import './pictures/profile-picture.jpg';
import './pictures/git-logo.png';
import './components/create-sidebar/create-sidebar.css';
import createSideBar from './components/create-sidebar/create-sidebar';
import { registration } from './components/auth';


createSideBar();
const SINGBUTTON = document.querySelector('.sign-in-or-log-in-button');

SINGBUTTON.addEventListener('click', registration);