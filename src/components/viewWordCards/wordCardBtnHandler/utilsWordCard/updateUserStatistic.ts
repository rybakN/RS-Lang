import { StatisticRequestBody, UserStatisticResponse } from '../../../../api/typeApi';
import { Api } from '../../../../api/api';

export class UpdateUserStatistic {
    async updateUserStatistic(userId: string, token: string): Promise<void> {
        const response: UserStatisticResponse = await Api.getUserStatistic(userId, token);
        let quantityLearnedWords: number;
        response.learnedWords > 0 ? quantityLearnedWords = 1 : quantityLearnedWords = 0;
        const requestBodyStatistic: StatisticRequestBody = {
            learnedWords: response.learnedWords - quantityLearnedWords,
            optional: response.optional
        }
        Api.upsertUserStatistic(userId, token, requestBodyStatistic).then();
    }
}
