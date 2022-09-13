import { StatisticRequestBody, UserStatisticResponse } from '../../../../api/typeApi';
import { Api } from '../../../../api/api';

export class UpdateUserStatistic {
    async updateUserStatistic(userId: string, token: string, action: 1 | -1): Promise<void> {
        const response: UserStatisticResponse = await Api.getUserStatistic(userId, token);
        const optionalObj = response.optional;
        const date: Date =  new Date();
        const toDay: string =  `${date.getDate()} ${date.getMonth() + 1} ${date.getFullYear()}`;
        let newAction: number = 0;
        if (optionalObj.learnedWordsByDays.hasOwnProperty(toDay)) {
            if (action == -1 && optionalObj.learnedWordsByDays[toDay] == 0) newAction = 1;
            optionalObj.learnedWordsByDays[toDay] = optionalObj.learnedWordsByDays[toDay] + action + newAction;
        } else {
            const learnedWordsByDays = optionalObj.learnedWordsByDays;
            learnedWordsByDays[toDay] = 1;
            optionalObj.learnedWordsByDays = learnedWordsByDays;
        };
        const requestBodyStatistic: StatisticRequestBody = {
            learnedWords: response.learnedWords,
            optional: optionalObj
        }
        Api.upsertUserStatistic(userId, token, requestBodyStatistic).then();
    }
}
