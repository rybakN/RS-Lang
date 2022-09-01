import { Api } from '../../../api/api';
import { UserStatisticResponse } from '../../../api/typeApi';
import {
    GetStatsForGraphicsLearnedWords,
    GetStatsGameAndWords,
} from './typeStatisticsUtils';
import Chart from 'chart.js/auto';

export class StatisticsPage {
    async start(): Promise<void> {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('userToken');

        try {
            const response: UserStatisticResponse = await Api.getUserStatistic(userId, token);
            const date: Date =  new Date();
            const toDay: string =  `${date.getDate()} ${date.getMonth() + 1} ${date.getFullYear()}`;
            this.drawStatsCard(response, toDay);
            this.drawGraphics('Learned Words', 'learned-words', response.optional.learnedWordsByDays, toDay);
            this.drawGraphics('New Words', 'new-words', response.optional.newWordsByDays, toDay);
        } catch (err) {
            const date: Date =  new Date();
            const toDay: string =  `${date.getDate()} ${date.getMonth() + 1} ${date.getFullYear()}`;
            this.drawGraphics('Learned Words', 'learned-words', {}, toDay);
            this.drawGraphics('New Words', 'new-words', {}, toDay);
        }

    }

    private getStatsGameAndWords(response: UserStatisticResponse, toDay: string): GetStatsGameAndWords {
        let newWordToDay: string;
        let newWordToDaySprint: string = '0';
        let newWordToDayAudio: string = '0';
        let accuracy: string;
        let accuracySprint: string = '0';
        let accuracyAudio: string = '0';
        let inRowSprint: string = '0';
        let inRowAudio: string = '0';

        if (response.optional.sprint.date == toDay) {
            newWordToDaySprint = response.optional.sprint.newWords.toString();
            accuracySprint = response.optional.sprint.accuracy.toString();
            inRowSprint = response.optional.sprint.maxInRow.toString();

        }
        if (response.optional.audio.date == toDay) {
            newWordToDayAudio = response.optional.audio.newWords.toString();
            accuracyAudio = response.optional.audio.accuracy.toString();
            inRowAudio = response.optional.audio.maxInRow.toString();
        }

        if (accuracySprint == '0' || accuracyAudio == '0') {
            accuracy = (Number(accuracySprint) + Number(accuracyAudio)).toString();
        } else {
            accuracy = Math.round(((Number(accuracySprint) + Number(accuracyAudio)) / 2)).toString();
        }

        newWordToDay = String(Number(newWordToDaySprint) + Number(newWordToDayAudio));
        return { newWordToDay, newWordToDaySprint, newWordToDayAudio, accuracy, accuracySprint, accuracyAudio, inRowSprint, inRowAudio };
    }

    private getQuantityLearnedWords(response: UserStatisticResponse, toDay: string): string {
        let quantityLearnedWords: number = 0;
        for (let key in response.optional.learnedWordsByDays) {
            if (key == toDay) quantityLearnedWords = response.optional.learnedWordsByDays[key];
        }
        return quantityLearnedWords.toString();
    }

    private getStatsForGraphicsLearnedWords(response: Object, toDay: string): GetStatsForGraphicsLearnedWords {
        const allTimeName: string[] = [];
        const allTimeValue: number[] = [];
        const keysDate: Array<number> = [];
        const keysDateNew: Array<number> = [];
        const quantityLearnedWords: Map<number, number> = new Map();
        for (let key in response) {
            const keyForParse: string = this.remakeKeyForDateParse(key);
            quantityLearnedWords.set(Date.parse(keyForParse), response[key])
            keysDate.push(Date.parse(keyForParse));
        }

        keysDate.sort((a: number, b: number) => a - b);
        const remakeToDay: number = Date.parse(this.remakeKeyForDateParse(toDay));
        if (keysDate[keysDate.length - 1] != remakeToDay) {
            keysDate.push(remakeToDay);
        }
        this.fillArrayDate(keysDate[0], keysDate[keysDate.length - 1], keysDateNew);
        keysDateNew.push(keysDate[0]);
        keysDateNew.sort((a: number, b: number) => a - b);

        keysDateNew.forEach((item: number) => {
            let date: Date = new Date(item);
            let ISOString: string = new Date(new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))).toISOString();
            allTimeName.push(ISOString.slice(5, 10));
            quantityLearnedWords.has(item) ? allTimeValue.push(quantityLearnedWords.get(item)) : allTimeValue.push(0);
        })

        return { allTimeName, allTimeValue };
    }

    private fillArrayDate(dateCur: number, dateNext: number, container: number[]): void {
        const quantityMillisecondInDay = 86400000
        let nextDay: number = dateCur + quantityMillisecondInDay;
        if (nextDay < dateNext) {
            container.push(nextDay);
            this.fillArrayDate(nextDay, dateNext, container);
        } else if (nextDay = dateNext) container.push(nextDay);
    }

    private remakeKeyForDateParse(key: string): string {
        let position = key.indexOf(' ');
        let day: number = Number(key.slice(0, position));
        let month: number = Number(key.slice(position + 1, position + 2).trim());
        let year: number = Number(key.slice(-4));
        return `${year}-${month}-${day}`;
    }

    private drawGraphics(nameGraphics: string, id: string, response: Object, toDay: string): void {
        const { allTimeName, allTimeValue } = this.getStatsForGraphicsLearnedWords(response, toDay);
        let allTimeLearnedWordsValue: number[] = allTimeValue;
        let allTimeLearnedWordsName: string[] = allTimeName;
        let ctx = (document.getElementById(id) as HTMLCanvasElement).getContext('2d');
        let chart = new Chart(ctx, {
            // Тип графика
            type: 'line',

            // Создание графиков
            data: {
                // Точки графиков
                labels: allTimeLearnedWordsName,
                // График
                datasets: [{
                    fill: 'start',
                    label: nameGraphics, // Название
                    backgroundColor: 'rgba(255,0,50,0.2)', // Цвет закраски
                    borderColor: 'rgb(255,0,50)', // Цвет линии
                    data: allTimeLearnedWordsValue // Данные каждой точки графика
                }]
            },

            // Настройки графиков
            options: {
                elements: {
                    line: {
                        tension: 0.4
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            usePointStyle: true,
                            pointStyle: 'line',
                            color: "black",
                            font: {
                                size: 30,
                                family: "'Kanit', sans-serif"
                            }
                        }
                    }
                },
                interaction: {
                    intersect: false
                }
            }
        });
    }

    private drawStatsCard(response: UserStatisticResponse, toDay: string): void {
        const wordLearnedToDay: string = this.getQuantityLearnedWords(response, toDay);
        const { newWordToDay, accuracy, newWordToDaySprint, accuracySprint, inRowAudio, accuracyAudio, newWordToDayAudio, inRowSprint } = this.getStatsGameAndWords(response, toDay);
        document.getElementById('wordLearnedToDay').innerHTML = wordLearnedToDay;
        document.getElementById('newWordToDay').innerHTML = newWordToDay;
        document.getElementById('accuracy').innerHTML = accuracy + '%';
        document.getElementById('newWordToDaySprint').innerHTML = newWordToDaySprint;
        document.getElementById('accuracySprint').innerHTML = accuracySprint + '%';
        document.getElementById('inRowAudio').innerHTML = inRowAudio;
        document.getElementById('accuracyAudio').innerHTML = accuracyAudio + '%';
        document.getElementById('newWordToDayAudio').innerHTML = newWordToDayAudio;
        document.getElementById('inRowSprint').innerHTML = inRowSprint;
    }
}

