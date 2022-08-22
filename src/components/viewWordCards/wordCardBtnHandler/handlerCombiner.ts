import { BtnHandler } from './typeBtnHandler';
import { ListenBtn } from './listenBtn';
import { DifficultBtn } from './difficultBtn';
import { EasyBtn } from './easyBtn';
import { LearningBtn } from './learningBtn';

export class HandlerCombiner {
    btn: Map<string, BtnHandler> = new Map();
    constructor() {
        this.btn.set(ListenBtn.btnName, new ListenBtn());
        this.btn.set(DifficultBtn.btnName, new DifficultBtn());
        this.btn.set(EasyBtn.btnName, new EasyBtn());
        this.btn.set(LearningBtn.btnName, new LearningBtn());
    }
    handler(btnName: string, wordId: string): void {
        const handler = this.btn.get(btnName);
        handler.handle(wordId);
    }
}
