import { BtnHandler } from './typeBtnHandler';
import { Api } from '../../../api/api';
import { CreateUserWord } from '../../../api/typeApi';

export  class LearningBtn implements BtnHandler {
    static btnName = 'learning';
    async handle(wordId: string): Promise<void> {
        const userId: string = localStorage.getItem('userId');
        const token: string = localStorage.getItem('userToken');
        const requestBody: CreateUserWord = {
            difficulty: 'easy',
            optional: {
                learning: true,
            }
        }
        await Api.getUserWordById(userId, token, wordId).then((result) => {
            if (result.difficulty === 'hard') {
                Api.deleteUserWordById(userId, token, wordId);
            }
        });
        await Api.createUserWord(userId, token, wordId, requestBody);
        const wordCard: HTMLElement = document.getElementById(`${wordId}`);
        if (wordCard.classList.contains('bg-danger')) {
            wordCard.classList.remove('bg-danger');
            wordCard.classList.add('bg-success');
        } else {
            wordCard.classList.add('bg-success');
        }
        wordCard.querySelectorAll('button').forEach((item: HTMLElement) => {
            if (item.dataset.name === 'learning') {
                item.dataset.name = 'restore';
                item.innerText = 'Restore';
            }
        })
    }
}
