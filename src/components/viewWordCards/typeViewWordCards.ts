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
