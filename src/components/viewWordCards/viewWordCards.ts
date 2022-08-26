import { Api } from '../../api/api';
import { Filter, GetUserAggregateWordResponse, OrCondition, UserWord, UserWordFilter, Word } from '../../api/typeApi';
import { FilterViewWordCard, getCardsHTML } from './typeViewWordCards';
import { HandlerCombiner } from './wordCardBtnHandler/handlerCombiner';

export async function viewWordCards(containerId: string, groupNum: number, pageNum: number, filter?: FilterViewWordCard): Promise<void> {
    const { id, containerHTML } = await getWordCardsHTML(groupNum, pageNum, filter);
    document.getElementById(containerId).innerHTML = containerHTML;
    paintBgContainerAllCards(containerId);
    addWordCardListener(id);
}

async function getWordCardsHTML(groupNum: number, pageNum: number, filter?: string): Promise<getCardsHTML> {
    let containerHTML: string = '';
    let wordsPerPage = filter == FilterViewWordCard.difficult ? 3600 : 20;
    const id: string[] = [];
    const userId = localStorage.getItem('userId');

    if (userId != null) {
        if (wordsPerPage === 3600) {
            const newFilter: Filter = getFilter(filter);
            const token = localStorage.getItem('userToken');
            const response: GetUserAggregateWordResponse = await Api.getUserAggregateWord(userId, token, pageNum, wordsPerPage, newFilter);
            response[0].paginatedResults.forEach((item: UserWord) => {
                containerHTML += templateCardPageDifficult(item);
                id.push(item._id);
            })
        } else {
            const token = localStorage.getItem('userToken');
            const response: GetUserAggregateWordResponse = await Api.getUserAggregateWord(userId, token, pageNum, wordsPerPage);
            response[0].paginatedResults.forEach((item: UserWord) => {
                containerHTML += templateCardAuth(item);
                id.push(item._id);
            })
        }
    } else {
        const response: Word[] = await Api.getWords(groupNum, pageNum);
        response.forEach((item: Word) => {
            containerHTML += templateCard(item);
            id.push(item.id);
        });
    }

    return { id, containerHTML };
}

