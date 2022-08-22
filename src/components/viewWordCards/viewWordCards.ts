import { Api } from '../../api/api';
import { Filter, Word } from '../../api/typeApi';
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
    const response: Word[] = await Api.getWords(groupNum, pageNum);
    response.forEach((item: Word) => {
        containerHTML += getCard(item);
        id.push(item.id);
        localStorage.setItem(item.id, JSON.stringify(item));
    });
    return { id, containerHTML };
}

function getCard(item: Word): string {
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
                <div class="row">
                    <div class="d-grid gap-2 d-md-block">
                        <button class="btn btn-primary" type="button" data-name="difficult" data-wordid="${item.id}">Difficult</button>
                        <button class="btn btn-primary" type="button" data-name="delete" data-wordid="${item.id}">Delete</button>
                        <button class="btn btn-primary" type="button" data-name="learning" data-wordid="${item.id}">Learning</button>
                    </div>
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
