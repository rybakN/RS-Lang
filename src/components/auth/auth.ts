import './auth.css';
import { Api } from "../../api/api";
import { CreateUserBody, SingInRequestBody } from "../../api/typeApi";
export async function registration() {
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
  registrationButton.addEventListener('click', () => { callRegistration() })
  const toAuth = document.querySelector('#toAuth');
  toAuth.addEventListener('click', auth)
}
export async function auth() {
  removePopUp();
  const backBlack = document.createElement('div');
  document.body.appendChild(backBlack);
  backBlack.classList.add('backBlack');
  backBlack.addEventListener('click',() => removePopUp());
  const popUp = document.createElement('div');
  document.body.appendChild(popUp);
  popUp.classList.add('popUp');
  popUp.innerHTML = authPopUpHTML;
  const authButton = document.querySelector('#authButton');
  authButton.addEventListener('click',() => callAuth())
  const toReg = document.querySelector('#toReg');
  toReg.addEventListener('click', registration);
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
    <div class="authButton" id="registrationButton">Submit</div>
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
    <div class="authButton" id="authButton">Submit</div>
  </form>
  <p id="toReg" class="authLink">Зарегистрироваться</p>
`

export function logOut() {
  localStorage.removeItem("userId");
  localStorage.removeItem('userName');
  localStorage.removeItem('userToken');
  localStorage.removeItem('userRefreshToken');
  localStorage.removeItem('userEmail');
  location.reload();
}
async function callRegistration() {
  const nameInput:HTMLInputElement = document.querySelector('#InputName');
  const name = nameInput.value;
  const emailInput:HTMLInputElement = document.querySelector('#InputEmail');
  const email = emailInput.value;
  const passInput:HTMLInputElement = document.querySelector('#InputPassword');
  const pass = passInput.value;
  const body:CreateUserBody = {
    name: name,
    email: email,
    password: pass,
  }
  try {let response = await Api.createUser(body);
    if (!response.name) { 
      alert('регистрация не удалась');
    } else {
        const signInBody:SingInRequestBody = {
          email: email,
          password: pass,
        }
        const signInResp = await Api.singIn(signInBody);
        localStorage.setItem('userId',signInResp.userId);
        localStorage.setItem('userEmail',body.email);
        localStorage.setItem('userName',signInResp.name);
        localStorage.setItem('userToken',signInResp.token);
        localStorage.setItem('userRefreshToken',signInResp.refreshToken);
        alert('Регистрация завершена успешна!');
        removePopUp();
        location.reload();
      }
    console.log(response);
  } catch (err) { 
    alert('пользователь с такими данными уже есть') 
  };  
  
}
async function callAuth():Promise<void> {
  const emailInput:HTMLInputElement = document.querySelector('#InputEmail');
  const email = emailInput.value;
  const passInput:HTMLInputElement = document.querySelector('#InputPassword');
  const pass = passInput.value;
  const signInBody:SingInRequestBody = {
    email: email,
    password: pass,
  }
  try {
    const signInResp = await Api.singIn(signInBody);
      if(signInResp.name) {
        localStorage.setItem('userId',signInResp.userId);
        localStorage.setItem('userEmail',signInBody.email);
        localStorage.setItem('userName',signInResp.name);
        localStorage.setItem('userToken',signInResp.token);
        localStorage.setItem('userRefreshToken',signInResp.refreshToken);
      } else { alert('Что-то пошло не так') };
  } catch {alert('Что-то пошло не так')}
  removePopUp();
  location.reload();
}
function removePopUp() {
  if (document.querySelector('.popUp')){
    document.querySelector('.popUp').remove();
    document.querySelector('.backBlack').remove();
  }
}

