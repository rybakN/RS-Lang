import { BtnHandler } from './typeBtnHandler';
import { Api } from '../../../api/api';
import { CreateUserWord } from '../../../api/typeApi';
import { ToggleBtnName } from './toggleBtnName';

export  class DifficultBtn implements BtnHandler {
    static btnName = 'difficult';
    toggleBtnName: ToggleBtnName;
    constructor(toggleBtnName: ToggleBtnName) {
        this.toggleBtnName = toggleBtnName;
    }
    async handle(wordId: string): Promise<void> {
        const userId: string = localStorage.getItem('userId');
        const token: string = localStorage.getItem('userToken');
        const requestBody: CreateUserWord = {
            difficulty: 'hard',
            optional: {
                learning: false,
            }
        }

        const wordCard: HTMLElement = document.getElementById(`${wordId}`);
        if (wordCard.classList.contains('bg-success')) {
            await Api.updateUserWord(userId, token, wordId, requestBody);
            wordCard.classList.remove('bg-success');
            wordCard.classList.add('bg-danger');
            this.toggleBtnName.toggleBtnName(wordCard, 'restore', 'learned');
        } else {
            await Api.createUserWord(userId, token, wordId, requestBody);
            wordCard.classList.add('bg-danger');
        }

        wordCard.querySelectorAll('button').forEach((item: HTMLButtonElement) => {
            if (item.dataset.name == 'difficult') item.disabled = true;
        })

        wordCard.parentElement.classList.remove('bg-success');
    }
}
