import { Api } from "../api/api"
import { Word,Filter,AndCondition,UserWordFilter, CreateUserWordResponse, CreateUserWord, StatisticRequestBody } from "../api/typeApi";
import { getRandomNumber, sixtyFourty} from "./sprint-game"
import './sprint-game.css'
import './audio-game.css'
let rightCount = 0;
let wrongCount = 0;
let wordsOfGame:Word[];
let rightWords:Word[] = [];
let wrongWords:Word[] = [];
let audio:HTMLAudioElement;
let newWords:number = 0;
let learnedWords:number = 0;
let maxInRow:number = 0;
let currentRow:number = 0;
let userWords:CreateUserWordResponse[];
const baseLink = 'https://rs-lang-team-116.herokuapp.com/';
const successAudio = new Audio('audio/success.mp3');
const failAudio = new Audio('audio/fail.mp3');

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
const gameHolder = `
<div class='gameContainer'>
    <div class="score"></div>
    <div class="game">
        <img class="soundButton" src="../pictures/audio.png">
        <div class="wordsContainer">
            <div class="word" id="word1"></div>
            <div class="word" id="word2"></div>
            <div class="word" id="word3"></div>
            <div class="word" id="word4"></div>
        </div>
        <div class="Surrender">Не знаю</div>
    </div>
</div>


`

export function createLevelsChoose(parent:HTMLElement){
    const container = document.createElement('div');
    container.innerHTML=levelHolder;
    parent.appendChild(container);
    const level1But = document.querySelector('#level1');
    level1But.addEventListener('click', () => {

        createAudioGame(0, getRandomNumber(30), parent);
        container.remove();
    });
    const level2But = document.querySelector('#level2');
    level2But.addEventListener('click', () => {

        createAudioGame(1, getRandomNumber(30), parent);
        container.remove();
    });
    const level3But = document.querySelector('#level3');
    level3But.addEventListener('click', () => {

        createAudioGame(2, getRandomNumber(30), parent);
        container.remove();
    });
    const level4But = document.querySelector('#level4');
    level4But.addEventListener('click', () => {

        createAudioGame(3, getRandomNumber(30), parent);
        container.remove();
    });
    const level5But = document.querySelector('#level5');
    level5But.addEventListener('click', () => {

        createAudioGame(4, getRandomNumber(30), parent);
        container.remove();
    });
    const level6But = document.querySelector('#level6');
    level6But.addEventListener('click', () => {
  
        createAudioGame(5, getRandomNumber(30), parent);
        container.remove();
    })

}
export async function createAudioGame(group:number, page:number, parent:HTMLElement){
    let words = await Api.getWords(group, page);

    let err = false;
    let endOfPage = false;
    if (localStorage.getItem('userToken')) {
        userWords = await Api.getUserWords(localStorage.getItem('userId'), localStorage.getItem('userToken'));
        if (localStorage.getItem('currentPage')){
            for (let userWord of userWords){
                if (userWord.optional.learning) {
                    for (let j:number = 0; j<words.length; j+=1) {
                        if (words[j].id === userWord.wordId) {
                            words.splice(j,1);
                        }
                    }
                }
            }
        }
    }
    if (words.length < 20) {
        let n = 1;
        let words2:Word[] = words
        do {
            let k = 1;
            words2 = await Api.getWords(group, page-n);
            while (words.length < 20 && !endOfPage) {
                if (words2.length > k) { 
                    words.push(words2[k]);
                k += 1;
                } else { endOfPage = true }
                
            }
            n+=1;
        } while (words.length < 20 && page-n >= 0);
    }if (words){wordsOfGame = [...words];} else {wordsOfGame =[]}
    
    localStorage.removeItem('currentPage');
    localStorage.removeItem('currentGroup');
    parent.innerHTML = gameHolder;
    await createWords(words, parent);

}

