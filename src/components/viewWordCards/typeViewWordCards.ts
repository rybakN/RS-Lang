import { CreateUserWordBody } from './wordCardBtnHandler/utilsWordCard/createUserWordBody';
import { CreateUserWord, UserWord } from '../../api/typeApi';

export interface getCardsHTML {
    id: string[]
    containerHTML: string
}

export enum FilterViewWordCard {
    difficult = 'difficult',
    learned = 'learned',
}

export interface GetAudioUrl {
    audioWordUrl: string
    audioMeaningUrl: string
    audioExampleUrl: string
}

export interface ParamCreateUserWordBody {
    difficulty: string
    learning: boolean
}

export interface CreateUserWordBodyResponse {
    response: UserWord[]
    requestBody: CreateUserWord
}

export interface GetNewTokenResponse {
    userId: string
    token: string
}
