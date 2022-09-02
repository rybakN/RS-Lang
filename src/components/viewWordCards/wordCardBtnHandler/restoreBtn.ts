import { BtnHandler } from './typeBtnHandler';
import { Api } from '../../../api/api';
import { CreateUserWord, StatisticRequestBody, UserStatisticResponse } from '../../../api/typeApi';
import { ToggleBtnName } from './utilsWordCard/toggleBtnName';
import { UpdateUserStatistic } from './utilsWordCard/updateUserStatistic';
import { CreateUserWordBody } from './utilsWordCard/createUserWordBody';
import { ParamCreateUserWordBody } from '../typeViewWordCards';

export  class RestoreBtn implements BtnHandler {
    static btnName = 'restore';
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
            learning: false,
        }
        const userId: string = localStorage.getItem('userId');
        const token: string = localStorage.getItem('userToken');
        const { requestBody } = await this.userWordBody.createBody(userId, token, wordId, paramRequestBody);

        await Api.updateUserWord(userId, token, wordId, requestBody);
        const wordCard: HTMLElement = document.getElementById(`${wordId}`);
        wordCard.classList.remove('bg-success');
        this.toggleBtnName.toggleBtnName(wordCard, 'restore', 'learned');

        wordCard.parentElement.classList.remove('bg-success');

        this.userStat.updateUserStatistic(userId, token, -1).then();
    }
}
