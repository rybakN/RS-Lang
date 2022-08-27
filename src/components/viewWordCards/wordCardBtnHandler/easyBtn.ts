import { BtnHandler } from './typeBtnHandler';
import { Api } from '../../../api/api';
import { CreateUserWord } from '../../../api/typeApi';
import { ToggleBtnName } from './toggleBtnName';

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
        await Api.deleteUserWordById(userId, token, wordId);
        document.getElementById(`${wordId}`).remove();
        // wordCard.remove();
        // wordCard.classList.remove('bg-danger');
        //
        // this.toggleBtnName.toggleBtnName(wordCard, 'easy', 'difficult');
    }
}
