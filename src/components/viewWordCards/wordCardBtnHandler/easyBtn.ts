import { BtnHandler } from './typeBtnHandler';
import { Api } from '../../../api/api';
import { CreateUserWord } from '../../../api/typeApi';

export  class EasyBtn implements BtnHandler {
    static btnName = 'easy';
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
        const wordCard: HTMLElement = document.getElementById(`${wordId}`);
        wordCard.classList.remove('bg-danger');
        wordCard.querySelectorAll('button').forEach((item: HTMLElement) => {
            if (item.dataset.name === 'easy') {
                item.dataset.name = 'difficult';
                item.innerText = 'Difficult';
            }
        })
    }
}
