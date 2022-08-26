import { BtnHandler } from './typeBtnHandler';
import { Api } from '../../../api/api';
import { CreateUserWord } from '../../../api/typeApi';
import { ToggleBtnName } from './utilsWordCard/toggleBtnName';

export  class EasyBtn implements BtnHandler {
    static btnName = 'easy';
    toggleBtnName: ToggleBtnName;
    constructor(toggleBtnName: ToggleBtnName) {
        this.toggleBtnName = toggleBtnName;
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
        document.getElementById(`${wordId}`).remove();
    }
}
