import { BtnHandler } from './typeBtnHandler';
import { Api } from '../../../api/api';
import { CreateUserWord, StatisticRequestBody, UserStatisticResponse, UserWord } from '../../../api/typeApi';
import { ToggleBtnName } from './utilsWordCard/toggleBtnName';
import { UpdateUserStatistic } from './utilsWordCard/updateUserStatistic';
import { ParamCreateUserWordBody } from '../typeViewWordCards';
import { CreateUserWordBody } from './utilsWordCard/createUserWordBody';
import { removeStyleLearnedPage } from '../viewWordCards';

export  class DifficultBtn implements BtnHandler {
    static btnName = 'difficult';
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
            difficulty: 'hard',
            learning: false,
        }
        const userId: string = localStorage.getItem('userId');
        const token: string = localStorage.getItem('userToken');
        const wordCard: HTMLElement = document.getElementById(`${wordId}`);
        const { response, requestBody } = await this.userWordBody.createBody(userId, token, wordId, paramRequestBody);

        if (wordCard.classList.contains('bg-success')) {
            await Api.updateUserWord(userId, token, wordId, requestBody);
            wordCard.classList.remove('bg-success');
            wordCard.classList.add('bg-danger');
            this.toggleBtnName.toggleBtnName(wordCard, 'restore', 'learned');
        } else {
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

        removeStyleLearnedPage();
        if (wordCard.classList.contains('learned')) wordCard.remove();

        this.userStat.updateUserStatistic(userId, token, -1).then();
    }
}
