import { Api } from "../api/api"
function getRandomNumber(max:number):number{
    let number = Math.round(Math.random() * (max - 1) + 1);
    return number
}
function fiftyFifty() {
    let chance:boolean = 0.5 > Math.random();
    return chance
}

const levelHolder = `
    <div class="levelHolder">
        <div class="difficultLevel" id="level1">1</div>
        <div class="difficultLevel" id="level2">2</div>
        <div class="difficultLevel" id="level3">3</div>
        <div class="difficultLevel" id="level4">4</div>
        <div class="difficultLevel" id="level5">5</div>
        <div class="difficultLevel" id="level6">6</div>
    </div>
`

export function createLevelsChoose(parent:HTMLElement){
    const container = document.createElement('div');
    container.innerHTML=levelHolder;
    parent.appendChild(container);
    const level1But = document.querySelector('#level1');
    level1But.addEventListener('click', () => createSprintGame(1, getRandomNumber(30), parent))

}

async function createSprintGame(group:number, page:number, parent:HTMLElement) {
    const words = await Api.getWords(group, page);
    console.log(words[getRandomNumber(21)-1].word);
    console.log(words[getRandomNumber(21)-1].wordTranslate);
    console.log(fiftyFifty());
}