import { StatisticRequestBody, UserStatisticResponse } from '../../../../api/typeApi';
import { Api } from '../../../../api/api';

export class UpdateUserStatistic {
    async updateUserStatistic(userId: string, token: string, action: 1 | -1): Promise<void> {
        const response: UserStatisticResponse = await Api.getUserStatistic(userId, token);
        let quantityLearnedWords: number;
        const optionalObj = response.optional;
        const date: Date =  new Date();
        const toDay: string =  `${date.getDate()} ${date.getMonth() + 1} ${date.getFullYear()}`;
        if (optionalObj.learnedWordsByDays.hasOwnProperty(toDay)) {
            optionalObj.learnedWordsByDays[toDay] = optionalObj.learnedWordsByDays[toDay] + action;
        } else {
            optionalObj.learnedWordsByDays[toDay] = 1;
        };
        // response.learnedWords > 0 ? quantityLearnedWords = 1 : quantityLearnedWords = 0;
        console.log(optionalObj);
        const requestBodyStatistic: StatisticRequestBody = {
            learnedWords: response.learnedWords,
            optional: optionalObj
        }
        Api.upsertUserStatistic(userId, token, requestBodyStatistic).then();
    }
}
