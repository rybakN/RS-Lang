import { Api } from "../api/api"
import { Word,Filter,AndCondition,UserWordFilter, CreateUserWordResponse, CreateUserWord, StatisticRequestBody } from "../api/typeApi";
import { getRandomNumber, sixtyFourty} from "./sprint-game"
let rightCount = 0;
let wrongCount = 0;
let rightWords = new Set<string>();
let wrongWords = new Set<string>();
let newWords:number = 0;
let learnedWords:number = 0;
let maxInRow:number = 0;
let currentRow:number = 0;
let userWords:CreateUserWordResponse[];
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
async function createAudioGame(group:number, page:number, parent:HTMLElement){
    let words = await Api.getWords(group, page);
    let err = false;
    let endOfPage = false;
    if (localStorage.getItem('userToken')) {
        userWords = await Api.getUserWords(localStorage.getItem('userId'), localStorage.getItem('userToken'));
        if (localStorage.getItem('currentPage')){
            for (let userWord of userWords){
                if (userWord.optional.learning) {
                    for (let j:number = 0; j<words.length; j+=1) {
                        if (words[j].id = userWord.wordId) {
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
            let k = 0;
            words2 = await Api.getWords(group, page-n);
            while (words.length < 20 && !endOfPage) {
                if (words2.length >= k) { 
                    words.push(words2[k]);
                k += 1;
                } else { endOfPage = true }
                
            }
            n+=1;
        } while (words.length < 20 && page-n >= 0);
    }
    localStorage.removeItem('currentPage');
    localStorage.removeItem('currentGroup');
    if (sixtyFourty()) {
        const number = getRandomNumber(20)-1;
        createWords(words,parent,number,number);
    } else {
        const number1 = getRandomNumber(20)-1;
        const number2 = getRandomNumber(20)-1;
        createWords(words,parent,number1,number2);
    }
    createTimer(parent, words, userWords);
}

function createWords(words:Word[], parent:HTMLElement, number1:number, number2:number){

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
        createLevelsChoose(parent);
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
    for (let value of wrongWords){
        numberList +=1;
        const word:Word = await Api.getWord(value);
        let audio = new Audio(`https://rs-lang-team-116.herokuapp.com/${word.audio}`);
        const audioButton = document.querySelector(`#wrongMusic${numberList.toString()}`);
        audioButton.addEventListener('click', () => audio.play())
    }
}

let wrongWordsList='';

async function createWrongWordsList(){
    let numberList = 0;
    for (let value of wrongWords){
        numberList+=1;
        const word:Word = await Api.getWord(value)
        wrongWordsList+=`
        <div class="wrongWord">
            <img class="musicPlay" id="wrongMusic${numberList.toString()}" src="../pictures/audio.png">
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
            <img class="musicPlay" id="wrongMusic${numberList.toString()}" src="../pictures/audio.png">
            <p class ="rightWordEng">${word.word}</p>
            <p class ="rightWordRus">${word.wordTranslate}</p>
        </div>
        `
    }
}
function createTimer(parent:HTMLElement, words:Word[], userWords:CreateUserWordResponse[]){
    const clock = document.createElement('div');
    clock.classList.add('clock');
    let time:number = 60;
    parent.appendChild(clock);
    clock.innerHTML = time.toString();
    const interval = setInterval(async () => {
        time -= 1;
        clock.innerHTML = time.toString();
        if (time <= 0) {
            parent.innerHTML = '';
            clock.remove();
            clearInterval(interval);
            if (localStorage.getItem('userToken')){
                await sendWordStatistics(words,userWords);
                await sendGameStatistics();
            }
            resultPopUp(parent);
            
        }
    }, 1000)
}
async function sendWordStatistics(words:Word[],userWords:CreateUserWordResponse[]) {
    for (let i = 0; i <words.length; i++){

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
            row =  words[i].statistic.row;
            difficulty ='easy';
            learning = false;
            for (let j = 0; j <userWords.length; j++) {
                if (userWords[j].wordId == words[i].id) {
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
                await Api.updateUserWord(localStorage.getItem('userId'),localStorage.getItem('userToken'), words[i].id, userWord); }
                catch { console.log('ой'); }
            } else {
                newWords += 1;
                try {
                await Api.createUserWord(localStorage.getItem('userId'),localStorage.getItem('userToken'), words[i].id, userWord);
                }
                catch (err) { console.log('ой-ой', err); }
            }
        }     
    }
}
async function sendGameStatistics(){
    let accuracy = rightCount / (rightCount + wrongCount) * 100;
    let today = `${new Date().getDate()} ${new Date().getMonth() + 1} ${new Date().getFullYear()}` 
    try {
        const stats = await Api.getUserStatistic(localStorage.getItem('userId'),localStorage.getItem('userToken'));
        let todayAccuracy = accuracy;
        let todayRight = rightCount;
        let todayWrong = wrongCount;
        let todayNewWords = newWords;
        let todayMaxInRow = maxInRow;
        let LWBD = stats.optional.learnedWordsByDays;
        let NWBD = stats.optional.newWordsByDays;
        if (today == stats.optional.sprint.date) {
            todayAccuracy = (stats.optional.sprint.correctToday+rightCount) / (stats.optional.sprint.correctToday+rightCount+stats.optional.sprint.incorrectToday+wrongCount) * 100
            todayRight += stats.optional.sprint.correctToday;
            todayWrong  += stats.optional.sprint.incorrectToday;
            todayNewWords += stats.optional.sprint.newWords;
            if (todayMaxInRow < stats.optional.sprint.maxInRow) {
                todayMaxInRow = stats.optional.sprint.maxInRow
            };
             let learnedToday = LWBD[today] + learnedWords;
             LWBD[today] = learnedToday;
             let newToday = NWBD[today] + newWords;
             NWBD[today] = newToday; 
        } else {
            LWBD[today] = learnedWords;
            NWBD[today] = newWords;
            
        }
        let thisGameStats:StatisticRequestBody = {
            learnedWords:learnedWords,
            optional: {
               sprint: {
                accuracy: todayAccuracy,
                correctToday: todayRight,
                incorrectToday: todayWrong,
                date: today,
                newWords: todayNewWords,
                maxInRow: todayMaxInRow,
               },
               audio: stats.optional.audio,
               learnedWordsByDays: LWBD,
               newWordsByDays: NWBD,
            }
        }
        await Api.upsertUserStatistic(localStorage.getItem('userId'),localStorage.getItem('userToken'), thisGameStats).then();
    }
    catch(err) {       
        console.log(`error ${err}`);
        let newLearnedWordsByDays = {};
        newLearnedWordsByDays[today] = learnedWords;
        let newNewWordsByDays = {};
        newNewWordsByDays[today] = newWords;
        let thisGameStats:StatisticRequestBody = {
            learnedWords:learnedWords,
            optional: {
                sprint: {
                    accuracy: accuracy,
                    date: today,
                    maxInRow:maxInRow,
                    newWords:newWords,   
                    correctToday: rightCount,
                    incorrectToday: wrongCount, 
                },
                audio: {
                    accuracy: 0,
                    date: today,
                    maxInRow:0,
                    newWords:0,  
                    correctToday: 0,
                    incorrectToday: 0, 
                },
                learnedWordsByDays: newLearnedWordsByDays,
                newWordsByDays: newNewWordsByDays,
            }
        }
        await Api.upsertUserStatistic(localStorage.getItem('userId'),localStorage.getItem('userToken'), thisGameStats).then();
    }
    
}
