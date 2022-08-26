import { BtnHandler } from './typeBtnHandler';
import { ListenBtn } from './listenBtn';
import { DifficultBtn } from './difficultBtn';
import { EasyBtn } from './easyBtn';
import { LearningBtn } from './learningBtn';
import { RestoreBtn } from './restoreBtn';
import { ToggleBtnName } from './toggleBtnName';

export class HandlerCombiner {
    btn: Map<string, BtnHandler> = new Map();
    toggleBtnName: ToggleBtnName;
    constructor() {
        this.toggleBtnName = new ToggleBtnName();
        this.btn.set(ListenBtn.btnName, new ListenBtn());
        this.btn.set(DifficultBtn.btnName, new DifficultBtn(this.toggleBtnName));
        this.btn.set(EasyBtn.btnName, new EasyBtn(this.toggleBtnName));
        this.btn.set(LearningBtn.btnName, new LearningBtn(this.toggleBtnName));
        this.btn.set(RestoreBtn.btnName, new RestoreBtn(this.toggleBtnName));
    }
    handler(btnName: string, wordId: string): void {
        const handler = this.btn.get(btnName);
        handler.handle(wordId);
    }
}
