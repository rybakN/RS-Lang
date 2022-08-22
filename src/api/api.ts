import {
    CreateUserResponse,
    CreateUserBody,
    SingInResponse,
    Word,
    GetNewToken,
    CreateUserWord,
    CreateUserWordResponse,
    GetUserAggregateWordResponse,
    UserWord,
    StatisticRequestBody,
    UserStatisticResponse, UserSettingsResponse, SettingsRequestBody, Filter, SingInRequestBody,
} from './typeApi';

export class Api {
    private static baseLink = 'https://rs-lang-team-116.herokuapp.com/';
    static async createUser(user: CreateUserBody): Promise<CreateUserResponse> {
        const rawResponse = await fetch(this.baseLink + 'users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const createUserResponse: CreateUserResponse = await rawResponse.json();
        return createUserResponse;
    }

    static async singIn(user: SingInRequestBody): Promise<SingInResponse> {
        const rawResponse = await fetch(this.baseLink + 'signin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        });
        const singInResponse: SingInResponse = await rawResponse.json();
        return singInResponse;
    }

    static async getWords(groupNum: number, pageNum: number): Promise<Word[]> {
        const rawResponse = await fetch(this.baseLink + `words?group=${groupNum}&page=${pageNum}`);
        const getWordsResponse: Word[] = await rawResponse.json();
        return getWordsResponse;
    }

    static async getWord(wordId: string): Promise<Word> {
        const rawResponse = await fetch(this.baseLink + `words/${wordId}`);
        const getWordResponse: Word = await rawResponse.json();
        return getWordResponse;
    }

    static async getUser(userId: string, token: string): Promise<CreateUserResponse> {
        const rawResponse = await fetch(this.baseLink + `users/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const getUserResponse: CreateUserResponse = await rawResponse.json();
        return getUserResponse;
    }

    static async updateUser(userId: string, token: string, requestBody: CreateUserBody): Promise<CreateUserResponse> {
        const rawResponse = await fetch(this.baseLink + `users/${userId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody),
        });
        const updateUserResponse: CreateUserResponse = await rawResponse.json();
        return updateUserResponse;
    }

    static async deleteUser(userId: string, token: string): Promise<void> {
        const rawResponse = await fetch(this.baseLink + `users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
    }

    static async getNewUserToken(userId: string, refreshToken: string): Promise<GetNewToken> {
        const rawResponse = await fetch(this.baseLink + `users/${userId}/tokens`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${refreshToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const getNewUserTokenResponse: GetNewToken = await rawResponse.json();
        return getNewUserTokenResponse;
    }

    static async getUserWords(userId: string, token: string): Promise<CreateUserWordResponse[]> {
        const rawResponse = await fetch(this.baseLink + `users/${userId}/words`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const getUserWordsResponse: CreateUserWordResponse[] = await rawResponse.json();
        return getUserWordsResponse;
    }

    static async createUserWord(userId: string, token: string, wordId: string, requestBody: CreateUserWord): Promise<CreateUserWordResponse> {
        const rawResponse = await fetch(this.baseLink + `users/${userId}/words/${wordId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody),
        });
        const createUserWordResponse: CreateUserWordResponse = await rawResponse.json();
        return createUserWordResponse;
    }

    static async getUserWordById(userId: string, token: string, wordId: string): Promise<CreateUserWordResponse> {
        const rawResponse = await fetch(this.baseLink + `users/${userId}/words/${wordId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const getUserWordByIdResponse: CreateUserWordResponse = await rawResponse.json();
        return getUserWordByIdResponse;
    }

    static async updateUserWord(userId: string, token: string, wordId: string, requestBody: CreateUserWord): Promise<CreateUserWordResponse> {
        const rawResponse = await fetch(this.baseLink + `users/${userId}/words/${wordId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody),
        });
        const updateUserWordResponse: CreateUserWordResponse = await rawResponse.json();
        return updateUserWordResponse;
    }

    static async deleteUserWordById(userId: string, token: string, wordId: string): Promise<void> {
        const rawResponse = await fetch(this.baseLink + `users/${userId}/words/${wordId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
    }

    static async getUserAggregateWord(
        userId: string,
        token: string,
        pageNum: number,
        wordsPerPage: number,
        filter?: Filter,
        groupNum?: number
    ): Promise<GetUserAggregateWordResponse> {
        const link: string = this.createLink(pageNum, wordsPerPage, filter, groupNum);
        const rawResponse = await fetch(this.baseLink + `users/${userId}/aggregatedWords?` + link, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const getUserAggregateWordResponse: GetUserAggregateWordResponse = await rawResponse.json();
        return getUserAggregateWordResponse;
    }

    static async getUserAggregateWordById(userId: string, token: string, wordId: string): Promise<Array<UserWord>> {
        const rawResponse = await fetch(this.baseLink + `users/${userId}/aggregatedWords/${wordId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const getUserAggregateWordByIdResponse: Array<UserWord> = await rawResponse.json();
        return getUserAggregateWordByIdResponse;
    }

    static async getUserStatistic(userId: string, token: string): Promise<UserStatisticResponse> {
        const rawResponse = await fetch(this.baseLink + `users/${userId}/statistics`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const getUserStatisticResponse: UserStatisticResponse = await rawResponse.json();
        return getUserStatisticResponse;
    }

    static async upsertUserStatistic(userId: string, token: string, requestBody: StatisticRequestBody): Promise<UserStatisticResponse> {
        const rawResponse = await fetch(this.baseLink + `users/${userId}/statistics`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody),
        });
        const upsetUserStatisticResponse: UserStatisticResponse = await rawResponse.json();
        return upsetUserStatisticResponse;
    }

    static async getUserSettings(userId: string, token: string): Promise<UserSettingsResponse> {
        const rawResponse = await fetch(this.baseLink + `users/${userId}/settings`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const getUserSettingsResponse: UserSettingsResponse = await rawResponse.json();
        return getUserSettingsResponse;
    }

    static async upsertUserSettings(userId: string, token: string, requestBody: SettingsRequestBody): Promise<UserSettingsResponse> {
        const rawResponse = await fetch(this.baseLink + `users/${userId}/settings`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody),
        });
        const upsertUserSettingsResponse: UserSettingsResponse = await rawResponse.json();
        return upsertUserSettingsResponse;
    }

    private static createLink(
        pageNum: number,
        wordsPerPage: number,
        filter?: Filter,
        groupNum?: number
    ): string {
        let link: string;
        let filterLink = '';
        if (filter != undefined) filterLink = JSON.stringify(filter.condition);
        if (groupNum == undefined) {
            link = `page=${pageNum}&wordsPerPage=${wordsPerPage}&filter=${filterLink}`;
        } else {
            link = `group=${groupNum}&page=${pageNum}&wordsPerPage=${wordsPerPage}&filter=${filterLink}`;
        }
        return link;
    }
}




