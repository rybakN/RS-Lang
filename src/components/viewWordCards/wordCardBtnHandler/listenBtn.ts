import { BtnHandler } from './typeBtnHandler';
import { Word } from '../../../api/typeApi';

export class ListenBtn implements BtnHandler {
    static btnName = 'listen';
    handle(wordId: string): void {
        let audioContainer: HTMLElement = document.querySelector('.audio');
        const wordInfo: Word = JSON.parse(localStorage.getItem(wordId));
        let audio: HTMLAudioElement = new Audio(`https://rs-lang-team-116.herokuapp.com/${wordInfo.audio}`);

        if (audioContainer) {
            (audioContainer.childNodes.item(0) as HTMLAudioElement).pause();
            this.changeAudioTeg(audioContainer, audio);
        } else {
            const containerAudio = document.createElement('div');
            containerAudio.classList.add('audio');
            containerAudio.append(audio);
            document.body.append(containerAudio);
        }
        audioContainer = document.querySelector('.audio');
        audio.play().then();
        audio.addEventListener('ended', () => {
            audio = new Audio(`https://rs-lang-team-116.herokuapp.com/${wordInfo.audioMeaning}`);
            this.changeAudioTeg(audioContainer, audio);
            audio.play().then();
            audio.addEventListener('ended', () => {
                audio = new Audio(`https://rs-lang-team-116.herokuapp.com/${wordInfo.audioExample}`);
                this.changeAudioTeg(audioContainer, audio);
                audio.play().then();
            })
        })
    }

    private changeAudioTeg(audioContainer: HTMLElement, audio: HTMLAudioElement): void {
        (audioContainer as HTMLElement).innerHTML = '';
        audioContainer.append(audio);
    }
}
