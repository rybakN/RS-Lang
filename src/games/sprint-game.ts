import { Api } from "../api/api"
import './sprint-game.css';
import '../pictures/audio.png'
import { Word,Filter,AndCondition,UserWordFilter, CreateUserWordResponse, CreateUserWord } from "../api/typeApi";
import '../audio/fail.mp3'
import '../audio/success.mp3'
let rightCount = 0;
let wrongCount = 0;
let rightWords = new Set<string>();
let wrongWords = new Set<string>();
let thisGameWords;
let userWords;
const successAudio = new Audio('audio/success.mp3');
const failAudio = new Audio('audio/fail.mp3')
failAudio.preload="auto";
successAudio.preload="auto";
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
let rightWordsList='';
async function createRightWordsList(){
    let numberList = 0;
    for (let value of rightWords){
        numberList+=1;
        const word:Word = await Api.getWord(value)
        rightWordsList+=`
        <div class="rightWord">
            <img class="musicPlay" id="wrongMusic${numberList.toString()}" src="./pictures/audio.png">
            <p class ="rightWordEng">${word.word}</p>
            <p class ="rightWordRus">${word.wordTranslate}</p>
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

    if (localStorage.getItem('userToken')) {
        userWords = await Api.getUserWords(localStorage.getItem('userId'), localStorage.getItem('userToken'));
        if (localStorage.getItem('page')){
            for (let userWord of userWords){
                if (userWord.optional.learning) {
                    for (let j:number; j<=words.length; j+=1) {
                        if (words[j].id = userWord.id) {
                            words.splice(j,1);
                        }
                    }
                }
            }
        }
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

async function createWords(words:Word[], parent:HTMLElement, numberWord:number, numberWordTranslate:number) {
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
            const number1 = getRandomNumber(20) - 1;
            let number2;
            if (sixtyFourty()) { number2 = number1 } else {
                number2 = getRandomNumber(20) - 1;
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
        right.innerHTML = 'Right →';
        right.addEventListener('click', () => rightClick(words, numberWord, numberWordTranslate, word, wordTranslate, right, wrong, parent) )
        const wrong = document.createElement('div');
        wrong.classList.add('wrong');
        wrong.innerHTML = '← Wrong';
        wrong.addEventListener('click', () => wrongClick(words, numberWord, numberWordTranslate, word, wordTranslate, right, wrong, parent))
        
        document.addEventListener('keydown', function keyboard(event) {
            const keyCode = event.keyCode;
            if (keyCode==39) {
                rightClick(words, numberWord, numberWordTranslate, word, wordTranslate, right, wrong, parent);
                
            }
            if (keyCode==37) {
                wrongClick(words, numberWord, numberWordTranslate, word, wordTranslate, right, wrong, parent)
            }
        },{once:true})
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
    await createRightWordsList();
    let result = `
        <div class = "wrongWords">
            <h3>Неправильно угадано: ${wrongCount} слов.</h3>
            ${wrongWordsList}
        </div>
        <div class = "rightWords">
            <h3>Правильно угадано: ${rightCount} слов.</h3>
            ${rightWordsList}
        </div>
        <div class="right" id="tryAgain"> Попробовать еще раз</div>
    `
    popUp.innerHTML = result;
    let numberList = 0;
    const tryAgain = document.querySelector('#tryAgain');
    tryAgain.addEventListener('click', () => location.reload())
    for (let value of wrongWords){
        numberList +=1;
        const word:Word = await Api.getWord(value);
        let audio = new Audio(`https://rs-lang-team-116.herokuapp.com/${word.audio}`);
        const audioButton = document.querySelector(`#wrongMusic${numberList.toString()}`);
        audioButton.addEventListener('click', () => audio.play())
    }
  }

