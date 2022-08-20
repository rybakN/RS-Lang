import './index.css';
import './pictures/header-background.png';
import './pictures/textbook.png';
import './pictures/statistics.png';
import './pictures/game.png';
import './pictures/dictionary.png';
import './pictures/favicon.png';
import './pictures/profile-picture.jpg';
import './pictures/git-logo.png';
import { registration } from './components/auth';

const SINGBUTTON = document.querySelector('.sign-in-or-log-in-button');

SINGBUTTON.addEventListener('click', registration);