async function createWords(words:Word[], parent:HTMLElement){
    if (words.length !== 0){
        parent.innerHTML = parent.innerHTML;
        const surrender = document.querySelector('.Surrender')
        surrender.addEventListener('click', async () => {
            await createWords(words, parent);
        }, {once:true});
        const score = document.querySelector('.score');
        score.innerHTML=`${wordsOfGame.length - words.length + 1}/${wordsOfGame.length}`
        let number = getRandomNumber(words.length) - 1;
        let idRight = getRandomNumber(4);
        let rightWord = words.splice(number, 1)[0];
        if(audio){
            audio.remove();
        }
        audio = new Audio(baseLink+rightWord.audio);
        audio.play();
        let incorrectWords:number[] =[];
        for (let i = 1; i <= 4; i++) {
            
            const wordContainer = document.querySelector(`#word${i}`);
            if (i === idRight) {
                wordContainer.innerHTML = rightWord.wordTranslate
                const sound = document.querySelector('.soundButton');
                sound.addEventListener('click', () => {
                    try{               
                    audio.currentTime = 0;
                    audio.play();}
                    catch(err){console.log(err)};
                })
                wordContainer.addEventListener('click',() => {
                    rightClick(words, parent, rightWord);
                }, { once:true })
            } else {
                let wrongNumber:number;
                do {
                    wrongNumber = getRandomNumber(wordsOfGame.length) - 1;
                } while (incorrectWords.includes(wrongNumber) || wordsOfGame[wrongNumber] === rightWord)
                incorrectWords.push(wrongNumber);

                wordContainer.innerHTML = wordsOfGame[wrongNumber].wordTranslate;
                wordContainer.addEventListener('click', () =>{
                    wrongClick(words, parent, rightWord);
                })
            }
        }
    } else {
        parent.innerHTML=''
        createLevelsChoose(parent);
        await resultPopUp(parent);
        if (localStorage.getItem('userToken')){
            await sendWordStatistics(userWords);
            await sendGameStatistics();
        }      
    }
}
function rightClick(words:Word[], parent:HTMLElement, rightWord:Word){
    rightCount+=1;
    failAudio.pause();
    successAudio.pause();
    failAudio.currentTime = 0;
    successAudio.currentTime = 0;
    successAudio.play();
    currentRow += 1;
        if (currentRow > maxInRow) {
            maxInRow = currentRow;
        }
    rightWord.statistic = {
        correct:1,
        incorrect:0,
        row:1
    }
    rightWords.push(rightWord);
    createWords(words, parent);

}
function wrongClick(words:Word[], parent:HTMLElement, rightWord:Word){
    wrongCount+=1;
    failAudio.pause();
    successAudio.pause();
    failAudio.currentTime = 0;
    successAudio.currentTime = 0;
    failAudio.play();
    currentRow = 0;
    rightWord.statistic = {
        correct:0,
        incorrect:1,
        row:0
    }
    rightWords.push(rightWord);
    createWords(words, parent);

}

let wrongWordsList='';

async function createWrongWordsList(){
    let numberList = 0;
    for (let value of rightWords){
        if (value.statistic.incorrect === 1){
            numberList+=1;
            wrongWordsList+=`
            <div class="wrongWord">
                <img class="musicPlay" id="wrongMusic${numberList.toString()}" src="../pictures/audio.png">
                <p class ="wrongWordEng">${value.word}</p>
                <p class ="wrongWordRus">${value.wordTranslate}</p>
            </div>
            `
        }
    }
}
let rightWordsList='';

async function createRightWordsList(){
    let numberList = 0;
    for (let value of rightWords){
        if (value.statistic.correct === 1){
            numberList+=1;
            rightWordsList+=`
            <div class="rightWord">
                <img class="musicPlay" id="rightMusic${numberList.toString()}" src="../pictures/audio.png">
                <p class ="rightWordEng">${value.word}</p>
                <p class ="rightWordRus">${value.wordTranslate}</p>
            </div>
            `
        }
    }
}
export async function resultPopUp(parent:HTMLElement) {
    const backBlack = document.createElement('div');
    document.body.appendChild(backBlack);
    backBlack.classList.add('backBlack');
    const popUp = document.createElement('div');
    document.body.appendChild(popUp);
    popUp.classList.add('popUp');
    await createWrongWordsList();
    await createRightWordsList();
    backBlack.addEventListener('click', () => {
        backBlack.remove();
        popUp.remove();
    })
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
    for (let value of rightWords){
        if (value.statistic.incorrect === 1){
        numberList +=1;
        let audio = new Audio(`https://rs-lang-team-116.herokuapp.com/${value.audio}`);
        const audioButton = document.querySelector(`#wrongMusic${numberList.toString()}`);
        audioButton.addEventListener('click', () => audio.play())
        }
    }
    numberList = 0;
    for (let value of rightWords){
        if (value.statistic.correct === 1){
        numberList +=1;
        let audio = new Audio(`https://rs-lang-team-116.herokuapp.com/${value.audio}`);
        const audioButton = document.querySelector(`#rightMusic${numberList.toString()}`);
        audioButton.addEventListener('click', () => audio.play())
        }
    }
}


