import './auth.css';
import { Api } from "../api/api";
import { CreateUserBody, SettingsRequestBody, SingInRequestBody, StatisticRequestBody } from '../api/typeApi';
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
  <h2>Registration</h2>
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
    <div class="authButton" id="registrationButton">Register</div>
  </form>
  <p id="toAuth" class="authLink">Log in your account</p>
`
const authPopUpHTML = `
  <h2>Log in your account</h2>
  <form>
    <div class="form-group">
      <label for="InputEmail">Email address</label>
      <input type="email" class="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="Enter email">
    </div>
    <div class="form-group">
      <label for="InputPassword">Password</label>
      <input type="password" class="form-control" id="InputPassword" placeholder="Password">
    </div>
    <div class="authButton" id="authButton">Log in</div>
  </form>
  <p id="toReg" class="authLink">Registration</p>
`

export function logOut() {
  localStorage.removeItem("userId");
  localStorage.removeItem('userName');
  localStorage.removeItem('userToken');
  localStorage.removeItem('userRefreshToken');
  localStorage.removeItem('userEmail');
  localStorage.clear();
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
      alert('Registration failed');
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
        alert('Registration completed successfully!');
        removePopUp();
        await createUserStatisticsObj(signInResp.userId, signInResp.token);
        await createUserSettingsObj(signInResp.userId, signInResp.token);
        location.reload();
      }
  } catch (err) {
    alert('There is already a user with such data')
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
      } else { alert('Something went wrong') };
  } catch {alert('Something went wrong')}
  removePopUp();
  location.reload();
}
function removePopUp() {
  if (document.querySelector('.popUp')){
    document.querySelector('.popUp').remove();
    document.querySelector('.backBlack').remove();
  }
}

async function createUserStatisticsObj(userId: string, token: string): Promise<void> {
  const date: Date =  new Date();
  const toDay: string =  `${date.getDate()} ${date.getMonth() + 1} ${date.getFullYear()}`;
  const toDayObj = {};
  toDayObj[toDay] = 0;
  const requestBody: StatisticRequestBody = {
    learnedWords: 0,
    optional: {
      sprint: {
        accuracy: 0,
        newWords: 0,
        maxInRow: 0,
        date: '',
        correctToday: 0,
        incorrectToday: 0
      },
      audio: {
        accuracy: 0,
        newWords: 0,
        maxInRow: 0,
        date: '',
        correctToday: 0,
        incorrectToday: 0
      },
      learnedWordsByDays: toDayObj,
      newWordsByDays: toDayObj,
    }
  }
  await Api.upsertUserStatistic(userId, token, requestBody).then();
}

async function createUserSettingsObj(userId: string, token: string): Promise<void> {
  const requestBody: SettingsRequestBody = {
    wordsPerDay: 1,
    optional: {
      translate: 'true'
    }
  }
  await Api.upsertUserSettings(userId, token, requestBody).then();
}
