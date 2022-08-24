import { BtnHandler } from './typeBtnHandler';
import { Api } from '../../../api/api';
import { CreateUserWord } from '../../../api/typeApi';
import { ToggleBtnName } from './toggleBtnName';

export  class RestoreBtn implements BtnHandler {
    static btnName = 'restore';
    toggleBtnName: ToggleBtnName;
    constructor(toggleBtnName: ToggleBtnName) {
        this.toggleBtnName = toggleBtnName;
    }
    async handle(wordId: string): Promise<void> {
        const userId: string = localStorage.getItem('userId');
        const token: string = localStorage.getItem('userToken');

        await Api.deleteUserWordById(userId, token, wordId);
        const wordCard: HTMLElement = document.getElementById(`${wordId}`);
        wordCard.classList.remove('bg-success');
        this.toggleBtnName.toggleBtnName(wordCard, 'restore', 'learned');
    }
}
