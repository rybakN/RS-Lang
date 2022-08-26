import { BtnHandler } from './typeBtnHandler';
import { Word } from '../../../api/typeApi';
import { GetAudioUrl } from '../typeViewWordCards';

export class ListenBtn implements BtnHandler {
    static btnName = 'listen';
    handle(wordId: string): void {
        const { audioWordUrl, audioMeaningUrl, audioExampleUrl } = this.getAudioUrl(wordId);
        let audioContainer: HTMLElement = document.querySelector('.audio');
        let audio: HTMLAudioElement = new Audio(`https://rs-lang-team-116.herokuapp.com/${audioWordUrl}`);

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
            audio = new Audio(`https://rs-lang-team-116.herokuapp.com/${audioMeaningUrl}`);
            this.changeAudioTeg(audioContainer, audio);
            audio.play().then();
            audio.addEventListener('ended', () => {
                audio = new Audio(`https://rs-lang-team-116.herokuapp.com/${audioExampleUrl}`);
                this.changeAudioTeg(audioContainer, audio);
                audio.play().then();
            })
        })
    }

    private changeAudioTeg(audioContainer: HTMLElement, audio: HTMLAudioElement): void {
        (audioContainer as HTMLElement).innerHTML = '';
        audioContainer.append(audio);
    }

    private getAudioUrl(wordId: string): GetAudioUrl {
        let audioWordUrl: string;
        let audioMeaningUrl: string;
        let audioExampleUrl: string;
        const wordCard: HTMLElement = document.getElementById(wordId);
        wordCard.querySelectorAll('button').forEach((item: HTMLButtonElement) =>{
            if (item.dataset.name === 'listen') {
                audioWordUrl = item.dataset.audio;
                audioMeaningUrl = item.dataset.meaning;
                audioExampleUrl = item.dataset.example;
            }
        })
        return { audioWordUrl, audioMeaningUrl, audioExampleUrl };
    }
}