function templateCardAuth(item: UserWord): string {
    let bgCard = '';
    let difficultBtn = '';
    let learningBtn = 'Learned';
    if (item.userWord != undefined && item.userWord.difficulty === 'hard') {
        bgCard = 'bg-danger';
        difficultBtn = 'disabled="disabled"';
    } else if (item.userWord != undefined && item.userWord.optional.learning === true) {
        bgCard = 'bg-success';
        learningBtn = 'Restore';
    }

    if (item.userWord != undefined) {
        if (item.userWord.optional.statistic.incorrect != 0 || item.userWord.optional.statistic.correct != 0) {
            return `<div class="container p-2 mt-2 border border-danger wordCard ${bgCard} rounded-4 border-3" id="${item._id}">
        <div class="row">
            <div class="col-3 overflow-hidden d-flex justify-content-center m-auto">
                <img class="m-auto" src="https://rs-lang-team-116.herokuapp.com/${item.image}">
            </div>
            <div class="col-8">
                <div class="row">
                    <div class="col">
                        <b>${item.word} </b><span>${item.transcription} - ${item.wordTranslate}</span>
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
                    <div class="col">${item.textMeaningTranslate}</div>
                </div>
                <div class="row">
                    <div class="col">${item.textExample}</div>
                </div>
                <div class="row mb-4">
                    <div class="col">${item.textExampleTranslate}</div>
                </div>
                <div class="row">
                    <div class="d-grid gap-2 d-md-block">
                        <button class="btn btn-primary" type="button" ${difficultBtn} data-name="difficult" data-wordid="${item._id}">Difficult</button>
                        <button class="btn btn-primary" type="button" data-name="${learningBtn.toLowerCase()}" data-wordid="${item._id}">${learningBtn}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
        } else {
            return `<div class="container p-2 mt-2 border border-danger wordCard ${bgCard} rounded-4 border-3" id="${item._id}">
        <div class="row">
            <div class="col-3 overflow-hidden d-flex justify-content-center m-auto">
                <img class="m-auto" src="https://rs-lang-team-116.herokuapp.com/${item.image}">
            </div>
            <div class="col-8">
                <div class="row">
                    <div class="col">
                        <b>${item.word} </b><span>${item.transcription} - ${item.wordTranslate}</span>
                    </div>
                    <div class="col">
                        <button class="btn btn-primary" type="button" data-name="listen" data-wordid="${item._id}" data-audio="${item.audio}" data-meaning="${item.audioMeaning}" data-example="${item.audioExample}">Listen</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col">${item.textMeaning}</div>
                </div>
                <div class="row mb-3">
                    <div class="col">${item.textMeaningTranslate}</div>
                </div>
                <div class="row">
                    <div class="col">${item.textExample}</div>
                </div>
                <div class="row mb-4">
                    <div class="col">${item.textExampleTranslate}</div>
                </div>
                <div class="row">
                    <div class="d-grid gap-2 d-md-block">
                        <button class="btn btn-primary" type="button" ${difficultBtn} data-name="difficult" data-wordid="${item._id}">Difficult</button>
                        <button class="btn btn-primary" type="button" data-name="${learningBtn.toLowerCase()}" data-wordid="${item._id}">${learningBtn}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
        }
    } else {
        return `<div class="container p-2 mt-2 border border-danger wordCard ${bgCard} rounded-4 border-3" id="${item._id}">
        <div class="row">
            <div class="col-3 overflow-hidden d-flex justify-content-center m-auto">
                <img class="m-auto" src="https://rs-lang-team-116.herokuapp.com/${item.image}">
            </div>
            <div class="col-8">
                <div class="row">
                    <div class="col">
                        <b>${item.word} </b><span>${item.transcription} - ${item.wordTranslate}</span>
                    </div>
                    <div class="col">
                        <button class="btn btn-primary" type="button" data-name="listen" data-wordid="${item._id}" data-audio="${item.audio}" data-meaning="${item.audioMeaning}" data-example="${item.audioExample}">Listen</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col">${item.textMeaning}</div>
                </div>
                <div class="row mb-3">
                    <div class="col">${item.textMeaningTranslate}</div>
                </div>
                <div class="row">
                    <div class="col">${item.textExample}</div>
                </div>
                <div class="row mb-4">
                    <div class="col">${item.textExampleTranslate}</div>
                </div>
                <div class="row">
                    <div class="d-grid gap-2 d-md-block">
                        <button class="btn btn-primary" type="button" ${difficultBtn} data-name="difficult" data-wordid="${item._id}">Difficult</button>
                        <button class="btn btn-primary" type="button" data-name="${learningBtn.toLowerCase()}" data-wordid="${item._id}">${learningBtn}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    }

}

function templateCardPageDifficult(item: UserWord): string {
    if (item.userWord.optional.statistic.incorrect != 0 || item.userWord.optional.statistic.correct != 0) {
        return `<div class="container p-2 mt-2 border border-danger wordCard bg-danger rounded-4 border-3" id="${item._id}">
        <div class="row">
            <div class="col-3 overflow-hidden d-flex justify-content-center m-auto">
                <img class="m-auto" src="https://rs-lang-team-116.herokuapp.com/${item.image}">
            </div>
            <div class="col-8">
                <div class="row">
                    <div class="col">
                        <b>${item.word} </b><span>${item.transcription} - ${item.wordTranslate}</span>
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
                    <div class="col">${item.textMeaningTranslate}</div>
                </div>
                <div class="row">
                    <div class="col">${item.textExample}</div>
                </div>
                <div class="row mb-4">
                    <div class="col">${item.textExampleTranslate}</div>
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
        return `<div class="container p-2 mt-2 border border-danger wordCard bg-danger rounded-4 border-3" id="${item._id}">
        <div class="row">
            <div class="col-3 overflow-hidden d-flex justify-content-center m-auto">
                <img class="m-auto" src="https://rs-lang-team-116.herokuapp.com/${item.image}">
            </div>
            <div class="col-8">
                <div class="row">
                    <div class="col">
                        <b>${item.word} </b><span>${item.transcription} - ${item.wordTranslate}</span>
                    </div>
                    <div class="col">
                        <button class="btn btn-primary" type="button" data-name="listen" data-wordid="${item._id}" data-audio="${item.audio}" data-meaning="${item.audioMeaning}" data-example="${item.audioExample}">Listen</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col">${item.textMeaning}</div>
                </div>
                <div class="row mb-3">
                    <div class="col">${item.textMeaningTranslate}</div>
                </div>
                <div class="row">
                    <div class="col">${item.textExample}</div>
                </div>
                <div class="row mb-4">
                    <div class="col">${item.textExampleTranslate}</div>
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

function templateCard(item: Word): string {
    return `<div class="container p-2 mt-2 border border-danger wordCard rounded-4 border-3" id="${item.id}">
        <div class="row">
            <div class="col-3 overflow-hidden d-flex justify-content-center m-auto">
                <img class="m-auto" src="https://rs-lang-team-116.herokuapp.com/${item.image}">
            </div>
            <div class="col-8">
                <div class="row">
                    <div class="col">
                        <b>${item.word} </b><span>${item.transcription} - ${item.wordTranslate}</span>
                    </div>
                    <div class="col">
                        <button class="btn btn-primary" type="button" data-name="listen" data-wordid="${item.id}" data-audio="${item.audio}" data-meaning="${item.audioMeaning}" data-example="${item.audioExample}">Listen</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col">${item.textMeaning}</div>
                </div>
                <div class="row mb-3">
                    <div class="col">${item.textMeaningTranslate}</div>
                </div>
                <div class="row">
                    <div class="col">${item.textExample}</div>
                </div>
                <div class="row mb-4">
                    <div class="col">${item.textExampleTranslate}</div>
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

function difficultFilter(): Filter {
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
    for (let i = 0; i < containerWordCards.children.length; i += 1) {
        if (containerWordCards.children[i].classList.contains('bg-success')) learnedWordCounter += 1;
    }
    if (learnedWordCounter === containerWordCards.children.length) {
        containerWordCards.classList.add('bg-success');
        containerWordCards.classList.add('bg-opacity-25');
    }

}
