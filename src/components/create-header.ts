import './createheader.css';

export default function createHeader(title: string, isTitle: boolean) {
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
    <button class="sign-in-or-log-in-button">Sign in / Log in</button>
  </header>${document.body.innerHTML}`
}
