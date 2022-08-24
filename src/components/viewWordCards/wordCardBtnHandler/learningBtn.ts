import { BtnHandler } from './typeBtnHandler';
import { Api } from '../../../api/api';
import { CreateUserWord } from '../../../api/typeApi';
import { ToggleBtnName } from './toggleBtnName';

export  class LearningBtn implements BtnHandler {
    static btnName = 'learned';
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
                learning: true,
            }
        }
        const wordCard: HTMLElement = document.getElementById(`${wordId}`);

        if (wordCard.classList.contains('bg-danger')) {
            await Api.updateUserWord(userId, token, wordId, requestBody);
            wordCard.classList.remove('bg-danger');
            wordCard.classList.add('bg-success');
            this.toggleBtnName.toggleBtnName(wordCard, 'easy', 'difficult');
        } else {
            await Api.createUserWord(userId, token, wordId, requestBody);
            wordCard.classList.add('bg-success');
        }
        this.toggleBtnName.toggleBtnName(wordCard, 'learned', 'restore');
    }

}
