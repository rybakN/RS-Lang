import { CreateUserWord, UserWord } from '../../../../api/typeApi';
import { Api } from '../../../../api/api';
import { CreateUserWordBodyResponse, ParamCreateUserWordBody } from '../../typeViewWordCards';

export class CreateUserWordBody {
    async createBody(userId: string, token: string, wordId: string, param: ParamCreateUserWordBody): Promise<CreateUserWordBodyResponse> {
        const response: UserWord[] = await Api.getUserAggregateWordById(userId, token, wordId).then();
        let requestBody: CreateUserWord;
        if (response[0]['userWord'] != undefined) {
            requestBody = {
                difficulty: param.difficulty,
                optional: {
                    learning: param.learning,
                    statistic: response[0].userWord.optional.statistic
                }
            }
        } else {
            requestBody = {
                difficulty: param.difficulty,
                optional: {
                    learning: param.learning,
                    statistic: {
                        row: 0,
                        correct: 0,
                        incorrect: 0,
                    }
                }
            }
        }

        return { response, requestBody };
    }
}
