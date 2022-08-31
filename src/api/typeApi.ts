export interface CreateUserBody {
    name?: string
    email: string
    password: string
}

export interface CreateUserResponse {
    name: string
    id: string
    email: string
}

export interface SingInRequestBody {
    email: string
    password: string
}

export interface SingInResponse {
    message: string
    token: string
    refreshToken: string
    userId: string
    name: string
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
    learning: boolean
    statistic?: CorrectIncorrectAnswer
}

export interface CorrectIncorrectAnswer {
    row: number
    correct: number
    incorrect: number
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
    optional?: OptionStatistic
}

export interface StatisticRequestBody {
    learnedWords: number
    optional: OptionStatistic
}

export interface OptionStatistic {
    sprint: inGameStats
    audio: inGameStats
    learnedWordsByDays: Map<string, number>
    newWordsByDays: Map<string, number>
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
    "userWord.optional.learning": boolean;
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

export interface inGameStats {
    accuracy: number;
    date: string;
    maxInRow: number;
    newWords: number;
}