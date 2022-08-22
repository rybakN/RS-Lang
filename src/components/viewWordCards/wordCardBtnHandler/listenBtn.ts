import { BtnHandler } from './typeBtnHandler';
import { Word } from '../../../api/typeApi';

export class ListenBtn implements BtnHandler {
    static btnName = 'listen';
    handle(wordId: string): void {
        const wordInfo: Word = JSON.parse(localStorage.getItem(wordId));
        let audio = new Audio(`https://rs-lang-team-116.herokuapp.com/${wordInfo.audio}`)
        audio.play().then();
        audio.addEventListener('ended', () => {
            audio = new Audio(`https://rs-lang-team-116.herokuapp.com/${wordInfo.audioMeaning}`);
            audio.play().then();
            audio.addEventListener('ended', () => {
                audio = new Audio(`https://rs-lang-team-116.herokuapp.com/${wordInfo.audioExample}`);
                audio.play().then();
            })
        })
    }
}
