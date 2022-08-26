import { BtnHandler } from './typeBtnHandler';
import { Api } from '../../../api/api';
import { CreateUserWord, StatisticRequestBody, UserStatisticResponse } from '../../../api/typeApi';
import { ToggleBtnName } from './utilsWordCard/toggleBtnName';
import { UpdateUserStatistic } from './utilsWordCard/updateUserStatistic';

export  class RestoreBtn implements BtnHandler {
    static btnName = 'restore';
    toggleBtnName: ToggleBtnName;
    userStat: UpdateUserStatistic;
    constructor(toggleBtnName: ToggleBtnName, updateUserStat: UpdateUserStatistic) {
        this.toggleBtnName = toggleBtnName;
        this.userStat = updateUserStat;
    }
    async handle(wordId: string): Promise<void> {
        const userId: string = localStorage.getItem('userId');
        const token: string = localStorage.getItem('userToken');
        const requestBody: CreateUserWord = {
            difficulty: 'easy',
            optional: {
                learning: false,
            }
        }

        await Api.updateUserWord(userId, token, wordId, requestBody);
        const wordCard: HTMLElement = document.getElementById(`${wordId}`);
        wordCard.classList.remove('bg-success');
        this.toggleBtnName.toggleBtnName(wordCard, 'restore', 'learned');

        wordCard.parentElement.classList.remove('bg-success');

        this.userStat.updateUserStatistic(userId, token).then();
    }
}
