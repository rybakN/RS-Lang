import { Api } from "../api/api"
import './sprint-game.css';
import '../pictures/audio.png'
import { Word,Filter,AndCondition,UserWordFilter } from "../api/typeApi";

let rightCount = 0;
let wrongCount = 0;
let rightWords = new Set<string>();
let wrongWords = new Set<string>();
let thisGameWords;
function getRandomNumber(max:number):number{
    let number = Math.round(Math.random() * (max - 1) + 1);
    return number
}
function sixtyFourty() {
    let chance:boolean = 0.6 >= Math.random();
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
let wrongWordsList='';
async function createWrongWordsList(){
    let numberList = 0;
    for (let value of wrongWords){
        numberList+=1;
        const word:Word = await Api.getWord(value)
        wrongWordsList+=`
        <div class="wrongWord">
            <img class="musicPlay" id="wrongMusic${numberList.toString()}" src="./pictures/audio.png">
            <p class ="wrongWordEng">${word.word}</p>
            <p class ="wrongWordRus">${word.wordTranslate}</p>
        </div>
        `
    }
}

export function createLevelsChoose(parent:HTMLElement){
    const container = document.createElement('div');
    container.innerHTML=levelHolder;
    parent.appendChild(container);
    const level1But = document.querySelector('#level1');
    level1But.addEventListener('click', () => {
        createSprintGame(1, getRandomNumber(30), parent);
        container.remove();
    });
    const level2But = document.querySelector('#level2');
    level2But.addEventListener('click', () => {
        createSprintGame(2, getRandomNumber(30), parent);
        container.remove();
    });
    const level3But = document.querySelector('#level3');
    level3But.addEventListener('click', () => {
        createSprintGame(3, getRandomNumber(30), parent);
        container.remove();
    });
    const level4But = document.querySelector('#level4');
    level4But.addEventListener('click', () => {
        createSprintGame(4, getRandomNumber(30), parent);
        container.remove();
    });
    const level5But = document.querySelector('#level5');
    level5But.addEventListener('click', () => {
        createSprintGame(5, getRandomNumber(30), parent);
        container.remove();
    });
    const level6But = document.querySelector('#level6');
    level6But.addEventListener('click', () => {
        createSprintGame(6, getRandomNumber(30), parent);
        container.remove();
    })

}

export async function createSprintGame(group:number, page:number, parent:HTMLElement) {
    const words = await Api.getWords(group, page);
    thisGameWords = words;
    let userWords;
    if (localStorage.getItem('userToken')) {
    userWords = await Api.getUserWords(localStorage.getItem('userId'), localStorage.getItem('userToken'));
    console.log(userWords);
    }
    if (sixtyFourty()) {
        const number = getRandomNumber(20)-1;
        createWords(words,parent,number,number);
    } else {
        const number1 = getRandomNumber(20)-1;
        const number2 = getRandomNumber(20)-1;
        createWords(words,parent,number1,number2);
    }
    createTimer(parent);
}
function createTimer(parent:HTMLElement) {
const clock = document.createElement('div');
clock.classList.add('clock');
let time:number = 60;
parent.appendChild(clock);
clock.innerHTML = time.toString();
const interval = setInterval(() => {
    time -= 1;
    clock.innerHTML = time.toString();
    if (time <= 0) {
        parent.innerHTML = '';
        clock.remove();
        resultPopUp();
        clearInterval(interval);
    }
}, 1000)
}

function createWords(words:Word[], parent:HTMLElement, numberWord:number, numberWordTranslate:number) {
        const word = document.createElement('div');
        word.classList.add('word');
        word.innerHTML = words[numberWord].word;
        if (document.querySelector('.clock')) {
            parent.insertBefore(word, document.querySelector('.clock'))
        } else {
            parent.appendChild(word);
        }
        word.addEventListener('click', () => {
            word.remove();
            wordTranslate.remove();
            const number1 = getRandomNumber(20)-1;
            let number2;
            if (sixtyFourty()) { number2 = number1 } else {
                number2 = getRandomNumber(20)-1;
            }
            createWords(words, parent, number1, number2);
        })
        const wordTranslate = document.createElement('div');
        wordTranslate.classList.add('wordTranslate');
        wordTranslate.innerHTML = words[numberWordTranslate].wordTranslate;
        word.after(wordTranslate);
        const buttonsHolder = document.createElement('div');
        wordTranslate.after(buttonsHolder)
        const right = document.createElement('div');
        right.classList.add('right');
        right.innerHTML = 'Right';
        right.addEventListener('click', () => {
            if (numberWord !== numberWordTranslate) {
                wrongCount+=1;
                wrongWords.add(words[numberWord].id);
            } else {
                rightCount+=1;
                rightWords.add(words[numberWord].id);
            }
            word.remove();
            wordTranslate.remove();
            right.remove();
            wrong.remove();
            const number1 = getRandomNumber(20)-1;
            let number2;
            if (sixtyFourty()) { number2 = number1 } else {
                number2 = getRandomNumber(20)-1;
            }
            createWords(words, parent,number1,number2);
        })
        const wrong = document.createElement('div');
        wrong.classList.add('wrong');
        wrong.innerHTML = 'Wrong';
        wrong.addEventListener('click', () => {
            if (numberWord === numberWordTranslate) {
                wrongCount+=1;
                wrongWords.add(words[numberWord].id);
            } else {
                rightCount+=1;
                rightWords.add(words[numberWord].id);
            }
            word.remove();
            wordTranslate.remove();
            right.remove();
            wrong.remove();
            const number1 = getRandomNumber(20)-1;
            let number2;
            if (sixtyFourty()) { number2 = number1 } else {
                number2 = getRandomNumber(20)-1;
            }
            createWords(words, parent,number1,number2);
        })
        buttonsHolder.appendChild(right);
        buttonsHolder.appendChild(wrong);
}

export async function resultPopUp() {
    const backBlack = document.createElement('div');
    document.body.appendChild(backBlack);
    backBlack.classList.add('backBlack');
    const popUp = document.createElement('div');
    document.body.appendChild(popUp);
    popUp.classList.add('popUp');
    await createWrongWordsList();
    let result = `
        <div class = "wrongWords">
        <h3>Неправильно угадано: ${wrongCount} слов.</h3>
        ${wrongWordsList}
        </div>
    `
    popUp.innerHTML = result;
    let numberList = 0;
    for (let value of wrongWords){
        numberList +=1;
        const word:Word = await Api.getWord(value);
        let audio = new Audio(`https://rs-lang-team-116.herokuapp.com/${word.audio}`);
        const audioButton = document.querySelector(`#wrongMusic${numberList.toString()}`);
        audioButton.addEventListener('click', () => audio.play())
    }
  }