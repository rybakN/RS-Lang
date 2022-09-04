import './create-sidebar.css';
import { viewWordCards } from '../viewWordCards/viewWordCards';
import { Api } from '../../api/api';
import { SettingsRequestBody, UserSettingsResponse } from '../../api/typeApi';
import { FilterViewWordCard } from '../viewWordCards/typeViewWordCards';

export default function createSideBar(currentPage: 'Main' | 'Textbook' | 'Sprint' | 'Statistics' | 'Audio'){
  if(currentPage == 'Main') {
  document.body.innerHTML = `<aside>
  <nav>
    <p>Menu</p>
    <ul>
      <li class="active"><a href="">Main</a></li>
      <li><a href="./pages/textbook.html">Textbook</a></li>
      <li><a href="./pages/sprint.html">Sprint</a></li>
      <li><a href="./pages/audio.html">Audio</a></li>
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
        <li><a href="./sprint.html">Sprint</a></li>
        <li><a href="./audio.html">Audio</a></li>
        <li><a href="./statistics.html">Statistics</a></li>
      </ul>
    </nav>
  </aside>${document.body.innerHTML}`
  } else if(currentPage == 'Sprint') {
    document.body.innerHTML = `<aside>
    <nav>
      <p>Menu</p>
      <ul>
        <li><a href="../index.html">Main</a></li>
        <li><a href="./textbook.html">Textbook</a></li>
        <li class="active"><a href="./sprint.html">Sprint</a></li>
        <li><a href="./audio.html">Audio</a></li>
        <li><a href="./statistics.html">Statistics</a></li>
      </ul>
    </nav>
  </aside>${document.body.innerHTML}`
  } else if(currentPage == 'Audio') {
    document.body.innerHTML = `<aside>
    <nav>
      <p>Menu</p>
      <ul>
        <li><a href="../index.html">Main</a></li>
        <li><a href="./textbook.html">Textbook</a></li>
        <li><a href="./sprint.html">Sprint</a></li>
        <li class="active"><a href="./audio.html">Audio</a></li>
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
        <li><a href="./sprint.html">Sprint</a></li>
        <li><a href="./audio.html">Audio</a></li>
        <li class="active"><a href="./statistics.html">Statistics</a></li>
      </ul>
    </nav>
  </aside>${document.body.innerHTML}`
  }
  addTranslateOptionBtn(currentPage); // Функция включения/выключения перевода слов в карточках слов.
}

// Функция включения/выключения перевода слов в карточках слов.
async function addTranslateOptionBtn(currentPage: string) {
    let translateWord: string = 'true';
    let checked: string = 'checked';

    if (localStorage.getItem('userId') != null) {
        const userId: string = localStorage.getItem('userId');
        const token: string = localStorage.getItem('userToken');
        const response: UserSettingsResponse = await Api.getUserSettings(userId, token).then()
        localStorage.setItem('translateWord', response.optional.translate);
        checked = response.optional.translate == 'false' ? '' : 'checked';
    } else {
        if (localStorage.getItem('translateWord') != null) {
            if (localStorage.getItem('translateWord') == 'false') {
                checked = '';
            }
        } else {
            localStorage.setItem('translateWord', translateWord);
        }
    }

    const aside: HTMLElement = document.querySelector('aside');
    const btnHTML: HTMLElement = document.createElement('div');
    btnHTML.id = 'translate';
    btnHTML.classList.add('translate');
    aside.append(btnHTML);
    const translateBtnContainer: HTMLElement = document.getElementById('translate');
    translateBtnContainer.innerHTML = `
        <span class="translate__name">Translate words</span>
        <label class="switch">
          <input type="checkbox" ${checked}>
          <span class="slider round" data-name="checkbox"></span>
        </label>`;

    document.addEventListener('click', async (e: MouseEvent) => {
        let stageTranslateWord: string = localStorage.getItem('translateWord');

        if ((e.target as HTMLElement).dataset.name == 'checkbox') {
            let translateValue: string = stageTranslateWord == 'false' ? 'true' : 'false';

            if (localStorage.getItem('userId') != null) {
                const requestBody: SettingsRequestBody = {
                    wordsPerDay: 1,
                    optional: {
                        translate: translateValue
                    }
                };
                const userId: string = localStorage.getItem('userId');
                const token: string = localStorage.getItem('userToken');

                if (currentPage == 'Textbook') {
                    localStorage.setItem('translateWord', translateValue);
                    await Api.upsertUserSettings(userId, token, requestBody);
                    const pageNum: number = Number(localStorage.getItem('page'));
                    const groupNum = Number(localStorage.getItem('group'));
                    if (document.getElementById('word-cards-container').children[0].classList.contains('difficult')) {
                        await viewWordCards('word-cards-container', 0, 0, FilterViewWordCard.difficult).then();
                    } else if (document.getElementById('word-cards-container').children[0].classList.contains('learned')) {
                        viewWordCards('word-cards-container', 0, 0, FilterViewWordCard.learned).then();
                    } else {
                        await viewWordCards('word-cards-container', groupNum, pageNum).then();
                    }
                } else {
                    localStorage.setItem('translateWord', translateValue);
                    await Api.upsertUserSettings(userId, token, requestBody);
                }
            } else {
                if (currentPage == 'Textbook') {
                    localStorage.setItem('translateWord', translateValue);
                    const pageNum: number = Number(localStorage.getItem('page'));
                    const groupNum = Number(localStorage.getItem('group'));
                    await viewWordCards('word-cards-container', groupNum, pageNum).then();
                } else {
                    localStorage.setItem('translateWord', translateValue);
                }
            }

        }
    });
}

