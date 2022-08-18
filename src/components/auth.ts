
export function registration():void {
  removePopUp();
  const backBlack = document.createElement('div');
  document.body.appendChild(backBlack);
  backBlack.classList.add('backBlack');
  backBlack.addEventListener('click',removePopUp);
  const popUp = document.createElement('div');
  document.body.appendChild(popUp);
  popUp.classList.add('popUp');
  popUp.innerHTML = regPopUpHTML;
  const registrationButton = document.querySelector('#registrationButton');
  registrationButton.addEventListener('click', callRegistration)
  const toAuth = document.querySelector('#toAuth');
  toAuth.addEventListener('click', auth)
}
export function auth():void {
  removePopUp();
  const backBlack = document.createElement('div');
  document.body.appendChild(backBlack);
  backBlack.classList.add('backBlack');
  backBlack.addEventListener('click',removePopUp);
  const popUp = document.createElement('div');
  document.body.appendChild(popUp);
  popUp.classList.add('popUp');
  popUp.innerHTML = authPopUpHTML;
  const authButton = document.querySelector('#authButton');
  authButton.addEventListener('click', callAuth)
  const toReg = document.querySelector('#toReg');
  toReg.addEventListener('click', registration)
  }
const regPopUpHTML = `
  <h2>Зарегистрироваться</h2>
  <form>
  <div class="form-group">
      <label for="InputName">Your name</label>
      <input type="text" class="form-control" id="InputName" placeholder="Enter name">
    </div>
    <div class="form-group">
      <label for="InputEmail">Email address</label>
      <input type="email" class="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="Enter email">
    </div>
    <div class="form-group">
      <label for="InputPassword">Password</label>
      <input type="password" class="form-control" id="InputPassword" placeholder="Password">
    </div>
    <button type="submit" class="authButton" id="registrationButton">Submit</button>
  </form>
  <p id="toAuth" class="authLink">Авторизоваться</p>
`
const authPopUpHTML = `
  <h2>Войти</h2>
  <form>
    <div class="form-group">
      <label for="InputEmail">Email address</label>
      <input type="email" class="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="Enter email">
    </div>
    <div class="form-group">
      <label for="InputPassword">Password</label>
      <input type="password" class="form-control" id="InputPassword" placeholder="Password">
    </div>
    <button type="submit" class="authButton" id="authButton">Submit</button>
  </form>
  <p id="toReg" class="authLink">Зарегистрироваться</p>
`

function logIn():void {

}
function logOut():void {

}
async function callRegistration():Promise<void> {
  const nameInput:HTMLInputElement = document.querySelector('#InputName');
  const name = nameInput.value;
  const emailInput:HTMLInputElement = document.querySelector('#InputEmail');
  const email = emailInput.value;
  const passInput:HTMLInputElement = document.querySelector('#InputPassword');
  const pass = passInput.value;
}
async function callAuth():Promise<void> {
  
}
function removePopUp() {
  if (document.querySelector('.popUp')){
    document.querySelector('.popUp').remove();
    document.querySelector('.backBlack').remove();
  }
}

