import { Api } from '../../api/api';
import { Filter, GetUserAggregateWordResponse, UserWord, Word } from '../../api/typeApi';
import { getCardsHTML } from './typeViewWordCards';
import { HandlerCombiner } from './wordCardBtnHandler/handlerCombiner';

export async function viewWordCards(containerId: string, groupNum: number, pageNum: number, filter?: Filter): Promise<void> {
    const { id, containerHTML } = await getCardsHTML(groupNum, pageNum);
    document.getElementById(containerId).innerHTML = containerHTML;
    addWordCardListener(id);
}

async function getCardsHTML(groupNum: number, pageNum: number, filter?: Filter): Promise<getCardsHTML> {
    let containerHTML: string = '';
    const id: string[] = [];
    const userId = localStorage.getItem('userId');
    console.log(userId);
    if (userId != null) {
        const token = localStorage.getItem('userToken');
        const response: GetUserAggregateWordResponse = await Api.getUserAggregateWord(userId, token, pageNum, 20);
        response[0].paginatedResults.forEach((item: UserWord) => {
            containerHTML += templateCardAuth(item);
            id.push(item._id);
            localStorage.setItem(item._id, JSON.stringify(item));
        })
    } else {
        const response: Word[] = await Api.getWords(groupNum, pageNum);
        response.forEach((item: Word) => {
            containerHTML += templateCard(item);
            id.push(item.id);
            localStorage.setItem(item.id, JSON.stringify(item));
        });
    }

    return { id, containerHTML };
}

function templateCardAuth(item: UserWord): string {
    let bgCard = '';
    let difficultBtn = 'Difficult';
    let learningBtn = 'Learning';
    if (item.userWord != undefined && item.userWord.difficulty === 'hard') {
        bgCard = 'bg-danger';
        difficultBtn = 'Easy';
    } else if (item.userWord != undefined && item.userWord.optional.learning === true) {
        bgCard = 'bg-success';
        learningBtn = 'Restore';
    }
    return `<div class="container p-2 mt-2 border border-danger wordCard ${bgCard}" id="${item._id}">
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
                        <button class="btn btn-primary" type="button" data-name="listen" data-wordid="${item._id}">Listen</button>
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
                        <button class="btn btn-primary" type="button" data-name="${difficultBtn.toLowerCase()}" data-wordid="${item._id}">${difficultBtn}</button>
                        <button class="btn btn-primary" type="button" data-name="${learningBtn.toLowerCase()}" data-wordid="${item._id}">${learningBtn}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

}

function templateCard(item: Word): string {
    return `<div class="container p-2 mt-2 border border-danger wordCard" id="${item.id}">
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
                        <button class="btn btn-primary" type="button" data-name="listen" data-wordid="${item.id}">Listen</button>
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
