import { CreateUserWord } from '../../../../api/typeApi';
import { Api } from '../../../../api/api';

export class CreateUserWordBody {
    async createBody(userId: string, token: string, wordId: string): Promise<CreateUserWord> {
        const response = await Api.getUserAggregateWordById(userId, token, wordId).then();
        let requestBody: CreateUserWord;
        if (response[0]['userWord'] != undefined) {
            requestBody = {
                difficulty: response[0].userWord.difficulty,
                optional: {
                    learning: false,
                    statistic: response[0].userWord.optional.statistic
                }
            }
        } else {
            requestBody = {
                difficulty: 'hard',
                optional: {
                    learning: false,
                    statistic: {
                        row: 1,
                        correct: 1,
                        incorrect: 2,
                    }
                }
            }
        }

        return requestBody;
    }
}
