import './statistics.css';
import '../../pictures/header-background.png';
import '../../pictures/favicon.png';
import { registration, logOut } from '../../components/auth';
import createHeader from '../../components/create-header/create-header';
import createSideBar from '../../components/create-sidebar/create-sidebar';
import createFooter from '../../components/create-footer/create-footer';
import { StatisticsPage } from './statisticsUtils/statisticsUtils';

createSideBar('Statistics');
createFooter("../../pictures/rs_school_js.svg");
createHeader('Statistics', false);
const statistics: StatisticsPage = new StatisticsPage();

let  ENTEREXITBUTTON: HTMLElement;
if (document.querySelector('.sign-in-or-log-in-button')) {
  ENTEREXITBUTTON = document.querySelector('.sign-in-or-log-in-button')
  ENTEREXITBUTTON.addEventListener('click', registration);
}
else {
  ENTEREXITBUTTON = document.querySelector('.log-out');
  ENTEREXITBUTTON.addEventListener('click', logOut);
}

statistics.start().then();
