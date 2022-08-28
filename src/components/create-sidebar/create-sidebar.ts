import './create-sidebar.css'

export default function createSideBar(currentPage: 'Main' | 'Textbook' | 'Minigames' | 'Statistics'){
  document.body.innerHTML = `<aside>
  <nav>
    <p>Menu</p>
    <ul>
      <li><a href="./pages/index.html">Main</a></li>
      <li><a href="./pages/textbook.html">Textbook</a></li>
      <li><a href="./pages/minigames.html">Minigames</a></li>
      <li><a href="./pages/statistics.html">Statistics</a></li>
    </ul>
  </nav>
</aside>${document.body.innerHTML}`
 switch(currentPage){
  case 'Main':
    document.querySelector('nav li:nth-child(1)').classList.add('active');
    (document.querySelector('nav li:nth-child(1) > a') as HTMLAnchorElement).href = ""
    break;
  case 'Textbook':
    document.querySelector('nav li:nth-child(2)').classList.add('active');
    (document.querySelector('nav li:nth-child(2) > a') as HTMLAnchorElement).href = ""
    break;
  case 'Minigames':
    document.querySelector('nav li:nth-child(3)').classList.add('active');
    (document.querySelector('nav li:nth-child(3) > a') as HTMLAnchorElement).href = ""
    break;
  case 'Statistics':
    document.querySelector('nav li:nth-child(4)').classList.add('active');
    (document.querySelector('nav li:nth-child(4) > a') as HTMLAnchorElement).href = ""
    break;
 }
}