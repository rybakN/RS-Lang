import { BtnHandler } from './typeBtnHandler';
import { Api } from '../../../api/api';
import { CreateUserWord, StatisticRequestBody, UserStatisticResponse, UserWord } from '../../../api/typeApi';
import { ToggleBtnName } from './utilsWordCard/toggleBtnName';
import { CreateUserWordBody } from './utilsWordCard/createUserWordBody';
import { UpdateUserStatistic } from './utilsWordCard/updateUserStatistic';
import { ParamCreateUserWordBody } from '../typeViewWordCards';
import { addStyleLearnedPage } from '../viewWordCards';

export  class LearningBtn implements BtnHandler {
    static btnName = 'learned';
    toggleBtnName: ToggleBtnName;
    userStat: UpdateUserStatistic;
    userWordBody: CreateUserWordBody;
    constructor(toggleBtnName: ToggleBtnName, updateUserStat: UpdateUserStatistic, userWordBody: CreateUserWordBody) {
        this.toggleBtnName = toggleBtnName;
        this.userStat = updateUserStat;
        this.userWordBody = userWordBody;
    }
    async handle(wordId: string): Promise<void> {
        const paramRequestBody: ParamCreateUserWordBody = {
            difficulty: 'easy',
            learning: true,
        }
        const userId: string = localStorage.getItem('userId');
        const token: string = localStorage.getItem('userToken');
        const wordInfo: UserWord = JSON.parse(localStorage.getItem(wordId));
        const { requestBody } = await this.userWordBody.createBody(userId, token, wordId, paramRequestBody);

        const wordCard: HTMLElement = document.getElementById(`${wordId}`);
        let learnedWordsCounter: number = 0;

        if (wordCard.classList.contains('bg-danger')) {
            await Api.updateUserWord(userId, token, wordId, requestBody);
            wordCard.classList.remove('bg-danger');
            wordCard.classList.add('bg-success');
            wordCard.querySelectorAll('button').forEach((item: HTMLButtonElement) => {
                if (item.dataset.name === 'difficult') item.disabled = false;
            })
        } else {
            const response = await Api.getUserAggregateWordById(userId, token, wordId);
            if (response[0]['userWord'] != undefined) {
                await Api.updateUserWord(userId, token, wordId, requestBody);
                wordCard.classList.add('bg-success');
            } else {
                await Api.createUserWord(userId, token, wordId, requestBody);
                wordCard.classList.add('bg-success');
            }
        }
        this.toggleBtnName.toggleBtnName(wordCard, 'learned', 'restore');
        document.querySelectorAll('button').forEach((item: HTMLButtonElement) => {
            if (item.dataset.name === 'restore') learnedWordsCounter += 1;
        })
        if (learnedWordsCounter >= wordCard.parentElement.children.length) {
            addStyleLearnedPage();
        }
        wordCard.querySelectorAll('button').forEach((item: HTMLButtonElement) => {
            if (item.dataset.name === 'easy') wordCard.remove();
        })

        this.userStat.updateUserStatistic(userId, token, 1).then();

    }
}
