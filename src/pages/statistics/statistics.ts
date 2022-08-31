import './statistics.css';
import '../../pictures/header-background.png';
import '../../pictures/favicon.png';
import { registration, logOut } from '../../components/auth';
import createHeader from '../../components/create-header/create-header';
import createSideBar from '../../components/create-sidebar/create-sidebar';
import createFooter from '../../components/create-footer/create-footer';
import Chart from 'chart.js/auto';

createSideBar('Statistics');
createFooter("../../pictures/rs_school_js.svg");
createHeader('Statistics', false);

let  ENTEREXITBUTTON: HTMLElement;
if (document.querySelector('.sign-in-or-log-in-button')) {
  ENTEREXITBUTTON = document.querySelector('.sign-in-or-log-in-button')
  ENTEREXITBUTTON.addEventListener('click', registration);
}
else {
  ENTEREXITBUTTON = document.querySelector('.log-out');
  ENTEREXITBUTTON.addEventListener('click', logOut);
}

let ctx = (document.getElementById('myChart') as HTMLCanvasElement).getContext('2d');
let chart = new Chart(ctx, {
// Тип графика
  type: 'line',

// Создание графиков
  data: {
    // Точки графиков
    labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль'],
    // График
    datasets: [{
      label: 'Мой первый график на Chart.js', // Название
      backgroundColor: 'rgb(255, 99, 132)', // Цвет закраски
      borderColor: 'rgb(255, 99, 132)', // Цвет линии
      data: [0, 10, 5, 2, 20, 30, 45] // Данные каждой точки графика
    }]
  },

// Настройки графиков
  options: {}
});
