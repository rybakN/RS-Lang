export interface TypeStatisticsUtils {
    wordLearnedToDay: string
    newWordToDay: string
    accuracy: string
    accuracyAudio: string
    accuracySprint: string
    newWordToDayAudio: string
    newWordToDaySprint: string
    inRowAudio: string
    inRowSprint: string
    allTimeLearnedWordsValue: number[]
    allTimeLearnedWordsName: string[]
}

export interface GetStatsGameAndWords {
    newWordToDay: string
    accuracy: string
    accuracyAudio: string
    accuracySprint: string
    newWordToDayAudio: string
    newWordToDaySprint: string
    inRowAudio: string
    inRowSprint: string
}

export interface GetStatsForGraphicsLearnedWords {
    allTimeName: string[]
    allTimeValue: number[]
}
