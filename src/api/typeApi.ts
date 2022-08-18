export interface CreateUserBody {
    email: string
    password: string
}

export interface CreateUserResponse {
    id: string
    email: string
}

export interface SingInResponse {
    message: string
    token: string
    refreshToken: string
    userId: string
}

export interface Word {
    id: string
    group: number
    page: number
    word: string
    image: string
    audio: string
    audioMeaning: string
    audioExample: string
    textMeaning: string
    textExample: string
    transcription: string
    textExampleTranslate: string
    textMeaningTranslate: string
    wordTranslate: string
}

export interface GetNewToken {
    token: string
    refreshToken: string
}

export class CreateUserWord {
    difficulty: string
    optional: CreateUserWordOption
}

export interface CreateUserWordResponse {
    id: string
    difficulty: string
    optional: CreateUserWordOption
    wordId: string
}

export interface CreateUserWordOption {
    testFieldString: string
    testFieldBoolean: boolean
}

export type GetUserAggregateWordResponse = Root2[]

export interface Root2 {
    paginatedResults: UserWord[]
    totalCount: TotalCount[]
}

export interface UserWord {
    _id: string
    group: number
    page: number
    word: string
    image: string
    audio: string
    audioMeaning: string
    audioExample: string
    textMeaning: string
    textExample: string
    transcription: string
    textExampleTranslate: string
    textMeaningTranslate: string
    wordTranslate: string
    userWord?: CreateUserWord
}

export interface TotalCount {
    count: number
}

export interface UserStatisticResponse {
    id: string
    learnedWords: number
    optional?: any
}

export interface StatisticRequestBody {
    learnedWords: number
    optional?: any
}

export interface UserSettingsResponse {
    id: string
    wordsPerDay: number
    optional?: any
}

export interface SettingsRequestBody {
    wordsPerDay: number
    optional?: any
}

export class UserWordFilter {
    "userWord.difficulty": string;
    "userWord.optional.testFieldBoolean": boolean;
    "userWord.optional.testFieldString": string;
}

export class OrCondition {
    $or: Array<UserWordFilter | OrCondition | AndCondition>;
    constructor(or: Array<UserWordFilter | OrCondition | AndCondition>) {
        this.$or = or;
    }
}

export class AndCondition {
    $and: Array<UserWordFilter | OrCondition | AndCondition>;
    constructor(and: Array<UserWordFilter | OrCondition | AndCondition>) {
        this.$and = and;
    }
}

export class Filter {
    condition: OrCondition | AndCondition;
    constructor(condition: OrCondition | AndCondition) {
        this.condition = condition;
    }
}
