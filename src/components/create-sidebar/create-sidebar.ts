import './create-sidebar.css'

export default function createSideBar(currentPage: 'Main' | 'Textbook' | 'Minigames' | 'Statistics'){
  if(currentPage == 'Main') {
  document.body.innerHTML = `<aside>
  <nav>
    <p>Menu</p>
    <ul>
      <li class="active"><a href="">Main</a></li>
      <li><a href="./pages/textbook.html">Textbook</a></li>
      <li><a href="./pages/minigames.html">Minigames</a></li>
      <li><a href="./pages/statistics.html">Statistics</a></li>
    </ul>
  </nav>
</aside>${document.body.innerHTML}`
  } else if(currentPage == 'Textbook') {
    document.body.innerHTML = `<aside>
    <nav>
      <p>Menu</p>
      <ul>
        <li><a href="../index.html">Main</a></li>
        <li class="active"><a href="./textbook.html">Textbook</a></li>
        <li><a href="./minigames.html">Minigames</a></li>
        <li><a href="./statistics.html">Statistics</a></li>
      </ul>
    </nav>
  </aside>${document.body.innerHTML}`
  } else if(currentPage == 'Minigames') {
    document.body.innerHTML = `<aside>
    <nav>
      <p>Menu</p>
      <ul>
        <li><a href="../index.html">Main</a></li>
        <li><a href="./textbook.html">Textbook</a></li>
        <li class="active"><a href="./minigames.html">Minigames</a></li>
        <li><a href="./statistics.html">Statistics</a></li>
      </ul>
    </nav>
  </aside>${document.body.innerHTML}`
  } else {
    document.body.innerHTML = `<aside>
    <nav>
      <p>Menu</p>
      <ul>
        <li><a href="../index.html">Main</a></li>
        <li><a href="./textbook.html">Textbook</a></li>
        <li><a href="./minigames.html">Minigames</a></li>
        <li class="active"><a href="./statistics.html">Statistics</a></li>
      </ul>
    </nav>
  </aside>${document.body.innerHTML}`
  }
}