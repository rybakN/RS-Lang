import './create-sidebar.css'

export default function createSideBar(){
  document.body.innerHTML = `<aside>
  <nav>
    <p>Menu</p>
    <ul>
      <li><a href="#">Main</a></li>
      <li><a href="#">Textbook</a></li>
      <li><a href="#">Minigames</a></li>
      <li><a href="#">Statistics</a></li>
    </ul>
  </nav>
</aside>${document.body.innerHTML}`
}