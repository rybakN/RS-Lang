import { Api } from "../api/api"
import './sprint-game.css';
import { Word } from "../api/typeApi";
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
setInterval(() => {
    time -= 1;
    clock.innerHTML = time.toString();
    if (time <= 0) {
        parent.innerHTML = '';
        clock.remove();
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