async function wrongClick (
    words:Word[], 
    numberWord:number, 
    numberWordTranslate:number,
    word:HTMLDivElement,
    wordTranslate:HTMLDivElement,
    right:HTMLDivElement,
    wrong:HTMLDivElement,
    parent:HTMLElement,
    ) {
    if (numberWord === numberWordTranslate) {
        failAudio.pause();
        successAudio.pause();
        failAudio.play();
        wrongCount+=1;
        wrongWords.add(words[numberWord].id);
        if(words[numberWord].statistic) {
            words[numberWord].statistic.incorrect += 1;
            words[numberWord].statistic.row = 0;
        } else {
            words[numberWord].statistic = {
                correct:0,
                incorrect:1,
                row:0
            }
        }
    } else {
        failAudio.pause();
        successAudio.pause();
        successAudio.play();
        rightCount+=1;
        rightWords.add(words[numberWord].id);
        if(words[numberWord].statistic) {
            words[numberWord].statistic.correct += 1;
            words[numberWord].statistic.row += 1;
        } else {
            words[numberWord].statistic = {
                correct:1,
                incorrect:0,
                row:1
            }
        }
    }
    word.remove();
    wordTranslate.remove(); 
    right.remove();
    wrong.remove();
    
    console.log(words[numberWord].statistic);
    const number1 = getRandomNumber(20) - 1;
    let number2;
    if (sixtyFourty()) { number2 = number1 } else {
        number2 = getRandomNumber(20)-1;
    }
    await createWords(words, parent,number1,number2);
}
async function rightClick (
    words:Word[], 
    numberWord:number, 
    numberWordTranslate:number,
    word:HTMLDivElement,
    wordTranslate:HTMLDivElement,
    right:HTMLDivElement,
    wrong:HTMLDivElement,
    parent:HTMLElement,
    ) { 
    if (numberWord !== numberWordTranslate) {
        failAudio.pause();
        successAudio.pause();
        failAudio.play();
        wrongCount+=1;
        wrongWords.add(words[numberWord].id);
        if(words[numberWord].statistic) {
            words[numberWord].statistic.incorrect += 1;
            words[numberWord].statistic.row = 0;
        } else {
            words[numberWord].statistic = {
                correct:0,
                incorrect:1,
                row:0
            }
        }
    } else {
        failAudio.pause();
        successAudio.pause();
        successAudio.play();
        rightCount+=1;
        rightWords.add(words[numberWord].id);
        if(words[numberWord].statistic) {
            words[numberWord].statistic.correct += 1;
            words[numberWord].statistic.row += 1;
        } else {
            words[numberWord].statistic = {
                correct:1,
                incorrect:0,
                row:1
            }
        }
    }
    word.remove();
    wordTranslate.remove();
    right.remove();
    wrong.remove();
    
    
    console.log(words[numberWord].statistic);
    const number1 = getRandomNumber(20)-1;
    let number2;
    if (sixtyFourty()) { number2 = number1 } else {
        number2 = getRandomNumber(20)-1;
    }
    await createWords(words, parent,number1,number2);
}

async function sendStatistics(words:Word[],userWords:CreateUserWordResponse[]) {
    for (let i = 0; i <=words.length; i++){
        let correct;
        let incorrect;
        let row;
        let learning;
        let userWord:CreateUserWord
        let difficulty;
        let isCreated = false;
        if (words[i].statistic) {
            correct = words[i].statistic.correct;
            incorrect = words[i].statistic.incorrect;
            row =  words[i].statistic.incorrect;
            difficulty ='easy';
            for (let j = 0; j <=words.length; j++) {
                if (userWords[j].id == words[i].id) {
                    learning = userWords[j].optional.learning;
                    difficulty = userWords[j].difficulty;
                    isCreated = true;
                    if (userWords[j].optional.statistic) {
                        correct += userWords[j].optional.statistic.correct;
                        incorrect += userWords[j].optional.statistic.incorrect;
                        if (words[i].statistic.row === 0) {
                            row = 0;
                            learning = false;
                        } else { 
                            row += words[i].statistic.incorrect;
                            if (difficulty=='hard' && row>=5) {
                                learning = true;
                            }
                            else if(difficulty=='easy' && row>=3) {
                                learning = true;
                            }
                        }
                    } else {
                        if (difficulty=='hard' && row>=5) {
                            learning = true;
                        }
                        else if(difficulty=='easy' && row>=3) {
                            learning = true;
                        } else if (row == 0) {
                            learning = false;
                        }
                    }   
                }
            }
            userWord = {
                difficulty: difficulty,
                optional: {
                    learning: learning,
                    statistic: {
                        row: row,
                        correct: correct,
                        incorrect: incorrect,
                    }
                }
            }
            if (isCreated){
                Api.updateUserWord(localStorage.getItem('userId'),localStorage.getItem('userToken'), words[i].id, userWord);
            } else {
                Api.createUserWord(localStorage.getItem('userId'),localStorage.getItem('userToken'), words[i].id, userWord);
            }
        }     
    }
}