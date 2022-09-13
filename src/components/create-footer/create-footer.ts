import './create-footer.css';
import '../../pictures/rs_school_js.svg';

export default function createFooter(pathForPictures: string): void{
  document.body.innerHTML += `<footer>
    <span>© 2022</span>
    <div class="team-footer">
      <a href="https://github.com/rybakn">rybakn</a>
      <a href="https://github.com/tihohohodka">tihohohodka</a>
      <a href="https://github.com/alekprogrammer">alekprogrammer</a>
    </div>
    <a href="https://rs.school/js/"><img src="${pathForPictures}"></a>
  </footer>`
}