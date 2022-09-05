import { Api } from '../../api/api';
import {
    CreateUserWordResponse,
    Filter, GetNewToken,
    GetUserAggregateWordResponse,
    OrCondition,
    UserWord,
    UserWordFilter,
    Word,
} from '../../api/typeApi';
import { FilterViewWordCard, getCardsHTML, GetNewTokenResponse } from './typeViewWordCards';
import { HandlerCombiner } from './wordCardBtnHandler/handlerCombiner';
import './viewWordCards.css';

export async function viewWordCards(containerId: string, groupNum: number, pageNum: number, filter?: FilterViewWordCard): Promise<void> {
    removeStyleLearnedPage();
    (document.querySelector('.pagination') as HTMLElement).style.pointerEvents = 'none';
    document.getElementById(containerId).innerHTML = `<div class="loader__wrapper"><div class="loader" style="--b: 5px;--c:yellowgreen;width:100px;--n:10;--g:20deg"></div></div>`;
    const { id, containerHTML } = await getWordCardsHTML(groupNum, pageNum, filter);
    document.getElementById(containerId).innerHTML = containerHTML;
    (document.querySelector('.pagination') as HTMLElement).style.pointerEvents = 'auto';
    paintBgContainerAllCards(containerId);
    addWordCardListener(id);
}

async function getWordCardsHTML(groupNum: number, pageNum: number, filter?: string): Promise<getCardsHTML> {
    let containerHTML: string = '';
    let wordsPerPage = 20;
    const id: string[] = [];
    const { userId, token } = await getNewToken();
    const translateOption: string = localStorage.getItem('translateWord');

    if (filter == FilterViewWordCard.difficult || filter == FilterViewWordCard.learned) wordsPerPage = 3600;

    if (userId != null) {
        if (wordsPerPage === 3600) {
            const filterForApi: Filter = getFilter(filter);
            const response: GetUserAggregateWordResponse = await Api.getUserAggregateWord(userId, token, pageNum, wordsPerPage, filterForApi);
            if (filter == FilterViewWordCard.difficult) {
                response[0].paginatedResults.forEach((item: UserWord) => {
                    containerHTML += templateCardPageDifficult(item, translateOption);
                    id.push(item._id);
                })
            } else {
                response[0].paginatedResults.forEach((item: UserWord) => {
                    containerHTML += templateCardPageLearned(item, translateOption);
                    id.push(item._id);
                })
            }

        } else {
            const response: Word[] = await Api.getWords(groupNum, pageNum);
            const responseUserWords: CreateUserWordResponse[] = await Api.getUserWords(userId, token);
            response.forEach((item: Word) => {
                const userWord: CreateUserWordResponse = responseUserWords.find(word => word.wordId === item.id);
                containerHTML += templateCardAuth(item, translateOption, userWord);
                id.push(item.id);
            })
        }
    } else {
        const response: Word[] = await Api.getWords(groupNum, pageNum);
        response.forEach((item: Word) => {
            containerHTML += templateCard(item, translateOption);
            id.push(item.id);
        });
    }

    return { id, containerHTML };
}