async function sendWordStatistics(userWords:CreateUserWordResponse[]) {
    for (let i = 0; i <rightWords.length; i++){

        let correct;
        let incorrect;
        let row;
        let learning;
        let userWord:CreateUserWord
        let difficulty;
        let isCreated = false;
        if (rightWords[i].statistic) {
            correct = rightWords[i].statistic.correct;
            incorrect = rightWords[i].statistic.incorrect;
            row =  rightWords[i].statistic.row;
            difficulty ='easy';
            learning = false;
            for (let j = 0; j <userWords.length; j++) {
                if (userWords[j].wordId == rightWords[i].id) {
                    learning = userWords[j].optional.learning;
                    difficulty = userWords[j].difficulty;
                    isCreated = true;
                    if (userWords[j].optional.statistic) {
                        correct += userWords[j].optional.statistic.correct;
                        incorrect += userWords[j].optional.statistic.incorrect;
                        if (rightWords[i].statistic.row === 0) {
                            row = 0;
                            learning = false;
                        } else { 
                            row += userWords[j].optional.statistic.row;
                            if (difficulty=='hard' && row>=5 && !userWords[j].optional.learning) {
                                learning = true;
                                learnedWords += 1;
                            }
                            else if(difficulty=='easy' && row>=3 && !userWords[j].optional.learning) {
                                learning = true;
                                learnedWords += 1;
                            }
                        }
                    } else {
                        if (difficulty=='hard' && row>=5 && !userWords[j].optional.learning) {
                            learning = true;
                            learnedWords += 1;
                        }
                        else if(difficulty=='easy' && row>=3 && !userWords[j].optional.learning) {
                            learning = true;
                            learnedWords += 1;
                        } else if (row == 0) {
                            if (userWords[j].optional.learning) {
                                learnedWords -= 1;
                            }
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
                try {
                await Api.updateUserWord(localStorage.getItem('userId'),localStorage.getItem('userToken'), rightWords[i].id, userWord); }
                catch { console.log('ой'); }
            } else {
                newWords += 1;
                try {
                await Api.createUserWord(localStorage.getItem('userId'),localStorage.getItem('userToken'), rightWords[i].id, userWord);
                }
                catch (err) { console.log('ой-ой', err); }
            }
        }     
    }
    
}
async function sendGameStatistics(){
    let accuracy = rightCount / (rightCount + wrongCount) * 100;
    let today = `${new Date().getDate()} ${new Date().getMonth() + 1} ${new Date().getFullYear()}` 
    let stats;
    try {
        stats = await Api.getUserStatistic(localStorage.getItem('userId'),localStorage.getItem('userToken'));
        let todayAccuracy = accuracy;
        let todayRight = rightCount;
        let todayWrong = wrongCount;
        let todayNewWords = newWords;
        let todayMaxInRow = maxInRow;
        let LWBD = stats.optional.learnedWordsByDays;
        let NWBD = stats.optional.newWordsByDays;

        if (today == stats.optional.audio.date||today == stats.optional.sprint.date) {
            let learnedToday = LWBD[today] + learnedWords;
            LWBD[today] = learnedToday;
            let newToday = NWBD[today] + newWords;
            NWBD[today] = newToday; 
        } else {
            LWBD[today] = learnedWords;
            NWBD[today] = newWords;
            
        }
        
        
        if (today == stats.optional.audio.date) {
            todayAccuracy = (stats.optional.audio.correctToday+rightCount) / (stats.optional.audio.correctToday+rightCount+stats.optional.audio.incorrectToday+wrongCount) * 100
            todayRight += stats.optional.audio.correctToday;
            todayWrong  += stats.optional.audio.incorrectToday;
            todayNewWords += stats.optional.audio.newWords;
            if (todayMaxInRow < stats.optional.audio.maxInRow) {
                todayMaxInRow = stats.optional.audio.maxInRow
            };

             
        } 
        let thisGameStats:StatisticRequestBody = {
            learnedWords:learnedWords,
            optional: {
               audio: {
                accuracy: todayAccuracy,
                correctToday: todayRight,
                incorrectToday: todayWrong,
                date: today,
                newWords: todayNewWords,
                maxInRow: todayMaxInRow,
               },
               sprint: stats.optional.sprint,
               learnedWordsByDays: LWBD,
               newWordsByDays: NWBD,
            }
        }
        await Api.upsertUserStatistic(localStorage.getItem('userId'),localStorage.getItem('userToken'), thisGameStats).then();
    }
    catch(err) {  console.log('подгружаем статистику первый раз')     
        
        }
        

    rightCount = 0;
    wrongCount = 0;
    rightWords = [];
    wrongWords = [];
    wrongWordsList='';
    rightWordsList='';
    newWords = 0;
    learnedWords = 0;
    maxInRow = 0;
    currentRow = 0;
}
