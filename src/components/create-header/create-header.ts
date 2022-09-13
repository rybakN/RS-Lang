import './createheader.css';

export default function createHeader(title: string, isTitle: boolean): void {
  document.body.innerHTML = `  <header>
    <div class="title-with-description">
      <h1>${title}</h1>${isTitle ? `
      <div><span>One of the best online textbooks for learning english :)</span></div>
      ` : ''}
    </div>
    <div class="gamburger-menu">
      <div></div>
      <div></div>
      <div></div>
    </div>
    ${localStorage.getItem('userName') ? `<div class="user-information"><button class="log-out">Log out</button>
    <p>Name: ${localStorage.getItem('userName')}</p>
    <p>Email: ${localStorage.getItem('userEmail')}</p>
    </div>
    ` : '<button class="sign-in-or-log-in-button">Log in / Registration</button>'}
  </header>${document.body.innerHTML}`;
  document.querySelector('.gamburger-menu').addEventListener('click', () => {
    document.querySelector('aside').classList.toggle('active');
    document.querySelector('.gamburger-menu').classList.toggle('active');
  })
}