function templateCardAuth(item: Word, translateOption: string, userWord: CreateUserWordResponse): string {
    let displayNone: string = translateOption == 'false' ? 'displayNone' : '';
    let bgCard = '';
    let difficultBtn = '';
    let learningBtn = 'Learned';
    if (userWord != undefined && userWord.difficulty === 'hard') {
        bgCard = 'bg-danger';
        difficultBtn = 'disabled="disabled"';
    } else if (userWord != undefined && userWord.optional.learning === true) {
        bgCard = 'bg-success';
        learningBtn = 'Restore';
    }

    if (userWord != undefined) {
        if (userWord.optional.statistic.incorrect != 0 || userWord.optional.statistic.correct != 0) {
            return `<div class="container p-2 mt-2 border border-danger wordCard ${bgCard} rounded-4 border-3" id="${item.id}">
        <div class="row">
            <div class="col-3 overflow-hidden d-flex justify-content-center m-auto">
                <img class="m-auto" src="https://rs-lang-team-116.herokuapp.com/${item.image}">
            </div>
            <div class="col-8">
                <div class="row">
                    <div class="col">
                        <b>${item.word} </b><span>${item.transcription}</span><span class="${displayNone}"> - ${item.wordTranslate}</span>
                    </div>
                    <div class="col">
                        <button class="btn btn-primary" type="button" data-name="listen" data-wordid="${item.id}" data-audio="${item.audio}" data-meaning="${item.audioMeaning}" data-example="${item.audioExample}">Listen</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col"><b>Correct: ${userWord.optional.statistic.correct} | Incorrect: ${userWord.optional.statistic.incorrect}</b></div>
                </div>
                <div class="row">
                    <div class="col">${item.textMeaning}</div>
                </div>
                <div class="row mb-3">
                    <div class="col ${displayNone}">${item.textMeaningTranslate}</div>
                </div>
                <div class="row">
                    <div class="col">${item.textExample}</div>
                </div>
                <div class="row mb-4">
                    <div class="col ${displayNone}">${item.textExampleTranslate}</div>
                </div>
                <div class="row">
                    <div class="d-grid gap-2 d-md-block">
                        <button class="btn btn-primary" type="button" ${difficultBtn} data-name="difficult" data-wordid="${item.id}">Difficult</button>
                        <button class="btn btn-primary" type="button" data-name="${learningBtn.toLowerCase()}" data-wordid="${item.id}">${learningBtn}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
        } else {
            return `<div class="container p-2 mt-2 border border-danger wordCard ${bgCard} rounded-4 border-3" id="${item.id}">
        <div class="row">
            <div class="col-3 overflow-hidden d-flex justify-content-center m-auto">
                <img class="m-auto" src="https://rs-lang-team-116.herokuapp.com/${item.image}">
            </div>
            <div class="col-8">
                <div class="row">
                    <div class="col">
                        <b>${item.word} </b><span>${item.transcription}</span><span class="${displayNone}"> - ${item.wordTranslate}</span>
                    </div>
                    <div class="col">
                        <button class="btn btn-primary" type="button" data-name="listen" data-wordid="${item.id}" data-audio="${item.audio}" data-meaning="${item.audioMeaning}" data-example="${item.audioExample}">Listen</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col">${item.textMeaning}</div>
                </div>
                <div class="row mb-3">
                    <div class="col ${displayNone}">${item.textMeaningTranslate}</div>
                </div>
                <div class="row">
                    <div class="col">${item.textExample}</div>
                </div>
                <div class="row mb-4">
                    <div class="col ${displayNone}">${item.textExampleTranslate}</div>
                </div>
                <div class="row">
                    <div class="d-grid gap-2 d-md-block">
                        <button class="btn btn-primary" type="button" ${difficultBtn} data-name="difficult" data-wordid="${item.id}">Difficult</button>
                        <button class="btn btn-primary" type="button" data-name="${learningBtn.toLowerCase()}" data-wordid="${item.id}">${learningBtn}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
        }
    } else {
        return `<div class="container p-2 mt-2 border border-danger wordCard ${bgCard} rounded-4 border-3" id="${item.id}">
        <div class="row">
            <div class="col-3 overflow-hidden d-flex justify-content-center m-auto">
                <img class="m-auto" src="https://rs-lang-team-116.herokuapp.com/${item.image}">
            </div>
            <div class="col-8">
                <div class="row">
                    <div class="col">
                        <b>${item.word} </b><span>${item.transcription}</span><span class="${displayNone}"> - ${item.wordTranslate}</span>
                    </div>
                    <div class="col">
                        <button class="btn btn-primary" type="button" data-name="listen" data-wordid="${item.id}" data-audio="${item.audio}" data-meaning="${item.audioMeaning}" data-example="${item.audioExample}">Listen</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col">${item.textMeaning}</div>
                </div>
                <div class="row mb-3">
                    <div class="col ${displayNone}">${item.textMeaningTranslate}</div>
                </div>
                <div class="row">
                    <div class="col">${item.textExample}</div>
                </div>
                <div class="row mb-4">
                    <div class="col ${displayNone}">${item.textExampleTranslate}</div>
                </div>
                <div class="row">
                    <div class="d-grid gap-2 d-md-block">
                        <button class="btn btn-primary" type="button" ${difficultBtn} data-name="difficult" data-wordid="${item.id}">Difficult</button>
                        <button class="btn btn-primary" type="button" data-name="${learningBtn.toLowerCase()}" data-wordid="${item.id}">${learningBtn}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    }

}

function templateCardPageDifficult(item: UserWord, translateOption: string): string {
    let displayNone: string = translateOption == 'false' ? 'displayNone' : '';
    if (item.userWord.optional.statistic.incorrect != 0 || item.userWord.optional.statistic.correct != 0) {
        return `<div class="container p-2 mt-2 border border-danger wordCard bg-danger rounded-4 border-3 difficult" id="${item._id}">
        <div class="row">
            <div class="col-3 overflow-hidden d-flex justify-content-center m-auto">
                <img class="m-auto" src="https://rs-lang-team-116.herokuapp.com/${item.image}">
            </div>
            <div class="col-8">
                <div class="row">
                    <div class="col">
                        <b>${item.word} </b><span>${item.transcription}</span><span class="${displayNone}"> - ${item.wordTranslate}</span>
                    </div>
                    <div class="col">
                        <button class="btn btn-primary" type="button" data-name="listen" data-wordid="${item._id}" data-audio="${item.audio}" data-meaning="${item.audioMeaning}" data-example="${item.audioExample}">Listen</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col"><b>Correct: ${item.userWord.optional.statistic.correct} | Incorrect: ${item.userWord.optional.statistic.incorrect}</b></div>
                </div>
                <div class="row">
                    <div class="col">${item.textMeaning}</div>
                </div>
                <div class="row mb-3">
                    <div class="col ${displayNone}">${item.textMeaningTranslate}</div>
                </div>
                <div class="row">
                    <div class="col">${item.textExample}</div>
                </div>
                <div class="row mb-4">
                    <div class="col ${displayNone}">${item.textExampleTranslate}</div>
                </div>
                <div class="row">
                    <div class="d-grid gap-2 d-md-block">
                        <button class="btn btn-primary" type="button" data-name="easy" data-wordid="${item._id}">Easy</button>
                        <button class="btn btn-primary" type="button" data-name="learned" data-wordid="${item._id}">Learned</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    } else {
        return `<div class="container p-2 mt-2 border border-danger wordCard bg-danger rounded-4 border-3 difficult" id="${item._id}">
        <div class="row">
            <div class="col-3 overflow-hidden d-flex justify-content-center m-auto">
                <img class="m-auto" src="https://rs-lang-team-116.herokuapp.com/${item.image}">
            </div>
            <div class="col-8">
                <div class="row">
                    <div class="col">
                        <b>${item.word} </b><span>${item.transcription}</span><span class="${displayNone}"> - ${item.wordTranslate}</span>
                    </div>
                    <div class="col">
                        <button class="btn btn-primary" type="button" data-name="listen" data-wordid="${item._id}" data-audio="${item.audio}" data-meaning="${item.audioMeaning}" data-example="${item.audioExample}">Listen</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col">${item.textMeaning}</div>
                </div>
                <div class="row mb-3">
                    <div class="col ${displayNone}">${item.textMeaningTranslate}</div>
                </div>
                <div class="row">
                    <div class="col">${item.textExample}</div>
                </div>
                <div class="row mb-4">
                    <div class="col ${displayNone}">${item.textExampleTranslate}</div>
                </div>
                <div class="row">
                    <div class="d-grid gap-2 d-md-block">
                        <button class="btn btn-primary" type="button" data-name="easy" data-wordid="${item._id}">Easy</button>
                        <button class="btn btn-primary" type="button" data-name="learned" data-wordid="${item._id}">Learned</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    }


}

function templateCardPageLearned(item: UserWord, translateOption: string): string {
    let displayNone: string = translateOption == 'false' ? 'displayNone' : '';
    if (item.userWord.optional.statistic.incorrect != 0 || item.userWord.optional.statistic.correct != 0) {
        return `<div class="container p-2 mt-2 border border-danger wordCard bg-success rounded-4 border-3 learned" id="${item._id}">
        <div class="row">
            <div class="col-3 overflow-hidden d-flex justify-content-center m-auto">
                <img class="m-auto" src="https://rs-lang-team-116.herokuapp.com/${item.image}">
            </div>
            <div class="col-8">
                <div class="row">
                    <div class="col">
                        <b>${item.word} </b><span>${item.transcription}</span><span class="${displayNone}"> - ${item.wordTranslate}</span>
                    </div>
                    <div class="col">
                        <button class="btn btn-primary" type="button" data-name="listen" data-wordid="${item._id}" data-audio="${item.audio}" data-meaning="${item.audioMeaning}" data-example="${item.audioExample}">Listen</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col"><b>Correct: ${item.userWord.optional.statistic.correct} | Incorrect: ${item.userWord.optional.statistic.incorrect}</b></div>
                </div>
                <div class="row">
                    <div class="col">${item.textMeaning}</div>
                </div>
                <div class="row mb-3">
                    <div class="col ${displayNone}">${item.textMeaningTranslate}</div>
                </div>
                <div class="row">
                    <div class="col">${item.textExample}</div>
                </div>
                <div class="row mb-4">
                    <div class="col ${displayNone}">${item.textExampleTranslate}</div>
                </div>
                <div class="row">
                    <div class="d-grid gap-2 d-md-block">
                        <button class="btn btn-primary" type="button" data-name="difficult" data-wordid="${item._id}">Difficult</button>
                        <button class="btn btn-primary" type="button" data-name="restore" data-wordid="${item._id}">Restore</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    } else {
        return `<div class="container p-2 mt-2 border border-danger wordCard bg-success rounded-4 border-3 learned" id="${item._id}">
        <div class="row">
            <div class="col-3 overflow-hidden d-flex justify-content-center m-auto">
                <img class="m-auto" src="https://rs-lang-team-116.herokuapp.com/${item.image}">
            </div>
            <div class="col-8">
                <div class="row">
                    <div class="col">
                        <b>${item.word} </b><span>${item.transcription}</span><span class="${displayNone}"> - ${item.wordTranslate}</span>
                    </div>
                    <div class="col">
                        <button class="btn btn-primary" type="button" data-name="listen" data-wordid="${item._id}" data-audio="${item.audio}" data-meaning="${item.audioMeaning}" data-example="${item.audioExample}">Listen</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col">${item.textMeaning}</div>
                </div>
                <div class="row mb-3">
                    <div class="col ${displayNone}">${item.textMeaningTranslate}</div>
                </div>
                <div class="row">
                    <div class="col">${item.textExample}</div>
                </div>
                <div class="row mb-4">
                    <div class="col ${displayNone}">${item.textExampleTranslate}</div>
                </div>
                <div class="row">
                    <div class="d-grid gap-2 d-md-block">
                        <button class="btn btn-primary" type="button" data-name="difficult" data-wordid="${item._id}">Difficult</button>
                        <button class="btn btn-primary" type="button" data-name="restore" data-wordid="${item._id}">Restore</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    }


}

function templateCard(item: Word, translateOption: string): string {
    let displayNone: string = translateOption == 'false' ? 'displayNone' : '';
    return `<div class="container p-2 mt-2 border border-danger wordCard rounded-4 border-3" id="${item.id}">
        <div class="row">
            <div class="col-3 overflow-hidden d-flex justify-content-center m-auto">
                <img class="m-auto" src="https://rs-lang-team-116.herokuapp.com/${item.image}">
            </div>
            <div class="col-8">
                <div class="row">
                    <div class="col">
                        <b>${item.word} </b><span>${item.transcription}</span><span class="${displayNone}"> - ${item.wordTranslate}</span>
                    </div>
                    <div class="col">
                        <button class="btn btn-primary" type="button" data-name="listen" data-wordid="${item.id}" data-audio="${item.audio}" data-meaning="${item.audioMeaning}" data-example="${item.audioExample}">Listen</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col">${item.textMeaning}</div>
                </div>
                <div class="row mb-3">
                    <div class="col ${displayNone}">${item.textMeaningTranslate}</div>
                </div>
                <div class="row">
                    <div class="col">${item.textExample}</div>
                </div>
                <div class="row mb-4">
                    <div class="col ${displayNone}">${item.textExampleTranslate}</div>
                </div>
            </div>
        </div>
    </div>`;

}

function addWordCardListener(id: string[]) {
    id.forEach((item: string) => {
        (document.getElementById(item) as HTMLElement).addEventListener('click', (e: MouseEvent) => {
            const btnName: string = (e.target as HTMLElement).dataset.name;
            if (btnName) {
                const handler = new HandlerCombiner();
                handler.handler(btnName, item);
            }
        })
    })
}

function getFilter(filter: string): Filter {
    switch (filter) {
        case 'difficult':
            return difficultFilter();
        case 'learned':
            return learnedFilter();
    }
}

export function difficultFilter(): Filter {
    const userWord = new UserWordFilter();
    userWord['userWord.difficulty'] = 'hard';
    const orCondition = new OrCondition([userWord]);
    return new Filter(orCondition);
}

function learnedFilter(): Filter {
    const userWord = new UserWordFilter();
    userWord['userWord.optional.learning'] = true;
    const orCondition = new OrCondition([userWord]);
    return new Filter(orCondition);
}

function paintBgContainerAllCards(containerId: string): void {
    let learnedWordCounter = 0;
    const containerWordCards: HTMLElement = document.getElementById(containerId);
    if (!containerWordCards.children[0].classList.contains('learned')) {
        for (let i = 0; i < containerWordCards.children.length; i += 1) {
            if (containerWordCards.children[i].classList.contains('bg-success')) learnedWordCounter += 1;
        }
        if (learnedWordCounter === containerWordCards.children.length) {
            addStyleLearnedPage();
        }
    }


}

export function addStyleLearnedPage(): void {
    (document.getElementById('word-cards-container') as HTMLElement).style.background = 'yellowgreen';
    document.querySelector('.pagination').classList.add('bg-success-25');
    document.querySelector('.games-links').children[0].setAttribute('disabled', 'disabled');
    document.querySelector('.games-links').children[1].setAttribute('disabled', 'disabled');
}

export function removeStyleLearnedPage(): void {
    (document.getElementById('word-cards-container') as HTMLElement).style.background = '';
    document.querySelector('.pagination').classList.remove('bg-success-25');
    document.querySelector('.games-links').children[0].removeAttribute('disabled');
    document.querySelector('.games-links').children[1].removeAttribute('disabled');
}

export async function getNewToken(): Promise<GetNewTokenResponse> {
    let userId: string = localStorage.getItem('userId');
    let token: string = localStorage.getItem('userToken');
    if (userId != null) {
        try {
            await Api.getUser(userId, token).then();
        } catch (err) {
            const refreshToken: string = localStorage.getItem('userRefreshToken');
            const refreshTokenResponse: GetNewToken = await Api.getNewUserToken(userId, refreshToken);
            localStorage.setItem('userRefreshToken', refreshTokenResponse.refreshToken);
            console.log('Токен установлен');
            localStorage.setItem('userToken', refreshTokenResponse.token);
            token = refreshTokenResponse.token;
        }
    }
    return { userId, token };
}
