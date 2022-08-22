import { BtnHandler } from './typeBtnHandler';
import { Api } from '../../../api/api';
import { CreateUserWord } from '../../../api/typeApi';

export  class DifficultBtn implements BtnHandler {
    static btnName = 'difficult';
    async handle(wordId: string): Promise<void> {
        const userId: string = localStorage.getItem('userId');
        const token: string = localStorage.getItem('userToken');
        const requestBody: CreateUserWord = {
            difficulty: 'hard',
            optional: {
                learning: false,
            }
        }
        await Api.createUserWord(userId, token, wordId, requestBody);
        const wordCard: HTMLElement = document.getElementById(`${wordId}`);
        if (wordCard.classList.contains('bg-success')) {
            wordCard.classList.remove('bg-success');
            wordCard.classList.add('bg-danger');
        } else {
            wordCard.classList.add('bg-danger');
        }
        wordCard.querySelectorAll('button').forEach((item: HTMLElement) => {
            if (item.dataset.name === 'difficult') {
                item.dataset.name = 'easy';
                item.innerText = 'Easy';
            }
        })
    }
}
