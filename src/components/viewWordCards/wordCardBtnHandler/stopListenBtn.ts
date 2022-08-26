import { BtnHandler } from './typeBtnHandler';
import { Word } from '../../../api/typeApi';
import { GetAudioUrl } from '../typeViewWordCards';
import { ToggleBtnName } from './utilsWordCard/toggleBtnName';

export class StopListenBtn implements BtnHandler {
    static btnName = 'stop Listen';
    toggleBtnName: ToggleBtnName;
    constructor(toggleBtnName: ToggleBtnName) {
        this.toggleBtnName = toggleBtnName;
    }
    handle(wordId: string): void {
        let audioContainer: HTMLElement = document.querySelector('.audio');
        (audioContainer.childNodes.item(0) as HTMLAudioElement).pause();
        const wordCard: HTMLElement = document.getElementById(`${wordId}`);
        this.toggleBtnName.toggleBtnName(wordCard, 'stop Listen', 'listen');
    }
}
