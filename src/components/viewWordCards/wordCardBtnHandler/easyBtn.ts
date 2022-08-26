import { BtnHandler } from './typeBtnHandler';
import { Api } from '../../../api/api';
import { CreateUserWord } from '../../../api/typeApi';
import { ToggleBtnName } from './utilsWordCard/toggleBtnName';
import { CreateUserWordBody } from './utilsWordCard/createUserWordBody';
import { UpdateUserStatistic } from './utilsWordCard/updateUserStatistic';
import { ParamCreateUserWordBody } from '../typeViewWordCards';

export  class EasyBtn implements BtnHandler {
    static btnName = 'easy';
    toggleBtnName: ToggleBtnName;
    userWordBody: CreateUserWordBody;
    constructor(toggleBtnName: ToggleBtnName, userWordBody: CreateUserWordBody) {
        this.toggleBtnName = toggleBtnName;
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
        document.getElementById(`${wordId}`).remove();
    }
}
