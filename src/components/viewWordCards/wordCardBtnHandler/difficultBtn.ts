import { BtnHandler } from './typeBtnHandler';
import { Api } from '../../../api/api';
import { CreateUserWord, StatisticRequestBody, UserStatisticResponse, UserWord } from '../../../api/typeApi';
import { ToggleBtnName } from './utilsWordCard/toggleBtnName';
import { UpdateUserStatistic } from './utilsWordCard/updateUserStatistic';

export  class DifficultBtn implements BtnHandler {
    static btnName = 'difficult';
    toggleBtnName: ToggleBtnName;
    userStat: UpdateUserStatistic;
    constructor(toggleBtnName: ToggleBtnName, updateUserStat: UpdateUserStatistic) {
        this.toggleBtnName = toggleBtnName;
        this.userStat = updateUserStat;
    }
    async handle(wordId: string): Promise<void> {
        const userId: string = localStorage.getItem('userId');
        const token: string = localStorage.getItem('userToken');
        const wordCard: HTMLElement = document.getElementById(`${wordId}`);
        const response = await Api.getUserAggregateWordById(userId, token, wordId).then();
        const requestBody: CreateUserWord = {
            difficulty: 'hard',
            optional: {
                learning: false,
                statistic: {
                    row: 1,
                    correct: 1,
                    incorrect: response[0].userWord.optional.statistic.incorrect
                }
            }
        }

        if (wordCard.classList.contains('bg-success')) {
            await Api.updateUserWord(userId, token, wordId, requestBody);
            wordCard.classList.remove('bg-success');
            wordCard.classList.add('bg-danger');
            this.toggleBtnName.toggleBtnName(wordCard, 'restore', 'learned');
        } else {
            const response = await Api.getUserAggregateWordById(userId, token, wordId);
            if (response[0]['userWord'] != undefined) {
                await Api.updateUserWord(userId, token, wordId, requestBody);
                wordCard.classList.add('bg-danger');
            } else {
                await Api.createUserWord(userId, token, wordId, requestBody);
                wordCard.classList.add('bg-danger');
            }
        }

        wordCard.querySelectorAll('button').forEach((item: HTMLButtonElement) => {
            if (item.dataset.name == 'difficult') item.disabled = true;
        })

        wordCard.parentElement.classList.remove('bg-success');
        this.userStat.updateUserStatistic(userId, token).then();
    }
}
